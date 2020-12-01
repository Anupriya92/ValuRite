var http = require("http");
var express = require('express');
var mongodb = require('mongodb');
var fs = require("fs")
var CaptureLog = require("./log.js");
capturelog = new CaptureLog();

var express = require('express');
var router = express.Router();
router.post('/', function(req, res, next) {
try
{
           var strBody = req.body;
         /* req.on("data", function(chunk) {
            strBody += chunk;
          });*/
          //req.on("end", function() {
            console.log("Received posted data: On CompleteApp Status " + strBody);
			var jsonObj = strBody;
			var ValuationID = jsonObj.ValuationID;
			var UserID=jsonObj.UserID;
			var MongoClient = require('mongodb');
			var CurrentDate = new Date(); 
			console.log("Connected to Database");
			var db=req.db;
			var collection = db.get('Appraisal');
			
			collection.update({'ValuationID':ValuationID,'ValuationStatus':'true'}, {$set : {"AppraisalStatus" : "Completed","ModifiedBy" :UserID,"ModifiedDate" : CurrentDate,"DateofValuation" : CurrentDate}},function(err,result){
			
				if(err){
					res.send("0");
				}
				else{
					console.log(result);
					res.send("1");
					capturelog.fnuserlog("\r\n\r\n AppraisalCompletedStatus -- Completed  -- ValuationID : "+ValuationID+", UserID : "+UserID+", Date :"+new Date())
				}
			});
		  //});
		   
		  
      } catch( ex ) {
       console.dir(ex);
      }
});
module.exports = router;