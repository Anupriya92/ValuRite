var http = require("http");

var express = require('express');
var router = express.Router();
//"Measurement,PropertyType"
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

            console.log("Connected to Database");
            var db = req.db;
            var coll = db.get('Param');

            // coll.find({'ParamName': {'$in' : ["Utility" , "Fitness" , "Health"]}})coll.find({ParamName:jsonObj.Unit.toString()})
            coll.find({
                'ParamID': ParamID
            }, function(err, result) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    // coll.remove({'ParamID':ParamID });
                    coll.update({
                        'ParamID': ParamID
                    }, {
                        $set: {
                            'ParamStatus': "InActive"
                        }
                    })
                }
                //Close connection
                //db.close();
                console.log("Deleted the param")
                res.send("1");
            })
        //});
    } catch (Ex) {
        console.log("connection error");
    }
});
module.exports = router;