/* Feature: When the user is registered newly in website, the userdetails will be displayed in user approval
   Two option available that is 'approve' or 'reject' , Onclick approve - authentication will be sent to users
   Onclick reject - Reason for rejection will be sent to users
*/
import { Component, OnInit } from '@angular/core';
import { AdminLoginServiceService } from '../../common-services/admin-service.service';
import { Router } from '@angular/router';
import generatePassword from '../../../../utils/admin_generatepassword';
import { isNullOrUndefinedorEmptyString } from '../../../../utils/admin_isNullorUndefinedorEmptyString';
import { format } from 'date-fns';

const JSAlert = require('js-alert');
declare var $: any;
declare var slider: any;
declare var datepicker: any;

@Component({
  selector: 'app-adminuserapproval',
  templateUrl: './adminuserapproval.component.html',
  styleUrls: ['./adminuserapproval.component.css','../../../assets/css/admin.css',
  '../../../assets/css/bootstrap.min.css']
})
export class AdminUserapprovalComponent implements OnInit {
  public enterpassword: any;
  public retypepassword: any;
  public selectFlag = false;
  mainCheckbox = false;
  categories: Object[];
  reference: Object[];
  public Contrefer: string;
  // userapprovaldetails: any[];
  userapprovaldetails: object[] = [];
  exportflag: any;
  generalflag: any;
  startdate: any;
  enddate: any;
  limits: any;
  inputRowObject: any[] = [];
  totalRec: number;
  page: number = 1;
  itemsPerpage;
  // pagenumcount : any = 1;
  IntialCount = 20;
  pageNumcount: number = 1;
  public roleName: Object[];
  emailFlag: boolean;
  fromEmail: any;
  public updateBy = sessionStorage.getItem('UserID');

  constructor(public service: AdminLoginServiceService, private router: Router) { }

  ngOnInit() {

    // Add/Remove class name for each row in the grid
    $(document).ready(function () {
      $('#approvaltable').on('click', 'input[type="checkbox"]', function (e) {
        const $row = $(this).closest('tr');
        if (this.checked) {
          $row.addClass('selected');
        } else {
          $row.removeClass('selected');
          document.getElementById($row[0].id).style.backgroundColor = '#f3f3f3';
        }
      });
    });
    //  Binding the Userdetails in UnApproved status, in the grid
    this.approvalUserslist();
    let thisReference = this;
    // service for Binding the companydropdown
    thisReference.service.companydropdown().subscribe(res => {
      this.categories = res;
    });
    // For Binding User Type
    thisReference.service.roleName().subscribe(res => {
      thisReference.roleName = res;
    });
    // Get Email_Flag Param
    thisReference.service.paramEmailFlag().subscribe(res => {
      thisReference.emailFlag = res[1].param_value;
      thisReference.fromEmail = res[0].param_value
    });
  }

