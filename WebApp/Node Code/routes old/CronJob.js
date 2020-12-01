var CronJob = require('cron').CronJob;  
var format = require('date-format');
var path = require('path');

// Database
var monk = require('monk');
var db = monk('mongodb://myAdmin:ValuRite123@182.72.100.214:27017/ValuRitedemo?authSource=admin');
var SendEmail=require("./EmailModule.js");
SendEmail=new SendEmail();
var res="";
var ValuationID="";
var VisitDateTime="";
var RequiredDocs="";
var ScheduleDescription="";
var BorrowerName="";
var BorrowerNo="";
var BorrowerEmail="";
var PropertyType="";
var PropertyAddress="";
var AppName ="";

var DoorNo = "";
var street = "";
var Addarea = "";
var city = "";

var batchTime = "";

console.log("\n-------------------------------- Cron Job Started --------------------------------");
//get the param data..
var Paramcoll = db.get('Param');
Paramcoll.find({ParamName : "BatchTime"},function(errs, data)
{
	if(errs)
	{
		console.log("Error"+errs);
	}
	else if(data.length)
	{
		data.forEach(function(subdocs){
			batchTime = subdocs.ParamValue;
		console.log("In : "+batchTime);
		});
	}
	else
	{
		console.log("No documents for param");
	}
	
    console.log("out : "+batchTime);
	
	var RunTime = '00 00 '+batchTime+' * * *';
	
 new CronJob(RunTime, function() {  // - 4 pm everyday
    //console.log('This is a test batch job started at ' + new Date()); 
	var currentDate = format('MM/dd/yyyy', new Date());
	var Aggregateobj =[{
                $match: {
                    "Archieved" : "N",
					"Status" : "Visit Scheduled"
                }
            },
            {
                $lookup: {
                    from: "Appraisal",
                    localField: "ScheduleID",
                    foreignField: "ScheduleID",
                    as: "AppData"
                }
            },
            {
                $unwind: "$AppData"
            },
			{
                $lookup: {
                    from: "Property",
                    localField: "AppData.PropertyID",
                    foreignField: "PropertyID",
                    as: "PropertyDet"
                }
            },
            {
                $unwind: "$PropertyDet"
            },
			{
                $lookup: {
                    from: "User",
                    localField: "AppData.BorrowerID",
                    foreignField: "UserID",
                    as: "UserDet"
                }
            },
            {
                $unwind: "$UserDet"
            },
			{
                $lookup: {
                    from: "User",
                    localField: "AppData.AppraiserID",
                    foreignField: "UserID",
                    as: "UserApp"
                }
            },
            {
                $unwind: "$UserApp"
            },
            {
                $project: {
                    ValuationID: "$AppData.ValuationID",
					AppraiserName:"$UserApp.UserName",
					ScheduleID:1,
					Status:1,
					DateTime:1,
					Description:1,
					RequiredDocuments:1,
					PropertyType: "$PropertyDet.PropertyType",
                    PropertyAddress: "$PropertyDet.Address",
					BorrowerName: "$UserDet.UserName",
                    BorrowerMob: "$UserDet.ContactDetails.MobileNo",
					EmailID:"$UserDet.ContactDetails.EmailID"
                }
            }
        ];
	
	var coll = db.get('Schedule');	
	
	coll.aggregate(Aggregateobj,function(err, docs) {
		if(err)
		{
			console.log("Error occured.."+err);
		}
		else if(docs.length)
		{
			console.log(docs);
			docs.forEach(function(subdocs){
			
				ValuationID=subdocs.ValuationID;
				VisitDateTime=subdocs.DateTime;
				RequiredDocs=subdocs.RequiredDocuments;
				ScheduleDescription=subdocs.Description;
				BorrowerName=subdocs.BorrowerName;
				BorrowerNo=subdocs.BorrowerMob;
				BorrowerEmail=subdocs.EmailID;
				PropertyType=subdocs.PropertyType;
				PropertyAddress=subdocs.PropertyAddress;
				
				DoorNo = subdocs.PropertyAddress.DoorNumber;
				street = subdocs.PropertyAddress.StreetName;
				Addarea = subdocs.PropertyAddress.AddArea;
				city = subdocs.PropertyAddress.City;
				
				AppName = subdocs.AppraiserName;
				
				//spliting the date and time string into date string..
				var arr = VisitDateTime.split(" ");
				var DBDate = arr[0];
				if(currentDate == DBDate)
				{
				var MailContents={
						Attachments:"",			
						to:BorrowerEmail,
						cc:'vijays.ab@analyticbrains.com,csatishkumar@analyticbrains.com',
						subject:'ValuRite - Appraiser Visit For Valuation ID : '+ValuationID,
						text:'',
						html:'<style>p{padding-top:5px;}</style><div style="color: #000; background-color: #fff;font-family: Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;"><p>Dear Sir/Madam,</p><br/><p>As discussed, please be present with the following documents at '+DoorNo+', '+street+', '+Addarea+', '+city+' on '+VisitDateTime+'. </p><p>Required Documents: '+RequiredDocs+', <br /></p><p>Description: '+ScheduleDescription+'</p><p>Thanks – '+AppName+'<br /><br />*** This is an automatically generated email, please do not reply ***</div>'
				}
				
				console.log(SendEmail.fnsendemail(MailContents,res)+"Sending Email");
				}
				else{
					console.log("Date mismatch");
				}
			});	
		}
		else
		{
			console.log("No document found");	
		}
		
	});  
}, null, true, '');   
});