
/*
Feature: Company Registration Form - To register new company details
*/

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { isNullOrUndefinedorEmptyString } from '../../../../utils/admin_isNullorUndefinedorEmptyString'; //To check the data is null or undefined
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { getAllCountries, getStatesOfCountry, getCitiesOfState, getCountryById, getStateById, getCityById } from 'country-state-city'; //country-state-city dropdown
import { AdminLoginServiceService } from '../../common-services/admin-service.service';
import { format } from 'date-fns'; //For manipulating javascript dates
import { empty } from 'rxjs/observable/empty';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
const JSAlert = require('js-alert');
declare var $: any;
declare var slider: any;
declare var datepicker: any;

@Component({
  selector: 'app-adminregistercompany',
  templateUrl: './adminregistercompany.component.html',
  styleUrls: ['./adminregistercompany.component.css','../../../assets/css/admin.css',
  '../../../assets/css/bootstrap.min.css']
})
export class AdminRegisterCompanyComponent implements OnInit, AfterViewInit {
  
  public companyName: string;
  public department: string;
  public companyDesc: string;
  public address: string;
  public country: string;
  public state: string;
  public city: string;
  public zipCode: number;
  countryName: any;
  stateName: any;
  cityName: any;
  public contactName: string;
  public contactEmail: string;
  public contactMobile: string;
  public contractRef: string;
  public contractDesc: string;
  public contractDate: any;
  public contractStateDate: any;
  public contractEndDate: any;
  public startdateregisterID:any;
  public enddateregisterID:any;
  public currentdate: any;
  public contractSession: number;
  public contractDownload: number;
  public contractExport: string;
  public contractAlert: string;
  public rows = false;
  public firstcompany = false;
  public secondcompany = false;
  public registering = false;
  public updating = false;
  public newContactRow = false;
  path: any;
  noOfRows = [0];
  Rowsupdatefirst: number[] = [];
  numberOfRows = ["uniqueid"];
  inputGridObject: any[] = [];
  inputGridObject2: any[] = [];
  public datetime: any;
  public JSAlert = require('js-alert');
  public dateTime = format(new Date(), 'MM/DD/YYYY')
  addIconDisabled = false;
  flag = 0;
  secondFlag = 0;

  // Values from Session
  private name: string = sessionStorage.getItem('UserID');

  CountryList: string[];
  StateList: string[];
  CityList: string[];
  Exists: boolean;
  emailFlag: boolean;
  FromEmail: any;
  // Fetch Global Settings Response
  globalsettings: object[];
  formdata;
  constructor(private routes: Router, public service: AdminLoginServiceService, public http: HttpClient) { }
  ngOnInit() {

    const ide = getCountryById(0);
    // Method call for loading Country,State,City dropdown
    this.CountryList = getAllCountries();
    this.StateList = getStatesOfCountry();
    this.CityList = getCitiesOfState();
    this.newContactRow = true;
    // To get the data in the form
    this.formdata = new FormGroup({
      companyname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(100)
      ])),
      gstNumber: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(100)
      ])),
      panNumber: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(100)
      ])),
      companyDescription: new FormControl('', Validators.compose([
        Validators.maxLength(500)
      ])),
      companyAddress: new FormControl('', Validators.compose([
        Validators.maxLength(200)
      ])),
      zipcode: new FormControl('', Validators.compose([
        Validators.maxLength(50)
      ])),
      ctnames: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(100)
      ])),
      ctemailid: new FormControl('', Validators.compose([
        Validators.required
      ])),
      ctnumber: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(100)
      ]))
    });
    this.onloadparam('0');
    this.addIconDisabled = true;
    //  Fetch the emailflag from DB
    /* this.service.paramEmailFlag().subscribe(res => {
      this.emailFlag = res[1].param_value;
      this.FromEmail = res[0].param_value;
    }) */
  }

  ngAfterViewInit() {

  }

  resetClick() {
    this.routes.navigate(['/loader']);
  }
  // To fetch the default values, from param table (Downloadlimit,no of session,export and general alert flag )
  onloadparam(increment: any) {
    this.service.companyParamValue().subscribe(res => {
      this.globalsettings = res;
      for (let i = 0; i < this.globalsettings.length; i++) {
        const download_Limit: any = document.getElementById('download' + increment);
        const no_of_session: any = document.getElementById('session' + increment);
        if (this.globalsettings[i]['param_name'] === 'download_limit') {
          download_Limit.value = this.globalsettings[i]['param_value'];
        }
        if (this.globalsettings[i]['param_name'] === 'No_of_session') {
          no_of_session.value = this.globalsettings[i]['param_value'];
        }
        if (this.globalsettings[i]['param_name'] === 'export_flag') {
          if (this.globalsettings[i]['param_value'] === false) {
            $('#dropdown1' + increment).prop('selectedIndex', 1);
          } else {
            $('#dropdown1' + increment).prop('selectedIndex', 0);
          }
        }
        if (this.globalsettings[i]['param_name'] === 'general_alert_flag') {
          if (this.globalsettings[i]['param_value'] === false) {
            $('#dropdown2' + increment).prop('selectedIndex', 1);
          } else {
            $('#dropdown2' + increment).prop('selectedIndex', 0);
          }
        }
      }
    });
  }
  /* To set the contract date, based on the contract date selection the min and max date range for contract 
  start and end date is set */
  datefetch(event: any) {
    const id = $(event.target).closest('input')[0].id;
    const ind = event.target.id.match(/\d+/);
    const refThis = this;
    
    if(id.indexOf("contractdateregister") > -1) {
      $('#contractdateregister' + ind).datepicker('refresh');
      $('#contractdateregister' + ind).datepicker({
        changeMonth: true,
        changeYear: true,
        onSelect: function (selected) {
          const dt = new Date(selected);
          dt.setDate(dt.getDate());
          $('#startdateregister' + ind).datepicker('option', 'minDate', dt);
          refThis.onContractDetails(event);
          refThis.submitEnable();
        }
      });
    }
    else if(id.indexOf("startdateregister") > -1) {
      $('#startdateregister' + ind).datepicker('refresh');
      $('#startdateregister' + ind).datepicker({
        changeMonth: true,
        changeYear: true,
        onSelect: function (selected) {
          const dt = new Date(selected);
          dt.setDate(dt.getDate());
          $('#contractdateregister' + ind).datepicker('option', 'maxDate', dt);
          $('#enddateregister' + ind).datepicker('option', 'minDate', dt);
          refThis.onContractDetails(event);
          refThis.submitEnable();
        }
      });
    }
    else if(id.indexOf("enddateregister") > -1) {
      $('#enddateregister' + ind).datepicker('refresh');
      $('#enddateregister' + ind).datepicker({
        changeMonth: true,
        changeYear: true,
        onSelect: function (selected) {
          const dt = new Date(selected);
          dt.setDate(dt.getDate());
          $('#startdateregister' + ind).datepicker('option', 'maxDate', dt);
          refThis.onContractDetails(event);
          refThis.submitEnable();
        }
      });
    }
    
    $('#' + id).datepicker().datepicker('show');
  }


  datechange(event: any) {
    const id = $(event.target).closest('input')[0].id;
    const suffix = id.match(/\d+/); // 123456
    $('#enddateregister' + suffix).datepicker('setDate', $('#startdateregister' + suffix).val());
    $('#enddateregister' + suffix).datepicker('option', 'minDate', $('#startdateregister' + suffix).val());
  }

  // function to check decimal or negative data
  isDecimalOrNegative = (x: number) => (x % 1 !== 0) || (x < 0) || x !== Math.floor(x);
  // Submit form data
  submitForm(data: any) {
    this.onSubmitCompanyData(data);
  }
  // function to enable add icon in contract grid
  enableAddContract() {
    const trow = $('#contractTable').find('tr');
    const tr_length = trow.length;
    const addbtn = document.getElementById('plusicon' + (tr_length - 1));
    const contractrefID=$("#contractref"+(tr_length - 1)).val().length;
    const contractdescID=$("#contractdesc"+(tr_length - 1)).val().length;
    const contractdateregisterID=$("#contractdateregister"+(tr_length - 1)).val().length;
    const NoOfSessionID=$("#session"+(tr_length - 1)).val().length;
    const downloadID=$("#download"+(tr_length - 1)).val().length;
    const startdateregisterID=$("#startdateregister"+(tr_length - 1)).val().length;
    const enddateregisterID=$("#enddateregister"+(tr_length - 1)).val().length;

    this.service.contractReferenceUpdateExists($("#contractref"+(tr_length - 1)).val()).subscribe(res => {
 
    if(res!==3 && contractrefID>=1 && contractdescID>=1 && contractdateregisterID>=1 && NoOfSessionID>=1 && downloadID>=1 && startdateregisterID>=1 && enddateregisterID>=1)
     {
        addbtn.style.pointerEvents = 'auto';
        addbtn.style.cursor = 'pointer';
        addbtn.style.opacity = '1';
     }
    else
     {
       addbtn.style.pointerEvents = 'none';
       addbtn.style.cursor = 'default';
       addbtn.style.opacity = '0.3';
    }
});
}
  
  // function to enable add icon in contact grid
  enableAdd() {
    const trow = $('#contactTable').find('tr')
    const tr_length = trow.length;
    const addbtns = document.getElementById('addicon' + (tr_length - 1));

    // document.getElementById('addicon' + (tr_length - 1));
  
     const mylengt =$("#ctname"+(tr_length - 1)).val().length;
     const mylengtH =$("#ctemail"+(tr_length - 1)).val().length;

    if(mylengt>=1 && mylengtH>=1)
    {
      
    addbtns.style.pointerEvents = 'auto';
    addbtns.style.cursor = 'pointer';
    addbtns.style.opacity = '1';
    }
    else
    {
    addbtns.style.pointerEvents = 'none';
    addbtns.style.cursor = 'default';
    addbtns.style.opacity = '0.3';
    }
  }
 
  //  remove/delete the row in the contact grid
  deleteContactFieldValue(index) {
    const submitBtn = $('#companyInsert');
    const classref = this;
    const table = document.getElementById('contactTable');
    const trs = table.getElementsByTagName('tr');
    const deleterowscount = trs.length;
    if (deleterowscount <= 1) 
    {
      this.noOfRows = [0];
      return;
    }
    const closestTR = $(index.target).closest('tr');
    const rowdifference: boolean = (this.noOfRows.length < deleterowscount) as boolean;
    const indexOfClosesttr = closestTR.index();
    if (rowdifference)  {
      $(index.target).closest('tr').remove();
    } 
    else 
    {
      this.noOfRows.splice(indexOfClosesttr, 1);
    } 
    setTimeout(function () {
      classref.enableAdd();    // For enabling add icon
    }, 5);
    submitBtn.removeAttr('disabled');

  }
   deleteContractFieldValue(no, index) {
    let arrayInd = $("#" + $(index.target).parent().parent().attr("id")).index();
    const submitBtn = $('#companyInsert');
    const classref = this;
    const table = document.getElementById('contractTable');
    const trs = table.getElementsByTagName('tr');
    const contractdeleterowscount = trs.length;
    if (contractdeleterowscount <= 1) {
       this.numberOfRows = ["uniqueid"];
      return;
    }
    const closestTR = $(index.target).closest('tr');
    const rowdifference: boolean = (this.numberOfRows.length < contractdeleterowscount) as boolean;
    const indexOfClosesttr = closestTR.index();
   if (rowdifference) 
     {
      $(index.target).parent().parent().remove();
    }
    else {
           var rowindex = this.numberOfRows.indexOf(no);
           if (rowindex > -1) {
            this.numberOfRows.splice(rowindex, 1);
           }
         }
    setTimeout(function () {
      classref.enableAddContract();    // For enabling add icon
    }, 5);
    submitBtn.removeAttr('disabled');
    $('#contractdateregister' + arrayInd).datepicker('destroy');
    $('#startdateregister' + arrayInd).datepicker('destroy');
    $('#enddateregister' + arrayInd).datepicker('destroy');
  }

  // To add new row in contact grid
  onaddrow(index?: any) {
    const submitBtn = $('#companyInsert');
    submitBtn.attr('disabled', 'disabled');
    const table = document.getElementById('contactTable');
    const trs = table.getElementsByTagName('tr');
    const rowscounting = trs.length;
    this.noOfRows.push(rowscounting);
    const rowCount = $('#contactTable').length;
    const ind = index.target.id.match(/\d+/);
    const addbutton = document.getElementById('addicon' + ind);
    addbutton.style.pointerEvents = 'none';
    addbutton.style.cursor = 'default';
    addbutton.style.opacity = '0.3';
    const secondary = $('.contact_type').val();
    const id = secondary;
    $('#second').attr('checked', 'checked');
    const tr = $('#contactTable').find('tr');
    const radioButtonArray = [];
    tr.each(function (e) {
      radioButtonArray.push($(tr[e]).find('.contact_type').val());
    });
    $('#second' + ind).attr('checked', true);
  }

  //Method to fetch country name in the dropdown
