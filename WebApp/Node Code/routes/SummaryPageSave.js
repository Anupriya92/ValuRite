var http = require("http");
var fs = require("fs")
var CaptureLog = require("./log.js");
capturelog = new CaptureLog();

var express = require('express');
var router = express.Router();
router.post('/', function(req, res, next) {
try
{
           var strBody = req.body;
          /*req.on("data", function(chunk) {
            strBody += chunk;
          });*/
          //req.on("end", function() {
            console.log("Received posted data: " + strBody);
			
//Getting Property Appraisal details.. 
var jsonObj =strBody;
//var PropertyID = jsonObj.PropertyID;
var ValuationID= jsonObj.ValuationID;
var UserID=jsonObj.UserID;
//var pid=parseInt(PropertyID);
 

 var db=req.db;
var collection = db.get('Appraisal');
collection.find({'ValuationID':ValuationID,'ValuationStatus':'true'},function(err, docs) {
	docs.forEach(function(subdocs){
		
	
	if(subdocs.SummaryStatus == "Completed" ){
		console.log("Retrieved");
		
		var coll = db.get('Appraisal');
		coll.update({'ValuationID':ValuationID,'ValuationStatus':'true'}, {$set : {SummaryStatus : "Retrieved"}});

 		var arr = JSON.stringify(subdocs);
        res.write(arr);
        res.end();
		capturelog.fnuserlog("\r\n\r\n SummaryPageSave -- RETRIEVED  -- ValuationID : "+ValuationID+", UserID : " +UserID + ",  Date :"+new Date())
	}
	else{ 
	//var UserID =jsonObj.UserID;
	var EstRatePerSqFt=jsonObj.EstRatePerSqFt;
	var EstimatedValue=jsonObj.EstimatedValue;
	var Guidelinesqft=jsonObj.Guidelinesqft;
	var GuidelineValue=jsonObj.GuidelineValue;
	var CompositeRate=jsonObj.CompositeRate;
	var NewConstructionCompositeRate=jsonObj.NewConstructionCompositeRate;
	var ReplacementCost=jsonObj.ReplacementCost;
	var LifeOfBuilding=jsonObj.LifeOfBuilding;
	var TotalCompositeRate=jsonObj.TotalCompositeRate;
	var Summarydetails=JSON.parse(jsonObj.Summarydetails)
	var Reason=jsonObj.Reason;
	var ImageName=jsonObj.ImageName;
	var InvoiceAmt =jsonObj.InvoiceAmt;
	var CurrentDate = new Date();
	
	collection.update({'ValuationID':ValuationID,'ValuationStatus':'true'} ,
	{$set :
	{
		"EstRatePerSqFt" : EstRatePerSqFt,
		"EstimatedValue":EstimatedValue,
		"Guidelinesqft":Guidelinesqft,
		"GuidelineValue" : GuidelineValue,
		"CompositeRate":CompositeRate,
		"ValuationMethod":jsonObj["ValuationMethod"],
		"NewConstructionCompositeRate":NewConstructionCompositeRate,
		"ReplacementCost":ReplacementCost,
		"LifeOfBuilding":LifeOfBuilding,
		"TotalCompositeRate":TotalCompositeRate,
		"SummaryDetails.ValuationSummary" :Summarydetails,
		"Reason":Reason,
		"InvoiceAmt":InvoiceAmt,
		
		"Images" :{
				"ImageName" : ImageName
			},
		"SummaryStatus" : "Completed",
		"SummaryModifiedDate": CurrentDate,
		"ModifiedDate" : CurrentDate,
		"ModifiedBy":UserID
		
	}
	}, {upsert : true} 
	);
  
		console.log("Data written");

         res.send("1");
		 capturelog.fnuserlog("\r\n\r\n Update Summary Section --SUCCESS-- ValuationID : "+ValuationID+", UserID : "+UserID+", SummaryModifiedDate :"+CurrentDate)   
	}
	});
    
});
 
        
 //});
      } catch( ex ) {
       console.dir(ex);
      }
});
module.exports = router;