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
					"ScheduleID":{$exists:true}
                }
            },
            {
                $lookup: {
                    from: "User",
                    localField: "BorrowerID",
                    foreignField: "UserID",
                    as: "UserDet"
                }
            },
            {
                $unwind: "$UserDet"
            },
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
                $lookup: {
                    from: "Schedule",
                    localField: "ScheduleID",
                    foreignField: "ScheduleID",
                    as: "OldSchedule"
                }
            },
            {
                $project: {
					ValuationID: 1,
                    BorrowerName: "$UserDet.UserName",
                    BorrowerMob: "$UserDet.ContactDetails.MobileNo",
					EmailID:"$UserDet.ContactDetails.EmailID",
                    PropertyType: "$PropertyDet.PropertyType",
                    PropertyAddress: "$PropertyDet.Address",
					TestVal:"$OldSchedule",
                    "PrevSchedule": {
						"$filter": {
							"input": "$OldSchedule",
							"as": "child",
							"cond": { $or: [ { $eq: [ "$$child.Archieved", "Y" ] }, { $eq: [ "$$child.Archieved", "N" ] } ] }
						}
					},
					"CurrentSchedule":{
						"$filter": {
								"input": "$OldSchedule",
								"as": "child1",
								"cond": { "$eq": [ "$$child1.Archieved", "N" ] }
							}
					}
                }
            }
			
        ]

        ObjAppraisalTable.aggregate(Aggregateobj, function(apprErr, apprResult) {
            if (apprErr) {
                console.log(apprErr);
                res.send("0");
            } else if (apprResult.length) {
                console.log("Result Found:" + JSON.stringify(apprResult));
                var JsonResponse = JSON.stringify(apprResult);
                res.send(JsonResponse);
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