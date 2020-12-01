// import { Component, OnInit, HostListener, ElementRef, ViewEncapsulation, } from '@angular/core';
// declare var $: any;

// declare var jQuery: any;

// @Component({
//   selector: 'app-mainpage',
//   templateUrl: './mainpage.component.html',
//   styleUrls: ['./mainpage.component.css',
//   '../../../assets/valurite-css/components.css',
//   '../../../assets/valurite-css/responsee.css',
//   '../../../assets/owl-carousel/owl.carousel.css',
//   '../../../assets/owl-carousel/owl.theme.css',
//   '../../../assets/valurite-css/magnific-popup.css',
//   '../../../assets/valurite-css/font-awesome.min.css',
//   '../../../assets/valurite-css/faq-accordin.css',
//   '../../../assets/valurite-css/template-style.css'
// ], 
// encapsulation: ViewEncapsulation.None
// })

// export class MainpageComponent implements OnInit {

//   constructor(private elementRef: ElementRef) {

//     //document.getElementById("testScript").remove();

//     // var responsee = document.createElement("script");
//     // responsee.type = "text/javascript";
//     // responsee.src = "../../../assets/valurite-js/responsee.js";
//     // elementRef.nativeElement.appendChild(responsee);

//     // var responsee = document.createElement("script");
//     // responsee.setAttribute("id", "responseeScript");
//     // responsee.setAttribute("src", "../../../assets/valurite-js/responsee.js");
//     // document.body.appendChild(responsee);

//     // var carousel = document.createElement("script");
//     // carousel.setAttribute("id", "carouselScript");
//     // carousel.setAttribute("src", "../../../assets/owl-carousel/owl.carousel.js");
//     // document.body.appendChild(carousel);

//     // var template = document.createElement("script");
//     // template.setAttribute("id", "templateScript");
//     // template.setAttribute("src", "../../../assets/valurite-js/template-scripts.js");
//     // document.body.appendChild(template);

//    }



//   //@HostListener('document:keyup', ['$event'])
//   @HostListener('document:click', ['$event'])
  
