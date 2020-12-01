var http = require("http");
var express = require('express');
var mongodb = require('mongodb');

var fs = require("fs")
var CaptureLog = require("./log.js");
capturelog = new CaptureLog();

var express = require('express');
var router = express.Router();

var SendEmail=require("./EmailModule.js");
SendEmail=new SendEmail();

router.post('/', function(req, res, next) {
		try
		{
			var strBody = req.body;
            console.log("Received posted data: " + strBody);
			
			var jsonObj = strBody;
			var ValuationID = jsonObj.ValuationID;
			var CurrentDate = new Date(); 
			var UserID=jsonObj.UserID;
			var OrgType=jsonObj.OrgType;
			var UserRole=jsonObj.UserRole;
			var DateofValuation=new Date();
			var updatestring="";
			
			var EmailID=jsonObj.EmailID;
			var EmailContent=jsonObj.EmailContent;
			var EmailSubject=jsonObj.EmailSubject;
			
			var undcheck;
			
			if(EmailID!=null && EmailID!=undcheck)
			{
				var MailContents={			
					to:EmailID,
					cc:'vijays.ab@analyticbrains.com,csatishkumar@analyticbrains.com',
					subject:EmailSubject,
					text:EmailContent,
					html:EmailContent,
					Attachments:ValuationID
				}
				SendEmail.fnsendemail(MailContents,res);		
			}
			else{
				console.log(UserID)
				console.log(OrgType+"orgtype");

				
				console.log(UserRole+"UserRole")
				if(OrgType=="Individual" && UserRole=="User"){
					console.log("Individual User Admin")
					updatestring="{\"AppraisalStatus\" : \"Submitted to Approver\",\"ModifiedBy\" : \""+UserID+"\",\"ModifiedDate\" :\""+ CurrentDate+"\"}"
					updatestring = JSON.parse(updatestring);
					
				}			
				else if(OrgType=="Individual" && UserRole=="Ind app without lender"){
					console.log("Individual app without lender")
					updatestring="{\"AppraisalStatus\" : \"Approved\",\"ModifiedBy\" : \""+UserID+"\",\"ModifiedDate\" :\""+ CurrentDate+"\"}"
					updatestring = JSON.parse(updatestring);
					
				}
				else if(OrgType=="Company" && (UserRole=="Comp app without lender")){
					console.log("Company Comp app without lender")
					updatestring="{\"AppraisalStatus\" : \"Approved\",\"ModifiedBy\" : \""+UserID+"\",\"ModifiedDate\" :\""+ CurrentDate+"\"}"
					updatestring = JSON.parse(updatestring);
				}
				else if(OrgType=="Company" && (UserRole=="Comp with lender")){
					console.log("Company Comp with lender")
					updatestring="{\"AppraisalStatus\" : \"Submitted\",\"ModifiedBy\" : \""+UserID+"\",\"ModifiedDate\" :\""+ CurrentDate+"\"}"
					updatestring = JSON.parse(updatestring);
				}
				
				else if(OrgType=="Individual" && UserRole=="Ind with lender"){
					console.log("Individual Ind with lender")
					updatestring="{\"AppraisalStatus\" : \"Submitted\",\"ModifiedBy\" : \""+UserID+"\",\"ModifiedDate\" :\""+ CurrentDate+"\"}"
					updatestring = JSON.parse(updatestring);
				}
				
				console.log("Connected to Database");
				var db=req.db;
				var collection = db.get('Appraisal');
				collection.update({'ValuationID':ValuationID,'ValuationStatus':'true'}, {$set : updatestring},function(err){
					if(err){
						console.log(err);
						console.log("Change Submit Update Failed");
						res.send("0");		
						capturelog.fnuserlog("\r\n\r\n ChangeSubmitStatus Page -- FAILED  -- ValuationID : "+ValuationID+", UserID : "+UserID+", Date :"+new Date()+", Error Occurred : "+err);			
					}
					else{
						console.log("Change Submit Update Success");
						
						var ColAppraisal = db.get('Appraisal');
						var ScheduleID;
						ColAppraisal.find({'ValuationID':ValuationID,'ValuationStatus':'true'},function(Collerr,CollResult){
							if(Collerr){
								
							}
							else{
								CollResult.forEach(function(Coldoc){
									ScheduleID=Coldoc.ScheduleID;
								})
								
								var ColSchedule = db.get('Schedule');
								ColSchedule.update({ScheduleID:ScheduleID},{$set:{Status:"Visit Completed"}},function(UptErr,UptResult){
									if(UptErr){
										res.send("0");
										capturelog.fnuserlog("\r\n\r\n ChangeSubmitStatus Page Schedule Status Update -- Failed  -- ValuationID : "+ValuationID+", UserID : "+UserID+", Date :"+new Date());	
									}
									else{
										res.send("1");
										capturelog.fnuserlog("\r\n\r\n ChangeSubmitStatus Page Submit Status Change and Schedule Status Update-- SUCCESS  -- ValuationID : "+ValuationID+", UserID : "+UserID+", Date :"+new Date());	
									}
								})
							}
						})
					}
				});
			}
		  //});
		} catch( ex ) {
			console.dir(ex);
		}
	});
module.exports = router;