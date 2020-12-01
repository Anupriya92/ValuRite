import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common'; 

@NgModule({
  declarations: [HomeComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([
      {path: 'home', component: HomeComponent}
     
    ])
  ]
 // ,exports: [HomeComponent]
})
export class UserlandingModule {

}
