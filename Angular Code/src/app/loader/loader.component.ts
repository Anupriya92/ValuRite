import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
      //we are using this component for page refresh.
      //once coming to this page its automatically redirect to previous page.
      window.history.go(-1);
  }

}
