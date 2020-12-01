var router = require('express').Router();

router.post('/', function(req, res, next) {
	var propertyID = req.body.PropertyID;
	delete req.body.PropertyID;
	
	req.db.get('Property').update({'PropertyID' : parseInt(propertyID)}, {$set:{'Nearby' : req.body}}, function(err, resp) {
		res.send("1");
	});
});
module.exports = router;