  dateformat(date) {
    var formattedDate = '';
    if (date.includes('-')) {
      var modifiedDateValue = date.split("-");
      formattedDate = modifiedDateValue[1] + "/" + modifiedDateValue[0] + "/" + modifiedDateValue[2];
    }
    else {
      var todayTime = new Date(date);
      var month = todayTime.getMonth() + 1;
      var day = todayTime.getDate();
      var year = todayTime.getFullYear();
      formattedDate = (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day + '/' + year;
    }
    return formattedDate;
  }
  // Method for changing the number of records count in pagination
  pageChanged(event) {
    this.pageNumcount = (this.page - 1) * this.IntialCount + 1;
  }
  // Reference Dropdown binding based on the selected company
  onCompanyselect(Selectelement: any) {
    this.service.referencedropdown(Selectelement.target.value).subscribe(res => {
      var suffix = Selectelement.target.id.match(/\d+/); // 123456
      var items = '<option selected disabled value=\'' + '--Select--' + '\'>' + '--Select--' + '</option>';
      $('#selectedref' + suffix).empty();
      $.each(res, function (index, item) {
        items += '<option value=\'' + item + '\'>' + item + '</option>';
      });
      $('#selectedref' + suffix).append(items);
      $('#startdate' + suffix).attr('disabled', true);
      $('#enddate' + suffix).attr('disabled', true);
      $("#startdate" + suffix).datepicker("destroy");
      $("#enddate" + suffix).datepicker("destroy");
    });
  }
  // Data Binding for other textbox and Dropdown based on contract reference selection
  onchangereference(selectdata: any) {
    this.service.downloadtxt(selectdata.target.value).subscribe(res => {
      var id = selectdata.target.id.match(/\d+/);
      for (const i of res) {
        const generalflag: any = document.getElementById('generalflag' + id);
        i.GeneralAlert ? generalflag.value = 'true' : generalflag.value = 'false';
        const startdate: any = document.getElementById('startdate' + id);
        startdate.value = format(new Date(i.StartDate), 'MM/DD/YYYY')
        const enddate = document.getElementById('enddate' + id);
        (<HTMLInputElement>enddate).value = format(new Date(i.EndDate), 'MM/DD/YYYY');
      }
      $('#startdate' + id).attr('disabled', false);
      $('#enddate' + id).attr('disabled', false);
    });
  }

  ItemSelelect(value: any) {
    const usertype = $('#Usertype').val();
  }
  reset() {
    this.enterpassword = '';
    this.retypepassword = '';
  }

  display = 'none';
  modalclose() {
    this.display = 'none';
  }

  openModal() {
    this.display = 'block';
  }
  // Method to get the 'unApproved' users from DB
  approvalUserslist() {
    this.userapprovaldetails = [];
    this.service.approvaldetails().subscribe(res => {
      for (const users of res) {
        const obj: object = {};
        obj['first_name'] = users.FirstName;
        obj['last_name'] = users.LastName;
        obj['email_id'] = users.ContactDetails.EmailID;
        obj['mobile_number'] = users.ContactDetails.MobileNo;
        obj['addressLine1'] = users.Address.AddressLine1;
        obj['addressLine2'] = users.Address.AddressLine2;
        obj['country'] = users.Address.Country;
        obj['state'] = users.Address.State;
        obj['city'] = users.Address.City;
        obj['area'] = users.Address.AddArea;
        obj['landMark'] = users.Address.Landmark;
        obj['Pincode'] = users.Address.Pincode;
        obj['registered_company'] = users.RegisteredCompanyName;

        obj['created_date'] = new Date(users.CreatedDate).toLocaleString();
        this.userapprovaldetails.push(obj);
      }
      const ngxpge = document.getElementsByClassName('ngxpagination');
      if (this.userapprovaldetails.length === 0) {
        $('.ngxpagination').css('display'​​​​​​​​​​​​​​​​​​​​​​​​​​​, 'none');
        $('#noOfrec').css('display'​​​​​​​​​​​​​​​​​​​​​​​​​​​, 'none');
      }
      this.totalRec = this.userapprovaldetails.length;
    });
  }

  validateDate = (startDate: string, endDate: string) => new Date(startDate) < new Date(endDate);
  // Submitting the approval data
  submitapprove() {
    const emailflag = this.emailFlag;
    const fromemail = this.fromEmail;
    const UpdatedBy = this.updateBy;
    // Check the checkboxes are checked
    const $table = document.getElementById('approvaltable');
    const $chkbox_checked = $('tbody input[type="checkbox"]:checked', $table);
    const classref = this;
    const trow = $('#approvaltable').find('.selected');
    trow.each(function (el) {
      const rowId = (trow[el].id);
      const firstname = $(trow[el]).find('.firstName').val();
      const lastname = $(trow[el]).find('.lastName').val();
      const email_id = $(trow[el]).find('.emailid').val();
      const mobileno = $(trow[el]).find('.mobileNo').val();
      const address1 = $(trow[el]).find('.address1').val();
      const address2 = $(trow[el]).find('.address2').val();
      const regCountry = $(trow[el]).find('.regCountry').val();
      const state = $(trow[el]).find('.state').val();
      const city = $(trow[el]).find('.city').val();
      const area = $(trow[el]).find('.addressarea').val();
      const landmark = $(trow[el]).find('.landMark').val();
      const pincode = $(trow[el]).find('.pinCode').val();
      const password = generatePassword();
      const companyname = $(trow[el]).find('.companyselected').val();
      const contractref = $(trow[el]).find('.selectedref').val();
      const userType = $(trow[el]).find('.Usertype').val();
      const userRole = $(trow[el]).find('.Userrole').val();
      const startdate = $(trow[el]).find('.startdate').val();
      const enddate = $(trow[el]).find('.enddate').val();
      const generalflag = $(trow[el]).find('.generalflag').val();

      if ([companyname, contractref, userType, userRole].some(isNullOrUndefinedorEmptyString)) {
        document.getElementById(rowId).style.backgroundColor = '#c3acb1';
        return;
      }
      if (!classref.validateDate(startdate, enddate)) {
        document.getElementById(rowId).style.backgroundColor = '#c3acb1';
        return;
      }
      // Fn Validate Date here
      document.getElementById(rowId).remove();
      const rowObject = {
        'firstname': firstname,
        'lastname': lastname,
        'mobileno': mobileno,
        'address1': address1,
        'address2': address2,
        'Country': regCountry,
        'state': state,
        'city': city,
        'area': area,
        'landmark': landmark,
        'pincode': pincode,
        'companyname': companyname,
        'contractref': contractref,
        'userType': userType,
        'userRole': userRole,
        'email_id': email_id,
        'password': password,
        'startdate': startdate,
        'enddate': enddate,
        'generalflag': generalflag,
        'email_flag': emailflag,
        'from_email': fromemail,
        'last_updated_by': UpdatedBy
      };
      classref.inputRowObject.push(rowObject);
    });
    if (this.inputRowObject.length === 0) {
      JSAlert.alert('Please fill the mandatory fields for highlighted Rows');
      return;
    }
    this.service.userapprovaldetails(classref.inputRowObject).subscribe((res) => {
      if (res === 1) {
        JSAlert.alert('User Approved Successfully');
        classref.inputRowObject = [];
        this.router.navigate(['/loader']);
      } else {
        JSAlert.alert('Please fill the mandatory fields for highlighted Rows');
      }
    });
  }
  // On Reject click to show the modal popup
  reject() {
    this.openModal();
  }
  // Onkey event, to enable submit button in the popup
  onKey(event: any) {
    const comments = $('.comment').val();
    const sumbitrejbtn = $('#sumbitrej');
    if (comments !== '') {
      sumbitrejbtn.removeAttr('disabled');
    } else {
      sumbitrejbtn.attr('disabled', 'disabled');
    }
  }
  //  Submitting rejected data
  submitreject() {
    const classref = this;
    const UpdatedBy = this.updateBy;
    const emailflag = this.emailFlag;
    const fromemail = this.fromEmail;
    const comments = $('.comment').val();
    const trow = $('#approvaltable').find('.selected');
    trow.each(function (el) {
      const first_name = $(trow[el]).find('.firstName').val();
      const last_name = $(trow[el]).find('.lastName').val();
      const email_id = $(trow[el]).find('.emailid').val();
      const mobnumber = $(trow[el]).find('.mobileNo').val();
      const department = $(trow[el]).find('.department').val();
      const areaofinterest = $(trow[el]).find('.areaofinterest').val();
      const rowObject = {
        'first_name': first_name,
        'last_name': last_name,
        'email_id': email_id,
        'phone_number': mobnumber,
        'department': department,
        'area_of_interest': areaofinterest,
        'comment': comments,
        'emailFlag': emailflag,
        'from_email': fromemail,
        'last_updated_by': UpdatedBy
      };
      classref.inputRowObject.push(rowObject);
    });
    // DB call to submit the rejected data
    this.service.userrjectdetails(classref.inputRowObject).subscribe((res) => {
      JSAlert.alert('User Rejected Successfully');
      classref.inputRowObject = [];
      this.router.navigate(['/loader']);
    });
  }

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
    const approvebtn = $('#approveBtn');
    const rejectbtn = $('#rejectBtn');
    let trueCount = 0;
    const checkboxChecker = function () {
      $('table tr').each(function (i) {
        // Only check rows that contain a checkbox
        const $chkbox = $(this).find('input[type="checkbox"]');
        if ($chkbox.length) {
          const status = $chkbox.prop('checked');
          if (status) {
            trueCount++;
          }
        }
      });
    };

    // Check checkboxes status on DOMready
    checkboxChecker();
    // Check again when checkboxes states are changed
    $('table tr input[type="checkbox"]').on('change', function () {
      checkboxChecker();
    });
    if (trueCount > 0) {
      rejectbtn.removeAttr('disabled');
      approvebtn.removeAttr('disabled');
    } else {
      rejectbtn.attr('disabled', 'disabled');
      approvebtn.attr('disabled', 'disabled');
    }
  }

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