//   clickout(event) {
//     if(this.elementRef.nativeElement.contains(event.target)) {
//       if(event.target.id == "valuritehome" || event.target.id == "valuriteabout" || event.target.id == "valuritepricing")
//       {
//       this.pageload(event.target.id);
//       }
//       else if(event.target.id == "valuritefeedback" || event.target.id == "valuritecontact" || event.target.id == "valuritefaq")
//       {
//       this.pageload(event.target.id);
//         if (event.target.id === 'valuritefaq') {
//           setTimeout(() => {
//             $('.faqmain #faqbtn').hover(function(){
//               $(this).removeClass('accordionPlus').addClass('accordionPlusChange');
//             }, function(){
//               $(this).removeClass('accordionPlusChange').addClass('accordionPlus');
//             });
//           }, 1000); 
//         }
//       }
//       else if(event.target.id == "valuritelogin") //this condition is used to show hide the child pages.
//       {
//         $('.commonPopup').css('display', 'none');
//         $('#rootpagecontent').css('display', 'block');
//         $('#loginPopup').css('display', 'block');
//         $('.firstheader').css('display','none');
//         $('.foote').css('display','none');
//       }else if(event.target.id == "registrationclick")
//       {
//         $('.commonPopup').css('display', 'none');
//         $('#rootpagecontent').css('display', 'block');
//         $('#registerPopup').css('display', 'block');
//         $('.firstheader').css('display','none');
//         $('.foote').css('display','none');
//       }else if(event.target.id == "feedbackclick")
//       {
//         $('.commonPopup').css('display', 'none');
//         $('#rootpagecontent').css('display', 'block');
//         $('#feedbackPopup').css('display', 'block');
//         $('.firstheader').css('display','none');
//         $('.foote').css('display','none');
//       }
//       // else if(event.target.id == "homeclick")
//       // {
//       //   $('.mainpageactive').removeClass('active');
//       //   $('#homeclick').addClass('active');
//       //   $('.commonPopup').css('display', 'none');
//       //   $('#rootpagecontent').css('display', 'none');
//       //   $('.commoncontent').css('display', 'none');
//       //   $('#mainpagecontent').css('display', 'block');
//       // }else if(event.target.id == "contactclick")
//       // {
//       //   $('.mainpageactive').removeClass('active');
//       //   $('#contactclick').addClass('active');
//       //   $('.commonPopup').css('display', 'none');
//       //   $('#rootpagecontent').css('display', 'none');
//       //   $('.commoncontent').css('display', 'none');
//       //   $('#contactcontent').css('display', 'block');
//       // }else if(event.target.id == "aboutclick")
//       // {
//       //   $('.mainpageactive').removeClass('active');
//       //   $('#aboutclick').addClass('active');
//       //   $('.commonPopup').css('display', 'none');
//       //   $('#rootpagecontent').css('display', 'none');
//       //   $('.commoncontent').css('display', 'none');
//       //   $('#aboutcontent').css('display', 'block');
//       // }else if(event.target.id == "newsclick")
//       // {
//       //   $('.mainpageactive').removeClass('active');
//       //   $('#newsclick').addClass('active');
//       //   $('.commonPopup').css('display', 'none');
//       //   $('#rootpagecontent').css('display', 'none');
//       //   $('.commoncontent').css('display', 'none');
//       //   $('#newscontent').css('display', 'block');
//       // }else if(event.target.id == "faqclick")
//       // {
//       //   $('.mainpageactive').removeClass('active');
//       //   $('#faqclick').addClass('active');
//       //   $('.commonPopup').css('display', 'none');
//       //   $('#rootpagecontent').css('display', 'none');
//       //   $('.commoncontent').css('display', 'none');
//       //   $('#faqcontent').css('display', 'block');
//       // }else if(event.target.id == "publicationclick")
//       // {
//       //   $('.mainpageactive').removeClass('active');
//       //   $('#publicationclick').addClass('active');
//       //   $('.commonPopup').css('display', 'none');
//       //   $('#rootpagecontent').css('display', 'none');
//       //   $('.commoncontent').css('display', 'none');
//       //   $('#publicationcontent').css('display', 'block');
//       // }
//       // else if(event.target.id == "termsofuse")
//       // {
//       //   this.contenttype = "termsofuse";
//       //   $('#contentpopup #termprivcontent').animate({ scrollTop: 0 },'fast')
//       //   $('.commonPopup').css('display', 'none');
//       //   $('#rootpagecontent').css('display', 'block');
//       //   $('#privacyPopup').css('display', 'block');
//       //   $('.firstheader').css('display','none');
//       //   $('.foote').css('display','none');
//       // }else if(event.target.id == "privacypolicy")
//       // {
//       //   this.contenttype = "privacypolicy";
//       //   $('#contentpopup #termprivcontent').animate({ scrollTop: 0 },'fast')
//       //   $('.commonPopup').css('display', 'none');
//       //   $('#rootpagecontent').css('display', 'block');
//       //   $('#privacyPopup').css('display', 'block');
//       //   $('.firstheader').css('display','none');
//       //   $('.foote').css('display','none');
//       //  }
//     }
//   }


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


//   ngOnInit() {

//     this.pageload('valuritehome');
//     $('.firstheader').css('display', 'none');
//     $('.foote').css('display', 'none');

//     // document.onclick = myClickHandler;
//     // function myClickHandler(event) {
//     //   if(event.target.id == "valuritehome" || event.target.id == "valuriteabout" || event.target.id == "valuriteservice")
//     //   this.pageload(event.target.id);
//     //   else if(event.target.id == "valuritegallery" || event.target.id == "valuritecontact" || event.target.id == "valuritefaq")
//     //   this.pageload(event.target.id);
//     // }
    
//   }
//   callbackee()
//   {
//     alert('ary')
//   }

//   pageload(pagename)
//   {
//     var page: this;
//     $.get('../../../assets/homepages/'+pagename+'.html', function (data) {
//       var responsedata = data;
//       document.getElementById("totalcontent").innerHTML = "";
//       document.getElementById("totalcontent").innerHTML = responsedata;
//       if(pagename == "valuritefaq")
//       {
//         var acc = document.getElementsByClassName("accordion");
//         var i;
//         for (i = 0; i < acc.length; i++) 
//         {
//         acc[i].addEventListener("click", function() 
//         {
//         this.classList.toggle("active");
//         var panel = this.nextElementSibling;
//         if (panel.style.maxHeight)
//         {
//         panel.style.maxHeight = null;
//         } 
//         else 
//         {
//         panel.style.maxHeight = panel.scrollHeight + "px";
//         } 
//         });
//         }

