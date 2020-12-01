var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
	//DB connection 
	try {
		var db = req.admin_db;
		var collection = db.collection('menu');
		console.log("sadf")
		//*******************************Retrieves set of docs matching the find Criteria**********************************//
		collection.find({}, function (err, docs) {
			//Check for Empty docs     
			if (err) throw new Error(err)
			var arr = JSON.stringify(docs);
			res.send(arr);
		});
	}
	catch (ex) {
	}
});
module.exports = router;