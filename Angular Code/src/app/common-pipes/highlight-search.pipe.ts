import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'highlight'
})

export class HighlightSearch implements PipeTransform {

    // transform(value: any, args: any): any {
    //     var re = new RegExp(args, 'gi'); //'gi' for case insensitive and can use 'g' if you want the search to be case sensitive.
    //     console.log("Highlight pipe = "+args+" , "+re);
    //     return value.replace(re, "<b>" + args + "<\/b>");
    // }

    transform(text: string, search, hightlight): string {
      console.log(search)
        if (search && text && hightlight) {
           // console.log("search:"+search);
          let pattern = search.toString().replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
          pattern = pattern.split(',').filter((t) => {
            return t.length > 0;
          }).join('|');
          //console.log("pattern:"+pattern);
          const regex = new RegExp(pattern, 'gi');
          console.log(regex+" , "+text.replace(regex, (match) => `<mark>${match}</mark>`));
          return text.replace(regex, (match) => `<mark>${match}</mark>`);
        
        //   <font size="-1"></font>
        } else {
          return text;
        }
      }
}