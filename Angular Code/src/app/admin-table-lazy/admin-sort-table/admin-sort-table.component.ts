// This is component for displaying the data in the datatable 
// we are using this component in Userlist, Userlog, Usage statistics Popup , General Statistics Popup and
// in Reports Page for displaying the Name for Synonym

import { forEach } from '@angular/router/src/utils/collection';
import { unique } from 'array-unique';
// Child Component
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { setTimeout } from 'timers';

declare var require: any;

// const $ = require('jquery');
import * as $ from 'jquery';
import { MenuService } from '../../common-services/menu.service';
import { RetrieveDataService } from '../../common-services/retrieve-data.service';
import { GlobalVariableService } from '../../common-services/global-variable.service';
import { ConfigService } from '../../config';

const JSAlert = require('js-alert');
let table;
let userName;

require('datatables.net');
require('datatables.net-bs');

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'admin-sort-table',
  templateUrl: './admin-sort-table.component.html',
  styleUrls: [
    './admin-sort-table.component.css',
    '../../../assets/css/admin.css'
    // '../../../assets/css/bootstrap.min.css'
  ]
})

export class AdminSortTableComponent implements OnInit {

  pageNameRedirect = 0;
  // ExportURL: any = environment.nodepath1();
  constructor(public trigger: MenuService, private route: Router, private global: GlobalVariableService, private activeRoute: ActivatedRoute,
    private retrievedata: RetrieveDataService, private config: ConfigService) {
  }
  table: any;
  @Input() tabledata: any; // get jsondata from other component

  tablehide = true; // set table's hidden property to true to hide table
  tableJson: any[]; // table data
  headers: any[];  // table column headers
  columns: any[];  // contains mapping column header and column using tableJson (jquery datable columns format)
  tablecaption: any; // title for the table
  checkboxExists: boolean;
  custtabledefs: any[] = []; // contains definitions for each column type
  watchArray: any[];
  idOfTable: any;
  tablelength: any;
  totalExists: any;
  footers: any[];
  linktab: any;
  tableId: any;
  exportflagExists: boolean;
  searchLength: number;
  recordStart: number;

  ngOnInit() {
    this.linktab = this.activeRoute.snapshot.url
    $.fn.dataTable.ext.errMode = 'none';
    // Get the user name from the session
    userName = sessionStorage.getItem("name");
    if (this.linktab[0] == "Updates") {
      $("#btn_export").hide();
      $("#btn_pdf").hide();
    }
    this.exportflagExists = (this.tabledata.tablesetting)?this.tabledata.tablesetting.exportflag:{};
  }

  // Fetch Datatable Element/API 
  getDataTableID = (): string => {
    // Returns a jQuery DataTable id
    const tempTableId = $('#' + this.idOfTable).find('table')[0].id;
    if (!tempTableId) {
      return '';
    }
    return tempTableId;
  };

  getDataTable = (id: string) => {
    // Returns a jQuery DataTable
    const temp = $('#' + id).DataTable();
    if (!temp) {
      console.log('Error in retrieving DataTable()');
      return null;
    }
    return $('#' + id).DataTable();
  };

  getDataTableInfo = () => {
    // Returns page info of the jquery DataTable
    const dataTable = this.getDataTable(this.getDataTableID());
    return dataTable.page.info();
  };

  checkbx(event: any) {
    if (event.target.checked) {
      $('.table tbody .chkGrp:not(:checked)').trigger('click');
    } else {
      $('.table tbody .chkGrp:checked').trigger('click');
    }
  }

  // fires when the value of 'tabledata' loads/changes
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
    const currentdate = new Date();
    const datetime = currentdate.getDate() + '-' +
      (currentdate.getMonth() + 1) + '-' +
      currentdate.getFullYear() + '_' +
      currentdate.getHours() + '.' +
      currentdate.getMinutes() + '.' +
      currentdate.getSeconds();
    const checkedInput: string[] = [];

