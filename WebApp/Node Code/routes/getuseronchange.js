var http = require("http");


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

            var UserID = jsonObj.UserID;
            console.log(UserID);

            var db = req.admin_db;

            var coll = db.get('User');


            // coll.find({'ParamName': {'$in' : ["Utility" , "Fitness" , "Health"]}})coll.find({ParamName:jsonObj.Unit.toString()})
            coll.find({
                'UserID': UserID
            },function(err, result) {
                if (err) {
                    console.log(err);
					res.send(err);
                } else if (result.length) {
                    var arr = JSON.stringify(result);
                    console.log(arr);
                    res.send(arr);
                } else {
                    console.log('No document(s) found with defined "find" criteria!');
					res.send("0");
                }
            })
        //});
    } catch (Ex) {
        console.log("connection error");
    }
});
module.exports = router;