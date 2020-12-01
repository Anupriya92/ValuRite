import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
declare var $:any;


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css',
  '../../../assets/valurite-css/components.css',
  '../../../assets/valurite-css/responsee.css',
  '../../../assets/owl-carousel/owl.carousel.css',
  '../../../assets/owl-carousel/owl.theme.css',
  //'../../../assets/valurite-css/magnific-popup.css',
  '../../../assets/valurite-css/font-awesome.min.css',
  //'../../../assets/valurite-css/faq-accordin.css',
  '../../../assets/valurite-css/template-style.css',
  '../../../assets/css/style.css']
})
export class HomePageComponent implements OnInit {
  public sliders = [];
  public mobilesliders = [];
  public count = {};
  public countSlide = {};
  public radiocheck = null;
  public radiocheckMobile = null;
  stopCondition = false;
  stopConditionMobile = false;
  loginpopup: boolean = false;
  registrationpopup: boolean = false;
  title = 'Timeline from Json';
  constructor(private httpService: HttpClient) {
    var i = 0;
    var j = 0;
    //this is for slider event every three seconds one time changing the values in UI.
    Observable.interval(3000)
    .takeWhile(() => !this.stopCondition)
    .subscribe((val) => { 
      if(this.sliders.length > 0)
      {
        this.count = this.sliders[i];
        this.radiocheck = i;
        i++;
      }
      if(this.sliders.length == i)
      {
        i=0;
      }
    })
   
    Observable.interval(3000)
    .takeWhile(() => !this.stopConditionMobile)
    .subscribe((val) => { 
      if(this.mobilesliders.length > 0)
      {
        this.countSlide = this.mobilesliders[j];
        this.radiocheckMobile = j;
        j++;
      }
      if(this.mobilesliders.length == j)
      {
        j=0;
      }
    })
   }
  arrTimeline: string [];

  
  ngOnInit(
  ) {
    this.sliders = [ 'assets/img/carousel-02.jpg','assets/img/carousel7.png','assets/img/Property-value-3-2.jpg',
    'assets/img/bg07.jpg', 'assets/img/carousel8.png']

    this.mobilesliders = [ 'assets/img/mobi-1.png', 'assets/img/mobi-2.png', 'assets/img/mobi-3.png','assets/img/mobi-4.png','assets/img/mobi-5.png']
    this.httpService.get('assets/Timeline.json').subscribe(
      data => {
         this.arrTimeline = data as string [];	 // FILL THE ARRAY WITH DATA.
        //  console.log(this.arrTimeline[1]);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  

  //   $(document).ready(function ($) {  
  //     // Owl Carousel                     
  //     var owl = $('.carousel-default');
  //     owl.owlCarousel({
  //       nav: true,
  //       dots: true,
  //       items: 1,
  //       loop: true,
  //       navText: ["&#xe605","&#xe606"],
  //       autoplay: true,
  //       autoplayTimeout: 5000,
  //     });
  
  // });


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

  

function newseventsFunction(content) {
  var news = document.getElementsByClassName("news-container")[0];
  var a = document.getElementById("newsBtn");
  var event = document.getElementsByClassName("events-container")[0];
  var b = document.getElementById("eventsBtn");
  if (content === "news") {
    a.style.display = "block";
    b.style.display = "none";

    a.style.border = "1px solid black";
    a.style.background = "#eeeeee";

    b.style.border = "none";
    b.style.background = "none";

    a.classList.add("active-element");
    b.classList.remove("active-element");
    b.classList.add("events:hover");
  } 
  else {
    a.style.display = "none";
    b.style.display = "block";

    a.style.border = "none";
    a.style.background = "none";

    b.style.border = "1px solid black";
    b.style.background = "#eeeeee";

    a.classList.remove("active-element");
    b.classList.add("active-element");
    a.classList.add("news:hover");

    
  }
}
  }


  radiocheck1(data: any)
  {
    this.stopCondition = true;
    this.radiocheck = data;
    this.count = this.sliders[data];
  }
  mobileNav(data:any) {
    this.stopConditionMobile = true;
    this.radiocheckMobile = data;
    this.countSlide = this.mobilesliders[data];
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



