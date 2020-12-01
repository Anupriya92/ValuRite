import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminLoginServiceService } from '../../common-services/admin-service.service';

var $ = require("jquery")
const JSAlert = require('js-alert');
@Component({
  selector: 'app-pagefeedback',
  templateUrl: './pagefeedback.component.html',
  styleUrls: ['./pagefeedback.component.css',
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
export class PagefeedbackComponent implements OnInit {
  emailalert: any = "";
  toEmail: any;
  emailFlag: boolean;
  loginpopup: boolean = false;
  registrationpopup: boolean = false;

  //method to call parent component to close this child component div
  // @Output() childEvent = new EventEmitter<string>();
  // callParent(data: any) {
  //   this.childEvent.next(data);
  // }

  constructor(private service: AdminLoginServiceService) { }
  display = 'block';
  reset() {
    $(".emailclass").css('visibility', 'hidden');
    $('#emailid').val("");
    this.ngOnInit();
  }
  submitFeedback(data: any) {
    data['emailFlag'] = this.emailFlag;
    data['toEmailID'] = this.toEmail;
    this.service.feedbackdetails(data, this.formdata).subscribe((res) => {
      JSAlert.alert('Your Feedback has been successfully submitted!!!');
      this.reset();
    });
  }

  ngAfterViewInit() {
    //validating the email textbox with its length and pattern to hide or visible the alert msg
    function validateEmail(sEmail) {
      var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      if (filter.test(sEmail)) {
        return true;
      }
      else {
        return false;
      }
    }



$('#feedbackemailid').on('input', function () {
  if ($('#feedbackemailid').val() != "") {
    if ($('#feedbackemailid').val().length < "254") {
      if (validateEmail($('#feedbackemailid').val())) {
        $(".emailclass").css('visibility', 'hidden');
      }
      else {
        $(".emailclass").css('visibility', 'hidden');
      }
    } else {
      $(".emailclass").css('visibility', 'visible');
      $("#emailtext").text("You Reached max character.");
    }
  } else {
  }
});
  }
// Email Validation//
validateEmail(sEmail) {
var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
if (filter.test(sEmail)) {
  return true;
}
else {
  return false;
}
}
//Validation for email textbox by checking null and false values,and Error msg will displayed 
onKey(event: any) {
var emailid = $('#feedbackemailid').val();
const emailvalid = this.validateEmail(emailid);
if (event.target.id === 'useremail') {
  if (emailid === '') {
    document.getElementById('useremail').style.display = 'block';
    $('#useremail').text('Please fill the field');
  } else if (emailvalid === false) {
    document.getElementById('useremail').style.display = 'block';
    $('#useremail').text('Please Enter Valid Email ID');
  } else {
    document.getElementById('useremail').style.display = 'none';
  }
}
}
formdata;
//Validation for each textboxes by checking patterns and mandatory fields,until that submit button will be disabled
ngOnInit() {
this.formdata = new FormGroup({
  username: new FormControl("", Validators.compose([
    Validators.required,
  ])),
  emailid: new FormControl("", Validators.compose([
    Validators.required,
    Validators.maxLength(254),
    Validators.pattern(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)
  ])),
  Organization: new FormControl("", Validators.compose([
    Validators.required
  ])),
  feedback: new FormControl("", Validators.compose([
    Validators.required
  ])),
  feedbacktype: new FormControl('', Validators.compose([Validators.required])),
});
// Getting Email_Flag Param//
this.service.paramEmailFlag().subscribe(res => {
  this.emailFlag = res[1].param_value;
  this.toEmail = res[0].param_value
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