  // Calendar click event, based on the selection the max and min date is set
  datefetch(event: any) {
    const suffix = event.target.id.match(/\d+/);
    const startdte = $('#startdate' + suffix).val();
    const enddte = $('#enddate' + suffix).val();
    const sdate = (new Date(startdte));
    const edate = (new Date(enddte));
    $('#startdate' + suffix).datepicker({
      changeMonth: true,
      changeYear: true,
      minDate: sdate,
      maxDate: edate,
      onSelect: function (selected) {
        const dt = new Date(selected);
        dt.setDate(dt.getDate());
        $('#enddate' + suffix).datepicker('option', 'minDate', dt);
      }
    });
    $('#enddate' + suffix).datepicker({
      changeMonth: true,
      changeYear: true,
      minDate: sdate,
      maxDate: edate,
    });
    const id = $(event.target).closest('input')[0].id;
    $('#' + id).datepicker().datepicker('show');
  }

  MyDropFunOnee(data) {
    this.IntialCount = (parseInt(data.target.value));
    this.page = (Math.floor(this.pageNumcount / data.target.value)) + 1;
    this.pageNumcount = (this.page - 1) * this.IntialCount + 1;
  }
}






























// /* Feature: When the user is registered newly in website, the userdetails will be displayed in user approval
//    Two option available that is 'approve' or 'reject' , Onclick approve - authentication will be sent to users
//    Onclick reject - Reason for rejection will be sent to users
// */
// import { Component, OnInit } from '@angular/core';
// import { AdminLoginServiceService } from '../../common-services/admin-service.service';
// import { Router } from '@angular/router';
// import generatePassword from '../../../../utils/admin_generatepassword';
// import { isNullOrUndefinedorEmptyString } from '../../../../utils/admin_isNullorUndefinedorEmptyString'; 
// import { format } from 'date-fns';