//        var myEle = document.getElementById("responseeScript");
//        if(myEle)
//        {
//        document.getElementById("responseeScript").remove();
//        }
//       var responsee = document.createElement("script");
//       responsee.setAttribute("id", "responseeScript");
//       responsee.setAttribute("src", "../../../assets/valurite-js/responsee.js");
//       document.body.appendChild(responsee);

//       }
//       else if(pagename == "valuritehome")
//       {
//         var myEle = document.getElementById("responseeScript");
//         if(myEle)
//         {
//         document.getElementById("responseeScript").remove();
//         }
//       var responsee = document.createElement("script");
//       responsee.setAttribute("id", "responseeScript");
//       responsee.setAttribute("src", "../../../assets/valurite-js/responsee.js");
//       document.body.appendChild(responsee);

//       myEle = document.getElementById("carouselScript");
//       if(myEle)
//       {
//       document.getElementById("carouselScript").remove();
//       }
//       var carousel = document.createElement("script");
//       carousel.setAttribute("id", "carouselScript");
//       carousel.setAttribute("src", "../../../assets/owl-carousel/owl.carousel.js");
//       document.body.appendChild(carousel);

//       setTimeout( function(){
//       myEle = document.getElementById("templateScript");
//       if(myEle)
//       {
//       document.getElementById("templateScript").remove();
//       }
//       var template = document.createElement("script");
//       template.setAttribute("id", "templateScript");
//       template.setAttribute("src", "../../../assets/valurite-js/template-scripts.js");
//       document.body.appendChild(template);
//       }, 100 );

//       }
//       else
//       {
//         var myEle = document.getElementById("responseeScript");
//         if(myEle)
//         {
//         document.getElementById("responseeScript").remove();
//         }
//         var responsee = document.createElement("script");
//         responsee.setAttribute("id", "responseeScript");
//         responsee.setAttribute("src", "../../../assets/valurite-js/responsee.js");
//         document.body.appendChild(responsee);
//       }

//     });
//   }

//   // fetchResults(callback: () => void) {
//   //   alert('dfhhdfhd')
//   //   callback(); // this is line 4
//   // }

  

// }

import { Component, OnInit, HostListener, ElementRef, ViewEncapsulation } from '@angular/core';
//declare var $: any;
import * as $ from 'jquery';

//declare var jQuery: any;

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css',
  '../../../assets/valurite-css/components.css',
  '../../../assets/valurite-css/responsee.css',
  '../../../assets/owl-carousel/owl.carousel.css',
  '../../../assets/owl-carousel/owl.theme.css',
  '../../../assets/valurite-css/magnific-popup.css',
  '../../../assets/valurite-css/font-awesome.min.css',
  '../../../assets/valurite-css/faq-accordin.css',
  '../../../assets/valurite-css/template-style.css'
], 
encapsulation: ViewEncapsulation.None
})
export class MainpageComponent implements OnInit {

  loginpopup: boolean = false;
  registrationpopup: boolean = false;

  constructor(private elementRef: ElementRef) {

    //document.getElementById("testScript").remove();

    // var responsee = document.createElement("script");
    // responsee.type = "text/javascript";
    // responsee.src = "../../../assets/valurite-js/responsee.js";
    // elementRef.nativeElement.appendChild(responsee);

    // var responsee = document.createElement("script");
    // responsee.setAttribute("id", "responseeScript");
    // responsee.setAttribute("src", "../../../assets/valurite-js/responsee.js");
    // document.body.appendChild(responsee);

    // var carousel = document.createElement("script");
    // carousel.setAttribute("id", "carouselScript");
    // carousel.setAttribute("src", "../../../assets/owl-carousel/owl.carousel.js");
    // document.body.appendChild(carousel);

    // var template = document.createElement("script");
    // template.setAttribute("id", "templateScript");
    // template.setAttribute("src", "../../../assets/valurite-js/template-scripts.js");
    // document.body.appendChild(template);

   }



  //@HostListener('document:keyup', ['$event'])
  @HostListener('document:click', ['$event'])
  
