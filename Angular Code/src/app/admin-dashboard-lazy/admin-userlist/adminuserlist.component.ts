// Feature:  Provides the Userdetails based on the given search criteria like Company Name, UserName, UserType, 
// No.of Days to Expire, Date range
import { Component, OnInit } from '@angular/core';
import { isNullOrUndefinedorEmptyString, customIsNullOrUndefined } from '../../../../utils/admin_isNullorUndefinedorEmptyString';
import { Http } from '@angular/http';
import { AdminLoginServiceService } from '../../common-services/admin-service.service';
import { Observable } from 'rxjs/Observable';
const JSAlert = require('js-alert');
import * as XLSX from 'xlsx';
declare var $: any;
declare var datepicker: any;

@Component({
  selector: 'app-adminuserlist',
  templateUrl: './adminuserlist.component.html',
  styleUrls: ['./adminuserlist.component.css','../../../assets/css/admin.css']
})
export class AdminUserlistComponent implements OnInit {

  public companyNameDisabled = false;
  public userNameDisabled = false;
  public rolenameDisabled = false;
  public userListCompanies;
  public userListUsers;
  public rolename;
  public noofdaysToExpire: number;
  public keywords: string;
  public companynames = [];
  public usernames = [];
  public rolenames = ['Admin','Comp app without lender','Comp with lender','Ind app without lender','User'];
  public maxDate = new Date();

  // Number TextBox Values
  public daysToExpire = {
    minValue: 0,
    maxValue: 2000,
    name: 'Days To Expire',
    errorMsg: ''
  };
  public errorMsgFlag = false;
  public showUserList = false;
  // UserList Variables
  public jsonData = {};
  public selectedUserListCompanies = [];
  public selectedUserListUsers = [];
  public selectedRoleNames = [];
  // Radio Button Disable Variables
  public disableDaysToExpire = false;
  public disableDateRange = false;
  private tempUsers: string[] = [];

  constructor(private http: Http, private loginService: AdminLoginServiceService) { }

  ngOnInit() {
    // Method call to fetch the companyname, rolename, username
    this.fetchCompanyNames();
    // this.fetchRoleNames();
    this.getUserName();
    // console.log("ss")
    //DatePickers
    $('#fromdate').datepicker({
      changeMonth: true,
      changeYear: true,
    });
    $('#todate').datepicker({
      changeMonth: true,
      changeYear: true,
    });
  }

  calenderUserList(event: any) {
    // JQuery UI DatePickers
    $('#fromdate').datepicker({
      changeMonth: true,
      changeYear: true,
      // maxDate: this.maxDate
    });
    $('#todate').datepicker({
      changeMonth: true,
      changeYear: true,
      // maxDate: this.maxDate
    });
    const id = $(event.target).closest('input')[0].id;
    $('#' + id).datepicker().datepicker('show');
  }

  getUserNames(): Observable<any> {
    return this.loginService.getUserNames();
  }
  // Method to get the username
  getUserName() {
    let userNames: any[] = [];
    this.getUserNames().subscribe(companyNamesFromDB => {
      userNames = companyNamesFromDB;
      this.usernames = [];
      // this.users.push('All');
      for (const user of userNames) {
        this.usernames.push(user.ContactDetails.EmailID);
      }
      this.companyNameDisabled = false;
    });
  }

