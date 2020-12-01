//import {NgModule} from '@angular/core';
import { NgModule, PipeTransform } from '@angular/core';
import { NgPipesModule } from 'ngx-pipes';
//import { NgPipesModule } from 'ngx-pipes';
//import {RouterModule} from '@angular/router';
//import { CommonModule } from '@angular/common'; 
//import { FormsModule } from '@angular/forms';
//import { ReactiveFormsModule } from '@angular/forms';


//import { adminKeysPipe } from './admin-sort-table.pipe';
import { FilterPipe } from './customFilter.pipe';
import { ConditionPipe } from './customcondition.pipe';
// import { AdvancedFilterPipe } from './advancedsearchFilter.pipe';
// import { AdvancedPipe } from './advancedsearchcustom.pipe';
import { KeysPipe } from './sort-table.pipe';
import { TextToLinkPipe } from './text-to-link.pipe';
import { HighlightSearch } from './highlight-search.pipe';

//import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  declarations: [
    //adminKeysPipe,
    FilterPipe,
    ConditionPipe,
    // AdvancedFilterPipe,
    // AdvancedPipe,
    KeysPipe,
    TextToLinkPipe,
    HighlightSearch//,
    //NgPipesModule
  ],
  
  imports: [
    //NgPipesModule
  //   CommonModule,
  //   FormsModule,
  //  ReactiveFormsModule,
  //   RouterModule.forChild([
  //     { path: '', component: HomeComponent}
  //   ]),
 ],
// imports: [adminKeysPipe,
//   FilterPipe,
//   ConditionPipe,
//   AdvancedFilterPipe,
//   AdvancedPipe,
//   KeysPipe,
//   TextToLinkPipe,
//   HighlightSearch],
  exports: [
    //adminKeysPipe,
    FilterPipe,
    ConditionPipe,
    // AdvancedFilterPipe,
    // AdvancedPipe,
    KeysPipe,
    TextToLinkPipe,
    HighlightSearch//,
    //NgPipesModule
  ]
})
export class CommonpipesModule {

}
