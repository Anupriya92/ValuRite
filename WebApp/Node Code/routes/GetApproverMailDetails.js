////Loads Property details based on the Borrower Selection..
var http = require("http");
var express = require('express');
fs = require('fs');

var express = require('express');
var router = express.Router();
router.post('/', function(req, res, next) {
	try
	{
		var db = req.db;
		
		var Jsonobj=req.body; 
		
		var ValuationID=Jsonobj.ValuationID;
		var UserID=Jsonobj.UserID;
		
		var ApproverID="";
		var ApproverEmail="";
		
		
		var coll = db.get('Appraisal');
		
		coll.find({ValuationID:ValuationID,ValuationStatus:'true'},function(err,docs){
			
			if(err){
				
				console.log(err)
				
			}
			else if(docs.length){
				
				console.log(docs.length)
				
				docs.forEach(function(doc){
					
					console.log(doc.AppraiserID+"Appraiser ID")
					console.log(doc.ApproverID+"ApproverID ID")
					console.log(doc.ManagedBy+"ManagedBy ID")
						
						
						if((doc.ApproverID==doc.AppraiserID) &&(doc.ManagedBy!=doc.AppraiserID)){
							//Individual Appraiser With Lender
							ApproverID=doc.ManagedBy;
						}
						else if((doc.AppraiserID!=doc.ApproverID) && (doc.AppraiserID!=doc.ManagedBy) && (doc.ApproverID!=doc.ManagedBy) ){
							//Appraiser Company With Lender
							ApproverID=doc.ApproverID;
						}
						else if((doc.ManagedBy==doc.AppraiserID) && (doc.ManagedBy==doc.ApproverID)){
							//Individual Appraiser With out Lender
							ApproverID=doc.AppraiserID;
						}
						else if((doc.ApproverID!=doc.AppraiserID) && (doc.ManagedBy==doc.ApproverID)){
							//Appraiser Company With out Lender
							ApproverID=doc.ApproverID;
						}
						
						var UserTable = db.get('User');
						
						UserTable.find({UserID:ApproverID},function(err,usercoll){
							if(err){
								

							}
							else if(usercoll.length){
								
								usercoll.forEach(function(userrow){
									console.log(userrow)
									ApproverEmail=userrow.ContactDetails.EmailID;
								})
								
								var obj={
									ApproverEmail:'',
									ApproverID:'',
									EmailContent:'',
									Subject:''
								}
								
								obj.ApproverEmail=ApproverEmail,
								obj.ApproverID=ApproverID
								
								console.log(ApproverEmail);
								console.log(ApproverID);
								
								//EmailContent
								
								var ParamTable = db.get('Param');
								
								
								var queryParam = ["EmailContent"];//,"EmailSubject"
								ParamTable.find({ParamName:{'$in': queryParam},'ParamStatus':"Active"},function(err,result){
									
									if(err){
										console.log("Err"+err)
									}
									else{
										console.log(result)
										result.forEach(function(doc){
											if(doc.ParamName=="EmailContent"){
												
												obj.EmailContent=doc.ParamValue;
												
											}
											/*else if(doc.ParamName=="EmailSubject"){
												
												obj.Subject=doc.ParamValue;
												
											}*/
											
											obj.Subject="Report Status - Submitted, ValuationID - "+ValuationID;
											//obj["EmailContent"]=doc.ParamValue;
											
										})
										res.send(JSON.stringify(obj));
										
									}
									
								})
								
								
								
							}
						})
						
				})
				
				
				
			}
			
		})
		
	}
	catch (Ex)
	{
		console.log(Ex+"Error in getting Parameter values")
	}
});
module.exports = router;