  // Fetch Company Users
  fetchCompanyUsers(companyName) {
    this.getCompanyUsers(companyName).subscribe(companyUsersFromDB => {
      this.usernames = [];
      const selectedCompName = companyName
      if (companyUsersFromDB.length == 0) {
        JSAlert.alert('No users found for the selected company').then(() => {
          const selectcomp = this.userListCompanies.findIndex(x => x.text == selectedCompName);
          this.userListCompanies.splice(selectcomp, 1);
        });
      }
      // response is an array of objects
      for (const user of companyUsersFromDB) {
        this.tempUsers.push(user.ContactDetails.EmailID);
      }
      // Using Spread Syntax
      this.usernames.push(...(this.tempUsers));
    });
  }

// To Remove the users based on the company
  fetchAndRemoveCompanyUsers(companyName) {
    this.getCompanyUsers(companyName).subscribe(companyUsersFromDB => {
      const removedUsers: string[] = [];
      this.usernames = [];
      // response is an array of objects
      for (const user of companyUsersFromDB) {
        removedUsers.push(user.contact_details.email_id);
        const index = this.tempUsers.indexOf(user.ContactDetails.EmailID);
        if (index !== -1) {
          this.tempUsers.splice(index, 1);
        } else {
          console.log('Can\'t Find the index of temp usernames');
        }
      }
      // Using Spread Syntax
      this.usernames.push(...(this.tempUsers));
      // We need to remove the previously added usernames of removed company on the ngModel
      if (!(customIsNullOrUndefined(this.userListUsers))) {
        // Shallow Clone
        // Exception is the object inside the array is still passed by reference
        const tempObjArr = [...this.userListUsers];
        for (const username of tempObjArr) {
          if (removedUsers.find((element) => {
            if (username.text === element) {
              return true;
            } else {
              return false;
            }
          })) {
            const index = this.userListUsers.indexOf(username);
            if (index === -1) {
              JSAlert.alert('Error: The Index does not exists');
              return;
            }

            this.userListUsers.splice(index, 1);
            if (this.userListUsers.length === 0) {
              this.userNameDisabled = false;
            }
          } else {
            console.log(username.text + 'is a valid user');
          }
        }
      }
    });
  }

  // To Fetch Company Names for DropDown
  fetchCompanyNames() {
    let companyNames: any[] = [];
    this.getCompanyNames().subscribe(companyNamesFromDB => {
      companyNames = companyNamesFromDB;
      this.companynames = [];
      for (const company of companyNames) {
        this.companynames.push(company.CompanyName);
      }
      this.companyNameDisabled = false;
    });
  }

  // To Fetch Rolenames for User Type DropDown
  // fetchRoleNames() {
  //   this.roleName().subscribe(roleNamesFromDB => {
  //     this.rolenames = [];
  //     for (let rolename of roleNamesFromDB) {
  //       this.rolenames.push(rolename.rolename);
  //     }
  //   });

  // }

  //To Remove a Company Name
  onCompanyNameRemoved(value) {
    this.fetchAndRemoveCompanyUsers(value.id);
    if (this.userListCompanies.length == 0) {
      this.getUserName()
    }
  }

  // To Fetch the companyname Based on company selection
  onCompanyNameSelect(value) {
    this.fetchCompanyUsers(value.text);
    this.userNameDisabled = false;
  }

  onUserNameRemoved(value) {
    // On Removing a username
  }

    // On Selecting a user
    // Check the selected value exists in the Users List
  onUserNameSelect(value) {
    const isUseronList: string = this.usernames.find((element) => {
      return element === value.text;
    });
    if (isNullOrUndefinedorEmptyString(isUseronList)) {
      for (const username of this.userListUsers) {
        if (username.text === value.text) {
          const index = this.userListUsers.indexOf(username);
          if (index === -1) {
            JSAlert.alert('Error: The Index does not exists');
            return;
          }
          this.userListUsers.splice(index, 1);
        } else {
          console.log(username.text + 'is a valid user');
        }
      }
    }
  }

  onRolenameSelected(value) {
    // On Selecting a Rolename
  }

  onRolenameRemoved(value) {
    // On Removing a Rolename
  }

  // Method to reset the page
  resetclick() {
    this.showUserList = false;
    this.errorMsgFlag = false;
    this.ngOnInit();
    this.userListCompanies = [];
    this.userListUsers = [];
    this.rolename = [];
    this.noofdaysToExpire = null
    this.userListCompanies = '';
    $('#searchByKeyword').val('');
    $('#fromdate').val('');
    $('#todate').val('');
    this.disableDateRange = false;
    this.disableDaysToExpire = false;
    $('input[type=radio]').prop("checked", false);
  }

