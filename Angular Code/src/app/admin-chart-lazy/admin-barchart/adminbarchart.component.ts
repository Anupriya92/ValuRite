// This component is used for displaying the statitics using barchart
// It is used in recent usage 

import { Component, OnInit, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import * as crossfilter from 'crossfilter2';
import * as dc from 'dc';
import { getMonthString } from '../../../../utils/admin_getMonthString'; //For getting the month name
declare var require: any;
const d3 = require('d3');
const $ = require('jquery');

@Component({
  selector: 'app-adminbarchart',
  templateUrl: './adminbarchart.component.html',
  styleUrls: ['./adminbarchart.component.css','../../../assets/css/bootstrap.min.css']
})
export class AdminBarchartComponent implements OnInit, OnChanges {

  public months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  constructor() { }

  @Input() jsondata: any; // get jsondata from other component
  @Input() report: any;
  @Input() ebmID: any;
  @Input() referenceID: any;
  @Output() ApplicationTableData = new EventEmitter<any[]>();

  // @Output()
  ishide: boolean;
  tspanBar = "";

  ngOnInit() {
    this.ishide = true;
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
      const xdim = ndx.dimension(function (d) { 
        let dummyDate = new Date( d['year'], (d['month'] - 1), 3 ); 
        return dummyDate; 
        //dimension to set on X-Axis
      }
      );
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
        });
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

      const chart = dc.barChart('#' + refname + ' .row .mychart');
      chart
        .width(700)
        .height(400)
        .gap(2)
        .margins({ top: 100, right: 40, bottom: 90, left: 60 })
        .x(d3.scale.ordinal().domain(xdim))
        .brushOn(false)
        .clipPadding(5)
        .legend(dc.legend().x(700).y(40).itemHeight(13).gap(5))
        .dimension(xdim)
        .xAxisLabel(xaxislabel)
        .yAxisLabel(yaxislabel)
        .title(function (d) {
          return getMonthString((d.key.getMonth() + 1).toString()) + ' : ' + this.data.value[this.layer];
        })
        .group(ydim, keyarr[0], sel_stack(keyarr[0]))
        .xUnits(dc.units.ordinal)
        .elasticX(true)
        .elasticY(true)
        .yAxis().tickFormat(d3.format("d")); // To Remove Decimals from Y-Axis
        chart.xAxis().tickFormat(d3.time.format('%B'));
        // .yAxis().tickFormat(d3.format("d")); // To Remove Decimals from Y-Axis.

      chart.render();
      $('.mychart.dc-chart svg').attr('width', '1100');
      chart.selectAll('.dc-legend-item text')
        .text('')
        .append('tspan')
        .text(function (d) {
          return 'Valuation Count'; // d.name;
        })
        .append('tspan')
        .attr('x', 820)
        .attr('Y', 100)
        .attr('text-anchor', 'end')
        .text(function (d) { return 'Valuation Count'; });
        chart.selectAll('rect.bar').on('click', function (d) {
          const obj = {};
          const year = d.x.getFullYear();
          var child = $(this).children('title');
          // var splitchild = child[0].innerHTML.split(':');
          var splitchild = child[0].lastChild.data.split(':');
          obj['year'] = year;
          obj['month'] = splitchild[0].trim();
          obj['accesscount'] = splitchild[1].trim();//
          obj['charttype'] = "barchart";
          thisref.ApplicationTableData.next([obj]);
        });
      // tslint:disable-next-line:no-shadowed-variable
      chart.renderlet(function (chart) {
        // rotate x-axis labels
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
