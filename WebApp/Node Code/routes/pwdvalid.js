var http = require("http");
http.globalAgent.maxSockets = 3000;
var fs = require("fs");
var cryptLib = require('cryptlib')
var seqqueue = require('seq-queue');
var queue = seqqueue.createQueue(1000);

var express = require('express');
var router = express.Router();

var jsonObj;
//Log file path


console.log("\n-------------------------------- Server Started --------------------------------");

router.post('/', function(req, res, next) {
try{
           var strBody = req.body;
          /*req.on("data", function(chunk) {
            strBody += chunk;
          });*/
          //req.on("end", function() {
            console.log("Received posted data: " + strBody);
//MongoDb Connection
var MongoClient = require('mongodb');
jsonObj = strBody;
var jsonusrid=jsonObj.strID;
var jsonusrpwd;
var time=Date();
var content="\r\nUser ID : "+jsonObj.strID+"  login time :  "+time+" Login status : ";
var sessionID = jsonObj.sessionID;
var db = req.db;
var coll = db.get('Param');	
console.log("Connected to Database");
var collection = db.collection('User');
var queryObj = {};
queryObj["UserID"] = jsonusrid;
queryObj["PasswordDetails.Password"] = cryptLib.decrypt(jsonObj.strPassword, jsonObj.strKey, jsonObj.striv);
console.log("Query here = "+JSON.stringify(queryObj));
collection.update({"UserID" : jsonusrid, "PasswordDetails.Password":cryptLib.decrypt(jsonObj.strPassword, jsonObj.strKey, jsonObj.striv)},
	{$set: { "sessionID" : sessionID}});


//*******************************Retrieves set of docs matching the find Criteria**********************************//
collection.find({"UserID":jsonusrid},function(err, docs) {
//Check for Empty docs     
if(docs=="")
     {
     //res.write("User not Exist");    
     content+="failed Details: User not Exist";
     //fnuserlog(content);
	 console.log(content+"1231User not Exist");
     res.send("0");
     //res.send(200);
     } 
else
     {
        console.log("Printing docs from Array")
        //fndecrypt();
		var nodeiv=jsonObj.striv;
		var nodekey=jsonObj.strKey;
  		var nodeorigpwd = cryptLib.decrypt(jsonObj.strPassword, nodekey, nodeiv);
		jsonObj.strPassword=nodeorigpwd;
		
        //console.dir(docs);
        docs.forEach(function(doc)
        {
         //console.log("Doc from Array ");
          //console.log(doc.PasswordDetails.Password);
          //console.dir(doc.Password);
          //Checking Password
 	if(doc.PasswordDetails.Password==jsonObj.strPassword)
	 {
     	   		console.log("Password is matching");
		                 //res.write("Password is matching");
			 content+="Success Details: Valid user Credentials";
			 //fnuserlog(content);
			 
			 
			//Send Usertype, logstatus, Username/Id, UserRole, pwdupdate   
			console.log(doc.OrgType);
			
			console.log(doc.Uploadmage+"Image  name------------")
			
			var obj={
				UserStatus:doc.UserStatus,
				UserType:doc.UserType,
				UserID:doc.UserID,
				UserRole:doc.UserRole,
				UserName:doc.UserName,
				Organization:doc.OrgType,
				Imagename:doc.Uploadmage,
				status:doc.status
			}
			var arr = JSON.stringify(obj);
			
			res.send(arr);
			//res.write(doc.status);
            //res.end();	
			
	 }
 	else
	 {
  	     console.log("Invalid credentials");
	     //res.write("invalid credentials");
	     content+="Failed Details: Invalid user Credentials";
		 //fnuserlog(content);
	     res.send("0");
	     
 	 }
         });
       }
    });     
	 //});
      } 
	  catch( ex ) {
       console.dir(ex);
      }
/************Capturing log details**************/
		function fnuserlog(content)
		{
			//console.log("This is a function");
			data=content;
			fs.appendFile('C:\\Data\\filelog.txt', data, function(error) {
		     	if (error) {
		       	console.error("write error:  " + error.message);
		     	} else {
		       	console.log("Successful Write to " + 'C:\\Data\\filelog.txt');
				}
			});
		}

/************Decrypt Password**************/
		function fndecrypt(){
			
			var nodeiv=jsonObj.striv;
			var nodekey=jsonObj.strKey;
			console.log(jsonObj.strPassword, nodekey, nodeiv)
  		 	var nodeorigpwd = cryptLib.decrypt(jsonObj.strPassword, nodekey, nodeiv);
			jsonObj.strPassword=nodeorigpwd;
		}
});
module.exports = router;