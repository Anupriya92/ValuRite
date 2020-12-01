////Loads Property details based on the Borrower Selection..
var http = require("http");
fs = require('fs');
var jsonAddress="";
var PropertyID;
// var Rejlist = new Object();

var express = require('express');
var router = express.Router();
router.post('/', function(req, res, next) {
	try
	{
			var Rejlist={
				propID:[],
				valID:[],
				AppID:[],
				BrwrID:[]
			}
		var strBody=req.body;
		/*req.on("data", function(chunk) {
            strBody += chunk;
          });*/
		  //req.on("end", function() {
        console.log("Received posted data: " + strBody);
		var jsonObj = strBody;
		console.log(jsonObj.ValuationID + "12314321ValuationID");
		var UserID=jsonObj.UserID;
		var OrgType=jsonObj.Organization;
		var query="";
		if(OrgType=="Company"){
			query="{\"ApproverID\":\""+UserID+"\",\"AppraisalStatus\":\"Rejected By Approver\",\"ValuationStatus\":\"true\"}";
			query=JSON.parse(query);
		}else{
			query="{\"ManagedBy\":\""+UserID+"\",\"AppraisalStatus\":\"Rejected\",\"ValuationStatus\":\"true\"}";
			query=JSON.parse(query);
		}
		console.log(JSON.stringify(query));
		
				console.log("Connected to Database");
				var db=req.db;
				var AppraisalCol = db.get('Appraisal');
				var i=0;
					AppraisalCol.find(query,function(err, docs) 
					{
						if(err){
							console.log(err+"check")
							res.send('0');
						}
						else{
							console.log(docs.length+"doc len"+JSON.stringify(docs)+" type of"+ typeof docs)
							if(docs.length==0){
								console.log("No record found")
								res.send('0');
							}
							else{
								docs.forEach(function(doc){
									console.log(doc.PropertyID)
									Rejlist.propID[i]=doc.PropertyID;
									Rejlist.valID[i]=doc.ValuationID;
									Rejlist.AppID[i]=doc.AppraiserID;
									Rejlist.BrwrID[i]=doc.BorrowerID;
									i++;
								})
								jsonAddress = JSON.stringify(Rejlist);
								console.log(Rejlist+"check123"+jsonAddress)
								res.send(jsonAddress);
							}
						}
					});
	//});
}
catch (Ex)
{
	console.log(Ex+"Error in getting Parameter values")
}
});
module.exports = router;