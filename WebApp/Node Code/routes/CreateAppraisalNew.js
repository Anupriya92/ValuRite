//=============================================
//ModifiedBy: Nirmala
//ModifiedDate: 18/06/2019
//Description: This JS is used to insert the details in DB in "Appraisal" collection.
//=============================================
var http = require("http");
var fs = require("fs")
var CaptureLog = require("./log.js");
capturelog = new CaptureLog();
var express = require('express');
var router = express.Router();
var custusrid="";
router.post('/', function(req, res, next) {
    try {
		var db = req.db;
        var strBody = req.body;
        var jsonObj = strBody;
        var UserID = jsonObj.UserID;
        var RejValuation = jsonObj.ValuationID;
        var BorrowerID = jsonObj.BorrowerID;
        var PropertyID = jsonObj.PropertyID;
        var AppraiserID = jsonObj.AppraiserID;
        var ApproverID = jsonObj.ApproverID;
        var LenderID = jsonObj.LenderID;
        var OrgType = jsonObj.ApproverID;
        var ManagedBy = "";
        var chkcombExist = "";
		var ChkLastValuation="";
        var UserRole = jsonObj.UserRole;
		var customer_ID="";
        //ApproverID - OrgType 
        if (ApproverID == "Individual" && UserRole== "User") {
            ApproverID = AppraiserID;
            ManagedBy = UserID;
			chkcombExist = { BorrowerID:BorrowerID ,PropertyID: PropertyID , AppraiserID:AppraiserID };
			ChkLastValuation={ManagedBy:UserID}
			custusrid=UserID;
			LenderID=UserID;
        } else if (ApproverID == "Company" && UserRole== "User" ) {
            ApproverID = AppraiserID;
			ManagedBy = UserID;
            AppraiserID = ""; 
			LenderID=UserID;
			ChkLastValuation={ManagedBy:UserID}
			chkcombExist = { BorrowerID:BorrowerID , PropertyID:PropertyID , AppraiserID:AppraiserID };
            custusrid=UserID;
        }
        else if (ApproverID == "Individual" && UserRole == "Ind app without lender") {
            ApproverID = UserID;
			ManagedBy = UserID;
		    AppraiserID = UserID;
			LenderID=LenderID;
			ChkLastValuation={ApproverID:UserID}
			custusrid=UserID;
			chkcombExist = { BorrowerID:BorrowerID , PropertyID:PropertyID , ApproverID:ApproverID };
        }
        else if (ApproverID == "Company" && UserRole == "Comp app without lender") {
            ApproverID = UserID;           
		    ManagedBy = UserID;
			LenderID = LenderID;
            AppraiserID = AppraiserID;
			custusrid = UserID;
			ChkLastValuation = {ApproverID:UserID}
			chkcombExist = { BorrowerID:BorrowerID , PropertyID:PropertyID , ApproverID:ApproverID };
			console.log("**************************"+ManagedBy);
        }
        var CurrentDate = new Date();
        var ChkAppraiserID = "";
        var ChkApproverID = "";
        var MongoClient = require('mongodb');
        var propobj = {
            StatusChangeDate: '',
            Reason: '',
            ApprovalStatus: '',
            LenderID: '',
            AppraiserID: '',
            ApproverID: ''
        }
			var collection = req.db.get('Appraisal');
			var obj = {
				ValuationID: RejValuation,
				PropertyID: PropertyID,
				BorrowerID: BorrowerID,
				AssignedStatus: '0'
			};
			collection.find({
                'ValuationID': RejValuation,
                'ValuationStatus': 'true'
            }, function(err, doc) {
				if(doc && doc.length > 0) {
					res.send(JSON.stringify(obj)); 
					//console.log("createnewappraisal else doc:"+ doc);
					//console.log("createnewappraisal else JSON.stringify(obj):"+ JSON.stringify(obj));
					}
				else {
					ManagedBy = UserID;
					console.log("PropertyID***"+PropertyID);
					console.log("BorrowerID***"+BorrowerID);
					console.log("AppraiserID***"+AppraiserID);
					console.log("ApproverID***"+ApproverID);
					console.log("LenderID***"+LenderID);
					console.log("CurrentDate***"+CurrentDate);
					console.log("ManagedBy***"+ManagedBy);
					console.log("RejValuation***"+RejValuation);
					collection.insert({
						"PropertyID": PropertyID,
						"BorrowerID": BorrowerID,
						"AppraiserID": AppraiserID,
						"ApproverID": ApproverID,
						"LenderID":LenderID,
						"AppraisalStatus": "Assigned",
						"AssignDate": CurrentDate, //datetime,
						"ModifiedBy": ManagedBy,
						"ManagedBy": ManagedBy,
						"ModifiedDate": CurrentDate, //datetime,
						"ValuationID": RejValuation,
						"ApprovalStatus": "New",
						"PricingStatus": "New",
						"AmenitiesStatus": "New",
						"MiscelaneousStatus":"New",
						"SummaryStatus": "New",
						"LocationStatus": "Completed",
						'ValuationStatus': 'true'										
                   }, function(err, results) {
						obj.AssignedStatus = '1';
						res.send(JSON.stringify(obj));
					});
				}
			});
    } catch (ex) {
        console.dir(ex);
    }
});
module.exports = router;