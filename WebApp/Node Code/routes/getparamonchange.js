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

            var ParamID = jsonObj.ParamID;
            console.log(ParamID);
            var db = req.db;
            var coll = db.get('Param');


            // coll.find({'ParamName': {'$in' : ["Utility" , "Fitness" , "Health"]}})coll.find({ParamName:jsonObj.Unit.toString()})
            coll.find({
                'ParamID': ParamID
            }, function(err, result) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    var arr = JSON.stringify(result);
                    console.log(arr);
                    res.send(arr);
                } else {
                    console.log('No document(s) found with defined "find" criteria!');
                }
            })

        //});
    } catch (Ex) {
        console.log("connection error");
    }
});
module.exports = router;