var http = require("http");
var fs = require('fs');
var arr;

var express = require('express');
var router = express.Router();
router.post('/', function(req, res, next) {
	try
	{
           var strBody = req.body;
          /*req.on("data", function(chunk) {
            strBody += chunk;
          });*/
          //req.on("end", function() {
            console.log("Received posted data: " + strBody);
			
       //Getting UserType details.. 
          var jsonObj = strBody;
          var PropList=jsonObj.PropList;
		  console.log("  PropList   "+PropList);
		  console.log(typeof PropList)
		var type =typeof PropList;
		if(type == "string")
		{
			PropList = JSON.parse(PropList);
			console.log(typeof PropList)
		}
			console.log("Connected to Database");
			var db=req.db;
			var coll = db.get('Property');
			//Getting the property details for current appraiser
 		coll.find({'PropertyID' : {'$in' : PropList}},function (err, doc) {
				if (err) {
					console.log(err);
					res.send("0");
				} else if (doc.length) {
								 arr = JSON.stringify(doc)
								 console.log('Arr:   ',arr);
								 res.send(arr);
								
						} else {
							console.log('No document(s) found with defined "find" criteria!');
							res.send("0");
						}
		})
	//});
	}
	catch(Ex)
	{
	console.log("connection error");
	}
});
module.exports = router;