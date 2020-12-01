// Feature : To get the currently login user details and to display in the datatable
import { Component, OnInit } from '@angular/core';
import { AdminLoginServiceService } from '../../common-services/admin-service.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { customIsNullOrUndefined } from '../../../../utils/admin_isNullorUndefinedorEmptyString';

@Component({
  selector: 'app-admincurrentusers',
  templateUrl: './admincurrentusers.component.html',
  styleUrls: ['./admincurrentusers.component.css','../../../assets/css/admin.css','../../../assets/css/bootstrap.min.css']
})
export class AdminCurrentusersComponent implements OnInit {

  private loggedInUsersData: object[] = [];
  public jsonData: object;
  public sortTableFlag: boolean;

  // ngIf Flag
  public errorMsgFlag = false;
  constructor(private http: Http, private loginService: AdminLoginServiceService) { }

  ngOnInit() {

    // Fetch the user log details from DB
    this.getLoggedInUsers().subscribe(res => {
      if (!this.emptyResponseValidation(res)) {
        for (const response of res) {
          const obj: object = {};
          obj['User Name'] = response.email;
          const myDate = new Date(response.login);
          obj['Logged-In Time'] = myDate.toLocaleString();
          obj['Company Name'] = response.company;
          obj['User Type'] = response.rolename;
          obj['Access Count'] = response.count;
          // Response data is pushed in an array (as JSON)
          this.loggedInUsersData.push(obj);
        }
        // Passing the JSON object into the Datatable
        this.jsonData = {
          tablesetting:
            {
              checkbox: false,
              exportflag: false
            },
          columndef:
            [],
          rowData: this.loggedInUsersData,
          id: 'loggedInUsersSortTable'
        };
        this.sortTableFlag = true;
        this.errorMsgFlag = false;
      }
    });
  }

  // Empty Response Validation
  emptyResponseValidation(response): boolean {
    if (customIsNullOrUndefined(response) || response.length === 0) {
      this.errorMsgFlag = true;
      this.sortTableFlag = false;
      return true;
    } else {
      return false;
    }
  }
 
  getLoggedInUsers(): Observable<any> {
    return this.loginService.getLoggedInUsers();
  }
}