onCountryItemSelect(Selectelement: any) {
  this.country = getCountryById(Selectelement.value - 1).name;
  this.StateList = getStatesOfCountry(Selectelement.value);
  const stateElem = (document.getElementById("stateId")) as HTMLSelectElement
  stateElem.selectedIndex = 0;
  const cityElem = (document.getElementById("citynames")) as HTMLSelectElement
  cityElem.selectedIndex = 0;
  this.CityList=[];
}
  
  // Method to fetch state name in dropdown based on selected country name
  onStateItemSelect(Selectelement: any) {
  this.state = getStateById(Selectelement.value - 1).name;
  this.CityList = getCitiesOfState(Selectelement.value);
  const cityElem = (document.getElementById("citynames")) as HTMLSelectElement
  cityElem.selectedIndex = 0;
  }
  // Method to fetch the city name in dropdown based on selected state name
  onCityItemSelect(Selectelement: any) {
  this.city = getCityById(Selectelement.value - 1).name;
  }

  // 'Yes' or 'No' to Boolean
  yesNoToBoolean(yesNo: string): boolean {
    if (yesNo === 'Yes') {
      return true;
    } else {
      return false;
    }
  }
  // To check the data using regex, returns boolean
  textBox(text: string): boolean {
    const filter = /^[a-zA-Z]*$/;
    if (filter.test(text)) {
      return true;
    } else {
      return false;
    }
  }
  // Method to find the Company Name already exist in DB or not
  onCompanyExist() {
    const companyNameExist = $('#companyname').val();
    const caseCompany = companyNameExist.toUpperCase();
    this.service.companyNameExists(companyNameExist).subscribe(res => {
      if (res === 3) {
        document.getElementById('companyText').style.display = 'block';
        $('#companyText').text('Company Name Already Exists!!!');
      } else if (res === 2) {
        document.getElementById('companyText').style.display = 'none';
      }
    });
  }
  // Method to find the Contract Reference already exist in DB or not
  contractRefExists(data: any) {
    const index = data.target.id.match(/\d+/);
    const contractRef = $('#contractref' + index).val();
    const addbutton2 = document.getElementById('plusicon' + index);
    this.service.contractReferenceUpdateExists(contractRef).subscribe(res => {
      if (res === 3) {
        document.getElementById('conreftext' + index).style.display = 'block';
        $('#conreftext' + index).text('Contract Already Exists!!!');
        addbutton2.style.pointerEvents = 'none';
        addbutton2.style.cursor = 'default';
        addbutton2.style.opacity = '0.3';
      } else if (res === 2) {
        document.getElementById('conreftext' + index).style.display = 'none';
      }
    });
  }
  // Method to validate textbox (contact grid) and to enable addicon
  onKey(selectdata: any) {
    const index = selectdata.target.id.match(/\d+/);
    const contactName = $('#ctname' + index).val();
    const contactEmail = $('#ctemail' + index).val();
    const contactNumber = $('#ctnumber' + index).val();
    const rowCount = $('#contactTable tr').length;
    const rowlen = ((rowCount - index) === 1);
    const submitBtn = $('#companyInsert');
    const addbutton = document.getElementById('addicon' + index);
    if (selectdata.target.id.substring(0, 6) === 'ctname') {      
      if (contactName === '') {
        document.getElementById('ctnametext' + index).style.display = 'block';
        $('#ctnametext' + index).text('Please fill the field');
      } else if (contactName.length < 100) {
        document.getElementById('ctnametext' + index).style.display = 'none';
        if (contactName !== '' && contactEmail !== '') {
           if (contactEmail.match(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)) {
            document.getElementById('ctemailtext' + index).style.display = 'none';
            if (contactName !== '' && contactEmail !== '') {
              addbutton.style.pointerEvents = 'auto';
              addbutton.style.cursor = 'pointer';
              addbutton.style.opacity = '1';
            }
          }
        }
      } else {
        document.getElementById('ctnametext' + index).style.display = 'block';
        $('#ctnametext' + index).text('You Reached max character.');
      }
    }
    if (selectdata.target.id.substring(0, 7) === 'ctemail') {
      if (contactEmail === '') {
        document.getElementById('ctemailtext' + index).style.display = 'block';
        $('#ctemailtext' + index).text('Please fill the field');
      } else if (contactEmail.match(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)) {
        document.getElementById('ctemailtext' + index).style.display = 'none';
        if (contactName !== '' && contactEmail !== '') {
          addbutton.style.pointerEvents = 'auto';
          addbutton.style.cursor = 'pointer';
          addbutton.style.opacity = '1';
        }
      } else {
        document.getElementById('ctemailtext' + index).style.display = 'block';
        $('#ctemailtext' + index).text('Enter valid email id.');
        addbutton.style.pointerEvents = 'none';
        addbutton.style.cursor = 'default';
        addbutton.style.opacity = '0.3';
      }
    }
    if (contactName === '' || contactEmail === '') {
      addbutton.style.pointerEvents = 'none';
      addbutton.style.cursor = 'default';
      addbutton.style.opacity = '0.3';
    }
    
    if (rowlen === false) {
      addbutton.style.pointerEvents = 'none';
      addbutton.style.cursor = 'default';
      addbutton.style.opacity = '0.3';
    }
  }
  // Method to check entered data is number
  isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 47 || charCode > 57)) {
      return false;
    }
    return true;
  }
  onSelectDate(selectdata: any) {
    const index = selectdata.target.id.match(/\d+/);
    const conDate = $('#contractdateregister' + index).val();
  }
  // Method to validate textbox (contract grid) and to enable addicon
  onContractDetails(selectdata: any) {
    
    const index = selectdata.target.id.match(/\d+/);
    const contractRef = $('#contractref' + index).val();
    const contractDesc = $('#contractdesc' + index).val();
    const conDate = $('#contractdateregister' + index).val();
    const sessionText = $('#session' + index).val();
    const startdateregisterID =$("#startdateregister"+(index)).val();
    const enddateregisterID =$("#enddateregister"+(index)).val();
    const downloadText = $('#download' + index).val();
    const submitBtn = $('#companyInsert');
    const addbutton2 = document.getElementById('plusicon' + index);
    const rowCount = $('#contractTable tr').length;
    const rowCont = ((rowCount - index) === 1);
  
    if (selectdata.target.id.substring(0, 11) === 'contractref')
    {
      if (contractRef === '') 
      {
        document.getElementById('conreftext' + index).style.display = 'block';
        $('#conreftext' + index).text('Please fill the field');
      } 
      else if (contractRef.length > 20)
       {
        document.getElementById('conreftext' + index).style.display = 'block';
        $('#conreftext' + index).text('You Reached max character.');
       } 
      else 
      {
        document.getElementById('conreftext' + index).style.display = 'none';
      }
    }
   
    if (selectdata.target.id.substring(0, 12) === 'contractdesc') 
    {
      if (contractDesc === '') 
      {
        document.getElementById('condesctext' + index).style.display = 'block';
        $('#condesctext' + index).text('Please fill the field');
      } 
      else if (contractDesc.length >= 200)
       {
        document.getElementById('condesctext' + index).style.display = 'block';
        $('#condesctext' + index).text('You Reached max character.');
      }
       else 
       {
        document.getElementById('condesctext' + index).style.display = 'none';
      }
    }
   
    if (selectdata.target.id.substring(0, 20) === 'contractdateregister')
    {
      if (conDate === '')
       {
         document.getElementById('condate' + index).style.display = 'block';
         $('#condate' + index).text('Please fill the Date');
       }
    }
   
    if (selectdata.target.id.substring(0, 7) === 'session')
     {
      if (sessionText === '')
       {
        document.getElementById('sessiontext' + index).style.display = 'block';
        $('#sessiontext' + index).text('Please fill the field');
       }
       else if (sessionText.length >= 20)
        {
         document.getElementById('sessiontext' + index).style.display = 'block';
         $('#sessiontext' + index).text('You Reached max character.');
        } 
      else if (parseInt(sessionText) === 0)
       {
        document.getElementById('sessiontext' + index).style.display = 'block';
        $('#sessiontext' + index).text('Enter Valid data');
       }
      else 
       {
        document.getElementById('sessiontext' + index).style.display = 'none';
       }
    }
     
   if (selectdata.target.id.substring(0, 8) === 'download')
    {
      if (downloadText === '') 
      {
        document.getElementById('downloadtext' + index).style.display = 'block';
        $('#downloadtext' + index).text('Please fill the field');
      }
      else if (this.isDecimalOrNegative(parseInt(downloadText)) === true) 
      {
        document.getElementById('downloadtext' + index).style.display = 'block';
        $('#downloadtext' + index).text('Enter Valid data');
      }
      else if (downloadText.length >= 20)
       {
        document.getElementById('downloadtext' + index).style.display = 'block';
        $('#downloadtext' + index).text('You Reached max character.');
      }
      else
       {
        document.getElementById('downloadtext' + index).style.display = 'none';
       }
    }
 
    this.service.contractReferenceUpdateExists(contractRef).subscribe(res => {
    if ( res === 3 ||contractRef === '' || contractDesc === '' || sessionText === '' || downloadText === '' || startdateregisterID===''||enddateregisterID==='' || conDate==='') 

       {
         addbutton2.style.pointerEvents = 'none';
         addbutton2.style.cursor = 'default';
         addbutton2.style.opacity = '0.3';
       } 
    
    else if (contractRef !== '' && contractDesc !== '' && sessionText !== '' && downloadText !== '' && startdateregisterID!==''&& enddateregisterID!=='' && conDate !== '')
      {
       addbutton2.style.pointerEvents = 'auto';
       addbutton2.style.cursor = 'pointer';
       addbutton2.style.opacity = '1';
      }
    });
  
    if (rowCont === false)
     {
       addbutton2.style.pointerEvents = 'none';
       addbutton2.style.cursor = 'default';
       addbutton2.style.opacity = '0.3';
     }
  }
  submitEnable()
  {
    const submitBtn = $('#companyInsert');
    let selectVal = [];
    var textArea = $("textarea[mandatory=true]");
    for(let i=0; i<textArea.length; i++)
    {
      if(textArea[i].value.trim() !== "") selectVal.push(textArea[i].value);
    }
    var input = $("input[mandatory=true]");
    for(let i=0; i<input.length; i++)
    {
      if(input[i].value.trim() !== "") selectVal.push(input[i].value);
    }
    var select = $("select[mandatory=true]").find(":selected");
    for(let i=0; i<select.length; i++)
    {
      if(select[i].innerText.trim() !== "--Select--") selectVal.push(select[i].value);
    }

    if((input.length + select.length + textArea.length) == selectVal.length) submitBtn.removeAttr('disabled');
    else submitBtn.attr('disabled', 'disabled');
  }
 
  // Method to submit the data in the DB
  onSubmitCompanyData(data: any) {
    // Making the Grid empty
    this.inputGridObject = [];
    this.inputGridObject2 = [];
    // Flag for Grid
    let isGridNull = false;
    let isGrid2Null = false;
    let textValuesNull = false;
    let contactVisibility;
    let contractVisibility;
    let contactVisibilityFlag = false;
    let contractVisibilityFlag = false;
    const classref = this;
    const companynameId = $('#companyname').find('h6');
    const trs = $('#contactTable').find('tr');
    const companyexist = $('#companyText').is(':visible');
    //  If company name already exist, it returns
    if (companyexist === true) {
      JSAlert.alert("Company Name already exist");
      return;
    }
    $("tr").css("background-color", "#f3f3f3");
    let primeCount = 0;
    trs.each(function (el) {
      const rowID = (trs[el].id);
      const visible = $(trs[el]).find('h6');
      const contact_type = $(trs[el]).find('.contact_type:checked').val();
      const contact_name = $(trs[el]).find('.contactname').val();
      const email_id = $(trs[el]).find('.contactemail').val();
      const mobile_number = $(trs[el]).find('.contactmobile').val();

      contactVisibility = visible.is(':visible');
      if (contact_type === '' || contact_name === '' || email_id === '') {
        document.getElementById(rowID).style.backgroundColor = '#c3acb1';
        isGridNull = true;
      }
      //  To check if atleast one primary contact details is present
      if (contact_type === 'Primary') {
        primeCount = primeCount + 1;
      }

      if (contactVisibility === true) {
        document.getElementById(rowID).style.backgroundColor = '#c3acb1';
        contactVisibilityFlag = true;
        return;
      }
      const rowObject = {
        'contact_type': contact_type,
        'contact_name': contact_name,
        'email_id': email_id,
        'mobile_number': mobile_number
      };
      classref.inputGridObject.push(rowObject); //Pushing the contact details, data in an object
    });
    const tr2 = $('#contactTable').find('tr');
    const emailArray: string[] = [];
    // Pushing all the email id's, in an array
    tr2.each(function (e) {
      emailArray.push($(trs[e]).find('.contactemail').val());
    });
    //  Checking for duplicate email Id's are present
    for (let i = 0; i < emailArray.length; i++) {
      for (let j = 1; j < emailArray.length; j++) {
        if (i !== j) {
          if (emailArray[i] === emailArray[j]) {
            JSAlert.alert('Contact email id "' + emailArray[i] + '" is repeated');
            return;
          }
        }
      }
    }
    if (primeCount < 1) {
      JSAlert.alert('Please select atleast one Contact as Primary');
      return;
    }
    if (primeCount > 1) {
      JSAlert.alert('Please select only one Contact as Primary');
      return;
    }
    const trs2 = $('#contractTable').find('tr');
    const adminName = this.name;
    trs2.each((el) => {
      const rowId = (trs2[el].id);
      const visible = $(trs2[el]).find('h6');
      const contract_reference = $(trs2[el]).find('.contractreference').val();
      const contract_description = $(trs2[el]).find('.contractdesc').val();
      const contract_date = $(trs2[el]).find('.contractdate').val();
      const max_allowed_logins = $(trs2[el]).find('.session').val();
      // const download_limit = $(trs2[el]).find('.downloadlimit').val();
      // const export_flag = $(trs2[el]).find('.exportvalue').val();
      const general_alert_flag = $(trs2[el]).find('.alertvalue').val();
      const valid_start_date = $(trs2[el]).find('.startdate').val();
      const valid_to_date = $(trs2[el]).find('.enddate').val();
      let generalAlertBoolean: Boolean;
      // exportBoolean = classref.yesNoToBoolean(export_flag);
      generalAlertBoolean = classref.yesNoToBoolean(general_alert_flag);
      contractVisibility = visible.is(':visible');
      if (contractVisibility === true) {
        document.getElementById(rowId).style.backgroundColor = '#c3acb1';
        contractVisibilityFlag = true;
        return;
      }
      if (contract_reference === '' || contract_description === '' || contract_date === '' || valid_start_date === '' ||
        valid_to_date === '' || max_allowed_logins === '' ) {
        document.getElementById(rowId).style.backgroundColor = '#c3acb1';
        isGrid2Null = true;
        return;
      }
      const row2Object = {
        'contract_reference': contract_reference,
        'contract_description': contract_description,
        'contract_date': new Date(contract_date).toISOString(),
        'valid_start_date': new Date(valid_start_date).toISOString(),
        'valid_to_date': new Date(valid_to_date).toISOString(),
        'max_allowed_logins': max_allowed_logins,
        // 'export_flag': exportBoolean,
        'general_alert_flag': generalAlertBoolean,
        // 'download_limit': download_limit,
        'created_date': this.dateTime,
        'last_updated_date': this.dateTime,
        'last_updated_by': adminName
      };

      classref.inputGridObject2.push(row2Object); //Pushing the contract details, data in an object
      const rowLength = classref.inputGridObject2.length;
    });
    const tr = $('#contractTable').find('tr');
    const testArray: string[] = [];
    tr.each(function (e) {
      testArray.push($(trs2[e]).find('.contractreference').val());
    });
    // Checking for duplicate contract reference number are present
    for (let i = 0; i < testArray.length; i++) {
      for (let j = 1; j < testArray.length; j++) {
        if (i !== j) {
          if (testArray[i] === testArray[j]) {
            JSAlert.alert('Contract Reference number ' + testArray[i] + ' is repeated');
            this.flag = 1;
            return;
          }
        }
      }
    }
    if (this.flag === 0) {
      const arrayOfContractReference: string[] = [];
      for (let i = 0; i < this.inputGridObject2.length; i++) {
        arrayOfContractReference.push(this.inputGridObject2[i].contract_reference);
      }
      const desc: any = document.getElementById('comdesc');
      const addr: any = document.getElementById('comaddress');
      const panNumber: any = document.getElementById('panNum');
      const zip: any = document.getElementById('zipCodes');
      const gstNumber: any = document.getElementById('gstNumber');
      const object = {
        companyname: this.companyName,
        gst_num: gstNumber.value,
        panNum: panNumber.value,
        companydesc: desc.value,
        companyaddress: addr.value,
        countries: this.country,
        states: this.state,
        cities: this.city,
        zipcode: zip.value,
        contactdetails: this.inputGridObject,
        contractdetails: arrayOfContractReference,
        createdate: this.dateTime,
        updateddate: this.dateTime,
        lastUpdatedValue: this.name,
        email_flag: this.emailFlag,
        from_Email: this.FromEmail,
      };

      // const company_type: any = document.getElementById('cmpnytype');
      const gstNum:any = document.getElementById('gstNumber');
      const countrynames: any = document.getElementById('countryDatas');
      const countryValue = countrynames.options[countrynames.selectedIndex].value;
      const statenames: any = document.getElementById('stateId');
      const stateValue = statenames.options[statenames.selectedIndex].value;
      const citynames: any = document.getElementById('citynames');
      const cityValue = citynames.options[citynames.selectedIndex].value;
      const comName: any = document.getElementById('companyname');
      const panNum : any = document.getElementById('panNum');
      const compaddr: any = document.getElementById('comaddress');
      const compdesc: any = document.getElementById('comdesc');
      const zipCd: any = document.getElementById('zipCodes');
      if (comName.value === '') {
        textValuesNull = true;
      }
      if ( countryValue === '--Select--' || countryValue === '' ||
        isGridNull || isGrid2Null || textValuesNull || contactVisibilityFlag || contractVisibilityFlag) {
        JSAlert.alert('Please fill the mandatory fields');
        return;
      } else {
        // DB call to submit the company details in company collection
        this.service.addvalue(object);
        for (const i of this.inputGridObject2) {
          // DB call to submit the contract details in contract collection
          this.service.addContract(i);
        }
        JSAlert.alert('Company Registered successfully');
        this.routes.navigate(['/loader']);
      }
    } else if (this.flag === 1) {
      this.flag = 0;
    }
  }

  // Method to add the new row in contract grid
  onaddcontract(index?: any) {
    const submitBtn = $('#companyInsert');
    submitBtn.attr('disabled', 'disabled');
    const table = document.getElementById('contractTable');
    const trs = table.getElementsByTagName('tr');
    const contractrowscounting = trs.length;
    this.numberOfRows.push(this.rowuniqueID());
    // Get the onload param values
    this.onloadparam(this.numberOfRows.length - 1);
    const ind = index.target.id.match(/\d+/);
    const addbutton2 = document.getElementById('plusicon' + ind);
    addbutton2.style.pointerEvents = 'none';
    addbutton2.style.cursor = 'default';
    addbutton2.style.opacity = '0.3';
  }

  rowuniqueID() {
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    var sessionid = "";
    for (var x = 0; x < 8; x++) {
      var i = Math.floor(Math.random() * 62);
      sessionid += chars.charAt(i);
    }
    return sessionid;
  }

}














































