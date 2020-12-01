var http = require("http");
var express = require('express');
var mongodb = require('mongodb');

var LocationStatus;
var ApprovalStatus;
var PricingStatys;
var AmenitiesStatus;
var SummaryStatus;

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
			var ValuationID = jsonObj.ValuationID;
			
			var db=req.db;
			var collection = db.get('Appraisal');
			collection.find({'ValuationID':ValuationID,'ValuationStatus':'true'},function(err, docs) {
				console.log(docs);
				console.log(docs.SummaryStatus);
				docs.forEach(function(subdocs){
					LocationStatus=subdocs.LocationStatus;
					ApprovalStatus=subdocs.ApprovalStatus;
					PricingStatys=subdocs.PricingStatus;
					AmenitiesStatus=subdocs.AmenitiesStatus;
					SummaryStatus=subdocs.SummaryStatus;
					MiscelaneousStatus=subdocs.MiscelaneousStatus;
					if(LocationStatus=="Retrieved")
					{
						collection.update({'ValuationID':ValuationID,'ValuationStatus':'true'}, {$set : { LocationStatus : "Completed"}});
					}
					else if(ApprovalStatus=="Retrieved")
					{
						collection.update({'ValuationID':ValuationID,'ValuationStatus':'true'}, {$set : { ApprovalStatus : "Completed"}});
					}
					else if(PricingStatys=="Retrieved")
					{
						collection.update({'ValuationID':ValuationID,'ValuationStatus':'true'}, {$set : { PricingStatus : "Completed"}});
					}
					else if(AmenitiesStatus=="Retrieved")
					{
						collection.update({'ValuationID':ValuationID,'ValuationStatus':'true'}, {$set : { AmenitiesStatus : "Completed"}});
					}
					else if(SummaryStatus=="Retrieved")
					{
						collection.update({'ValuationID':ValuationID,'ValuationStatus':'true'}, {$set : { SummaryStatus : "Completed"}});
					}
					else if(MiscelaneousStatus=="Retrieved")
					{
						collection.update({'ValuationID':ValuationID,'ValuationStatus':'true'}, {$set : { MiscelaneousStatus : "Completed"}});
					}						
			});
		  });
		  //});
		   res.send("1");
      } catch( ex ) {
       console.dir(ex);
      }


});
module.exports = router;