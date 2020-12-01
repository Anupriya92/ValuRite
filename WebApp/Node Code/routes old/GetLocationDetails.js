var http = require("http");

var express = require('express');
var router = express.Router();
router.post('/', function(req, res, next) {
try
{
           var strBody =req.body;
          /*req.on("data", function(chunk) {
            strBody += chunk;
          });*/
          //req.on("end", function() {
            console.log("Received posted data: " + strBody);
			
//Getting User details.. 
var jsonObj = strBody;
var GetPropertyID=jsonObj.PropertyID;

var db=req.db;
var collection = db.get('Property');
collection.find({PropertyID:GetPropertyID},function(err, docs) {
console.log(docs);
//Sending the property table details to Client
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