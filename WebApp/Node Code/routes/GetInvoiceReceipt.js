var http = require("http");
var express = require('express');


fs = require('fs');
var router = express.Router();
router.post('/', function(req, res, next) {
 try
 {
	var strBody=req.body;
	var jsonObj = strBody;
	var UserID=jsonObj.UserID;
	var UserType=jsonObj.UserType;
	var OrgType=jsonObj.OrgType;
	var db=req.db;
  
	var coll = db.get('Appraisal');

 //{"AppraisalStatus":"Approved","AppraiserID":UserID}
	
	var queryobj={};
	queryobj["AppraisalStatus"]="Approved";
	
	if(OrgType=="Individual"){
		queryobj["AppraiserID"]=UserID;
	}
	else if(OrgType=="Company"){
		//queryobj["ApproverID"]=UserID;
	  queryobj["AppraiserID"]=UserID;
	}
 
   //db.Appraisal.distinct("ManagedBy",{"AppraisalStatus":"Approved"})
   console.log("appp "+JSON.stringify(queryobj))
   coll.distinct("LenderID",queryobj,function (err, result) {
    if (err) {
     console.log(err);
	 res.send("0");
    } else if (result.length) {
		
		var ApprovedLendIDs=result;	  
		var admindb = req.admin_db
		var User=admindb.get('User');
		User.find({"UserID":{$in:ApprovedLendIDs}},function(usererr,userresult){			 
			if(err){
				res.send("0");
			}
			else if (userresult.length){
				//console.log('Found UserTable:',userresult);
				res.send(userresult);
			}
		})
		
		
    } else {
		res.send("0");
		console.log('No document(s) found with defined "find" criteria!');
	}
  })
}
catch( ex ) {
       console.dir(ex);
      }
})
module.exports = router;