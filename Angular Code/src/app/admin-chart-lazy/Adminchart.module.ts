import {NgModule} from '@angular/core';
import { AdminStackBarComponent } from './admin-stack-bar/admin-stack-bar.component';
import { AdminBarchartComponent } from './admin-barchart/adminbarchart.component';
import { CommonModule } from '@angular/common'; 

//import { FormsModule } from '@angular/forms';
//import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminStackBarComponent, AdminBarchartComponent],
  imports: [
   // FormsModule,
    //ReactiveFormsModule,
    CommonModule,
  ]
 ,exports: [AdminStackBarComponent, AdminBarchartComponent]
})
export class AdminchartModule {
//console
}
