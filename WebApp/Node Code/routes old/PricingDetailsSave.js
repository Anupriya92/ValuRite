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
			
//Getting User details.. 
var jsonObj = strBody;
//var PropertyID = jsonObj.PropertyID;
//var pid=parseInt(PropertyID);
var ValuationID = jsonObj.ValuationID;
var UserID=jsonObj.UserID;
var CurrentDate = new Date();

 
 
console.log("Connected to Database");

var db=req.db;
var collection = db.get('Appraisal');
collection.find({'ValuationID':ValuationID,'ValuationStatus':'true'},function(err, docs) {
	console.log(docs);
	console.log(docs.PricingStatus);
	docs.forEach(function(subdocs){
	if(subdocs.PricingStatus == "Completed"){
		var coll = db.get('Appraisal');
		coll.update({'ValuationID':ValuationID,'ValuationStatus':'true'}, {$set : {PricingStatus : "Retrieved"}});

 		var arr = JSON.stringify(subdocs);
        res.send(arr);
		capturelog.fnuserlog("\r\n\r\n Pricing Details Section --RETRIEVED-- ValuationID : "+ValuationID+", UserID : "+UserID+", Date :"+CurrentDate)
	}
	else{
	var PropertyStatus = jsonObj.PropertyStatus;
    var LivableStatus = jsonObj.LivableStatus;
	var NonLivableReason = jsonObj.NonLivableReason;
	var Age = jsonObj.Age;
	var PropertyTaxDetails = jsonObj.PropertyTaxDetails;
	var Footage = jsonObj.Footage;
	var NoofFloors = jsonObj.NoofFloors;
	var NoofRooms = jsonObj.NoofRooms;
	var RoomsFootage = jsonObj.RoomsFootage;
	var CommonArea = jsonObj.CommonArea;
	var CommonAreaPercentage = jsonObj.CommonAreaPercentage;
	var PlinthArea = jsonObj.PlinthArea;
	var CarpetArea = jsonObj.CarpetArea;
	var TotalArea = jsonObj.TotalArea;
	var	LandMeasure = jsonObj.LandMeasure;
	var	MismatchReason = jsonObj.MismatchReason;
	
	var LandExtent = jsonObj.LandExtent;
	var unit=jsonObj.Unit;
	var SurroundedBy = jsonObj.SurroundedBy;
	var RoadWidth = jsonObj.RoadWidth;
	var FootageDetails=jsonObj.FootageDetails;
	var FootageReason=jsonObj.FootageReason;
	
	var YearConstructed=jsonObj.YearConstructed;
	var FloorSpaceIndex=jsonObj.FloorSpaceIndex;
	
	//var Totalvalue = jsonObj.Totalvalue;
	collection.update({'ValuationID':ValuationID,'ValuationStatus':'true'} ,
	{$set :
	{
	"PropertyStatus" : PropertyStatus,
	"BuildingDetails" : {
	       "TotalArea" : TotalArea,
	       "CommonArea" : CommonArea,
		   "CommonAreaPercentage" : CommonAreaPercentage,
	       "PlinthArea" : PlinthArea,
	       "CarpetArea" : CarpetArea
	    },
	"PricingPropertyDetails" : {
		   "YearConstructed":YearConstructed,
		   "FloorSpaceIndex":FloorSpaceIndex,
	       "Age" : Age,
		   "NoofFloors" : NoofFloors,
		   "Footage" : Footage,
	       "Livable" : {
				"LivableStatus" : LivableStatus,
				"NonLivableReason" : NonLivableReason
		    },
			"Rooms" :{
				"NoofRooms" : NoofRooms,
				"RoomsFootage" : RoomsFootage
			}  
	    },
	"SurveyDetails" :{
		"LandMeasure" : LandMeasure,
		"MismatchReason" : MismatchReason
	},
	"LocationPropertyDetails" : {
		 "LandExtent" : LandExtent, 
		 "Unit":unit,
		 "SurroundedBy" : SurroundedBy, 
		 "RoadWidth" : RoadWidth,
		 "FootageDetails" : FootageDetails,
		 "FootageReason" : FootageReason
		  },
		 "PricingStatus" : "Completed",
		 "PricingModifiedDate":CurrentDate,
		 "ModifiedDate" : CurrentDate,
		 "ModifiedBy" : UserID
		 
	}
	}, {upsert : true} 
	);
          console.log("Data written"); 
		  res.send("1");
		  capturelog.fnuserlog("\r\n\r\n Update Pricing Details Section --SUCCESS-- ValuationID : "+ValuationID+", UserID : "+UserID+", PricingModifiedDate :"+CurrentDate)
	}
 
});

});    
		  //});
      } catch( ex ) {
       console.dir(ex);
      }


});
module.exports = router;