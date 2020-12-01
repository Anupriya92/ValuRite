/**
 * new user registeration component
 * this is used to create an account for new user 
 */
import { Component, OnInit, AfterViewInit, EventEmitter, Output } from '@angular/core';
import * as $ from 'jquery';
import { JsonpModule } from '@angular/http';
import { MenuService } from '../../common-services/menu.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';//custom async loading spinner
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { getAllCountries, getStatesOfCountry, getCitiesOfState, getCountryById, getStateById, getCityById } from 'country-state-city';
declare var require: any;
declare var tooltip: any;
var countries = require('country-list')();

//var myPeerConnection = require('rtcpeerconnection');
declare var RTCPeerConnection: any;
//RTCPeerConnection = RTCPeerConnection || {};
declare var mozRTCPeerConnection: any;
//mozRTCPeerConnection = mozRTCPeerConnection || {};
declare var webkitRTCPeerConnection: any;
//webkitRTCPeerConnection = webkitRTCPeerConnection || {};

declare var jQuery: any;

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})

export class NewUserComponent implements OnInit, AfterViewInit {

  newuserresponse: any = "";
  firstnamealert: any = "";
  lastnamealert: any = "";
  emailalert: any = "";
  phonealert: any = "";
  departmentalert: any = "";
  companyalert: any = "";
  countryalert: any = "";
  statealert: any = "";
  cityalert: any = "";
  areaalert: any = "";
  pincodealert: any = "";
  addressLine1alert: any = "";
  addressLine2alert: any = "";
  landmarkalert:any = "";
  public edited = "";

  CountryList: any[];
  StateList: any[];
  CityList: any[];
  public state: string;
  public city: string;
  public country: string;
  cityName : string;
  //method to call parent component to close this child component div
  @Output() childEvent = new EventEmitter<string>();
  callParent(data: any) {
    this.display = 'none';
    this.reset();
    this.childEvent.next(data);
  }

