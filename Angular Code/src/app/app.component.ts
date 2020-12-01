// /**This is the main component(parent) every components is child component for this.
//  * Every router request load the components in this component.
//  * So we are handling single user session and idle session in this components.
//    */

// import { Component, OnInit, HostListener, AfterViewInit, Input, OnChanges, ElementRef } from '@angular/core';
// import * as $ from "jquery";
// import { MenuService } from './common-services/menu.service';
// import { Router } from '@angular/router';
// import { Observable } from 'rxjs/Rx';   //this is used for asynchronous process
// import { Subject } from 'rxjs/Subject';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit {

//   subscription: any;
//   secondsDisplay: any; 
//   minutesDisplay: any;
//   endCount = new Subject();
//   contenttype: any;
// //this is for maintain idle session .user click on the page or keyup the page. every action is reassign the session to user. 
// @HostListener('document:keyup', ['$event'])
// @HostListener('document:click', ['$event'])

// clickout(event) {
//   if(this.elementRef.nativeElement.contains(event.target)) {
//    let userID = sessionStorage.getItem("UserID");
//    let logoutduration = sessionStorage.getItem("logout_session_time");
//    if(userID && logoutduration)  //if only user logged in then only we handle the session 
//    {
//    this.resetTimer();
//    this.idleSessionChecker();
//    }
//    } 
//    else  
//    {
//     if(event.target.id == "loginclick") //this condition is used to show hide the child pages.
//     {
//       $('.commonPopup').css('display', 'none');
//       $('#rootpagecontent').css('display', 'block');
//       $('#loginPopup').css('display', 'block');
//       $('.firstheader').css('display','none');
//       $('.foote').css('display','none');
//     }else if(event.target.id == "registrationclick")
//     {
//       $('.commonPopup').css('display', 'none');
//       $('#rootpagecontent').css('display', 'block');
//       $('#registerPopup').css('display', 'block');
//       $('.firstheader').css('display','none');
//       $('.foote').css('display','none');
//     }else if(event.target.id == "feedbackclick")
//     {
//       $('.commonPopup').css('display', 'none');
//       $('#rootpagecontent').css('display', 'block');
//       $('#feedbackPopup').css('display', 'block');
//       $('.firstheader').css('display','none');
//       $('.foote').css('display','none');
//     }else if(event.target.id == "homeclick")
//     {
//       $('.mainpageactive').removeClass('active');
//       $('#homeclick').addClass('active');
//       $('.commonPopup').css('display', 'none');
//       $('#rootpagecontent').css('display', 'none');
//       $('.commoncontent').css('display', 'none');
//       $('#mainpagecontent').css('display', 'block');
//     }else if(event.target.id == "contactclick")
//     {
//       $('.mainpageactive').removeClass('active');
//       $('#contactclick').addClass('active');
//       $('.commonPopup').css('display', 'none');
//       $('#rootpagecontent').css('display', 'none');
//       $('.commoncontent').css('display', 'none');
//       $('#contactcontent').css('display', 'block');
//     }else if(event.target.id == "aboutclick")
//     {
//       $('.mainpageactive').removeClass('active');
//       $('#aboutclick').addClass('active');
//       $('.commonPopup').css('display', 'none');
//       $('#rootpagecontent').css('display', 'none');
//       $('.commoncontent').css('display', 'none');
//       $('#aboutcontent').css('display', 'block');
//     }else if(event.target.id == "newsclick")
//     {
//       $('.mainpageactive').removeClass('active');
//       $('#newsclick').addClass('active');
//       $('.commonPopup').css('display', 'none');
//       $('#rootpagecontent').css('display', 'none');
//       $('.commoncontent').css('display', 'none');
//       $('#newscontent').css('display', 'block');
//     }else if(event.target.id == "faqclick")
//     {
//       $('.mainpageactive').removeClass('active');
//       $('#faqclick').addClass('active');
//       $('.commonPopup').css('display', 'none');
//       $('#rootpagecontent').css('display', 'none');
//       $('.commoncontent').css('display', 'none');
//       $('#faqcontent').css('display', 'block');
//     }else if(event.target.id == "publicationclick")
//     {
//       $('.mainpageactive').removeClass('active');
//       $('#publicationclick').addClass('active');
//       $('.commonPopup').css('display', 'none');
//       $('#rootpagecontent').css('display', 'none');
//       $('.commoncontent').css('display', 'none');
//       $('#publicationcontent').css('display', 'block');
//     }
//     else if(event.target.id == "termsofuse")
//     {
//       this.contenttype = "termsofuse";
//       $('#contentpopup #termprivcontent').animate({ scrollTop: 0 },'fast')
//       $('.commonPopup').css('display', 'none');
//       $('#rootpagecontent').css('display', 'block');
//       $('#privacyPopup').css('display', 'block');
//       $('.firstheader').css('display','none');
//       $('.foote').css('display','none');
//     }else if(event.target.id == "privacypolicy")
//     {
//       this.contenttype = "privacypolicy";
//       $('#contentpopup #termprivcontent').animate({ scrollTop: 0 },'fast')
//       $('.commonPopup').css('display', 'none');
//       $('#rootpagecontent').css('display', 'block');
//       $('#privacyPopup').css('display', 'block');
//       $('.firstheader').css('display','none');
//       $('.foote').css('display','none');
//      }
//   }
// }

