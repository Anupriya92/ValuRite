/**
 * Admin-reset password component
 * this feature is used by admin users to reset the password manually or by generating automatic passwords
 by filling some required fields with validations in it. 
 */
import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminLoginServiceService } from '../../common-services/admin-service.service';
import { Observable } from 'rxjs/Observable';
import { isNullOrUndefinedorEmptyString, customIsNullOrUndefined } from '../../../../utils/admin_isNullorUndefinedorEmptyString';
//A simple JavaScript alert manager.
const JSAlert = require('js-alert');
import generatePassword from '../../../../utils/admin_generatepassword';//to generate automatic passwords
declare var require: any;
@Component({
  selector: 'app-admin-reset-password',
  templateUrl: './admin-reset-password.component.html',
  styleUrls: ['./admin-reset-password.component.css','../../../assets/css/admin.css',
  '../../../assets/css/bootstrap.min.css','../../../assets/valurite-css/font-awesome.min.css']
})
export class AdminResetPasswordComponent implements OnInit, AfterViewInit {
  retype_password: any;
  show: boolean;
  pass: any;
  data: any;
  manualPwd;
  retypePwd: string;
  username: any;
  row_password: any;
  password: any;
  CheckUncheckHeader: any;
  myform: FormGroup;
  formdata: FormGroup;
  companies: string[] = [];
  companyDisabled = false;
  userDisabled: boolean;
  users: string[] = [];
  tempUsers: string[] = [];
  userlogemail;
  emailFlag: boolean;
  fromEmail: any;
  companyName;
  public isPasswordGenerated: boolean;

  constructor(public service: AdminLoginServiceService) { this.show = false; }