    if (this.tabledata) {

      let listFlag = false;
      this.headers = Object.getOwnPropertyNames(this.tabledata.rowData[0]);
      this.tableJson = this.tabledata.rowData; // table data
      this.tablelength = this.tableJson.length;
      this.searchLength = this.tablelength;
      if (this.tablelength > 10) {
        listFlag = true;
      }
      const referenceObj: any = {};
      this.custtabledefs = this.GenerateColumnDefs(this.tabledata.columndef) || [];
      this.tablecaption = this.tabledata.tablesetting.caption; // blue header for table
      this.idOfTable = this.tabledata.id;

      if (this.idOfTable === 'therapeutic_Statistics' || this.idOfTable === 'disease_Statistics') {
        this.totalExists = true;
        this.footers = Object.values(this.tableJson[this.tableJson.length - 1]);
        this.tableJson.pop();
      }

      // creating column
      const myarr = [];
      for (let headval = 0; headval < this.headers.length; headval++) {
        const obj = {};
        obj['data'] = this.headers[headval];
        myarr.push(obj);
      }

      this.checkboxExists = this.tabledata.tablesetting.checkbox; // checkbox exists

      if (this.checkboxExists) {
        const obj = {};
        obj['data'] = null;
        myarr.splice(0, 0, obj);
        this.custtabledefs.push(
          {
            'targets': 0,
            'orderable': false,
            'defaultContent': '<input id=checkbox2 class=\'chkGrp\' type=\'checkbox\' />'
          });
      }

      setTimeout(function () {
        const ref = this;
        // destroying the previous table
        table = $('#' + this.idOfTable).find('#tablediv').find('table').DataTable({
          destroy: true,
          retrieve: true
        }).destroy();

        const rows_selected = [];
        // loading current data
        table = $('#' + this.idOfTable).find('#tablediv').find('table').DataTable({
          
          destroy: true,
          retrieve: true,
          data: this.tableJson,
          dataType: 'json',
          columns: myarr,
          columnDefs: this.custtabledefs,
          // 'paging': (this.idOfTable === 'therapeutic_Statistics' || this.idOfTable === 'disease_Statistics') ? false : true,

          success: function (data) {
            console.log('Response in data table = ' + data);
          },
          error: function (xhr, error, thrown) {
            console.log('Response in data table = ' + xhr);
            console.log('Response in data table = ' + error);
            console.log('Response in data table = ' + thrown);
          },
          'deferRender': true,
          'lengthChange': listFlag,
          'dom': '<"top"<"row test"<"col-lg-12 "lfp>>>rt<"bottom"<"row"<"col-lg-12"lp>>>',
          
        });

        // Below line added in order to fix the issue no 205
        if (this.checkboxExists) {
          $('#' + this.idOfTable).find('#tablediv').find('table').find('th:eq(2)').click();
        }
        $('#' + this.idOfTable).find('.pagination').find('.active').find('a').css('z-index', 0);
        $('.pagination').on('click', function (e) {
          $('.pagination').find('.active').find('a').css('z-index', 0);
        
        });

        $('#btn_export').on('click', function (e) {
          //sortObjWhole.Externalfile(userName, datetime, "xlsx");
        });

        // tslint:disable-next-line:no-shadowed-variable
        function updateDataTableSelectAllCtrl(table) {
          const $table = table.table().node();
          const $chkbox_all = $('tbody input[type="checkbox"]', $table);
          const $chkbox_checked = $('tbody input[type="checkbox"]:checked', $table);
          const chkbox_select_all = $('thead #checkbox1', $table).get(0);

          // If none of the checkboxes are checked
          if ($chkbox_checked.length === 0) {
            chkbox_select_all.checked = false;
            if ('indeterminate' in chkbox_select_all) {
              chkbox_select_all.indeterminate = false;
            }

            // If all of the checkboxes are checked
          } else if ($chkbox_checked.length === $chkbox_all.length) {
            chkbox_select_all.checked = true;
            if ('indeterminate' in chkbox_select_all) {
              chkbox_select_all.indeterminate = false;
            }

            // If some of the checkboxes are checked
          } else {
            chkbox_select_all.checked = true;
            if ('indeterminate' in chkbox_select_all) {
              chkbox_select_all.indeterminate = true;
            }
          }
        }

        $('.table tbody').on('change', 'input[type=\'checkbox\']', function (e) {
          if ($('table').find('.selected').length > 0) {
            $('#remove').removeClass('report_default');
            $('#reset').removeClass('report_default');
          } else {
            $('#remove').addClass('report_default');
            $('#reset').addClass('report_default');
          }
        });

        $('.table tbody').on('click', 'input[type="checkbox"]', function (e) {
          const $row = $(this).closest('tr');
          // Get row data
          const data = table.row($row).data();
          // Get row ID
          const rowId = data[0];
          // Determine whether row ID is in the list of selected row IDs
          const index = $.inArray(rowId, rows_selected);
          // If checkbox is checked and row ID is not in list of selected row IDs
          if (this.checked && index === -1) {
            rows_selected.push(rowId);
            // Otherwise, if checkbox is not checked and row ID is in list of selected row IDs
          } else if (!this.checked && index !== -1) {
            rows_selected.splice(index, 1);
          }
          // IF checkbox is checked selected class is added to the row
          if (this.checked) {
            $row.addClass('selected');
          } else {
            $row.removeClass('selected');
          }

          // Update state of "Select all" control
          updateDataTableSelectAllCtrl(table);
          // Handle table draw event
          table.on('draw', function () {
            // Update state of "Select all" control
            updateDataTableSelectAllCtrl(table);
          });
        });

        $('#reset').on('click', function (e) {
          $('.table tbody input[type="checkbox"]:checked').trigger('click');
        });

        $('#' + this.idOfTable).find('#tablediv').find('table').wrap('<div class="dataTables_scroll" />');
        $('.dataTables_scrollHeadInner').attr('style', 'width:100%');
        // set table's hidden property to false to show table
        this.tablehide = false;

        // On Search Input KeyUp
        $('input[type=search]').keyup(() => {
          // get records display using page.info() api of Jquery Datatables
          const pageInfo = this.getDataTableInfo();
          this.searchLength = pageInfo.recordsDisplay;
          this.recordStart = (this.searchLength === 0) ? 0
            : ((pageInfo.start) + 1);
        });

        const tempTableId = $('#' + this.idOfTable).find('table')[0].id;
        const pageInfo = this.getDataTableInfo();
        this.recordStart = (this.searchLength === 0) ? 0
          : ((pageInfo.start) + 1);

        $('#' + tempTableId).on('page.dt', () => {
          console.log('Inside PAGE CHANGE new');
          // BAD- 479 - Added a new Pagination event here
          const pageInfo = this.getDataTableInfo();
          this.searchLength = pageInfo.recordsDisplay;
          this.recordStart = (this.searchLength === 0) ? 0
            : ((pageInfo.start) + 1);
        });

        $("select").on('change', () => {
          console.log('Inside select event');
          const pageInfo = this.getDataTableInfo();
          this.recordStart = (this.searchLength === 0) ? 0
            : ((pageInfo.start) + 1);
        });

      }.bind(this), 2);
    }
  }

  Externalfile(userName, datetime, exportdata) {

    let checkedInput = [];
    let checkedLength = table.data().length;
    console.log(checkedLength);

    let btnEnable = document.getElementById("btn_export");
    btnEnable.style.pointerEvents = "auto";
    btnEnable.style.cursor = "pointer";
    btnEnable.style.opacity = "1";

    var OriginalJson = JSON.parse(JSON.stringify(this.tableJson));
    userName = sessionStorage.getItem("name");
    let fileName = userName + "_" + datetime;

    console.log("export data:" + fileName + " " + OriginalJson);
    // this.spinnerService.show();
    this.retrievedata.getExcelData(fileName, exportdata, OriginalJson).subscribe(res => {
      let pathfile = this.config.ExportURL() + "//" + fileName + '.' + exportdata;
      window.open(pathfile, "_blank");
    },
      err => {
        console.log("Error occured");
      });
  }

  GenerateColumnDefs = function (input, ebmAvailable?) {
    const testarray = [];
    if (input.length > 0) {
      for (let obj = 0; obj < input.length; obj++) {
        if (input[obj].Type === 'tabledata') {
          testarray.push({
            'render': function (data, type, row) {
              return '<button class=\'logSubmit\'>' + data + '</button>';
            },
            'targets': input[obj].columnIndex
          });
        } else if (input[obj].visible === false) {
          testarray.push({
            targets: input[obj].columnIndex,
            visible: false
          });
        }
        else if (input[obj].Type === "accessalign") {
          testarray.push({
            "render": function (data, type, row) {
              return '<p style="text-align:center;">' + data + ' </p>';
            },
            "targets": input[obj].columnIndex
          });
        }
        else if (input[obj].Type == "reportdruglink") {
          testarray.push({
            "render": function (data, type, row) {
              return "<a href='/Report/drugReport/" + row.id + "' style=' color:blue;font-weight: bold;' class='reportclass' >" + data + "</a>";
            },
            "targets": input[obj].columnIndex
          });
        }
        else if (input[obj].Type == "reportdiseaselink") {
          testarray.push({
            "render": function (data, type, row) {
              return "<a href='/Report/diseaseReport/" + row.id + "'style=' color:blue;font-weight: bold;'>" + data + "</a>";
            },
            "targets": input[obj].columnIndex
          });
        }
        else if (input[obj].Type == "reportbiolink") {
          testarray.push({
            "render": function (data, type, row) {
              return "<a href='/Report/bioReport/" + row.id + "' style=' color:blue;font-weight: bold;'>" + data + "</a>";
            },
            "targets": input[obj].columnIndex
          });
        }
      }
      return testarray;
    }
  };

  pageNavigate(value, type = 'fast') {
    $('html, body').animate({ scrollTop: $('#' + value).offset().top - 170 }, type);
    sessionStorage.removeItem('subRepNav');
  }
}
