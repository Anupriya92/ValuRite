var http = require("http");
var fs = require("fs")
var CaptureLog = require("./log.js");
capturelog = new CaptureLog();

var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    try {
        var strBody = req.body;
        console.log("Received posted data: " + strBody);

        //Getting Property Appraisal details.. 
        var jsonObj = strBody;
        //var PropertyID = jsonObj.PropertyID;
        var ValuationID = jsonObj.ValuationID;
        var UserID = jsonObj.UserID;
        //var pid=parseInt(PropertyID);

        var db = req.db;
        var collection = db.get('Appraisal');
        collection.find({
            'ValuationID': ValuationID,
            'ValuationStatus': 'true'
        }, function(err, docs) {
            //console.log(docs);
            //console.log(docs.ApprovalStatus);
            docs.forEach(function(subdocs) {
                //console.log(subdocs.ApprovalStatus)


                if (subdocs.ApprovalStatus == "Completed") {
                    //console.log("Retrieved");
                    var coll = db.get('Appraisal');
                    coll.update({
                        'ValuationID': ValuationID,
                        'ValuationStatus': 'true'
                    }, {
                        $set: {
                            ApprovalStatus: "Retrieved"
                        }
                    });
                    var arr = JSON.stringify(subdocs);
                    res.send(arr);
                    capturelog.fnuserlog("\r\n\r\n ApprovalDetails -- RETRIEVED -- ValuationID : " + ValuationID + ", UserID  : " + UserID + ", Date :" + new Date())
                } else {
                    var ApprovedStatus = jsonObj.ApprovedStatus;
                    var NonApprovalReason = jsonObj.NonApprovalReason;
                    var GovtAuthorityID = jsonObj.GovtAuthorityID;
                    var ApprovalNoandDate = jsonObj.ApprovalNoandDate;
                    var ReleaseCertNo = jsonObj.ReleaseCertNo;
                    var SurveyReportDetail = jsonObj.SurveyReportDetail;
                    var CertMatchStatus = jsonObj.CertMatchStatus;
                    var CertDeviationReason = jsonObj.CertDeviationReason;
                    var SketchMatchStatus = jsonObj.SketchMatchStatus;
                    var SketchDeviationReason = jsonObj.SketchDeviationReason;
                    var MarkedforGovtProj = jsonObj.MarkedforGovtProj;
                    var DeRegulatedZoneProject = jsonObj.DeRegulatedZoneProject;
                    var RegnStatus = jsonObj.RegnStatus;

                    var RegnDate = jsonObj.RegnDate;
                    var Zone = jsonObj.Zone;
                    var Village = jsonObj.Village;
                    var SroLocation = jsonObj.SroLocation;
                    var SurveyNumber = jsonObj.SurveyNumber;
                    var SurveyDate = jsonObj.SurveyDate;
                    var UndividedShare = jsonObj.UndividedShare;
                    var RegnValue = jsonObj.RegnValue;
                    var RegnName = jsonObj.RegnName;
                    var PropertyTaxDetails = jsonObj.PropertyTaxDetails;
                    var CurrentDate = new Date();
                    collection.update({
                        'ValuationID': ValuationID,
                        'ValuationStatus': 'true'
                    }, {
                        $set: {
                            "ApprovalDetails": {
                                "ApprovedStatus": ApprovedStatus,
                                "GovtAuthorityID": GovtAuthorityID,
                                "ApprovalNoandDate": ApprovalNoandDate,
                                "NonApprovalReason": NonApprovalReason
                            },
                            "RegnDetails": {
                                "RegnStatus": RegnStatus,
                                "RegnDate": RegnDate,
                                "RegnValue": RegnValue,
                                "RegnName": RegnName,

                                "Zone": Zone,
                                "Village": Village,
                                "SroLocation": SroLocation,
                                "SurveyNumber": SurveyNumber,
                                "SurveyDate": SurveyDate,
                                "UndividedShare": UndividedShare
                            },
                            "PropertyTaxDetails": PropertyTaxDetails,
                            "ReleaseCertNo": ReleaseCertNo,
                            "MarkedforGovtProj": MarkedforGovtProj,
                            "DeRegulatedZoneProject": DeRegulatedZoneProject,
                            "ApprovalStatus": "Completed",
                            "ApprovalModifiedDate": CurrentDate,
                            "ModifiedDate": CurrentDate,
                            "ModifiedBy": UserID
                        }
                    }, {
                        upsert: true
                    }, function(err, ApprovalResult) {
                        console.log("Data written");
                        //res.send('1');
                        var myhttp = require("http");
                        var parseString = require("xml2js").parseString; // npm install xml2js

                        function getHttp(host, path, callback) {
                            console.log("Entered Get Http function")
                            console.log("Host" + host)
                            console.log("Path" + path)
                            console.log("Callback" + callback)
                            return myhttp.get({
                                host: host,
                                path: path
                            }, function(response) {
                                if (response) {
                                    var body = "";

                                    response.on("data", function(d) {
                                        body += d;
                                    });

                                    response.on("error", function(e) {
                                        console.log("Error" + e)
                                    });

                                    response.on("end", function() {
                                        callback(body);
                                    });
                                }
                            });
                        }
                        if (SurveyNumber != "") {
                            getHttp("182.72.100.214", '/PropertyGuideLine/GetGuideLine.asmx/ScrapBySurveyNumber?SurveyNo=' + encodeURIComponent(SurveyNumber.trim()) + '&Zone=' + encodeURIComponent(Zone.trim()) + '&SRO=' + encodeURIComponent(SroLocation.trim()) + '&Village=' + encodeURIComponent(Village.trim()), function(data) {
                                parseString(data, function(err, result) {
                                    if (err) {
                                        console.log("Error in parsing" + data)
                                        //remove GuideLineValue 
                                        var AppraisalColl = db.get('Appraisal');
                                        AppraisalColl.update({
                                            'ValuationID': ValuationID,
                                            'ValuationStatus': 'true'
                                        }, {
                                            $unset: {
                                                "GuideLineValue": null,
                                                "GuidelineValue": null,
                                                "Guidelinesqft": null

                                            }
                                        })

                                        res.send('3');
                                    } else {
                                        console.log(err + "My Error")
                                        console.log(JSON.stringify(result) + "Main Result")
                                        var undchck;
                                        if (undchck == result.string._) {
                                            console.log(JSON.stringify(result.string) + "string Result")


                                            //remove GuideLineValue 
                                            var AppraisalColl = db.get('Appraisal');
                                            AppraisalColl.update({
                                                'ValuationID': ValuationID,
                                                'ValuationStatus': 'true'
                                            }, {
                                                $unset: {
                                                    "GuideLineValue": null,
                                                    "GuidelineValue": null,
                                                    "Guidelinesqft": null

                                                }
                                            })

                                            res.send('2');
                                        } else {
                                            var resjson = result.string._;
                                            console.log(JSON.stringify(resjson) + "Final Result Json")
                                            resjson = JSON.parse(resjson)
                                            console.log(resjson.GuideSQ)

                                            var sqftkey = resjson.GuideSQ;
                                            var sqmtkey = resjson.GuideMetrics;


                                            var splittedval = sqftkey.split('/');
                                            var splittedsqmt = sqmtkey.split('/');

                                            var sqftval;
                                            var sqmtval;


                                            console.log(splittedval[1] + "splitted val 1")
                                            var undchkkk;
                                            if (splittedval[1] != undchkkk) {
                                                if (splittedval[1].trim() == "Acre") {
                                                    sqftval = splittedval[0] / 43560;
                                                    sqftval = parseFloat(sqftval).toFixed(2);
                                                    console.log(sqftval + " Per Square Feet ");

                                                } else {
                                                    console.log(splittedval[0] + " Per Square Feet without dividing ");
                                                    sqftval = splittedval[0];
                                                }

                                                if (splittedsqmt[1].trim() == "Hect.") {
                                                    sqmtval = splittedsqmt[0] / 10000;
                                                } else {
                                                    sqmtval = splittedsqmt[0];
                                                }
                                                var AppraisalColl = db.get('Appraisal');
                                                AppraisalColl.update({
                                                        'ValuationID': ValuationID,
                                                        'ValuationStatus': 'true'
                                                    }, {
                                                        $set: {
                                                            "GuideLineValue": {
                                                                PerSQft: sqftval,
                                                                PerSQMet: sqmtval
                                                            },

                                                        }
                                                    },
                                                    function(err, Appres) {
                                                        if (err) {
                                                            res.send('0');
                                                            console.log("Updated Failed");
                                                        } else {
                                                            res.send('1');
                                                            console.log("Updated SuccessFully");
                                                        }
                                                    })
                                            } else {
                                                //remove GuideLineValue 
                                                var AppraisalColl = db.get('Appraisal');
                                                AppraisalColl.update({
                                                    'ValuationID': ValuationID,
                                                    'ValuationStatus': 'true'
                                                }, {
                                                    $unset: {
                                                        "GuideLineValue": null,
                                                        "GuidelineValue": null,
                                                        "Guidelinesqft": null

                                                    }
                                                })
                                                res.send('2');
                                            }
                                        }
                                    }
                                });
                            });
                        } else {
                            res.send('1');
                            console.log("Updated SuccessFully");
                        }

                        capturelog.fnuserlog("\r\n\r\n ApprovalDetails Update -- SUCCESS -- ValuationID : " + ValuationID + ", UserID : " + UserID + ", ApprovalModifiedDate :" + CurrentDate)
                    });
                }
            });
        });
    } catch (ex) {
        //console.dir(ex);
        console.log("Catch" + ex);
        res.send('0');
    }
});
module.exports = router;