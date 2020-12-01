/**
 * Reset Password component
 * this feature enables the users to reset their current password with new password
 by filling some required fields with validations in it. 
 */
import { Component, OnInit, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router'
import { MenuService } from '../../common-services/menu.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';//custom async loading spinner
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from 'jquery';
declare var jQuery: any;
declare var require: any;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, AfterViewInit {
  username: any;
  password: any;
  constructor(private route: Router, public trigger: MenuService, private spinnerService: Ng4LoadingSpinnerService) {
    this.trigger.componentMethodCalledreset$.subscribe(
      (res) => {
        this.username = res.username;
        this.password = res.password;
      }
    );
  }
  //method to call parent component to close this child component div
  @Output() childEvent = new EventEmitter<string>();
  callParent(data: any) {
    this.childEvent.next(data);
  }

  displays = 'block';
  formdata;
  //Method used to make the fields mandatory
  ngOnInit() {
    this.formdata = new FormGroup({
      upassword: new FormControl("", Validators.compose([
        Validators.required
      ])),
      cpassword: new FormControl("", Validators.compose([
        Validators.required
      ]))
    });
  }
  //Method used to validate the fields with the required pattern 
  ngAfterViewInit() {
    var myInput = (<HTMLInputElement>document.getElementById("upassword"));
    var letter = document.getElementById("letter");
    var capital = document.getElementById("capital");
    var number = document.getElementById("number");
    var length = document.getElementById("length");
    var specialcharacter = document.getElementById("specialcharacter");
    var spaces = document.getElementById("spaces");

    myInput.onkeyup = function () {
      // Validate lowercase letters
      var lowerCaseLetters = /[a-z]/g;
      if (myInput.value.match(lowerCaseLetters)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");
      } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
      }
      // Validate capital letters
      var upperCaseLetters = /[A-Z]/g;
      if (myInput.value.match(upperCaseLetters)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");
      } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
      }
      // Validate numbers
      var numbers = /[0-9]/g;
      if (myInput.value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
      } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
      }
      // Validate length
      if (myInput.value.length >= 8 && myInput.value.length <= 20) {
        length.classList.remove("invalid");
        length.classList.add("valid");
      } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
      }
      // Validate special character
      var specialchar = /[!,%,&,@,#,$,^,*,?,_,~]/g;
      if (myInput.value.match(specialchar)) {
        specialcharacter.classList.remove("invalid");
        specialcharacter.classList.add("valid");
      } else {
        specialcharacter.classList.remove("valid");
        specialcharacter.classList.add("invalid");
      }
      // Validate special character
      var space = /[\s]/g;
      if (myInput.value.match(space)) {
        spaces.classList.remove("valid");
        spaces.classList.add("invalid");
      } else {
        spaces.classList.remove("invalid");
        spaces.classList.add("valid");
      }
    }

    $('#cpassword, #upassword').on('input', function () {
      var upassword = $('#upassword').val();
      var cpassword = $('#cpassword').val();
      // condition to check new and confirm passwords to visible/hide alert msgs 
      if (cpassword != "") {
        if (cpassword == upassword) {
          $(".updateresponse").css('visibility', 'hidden');
        } else {
          $(".updateresponse").css('visibility', 'hidden');
        }
      }
      else {
        $(".updateresponse").css('visibility', 'hidden');
      }
    });

    $(".boxdesign").change(function () {
      if ($(this).val() != "") {
        $(this).next().addClass("labcontrol");
      }
      else {
        $(this).next().removeClass("labcontrol");
      }
    });
  }

  display = 'none';
  //Method to display Modal
  openModal() {
    this.display = 'block';
  }
  //Method used to navigate to login page
  triggerlogin() {
    this.route.navigate(['login']);
  }
  editted: any = "alert-danger";
  //method to check whether the required fields satisfies to visible/hide the alert msgs
  updateSubmit() {
    try {
      $(".updateresponse").css('visibility', 'hidden');
      var upassword = $('#upassword').val();
      var cpassword = $('#cpassword').val();
      var obj = { username: this.username, password: this.password, upassword: upassword, updatepassword: "true" };
      var letter = document.getElementById("letter");
      var capital = document.getElementById("capital");
      var number = document.getElementById("number");
      var length = document.getElementById("length");
      var specialcharacter = document.getElementById("specialcharacter");
      var spaces = document.getElementById("spaces");

      if (letter.className == "valid" && capital.className == "valid" && number.className == "valid" && length.className == "valid" && specialcharacter.className == "valid" && spaces.className == "valid") {
        $(".updateresponse").css('visibility', 'hidden');
        if (cpassword == upassword) {
          $(".updateresponse").css('visibility', 'hidden');
          this.spinnerService.show();
          this.trigger.updatePasswordpost(obj).subscribe((res) => {
            this.spinnerService.hide();
            if (res.status == "valid") {
              this.openModal();
            } else {
              this.editted = "alert-danger";
              $(".updateresponse").css('visibility', 'visible');
              $("#updatetext").text("Password update failed! Please contact admin.");
            }
          });
        } else {
          this.editted = "alert-danger";
          $(".updateresponse").css('visibility', 'visible');
          $("#updatetext").text("confirm password is not matched to new password.");
        }
      } else {
        this.editted = "alert-danger";
        $(".updateresponse").css('visibility', 'visible');
        $("#updatetext").text("Please follow the instructions.");
      }
    }
    catch (ex) {
    }
  }
}








