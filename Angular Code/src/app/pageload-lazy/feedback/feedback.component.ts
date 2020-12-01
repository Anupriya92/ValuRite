/**
 * Feedback component
 * this feature enables the users to give their feedback by filling some required fields 
 with validations in it. 
 */
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminLoginServiceService } from '../../common-services/admin-service.service';
var $ = require("jquery")
//A simple JavaScript alert manager.
const JSAlert = require('js-alert');
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  emailalert: any = "";
  toEmail: any;
  emailFlag: boolean;
  //method to call parent component to close this child component div
  @Output() childEvent = new EventEmitter<string>();
  callParent(data: any) {
    this.childEvent.next(data);
  }

  constructor(private service: AdminLoginServiceService) { }
  display = 'block';
  reset() {
    $(".emailclass").css('visibility', 'hidden');
    $('#emailid').val("");
    this.ngOnInit();
  }
  //after selecting submit button, the mail is sent and alert msg will be displayed and the textboxes gets reset 
  loginSubmit(data: any) {
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
      ]))
    });
    // Getting Email_Flag Param//
    this.service.paramEmailFlag().subscribe(res => {
      this.emailFlag = res[1].param_value;
      this.toEmail = res[0].param_value
    });
  }
}