  /* Service Called using these functions*/
  getCompanyNames(): Observable<any> {
    return this.loginService.getCompanyNames();
  }

  // getRoleNames(): Observable<any> {
  //   return this.loginService.roleName();
  // }

  fetchUserlistsFromDB(queryObj: object): Observable<any> {
    return this.loginService.getUserList(queryObj);
  }

  getCompanyUsers(companyName: string): Observable<any> {
    return this.loginService.getCompanyUsers(companyName);
  }

  // Helper Functions
  isDecimalorNegative = (x: number) => (x % 1 !== 0) || (x < 0) || x !== Math.floor(x);
  isInputValuesEmpty = (x) => (isNullOrUndefinedorEmptyString(x)) ? true : x.length === 0;
  emptyResponseValidation(response): boolean {

    // Empty Response Validation
    if (customIsNullOrUndefined(response) || response.length === 0) {
      this.errorMsgFlag = false;
      JSAlert.alert("No records found")
      this.showUserList = false;
      return true;
    } else {
      return false;
    }
  }

  // On Radio Button Click
  getRadioButtonExpire() {
    this.disableDaysToExpire = true;
    this.disableDateRange = false;
  }
  getRadioButtonDateRange() {
    this.disableDaysToExpire = false;
    this.disableDateRange = true;
  }

