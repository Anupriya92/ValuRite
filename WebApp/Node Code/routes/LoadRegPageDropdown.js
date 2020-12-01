var http = require("http");
var express = require('express');
var mongodb = require('mongodb');
var router = express.Router();
fs = require('fs');
router.post('/', function(req, res, next) 
{
	try
	{
		var db = req.db;
		var Jsonobj = req.body;
		
		console.log("Received posted data: " + JSON.stringify(Jsonobj));
			
		var paramname=Jsonobj.ParamName;
		var parentparamid=Jsonobj.ParentParamID;
		var access=Jsonobj.Access;
			
		var coll = db.get('Param');
		
		//{"ParamName":"CustOrgType","ParentParamID":"700"}
		coll.find({"ParamName":paramname,"ParentParamID":parentparamid,"ParamStatus":"Active","UserAccess":access},{fields:{_id:0,ParamID:1,ParamValue:1}},function (err, result) {
			if (err) 
			{
				res.send("0");
				console.log(err);
			} 
			else if (result.length) 
			{
				var arr = JSON.stringify(result);
				console.log(arr);
				res.send(arr);
			}
			else 
			{
				res.send("0");
				console.log('No document(s) found with defined "find" criteria!');
			}
			db.close();
		})
	}
	catch (Ex)
	{
		res.send("0");
		console.log(Ex);
		console.log("Error in getting Parameter values");
	}
});
module.exports = router;