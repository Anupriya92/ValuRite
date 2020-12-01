import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminResetPasswordComponent } from './admin-reset-password/admin-reset-password.component';
import { AdminUpdateUserComponent } from './admin-update-user/admin-update-user.component';
//import { AdminMyprofileComponent } from './admin-myprofile/adminmyprofile.component';
import { CommonModule } from '@angular/common'; 
import { NgxPaginationModule } from 'ngx-pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
// import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { SelectModule } from 'ng2-select';
import { NgPipesModule } from 'ngx-pipes';
import { UpdateUserAccountComponent } from './update-user-account/update-user-account.component';
import { PopoverModule } from 'ngx-popover';

@NgModule({
  declarations: [ AdminResetPasswordComponent, AdminUpdateUserComponent, UpdateUserAccountComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgMultiSelectDropDownModule,
    MultiselectDropdownModule,
    SelectModule,
    NgPipesModule,
    PopoverModule,
    RouterModule.forChild([
   //   { path: '', component: HomeComponent}
   { path: 'resetpassword', component: AdminResetPasswordComponent},
   { path: 'updateuser', component: AdminUpdateUserComponent},
   { path: 'updateuseraccount', component: UpdateUserAccountComponent}
  // { path: 'myprofile', component: AdminMyprofileComponent},
    ]),
    NgxPaginationModule
  ]
 // ,exports: [HomeComponent]
})
export class AdminupdateModule {

}
