import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable  } from 'rxjs/Observable';
import { MenuService } from './common-services/menu.service';
import {Router} from '@angular/router'
//import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


// export interface CanComponentDeactivate {
//   canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
// }

@Injectable()
export class NotuserGuard implements CanActivate{    //CanDeactivate<CanComponentDeactivate> 
  
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   return true;
  // }
  constructor(private user:MenuService, private route:Router){}
  canActivate() {
    if (this.user.getisuserloggedin()) { 
      //this.route.navigate(['/home']);
      this.route.navigate(['']);
      return false;
    } else {
     // window.alert("You don't have permission to view this page"); 
     //sessionStorage.setItem("val", "1");
     //sessionStorage.setItem("name", "");
    
      return true;
    }
  }
  // canDeactivate(component: CanComponentDeactivate) {
  //   alert();
  //   return component.canDeactivate ? component.canDeactivate() : true;
  // }
}
