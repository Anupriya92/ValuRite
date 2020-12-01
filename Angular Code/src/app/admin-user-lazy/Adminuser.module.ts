import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminBulkuserComponent } from './admin-bulkuser/adminbulkuser.component';
import { AdminSingleuserComponent } from './admin-singleuser/adminsingleuser.component';
import { AdminUserlogComponent } from './admin-userlog/adminuserlog.component';
import { AdminUserapprovalComponent } from './admin-userapproval/adminuserapproval.component';
import { CommonModule } from '@angular/common'; 
import { AdmintableModule } from '../admin-table-lazy/Admintable.module';
import { PopoverModule } from 'ngx-popover';
import { NgxPaginationModule } from 'ngx-pagination';
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
// import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { SelectModule } from 'ng2-select';
import { NgPipesModule } from 'ngx-pipes';


@NgModule({
  declarations: [AdminBulkuserComponent, AdminSingleuserComponent, AdminUserlogComponent, AdminUserapprovalComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AdmintableModule,
    SelectModule,
    PopoverModule,
    NgPipesModule,
    RouterModule.forChild([
     { path: 'userlogs', component: AdminUserlogComponent},
     { path: 'bulkuser', component: AdminBulkuserComponent},
     { path: 'singleuser', component: AdminSingleuserComponent},
     { path: 'userapproval', component: AdminUserapprovalComponent}
    ]),
    NgxPaginationModule
  ]
 // ,exports: [HomeComponent]
})
export class AdminuserModule {

}
