var http = require("http");
var fs = require("fs")
var CaptureLog = require("./log.js");
var MongoClient = require('mongodb');
capturelog = new CaptureLog();


var express = require('express');
var router = express.Router();
router.post('/', function(req, res, next) {
    try {
        var strBody = req.body;
        /*req.on("data", function(chunk) {
            strBody += chunk;
        });*/
        // req.on("end", function() {
        console.log("Received posted data: " + strBody);
        //Using PropertyID Assigning a Appraiser.
        //AppraisalStatus 
        var db = req.db;
        var jsonObj = strBody;
        var UserID = jsonObj.UserID;
        var ValuationID = jsonObj.ValuationID
        var AppraiserID = jsonObj.AppraiserID;
        var Reassign = jsonObj.Reassign;

        console.log("Connected to Database");
        var collection = db.get('Appraisal');

        collection.find({
                'ValuationID': ValuationID,
                'ValuationStatus': 'true'
            }, function(err, activerec) {
                activerec.forEach(function(doc) {
                    console.log("Length Of the Property Approval Section" + doc.PropertyApproval);
                    var a;
                    if (doc.PropertyApproval != a) {
                        console.log("Index" + doc.PropertyApproval.AppraiserID.indexOf(AppraiserID))
                        console.log("doc App" + doc.PropertyApproval.AppraiserID)
                        if (doc.PropertyApproval.AppraiserID.indexOf(AppraiserID) == -1) {
                            var appcoll = db.get('Appraisal');
                            appcoll.update({
                                'ValuationID': ValuationID,
                                'ValuationStatus': 'true'
                            }, {
                                $set: {
                                    ValuationStatus: 'false'
                                }
                            }, {
                                upsert: true
                            }, function(err, result) {
                                if (err) {
                                    console.log("Error In Updating records Status to False");
                                    console.log(err);
                                    res.end("0");
                                } else {
                                    console.log("Appraiser ID Insert With default Values");
                                    var insappcoll = db.get('Appraisal');
                                    insappcoll.insert({
                                        "PropertyID": doc.PropertyID,
                                        "BorrowerID": doc.BorrowerID,
										"LenderID":doc.LenderID,
                                        "AppraiserID": AppraiserID,
                                        "ApproverID": UserID,
                                        "AppraisalStatus": "Assigned",
                                        "AssignDate": new Date(),
                                        "ModifiedBy": UserID,
                                        "ManagedBy": doc.ManagedBy,
                                        "ModifiedDate": new Date(),
                                        "ValuationID": ValuationID,
                                        "ApprovalStatus": "New",
                                        "PricingStatus": "New",
                                        "AmenitiesStatus": "New",
										"MiscelaneousStatus":"New",
                                        "SummaryStatus": "New",
                                        "LocationStatus": "Completed",
                                        'ValuationStatus': 'true',
                                        "PropertyApproval": {
                                            "StatusChangeDate": doc.PropertyApproval.StatusChangeDate,
                                            "Reason": doc.PropertyApproval.Reason,
                                            "ApprovalStatus": doc.PropertyApproval.ApprovalStatus,
                                            "LenderID": doc.PropertyApproval.LenderID,
                                            "AppraiserID": doc.PropertyApproval.AppraiserID
                                        }
                                    }, function(err, results) {
                                        if (err) {
                                            var obj = {
                                                ValuationID: ValuationID,
                                                PropertyID: doc.PropertyID,
                                                BorrowerID: doc.BorrowerID,
                                                AssignedStatus: '0'
                                            }
                                            var jsonarr = JSON.stringify(obj)
                                            console.log("-----------Insert failed---------");
                                            res.end(jsonarr);
                                        } else {
                                            console.log("Appraiser ID Insert Success");
                                            var obj = {
                                                ValuationID: ValuationID,
                                                PropertyID: doc.PropertyID,
                                                BorrowerID: doc.BorrowerID,
                                                AssignedStatus: '1'
                                            }
                                            var jsonarr = JSON.stringify(obj)
                                            capturelog.fnuserlog("\r\n\r\n Appraisal Creation -- Successfully Created - ValuationID : " + obj.ValuationID + ", PropertyID : " + obj.PropertyID + ", BorrowerID : " + obj.BorrowerID + ", Date :" + new Date() + ", UserID : " + UserID)
                                            res.send(jsonarr);
                                        }
                                    });
                                }
                            });
                        } else {
                            var appcoll1 = db.get('Appraisal');
                            appcoll1.update({
                                'ValuationID': ValuationID,
                                'ValuationStatus': 'true'
                            }, {
                                $set: {
                                    ValuationStatus: 'false'
                                }
                            }, {
                                upsert: true
                            }, function(err, result) {
                                if (err) {
                                    console.log("Update False err")
                                    console.log(err)
                                } else {
									console.log("Update False done")
                                    var appcollelse = db.get('Appraisal');
                                    appcollelse.update({
                                        'ValuationID': ValuationID,
                                        "AppraiserID": AppraiserID
                                    }, {
                                        $set: {
                                            "ValuationStatus": "true",
                                            "AppraisalStatus": "Assigned",
                                            "PropertyApproval": {
                                                "StatusChangeDate": doc.PropertyApproval.StatusChangeDate,
                                                "Reason": doc.PropertyApproval.Reason,
                                                "ApprovalStatus": doc.PropertyApproval.ApprovalStatus,
                                                "LenderID": doc.PropertyApproval.LenderID,
                                                "AppraiserID": doc.PropertyApproval.AppraiserID
                                            }
                                        }
                                    }, {
                                        upsert: true
                                    }, function(err, result) {
                                        if (err) {
                                            console.log("Error in Updating the Record Status to False ")
                                            console.log(err)
                                            res.end("0");
                                        } else {
                                            console.log("Appraiser ID Updated Success");
                                            var obj = {
                                                ValuationID: ValuationID,
                                                PropertyID: doc.PropertyID,
                                                BorrowerID: doc.BorrowerID,
                                                AssignedStatus: '1'
                                            }
                                            var jsonarr = JSON.stringify(obj)
                                                //capturelog.fnuserlog("\r\n\r\n Appraisal Creation -- Successfully Created - ValuationID : " + obj.ValuationID + ", PropertyID : " + obj.PropertyID + ", BorrowerID : " + obj.BorrowerID + ", Date :" + new Date() + ", UserID : " + UserID)
                                            res.send(jsonarr);
                                        }
                                    })
                                }
                            })
                        }

                    } else {
                        var coll = db.get('Appraisal');
                        coll.update({
                            'ValuationID': ValuationID,
                            'ApproverID': UserID
                        }, {
                            $set: {
                                'AppraiserID': AppraiserID
                            }
                        }, {
                            upsert: true
                        }, function(err, result) {
                            if (err) {
                                console.log("Appriaser Assign Failed: " + err)
                                res.end("0");
                            } else {
                                getValuationdetails(ValuationID, res, db);
                            }
                        });

                    }
                })

            })
            //});
    } catch (ex) {
        console.dir(ex);
    }
});
module.exports = router;

function getValuationdetails(valid, res, database) {
    var ValuationID;
    var PropertyID;
    var BorrowerID;
    var db = database;
    var collection = db.get('Appraisal');
    collection.find({
        'ValuationID': valid,
        'ValuationStatus': 'true'
    }, function(err, activerec) {
        if (err) {
            console.log("Appriaser Assign Failed: " + err)
            res.end("0");
        } else {
            activerec.forEach(function(doc) {
                var obj = {
                    ValuationID: doc.ValuationID,
                    PropertyID: doc.PropertyID,
                    BorrowerID: doc.BorrowerID,
                    AssignedStatus: '1'
                }
                var json = JSON.stringify(obj)
                console.log("Appraiser Assigned successfully: " + json)
                res.send(json);
            });
        }
    })
}