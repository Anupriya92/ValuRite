var http = require("http");
var fs = require("fs")
var express = require('express');
var router = express.Router();
router.post('/', function(req, res, next) {
try
{
           var strBody = req.body;
		   console.log("Received posted data: " + strBody);
		   var jsonObj = strBody;
		   var userId=jsonObj.UserID;
		   var newPass=jsonObj.Password;
		   var db=req.db;
		   var PassUpdate = db.get('User');
		   console.log("UserId : "+userId);
		   console.log("Password : "+newPass);
		PassUpdate.update({UserID:userId},{$set :{"PasswordDetails.Password" : newPass}},function(err,updatedReslt)
		{
			//console.log("Update : "+updatedReslt)
		if(err)
		{
			console.log("Error Occured ");
			res.send("0");
		}
		else 
		{
			console.log("updatedReslt : "+updatedReslt);
			//console.log("updatedReslt_Length : "+updatedReslt.length);
			res.send("1");
		}
		});
}
catch (Ex)
{
	console.log(Ex+"Error in getting values");
}
});
module.exports = router;