  clickout(event) {
    if(this.elementRef.nativeElement.contains(event.target)) {
      debugger
      if(event.target.id == "valuritehome" || event.target.id == "valuriteabout" || event.target.id == "valuritepricing")
      {
      this.pageload(event.target.id);
      }
      else if(event.target.id == "valuritefeedback" || event.target.id == "valuritecontact" || event.target.id == "valuritefaq")
      {
      this.pageload(event.target.id);
        if (event.target.id === 'valuritefaq') {
          setTimeout(() => {
            $('.faqmain Button').hover(function(){
              $(this).removeClass('accordionPlus').addClass('accordionPlusChange');
            }, function(){
              $(this).removeClass('accordionPlusChange').addClass('accordionPlus');
            });
          }, 1000);
        }
      }
      else if(event.target.id == "valuritelogin") //this condition is used to show hide the child pages.
      {
        // $('.commonPopup').css('display', 'none');
        // $('#rootpagecontent').css('display', 'block');
        // $('#loginPopup').css('display', 'block');
        // $('.firstheader').css('display','none');
        // $('.foote').css('display','none');
        this.loginpopup = true;
        $("body").addClass("bodyscroll");

      } else if(event.target.id == "registrationclick")
      {
        this.registrationpopup = true;
        $("body").addClass("bodyscroll");
        // $('.commonPopup').css('display', 'none');
        // $('#rootpagecontent').css('display', 'block');
        // $('#registerPopup').css('display', 'block');
        // $('.firstheader').css('display','none');
        // $('.foote').css('display','none');
      }
      // else if(event.target.id == "feedbackclick")
      // {
      //   $('.commonPopup').css('display', 'none');
      //   $('#rootpagecontent').css('display', 'block');
      //   $('#feedbackPopup').css('display', 'block');
      //   $('.firstheader').css('display','none');
      //   $('.foote').css('display','none');
      // }
      // else if(event.target.id == "homeclick")
      // {
      //   $('.mainpageactive').removeClass('active');
      //   $('#homeclick').addClass('active');
      //   $('.commonPopup').css('display', 'none');
      //   $('#rootpagecontent').css('display', 'none');
      //   $('.commoncontent').css('display', 'none');
      //   $('#mainpagecontent').css('display', 'block');
      // }else if(event.target.id == "contactclick")
      // {
      //   $('.mainpageactive').removeClass('active');
      //   $('#contactclick').addClass('active');
      //   $('.commonPopup').css('display', 'none');
      //   $('#rootpagecontent').css('display', 'none');
      //   $('.commoncontent').css('display', 'none');
      //   $('#contactcontent').css('display', 'block');
      // }else if(event.target.id == "aboutclick")
      // {
      //   $('.mainpageactive').removeClass('active');
      //   $('#aboutclick').addClass('active');
      //   $('.commonPopup').css('display', 'none');
      //   $('#rootpagecontent').css('display', 'none');
      //   $('.commoncontent').css('display', 'none');
      //   $('#aboutcontent').css('display', 'block');
      // }else if(event.target.id == "newsclick")
      // {
      //   $('.mainpageactive').removeClass('active');
      //   $('#newsclick').addClass('active');
      //   $('.commonPopup').css('display', 'none');
      //   $('#rootpagecontent').css('display', 'none');
      //   $('.commoncontent').css('display', 'none');
      //   $('#newscontent').css('display', 'block');
      // }else if(event.target.id == "faqclick")
      // {
      //   $('.mainpageactive').removeClass('active');
      //   $('#faqclick').addClass('active');
      //   $('.commonPopup').css('display', 'none');
      //   $('#rootpagecontent').css('display', 'none');
      //   $('.commoncontent').css('display', 'none');
      //   $('#faqcontent').css('display', 'block');
      // }else if(event.target.id == "publicationclick")
      // {
      //   $('.mainpageactive').removeClass('active');
      //   $('#publicationclick').addClass('active');
      //   $('.commonPopup').css('display', 'none');
      //   $('#rootpagecontent').css('display', 'none');
      //   $('.commoncontent').css('display', 'none');
      //   $('#publicationcontent').css('display', 'block');
      // }
      // else if(event.target.id == "termsofuse")
      // {
      //   this.contenttype = "termsofuse";
      //   $('#contentpopup #termprivcontent').animate({ scrollTop: 0 },'fast')
      //   $('.commonPopup').css('display', 'none');
      //   $('#rootpagecontent').css('display', 'block');
      //   $('#privacyPopup').css('display', 'block');
      //   $('.firstheader').css('display','none');
      //   $('.foote').css('display','none');
      // }else if(event.target.id == "privacypolicy")
      // {
      //   this.contenttype = "privacypolicy";
      //   $('#contentpopup #termprivcontent').animate({ scrollTop: 0 },'fast')
      //   $('.commonPopup').css('display', 'none');
      //   $('#rootpagecontent').css('display', 'block');
      //   $('#privacyPopup').css('display', 'block');
      //   $('.firstheader').css('display','none');
      //   $('.foote').css('display','none');
      //  }
    }
  }


