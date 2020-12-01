var http = require("http");
var express = require('express');
var mongodb = require('mongodb');

fs = require('fs');


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
			
			
			var jsonObj = strBody;
			var BorrowerID = jsonObj.BorrowerID;
			
			console.log("UserrrID"+BorrowerID);
			
			console.log("Connected to Database");
			var collection = db.get('User');
			collection.find({UserID:BorrowerID},function(err, docs) {
			console.log(docs);
			var arr = JSON.stringify(docs);
								console.log(arr);
								res.send(arr);
				});
		  //});
      } catch( ex ) {
       console.dir(ex);
      }
});
module.exports = router;