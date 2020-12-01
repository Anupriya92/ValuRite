import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css',
  
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
export class AboutusComponent implements OnInit {
  loginpopup: boolean = false;
  registrationpopup: boolean = false;
  constructor() { }

  ngOnInit() {
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
