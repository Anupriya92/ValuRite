
import { MenuService } from './common-services/menu.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router'
import * as $ from 'jquery';


@Injectable()
export class UserGuard implements CanActivate {
  constructor(private user:MenuService, private route:Router){}

  // canActivate(

    



  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   return this.user.getisuserloggedin();
  // }


  canActivate() {
    //this.user.setisuserloggedin();
    console.log("OnlyLoggedInUsers");
    if (this.user.getisuserloggedin()) { 
      return true;
    } else {
     // window.alert("You don't have permission to view this page"); 
     //sessionStorage.setItem("val", "1");
     sessionStorage.setItem("val", "");
     sessionStorage.setItem("name", "");
    //  $('#totalcontent').css('display', 'block');
    //  $('#rootpagecontent').css('display', 'none');
      //this.route.navigate(['originalmain']);
      return false;
    }
  }




}
