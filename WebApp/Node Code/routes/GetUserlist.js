var http = require("http");
var express = require('express');
var router = express.Router();
router.post('/', function(req, res, next) {
	try
	{
		var strBody=req.body;
		var jsonObj = strBody;
		var UserID=jsonObj.UserID;
		var UserType=jsonObj.UserType;
		var UserRole=jsonObj.UserRole;
		var compName =jsonObj.CompanyName;
		var db=req.admin_db;
		var coll = db.get('User');
		var queryParam = "";
	   
		console.log("Get User List Js")
		
		console.log(UserRole+"User Role");
		console.log(UserID+"UserID")
		console.log(UserType+"User Type");
		console.log(compName+"Company");
		
		if(UserType=="Lender"){
			console.log("Lender")
			queryParam={'UserType': {'$in': ["Borrower","Appraiser"]},"CompanyName":compName,UserStatus:"Active"}
			// queryParam={'UserType': {'$in': ["Borrower","Appraiser"]},"CreatedByUserid":UserID,UserStatus:"Active"}
		}
		else{
			console.log("Appraiser")
			if(UserRole!="Ind app without lender" && UserRole!="Comp app without lender"){
				console.log("Company With Lender")
				queryParam={'UserType': {'$in': ["Appraiser","Borrower"]}, "CompanyName":compName,UserStatus:"Active"}
				
			//	queryParam={'UserType': {'$in': ["Appraiser"]},"CreatedByUserid":UserID,UserStatus:"Active"}
			}
			else{
				if(UserRole=="Ind app without lender") {
					console.log("Individual Without Lender")
					queryParam={$or:[{'UserType': {'$in': ["Borrower","Appraiser"]},"CompanyName":compName,UserStatus:"Active"},{'UserType':"Lender",UserStatus:"Active"}]}
					
					// queryParam={$or:[{'UserType': {'$in': ["Borrower","Appraiser"]},"CreatedByUserid":UserID,UserStatus:"Active"},{'UserType':"Lender",UserStatus:"Active"}]}
				}
				else if(UserRole=="Comp app without lender"){
					console.log("Company Without Lender")	
					queryParam={$or:[{'UserType': {'$in': ["Borrower","Appraiser"]},$or:[{"CompanyName":compName}],UserStatus:"Active"},{'UserType':"Lender",UserStatus:"Active"}]}
					
				//	queryParam={$or:[{'UserType': {'$in': ["Borrower","Appraiser"]},$or:[{"CreatedByUserid":UserID},{"UserID":UserID}],UserStatus:"Active"},{'UserType':"Lender",UserStatus:"Active"}]}
				}	
			}
		}
		
		coll.find(queryParam,{sort:{'UserType' : 1}},function (err, result) {
			if (err){
				console.log(err);
				res.send('0');
			}else if (result.length){
				//console.log('Found:', result);
				var arr = JSON.stringify(result);
				res.send(arr);
				console.log(arr)
			}else {
				res.send('0');
				console.log('No document(s) found with defined "find" criteria!');
			}
		})
	}
	catch (Ex)
	{
		res.send('0');
		console.log("Error in getting Parameter values")
	}
});
module.exports = router;