// /*
// Feature: Company Registration Form - To register new company details
// */

// import { Component, OnInit, AfterViewInit } from '@angular/core';
// import { isNullOrUndefinedorEmptyString } from '../../../../utils/admin_isNullorUndefinedorEmptyString'; //To check the data is null or undefined
// import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { getAllCountries, getStatesOfCountry, getCitiesOfState, getCountryById, getStateById, getCityById } from 'country-state-city'; //country-state-city dropdown
// import { AdminLoginServiceService } from '../../common-services/admin-service.service';
// import { format } from 'date-fns'; //For manipulating javascript dates
// const JSAlert = require('js-alert');
// declare var $: any;
// declare var slider: any;
// declare var datepicker: any;

// @Component({
//   selector: 'app-adminregistercompany',
//   templateUrl: './adminregistercompany.component.html',
//   styleUrls: ['./adminregistercompany.component.css']
// })
// export class AdminRegisterCompanyComponent implements OnInit, AfterViewInit {
  
//   public companyName: string;
//   public department: string;
//   public companyDesc: string;
//   public address: string;
//   public country: string;
//   public state: string;
//   public city: string;
//   public zipCode: number;
//   countryName: any;
//   stateName: any;
//   cityName: any;
//   public contactName: string;
//   public contactEmail: string;
//   public contactMobile: string;
//   public contractRef: string;
//   public contractDesc: string;
//   public contractDate: any;
//   public contractStateDate: any;
//   public contractEndDate: any;
//   public currentdate: any;
//   public contractSession: number;
//   public contractDownload: number;
//   public contractExport: string;
//   public contractAlert: string;
//   public rows = false;
//   public firstcompany = false;
//   public secondcompany = false;
//   public registering = false;
//   public updating = false;
//   public newContactRow = false;
//   path: any;
//   noOfRows = [0];
//   Rowsupdatefirst: number[] = [];
//   numberOfRows = [0];
//   inputGridObject: any[] = [];
//   inputGridObject2: any[] = [];
//   public datetime: any;
//   public JSAlert = require('js-alert');
//   public dateTime = format(new Date(), 'MM/DD/YYYY')
//   addIconDisabled = false;
//   flag = 0;
//   secondFlag = 0;

