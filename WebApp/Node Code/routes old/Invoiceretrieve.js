var http = require("http");
var express = require('express');


fs = require('fs');
var router = express.Router();
router.post('/', function(req, res, next) {
    try
    {
        var jsonObj=req.body;
        var UserID=jsonObj.UserID;
        var txtstartdate=jsonObj.fromdate;
        var txtenddate=jsonObj.todate;
        var LenderID=jsonObj.LenderID;
		var OrgType=jsonObj.OrgType;
		console.log(typeof LenderID)
	
        var db=req.db;
		var query="";
        var coll = db.get('Appraisal');
        var BorrIDS = [];

        var finalresArr = [];
        
		LenderID = LenderID.split(",");
		
		// var txtstartdate=""
		// var txtenddate=""
		//var fromdate=""
		//var todate="";
		console.log(txtstartdate);
		console.log(txtenddate);

		if(OrgType=="Company"){
			console.log("Company check with date")
			console.log(txtstartdate);
			console.log(txtenddate);
			if(txtstartdate != "" && txtenddate != ""){
			query={"AppraisalStatus":"Approved","ApproverID":UserID,
			"ModifiedDate": { "$gte":new Date(txtstartdate), "$lt":new Date(txtenddate) },
			"LenderID":{ "$in" : LenderID },
			"InvoiceNo" : { "$exists" : false }
			},
			{
				fields:
				{
					InvoiceAmt:1,ValuationID:1,BorrowerID:1,_id:0
			}};
		}
		else if (txtstartdate == "" && txtenddate == ""){
			console.log("Company check without date")
			console.log(txtstartdate);
			console.log(txtenddate);
			query={"AppraisalStatus":"Approved","ApproverID":UserID,
			"LenderID":{ "$in" : LenderID },
			"InvoiceNo" : { "$exists" : false }
			},
			{
				fields:
				{
					InvoiceAmt:1,ValuationID:1,BorrowerID:1,_id:0
			}};
		}
		}
		else if(OrgType=="Individual"){
		
			console.log("Individual check with date")
			console.log(txtstartdate);
			console.log(txtenddate);
			if(txtstartdate != "" && txtenddate != ""){
			query={"AppraisalStatus":"Approved","AppraiserID":UserID,
			"ModifiedDate": { "$gte":new Date(txtstartdate), "$lt":new Date(txtenddate) },
			"LenderID":{ "$in" : LenderID },
			"InvoiceNo" : { "$exists" : false }
			},
			{
				fields:
				{
					InvoiceAmt:1,ValuationID:1,BorrowerID:1,_id:0
			}};
		}
		else if (txtstartdate == "" && txtenddate == ""){
			console.log("Individual check without date")
			console.log(txtstartdate);
			console.log(txtenddate);
			query={"AppraisalStatus":"Approved","AppraiserID":UserID,
			"LenderID":{ "$in" : LenderID },
			"InvoiceNo" : { "$exists" : false }
			},
			{
				fields:
				{
					InvoiceAmt:1,ValuationID:1,BorrowerID:1,_id:0
			}};
		}
			
		}
		console.log("Invoice Retrieve Page")
        //db.Appraisal.distinct("ManagedBy",{"AppraisalStatus":"Approved"})
        coll.find(query,function (err, result) {
            if (err) {
                console.log(err);
                res.send("0");
                //res.send();
            } else if (result.length) {

                result.forEach(function(UserRec){	
                   // console.log("Borrower ID" + UserRec.BorrowerID)
                    BorrIDS.push(UserRec.BorrowerID);
                    //console.log("Result" + result);  
                })

                var Usercoll = db.get('User');
                Usercoll.find({ "UserID": { $in: BorrIDS } }, { fields: {UserID:1, UserName: 1, _id: 0 } }, function (err, UserResult) {
                    if (err) {
                        console.log(err + " Error Occurred")
                        res.send("0");
                    }
                    else if (UserResult.length) {
						
                       // console.log('Found: UserResult', UserResult);
                        result.forEach(function (Appobj) {

                            UserResult.forEach(function (userobj) {

                                if (Appobj.BorrowerID == userobj.UserID) {

                                    var finaljson = {};

                                    finaljson["ValuationID"] = Appobj.ValuationID;
                                    finaljson["InvoiceAmt"] = Appobj.InvoiceAmt;
                                    finaljson["BorrowerID"] = userobj.UserID;
                                    finaljson["BorrowerName"] = userobj.UserName;

                                    finalresArr.push(finaljson);
                                }


                            })                           

                        })

                        //console.log("Final Result Array" + JSON.stringify(finalresArr));
                        res.send(finalresArr);
                        //result.push(UserResult);
                    }
                    else {
                        res.send("0");
                        console.log('No document(s) found with defined "find" criteria!');
                    }
                })
            }
            else{
                //console.log('Found:', result);
                res.send("0");
            }
           //console.log(BorrIDS);
           // console.log(result);  
        })
 }

  
catch( ex ) {
       console.dir(ex);
}
})
module.exports = router;