//Get Borrower information of Approved records of a Appraiser
var http = require("http");
var express = require('express');
var express = require('mongodb');
fs = require('fs');

var express = require('express');
var router = express.Router();


router.post('/', function(req, res, next) {
    try {
		var obj = {
			BorrowerID: []
		}
        var strBody = req.body;
        console.log("Received posted data: GetBorrower.APP" + strBody);

        //Reading Values from the Received Data
        var jsonObj = strBody;
        var AppraiserID = jsonObj.AppraiserID;
		//var ApproverID = jsonObj.ApproverID;
	    var LenderID = jsonObj.LenderID;
        var UserRole = jsonObj.UserRole;
        var UserType = jsonObj.UserType;
        var OrgType = jsonObj.OrgType;
		//var UserID = jsonObj.UserID;

		var query="";
		console.log(UserType+"This is my user type")
		console.log(OrgType+"This is my organization type")
		console.log(AppraiserID+"This is my user id")
        if (UserType == "Appraiser") {
			console.log("Appraiser Check")
            if (OrgType == "Individual") {
				console.log("Appraiser Individual Check")
                    query = "{ \"AppraiserID\":\"" + AppraiserID + "\",\"AppraisalStatus\":\"Approved\",\"ValuationStatus\":\"true\" }";
                    query = JSON.parse(query);
            }			
			else if (OrgType == "Company") {
				console.log("Appraiser Company Check")
                    query = "{ \"ApproverID\":\"" + AppraiserID + "\",\"AppraisalStatus\":\"Approved\",\"ValuationStatus\":\"true\" }";
                    query = JSON.parse(query);

            }
        }
		else if (UserType == "Lender") {
			console.log("Lender Check")
            query = "{ \"ManagedBy\":\"" + LenderID + "\",\"AppraisalStatus\":\"Approved\",\"ValuationStatus\":\"true\" }";
            query = JSON.parse(query);
        }
        var db = req.db;
        var coll = db.get('Appraisal');
        //Getting Approved Records of a Appraiser and Reading the BorrowerID
        coll.find(query, function(err, result) {
            if (err) {
                console.log(err);
            } else if (result.length) {
                var i = 0;
				//console.log("No of Approved Records"+result.length)
                var arr = JSON.stringify(result);
                result.forEach(function(temp) {
                    //console.log(temp.BorrowerID);
                    obj.BorrowerID[i] = temp.BorrowerID;
                    i++;
                })
                //console.log(obj.BorrowerID)
               // console.log("Borrower List"+obj.BorrowerID.toString())
                var testbrwr = obj.BorrowerID.toString()
                var mytestbrwr = testbrwr.split(',')
               // console.log(obj.BorrowerID + " Inside for loop")

                var usrCol = db.get('User');
                usrCol.find({
                    'UserID': {
                        $in: mytestbrwr
                    }
                }, function(err, result) {
                   // console.log(result)
                    var jsonobj = JSON.stringify(result)
                    res.send(jsonobj);
                });
            } else {
                console.log('No document(s) found with defined "find" criteria!');
                res.send("0");
            }
        })

        //})
    } catch (Ex) {
        console.log("connection error"+Ex);
    }
});
module.exports = router;