//   // Values from Session
//   private name: string = sessionStorage.getItem('UserID');

//   CountryList: string[];
//   StateList: string[];
//   CityList: string[];
//   Exists: boolean;
//   emailFlag: boolean;
//   FromEmail: any;
//   // Fetch Global Settings Response
//   globalsettings: object[];
//   formdata;
//   constructor(private routes: Router, public service: AdminLoginServiceService, public http: HttpClient) { }
//   ngOnInit() {
//     console.log("In register company");
//     const ide = getCountryById(0);
//     // Method call for loading Country,State,City dropdown
//     this.CountryList = getAllCountries();
//     this.StateList = getStatesOfCountry();
//     this.CityList = getCitiesOfState();
//     this.newContactRow = true;
//     // To get the data in the form
//     this.formdata = new FormGroup({
//       companyname: new FormControl('', Validators.compose([
//         Validators.required,
//         Validators.maxLength(100)
//       ])),
//       gstNumber: new FormControl('', Validators.compose([
//         Validators.required,
//         Validators.maxLength(100)
//       ])),
//       panNumber: new FormControl('', Validators.compose([
//         Validators.required,
//         Validators.maxLength(100)
//       ])),
//       companyDescription: new FormControl('', Validators.compose([
//         Validators.maxLength(500)
//       ])),
//       companyAddress: new FormControl('', Validators.compose([
//         Validators.maxLength(200)
//       ])),
//       zipcode: new FormControl('', Validators.compose([
//         Validators.maxLength(50)
//       ])),
//       ctnames: new FormControl('', Validators.compose([
//         Validators.required,
//         Validators.maxLength(100)
//       ])),
//       ctemailid: new FormControl('', Validators.compose([
//         Validators.required
//       ])),
//       ctnumber: new FormControl('', Validators.compose([
//         Validators.required,
//         Validators.maxLength(100)
//       ]))
//     });
//     this.onloadparam('0');
//     this.addIconDisabled = true;
//     //  Fetch the emailflag from DB
//     /* this.service.paramEmailFlag().subscribe(res => {
//       this.emailFlag = res[1].param_value;
//       this.FromEmail = res[0].param_value;
//     }) */
//   }

