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
			/*req.on("data", function(chunk) {
				strBody += chunk;
			  });*/
			//req.on("end", function() {
				console.log("Received posted data: " + strBody);
				var jsonObj = strBody;
				//console.log(jsonObj.ValuationID + "12314321ValuationID");
				var zone=jsonObj.Zone;
				var street=jsonObj.StreetName;
				var village=jsonObj.Village;
				var sroloc=jsonObj.SROLOC;
					//MongoDb Connection
					var db=req.db;
					var GuideLine = db.get('GuideLineValue');
					GuideLine.find({StreetName: new RegExp(street, 'i'),Zone:zone,Village:village,Classification:new RegExp('^Residential Class','i')},function(err,result){
						if(err){
							console.log("Error Occured ");
							res.end("Error")
						}
						else if(result.length){
							var obj={
								PerSqft:result[0].PerSqft,
							}
							result.forEach(function(doc){
								console.log(JSON.stringify(doc)+"\n");
							})
							res.send(JSON.stringify(obj));
						}
						else{
							getstreetVicedata(zone,street,village,sroloc,db,res)
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

function getstreetVicedata(zone,street,village,sroloc,db,res){
	var GuideLine = db.get('GuideLineValue');
	GuideLine.find({Zone:zone,Village:village},function(err,result){
						if(err){
							console.log("Error Occured ");
							res.send("Error")
						}
						else if(result.length){
							var obj={
								PerSqft:[],
								Village:[],
								SROLOC:[],
								StreetName:[]
							}
							var i=0;
							result.forEach(function(doc){
								console.log(JSON.stringify(doc)+"\n");
								obj.PerSqft[i]=doc.PerSqft;
								obj.Village[i]=doc.Village;
								obj.SROLOC[i]=doc.SROLOC;
								obj.StreetName[i]=doc.StreetName;
								i++;
							})
							res.send(JSON.stringify(obj));
						}
						else{
							console.log(result+" No Values found");
							res.send("");
						}
					})
	
}
