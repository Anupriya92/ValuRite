import {NgModule} from '@angular/core';
//import {RouterModule} from '@angular/router';
import { AdminSortTableComponent } from './admin-sort-table/admin-sort-table.component';
import { CommonModule } from '@angular/common'; 
import { adminKeysPipe } from '../common-pipes/admin-sort-table.pipe';
//import { CommonModule } from '@angular/common'; 
//import { FormsModule } from '@angular/forms';
//import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminSortTableComponent, adminKeysPipe],
  imports: [
  //  CommonModule,
   // FormsModule,
    //ReactiveFormsModule,
    CommonModule,
   // RouterModule.forChild([
      //{ path: '', component: HomeComponent}
    //]),
  ]
 ,exports: [AdminSortTableComponent, adminKeysPipe]
})
export class AdmintableModule {

}
