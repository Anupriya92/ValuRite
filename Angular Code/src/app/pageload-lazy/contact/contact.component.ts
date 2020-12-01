import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminLoginServiceService } from '../../common-services/admin-service.service';
import { debuglog } from 'util';
const JSAlert = require('js-alert');
// var $ = require("jquery")
declare var $:any;
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css',
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
export class ContactComponent implements OnInit {
  loginpopup: boolean = false;
  registrationpopup: boolean = false;
  formdata;
  constructor(private service: AdminLoginServiceService) { }

  ngOnInit() {
    this.formdata = new FormGroup({
      userName: new FormControl("", Validators.compose([
        Validators.required,
      ])),
      emailId: new FormControl("", Validators.compose([
        Validators.required,
        Validators.maxLength(254),
        Validators.pattern(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)
      ])),
      subject: new FormControl("", Validators.compose([
        Validators.maxLength(254)
      ])),
      message: new FormControl("", Validators.compose([
        Validators.required
      ]))
    });
  }

  


  submitEquiryDetails(data: any) {
    // debugger
    // console.log("dasfa")
    // data['emailFlag'] = this.emailFlag;
    // data['toEmailID'] = this.toEmail;
    this.service.enQuirydetails(this.formdata.value).subscribe((res) => {
      JSAlert.alert('Your message has been successfully submitted!!!');
      //this.reset();
    });
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