//   ngAfterViewInit() {

//   }

//   resetClick() {
//     this.routes.navigate(['/loader']);
//   }
//   // To fetch the default values, from param table (Downloadlimit,no of session,export and general alert flag )
//   onloadparam(increment: any) {
//     this.service.companyParamValue().subscribe(res => {
//       this.globalsettings = res;
//       for (let i = 0; i < this.globalsettings.length; i++) {
//         const download_Limit: any = document.getElementById('download' + increment);
//         const no_of_session: any = document.getElementById('session' + increment);
//         if (this.globalsettings[i]['param_name'] === 'download_limit') {
//           download_Limit.value = this.globalsettings[i]['param_value'];
//         }
//         if (this.globalsettings[i]['param_name'] === 'No_of_session') {
//           no_of_session.value = this.globalsettings[i]['param_value'];
//         }
//         if (this.globalsettings[i]['param_name'] === 'export_flag') {
//           if (this.globalsettings[i]['param_value'] === false) {
//             $('#dropdown1' + increment).prop('selectedIndex', 1);
//           } else {
//             $('#dropdown1' + increment).prop('selectedIndex', 0);
//           }
//         }
//         if (this.globalsettings[i]['param_name'] === 'general_alert_flag') {
//           if (this.globalsettings[i]['param_value'] === false) {
//             $('#dropdown2' + increment).prop('selectedIndex', 1);
//           } else {
//             $('#dropdown2' + increment).prop('selectedIndex', 0);
//           }
//         }
//       }
//     });
//   }
//   /* To set the contract date, based on the contract date selection the min and max date range for contract 
//   start and end date is set */
//   datefetch(event: any) {
//     const ind = event.target.id.match(/\d+/);
//     $('#contractdateregister' + ind).datepicker({
//       changeMonth: true,
//       changeYear: true,
//       onSelect: function (selected) {
//         const dt = new Date(selected);
//         dt.setDate(dt.getDate());
//         $('#startdateregister' + ind).datepicker('option', 'minDate', dt);
//       }
//     });
//     $('#startdateregister' + ind).datepicker({
//       changeMonth: true,
//       changeYear: true,
//       onSelect: function (selected) {
//         const dt = new Date(selected);
//         dt.setDate(dt.getDate());
//         $('#contractdateregister' + ind).datepicker('option', 'maxDate', dt);
//         $('#enddateregister' + ind).datepicker('option', 'minDate', dt);
//       }
//     });
//     $('#enddateregister' + ind).datepicker({
//       changeMonth: true,
//       changeYear: true,
//       onSelect: function (selected) {
//         const dt = new Date(selected);
//         dt.setDate(dt.getDate());
//         $('#startdateregister' + ind).datepicker('option', 'maxDate', dt);
//       }
//     });
//     const id = $(event.target).closest('input')[0].id;
//     $('#' + id).datepicker().datepicker('show');
//   }


