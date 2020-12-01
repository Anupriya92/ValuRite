import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Jsonp, URLSearchParams, Headers, RequestOptions, Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ConfigService } from '../config';
@Injectable()
export class AdminLoginServiceService {

  private isuserloggedIn;

  constructor(private http: HttpClient, private jsonp: Http, private config: ConfigService) {
    this.isuserloggedIn = Boolean(sessionStorage.getItem('session'));
  }

  // analyticconfig:any = this.config.analyticnode();
  // searchconfig:any = this.config.searchnode();
  menuandhomeconfig:any = this.config.menuandhomenode();
  // myaccountconfig:any = this.config.myaccountnode();
  adminconfig:any = this.config.adminnode();
  // reportconfig:any = this.config.reportnode();

  private get(path: string): Observable<any> {
    return this.http.get(this.adminconfig + path).map(res => res);
  }

  // issuedetails(data:any,formdata){
  //   return this.jsonp.post(this.myaccountconfig+ '/issue', data,formdata).map(res => res);
  // }

  feedbackdetails(data: any,formdata) {
    return this.jsonp.post(this.adminconfig+ '/feedback', data,formdata).map(res => res);
  }

  enQuirydetails(formdata) {
    return this.jsonp.post(this.adminconfig+ '/enquiryform', formdata).map(res => res);
  }

  paramValueInsertion(arrayOfObject: object) {
    const uri = this.adminconfig + '/postParamValue';
    this.http.post(uri, arrayOfObject).subscribe(res => console.log('Done'));
  }

  fetchParamvalue(): Observable<any> {
    const uri = this.adminconfig + '/fetchingParamValue';
    try {
      return this.http.get(uri).map(res => res);
    } catch (ex) {
      console.log('unsuccess');
    }
  }

  private post(path: string, obj: object): Observable<any> {
    return this.http.post(this.adminconfig + path, obj).map(res => res);
  }
  
  loginpost(data: any): Observable<any> {
    return this.post('/login', data);
  }
 
  setisuserloggedin() {
    sessionStorage.setItem('session', 'true');
    this.isuserloggedIn = Boolean(sessionStorage.getItem('session'));
  }
  setisuserloggedout() {
    sessionStorage.setItem('session', '');
    this.isuserloggedIn = Boolean(sessionStorage.getItem('session'));
  }
  getisuserloggedin() {
    return this.isuserloggedIn;
  }
 
  // Functions for My Settings Page
  fetchDefaultSettings(): Observable<any> {
    return this.get('/globalsettings');
  }
  // New UserList
  getUserList(obj: object) {
    return this.post('/getUserlist', obj);
  }
  updateDefaultSettings(dbGlobalSettingsObj: object) {
    const uri = this.adminconfig + '/globalsettings';
    this.http.post(uri, dbGlobalSettingsObj)
      .subscribe(res => {
        console.log('Global Settings Updated');
      }, err => {
        console.log('Global Settings Updation failed');
      });
  }
  // Functions for DashBoard Page
  getPreferences(userName): Observable<any> {
    return this.get('/getPreferences?username=' + userName);
  }
  updatePreferences(prefernceObj: object) {
    const uri = this.adminconfig + '/updatePreferences';
    this.http.post(uri, prefernceObj)
      .subscribe(res => {
        console.log('Preferences Updated');
      }, err => {
        console.log('Preference Updation failed');
      });
  }
  // Functions for Current Users
  getLoggedInUsers(): Observable<any> {
    return this.get('/loggedinusers');
  }
  // Functions for UserList, UsageStatistics
  getCompanyNames(): Observable<any> {
    return this.get('/fetchingCompanyName');
  }
  // Functions for Usage Statistics
  getYearFromUserlogs(): Observable<any> {
    return this.get('/getYearFromUserlogs');
  }
  getMonthStatsForAnYear(year: number): Observable<any> {
    return this.get('/getMonthStatsForAnYear?year=' + year);
  }
  getPopupData(userObj: object): Observable<any> {
    return this.post('/admin-dashboardpopup', userObj);
  }
  getgeneralpopupData(userObj: object): Observable<any> {
    return this.post('/admin-dashboardpopup', userObj);
  }
  changepassword(userObj: object): Observable<any> {
    return this.post('/admin-changepassword', userObj);
  }
  
