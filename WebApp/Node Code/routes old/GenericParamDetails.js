var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
	try{
		var db = req.db;
		var coll = db.get('Param');	
		//var coll = db.collection('Param');
		//Getting country, state, city list from Param collection
		console.log(req.body);
		//var jsonObj = JSON.parse(req.body)
		//console.log(jsonObj.Unit);
		var array=req.body.Unit;
		
		var obj=array.split(',');
		console.log(obj)
		
		console.log("Generic Param Details")
		
		// coll.find({'ParamName': {'$in' : ["Utility" , "Fitness" , "Health"]}})coll.find({ParamName:jsonObj.Unit.toString()})
		coll.find({'ParamName': {'$in' : obj},'ParamStatus':'Active'},function (err, result) {
			 if (err) {
				console.log(err);
			} 
			else if (result.length) { 
				console.log('Found:', result);
				var arr = JSON.stringify(result);
				console.log(arr); 
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