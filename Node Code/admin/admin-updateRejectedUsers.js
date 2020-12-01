/* Update the User records with reject status in 'user' collection */
var http = require("http");
var express = require('express');
var router = express.Router();
var mail = require('../commonjs/admin-mail')
var arrypush = [];
let emailflag;
var auth_user; var auth_password; var mailService; var secureConn; var hostName; var port;
router.post('/', function (req, res, next) {
  var jsonObj = req.body;
  console.log(jsonObj)
  var arr = [];
  arrypush = [];
  var existArr = [];
  var length = jsonObj.length;
  emailflag = jsonObj[0].emailFlag;
  fromEmail = jsonObj[0].from_email;
  var dbhit = 0;
  try {
    var db = req.admin_db;
    var collection = db.collection('User');
    var paramcollection = db.collection('Param');
    // Get the param values for email authentication
    paramcollection.find({ "ParamName": { $in: ["UserName", "Password", "Service", "SecureConnection", "HostName", "Port"] } }, { "_id": 0, "ParamValue": 1, "ParamName": 1 }).then((docs) => {
      for(let i=0; i< docs.length; i++) {
        if(docs[i].ParamName == 'UserName' ) {
          auth_user = docs[i].ParamValue;
        } else if (docs[i].ParamName == 'Password') {
          auth_password = docs[i].ParamValue;
        } else if (docs[i].ParamName == 'Service') {
          mailService = docs[i].ParamValue;
        } else if (docs[i].ParamName == 'SecureConnection') {
          secureConn = docs[i].ParamValue;
        } else if (docs[i].ParamName == 'HostName') {
          hostName = docs[i].ParamValue;
        } else if (docs[i].ParamName == 'Port') {
          port = docs[i].ParamValue;
        }           
    } 
    
    }).catch((err) => {
      console.log("Error in retriving param values from DB " + err);
    })
    var i = 0;
    // Method to pass the userdetails and update into DB
    insertRow(collection, jsonObj, res, i, existArr);
  }
  catch (ex) {
    console.dir(ex);
    var obj = {
      status: 'error'
    }
    var arr = JSON.stringify(obj);
    console.log(arr)
    res.send(arr);
  }
});

function insertRow(collection, jsonObj, res, i, existArr) {
  
  var email_id = jsonObj[i].email_id;
  var comments = jsonObj[i].comment;
  var updatedBy = jsonObj[i].last_updated_by;
  collection.update({ 'ContactDetails.EmailID': email_id },
    {
      $set: {
        "lastUpdatedBy": updatedBy,
        "LastUpDate": new Date(),
        "UserStatus": "InActive",
        "ApprovalDetails": {
          "Status": "Rejected",
        },
        "Comment": comments,
      }
    },

    function (err, result) {
      if (err) {
        console.log(err);
      }
      else {
        console.log("Updated a document into the User collection.");
      }
      //  If emailflag is true, then email will be sent the respective users
      if (emailflag == true) {
        const template = '<p>Dear ' + firstname + ' </p><p> Your Registration has been Rejected <br> For the following Reason: ' + comments + '</p><p>Regards,<br>Gobiom Support Team</p><br/>   *** This is an automatically generated email, please do not reply ***'
        const fromemail = fromEmail;
        const subject = 'User Registration - Rejected ';
        const text = ' Welcome!';
        const copyMail = '';
        // Method call to send email
        const newTransportPromise = mail(fromemail, email_id, subject, template, auth_user, auth_password, mailService, secureConn, hostName, port, copyMail);
        newTransportPromise.then(docs => {
          existArr.push(email_id);
        }).catch((err) => {
          console.log('Error' + err);
        });
      } else {
        console.log("Rejected Successfully Mail not Sent");
      }
      if (i < jsonObj.length - 1) {
        insertRow(collection, jsonObj, res, ++i, existArr);
      } else {
        var temp = ((jsonObj.length) - (existArr.length));
        arrypush.push("Email already exist = " + temp);
        res.send(arrypush);
      }
    });
}
module.exports = router;















