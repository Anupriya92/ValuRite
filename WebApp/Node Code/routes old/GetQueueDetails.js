var http = require("http");
var express = require('express');
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
			
		//Getting UserType details.. 
          var jsonObj = strBody;
          var AppraiserID=jsonObj.AppraiserID;
		  var AppraisalStatus=jsonObj.AppraisalStatus;
		  var Orgtype=jsonObj.OrgType;
		  var query="";
		 
		  var query2="";
		  if(Orgtype=="Company"){
			  if(AppraisalStatus=="ALL"){
				
				query="{\"ValuationStatus\":\"true\",\"AppraiserID\" : \""+AppraiserID+"\",\"AppraisalStatus\":{\"$in\":[\"Submitted\",\"Rejected\",\"Assigned\",\"InProgress\",\"Completed\",\"Submitted to Approver\",\"Approved By Approver\",\"Rejected By Approver\"]}}";
				query=JSON.parse(query)  
				console.log(query)
			  }
			  else{
				query="{\"ValuationStatus\":\"true\",\"ApproverID\" : \""+AppraiserID+"\",\"AppraisalStatus\" :\""+ AppraisalStatus+"\" }"
				query=JSON.parse(query)  
				console.log(query)
			  }
			  
		  }
		  else{
			if(AppraisalStatus=="ALL"){
				query="{\"ValuationStatus\":\"true\",\"AppraiserID\" : \""+AppraiserID+"\",\"AppraisalStatus\":{\"$in\":[\"Submitted\",\"Rejected\",\"Assigned\",\"InProgress\",\"Completed\",\"Submitted to Approver\",\"Approved By Approver\",\"Rejected By Approver\"]}}";
				query=JSON.parse(query)
				console.log(query)
			}
			else{
				query="{\"ValuationStatus\":\"true\",\"AppraiserID\" : \""+AppraiserID+"\",\"AppraisalStatus\" :\""+ AppraisalStatus+"\" }"
				query=JSON.parse(query)
			}
			 
		  }

			console.log("Connected to Database");
			var db = req.db;
			var coll = db.get('Appraisal');
			//Getting the property details for current appraiser
 		coll.find(query,{sort:{'AssignDate':-1}},function (err, result) {
				if (err) {
					console.log(err);
				} else if (result.length) {
						// console.log('Found:', result);
						var i =0;
								var arr = JSON.stringify(result);
								 //console.log('Arr:   ',arr);
								 res.send(arr);
								
						} else {
							res.send("0");
							console.log('No document(s) found with defined "find" criteria!');
						}
		})

	//});
	}
	catch(Ex)
	{
	console.log("connection error");
	}
});
module.exports = router;