  // Functions for General Statistics
  getCompanyUsers(companyname: string): Observable<any> {
    return this.get('/getCompanyUsers?companyname=' + companyname);
  }
  getStatsforCompanies(compObj: object): Observable<any> {
    return this.post('/getYearmonthWiseStatsforCompanies', compObj);
  }
  getStatsforUsers(compObj: object): Observable<any> {
    return this.post('/getYearmonthWiseStatsforUser', compObj);
  }

  /***************************End Of dashboard Functions ***************************************/
  // Company Functions
  // Functions for Company Registration and Updation
  addvalue(object: object) {
    const uri = this.adminconfig + '/companyregister';
    const obj = object;
    this.http.post(uri, obj).subscribe(res => console.log('Done'));
  }
  addContract(inputGridObject2: object) {
    const uri = this.adminconfig + '/companycontract';
    this.http.post(uri, inputGridObject2).subscribe(res => console.log('Done'));
  }
  contractReferenceUpdateExists(data: any): Observable<any> {
    const uri = this.adminconfig + '/getAllContractReferences?contract_reference=' + data;
    return this.http.get(uri).map(res => res);
  }
  fetchvalue(data): Observable<any> {
    const uri = this.adminconfig + '/companyValue?companyname=' + data;
    try {
      return this.http.get(uri).map(res => res);
    } catch (ex) {
      console.log('unsuccess');
    }
  }
  updateCompany(object: object) {
    const uri = this.adminconfig + '/update';
    const obj = object;
    this.http.post(uri, obj).subscribe(res => console.log('Done'));
  }
  updateCompanyContract(contractObj: object) {
    const uri = this.adminconfig + '/UpdateCompanyContract';
    const obj = contractObj;
    this.http.post(uri, obj).subscribe(res => console.log('Done'));
  }
  companyParamValue(): Observable<any> {
    const uri = this.adminconfig + '/ContractParamValue';
    try {
      return this.http.get(uri).map(res => res);
    } catch (ex) {
      console.log('unsuccess');
    }
  }
  companyNameExists(data: any): Observable<any> {
    const uri = this.adminconfig + '/onChechCompanyNameExisting?companyname=' + data;
    return this.http.get(uri).map(res => res);
  }
  /***************************End Of Company Functions ***************************************/
  // User Creation Functions
  // SingleUSer Details
  userdetails(data: any) {
    const newuserurl: any = this.adminconfig + '/postSingleUserDetails';
    return this.http.post(newuserurl, data).map(res => res);
  }
  // User Approval Details
  approvaldetails(): Observable<any> {
    const uri = this.adminconfig + '/getApprovalUsers';
    return this.http.get(uri).map(res => res);
  }
  // BulkUser
  bulkuserdetails(object: Object[]) {
    const bulkuserurl: any = this.adminconfig + '/postBulkUserDetails';
    return this.http.post(bulkuserurl, object).map(res => res);
  }
  // User Approval Details Updation
  userapprovaldetails(object: Object[]) {
    const userapprovalurl: any = this.adminconfig + '/updateApprovedUsers';
    return this.http.post(userapprovalurl, object).map(res => res);
  }
  // User Rejection Details
  userrjectdetails(object: Object[]) {
    const userapprovalurl: any = this.adminconfig + '/updateRejectedUsers';
    return this.http.post(userapprovalurl, object).map(res => res);
  }
  // Companydropdown
  companydropdown(): Observable<any> {
    const uri = this.adminconfig + '/getCompanyNames';
    return this.http.get(uri).map(res => res);
  }
  // RoleName Dropdown
  roleName(): Observable<any> {
    const uri = this.adminconfig + '/getRoleName';
    return this.http.get(uri)
      .map(res => res);
  }
  // Refernce dropdown
  referencedropdown(data: any): Observable<any> {
    const uri = this.adminconfig + '/getContractRef?companyname=' + data;
    return this.http.get(uri).map(res => res);
  }
  // For Binding data for other textboxes
  downloadtxt(data: any): Observable<any> {
    const uri = this.adminconfig + '/getContractDetails?referencenum=' + data;
    return this.http.get(uri).map(res => res);
  }
  // To get emailFlag from Param Table
  paramEmailFlag(): Observable<any> {
    const uri = this.adminconfig + '/getEmailFlag';
    return this.http.get(uri).map(res => res);
  }
  // To Check the UserName Exists or Not
  userNameExists(data: any): Observable<any> {
    const uri = this.adminconfig + '/getUsername?username=' + data;
    return this.http.get(uri).map(res => res);
  }
  /***************************End Of User Creation Functions ***************************************/
  referencesdropdown(data: any): Observable<any> {
    const uri = this.adminconfig + '/contractReferences?companyname=' + data;
    return this.http.get(uri).map(res => res);
  }
  contractExists(data: any): Observable<any> {
    const uri = this.adminconfig + '/getContractExists?contractref=' + data;
    return this.http.get(uri).map(res => res);
  }
  // Updation Functions
  showSingle(data): Observable<any> {
    console.log(data);
    const uri = this.adminconfig + '/getSingleUser?username=' + data;
    try {
      return this.http.get(uri).map(res => res);
    } catch (ex) {
      console.log('unsuccess');
    }
  }