// termsofuse()  //show terms of use popup content
// {
//   this.contenttype = "termsofuse";
//   $('#contentpopup #termprivcontent').animate({ scrollTop: 0 },'fast')
//   $('#privacyPopup').css('display', 'block');
// }
// privacypolicy()  //show privacy policy popup content
// {
//   this.contenttype = "privacypolicy";
//   $('#contentpopup #termprivcontent').animate({ scrollTop: 0 },'fast')
//   $('#privacyPopup').css('display', 'block');
// }

// idleSessionChecker()
// {
//   debugger
//   //if session is empty or timeout .going to logout automatically
//   if(localStorage.getItem('idle-session-time'+sessionStorage.getItem("session_id")) == undefined || localStorage.getItem('idle-session-time'+sessionStorage.getItem("session_id")) == '')
//   {
//    document.getElementById("logoutbutton").click();
//   sessionStorage.setItem('idle-session-out', 'outdated');
//   }
//   else
//   {
//     var today: any = new Date();
//     var lastupdatetime: any = new Date(localStorage.getItem('idle-session-time'+sessionStorage.getItem("session_id")));
//     var diffMs = (today - lastupdatetime); // milliseconds between now & Christmas
//     //var diffDays = Math.floor(diffMs / 86400000); // days
//     //var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
//     //var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
//     let logout_session_time = parseInt(sessionStorage.getItem("logout_session_time"))*60*1000;
//     //let logout_session_time = parseInt("1")*60*1000;
//     //let logout_session_time = 1*60*1000;
//     if(diffMs+30000 <= logout_session_time)  //every page click we fetch the now time and previous updated time and get the difference based on the difference update current time or it exceeds 60 min goto logout automatically.
//     {
//     localStorage.setItem('idle-session-time'+sessionStorage.getItem("session_id"), today);
//     this.resetTimer(); // reset the timers
//     }
//     else
//     {
//     document.getElementById("logoutbutton").click();
//     sessionStorage.setItem('idle-session-out', 'outdated');
//     }
//   }
// }
// //we are stored idle session time in session so we get the time from session and send to as parameter.
// resetTimer () {
//   let logout_session_time = sessionStorage.getItem("logout_session_time");
//   if(logout_session_time)
//   {
//   this.clearTimer();
//   this.initTimer(parseInt(logout_session_time));
//   }
// }

//   title = 'app';
//   template: string = `<img src="./assets/gobiom_load.gif">`
//   today: number = Date.now();
//   stopCondition = false;

//   constructor(public menulist: MenuService, private router: Router, private elementRef:ElementRef) {
//     //if the user logged in so start the idle session
//     this.menulist.componentMethodCalledsession$.subscribe(
//       () => {
//       this.resetTimer();
//       }
//     );

//     //this is important one for single user session.
//     //every 10 seconds we are update the current time in database .
//     //its used to the user active or not.
//     Observable.interval(10000)
//     .takeWhile(() => !this.stopCondition)
//     .subscribe(i => {
//       let userID = sessionStorage.getItem("UserID");
//       if(userID)
//       { 
//       this.sessionupdate('sessionupdate');
//       }
//     })
//   }

//   //close the child components.
//   loginevent(data: any)
//   {
//     if(data=="close")
//     {
//       $('.commonPopup').css('display', 'none');
//     }
//     else
//     {     
//    $('.commonPopup').css('display', 'none');
//    $('#'+data).css('display', 'block');
//     }
//   }
  
//   // end time in minutes   
//   private initTimer (endTime: number) {
//           const interval = 1000;
//           const duration = endTime * 60;
  
//           this.subscription = Observable.timer(0, interval)
//             .take(duration)
//             .subscribe(value => this.render((duration - +value) * interval),
//               err => { },
//               () => {
//                 this.idleSessionChecker();
//                 this.endCount.next();
//               });
//         }
  
