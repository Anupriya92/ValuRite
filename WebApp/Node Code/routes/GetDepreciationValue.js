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
var SelectedValues= jsonObj.SelectedValues;
//var UserID=jsonObj.UserID;
var db=req.db;

var collection = db.get('Param');
collection.find({'ParamValue':SelectedValues},function(err, docs) {	
console.log("docs "+JSON.stringify(docs))
var arr = JSON.stringify(docs);
	console.log(arr);
	res.send(arr);

    
}); 
 } catch( ex ) {
       console.dir(ex);
      }
});
module.exports = router;