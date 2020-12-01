import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class ConfigService {
  public config: any;
  constructor(private http: Http) {
   
    this.config = this.loadJSON('./assets/config.json')
    //this.config = this.loadJSON('/config.json')
    console.log(this.config);
    console.log("configts")
  }

  // reportnode() {
  //   if (this.config.production == "local") {
  //     return this.config.localreport;
  //   }
  //   else if (this.config.production == "49") {
  //     return this.config.url49report;
  //   }
  //   else if (this.config.production == "uat") {
  //     return this.config.uaturlreport;
  //   }
  //   else if (this.config.production == "prod") {
  //     return this.config.produrlreport;
  //   }
  // }
  // analyticnode() {
  //   if (this.config.production == "local") {
  //     return this.config.localanalytic;
  //   }
  //   else if (this.config.production == "49") {
  //     return this.config.url49analytic;
  //   }
  //   else if (this.config.production == "uat") {
  //     return this.config.uaturlanalytic;
  //   }
  //   else if (this.config.production == "prod") {
  //     return this.config.produrlanalytic;
  //   }
  // }
  // searchnode() {
  //   if (this.config.production == "local") {
  //     return this.config.localsearch;
  //   }
  //   else if (this.config.production == "49") {
  //     return this.config.url49search;
  //   }
  //   else if (this.config.production == "uat") {
  //     return this.config.uaturlsearch;
  //   }
  //   else if (this.config.production == "prod") {
  //     return this.config.produrlsearch;
  //   }
  // }
  // myaccountnode() {
  //   if (this.config.production == "local") {
  //     return this.config.localmyaccount;
  //   }
  //   else if (this.config.production == "49") {
  //     return this.config.url49myaccount;
  //   }
  //   else if (this.config.production == "uat") {
  //     return this.config.uaturlmyaccount;
  //   }
  //   else if (this.config.production == "prod") {
  //     return this.config.produrlmyaccount;
  //   }
  // }
  adminnode() {
    if (this.config.production == "local") {
      return this.config.localadmin;
    }
    else if (this.config.production == "49") {
      return this.config.url49admin;
    }
    else if (this.config.production == "uat") {
      return this.config.uaturladmin;
    }
    else if (this.config.production == "prod") {
      return this.config.produrladmin;
    }
  }
  menuandhomenode() {
    if (this.config.production == "local") {
      return this.config.localmenuandhome;
    }
    else if (this.config.production == "49") {
      return this.config.url49menuandhome;
    }
    else if (this.config.production == "uat") {
      return this.config.uaturlmenuandhome;
    }
    else if (this.config.production == "prod") {
      return this.config.produrlmenuandhome;
    }
  }

  // elasticPath() {
  //   if (this.config.production == "local") {
  //     return this.config.localEsurl;
  //   }
  //   else if (this.config.production == "49") {
  //     return this.config.Esurl49;
  //   }
  //   else if (this.config.production == "uat") {
  //     return this.config.uatEsurl;
  //   }
  //   else if (this.config.production == "prod") {
  //     return this.config.prodEsurl;
  //   }
  // }

  // HelpFilesURL() {
  //   if (this.config.production == "local") {
  //     return this.config.localHelpFilesUrl;
  //   }
  //   else if (this.config.production == "49") {
  //     return this.config.HelpFilesUrl49;
  //   }
  //   else if (this.config.production == "uat") {
  //     return this.config.uatHelpFilesurl;
  //   }
  //   else if (this.config.production == "prod") {
  //     return this.config.prodHelpFilesurl;
  //   }
  // }

  // HeatMapFilesURL() {
  //   if (this.config.production == "local") {
  //     return this.config.localHeatMapFilesUrl;
  //   }
  //   else if (this.config.production == "49") {
  //     return this.config.HeatMapFilesUrl49;
  //   }
  //   else if (this.config.production == "uat") {
  //     return this.config.uatHeatMapFilesurl;
  //   }
  //   else if (this.config.production == "prod") {
  //     return this.config.prodHeatMapFilesurl;
  //   }
  // }

  // VariantFilesURL() {
  //   if (this.config.production == "local") {
  //     return this.config.localVariantFilesUrl;
  //   }
  //   else if (this.config.production == "49") {
  //     return this.config.VariantFilestUrl49;
  //   }
  //   else if (this.config.production == "uat") {
  //     return this.config.uatVariantFilesurl;
  //   }
  //   else if (this.config.production == "prod") {
  //     return this.config.prodVariantFilesurl;
  //   }
  // }

  ExportURL() {
    if (this.config.production == "local") {
      return this.config.localExportUrl;
    }
    else if (this.config.production == "49") {
      return this.config.ExportUrl49;
    }
    else if (this.config.production == "uat") {
      return this.config.uatExporturl;
    }
    else if (this.config.production == "prod") {
      return this.config.prodExporturl;
    }
  }

  valuRiteURL() {
    if (this.config.production == "local") {
      return this.config.locallanding;
    }
    else if (this.config.production == "49") {
      return this.config.landingurl49;
    }
  }

  loadJSON(filePath) {
    const json = this.loadTextFileAjaxSync(filePath, "application/json")
    return JSON.parse(json);
  }
  loadTextFileAjaxSync(filePath, mimeType) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    if (mimeType != null) {
      if (xmlhttp.overrideMimeType) {
        xmlhttp.overrideMimeType(mimeType);
      }
    }
    xmlhttp.send();
    if (xmlhttp.status == 200) {
      return xmlhttp.responseText;
    }
    else {
      return null;
    }
  }
}