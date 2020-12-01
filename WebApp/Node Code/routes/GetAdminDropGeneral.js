var http = require("http");
var express = require('express');
var mongodb = require('mongodb');

var express = require('express');
var router = express.Router();
fs = require('fs');

router.post('/', function(req, res, next) {
	try{
		var strBody = req.body;	 
        var jsonObj = strBody;
		var admin_db = req.admin_db;
		var coll = admin_db.get('User');	
		
		console.log("Admin Details1111            "+JSON.stringify(req.body));
		//var jsonObj = JSON.parse(req.body)
		//console.log(jsonObj.Unit);
		//var array=req.body.Unit;
		var UserID=jsonObj.UserID;
		//var obj=array.split(',');
		//console.log(obj)
		
		console.log("Admin Details            "+JSON.stringify(UserID))
		
		
		
		
		// coll.find({'ParamName': {'$in' : ["Utility" , "Fitness" , "Health"]}})coll.find({ParamName:jsonObj.Unit.toString()})
		coll.find({'UserID': UserID,'UserStatus':'Active'},function (err, result) {
			 if (err) {
				console.log(err);
			} 
			else if (result.length) { 
				var arr = JSON.stringify(result);
				console.log("Admin           "+arr); 
				res.send(arr);
				} 
				else 
				{
				console.log('No document(s) found with defined "find" criteria!');
				} 
		});
	}
	catch(Ex)
	{
	console.log("connection error "+Ex);
	}
	//res.send('1');
});
module.exports = router;