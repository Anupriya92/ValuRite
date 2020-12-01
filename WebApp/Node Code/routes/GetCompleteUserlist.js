var http = require("http");
var express = require('express');
var express1 = require('mongodb');

fs = require('fs');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    try {
		var db = req.admin_db;
        var coll = db.get('User');
        coll.find({}, function(err, result) {
            if (err) {
                console.log(err);
            } else if (result.length) {
                var arr = JSON.stringify(result);
                console.log(arr);
                res.send(arr);
            } else {
                console.log('No document(s) found with defined "find" criteria!');
                res.send('2');
            }
            //Close connection
            db.close();
        })
    } catch (Ex) {
        console.log("Error in getting Parameter values")
    }
});
module.exports = router;