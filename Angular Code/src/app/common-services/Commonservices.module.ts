import {NgModule} from '@angular/core';
// import { ElasticService } from './elastic.service';
import { RetrieveDataService } from './retrieve-data.service';
import { AdminLoginServiceService } from './admin-service.service';
import { MenuService } from './menu.service';
import { DetailsearchService } from './detailsearch.service';
import { GlobalVariableService } from './global-variable.service';

@NgModule({
  providers: [
    MenuService,
    GlobalVariableService,
    RetrieveDataService,
    DetailsearchService,
    // ElasticService,
    AdminLoginServiceService
          ],
})
export class CommonservicesModule {

}
