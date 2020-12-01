var http = require("http");
var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
	try
	{	
		var db=req.db;
		var coll = db.get('User');
		
		coll.find({UserStatus:"Active",UserType:"Appraiser"},{fields:{UserID:1,UserName:1}},function (err, result) {
			if (err)
			{
				console.log(err);
				res.send('0');
			}
			else if (result.length)
			{
				var arr = JSON.stringify(result);
				res.send(arr);
			}
			else 
			{
				res.send('0');
				console.log('No document(s) found with defined "find" criteria!');
			}
		})
	}
	catch (Ex)
	{
		res.send('0');
		console.log("Error in getting Parameter values")
	}
});
module.exports = router;