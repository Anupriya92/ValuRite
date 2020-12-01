// import { Component, OnInit, AfterViewInit } from '@angular/core';
// import { MenuService } from '../../common-services/menu.service';
// import { Router } from '@angular/router';
// import * as $ from 'jquery';
// import { Location } from '@angular/common';
// import { debug } from 'util';
// //import { KeysPipe } from '../../common-pipes/sort-table.pipe';

// @Component({
//   selector: 'mainpageheader',
//   templateUrl: './masterpageheader.component.html',
//   styleUrls: ['./masterpageheader.component.css'
// ]
// })
// export class MasterpageheaderComponent implements OnInit, AfterViewInit {

//   item1: any;
//   inputvalue: any;
//   items: any = "";

//   constructor(private route: Router, public menulist: MenuService, private location: Location) {
//     let linkTag = document.createElement("link");
//     linkTag.setAttribute("href", "../../../assets/css/bootstrap.min.css");
//     linkTag.setAttribute("rel", "stylesheet");
//     document.getElementsByTagName("body")[0].appendChild(linkTag);
//     this.menulist.componentMethodCalled$.subscribe(
//       () => {
//         this.ngOnInit();
//       }
//     );
//   }

//   load(input: any) {
//     sessionStorage.setItem("SearchPage", "");
//     if(input != "#")
//     {
//     //$('#'+menu+index).find(".sli").css("display", "none");
//     $(".sli").css("display", "none");
//     //$('.sli').unbind('hover');
//     }
//     //var url = "/" + window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
//     var splittedStr = window.location.href.split('/');
//     var url = "/"+splittedStr[splittedStr.length-2]+"/"+splittedStr[splittedStr.length-1];
//     if (input == url) {
//       this.route.navigate(["/loader"]);
//      // this.menulist.deleteData();
//     }
//   }

//   getMenu() {
//     if (sessionStorage.getItem("MenuItems") == null) {
//       if (this.items == "") {
//         this.menulist.menuget().subscribe((res) => {
//           sessionStorage.setItem("MenuItems", JSON.stringify(res));
//           this.items = res;
//           this.item1 = this.getval();
//           console.log("yy", this.item1);
//         });
//       } else {
//         this.item1 = this.getval();
//       }
//     }
//     else {
//       this.items = JSON.parse(sessionStorage.getItem("MenuItems"));
//       this.item1 = this.getval();
//     }
//     return this.item1;
//   }
//   getval() {
//     console.log("menukey :", sessionStorage.getItem("val"));
//     // if (sessionStorage.getItem("val") == null) {
//     //   console.log("menukeyyy :", sessionStorage.getItem("val"));
//     //   sessionStorage.setItem("val", "1");
//     // }
//     if (sessionStorage.getItem("val") != "" && sessionStorage.getItem("val") != undefined) {
//     for (let obj of this.items) {
//       console.log("object:", obj);
//       for (let key in obj) {
//         console.log("      key:", key, "value:", obj[key]);
//         if (obj[key] === sessionStorage.getItem("val")) {
//           this.item1 = obj.value;
//         }
//       }
//     }
//   }
//     return this.item1;
//   }

//   logout() {
//     this.changeLoginStatus();
//     this.menulist.setisuserloggedout();
//     this.ngOnInit();
//     $('#totalcontent').css('display', 'block');
//     $('#rootpagecontent').css('display', 'none');
//     $('.firstheader').css('display', 'none');
//     $('.foote').css('display', 'none');
//   }

//   ngAfterViewInit() {

//   }
  
//   submenuhover(hover: any){
//    $("#supermenu"+hover).css("display", "block");
//    $("#supermenu"+hover).css("left", "100%");
//    const indexMap: object = {
//     'supermenu1': () => {$("#supermenu"+hover).css("top", "35px")},
//     'supermenu3': () => {$("#supermenu"+hover).css("top", "60px")},
//     'supermenu5': () => {$("#supermenu"+hover).css("top", "102px")}     
//    }
//    const s:string = 'supermenu'+hover;
//    if(indexMap.hasOwnProperty(s)){
//     indexMap['supermenu'+hover](); 
//    }
//   }

//   submenuLeave(hover: any){
//     $("#supermenu"+hover).css("display", "none");
//    }

//    mainmenuhover(hover: any){
//     $('#submenu'+hover).css("display", "block");
//    }

//    mainmenuLeave(hover: any){
//     //$('#submenu'+hover).css("display", "none");
//   }