  // On Submit Click
  submit() {
    const fromdate: any = document.getElementById('fromdate');
    const todate: any = document.getElementById('todate');
    // Validation
    const inputArray = [this.userListCompanies, this.userListUsers, (fromdate) ? fromdate.value : fromdate,
    (todate) ? todate.value : todate, this.noofdaysToExpire, this.rolename, this.keywords];

    // Checks the input is passed or not
    if (inputArray.every(this.isInputValuesEmpty)) {
      JSAlert.alert('Please fill atleast one field');
      this.showUserList = false;
      return;
    }

    // Checks for number is negative in Days to Expire Textbox
    if (!isNullOrUndefinedorEmptyString(this.noofdaysToExpire)) {
      if (this.isDecimalorNegative(this.noofdaysToExpire)) {
        JSAlert.alert('Please Enter a Positive Integer');
        return;
      }
    }
  
    // The find() method returns the value of the first element in the array that 
    // satisfies the provided testing function. Otherwise undefined is returned.
    if (([fromdate, todate].find(customIsNullOrUndefined)) === undefined) {
      if (customIsNullOrUndefined(([fromdate.value, todate.value].find(isNullOrUndefinedorEmptyString)))) {
        const startDate = new Date(fromdate.value);
        const endDate = new Date(todate.value);
        // Converting each date to milliseconds and converting back to days 
        const deltaDays = (endDate.valueOf() - startDate.valueOf()) / (24 * 60 * 60 * 1000);
        // Check  Start Date is greater than end date
        if (deltaDays < 0 || deltaDays == undefined) {
          JSAlert.alert('From Date should be less than To Date');
          return;
        }
      }
    }
    const inputObj = {
      'keywordSearch': this.keywords,
      'companyNames': this.userListCompanies,
      'userNames': this.userListUsers,
      'rolename': this.rolename,
      'fromDate': fromdate ? fromdate.value : fromdate,
      'toDate': todate ? todate.value : todate,
      'daystoExpire': this.noofdaysToExpire
    };
    if((inputObj['fromDate']== "" && inputObj['toDate'] != '')||(inputObj['fromDate']!="" && inputObj['toDate'] == '')){
      JSAlert.alert("Please enter valid date range");
      return
    }
    const componentRef = this;
    const inputValidationTree = {
      'propertyExists': {
        'keywordSearch': () => {
        },
        'companyNames': () => {
          // Pushing Just the Text from company  ngSelect
          for (const companyName of componentRef.userListCompanies) {
            componentRef.selectedUserListCompanies.push(companyName.text);
          }
        },
        'userNames': () => {
          // Pushing Just the Text from user ngSelect
          for (const userName of componentRef.userListUsers) {
            componentRef.selectedUserListUsers.push(userName.text);
          }
        },
        'rolename': () => {
          // Pushing Just the Text from rolename ngSelect
          for (const rolename of componentRef.rolename) {
            componentRef.selectedRoleNames.push(rolename.text);
          }
        },
        'fromDate': () => {
        },

        'toDate': () => {
        },
        'daystoExpire': () => {
        }
      },
      'propertyNotExists': {
        'keywordSearch': () => {
          this.keywords = '';
        },
        'rolename': () => {
          this.rolename = '';
        },
        'daystoExpire': () => {
          this.noofdaysToExpire = null;
        }
      }
    };

    /** Accepts an element and checks whether it is null or undefined or it's length is 0. 
    * Returns 'propertyNotExists' | 'propertyExists'  */
    const propertyStatus = element => (isNullOrUndefinedorEmptyString(element) || element.length === 0) ?
      'propertyNotExists' : 'propertyExists';

    for (let property in inputObj) {
      if (inputValidationTree.hasOwnProperty(propertyStatus(inputObj[property]))) {
        if (inputValidationTree[propertyStatus(inputObj[property])].hasOwnProperty(property)) {
          // Pattern Matching based on keys on inputObject
          inputValidationTree[propertyStatus(inputObj[property])][property]();
        }
      }
    }

    const queryObj = {
      'keywordSearch': this.keywords,
      'companyNames': this.selectedUserListCompanies,
      'userNames': this.selectedUserListUsers,
      'rolename': this.selectedRoleNames,
      'fromDate': fromdate ? (fromdate.value ? new Date(fromdate.value).toISOString() : fromdate.value) : fromdate,
      'toDate': todate ? (todate.value ? new Date(todate.value).toISOString() : todate.value) : todate,
      'daystoExpire': this.noofdaysToExpire,
      'dbHitType': 'TableData'
    };
    // DB call to get the data
    this.fetchUserlistsFromDB(queryObj).subscribe(userListResponse => {
      if (!(this.emptyResponseValidation(userListResponse))) {

        // Change the userlist from DB acc to our needs
        // From Export = true to Export = 'Yes'
        for (const userList of userListResponse) {
          // Checks whether Export and General Flag Exists in DB then makes it into Yes or No
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
          if (userList.hasOwnProperty('Export') && !customIsNullOrUndefined(userList.Export)) {
            (userList.Export) ? userList.Export = 'Yes' : userList.Export = 'No';
          }

          if (userList.hasOwnProperty('General Alerts') && !customIsNullOrUndefined(userList.Export)) {
            (userList['General Alerts']) ? userList['General Alerts'] = 'Yes' : userList['General Alerts'] = 'No';
          }

          // Checks whether last login is empty and makes count as 0
          if (userList['Last Login'] === '') {
            userList['Access Count'] = 0;
            userList['Last Login'] = 'NA';
          } else {
            // Conversion to Client Local Time Zone
            userList['Last Login'] = new Date(userList['Last Login']).toLocaleString();
          }
          // Conversion to Client Local Time Zone
          userList['Valid From'] = new Date(userList['Valid From']).toLocaleString([], { month: '2-digit', day: '2-digit', year: 'numeric' });
          userList['Valid Till'] = new Date(userList['Valid Till']).toLocaleString([], { month: '2-digit', day: '2-digit', year: 'numeric' });
          userList['User Created On'] = new Date(userList['User Created On']).toLocaleString();
        }
        // JSON OBJECT FOR SORT TABLE
        this.jsonData = {
          tablesetting:
            {
              checkbox: false,
              exportflag: true
            },

          columndef: [
            {
              // columnIndex: 11,
              // Type: "accessalign",
              // url: ""
            }

          ],
          rowData: userListResponse,
          id: 'userListSortTable'
        };
        // ngIf Flag for Sort Table
        this.showUserList = true;
        this.errorMsgFlag = false;
      }
    });

    queryObj.dbHitType = "ExcelData";
    this.fetchExcelData(queryObj);

    // Reset the Values
    this.selectedUserListCompanies = [];
    this.selectedUserListUsers = [];
    this.selectedRoleNames = [];
  }

