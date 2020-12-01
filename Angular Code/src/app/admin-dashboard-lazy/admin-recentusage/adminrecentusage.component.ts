// Feature : To get the recent usage of the users, based the year selection the barchart will be displayed
//  Onclick the barchart cylinder the popup (datatable) will be displayed with user details
import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { AdminLoginServiceService } from '../../common-services/admin-service.service';
import { Observable } from 'rxjs/Observable';
import { getMonthString } from '../../../../utils/admin_getMonthString';
import { customIsNullOrUndefined } from '../../../../utils/admin_isNullorUndefinedorEmptyString';
import * as $ from 'jquery';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-adminrecentusage',
  templateUrl: './adminrecentusage.component.html',
  styleUrls: ['./adminrecentusage.component.css', '../../../assets/css/admin.css', '../../../assets/css/bootstrap.min.css']
})
export class AdminRecentUsageComponent implements OnInit {
  showpopup: Boolean;
  Jsondata: any;
  public year;
  public years: number[] = [];
  public chartObject = {};
  public chartFlag = false;
  public dcChartFlag = false;
  public errorMsgFlag = false;
  @Input() popuptable: any;
  idOfTable: any;
  constructor(private http: Http, private loginService: AdminLoginServiceService, private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    // To Get the Current year user statistics
    this.getCurrentYear();
    this.showpopup = false;
  }

  emptyResponseValidation(response): boolean {
    // Empty Response Validation
    if (customIsNullOrUndefined(response) || response.length === 0) {
      this.errorMsgFlag = true;
      this.dcChartFlag = false;
      this.chartFlag = false;
      this.showpopup = false;
      return true;
    } else {
      return false;
    }
  }
  // Method to get the current year statistics
  getCurrentYear() {
    this.getYearFromUserlogs().subscribe(yearsFromDB => {
      if (!this.emptyResponseValidation(yearsFromDB)) {
        for (const year of yearsFromDB) {
          this.years.push(year.year);
        }
        // Using Spread syntax
        this.year = Math.max(...this.years);
        // Displaying the Chart for the Selected Year
        this.getChartValues();
      }
    });
  }

  // Displays onclick the bar chart cylinders
  popupTable(data: any) {
    // DB call to fetch the data onclick barchart
    this.getmonthStatsForUsers(data[0]).subscribe(result => {
      // Passing the data to the datatable
      this.Jsondata = {
        tablesetting:
        { checkbox: false },
        columndef: [],
        rowData: result,
        id: 'dashboardpopup'
        };
    });
    document.getElementById('dashboardpopup').style.display = 'block';
    // tslint:disable-next-line:one-line
    try{$('#dashboardpopup').find('#tablediv').css('display', 'block'); }catch (e){}
  // tslint:disable-next-line:max-line-length
  const headerdiv = '<div id="Applicationheader" style="background-color: blanchedalmond;padding-top: 1%;margin: 0;padding-left:1%;padding-bottom:0.5%;font-size: 20px;"></div>';
  $('#dashboardpopup').show();
  $('.closespan').remove();
  $('#Applicationheader').remove();
  $('#dashboardpopup').prepend(headerdiv);
  $('#dashboardpopup').addClass('backdrop').prepend('<span class="btn btn-xs closespan" ' +
    'onclick="$(\'#dashboardpopup\').removeClass(\'backdrop\').hide();$(\'body\').css(\'overflow\',\'auto\')" ' +
    'style="background-color: #d21e11;color: #ffffff;border-radius: 5%;position: absolute;right: 6%;top: 12%;padding: 0.3%;' +
    '">X Close</span>');
  $('#Applicationheader').html('Usage Statistics');
  $('#applicationselect').remove();
  $('body').css('overflow', 'hidden');
}

// Service call to get the popup data
getmonthStatsForUsers(userObj: object): Observable<any> {
  return this.loginService.getPopupData(userObj);
}

  getChartValues() {
    this.chartFlag = false;
    this.dcChartFlag = false;
    // DB call to get the data for selected year
    this.getMonthStatsForAnYear(this.year).subscribe(chartStats => {
      if (!this.emptyResponseValidation(chartStats)) {
        // Passing the input for barchart
        this.chartFlag = true;
        this.dcChartFlag = true;
        this.errorMsgFlag = false;
        this.chartObject['chartid'] = 'dcCharts';
        this.chartObject['rowdata'] = chartStats;
        this.chartObject['xaxislabel'] = 'Months';
        this.chartObject['yaxislabel'] = 'Access Counts';
        this.chartObject['refname'] = 'dcCharts';
        this.chartObject['colname'] = 'Disease';
      }
    }
    );
  }

  // Service call functions
  getYearFromUserlogs(): Observable<any> {
    return this.loginService.getYearFromUserlogs();
  }

  getMonthStatsForAnYear(year: number): Observable<any> {
    return this.loginService.getMonthStatsForAnYear(year);
  }

  // On Change of Year DropDown
  getChart() {
    this.getChartValues();
  }
}



