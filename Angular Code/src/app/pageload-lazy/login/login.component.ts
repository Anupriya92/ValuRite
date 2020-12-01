/**
 *Login component
 * this feature enables the users to login with their username and password
  with validations in it. 
 */
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MenuService } from '../../common-services/menu.service';
import * as $ from 'jquery';
const JSAlert = require('js-alert');
//Imported by Admin
import { Observable } from 'rxjs/Observable';
declare var RTCPeerConnection: any;
declare var jQuery: any;
declare var require: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  //method to call parent component to close this child component div
  @Output() childEvent = new EventEmitter<string>();
  callParent(data: any) {
    this.childEvent.next(data);
  }

  constructor(private route: Router, public trigger: MenuService) {
  }

  display = 'block';
  displays = 'none';
  localIp = "";
  globalIp = "";
  country = "";
  city_name = "";
  //method used while clicking submit button 
  loginSubmit(form: any) {
    try {
      this.loginresponse = "";
      form["localIp"] = this.localIp;
      form["globalIp"] = this.globalIp;
      form["city"] = this.city_name;
      form["country"] = this.country;
      this.logindata(form);
    }
    catch (ex) {
    }
  }

  getPrivateIpAddress() {
    let refOfThis = this;
    /**
     * Get the user IP throught the webkitRTCPeerConnection
     * @param onNewIP {Function} listener function to expose the IP locally
     * @return undefined
     */
    function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
      //compatibility for firefox and chrome

      //var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
      // var myPeerConnection = RTCPeerConnection || mozRTCPeerConnection || webkitRTCPeerConnection;
      var myPeerConnection = RTCPeerConnection;
      var pc = new myPeerConnection({
        iceServers: []
      }),
        noop = function () { },
        localIPs = {},
        ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
        key;
      function iterateIP(ip) {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
      }
      //create a bogus data channel
      pc.createDataChannel("");
      // create offer and set local description
      pc.createOffer().then(function (sdp) {
        sdp.sdp.split('\n').forEach(function (line) {
          if (line.indexOf('candidate') < 0) return;
          line.match(ipRegex).forEach(iterateIP);
        });
        pc.setLocalDescription(sdp);
      }).catch(function (reason) {
        // An error occurred, so handle the failure to connect
      });
      //listen for candidate events
      pc.onicecandidate = function (ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
      };
    }
    //method to get user ip
    getUserIP(function (ip) {
      refOfThis.localIp = ip;
    });
  }
  //Method to close popup when close button is clicked
  closepop() {
    this.displays = 'none';
  }
  //method to kill the previous session used by the user
  killPreviousSession() {

    var username = $('#username').val().trim();
    this.trigger.userLoginStatus({ "userID": username, "session_id": "empty", "param": 'killsession' }).subscribe((res) => {

      if (res.status == "Valid") {
        this.displays = 'none';
      }
      // else if(res.status == "InValid")
      // {
      //   document.getElementById("logoutbutton").click();
      //   localStorage.setItem('idle-session-out', 'outdated');
      // }
    });
  }
  //Method to clear the alert msg
  alertclear() {
    this.loginresponse = "";
  }
  loginresponse: any = "";
  //Method used to check the validation while logging in 
  logindata(data: any) {
    try {
      this.trigger.loginpost(data).subscribe((res) => {   //this.loginresponse = "User already logged in another session!";
        // Changes by Admin Team
        console.log(res)
        console.log(res.statusCode)
        const loginresponseStatus = {
          'Already Logged In': () => { this.displays = 'block'; },
          'In Valid': () => { this.loginresponse = "Invalid Username or Password!"; },
          'Not Exists': () => { this.loginresponse = "Invalid Username or Password!"; },
          'Contract Expired': () => { this.loginresponse = "Your Contract has expired!"; },
          'Max Logins Reached': () => { this.loginresponse = "Maximum Session Limit Reached!"; },
          'In Active': () => { this.loginresponse = "You are not Authorized User"; },
          'Valid': () => {
            var today: any = new Date();
            localStorage.setItem('idle-session-time' + res.result.session_id, today);
            this.postPasswordValidation(res, data);
          },
          'First Time User': () => {
            //this.route.navigate(['reset']);
            this.callParent('resetPopup');
            setTimeout(() => { this.trigger.callComponentMethodreset(data) }, 1000);
          }
        };
        if (loginresponseStatus.hasOwnProperty(res.status)) {
          loginresponseStatus[res.status]()
        } else {
          this.loginresponse = "Data Error!";
        }
      });
    }
    catch (ex) {
    }
  }
  //method used after validating the password
  postPasswordValidation(res, data) {
    console.log(res)
    //localStorage.setItem('idle-session-time', '');
    this.trigger.setisuserloggedin();   //user guard login success
    sessionStorage.setItem("UserID", data.username);
    sessionStorage.setItem("session_id", res.result.session_id);
    // Pattern Matching based on User Role Type
    // const menuMapbasedOnRolename = {
    //   'Appraiser': () => { sessionStorage.setItem("val", "5"); },
    //   'Basic User': () => { sessionStorage.setItem("val", "5"); },
    //   'Premium User': () => { sessionStorage.setItem("val", "5"); },
    //   'Admin': () => { sessionStorage.setItem("val", "5"); },
    //   'User': () => { sessionStorage.setItem("val", "5"); }
    // };
    // menuMapbasedOnRolename[res.result.rolename]();
    // sessionStorage.setItem("val", "5");
    // sessionStorage.setItem('export_flag', res.export_flag);
    //  sessionStorage.setItem("val", "5");
    sessionStorage.setItem('status', res.result.status);
    sessionStorage.setItem('usertype', res.result.usertype);
    sessionStorage.setItem('userid', res.result.userID);
    sessionStorage.setItem('username', res.result.username);
    sessionStorage.setItem('general_alert_flag', res.result.general_alert_flag);
    sessionStorage.setItem("name", res.result.name);
    sessionStorage.setItem('rolename', res.result.rolename);
    sessionStorage.setItem('company', res.result.companyname);
    // sessionStorage.setItem('search_refinement_count', res.search_refinement_count);

    // this.trigger.retwatchlist(data.username, "", "availability").subscribe(res => {
    //   sessionStorage.setItem("watchedList", JSON.stringify(res));
    // });

    // Changes by Admin Team
    let defaultSettings: any[] = [];
    this.fetchDefaultSettings().subscribe(defaultSettingFromDB => {
      defaultSettings = defaultSettingFromDB;
      for (const defaultSetting of defaultSettings) {
        //if (defaultSetting.param_name !== 'general_alert_flag') {
          sessionStorage.setItem(defaultSetting.ParamName, defaultSetting.ParamValue);
       // }
      }
     // this.trigger.callComponentMethodsession();
    });
  //   try {
  //     $('#totalcontent').css('display', 'none');
  //     $('.commonPopup').css('display', 'none');
  //     $('.firstheader').css('display', 'block');
  //     $('.foote').css('display', 'block');
  //   } catch (e) {
  //   }
  //   this.trigger.callComponentMethod();
  //   this.route.navigate(['/User/home']);
  // }

   
    // var username = sessionStorage.getItem('username');
    var status = sessionStorage.getItem('status');
    var usertype = sessionStorage.getItem('usertype');
   var userId =  sessionStorage.getItem('userid');
    var rolename = sessionStorage.getItem('rolename');
    var session =  sessionStorage.getItem("session_id");
    var name =  sessionStorage.getItem("name");
    var username =  sessionStorage.getItem("username");
    var userid =  sessionStorage.getItem("UserID");
    var userdata = {'username':username,'role':rolename, 'sessionid':session, 'useremailId':userid, 'status':status,
  'usertype':usertype, 'userId': userId, 'firstname':name}
  //ar userdata = {'USEsername':username,'us':rolename}
    var urlQuery = jQuery.param(userdata)
    if(rolename != "Admin") {
     sessionStorage.clear();
        $.ajax({
                async : false,
                url : 'http://localhost:5061/ValuRite/ApplicationQueue.aspx',
                success: function(data){
                  window.open("http://localhost:5061/ValuRite/ApplicationQueue.aspx?" +urlQuery,"_self");
                },
                error: function(data) {
                 JSAlert.alert("Server problem can't navigate. Please try later")
                }
              });

     // var dd = this.trigger.checkResponse();
      
        // this.trigger.pooooo().subscribe((status) =>
        // {
        //   console.log(status)
        // });
      //window.open("http://localhost:5061/ValuRite/ApplicationQueue.aspx?" +urlQuery,"_self");
     //this.trigger.pooooo(userdata);
     //this.trigger.pooooo(userdata);
      
      // Router.post('/api/MyResource/MyPostAction', data);
    } else  {
      try {
        sessionStorage.setItem("val", "5");
        $('#totalcontent').css('display', 'none');
        $('.commonPopup').css('display', 'none');
        $('.firstheader').css('display', 'block');
        $('.foote').css('display', 'block');
      } catch (e) {
      }
    this.trigger.callComponentMethod();
    this.route.navigate(['/User/home']);
    }   
  }

  // Service is called here
  fetchDefaultSettings(): Observable<any> {
    return this.trigger.fetchDefaultSettings();
  }

  formdata;
  ngOnInit() {

    let refOfThis = this;

    /** Local IP */
    try { this.getPrivateIpAddress(); } catch (e) { }

    /** Global IP and Country */
    try {
      $.getJSON('https://ipapi.co/json/', function (data) {
        refOfThis.city_name = data.city;
        refOfThis.globalIp = data.ip;
        refOfThis.country = data.country_name;
      });
    } catch (e) { }
    //method to validate textboxes
    this.formdata = new FormGroup({
      username: new FormControl("", Validators.compose([
        Validators.required,
        Validators.maxLength(254),
        Validators.pattern(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)
      ])),
      password: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]))
    });
  }
}

