// Feature: Bulk User details can be inserted, Neither by entering the data in grid nor Uploading the data 
// in the Grid. On submit click authenication will be sent to the respective users

import { setTimeout } from 'timers';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AdminLoginServiceService } from '../../common-services/admin-service.service';
import { isNullOrUndefinedorEmptyString } from '../../../../utils/admin_isNullorUndefinedorEmptyString';
const JSAlert = require('js-alert');
import * as XLSX from 'xlsx';  //Excel upload
import { parse } from 'url';
import { format } from 'date-fns';
declare var $: any;
declare var slider: any;
declare var datepicker: any;

@Component({
  selector: 'app-adminbulkuser',
  templateUrl: './adminbulkuser.component.html',
  styleUrls: ['./adminbulkuser.component.css','../../../assets/css/admin.css',
  '../../../assets/css/bootstrap.min.css']
})
export class AdminBulkuserComponent implements OnInit, AfterViewInit {
  public userType: string[] = ['Free User', 'Basic User', 'Permium User', 'Admin User'];
  public export;
  public addrows = false;
  public upload = false;
  public addinfo = true;
  public userupload = false;
  public uploadNoPlus = true;
  trashDisabled = false;
  mainCheckbox = false;
  uploadFlag = false;
  uploadFlag1 = false;
  exportOption: string[];
  generate: string[];
  reference: Object[];
  categories: Object[];
  public jsonObject: Object[];
  public roleName: Object[];
  exportflag: any;
  generalflag: any;
  startdate: any;
  enddate: any;
  limits: any;
  userdrop = [];
  selectedCompanyName: any
  rowValue = 0;
  public updateBy = sessionStorage.getItem('UserID');
  constructor(public service: AdminLoginServiceService, private router: Router) { }
  Rows = [0];
  exportDropdown = [];
  inputGridObject: any[] = [];
  emailFlag: boolean;
  fromemail: any;
  public  newAttribute: any = {};

