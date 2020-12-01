// Feature: To update Company Details, Except Company Name other fields can be updated

import { Component, OnInit } from '@angular/core';
import { setTimeout } from 'timers';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { format } from 'date-fns';
import { getAllCountries, getStatesOfCountry, getCitiesOfState, getCountryById, getStateById, getCityById } from 'country-state-city'; //country-state-city dropdown
import { AdminLoginServiceService } from '../../common-services/admin-service.service';
const JSAlert = require('js-alert');
declare var $: any;
declare var slider: any;
declare var datepicker: any;

@Component({  
  selector: 'app-admin-company-updation',
  templateUrl: './admincompany-updation.component.html',
  styleUrls: ['./admincompany-updation.component.css','../../../assets/css/admin.css',
  '../../../assets/css/bootstrap.min.css']
})
export class AdminCompanyUpdationComponent implements OnInit {
  // Variable declaration
  public companyName: string;
  public department: string;
  public companyDesc: string;
  public state: string;
  public city: string;
  public zipCode: number;
  public CompanyNames: string;
  public CompanyType: string;
  public PanNumber: string;
  public GstNumber: string;
  public CompanyDesc: string;
  public AddressLine: string;
  public PinCode: number;
  company: {};
  cityName: any;
  Data: any;
  public companyname: string;
  companyName1: any;
  public contactType: string;
  public secondary: string;
  public contactName: string;
  public contactEmail: string;
  public contactMobile: string;
  public contract_reference: string;
  public contractDesc: string;
  public userName = sessionStorage.getItem('UserID');
  public currentdate: any;
  public contractSession: number;
  public contractDownload: number;
  public contractExport: string;
  public contractAlert: string;
  public rows = false;
  public registering = false;
  public updating = false;
  path: any;
  alertDrop: string;
  exportDrop: string;
  public showrow = false;
  public grid1Row = false;
  noOfRows = [0];
  Rows: any[];
  contactRows = [0];
  Rowsupdatefirst: number[] = [1];
  numberOfRows = [0];
  Rowsupdatesecond: number[] = [1];
  Rowsupdatethird: number[] = [];
  Rowsupdatefourth: number[] = [];
  inputGridObjectUpdate: any[] = [];
  inputGrid2: any[] = [];
  arrayOfUpdate: any[] = [];
  public contact = true;
  updateCompany = false;
  uploadParam: object[];
  public array = [];
  arrayOfContract = [];
  public inputGrid: any[] = [];
  public contactname: string;
  public contactemail: string;
  public contactType1: string;
  public contactType2: string;
  rowCountarr: any;
  formdata;
  flag = 0;
  crtRefDisabled: boolean;
  emailFlags: boolean;
  from_email: any;
  public dateTime = format(new Date(), 'MM/DD/YYYY');
  selectedCompanyName: any;
  CountryList: string[];
  StateList: string[];
  CityList: string[];
  company_List: string[];
  companyobject: any;
  arrayOfCompany: string[];

  constructor(private routes: Router, public service: AdminLoginServiceService) { }

