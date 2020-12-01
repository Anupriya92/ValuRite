var http = require("http");
var express = require('express');
var express = require('mongodb');
fs = require('fs');

var express = require('express');
var router = express.Router();
router.post('/', function(req, res, next) {
	try
	{
			var strBody = req.body;
			
            console.log("Received posted data: " + strBody);
			var jsonObj = strBody;
			var AppraiserID=jsonObj.AppraiserID;
			var LenderID=jsonObj.LenderID;
			 var UserRole=jsonObj.UserRole;
			 var OrgType=jsonObj.OrgType;
			 var UserID=jsonObj.UserID;
			 var query="";
			 
			if(OrgType=="Individual" || UserRole =="Ind with lender"){
				query="{ \"AppraiserID\":\""+UserID+"\",\"AppraisalStatus\":\"Approved\",\"ValuationStatus\":\"true\" }";
				query = JSON.parse(query);
			}
			else if(OrgType=="Company" || UserRole =="Comp with lender"){
				query="{ \"ApproverID\":\""+UserID+"\",\"AppraisalStatus\":\"Approved\",\"ValuationStatus\":\"true\" }";
				query = JSON.parse(query);
			}
			else if(OrgType=="Company" || UserRole =="Comp app without lender"){
				query="{ \"ApproverID\":\""+UserID+"\",\"AppraisalStatus\":\"Approved\",\"ValuationStatus\":\"true\" }";
				query = JSON.parse(query);
			}
			else if(OrgType=="Individual" || UserRole =="Ind app without lender"){
				query="{ \"ApproverID\":\""+UserID+"\",\"AppraisalStatus\":\"Approved\",\"ValuationStatus\":\"true\" }";
				query = JSON.parse(query);
			}
                    var db=req.db; 
					var coll = db.get('Appraisal');
					//console.log("Before calling db"+JSON.stringify(query));
					coll.distinct("LenderID",query,function (err, result) {
						//console.log("in distinct"+err);
						//console.log("in distinct"+result);
						if (err) {
							console.log("Error in query db"+err);
							//console.log(err);
						} else if (result.length) {
								//console.log("else if");
					           var ApprovedLendIDs=result;
						   
							   //console.log("ApprovedLendIDs"+ ApprovedLendIDs);
							    var admin_db = req.admin_db;
										var usrCol = admin_db.get('User');
										usrCol.find({'UserID' :{$in : ApprovedLendIDs}},function (usererr,userresult){ 		
											//console.log("else if1"+usererr);
											//console.log("else if2"+JSON.stringify(userresult));
											// console.log(userresult)
											// var jsonobj=JSON.stringify(userresult)
											// res.send(jsonobj);
                                                 if(err){
								                   res.send("0");
													console.log('Error in User collection:',err);
												   }
												   else if (userresult.length){
													//console.log('Found UserTable:',userresult.length);
													//res.send(userresult);

													
													res.send(JSON.stringify(userresult));
					   }
					   else {
							console.log('No document(s) found with defined "find" criteria!');
							res.send("0");
						}
											});
						} else {
							console.log('No document(s) found with defined "find" criteria!');
							res.send("0");
						}
					})
					//console.log("After calling db"+JSON.stringify(query));

				//})
	}
	catch(Ex)
	{
	console.log("ex"+Ex.message);
	}
});
module.exports = router;