  isNullOrUndefined = x => x === null || x === undefined;
  // Email Validation
  validateEmail(sEmail: string): boolean {
    const filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(sEmail)) {
      return true;
    } else {
      return false;
    }
  }
  // Textbox Validation
  textBox(text: string): boolean {
    const filter = /^[a-zA-Z0-9\s]*$/;
    if (filter.test(text)) {
      return true;
    } else {
      return false;
    }
  }
  // password Validation
  passValid(text: string): boolean {
    const expression = /^(?=^.{8,20}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;
    if (expression.test(text)) {
      return true;
    }
    else {
      return false;
    }
  }
  ngOnInit() {
    //  Add/Remove class for the row on checkbox selection
    $(document).ready(function () {
      $('#personalInfoTable').on('click', 'input[type="checkbox"]', function (e) {
        const $row = $(this).closest('tr');
        if (this.checked) {
          $row.addClass('selected');
        } else {
          $row.removeClass('selected');
        }
      });
    });

    // Get EmailFlag from Param
    this.service.paramEmailFlag().subscribe(res => {
      this.fromemail = res[0].param_value
      this.emailFlag = res[1].param_value;
    });

    // Bind Company Dropdown
    this.service.companydropdown().subscribe(res => {
      let compdrop = []
      this.userdrop = []
      // response is an array of objects
      for (const user of res) {
        this.userdrop.push(user.companyname);
      }
    });

    // Bind User Type Dropdown
    this.service.roleName().subscribe(res => {
      this.roleName = res;
    });
  }
  // Contract Reference Dropdown binding based on the selected company
  onCompanyselect(Selectelement: any) {
    this.selectedCompanyName = Selectelement.text
    this.service.referencedropdown(Selectelement.text).subscribe(res => {
      res.sort();
      let items = '<option selected disabled value=\'' + '--Select--' + '\'>' + '--Select--' + '</option>';
      $('#selectedref').empty();
      $.each(res, function (index, item) {
        items += '<option value=\'' + item + '\'>' + item + '</option>';
      });
      $('#selectedref').append(items);
      this.limits = '';
      this.exportflag = '';
      this.generalflag = '';
      this.startdate = '';
      this.enddate = '';
    });
    $('#startdate').attr('disabled', true);
    $('#enddate').attr('disabled', true);
    $("#startdate").datepicker("destroy");
    $("#enddate").datepicker("destroy");
  }
  // Data Binding for other textbox and Dropdown based on contract reference selection
  onchangereference(selectdata: any) {
    this.service.downloadtxt(selectdata.value).subscribe(res => {
      for (const i of res) {
        this.limits = i.DownloadLimit;
        i.Exportflag ? this.exportflag = 'Yes' : this.exportflag = 'No';
        i.GeneralAlert ? this.generalflag = 'true' : this.generalflag = 'false';
        this.startdate = format(new Date(i.StartDate), 'MM/DD/YYYY');
        this.enddate = format(new Date(i.EndDate), 'MM/DD/YYYY');
      }
      $('#startdate').attr('disabled', false);
      $('#enddate').attr('disabled', false);
    });
    const companyName = this.selectedCompanyName[0].text;
    const contractref = $('#selectedref').val();
    const usertype = $('#userType').val();
    const Uploadbtn = $('#uploadBtn');
    if (companyName !== '' && companyName !== null && contractref !== '' && contractref !== null && usertype !== '' && usertype !== null) {
      Uploadbtn.removeAttr('disabled');
    } else {
      Uploadbtn.attr('disabled', 'disabled');
    } if (companyName !== '' && companyName !== null && contractref !== '' && contractref !== null &&
      usertype !== '' && usertype !== null) {
      Uploadbtn.removeAttr('disabled');
    } else {
      Uploadbtn.attr('disabled', 'disabled');
    }
  }
  select(date){
    alert('hjsfd')
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

  ngAfterViewInit() {
  }
 
  reset() {
    this.router.navigate(['/loader']);
  }

  // Usertype select event & enable upload button
  onItemSelect(value: any) {
    const companyName = this.selectedCompanyName;
    const contractref = $('#selectedref').val();
    const usertype = $('#userType').val();
    const Uploadbtn = $('#uploadBtn');
    if (companyName !== '' && companyName !== null && contractref !== '' && contractref !== null && usertype !== '' && usertype !== null) {
      Uploadbtn.removeAttr('disabled');
    } else {
      Uploadbtn.attr('disabled', 'disabled');
    }
  }
  // jquery calendar control, for fetching the date
  fetchdate(event: any) {
    $("#startdate").datepicker("destroy");
    $("#enddate").datepicker("destroy");
    const stdate = (new Date(this.startdate));
    const eddate = (new Date(this.enddate));
    $('#startdate').datepicker({
      changeMonth: true,
      changeYear: true,
      minDate: stdate,
      maxDate: eddate,
      onSelect: function (selected) {
        const dt = new Date(selected);
        dt.setDate(dt.getDate());
        $('#enddate').datepicker('option', 'minDate', dt);
      }
    });
    $('#enddate').datepicker({
      changeMonth: true,
      changeYear: true,
      minDate: stdate,
      maxDate: eddate
    });
    const id = $(event.target).closest('input')[0].id;
    $('#' + id).datepicker().datepicker('show');
  }
  //  Method to check the password textbox validation
  confirmpasWrd(data: any) {
    const index = data.target.id.match(/\d+/);
    const pasWord = $('#passWord' + index).val();
    const confirmPaswrd = $('#confirmPasswrd' + index).val();
    const addbtn = document.getElementById('addicon' + index);
    const confirmvalidpass = this.passValid(confirmPaswrd);
    const paswordvalid = this.passValid(pasWord);
    if (pasWord == '') {
      document.getElementById('passwordtext' + index).style.display = 'block';
      document.getElementById('instructions' + index).style.display = 'none';
      $('#passwordtext' + index).text('Please fill the field');
      addbtn.style.pointerEvents = 'none';
      addbtn.style.cursor = 'default';
      addbtn.style.opacity = '0.3';
    }
    else if (confirmPaswrd == '') {
      document.getElementById('confirmpaswrdtext' + index).style.display = 'block';
      document.getElementById('instructions' + index).style.display = 'none';
      $('#confirmpaswrdtext' + index).text('Please fill the field');
      addbtn.style.pointerEvents = 'none';
      addbtn.style.cursor = 'default';
      addbtn.style.opacity = '0.3';
    }
    else if (confirmvalidpass == false) {
      document.getElementById('confirmpaswrdtext' + index).style.display = 'inline-block';
      document.getElementById('instructions' + index).style.display = 'inline-block';
      $('#confirmpaswrdtext' + index).text('Please Enter Valid Password');
      addbtn.style.pointerEvents = 'none';
      addbtn.style.cursor = 'default';
      addbtn.style.opacity = '0.3';
    }
    if (confirmvalidpass == true && paswordvalid == true) {
      if (pasWord != confirmPaswrd) {
        document.getElementById('confirmpaswrdtext' + index).style.display = 'block';
        document.getElementById('instructions' + index).style.display = 'none';
        $('#confirmpaswrdtext' + index).text('Password is not matching');
        addbtn.style.pointerEvents = 'none';
        addbtn.style.cursor = 'default';
        addbtn.style.opacity = '0.3';
        document.getElementById('passwordtext' + index).style.display = 'none';
      }
      // else if (pasWord.length < 8) {
      //   document.getElementById('passwordtext' + index).style.display = 'block';
      //   $('#passwordtext' + index).text('Atleast 8 characters required');
      //   document.getElementById('confirmpaswrdtext' + index).style.display = 'none';
      // }
      else if (pasWord == confirmPaswrd) {
        document.getElementById('confirmpaswrdtext' + index).style.display = 'none';
        document.getElementById('passwordtext' + index).style.display = 'none';
        document.getElementById('instructions' + index).style.display = 'none';
      }
    }
  }
  passwordValidate(data) {
    const ind = data.target.id.match(/\d+/);
    const pasWord = $('#passWord' + ind).val();
    const confirmPaswrd = $('#confirmPasswrd' + ind).val();
    const addbtn = document.getElementById('addicon' + ind);
    const validpassWrd = this.passValid(pasWord);
    const confirmpassValid = this.passValid(confirmPaswrd);
    if (pasWord == '') {
      document.getElementById('passwordtext' + ind).style.display = 'block';
      $('#passwordtext' + ind).text('Please fill the field');
      document.getElementById('instruction' + ind).style.display = 'none';
    } else if (validpassWrd == false) {
      document.getElementById('passwordtext' + ind).style.display = 'inline-block';
      document.getElementById('instruction' + ind).style.display = 'inline-block';
      $('#passwordtext' + ind).text('Please Enter Valid Password');
      addbtn.style.pointerEvents = 'none';
      addbtn.style.cursor = 'default';
      addbtn.style.opacity = '0.3';
    }
    if (validpassWrd == true && confirmpassValid == true) {
      if (confirmPaswrd !== '' && pasWord !== '') {
        if (pasWord !== confirmPaswrd) {
          document.getElementById('passwordtext' + ind).style.display = 'block';
          $('#passwordtext' + ind).text('Password is not matching');
          document.getElementById('instruction' + ind).style.display = 'none';
          addbtn.style.pointerEvents = 'none';
          addbtn.style.cursor = 'default';
          addbtn.style.opacity = '0.3';
          document.getElementById('confirmpaswrdtext' + ind).style.display = 'none';
        }
        else if (pasWord == confirmPaswrd) {
          document.getElementById('confirmpaswrdtext' + ind).style.display = 'none';
          document.getElementById('passwordtext' + ind).style.display = 'none';
          document.getElementById('instruction' + ind).style.display = 'none';
        }
      }
    }
  }
  // Validation for each textbox in the Grid on key event, and Error msg will displayed below the textbox
  onKey(selectdata: any) {
    const index = selectdata.target.id.match(/\d+/);
    const rowCount = $('#personalInfoTable tr').length;
    const firstname = $('#firstName' + index).val();
    const fName = this.textBox(firstname);
    const lastname = $('#lastName' + index).val();
    const lName = this.textBox(lastname);
    const emailid = $('#userName' + index).val();
    const emailvalid = this.validateEmail(emailid);
    const phnumber = $('#phonenumber' + index).val();
    const department = $('#department' + index).val();
    const areaOfinterest = $('#areaOfinterest' + index).val();
    const passwrd = $('#passWord' + index).val();
    const confirmpasswrd = $('#confirmPasswrd' + index).val();
    const addbtn = document.getElementById('addicon' + index);
    const rowCont = ((rowCount - index) === 1);
    if (selectdata.target.id.substring(0, 9) === 'firstName') {
      if (firstname === '') {
        document.getElementById('fNameText' + index).style.display = 'block';
        $('#fNameText' + index).text('Please fill the field');
      } else if (fName === false) {
        document.getElementById('fNameText' + index).style.display = 'block';
        $('#fNameText' + index).text('Please Enter Valid Text');
      } else if (firstname.length < 100) {
        document.getElementById('fNameText' + index).style.display = 'none';
      } else {
        // $('.firstnameclass').css('visibility', 'visible');
        document.getElementById('fNameText' + index).style.display = 'block';
        $('#fNameText' + index).text('You Reached max character.');
      }
    }
    if (selectdata.target.id.substring(0, 8) === 'lastName') {
      if (lastname === '') {
        document.getElementById('lNameText' + index).style.display = 'block';
        $('#lNameText' + index).text('Please fill the field');
      } else if (lName === false) {
        document.getElementById('lNameText' + index).style.display = 'block';
        $('#lNameText' + index).text('Please Enter Valid Text');
      } else if (lastname.length < 100) {
        document.getElementById('lNameText' + index).style.display = 'none';
      } else {
        document.getElementById('lNameText' + index).style.display = 'block';
        $('#lNameText' + index).text('You Reached max character.');
      }
    }
    if (selectdata.target.id.substring(0, 8) === 'userName') {
      if (emailid === '') {
        document.getElementById('userNametext' + index).style.display = 'block';
        $('#userNametext' + index).text('Please fill the field');
      } else if (emailvalid === false) {
        document.getElementById('userNametext' + index).style.display = 'block';
        $('#userNametext' + index).text('Please Enter Valid Email ID');
      } else {
        document.getElementById('userNametext' + index).style.display = 'none';
      }
    }
    if (selectdata.target.id.substring(0, 8) === 'passWord') {
      if (passwrd === '') {
        document.getElementById('passwordtext' + index).style.display = 'block';
        document.getElementById('instruction' + index).style.display = 'none';
        $('#passwordtext' + index).text('Please fill the field');
      } else {
        document.getElementById('passwordtext' + index).style.display = 'none';
        document.getElementById('instruction' + index).style.display = 'none';
      }
    }
    if (selectdata.target.id.substring(0, 14) === 'confirmPasswrd') {
      if (confirmpasswrd === '') {
        document.getElementById('confirmpaswrdtext' + index).style.display = 'block';
        document.getElementById('instructions' + index).style.display = 'none';
        $('#confirmpaswrdtext' + index).text('Please fill the field');
      } else {
        document.getElementById('confirmpaswrdtext' + index).style.display = 'none';
        document.getElementById('instructions' + index).style.display = 'none';
      }
    }
    if (firstname === '' && lastname === '' && emailid === '' && passwrd === '' && confirmpasswrd === '') {
      addbtn.style.pointerEvents = 'none';
      addbtn.style.cursor = 'default';
      addbtn.style.opacity = '0.3';
    }
    if (firstname === '' || lastname === '' || emailid === '' || passwrd === '' && confirmpasswrd === '') {
      addbtn.style.pointerEvents = 'none';
      addbtn.style.cursor = 'default';
      addbtn.style.opacity = '0.3';
    }
    if (firstname !== '' && lastname !== '' && emailvalid && passwrd !== '' && confirmpasswrd !== '') {
      addbtn.style.pointerEvents = 'auto';
      addbtn.style.cursor = 'pointer';
      addbtn.style.opacity = '1';
    }
    if (rowCont === false) {
      addbtn.style.pointerEvents = 'none';
      addbtn.style.cursor = 'default';
      addbtn.style.opacity = '0.3';
    }
    if (emailvalid === true) {
      this.service.userNameExists(emailid).subscribe(res => {
        if (res === 2) {
          document.getElementById('userNametext' + index).style.display = 'none';
        } else if (res === 3) {
          document.getElementById('userNametext' + index).style.display = 'block';
          $('#userNametext' + index).text('User Name Already Exists!!!');
          addbtn.style.pointerEvents = 'none';
          addbtn.style.cursor = 'default';
          addbtn.style.opacity = '0.3';
        }
      });
    }
  }
  //  Add User: Onclick the Add icon empty row will be added
  addpersonalinfo(index?: any) {
    this.addinfo = true;
    this.addrows = true;
    const tableinfo = document.getElementById('personalInfoTable');
    const tr = tableinfo.getElementsByTagName('tr');
    const rowcount = tr.length;
    this.rowValue += 1;
    this.Rows.push(this.rowValue);
    const thead = tableinfo.getElementsByTagName('thead')[0];
    const headerCheckboxid = thead.getElementsByClassName('parentcheck')[0].id;
    const ind = index.target.id.match(/\d+/);
    const addbtn = document.getElementById('addicon' + ind);
    addbtn.style.pointerEvents = 'none';
    addbtn.style.cursor = 'default';
    addbtn.style.opacity = '0.3';
  }
  // Upload functionality (upload the data from excel)
  uploaduser() {
    $('#my_file_input').trigger('click'); // Triggers to open the browser for Uploading the excel
    this.addinfo = true;
    $('#addpersonalinfo').hide();
    this.uploadFlag1 = true;
    let oFileIn;
    let thisReference = this;
    $(function () {
      oFileIn = document.getElementById('my_file_input');
      if (oFileIn.addEventListener) {
        oFileIn.addEventListener('change', filePicked, false);
      }
    });
    function filePicked(oEvent) {
      oFileIn.removeEventListener('change', filePicked);
      // Get The File From The Input
      const oFile = oEvent.target.files[0];
      const sFilename = oFile.name;
      // Create A File Reader HTML5
      const reader = new FileReader();
      // Ready The Event For When A File Gets Selected
      reader.onload = function (e: any) {
        const data = e.target.result;
        let wb: any = {};
        let oJS: any = [];
        wb = XLSX.read(data, { type: 'binary' });
        // Loop Over Each Sheet
        wb.SheetNames.forEach(function (sheetName) {
          oJS = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
          if (oJS.length === 0) {
            JSAlert.alert('Please upload valid excel sheet');
            return;
          }
          thisReference.Rows = oJS;
          setTimeout(function () {
            thisReference.ValidateData(); // For Validating the data
            thisReference.EnableAdd();    // For enabling add icon
          }, 15);
          return;
        });
        const isSheetOne = (arrayName: any[], element) => (arrayName.indexOf(element) === 0);
        const isSheetEmpty = (oJS) => (oJS.length === 0);
      };
      // Calling JS To Start Reading The File.. You could delay this if desired
      reader.readAsBinaryString(oFile);
    }
  }
  //  Validate the uploaded data
  ValidateData() {
    const fnref = this;
    const trow = $('#personalInfoTable').find('tr');
    const rowCont = trow.length;
    trow.each(function (el) {
      const rowID = (trow[el].id);
      const ind = rowID.slice(-1);
      const first_name = $(trow[el]).find('.firstName').val();
      const last_name = $(trow[el]).find('.lastName').val();
      const email_id = $(trow[el]).find('.userName').val();
      const ph_number = $(trow[el]).find('.phonenumber').val();
      const department = $(trow[el]).find('.department').val();
      const areaofinterest = $(trow[el]).find('.areaOfinterest').val();
      const passWord = $(trow[el]).find('.passWord').val();
      const Confirm_Password = $(trow[el]).find('.confirmPasswrd').val();
      const validatePasswrd = fnref.passValid(passWord);
      const validateConfirmpasswrd = fnref.passValid(Confirm_Password);
      const FName = fnref.textBox(first_name);
      const LName = fnref.textBox(last_name);
      const emailvalid = fnref.validateEmail(email_id);

      if (first_name === '') {
        document.getElementById('fNameText' + ind).style.display = 'block';
        $('#fNameText' + ind).text('Please fill the field');
      } else if (FName === false) {
        document.getElementById('fNameText' + ind).style.display = 'block';
        $('#fNameText' + ind).text('Please Enter Valid Text');
      } else if (first_name.length < 100) {
        document.getElementById('fNameText' + ind).style.display = 'none';
      } else {
        // $('.firstnameclass').css('visibility', 'visible');
        document.getElementById('fNameText' + ind).style.display = 'block';
        $('#fNameText' + ind).text('You Reached max character.');
      }
      if (last_name === '') {
        document.getElementById('lNameText' + ind).style.display = 'block';
        $('#lNameText' + ind).text('Please fill the field');
      } else if (LName === false) {
        document.getElementById('lNameText' + ind).style.display = 'block';
        $('#lNameText' + ind).text('Please Enter Valid Text');
      } else if (last_name.length < 100) {
        document.getElementById('lNameText' + ind).style.display = 'none';
      } else {
        document.getElementById('lNameText' + ind).style.display = 'block';
        $('#lNameText' + ind).text('You Reached max character.');
      }
      if (email_id === '') {
        document.getElementById('userNametext' + ind).style.display = 'block';
        $('#userNametext' + ind).text('Please fill the field');
      } else if (emailvalid === false) {
        document.getElementById('userNametext' + ind).style.display = 'block';
        $('#userNametext' + ind).text('Please Enter Valid Email ID');
      } else {
        document.getElementById('userNametext' + ind).style.display = 'none';
      }

      if (passWord === '') {
        document.getElementById('passwordtext' + ind).style.display = 'block';
        document.getElementById('instruction' + ind).style.display = 'none';
        $('#passwordtext' + ind).text('Please fill the field');
      } else if (validatePasswrd == false) {
        document.getElementById('passwordtext' + ind).style.display = 'inline-block';
        document.getElementById('instruction' + ind).style.display = 'inline-block';
        $('#passwordtext' + ind).text('Please Enter Valid password');
      } else {
        document.getElementById('passwordtext' + ind).style.display = 'none';
        document.getElementById('instruction' + ind).style.display = 'none';
      }
      if (Confirm_Password === '') {
        document.getElementById('confirmpaswrdtext' + ind).style.display = 'block';
        document.getElementById('instructions' + ind).style.display = 'none';
        $('#confirmpaswrdtext' + ind).text('Please fill the field');
      } else if (validateConfirmpasswrd == false) {
        document.getElementById('confirmpaswrdtext' + ind).style.display = 'inline-block';
        document.getElementById('instructions' + ind).style.display = 'inline-block';
        $('#confirmpaswrdtext' + ind).text('Please Enter Valid password');
      } else {
        document.getElementById('confirmpaswrdtext' + ind).style.display = 'none';
        document.getElementById('instructions' + ind).style.display = 'none';
      }
      if (validateConfirmpasswrd == true && validatePasswrd == true) {
        if (passWord != Confirm_Password) {
          document.getElementById('confirmpaswrdtext' + ind).style.display = 'block';
          document.getElementById('instructions' + ind).style.display = 'none';
          $('#confirmpaswrdtext' + ind).text('Password is not matching');
          document.getElementById('passwordtext' + ind).style.display = 'none';
        } else if (passWord == Confirm_Password) {
          document.getElementById('confirmpaswrdtext' + ind).style.display = 'none';
          document.getElementById('instructions' + ind).style.display = 'none';
          document.getElementById('instruction' + ind).style.display = 'none';
          document.getElementById('passwordtext' + ind).style.display = 'none';
        }
      }
      if (emailvalid === true) {
        fnref.service.userNameExists(email_id).subscribe(res => {
          if (res === 2) {
            document.getElementById('userNametext' + ind).style.display = 'none';
          } else if (res === 3) {
            document.getElementById('userNametext' + ind).style.display = 'block';
            $('#userNametext' + ind).text('User Name Already Exists!!!');
          }
        });
      }
    });
    return;
  }
  // Enable AddIcon for the LastRow
  EnableAdd() {
    const trow = $('#personalInfoTable').find('tr');
    const tagName = ($('h6').is(':visible'));
    const tr_length = trow.length;
    const index = (tr_length - 1);
    const addbtn = document.getElementById('addicon' + index);
    const firstname = $('#firstName' + index).val();
    const lastname = $('#lastName' + index).val();
    const emailid = $('#userName' + index).val();
    const emailvalid = this.validateEmail(emailid);
    const phnumber = $('#phonenumber' + index).val();
    const department = $('#department' + index).val();
    const areaOfinterest = $('#areaOfinterest' + index).val();
    const passwrd = $('#passWord' + index).val();
    const confirmpasswrd = $('#confirmPasswrd' + index).val();
    if (firstname !== '' && lastname !== '' && emailvalid && passwrd && confirmpasswrd) {
      addbtn.style.pointerEvents = 'auto';
      addbtn.style.cursor = 'pointer';
      addbtn.style.opacity = '1';
    }
  }
  // delete functionality to remove the rows
  deleteFieldValues(index) {
    const classref = this;
    const tableinfo = document.getElementById('personalInfoTable');
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
    if (rowDifference && this.uploadFlag1) {
      $(index.target).parent().parent().remove();
    } else {
      let arrayInd = $("#" + $(index.target).parent().parent().attr("id")).index();
      this.Rows.splice(parseInt(arrayInd), 1);
    }
    const thead = tableinfo.getElementsByTagName('thead')[0];
    const headerCheckboxid = thead.getElementsByClassName('parentcheck')[0].id;
    setTimeout(function () {
      classref.EnableAdd();    // For enabling add icon
    }, 5);
  }
  //  Method to check duplicate values		
  duplicatevalidate() {
    let flag = 0;
    let indexArray: string[] = [];
    const tr = $('#personalInfoTable').find('.selected');
    const testArray: string[] = [];
    const rowId: string[] = [];
    tr.each(function (e) {
      testArray.push($(tr[e]).find('.userName').val());
      rowId.push($(tr[e]).attr('id'));
    });
    for (let i = 0; i < testArray.length; i++) {
      for (let j = i + 1; j < testArray.length; j++) {
        if (testArray[i] === testArray[j]) {
          flag = 1;
          indexArray.push(rowId[i], rowId[j]);
        }
      }
    }
    /**
     * x --> item in array
     i --> index of item
     a --> array reference, (in this case "indexArray") */
    indexArray = indexArray.filter((element, index, array) => array.indexOf(element) === index);
    return {
      'flag': flag,
      'indexArray': [...indexArray]
    };
  }
  // Submitting the data in the DB
  submitdetails() {
    let count = 0;
    const emailflag = this.emailFlag;
    const fromemailId = this.fromemail;
    let validateFlag = false;
    this.inputGridObject = [];
    const companyName = this.selectedCompanyName[0].text;
    const updatedByuserName = this.updateBy;
    const contractrefernce = $('#selectedref').val();
    const usertype = $('#userType').val();
    const startdate = $('#startdate').val();
    const enddate = $('#enddate').val();
    const stdate = (new Date(startdate));
    const eddate = (new Date(enddate));
    // To validate the Company Information
    // if (companyName === '' || companyName === null || contractrefernce === ''
    //   || contractrefernce === null || usertype === '' || usertype === null) {
    //   JSAlert.alert('Please fill the Company Information');
    //   return;
    // }
    // if (stdate > eddate) {
    //   JSAlert.alert('Start Date should be Less than End Date');
    //   return;
    // }
    const classref = this;
    $("tr").css("background-color", "#f3f3f3");
    let duplicateFnReturnValue: any = {};
    duplicateFnReturnValue = classref.duplicatevalidate();
    if (duplicateFnReturnValue.flag === 1) {
      for (const rowID of duplicateFnReturnValue.indexArray) {
        document.getElementById(rowID).style.backgroundColor = '#c3acb1';
      }
      JSAlert.alert('Duplicate Usernames Found');
      return;
    }
    const companyname = this.selectedCompanyName[0].text;
    const contractref = $('.contractref').val();
    const userType = $('.usertype').val();
    const generalFlag = $('.generalalert').val();
    const trow = $('#personalInfoTable').find('.selected');
    trow.each(function (el) {
      const rowID = (trow[el].id);
      const visible = $(trow[el]).find('h6');
      const first_name = $(trow[el]).find('.firstName').val();
      const last_name = $(trow[el]).find('.lastName').val();
      const email_id = $(trow[el]).find('.userName').val();
      const ph_number = $(trow[el]).find('.phonenumber').val();
      const department = $(trow[el]).find('.department').val();
      const areaofinterest = $(trow[el]).find('.areaOfinterest').val();
      const password = $(trow[el]).find('.passWord').val();
      const confirmPassword = $(trow[el]).find('.confirmPasswrd').val();
      // If the data is null or undefined, then the row will be highlighted
      if ([first_name, last_name, email_id, password, confirmPassword].some(isNullOrUndefinedorEmptyString)) {
        document.getElementById(rowID).style.backgroundColor = '#c3acb1';
        validateFlag = true;
        return;
      }
      //  IF invalid data is submitted, then returns the particular row
      const visibility = visible.is(':visible');
      if (visibility === true) {
        document.getElementById(rowID).style.backgroundColor = '#c3acb1';
        validateFlag = true;
        return;
      }

      const rowObject = {
        'companyname': companyname,
        'contractref': contractref,
        'userType': userType,
        'password': password,
        'first_name': first_name,
        'last_name': last_name,
        'email_id': email_id,
        'phone_number': ph_number,
        'department': department,
        'area_of_interest': areaofinterest,
        'email_flag': emailflag,
        'from_email': fromemailId,
        'startdate': startdate,
        'enddate': enddate,
        'general_Flag': generalFlag,
        'last_updated_by': updatedByuserName
      };
      classref.inputGridObject.push(rowObject); //Pushing the data has array of objects
      const arrayInd = parseInt((rowID).substring(5)) - count;
      count++;
      classref.Rows.splice(arrayInd, 1);
    });

    // To remove the valid row from the table
    // IF TABLE IS EMPTY
    const rowsInTable = $('#personalInfoTable').find('tr');
    if ((rowsInTable.length) - count === 0) {
      classref.Rows = [trow.length];
      this.mainCheckbox = false;
    }
    if (this.inputGridObject.length === 0) {
      JSAlert.alert('Please fill the mandatory fields for highlighted Rows');
      return;
    }
    // DB call to submit the data
    this.service.bulkuserdetails(classref.inputGridObject).subscribe((res) => {
      const validdata = this.inputGridObject.length;
      const trlength = trow.length;
      if (trlength == validdata) {
        JSAlert.alert('Selected User Details has been Saved Successfully');
      } else if ((trlength > validdata) || (trlength < validdata)) {
        JSAlert.alert('Valid User Details has been Saved Successfully. Invalid Rows are Highlighted');
      }
      this.EnableAdd();
      const submitbtn = $('#submitbtn');
      const chkTrueCount = this.checkboxChecker();
      if (chkTrueCount > 0) {
        submitbtn.removeAttr('disabled');
      } else {
        submitbtn.attr('disabled', 'disabled');
      }
    });
  }

  // Header checkbox functionality
  checkbx(event: any) {
    if (event.target.checked) {
      $('.chkGrp:not(:checked)').trigger('click');
    } else {
      $('.chkGrp:checked').trigger('click');
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

  checkboxloop(ref: any) {
    /* Using JQUERY to fetch the table, all checkboxes using css class and those which are selected
    Then the chkbox_checked is checked for three scenarios 1) None, 2) All Selected 3) Some of them are selected  */
    const $table = $(ref.target).closest('table').get(0);
    const thead = $table.getElementsByTagName('thead')[0];
    const checkboxid = thead.getElementsByClassName('parentcheck')[0].id;
    this.checkboxfunctionality($table, checkboxid);
    const submitBtn = $('#submitbtn');
    const classref = this;
    // Check checkboxes status on DOMready
    const chkTrueCount = classref.checkboxChecker();
    // Check again when checkboxes states are changed
    $('table tr input[type="checkbox"]').on('change', function () {
      const chkTrueCount = classref.checkboxChecker();
    });
    if (chkTrueCount > 0) {
      submitBtn.removeAttr('disabled');
    } else {
      submitBtn.attr('disabled', 'disabled');
    }
  }
  // CheckBox Functionalities
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
      this.mainCheckbox = true;
      chkbox_select_all_html.indeterminate = false;
    } else {
      // Case 3: Some of the checkboxes are selected
      this.mainCheckbox = false;
      chkbox_select_all_html.indeterminate = true;
    }
  }
}


