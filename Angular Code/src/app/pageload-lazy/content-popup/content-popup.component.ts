/**This components is used to show terms of use , privacy policy content into popup */
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminLoginServiceService } from '../../common-services/admin-service.service';
declare var jQuery: any;
const $ = require('jquery');
@Component({
  selector: 'app-content-popup',
  templateUrl: './content-popup.component.html',
  styleUrls: ['./content-popup.component.css']
})
export class ContentPopupComponent implements OnInit {
  @Output() childEvent = new EventEmitter<string>();
  //this is for the request from child to parent.
  //close the popup from parent component.
  callParent(data: any) {
    this.childEvent.next(data);
  }

  constructor() { }
  @Input() type: any;

  ngOnChanges() {
    //load the html file into this component div.
    if(this.type == "privacypolicy" || this.type == "termsofuse")
    {
      document.getElementById("termsandprivacycontent").innerHTML = "";
      $.get('assets/Subscription/'+this.type+'.txt', function (data) {
        var responsedata = data;
        document.getElementById("myModalfooter").style.overflow = "hidden";        
        document.getElementById("termsandprivacycontent").innerHTML = responsedata;
      });
    }
  }

  ngOnInit() {
 
  }
}
