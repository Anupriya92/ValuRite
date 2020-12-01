/* Update the User records with approval status in 'user' collection */
var http = require("http");
var express = require('express');
var router = express.Router();
var mail = require('../commonjs/admin-mail');
var arrypush = [];
let emailflag;
var auth_user; var auth_password; var mailService; var secureConn; var hostName; var port;
router.post('/', function (req, res, next) {
  var jsonObj = req.body;
  console.log(jsonObj)
  var existArr = [];
  arrypush = [];
  var length = jsonObj.length;
  emailflag = jsonObj[0].email_flag;
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
    // Method to pass the userdetails and updating into DB
    insertRow(collection, jsonObj, res, i, existArr);
  }
  catch (ex) {
    console.dir(ex);
    var obj = {
      status: 'error'
    }
    var arr = JSON.stringify(obj);
    res.send(arr);
  }
});

// Method to encrypt password
function encrypt(password) {
  var cryptLib = require('cryptlib'),
    iv = 'rv6Isv_BpSFBrB2V'                              //cryptLib.generateRandomIV(16), //16 bytes = 128 bit 
  key = 'b16920894899c7780b5fc7161560a412'             //cryptLib.getHashSha256('my secret key', 32), //32 bytes = 256 bits 
  encryptedText = cryptLib.encrypt(password, key, iv);
  return encryptedText;
}

function insertRow(collection, jsonObj, res, i, existArr) {
  var firstname = jsonObj[i].firstname;
  var lastname = jsonObj[i].lastname;
  var email_id = jsonObj[i].email_id;
  var mobile_number = jsonObj[i].mobileno;
  var addressline1 = jsonObj[i].address1;
  var addressline2 = jsonObj[i].address2;
  var area = jsonObj[i].area;
  var city = jsonObj[i].city;
  var state = jsonObj[i].state;
  var country = jsonObj[i].Country;
  var landmark = jsonObj[i].landmark;
  var pincode = jsonObj[i].pincode;
  var companyName = jsonObj[i].companyname;
  var contract_reference = jsonObj[i].contractref;
  var password = encrypt(jsonObj[i].password);
  var passwrd = jsonObj[i].password;
  var usertype = jsonObj[i].userType;
  var userRole = jsonObj[i].userRole;
  var general_Flag = JSON.parse(jsonObj[i].generalflag);
  var startdate = new Date(jsonObj[i].startdate);
  var enddate = new Date(jsonObj[i].enddate);
  var updatedBy = jsonObj[i].last_updated_by;
  collection.update({ 'ContactDetails.EmailID': email_id },
    {
      $set: {
        "FirstName": firstname,
        "LastName": lastname,
        "UserID": email_id,
        "PasswordDetails": {
            "Password": password,
            "update_password": "true",
            "last_updated_date": new Date()
        },
        
        "UserRole": userRole,
        "UserType": usertype,
        "CompanyName": companyName,
        "ContactDetails": {
            "MobileNo": mobile_number,
            "EmailID": email_id
        },
        "Address" : {
            "AddressLine1" : addressline1,
            "AddressLine2" : addressline2,
            "AddArea" : area,
            "City" : city,
            "State" : state,
            "Country" : country,
            "Pincode" : pincode,
            "Landmark" : landmark
        },
        "Contract": {
            "ContractReference": contract_reference,
            "StartDate": startdate,
            "EndDate": enddate,
        },
        "general_alert_flag": general_Flag,
        "UserStatus": "Active",
        "LastUpDate": new Date(),
        // "last_updated_by": updatedBy,
        "ApprovalDetails": {
            "Status": "Approved",
        }
      }
    },

    function (err, result) {
      if (err) {
        console.log(err);
      }
      else {
        arrypush.push(result);
      }
      //  If emailflag is true, then email will be sent the respective users
      if (emailflag == true) {
        const template = '<p>Dear ' + firstname + ',</p><br/>Your Registration has been Approved Successfully <br> Your login credentials are as follows <br /><b>Username : </b>' + email_id + '<br /><b>Password : </b>' + passwrd + '<br><p>Regards, <br>Gobiom Support Team</p><br /><br />     *** This is an automatically generated email, please do not reply ***'
        const fromemail = fromEmail;
        const subject = 'User Approved Successfully ✔';
        const text = ' Welcome!';
        const copyMail = '';
        // Method call to send email
        const newTransportPromise = mail(fromemail, email_id, subject, template, auth_user, auth_password, mailService, secureConn, hostName, port, copyMail);
        newTransportPromise.then(docs => {
          existArr.push(email_id);
        }).catch((err) => {
        });
      } else {
      }
      if (i < jsonObj.length - 1) {
        insertRow(collection, jsonObj, res, ++i);
      } else {
        res.send('1');
      }
    });
}
module.exports = router;
