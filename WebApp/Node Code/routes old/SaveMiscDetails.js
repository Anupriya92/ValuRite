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
            console.log("Received posted data: " + strBody);
			
//Getting Property Appraisal details.. 
var jsonObj = strBody;
var ValuationID= jsonObj.ValuationID;
var UserID=jsonObj.UserID;

var db=req.db;
var collection = db.get('Appraisal');
collection.find({'ValuationID':ValuationID,'ValuationStatus':'true'},function(err, docs) {
	//console.log(docs);
	//console.log(docs.MiscelaneousStatus);
	docs.forEach(function(subdocs){
		console.log(subdocs.MiscelaneousStatus)

	if(subdocs.MiscelaneousStatus == "Completed" ){
		console.log("Retrieved");
		
		var coll = db.get('Appraisal');
		coll.update({'ValuationID':ValuationID,'ValuationStatus':'true'}, {$set : {MiscelaneousStatus : "Retrieved"}});

 		var arr = JSON.stringify(subdocs);
        res.send(arr);
		capturelog.fnuserlog("\r\n\r\n Miscelaneous Page -- RETRIEVED  -- ValuationID : "+ValuationID+", UserID : "+UserID+", Date :"+new Date())
	}
	else{ 
		var PropertyArea=jsonObj.PropertyArea;
		var AreaClassification=jsonObj.AreaClassification;
		var OccupiedBy=jsonObj.OccupiedBy;
		var OccupiedPeriod=jsonObj.OccupiedPeriod;
		var RentAmount=jsonObj.RentAmount;
		var TypeOfStructure=jsonObj.TypeOfStructure;
		var DwllingUnits=jsonObj.DwllingUnits;
		var Quality=jsonObj.Quality;
		var BuildingAppearance=jsonObj.BuildingAppearance;
		var Maintenance=jsonObj.Maintenance;
		var Floor=jsonObj.Floor;
		var Specification=jsonObj.Specification;
		//var HouseTax=jsonObj.HouseTax;
		var Assessment=jsonObj.Assessment;
		var TaxPayerName=jsonObj.TaxPayerName;
		var TaxAmount=jsonObj.TaxAmount;
		var ElectricityNum=jsonObj.ElectricityNum;
		var MasterCardName=jsonObj.MasterCardName;
		var Purpose=jsonObj.Purpose;
		//var Marketablility=jsonObj.Marketablility;
		var MarketabilityInfo=jsonObj.MarketabilityInfo;
		var FactorFav=jsonObj.FactorFav;
		var Docs=jsonObj.Docs;
		var BriefDesc=jsonObj.BriefDesc;
		var NegativeFactors=jsonObj.NegativeFactors;
		var CurrentDate = new Date(); 
		
				//"Marketablility":Marketablility,
				//"HouseTax":HouseTax,
	collection.update({'ValuationID':ValuationID,'ValuationStatus':'true'} ,
	{$set :
		{"Miscelaneous":{
				"PropertyArea":PropertyArea,
				"AreaClassification":AreaClassification,
				"OccupiedBy":OccupiedBy,
				"OccupiedPeriod":OccupiedPeriod,
				"RentAmount":RentAmount,
				"TypeOfStructure":TypeOfStructure,
				"DwllingUnits":DwllingUnits,
				"Quality":Quality,
				"BuildingAppearance":BuildingAppearance,
				"Maintenance":Maintenance,
				"Floor":Floor,
				"Specification":Specification,
				"Assessment":Assessment,
				"TaxPayerName":TaxPayerName,
				"TaxAmount":TaxAmount,
				"ElectricityNum":ElectricityNum,
				"MasterCardName":MasterCardName,
				"Purpose":Purpose,
				"MarketabilityInfo":MarketabilityInfo,
				"FactorFav":FactorFav,
				"Docs":Docs,
				"BriefDesc":BriefDesc,
				"NegativeFactors":NegativeFactors
			},
		"MiscelaneousModifiedDate":CurrentDate,
		"MiscelaneousStatus" : "Completed",
		"ModifiedDate" :CurrentDate,
		"ModifiedBy" : UserID
		}
	}, {upsert : true},function(err,result){
			if(err){
				res.send("0");
				console.log("Data Failed to Update");
				capturelog.fnuserlog("\r\n\r\n Update Miscelaneous Section --Failed-- ValuationID : "+ValuationID+", UserID : "+UserID+", AmenitiesModifiedDate :"+CurrentDate)
			}
			else{
				res.send("1");
				console.log("Data written");
				capturelog.fnuserlog("\r\n\r\n Update Miscelaneous Section --SUCCESS-- ValuationID : "+ValuationID+", UserID : "+UserID+", AmenitiesModifiedDate :"+CurrentDate)
			}
		} 
	);
	}
	});
    
});

        
 //});
      } catch( ex ) {
       console.dir(ex);
      }
});
module.exports = router;