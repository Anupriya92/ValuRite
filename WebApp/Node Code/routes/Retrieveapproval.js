//Getting Approval Section Details Using ValuationID and ValuationStatus->true
var http = require("http");
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
				var ValuationID= jsonObj.ValuationID;
					var db=req.db;
					var coll = db.get('Appraisal');
					coll.find({'ValuationID':ValuationID,'ValuationStatus':'true'},function(err, docs){
						var arr = JSON.stringify(docs);
						res.send(arr);
					});
			//});
}
catch( ex ) {
       console.dir(ex);
      }
});
module.exports = router;