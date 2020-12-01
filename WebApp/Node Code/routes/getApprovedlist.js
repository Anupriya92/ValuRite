var http = require("http");
var express = require('express');
var CaptureLog = require("./log.js");
capturelog = new CaptureLog();
fs = require('fs');

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
		  var LenderID=jsonObj.LenderID;
          var AppraiserID=jsonObj.AppraiserID;
		  var ValuationID=jsonObj.ValuationID;
		  var BorrowerID=jsonObj.BorrowerID;
		  var UserType=jsonObj.UserType;
		  var OrgType=jsonObj.OrgType;
		  var query="";
		  var AppraisalStatus="Approved";
		  console.log(ValuationID+"ValuationID")
		  console.log(BorrowerID+"BorrowerID")
		  console.log(AppraiserID+"AppraiserID")
		  
		  //  Individual
		  if(UserType=="Appraiser"){
			  
			  if (OrgType=="Individual"){
				  
			  if(ValuationID=="" || ValuationID==null ){
				  console.log("ind val")
				  query="{ \"BorrowerID\":\""+BorrowerID+"\",\"AppraiserID\":\""+AppraiserID+"\",\"AppraisalStatus\":\"Approved\" }";
				  query = JSON.parse(query);
				  
			  }
			  else if(BorrowerID=="" || BorrowerID==null ){
				  console.log("ind bor")
				  query="{ \"ValuationID\":\""+ValuationID+"\",\"AppraiserID\":\""+AppraiserID+"\",\"AppraisalStatus\":\"Approved\" }";
				  query = JSON.parse(query);
			  }
			  }
			  else if(OrgType=="Company" ){
				  if(ValuationID=="" || ValuationID==null ){
					  console.log("comp val")
				  query="{ \"BorrowerID\":\""+BorrowerID+"\",\"ApproverID\":\""+AppraiserID+"\",\"AppraisalStatus\":\"Approved\" }";
				  query = JSON.parse(query);
			  }
			  else if(BorrowerID=="" || BorrowerID==null ){
				  console.log("comp bor")
				  query="{ \"ValuationID\":\""+ValuationID+"\",\"ApproverID\":\""+AppraiserID+"\",\"AppraisalStatus\":\"Approved\" }";
				  query = JSON.parse(query);
			  }
				  
			  }
		  }
		  else if(UserType=="Lender"){
			  if(ValuationID=="" || ValuationID==null ){
				  query="{ \"BorrowerID\":\""+BorrowerID+"\",\"ManagedBy\":\""+LenderID+"\",\"AppraisalStatus\":\"Approved\" }";
				  query = JSON.parse(query);
			  }
			  else if(BorrowerID=="" || BorrowerID==null ){
				  query="{ \"ValuationID\":\""+ValuationID+"\",\"ManagedBy\":\""+LenderID+"\",\"AppraisalStatus\":\"Approved\" }";
				  query = JSON.parse(query);
			  }
		  }
		  
		  
		    var db=req.db;
			var coll = db.get('Appraisal');
			console.log(query);
			coll.find(query,function (err, result) {
				if (err) {
					console.log(err);
				} else if (result.length) {
						var i =0;
								 //Getting AppraiserId and Passing it to User Table to get Username
								 result.forEach(function(doc){
									 //console.log("this is doc"+doc)
										var UsrCol = db.get('User');
										UsrCol.find({'UserID':doc.AppraiserID},function(err,result123){
										if(err){
											console.log(err)
										}else{
											result123.forEach(function(usrdoc){
												result[i].AppraiserName=usrdoc.UserName;
												i++;
												if(i==result.length){
													var arr = JSON.stringify(result);
													console.log(arr+"My Array")
													res.send(arr);
												}
											})
										} 							
									})
								})		
								
						} else {
							console.log('No document(s) found with defined "find" criteria!');
							     res.send("0");
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