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
var jsonObj = strBody;
var ValuationID = jsonObj.ValuationID;
var UserID=jsonObj.UserID;
var CurrentDate = new Date();
var pid = parseInt(jsonObj.PropertyID);
var collarr=[];

var db=req.db;
var collection = db.get('Appraisal');
if(!jsonObj.flag){
          var Areaclassification = jsonObj.Areaclassification;
          var EconomicClassification = jsonObj.EconomicClassification;
          var RegnStatus = jsonObj.RegnStatus;
          var RegnReason = jsonObj.RegnReason;
          var RegnDate = jsonObj.RegnDate;
          var RegnValue = jsonObj.RegnValue;
          var UndividedShare = jsonObj.UndividedShare;
          var RoadWidth = jsonObj.RoadWidth;
          var Surroundedbyfence = jsonObj.Surroundedbyfence;
          var landmeasurement = jsonObj.landmeasurement;
          var MismatchReason = jsonObj.MismatchReason;
          var PropertyArea = jsonObj.PropertyArea;
          var NoOfDwelling = jsonObj.NoOfDwelling;
		  var Zone = jsonObj.Zone;
          var SROLocation = jsonObj.SROLocation;
          var Village = jsonObj.Village;
          var SurveyNumber = jsonObj.SurveyNumber;
          var SurveyDate = jsonObj.SurveyDate;
          var NamebuttingRoad = jsonObj.NamebuttingRoad;
          var Orientationplot = jsonObj.Orientationplot;
          var Landmark = jsonObj.Landmark;
          var Proximitysurcomm = jsonObj.Proximitysurcomm;
          var Distancecitylimits = jsonObj.Distancecitylimits;
		  var TotalArea = jsonObj.TotalArea;
          var UserID = jsonObj.UserID;
	
	collection.update({'ValuationID':ValuationID,'ValuationStatus':'true'} ,
	{$set :
	{
	"PropertyArea":PropertyArea,
	"AreaClassification":Areaclassification,
	"EconomicClassification":EconomicClassification,
	"Registration":{
		"YesNo":RegnStatus,
		"Comments":RegnReason
		
		
	},
	"DateofRegistration":RegnDate,
	"RegistrationValue":RegnValue,
	"UndividedShareOfLand":UndividedShare,
	"LandMeasurement":landmeasurement,
	"ReasonIfValuesMismatched":MismatchReason,
	"SurroundedByFenceOrWall":Surroundedbyfence,
	"NoOfDwellingUnits":NoOfDwelling,
	"RegnDetails":{
	                "Zone":Zone,
					"SROLocation":SROLocation,
					"Village":Village,
					"SurveyNumber":SurveyNumber,
					"SurveyDate":SurveyDate,
	              },
				  "WidthOfRoad":RoadWidth,
	"NameAbuttingRoad":NamebuttingRoad,
	"Orientation":Orientationplot,
	"Landmark":Landmark,
	"Proximity":Proximitysurcomm,
	"DistanceFromCity":Distancecitylimits,
	//"BuildingDetails":{
	//	                "TotalArea":TotalArea
	 //                 },
	 "TotalArea":TotalArea,
	"PropDescStatus":"Completed" 
	}
	}, {multi:true},{upsert : true});
}

collection.find({'ValuationID':ValuationID,'ValuationStatus':'true'},function(err, docs) {	
	docs.forEach(function(subdocs){	
	    var coll = db.get('Appraisal');
		coll.update({'PropertyID':pid,'ValuationStatus':'true'}, {$set : {PropDescStatus : "Retrieved"}});
 		var arr = JSON.stringify(subdocs);	
        collarr.push(subdocs)
		capturelog.fnuserlog("\r\n\r\n PropDescStatus Details Section --RETRIEVED-- PropertyID : "+pid+", UserID : "+UserID+", Date :"+CurrentDate)
})
});  

//Property Description.. 
var collection1 = db.get('Property');
if(!jsonObj.flag){
	       var DoorNo = jsonObj.DoorNo;
           var StreetName = jsonObj.StreetName;
           var AreaName = jsonObj.AreaName;
           var City = jsonObj.City;
           var State = jsonObj.State;
           var Country = jsonObj.Country;
           var Pincode = jsonObj.Pincode;
	
	collection1.update({'PropertyID':pid} ,
	{$set :
	{
	"Address":{
			    "DoorNumber" : DoorNo,
				"StreetName" : StreetName,
				"AddArea":AreaName,	 
				"City":City,
				"State":State,
				"Country":Country,
				"Pincode":Pincode
		      }
	}
	},{multi:true}, {upsert : true});
}

collection1.find({'PropertyID':pid},function(err, propdocs) {
	propdocs.forEach(function(propsubdocs){	
		var propcol = db.get('Property');
		propcol.update({'PropertyID':pid});
 		var proparr = JSON.stringify(propsubdocs);
        collarr.push(propsubdocs)		
        res.send(collarr);
		capturelog.fnuserlog("\r\n\r\n PropDescStatus Details Section --RETRIEVED-- ValuationID : "+ValuationID+", UserID : "+UserID+", Date :"+CurrentDate)
})
});   		  
      } catch( ex ) {
       console.dir(ex);
      }
});
module.exports = router;