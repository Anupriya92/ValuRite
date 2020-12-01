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
var jsonObj = strBody;
//var PropertyID = jsonObj.PropertyID;
var ValuationID= jsonObj.ValuationID;
var UserID=jsonObj.UserID;
var db=req.db;
var collection = db.get('Appraisal');
collection.find({'ValuationID':ValuationID,'ValuationStatus':'true'},function(err, docs) {
	docs.forEach(function(subdocs){
		
	
	if(subdocs.AmenitiesStatus == "Completed" ){
		console.log("Retrieved");
		
		var coll = db.get('Appraisal');
		coll.update({'ValuationID':ValuationID,'ValuationStatus':'true'}, {$set : {AmenitiesStatus : "Retrieved"}});

 		var arr = JSON.stringify(subdocs);
        res.send(arr);
		capturelog.fnuserlog("\r\n\r\n AmenitiesPage -- RETRIEVED  -- ValuationID : "+ValuationID+", UserID : "+UserID+", Date :"+new Date())
	}
	else{ 
	//var NoofLifts=jsonObj.NoofLifts;
	//var NoofCarpark=jsonObj.NoofCarpark;
	//var NoofCoveredCarpark=jsonObj.NoofCoveredCarpark;
	//var WelfareAssn=jsonObj.WelfareAssn;
	//var Others=jsonObj.Others;
	var UtilitySelect=jsonObj.UtilitySelect;
	var UtilityFitness=jsonObj.UtilityFitness;
	var UtilityHealth=jsonObj.UtilityHealth;
	var UtilityBuilding=jsonObj.UtilityBuilding;
	//var FlatMaintainance=jsonObj.FlatMaintainance;
	//var DepreciationValue=jsonObj.DepreciationValue;
	var AmenitiesFinal = JSON.parse(jsonObj.AmenitiesFinal);	
	var CurrentDate = new Date(); 	
	collection.update({'ValuationID':ValuationID,'ValuationStatus':'true'} ,
	{$set :
	{
		"Amenities" : {
			"Utility" :{ 
				"NoofLifts" : AmenitiesFinal.NoofLifts,
				"NoofCarpark" : AmenitiesFinal.NoofCarpark,
				"NoofCoveredCarpark" : AmenitiesFinal.NoofCoveredCarpark,
				"WelfareAssn" : AmenitiesFinal.WelfareAssn,
				"UtilitySelect" : UtilitySelect
			},
			"Fitness" : {
				"UtilityFitness" : UtilityFitness
			},
			"Health" : {
				"UtilityHealth" : UtilityHealth,
				"FlatMaintainance":AmenitiesFinal.FlatMaintainance,
				"Others" : AmenitiesFinal.Others
			},
			//"Building" : {
			//	"UtilityBuilding" : JSON.parse(jsonObj.UtilityBuilding),
			//	//"UtilityBuilding" : UtilityBuilding,
				
			//},
			"Building" : JSON.parse(jsonObj.UtilityBuilding),		
				
			
			//"BuildingDepreciationValue" : JSON.parse(jsonObj.DepreciationValue),
			
		},
		"AmenitiesModifiedDate":CurrentDate,
		"AmenitiesStatus" : "Completed",
		"ModifiedDate" :CurrentDate,
		"ModifiedBy" : UserID
	}
	}, {upsert : true} 
	);
        res.send("1");
		console.log("Data written");
		capturelog.fnuserlog("\r\n\r\n Update Amenities Section --SUCCESS-- ValuationID : "+ValuationID+", UserID : "+UserID+", AmenitiesModifiedDate :"+CurrentDate)
	}
	});
    
});

        
 //});
      } catch( ex ) {
       console.dir(ex);
      }
});
module.exports = router;