
// Feature: For Updating the user details,all the fields can be updated other than EmailID/UserName 

import { forEach } from '@angular/router/src/utils/collection';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { isNullOrUndefinedorEmptyString, customIsNullOrUndefined } from '../../../../utils/admin_isNullorUndefinedorEmptyString';
const JSAlert = require('js-alert');
import { getAllCountries, getStatesOfCountry, getCitiesOfState, getCountryById, getStateById, getCityById } from 'country-state-city'; //country-state-city dropdown
import * as $ from 'jquery';
import { isNullOrUndefined, debug } from 'util';
import { AdminLoginServiceService } from '../../common-services/admin-service.service';
import { SelectComponent, SelectItem } from 'ng2-select';
import { isDateInRange } from '../../../../utils/admin_isDateInRange';
import { format } from 'date-fns';

declare var $: any;
declare var slider: any;
declare var datepicker: any;
declare var require: any;

 @Component({
    selector: 'app-update-user-account',
    templateUrl: './update-user-account.component.html',
    styleUrls: ['./update-user-account.component.css']
  })

export class UpdateUserAccountComponent implements OnInit {

  companies: string[] = [];
  tempUsers: string[] = [];
  companyDisabled = false;
  userDisabled: boolean;
  singlegrid: boolean;
  listFor3BiGS: boolean;
  generalflag: any;
  exportflag: any;
  limits: any;
  usertype: any;
  enddate: any;
  startdate: any;
  categories: Object[];
  formdata: FormGroup;
  Userobject: Object[];
  users: string[] = [];
  bulkusers: Object[] = [];
  companyName;
  userlogemail;
  mainCheckbox = false;
  public firstname: string;
  public lastname: string;
  public reference: string;
  CompanyName: string;
  public updateBy = sessionStorage.getItem('UserID');
  public emailid: string;
  public MobileNo: string;
  public department: string;
  public areaofinterest: string;
  public userStatus: string;
  public contractref: string;
  public Address1: string;
  public Address2: string;
  public landmark: string;
  public userrole: string;
  public area: string;
  public pincode: string;
  public country: string;
  public state: string;
  public city: string;
  public CompDropdown;
  public showResult = false;
  public showResultBulk = false;
  public showSingle = true;
  public showBulk = false;
  inputRowObject: any[] = [];
  public roleName:any[] = ['Admin' ,'Comp app without lender','Comp with lender','Ind app without lender','User'];
  totalRec: number;
  page: number = 1;
  itemsPerpage = 20;
  pagenumcount : any = 1;
  emailIdArray: any[] = [];
  emailFlag: boolean;
  fromEmail: any;
  public UserCompanyName: string
  userContractArray: object[] = [];
  CountryList: string[];
  StateList: string[];
  CityList: string[];
  Rows: any[] = [];
  rowValue = 0;
  // roleName = ['Admin','Comp app without lender','Comp with lender','Ind app without lender','User']

  constructor(private router: Router, public service: AdminLoginServiceService) { }

