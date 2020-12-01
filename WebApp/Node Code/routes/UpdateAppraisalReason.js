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

		var jsonObj = strBody;
		var ValuationID= jsonObj.ValuationID;
		var UserID=jsonObj.UserID;
		var LenderID=jsonObj.LenderID;
		var AppraiserID=jsonObj.AppraiserID;
		var ApprovalDate=jsonObj.ApprovalDate;
		var ApprovalReason=jsonObj.ApprovalReason;
		var ApprovalStatus=jsonObj.ApprovalStatus;
		var AppraisalStatus=ApprovalStatus.split(',');
		AppraisalStatus=AppraisalStatus[AppraisalStatus.length-1];
		var CurrentDate = new Date();
		
			console.log("Connected to Database");
			var db=req.db;
			var collection = db.get('Appraisal');
			
			collection.update({'ValuationID':ValuationID,'ValuationStatus':'true'} ,
			{$set :
				{

					"AppraisalStatus" :AppraisalStatus,
					"PropertyApproval" :{
						 "StatusChangeDate":ApprovalDate,
						 "Reason":ApprovalReason,
						 "ApprovalStatus":ApprovalStatus,
						 "LenderID":LenderID,
						 "AppraiserID":AppraiserID
					},
					"ModifiedBy" : UserID,
					"ModifiedDate" : CurrentDate
				}
			},function(err, results){
					if(err){
						res.send("0");
						capturelog.fnuserlog("\r\n\r\n Lender Approval Section  -- ERROR - ValuationID : "+ ValuationID + ",AppraisalStatus : "+AppraisalStatus+", Date :"+CurrentDate+", LenderID : "+UserID+", Error : "+err)
					}
					else{
						console.log("Data written");
						res.send("1");
						capturelog.fnuserlog("\r\n\r\n Lender Approval Section  -- SuccessFully Updated - ValuationID : "+ ValuationID + ", AppraisalStatus : "+AppraisalStatus+", ModifiedDate :"+CurrentDate+", LenderID : "+UserID)
					}
			})
	//});   
  } catch( ex ) {
       console.dir(ex);
    }
});
module.exports = router;