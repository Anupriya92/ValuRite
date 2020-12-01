import { Component, enableProdMode, Injectable, OnInit } from '@angular/core';
import { Jsonp, URLSearchParams, Headers, RequestOptions, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { MasterpageheaderComponent } from '../pageload-lazy/masterpageheader/masterpageheader.component';
import { ConfigService } from '../config';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class MenuService {
  //url: any = this.config.nodepath1();
  // analyticconfig:any = this.config.analyticnode();
  // searchconfig:any = this.config.searchnode();
  menuandhomeconfig:any = this.config.menuandhomenode();
  // "192.168.1.105:3000";
  // 
  // "http://192.168.1.105:3000"
  // myaccountconfig:any = this.config.myaccountnode();
  adminconfig:any =  this.config.adminnode();
  // this.config.adminnode();
  // reportconfig:any = this.config.reportnode();
  input: any;
  // sharingData: myData={name:"nyks"};
  saveData(str) {
    // console.log('save data function called' + str + this.sharingData.name);
    this.input = str;
  }
  getData() {
    return this.input;
  }
  deleteData() {
    this.input = [];
  }
  // Observable string sources
  private componentMethodCallSource = new Subject<any>();
  // Observable string streams
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();
  // Service message commands
  callComponentMethod() {
    this.componentMethodCallSource.next();
  }
  // Observable string sources
  private componentMethodCallSourcesession = new Subject<any>();
  // Observable string streams
  componentMethodCalledsession$ = this.componentMethodCallSourcesession.asObservable();
  // Service message commands
  callComponentMethodsession() {
    this.componentMethodCallSourcesession.next();
  }

  private componentMethodCallSourcereset = new Subject<any>();
  componentMethodCalledreset$ = this.componentMethodCallSourcereset.asObservable();
  callComponentMethodreset(data: any) {
    this.componentMethodCallSourcereset.next(data);
  }

  private componentMethodCallSourceAnalysis = new Subject<any>();
  componentMethodCalledAnalysis$ = this.componentMethodCallSourceAnalysis.asObservable();
  callComponentMethodAnalysis(data: any) {
    this.componentMethodCallSourceAnalysis.next(data);
  }

  public item1: any;
  public menuKeyValue: any;
  items: any = "";
  private isuserloggedIn;

  constructor(private http: HttpClient, private jsonp: Http, private config: ConfigService) {
    //this.isuserloggedIn=false;
    this.isuserloggedIn = Boolean(sessionStorage.getItem('session'));
  }
  setisuserloggedin() {
    //this.isuserloggedIn=true;
    sessionStorage.setItem('session', 'true');
    this.isuserloggedIn = Boolean(sessionStorage.getItem('session'));
  }
  setisuserloggedout() {
    //this.isuserloggedIn=false;
    sessionStorage.setItem('session', '');
    this.isuserloggedIn = Boolean(sessionStorage.getItem('session'));
  }
  getisuserloggedin() {
    return this.isuserloggedIn;
  }

 postMethod() {
  var model = "firstname=hhfdhdfhdf&lastname=dfgdhdhdfhhd";
   return this.jsonp.post('http://localhost:5061/ValuRite/ApplicationQueue.aspx',model)
   .map(res => res.json(
   ));
 }
 checkResponse() {
  return this.jsonp.get("http://localhost:5061/ValuRite/ApplicationQueue.aspx")
  .map(res => res.json(
  ));
}


  // pooooo(userdata:any)
  // {
  // //   $http({
  // //     method: 'POST',
  // //     url: 'http://localhost:5061/ValuRite/ApplicationQueue.aspx',
  // //     data1: 'username=' + rolename + '&password=' + session + '&email=' + session,
  // //     headers: {
  // //         "Content-Type": "application/x-www-form-urlencoded",
  // //         "X-Login-Ajax-call": 'true'
  // //     }
  // // }).then(function(response) {
  // //   console.log(response)
  // //     // if (response.data == 'ok') {
  // //     //     console.log('success')
  // //     // } else {
  // //     //   console.log('fail')
  // //     //     // failed
  // //     // }
  // // });
  
  // const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  // var body = {"firstname":"hhfdhdfhdf","lastname":"dfgdhdhdfhhd"};
  // // var body = JSON.stringify({"id":"name"})
  // this.http.post(
  //     "http://localhost:5061/ValuRite/ApplicationQueue.aspx",
  //     JSON.stringify(userdata),
  //     options
  // ).subscribe((data) => {
  //   console.log("ad")
  //   console.log(data)
   
  //  })
  //  window.open("http://localhost:5061/ValuRite/ApplicationQueue.aspx?","_self");
  
  // }
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('authentication', `hello`);

  
       


    // const headerDict = {
    //   'Content-Type': 'application/json'
    //   // 'Accept': 'application/json',
    //   // 'Access-Control-Allow-Headers': 'Content-Type',
    // }
    
    // const requestOptions = {                                                                                                                                                                                 
    //   headers: new Headers(headerDict), 
    // };
  //   const headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   headers.append('authentication', `hello`);

  //  const options = new RequestOptions({headers: headers});
  // var url = "http://localhost:5061/ValuRite/ApplicationQueue.aspx";
  // var body = "firstname=hhfdhdfhdf&lastname=dfgdhdhdfhhd";
  // this.http.post(url, requestOptions).subscribe((data) => {});

  // }
//   pooooo()
//   {
//   var body = "firstname=hhfdhdfhdf&lastname=dfgdhdhdfhhd";
//   // const headers = new Headers();
//   // headers.append('Content-Type', 'application/json');
//   // headers.append('authentication', `hello`);
//   // const httpOptions = {
//   //   headers: new HttpHeaders({
//   //     'Content-Type':  'application/json',
//   //     'Authorization': 'my-auth-token'
//   //   })
//   // };
//  //const options = new RequestOptions({headers: headers});
//   //var body = {u : "e"};
//   this.http.post("http://localhost:5061/ValuRite/ApplicationQueue.aspx", body).subscribe((data) => {
//     console.log("1231321113")
//   });
  // }
  
  loginpost(data: any) {
    try {
      return this.jsonp.post(this.adminconfig+ "/PwdValid", data).map(res => res.json());
    } catch (ex) {
    }
  }
  forgotpost(data: any) {
    try {
      return this.jsonp.post(this.adminconfig+ "/forgot", data).map(res => res.json());
    } catch (ex) {
    }
  }
  newuserpost(data: any) {
    try {
      return this.jsonp.post(this.adminconfig+ "/regpage", data).map(res => res.json());
    } catch (ex) {
    }
  }
  newuserinsert(data: any) {
    try {
      return this.jsonp.post(this.adminconfig+ "/newuserinsert", data).map(res => res.json()); 
    } catch (ex) {
    }
  }
  menuget() {
    try {
      sessionStorage.setItem('webConfig', this.adminconfig);
      return this.jsonp.get(this.adminconfig+ "/menu").map(res => res.json());
    } catch (ex) {
    }
  }
  updatePasswordpost(data: any) {
    try {
      return this.jsonp.post(this.adminconfig+ "/updatepassword", data).map(res => res.json());
    } catch (ex) {
    }
  }
  userLoginStatus(data: any) {
    try {
      return this.jsonp.post(this.adminconfig+ "/logout", data).map(res => res.json());
    } catch (ex) {
    }
  }
 
  /* Service Methods from Other Services */
  // Retrive-data.service.ts
  // retwatchlist(UserID, ebm, ret) {
  //   const endpoint = this.myaccountconfig + "/retrieveWatchlist?UserID=" + UserID + "&ebm=" + ebm + "&ret=" + ret;
  //   return this.jsonp.get(endpoint).map(res => res.json());
  // }
  // getwatchlist(datetime, finaloutput, UserID, Type, Synonyms) {
  //       const endpoint = this.myaccountconfig + '/Watchlist?' + "&datetime=" + datetime + "&EBMID=" + finaloutput + "&UserID=" + UserID + "&Type=" + Type + "&Synonyms=" + Synonyms;
  //       return this.jsonp.get(endpoint).map(res => res.json());
  //     }
  // From Admin Service
  private get(path: string): Observable<any> {
    return this.http.get(this.adminconfig + path).map(res => res);
  }
  private post(path: string, obj: object): Observable<any> {
    return this.http.post(this.adminconfig + path, obj).map(res => res);
  }
  getCompanyUsers(companyname: string): Observable<any> {
    return this.get('/getCompanyUsers?companyname=' + companyname);
  }
  fetchDefaultSettings(): Observable<any> {
    return this.get('/globalsettings');
  }
  // getDistinctBiomarkerTypes() : Observable<any> {
  //   return this.http.get(this.myaccountconfig+'/getDistinctBiomarkerTypes').map(res => res);
  // }
  // saveAlerts(dbObj: object) {
  //   return this.http.post(this.myaccountconfig+'/postMyAlerts', dbObj).subscribe(res => res);
  // }
  // getUserAlerts(username: string) :Observable<any> {
  //   return this.http.get(this.myaccountconfig+'/getUserAlerts?username=' + username).map(res => res);
  // }
   //Search History
  //  setsearchhistory(datetime, name, UserID, SearchType, BasicQuery, QueryName, deltrue,selectedvalues) {
  //   const endpoint = this.myaccountconfig + '/SearchHistory?' + "&datetime=" + datetime + "&name=" + name + "&UserID=" + UserID + "&SearchType=" + SearchType + "&BasicQuery=" + BasicQuery + "&QueryName=" + QueryName + "&deltrue=" + deltrue+ "&selectedvalues=" + selectedvalues;
  //   let data$ = this.http.get(endpoint).map(res => res);
  //   return data$;
  // }
  // retsearchhistory(UserID):Observable<any> {
  //   const endpoint = this.myaccountconfig + "/retrievesearchhistory?UserID=" + UserID;
  //   let data$ = this.http.get(endpoint).map(res => res);
  //   return data$;
  // }
  // Advsearchhistory(datetime, name, UserID, SearchType, AdvQuery, Query, deltrue,selectedvalues,Attrfields) {
  //   const endpoint = this.myaccountconfig + '/SearchHistory?' + "&datetime=" + datetime + "&name=" + name + "&UserID=" + UserID + "&SearchType=" + SearchType + "&AdvQuery=" + AdvQuery + "&Query=" + Query + "&deltrue=" + deltrue+ "&selectedvalues=" + selectedvalues+ "&Attrfields=" + Attrfields;
  //   let data$ = this.http.get(endpoint).map(res => res);
  //   return data$;
  // }
  // renamesearchhistory(datetime,SearchType,UserID,Queryname,alteredname){
  //   const endpoint = this.myaccountconfig + '/Updatesearchhistory?' + "&datetime=" + datetime + "&SearchType=" + SearchType + "&UserID=" + UserID + "&Queryname=" + Queryname + "&alteredname=" + alteredname;
  //   let data$ = this.http.get(endpoint).map(res => res);
  //   return data$;
  // }
  // deletehistory(UserID, deletehistory) {
  //   const endpoint = this.myaccountconfig + "/deletesearchhistory?UserID=" + UserID + "&deletehistory=" + deletehistory;
  //    let data$ = this.http.get(endpoint).map(res => res);
  //   return data$;
  // }
 
}



