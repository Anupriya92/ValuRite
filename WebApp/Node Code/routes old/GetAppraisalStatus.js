var http = require("http");

var express = require('express');
var router = express.Router();
router.post('/', function(req, res, next) {
try
{
           var strBody = req.body;
            console.log("Received posted data: " + strBody);
			
//Getting User details.. 
var jsonObj = strBody;
var GetValuationID=jsonObj.ValuationID;
console.log(GetValuationID);
var db=req.db;
var collection = db.get('Appraisal');
collection.find({ValuationID:GetValuationID,'ValuationStatus':'true'},function(err, docs) {
		var arr = JSON.stringify(docs);
		res.send(arr);
    });
}
	catch( ex ) {
       console.dir(ex);
      }
});
module.exports = router;