//   datechange(event: any) {
//     const id = $(event.target).closest('input')[0].id;
//     const suffix = id.match(/\d+/); // 123456
//     $('#enddateregister' + suffix).datepicker('setDate', $('#startdateregister' + suffix).val());
//     $('#enddateregister' + suffix).datepicker('option', 'minDate', $('#startdateregister' + suffix).val());
//   }

//   // function to check decimal or negative data
//   isDecimalOrNegative = (x: number) => (x % 1 !== 0) || (x < 0) || x !== Math.floor(x);
//   // Submit form data
//   submitForm(data: any) {
//     this.onSubmitCompanyData(data);
//   }
//   // function to enable add icon in contract grid
//   enableAddContract() {
//     const trow = $('#contractTable').find('tr');
//     const tr_length = trow.length;
//     const addbtn = document.getElementById('plusicon' + (tr_length - 1));
//     addbtn.style.pointerEvents = 'auto';
//     addbtn.style.cursor = 'pointer';
//     addbtn.style.opacity = '1';
//   }
//   // function to enable add icon in contact grid
//   enableAdd() {
//     const trow = $('#contactTable').find('tr')
//     const tr_length = trow.length;
//     const addbtns = document.getElementById('addicon' + (tr_length - 1));
//     addbtns.style.pointerEvents = 'auto';
//     addbtns.style.cursor = 'pointer';
//     addbtns.style.opacity = '1';
//   }
//   //  remove/delete the row in the contact grid
//   deleteContactFieldValue(index) {
//     const submitBtn = $('#companyInsert');
//     const classref = this;
//     const table = document.getElementById('contactTable');
//     const trs = table.getElementsByTagName('tr');
//     const deleterowscount = trs.length;
//     if (deleterowscount <= 1) {
//       this.noOfRows = [0];
//       return;
//     }
//     const closestTR = $(index.target).closest('tr');
//     const rowdifference: boolean = (this.noOfRows.length < deleterowscount) as boolean;
//     const indexOfClosesttr = closestTR.index();
//     if (rowdifference) {
//       $(index.target).closest('tr').remove();
//     } else {
//       this.noOfRows.splice(indexOfClosesttr, 1);
//     }
//     const rowCount = $('#contactTable tr').length;
//     const rowcount = trs.length;
//     setTimeout(function () {
//       classref.enableAdd();    // For enabling add icon
//     }, 5);
//     submitBtn.removeAttr('disabled');
//   }

//   // To remove/delete the row in the contract grid
//   deleteContractFieldValue(index) {
//     const submitBtn = $('#companyInsert');
//     const classref = this;
//     const table = document.getElementById('contractTable');
//     const trs = table.getElementsByTagName('tr');
//     const contractdeleterowscount = trs.length;
//     if (contractdeleterowscount <= 1) {
//       this.numberOfRows = [0];
//       return;
//     }
//     const closestTR = $(index.target).closest('tr');
//     const rowdifference: boolean = (this.numberOfRows.length < contractdeleterowscount) as boolean;
//     const indexOfClosesttr = closestTR.index();
//     if (rowdifference) {
//       $(index.target).parent().parent().remove();
//     } else {
//       let arrayInd = $("#" + $(index.target).parent().parent().attr("id")).index();
//       this.numberOfRows.splice(arrayInd, 1);
//     }
//     setTimeout(function () {
//       classref.enableAddContract();    // For enabling add icon
//     }, 5);
//     submitBtn.removeAttr('disabled');
//   }

//   // To add new row in contact grid
//   onaddrow(index?: any) {
//     const submitBtn = $('#companyInsert');
//     submitBtn.attr('disabled', 'disabled');
//     const table = document.getElementById('contactTable');
//     const trs = table.getElementsByTagName('tr');
//     const rowscounting = trs.length;
//     this.noOfRows.push(rowscounting);
//     const rowCount = $('#contactTable').length;
//     const ind = index.target.id.match(/\d+/);
//     const addbutton = document.getElementById('addicon' + ind);
//     addbutton.style.pointerEvents = 'none';
//     addbutton.style.cursor = 'default';
//     addbutton.style.opacity = '0.3';
//     const secondary = $('.contact_type').val();
//     const id = secondary;
//     $('#second').attr('checked', 'checked');
//     const tr = $('#contactTable').find('tr');
//     const radioButtonArray = [];
//     tr.each(function (e) {
//       radioButtonArray.push($(tr[e]).find('.contact_type').val());
//     });
//     $('#second' + ind).attr('checked', true);
//   }

// //Method to fetch country name in the dropdown
// onCountryItemSelect(Selectelement: any) {
//   this.country = getCountryById(Selectelement.value - 1).name;
//   this.StateList = getStatesOfCountry(Selectelement.value);
//   const stateElem = (document.getElementById("stateId")) as HTMLSelectElement
//   stateElem.selectedIndex = 0;
//   const cityElem = (document.getElementById("citynames")) as HTMLSelectElement
//   cityElem.selectedIndex = 0;
//   this.CityList=[];
// }
  
