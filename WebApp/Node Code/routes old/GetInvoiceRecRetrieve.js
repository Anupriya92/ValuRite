var http = require("http");
var express = require('express');


fs = require('fs');
var router = express.Router();
router.post('/', function(req, res, next) {
 try
 {
	var jsonObj=req.body;
	var UserID=jsonObj.UserID;
	var LenderID=jsonObj.LenderID;
	
	var db=req.db;
  
 var coll = db.get('Appraisal');

   //db.Appraisal.distinct("ManagedBy",{"AppraisalStatus":"Approved"})
   coll.find({"AppraisalStatus":"Approved","AppraiserID":UserID,"LenderID":LenderID},{fields:{{InvoiceAmt:1,ValuationID:1,_id:0}},function (err, result) {
    if (err) {
     console.log(err);
	 res.send("0");
	 //res.send();
    } else if (result.length) {
      console.log('Found:', result);

		res.send(result);
      } else {
		  res.send("0");
       console.log('No document(s) found with defined "find" criteria!');
    }
  })

 })
}
catch( ex ) {
       console.dir(ex);
      }
})
module.exports = router;