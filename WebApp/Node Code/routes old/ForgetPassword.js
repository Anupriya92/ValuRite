var http = require("http");
var express = require('express');
var CaptureLog = require("./log.js");
capturelog = new CaptureLog();
fs = require('fs');

var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
	try
	{
			var strBody=req.body;
			console.log("Received posted data: " + strBody);
			var jsonObj = strBody;
			var userId = jsonObj.UserID;
			var db=req.db;
					var UserDetails = db.get('User');
					UserDetails.find({UserID:userId},{PasswordDetails:1,_id:0},function(err,result){
					if(err){
							console.log("Error Occured ");
							res.send("0")
						}
					else if(result.length){
							console.log("Result : "+result)
							console.log("\nResult Length : "+result.length)
							res.send(JSON.stringify(result));
						}
						else{
							console.log(result);
							res.send("0");
							
						}
					})
	}
	catch (Ex)
	{
		console.log(Ex+"Error in getting values")
	}
});
module.exports = router;