//   ngOnInit() {
//     this.getMenu();
//     $(document).ready(function () {
//       try {
//         if (sessionStorage.getItem("name") != null) {
//           if (sessionStorage.getItem("name") != "") {
//             var username = sessionStorage.getItem("name").substring(0, 7);
//             document.getElementById('user').innerHTML = "Hi! " + username;
//             document.getElementById('profileuser').style.display = "block";
//           }
//           else {
//             document.getElementById('profileuser').style.display = "none";
//           }
//         }
//         else {
//           document.getElementById('profileuser').style.display = "none";
//         }
//       } catch (e) {
//       }
//       try {

//         $(".lia").each(function (index) {
//           var s = $(this).find(".spa").children();
//           if ($(this).find(".spa").length == 1) {
//             $(this).find(".caret").remove();
//           }
//           var s2 = s.find(".subspa").children();
//           s.find(".subspa").remove();
//           s.find(".sublia").append(s2);
//           $(this).find(".spa").remove();
//           $(this).append(s);
//           var length = $(this).find('.aclass').length+$(this).find('.subsli').length
//           for(var i=0; i<length; i++)
//           {
//             if($(this).find('.innerlink'+i).length == 1)
//             {
//               $(this).find('.caret'+i).remove();
//             }
//           }
//         });

//       } catch (e) {
//         // $(".lia").each(function (index) {
//         //   var s = $(this).find(".spa").children();
//         //   if ($(this).find(".spa").length == 1) {
//         //     $(this).find(".caret").remove();
//         //   }
//         //   $(this).find(".spa").remove();
//         //   $(this).append(s);
//         // });

//       }

//       $(".lia").hover(function () {
//         $(this).find(".sli").css("display", "block");
//       },
//         function () {
//           $(this).find(".sli").css("display", "none");
//         })
//     });
//   }

//   isobj(val) { return typeof val === 'object'; }
//   changeLoginStatus() {
//     let userID = sessionStorage.getItem("UserID");
//     let session_id = sessionStorage.getItem("session_id");
//     // sessionStorage.removeItem("UserID");
//     // sessionStorage.removeItem("logout_session_time");
//    // console.log('Inside changeLoginStatus');
//     //console.log('User ID', userID);
//     sessionStorage.clear();
//     //sessionStorage.setItem("val", "1");
//     sessionStorage.setItem("val", "");
//     sessionStorage.setItem("name", "");
//     localStorage.setItem('idle-session-time'+sessionStorage.getItem("session_id"), '');
//     this.menulist.userLoginStatus({ "userID": userID, "session_id": session_id, "param": "logout" }).subscribe((res) => {
//       console.log("Successfully changed the isLoggedIn status!");
//     });
//   }
// }


import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MenuService } from '../../common-services/menu.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { Location } from '@angular/common';
import { debug } from 'util';
//import { KeysPipe } from '../../common-pipes/sort-table.pipe';

@Component({
  selector: 'mainpageheader',
  templateUrl: './masterpageheader.component.html',
  styleUrls: ['./masterpageheader.component.css'
]
})
export class MasterpageheaderComponent implements OnInit, AfterViewInit {

  item1: any;
  inputvalue: any;
  items: any = "";

  constructor(private route: Router, public menulist: MenuService, private location: Location) {
    let linkTag = document.createElement("link");
    linkTag.setAttribute("href", "../../../assets/css/bootstrap.min.css");
    linkTag.setAttribute("rel", "stylesheet");
    document.getElementsByTagName("body")[0].appendChild(linkTag);
    this.menulist.componentMethodCalled$.subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }

  load(input: any) {
    sessionStorage.setItem("SearchPage", "");
    if(input != "#")
    {
    //$('#'+menu+index).find(".sli").css("display", "none");
    $(".sli").css("display", "none");
    //$('.sli').unbind('hover');
    }
    //var url = "/" + window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
    var splittedStr = window.location.href.split('/');
    var url = "/"+splittedStr[splittedStr.length-2]+"/"+splittedStr[splittedStr.length-1];
    if (input == url) {
      this.route.navigate(["/loader"]);
     // this.menulist.deleteData();
    }
  }

  getMenu() {
    if (sessionStorage.getItem("MenuItems") == null) {
      if (this.items == "") {
        this.menulist.menuget().subscribe((res) => {
          sessionStorage.setItem("MenuItems", JSON.stringify(res));
          this.items = res;
          this.item1 = this.getval();
          console.log("yy", this.item1);
        });
      } else {
        this.item1 = this.getval();
      }
    }
    else {
      this.items = JSON.parse(sessionStorage.getItem("MenuItems"));
      this.item1 = this.getval();
    }
    return this.item1;
  }
  getval() {
    console.log("menukey :", sessionStorage.getItem("val"));
    // if (sessionStorage.getItem("val") == null) {
    //   console.log("menukeyyy :", sessionStorage.getItem("val"));
    //   sessionStorage.setItem("val", "1");
    // }
    if (sessionStorage.getItem("val") != "" && sessionStorage.getItem("val") != undefined) {
    for (let obj of this.items) {
      console.log("object:", obj);
      for (let key in obj) {
        console.log("      key:", key, "value:", obj[key]);
        if (obj[key] === sessionStorage.getItem("val")) {
          this.item1 = obj.value;
        }
      }
    }
  }
    return this.item1;
  }

