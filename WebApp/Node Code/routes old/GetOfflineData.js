var http = require("http");
var express = require('express');


fs = require('fs');
var router = express.Router();
router.post('/', function(req, res, next) {
 try
 {
 var strBody=req.body;
 var jsonObj = strBody;
 var CollectionName=jsonObj.CollectionName;

 var db=req.db;
  
 var coll = db.get(CollectionName);
 
  coll.find({},function(err,userresult){    
   if(err){
	   console.log('Error in offline data');
    res.send("0");
   }
   else if (userresult.length){
   // console.log('Found UserTable:',userresult);
    var arr = JSON.stringify(userresult);
	console.log(arr);
	res.send(arr);
   }
   else
   {
	   console.log('No data length in offline data');
	  res.send("0");
   }
  });
}
catch( ex ) {
       console.dir(ex);
}
});
module.exports = router;