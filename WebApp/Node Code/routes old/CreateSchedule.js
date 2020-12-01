var http = require("http");
var express = require('express');
var express = require('mongodb');

var SendEmail=require("./EmailModule.js");
SendEmail=new SendEmail();

var express = require('express');
var router = express.Router();
router.post('/', function(req, res, next) {
    try {
        var strBody = req.body;

        console.log("Received posted data: " + strBody);
        var jsonObj = strBody;
		
        var UserID = jsonObj.UserID;
		var ValuationID=jsonObj.ValuationID;
		var VisitDateTime=jsonObj.VisitDate;
		var RequiredDocs=jsonObj.RequiredDocs;
		var ScheduleDescription=jsonObj.ScheduleDescription;
		
		var BorrowerName=jsonObj.BorrowerName;
		var BorrowerNo=jsonObj.BorrowerNo;
		var BorrowerEmail=jsonObj.BorrowerEmail;
		var PropertyType=jsonObj.PropertyType;
		var PropertyAddress=jsonObj.PropertyAddress;
		var UserName=jsonObj.UserName;
		
		function getHttp(host, path, callback) {
            console.log("Entered Get Http function")
            console.log("Host" + host)
            console.log("Path" + path)
            console.log("Callback" + callback)
            return http.get({
                host: host,
                   path: path
			}, function(response) {
				console.log(response.statusCode+"Response Status code")
				if (response) {
					var body = "";

					response.on("data", function(d) {
						console.log(d+" dataaa")
						body += d;
					});

					response.on("error", function(e) {
						console.log("Error" + e)
					});

					response.on("end", function() {
						callback(body);
					});
				}
			});
		}
		
		//{"ScheduleID":"10","ScheduleDateTime":"","ScheduleStatus":"","AccessedBy":"","AccessedDateTime":"","Sucess":"","Credentials":"User Exists"}
		
		getHttp("182.72.100.214",'/Schedule/CreateSchedule.asmx/ScheduleMyVisit?UserID='+encodeURIComponent(UserID)+'&Pwd=Test123@&ScheduleDateTime='+encodeURIComponent(VisitDateTime)+'&ScheduleDescription='+encodeURIComponent(ScheduleDescription)+'&RequiredDocs='+encodeURIComponent(RequiredDocs), function(data) {
			console.log(data);
			var responsestr=data;
			var responseobj=JSON.parse(responsestr);
			
			if(responseobj.Result=="0"){
				console.log("Invalid Credentials");
				res.send("0");
			}
			else{
				console.log("Valid Credentials");
				
				var MailContents={
						Attachments:"",			
						to:BorrowerEmail,
						cc:'vijays.ab@analyticbrains.com,csatishkumar@analyticbrains.com',
						subject:'ValuRite - Appraiser Visit For Valuation ID : '+ValuationID,
						text:'',
						html:'<style>p{padding-top:5px;}</style><div style="color: #000; background-color: #fff;font-family: Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;"><p>Dear Sir/Madam,</p><br/><p>As discussed, please be present with the following documents at '+PropertyAddress+' on '+VisitDateTime+'. </p><p>Required Documents: '+RequiredDocs+', <br /></p><p>Description: '+ScheduleDescription+'</p><p>Thanks – '+UserName+'<br /><br />*** This is an automatically generated email, please do not reply ***</div>'
				}
				
				console.log(SendEmail.fnsendemail(MailContents,res)+"Sending Email");
				
				var db=req.db;
				var Appraisalcollection = db.get("Appraisal");	
				
				Appraisalcollection.update({ValuationID:ValuationID,ValuationStatus:"true"},{$set:{ScheduleID:responseobj.ScheduleID}},{"upsert" :true},function(err,AppraisalResult){
					if (err) {
						console.log(err);
					}
					else {
						console.log(AppraisalResult);
						res.send("1");
					}
				})
			}
		})

    } catch (Ex) {
        console.log("ex" + Ex.message);
    }
});
module.exports = router;