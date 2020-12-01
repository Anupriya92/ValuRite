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
			
//Getting ValuationGeneral details.. 
var jsonObj = strBody;
var ValuationID= jsonObj.ValuationID;
var UserID=jsonObj.UserID;
var db=req.db;
var collection = db.get('Appraisal');
collection.find({'ValuationID':ValuationID,'ValuationStatus':'true'},function(err, docs) {	
docs.forEach(function(subdocs){	
	if(jsonObj.flag){	
		var coll = db.get('Appraisal');
		coll.update({'ValuationID':ValuationID,'ValuationStatus':'true'}, {$set : {ValuationGeneralStatus : "Retrieved"}});
 		var arr = JSON.stringify(subdocs.ValuationGeneral);
        res.send(arr);
		capturelog.fnuserlog("\r\n\r\n Property ValuationGeneral Details Section --RETRIEVED-- ValuationID : "+ValuationID+", UserID : "+UserID+", Date :"+CurrentDate)
	}	
	else{		
	collection.update({'ValuationID':ValuationID,'ValuationStatus':'true'} ,
	{$set :
	{
		"ValuationGeneral" : JSON.parse(jsonObj.ValuationGeneral),
		"ValuationGeneralStatus" : "Completed"
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