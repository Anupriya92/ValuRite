/**
 * forgot Password component
 * this feature enables the users to change their password with new password
 by filling some required fields with validations in it. 
 */
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../common-services/menu.service';
import * as $ from 'jquery';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';//custom async loading spinner
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  public edited = "";
  //method to call parent component to close this child component div
  @Output() childEvent = new EventEmitter<string>();
  callParent(data: any) {
    this.childEvent.next(data);
  }

  constructor(private route: Router, private trigger: MenuService, private spinnerService: Ng4LoadingSpinnerService) { }
  displays = 'block';
  //method used while clicking submit method to check whether its valid or not
  forgotSubmit(form: any) {
    try {
      this.forgotresponse = "";
      this.logindata(form);
    }
    catch (ex) {
    }
  }
  //Method to clear the alert msg
  alertclear() {
    this.forgotresponse = "";
  }
  //method used to navigate the user to login page
  triggerlogin() {
    this.route.navigate(['login']);
  }

  display = 'none';
  //Method to display Modal
  openModal() {
    this.display = 'block';
  }

  forgotresponse: any = "";
  //method to get response whether it is valid or not
  logindata(data: any) {
    try {
      this.spinnerService.show();
      this.trigger.forgotpost(data).subscribe((res) => {
        this.spinnerService.hide();
        if (res.status == "valid") {
          this.openModal();
        } else if (res.status == "mailerror") {
          this.forgotresponse = "Mail is not respond.try Again!";
          this.edited = "alert-danger";
        }
        else if (res.status == "notexist") {
          this.forgotresponse = "Invalid Username!";
          this.edited = "alert-danger";
        }
        else {
          this.forgotresponse = "Data Error!";
          this.edited = "alert-danger";
        }
      });
    }
    catch (ex) {
    }
  }
  //Method used to navigate to login page when cancel button is clicked
  cancel() {
    this.route.navigate(['login']);
  }
  formdata;
  //method to validate textbox
  ngOnInit() {
    this.formdata = new FormGroup({
      fusername: new FormControl("", Validators.compose([
        Validators.required,
        Validators.maxLength(254),
        Validators.pattern(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)
      ]))
    });
  }
}
