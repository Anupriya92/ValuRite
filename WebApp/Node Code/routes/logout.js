// var http = require("http");
// var express = require('express');
// var fs = require("fs")
// var CaptureLog = require("./log.js");
// capturelog = new CaptureLog();

// var router = express.Router();
// router.post('/', function(req, res, next) {
//     try {
// 		console.log("++++++++++++++++++++++++++++++++++++++++++++")
// 		 var strBody = req.body;
//         console.log("Received posted data: " + strBody);
// 		 var jsonObj = strBody;
// 		 var session_id = jsonObj.sessionID;
// 		 var userID = jsonObj.UserID;
		
// 		console.log("session"+session_id +"userid" + userID)
// 		var db = req.admin_db;
//         var collection = db.get('Userlogs');
// 		console.log("++++++++++++++++++++++++++++++++++++++++++++")
// 		 let tdytime = new Date();
// 		collection.update({ 'session_id': session_id, 'logout_time': { $eq: null } },
//                             {
//                                 $set: {
//                                     'logout_time': tdytime
//                                 }
//                             }, { multi: true });
//                         var obj = { status: 'Valid' }
//                         var arr = JSON.stringify(obj);
//                         res.send(arr);
//                         res.end();
	
// 		 }
//     catch (ex) {
// 		 console.log("Catch" + ex);
//     }
// });
// module.exports = router;

var http = require("http");
var express = require('express');
var fs = require("fs")
var CaptureLog = require("./log.js");
capturelog = new CaptureLog();
var router = express.Router();
router.post('/', function (req, res, next) {
    try {
		 //console.log("in logutout")
        var strBody = req.body;
        var jsonObj = strBody;
		
        var EmailID = jsonObj.UserID.toLowerCase();
        var param = jsonObj.type;
        var session_id = jsonObj.sessionID;
        // DB connection
        const db = req.admin_db;
        var collection = db.collection('Userlogs');
        var usercollection = db.collection('User');
        //console.log("in logutout")
        //*******************************Retrieves set of docs matching the find Criteria**********************************//
        var match = {};
        if (param == "killsession") {
            match = { 'email_id': EmailID, 'logout_time': { $eq: null } }
        } else {
            match = { 'email_id': EmailID, 'session_id': session_id, 'logout_time': { $eq: null } }
        }
        collection.find(match, function (err, docs) {
            if (docs == "") {
                var obj = { status: 'InValid' }
                var arr = JSON.stringify(obj);
                res.send(arr);
                res.end();
            }
            else {
                try {
                    let nowtime = new Date();
                    if (param == "logout") {
                        collection.update({ 'email_id': EmailID, 'session_id': session_id, 'logout_time': { $eq: null } },
                            {
                                $set: {
                                    'logout_time': nowtime
                                }
                            }, { multi: true });
                        var obj = { status: 'Valid' }
                        var arr = JSON.stringify(obj);
                        res.send(arr);
                        res.end();
                    } else if (param == "sessionupdate") {
                        collection.update({ 'email_id': EmailID, 'session_id': session_id, 'logout_time': { $eq: null } },
                            {
                                $set: {
                                    'session_update_time': nowtime
                                }
                            });
                        var obj = { status: 'Valid' }
                        var arr = JSON.stringify(obj);
                        res.send("Valid");
                        res.end();
                    }
                    else if (param == "killsession") {
                        collection.update({ 'email_id': EmailID, 'logout_time': { $eq: null } },
                            {
                                $set: {
                                    'logout_time': docs[0].session_update_time
                                }
                            }, { multi: true });
                        var obj = { status: 'Valid' }
                        var arr = JSON.stringify(obj);
                        res.send('Valid');
                        res.end();
                    }
                }
                catch (ex) {
                    res.end();
                }
            }
        });
    }
    catch (ex) {
    }
});
module.exports = router;