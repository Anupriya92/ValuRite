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
                  //  var ApprovedStatus = jsonObj.ApprovedStatus;
                    var NonApprovalReason = jsonObj.NonApprovalReason;
                    var GovtAuthorityID = jsonObj.GovtAuthorityID;
                    var ApprovalNoandDate = jsonObj.ApprovalNoandDate;
                   // var ReleaseCertNo = jsonObj.ReleaseCertNo;
                    var SurveyReportDetail = jsonObj.SurveyReportDetail;
                    var CertMatchStatus = jsonObj.CertMatchStatus;
                    var CertDeviationReason = jsonObj.CertDeviationReason;
                    var SketchMatchStatus = jsonObj.SketchMatchStatus;
                    var SketchDeviationReason = jsonObj.SketchDeviationReason;
                    //var MarkedforGovtProj = jsonObj.MarkedforGovtProj;
                   // var DeRegulatedZoneProject = jsonObj.DeRegulatedZoneProject;
                  //  var RegnStatus = jsonObj.RegnStatus;

                  //  var RegnDate = jsonObj.RegnDate;
                    var Zone = jsonObj.Zone;
                    var Village = jsonObj.Village;
                    var SroLocation = jsonObj.SroLocation;
                    var SurveyNumber = jsonObj.SurveyNumber;
                    var SurveyDate = jsonObj.SurveyDate;
                   // var UndividedShare = jsonObj.UndividedShare;
                    //var RegnValue = jsonObj.RegnValue;
                    var RegnName = jsonObj.RegnName;
                    var PropertyTaxLand = jsonObj.PropertyTaxLand;
					var PropertyTaxHouse = jsonObj.PropertyTaxHouse;
					var PropertyTaxWater = jsonObj.PropertyTaxWater;
                    var CurrentDate = new Date();
                    collection.update({
                        'ValuationID': ValuationID,
                        'ValuationStatus': 'true'
                    }, {
                        $set: {
                            "ApprovalDetails": {
                               // "ApprovedStatus": ApprovedStatus,
                                "GovtAuthorityID": GovtAuthorityID,
								"ApprovalAuthReason": jsonObj["ApprovalAuthReason"],
                                "ApprovalNoandDate": ApprovalNoandDate,
                                "NonApprovalReason": NonApprovalReason
                            },
                            "RegnDetails": {
                               // "RegnStatus": RegnStatus,
								"RegnReason": jsonObj["RegnReason"],
                             //   "RegnDate": RegnDate,
                               // "RegnValue": RegnValue,
                                "RegnName": RegnName,

                                "Zone": Zone,
                                "Village": Village,
                                "SroLocation": SroLocation,
                                "SurveyNumber": SurveyNumber,
                                "SurveyDate": SurveyDate,
                                //"UndividedShare": UndividedShare
                            },
							"PropertyTaxLand": PropertyTaxLand,
							"PropertyTaxHouse": PropertyTaxHouse,
							"PropertyTaxWater": PropertyTaxWater,
							//"earmarkForGovt": jsonObj["earmarkForGovt"],
							"forestOrCoastalReason": jsonObj["forestOrCoastalReason"],
                            //"ReleaseCertNo": ReleaseCertNo,
                           // "MarkedforGovtProj": MarkedforGovtProj,
                            //"DeRegulatedZoneProject": DeRegulatedZoneProject,
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
                                        var undchck;
                                        if (undchck == result.string._) {
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
                                            resjson = JSON.parse(resjson)

                                            var sqftkey = resjson.GuideSQ;
                                            var sqmtkey = resjson.GuideMetrics;


                                            var splittedval = sqftkey.split('/');
                                            var splittedsqmt = sqmtkey.split('/');

                                            var sqftval;
                                            var sqmtval;

                                            var undchkkk;
                                            if (splittedval[1] != undchkkk) {
                                                if (splittedval[1].trim() == "Acre") {
                                                    sqftval = splittedval[0] / 43560;
                                                    sqftval = parseFloat(sqftval).toFixed(2);

                                                } else {
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