  loginevent(data: any)
  {
    if(data=="close")
    {
      //$('.commonPopup').css('display', 'none');
      this.loginpopup = false;
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


  ngOnInit() {

    this.pageload('valuritehome');
    $('.firstheader').css('display', 'none');
    $('.foote').css('display', 'none');

    // document.onclick = myClickHandler;
    // function myClickHandler(event) {
    //   if(event.target.id == "valuritehome" || event.target.id == "valuriteabout" || event.target.id == "valuriteservice")
    //   this.pageload(event.target.id);
    //   else if(event.target.id == "valuritegallery" || event.target.id == "valuritecontact" || event.target.id == "valuritefaq")
    //   this.pageload(event.target.id);
    // }
    
  }
  callbackee()
  {
    alert('ary')
  }

  pageload(pagename)
  {
    var page: this;
    $.get('../../../assets/homepages/'+pagename+'.html', function (data) {
      var responsedata = data;
      document.getElementById("totalcontent").innerHTML = "";
      document.getElementById("totalcontent").innerHTML = responsedata;
      if(pagename == "valuritefaq")
      {
        var acc = document.getElementsByClassName("accordion");
        var i;
        for (i = 0; i < acc.length; i++) 
        {
        acc[i].addEventListener("click", function() 
        {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight)
        {
        panel.style.maxHeight = null;
        } 
        else 
        {
        panel.style.maxHeight = panel.scrollHeight + "px";
        } 
        });
        }

       var myEle = document.getElementById("responseeScript");
       if(myEle)
       {
       document.getElementById("responseeScript").remove();
       }
      var responsee = document.createElement("script");
      responsee.setAttribute("id", "responseeScript");
      responsee.setAttribute("src", "../../../assets/valurite-js/responsee.js");
      document.body.appendChild(responsee);

      }
      else if(pagename == "valuritehome")
      {
        var myEle = document.getElementById("responseeScript");
        if(myEle)
        {
        document.getElementById("responseeScript").remove();
        }
      var responsee = document.createElement("script");
      responsee.setAttribute("id", "responseeScript");
      responsee.setAttribute("src", "../../../assets/valurite-js/responsee.js");
      document.body.appendChild(responsee);

      myEle = document.getElementById("carouselScript");
      if(myEle)
      {
      document.getElementById("carouselScript").remove();
      }
      var carousel = document.createElement("script");
      carousel.setAttribute("id", "carouselScript");
      carousel.setAttribute("src", "../../../assets/owl-carousel/owl.carousel.js");
      document.body.appendChild(carousel);

      setTimeout( function(){
      myEle = document.getElementById("templateScript");
      if(myEle)
      {
      document.getElementById("templateScript").remove();
      }
      var template = document.createElement("script");
      template.setAttribute("id", "templateScript");
      template.setAttribute("src", "../../../assets/valurite-js/template-scripts.js");
      document.body.appendChild(template);
      }, 100 );

      }
      else
      {
        var myEle = document.getElementById("responseeScript");
        if(myEle)
        {
        document.getElementById("responseeScript").remove();
        }
        var responsee = document.createElement("script");
        responsee.setAttribute("id", "responseeScript");
        responsee.setAttribute("src", "../../../assets/valurite-js/responsee.js");
        document.body.appendChild(responsee);
      }

    });
  }

  // fetchResults(callback: () => void) {
  //   alert('dfhhdfhd')
  //   callback(); // this is line 4
  // }

  

}

