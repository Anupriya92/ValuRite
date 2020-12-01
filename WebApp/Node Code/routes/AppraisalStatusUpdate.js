var http = require("http");
var fs = require("fs")
var CaptureLog = require("./log.js");
capturelog = new CaptureLog();

var express = require('express');
var router = express.Router();
router.post('/', function(req, res, next) {
    try {
        var strBody = req.body;
        /*req.on("data", function(chunk) {
            strBody += chunk;
        });*/
        //req.on("end", function() {
            console.log("Received posted data: " + strBody);

            //Getting User details.. 
            var jsonObj = strBody;
            var GetValuationID = jsonObj.ValuationID;
            var GetAppraisalStatus = jsonObj.AppraisalStatus;
            var UserID = jsonObj.UserID;
            var CurrentDate = new Date();
			var DateOfInspection=new Date();
			var updatedata = {};
			if(GetAppraisalStatus=="InProgress"){
				updatedata = {
								"AppraisalStatus" : GetAppraisalStatus,
								"ModifiedDate" : CurrentDate,
								"ModifiedBy" : UserID,
								"DateofInspection" : DateOfInspection
							};
			}
			else if(GetAppraisalStatus=="Completed"){
				updatedata = {
								"AppraisalStatus" : GetAppraisalStatus,
								"ModifiedDate" : CurrentDate,
								"ModifiedBy" : UserID,
								"DateofValuation" : CurrentDate
							};
			}
			else{
				updatedata = {
								"AppraisalStatus" : GetAppraisalStatus,
								"ModifiedDate" : CurrentDate,
								"ModifiedBy" : UserID
							};
			}
			
			
			
			//chkcombExist = "{ \"BorrowerID\":\"" + BorrowerID + "\",\"PropertyID\":" + PropertyID + ",\"AppraiserID\":\"" + AppraiserID + "\" }";
			//Date of Inspection

            var db = req.db;
            var collection = db.get('Appraisal');
            collection.find({
                ValuationID: GetValuationID,
                'ValuationStatus': 'true'
            }, function(err, docs) {

                //updating the Status in Appraisal collection
                collection.update({
                    ValuationID: GetValuationID,
                    'ValuationStatus': 'true'
                }, {
                    $set: updatedata
                }, function(err, results) {
                    if (err) {
                        capturelog.fnuserlog("\r\n\r\n AppraisalStatusUpdate -- Updation Failed -- ValuationID : " + GetValuationID + ", UpdatedStatus : " + GetAppraisalStatus + ", UserID : " + UserID + ", Date :" + CurrentDate + ", Error Occurred : " + err)
                        console.log(err);
                    } else {
                        res.send("1");
                        capturelog.fnuserlog("\r\n\r\n AppraisalStatusUpdate -- SUCCESS -- ValuationID : " + GetValuationID + ", UpdatedStatus : " + GetAppraisalStatus + ", UserID : " + UserID + ", Date :" + CurrentDate)
                        
                    }
                });

            });
       // });
    } catch (ex) {
        console.dir(ex);
    }
});
module.exports = router;