  constructor(private route: Router, public trigger: MenuService, private spinnerService: Ng4LoadingSpinnerService) {

  }
  displays = 'block';
  // countrylist: any = countries.getNames();
  //Method to clear the text fields when reset button is clicked
  reset() {
    this.newuserresponse = "";
    
    $(".areaclass").css('visibility', 'hidden');
    $(".countryclass").css('visibility', 'hidden');
    $(".companyclass").css('visibility', 'hidden');
    $(".departmentclass").css('visibility', 'hidden');
    $(".phoneclass").css('visibility', 'hidden');
    $(".emailclass").css('visibility', 'hidden');
    $(".lastnameclass").css('visibility', 'hidden');
    $(".firstnameclass").css('visibility', 'hidden');
    $('#firstname').val("");
    $('#lastname').val("");
    $('#emailid').val("");
    $('#phonenumber').val("");
    $('#company').val("");
    $("#country")[0].selectedIndex = 0;
    $('#area').val("");
    $('#addressLine1').val("");
    $('#addressLine2').val("");
    $('#pinCode').val("");
    this.ngOnInit();
  }
  //method to validate the textboxes
  ngAfterViewInit() {
    function validateEmail(sEmail) {
      var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      if (filter.test(sEmail)) {
        return true;
      }
      else {
        return false;
      }
    }
    $('#firstname').on('input', function () {
      if ($('#firstname').val() != "") {
        if ($('#firstname').val().length < "50") {
          $(".firstnameclass").css('visibility', 'visible');
        } else {
          
          // this.firstnamealert = "You Reached max character."
          $(".firstnameclass").css('visibility', 'visible');
          $(".firstnameclass").text("You Reached max character.");
        }
      } else {
      }
    });
    $('#lastname').on('input', function () {
      if ($('#lastname').val() != "") {
        if ($('#lastname').val().length < "50") {
          $(".lastnameclass").css('visibility', 'hidden');
        } else {
          $(".lastnameclass").css('visibility', 'visible');
          $(".lastnameclass").text("You Reached max character.");
        }
      } else {
      }
    });
    $('#emailid').on('input', function () {
      if ($('#emailid').val() != "") {
        if ($('#emailid').val().length < "254") {
          if (validateEmail($('#emailid').val())) {
            $(".emailclass").css('visibility', 'hidden');
          }
          else {
            $(".emailclass").css('visibility', 'hidden');
          }
        } else {
          $(".emailclass").css('visibility', 'visible');
          $(".emailclass").text("You Reached max character.");
        }
      } else {
      }
    });
    $('#phonenumber').on('input', function () {
      if ($('#phonenumber').val() != "") {
        if ($('#phonenumber').val().length < "50") {
          $(".phoneclass").css('visibility', 'hidden');
        }
        else {
          $(".phoneclass").css('visibility', 'visible');
          $(".phoneclass").text("You Reached max character.");
        }
      }
      else {
      }
    });
    $('#company').on('input', function () {
      if ($('#company').val() != "") {
        if ($('#company').val().length < "100") {
          $(".companyclass").css('visibility', 'hidden');
        } else {
          $(".companyclass").css('visibility', 'visible');
          $(".companyclass").text("You Reached max character.");
        }
      } else {
      }
    });
    $('#addressline1').on('input', function () {
      if ($('#addressline1').val() != "") {
        if ($('#addressline1').val().length < "100") {
          $(".addressline1class").css('visibility', 'hidden');
        } else {
          $(".addressline1class").css('visibility', 'visible');
          $(".addressline1class").text("You Reached max character.");
        }
      } else {
      }
    });
    $('#addressLine2').on('input', function () {
      if ($('#addressLine2').val() != "") {
        if ($('#addressLine2').val().length < 100) {
          $(".addressLine2class").css('visibility', 'hidden');
        } else {
          $(".addressLine2class").css('visibility', 'visible');
          $(".addressLine2class").text("You Reached max character.");
        }
      } else {
      }
    });
   
    $("#country").change(function () {
      if ($('#country :selected').text() != "") {
        $(".countryclass").css('visibility', 'hidden');

      } else {
        $(".countryclass").css('visibility', 'visible');
      }
    });
    $('#area').on('input', function () {
      if ($('#area').val() != "") {
        if ($('#area').val().length < 100) {
          $(".areaclass").css('visibility', 'hidden');
        } else {
          $(".areaclass").css('visibility', 'visible');
          $(".areaclass").text("You Reached max character.");
        }
      }
    });
    $('#landMark').on('input', function () {
      if ($('#landMark').val() != "") {
        if ($('#landMark').val().length < 100) {
          $(".landmarkclass").css('visibility', 'hidden');
        } else {
          $(".landmarkclass").css('visibility', 'visible');
          $(".landmarkclass").text("You Reached max character.");
        }
      }
    });
    $('#pinCode').on('input', function () {
      if ($('#pinCode').val() != "") {
        if ($('#pinCode').val().length < 20) {
          $(".pincodeclass").css('visibility', 'hidden');
        } else {
          $(".pincodeclass").css('visibility', 'visible');
          $(".pincodeclass").text("You Reached max character.");
        }
      }
    });
  }
  validateEmail(sEmail) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(sEmail)) {
      return true;
    }
    else {
      return false;
    }
  }
  //Method used to navigate to login page when cancel button is clicked
  cancel() {
    this.route.navigate(['login']);
  }
  //Method used to navigate to login page
  triggerlogin() {
    this.route.navigate(['login']);
  }
  display = 'none';
  //Method to display Modal
  openModal() {
    this.display = 'block';
  }
  //method after clicking submit button to validate and show/hide alert msgs
  newUserSubmit(form: any) {
    console.log(form)
    this.newuserresponse = "";
    form.ipaddress = $('#ipaddress').val();
    if ($("#first").val() == "checked") {
      form.request = "Free Trail";
    } else if ($("#second").val() == "checked") {
      form.request = "Request Demo";
    }
    form.updatepassword = "false";
    
    var firstname = $('#firstname').val();
    var lastname = $('#lastname').val();
    var emailid = $('#emailid').val();
    var phonenumber = $('#phonenumber').val();
    var department = $('#department').val();
    var company = $('#company').val();
    var country = $('#country :selected').text();
    var stateName = $('#state :selected').text();
    var cityName = $('#cityName :selected').text();
    var address = $('#addressLine1').val();
    var pincode = $('#pinCode').val();
    var area = $('#area').val();
    form.country = country.trim();
    form.state = stateName;
    form.city = cityName;
    
    var i = 0;
    if ($.trim(firstname).length == 0) {
      $(".firstnameclass").css('visibility', 'visible');
      this.firstnamealert = "Please fill out this field.";
      i++;
    } else {
    }
    if ($.trim(lastname).length == 0) {
      $(".lastnameclass").css('visibility', 'visible');
      this.lastnamealert = "Please fill out this field.";
      i++;
    } else {
    }
    if ($.trim(emailid).length == 0) {
      $(".emailclass").css('visibility', 'visible');
      this.emailalert = "Please fill out this field.";
      i++
    } else {
      if (this.validateEmail(emailid)) {
      }
      else {
        this.emailalert = "Invalid Email Address";
        $(".emailclass").css('visibility', 'visible');
        i++;
      }
    }
    if ($.trim(phonenumber).length == 0) {
      $(".phoneclass").css('visibility', 'visible');
      this.phonealert = "Please fill out this field.";
      i++;
    } else {
    }
   
    if ($.trim(company).length == 0) {
      $(".companyclass").css('visibility', 'visible');
      this.companyalert = "Please fill out this field.";
      i++;
    } else {
    }
    if ($.trim(country).length == 0) {
      $(".countryclass").css('visibility', 'visible');
      this.countryalert = "Please select country name.";
      i++;
    } else {
    }
    if (stateName == "") {
      $(".stateclass").css('visibility', 'visible');
      this.statealert = "Please select state name.";
      i++;
    } else {
    }
    if (cityName == "") {
      $(".cityclass").css('visibility', 'visible');
      this.cityalert = "Please select city name.";
      i++;
    } else {
    }
    if ($.trim(address).length == 0) {
      $(".addressLine1class").css('visibility', 'visible');
      this.addressLine1alert = "Please fill out this field.";
      i++;
    } else {
    }
    if ($.trim(pincode).length == 0) {
      $(".pincodeclass").css('visibility', 'visible');
      this.pincodealert = "Please fill out this field.";
      i++;
    } else {
    }
    if ($.trim(area).length == 0) {
      $(".areaclass").css('visibility', 'visible');
      this.areaalert = "Please fill out this field.";
      i++;
    } else {
    }

    var emailvalid = this.validateEmail(emailid);
    if ($.trim(firstname).length == 0) {
      $('#firstname').focus();
    } else if ($.trim(lastname).length == 0) {
      $('#lastname').focus();
    } else if ($.trim(emailid).length == 0) {
      $('#emailid').focus();
    } else if (!emailvalid) {
      $('#emailid').focus();
    }
    else if ($.trim(company).length == 0) {
      $('#company').focus();
    } else if ($.trim(country).length == 0) {
      $('#country :selected').focus();
    }
    if (i != 0) {
      return;
    }
    this.spinnerService.show();
    var url = window.location.href.substr(0, window.location.href.lastIndexOf('/') + 1);
    form.url = url;
    this.trigger.newuserpost(form).subscribe((res) => {
      this.spinnerService.hide();
      if (res == "1" || res == "Message: Inserted data in DB") {
        this.openModal();
      } else if (res == "2") {
        $('#emailid').focus();
        this.newuserresponse = "Username Already Exists!";
        this.edited = "alert-danger";
        $("#loginnow").css('display', 'none');
      } else if (res == "0") {
        this.newuserresponse = "Registeration unsuccessfull.Please contact Admin!";
        this.edited = "alert-danger";
        $("#loginnow").css('display', 'none');
      } else {
        this.newuserresponse = "Mail is not Respond.Please contact Admin!";
        this.edited = "alert-danger";
        $("#loginnow").css('display', 'none');
      }
    });
  }
  //method to show/hide reset button according to the condition
  onKey(event: any) { // without type info
    var firstname = $('#firstname').val();
    var lastname = $('#lastname').val();
    var emailid = $('#emailid').val();
    var phonenumber = $('#phonenumber').val();
    var company = $('#company').val();
    var country = $('#country :selected').text();
    var stateName = $('#state :selected').text();
    var cityName = $('#cityName :selected').text();
    var area = $('#area').val();
    var addressline1 =  $('#addressLine1').val();
    var addressline2 =  $('#addressLine2').val();
    var landmark =  $('#landMark').val();
    var pinCode =  $('#pinCode').val();
    this.newuserresponse = "";

    if (firstname == "" && lastname == "" && emailid == "" && phonenumber == "" 
    && company == "" && country == "" && stateName == "" && cityName == "" && area == "" && addressline1 == "" && pinCode == "") {
      var from = $('#reset');
      from.attr('disabled', 'disabled');
    } else {
      var from = $('#reset');
      from.removeAttr("disabled");
    }
  }

  formdata;
  //method for validating textboxes
  ngOnInit() {
    this.CountryList = getAllCountries();

    this.StateList = getStatesOfCountry();
    this.CityList = getCitiesOfState();

    this.formdata = new FormGroup({
      firstname: new FormControl("", Validators.compose([
        Validators.required,
        Validators.maxLength(50)
      ])),
      lastname: new FormControl("", Validators.compose([
        Validators.required,
        Validators.maxLength(50)
      ])),
      emailid: new FormControl("", Validators.compose([
        Validators.required,
        Validators.maxLength(254)
      ])),
      phonenumber: new FormControl("", Validators.compose([
        Validators.required,
        Validators.maxLength(50)
      ])),
      company: new FormControl("", Validators.compose([
        Validators.required,
        Validators.maxLength(100)
      ])),
      country: new FormControl("", Validators.compose([
        Validators.required
      ])),
      state: new FormControl("", Validators.compose([
        Validators.required
      ])),
      city: new FormControl("", Validators.compose([
        Validators.required
      ])),
      addressLine1: new FormControl("", Validators.compose([
        Validators.maxLength(100),
        Validators.required
      ])),
      addressLine2: new FormControl("", Validators.compose([
        Validators.maxLength(100)
      ])),
      area: new FormControl("",Validators.compose([
        Validators.maxLength(100),
        //Validators.required
      ])),
      landMark: new FormControl("", Validators.compose([
        Validators.maxLength(100)
      ])),
      pincode: new FormControl("", Validators.compose([
        Validators.maxLength(20),
        Validators.required
      ]))




      
      // request: new FormControl("", Validators.compose([
      // ])),
      // updatepassword: new FormControl("", Validators.compose([
      // ]))
    });

    $(document).ready(function ($) {

      // $.getJSON("https://jsonip.com?callback=?", function(data) {
      //   alert("Your IP address is :- " + data.ip);
      // });
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
          pc.setLocalDescription(sdp, noop, noop);
        }).catch(function (reason) {
          // An error occurred, so handle the failure to connect
        });
        //listen for candidate events
        pc.onicecandidate = function (ice) {
          if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
          ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
        };
      }
      //method to get the users ip
      getUserIP(function (ip) {
        $("#ipaddress").val(ip);
        //$('#ipaddress').text(ip);
      });
    });
  }

  onCountrySelect(Selectelement: any) {
    const listed = getStatesOfCountry(Selectelement.value);
    $('#state').empty();
    let item = '<option value="" disabled selected></option>';
    $.each(listed, function (key, value) {
      item += '<option value=' + value.id + '>' + value.name + '</option>';
    });
    $('#state').append(item);
    $('#cityName').empty();
    $('#cityName').append('<option value="" disabled selected ></option>');
  }
 
  // Method to fetch the state name based on country selection
  onStateItemSelect(Selectelement: any) {
    const listed = getCitiesOfState(Selectelement.value);
    $('#cityName').empty();
    let item = '<option  value="--Select--" selected disabled value=""></option>';
    $.each(listed, function (key, value) {
      item += '<option value=' + value.id + '>' + value.name + '</option>';
    });
    $('#cityName').append(item);
  }
  //  Method to fetch the city dropdown on state selection
  onCityItemSelect(Selectelement: any) {
    this.cityName = getCityById(Selectelement.value - 1).name;
  }
}

