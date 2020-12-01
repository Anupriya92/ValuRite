var http = require("http");
var express = require('express');
var mongodb = require('mongodb');

var express = require('express');
var router = express.Router();
fs = require('fs');
router.get('/', function(req, res, next) {
	try
	{
			var db = req.db;
			var coll = db.get('Param');
			//Getting country, state, city list from Param collection
			var queryParam = ["Country","State","City"];
 		coll.find({'ParamName': {'$in': queryParam},'ParamStatus':"Active"},{sort: {"ParamName" : 1,"ParamValue" : 1}},function (err, result) {
				if (err) {
					console.log(err);
				} else if (result.length) {
								var arr = JSON.stringify(result);
								console.log(arr);
								res.send(arr);
						} else {
							console.log('No document(s) found with defined "find" criteria!');
				}
 				//Close connection
				db.close();
		})
	}
	catch (Ex)
	{
		console.log(Ex)
		console.log("Error in getting Parameter values")
	}
});
module.exports = router;