//   // Method to fetch state name in dropdown based on selected country name
//   onStateItemSelect(Selectelement: any) {
//   this.state = getStateById(Selectelement.value - 1).name;
//   this.CityList = getCitiesOfState(Selectelement.value);
//   const cityElem = (document.getElementById("citynames")) as HTMLSelectElement
//   cityElem.selectedIndex = 0;
//   }
//   // Method to fetch the city name in dropdown based on selected state name
//   onCityItemSelect(Selectelement: any) {
//   this.city = getCityById(Selectelement.value - 1).name;
//   }
//   // 'Yes' or 'No' to Boolean
//   yesNoToBoolean(yesNo: string): boolean {
//     if (yesNo === 'Yes') {
//       return true;
//     } else {
//       return false;
//     }
//   }
//   // To check the data using regex, returns boolean
//   textBox(text: string): boolean {
//     const filter = /^[a-zA-Z]*$/;
//     if (filter.test(text)) {
//       return true;
//     } else {
//       return false;
//     }
//   }
//   // Method to find the Company Name already exist in DB or not
//   onCompanyExist() {
//     const companyNameExist = $('#companyname').val();
//     const caseCompany = companyNameExist.toUpperCase();
//     this.service.companyNameExists(companyNameExist).subscribe(res => {
//       if (res === 3) {
//         document.getElementById('companyText').style.display = 'block';
//         $('#companyText').text('Company Name Already Exists!!!');
//       } else if (res === 2) {
//         document.getElementById('companyText').style.display = 'none';
//       }
//     });
//   }
//   // Method to find the Contract Reference already exist in DB or not
//   contractRefExists(data: any) {
//     const index = data.target.id.match(/\d+/);
//     const contractRef = $('#contractref' + index).val();
//     const addbutton2 = document.getElementById('plusicon' + index);
//     this.service.contractReferenceUpdateExists(contractRef).subscribe(res => {
//       if (res === 3) {
//         document.getElementById('conreftext' + index).style.display = 'block';
//         $('#conreftext' + index).text('Contract Already Exists!!!');
//         addbutton2.style.pointerEvents = 'none';
//         addbutton2.style.cursor = 'default';
//         addbutton2.style.opacity = '0.3';
//       } else if (res === 2) {
//         document.getElementById('conreftext' + index).style.display = 'none';
//       }
//     });
//   }
//   // Method to validate textbox (contact grid) and to enable addicon
//   onKey(selectdata: any) {
//     const index = selectdata.target.id.match(/\d+/);
//     const contactName = $('#ctname' + index).val();
//     const contactEmail = $('#ctemail' + index).val();
//     const contactNumber = $('#ctnumber' + index).val();
//     const rowCount = $('#contactTable tr').length;
//     const rowlen = ((rowCount - index) === 1);
//     const submitBtn = $('#companyInsert');
//     const addbutton = document.getElementById('addicon' + index);
//     if (selectdata.target.id.substring(0, 6) === 'ctname') {
//       if (contactName === '') {
//         document.getElementById('ctnametext' + index).style.display = 'block';
//         $('#ctnametext' + index).text('Please fill the field');
//       } else if (contactName.length < 100) {
//         document.getElementById('ctnametext' + index).style.display = 'none';
//       } else {
//         document.getElementById('ctnametext' + index).style.display = 'block';
//         $('#ctnametext' + index).text('You Reached max character.');
//       }
//     }
//     if (selectdata.target.id.substring(0, 7) === 'ctemail') {
//       if (contactEmail === '') {
//         document.getElementById('ctemailtext' + index).style.display = 'block';
//         $('#ctemailtext' + index).text('Please fill the field');
//       } else if (contactEmail.match(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)) {
//         document.getElementById('ctemailtext' + index).style.display = 'none';
//       } else {
//         document.getElementById('ctemailtext' + index).style.display = 'block';
//         $('#ctemailtext' + index).text('Enter valid email id.');
//         addbutton.style.pointerEvents = 'none';
//         addbutton.style.cursor = 'default';
//         addbutton.style.opacity = '0.3';
//       }
//     }
//     if (contactName === '' || contactEmail === '') {
//       addbutton.style.pointerEvents = 'none';
//       addbutton.style.cursor = 'default';
//       addbutton.style.opacity = '0.3';
//     }
//     if (contactName !== '' && contactEmail !== '') {
//       addbutton.style.pointerEvents = 'auto';
//       addbutton.style.cursor = 'pointer';
//       addbutton.style.opacity = '1';
//     }
//     if (rowlen === false) {
//       addbutton.style.pointerEvents = 'none';
//       addbutton.style.cursor = 'default';
//       addbutton.style.opacity = '0.3';
//     }
//     if (contactName === '' || contactEmail === '') {
//       submitBtn.attr('disabled', 'disabled');
//     } else {
//       submitBtn.removeAttr('disabled');
//     }
//   }
//   // Method to check entered data is number
//   isNumber(evt) {
//     evt = (evt) ? evt : window.event;
//     var charCode = (evt.which) ? evt.which : evt.keyCode;
//     if (charCode > 31 && (charCode < 47 || charCode > 57)) {
//       return false;
//     }
//     return true;
//   }
//   onSelectDate(selectdata: any) {
//     const index = selectdata.target.id.match(/\d+/);
//     const conDate = $('#contractdateregister' + index).val();
//   }
//   // Method to validate textbox (contract grid) and to enable addicon
//   onContractDetails(selectdata: any) {
//     const index = selectdata.target.id.match(/\d+/);
//     const contractRef = $('#contractref' + index).val();
//     const contractDesc = $('#contractdesc' + index).val();
//     const conDate = $('#contractdateregister' + index).val();
//     const sessionText = $('#session' + index).val();
//     const downloadText = $('#download' + index).val();
//     const submitBtn = $('#companyInsert');
//     const addbutton2 = document.getElementById('plusicon' + index);
//     const rowCount = $('#contractTable tr').length;
//     const rowCont = ((rowCount - index) === 1);
//     if (selectdata.target.id.substring(0, 11) === 'contractref') {
//       if (contractRef === '') {
//         document.getElementById('conreftext' + index).style.display = 'block';
//         $('#conreftext' + index).text('Please fill the field');
//       } else if (contractRef.length > 20) {
//         document.getElementById('conreftext' + index).style.display = 'block';
//         $('#conreftext' + index).text('You Reached max character.');
//       } else {
//         document.getElementById('conreftext' + index).style.display = 'none';
//       }
//     }
//     if (selectdata.target.id.substring(0, 12) === 'contractdesc') {
//       if (contractDesc === '') {
//         document.getElementById('condesctext' + index).style.display = 'block';
//         $('#condesctext' + index).text('Please fill the field');
//       } else if (contractDesc.length >= 200) {
//         document.getElementById('condesctext' + index).style.display = 'block';
//         $('#condesctext' + index).text('You Reached max character.');
//       } else {
//         document.getElementById('condesctext' + index).style.display = 'none';
//       }
//     }
//     if (selectdata.target.id.substring(0, 20) === 'contractdateregister') {
//       if (conDate === '') {
//         document.getElementById('condate' + index).style.display = 'block';
//         $('#condate' + index).text('Please fill the Date');
//       }
//     }
//     if (selectdata.target.id.substring(0, 7) === 'session') {
//       if (sessionText === '') {
//         document.getElementById('sessiontext' + index).style.display = 'block';
//         $('#sessiontext' + index).text('Please fill the field');
//       } else if (sessionText.length >= 20) {
//         document.getElementById('sessiontext' + index).style.display = 'block';
//         $('#sessiontext' + index).text('You Reached max character.');
//       } else if (parseInt(sessionText) === 0) {
//         document.getElementById('sessiontext' + index).style.display = 'block';
//         $('#sessiontext' + index).text('Enter Valid data');
//       }
//       else {
//         document.getElementById('sessiontext' + index).style.display = 'none';
//       }
//     }
//     if (selectdata.target.id.substring(0, 8) === 'download') {
//       if (downloadText === '') {
//         document.getElementById('downloadtext' + index).style.display = 'block';
//         $('#downloadtext' + index).text('Please fill the field');
//       }
//       else if (this.isDecimalOrNegative(parseInt(downloadText)) === true) {
//         document.getElementById('downloadtext' + index).style.display = 'block';
//         $('#downloadtext' + index).text('Enter Valid data');
//       }
//       else if (downloadText.length >= 20) {
//         document.getElementById('downloadtext' + index).style.display = 'block';
//         $('#downloadtext' + index).text('You Reached max character.');
//       }
//       else {
//         document.getElementById('downloadtext' + index).style.display = 'none';
//       }
//     }
//     if (contractRef === '' || contractDesc === '' || sessionText === '' || downloadText === '') {
//       addbutton2.style.pointerEvents = 'none';
//       addbutton2.style.cursor = 'default';
//       addbutton2.style.opacity = '0.3';
//     }

//     if (contractRef !== '' && contractDesc !== '' && sessionText !== '' && downloadText !== '') {
//       addbutton2.style.pointerEvents = 'auto';
//       addbutton2.style.cursor = 'pointer';
//       addbutton2.style.opacity = '1';
//     }
//     if (rowCont === false) {
//       addbutton2.style.pointerEvents = 'none';
//       addbutton2.style.cursor = 'default';
//       addbutton2.style.opacity = '0.3';
//     }
//     if (contractRef === '' || contractDesc === '' || sessionText === '' || downloadText === '') {
//       submitBtn.attr('disabled', 'disabled');
//     } else {
//       submitBtn.removeAttr('disabled');

//     }
//   }
//   // Method to submit the data in the DB
//   onSubmitCompanyData(data: any) {
//     // Making the Grid empty
//     this.inputGridObject = [];
//     this.inputGridObject2 = [];
//     // Flag for Grid
//     let isGridNull = false;
//     let isGrid2Null = false;
//     let textValuesNull = false;
//     let contactVisibility;
//     let contractVisibility;
//     let contactVisibilityFlag = false;
//     let contractVisibilityFlag = false;
//     const classref = this;
//     const companynameId = $('#companyname').find('h6');
//     const trs = $('#contactTable').find('tr');
//     const companyexist = $('#companyText').is(':visible');
//     //  If company name already exist, it returns
//     if (companyexist === true) {
//       JSAlert.alert("Company Name already exist");
//       return;
//     }
//     $("tr").css("background-color", "#f3f3f3");
//     let primeCount = 0;
//     trs.each(function (el) {
//       const rowID = (trs[el].id);
//       const visible = $(trs[el]).find('h6');
//       const contact_type = $(trs[el]).find('.contact_type:checked').val();
//       const contact_name = $(trs[el]).find('.contactname').val();
//       const email_id = $(trs[el]).find('.contactemail').val();
//       const mobile_number = $(trs[el]).find('.contactmobile').val();