// const JSAlert = require('js-alert');
// declare var $: any;
// declare var slider: any;
// declare var datepicker: any;

// @Component({
//   selector: 'app-adminuserapproval',
//   templateUrl: './adminuserapproval.component.html',
//   styleUrls: ['./adminuserapproval.component.css']
// })
// export class AdminUserapprovalComponent implements OnInit {
//   public enterpassword: any;
//   public retypepassword: any;
//   public selectFlag = false;
//   mainCheckbox = false;
//   categories: Object[];
//   reference: Object[];
//   public Contrefer: string;
//   // userapprovaldetails: any[];
//   userapprovaldetails: object[] = [];
//   exportflag: any;
//   generalflag: any;
//   startdate: any;
//   enddate: any;
//   limits: any;
//   inputRowObject: any[] = [];
//   totalRec: number;
//   page: number = 1;
//   itemsPerpageCount = 20;
//   pageNumcount: number = 1;
//   public roleName: Object[];
//   emailFlag: boolean;
//   fromEmail: any;
//   public updateBy = sessionStorage.getItem('UserID');

//   constructor(public service: AdminLoginServiceService, private router: Router) { }

//   ngOnInit() {

//     // Add/Remove class name for each row in the grid
//     $(document).ready(function () {
//       $('#approvaltable').on('click', 'input[type="checkbox"]', function (e) {
//         const $row = $(this).closest('tr');
//         if (this.checked) {
//           $row.addClass('selected');
//         } else {
//           $row.removeClass('selected');
//           document.getElementById($row[0].id).style.backgroundColor = '#f3f3f3';
//         }
//       });
//     });
//     //  Binding the Userdetails in UnApproved status, in the grid
//     this.approvalUserslist();
//     let thisReference = this;
//     // service for Binding the companydropdown
//     thisReference.service.companydropdown().subscribe(res => {
//       this.categories = res;
//     });
//     // For Binding User Type
//     thisReference.service.roleName().subscribe(res => {
//       thisReference.roleName = res;
//     });
//     // Get Email_Flag Param
//     thisReference.service.paramEmailFlag().subscribe(res => {
//       thisReference.emailFlag = res[1].param_value;
//       thisReference.fromEmail = res[0].param_value
//     });
//   }

