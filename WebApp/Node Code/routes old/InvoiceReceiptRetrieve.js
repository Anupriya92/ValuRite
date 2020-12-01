var http = require("http");
var express = require('express');


fs = require('fs');
var router = express.Router();
router.post('/', function(req, res, next) {
 try
 {
	
	var jsonObj = req.body;
	
	var UserID=jsonObj.UserID;
	var LenderIDs=jsonObj.LenderID;
	
	var LenArr=[];
	LenArr.push(LenderIDs);
	
	console.log(typeof LenArr)
	
	var db=req.db;
  
 var coll = db.get('Invoice');

   //db.Appraisal.distinct("ManagedBy",{"AppraisalStatus":"Approved"})
   coll.find({"LenderID":{$in:LenArr},"AppraiserID":UserID},{fields:{_id:0}},function (err, result) {
    if (err) {
		console.log(err);
		res.send("0");
    } else if (result.length) {
		console.log('Found:', result);
		res.send(JSON.stringify(result));
	} else {
		res.send("0");
		console.log('No document(s) found with defined "find" criteria!');
    }
  })

//})
}
catch( ex ) {
       console.dir(ex);
      }
})
module.exports = router;