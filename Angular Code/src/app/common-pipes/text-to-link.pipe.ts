import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textToLink'
})
export class TextToLinkPipe implements PipeTransform {

  transform(keyOfObj:any, data: any, obj:any,EnDiff:any,UnDiff:any): any {

    if(typeof data == "string")
    {
      data = data.split(",").map(function(item) {
        return item.trim();
      }).join(", ");
      
      if(data.includes('</a>'))
      {
      }
      else if(data.indexOf("http") == 0 || data.indexOf("www") == 0)
      {
        if (data.indexOf("CID: ")>0)
        {
          data=data.replace("CID: ","")
        }
        
        if (data.indexOf("gene")!=-1 && data.indexOf("uniprot")!=-1 )
        {
          var diff =data.split(";")
          EnDiff="Entrez: "+diff[0].replace(diff[0], `<a href=`+diff[0]+` target="_blank" class="inverseValue">`+diff[0].split("=")[diff[0].split("=").length - 1]+`</a>`)
          UnDiff="Uniport: "+diff[1].replace(diff[1], `<a href=`+diff[1]+` target="_blank" class="inverseValue">`+diff[1].split("/")[diff[1].split("/").length - 1]+`</a>`)
          data= EnDiff+";"+" "+UnDiff;
        }
         else if (data.indexOf("uniprot")!=-1){
          data = "Uniport: "+data.replace(data, `<a href=`+data+` target="_blank" class="inverseValue">`+data.split("/")[data.split("/").length - 1]+`</a>`)
        }
        else if (data.indexOf("gene")!=-1){
         data = "Entrez: "+data.replace(data, `<a href=`+data+` target="_blank" class="inverseValue">`+data.split("=")[data.split("=").length - 1]+`</a>`)
        }
        else if (data.indexOf("gtr")!=-1)
        {
          data = data.replace(data, `<a href=`+data+` target="_blank" class="inverseValue">`+data.split("/")[data.split("/").length - 1]+`</a>`)
        }
        else{
        //data = data.replace(data, `<div class=`+data+`><span class="inverseValue">`+data.split("/")[data.split("/").length - 1]+`</span></div>`)
        data = data.replace(data, `<a href=`+data+` target="_blank" class="inverseValue">`+data.split("/")[data.split("/").length - 1]+`</a>`)
        }
      }
      else if(obj[keyOfObj+"TargetLink"] != undefined)
      {
        data = data.replace(data, `<a href=`+obj[keyOfObj+"TargetLink"]+` target="_blank" class="inverseValue">`+ data +`</a>`)
      }      
    }
    else if(data instanceof Array)
    {
      if(obj[keyOfObj+"TargetLink"] != undefined)
      {
        var tempInv = ``;
        for(var x=0; x<data.length; x++)
        {
          tempInv += data[x].replace(data[x], `<a href=`+obj[keyOfObj+"TargetLink"][x]+` target="_blank" class="inverseValue">`+ data[x] +`</a>`);
          if(x != data.length-1)
          {
            tempInv += `<b>;  </b>`;
          }
        }
        data = tempInv;
      }
      else if(obj[keyOfObj+"TargetLinkDisease"] != undefined)
      {
        var url = window.location.href.substr(0,window.location.href.lastIndexOf('/'));
        var finalurl = url.substr(0,url.lastIndexOf('/'));
        var tempInv = ``;
        for(var x=0; x<data.length; x++)
        {
          tempInv += data[x].replace(data[x], `<a href=`+finalurl+"/diseaseReport/"+obj[keyOfObj+"TargetLinkDisease"][x]+` target="_blank" class="inverseValue">`+ data[x] +`</a>`);
          if(x != data.length-1)
          {
            tempInv += `<b>;  </b>`;
          }
        }
        data = tempInv;
      }
      else if(obj[keyOfObj+"TargetLinkBiomarker"] != undefined)
      {
        var url = window.location.href.substr(0,window.location.href.lastIndexOf('/'));
        var finalurl = url.substr(0,url.lastIndexOf('/'));
        var tempInv = ``;
        for(var x=0; x<data.length; x++)
        {
          tempInv += data[x].replace(data[x], `<a href=`+finalurl+"/bioReport/"+obj[keyOfObj+"TargetLinkBiomarker"][x]+` target="_blank" class="inverseValue">`+ data[x] +`</a>`);
          if(x != data.length-1)
          {
            tempInv += `<b>;  </b>`;
          }
        }
        data = tempInv;
      }
      // else if(keyOfObj == "Associated disease")
      // {
      //  // var url = window.location.href.substr(0,window.location.href.lastIndexOf('/'));
      //   //var finalurl = url.substr(0,url.lastIndexOf('/'));
      //   var tempInv = ``;
      //   for(var x=0; x<data.length; x++)
      //   {
      //     tempInv += data[x].replace(data[x], `<span class="inverseValue">`+ data[x] +`</span>`);
      //     if(x != data.length-1)
      //     {
      //       tempInv += `<b>;  </b>`;
      //     }
      //   }
      //   data = tempInv;
      // }

      if(data instanceof Array)
      {
        data = data.map(function(item) {
          if(typeof item == "string")
          {
            item = item.split(",").map(function(subItem) {
              return subItem.trim();
            }).join("; ");
            //return item.trim();
          }
          else if(item instanceof Array)
          {
            item = item.map(function(subItem) {
              if(typeof subItem == "string")
              {
                subItem = subItem.split(",").map(function(subOfItem) {
                  return subOfItem.trim();
                }).join("; ");
              }
              return subItem;
            }).join("; ");
          }
          return item;
        }).join("; ");
      }
    }
    return data;
  }

}