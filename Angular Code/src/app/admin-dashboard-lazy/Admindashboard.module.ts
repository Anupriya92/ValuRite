import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminDashboardComponent } from './admin-dashboard/admindashboard.component';
import { AdminRecentUsageComponent } from './admin-recentusage/adminrecentusage.component';
import { AdminUserlistComponent } from './admin-userlist/adminuserlist.component';
import { AdminCurrentusersComponent } from './admin-currentusers/admincurrentusers.component';
import { AdminGeneralstatisticsComponent } from './admin-generalstatistics/admingeneralstatistics.component';


import { AdminchartModule } from '../admin-chart-lazy/Adminchart.module';
import { AdmintableModule } from '../admin-table-lazy/Admintable.module';
//import { UserGuard } from '../user.guard';
import { CommonModule } from '@angular/common'; 
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
// import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { SelectModule } from 'ng2-select';

@NgModule({
  declarations: [AdminDashboardComponent, AdminRecentUsageComponent, AdminUserlistComponent, AdminCurrentusersComponent, AdminGeneralstatisticsComponent],
  //providers: [UserGuard],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AdminchartModule,
    AdmintableModule,
    NgMultiSelectDropDownModule,
    MultiselectDropdownModule,
    SelectModule,
    RouterModule.forChild([
     // { path: '', component: HomeComponent}
     { path: 'dashboard', component: AdminDashboardComponent }
    ])
  ]
 // ,exports: [HomeComponent]
})
export class AdmindashboardModule {

}
