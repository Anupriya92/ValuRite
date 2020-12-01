// Feature: Contains the checkboxes [ usage_statistics', 'loggedin_users', 'general_statistics', 'users_list']
// Onclick the checkbox navigates to respective section in the same page.
// The Checkbox preference can be saved
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { isNullOrUndefinedorEmptyString } from '../../../../utils/admin_isNullorUndefinedorEmptyString';
import { AdminLoginServiceService } from '../../common-services/admin-service.service';
import { Observable } from 'rxjs/Observable';
const JSAlert = require('js-alert');

declare var jQuery: any;
declare var require: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css','../../../assets/css/admin.css','../../../assets/css/bootstrap.min.css']
})

export class AdminDashboardComponent implements OnInit  {

  public recentUsageStatisticsFlag = false;
  public currentUsersFlag = false;
  public generalStatisticsFlag = false;
  public userListsFlag = false;
  private flagArray: boolean[];
  public loggedInUsersCount: number;
  private timeOutTime = 10;

  // Preference id Array
  private preferenceIdArrayToDB: string[] = [];

  // Gett the userID from the Session
  private userName = sessionStorage.getItem('UserID');

  // Functions
  isFalseEmpty = x => (isNullOrUndefinedorEmptyString(x) || x === false);
  constructor(private routes: Router, private loginService: AdminLoginServiceService) {
  }

  ngOnInit() {
    // Db call to get the currently logged in users
    this.loginService.getLoggedInUsers().subscribe(res => {
      let count = 0;
      for (const response of res) {
        ++count;
      }
      this.loggedInUsersCount = count;
    });

    window.scrollTo(0, 0);
    // Scroll Function for the #return-to-top arrow
    $(window).scroll(() => {
      if ($(window).scrollTop() >= 50) {        // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(200);    // Fade in the arrow
      } else {
        $('#return-to-top').fadeOut(200); 
       // Else fade out the arrow
      }
    });
    $('#return-to-top').click(() => {      // When arrow is clicked
      $('body,html').animate({
        scrollTop: 0                       // Scroll to top of body
      }, 500);
    });

    // Mapping Preferences from DB to ngModel Variables
    const preferenceMap = {
      'usage_statistics': () => { this.recentUsageStatisticsFlag = true; },
      'loggedin_users': () => { this.currentUsersFlag = true; },
      'general_statistics': () => { this.generalStatisticsFlag = true; },
      'users_list': () => { this.userListsFlag = true; }
    };

    // Call FetchPreferenceFromDB function here
    this.fetchPreferencesFromDB().subscribe(preferencesFromDB => {
      if (!(preferencesFromDB.length === 0)) {
        for (const preferenceArray of preferencesFromDB) {
          for (const preference of preferenceArray.preference_id) {
            preferenceMap[preference]();
          }
        }
      } else {
        this.recentUsageStatisticsFlag = true;
        this.generalStatisticsFlag = true;
        this.currentUsersFlag = false;
        this.userListsFlag = false;
      }
    });
  }

  // Function To fetch Preferences from DB
  fetchPreferencesFromDB(): Observable<any> {
    return this.loginService.getPreferences(this.userName);
  }

  // SetTimeout to Scroll
  setTimeOutAndScrollToDiv(divId: string, time: number) {
    // Using template literal and property accessor using bracket notation.
    this[`${divId}Flag`] = !this[`${divId}Flag`];
    if (this[`${divId}Flag`]) {
      // Giving Time for ngIf to show the div
      setTimeout(() => {
        const id = document.getElementById(divId);
        id.scrollIntoView({ behavior: 'smooth' });
      }, time);
    }

  }

  // Functions for CheckBoxes (On Click and if Checked Scroll down to their divs)
  // On click of Recent Statistics Check Box
  scrollToRecentStatistics() {
    this.setTimeOutAndScrollToDiv('recentUsageStatistics', 50);
  }

  // On click of Current Users Check Box
  scrollToCurrentUsers() {
    this.setTimeOutAndScrollToDiv('currentUsers', 225);
  }

  // On click of General Statistics Check Box
  scrollToGeneralStactistics() {
    this.setTimeOutAndScrollToDiv('generalStatistics', this.timeOutTime);
  }

  // On click of User List Check Box
  scrollToUsersList() {
    this.setTimeOutAndScrollToDiv('userLists', this.timeOutTime);
  }

  // Function for Logged in Users button Click
  onButtonClickCurrentUsers() {
    this.currentUsersFlag = false; // This will be nullified in the next fn call
    this.setTimeOutAndScrollToDiv('currentUsers', 225);
  }

  // Function to Save the preferences to DB - Values of the checkboxes
  savePreferences() {
    this.flagArray = [this.recentUsageStatisticsFlag, this.currentUsersFlag, this.generalStatisticsFlag, this.userListsFlag];
    if (this.flagArray.every(this.isFalseEmpty)) {
      JSAlert.alert('Please Select atleast one option');
      return;
    } else {
      // Convert CheckBoxFlags to relevant array values for DB
      this.preferenceIdArrayToDB = ['usage_statistics', 'loggedin_users', 'general_statistics', 'users_list']
        .filter((x, i) => this.flagArray[i]);
      // Object to be sent to DB
      const prefernceArrayObj = {
        userName: this.userName,
        preferenceId: this.preferenceIdArrayToDB
      };
      this.loginService.updatePreferences(prefernceArrayObj);
      JSAlert.alert('Saved Your Preferences');
    }
  }
}
