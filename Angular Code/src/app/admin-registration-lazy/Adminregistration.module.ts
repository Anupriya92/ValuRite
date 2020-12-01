import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRegisterCompanyComponent } from './admin-registerCompany/adminregistercompany.component';
import { AdminCompanyUpdationComponent } from './admin-company-updation/admincompany-updation';
import { SelectModule } from 'ng2-select';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AdminRegisterCompanyComponent, AdminCompanyUpdationComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SelectModule,
    CommonModule,
    RouterModule.forChild([
     // { path: '', component: HomeComponent}
     { path: 'companyregistration', component: AdminRegisterCompanyComponent},
     { path: 'companyupdation', component: AdminCompanyUpdationComponent}
    ])
  ]
 // ,exports: [HomeComponent]
})
export class AdminregistrationModule {

}
