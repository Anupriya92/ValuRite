////Loads Property details based on the Borrower Selection..
var http = require("http");
fs = require('fs');
var jsonAddress="";
var PropertyID;
// var Rejlist = new Object();

console.log("\n\n-------------------------------- Server Started --------------------------------");

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
					//MongoDb Connection
					console.log("get Guideline value");
					
					var db=req.db;
					var GuideLine = db.get('GuideLineValue');
					GuideLine.find({Village:zone},{StreetName:1,_id:0,sort:{ StreetName: 1 }},function(err,result){
						if(err){
							console.log("Error Occured ");
							res.send("Error")
						}
						else if(result.length){
							console.log("Result : "+result)
							console.log("\n"+result.length)
							res.send(JSON.stringify(result));
						}
						else{
							console.log(result);
							res.send("");
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