//       contactVisibility = visible.is(':visible');
//       if (contact_type === '' || contact_name === '' || email_id === '') {
//         document.getElementById(rowID).style.backgroundColor = '#c3acb1';
//         isGridNull = true;
//       }
//       //  To check if atleast one primary contact details is present
//       if (contact_type === 'Primary') {
//         primeCount = primeCount + 1;
//       }

//       if (contactVisibility === true) {
//         document.getElementById(rowID).style.backgroundColor = '#c3acb1';
//         contactVisibilityFlag = true;
//         return;
//       }
//       const rowObject = {
//         'contact_type': contact_type,
//         'contact_name': contact_name,
//         'email_id': email_id,
//         'mobile_number': mobile_number
//       };
//       classref.inputGridObject.push(rowObject); //Pushing the contact details, data in an object
//     });
//     const tr2 = $('#contactTable').find('tr');
//     const emailArray: string[] = [];
//     // Pushing all the email id's, in an array
//     tr2.each(function (e) {
//       emailArray.push($(trs[e]).find('.contactemail').val());
//     });
//     //  Checking for duplicate email Id's are present
//     for (let i = 0; i < emailArray.length; i++) {
//       for (let j = 1; j < emailArray.length; j++) {
//         if (i !== j) {
//           if (emailArray[i] === emailArray[j]) {
//             JSAlert.alert('Contact email id "' + emailArray[i] + '" is repeated');
//             return;
//           }
//         }
//       }
//     }

//     if (primeCount < 1) {
//       JSAlert.alert('Please select atleast one Contact as Primary');
//       return;
//     }
//     if (primeCount > 1) {
//       JSAlert.alert('Please select only one Contact as Primary');
//       return;
//     }
//     const trs2 = $('#contractTable').find('tr');
//     const adminName = this.name;
//     trs2.each((el) => {
//       const rowId = (trs2[el].id);
//       const visible = $(trs2[el]).find('h6');
//       const contract_reference = $(trs2[el]).find('.contractreference').val();
//       const contract_description = $(trs2[el]).find('.contractdesc').val();
//       const contract_date = $(trs2[el]).find('.contractdate').val();
//       const max_allowed_logins = $(trs2[el]).find('.session').val();
//       // const download_limit = $(trs2[el]).find('.downloadlimit').val();
//       // const export_flag = $(trs2[el]).find('.exportvalue').val();
//       const general_alert_flag = $(trs2[el]).find('.alertvalue').val();
//       const valid_start_date = $(trs2[el]).find('.startdate').val();
//       const valid_to_date = $(trs2[el]).find('.enddate').val();
//       let generalAlertBoolean: Boolean;
//       // exportBoolean = classref.yesNoToBoolean(export_flag);
//       generalAlertBoolean = classref.yesNoToBoolean(general_alert_flag);
//       contractVisibility = visible.is(':visible');
//       if (contractVisibility === true) {
//         document.getElementById(rowId).style.backgroundColor = '#c3acb1';
//         contractVisibilityFlag = true;
//         return;
//       }
//       if (contract_reference === '' || contract_description === '' || contract_date === '' || valid_start_date === '' ||
//         valid_to_date === '' || max_allowed_logins === '' ) {
//         document.getElementById(rowId).style.backgroundColor = '#c3acb1';
//         isGrid2Null = true;
//         return;
//       }
//       const row2Object = {
//         'contract_reference': contract_reference,
//         'contract_description': contract_description,
//         'contract_date': new Date(contract_date).toISOString(),
//         'valid_start_date': new Date(valid_start_date).toISOString(),
//         'valid_to_date': new Date(valid_to_date).toISOString(),
//         'max_allowed_logins': max_allowed_logins,
//         // 'export_flag': exportBoolean,
//         'general_alert_flag': generalAlertBoolean,
//         // 'download_limit': download_limit,
//         'created_date': this.dateTime,
//         'last_updated_date': this.dateTime,
//         'last_updated_by': adminName
//       };

//       classref.inputGridObject2.push(row2Object); //Pushing the contract details, data in an object
//       const rowLength = classref.inputGridObject2.length;
//     });
//     const tr = $('#contractTable').find('tr');
//     const testArray: string[] = [];
//     tr.each(function (e) {
//       testArray.push($(trs2[e]).find('.contractreference').val());
//     });
//     // Checking for duplicate contract reference number are present
//     for (let i = 0; i < testArray.length; i++) {
//       for (let j = 1; j < testArray.length; j++) {
//         if (i !== j) {
//           if (testArray[i] === testArray[j]) {
//             JSAlert.alert('Contract Reference number ' + testArray[i] + ' is repeated');
//             this.flag = 1;
//             return;
//           }
//         }
//       }
//     }
//     if (this.flag === 0) {
//       const arrayOfContractReference: string[] = [];
//       for (let i = 0; i < this.inputGridObject2.length; i++) {
//         arrayOfContractReference.push(this.inputGridObject2[i].contract_reference);
//       }
//       const desc: any = document.getElementById('comdesc');
//       const addr: any = document.getElementById('comaddress');
//       const panNumber: any = document.getElementById('panNum');
//       const zip: any = document.getElementById('zipCodes');
//       const gstNumber: any = document.getElementById('gstNumber');
//       const object = {
//         companyname: this.companyName,
//         gst_num: gstNumber.value,
//         panNum: panNumber.value,
//         companydesc: desc.value,
//         companyaddress: addr.value,
//         countries: this.country,
//         states: this.state,
//         cities: this.city,
//         zipcode: zip.value,
//         contactdetails: this.inputGridObject,
//         contractdetails: arrayOfContractReference,
//         createdate: this.dateTime,
//         updateddate: this.dateTime,
//         lastUpdatedValue: this.name,
//         email_flag: this.emailFlag,
//         from_Email: this.FromEmail,
//       };

//       const company_type: any = document.getElementById('cmpnytype');
//       const gstNum:any = document.getElementById('gstNumber');
//       const countrynames: any = document.getElementById('countryDatas');
//       const countryValue = countrynames.options[countrynames.selectedIndex].value;
//       const statenames: any = document.getElementById('stateId');
//       const stateValue = statenames.options[statenames.selectedIndex].value;
//       const citynames: any = document.getElementById('citynames');
//       const cityValue = citynames.options[citynames.selectedIndex].value;
//       const comName: any = document.getElementById('companyname');
//       const panNum : any = document.getElementById('panNum');
//       const compaddr: any = document.getElementById('comaddress');
//       const compdesc: any = document.getElementById('comdesc');
//       const zipCd: any = document.getElementById('zipCodes');
//       if (comName.value === '') {
//         textValuesNull = true;
//       }
//       if ( countryValue === '--Select--' || countryValue === '' ||
//         isGridNull || isGrid2Null || textValuesNull || contactVisibilityFlag || contractVisibilityFlag) {
//         JSAlert.alert('Please fill the mandatory fields');
//         return;
//       } else {
//         // DB call to submit the company details in company collection
//         this.service.addvalue(object);
//         for (const i of this.inputGridObject2) {
//           // DB call to submit the contract details in contract collection
//           this.service.addContract(i);
//         }
//         JSAlert.alert('Company Registered successfully');
//         this.routes.navigate(['/loader']);
//       }
//     } else if (this.flag === 1) {
//       this.flag = 0;
//     }
//   }

//   // Method to add the new row in contract grid
//   onaddcontract(index?: any) {
//     const table = document.getElementById('contractTable');
//     const trs = table.getElementsByTagName('tr');
//     const contractrowscounting = trs.length;
//     this.numberOfRows.push(contractrowscounting);
//     // Get the onload param values
//     this.onloadparam(this.numberOfRows.length - 1);
//     const ind = index.target.id.match(/\d+/);
//     const addbutton2 = document.getElementById('plusicon' + ind);
//     addbutton2.style.pointerEvents = 'none';
//     addbutton2.style.cursor = 'default';
//     addbutton2.style.opacity = '0.3';
//   }
// }
