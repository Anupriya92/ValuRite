// Feature: Single User details can be inserted, Neither by entering the data in grid nor Uploading the data 
// in the Grid. On submit click authenication will be sent to the respective users

import { Component, OnInit, } from '@angular/core';
import generatePassword from '../../../../utils/admin_generatepassword';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminLoginServiceService } from '../../common-services/admin-service.service';
import dateformat from '../../../../utils/admin_dateFormat';
import { isNullOrUndefinedorEmptyString } from '../../../../utils/admin_isNullorUndefinedorEmptyString';
import { format } from 'date-fns';
import { getAllCountries, getStatesOfCountry, getCitiesOfState, getCountryById, getStateById, getCityById } from 'country-state-city'; //country-state-city dropdown
const JSAlert = require('js-alert');
declare var $: any;
declare var slider: any;
declare var datepicker: any;
@Component({
  selector: 'app-adminsingleuser',
  templateUrl: './adminsingleuser.component.html',
  styleUrls: ['./adminsingleuser.component.css','../../../assets/css/admin.css',
  '../../../assets/css/bootstrap.min.css', '../../../assets/valurite-css/font-awesome.min.css']
})
export class AdminSingleuserComponent implements OnInit {

  companyName;
  username;
  myform: FormGroup;
  formdata: FormGroup;
  public disabled: false;
  public categories: Object[];
  public reference: Object[];
  public rolename: Object[];
  public isPasswordFlag = true;
  public updateBy = sessionStorage.getItem('UserID');
  limits: any;
  exportflag: any;
  generalflag: any;
  startdate: any;
  enddate: any;
  enterpwd: any;
  show: boolean;
  emailFlag: boolean;
  fromEmail: any;
  companydropdown = [];
  countryList: string[];
  stateList: string[];
  cityList: string[];
  public country: string;
  public state: string;
  public city: string;
  selectedcompyName: any;
  Rows = [0];
  rowValue = 0;
  mainCheckbox = false;
  OrgType: any;
  inputRow: any[] = [];
  constructor(public service: AdminLoginServiceService, private router: Router) { this.show = false; }
  validateEmail(sEmail: string): boolean {
    const filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(sEmail)) {
      return true;
    } else {
      return false;
    }
  }
  ngOnInit() {
    // Fetch data for Company Dropdown
    this.service.companydropdown().subscribe(res => {
      let compdrop = []
      this.companydropdown = []
      // response is an array of objects
      for (const user of res) {
        this.companydropdown.push(user.companyname);
      }
    });
    // Fetch data for User Type
    this.service.roleName().subscribe(res => {
      this.rolename = res;
    });

    this.formdata = new FormGroup({
      UserName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(254),
        Validators.email
      ])),
      firstName: new FormControl({ value: '', disabled: false }, Validators.compose([
        Validators.required,
        Validators.maxLength(1000),
        Validators.pattern(/^[a-zA-Z0-9\s]+$/)
      ])),
      lastName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(1000),
        Validators.pattern(/^[a-zA-Z0-9\s]+$/)
      ])),
      phoneNumber: new FormControl('', Validators.compose([
        Validators.maxLength(100),
        Validators.required
      ])),
      AddressLine1: new FormControl('', Validators.compose([
        Validators.maxLength(1000),
        Validators.required
      ])),
      AddressLine2: new FormControl('', Validators.compose([
        Validators.maxLength(1000),
      ])),
      Country: new FormControl('', Validators.compose([Validators.required])),
      State: new FormControl('', Validators.compose([Validators.required])),
      City: new FormControl('', Validators.compose([Validators.required])),
      areaName: new FormControl('', Validators.compose([
        Validators.maxLength(1000)
      ])),
      landmark: new FormControl('',Validators.compose([Validators.maxLength(1000)])),
      userType: new FormControl('', Validators.compose([Validators.required])),
      userRole: new FormControl('', Validators.compose([Validators.required])),
      pinCode: new FormControl('', Validators.compose([Validators.maxLength(10)])),
      retypepassword: new FormControl('', Validators.compose([Validators.maxLength(20)])),
      companyname: new FormControl('', Validators.compose([Validators.required])),
      contractref: new FormControl('', Validators.compose([Validators.required])),
      startDate: new FormControl('', Validators.compose([Validators.required])),
      endDate: new FormControl('', Validators.compose([Validators.required]))
      // downloadlimit: new FormControl('', Validators.compose([Validators.required]))
    });
    //  DB call to get the emailflags from param collection
    // this.service.paramEmailFlag().subscribe(res => {
    //   this.emailFlag = res[1].param_value;
    //   this.fromEmail = res[0].param_value
    // });
    this.fromEmail = sessionStorage.getItem('FromEmail');
    this.emailFlag = JSON.parse(sessionStorage.getItem('Email_Flag'));
    this.countryList = getAllCountries();
    // this.StateList = getStatesOfCountry();
    // this.CityList = getCitiesOfState();
  }
