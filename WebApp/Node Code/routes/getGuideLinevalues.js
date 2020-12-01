////Loads Property details based on the Borrower Selection..
var http = require("http");
fs = require('fs');
var jsonAddress="";
var PropertyID;
// var Rejlist = new Object();


var express = require('express');
var router = express.Router();
router.post('/', function(req, res, next) {
	try
	{
		var strBody=req.body;
		//req.on("data", function(chunk) {
            //strBody += chunk;
          //});
		//req.on("end", function() {
        console.log("Received posted data: " + strBody);
		var jsonObj = strBody;
		var streetname=jsonObj.StreetName;
		var zone=jsonObj.Zone;
		var village=jsonObj.Village;
		var sroloc=jsonObj.SROLOC;
		var valid=jsonObj.ValuationID;

				console.log("Connected to Database");
				var db=req.db;
				var GuideLine = db.get('GuideLineValue');
				var getval=db.get('Appraisal');
				getval.find({ValuationID:valid,ValuationStatus:'true'},function(err,result1){
					if(err){
						console.log("Error Occured 1");
						res.send("")
					}
					else if(result1.length){
						console.log(result1[0])
						var dummysro;
						if(!result1[0].hasOwnProperty('RegnDetails.SroLocation')){
								var totarea=result1[0].BuildingDetails.TotalArea;
								getSROLOC(totarea,res,streetname,zone,village,db);
						}
						else{
							var sroloc=result1[0].RegnDetails.SroLocation;
							var totarea=result1[0].BuildingDetails.TotalArea;
							getguideline(totarea,sroloc,res,streetname,zone,village,db);
						}
					}
				})	
	//});
}
catch (Ex)
{
	console.log(Ex+"Error in getting Parameter values")
}
});
module.exports = router;


function getSROLOC(totarea,res,streetname,zone,village,req){
	console.log("Get SRO Location");
		var db=req;
		var GuideLine = db.get('GuideLineValue');
		
		GuideLine.find({Zone:zone,Village:village},{SROLOC:1},function(err,result){
			if(err){
				console.log(err)
				console.log("Error Occured 2");
				res.send("Error")
			}
			else if(result.length){
				console.log(result[0].SROLOC);
							var sroloc=result[0].SROLOC;
							getguideline(totarea,sroloc,res,streetname,zone,village,db);
			}
			else{
				var obj={
						PerSqft:'',
						TotalArea:totarea
					}
				console.log(result + "From getSROLOC" );
				console.log(JSON.stringify(obj))
				res.send(JSON.stringify(obj));
			}
		})	
	
}


function getguideline(totarea,sroloc,res,streetname,zone,village,req){
	console.log("get Guideline value");
		var db=req;
		var GuideLine = db.get('GuideLineValue');
		GuideLine.find({StreetName: new RegExp(streetname, 'i'),Zone:zone,Village:village,SROLOC:sroloc,Classification:new RegExp('^Residential Class','i')},function(err,result){
			if(err){
				console.log("Error Occured 3");
				res.end("Error")
			}
			else if(result.length){
				console.log(result[0]+"Guide line Value found")
				var obj={
					PerSqft:result[0].PerSqft,
					TotalArea:totarea
					}
				res.send(JSON.stringify(obj));
			}
			else{
				//If No matches found on based on street vales Matching Through Zone,Village,Sroloc fields 
				console.log(JSON.stringify(result)+"Guide line Value not found with the Street \n")
				getguideline2(totarea,sroloc,res,zone,village,db);
				/*var obj={
					PerSqft:'',
					TotalArea:totarea
					}
				console.log(result+"Guide line Value not found ");
				res.end(JSON.stringify(obj));*/
			}
		})
}

function getguideline2(totarea,sroloc,res,zone,village,req){
	console.log("get records without matching the street values");
		
		var db=req;
		var GuideLine = db.get('GuideLineValue');
		GuideLine.find({Zone:zone,Village:village,SROLOC:sroloc,Classification:new RegExp('^Residential Class','i')},function(err,result){
			if(err){
				console.log("Error Occured 4");
				res.send("Error")
			}
			else if(result.length){
				console.log(JSON.stringify(result[0])+"Guide line Value found")
				var obj={
					PerSqft:result[0].PerSqft,
					TotalArea:totarea
					}
				res.send(JSON.stringify(obj));
			}
			else{
				var obj={
						PerSqft:'',
						TotalArea:totarea
					}
				console.log(result+"Guide line Value not found ");
				res.send(JSON.stringify(obj));
			}
		})
}