  ngAfterViewInit() {
    // $('.boxdesign').change(function () {
    //   if ($(this).val() !== '') {
    //     $(this).next().addClass('labcontrol');
    //   } else {
    //     $(this).next().removeClass('labcontrol');
    //   }
    // });
  }
  //Method to validate email textbox
  validateEmail(sEmail: string): boolean {
    const filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(sEmail)) {
      return true;
    } else {
      return false;
    }
  }
  //method to make the required fields mandatory 
  ngOnInit() {
    this.fetchCompanyNames();
    this.getUserName();
    this.formdata = new FormGroup({
      username: new FormControl('', Validators.compose([Validators.required])),
      companyname: new FormControl('', Validators.compose([Validators.required])),
      manual_pwd: new FormControl('', Validators.compose([Validators.required])),
      retype_pwd: new FormControl('', Validators.compose([Validators.required]))
    });
    const generatebtn = $('#generatepasswrd');
    generatebtn.attr('disabled', 'disabled');
    // Getting Email_Flag Param//
    this.service.paramEmailFlag().subscribe(res => {
      this.fromEmail = res[0].param_value;
      this.emailFlag = res[1].param_value;
    })
  }
  //to fetch the usernames from db
  getUserNames(): Observable<any> {
    return this.service.getUserNames();
  }
  getUserName() {
    let userNames: any[] = [];
    let comapany: any
    this.getUserNames().subscribe(companyNamesFromDB => {
      userNames = companyNamesFromDB;
      this.users = [];
      for (const user of userNames) {
        this.users.push(user.ContactDetails.EmailID);
      }
      this.companyDisabled = false;
    });
  }
  modifyClass(elementid: string, addClassName: string, removeClassName: string) {
    if (elementid === "" || addClassName === "" || removeClassName === "") {
      return console.log("Invalid Element Id or classname");
    }
    $('p#' + elementid).removeClass(removeClassName);
    $('p#' + elementid).addClass(addClassName);
  }

  change() {
    const letter = document.getElementById("letter");
    const capital = document.getElementById("capital");
    const number = document.getElementById("number");
    const length = document.getElementById("length");
    const specialcharacter = document.getElementById("specialcharacter");
    const spaces = document.getElementById("spaces");
    // Idea is to form a Regular Expression map, test the keys 
    // and pass the value to relevant functions
    const RegexMap = new Map();
    RegexMap.set(/[a-z]/g, "letter");
    RegexMap.set(/[A-Z]/g, "capital");
    RegexMap.set(/[0-9]/g, "number");
    RegexMap.set(/[!,%,&,@,#,$,^,*,?,_,~]/g, "specialcharacter");
    RegexMap.set(/[\s]/g, "spaces");
    RegexMap.forEach((value, key, map) => {
      //validate the spaces
      if (this.manualPwd.match(key)) {
        (value !== "spaces") ? this.modifyClass(value, "valid", "invalid")
          : this.modifyClass(value, "invalid", "valid");
      } else {
        (value !== "spaces") ? this.modifyClass(value, "invalid", "valid")
          : this.modifyClass(value, "valid", "invalid");
      }
    });
    //validate the length of the charcters
    if (this.manualPwd.length >= 8 && this.manualPwd.length <= 20) {
      this.modifyClass("length", "valid", "invalid")
    } else {
      this.modifyClass("length", "invalid", "valid");
    }
    const submitBtn = document.getElementById("btnSubmit");
    const isNotEmpty = [this.userlogemail, this.manualPwd, this.retypePwd].every((value) =>
      value !== "" && value !== undefined && value !== null
    );
    const classNameArray = [letter.className, capital.className,
    number.className, length.className, specialcharacter.className,
    spaces.className];
    if (classNameArray.every((className) => className === "valid") && isNotEmpty) {
      submitBtn.removeAttribute('disabled');
    } else {
      submitBtn.setAttribute('disabled', 'disabled');
    }
  }
  //Method to view the password in text format by clicking the eye icon
  passwrd() {
    $(".toggle").toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if ($(".manualPassword").attr("type") == "password") {
      $(".manualPassword").attr('type', 'text');
    } else {
      $(".manualPassword").attr('type', 'password');
    }
  }
  //Method to view the password in text format by clicking the eye icon
  passwd() {
    $(".toggle-password").toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if ($(".manualpd").attr("type") == "password") {
      $(".manualpd").attr('type', 'text');
    } else {
      $(".manualpd").attr('type', 'password');
    }
  }

  Reset_Click() {
    this.isPasswordGenerated = false;
    this.formdata.reset();
    const passwordTextBox: HTMLElement = document.getElementsByName('row_password')[0];
    passwordTextBox.setAttribute('text', '');
    const generatebtn = $('#generatepasswrd');
    generatebtn.attr('disabled', 'disabled');
    const submitbtn = $('#btnSubmit');
    submitbtn.attr('disabled', 'disabled');
    $('p:not(#spaces)').removeClass("valid").addClass("invalid");
    this.ngOnInit();
  }
  //method to generate the password
  generatePwd() {
    const password = generatePassword();
    this.manualPwd = password;
    this.retypePwd = this.manualPwd;
    this.isPasswordGenerated = true;
    this.change();
  }

  Submit_Click(form) {
    const obj = {};
    const tempPwd = document.getElementById('retPass') as HTMLInputElement;
    this.retypePwd = tempPwd.value;
    // Random Password Generation needs email to be sent
    if (this.isPasswordGenerated) {
      obj['update_password'] = 'false';
    } else {
      obj['update_password'] = 'true';
    }
    // ----- For submit validations -----
    if (this.userlogemail === '' ||
      this.manualPwd === undefined ||
      this.retypePwd === '') {
      JSAlert.alert('Please fill the required fields');
    } else {
      // -----for validation ----
      obj['username'] = this.userlogemail[0].text;
      obj['password'] = this.retypePwd;
      obj['flag'] = this.emailFlag;
      obj['fromEmail'] = this.fromEmail;
      obj['screenflag'] = 1;

      if (this.manualPwd === this.retypePwd) {
        this.service.newuserpost(obj).subscribe((res) => {
          JSAlert.alert('Password changed successfully and emailed to the User.');
          this.Reset_Click();
        });
      } else {
        JSAlert.alert('Password is not matching!!!');
      }
    }
  }
  //to fetch the company names from db
  fetchCompanyNames() {
    let companyNames: any[] = [];
    this.getCompanyNames().subscribe(companyNamesFromDB => {
      companyNames = companyNamesFromDB;
      this.companies = [];
      for (const company of companyNames) {
        this.companies.push(company.CompanyName);
      }
      this.companyDisabled = false;
    });
  }
  getCompanyNames(): Observable<any> {
    return this.service.getCompanyNames();
  }
  //method to disable generate password button until comapny and users are selected
  onCompanyItemSelect(value: any) {
    this.userlogemail = '';
    const generatebtn = $('#generatepasswrd');
    generatebtn.attr('disabled', 'disabled');
    this.fetchCompanyUsers(value.text);
    this.userDisabled = false;
  }
  //to fetch company users from db
  fetchCompanyUsers(companyName) {
    this.getCompanyUsers(companyName).subscribe(companyUsersFromDB => {
      this.users = [];
      this.tempUsers = [];
      // response is an array of objects
      for (const user of companyUsersFromDB) {
        this.tempUsers.push(user.contact_details.email_id);
      }
      // Using Spread Syntax
      this.users = [];
      this.users.push(...(this.tempUsers));
    });
  }
  //method to enable generate password button after company and users are selected
  onUserItemSelect(value: any) {
    const generatebtn = $('#generatepasswrd');
    generatebtn.removeAttr('disabled');
    this.getUsercompany(value.text);
    // Checking whether the selected value exists in the Users List
    const isUseronList: string = this.users.find((element) => {
      return element === value.text;
    });

    if (isNullOrUndefinedorEmptyString(isUseronList)) {
      for (const username of this.userlogemail) {
        if (username.text === value.text) {
          const index = this.userlogemail.indexOf(username);
          if (index === -1) {
            JSAlert.alert('Error: The Index does not exists');
            return;
          }
          this.userlogemail.splice(index, 1);
        } else {
        }
      }
    }
  }
  //to fetch only approved users from company
  getCompanyUsers(companyName: string): Observable<any> {
    return this.service.getOnlyApprovedUsers(companyName);
  }
  //to disable generate password button when users textbox is null
  onUserItemRemoved(value: any) {
    const generatebtn = $('#generatepasswrd');
    generatebtn.attr('disabled', 'disabled');
  }
  //to disable generate password button when company textbox is null
  onCompanyItemRemoved(value: any) {
    this.userlogemail = '';
    this.formdata.reset();
    const passwordTextBox: HTMLElement = document.getElementsByName('row_password')[0];
    passwordTextBox.setAttribute('text', '');
    const generatebtn = $('#generatepasswrd');
    generatebtn.attr('disabled', 'disabled');
    this.fetchAndRemoveCompanyUsers(value.id);
  }
  fetchAndRemoveCompanyUsers(companyName) {
    this.getCompanyUsers(companyName).subscribe(companyUsersFromDB => {
      const removedUsers: string[] = [];
      this.users = [];
      // response is an array of objects
      for (const user of companyUsersFromDB) {
        removedUsers.push(user.contact_details.email_id);
        const index = this.tempUsers.indexOf(user.contact_details.email_id);
        if (index !== -1) {
          this.tempUsers.splice(index, 1);
        } else {
        }
      }
      // Using Spread Syntax
      this.users.push(...(this.tempUsers));

      // We need to remove the previously added users of removed company on the ngModel
      if (!(customIsNullOrUndefined(this.userlogemail))) {
        for (const username of this.userlogemail) {
          if (removedUsers.find((element) => {
            if (username.text === element) {
              return true;
            } else {
              return false;
            }
          })) {
            const index = this.userlogemail.indexOf(username);
            if (index === -1) {
              JSAlert.alert('Error: The Index does not exists');
              return;
            }

            this.userlogemail.splice(index, 1);
          } else {
          }
        }
      }

    });
  }
  //Method to get approved users company 
  getUsercompany(value: any) {
    this.service.getApprovedUserscompany(value).subscribe((res) => {
      const comp = res[0].company_institute;
      this.companyName = [comp];
      this.companyDisabled = false;
    });
  }
}

