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
			
//Getting Services details.. 
var jsonObj = strBody;
var ValuationID= jsonObj.ValuationID;
var UserID=jsonObj.UserID;
var db=req.db;
var collection = db.get('Appraisal');
collection.find({'ValuationID':ValuationID,'ValuationStatus':'true'},function(err, docs) {	
docs.forEach(function(subdocs){	
	if(jsonObj.flag){
		var coll = db.get('Appraisal');
		coll.update({'ValuationID':ValuationID,'ValuationStatus':'true'}, {$set : {ServiceStatus : "Retrieved"}});
 		var arr = JSON.stringify(subdocs.SummaryDetails.Services);
        res.send(arr);
		capturelog.fnuserlog("\r\n\r\n Services Details Section --RETRIEVED-- ValuationID : "+ValuationID+", UserID : "+UserID+", Date :"+CurrentDate)
	}	
	else{		
		
	collection.update({'ValuationID':ValuationID,'ValuationStatus':'true'} ,
	{$set :
	{
		"SummaryDetails.Services" :JSON.parse(jsonObj.ServiceDetails),			
		"ServiceStatus" : "Completed"
	}
	
	    
	}), {upsert : true} 
          res.send("1");
		  capturelog.fnuserlog("\r\n\r\n Update Services Details Section --SUCCESS-- ValuationID : "+ValuationID+", UserID : "+UserID+", ServicesModifiedDate :"+CurrentDate);	
	
	}
})
    
}); 
 } catch( ex ) {
       console.dir(ex);
      }
});
module.exports = router;