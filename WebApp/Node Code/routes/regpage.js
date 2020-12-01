var http = require("http");
var nodemailer = require('nodemailer');

//var CaptureLog = require("./log.js");
//capturelog = new CaptureLog();

var SendEmail=require("./EmailModule.js");
SendEmail=new SendEmail();

var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
	try
	{
		var strBody = req.body;
		console.log("Received posted data: " + JSON.stringify(strBody));
				 
		var jsonObj = strBody;
		var id=jsonObj.struserid;
		var urole=jsonObj.strusrrole;
		var utype=jsonObj.strusrtype;
		var name=jsonObj.strusrname;
		var pno=jsonObj.strphno;
		var mno=jsonObj.strmobno;
		var eid=jsonObj.stremail;
		var add1=jsonObj.straddr1;
		var add2=jsonObj.straddr2;
		var lan=jsonObj.strlandmark;
		var loc=jsonObj.strarea;
		var city=jsonObj.strcity;
		var state=jsonObj.strstate;
		var country=jsonObj.strcountry;
		var pin=jsonObj.strpincode;
		var OrgType=jsonObj.OrgType;
		var Usrstatus="Active";
		var currentdate = new Date();
		var UserID= jsonObj.UserID;
		var CompanyName= jsonObj.strcompname;
		var uploadimage=jsonObj.struploading;
		console.log("uploadimage" + uploadimage);

	var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
	var pass = "";
	var i=0;
	for(x=0;x<8;x++)
	{
		i = Math.floor(Math.random() * 62);
		pass += chars.charAt(i);
	}


		//var randomPassword="Test123@";//Generate the random password for new user
		var randomPassword=pass;//Generate the random password for new user

		console.log(randomPassword);

		
		var db = req.db;
		var db2 = req.admin_db;
		var collection = db2.collection('User');
		
		
		
		collection.find({UserID:id},function(err, docs) {
			if(docs==""){
				
				var coll = db2.collection('User');
				coll.find({},function(err,cc){
					if(err){
						console.log(err)
						res.send("0");
					}
					else{
						console.log("No of docs in Param Collection"+cc.length);	
						var length=cc.length;
						length=length+1;
						var userlength = length;
						var strval = 6 - userlength.toString().length;
						var newstring = "";
						for (i = 1; i <= strval; i++) {
							newstring = newstring + "0";
						}
						newstring=newstring+length;
						collection.insert({
							"CustomerID":"C"+newstring,
							"UserID" : id,
							"UserRole" : urole,
							"PasswordDetails" : {
								"Password" : randomPassword,
								"PasswordQuestion" : " ",
									"PasswordAnswer" : " "
								},
							"CompanyName":CompanyName,
							"UserType" : utype,
							"UserName" : name,
							"OrgType":OrgType,
							"ContactDetails" : {
								"PhoneNo" : pno,
								"MobileNo" : mno,
								"EmailID" : eid
							},
							"Address" : {
								"AddressLine1" : add1,
								"AddressLine2" : add2,
								"Landmark" : lan,
								"AddArea" : loc,
								"City" : city,
								"State" : state,
								"Country" : country,
								"Pincode" : pin
							},
							"CreatedByUserid" : UserID,
							"LastUpDate" : currentdate,
							"status" : "false",
							"UserStatus":Usrstatus,
							"Uploadmage":uploadimage
						},  function(err, result) {
								if(err){
									console.log(err);
								}else{
									console.log("Inserted a document into the User collection.");
								}
						});
						//Sending Mail
						var MailContents={
								Attachments:"",			
								to:eid,
								cc:'nilofarnisha@analyticbrains.com',
								subject:'User Id Created Successfully ✔',
								text:'Welcome! '+name,
								html:'<p><b>Welcome to ValuRite</b></p><br /> <b> Your are successfully registered as a '+utype+'</b><br /> Your Customer ID : C'+newstring+'<br/> Your login credentials are as follows <br /><b>UserId : </b>'+id+'<br /><b>Password : </b>'+randomPassword+'<br /><br />*** This is an automatically generated email, please do not reply ***'
							}
						if(utype=="Borrower"){						
							var paramdb=db.collection("Param");					
							paramdb.find({ParamName:"MailBorrower"},{fields:{ParamValue:1,_id:0}},function(err,paramresult){
								if(err){
									console.log("Err in Searching MailBorrower in Param Table"+err)
								}
								else if(paramresult.length){
									paramresult.forEach(function(doc){
										if(doc.ParamValue=="Y"){
											SendEmail.fnsendemail(MailContents,res);
										}
										else{
											console.log("Sending mail to Borrower is Disabled");
										}
									})
								}
								else{
									console.log("No MailBorrower Key Found in Param Table")
								}	
							})
						}
						else{
							SendEmail.fnsendemail(MailContents,res);
						}
							
						res.send("1");
						//capturelog.fnuserlog("\r\n\r\n Registration Page -- User Created  -- UserID : "+id+", CreatedBy : "+UserID+", Date :"+new Date())
					}
				})						
			}
			else{ 
				console.log(docs)
				console.log("User ID exists");
				res.send("0");
				//capturelog.fnuserlog("\r\n\r\n Registration Page -- User ID exists  -- UserID : "+id+",CreatedBy : "+UserID+", Date :"+new Date())
			}
		})

	} catch( ex ) {
		console.dir(ex);
	}
});

/*function randomPassword()
{
	var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
	var pass = "";
	var i=0;
	for(x=0;x<8;x++)
	{
		i = Math.floor(Math.random() * 62);
		pass += chars.charAt(i);
	}
 return pass;
}*/
module.exports = router;