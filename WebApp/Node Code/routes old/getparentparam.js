var http = require("http");

var express = require('express');
var router = express.Router();
//"Measurement,PropertyType"
router.get('/', function(req, res, next) {
    try {
        var db = req.db;
        var coll = db.get('Param');
        coll.find({}, function(err, result) {
            if (err) {
                console.log(err);
            } else if (result.length) {
                console.log('Found:', result);
                var arr = JSON.stringify(result);
                console.log(arr);
                res.send(arr);
            } else {
                console.log('No document(s) found with defined "find" criteria!');
            }
        })
    } catch (Ex) {
        console.log("Error in getting Parameter values")
    }
});
module.exports = router;