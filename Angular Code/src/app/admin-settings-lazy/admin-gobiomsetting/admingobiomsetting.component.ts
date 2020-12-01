// Feature: It contains all the param name & value, we can insert or update param value which is displayed in grid

import { Component, OnInit } from '@angular/core';
import { AdminLoginServiceService } from '../../common-services/admin-service.service';
import { Http, HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { isNullOrUndefinedorEmptyString } from '../../../../utils/admin_isNullorUndefinedorEmptyString';
import { ClassField } from '@angular/compiler/src/output/output_ast';
import { generate } from 'rxjs/observable/generate';
import { stringify } from 'querystring';
import { element } from 'protractor';

const JSAlert = require('js-alert');
declare var $: any;

@Component({
  selector: 'app-admingobiomsetting',
  templateUrl: './admingobiomsetting.component.html',
  styleUrls: ['./admingobiomsetting.component.css','../../../assets/css/admin.css',
  '../../../assets/css/bootstrap.min.css']
})
export class AdminGobiomsettingComponent implements OnInit {
 
  public addrows = false;
  paramRows = [0];
  rowValue = 0;
  arrayOfObj: any[] = [];
  mainCheckbox = false;
  inputObject: any[] = [];
  onLoadDisableParam = true;
  public paramIDArray = [];
  public paramObjectArray = [];
  TempParamObj = [];
  totalRec: number;
  page: number = 1;
  itemsPerpage;
  // pagenumcount : any = 1;
  IntialCount = 10;
  pageNumcount: number = 1;
  constructor(private routes: Router, private http: Http, public service: AdminLoginServiceService) { }
  Rows = [0];
  ngOnInit() {
    // Add/Remove classname for the selected row, on checkbox click
    $(document).ready(function () {
      $('#paramTable').on('click', 'input[type="checkbox"]', function (e) {
        const $row = $(this).closest('tr');
        if (this.checked) {
          $row.addClass('select');
        } else {
          $row.removeClass('select');
        }
      });
    });
    // Method call for getting the param values
    this.onloadparam();
    this.onLoadDisableParam = true;
  }

  // Header Checkbox functionality
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
    $('#paramTable').on('click', 'input[type="checkbox"]', function (e) {
      const $row = $(this).closest('tr');
      const index = ref.target.id.match(/\d+/);
      const trow = $('#paramTable').find('tr');
      const tagName = trow.find('h6').is(':visible');
      const submitBtn = $('#submitvalue');
      if (this.checked && tagName === false) {
        $row.addClass('select');
        submitBtn.removeAttr('disabled');
      } else {
        $row.removeClass('select');
        submitBtn.attr('disabled', 'disabled');
      }
    });
  }
  checkboxfunctionality($table, checkboxid) {
    // Accepts a table and thead Checkbox id
    const $chkbox_all = $('tbody input[type="checkbox"]', $table);
    const $chkbox_checked = $('tbody input[type="checkbox"]:checked', $table);
    const chkbox_select_all_html = $('thead #' + checkboxid, $table).get(0);
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

  // Method to add new empty row in the grid
  onAddParam(ref: any) {
    this.onLoadDisableParam = false;
    const tableinfo = document.getElementById('paramTable');
    const tr = tableinfo.getElementsByTagName('tr');
    const rowcount = tr.length;
    this.rowValue += 1;
    this.paramRows.push(this.rowValue);
    const thead = tableinfo.getElementsByTagName('thead')[0];
    const headerCheckboxid = thead.getElementsByClassName('parentcheck')[0].id;
    const ind = ref.target.id.match(/\d+/);
  }

  // Onkey - Textbox Validation
  onKey(selectdata: any) {
    const index = selectdata.target.id.match(/\d+/);
    const rowCount = $('#paramTable tr').length;
    const paramname = $('#paramName' + index).val();
    const paramvalue = $('#paramValue' + index).val();
    const addbttn = document.getElementById('addParam' + index);
    if (selectdata.target.id.substring(0, 9) === 'paramName') {
      if (paramname === '') {
        document.getElementById('paramNameText' + index).style.display = 'block';
        $('#paramNameText' + index).text('Please fill the field');
      } else {
        document.getElementById('paramNameText' + index).style.display = 'none';
      }
    }
    if (selectdata.target.id.substring(0, 10) === 'paramValue') {
      if (paramvalue === '') {
        document.getElementById('paramValueText' + index).style.display = 'block';
        $('#paramValueText' + index).text('Please fill the field');
      } else {
        document.getElementById('paramValueText' + index).style.display = 'none';
      }
    }
  }

  // Method to get param values from DB
  onloadparam() {
    this.service.fetchParamvalue().subscribe(res => {
      for (const setting of res) {
        this.paramIDArray.push(setting.ParamId);
      }
      this.paramObjectArray = res;
      this.TempParamObj = res;
      this.paramRows = res;
      let classref = this;
      setTimeout(function () {
        classref.enableAdd();
      }, 25);
      this.totalRec = this.paramObjectArray.length;
    });
  }
  enableAdd() {
    const trow = $('#paramTable').find('tr');
    const tr_length = trow.length;
    const index = (tr_length - 1);
    const paramname = $('#paramName' + index).val();
    const paramvalue = $('#paramValue' + index).val();
    const addbttn = document.getElementById('addParam' + index);
  }
  //  To check duplicate values		
  duplicatevalidate() {
    let flag = 0;
    let indexArray: string[] = [];
    const tr = $('#paramTable').find('.select');
    const testArray: string[] = [];
    const rowId: string[] = [];
    tr.each(function (e) {
      testArray.push($(tr[e]).find('.paramName').val());
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
    indexArray = indexArray.filter((element, index, array) => array.indexOf(element) === index);
    return {
      'flag': flag,
      'indexArray': [...indexArray]
    };
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

  // Checking param_name has an ID
  checkParamName(paramName: string): object {
    let flag = false;
    for (let param of this.paramObjectArray) {
      if (param.param_name === paramName) {
        flag = true;
        return {
          'param_name': paramName,
          'param_id': param.param_id,
          'hasParamID': true,
          'created_date': param.created_date
        };
      }
    }
    if (flag === false) {
      return { 'hasParamID': false }
    }
  };

  //Method to generate Param ID 
  generateID(paramName: string): string {
    const paramIDExists = (param_name) => {
      let i = 1;
      if (this.paramIDArray.find((element) => element === param_name) === undefined) {
        return param_name;
      } else {
        return paramIDExists((param_name + '1'));
      }
    };
    let paramID = '';
    let lengthParamArray = this.paramIDArray.length;
    const maxValue = parseInt(this.paramIDArray[lengthParamArray - 1])
    if (isNaN(maxValue)) {
      paramID = paramIDExists(paramName);
    } else {
      paramID = (maxValue + 1).toString();
    }
    this.paramIDArray.push(paramID);
    return paramID;
  }

  // Submitting the Param Values 
  submitParamDetails(ref: any) {
    let count = 0;
    const index = ref.target.id.match(/\d+/);
    let errorVisible;
    let isError = false;
    let duplicateFnReturnValue: any = {};
    let classref = this;
    const $table = document.getElementById('paramTable');
    const $chkbox_checked = $('tbody input[type="checkbox"]:checked', $table);
    if ($chkbox_checked.length === 0) {
      JSAlert.alert('Please select atleast one User to Update !!!');
      return;
    }
    duplicateFnReturnValue = classref.duplicatevalidate();
    if (duplicateFnReturnValue.flag === 1) {
      for (const rowID of duplicateFnReturnValue.indexArray) {
        document.getElementById(rowID).style.backgroundColor = '#c3acb1';
      }
      JSAlert.alert('Duplicate Parameter Name Found');
      return;
    }
    let isParamNull = false;
    this.arrayOfObj = [];
    const tableRow = $('#paramTable').find('.select');
    $("tr").css("background-color", "#f3f3f3");
    const date = new Date().toISOString();
    // Looping through each row
    tableRow.each(function (el) {
      let param_id = null;
      let createdDate = '';
      const rowID = (tableRow[el].id);
      const visible = $(tableRow[el]).find('h6');
      const param_name = $(tableRow[el]).find('.paramName').val();
      let param_value = $(tableRow[el]).find('.paramValue').val();
      errorVisible = visible.is(':visible');
      if (isNullOrUndefinedorEmptyString(param_name) || isNullOrUndefinedorEmptyString(param_value)) {
        document.getElementById(rowID).style.backgroundColor = '#c3acb1';
        isParamNull = true;
      }
      if (errorVisible === true) {
        document.getElementById(rowID).style.backgroundColor = '#c3acb1';
        isError = true;
      }
      // Checking whether true or false written as String
      if (param_value === 'true') {
        param_value = true;
      } else if (param_value === 'false') {
        param_value = false;
      }
      // Checking whether an id exists in DB
      let paramObj: any = classref.checkParamName(param_name);
      // If new parameter then crete a date and ID for it
      if (paramObj.hasParamID === false) {
        param_id = classref.generateID(param_name);
        createdDate = date;
      } else {
        param_id = paramObj.param_id;
        createdDate = paramObj.created_date;
      }
      const rowObj = {
        'param_name': param_name,
        'param_value': param_value,
        'created_date': createdDate,
        'last_updated_date': date,
        'parent_id': "NA",
        'param_id': param_id
      };
      classref.arrayOfObj.push(rowObj);
    });

    if (isError || isParamNull) {
      JSAlert.alert('Please Fill the Fields');
      return;
    }
    const rowsInTable = $('#paramTable').find('tr');
    if ((rowsInTable.length) - count === 0) {
      classref.Rows = [tableRow.length];
      this.mainCheckbox = false;
    }
    // DB call to submit the data
    this.service.paramValueInsertion(this.arrayOfObj);
    JSAlert.alert('Param Values are submitted successfully');
    this.arrayOfObj = [];
    $('input[type="checkbox"]:checked').prop('checked', false);
    const submitbtn = $('#submitvalue');
    const chkTrueCount = this.checkboxChecker();
    if (chkTrueCount > 0) {
      submitbtn.removeAttr('disabled');
    } else {
      submitbtn.attr('disabled', 'disabled');
    }
  }

  resetClick() {
    this.routes.navigate(['/loader']);
  }

  // Method to check the duplicate data is entered as paramname
  onChangeParam(selectdata: any) {
    let duplicateValueflag = false;
    const ind = selectdata.target.id.match(/\d+/);
    const rowCount = $('#paramTable tr').length;
    const paramname = $('#paramName' + ind).val();
    for (let i = 0; i < this.paramRows.length; i++) {
      if (selectdata.target.id.substring(0, 9) === 'paramName') {
        if (paramname === this.paramRows[i]['param_name']) {
          document.getElementById('paramNameText' + ind).style.display = 'block';
          $('#paramNameText' + ind).text('Parameter already exists!!');
          duplicateValueflag = true;
        }
      }
    }
    if (duplicateValueflag !== true) {
      document.getElementById('paramNameText' + ind).style.display = 'none';
    }
  }

  updateParamDetails() {
    const $table = document.getElementById('paramTable');
    const $chkbox_checked = $('tbody input[type="checkbox"]:checked', $table);
    if ($chkbox_checked.length === 0) {
      JSAlert.alert('Please select atleast one User to Update !!!');
      return;
    }
    const classref = this;
    const trow = $('#paramTable').find('.rowSelected');
    trow.each(function (el) {
      const rowId = (trow[el].id);
      const param_name = $(trow[el]).find('.paramName').val();
      const param_value = $(trow[el]).find('.paramValue').val();
      const rowObject = {
        'param_name': 'param_name',
        'param_value': 'param_value'
      };
      classref.inputObject.push(rowObject);
    });
  }

    // Method for changing the number of records count in pagination
    pageChanged(event) {
      this.pageNumcount = (this.page - 1) * this.IntialCount + 1;
    }

    MyDropFunOnee(data) {
      this.IntialCount = (parseInt(data.target.value));
      this.page = (Math.floor(this.pageNumcount / data.target.value)) + 1;
      this.pageNumcount = (this.page - 1) * this.IntialCount + 1;    
    }

    onKeyupData(data) {
      var classref = this;
      const searchdata = (data.target.value).trim();
      if(searchdata != "") {
      classref.paramRows = classref.TempParamObj.filter(element => 
      {    
      classref.totalRec = classref.paramRows.length;
      return element["ParamName"].indexOf(searchdata.toUpperCase()) !== -1 ||
      element["ParamValue"].indexOf(searchdata.toUpperCase()) !== -1 
      // element["phone_number"].toUpperCase().indexOf(searchdata.toUpperCase()) !== -1 ||
      // element["email_id"].toUpperCase().indexOf(searchdata.toUpperCase()) !== -1 ||
      // element["department"].toUpperCase().indexOf(searchdata.toUpperCase()) !== -1 ||
      // element["area_of_interest"].toUpperCase().indexOf(searchdata.toUpperCase()) !== -1 ||
      // element["registered_company"].toUpperCase().indexOf(searchdata.toUpperCase()) !== -1 ||
      // element["country"].toUpperCase().indexOf(searchdata.toUpperCase()) !== -1 ||
      // element["created_date"].toUpperCase().indexOf(searchdata.toUpperCase()) !== -1
    })
    } 
    // else if (searchdata == "") {
    //   classref.approvalUserslist();
    // }
    }
}