  /* Method to get the Excel data */
  fetchExcelData(queryObj) {
    const refThis = this;
    setTimeout(() => {
      if ($("#userListSortTable #btn_export").is(":visible")) {
        $('#userListSortTable').off('click', '#btn_export');
        $('#userListSortTable').on('click', '#btn_export', function () {
          queryObj['dbHitType'] = "ExcelData";
          let userDetail = {
            'CREATED ON': '',
            'FIRST NAME': '',
            'LAST NAME': '',
            'USER NAME': '',
            'DOWNLOAD': '',
            'VALID FROM': '',
            'VALID TO': '',
            'COMPANY NAME': '',
            'GENARAL ALERT': ''
          };
          let usageStat = {
            "USER NAME": "",
            "IN DATE TIME": "",
            "OUT DATE TIME": ""
          };
          let session = {
            "USER NAME": "",
            "ACCESS COUNT": ""
          };
          // DB call for getting the data for the given in input data
          refThis.fetchUserlistsFromDB(queryObj).subscribe(excelResponse => {
            let excelData = {};
            let usersDeleted = [];
            let userRegistered = excelResponse["userDetails"] || [];
            // Response from "userDetails"
            // Looping the data where user status is "InActive"  pushing it to array
            for (let dataCount = userRegistered.length - 1; dataCount >= 0; dataCount--) {
              if (userRegistered[dataCount]["Status"] == "InActive") {
                delete userRegistered[dataCount]["Status"];
                usersDeleted.push(userRegistered[dataCount]);
                userRegistered.splice(dataCount, 1);
              }
              else {
                delete userRegistered[dataCount]["Status"];
              }
            }
            excelData["USERS_REGISTERED"] = (userRegistered.length > 0) ? userRegistered : [userDetail];
            excelData["USERS_DELETED"] = (usersDeleted.length > 0) ? usersDeleted.reverse() : [userDetail];

            let userStatistics = [];
            let userSession = excelResponse["userAccess"] || [];
            // Response from "userAccess"
            // Looping the data pushing it to an array
            for (let i = 0; i < userSession.length; i++) {
              const loginTemp = (userSession[i]['LOGIN TIME']) ?
                new Date(userSession[i]['LOGIN TIME']).toLocaleString() : "";
              const logoutTemp = (userSession[i]['LOGOUT TIME']) ?
                new Date(userSession[i]['LOGOUT TIME']).toLocaleString() : '';
              let obj = {
                'USER NAME': userSession[i]['USER NAME'],
                'IN DATE TIME': loginTemp,
                'OUT DATE TIME': logoutTemp
              }
              userStatistics.push(obj);
            }
            const userAccessCount = excelResponse["userAccessCount"] || [];
            // Response from "userAccessCount"
            excelData["USAGE_STATISTICS"] = (userStatistics.length > 0) ? userStatistics : [usageStat];
            excelData["NO_OF_SESSION"] = (userAccessCount.length > 0) ? userAccessCount : [session];
            let currentdate = new Date();
            let datetime = currentdate.getDate() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getFullYear() + "_" + currentdate.getHours() + "." + currentdate.getMinutes() + "." + currentdate.getSeconds();
            // Passing the exceldata to xlsx
            let headers = Object.keys(excelData);
            var wb = XLSX.utils.book_new();

            for (let h = 0; h < headers.length; h++) {
              let ws = XLSX.utils.json_to_sheet(excelData[headers[h]]);
              XLSX.utils.book_append_sheet(wb, ws, headers[h]);
            }
            // file name for excel download
            XLSX.writeFile(wb, "User Details" + "_" + datetime + ".xlsx");
          });
        });
      }
      else {
        this.fetchExcelData(queryObj);
      }
    }, 500);
  }
}