//         private render (count) {
//           this.secondsDisplay = this.getSeconds(count);
//           this.minutesDisplay = this.getMinutes(count);
//         }
  
//         private getSeconds (ticks: number) {
//           const seconds = ((ticks % 60000) / 1000).toFixed(0);
//           return this.pad(seconds);
//         }
  
//         private getMinutes (ticks: number) {
//           const minutes = Math.floor(ticks / 60000);
//           return this.pad(minutes);
//         }
  
//         private pad (digit: any) {
//           return digit <= 9 ? '0' + digit : digit;
//         }

//          clearTimer () {
//           if (this.subscription) {
//             this.subscription.unsubscribe();
//           }
//          }
// //every 10 seconds call this method and update the time in database.
//   sessionupdate(updatetype) {
//     try
//     {
//     let userID = sessionStorage.getItem("UserID");
//     let session_id = sessionStorage.getItem("session_id");
//     if(userID)
//     {
//     this.menulist.userLoginStatus({ "userID": userID, "session_id": session_id, "param": updatetype }).subscribe((res) => {
//       if(updatetype == "sessionupdate")
//       {
//         if(res.status == "Valid")
//         {
//           console.log("Successfully changed the isLoggedIn status!");
//         }else if(res.status == "InValid") //if the document is not there in database .so automatically going to logout.
//         {
//           console.log("unSuccessfully changed the isLoggedIn status!");
//           document.getElementById("logoutbutton").click();
//           sessionStorage.setItem('idle-session-out', 'outdated');
//         }
//       }
//     });
//   }
//   }catch(e)
//   {
//   }
//   }

