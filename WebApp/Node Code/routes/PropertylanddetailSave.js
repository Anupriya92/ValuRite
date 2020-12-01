var http = require("http");
var fs = require("fs")
var CaptureLog = require("./log.js");
capturelog = new CaptureLog();

var express = require('express');
var router = express.Router();
router.post('/', function(req, res, next) {
try
{
    var strBody = req.body;
			
//Getting Property Building details.. 
var jsonObj = strBody;
var ValuationID= jsonObj.ValuationID;
var UserID=jsonObj.UserID;
var db=req.db;
console.log("ValuationID " + ValuationID);
var collection = db.get('Appraisal');
collection.find({'ValuationID':ValuationID,'ValuationStatus':'true'},function(err, docs) {	
console.log("docs "+JSON.stringify(docs))
docs.forEach(function(subdocs){	
	if(jsonObj.flag){
		var coll = db.get('Appraisal');
		coll.update({'ValuationID':ValuationID,'ValuationStatus':'true'}, {$set : {LandStatus : "Retrieved"}});
 		var arr = JSON.stringify(subdocs.LandDetails);
        res.send(arr);
		capturelog.fnuserlog("\r\n\r\n Property Land Details Section --RETRIEVED-- ValuationID : "+ValuationID+", UserID : "+UserID+", Date :"+CurrentDate)
	}	
	else{		
		
	collection.update({'ValuationID':ValuationID,'ValuationStatus':'true'},
	{$set :
	{
		"LandDetails" : JSON.parse(jsonObj.LandDetails),
		"LandStatus" : "Completed"
	}
	
	    
	}), {upsert : true} 
          console.log("Data written"); 
		  res.send("1");
		  capturelog.fnuserlog("\r\n\r\n Update Property Land Details Section --SUCCESS-- ValuationID : "+ValuationID+", UserID : "+UserID+", PropertyBuildingModifiedDate :"+CurrentDate);	
	
	}
})
    
}); 
 } catch( ex ) {
       console.dir(ex);
      }
});
module.exports = router;