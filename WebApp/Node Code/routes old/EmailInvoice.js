var http = require("http");
var express = require('express');
var mongodb = require('mongodb');

var express = require('express');
var router = express.Router();

var SendEmail=require("./EmailModule.js");
SendEmail=new SendEmail();

 
 router.post('/', function(req, res, next) {
		try
		{
            var jsonObj = req.body;
			var LenderID = jsonObj.LenderID;
			var AppraiserID=jsonObj.AppraiserID;
			var InvoiceNo=jsonObj.InvoiceNo;
			var UserID=jsonObj.UserID;
			var UserName=jsonObj.UserName;
		    var EmailID=jsonObj.EmailID;
		
           console.log(jsonObj);
		   
		   InvoiceNo=InvoiceNo.toString();
		   console.log("InvoiceNo"+InvoiceNo);
		
		    var db=req.db;
		   var coll1=db.get('User');
		   //,{fields:{UserName:1,_id:0,ContactDetails:1,_id:0,EmailID:1,}}
		coll1.find({'UserID':LenderID},{fields:{UserName:1,_id:0,ContactDetails:1,_id:0}},function(errr,Result){
			if (errr){
				console.log(errr);
				res.send("0");
			}
			else if(Result.length){
				var email = Result[0].ContactDetails.EmailID;
				console.log(email);
				console.log('Found',Result[0]);
				
	    var UserName=Result[0].UserName;
		console.log("UserName"+UserName);
		UserName=UserName.toString();
		
		
		console.log("email"+email);
		// EmailID=EmailID.toString();
				
		
		  
           var coll2 = db.get('User');
           coll2.find({'UserID':UserID},{fields:{UserName:1,_id:0}},function (err,result) {
			   if (err) {
		console.log(err);
		res.send("0");
    } else if (result.length) {
		console.log('Found:', result[0]);
		
		var AppraiserName=result[0].UserName;
		console.log("AppraiserName"+UserName);
		AppraiserName=UserName.toString();
		
		
		   // var coll3 = db.get('User');
           // coll3.find({'LenderID':LenderID},{fields:{ContactDetails:1,_id:0,EmailID:1}},function (er,results) {
			   // if (er) {
         // console.log(er);
		// res.send("0");
        // } else if (results.length) {
		// console.log('Found:', results[0]);
		
		// var EmailID=results[0].EmailID;
		// console.log("EmailID"+EmailID);
		// EmailID=EmailID.toString();
		
		
		var MailContents={			
					to:email,
					cc:'vijays.ab@analyticbrains.com,csatishkumar@analyticbrains.com',
					subject:'Invoice Raised',
					text:'',
					html:'<style>p{padding-top:5px;}</style><div style="color: #000; background-color: #fff;font-family: Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;"><p>Invoice has been Raised from '+ AppraiserName + ' to ' + UserName +' ,Please find the attachment below,<br /></p><p>*** This is an automatically generated email, please do not reply ***' ,
					Attachments:InvoiceNo
				}
		console.log(SendEmail.fnsendemail(MailContents,"")+"Sending Email");
		res.send("1");
		 
	}
	else{
		console.log("No documents");
	}
		   });
			}
		});
		}
			
		catch( ex ) {
			console.dir(ex);
		}
	});
module.exports = router;
		