// Feature : To get the users statistics based on the given input data and to display in stack bar chart
// Onclick the stack bar, user details will be displayed in popup (datatable)
// ng Multi select dropdown is used 
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { AdminLoginServiceService } from '../../common-services/admin-service.service';
import { isNullOrUndefinedorEmptyString, customIsNullOrUndefined } from '../../../../utils/admin_isNullorUndefinedorEmptyString';
import { getMonthString } from '../../../../utils/admin_getMonthString';
import * as $ from "jquery";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
declare var $: any;
declare var slider: any;
declare var datepicker: any;
const JSAlert = require('js-alert');

@Component({
  selector: 'app-admingeneralstatistics',
  templateUrl: './admingeneralstatistics.component.html',
  styleUrls: ['./admingeneralstatistics.component.css','../../../assets/css/admin.css','../../../assets/css/bootstrap.min.css']
})

export class AdminGeneralstatisticsComponent implements OnInit {
  showpopup: Boolean;
  Jsondata: any;
  idOfTable: any;
  private timeOutTime = 100;
  public userName;
  public companyName;
  public companies: string[];
  public users: string[];
  public companyDisabled = false;
  public userDisabled = false;
  public fromDate: Date;
  public toDate: Date;
  private tempUsers: string[] = [];
  public chartObject = {};
  public radioButtonResultValue;
  public selectedCompanies: string[] = [];
  private selectedUsers: string[] = [];
  // Date Variables
  public maxDate = new Date();
  public radioButtonResult;
  // Chart ngIfs
  public showUserMonthChart = false;
  // Error Msg ngIf
  public errorMsgFlag = false;
  // Chart Variables
  private chartId = 'showUserMonthChart';

