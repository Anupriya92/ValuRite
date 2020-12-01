var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
	
    var db = req.db;
    var collection = db.get('Property');
    collection.find({},function(e,docs){
	console.log(e);
	console.log(docs); 
	});	
			//var strBody = JSON.stringify(req.params);
            //console.log("Received posted data: " + strBody);
			//res.send(req.params); 
			//res.send(req.params);

	//});
	console.log(req.body);      // your JSON
   res.send(req.body.Hello);    // echo the result back
});

module.exports = router;