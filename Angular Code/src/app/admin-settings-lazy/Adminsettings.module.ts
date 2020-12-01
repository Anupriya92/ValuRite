import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminGobiomsettingComponent } from './admin-gobiomsetting/admingobiomsetting.component';
import { CommonModule } from '@angular/common'; 
import { NgxPaginationModule } from 'ngx-pagination';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  declarations: [AdminGobiomsettingComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule,
    NgPipesModule,
    RouterModule.forChild([
   { path: 'gobiom_settings', component: AdminGobiomsettingComponent }
    ])
  ]
 // ,exports: [HomeComponent]
})
export class AdminsettingsModule {

}