  ngOnInit() {
    // Method call to get the company names
    this.getCompanyNames();
    const radioprimary = document.getElementsByClassName('contacttype');
    this.CountryList = getAllCountries();
    this.StateList = getStatesOfCountry();
    this.CityList = getCitiesOfState();

    // Set the default dropdown value
    this.crtRefDisabled = true;
    $('#updateContract').datepicker({
      changeMonth: true,
      changeYear: true,
      // maxDate: this.maxDate,
      onSelect: function (selected) {
        const dt = new Date(selected);
        dt.setDate(dt.getDate());
        $('#updateStartDate').datepicker('option', 'minDate', dt);
      }
    });
    $('#updateStartDate').datepicker({
      changeMonth: true,
      changeYear: true,
      // maxDate: this.maxDate,
      onSelect: function (selected) {
        const dt = new Date(selected);
        dt.setDate(dt.getDate());
        $('#updateContract').datepicker('option', 'maxDate', dt);
        $('#updateEndDate').datepicker('option', 'minDate', dt);
      }
    });
    $('#updateEndDate').datepicker({
      changeMonth: true,
      changeYear: true,
      // maxDate: this.maxDate,
      onSelect: function (selected) {
        const dt = new Date(selected);
        dt.setDate(dt.getDate());
        $('#updateStartDate').datepicker('option', 'maxDate', dt);
      }
    });
    // DB call to get the emailflags from param collection
    this.service.paramEmailFlag().subscribe(res => {
      this.emailFlags = res[1].param_value;
      this.from_email = res[0].param_value;
    });
  }
  // Method to get the default values from param collection
  onLoadUpdateParam(increment: any) {
    this.service.companyParamValue().subscribe(res => {
      this.uploadParam = res;
      for (let i = 0; i < this.uploadParam.length; i++) {
        const download_Limit: any = document.getElementById('downloadLimit' + increment);
        const no_of_session: any = document.getElementById('session' + increment);
        // if (this.uploadParam[i]['param_name'] === 'download_limit') {
        //   download_Limit.value = this.uploadParam[i]['param_value'];
        // }
        if (this.uploadParam[i]['param_name'] === 'No_of_session') {
          no_of_session.value = this.uploadParam[i]['param_value'];
        }
        // if (this.uploadParam[i]['param_name'] === 'export_flag') {
        //   if (this.uploadParam[i]['param_value'] === false) {
        //     $('#dropdown1' + increment).prop('selectedIndex', 1);
        //   } else {
        //     $('#dropdown1' + increment).prop('selectedIndex', 0);
        //   }
        // }
        if (this.uploadParam[i]['param_name'] === 'general_alert_flag') {
          if (this.uploadParam[i]['param_value'] === false) {
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
    const ind = event.target.id.match(/\d+/);
    $('#updateContract' + ind).datepicker({
      changeMonth: true,
      changeYear: true,
      onSelect: function (selected) {
        const dt = new Date(selected);
        dt.setDate(dt.getDate());
        $('#updateStartDate' + ind).datepicker('option', 'minDate', dt);
      }
    });
    $('#updateStartDate' + ind).datepicker({
      changeMonth: true,
      changeYear: true,
      onSelect: function (selected) {
        const dt = new Date(selected);
        dt.setDate(dt.getDate());
        $('#updateContract' + ind).datepicker('option', 'maxDate', dt);
        $('#updateEndDate' + ind).datepicker('option', 'minDate', dt);
      }
    });
    $('#updateEndDate' + ind).datepicker({
      changeMonth: true,
      changeYear: true,
      onSelect: function (selected) {
        const dt = new Date(selected);
        dt.setDate(dt.getDate());
        $('#updateStartDate' + ind).datepicker('option', 'maxDate', dt);
      }
    });
    const id = $(event.target).closest('input')[0].id;
    $('#' + id).datepicker().datepicker('show');
  }

  // To remove/delete the row in contract grid
  onDeleteContactUpdate(index) {
    const classref = this;
    const table = document.getElementById('updateContactTable');
    const trs = table.getElementsByTagName('tr');
    const deleteupdaterowscount = trs.length;
    if (deleteupdaterowscount <= 1) {
      this.contactRows = [0];
      return;
    }
    const rowDifference: boolean = (this.contactRows.length < deleteupdaterowscount) as boolean;
    if (rowDifference) {
      $(index.target).parent().parent().remove();
    } else {
      let arrayInd = $("#" + $(index.target).parent().parent().attr("id")).index();
      this.contactRows.splice(parseInt(arrayInd), 1);
    }
    setTimeout(function () {
      classref.enableAddContact();    // For enabling add icon
    }, 5);
  }
  // Event is passed on addicon click, it creates a new row and addicon will be disabled (contact grid)
  onAddContactUpdate(index?: any) {
    const table = document.getElementById('updateContactTable');
    const trs = table.getElementsByTagName('tr');
    const contactupdaterowscounting = trs.length;
    this.contactRows.push(contactupdaterowscounting);
    const ind = index.target.id.match(/\d+/);
    const addbtn = document.getElementById('plusiconContact' + ind);
    addbtn.style.pointerEvents = 'none';
    addbtn.style.cursor = 'default';
    addbtn.style.opacity = '0.3';
  }
  // Event is passed on addicon click, it creates a new row and addicon will be disabled (contract grid)
  onAddContractUpdate(index?: any) {
    const table = document.getElementById('updateTable2');
    const trs = table.getElementsByTagName('tr');
    const contractupdaterowscounting = trs.length;
    this.Rows.push('test');
    // Method call for getting the default values
    this.onLoadUpdateParam(this.Rows.length - 1);
    const ind = index.target.id.match(/\d+/);
    if (ind >= 0) {
      this.crtRefDisabled = false;
    }
    const addbtn = document.getElementById('plusicon' + ind);
    addbtn.style.pointerEvents = 'none';
    addbtn.style.cursor = 'default';
    addbtn.style.opacity = '0.3';
  }

  //Method to get the country name in the dropdown
  onCountrySelect(Selectelement: any) {
    const listed = getStatesOfCountry(Selectelement.value);
    $('#stateID').empty();
    let item = '<option value=--Select-->--Select--</option>';
    $.each(listed, function (key, value) {
      item += '<option value=' + value.id + '>' + value.name + '</option>';
    });
    $('#stateID').append(item);
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
    $('#stateID').append(item);
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
  //  Method to check entered data is number
  isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 47 || charCode > 57)) {
      return false;
    }
    return true;
  }
  //Onchange event, to check the contract reference already exist or not in contract grid
  contractRefUpdateExists(data: any) {
    const index = data.target.id.match(/\d+/);
    const contractRef = $('#contractRef' + index).val();
    const addbutton2 = document.getElementById('plusicon' + index);
    this.service.contractReferenceUpdateExists(contractRef).subscribe(res => {
      if (res === 3) {
        document.getElementById('crtreftext' + index).style.display = 'block';
        $('#crtreftext' + index).text('Contract Already Exists!!!');
        addbutton2.style.pointerEvents = 'none';
        addbutton2.style.cursor = 'default';
        addbutton2.style.opacity = '0.3';
      } else if (res === 2) {
        document.getElementById('crtreftext' + index).style.display = 'none';
      }
    });
  }
  // Onkey event for textbox validation (contact grid)
  onKeyUpdate(selectdata: any) {
    const index = selectdata.target.id.match(/\d+/);
    const contactName = $('#ctName' + index).val();
    const contactEmail = $('#ctEmail' + index).val();
    //const contactNumber = $('#ctNumber' + index).val();
    const rowCount = $('#updateContactTable tr').length;
    const rowConts = ((rowCount - index) === 1);
    const addbutton = document.getElementById('plusiconContact' + index);
    if (selectdata.target.id.substring(0, 6) === 'ctName') 
    {
       if(contactName!=='')
       {
              addbutton.style.pointerEvents = 'auto';
              addbutton.style.cursor = 'pointer';
              addbutton.style.opacity = '1';
              document.getElementById('ctNameText' + index).style.display = 'none';
       }
       else if(contactName==='')
           {
              document.getElementById('ctNameText' + index).style.display = 'block';
              $('#ctNameText' + index).text('Please fill the field');
          }
      else if (contactName.length < 100) 
      {
        document.getElementById('ctNameText' + index).style.display = 'none';
        if (contactName !== '' && contactEmail !== '') 
        {
          if (contactEmail.match(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/))
           {
           document.getElementById('ctemailtext' + index).style.display = 'none';
           if (contactName !== '' && contactEmail !== '') 
           {
             addbutton.style.pointerEvents = 'auto';
             addbutton.style.cursor = 'pointer';
             addbutton.style.opacity = '1';
           }
         }
       }
      }
       else 
       {
        document.getElementById('ctNameText' + index).style.display = 'block';
        $('#ctNameText' + index).text('You Reached max character.');
      }
    }
    if (selectdata.target.id.substring(0, 7) === 'ctEmail')
     {
      if (contactEmail === '') 
      {
        document.getElementById('ctEmaiText' + index).style.display = 'block';
        $('#ctEmaiText' + index).text('Please fill the field');
      } 
      else if (contactEmail.match(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)) 
      {
        document.getElementById('ctEmaiText' + index).style.display = 'none';
        if (contactName !== '' && contactEmail !== '') {
          addbutton.style.pointerEvents = 'auto';
          addbutton.style.cursor = 'pointer';
          addbutton.style.opacity = '1';
        }
      } 
      else 
      {
        document.getElementById('ctEmaiText' + index).style.display = 'block';
        $('#ctEmaiText' + index).text('Enter valid email-id.');
        addbutton.style.pointerEvents = 'none';
        addbutton.style.cursor = 'default';
        addbutton.style.opacity = '0.3';
      }
    }
    if (contactName === '' || contactEmail === '')
     {
      addbutton.style.pointerEvents = 'none';
      addbutton.style.cursor = 'default';
      addbutton.style.opacity = '0.3';
    }
    if (contactName === '' && contactEmail === '')
     {
      addbutton.style.pointerEvents = 'none';
      addbutton.style.cursor = 'default';
      addbutton.style.opacity = '0.3';
    }    
    if (rowConts === false) 
    {
      addbutton.style.pointerEvents = 'none';
      addbutton.style.cursor = 'default';
      addbutton.style.opacity = '0.3';
    }
  }

  getCompanyDetailsReset() {
    this.routes.navigate(['/loader']);
  }

  // Method to get the data from DB, for selected Company
  getCompanyDetails() {
    // Checks the company is selected (null or undefined)
    if (isNullOrUndefined(this.companyName)) {
      JSAlert.alert('Company Name is not selected');
      return;
    }

    let contractDocs: any[];
    this.updateCompany = true;
    this.service.fetchvalue(this.companyName).subscribe(res => {
      const companyType: any = document.getElementsByClassName('companytype')[0];
      const countryname: any = document.getElementsByClassName('Countryname')[0];
      for (const r of res) {
        this.CompanyNames = r.CompanyName;
        this.GstNumber = r.GstNumber;
        this.PanNumber = r.PanNumber;
        this.CompanyDesc = r.CompanyDescription;
        this.AddressLine = r.Address.AddressLine1;
        this.setSelectedValue(countryname, r.Address.Country);
        this.onCountrySelected(countryname.value);
        const stateName: any = document.getElementsByClassName('Statename')[0];
        this.setSelectedValue(stateName, r.Address.State);
        const vall = $('#stateID').find('option:selected').val();
        this.onStateItemSelected(vall);
        const cityname: any = document.getElementsByClassName('Cityname')[0];
        this.setSelectedValue(cityname, r.Address.City);
        this.PinCode = r.Address.Pincode;
        this.contactRows = [];
        this.contactRows.push(...(r.Contact_details));
        contractDocs = r.docs2;
        this.Rows = [];
        const StartDate: any = document.getElementsByClassName('startdate');
        const contractDate: any = document.getElementsByClassName('contractdate');
        const EndDate: any = document.getElementsByClassName('enddate');
        for (const crt of r.docs2) {
          $('.contractdateregister').datepicker('setDate', (new Date(contractDate.value)));
          const expvalue: any = document.getElementsByClassName('exportvalue');
          const alertValue: any = document.getElementsByClassName('alertvalue');
          (crt.export_flag) ? crt.export_flag = 'Yes' : crt.export_flag = 'No';
          (crt.general_alert_flag) ? crt.general_alert_flag = 'Yes' : crt.general_alert_flag = 'No';
        }
        this.Rows.push(...(r.docs2));
        this.rowCountarr = this.Rows.length;
        setTimeout(function () {
          let radio_increment = 0;
          for (const ct of r.Contact_details) {
            if (ct.contact_type === 'Primary') {
              $('#radio1' + radio_increment).attr('checked', true);
            } else {
              $('#radio2' + radio_increment).attr('checked', true);
            }
            radio_increment++;
          }
        }, 100);
        this.Rows = [];
        this.Rows.push(...(r.docs2));
      }
      this.arrayOfCompany = res;
      let classref = this;
      setTimeout(function () {
        classref.enableAddContract();
        classref.enableAddContact();
      }, 25);
    });
  }

  enableAddContact() 
  {
    const trow = $('#updateContactTable').find('tr');
    const tr_length = trow.length;
    const addbtn = document.getElementById('plusiconContact' + (tr_length - 1));
    const mylengt =$("#ctName"+(tr_length - 1)).val().length;
    const mylengtH =$("#ctEmail"+(tr_length - 1)).val().length;
    const contactEmail = $('#ctEmail' + (tr_length-1)).val();
    addbtn.style.pointerEvents = 'auto';
    addbtn.style.cursor = 'pointer';
    addbtn.style.opacity = '1';
    if(mylengt>=1 && mylengtH>=1 && contactEmail.match(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/))
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
  }
  // Enable addicon for last row (contract grid)
  enableAddContract() {
    const trow = $('#updateTable2').find('tr');
    const tr_length = trow.length;
    const addbtn = document.getElementById('plusicon' + (tr_length - 1));
    addbtn.style.pointerEvents = 'auto';
    addbtn.style.cursor = 'pointer';
    addbtn.style.opacity = '1';
  }
  // Enable addicon for last row (contact grid)
  // enableAddContact() {
  //   const trow = $('#updateContactTable').find('tr');
  //   const tr_length = trow.length;
  //   const addbtn = document.getElementById('plusiconContact' + (tr_length - 1));
  //   addbtn.style.pointerEvents = 'auto';
  //   addbtn.style.cursor = 'pointer';
  //   addbtn.style.opacity = '1';
  // }
  setSelectedValue(selectObj, valueToSet) {
    for (let i = 0; i < selectObj.options.length; i++) {
      if (selectObj.options[i].text === valueToSet) {
        selectObj.options[i].selected = true;
        return;
      }
    }
  }

  // 'Yes' or 'No' to Boolean
  yesNoToBoolean(yesNo: string): boolean {
    if (yesNo === 'Yes') {
      return true;
    } else {
      return false;
    }
  }
  //  Method to submit the data in the DB
  updateCompanyData() {
    let contractObject: object = {};
    this.inputGrid = [];
    this.inputGrid2 = [];
    this.arrayOfUpdate = [];
    let isUpdateGrid1Null = false;
    let isUpdateGrid2Null = false;
    let textValuesNull = false;
    let isDateInvalid = false;
    let updateContactVisible;
    let updateContractVisible;
    let updatecontactVisibilityFlag = false;
    let updatecontractVisibilityFlag = false;
    const classref = this;
    const trs = $('#updateContactTable').find('tr');
    $("tr").css("background-color", "#f3f3f3");
    let primaryCount = 0;
    trs.each(function (el) {
      const rowId = (trs[el].id);
      const visible = $(trs[el]).find('h6');
      const contact_type = $(trs[el]).find('.contacttype:checked').val();
      const contact_name = $(trs[el]).find('.contactName').val();
      const email_id = $(trs[el]).find('.contactemail').val();
      const mobile_number = $(trs[el]).find('.contactmobile').val();
      updateContactVisible = visible.is(':visible');
      if (contact_type === '' || contact_name === '' || email_id === '') {
        document.getElementById(rowId).style.backgroundColor = '#c3acb1';
        isUpdateGrid1Null = true;
      }
      if (contact_type === 'Primary') {
        primaryCount++;
      }
      if (updateContactVisible === true) {
        document.getElementById(rowId).style.backgroundColor = '#c3acb1';
        updatecontactVisibilityFlag = true;
        return;
      }
      const rowObject = {
        'contact_type': contact_type,
        'contact_name': contact_name,
        'email_id': email_id,
        'mobile_number': mobile_number
      };
      classref.inputGrid.push(rowObject);
    });
    if (primaryCount < 1) {
      JSAlert.alert('Please select atleast one Contact as Primary');
      return;
    }
    if (primaryCount > 1) {
      JSAlert.alert('Please select only one Contact as Primary');
      return;
    }
    const trs2 = $('#updateTable2').find('tr');
    const userName = this.userName;
    const email = this.emailFlags;
    const fromEmail = this.from_email;
    const compyName = this.companyName;
    trs2.each(function (el) {
      const rowID = (trs2[el].id);
      const visible = $(trs2[el]).find('h6');
      const contract_reference = $(trs2[el]).find('.contractref').val();
      const contract_description = $(trs2[el]).find('.contractdesc').val();
      const contract_date = $(trs2[el]).find('.contractdate').val();
      const max_allowed_logins = $(trs2[el]).find('.session').val();
      // const download_limit = $(trs2[el]).find('.downloadlimit').val();
      // const export_flag = $(trs2[el]).find('.exportvalue').val();
      const general_alert_flag = $(trs2[el]).find('.alertvalue').val();
      const valid_start_date = $(trs2[el]).find('.startdate').val();
      const valid_to_date = $(trs2[el]).find('.enddate').val();
      const date = format(new Date(), 'MM/DD/YYYY');
      let exportBoolean, generalAlertBoolean: Boolean;
      // exportBoolean = classref.yesNoToBoolean(export_flag);
      generalAlertBoolean = classref.yesNoToBoolean(general_alert_flag);
      updateContractVisible = visible.is(':visible');
      if (updateContractVisible === true) {
        document.getElementById(rowID).style.backgroundColor = '#c3acb1';
        updatecontractVisibilityFlag = true
        return;
      }
      
      if (contract_reference === '' || contract_description === '' || contract_date === '' || valid_start_date === '' ||
      valid_to_date === '' || max_allowed_logins === '' ) {
      document.getElementById(rowID).style.backgroundColor = '#c3acb1';
      isUpdateGrid2Null = true;
     // JSAlert.alert('Please Fill the Details');
      return;
    }
      contractObject = {
        'contract_reference': contract_reference,
        'contract_description': contract_description,
        'contract_date': new Date(contract_date).toISOString(),
        'valid_start_date': new Date(valid_start_date).toISOString(),
        'valid_to_date': new Date(valid_to_date).toISOString(),
        'max_allowed_logins': max_allowed_logins,
        // 'export_flag': exportBoolean,
        'general_alert_flag': generalAlertBoolean,
        // 'download_limit': download_limit,
        'last_updated_date': date,
        'last_updated_by': userName,
        'email_flag': email,
        'from_Email': fromEmail,
        'companyName': compyName
      };
     
    
      classref.inputGrid2.push(contractObject);
      // tslint:disable-next-line:no-shadowed-variable
      const object1 = this.rowObject2;
    });
    const tr = $('#updateTable2').find('tr');
    const testCrtArray: string[] = [];
    tr.each(function (e) {
      testCrtArray.push($(trs2[e]).find('.contractref').val());
    });
    //  Checking for duplicate contract reference are present
    for (let i = 0; i < testCrtArray.length; i++) {
      for (let j = 1; j < testCrtArray.length; j++) {
        if (i !== j) {
          if (testCrtArray[i] === testCrtArray[j]) {
            JSAlert.alert('Contract Reference number ' + testCrtArray[i] + ' is repeated');
            this.flag = 1;
            return;
          }
        }
      }
    }
    const arrayOfContractRef: string[] = [];
    for (let i = 0; i < this.inputGrid2.length; i++) {
      arrayOfContractRef.push(this.inputGrid2[i].contract_reference);
    }
    const desc: any = document.getElementById('comDesc');
    const addr: any = document.getElementById('compaddress');
    const pannumber: any = document.getElementById('panNumber');
    const zip: any = document.getElementById('zipCodes');
    const gstnumber: any = document.getElementById('gstNumber');
    const countryselect: any = document.getElementById('CountryId');
    const countryselected = countryselect.options[countryselect.selectedIndex].text;
    const stateselect: any = document.getElementById('stateID');
    const stateselected = stateselect.options[stateselect.selectedIndex].text;
    const cityselect: any = document.getElementById('CityName');
    const cityselected = cityselect.options[cityselect.selectedIndex].text;
    const object = {
      companyname: this.CompanyNames,
      gstnumber: gstnumber.value,
      panNum: pannumber.value,
      companydesc: desc.value,
      companyaddress: addr.value,
      countries: countryselected,
      states: stateselected,
      cities: cityselected,
      zipcode: zip.value,
      contactdetails: this.inputGrid,
      contractdetails: arrayOfContractRef,
      createdate: this.dateTime,
      updateddate: this.dateTime,
      lastupdatedby: this.userName
    }
    const panNum: any = document.getElementById('panNumber');
    const gstNumber: any = document.getElementById('gstNumber');
    const compaddr: any = document.getElementById('compaddress');
    const compdesc: any = document.getElementById('comDesc');
    const zipCd: any = document.getElementById('zipCodes');
    if (countryselected === '--Select--' || countryselected === '') {
            textValuesNull = true;
          }
      

    // Checking null or defined values 
    if (isUpdateGrid1Null || isUpdateGrid2Null || isDateInvalid || textValuesNull || updatecontactVisibilityFlag || updatecontractVisibilityFlag) {
      JSAlert.alert('Please Fill the Details');
      return;
    }
    this.service.updateCompany(object);  //DB call for updating the company details
    this.inputGrid2.push(object.contactdetails);
    this.service.updateCompanyContract(this.inputGrid2); //DB call for updating the contract details
    JSAlert.alert('Company details updated successfully');
    this.routes.navigate(['/loader']);
  }

  // Method to add new row (contract grid)
  onaddcontract(ref: any) {
    const table = document.getElementById('contractTable');
    const trs = table.getElementsByTagName('tr');
    const contractrowscounting = trs.length;
    this.numberOfRows.push(contractrowscounting);
  }
  // Triggered on company selection
  onCompanyListselect(select: any) {
    this.companyName = select.text;
  }
  // Function for getting the company names from DB
  getCompanyNames() {
    this.service.getCompanyNames().subscribe(res => {
      this.companyobject = res;
      const arrayOfString: string[] = [];
      for (let i = 0; i < this.companyobject.length; i++) {
        arrayOfString.push(this.companyobject[i].CompanyName);
      }
      this.company_List = arrayOfString.sort();
    });
  }
  // Onkey event for textbox validation (contract grid)
  onValue(selectdata: any) {
    const index = selectdata.target.id.match(/\d+/);
    const contractRef = $('#contractRef' + index).val();
    const contractDesc = $('#contractDesc' + index).val();
    const sessionText = $('#session' + index).val();
    // const downloadText = $('#downloadLimit' + index).val();
    const submitBtn = $('#companyInsert');
    const addbutton2 = document.getElementById('plusicon' + index);
    const rowCount = $('#updateTable2 tr').length;
    const rowCont = ((rowCount - index) === 1);
    if (selectdata.target.id.substring(0, 11) === 'contractRef') {
      if (contractRef === '') {
        document.getElementById('crtreftext' + index).style.display = 'block';
        $('#crtreftext' + index).text('Please fill the field');
      } else if (contractRef.length > 20) {
        document.getElementById('crtreftext' + index).style.display = 'block';
        $('#crtreftext' + index).text('You Reached max character.');
      } else {
        document.getElementById('crtreftext' + index).style.display = 'none';
      }
    }
    if (selectdata.target.id.substring(0, 12) === 'contractDesc') {
      if (contractDesc === '') {
        document.getElementById('crtdescText' + index).style.display = 'block';
        $('#crtdescText' + index).text('Please fill the field');
      } else if (contractDesc.length > 200) {
        document.getElementById('crtdescText' + index).style.display = 'block';
        $('#crtdescText' + index).text('You Reached max character.');
      } else {
        document.getElementById('crtdescText' + index).style.display = 'none';
      }
    }
    if (selectdata.target.id.substring(0, 7) === 'session') {
      if (sessionText === '') {
        document.getElementById('crtsessText' + index).style.display = 'block';
        $('#crtsessText' + index).text('Please fill the field');
      } else if (sessionText.length > 3) {
        document.getElementById('crtsessText' + index).style.display = 'block';
        $('#crtsessText' + index).text('You Reached max character.');

      } else if (parseInt(sessionText) === 0) {
        document.getElementById('crtsessText' + index).style.display = 'block';
        $('#crtsessText' + index).text('Enter Valid data');
      } else {
        document.getElementById('crtsessText' + index).style.display = 'none';
      }
    }
    // if (selectdata.target.id.substring(0, 13) === 'downloadLimit') {
    //   if (downloadText === '') {
    //     document.getElementById('crtDownText' + index).style.display = 'block';
    //     $('#crtDownText' + index).text('Please fill the field');
    //   } else if (downloadText.length > 5) {
    //     document.getElementById('crtDownText' + index).style.display = 'block';
    //     $('#crtDownText' + index).text('You Reached max character.');
    //   } else if (parseInt(downloadText) === 0) {
    //     document.getElementById('crtDownText' + index).style.display = 'block';
    //     $('#crtDownText' + index).text('Enter Valid data');
    //   } else {
    //     document.getElementById('crtDownText' + index).style.display = 'none';

    //   }
    // }
    if (contractRef === '' || contractDesc === '' || sessionText === '' ) {
      addbutton2.style.pointerEvents = 'none';
      addbutton2.style.cursor = 'default';
      addbutton2.style.opacity = '0.3';
    } if (contractRef !== '' && contractDesc !== '' && sessionText !== '') {
      addbutton2.style.pointerEvents = 'auto';
      addbutton2.style.cursor = 'pointer';
      addbutton2.style.opacity = '1';
    }
    if (contractRef === '' && contractDesc === '' && sessionText === '' ) {
      addbutton2.style.pointerEvents = 'none';
      addbutton2.style.cursor = 'default';
      addbutton2.style.opacity = '0.3';
    }
    if (rowCont === false) {
      addbutton2.style.pointerEvents = 'none';
      addbutton2.style.cursor = 'default';
      addbutton2.style.opacity = '0.3';
    }
  }
}














// Feature: To update Company Details, Except Company Name other fields can be updated

// import { Component, OnInit } from '@angular/core';
// import { setTimeout } from 'timers';
// import { Router } from '@angular/router';
// import { isNullOrUndefined } from 'util';
// import { format } from 'date-fns';
// import { getAllCountries, getStatesOfCountry, getCitiesOfState, getCountryById, getStateById, getCityById } from 'country-state-city'; //country-state-city dropdown
// import { AdminLoginServiceService } from '../../common-services/admin-service.service';
// const JSAlert = require('js-alert');
// declare var $: any;
// declare var slider: any;
// declare var datepicker: any;

// @Component({
//   selector: 'app-admin-company-updation',
//   templateUrl: './admincompany-updation.component.html',
//   styleUrls: ['./admincompany-updation.component.css']
// })
// export class AdminCompanyUpdationComponent implements OnInit {
//   // Variable declaration
//   public companyName: string;
//   public department: string;
//   public companyDesc: string;
//   public state: string;
//   public city: string;
//   public zipCode: number;
//   public CompanyNames: string;
//   public CompanyType: string;
//   public PanNumber: string;
//   public GstNumber: string;
//   public CompanyDesc: string;
//   public AddressLine: string;
//   public PinCode: number;
//   company: {};
//   cityName: any;
//   Data: any;
//   public companyname: string;
//   companyName1: any;
//   public contactType: string;
//   public secondary: string;
//   public contactName: string;
//   public contactEmail: string;
//   public contactMobile: string;
//   public contract_reference: string;
//   public contractDesc: string;
//   public userName = sessionStorage.getItem('UserID');
//   public currentdate: any;
//   public contractSession: number;
//   public contractDownload: number;
//   public contractExport: string;
//   public contractAlert: string;
//   public rows = false;
//   public registering = false;
//   public updating = false;
//   path: any;
//   alertDrop: string;
//   exportDrop: string;
//   public showrow = false;
//   public grid1Row = false;
//   noOfRows = [0];
//   Rows: any[];
//   contactRows = [0];
//   Rowsupdatefirst: number[] = [1];
//   numberOfRows = [0];
//   Rowsupdatesecond: number[] = [1];
//   Rowsupdatethird: number[] = [];
//   Rowsupdatefourth: number[] = [];
//   inputGridObjectUpdate: any[] = [];
//   inputGrid2: any[] = [];
//   arrayOfUpdate: any[] = [];
//   public contact = true;
//   updateCompany = false;
//   uploadParam: object[];
//   public array = [];
//   arrayOfContract = [];
//   public inputGrid: any[] = [];
//   public contactname: string;
//   public contactemail: string;
//   public contactType1: string;
//   public contactType2: string;
//   rowCountarr: any;
//   formdata;
//   flag = 0;
//   crtRefDisabled: boolean;
//   emailFlags: boolean;
//   from_email: any;
//   public dateTime = format(new Date(), 'MM/DD/YYYY');
//   selectedCompanyName: any;
//   CountryList: string[];
//   StateList: string[];
//   CityList: string[];
//   company_List: string[];
//   companyobject: any;
//   arrayOfCompany: string[];

//   constructor(private routes: Router, public service: AdminLoginServiceService) { }

//   ngOnInit() {
//     // Method call to get the company names
//     this.getCompanyNames();
//     const radioprimary = document.getElementsByClassName('contacttype');
//     this.CountryList = getAllCountries();
//     this.StateList = getStatesOfCountry();
//     this.CityList = getCitiesOfState();

//     // Set the default dropdown value
//     this.crtRefDisabled = true;
//     $('#updateContract').datepicker({
//       changeMonth: true,
//       changeYear: true,
//       // maxDate: this.maxDate,
//       onSelect: function (selected) {
//         const dt = new Date(selected);
//         dt.setDate(dt.getDate());
//         $('#updateStartDate').datepicker('option', 'minDate', dt);
//       }
//     });
//     $('#updateStartDate').datepicker({
//       changeMonth: true,
//       changeYear: true,
//       // maxDate: this.maxDate,
//       onSelect: function (selected) {
//         const dt = new Date(selected);
//         dt.setDate(dt.getDate());
//         $('#updateContract').datepicker('option', 'maxDate', dt);
//         $('#updateEndDate').datepicker('option', 'minDate', dt);
//       }
//     });
//     $('#updateEndDate').datepicker({
//       changeMonth: true,
//       changeYear: true,
//       // maxDate: this.maxDate,
//       onSelect: function (selected) {
//         const dt = new Date(selected);
//         dt.setDate(dt.getDate());
//         $('#updateStartDate').datepicker('option', 'maxDate', dt);
//       }
//     });
//     // DB call to get the emailflags from param collection
//     this.service.paramEmailFlag().subscribe(res => {
//       this.emailFlags = res[1].param_value;
//       this.from_email = res[0].param_value;
//     });
//   }
//   // Method to get the default values from param collection
//   onLoadUpdateParam(increment: any) {
//     this.service.companyParamValue().subscribe(res => {
//       this.uploadParam = res;
//       for (let i = 0; i < this.uploadParam.length; i++) {
//         const download_Limit: any = document.getElementById('downloadLimit' + increment);
//         const no_of_session: any = document.getElementById('session' + increment);
//         // if (this.uploadParam[i]['param_name'] === 'download_limit') {
//         //   download_Limit.value = this.uploadParam[i]['param_value'];
//         // }
//         if (this.uploadParam[i]['param_name'] === 'No_of_session') {
//           no_of_session.value = this.uploadParam[i]['param_value'];
//         }
//         // if (this.uploadParam[i]['param_name'] === 'export_flag') {
//         //   if (this.uploadParam[i]['param_value'] === false) {
//         //     $('#dropdown1' + increment).prop('selectedIndex', 1);
//         //   } else {
//         //     $('#dropdown1' + increment).prop('selectedIndex', 0);
//         //   }
//         // }
//         if (this.uploadParam[i]['param_name'] === 'general_alert_flag') {
//           if (this.uploadParam[i]['param_value'] === false) {
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
//     $('#updateContract' + ind).datepicker({
//       changeMonth: true,
//       changeYear: true,
//       onSelect: function (selected) {
//         const dt = new Date(selected);
//         dt.setDate(dt.getDate());
//         $('#updateStartDate' + ind).datepicker('option', 'minDate', dt);
//       }
//     });
//     $('#updateStartDate' + ind).datepicker({
//       changeMonth: true,
//       changeYear: true,
//       onSelect: function (selected) {
//         const dt = new Date(selected);
//         dt.setDate(dt.getDate());
//         $('#updateContract' + ind).datepicker('option', 'maxDate', dt);
//         $('#updateEndDate' + ind).datepicker('option', 'minDate', dt);
//       }
//     });
//     $('#updateEndDate' + ind).datepicker({
//       changeMonth: true,
//       changeYear: true,
//       onSelect: function (selected) {
//         const dt = new Date(selected);
//         dt.setDate(dt.getDate());
//         $('#updateStartDate' + ind).datepicker('option', 'maxDate', dt);
//       }
//     });
//     const id = $(event.target).closest('input')[0].id;
//     $('#' + id).datepicker().datepicker('show');
//   }

//   // To remove/delete the row in contract grid
//   onDeleteContactUpdate(index) {
//     const classref = this;
//     const table = document.getElementById('updateContactTable');
//     const trs = table.getElementsByTagName('tr');
//     const deleteupdaterowscount = trs.length;
//     if (deleteupdaterowscount <= 1) {
//       this.contactRows = [0];
//       return;
//     }
//     const rowDifference: boolean = (this.contactRows.length < deleteupdaterowscount) as boolean;
//     if (rowDifference) {
//       $(index.target).parent().parent().remove();
//     } else {
//       let arrayInd = $("#" + $(index.target).parent().parent().attr("id")).index();
//       this.contactRows.splice(parseInt(arrayInd), 1);
//     }
//     setTimeout(function () {
//       classref.enableAddContact();    // For enabling add icon
//     }, 5);
//   }
//   // Event is passed on addicon click, it creates a new row and addicon will be disabled (contact grid)
//   onAddContactUpdate(index?: any) {
//     const table = document.getElementById('updateContactTable');
//     const trs = table.getElementsByTagName('tr');
//     const contactupdaterowscounting = trs.length;
//     this.contactRows.push(contactupdaterowscounting);
//     const ind = index.target.id.match(/\d+/);
//     const addbtn = document.getElementById('plusiconContact' + ind);
//     addbtn.style.pointerEvents = 'none';
//     addbtn.style.cursor = 'default';
//     addbtn.style.opacity = '0.3';
//   }
//   // Event is passed on addicon click, it creates a new row and addicon will be disabled (contract grid)
//   onAddContractUpdate(index?: any) {
//     const table = document.getElementById('updateTable2');
//     const trs = table.getElementsByTagName('tr');
//     const contractupdaterowscounting = trs.length;
//     this.Rows.push('test');
//     // Method call for getting the default values
//     this.onLoadUpdateParam(this.Rows.length - 1);
//     const ind = index.target.id.match(/\d+/);
//     if (ind >= 0) {
//       this.crtRefDisabled = false;
//     }
//     const addbtn = document.getElementById('plusicon' + ind);
//     addbtn.style.pointerEvents = 'none';
//     addbtn.style.cursor = 'default';
//     addbtn.style.opacity = '0.3';
//   }

//   //Method to get the country name in the dropdown
//   onCountrySelect(Selectelement: any) {
//     const listed = getStatesOfCountry(Selectelement.value);
//     $('#stateID').empty();
//     let item = '<option value=--Select-->--Select--</option>';
//     $.each(listed, function (key, value) {
//       item += '<option value=' + value.id + '>' + value.name + '</option>';
//     });
//     $('#stateID').append(item);
//     $('#CityName').empty();
//     $('#CityName').append('<option value=--Select-->--Select--</option>');
//   }
//   // Triggered while binding the data to companydropdown on company selection
//   onCountrySelected(Selectelement: any) {
//     const listed = getStatesOfCountry(Selectelement);
//     let item = '';
//     $.each(listed, function (key, value) {
//       item += '<option value=' + value.id + '>' + value.name + '</option>';
//     });
//     $('#stateID').append(item);
//   }
//   // Method to fetch the state name based on country selection
//   onStateItemSelect(Selectelement: any) {
//     const listed = getCitiesOfState(Selectelement.value);
//     $('#CityName').empty();
//     let item = '<option value=--Select-->--Select--</option>';
//     $.each(listed, function (key, value) {
//       item += '<option value=' + value.id + '>' + value.name + '</option>';
//     });
//     $('#CityName').append(item);
//   }
//   // Triggered while binding the data to state dropdown on company selection
//   onStateItemSelected(Selectelement: any) {
//     const listed = getCitiesOfState(Selectelement);
//     let item = '';
//     $.each(listed, function (key, value) {
//       item += '<option value=' + value.id + '>' + value.name + '</option>';
//     });
//     $('#CityName').append(item);

//   }
//   //  Method to fetch the city dropdown on state selection
//   onCityItemSelect(Selectelement: any) {
//     this.city = getCityById(Selectelement.value - 1).name;
//   }
//   //  Method to check entered data is number
//   isNumber(evt) {
//     evt = (evt) ? evt : window.event;
//     var charCode = (evt.which) ? evt.which : evt.keyCode;
//     if (charCode > 31 && (charCode < 47 || charCode > 57)) {
//       return false;
//     }
//     return true;
//   }
//   //Onchange event, to check the contract reference already exist or not in contract grid
//   contractRefUpdateExists(data: any) {
//     const index = data.target.id.match(/\d+/);
//     const contractRef = $('#contractRef' + index).val();
//     const addbutton2 = document.getElementById('plusicon' + index);
//     this.service.contractReferenceUpdateExists(contractRef).subscribe(res => {
//       if (res === 3) {
//         document.getElementById('crtreftext' + index).style.display = 'block';
//         $('#crtreftext' + index).text('Contract Already Exists!!!');
//         addbutton2.style.pointerEvents = 'none';
//         addbutton2.style.cursor = 'default';
//         addbutton2.style.opacity = '0.3';
//       } else if (res === 2) {
//         document.getElementById('crtreftext' + index).style.display = 'none';
//       }
//     });
//   }
//   // Onkey event for textbox validation (contact grid)
//   onKeyUpdate(selectdata: any) {
//     const index = selectdata.target.id.match(/\d+/);
//     const contactName = $('#ctName' + index).val();
//     const contactEmail = $('#ctEmail' + index).val();
//     const contactNumber = $('#ctNumber' + index).val();
//     const rowCount = $('#updateContactTable tr').length;
//     const rowConts = ((rowCount - index) === 1);
//     const addbutton = document.getElementById('plusiconContact' + index);
//     if (selectdata.target.id.substring(0, 6) === 'ctName') {
//       if (contactName === '') {
//         document.getElementById('ctNameText' + index).style.display = 'block';
//         $('#ctNameText' + index).text('Please fill the field');
//       } else if (contactName.length < 100) {
//         document.getElementById('ctNameText' + index).style.display = 'none';
//       } else {
//         document.getElementById('ctNameText' + index).style.display = 'block';
//         $('#ctNameText' + index).text('You Reached max character.');
//       }
//     }
//     if (selectdata.target.id.substring(0, 7) === 'ctEmail') {
//       if (contactEmail === '') {
//         document.getElementById('ctEmaiText' + index).style.display = 'block';
//         $('#ctEmaiText' + index).text('Please fill the field');
//       } else if (contactEmail.match(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)) {
//         document.getElementById('ctEmaiText' + index).style.display = 'none';
//       } else {
//         document.getElementById('ctEmaiText' + index).style.display = 'block';
//         $('#ctEmaiText' + index).text('Enter valid email id.');
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
//     if (contactName === '' && contactEmail === '') {
//       addbutton.style.pointerEvents = 'none';
//       addbutton.style.cursor = 'default';
//       addbutton.style.opacity = '0.3';
//     }
//     if (contactName !== '' && contactEmail !== '') {
//       addbutton.style.pointerEvents = 'auto';
//       addbutton.style.cursor = 'pointer';
//       addbutton.style.opacity = '1';
//     }
//     if (rowConts === false) {
//       addbutton.style.pointerEvents = 'none';
//       addbutton.style.cursor = 'default';
//       addbutton.style.opacity = '0.3';
//     }
//   }

//   // Method to get the data from DB, for selected Company
//   getCompanyDetails() {
//     // Checks the company is selected (null or undefined)
//     if (isNullOrUndefined(this.companyName)) {
//       JSAlert.alert('Company Name is not selected');
//       return;
//     }

//     let contractDocs: any[];
//     this.updateCompany = true;
//     this.service.fetchvalue(this.companyName).subscribe(res => {
//       const companyType: any = document.getElementsByClassName('companytype')[0];
//       const countryname: any = document.getElementsByClassName('Countryname')[0];
//       for (const r of res) {
//         this.CompanyNames = r.CompanyName;
//         this.GstNumber = r.GstNumber;
//         this.PanNumber = r.PanNumber;
//         this.CompanyDesc = r.CompanyDescription;
//         this.AddressLine = r.Address.AddressLine1;
//         this.setSelectedValue(countryname, r.Address.Country);
//         this.onCountrySelected(countryname.value);
//         const stateName: any = document.getElementsByClassName('Statename')[0];
//         this.setSelectedValue(stateName, r.Address.State);
//         const vall = $('#stateID').find('option:selected').val();
//         this.onStateItemSelected(vall);
//         const cityname: any = document.getElementsByClassName('Cityname')[0];
//         this.setSelectedValue(cityname, r.Address.City);
//         this.PinCode = r.Address.Pincode;
//         this.contactRows = [];
//         this.contactRows.push(...(r.Contact_details));
//         contractDocs = r.docs2;
//         this.Rows = [];
//         const StartDate: any = document.getElementsByClassName('startdate');
//         const contractDate: any = document.getElementsByClassName('contractdate');
//         const EndDate: any = document.getElementsByClassName('enddate');
//         for (const crt of r.docs2) {
//           $('.contractdateregister').datepicker('setDate', (new Date(contractDate.value)));
//           const expvalue: any = document.getElementsByClassName('exportvalue');
//           const alertValue: any = document.getElementsByClassName('alertvalue');
//           (crt.export_flag) ? crt.export_flag = 'Yes' : crt.export_flag = 'No';
//           (crt.general_alert_flag) ? crt.general_alert_flag = 'Yes' : crt.general_alert_flag = 'No';
//         }
//         this.Rows.push(...(r.docs2));
//         this.rowCountarr = this.Rows.length;
//         setTimeout(function () {
//           let radio_increment = 0;
//           for (const ct of r.Contact_details) {
//             if (ct.contact_type === 'Primary') {
//               $('#radio1' + radio_increment).attr('checked', true);
//             } else {
//               $('#radio2' + radio_increment).attr('checked', true);
//             }
//             radio_increment++;
//           }
//         }, 100);
//         this.Rows = [];
//         this.Rows.push(...(r.docs2));
//       }
//       this.arrayOfCompany = res;
//       let classref = this;
//       setTimeout(function () {
//         classref.enableAddContract();
//         classref.enableAddContact();
//       }, 25);
//     });
//   }
//   // Enable addicon for last row (contract grid)
//   enableAddContract() {
//     const trow = $('#updateTable2').find('tr');
//     const tr_length = trow.length;
//     const addbtn = document.getElementById('plusicon' + (tr_length - 1));
//     addbtn.style.pointerEvents = 'auto';
//     addbtn.style.cursor = 'pointer';
//     addbtn.style.opacity = '1';
//   }
//   // Enable addicon for last row (contact grid)
//   enableAddContact() {
//     const trow = $('#updateContactTable').find('tr');
//     const tr_length = trow.length;
//     const addbtn = document.getElementById('plusiconContact' + (tr_length - 1));
//     addbtn.style.pointerEvents = 'auto';
//     addbtn.style.cursor = 'pointer';
//     addbtn.style.opacity = '1';
//   }
//   setSelectedValue(selectObj, valueToSet) {
//     for (let i = 0; i < selectObj.options.length; i++) {
//       if (selectObj.options[i].text === valueToSet) {
//         selectObj.options[i].selected = true;
//         return;
//       }
//     }
//   }

//   // 'Yes' or 'No' to Boolean
//   yesNoToBoolean(yesNo: string): boolean {
//     if (yesNo === 'Yes') {
//       return true;
//     } else {
//       return false;
//     }
//   }
//   //  Method to submit the data in the DB
//   updateCompanyData() {
//     let contractObject: object = {};
//     this.inputGrid = [];
//     this.inputGrid2 = [];
//     this.arrayOfUpdate = [];
//     let isUpdateGrid1Null = false;
//     let isUpdateGrid2Null = false;
//     let textValuesNull = false;
//     let isDateInvalid = false;
//     let updateContactVisible;
//     let updateContractVisible;
//     let updatecontactVisibilityFlag = false;
//     let updatecontractVisibilityFlag = false;
//     const classref = this;
//     const trs = $('#updateContactTable').find('tr');
//     $("tr").css("background-color", "#f3f3f3");
//     let primaryCount = 0;
//     trs.each(function (el) {
//       const rowId = (trs[el].id);
//       const visible = $(trs[el]).find('h6');
//       const contact_type = $(trs[el]).find('.contacttype:checked').val();
//       const contact_name = $(trs[el]).find('.contactName').val();
//       const email_id = $(trs[el]).find('.contactemail').val();
//       const mobile_number = $(trs[el]).find('.contactmobile').val();
//       updateContactVisible = visible.is(':visible');
//       if (contact_type === '' || contact_name === '' || email_id === '') {
//         document.getElementById(rowId).style.backgroundColor = '#c3acb1';
//         isUpdateGrid1Null = true;
//       }
//       if (contact_type === 'Primary') {
//         primaryCount++;
//       }
//       if (updateContactVisible === true) {
//         document.getElementById(rowId).style.backgroundColor = '#c3acb1';
//         updatecontactVisibilityFlag = true;
//         return;
//       }
//       const rowObject = {
//         'contact_type': contact_type,
//         'contact_name': contact_name,
//         'email_id': email_id,
//         'mobile_number': mobile_number
//       };
//       classref.inputGrid.push(rowObject);
//     });
//     if (primaryCount < 1) {
//       JSAlert.alert('Please select atleast one Contact as Primary');
//       return;
//     }
//     if (primaryCount > 1) {
//       JSAlert.alert('Please select only one Contact as Primary');
//       return;
//     }
//     const trs2 = $('#updateTable2').find('tr');
//     const userName = this.userName;
//     const email = this.emailFlags;
//     const fromEmail = this.from_email;
//     const compyName = this.companyName;
//     trs2.each(function (el) {
//       const rowID = (trs2[el].id);
//       const visible = $(trs2[el]).find('h6');
//       const contract_reference = $(trs2[el]).find('.contractref').val();
//       const contract_description = $(trs2[el]).find('.contractdesc').val();
//       const contract_date = $(trs2[el]).find('.contractdate').val();
//       const max_allowed_logins = $(trs2[el]).find('.session').val();
//       const download_limit = $(trs2[el]).find('.downloadlimit').val();
//       const export_flag = $(trs2[el]).find('.exportvalue').val();
//       const general_alert_flag = $(trs2[el]).find('.alertvalue').val();
//       const valid_start_date = $(trs2[el]).find('.startdate').val();
//       const valid_to_date = $(trs2[el]).find('.enddate').val();
//       const date = format(new Date(), 'MM/DD/YYYY');
//       let exportBoolean, generalAlertBoolean: Boolean;
//       exportBoolean = classref.yesNoToBoolean(export_flag);
//       generalAlertBoolean = classref.yesNoToBoolean(general_alert_flag);
//       updateContractVisible = visible.is(':visible');
//       if (updateContractVisible === true) {
//         document.getElementById(rowID).style.backgroundColor = '#c3acb1';
//         updatecontractVisibilityFlag = true
//         return;
//       }
//       contractObject = {
//         'contract_reference': contract_reference,
//         'contract_description': contract_description,
//         'contract_date': new Date(contract_date).toISOString(),
//         'valid_start_date': new Date(valid_start_date).toISOString(),
//         'valid_to_date': new Date(valid_to_date).toISOString(),
//         'max_allowed_logins': max_allowed_logins,
//         'export_flag': exportBoolean,
//         'general_alert_flag': generalAlertBoolean,
//         'download_limit': download_limit,
//         'last_updated_date': date,
//         'last_updated_by': userName,
//         'email_flag': email,
//         'from_Email': fromEmail,
//         'companyName': compyName
//       };

//       if (contract_reference === '' || contract_description === '' || contract_date === '' || valid_start_date === '' ||
//         valid_to_date === '' || max_allowed_logins === '' || download_limit === '') {
//         document.getElementById(rowID).style.backgroundColor = '#c3acb1';
//         isUpdateGrid2Null = true;
//         return;
//       }

//       classref.inputGrid2.push(contractObject);
//       // tslint:disable-next-line:no-shadowed-variable
//       const object1 = this.rowObject2;
//     });
//     const tr = $('#updateTable2').find('tr');
//     const testCrtArray: string[] = [];
//     tr.each(function (e) {
//       testCrtArray.push($(trs2[e]).find('.contractref').val());
//     });
//     //  Checking for duplicate contract reference are present
//     for (let i = 0; i < testCrtArray.length; i++) {
//       for (let j = 1; j < testCrtArray.length; j++) {
//         if (i !== j) {
//           if (testCrtArray[i] === testCrtArray[j]) {
//             JSAlert.alert('Contract Reference number ' + testCrtArray[i] + ' is repeated');
//             this.flag = 1;
//             return;
//           }
//         }
//       }
//     }
//     const arrayOfContractRef: string[] = [];
//     for (let i = 0; i < this.inputGrid2.length; i++) {
//       arrayOfContractRef.push(this.inputGrid2[i].contract_reference);
//     }
//     const desc: any = document.getElementById('comDesc');
//     const addr: any = document.getElementById('compaddress');
//     const pannumber: any = document.getElementById('panNumber');
//     const zip: any = document.getElementById('zipCodes');
//     const gstnumber: any = document.getElementById('gstNumber');
//     const countryselect: any = document.getElementById('CountryId');
//     const countryselected = countryselect.options[countryselect.selectedIndex].text;
//     const stateselect: any = document.getElementById('stateID');
//     const stateselected = stateselect.options[stateselect.selectedIndex].text;
//     const cityselect: any = document.getElementById('CityName');
//     const cityselected = cityselect.options[cityselect.selectedIndex].text;
//     const object = {
//       companyname: this.CompanyNames,
//       gstnumber: gstnumber.value,
//       panNum: pannumber.value,
//       companydesc: desc.value,
//       companyaddress: addr.value,
//       countries: countryselected,
//       states: stateselected,
//       cities: cityselected,
//       zipcode: zip.value,
//       contactdetails: this.inputGrid,
//       contractdetails: arrayOfContractRef,
//       createdate: this.dateTime,
//       updateddate: this.dateTime,
//       lastupdatedby: this.userName
//     }
//     const panNum: any = document.getElementById('panNumber');
//     const gstNumber: any = document.getElementById('gstNumber');
//     const compaddr: any = document.getElementById('compaddress');
//     const compdesc: any = document.getElementById('comDesc');
//     const zipCd: any = document.getElementById('zipCodes');
//     if (countryselected === '--Select--' || countryselected === '') {
//       textValuesNull = true;
//     }

//     // Checking null or defined values 
//     if (isUpdateGrid1Null || isUpdateGrid2Null || isDateInvalid || textValuesNull || updatecontactVisibilityFlag || updatecontractVisibilityFlag) {
//       JSAlert.alert('Please fill the mandatory fields');
//       return;
//     }
//     this.service.updateCompany(object);  //DB call for updating the company details
//     this.inputGrid2.push(object.contactdetails);
//     this.service.updateCompanyContract(this.inputGrid2); //DB call for updating the contract details
//     JSAlert.alert('Company details updated successfully');
//     this.routes.navigate(['/loader']);
//   }

//   // Method to add new row (contract grid)
//   onaddcontract(ref: any) {
//     const table = document.getElementById('contractTable');
//     const trs = table.getElementsByTagName('tr');
//     const contractrowscounting = trs.length;
//     this.numberOfRows.push(contractrowscounting);
//   }
//   // Triggered on company selection
//   onCompanyListselect(select: any) {
//     this.companyName = select.text;
//   }
//   // Function for getting the company names from DB
//   getCompanyNames() {
//     this.service.getCompanyNames().subscribe(res => {
//       this.companyobject = res;
//       const arrayOfString: string[] = [];
//       for (let i = 0; i < this.companyobject.length; i++) {
//         arrayOfString.push(this.companyobject[i].CompanyName);
//       }
//       this.company_List = arrayOfString.sort();
//     });
//   }
//   // Onkey event for textbox validation (contract grid)
//   onValue(selectdata: any) {
//     const index = selectdata.target.id.match(/\d+/);
//     const contractRef = $('#contractRef' + index).val();
//     const contractDesc = $('#contractDesc' + index).val();
//     const sessionText = $('#session' + index).val();
//     // const downloadText = $('#downloadLimit' + index).val();
//     const submitBtn = $('#companyInsert');
//     const addbutton2 = document.getElementById('plusicon' + index);
//     const rowCount = $('#updateTable2 tr').length;
//     const rowCont = ((rowCount - index) === 1);
//     if (selectdata.target.id.substring(0, 11) === 'contractRef') {
//       if (contractRef === '') {
//         document.getElementById('crtreftext' + index).style.display = 'block';
//         $('#crtreftext' + index).text('Please fill the field');
//       } else if (contractRef.length > 20) {
//         document.getElementById('crtreftext' + index).style.display = 'block';
//         $('#crtreftext' + index).text('You Reached max character.');
//       } else {
//         document.getElementById('crtreftext' + index).style.display = 'none';
//       }
//     }
//     if (selectdata.target.id.substring(0, 12) === 'contractDesc') {
//       if (contractDesc === '') {
//         document.getElementById('crtdescText' + index).style.display = 'block';
//         $('#crtdescText' + index).text('Please fill the field');
//       } else if (contractDesc.length > 200) {
//         document.getElementById('crtdescText' + index).style.display = 'block';
//         $('#crtdescText' + index).text('You Reached max character.');
//       } else {
//         document.getElementById('crtdescText' + index).style.display = 'none';
//       }
//     }
//     if (selectdata.target.id.substring(0, 7) === 'session') {
//       if (sessionText === '') {
//         document.getElementById('crtsessText' + index).style.display = 'block';
//         $('#crtsessText' + index).text('Please fill the field');
//       } else if (sessionText.length > 3) {
//         document.getElementById('crtsessText' + index).style.display = 'block';
//         $('#crtsessText' + index).text('You Reached max character.');

//       } else if (parseInt(sessionText) === 0) {
//         document.getElementById('crtsessText' + index).style.display = 'block';
//         $('#crtsessText' + index).text('Enter Valid data');
//       } else {
//         document.getElementById('crtsessText' + index).style.display = 'none';
//       }
//     }
//     // if (selectdata.target.id.substring(0, 13) === 'downloadLimit') {
//     //   if (downloadText === '') {
//     //     document.getElementById('crtDownText' + index).style.display = 'block';
//     //     $('#crtDownText' + index).text('Please fill the field');
//     //   } else if (downloadText.length > 5) {
//     //     document.getElementById('crtDownText' + index).style.display = 'block';
//     //     $('#crtDownText' + index).text('You Reached max character.');
//     //   } else if (parseInt(downloadText) === 0) {
//     //     document.getElementById('crtDownText' + index).style.display = 'block';
//     //     $('#crtDownText' + index).text('Enter Valid data');
//     //   } else {
//     //     document.getElementById('crtDownText' + index).style.display = 'none';

//     //   }
//     // }
//     if (contractRef === '' || contractDesc === '' || sessionText === '' ) {
//       addbutton2.style.pointerEvents = 'none';
//       addbutton2.style.cursor = 'default';
//       addbutton2.style.opacity = '0.3';
//     } if (contractRef !== '' && contractDesc !== '' && sessionText !== '') {
//       addbutton2.style.pointerEvents = 'auto';
//       addbutton2.style.cursor = 'pointer';
//       addbutton2.style.opacity = '1';
//     }
//     if (contractRef === '' && contractDesc === '' && sessionText === '' ) {
//       addbutton2.style.pointerEvents = 'none';
//       addbutton2.style.cursor = 'default';
//       addbutton2.style.opacity = '0.3';
//     }
//     if (rowCont === false) {
//       addbutton2.style.pointerEvents = 'none';
//       addbutton2.style.cursor = 'default';
//       addbutton2.style.opacity = '0.3';
//     }
//   }
// }
