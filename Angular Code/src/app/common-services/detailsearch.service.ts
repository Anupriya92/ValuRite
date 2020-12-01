import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
//import {environment } from '../environments/environment';
import { ConfigService } from '../config';

@Injectable()
export class DetailsearchService {

  // endPoint: string;
  // endPointGetData : string;
  // endPointChrome : string;
  // endPointEBMChrome : string;
  
    url ;
    constructor(private http: Http, private config: ConfigService) 
    {
      // this.endPoint = this.config.nodepath1()+"/AdvancedSearch";
      // this.endPointGetData = this.config.nodepath1()+"/Get_P_Value";
      // this.endPointChrome = this.config.nodepath1()+"/getChromosomeDetails";
      // this.endPointEBMChrome = this.config.nodepath1()+"/getEBMChromosomeDetails";
    }

    // analyticconfig:any = this.config.analyticnode();
    // searchconfig:any = this.config.searchnode();
    menuandhomeconfig:any = this.config.menuandhomenode();
    // myaccountconfig:any = this.config.myaccountnode();
    adminconfig:any = this.config.adminnode();
    // reportconfig:any = this.config.reportnode();
    
    // search(inputobj: any)
    // {
    //   return this.http.post(this.searchconfig+"/AdvancedSearch", inputobj)
    //   .map(this.extractData);
    // }
    // GetPValue()
    // {
    //   return this.http.post(this.searchconfig+"/Get_P_Value",{})
    //   .map(this.extractData);
    // }

    // GetChromosomeValue(inputobj: any)
    // {
    //   return this.http.post(this.analyticconfig+"/getChromosomeDetails",inputobj)
    //   .map(this.extractData);
    // }

    // GetEBMChromosomeValue(inputobj: any)
    // {
    //   return this.http.post(this.analyticconfig+"/getEBMChromosomeDetails",inputobj)
    //   .map(this.extractData);

    // }
    private extractData(res: Response) {
      let body = res.json();
      return body || {};
    }
 
  }
  
  






