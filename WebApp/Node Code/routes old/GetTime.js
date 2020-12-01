var http = require("http");


//variable declarations
var propid;
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
			
			//Getting Property Appraisal details.. 
var jsonObj = strBody;
//var PropertyID = jsonObj.PropertyID;
var ValuationID= jsonObj.ValuationID;
//var pid=parseInt(PropertyID);
console.log(ValuationID);

console.log("Connected to Database");
var db=req.db;
var collection = db.get('Appraisal');
collection.find({'ValuationID':ValuationID,'ValuationStatus':'true'},function(err, docs) {
	console.log(docs);
	docs.forEach(function(subdocs){
		        propid=subdocs.PropertyID;
                console.log("Connected to Database");
				console.log(propid);
				var collection1= db.collection('Property');
				collection1.find({'PropertyID':propid},function(err, docs1) {
				console.log(docs1);
				docs1.forEach(function(subdocs1){
	            var obj={
				    //get from property collection
					LocationTime:subdocs1.LocationModifiedDate,
					//get from Appraisal collection
					ApprovalTime:subdocs.ApprovalModifiedDate,
					PricingTime:subdocs.PricingModifiedDate,
					AmenitiesTime:subdocs.AmenitiesModifiedDate,
					SummaryTime:subdocs.SummaryModifiedDate,
					LocationStatus:subdocs.LocationStatus,
					ApprovalStatus:subdocs.ApprovalStatus,
					PricingStatus:subdocs.PricingStatus,
					AmenitiesStatus:subdocs.AmenitiesStatus,
					MiscelaneousTime:subdocs.MiscelaneousModifiedDate,
					MiscelaneousStatus:subdocs.MiscelaneousStatus,
					SummaryStatus:subdocs.SummaryStatus
			    }
			    var arr = JSON.stringify(obj);
			    res.write(arr);
			    //res.write(doc.status);
                res.end();
			
			
			});
    
});


});  	
			
			
			
});

			
			 //});
      } 
	  catch( ex ) {
       console.dir(ex);
      }


});
module.exports = router;