//Method to fetch country name in the dropdown
onCountryItemSelect(Selectelement: any) {
  this.country = getCountryById(Selectelement.value - 1).name;
  this.stateList = getStatesOfCountry(Selectelement.value);
  const stateElem = (document.getElementById("stateId")) as HTMLSelectElement
  stateElem.selectedIndex = 0;
  const cityElem = (document.getElementById("citynames")) as HTMLSelectElement
  cityElem.selectedIndex = 0;
  this.cityList=[];
}
  
  // Method to fetch state name in dropdown based on selected country name
  onStateItemSelect(Selectelement: any) {
  this.state = getStateById(Selectelement.value - 1).name;
  this.cityList = getCitiesOfState(Selectelement.value);
  const cityElem = (document.getElementById("citynames")) as HTMLSelectElement
  cityElem.selectedIndex = 0;
  }
  // Method to fetch the city name in dropdown based on selected state name
  onCityItemSelect(Selectelement: any) {
  this.city = getCityById(Selectelement.value - 1).name;
  }



  test() {
    this.isPasswordFlag = false;
  }
  // contract Refernce Dropdown binding based on the selected company
  onCompanyselect(Selectelement: any) {
    this.service.referencedropdown(Selectelement.text).subscribe(res => {
      this.reference = res;
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
        this.startdate = format(new Date(i.StartDate), 'MM/DD/YYYY')
        this.enddate = format(new Date(i.EndDate), 'MM/DD/YYYY')
      }
      $('#startdate').attr('disabled', false);
      $('#enddate').attr('disabled', false);
    });
  }
  textBox(text: string): boolean {
    const filter = /^[a-zA-Z0-9\s]*$/;
    if (filter.test(text)) {
      return true;
    } else {
      return false;
    }
  }

  // Validation for Madantory Fields onkey press
  onKey(event: any) {
    const index = event.target.id;
    const firstname = $('#firstName').val();
    const lastname = $('#lastName').val();
    const emailid = $('#UserName').val();
    const emailvalid = this.validateEmail(emailid);
    const mobilenumber = $('#phoneNumber').val();
    const address1 = $('#addressline1').val();
    const areaName = $('#addarea').val();
    const pinCode = $('#pincode').val();
    const passwrd = $('#enterpwd').val();
    const retypepass = $('#retypepassword').val();
    // const areaofInterest = $('#areaOfInterest').val();
    // const generatebtn = $('#generatepasswrd');
    const FName = this.textBox(firstname);
    const lName = this.textBox(lastname);
    if (event.target.id === 'firstName') {
      if (firstname === '') {
        document.getElementById('fNameText').style.display = 'block';
        $('#fNameText').text('Please fill the field');
      } else if (FName === false) {
        document.getElementById('fNameText').style.display = 'block';
        $('#fNameText').text('Please Enter Valid Text');
      } else if (firstname.length < 100) {
        document.getElementById('fNameText').style.display = 'none';
      } else {
        document.getElementById('fNameText').style.display = 'block';
        $('#fNameText').text('You have reached max characters');
      }
    }
    if (event.target.id === 'lastName') {
      if (lastname === '') {
        document.getElementById('lNameText').style.display = 'block';
        $('#lNameText').text('Please fill the field');
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
    if (event.target.id === 'UserName') {
      if (emailid === '') {
        document.getElementById('userText').style.display = 'block';
        $('#userText').text('Please fill the field');
      } else if (emailvalid === false) {
        document.getElementById('userText').style.display = 'block';
        $('#userText').text('Please Enter Valid Email ID');
      } else {
        document.getElementById('userText').style.display = 'none';
      }
    }
    if (event.target.id === 'phoneNumber') {
      if (mobilenumber === '') {
        document.getElementById('phNumText').style.display = 'block';
        $('#phNumText').text('Please fill the field');
      } else if (mobilenumber.length < 100) {
        document.getElementById('phNumText').style.display = 'none';
      } else {
        document.getElementById('phNumText').style.display = 'block';
        $('#phNumText').text('You Reached max character.');
      }
    }
    if (event.target.id === 'enterpwd') {
      if (passwrd === '') {
        document.getElementById('passwordtext').style.display = 'block';
        document.getElementById('instruction').style.display = 'none';
        $('#passwordtext').text('Please fill the field');
      } else {
        document.getElementById('passwordtext').style.display = 'none';
        document.getElementById('instruction').style.display = 'none';
      }
    }
    if (event.target.id === 'retypepassword') {
      if (retypepass === '') {
        document.getElementById('confirmpaswrdtext').style.display = 'block';
        document.getElementById('instructions').style.display = 'none';
        $('#confirmpaswrdtext').text('Please fill the field');
      } else {
        document.getElementById('confirmpaswrdtext').style.display = 'none';
        document.getElementById('instructions').style.display = 'none';
      }
    }
    if (event.target.id === 'addressline1') {
      if (address1 === '') {
        document.getElementById('addressLine1Text').style.display = 'block';
        $('#addressLine1Text').text('Please fill the field');
      } else if (address1.length < 1000) {
        document.getElementById('addressLine1Text').style.display = 'none';
      } else {
        document.getElementById('addressLine1Text').style.display = 'block';
        $('#addressLine1Text').text('You Reached max character.');
      }
    }
    if (event.target.id === 'addarea') {
      if (areaName === '') {
        document.getElementById('areaText').style.display = 'block';
        $('#areaText').text('Please fill the field');
      } else if (areaName.length < 100) {
        document.getElementById('areaText').style.display = 'none';
      } else {
        document.getElementById('areaText').style.display = 'block';
        $('#areaText').text('You Reached max character.');
      }
    }
    if (event.target.id === 'pincode') {
      if (pinCode === '') {
        document.getElementById('pincodeText').style.display = 'block';
        $('#pincodeText').text('Please fill the field');
      } else if (pinCode.length < 100) {
        document.getElementById('pincodeText').style.display = 'none';
      } else {
        document.getElementById('pincodeText').style.display = 'block';
        $('#pincodeText').text('You Reached max character.');
      }
    }
      if (retypepass === '') {
        document.getElementById('confirmpaswrdtext').style.display = 'block';
        document.getElementById('instructions').style.display = 'none';
        $('#confirmpaswrdtext').text('Please fill the field');
      } else {
        document.getElementById('confirmpaswrdtext').style.display = 'none';
        document.getElementById('instructions').style.display = 'none';
      }
    // }
    // if (firstname === '' && lastname === '' && emailid === '') {
      // document.getElementById('userText').style.display = 'none';
      // generatebtn.attr('disabled', 'disabled');
    // }
    if (emailvalid === true) {
      this.service.userNameExists(emailid).subscribe(res => {
        if (res === 2) {
          document.getElementById('userText').style.display = 'none';
        } else if (res === 3) {
          document.getElementById('userText').style.display = 'block';
          $('#userText').text('User Name Already Exists!!!');
          // generatebtn.attr('disabled', 'disabled');
        }
      });
  }}
  // Method for toggle the password textbox
  pwdShow() {
    $(".toglepassword").toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if ($(".manual").attr("type") == "password") {
      $(".manual").attr('type', 'text');
    } else {
      $(".manual").attr('type', 'password');
    }
  }

  passwdShow() {
    $(".togglepasswd").toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if ($(".manualpwd").attr("type") == "password") {
      $(".manualpwd").attr('type', 'text');
    } else {
      $(".manualpwd").attr('type', 'password');
    }
  }
  
  // reset() {
  //   // const generatebtn = $('#generatepasswrd');
  //   // generatebtn.attr('disabled', 'disabled');
  //   $('#userSubmit').attr('disabled', true);
  //   $('#firstName').val('');
  //   $('#lastName').val('');
  //   $('#UserName').val('');
  //   $('#phoneNumber').val('');
  //   $('#addressline1').val('');
  //   $('#addressline2').val('');
  //   $('#countryName').val('');
  //   $('#stateName').val('');
  //   $('#citynames').val('');
  //   $('#addarea').val('');
  //   $('#addlandMark').val('');
  //   $('#pincode').val('');
  //   $('#enterpwd').val('');
  //   $('#retypepassword').val('');
  //   $('#companyselected').val('');
  //   $('#contractref').val('');
  //   $('#userType').val('');
  //   $('#userRole').val('');
  //   $('#generalflag').val('');
  //   $('#startdate').val('');
  //   $('#enddate').val('');
  //   $('h6').hide();
  //   this.selectedcompyName = []
  //   document.getElementById('instructions').style.display = 'none';
  //   document.getElementById('instruction').style.display = 'none';
  // }

  reset() {
    this.router.navigate(['/loader']);
  }
  // Generate the Random Password in the Textbox
  password() {
    this.enterpwd = generatePassword();
    $('#retypepassword').val(this.enterpwd);
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('instruction').style.display = 'none';
    document.getElementById('confirmpaswrdtext').style.display = 'none';
    document.getElementById('passwordtext').style.display = 'none';
  }
  // Submitting the form data 
  Submit(data: any) {
    data.retypepassword = $('#retypepassword').val().trim();
    const tempPwd = document.getElementById('enterpwd') as HTMLInputElement;
    const enterpwd = tempPwd.value;
    const tempPwrd = document.getElementById('retypepassword') as HTMLInputElement;
    const retypePwd = tempPwrd.value;
    const tagName = ($('h6').is(':visible'));
    const startdate = $('#startdate').val();
    const enddate = $('#enddate').val();
    const stdate = (new Date(startdate));
    const eddate = (new Date(enddate));
    const country = $('#countryName :selected').text();
    const state = $('#stateName :selected').text();
    const city = $('#citynames :selected').text();
    if (tagName === true) {
      JSAlert.alert('Please Enter Valid User Name');
      return;
    }
    if (enterpwd == '' || retypePwd == '') {
      JSAlert.alert('Please fill the field');
      return;
    }
    if (enterpwd.length < 8 || retypePwd.length < 8) {
      JSAlert.alert('Password Should be Atleast 8 Characters');
      return;
    }
    if (enterpwd.length > 20 || retypePwd.length > 20) {
      JSAlert.alert('Password Should be Maximum 20 Characters');
      return;
    }
    if (stdate > eddate) {
      JSAlert.alert('Start Date should be Less than End Date');
      return;
    }

    if (enterpwd === retypePwd) {
      
      let data1 = { ...data };
      var validFlag = true;
      data1.startDate = startdate;
      data1.endDate = enddate;
      data1.Country = country.trim();
      data1.State = state;
      data1.City = city;
      data1.lastUpdatedBy = this.updateBy;
      data1.emailFlag = this.emailFlag;
      data1.fromEmail = this.fromEmail;
      data1.OrgType = this.OrgType;
      data1.generalalert = (<HTMLInputElement>document.getElementById('generalflag')).value;
      const classref = this;

      const trow = $('#associationTable').find('.Selected');
      trow.each(function (el) {
        const rowId = (trow[el].id);
        const associteName = $(trow[el]).find('.associationName').val();
        const memberid = $(trow[el]).find('.memberID').val();
        document.getElementById(rowId).style.backgroundColor = '#f2f2f2';
        if ([associteName, memberid].some(isNullOrUndefinedorEmptyString)) {
          document.getElementById(rowId).style.backgroundColor = '#c3acb1';
          validFlag = false
          return;
        }
        // if (!classref.validateDate(startdate, enddate)) {
        //   document.getElementById(rowId).style.backgroundColor = '#c3acb1';
        //   return;
        // }
        // Fn Validate Date here
       // document.getElementById(rowId).remove();
        const rowObject = {
          'AssociationName': associteName, 
          'memberID': memberid,
        };
        classref.inputRow.push(rowObject);
      });

console.log(classref.inputRow)
data1.AssociationDetails = classref.inputRow
if(validFlag) {
      // DB call to submit the data in user collection
      this.service.userdetails(data1).subscribe((res) => {
        JSAlert.alert('User details Saved Successfully!!!');
        $("#AssociationTableDiv").css("display","none")
        this.reset();
      }); }
    } else {
      JSAlert.alert('Password is not matching!!!');
    }
  }
  datefetch(event: any) {
    const sdate = (new Date(this.startdate));
    const edate = (new Date(this.enddate));
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
    $('#enddate').datepicker({
      changeMonth: true,
      changeYear: true,
      minDate: sdate,
      maxDate: edate
    });
    const id = $(event.target).closest('input')[0].id;
    $('#' + id).datepicker().datepicker('show');
  }
  passValid(text: string): boolean {
    const expression = /^(?=^.{8,20}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;
    if (expression.test(text)) {
      return true;
    } else {
      return false;
    }
  }
  // Methods for password validation
  passwordValidate(data) {
    const ind = data.target.id.match(/\d+/);
    const pasWord = $('#enterpwd').val();
    const confirmPaswrd = $('#retypepassword').val();
    const validpassWrd = this.passValid(pasWord);
    const confirmpassValid = this.passValid(confirmPaswrd);
    if (pasWord !== '') {
      document.getElementById('passwordtext').style.display = 'none';
      document.getElementById('instruction').style.display = 'none';
    } if (validpassWrd == false) {
      document.getElementById('passwordtext').style.display = 'inline-block';
      document.getElementById('instruction').style.display = 'inline-block';
      $('#passwordtext').text('Please Enter Valid Password');
    }
    if (validpassWrd == true && confirmpassValid == true) {
      if (confirmPaswrd !== '' && pasWord !== '') {
        if (pasWord !== confirmPaswrd) {
          document.getElementById('passwordtext').style.display = 'block';
          $('#passwordtext').text('Password is not matching');
          document.getElementById('instruction').style.display = 'none';
          document.getElementById('confirmpaswrdtext').style.display = 'none';
        }
        else if (pasWord == confirmPaswrd) {
          document.getElementById('confirmpaswrdtext' + ind).style.display = 'none';
          document.getElementById('passwordtext' + ind).style.display = 'none';
          document.getElementById('instruction' + ind).style.display = 'none';
        }
      }
    }
  }

  confirmpasWrd(data: any) {
    const pasWord = $('#enterpwd').val();
    const confirmPaswrd = $('#retypepassword').val();
    const confirmvalidpass = this.passValid(confirmPaswrd);
    const paswordvalid = this.passValid(pasWord);
    if (pasWord == '') {
      document.getElementById('passwordtext').style.display = 'block';
      document.getElementById('instructions').style.display = 'none';
      $('#passwordtext').text('Please fill the field');
    }
    if (confirmPaswrd == '') {
      document.getElementById('confirmpaswrdtext').style.display = 'block';
      document.getElementById('instructions').style.display = 'none';
      $('#confirmpaswrdtext').text('Please fill the field');
    }
    if (confirmvalidpass == false) {
      document.getElementById('confirmpaswrdtext').style.display = 'inline-block';
      document.getElementById('instructions').style.display = 'inline-block';
      $('#confirmpaswrdtext').text('Please Enter Valid Password');
    }
    if (confirmvalidpass == true && paswordvalid == true) {
      if (pasWord != confirmPaswrd) {
        document.getElementById('confirmpaswrdtext').style.display = 'block';
        document.getElementById('instructions').style.display = 'none';
        $('#confirmpaswrdtext').text('Password is not matching');
        document.getElementById('passwordtext').style.display = 'none';
      }
      else if (pasWord == confirmPaswrd) {
        document.getElementById('confirmpaswrdtext').style.display = 'none';
        document.getElementById('passwordtext').style.display = 'none';
        document.getElementById('instructions').style.display = 'none';
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
    const thead = tableinfo.getElementsByTagName('thead')[0];
    const headerCheckboxid = thead.getElementsByClassName('parentcheck')[0].id;
    const ind = index.target.id.match(/\d+/);
    const addbtn = document.getElementById('addicon' + ind);
    addbtn.style.pointerEvents = 'none';
    addbtn.style.cursor = 'default';
    addbtn.style.opacity = '0.3';
  }

  deleteAssTable(index){
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

  // Header checkbox functionality
  checkbox(event: any) {
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
    // const submitBtn = $('#submitbtn');
    // const classref = this;
    $('#associationTable').on('click', 'input[type="checkbox"]', function (e) {
      const $row = $(this).closest('tr');
      if (this.checked) {
        $row.addClass('Selected');
      } else {
        $row.removeClass('Selected');
      }
    });
    // // Check checkboxes status on DOMready
    // const chkTrueCount = classref.checkboxChecker();
    // // Check again when checkboxes states are changed
    // $('table tr input[type="checkbox"]').on('change', function () {
    //   const chkTrueCount = classref.checkboxChecker();
    // });
    // if (chkTrueCount > 0) {
    //   submitBtn.removeAttr('disabled');
    // } else {
    //   submitBtn.attr('disabled', 'disabled');
    // }
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

  userTypeFunc(event) {
    // console.log(event)
    if(event.target.value == "Appraiser") {
      $("#AssociationTableDiv").css("display","block")
    } else {
      $("#AssociationTableDiv").css("display","none")
    }
  }


  userRoleSetOrgType(event){
    debugger
     if (event.target.value == "Comp app without lender" || event.target.value == "Comp with lender") {
      this.OrgType = "Company"
     } else {
      this.OrgType = "Individual"
     }
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


  
}
