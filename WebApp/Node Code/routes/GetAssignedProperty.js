var http = require("http");
var express = require('express');
var express = require('mongodb');
fs = require('fs');

var express = require('express');
var router = express.Router();
router.post('/', function(req, res, next) {
    try {
        var strBody = req.body;

        console.log("Received posted data: " + strBody);
        var jsonObj = strBody;
        var UserID = jsonObj.UserID;

        var db = req.db;
        var ObjAppraisalTable = db.get('Appraisal');

        var Aggregateobj = [{
                $match: {
                    "AppraiserID": UserID,
                    "AppraisalStatus": "Assigned",
                    "ValuationStatus": "true",
					"ScheduleID":{$exists:false}
                }
            },
            //{
            //   $lookup: {
            //       from: "User",
            //       localField: "BorrowerID",
            //        foreignField: "UserID",
            //       as: "UserDet"
            //    }
            // },
            //  {
            //     $unwind: "$UserDet"
            // },
            {
                $lookup: {
                    from: "Property",
                    localField: "PropertyID",
                    foreignField: "PropertyID",
                    as: "PropertyDet"
                }
            },
            {
                $unwind: "$PropertyDet"
            },			
            {
                $project: {
                    ValuationID: 1,
                    // BorrowerName: "$UserDet.UserName",
                    // BorrowerMob: "$UserDet.ContactDetails.MobileNo",
					// EmailID:"$UserDet.ContactDetails.EmailID",
                    PropertyType: "$PropertyDet.PropertyType",
                    PropertyAddress: "$PropertyDet.Address"
                }
            }
        ]

        ObjAppraisalTable.aggregate(Aggregateobj, function(apprErr, apprResult) {
            if (apprErr) {
                console.log(apprErr);
                res.send("0");
            } else if (apprResult.length) {
				console.log("inside ***")
				var obj ={};
				//var JsonResponse = JSON.stringify(apprResult);				
				var admindb = req.admin_db;
				var colladmin = admindb.get('User');
                colladmin.find({
                         'UserID': UserID
                    }, function(err, result) {						
						if (err) {
                            console.log(err);
                            res.send("0");
                         } else if (result.length) {								
							obj ={
								'BorrowerName':result[0].UserName,
								'BorrowerMob':result[0].ContactDetails.MobileNo,
								'EmailID':result[0].ContactDetails.EmailID
								};	       
						 }
						 const finalobj = { ...apprResult, ...obj };
					console.log("finalobj "+JSON.stringify(finalobj));				
			//apprResult ={..obj};
			var JsonResponse = JSON.stringify(finalobj);
			console.log("appp "+JSON.stringify(JsonResponse));
			res.send(JsonResponse);
					});			
						
					
					
					 
               
            } else {
                console.log("No documents Found");
                res.send("1");
            }
        })
    } catch (Ex) {
        console.log("ex" + Ex.message);
    }
});
module.exports = router;