  ngOnInit() {
    this.CountryList = getAllCountries();
    this.StateList = getStatesOfCountry();
    this.CityList = getCitiesOfState();
    // Get the Company Name
    this.fetchCompanyNames();
    // Get the User Name
    this.getUserName();
    this.singlegrid = false;
    this.userDisabled = false;
    this.service.getCompanyNames().subscribe(res => {
      this.categories = res;
      console.log(res)
    });
    this.formdata = new FormGroup({
      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(254),
      ]))
    });
    // Get the user rolename
    // this.service.roleName().subscribe(res => {
      // this.roleName = res;
    // });
    // Get the EmailFlag from param
    this.service.paramEmailFlag().subscribe(res => {
      this.emailFlag = res[1].param_value;
      this.fromEmail = res[0].param_value;
    })
  }

  // Method to change the number of records count in pagination
  pageChanged(event){
    this.pagenumcount = (this.page -1) * this.itemsPerpage + 1 ;
  }

  getUserNames(): Observable<any> {
    return this.service.getUserNames();
  }
  // Method to get the username
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
  // Method to update single user data
  public update_single() {
    const tagName = ($('h6').is(':visible'));
    if(tagName == true) {
      JSAlert.alert('Please fill the required field');
    } else {
    this.updatedata();
   
    }
  }

  updatedata() {
    var clasref = this
    const fname = clasref.firstname;
    const lname = clasref.lastname;
    const companyname = clasref.CompanyName;
    clasref.inputRowObject = [];
    const country = $('#Country :selected').text();
    const state = $('#State :selected').text();
    clasref.generalflag = $('#generalflag').val();
    clasref.startdate = $('#startdate').val();
    clasref.enddate = $('#enddate').val();
    if( clasref.usertype == "Appraiser") {
    const trow = $('#associationTable').find('tr');
    var  validFlag = true;
    trow.each(function (el) {
      const rowId = (trow[el].id);
      const associteName = $(trow[el]).find('.associationName').val();
      const memberid = $(trow[el]).find('.memberID').val();
      document.getElementById(rowId).style.backgroundColor = '#f2f2f2';
      if ([associteName, memberid].some(isNullOrUndefinedorEmptyString)) {
        document.getElementById(rowId).style.backgroundColor = '#c3acb1';
       validFlag = false;
        return;
      }
      const rowObject = {
        'AssociationName': associteName,
        'memberID': memberid,
      };
      clasref.inputRowObject.push(rowObject);
    });
if(!validFlag) {
  JSAlert.alert('Please fill the required field');
  return
}
  }
    let obj = {
     EmailID : clasref.userlogemail,
     FName : clasref.firstname,
     LName : clasref.lastname,
     CompanyName :clasref.CompanyName,
     userType : clasref.usertype,
     MobileNo: clasref.MobileNo,
     Address1 : clasref.Address1,
     Address2 : clasref.Address2,
     Country : country.trim(),
     City : clasref.city ,
     State : state,
     Area : clasref.area,
     Landmark : clasref.landmark,
     Pincode : clasref.pincode,
     contracRef : clasref.contractref,
     userRole : clasref.userrole,
     generalalert:  clasref.generalflag,
     stDate : clasref.startdate,
     edDate: clasref.enddate, user_Status :clasref.userStatus
    } 
    let data1:any = { ...obj };
    if(clasref.usertype == "Appraiser") {
      data1.AssociationName = clasref.inputRowObject;
    }
    clasref.service.updatedata(data1).subscribe(res => { 
      JSAlert.alert('User Details are Updated Successfully');
    });
  }

  // Method to validate boolean 
  yesNoToBoolean(yesNo: string): boolean {
    if (yesNo === 'Yes') {
      return true;
    } else {
      return false;
    }
  }

  // Method for revert back the changes in Single user update
  Onuser_Action() {
    const clasref = this;
    if (isNullOrUndefined(clasref.userlogemail)) {
      JSAlert.alert('Please enter the username to update');
      return;
    }
    if (clasref.userlogemail.length === 0) {
      JSAlert.alert('Please enter the username to update');
      return;
    }
    clasref.singlegrid = true;
    const userlogname = clasref.userlogemail[0].text;
    const comp = clasref.companyName;
    clasref.service.referencesdropdown(comp).subscribe(res => {
      clasref.reference = res;
    });
    clasref.userContractArray = [];
   
    clasref.service.showSingle(userlogname).subscribe(res => {
      if (res.length == 0) {
        clasref.singlegrid = false;
        JSAlert.alert('No Records Found');
        return;
      }
      let tempObj = {};
      //  setTimeout(() => {
        clasref.Rows = [];
        for (const i of res) {
          clasref.firstname = i.FirstName;
          clasref.lastname = i.LastName;
          clasref.CompanyName = i.CompanyName;
          clasref.emailid = i.EmailId;
          clasref.MobileNo = i.MobileNo;
           const countryname: any = document.getElementsByClassName('Countryname')[0];
           clasref.setSelectedValue(countryname, i.Country);
           clasref.onCountrySelected(countryname.value);
          const stateName: any = document.getElementsByClassName('Statename')[0];
          clasref.setSelectedValue(stateName, i.State);
          const selectedState = $('#State').find('option:selected').val();
          clasref.onStateItemSelected(selectedState);
          const cityname: any = document.getElementsByClassName('Cityname')[0];
          clasref.setSelectedValue(cityname, i.City);
          // this.country = i.Country;
          // this.state = i.State;
          // this.city = i.City;
          clasref.Address1 = i.Addressline1,
          clasref.Address2 = i.Addressline2,
          clasref.landmark = i.LandMark,
          clasref.area = i.Area,
          clasref.pincode = i.Pincode,
          clasref.contractref = i.ContractRef;
          clasref.userrole = i.UserRole;
          clasref.usertype = i.UserType;
          i.GeneralAlert ? clasref.generalflag = 'true' : clasref.generalflag = 'false';
          clasref.userStatus = i.UserStatus;
          clasref.startdate = format(new Date(i.StartDate), 'MM/DD/YYYY');
          clasref.enddate = format(new Date(i.EndDate), 'MM/DD/YYYY');
          clasref.Rows.push(...(i.AssociationName))
          /* getting a subset of bulkuserObj 
          Using Object Destructuring, arrow Function syntax, Property Shorthand, 
          Type Assertion and IIFE(Immediately Invoked Function Expression)*/
          tempObj = (({ ContractStDate, ContractEndDate, EmailId }) =>
            ({ ContractStDate, ContractEndDate, EmailId }))(<any>i);
          /* Expanded Version of the above line below */
          // tempobj['ContractStDate'] = bulkuserObj['ContractStDate'];
          // tempobj['ContractEndDate'] = bulkuserObj['ContractEndDate'];
          // tempobj['EmailId'] = bulkuserObj['EmailId'];
          clasref.userContractArray.push(tempObj) 
          tempObj = {};
        }
       
      //  }, 200);
       setTimeout(function () {
         
       if(clasref.Rows.length == 0 && clasref.usertype == "Appraiser" ) {
        clasref.Rows = [0];
        $("#AssociationTableDiv").css("display", 'block')
      } else if(clasref.Rows.length == 0) {
        $("#AssociationTableDiv").css("display", 'none')
      }  else {
        $("#AssociationTableDiv").css("display","block")
        // this.enableAddContract()
        clasref.enableAddContract()
      
      }  }, 300);
      //  else {
      //   this.Userobject = res;
      // }
    });
  }
  enableAddContract() {
    // const trow = $('#associationTable').find('tr');
    // const tr_length = trow.length;
    // const addbtn = document.getElementById('addicon' + (tr_length - 1));
    // addbtn.style.pointerEvents = 'auto';
    // addbtn.style.cursor = 'pointer';
    // addbtn.style.opacity = '1';
    const trow = $('#associationTable').find('tr');
    // const tagName = ($('h6').is(':visible'));
    const tr_length = trow.length;
    const index = (tr_length - 1);
    const addbtntest = document.getElementById('addicon' + index);
    addbtntest.style.pointerEvents = "auto";
    addbtntest.style.cursor = 'pointer';
    addbtntest.style.opacity = '1';
  }
  // Radio button functionality for retrieving Single User 
  singleUser() {
    this.showSingle = true;
    this.showBulk = false;
    this.showResultBulk = false;
    this.CompDropdown = '';
    this.singlegrid = false;
    this.listFor3BiGS = false;
  }

  // Radio button functionality for retrieving Bulk User 
  // bulkUser() {
  //   this.showSingle = false;
  //   this.showBulk = true;
  //   this.showResult = false;
  //   this.userlogemail = '';
  //   this.companyName = '';
  // }

  Reset_Click() {
    this.singlegrid = false;
    this.listFor3BiGS = false;
    this.CompDropdown = '';
    this.companyName = [];
    this.users = [];
    this.ngOnInit();
    this.userDisabled = false;
  }

  // // Method to update bulk user
  // update_Bulk() {
  //   const UpdatedBy = this.updateBy
  //   // Check the checkboxes are checked
  //   const $table = document.getElementById('Upadteusertable');
  //   const $chkbox_checked = $('tbody input[type="checkbox"]:checked', $table);
  //   if ($chkbox_checked.length === 0) {
  //     JSAlert.alert('Please select atleast one User to Update !!!');
  //     return;
  //   }
  //   const classref = this;
  //   const trow = $('#Upadteusertable').find('.rowSelected');
  //   trow.each(function (el) {
  //     const rowId = (trow[el].id);
  //     const first_name = $(trow[el]).find('.firstName').val();
  //     const last_name = $(trow[el]).find('.lastName').val();
  //     const email_id = $(trow[el]).find('.emailid').val();
  //     const ph_number = $(trow[el]).find('.MobileNo').val();
  //     const department = $(trow[el]).find('.department').val();
  //     const areaofinterest = $(trow[el]).find('.areaofinterest').val();
  //     const companyname = $(trow[el]).find('.companyselected').val();
  //     const contractref = $(trow[el]).find('.selectedref').val();
  //     const userType = $(trow[el]).find('.Usertype').val();
  //     const downloadlimit = $(trow[el]).find('.limits').val();
  //     const startdate = $(trow[el]).find('.startdate').val();
  //     const enddate = $(trow[el]).find('.enddate').val();
  //     const generalflag = $(trow[el]).find('.generalflag').val();
  //     const exportflag = $(trow[el]).find('.exportflag').val();
  //     const userStatus = $(trow[el]).find('.userstatus').val();
  //     if ([companyname, contractref, userType].some(isNullOrUndefinedorEmptyString)) {
  //       document.getElementById(rowId).style.backgroundColor = '#c3acb1';
  //       return;
  //     }
  //     const rowObject = {
  //       'companyname': companyname,
  //       'contractref': contractref,
  //       'userType': userType,
  //       'downloadlimit': downloadlimit,
  //       'startdate': startdate,
  //       'enddate': enddate,
  //       'generalflag': generalflag,
  //       'exportflag': exportflag,
  //       'first_name': first_name,
  //       'last_name': last_name,
  //       'email_id': email_id,
  //       'phone_number': ph_number,
  //       'department': department,
  //       'area_of_interest': areaofinterest,
  //       'user_Status': userStatus,
  //       'last_updated_by': UpdatedBy
  //     };
  //     classref.inputRowObject.push(rowObject);
  //   });
  //   // DB call to update the data
  //   this.service.updateBulk_Data(classref.inputRowObject).subscribe((res) => {
  //     JSAlert.alert('The Selected User Details are Updated Successfully');
  //     classref.inputRowObject = [];
  //     const updateBtn = $('#bulkUpdateBtn');
  //     const deleteBtn = $('#bulkDeleteBtn');
  //     const chkTrueCount = this.checkboxChecker();
  //     if (chkTrueCount > 0) {
  //       updateBtn.removeAttr('disabled');
  //       deleteBtn.removeAttr('disabled');
  //     } else {
  //       updateBtn.attr('disabled', 'disabled');
  //       deleteBtn.attr('disabled', 'disabled');
  //     }
  //   });
  // }

  // // To get the user data for the given/selected company (Bulk User)
  // SubmitBulk() {
  //   const updateButton = $('#bulkUpdateBtn');
  //   updateButton.removeAttr('disabled');
  //   this.bulkusers = [];
  //   const value = this.CompDropdown[0].text;

  //   this.service.referencesdropdown(value).subscribe(res => {
  //     this.reference = res;
  //   });
  //   this.userContractArray = [];
  //   this.service.bulkUpdate(value).subscribe(res => {
  //     const bulkuser = [...res];
  //     for (let bulk of bulkuser) {
  //       this.bulkusers.push({ ...bulk });
  //     }
  //     let tempobj = {}
  //     for (let bulkuserObj of this.bulkusers) {
  //       bulkuserObj['StartDate'] = format(new Date(bulkuserObj['StartDate']),
  //         'MM/DD/YYYY');
  //       bulkuserObj['EndDate'] = format(new Date(bulkuserObj['EndDate']),
  //         'MM/DD/YYYY');
  //       /* getting a subset of bulkuserObj 
  //       Using Object Destructuring, arrow Function syntax, Property Shorthand, 
  //       Type Assertion and Immediately Invoked Function */
  //       tempobj = (({ ContractStDate, ContractEndDate, EmailId }) =>
  //         ({ ContractStDate, ContractEndDate, EmailId }))(<any>bulkuserObj);
  //       /* Expanded Version of the above line below */
  //       // tempobj['ContractStDate'] = bulkuserObj['ContractStDate'];
  //       // tempobj['ContractEndDate'] = bulkuserObj['ContractEndDate'];
  //       // tempobj['EmailId'] = bulkuserObj['EmailId'];
  //       this.userContractArray.push(tempobj)
  //       tempobj = {};
  //     }
  //     this.totalRec = this.bulkusers.length;
  //     if (this.CompDropdown === '') {
  //       JSAlert.alert('Please select the Company');
  //     } else {
  //       if (res.length === 0) {
  //         this.listFor3BiGS = false;
  //         JSAlert.alert('No Users Found for the Selected Company!!!');
  //       } else {
  //         this.listFor3BiGS = true;
  //       }
  //     }
  //   });
  // }

  // Header checkbox functionality
  checkbx(event: any) {
    if (event.target.checked) {
      $('.chkGrp:not(:checked)').trigger('click');

    } else {
      $('.chkGrp:checked').trigger('click');
    }
  }

  checkboxloop(ref: any) {
    /* Using JQUERY to fetch the table, all checkboxes using css class and those which are selected
    Then the chkbox_checked is checked for three scenarios 1) None, 2) All Selected 3) Some of them are selected  */
    const $table = $(ref.target).closest('table').get(0);
    const thead = $table.getElementsByTagName('thead')[0];
    const checkboxid = thead.getElementsByClassName('parentcheck')[0].id;
    this.checkboxfunctionality($table, checkboxid);
    const updateBtn = $('#bulkUpdateBtn');
    const deleteBtn = $('#bulkDeleteBtn');
    const classref = this;
    $('#associationTable').on('click', 'input[type="checkbox"]', function (e) {
      const $row = $(this).closest('tr');
      if (this.checked) {
        $row.addClass('rowSelected');
      } else {
        $row.removeClass('rowSelected');
      }
    });
    // Check checkboxes status on DOMready
    const chkTrueCount = classref.checkboxChecker();
    // Check again when checkboxes states are changed
    $('table tr input[type="checkbox"]').on('change', function () {
      const chkTrueCount = classref.checkboxChecker();
    });
    if (chkTrueCount > 0) {
      updateBtn.removeAttr('disabled');
      deleteBtn.removeAttr('disabled');
    } else {
      updateBtn.attr('disabled', 'disabled');
      deleteBtn.attr('disabled', 'disabled');
    }
  }
  checkboxChecker(): number {
    let chkTrueCount = 0;
    $('table tr').each(function (i) {
      // Only check rows that contain a checkbox
      const $chkbox = $(this).find('input[type="checkbox"]');
      if ($chkbox.length) {
        const status = $chkbox.prop('checked');
        if (status) {
          chkTrueCount++;
        }
      }
    });
    return chkTrueCount;
  };
  // CheckBox Functionality
  checkboxfunctionality($table, checkboxid) {
    // Accepts a table and thead Checkbox id
    const $chkbox_all = $('tbody input[type="checkbox"]', $table);
    const $chkbox_checked = $('tbody input[type="checkbox"]:checked', $table);
    const chkbox_select_all_html = $('thead #' + checkboxid, $table).get(0);
    // Get Table Values
    const tr = $table.getElementsByTagName('tr');
    const rowcount = tr.length;
    if (($chkbox_checked.length === 0)) {
      // Case 1: None of the checkboxes are selected
      this.mainCheckbox = false;
      chkbox_select_all_html.indeterminate = false;
    } else if ($chkbox_checked.length === $chkbox_all.length) {
      // Case 2: All of the checkboxes are selected
      if (rowcount <= 1) {
        this.mainCheckbox = false;
        chkbox_select_all_html.indeterminate = true;
        return;
      }
      this.mainCheckbox = true;
      chkbox_select_all_html.indeterminate = false;
    } else {
      // Case 3: Some of the checkboxes are selected
      this.mainCheckbox = false;
      chkbox_select_all_html.indeterminate = true;
    }
  }
  // Method to fetch the company users
  fetchCompanyUsers(companyName) {
    this.getCompanyUsers(companyName).subscribe(companyUsersFromDB => {
      this.users = [];
      this.tempUsers = [];
      // response is an array of objects
      for (const user of companyUsersFromDB) {
        this.tempUsers.push(user.ContactDetails.EmailID);
      }
      if (this.tempUsers.length == 0) {
        this.userDisabled = true;
        JSAlert.alert('No Users Found for the Selected Company');
      }
      // Using Spread Syntax
      this.users = [];
      this.users.push(...(this.tempUsers));
    });
  }

  getCompanyUsers(companyName: string): Observable<any> {
    return this.service.getOnlyApprovedUsers(companyName);
  }

  // Method to fetch the company name
  fetchCompanyNames() {
    let companyNames: any[] = [];
    this.service.getCompanyNames().subscribe(companyNamesFromDB => {
      companyNames = companyNamesFromDB;
      this.companies = [];
      for (const company of companyNames) {
        this.companies.push(company.CompanyName);
      }
      this.companyDisabled = false;
    });
  }
  /* Service Called using these functions*/
  // getCompanyNames(): Observable<any> {
  //   return this.service.getCompanyNames();
  // }

  // Method to get the username, based on company selection
  onCompanyItemSelect(value: any) {
    this.userlogemail = '';
    this.fetchCompanyUsers(value.text);
    this.userDisabled = false;
  }

  onUserItemSelect(value: any) {
    this.getUsercompany(value.text);
    // Checking the selected value exists in the Users List
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

  // Method to fetch the companyname based on user selection
  getUsercompany(value: any) {
    this.service.getApprovedUserscompany(value).subscribe((res) => {
      const comp = res[0].CompanyName;
      this.companyName = [comp];
      this.companyDisabled = false;
    });
  }

  onUserItemRemoved(value: any) {
    console.log(value.text + ' Item Removed from User ');
  }

  // Method to remove the selected companyname
  onCompanyItemRemoved(value: any) {
    this.fetchAndRemoveCompanyUsers(value.id);
    this.getUserName()
  }

  // Method to remove the company users
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
      //  need to remove the previously added users of removed company on the ngModel
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

  // In Grid, Based on the company selection, the contractreference dropdown data will be fetched
  onCompanyselect(Selectelement: any) {
    this.service.referencesdropdown(Selectelement.target.value).subscribe(res => {
      // const suffix = Selectelement.target.id.match(/\d+/); // 123456
      let items = '<option selected disabled value=\'' + '--Select--' + '\'>' + '--Select--' + '</option>';
      $('#selectedref').empty();
      $.each(res, function (index, item) {
        items += '<option value=\'' + item + '\'>' + item + '</option>';
      });
      $('#selectedref').append(items);
      $('#startdate').attr('disabled', true);
      $('#enddate').attr('disabled', true);
      $("#startdate").datepicker("destroy");
      $("#enddate").datepicker("destroy");
    });
  }

  //  In Grid, Based on the contract selection, other contract will be fetched and displayed
  onchangereference(selectdata: any) {
    const contractValue = (<HTMLInputElement>selectdata.target).value;
    // const id = (<Element>selectdata.target).id.match(/\d+/)[0];
    // Fetch the values of user contract - start and end date
    const userStartDateString = (<HTMLInputElement>document.getElementById('startdate')).value;
    const userEndDateString = (<HTMLInputElement>document.getElementById('enddate')).value;
    const userStartDate = new Date(userStartDateString);
    const userEndDate = new Date(userEndDateString);
    const username = (<HTMLInputElement>document.getElementById('emailid')).value;
    const userContractIndex = this.userContractArray.findIndex((userContractObj) =>
      userContractObj['EmailId'] === username);
    if (userContractIndex === -1) {
      return;
    }
    const userContractObj = this.userContractArray[userContractIndex];
    this.service.downloadtxt(contractValue).subscribe(res => {
      const i = res[0];
      const generalflag = document.getElementById('generalflag');
      (<HTMLInputElement>generalflag).value = i.GeneralAlert ? 'true' : 'false';
      // Updating values to userContractObj
      userContractObj['ContractStDate'] = i.StartDate;
      userContractObj['ContractEndDate'] = i.EndDate;
      // Validation
      //Whether User start and end Dates lies inside the new contract dates
      const contractStartDate = new Date(i.StartDate);
      const contractEndDate = new Date(i.EndDate);
      const finalStartDate = isDateInRange(userStartDate, contractStartDate,
        contractEndDate) ? userStartDate : contractStartDate;
      const finalEndDate = isDateInRange(userEndDate, contractStartDate,
        contractEndDate) ? userEndDate : contractEndDate;
      const startdate = document.getElementById('startdate');
      const stdate = format(finalStartDate, 'MM/DD/YYYY');
      (<HTMLInputElement>startdate).value = stdate;
      const enddate = document.getElementById('enddate');
      const eddate = format(finalEndDate, 'MM/DD/YYYY');
      (<HTMLInputElement>enddate).value = eddate;
      $('#startdate').attr('disabled', false);
      $('#enddate').attr('disabled', false);
    });
  }

  // method for textbox validation using regrex pattern 
  textBox(text: string): boolean {
    const filter = /^[a-zA-Z]*$/;
    if (filter.test(text)) {
      return true;
    } else {
      return false;
    }
  }
  // Validation for each textbox in the Grid on key event, and Error msg will displayed below the textbox (SingleUSer)
  onKey(selectdata: any) {
    const index = selectdata.target.id.match(/\d+/);
    const rowCount = $('#singleUpdateTable tr').length;
    const firstname = $('#firstName').val();
    const fName = this.textBox(firstname);
    const lastname = $('#lastName').val();
    const lName = this.textBox(lastname);
    const mobnumber = $('#MobileNo').val();
    const address = $('#AddressLine').val();
    // console.log(address)
    const area = $('#area').val();
    const pincode =  $('#pincode').val();
    const updateButton = $('#updateBtn');
    const rowCont = ((rowCount - index) === 1);
    if (selectdata.target.id.substring(0, 9) === 'firstName') {
      if (firstname === '') {
        document.getElementById('fNameText').style.display = 'block';
        $('#fNameText').text('Please fill out this field');
      } else if (fName === false) {
        document.getElementById('fNameText').style.display = 'block';
        $('#fNameText').text('Please Enter Valid Text');
      } else if (firstname.length < 100) {
        document.getElementById('fNameText').style.display = 'none';
      } else {
        document.getElementById('fNameText').style.display = 'block';
        $('#fNameText').text('You Reached max character.');
      }
    }
    if (selectdata.target.id.substring(0, 8) === 'lastName') {
      if (lastname === '') {
        document.getElementById('lNameText').style.display = 'block';
        $('#lNameText').text('Please fill out this field');
      } else if (lName === false) {
        document.getElementById('lNameText').style.display = 'block';
        $('#lNameText').text('Please Enter Valid Text');
      } else if (lastname.length < 100) {
        document.getElementById('lNameText').style.display = 'none';
      } else {
        document.getElementById('lNameText').style.display = 'block';
        $('#lNameText').text('You Reached max character.');
      }
    }
    if (selectdata.target.id.substring(0, 8) === 'MobileNo') {
      if (mobnumber === '') {
        document.getElementById('MobileText').style.display = 'block';
        $('#MobileText').text('Please fill out this field');
      } else if (mobnumber.length < 100) {
        document.getElementById('MobileText').style.display = 'none';
      } else {
        document.getElementById('MobileText').style.display = 'block';
        $('#MobileText').text('You Reached max character.');
      }
    }
    if (selectdata.target.id.substring(0, 11) === 'AddressLine') {
      if (address === ''|| address == undefined) {
        document.getElementById('addressText1').style.display = 'block';
        $('#addressText1').text('Please fill out this field');
       } else {
        document.getElementById('addressText1').style.display = 'none';
      }
    }
    if (selectdata.target.id.substring(0, 4) === 'area') {
      if (area === ''|| area == undefined) {
        document.getElementById('AreaText').style.display = 'block';
        $('#AreaText').text('Please fill out this field');
       } else {
        document.getElementById('AreaText').style.display = 'none';
      }
    }
    if (selectdata.target.id.substring(0, 7) === 'pincode') {
      if (pincode === ''|| pincode == undefined) {
        document.getElementById('pinCodeText').style.display = 'block';
        $('#pinCodeText').text('Please fill out this field');
       } else {
        document.getElementById('pinCodeText').style.display = 'none';
      }
    }
  }
  // // Validation for each textbox in the Grid on key event, and Error msg will displayed below the textbox (BulkUSer)
  // onkeyup(selectdata: any) {
  //   const index = selectdata.target.id.match(/\d+/);
  //   const rowCount = $('#Upadteusertable tr').length;
  //   const trow = $('#Upadteusertable').find('tr');
  //   const tagName = trow.find('h6').is(':visible');
  //   const firstname = $('#firstName' + index).val();
  //   const fName = this.textBox(firstname);
  //   const lastname = $('#lastName' + index).val();
  //   const lName = this.textBox(lastname);
  //   const phnumber = $('#MobileNo' + index).val();
  //   const department = $('#departMent' + index).val();
  //   const areaOfinterest = $('#areaofInterest' + index).val();
  //   const updateButton = $('#bulkUpdateBtn');
  //   const rowCont = ((rowCount - index) === 1);
  //   if (selectdata.target.id.substring(0, 9) === 'firstName') {
  //     if (firstname === '') {
  //       document.getElementById('fNameText' + index).style.display = 'block';
  //       $('#fNameText' + index).text('Please fill out this field');
  //     } else if (fName === false) {
  //       document.getElementById('fNameText' + index).style.display = 'block';
  //       $('#fNameText' + index).text('Please Enter Valid Text');
  //     } else if (firstname.length < 100) {
  //       document.getElementById('fNameText' + index).style.display = 'none';
  //     } else {
  //       document.getElementById('fNameText' + index).style.display = 'block';
  //       $('#fNameText' + index).text('You Reached max character.');
  //     }
  //   }
  //   if (selectdata.target.id.substring(0, 8) === 'lastName') {
  //     if (lastname === '') {
  //       document.getElementById('lNameText' + index).style.display = 'block';
  //       $('#lNameText' + index).text('Please fill out this field');
  //     } else if (lName === false) {
  //       document.getElementById('lNameText' + index).style.display = 'block';
  //       $('#lNameText' + index).text('Please Enter Valid Text');
  //     } else if (lastname.length < 100) {
  //       document.getElementById('lNameText' + index).style.display = 'none';
  //     } else {
  //       document.getElementById('lNameText' + index).style.display = 'block';
  //       $('#lNameText' + index).text('You Reached max character.');
  //     }
  //   }
  // }

  // Method to select the date, in Jquery datepicker
  calendarfetch(event: any) {
    // const suffix = (<Element>event.target).id.match(/\d+/)[0];
    // Fetch the user's company Contract details
    const username = (<HTMLInputElement>document.getElementById('emailid')).value;
    const userContractObj = this.userContractArray.find((userContractObj) =>
      userContractObj['EmailId'] === username);
    if (userContractObj === undefined) {
      return;
    }
    const startdte = format(new Date(userContractObj['ContractStDate']), 'MM/DD/YYYY');
    const enddte = format(new Date(userContractObj['ContractEndDate']), 'MM/DD/YYYY');
    const sdate = startdte;
    const edate = enddte;
    $('#startdate').datepicker("destroy");
    $('#startdate').datepicker({
      changeMonth: true,
      changeYear: true,
      minDate: sdate,
      maxDate: edate,
      onSelect: function (selected) {
        const dt = new Date(selected);
        dt.setDate(dt.getDate());
        $('#enddate').datepicker('option', 'minDate', dt);
      }
    });
    $('#startdate').datepicker().datepicker("show");
    $('#enddate').datepicker("destroy");
    $('#enddate').datepicker({
      changeMonth: true,
      changeYear: true,
      minDate: sdate,
      maxDate: edate
    });
    $('#enddate').datepicker().datepicker("show");
    const id = $(event.target).closest('input')[0].id;
    $('#' + id).datepicker().datepicker('show');
  }

  // Method to toggle the 'Active' or 'Inactive' button in the grid
  toggle(Selectelement) {
    // const toggles = Selectelement.target.id.match(/\d+/);
    const statusBtn = document.getElementById('toggle') as HTMLInputElement;
    if (statusBtn.value == "InActive") {
      $("#firstName").attr('disabled', false);
      $("#lastName").attr('disabled', false);
      $("#chekBox").attr('disabled', false);
      $("#MobileNo").attr('disabled', false);
      $("#AddressLine").attr('disabled', false);
      $("#Address2").attr('disabled', false);
      $("#Country").attr('disabled', false);
      $("#State").attr('disabled', false);
      $("#city").attr('disabled', false);
      $("#area").attr('disabled', false);
      $("#pincode").attr('disabled', false);
      $("#landmark").attr('disabled', false);
      $("#companyselected").attr('disabled', false);  
      $("#selectedref").attr('disabled', false);
      $("#Usertype").attr('disabled', false);
      $("#UserRole").attr('disabled', false);
      $("#generalflag").attr('disabled', false);
      $("#startdate").attr('disabled', false);
      $("#enddate").attr('disabled', false);
      $("#toggle").attr('value', 'Active');
      $("#toggle").html('Active');
      $("#State").attr('disabled', false);
      $("#CityName").attr('disabled', false);
      $("#Country").attr('disabled', false);
      $("#AssociationTableDiv").removeClass("tabledisable");
      this.userStatus = 'Active'
    } else if (statusBtn.value == "Active") {
      $("#firstName").attr('disabled', true);
      $("#lastName").attr('disabled', true);
      $("#chekBox").attr('disabled', false);
      $("#MobileNo").attr('disabled', true);
      $("#MobileNo").attr('disabled', true);
      $("#AddressLine").attr('disabled', true);
      $("#Address2").attr('disabled', true);
      $("#Country").attr('disabled', true);
      $("#State").attr('disabled', true);
      $("#city").attr('disabled', true);
      $("#area").attr('disabled', true);
      $("#landmark").attr('disabled', true);
      $("#pincode").attr('disabled', true);
      $("#UserRole").attr('disabled', true);
      $("#companyselected").attr('disabled', true);
      $("#selectedref").attr('disabled', true);
      $("#Usertype").attr('disabled', true);
      $("#generalflag").attr('disabled', true);
      $("#startdate").attr('disabled', true);
      $("#enddate").attr('disabled', true);
      $("#toggle").attr('value', 'InActive');
      $("#toggle").html('InActive');
      $("#State").attr('disabled', true);
      $("#CityName").attr('disabled', true);
      $("#Country").attr('disabled', true);
      $("#AssociationTableDiv").addClass("tabledisable");
      this.userStatus = 'InActive'
    }
  }

   //Method to get the country name in the dropdown
   onCountrySelect(Selectelement: any) {
    const listed = getStatesOfCountry(Selectelement.value);
    $('#State').empty();
    let item = '<option value=--Select-->--Select--</option>';
    $.each(listed, function (key, value) {
      item += '<option value=' + value.id + '>' + value.name + '</option>';
    });
    $('#State').append(item);
    $('#CityName').empty();
    $('#CityName').append('<option value=--Select-->--Select--</option>');
  }
  // Triggered while binding the data to companydropdown on company selection
  onCountrySelected(Selectelement: any) {
    const listed = getStatesOfCountry(Selectelement);
    let item = '';
    $.each(listed, function (key, value) {
      item += '<option value=' + value.id + '>' + value.name + '</option>';
    });
    $('#State').append(item);
  }
  // Method to fetch the state name based on country selection
  onStateItemSelect(Selectelement: any) {
    const listed = getCitiesOfState(Selectelement.value);
    $('#CityName').empty();
    let item = '<option value=--Select-->--Select--</option>';
    $.each(listed, function (key, value) {
      item += '<option value=' + value.id + '>' + value.name + '</option>';
    });
    $('#CityName').append(item);
  }
  // Triggered while binding the data to state dropdown on company selection
  onStateItemSelected(Selectelement: any) {
    const listed = getCitiesOfState(Selectelement);
    let item = '';
    $.each(listed, function (key, value) {
      item += '<option value=' + value.id + '>' + value.name + '</option>';
    });
    $('#CityName').append(item);
  }
  //  Method to fetch the city dropdown on state selection
  onCityItemSelect(Selectelement: any) {
    this.city = getCityById(Selectelement.value - 1).name;
  }
  setSelectedValue(selectObj, valueToSet) {
    for (let i = 0; i < selectObj.options.length; i++) {
      if (selectObj.options[i].text === valueToSet) {
        selectObj.options[i].selected = true;
        return;
      }
    }
  }

  
  addAssTable(index?: any) {
    // this.addinfo = true;
    // this.addrows = true;
    const tableinfo = document.getElementById('associationTable');
    const tr = tableinfo.getElementsByTagName('tr');
    const rowcount = tr.length;
    this.rowValue += 1;
    this.Rows.push(this.rowValue);
    // const thead = tableinfo.getElementsByTagName('thead')[0];
    // const headerCheckboxid = thead.getElementsByClassName('parentcheck')[0].id;
    const ind = index.target.id.match(/\d+/);
    const addbtn = document.getElementById('addicon' + ind);
    addbtn.style.pointerEvents = 'none';
    addbtn.style.cursor = 'default';
    addbtn.style.opacity = '0.3';
  }

  deleteAssTable(index) {
      const classref = this;
      const tableinfo = document.getElementById('associationTable');
      const tr = tableinfo.getElementsByTagName('tr');
      const rowcount = tr.length;
      if (rowcount <= 1) {
        this.Rows = [0];
        this.mainCheckbox = false;
        return;
      }
      const closestTR = $(index.target).parent().parent();
      const indexOfClosesttr = closestTR.index();
      const rowDifference: boolean = (this.Rows.length < rowcount) as boolean;
      if (rowDifference) {
        $(index.target).parent().parent().remove();
      } else {
        let arrayInd = $("#" + $(index.target).parent().parent().attr("id")).index();
        this.Rows.splice(parseInt(arrayInd), 1);
      }
      const thead = tableinfo.getElementsByTagName('thead')[0];
      const headerCheckboxid = thead.getElementsByClassName('parentcheck')[0].id;
      setTimeout(function () {
       // classref.EnableAdd();    // For enabling add icon
      }, 5);
     
  }

  keyPressevent(selectdata: any) {
    const index = selectdata.target.id.match(/\d+/);
    const rowCount = $('#associationTable tr').length;
    const assName = $('#associationName' + index).val();  
    const memberid = $('#memberID' + index).val();
    const addbtn = document.getElementById('addicon' + index);
    const rowCont = ((rowCount - index) === 1);
    if (assName === '' && memberid === '') {
      addbtn.style.pointerEvents = 'none';
      addbtn.style.cursor = 'default';
      addbtn.style.opacity = '0.3';
    }
    if (assName === '' || memberid === '') {
      addbtn.style.pointerEvents = 'none';
      addbtn.style.cursor = 'default';
      addbtn.style.opacity = '0.3';
    }
    if (assName !== '' && memberid !== '') {
      addbtn.style.pointerEvents = 'auto';    
      addbtn.style.cursor = 'pointer';
      addbtn.style.opacity = '1';
    }
    if (rowCont === false) {
      addbtn.style.pointerEvents = 'none';
      addbtn.style.cursor = 'default';
      addbtn.style.opacity = '0.3';
    }
  }

  userType(event) {
    // console.log(event)
    if(event.target.value == "Appraiser") {
      $("#AssociationTableDiv").css("display","block")
      this.Rows = [0];
    } else {
      $("#AssociationTableDiv").css("display","none")
    }
  }

}

