var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
	var db = req.db;
	var user = req.body.user;
	var session = req.body.sessionID;
	
	var collection = db.collection('User');
	
	if(req.body.type == "check")
	{
		
		try {
			collection.find({"UserID" : user, "sessionID" : session}, function(err, doc)
			{
				if(doc && doc.length > 0) res.send("1");
				else res.send("0");
				
			});
		}
		catch(ex) { console.log("Session error = "+ex); res.send("0"); }
	}
	else if(req.body.type == "update")
	{
		try {
			console.log("On session update");
			collection.update({"UserID" : user, "sessionID" : req.body.exSessionID}, {$set: { "sessionID" : session }}); 
			res.send("0");
		}
		catch(ex) { console.log("Session error = "+ex); res.send("0"); }
	}
	
});
module.exports = router;