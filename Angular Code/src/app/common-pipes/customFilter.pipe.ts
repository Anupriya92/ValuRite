import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], query: string, filterby: string, searchcriteria: string, clinical?: boolean, preclinical?: boolean, exploratory?: boolean, safety?: boolean, heatmap?: boolean): any[] {
    if (!items) return [];
    var dataexists = false;
    if (query == "*") {
      query = "";
    }
    var symbol = "";
    let cond = false;
    let cond1 = false;
    //debugger
    if (searchcriteria == "contains") {
      symbol = "";
    }
    else {
      symbol = "^";
    }
    // if(filterby.includes("biomarker"))
    // {
    //   cond = (clinical==false && preclinical == true)
    // }
    // else if(filterby.includes("drug"))
    // {
    //   cond1 =safety;
    // }
    query = query.toLowerCase();

    query = query.replace("(", "_")
    query = query.replace(")", "_")
    query = query.replace(".", "_")
    items = items.filter(it => {
      if (typeof it["_source"][filterby] === "number") {
        if (clinical && preclinical && exploratory) {
          return (it["_source"][filterby] === query) && (it["_source"]["biomarker status"].toLowerCase() == "clinical" || it["_source"]["biomarker status"].toLowerCase() == "preclinical" || it["_source"]["biomarker status"].toLowerCase() == "exploratory");
        }
        else if (clinical && preclinical) {
          return (it["_source"][filterby] === query) && (it["_source"]["biomarker status"].toLowerCase() == "clinical" || it["_source"]["biomarker status"].toLowerCase() == "preclinical");
        }
        else if (clinical && exploratory) {
          return (it["_source"][filterby] === query) && (it["_source"]["biomarker status"].toLowerCase() == "clinical" || it["_source"]["biomarker status"].toLowerCase() == "exploratory");
        }
        else if (preclinical && exploratory) {
          return (it["_source"][filterby] === query) && (it["_source"]["biomarker status"].toLowerCase() == "preclinical" || it["_source"]["biomarker status"].toLowerCase() == "exploratory");
        }
        else if (clinical) {
          return (it["_source"][filterby] === query) && it["_source"]["biomarker status"].toLowerCase() == "preclinical";
        }
        else if (preclinical) {
          return (it["_source"][filterby] === query) && it["_source"]["biomarker status"].toLowerCase() == "preclinical";
        }
        else if (exploratory) {
          return (it["_source"][filterby] === query) && it["_source"]["biomarker status"].toLowerCase() == "exploratory";
        }
      }
      else if (typeof it["_source"][filterby] === "string") {
        var patt = new RegExp(symbol + query);
        var result = patt.test(it["_source"][filterby].toLowerCase().replace("(", "_").replace(")", "_").replace(".", "_"));
        
        if (clinical && preclinical && exploratory) {
          return (result && (it["_source"]["biomarker status"].toLowerCase() == "clinical" || it["_source"]["biomarker status"].toLowerCase() == "preclinical" || it["_source"]["biomarker status"].toLowerCase() == "exploratory"));
        }
        else if (clinical && preclinical) {
          return (result && (it["_source"]["biomarker status"].toLowerCase() == "clinical" || it["_source"]["biomarker status"].toLowerCase() == "preclinical"));
        }
        else if (clinical && exploratory) {
          return (result && (it["_source"]["biomarker status"].toLowerCase() == "clinical" || it["_source"]["biomarker status"].toLowerCase() == "exploratory"));
        }
        if (preclinical && exploratory) {
          return (result && (it["_source"]["biomarker status"].toLowerCase() == "preclinical" || it["_source"]["biomarker status"].toLowerCase() == "exploratory"));
        }

        else if (clinical) {
          return (result && it["_source"]["biomarker status"].toLowerCase() == "clinical");
        }
        else if (preclinical) {
          return (result && it["_source"]["biomarker status"].toLowerCase() == "preclinical");
        }
        else if (exploratory) {
          return (result && it["_source"]["biomarker status"].toLowerCase() == "exploratory");
        }
        else if(heatmap){
          return result;
        }
      }
    }
    );

    //when safety is not selected we need to return both false and true values
    if (clinical || preclinical || exploratory) {
      if (safety) {
        items = items.filter(
          status => status["_source"]["Safety"] === true);
      }
    }



    if (items.length == 0) {
      var obj = {};
      var subdoc = {}
      subdoc[filterby] = "no matching data";
      obj['_source'] = subdoc;
      obj["message"] = "1";
      return [obj]
    }
    else {
      return items;
    }
  }
}