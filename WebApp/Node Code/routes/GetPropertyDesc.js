////Loads Property details based on the Borrower Selection..
var http = require("http");
var express = require('express');
fs = require('fs');

var express = require('express');
var router = express.Router();
router.post('/', function(req, res, next) {
	try
	{
		var jsonAddress="";
		var PropertyID;

		var obj={
			address:[],
			propid:[]
		}

		var strBody=req.body;
		/*req.on("data", function(chunk) {
            strBody += chunk;
          });*/
		  //req.on("end", function() {
        console.log("Received posted data: " + strBody);
		var jsonObj = strBody;
		console.log(jsonObj.ValuationID + "12314321ValuationID");
		var UserID=jsonObj.UserID
		console.log(jsonObj.UserID+'UserID')
			
				console.log("Connected to Database");
				var db=req.db;
				var ApprovedRec = db.get('Appraisal');
				var PropIDS=[];
				
				ApprovedRec.find({AppraisalStatus:"Approved"},{PropertyID:1,_id:0},function(err,result){
					if(err){
						
					}
					else{
						result.forEach(function(AppRec){	
							console.log(AppRec.PropertyID)						
							PropIDS.push(parseInt(AppRec.PropertyID, 10));
						})
						
						console.log(PropIDS);
						var propCol = db.get('Property');
						var i=0;
							propCol.find({ PropertyID: { $nin: PropIDS } ,"createdby":UserID} ,function(err, result1) 
							{
								//console.log("Property Result: " + result1);
								if(err){
									
								}
								else{
									
									jsonAddress = JSON.stringify(result1);
									console.log("Final output : "+jsonAddress);
									res.send(jsonAddress);
								}
							});
							delete obj;						
					}
				})
				
	//});
}
catch (Ex)
{
	console.log(Ex+"Error in getting Parameter values")
}
});
module.exports = router;