//   dateformat(date) {
//     var formattedDate = '';
//     if (date.includes('-')) {
//       var modifiedDateValue = date.split("-");
//       formattedDate = modifiedDateValue[1] + "/" + modifiedDateValue[0] + "/" + modifiedDateValue[2];
//     }
//     else {
//       var todayTime = new Date(date);
//       var month = todayTime.getMonth() + 1;
//       var day = todayTime.getDate();
//       var year = todayTime.getFullYear();
//       formattedDate = (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day + '/' + year;
//     }
//     return formattedDate;
//   }
//  // Method for changing the number of records count in pagination
//  pageChanged(event){
//   this.pageNumcount = (this.page -1) * this.itemsPerpageCount + 1 ;
// }
//   // Reference Dropdown binding based on the selected company
//   onCompanyselect(Selectelement: any) {
//     this.service.referencedropdown(Selectelement.target.value).subscribe(res => {
//       var suffix = Selectelement.target.id.match(/\d+/); // 123456
//       var items = '<option selected disabled value=\'' + '--Select--' + '\'>' + '--Select--' + '</option>';
//       $('#selectedref' + suffix).empty();
//       $.each(res, function (index, item) {
//         items += '<option value=\'' + item + '\'>' + item + '</option>';
//       });
//       $('#selectedref' + suffix).append(items);
//       $('#startdate' + suffix).attr('disabled', true);
//       $('#enddate' + suffix).attr('disabled', true);
//       $("#startdate" + suffix).datepicker("destroy");
//       $("#enddate" + suffix).datepicker("destroy");
//     });
//   }
//   // Data Binding for other textbox and Dropdown based on contract reference selection
//   onchangereference(selectdata: any) {
//     this.service.downloadtxt(selectdata.target.value).subscribe(res => {
//       var id = selectdata.target.id.match(/\d+/);
//       console.log(res)
//       for (const i of res) {
//         const generalflag: any = document.getElementById('generalflag' + id);
//         i.GeneralAlert ? generalflag.value = 'true' : generalflag.value = 'false';
//         const startdate: any = document.getElementById('startdate' + id);
//         startdate.value = format(new Date(i.StartDate), 'MM/DD/YYYY')
//         const enddate = document.getElementById('enddate' + id);
//         (<HTMLInputElement>enddate).value = format(new Date(i.EndDate), 'MM/DD/YYYY');
//       }
//       $('#startdate' + id).attr('disabled', false);
//       $('#enddate' + id).attr('disabled', false);
//     });
//   }