  constructor(private http: Http, private loginService: AdminLoginServiceService, private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {

    this.showpopup = false;
    $('#startdate').datepicker({
      changeMonth: true,
      changeYear: true,
      maxDate: this.maxDate,
    });
    $('#enddate').datepicker({
      changeMonth: true,
      changeYear: true,
      maxDate: this.maxDate,
    });
    // Method call to fetch companyname
    this.fetchCompanyNames();
    // Method call to fetch username
    this.getUserName();
  }
 
  // method to reset the page
  reset() {
    this.showpopup = false;
    this.errorMsgFlag = false;
    this.ngOnInit();
    this.companyName = [];
    this.userName = [];
    $('#startdate').val('');
    $('#enddate').val('');
    $('#valuationstatus').val('');
    this.showUserMonthChart = false;
    $('input[name=searchopt]').attr('checked', false);
  }

  getUserNames(): Observable<any> {
    return this.loginService.getUserNames();
  }
  // Method to get the username
  getUserName() {
    let userNames: any[] = [];
    this.getUserNames().subscribe(companyNamesFromDB => {
      userNames = companyNamesFromDB;
      this.users = [];
      for (const user of userNames) {
        this.users.push(user.ContactDetails.EmailID);
      }
      this.companyDisabled = false;
    });
  }
  // Method to get the username based on selected companyname
  fetchCompanyUsers(companyName) {
    this.getCompanyUsers(companyName).subscribe(companyUsersFromDB => {
      const selectedCompName = companyName
      this.users = [];
      if (companyUsersFromDB.length == 0) {
        JSAlert.alert('No users found for the selected company').then(() => {
          const selectcomp = this.companyName.findIndex(x => x.text == selectedCompName);
          this.companyName.splice(selectcomp, 1);
        });
      }
      // response is an array of objects
      for (const user of companyUsersFromDB) {
        this.tempUsers.push(user.ContactDetails.EmailID);
      }
      // Using Spread Syntax
      this.users.push(...(this.tempUsers));
    });
  }
  // Method to remove the respective company user, when companyname is removed
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
      // need to remove the previously added users of removed company on the ngModel
      if (!(customIsNullOrUndefined(this.userName))) {
        // Shallow Clone
        // Exception is the object inside the array is still passed by reference
        const tempObjArr = [...this.userName];
        for (const username of tempObjArr) {
          if (removedUsers.find((element) => {
            if (username.text === element) {
              return true;
            } else {
              return false;
            }
          })) {
            const index = this.userName.indexOf(username);
            if (index === -1) {
              JSAlert.alert('Error: The Index does not exists');
              return;
            }
            this.userName.splice(index, 1);
            if (this.userName.length === 0) {
              this.userDisabled = false;
            }
          } else {
            console.log(username.text + 'is a valid user');
          }
        }
      }
    });
  }

  // Method to fetch the companyname
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

  // Radio button selection for month & year wise
  getRadioButtonMonth() {
    this.radioButtonResult = 'monthwise';
  }
  getRadioButtonYear() {
    this.radioButtonResult = 'yearwise';
  }

  // reset chart variables
  resetChartVariables() {
    // ngModels - Company Charts
    this.selectedUsers = [];
    this.selectedCompanies = [];
  }

  // On company selection username  will be fetched
  onCompanyItemSelect(value: any) {
    // this.companyName = value;
    this.fetchCompanyUsers(value.text);
    this.userDisabled = false;
  }

  //Method to remove the companyname
  onCompanyItemRemoved(value: any) {
    this.fetchAndRemoveCompanyUsers(value.id);
    if (this.companyName.length == 0) {
      this.getUserName()
    }
  }

  onUserItemSelect(value: any) {
    // Check the selected value exists in the Users List
    const isUseronList: string = this.users.find((element) => {
      return element === value.text;
    });
    if (isNullOrUndefinedorEmptyString(isUseronList)) {
      for (const username of this.userName) {
        if (username.text === value.text) {
          const index = this.userName.indexOf(username);
          if (index === -1) {
            JSAlert.alert('Error: The Index does not exists');
            return;
          }
          this.userName.splice(index, 1);
        } else {
          console.log(username.text + 'is a valid user');
        }
      }
    }
  }

  onUserItemRemoved(value: any) {
    console.log(value.text + ' Item Removed from User ');
  }

  // For multiple selection, the companyname is pushed in an array
  createcompanyObj(): string[] {
    let compObj: object;
    if (!this.companyName) {
      return [];
    }
    for (const companyName of this.companyName) {
      this.selectedCompanies.push(companyName.text);
    }
    return this.selectedCompanies;
  }

  // For multiple selection, the username is pushed in an array
  createuserObj(): string[] {
    if (!this.userName) {
      return [];
    }
    for (const userName of this.userName) {
      this.selectedUsers.push(userName.text);
    }
    return this.selectedUsers;
  }

  calender(event: any) {
    // JQuery UI DatePickers
    $('#startdate').datepicker({
      changeMonth: true,
      changeYear: true,
      maxDate: this.maxDate
    });
    $('#enddate').datepicker({
      changeMonth: true,
      changeYear: true,
      maxDate: this.maxDate
    });
    const id = $(event.target).closest('input')[0].id;
    $('#' + id).datepicker().datepicker('show');
  }

  setTimeOutAndScrollToDiv(divId: string, time: number) {
    // Using template literal and property accessor using bracket notation.
    this[`${divId}Flag`] = !this[`${divId}Flag`];
    if (this[`${divId}Flag`]) {
      // Giving Time for ngIf to show the div
      setTimeout(() => {
        const id = document.getElementById(divId);
        id.scrollIntoView({ behavior: 'smooth' });
      }, time);
    }
  }

  xor = (bool1: boolean, bool2: boolean): boolean => bool1 ? !bool2 : bool2;

  // To check the response is empty or not
  emptyResponseValidation(response): boolean {
    // Empty Response Validation
    if (customIsNullOrUndefined(response) || response.length === 0) {
      this.errorMsgFlag = false;
      JSAlert.alert("No data available to display")
      this.showUserMonthChart = false;
      this.showpopup = false;
      return true;
    } else {
      return false;
    }
  }

  // Method to display the data table on stackbar chart click
  generalTable(data: any) {
    const startdate: any = document.getElementById('startdate');
    const enddate: any = document.getElementById('enddate');
    if (startdate.value != "" || enddate.value != "") {
      data[0]['startdate'] = startdate.value;
      data[0]['enddate'] = enddate.value;
    }
    if (this.radioButtonResult == 'monthwise') {
      data[0]['searchtype'] = 'monthwise';
    }
    else if (this.radioButtonResult == 'yearwise') {
      data[0]['searchtype'] = 'yearwise';
    }
    // Passing the data to the sort table 
    this.getmonthStatsForUsers(data[0]).subscribe(result => {
      this.Jsondata = {
        tablesetting:
          { checkbox: false },
        columndef: [],
        rowData: result,
        id: 'generalpopup'
      };
    });
    document.getElementById("generalpopup").style.display = "block";
    // Css for datatable popup
    try { $('#generalpopup').find('#tablediv').css('display', 'block') } catch (e) { }
    var headerdiv = '<div id="Applicationheader" style="background-color: blanchedalmond;padding-top: 1%;margin: 0;padding-left:1%;padding-bottom:0.5%;font-size: 20px;"></div>'
    $("#generalpopup").show()
    $(".closespan").remove()
    $("#Applicationheader").remove()
    $("#generalpopup").prepend(headerdiv);
    $("#generalpopup").addClass("backdrop").prepend('<span class="btn btn-xs closespan" ' +
      'onclick="$(\'#generalpopup\').removeClass(\'backdrop\').hide();$(\'body\').css(\'overflow\',\'auto\')" ' +
      'style="background-color: #d21e11;color: #ffffff;border-radius: 5%;position: absolute;right: 6%;top: 12%;padding: 0.3%;' +
      '">X Close</span>')
    $("#Applicationheader").html("General Statistics")
    $("#applicationselect").remove()
    $("body").css('overflow', 'hidden')
  }

  // Service call to get the data 
  getmonthStatsForUsers(userObj: object): Observable<any> {
    return this.loginService.getgeneralpopupData(userObj);
  }

  // Passing the parameters to generate the stackbar chart
  showChart(chartid: string, rowdata: object[], xaxislabel: string, yaxislabel: string, colname: string) {
    // ng-Ifs
    this.showUserMonthChart = true;
    this.errorMsgFlag = false;
    // ChartObject
    this.chartObject['chartid'] = chartid;
    this.chartObject['rowdata'] = rowdata;
    this.chartObject['xaxislabel'] = xaxislabel;
    this.chartObject['yaxislabel'] = yaxislabel;
    this.chartObject['refname'] = chartid;
    this.chartObject['colname'] = colname;
  }

  isInputValuesEmpty = (x) => (isNullOrUndefinedorEmptyString(x)) ? true : x.length === 0;

  // Method to generate the chart, based on the input parameters 
  drawchart() {
    this.setTimeOutAndScrollToDiv('showUserMonthChart', this.timeOutTime);
    this.showUserMonthChart = false;
    const startdate: any = document.getElementById('startdate');
    const enddate: any = document.getElementById('enddate');
    const valuationStatus =  $('#valuationstatus :selected').val();
    // alert(valuationStatus)
    let dateExists: boolean;

    const inputArray = [this.companyName, this.userName, (startdate) ? startdate.value : startdate,
    (enddate) ? enddate.value : enddate,valuationStatus ];

    if (inputArray.every(this.isInputValuesEmpty)) {
      JSAlert.alert('Please fill atleast one field');
      this.showUserMonthChart = false;
      return;
    }
    if (this.xor(isNullOrUndefinedorEmptyString(startdate.value), isNullOrUndefinedorEmptyString(enddate.value))) {
      JSAlert.alert('Please provide a complete Date Range');
      return;
    }
    // DateExists
    if (customIsNullOrUndefined(([startdate.value, enddate.value].find(isNullOrUndefinedorEmptyString)))) {
      dateExists = true;
    } else {
      dateExists = false;
    }
    // By Default if there is no Filters(Radio Button) Selected then it's Monthwise
    if ((customIsNullOrUndefined(this.radioButtonResult))) {
      this.radioButtonResult = 'monthwise';
    }
    if (dateExists) {
      // Check whether filters exist if date range is given
      const startDate = new Date(startdate.value);
      const endDate = new Date(enddate.value);
      const deltaDays = (endDate.valueOf() - startDate.valueOf()) / (24 * 60 * 60 * 1000);
      // Check the Start Date is greater than end date
      if (deltaDays < 0) {
        JSAlert.alert('From Date should be less than To Date');
        return;
      }
    }
    const Obj = {
      companyName: this.createcompanyObj(),
      userName: this.createuserObj(),
      startDate: startdate.value,
      endDate: enddate.value,
      type: this.radioButtonResult,
      valuationstatus: valuationStatus 
    }
    // To display the chart in year wise
    if (this.radioButtonResult == 'yearwise') {
      // Checking for username not exist
      // if (Obj.userName.length == 0 && Obj.startDate && Obj.companyName.length > 0) {
      //   // Db call to get the data based on companyname
      //   this.getYearMonthwiseCompanies(Obj).subscribe(getYearMonthwiseCompanies => {
      //     if (!(this.emptyResponseValidation(getYearMonthwiseCompanies))) {
      //       const chartStats = getYearMonthwiseCompanies;
      //       this.showChart(this.chartId, chartStats, 'Year', 'Access Counts', 'companyname');
      //     }
      //   });
      //   this.resetChartVariables();
      //   return
      // }
      // Db call to get the data based on username
      this.getYearMonthwiseUsers(Obj).subscribe(getYearMonthwiseUsers => {
        if (!(this.emptyResponseValidation(getYearMonthwiseUsers))) {
          const chartStats = getYearMonthwiseUsers;
          if (Obj.userName.length == 0 && Obj.startDate && Obj.companyName.length > 0) {
          this.showChart(this.chartId, chartStats, 'Year', 'Access Counts', 'companyname');
          } if( Obj.companyName.length > 0 && Obj.userName.length == 0) {
            this.showChart(this.chartId, chartStats, 'Year', 'Access Counts', 'companyname');
          }else {
            this.showChart(this.chartId, chartStats, 'Year', 'Access Counts', 'username');
          }
        }
      });
    }
    // To display the chart in monthwise (Default monthwise will be selected)
    else {
      // if (Obj.userName.length == 0 && Obj.startDate && Obj.companyName.length > 0) {
      //   // Db call for getting the data based on companyname
      //   this.getYearMonthwiseCompanies(Obj).subscribe(getYearMonthwiseCompanies => {
      //     if (!(this.emptyResponseValidation(getYearMonthwiseCompanies))) {
      //       const chartStats = getYearMonthwiseCompanies;
      //       this.showChart(this.chartId, chartStats, 'Month', 'Access Counts', 'companyname');
      //     }
      //   });
      //   this.resetChartVariables();
      //   return
      // }
      // Db call to get the data based on username
      this.getYearMonthwiseUsers(Obj).subscribe(getYearMonthwiseUsers => {
        if (!(this.emptyResponseValidation(getYearMonthwiseUsers))) {
          const chartStats = getYearMonthwiseUsers;
          if (Obj.userName.length == 0 && Obj.startDate && Obj.companyName.length > 0) {
            this.showChart(this.chartId, chartStats, 'Month', 'Access Counts', 'companyname');
            } else if( Obj.companyName.length > 0 && Obj.userName.length == 0) {
              this.showChart(this.chartId, chartStats, 'Month', 'Access Counts', 'companyname');
             } else {
          this.showChart(this.chartId, chartStats, 'Month', 'Access Counts', 'username');
            }
        }
      });
    }
    this.resetChartVariables();
  }

  /* Service Called using these functions*/
  getYearMonthwiseUsers(compObj: object): Observable<any> {
    return this.loginService.getStatsforUsers(compObj);
  }
  getYearMonthwiseCompanies(compObj: object): Observable<any> {
    return this.loginService.getStatsforCompanies(compObj);
  }
  getCompanyUsers(companyName: string): Observable<any> {
    return this.loginService.getCompanyUsers(companyName);
  }
  getCompanyNames(): Observable<any> {
    return this.loginService.getCompanyNames();
  }
}


