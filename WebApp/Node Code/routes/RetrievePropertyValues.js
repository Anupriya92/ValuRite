var http = require("http");
var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
	try
	{
		var jsonObj = req.body;
		var loctype=jsonObj.LocationType;
		
		var zone="";
		var sro="";
		var village="";
		
		var dbquery="";
		
		if(loctype=="Zone"){
			zone=jsonObj.LocationType;
			dbquery="{}"
		}
		else if(loctype=="SRO"){
			loctype="SROLOC";
			zone=jsonObj.Zone;
			
			dbquery="{\"Zone\":\""+zone+"\"}"
		}
		else if(loctype=="Village"){
			zone=jsonObj.Zone;
			sro=jsonObj.SROLOC;
			dbquery="{\"Zone\":\""+zone+"\",\"SROLOC\":\""+sro+"\"}"
		}
		
		console.log(loctype,dbquery+" Queryy")
		dbquery=JSON.parse(dbquery)
		
		console.log(dbquery+"Json object");
		
		var db=req.db;
	  
		var RegProp = db.get('RegisteredProperty');
		
		RegProp.distinct(loctype,dbquery,function (err, result) {
			if (err) {
				console.log(err);
				res.send("0");
			} else if (result.length) {
				result = result.sort();//Added by anupriya
				res.send(JSON.stringify(result))
			}
			else {
				res.send("0");
				console.log('No document(s) found with defined "find" criteria!');
			}
		})
	}
	catch( ex ){
		   console.dir(ex);
	}
})
module.exports = router;