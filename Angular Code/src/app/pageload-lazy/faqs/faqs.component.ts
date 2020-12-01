import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css',
  '../../../assets/valurite-css/components.css',
  '../../../assets/valurite-css/responsee.css',
  '../../../assets/owl-carousel/owl.carousel.css',
  '../../../assets/owl-carousel/owl.theme.css',
  //'../../../assets/valurite-css/magnific-popup.css',
  '../../../assets/valurite-css/font-awesome.min.css',
  '../../../assets/valurite-css/faq-accordin.css',
  '../../../assets/valurite-css/template-style.css',
  '../../../assets/css/style.css']
})
export class FaqsComponent implements OnInit {
  loginpopup: boolean = false;
  registrationpopup: boolean = false;
  constructor() { }

  ngOnInit() {


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

}
