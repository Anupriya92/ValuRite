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
	console.log(docs);
	console.log(docs.SummaryStatus);
	docs.forEach(function(subdocs){
		console.log(subdocs.SummaryStatus)
		
	
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
	var Recommendation = jsonObj.Recommendation;
	var RecommendedValue =jsonObj.RecommendedValue;
	var ImageName=jsonObj.ImageName;
	var Type=jsonObj.Type;
	var Measurement=jsonObj.Measurement;
	var MarketRate=jsonObj.MarketRate;
	var Total=jsonObj.Total;
	var EstRatePerSqFt=jsonObj.EstRatePerSqFt;
	//var EstMktValue=jsonObj.EstMktValue;
	var GuidelineValue=jsonObj.GuidelineValue;
	var EstimatedValue=jsonObj.EstimatedValue;
	var Guidelinesqft=jsonObj.Guidelinesqft;
	
	var CompositeRate=jsonObj.CompositeRate;
	var NewConstructionCompositeRate=jsonObj.NewConstructionCompositeRate;
	var ReplacementCost=jsonObj.ReplacementCost;
	var LifeOfBuilding=jsonObj.LifeOfBuilding;
	var TotalCompositeRate=jsonObj.TotalCompositeRate;
	var Reason=jsonObj.Reason;
	var CurrentDate = new Date();
	var InvoiceAmt =jsonObj.InvoiceAmt;
	collection.update({'ValuationID':ValuationID,'ValuationStatus':'true'} ,
	{$set :
	{
		"EstRatePerSqFt" : EstRatePerSqFt,
		"GuidelineValue" : GuidelineValue,
		"Guidelinesqft":Guidelinesqft,
		"EstimatedValue":EstimatedValue,
		"CompositeRate":CompositeRate,
		"NewConstructionCompositeRate":NewConstructionCompositeRate,
		"ReplacementCost":ReplacementCost,
		"LifeOfBuilding":LifeOfBuilding,
		"TotalCompositeRate":TotalCompositeRate,
		"Reason":Reason,
		"SummaryDeatils" :{
			"Recommendation" : Recommendation,
			"RecommendedValue" : RecommendedValue,
			"Type" : Type,
			"Measurement":Measurement,
			"MarketRate":MarketRate,
			"Total":Total			
		},
		"Images" :{
				"ImageName" : ImageName
			},
		"SummaryStatus" : "Completed",
		"SummaryModifiedDate": CurrentDate,
		"ModifiedDate" : CurrentDate,
		"ModifiedBy":UserID,
		"InvoiceAmt":InvoiceAmt
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