  logout() {
    this.changeLoginStatus();
    this.menulist.setisuserloggedout();
    this.ngOnInit();
    $('#totalcontent').css('display', 'block');
    $('#rootpagecontent').css('display', 'none');
    $('.firstheader').css('display', 'none');
    $('.foote').css('display', 'none');
  }

  ngAfterViewInit() {

  }
  
  // submenuhover(hover: any){
  //  $("#supermenu"+hover).css("display", "block");
  //  $("#supermenu"+hover).css("left", "100%");
  //  const indexMap: object = {
  //   'supermenu1': () => {$("#supermenu"+hover).css("top", "35px")},
  //   'supermenu3': () => {$("#supermenu"+hover).css("top", "60px")},
  //   'supermenu5': () => {$("#supermenu"+hover).css("top", "102px")}     
  //  }
  //  const s:string = 'supermenu'+hover;
  //  if(indexMap.hasOwnProperty(s)){
  //   indexMap['supermenu'+hover](); 
  //  }
  // }

  // submenuLeave(hover: any){
  //   $("#supermenu"+hover).css("display", "none");
  //  }

  //  mainmenuhover(hover: any){
  //   $('#submenu'+hover).css("display", "block");
  //  }

  //  mainmenuLeave(hover: any){
  //   //$('#submenu'+hover).css("display", "none");
  // }

  ngOnInit() {
    this.getMenu();
    $(document).ready(function () {
      try {
        if (sessionStorage.getItem("name") != null) {
          if (sessionStorage.getItem("name") != "") {
            var username = sessionStorage.getItem("name").substring(0, 7);
            document.getElementById('user').innerHTML = "Hi! " + username;
            document.getElementById('profileuser').style.display = "block";
          }
          else {
            document.getElementById('profileuser').style.display = "none";
          }
        }
        else {
          document.getElementById('profileuser').style.display = "none";
        }
      } catch (e) {
      }
      try {

        // $(".lia").each(function (index) {
        //   var s = $(this).find(".spa").children();
        //   if ($(this).find(".spa").length == 1) {
        //     $(this).find(".caret").remove();
        //   }
        //   var s2 = s.find(".subspa").children();
        //   s.find(".subspa").remove();
        //   s.find(".sublia").append(s2);
        //   $(this).find(".spa").remove();
        //   $(this).append(s);
        //   var length = $(this).find('.aclass').length+$(this).find('.subsli').length
        //   for(var i=0; i<length; i++)
        //   {
        //     if($(this).find('.innerlink'+i).length == 1)
        //     {
        //       $(this).find('.caret'+i).remove();
        //     }
        //   }
        // });

      } catch (e) {
        // $(".lia").each(function (index) {
        //   var s = $(this).find(".spa").children();
        //   if ($(this).find(".spa").length == 1) {
        //     $(this).find(".caret").remove();
        //   }
        //   $(this).find(".spa").remove();
        //   $(this).append(s);
        // });

      }

      // $(".lia").hover(function () {
      //   $(this).find(".sli").css("display", "block");
      // },
      //   function () {
      //     $(this).find(".sli").css("display", "none");
      //   })
    });
  }
  objectKeys(obj) {
    //alert(JSON.stringify(Object.keys(obj)))
    return Object.keys(obj);
}
  isobj(val) { 
   // alert(JSON.stringify(val));
    return typeof val === 'object';
   }
  changeLoginStatus() {
    let userID = sessionStorage.getItem("UserID");
    let session_id = sessionStorage.getItem("session_id");
    // sessionStorage.removeItem("UserID");
    // sessionStorage.removeItem("logout_session_time");
   // console.log('Inside changeLoginStatus');
    //console.log('User ID', userID);
    sessionStorage.clear();
    //sessionStorage.setItem("val", "1");
    sessionStorage.setItem("val", "");
    sessionStorage.setItem("name", "");
    localStorage.setItem('idle-session-time'+sessionStorage.getItem("session_id"), '');
    this.menulist.userLoginStatus({ "userID": userID, "session_id": session_id, "param": "logout" }).subscribe((res) => {
      console.log("Successfully changed the isLoggedIn status!");
    });
  }
}