  updatedata(object) {
    const userapprovalurl: any = this.adminconfig + '/updateSingleUser';
    return this.http.post(userapprovalurl, object).map(res => res);
  }
  // updatedata(userlogemail, firstname, lastname, companyname, usertype, phnNo, department,
  //   areaofinterest, contractref, limits, exportflag, generalflag, startdate, enddate,userstatus, updateBy) {
  //   const uri = this.adminconfig + '/updateSingleUser';
  //   try {
  //     const obj = {
  //       email_id: userlogemail,
  //       first_name: firstname,
  //       last_name: lastname,
  //       company_institute: companyname,
  //       rolename: usertype,
  //       phone_number: phnNo,
  //       department: department,
  //       area_of_interest: areaofinterest,
  //       contract_reference: contractref,
  //       download_limit: limits,
  //       export_flag: exportflag,
  //       general_alert_flag: generalflag,
  //       valid_start_date: startdate,
  //       valid_to_date: enddate,
  //       user_Status:userstatus,
  //       last_updated_by: updateBy
  //     };
  //     return this.http.post(uri, obj).map(res => console.log('Done'));
  //   } catch (ex) { }
  // }
  getUserlogs(data: any): Observable<any> {
    const uri = this.adminconfig + '/getUserlog?username=' + data;
    try {
      return this.http.get(uri).map(res => res);
    } catch (ex) {
      console.log('unsuccess');
    }
  }
  getUserlogForCompany(data: any): Observable<any> {
    const uri = this.adminconfig + '/getUserlogForCompany?companyName=' + data;
    try {
      return this.http.get(uri).map(res => res);
    } catch (ex) {
      console.log('unsuccess');
    }
  }
  newuserpost(form: any) {
    const randomPwdurl = this.adminconfig + '/updateUserPassword';
    try {
      return this.jsonp.post(randomPwdurl, form).map(res => res.json());
    } catch (ex) {
    }
  }
  bulkUpdate(data): Observable<any> {
    const uri = this.adminconfig + '/fetchCompanyUsers?selectedcomp=' + data;
    try {
      return this.http.get(uri).map(res => res);
    } catch (ex) {
      console.log('unsuccess');
    }
  }
  updateBulk_Data(object: Object[]) {
    try {
      const url: any = this.adminconfig + '/updateBulkUser';
      return this.http.post(url, object).map(res => res);
    } catch (ex) {
      console.log('unsuccess');
    }
  }
  getUserNames(): Observable<any> {
    return this.get('/getUserNamesForUserLog');
  }
  getAllCompanyUserlog(): Observable<any> {
    const uri = this.adminconfig + '/getAllCompanyUserLogs?';
    try {
      return this.http.get(uri).map(res => res);
    } catch (ex) {
      console.log('unsuccess');
    }
  }
  // alertColleague(object: any): Observable<any> {
  //   const newuserurl: any = this.myaccountconfig + '/alertColleague';
  //   return this.http.post(newuserurl, object).map(res => res);
  // }
  getOnlyApprovedUsers(companyname: string): Observable<any> {
    return this.get('/getOnlyApprovedUsers?companyname=' + companyname);
  }
  getApprovedUserscompany(username: string): Observable<any> {
    return this.get('/getOnlyApprovedUsersCompany?username=' + username);
  }

  getWebToken(data) {
    const uri = this.adminconfig + '/webTokens';
    return this.http.get(uri).map(res => res);
  }
}


