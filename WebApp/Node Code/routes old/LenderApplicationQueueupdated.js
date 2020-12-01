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
			
       //Getting UserType details.. 
          var jsonObj = strBody;
          var UserID=jsonObj.UserID;
		  var AppraisalStatus=jsonObj.AppraisalStatus;
		  console.log("     "+UserID);

			console.log("Connected to Database");
			var db = req.db;
			var coll = db.get('Appraisal');
			//Getting the property details for current appraiser
 		coll.find({'ManagedBy': UserID,'ValuationStatus':'true','AppraisalStatus' :{$in : [AppraisalStatus]}},function (err, result) {
				if (err) {
					console.log(err);
				} else if (result.length) {
						// console.log('Found:', result);
						var i =0;
								 //Getting AppraiserId and Passing it to User Table to get Username
								 result.forEach(function(doc){
										var UsrCol = db.get('User');
										UsrCol.find({'UserID':doc.AppraiserID},function(err,result123){
										if(err){
											console.log(err)
										}else{
											result123.forEach(function(usrdoc){
												console.log(usrdoc.UserName + "-----User Name")
												//Adding Username to the Json Array 'result'
												result[i].AppraiserName=usrdoc.UserName;
												console.log(result[i].AppraiserName+"res length")
												i++;
												console.log(i+"i val")
												if(i==result.length){
													console.log("12")
													var arr = JSON.stringify(result);
													res.send(arr);
													capturelog.fnuserlog("\r\n\r\n LenderQueue -- RETRIEVED  -- UserID : "+UserID+", Date :"+new Date())
												}
											})
										} 							
									})
								})
									
						} else {
							res.send("0");
								 capturelog.fnuserlog("\r\n\r\n LenderQueue -- RETRIEVAL FAILED -- NO RECORDS  -- UserID : "+UserID+", Date :"+new Date())
							console.log('No document(s) found with defined "find" criteria!');
						}
		})
	//});
	}
	catch(Ex)
	{
	console.log("connection error");
	}
});
module.exports = router;