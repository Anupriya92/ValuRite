import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginPageComponent } from './login-page/login-page.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NewUserComponent } from './new-user/new-user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import { FeedbackComponent } from './feedback/feedback.component';
import { ContentPopupComponent } from './content-popup/content-popup.component';
import { MasterpageheaderComponent } from './masterpageheader/masterpageheader.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { CommonModule } from '@angular/common';
import { CommonpipesModule } from '../common-pipes/Commonpipes.module';
import { HomePageComponent} from './home-page/home-page.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { PricingComponent } from './pricing/pricing.component';
import { FaqsComponent } from './faqs/faqs.component';
import { ContactComponent } from './contact/contact.component';
import { PagefeedbackComponent } from './pagefeedback/pagefeedback.component';


@NgModule({
  declarations: [LoginPageComponent,
    LoginComponent,
  ResetPasswordComponent,
  NewUserComponent,
  ForgotPasswordComponent,
  FeedbackComponent,
  ContentPopupComponent,
  MainpageComponent,
  MasterpageheaderComponent,
  HomePageComponent,
  AboutusComponent, 
  PricingComponent, 
  FaqsComponent, 
  ContactComponent,
  PagefeedbackComponent
],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    CommonpipesModule,
    RouterModule.forChild([
      { path: '', component: HomePageComponent},
      { path: 'aboutus', component: AboutusComponent},
      { path: 'faqs', component: FaqsComponent},
      { path: 'pricing', component: PricingComponent},
      { path: 'contact', component: ContactComponent},
      { path: 'feedback', component: PagefeedbackComponent}
      // { path: 'login', component: LoginPageComponent},

    ])
  ],
  exports: [NewUserComponent, ResetPasswordComponent,MainpageComponent,LoginPageComponent, LoginComponent,MasterpageheaderComponent, ForgotPasswordComponent, FeedbackComponent, ContentPopupComponent]
  // exports: []
})
export class PageloadModule {

}