//   ngOnInit() {
//     let context = this;
//     $("body").on("contextmenu", function (e) {
//       return false;
//     });
//     //Disable cut copy
//     $('body').bind('cut copy', function (e) {
//       e.preventDefault();
//     });
//     $('body').keydown(function (e) {
//       if (e.ctrlKey &&
//         (e.keyCode === 65)) {
//         return false;
//       }
//     })
//   }
// }
/**This is the main component(parent) every components is child component for this.
 * Every router request load the components in this component.
 * So we are handling single user session and idle session in this components.
   */

  import { Component, OnInit, HostListener, AfterViewInit, Input, OnChanges, ElementRef } from '@angular/core';
  import * as $ from "jquery";
  import { MenuService } from './common-services/menu.service';
  import { Router } from '@angular/router';
  import { Observable } from 'rxjs/Rx';   //this is used for asynchronous process
  import { Subject } from 'rxjs/Subject';
  
  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent implements OnInit {
    loginpopup: boolean = false;
    registrationpopup: boolean = false;
    subscription: any;
    secondsDisplay: any; 
    minutesDisplay: any;
    endCount = new Subject();
    contenttype: any;
  //this is for maintain idle session .user click on the page or keyup the page. every action is reassign the session to user. 
  @HostListener('document:keyup', ['$event'])
  @HostListener('document:click', ['$event'])
  
  clickout(event) {
    if(this.elementRef.nativeElement.contains(event.target)) {
     let userID = sessionStorage.getItem("UserID");
     let logoutduration = sessionStorage.getItem("logout_session_time");
     if(userID && logoutduration)  //if only user logged in then only we handle the session 
     {
     this.resetTimer();
     this.idleSessionChecker();
     }
     
     else  
     {
      if(event.target.id == "loginclick") //this condition is used to show hide the child pages.
      {
        this.loginpopup = true;
        $("body").addClass("bodyscroll");
        // $('.commonPopup').css('display', 'none');
        // $('#rootpagecontent').css('display', 'block');
        // $('#loginPopup').css('display', 'block');
        // $('.firstheader').css('display','none');
        // $('.foote').css('display','none');
      }
      else if(event.target.id == "registrationclick")
      {
       this.registrationpopup = true;
    $("body").addClass("bodyscroll");
      }
    }
    // else if(event.target.id == "registrationclick")
    //   {
    //    this.registrationpopup = true;
        // $("body").addClass("bodyscroll");
    //     $('#registerPopup').css('display', 'block');
    //     $('.firstheader').css('display','none');
    //     $('.foote').css('display','none');
    //   }else if(event.target.id == "feedbackclick")
    //   {
    //     $('.commonPopup').css('display', 'none');
    //     $('#rootpagecontent').css('display', 'block');
    //     $('#feedbackPopup').css('display', 'block');
    //     $('.firstheader').css('display','none');
    //     $('.foote').css('display','none');
    //   }else if(event.target.id == "homeclick")
    //   {
    //     $('.mainpageactive').removeClass('active');
    //     $('#homeclick').addClass('active');
    //     $('.commonPopup').css('display', 'none');
    //     $('#rootpagecontent').css('display', 'none');
    //     $('.commoncontent').css('display', 'none');
    //     $('#mainpagecontent').css('display', 'block');
    //   }else if(event.target.id == "contactclick")
    //   {
    //     $('.mainpageactive').removeClass('active');
    //     $('#contactclick').addClass('active');
    //     $('.commonPopup').css('display', 'none');
    //     $('#rootpagecontent').css('display', 'none');
    //     $('.commoncontent').css('display', 'none');
    //     $('#contactcontent').css('display', 'block');
    //   }else if(event.target.id == "aboutclick")
    //   {
    //     $('.mainpageactive').removeClass('active');
    //     $('#aboutclick').addClass('active');
    //     $('.commonPopup').css('display', 'none');
    //     $('#rootpagecontent').css('display', 'none');
    //     $('.commoncontent').css('display', 'none');
    //     $('#aboutcontent').css('display', 'block');
    //   }else if(event.target.id == "newsclick")
    //   {
    //     $('.mainpageactive').removeClass('active');
    //     $('#newsclick').addClass('active');
    //     $('.commonPopup').css('display', 'none');
    //     $('#rootpagecontent').css('display', 'none');
    //     $('.commoncontent').css('display', 'none');
    //     $('#newscontent').css('display', 'block');
    //   }else if(event.target.id == "faqclick")
    //   {
    //     $('.mainpageactive').removeClass('active');
    //     $('#faqclick').addClass('active');
    //     $('.commonPopup').css('display', 'none');
    //     $('#rootpagecontent').css('display', 'none');
    //     $('.commoncontent').css('display', 'none');
    //     $('#faqcontent').css('display', 'block');
    //   }else if(event.target.id == "publicationclick")
    //   {
    //     $('.mainpageactive').removeClass('active');
    //     $('#publicationclick').addClass('active');
    //     $('.commonPopup').css('display', 'none');
    //     $('#rootpagecontent').css('display', 'none');
    //     $('.commoncontent').css('display', 'none');
    //     $('#publicationcontent').css('display', 'block');
    //   }
    //   else if(event.target.id == "termsofuse")
    //   {
    //     this.contenttype = "termsofuse";
    //     $('#contentpopup #termprivcontent').animate({ scrollTop: 0 },'fast')
    //     $('.commonPopup').css('display', 'none');
    //     $('#rootpagecontent').css('display', 'block');
    //     $('#privacyPopup').css('display', 'block');
    //     $('.firstheader').css('display','none');
    //     $('.foote').css('display','none');
    //   }else if(event.target.id == "privacypolicy")
    //   {
    //     this.contenttype = "privacypolicy";
    //     $('#contentpopup #termprivcontent').animate({ scrollTop: 0 },'fast')
    //     $('.commonPopup').css('display', 'none');
    //     $('#rootpagecontent').css('display', 'block');
    //     $('#privacyPopup').css('display', 'block');
    //     $('.firstheader').css('display','none');
    //     $('.foote').css('display','none');
    //    }
    // }
    }
  }
  
  termsofuse()  //show terms of use popup content
  {
    this.contenttype = "termsofuse";
    $('#contentpopup #termprivcontent').animate({ scrollTop: 0 },'fast')
    $('#privacyPopup').css('display', 'block');
  }
  privacypolicy()  //show privacy policy popup content
  {
    this.contenttype = "privacypolicy";
    $('#contentpopup #termprivcontent').animate({ scrollTop: 0 },'fast')
    $('#privacyPopup').css('display', 'block');
  }
  
  idleSessionChecker()
  {
    //if session is empty or timeout .going to logout automatically
    if(localStorage.getItem('idle-session-time'+sessionStorage.getItem("session_id")) == undefined || localStorage.getItem('idle-session-time'+sessionStorage.getItem("session_id")) == '')
    {
    document.getElementById("logoutbutton").click();
    sessionStorage.setItem('idle-session-out', 'outdated');
    }
    else
    {
      var today: any = new Date();
      var lastupdatetime: any = new Date(localStorage.getItem('idle-session-time'+sessionStorage.getItem("session_id")));
      var diffMs = (today - lastupdatetime); // milliseconds between now & Christmas
      //var diffDays = Math.floor(diffMs / 86400000); // days
      //var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
      //var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
      let logout_session_time = parseInt(sessionStorage.getItem("logout_session_time"))*60*1000;
      //let logout_session_time = parseInt("1")*60*1000;
      //let logout_session_time = 1*60*1000;
      if(diffMs+30000 <= logout_session_time)  //every page click we fetch the now time and previous updated time and get the difference based on the difference update current time or it exceeds 60 min goto logout automatically.
      {
      localStorage.setItem('idle-session-time'+sessionStorage.getItem("session_id"), today);
      this.resetTimer(); // reset the timers
      }
      else
      {
      document.getElementById("logoutbutton").click();
      sessionStorage.setItem('idle-session-out', 'outdated');
      }
    }
  }
  //we are stored idle session time in session so we get the time from session and send to as parameter.
  resetTimer () {
    let logout_session_time = sessionStorage.getItem("logout_session_time");
    if(logout_session_time)
    {
    this.clearTimer();
    this.initTimer(parseInt(logout_session_time));
    }
  }
  
    title = 'app';
    template: string = `<img src="./assets/gobiom_load.gif">`
    today: number = Date.now();
    stopCondition = false;
    menuexists = false;
  
    constructor(public menulist: MenuService, private router: Router, private elementRef:ElementRef) {
      //if the user logged in so start the idle session
      this.menulist.componentMethodCalledsession$.subscribe(
        () => {
        this.resetTimer();
        }
      );
  
      this.menulist.componentMethodCalled$.subscribe(
        () => {
         this.menuexists = true;
        }
      );
  
      //this is important one for single user session.
      //every 10 seconds we are update the current time in database .
      //its used to the user active or not.
      Observable.interval(10000)
      .takeWhile(() => !this.stopCondition)
      .subscribe(i => {
        let userID = sessionStorage.getItem("UserID");
        if(userID)
        { 
        this.sessionupdate('sessionupdate');
        }
      })
    }
  
    //close the child components.
    loginevent(data: any)
    {
      if(data=="close")
      {
        //$('.commonPopup').css('display', 'none');
        this.loginpopup = false;
        this.registrationpopup = false;
        $("body").removeClass("bodyscroll");
      }
      else if(data=="registrationpopup")
      {     
        this.loginpopup = false;
        this.registrationpopup = true;
        $("body").addClass("bodyscroll");
      }
      else if(data=="loginpopup")
      {     
        this.registrationpopup = false;
        this.loginpopup = true;
        $("body").addClass("bodyscroll");
      }
    }
  
    // end time in minutes   
    private initTimer (endTime: number) {
            const interval = 1000;
            const duration = endTime * 60;
    
            this.subscription = Observable.timer(0, interval)
              .take(duration)
              .subscribe(value => this.render((duration - +value) * interval),
                err => { },
                () => {
                  this.idleSessionChecker();
                  this.endCount.next();
                });
          }
    
          private render (count) {
            this.secondsDisplay = this.getSeconds(count);
            this.minutesDisplay = this.getMinutes(count);
          }
    
          private getSeconds (ticks: number) {
            const seconds = ((ticks % 60000) / 1000).toFixed(0);
            return this.pad(seconds);
          }
    
          private getMinutes (ticks: number) {
            const minutes = Math.floor(ticks / 60000);
            return this.pad(minutes);
          }
    
          private pad (digit: any) {
            return digit <= 9 ? '0' + digit : digit;
          }
  
           clearTimer () {
            if (this.subscription) {
              this.subscription.unsubscribe();
            }
           }
  //every 10 seconds call this method and update the time in database.
    sessionupdate(updatetype) {
      try
      {
      let userID = sessionStorage.getItem("UserID");
      let session_id = sessionStorage.getItem("session_id");
      if(userID)
      {
      this.menulist.userLoginStatus({ "userID": userID, "session_id": session_id, "param": updatetype }).subscribe((res) => {
        if(updatetype == "sessionupdate")
        {
          if(res.status == "Valid")
          {
            console.log("Successfully changed the isLoggedIn status!");
          }else if(res.status == "InValid") //if the document is not there in database .so automatically going to logout.
          {
            console.log("unSuccessfully changed the isLoggedIn status!");
            document.getElementById("logoutbutton").click();
            sessionStorage.setItem('idle-session-out', 'outdated');
          }
        }
      });
    }
    }catch(e)
    {
    }
    }
  
    ngOnInit() {
     
     if(sessionStorage.getItem('session') == "true")
     this.menuexists = true;
  
     // let context = this;
      $("body").on("contextmenu", function (e) {
        return false;
      });
      //Disable cut copy
      $('body').bind('cut copy', function (e) {
        e.preventDefault();
      });
      $('body').keydown(function (e) {
        if (e.ctrlKey &&
          (e.keyCode === 65)) {
          return false;
        }
      })
    }
  }
  