//   ItemSelelect(value: any) {
//     const usertype = $('#Usertype').val();
//   }
//   reset() {
//     this.enterpassword = '';
//     this.retypepassword = '';
//   }

//   display = 'none';
//   modalclose() {
//     this.display = 'none';
//   }

//   openModal() {
//     this.display = 'block';
//   }
//   // Method to get the 'unApproved' users from DB
//   approvalUserslist() {
//     this.userapprovaldetails = [];
//     this.service.approvaldetails().subscribe(res => {
//       for (const users of res) {
//         const obj: object = {};
//         obj['first_name'] = users.FirstName;
//         obj['last_name'] = users.LastName;
//         obj['email_id'] = users.ContactDetails.EmailID;
//         obj['mobile_number'] = users.ContactDetails.MobileNo;
//         obj['addressLine1'] = users.Address.AddressLine1;
//         obj['addressLine2'] = users.Address.AddressLine2;
//         obj['country'] = users.Address.Country;
//         obj['state'] = users.Address.State;
//         obj['city'] = users.Address.City;
//         obj['area'] = users.Address.AddArea;
//         obj['landMark'] = users.Address.Landmark;
//         obj['Pincode'] = users.Address.Pincode;
//         obj['registered_company'] = users.RegisteredCompanyName;

//         obj['created_date'] = new Date(users.CreatedDate).toLocaleString();
//         this.userapprovaldetails.push(obj);
//       }
//       const ngxpge = document.getElementsByClassName('ngxpagination');
//       if (this.userapprovaldetails.length === 0) {
//         $('.ngxpagination').css('display'​​​​​​​​​​​​​​​​​​​​​​​​​​​, 'none');
//         $('#noOfrec').css('display'​​​​​​​​​​​​​​​​​​​​​​​​​​​, 'none');
//       }
//       this.totalRec = this.userapprovaldetails.length;
//     });
//   }

//   validateDate = (startDate: string, endDate: string) => new Date(startDate) < new Date(endDate);
//   // Submitting the approval data
//   submitapprove() {
//     const emailflag = this.emailFlag;
//     const fromemail = this.fromEmail;
//     const UpdatedBy = this.updateBy;
//     // Check the checkboxes are checked
//     const $table = document.getElementById('approvaltable');
//     const $chkbox_checked = $('tbody input[type="checkbox"]:checked', $table);
//     const classref = this;
//     const trow = $('#approvaltable').find('.selected');
//     trow.each(function (el) {
//       const rowId = (trow[el].id);
//       const firstname = $(trow[el]).find('.firstName').val();
//       const lastname = $(trow[el]).find('.lastName').val();
//       const email_id = $(trow[el]).find('.emailid').val();
//       const mobileno = $(trow[el]).find('.mobileNo').val();
//       const address1 = $(trow[el]).find('.address1').val();
//       const address2 = $(trow[el]).find('.address2').val();
//       const regCountry = $(trow[el]).find('.regCountry').val();
//       const state = $(trow[el]).find('.state').val();
//       const city = $(trow[el]).find('.city').val();
//       const area = $(trow[el]).find('.addressarea').val();
//       const landmark = $(trow[el]).find('.landMark').val();
//       const pincode = $(trow[el]).find('.pinCode').val();
//       const password = generatePassword();
//       const companyname = $(trow[el]).find('.companyselected').val();
//       const contractref = $(trow[el]).find('.selectedref').val();
//       const userType = $(trow[el]).find('.Usertype').val();
//       const userRole = $(trow[el]).find('.Userrole').val();
//       const startdate = $(trow[el]).find('.startdate').val();
//       const enddate = $(trow[el]).find('.enddate').val();
//       const generalflag = $(trow[el]).find('.generalflag').val();

