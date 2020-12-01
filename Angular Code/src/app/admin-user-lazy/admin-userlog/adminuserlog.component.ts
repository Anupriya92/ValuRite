/* Feature: User log details (username, login, logout time and duration) will be displayed in the datatable
based on the search parameter 
*/
import { async } from '@angular/core/testing';
import { Component, OnInit, OnChanges } from '@angular/core';
import * as $ from 'jquery';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { AdminLoginServiceService } from '../../common-services/admin-service.service';
import { DISABLED } from '@angular/forms/src/model';
import { Observable } from 'rxjs/Observable';
const JSAlert = require('js-alert');
import { isNullOrUndefinedorEmptyString, customIsNullOrUndefined } from '../../../../utils/admin_isNullorUndefinedorEmptyString';
import { ifError } from 'assert';

@Component({
  selector: 'app-adminuserlog',
  templateUrl: './adminuserlog.component.html',
  styleUrls: ['./adminuserlog.component.css','../../../assets/css/bootstrap.min.css']
})

export class AdminUserlogComponent implements OnInit {

  userlogemail;
  companyName;
  showUserlog: Boolean;
  private jsonData;
  formdata: FormGroup;
  Userobject: Object[];
  users: string[] = [];
  tempUsers: string[] = [];
  companies: string[] = [];
  companyDisabled = false;
  userDisabled: boolean;
  private userLoginDetail: object[] = [];

  constructor(private router: Router, public service: AdminLoginServiceService) { }

