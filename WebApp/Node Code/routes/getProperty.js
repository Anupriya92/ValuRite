var http = require("http");
var express = require('express');
var express = require('mongodb');

var express = require('express');
var router = express.Router();

fs = require('fs');
var arr;
var obj={
Address:'', 
Location:'',
PropertyType:'',
BorrowerName:''
}

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
          var PropertyID=jsonObj.PropertyID;
		  var BorrowerID=jsonObj.BorrowerID;
		  console.log("     "+PropertyID);

			console.log("Connected to Database");
			var db = req.db;
			var coll = db.get('Property');
			//Getting the property details for current appraiser
 		coll.find({'PropertyID' : PropertyID},function (err, doc) {
				if (err) {
					console.log(err+"asd");
				} else if (doc.length) {
					            doc.forEach(function(temp){
								console.log(temp.Address.AddressLine1);
								 obj.Address = temp.Address.AddArea;
								 obj.Location = temp.Location;
								 obj.PropertyType=temp.PropertyType;
								 getBorrowerName(obj,BorrowerID,res,req);
								 //arr = JSON.stringify(obj)
								 //console.log('Arr:   ',obj);
								 });
								 //res.write(arr);
								 //res.end();
								 
								
						} else {
							console.log('No document(s) found with defined "find" criteria!');
							res.send("0");
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
	
	function getBorrowerName(genjsonobj,bID,res,req){
		
			console.log("Connected to Database");
			var db=req.db;
			var db2 =req.admin_db;
			var coll = db2.collection('User');
			//Getting the property details for current appraiser
			console.log(bID)
			coll.find({UserType: 'Borrower',UserID:bID},function (err, doc) {
					if (err) {
						console.log(err);
					} else if (doc.length) {
									doc.forEach(function(temp){
										console.log(temp.UserName);
										genjsonobj.BorrowerName=temp.UserName;
										arr = JSON.stringify(genjsonobj)
										//console.log('Arr:   ',genjsonobj);
									});
									 res.send(arr);
					} else {
						console.log('No document(s) found with defined "find" criteria! BID');
						res.send("0");			
					}
			})	
	}