//       if ([companyname, contractref, userType, userRole].some(isNullOrUndefinedorEmptyString)) {
//         document.getElementById(rowId).style.backgroundColor = '#c3acb1';
//         return;
//       }
//       if (!classref.validateDate(startdate, enddate)) {
//         document.getElementById(rowId).style.backgroundColor = '#c3acb1';
//         return;
//       }
//       // Fn Validate Date here
//       document.getElementById(rowId).remove();
//       const rowObject = {
//         'firstname': firstname,
//         'lastname' : lastname,
//         'mobileno' : mobileno,
//         'address1': address1,
//         'address2': address2,
//         'Country': regCountry,
//         'state':state,
//         'city': city,
//         'area': area,
//         'landmark':landmark,
//         'pincode':pincode,
//         'companyname': companyname,
//         'contractref': contractref,
//         'userType': userType,
//         'userRole': userRole,
//         'email_id': email_id,
//         'password': password,
//         'startdate': startdate,
//         'enddate': enddate,
//         'generalflag': generalflag,
//         'email_flag': emailflag,
//         'from_email': fromemail,
//         'last_updated_by': UpdatedBy
//       };
//       classref.inputRowObject.push(rowObject);
//       console.log(classref.inputRowObject)
//     });
//     if (this.inputRowObject.length === 0) {
//       JSAlert.alert('Please fill the mandatory fields for highlighted Rows');
//       return;
//     }
//     this.service.userapprovaldetails(classref.inputRowObject).subscribe((res) => {
//       console.log(res)
//       if (res === 1) {
//         JSAlert.alert('User Approved Successfully');
//         classref.inputRowObject = [];
//         this.router.navigate(['/loader']);
//       } else {
//         JSAlert.alert('Please fill the mandatory fields for highlighted Rows');
//       }
//     });
//   }
//   // On Reject click to show the modal popup
//   reject() {
//     this.openModal();
//   }
//   // Onkey event, to enable submit button in the popup
//   onKey(event: any) {
//     const comments = $('.comment').val();
//     const sumbitrejbtn = $('#sumbitrej');
//     if (comments !== '') {
//       sumbitrejbtn.removeAttr('disabled');
//     } else {
//       sumbitrejbtn.attr('disabled', 'disabled');
//     }
//   }
//   //  Submitting rejected data
//   submitreject() {
//     const classref = this;
//     const UpdatedBy = this.updateBy;
//     const emailflag = this.emailFlag;
//     const fromemail = this.fromEmail;
//     const comments = $('.comment').val();
//     const trow = $('#approvaltable').find('.selected');
//     trow.each(function (el) {
//       const first_name = $(trow[el]).find('.firstName').val();
//       const last_name = $(trow[el]).find('.lastName').val();
//       const email_id = $(trow[el]).find('.emailid').val();
//       const mobnumber = $(trow[el]).find('.mobileNo').val();
//       const department = $(trow[el]).find('.department').val();
//       const areaofinterest = $(trow[el]).find('.areaofinterest').val();
//       const rowObject = {
//         'first_name': first_name,
//         'last_name': last_name,
//         'email_id': email_id,
//         'phone_number': mobnumber,
//         'department': department,
//         'area_of_interest': areaofinterest,
//         'comment': comments,
//         'emailFlag': emailflag,
//         'from_email': fromemail,
//         'last_updated_by': UpdatedBy
//       };
//       classref.inputRowObject.push(rowObject);
//     });
//     // DB call to submit the rejected data
//     this.service.userrjectdetails(classref.inputRowObject).subscribe((res) => {
//       JSAlert.alert('User Rejected Successfully');
//       classref.inputRowObject = [];
//       this.router.navigate(['/loader']);
//     });
//   }

//   checkbx(event: any) {
//     if (event.target.checked) {
//       $('.chkGrp:not(:checked)').trigger('click');