  ngOnInit() {
    // Get the Company Names
    this.fetchCompanyNames();
    // Get the User Names
    this.getUserName();
    this.showUserlog = false;
    this.formdata = new FormGroup({
      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(254),
        Validators.pattern(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)
      ])),
    });
  }

  Reset_Click() {
    this.formdata.reset();
    this.showUserlog = false;
    this.getUserName();
    this.userDisabled = false;
  }

  // Submit Click for getting the data
  Onuser_Action() {
    this.userLoginDetail = [];
    // If company or user name is not selected then it returns
    if (isNullOrUndefinedorEmptyString(this.companyName) && isNullOrUndefinedorEmptyString(this.userlogemail)) {
      JSAlert.alert('Please Enter Either Company Or User');
      return;
    }
    if (isNullOrUndefined(this.userlogemail) || this.userlogemail.length === 0) {
      const selectedComp = this.companyName[0].text;
      // If 'All' is selected retrieves all the data irrespective of Company and User Name
      if (selectedComp === 'All') {
        this.service.getAllCompanyUserlog().subscribe(userLogList => {
          this.Userobject = userLogList;
          if (!this.emptyResponseValidation(userLogList)) {
            for (const userLog of userLogList) {
              const obj: object = {};
              obj['Company Name'] = userLog.companyname;
              obj['User Name'] = userLog.username;
              obj['Login Time'] = new Date(userLog.Login).toLocaleString();
              //  If logout time is not present (ie., the user is currently logged in) then display 'NA'
              if (userLog.logoutTime === 'NA') {
                obj['Logout Time'] = 'NA';
              } else {
                obj['Logout Time'] = new Date(userLog.Logout).toLocaleString();
              }
              obj['Duration (hh:mm:ss)'] = userLog.duration;
              this.userLoginDetail.push(obj);
            }
            // Passing the Data to Sort table
            this.jsonData = {
              tablesetting:
                {
                  checkbox: false,
                  exportflag: false
                },
              columndef: [],
              rowData: this.userLoginDetail,
              id: 'userLogSortTable'
            };
            this.showUserlog = true;
          }
        });
      } else {
        // If Company Name alone is selected
        const company = this.companyName[0].text;
        this.service.getUserlogForCompany(company).subscribe(userLogList => {
          this.Userobject = userLogList;
          if (!this.emptyResponseValidation(userLogList)) {
            for (const userLog of userLogList) {
              const obj: object = {};
              obj['Company Name'] = userLog.companyname;
              obj['User Name'] = userLog.username;
              obj['Login Time'] = new Date(userLog.Login).toLocaleString();
              if (userLog.logoutTime === 'NA') {
                obj['Logout Time'] = 'NA';
              } else {
                obj['Logout Time'] = new Date(userLog.Logout).toLocaleString();
              }
              obj['Duration (hh:mm:ss)'] = userLog.duration;
              this.userLoginDetail.push(obj);
            }
            // Passing the Data to Sort table
            this.jsonData = {
              tablesetting:
                { checkbox: false },
              columndef: [],
              rowData: this.userLoginDetail,
              id: 'userLogSortTable'
            };
            this.showUserlog = true;
          }
        });
      }
    } else {
      // If UserName alone is selected
      if (isNullOrUndefined(this.companyName) || this.companyName.length === 0) {
        const userlogname = this.userlogemail[0].text;
        this.service.getUserlogs(userlogname).subscribe(userLogList => {
          this.Userobject = userLogList;
          if (!this.emptyResponseValidation(userLogList)) {
            for (const userLog of userLogList) {
              const obj: object = {};
              obj['Company Name'] = userLog.companyName;
              obj['User Name'] = userLog.userName;
              obj['Login Time'] = new Date(userLog.loginTime).toLocaleString();
              if (userLog.logoutTime === 'NA') {
                obj['Logout Time'] = 'NA';
              } else {
                obj['Logout Time'] = new Date(userLog.logoutTime).toLocaleString();
              }
              obj['Duration (hh:mm:ss)'] = userLog.duration;
              this.userLoginDetail.push(obj);
            }
            // Passing the Data to Sort table
            this.jsonData = {
              tablesetting:
                { checkbox: false },
              columndef:
                [],
              rowData: this.userLoginDetail,
              id: 'userLogSortTable'
            };
            this.showUserlog = true;
          }
        });
      } else {
        // Both Company and Username are selected for Getting the User log of Single user
        const userlogname = this.userlogemail[0].text;
        const company = this.companyName;
        if (company !== null && userlogname !== null) {
          this.service.getUserlogs(userlogname).subscribe(userLogList => {
            this.Userobject = userLogList;
            if (!this.emptyResponseValidation(userLogList)) {
              for (const userLog of userLogList) {
                const obj: object = {};
                obj['Company Name'] = userLog.companyName;
                obj['User Name'] = userLog.userName;
                obj['Login Time'] = new Date(userLog.loginTime).toLocaleString();
                if (userLog.logoutTime === 'NA') {
                  obj['Logout Time'] = 'NA';
                } else {
                  obj['Logout Time'] = new Date(userLog.logoutTime).toLocaleString();
                }
                obj['Duration (hh:mm:ss)'] = userLog.duration;
                this.userLoginDetail.push(obj);
              }
              // Passing the data to Sort table
              this.jsonData = {
                tablesetting:
                  { checkbox: false },
                columndef:
                  [],
                rowData: this.userLoginDetail,
                id: 'userLogSortTable'
              };
              this.showUserlog = true;
            }
          });
        }
      }
    }
  }

  // Checking the Response from DB is empty 
  emptyResponseValidation(response): boolean {
    if (customIsNullOrUndefined(response) || response.length === 0) {
      JSAlert.alert('No records found');
      this.showUserlog = false;
      return true;
    } else {
      return false;
    }
  }

  // Fetching the UserName based on Company selection from the DB
  fetchCompanyUsers(companyName) {
    this.getCompanyUsers(companyName).subscribe(companyUsersFromDB => {
      this.users = [];
      this.tempUsers = [];
      // response is an array of objects
      for (const user of companyUsersFromDB) {
        this.tempUsers.push(user.ContactDetails.EmailID);
      }
      // Using Spread Syntax
      this.users.push(...(this.tempUsers));
    });
  }

  getCompanyUsers(companyName: string): Observable<any> {
    return this.service.getCompanyUsers(companyName);
  }

  // Fetching the Company Name from the DB
  fetchCompanyNames() {
    let companyNames: any[] = [];
    this.getCompanyNames().subscribe(companyNamesFromDB => {
      companyNames = companyNamesFromDB;
      this.companies = [];
      this.companies.push('All');
      for (const company of companyNames) {
        this.companies.push(company.CompanyName);
      }
      this.companyDisabled = false;
    });
  }

  /* Service Called using these functions*/
  getCompanyNames(): Observable<any> {
    return this.service.getCompanyNames();
  }

  getUserName() {
    let userNames: any[] = [];
    this.getUserNames().subscribe(companyNamesFromDB => {
      userNames = companyNamesFromDB;
      this.users = [];
      // this.users.push('All');
      for (const user of userNames) {
        this.users.push(user.ContactDetails.EmailID);
      }
      this.companyDisabled = false;
    });
  }

  /* Service Called using these functions*/
  getUserNames(): Observable<any> {
    return this.service.getUserNames();
  }

  onUserItemRemoved(value: any) {
    console.log(value.text + ' Item Removed from User ');
  }

  // Trigger when companyname is selected based on that username will be fetched
  onCompanyItemSelect(value: any) {
    this.userlogemail = '';
    this.fetchCompanyUsers(value.text);
    const data = (value.text);
    if (data === "All") {
      this.userDisabled = true;
    } else {
      this.userDisabled = false;
    }
  }

  onUserItemSelect(value: any) {
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
          console.log(username.text + 'is a valid user');
        }
      }
    }
  }

  // Method for removing companyname
  onCompanyItemRemoved(value: any) {
    this.fetchAndRemoveCompanyUsers(value.id);
    this.userDisabled = false;
    this.getUserName();
  }

  // Method for fetching companyusers and removing the users in ngselect
  fetchAndRemoveCompanyUsers(companyName) {
    this.getCompanyUsers(companyName).subscribe(companyUsersFromDB => {
      const removedUsers: string[] = [];
      this.users = [];
      // response is an array of objects
      for (const user of companyUsersFromDB) {
        removedUsers.push(user.ContactDetails.EmailID);
        const index = this.tempUsers.indexOf(user.ContactDetails.EmailID);
        if (index !== -1) {
          this.tempUsers.splice(index, 1);
        } else {
          console.log('Can\'t Find the index of temp users');
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
            console.log(username.text + 'is a valid user');
          }
        }
      }
    });
  }
}
