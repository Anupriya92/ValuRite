import { AppComponent } from './app.component';
import { NgPipesModule } from 'ngx-pipes';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes, RouterLink } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CommonModule } from '@angular/common';
import { UserGuard } from './user.guard';
import { NotuserGuard } from './notuser.guard';
import { ConfigService } from './config';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonservicesModule } from './common-services/Commonservices.module';
import { NgModule, PipeTransform } from '@angular/core';
//import {TransferHttpCacheModule} from '@nguniversal/common';
import { LoaderComponent } from './loader/loader.component';
import { PageloadModule } from './pageload-lazy/Pageload.module';


@NgModule({
  declarations: [AppComponent, LoaderComponent],
  imports: [
    HttpModule,
    HttpClientModule,
    PageloadModule,
    CommonservicesModule,
    Ng4LoadingSpinnerModule.forRoot(),
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    RouterModule.forRoot([
      { path: 'User', loadChildren: './user-landing-lazy/Userlanding.module#UserlandingModule' },
      {
        path: 'loader',
        canActivate: [UserGuard],
        component: LoaderComponent
      },
      { path: 'Settings', canActivate: [UserGuard], loadChildren: './admin-settings-lazy/Adminsettings.module#AdminsettingsModule' },
      { path: 'Admin', canActivate: [UserGuard], loadChildren: './admin-dashboard-lazy/Admindashboard.module#AdmindashboardModule' },
      { path: 'Company', canActivate: [UserGuard], loadChildren: './admin-registration-lazy/Adminregistration.module#AdminregistrationModule' },
      { path: 'UserRequest', canActivate: [UserGuard], loadChildren: './admin-update-lazy/Adminupdate.module#AdminupdateModule' },
      { path: 'UserCreation', canActivate: [UserGuard], loadChildren: './admin-user-lazy/Adminuser.module#AdminuserModule' },
      // { path: 'Analytic', canActivate: [UserGuard], loadChildren: './user-analytic-lazy/Useranalytics.module#UseranalyticsModule' },
      // { path: 'SearchResult', canActivate: [UserGuard], loadChildren: './user-searchresult-lazy/Usersearchresult.module#UsersearchresultModule' },
      // { path: 'Detail', canActivate: [UserGuard], loadChildren: './user-superreport-lazy/Usersuperreport.module#UsersuperreportModule' },
      // { path: 'Account', canActivate: [UserGuard], loadChildren: './user-profile-lazy/Userprofile.module#UserprofileModule' },
      // { path: 'Report', canActivate: [UserGuard], loadChildren: './user-report-lazy/Userreport.module#UserreportModule' },
      // { path: 'SelectedReport', canActivate: [UserGuard], loadChildren: './user-selectedreport-lazy/Userselectedreport.module#UserselectedreportModule' },
      // { path: 'Search', canActivate: [UserGuard], loadChildren: './user-search-lazy/Usersearch.module#UsersearchModule' },
      // { path: 'Visualization', canActivate: [UserGuard], loadChildren: './user-treeview-lazy/Usertreeview.module#UsertreeviewModule' },
      // { path: 'Statistic', canActivate: [UserGuard], loadChildren: './user-statistic-lazy/Userstatistic.module#UserstatisticModule' },
      // { path: 'newuserinsert', loadChildren: './user-manualregistration-lazy/Usermanualregistration.module#UsermanualregistrationModule' },
      // { path: 'elasticData', loadChildren: './user-elastic-lazy/Userelastic.module#UserelasticModule' }
    ]),
    FormsModule,
    ReactiveFormsModule,
    NgPipesModule,
    //TransferHttpCacheModule
  ],
  exports: [RouterModule],
  providers: [
    ConfigService,
    NotuserGuard,
    UserGuard//,
    //{ provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]//,
  //entryComponents: [RowChartComponent]
})
export class AppModule { }