//     } else {
//       $('.chkGrp:checked').trigger('click');
//     }
//   }

//   checkboxloop(ref: any) {
//     /* Using JQUERY to fetch the table, all checkboxes using css class and those which are selected
//     Then the chkbox_checked is checked for three scenarios 1) None, 2) All Selected 3) Some of them are selected  */
//     const $table = $(ref.target).closest('table').get(0);
//     const thead = $table.getElementsByTagName('thead')[0];
//     const checkboxid = thead.getElementsByClassName('parentcheck')[0].id;
//     this.checkboxfunctionality($table, checkboxid);
//     const approvebtn = $('#approveBtn');
//     const rejectbtn = $('#rejectBtn');
//     let trueCount = 0;
//     const checkboxChecker = function () {
//       $('table tr').each(function (i) {
//         // Only check rows that contain a checkbox
//         const $chkbox = $(this).find('input[type="checkbox"]');
//         if ($chkbox.length) {
//           const status = $chkbox.prop('checked');
//           if (status) {
//             trueCount++;
//           }
//         }
//       });
//     };

//     // Check checkboxes status on DOMready
//     checkboxChecker();
//     // Check again when checkboxes states are changed
//     $('table tr input[type="checkbox"]').on('change', function () {
//       checkboxChecker();
//     });
//     if (trueCount > 0) {
//       rejectbtn.removeAttr('disabled');
//       approvebtn.removeAttr('disabled');
//     } else {
//       rejectbtn.attr('disabled', 'disabled');
//       approvebtn.attr('disabled', 'disabled');
//     }
//   }

//   // CheckBox Functionality
//   checkboxfunctionality($table, checkboxid) {
//     // Accepts a table and thead Checkbox id
//     const $chkbox_all = $('tbody input[type="checkbox"]', $table);
//     const $chkbox_checked = $('tbody input[type="checkbox"]:checked', $table);
//     const chkbox_select_all_html = $('thead #' + checkboxid, $table).get(0);
//     // Get Table Values
//     const tr = $table.getElementsByTagName('tr');
//     const rowcount = tr.length;
//     if (($chkbox_checked.length === 0)) {
//       // Case 1: None of the checkboxes are selected
//       this.mainCheckbox = false;
//       chkbox_select_all_html.indeterminate = false;
//     } else if ($chkbox_checked.length === $chkbox_all.length) {
//       // Case 2: All of the checkboxes are selected
//       if (rowcount <= 1) {
//         this.mainCheckbox = false;
//         chkbox_select_all_html.indeterminate = true;
//         return;
//       }
//       this.mainCheckbox = true;
//       chkbox_select_all_html.indeterminate = false;
//     } else {
//       // Case 3: Some of the checkboxes are selected
//       this.mainCheckbox = false;
//       chkbox_select_all_html.indeterminate = true;
//     }
//   }

//   // Calendar click event, based on the selection the max and min date is set
//   datefetch(event: any) {
//     const suffix = event.target.id.match(/\d+/);
//     const startdte = $('#startdate' + suffix).val();
//     const enddte = $('#enddate' + suffix).val();
//     const sdate = (new Date(startdte));
//     const edate = (new Date(enddte));
//     $('#startdate' + suffix).datepicker({
//       changeMonth: true,
//       changeYear: true,
//       minDate: sdate,
//       maxDate: edate,
//       onSelect: function (selected) {
//         const dt = new Date(selected);
//         dt.setDate(dt.getDate());
//         $('#enddate' + suffix).datepicker('option', 'minDate', dt);
//       }
//     });
//     $('#enddate' + suffix).datepicker({
//       changeMonth: true,
//       changeYear: true,
//       minDate: sdate,
//       maxDate: edate,
//     });
//     const id = $(event.target).closest('input')[0].id;
//     $('#' + id).datepicker().datepicker('show');
//   }
// }
