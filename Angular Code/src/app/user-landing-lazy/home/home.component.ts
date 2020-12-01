/**this is the user landing page. this will show indication wise statistic counts and therapeutic counts. */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RetrieveDataService } from '../../common-services/retrieve-data.service';
import { Observable } from 'rxjs/Observable';
import * as $ from "jquery";
var WowJS = require("../../../assets/js/wow.min.js")
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','../../../assets/NewDesign_Materials/css/style.css',
'../../../assets/css/bootstrap.min.css']
})
export class HomeComponent implements OnInit {
  loggedIn: boolean = false;

  Jsondata1: any;
  data;
  landing = "";
  //public slider = [];
  public sliders = [];
  public count = {};
  public radiocheck = null;
  stopCondition = false;
  constructor(private route: ActivatedRoute, private retrieveData: RetrieveDataService) {
    var i = 0;
    //this is for slider event every three seconds one time changing the values in UI.
    Observable.interval(3000)
    .takeWhile(() => !this.stopCondition)
    .subscribe((val) => { 
      if(this.sliders.length > 0)
      {
        this.count = this.sliders[i];
        this.radiocheck = i;
        i++;
      }
      if(this.sliders.length == i)
      {
        i=0;
      }
    })
  }
  //if you click the slider button then automatically stop the sliders.
  radiocheckbox(data: any)
  {
    this.stopCondition = true;
    this.radiocheck = data;
    this.count = this.sliders[data];
  }

  ngOnInit() {
    $(document).ready(function () {
      //click on home page search, analtic icons it will show the submenus in popup
      $("#icon1").on('click', function () {
        $('#le-alert1').addClass('in');
        $('#le-alert2').removeClass('in');
        $('#le-alert3').removeClass('in');
        $('#le-alert4').removeClass('in');
        $(this).addClass('active');
        $("#icon2").removeClass('active');
        $("#icon3").removeClass('active');
        $("#icon4").removeClass('active');
        $(".icontext").removeClass('in');
      });

      $("#icon2").click(function () {
        $('#le-alert2').addClass('in');
        $('#le-alert1').removeClass('in');
        $('#le-alert3').removeClass('in');
        $('#le-alert4').removeClass('in');
        $(this).toggleClass('active');
        $("#icon1").removeClass('active');
        $("#icon3").removeClass('active');
        $("#icon4").removeClass('active');
        $(".icontext").removeClass('in');
      });

      $("#icon3").click(function () {
        $('#le-alert3').addClass('in');
        $('#le-alert2').removeClass('in');
        $('#le-alert1').removeClass('in');
        $('#le-alert4').removeClass('in');
        $(this).toggleClass('active');
        $("#icon1").removeClass('active');
        $("#icon2").removeClass('active');
        $("#icon4").removeClass('active');
        $(".icontext").removeClass('in');
      });

      $("#icon4").click(function () {
        $('#le-alert4').addClass('in');
        $('#le-alert2').removeClass('in');
        $('#le-alert3').removeClass('in');
        $('#le-alert1').removeClass('in');
        $(this).toggleClass('active');
        $("#icon1").removeClass('active');
        $("#icon2").removeClass('active');
        $("#icon3").removeClass('active');
        $(".icontext").removeClass('in');
      });

      $('.close').click(function () {
        $(".alert").removeClass('in'); // hides alert with Bootstrap CSS3 implem
        $(".icon").removeClass('active'); // hides alert with Bootstrap CSS3 implem
        $(".icontext").addClass('in'); // hides alert with Bootstrap CSS3 implem
      });
     
    })
    //click on icons it will add the in(css class) class for active icons
    window.onclick = function (event) {
      if ($(event.target).attr('class') != "icon" && $(event.target).attr('class') != "icon active") {
        $(".alert").removeClass('in'); // hides alert with Bootstrap CSS3 implem
        $(".icon").removeClass('active'); // hides alert with Bootstrap CSS3 implem
        $(".icontext").addClass('in'); // hides alert with Bootstrap CSS3 implem
      }
    }
    let model = this.route.snapshot.params.ebmId;
    let textar = this.route.snapshot.params.refId;
    //get the landing page related information fetch from db and store in session 
    if(sessionStorage.getItem('landingCounts') == undefined || sessionStorage.getItem('landingCounts') == "" || sessionStorage.getItem('landingCounts') == null)
    {
    this.retrieveData.getLandingPageData(model, textar).subscribe(res => {
      sessionStorage.setItem('landingCounts',JSON.stringify(res));
      this.data = JSON.parse(sessionStorage.getItem('landingCounts'));
      this.landing = this.data[0];
      this.sliders = this.data[1];
      //new WowJS.WOW().init();
    });
  }else 
  {
    this.data = JSON.parse(sessionStorage.getItem('landingCounts'));
    this.landing = this.data[0];
    this.sliders = this.data[1];
  }

  $(".dashboard").on('click', function (e){
      let a=e.target.id 
      sessionStorage.setItem("landingpage", a); 
    })
  }

}
 
