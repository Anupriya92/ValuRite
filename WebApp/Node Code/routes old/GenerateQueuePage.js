//To Generate Pie Chart 
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

            var jsonObj = strBody;
            var AppraiserID = jsonObj.AppraiserID;
            var LenderID = jsonObj.LenderID;
            var OrgType = jsonObj.OrgType;

            if (AppraiserID == "" || AppraiserID == null) {
                query = "{\"ManagedBy\":\"" + LenderID + "\",\"ValuationStatus\":\"true\",\"AppraisalStatus\":{\"$in\":[\"Approved\",\"Submitted\",\"Rejected\",\"Assigned\",\"InProgress\",\"Completed\",\"Submitted to Approver\",\"Approved By Approver\",\"Rejected By Approver\"]}}";
                query = JSON.parse(query);
            } else if ((LenderID == "" || LenderID == null) && OrgType == "Company") {
                query = "{ \"ApproverID\":\"" + AppraiserID + "\",\"ValuationStatus\":\"true\",\"AppraisalStatus\":{\"$in\":[\"Assigned\",\"InProgress\",\"Completed\",\"Rejected\",\"Submitted\",\"Approved\",\"Submitted to Approver\",\"Approved By Approver\",\"Rejected By Approver\"]}}";
                query = JSON.parse(query);
            } else if (LenderID == "" || LenderID == null) {
                console.log("This is Indiviudal Appraiser")
                query = "{ \"AppraiserID\":\"" + AppraiserID + "\",\"ValuationStatus\":\"true\",\"AppraisalStatus\":{\"$in\":[\"Assigned\",\"InProgress\",\"Completed\",\"Rejected\",\"Submitted\",\"Approved\",\"Submitted to Approver\",\"Approved By Approver\",\"Rejected By Approver\"]}}";
                query = JSON.parse(query);
            }

            console.log("Connected to Database");
            var db = req.db;
            var coll = db.get('Appraisal');

            coll.find(query,{sort:{
                'AssignDate': -1
            }}, function(err, result) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    console.log('Found:', result);
                    var i = 0;
                    var arr = JSON.stringify(result);
                    console.log('Arr:   ', arr);
                    res.send(arr);
                    capturelog.fnuserlog("\r\n\r\n AppraiserQueue -- RETRIEVED  -- UserID : " + AppraiserID + ", Date :" + new Date())
                } else {
                    res.send("0");
                    capturelog.fnuserlog("\r\n\r\n AppraiserQueue -- RETRIEVAL FAILED  -- UserID : " + AppraiserID + ", Date :" + new Date())
                    console.log('No document(s) found with defined "find" criteria!');
                }
            })

        //});
    } catch (Ex) {
        console.log("connection error");
    }
});
module.exports = router;