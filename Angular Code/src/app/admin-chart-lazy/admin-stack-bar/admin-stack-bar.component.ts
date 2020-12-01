// This component is used for displaying the data in stackbar chart
// It is used in general statistics  
import { Component, OnInit, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import * as crossfilter from 'crossfilter2';
import * as dc from 'dc';
import { DatepickerConfig } from 'ngx-bootstrap/datepicker/datepicker.config';
declare var require: any;
const d3 = require('d3');
const $ = require('jquery');

@Component({
  selector: 'app-admin-stack-bar',
  templateUrl: './admin-stack-bar.component.html',
  styleUrls: ['./admin-stack-bar.component.css']
})

export class AdminStackBarComponent implements OnInit, OnChanges {

  constructor() { }
  @Input() jsondata: any; // get jsondata from other component
  @Input() report: any;
  @Input() ebmID: any;
  @Input() referenceID: any;
  @Output() ApplicationTableData = new EventEmitter<any[]>();

  ishide: boolean;
  tspanStack = "";

  ngOnInit() {
    this.ishide = true;
  }
  SendFilteredData = (data) => {
    this.ApplicationTableData.emit(data);
  }
  ngOnChanges() {
    if (this.jsondata) {
      const thisref = this;
      const Jsonobj = this.jsondata.rowdata;
      const refname = this.jsondata.refname;
      const xaxislabel = this.jsondata.xaxislabel;
      const yaxislabel = this.jsondata.yaxislabel;
      const columnname = this.jsondata.colname;
      const data = Jsonobj;
      const ndx = crossfilter(data);
      let month: string;
      let year: string;
      let dummyYear;
      // Custom Variable based on X axis Label
      if (xaxislabel === 'Month') {
        month = 'month';
        (data[0].hasOwnProperty('year')) ? year = 'year' : year = '';
      }
      if (xaxislabel === 'Year') {
        year = 'year';
      }
      let dummyDate: Date;
      const xdim = ndx.dimension(function (d) {
        if (year === '') {
          dummyYear = new Date().getFullYear();
        } else {
          dummyYear = d[year];
        }
        if (d.hasOwnProperty(month)) {
          dummyDate = new Date(dummyYear, (d[month] - 1), 3);
        }
        else {
          dummyDate = new Date(dummyYear, 1, 3);
        }
        return dummyDate;
      });
      const minDate1 = xdim.bottom(1)[0]['month'];
      const maxDate1 = xdim.top(1)[0]['month'];

      const ydim = xdim.group().reduce(
        function (p, v) {
          p[v[columnname]] = (p[v[columnname]] || 0) + v['count'];
          return p;
        },
        function (p, v) {
          p[v[columnname]] = (p[v[columnname]] || 0) - v['count'];
          return p;
        },
        function (): any {
          return {}; // Should return empty object
        }
      );
      const grouparr = ydim.all();
      let keyarr = []; // Object.getOwnPropertyNames(Jsonobj[0]);
      // tslint:disable-next-line:forin
         //Creating a Unique set of Y axis values
      for (const doc in grouparr) {
        Object.getOwnPropertyNames(grouparr[doc].value).forEach(function (elem) {
          keyarr.push(elem);
        });
      }
      keyarr = $.grep(keyarr, function (el, index) {
        return index === $.inArray(el, keyarr);
      });
      const chart = dc.barChart('#' + refname + ' .row .stackchart');

      chart
        .width(700)
        .height(400)
        .gap(2)
        .round(function (n) { return Math.floor(n); })
        .margins({ top: 100, right: 40, bottom: 90, left: 60 })
        .x(d3.scale.ordinal().domain(xdim))
        .brushOn(false)
        .clipPadding(5)
        .legend(dc.legend().x(700).y(40).itemHeight(13).gap(5))
        .dimension(xdim)
        .xAxisLabel(xaxislabel)
        .yAxisLabel(yaxislabel)
        // .yAxisMinimumInterval(1)
        .title(function (d) {
          console.log(d);
          return this.layer + ' : ' + this.data.value[this.layer];
        })
        .group(ydim, keyarr[0], sel_stack(keyarr[0])) // placing first stack in the bar
        .xUnits(dc.units.ordinal)
        .yAxis().tickFormat(d3.format("d")); // To Remove Decimals from Y-Axis.
      if ((year === '') && (month === 'month')) {
        // Formatting in Months Sample Output: January 
        chart.xAxis().tickFormat(d3.time.format('%B'));
      } else if ((year === 'year') && (month === 'month')) {
        // Formats to Month-Year Sample Output: January-2018
        chart.xAxis().tickFormat(d3.time.format('%B-%Y'));
      } else if ((year === 'year') && (month !== 'month')) {
        // Formats to Month-Year Sample Output: 2018
        chart.xAxis().tickFormat(d3.time.format('%Y'));
      }
      // .xUnits(dc.time.months);
       //looping through keyarr (Y axis unqique values) to stack bars  
      for (let i = 1; i < keyarr.length; i++) {
        chart.stack(ydim, keyarr[i], sel_stack(keyarr[i]));
      }
      chart.render();
      $('.stackchart.dc-chart svg').attr('width', '1100');
      chart.selectAll('.dc-legend-item text')
        .text('')
        .append('tspan')
        .text(function (d) { return d.name; })
        .append('tspan')
        .attr('x', 820)
        .attr('Y', 100)
        .attr('text-anchor', 'end')
        .text(function (d) { return d.data; });
      chart.selectAll('rect.bar').on('click', function (d) {
        const obj = {};
        const year = d.x.getFullYear();
        const month = d.x.getMonth();
        var child = $(this).children('title');
        // var splitchild = child[0].innerHTML.split(':');
       var splitchild = child[0].lastChild.data.split(':');
        obj['year'] = year;
        obj['month'] = month;
        if (splitchild[0].trim().includes('@')) {
          obj['email_id'] = splitchild[0].trim();
        }
        else {
          obj['company_name'] = splitchild[0].trim();
        }
        obj['accesscount'] = splitchild[1].trim();
        obj['charttype'] = "stackbar";
        thisref.ApplicationTableData.next([obj]);
      });
     
      chart.renderlet(function (chart) {
        if (chart.selectAll('g.x text')[0].length > 5) {
          chart.selectAll('g.x text')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em')
            .attr('transform', 'rotate(-45)');
        }
      });
    }
    function sel_stack(valueKey) {
      return function (d) {
        return (d.value.hasOwnProperty(valueKey)) ? d.value[valueKey] : 0;
      };
    }
  }
}
