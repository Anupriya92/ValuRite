import { Pipe, PipeTransform } from '@angular/core';
import { FilterPipe } from './customFilter.pipe';


@Pipe({
    name: 'condition'
})

export class ConditionPipe implements PipeTransform {

    transform(items: any[], query: string, filterby: string, searchcriteria: string, clinical?: boolean, preclinical?: boolean, exploratory?:boolean, safety?: boolean,dbcall?:boolean): any[] {
        //debugger
        if(query==undefined)
        {
            query = "";
        }
        if (items == undefined ) 
        {
            var obj = {};
            var subdoc = {}
            subdoc[filterby] = "no matching data";
            obj['_source'] = subdoc;
            obj["message"] = "1";
            return [obj]
          }
        if (dbcall==true && (query.trim().length>1 ||  query.trim()=="*")) {
            
            var obj = {};
            var subdoc = {}
            subdoc[filterby]= "Please wait..";
            obj['_source'] =subdoc;
            
            obj["message"] = "1";
            return [obj]
        }
        else if(dbcall==true && query.trim().length<=1)
        {

            var obj = {};
            var subdoc = {}
            subdoc[filterby]= "Minimum two characters required";
            obj['_source'] =subdoc;
            
            obj["message"] = "1";
            return [obj]
        }
        else if(dbcall==false && query.trim().length<=1 &&  query.trim()!="*")
        {

            var obj = {};
            var subdoc = {}
            subdoc[filterby]= "Minimum two characters required";
            obj['_source'] =subdoc;
            
            obj["message"] = "1";
            return [obj]
        }
        else {
            return new FilterPipe().transform(items, query, filterby, searchcriteria, clinical, preclinical, exploratory, safety);
        }
    }
}