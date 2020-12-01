/* Insert data into user collection (Bulk Insertion) */
var http = require("http");
var express = require('express');
var router = express.Router();
var mail = require('../commonjs/admin-mail');
var arrypush = [];
router.post('/', function (req, res, next) {
  var jsonObj = req.body;
  var existsmailid = "";
  var existArr = [];
  var arr = [];
  arrypush = [];
  var length = jsonObj.length;
  var dbhit = 0;
  try {
    //DB Connection and its query
    var db = req.admin_db;
    var collection = db.collection('user');
    var paramcollection = db.collection('param');
    // Get the param values for email authenication
    paramcollection.find({ "param_name": { $in: ["User_Name", "Password", "Service", "Secure_Connection", "Host_Name", "Port"] } }, { "_id": 0, "param_value": 1, "param_name": 1 }).then((docs) => {
      auth_user = docs[0].param_value;
      auth_password = docs[1].param_value;
      mailService = docs[2].param_value;
      secureConn = docs[3].param_value;
      hostName = docs[4].param_value;
      port = docs[5].param_value;
    }).catch((err) => {
      console.log("Error in retriving param values from DB " + err);
    })
    var i = 0;
    // Method to insert the data one after another
    insertRow(collection, jsonObj, existsmailid, existArr, res, i);
  }
  catch (ex) {
    var obj = {
      status: 'error'
    }
    var arr = JSON.stringify(obj);
  }
});

// Method to Encrypt Password 
function encrypt(password) {
  var cryptLib = require('cryptlib'),
    iv = 'rv6Isv_BpSFBrB2V'                              //cryptLib.generateRandomIV(16), //16 bytes = 128 bit 
  key = 'b16920894899c7780b5fc7161560a412'             //cryptLib.getHashSha256('my secret key', 32), //32 bytes = 256 bits 
  encryptedText = cryptLib.encrypt(password, key, iv);
  console.log(encryptedText);
  return encryptedText;
}

function insertRow(collection, jsonObj, existsmailid, existArr, res, i) {
  var firstname = jsonObj[i].first_name;
  var lastname = jsonObj[i].last_name;
  var email_id = jsonObj[i].email_id;
  var ph_number = jsonObj[i].phone_number;
  var department = jsonObj[i].department;
  var area_of_interest = jsonObj[i].area_of_interest;
  var company_institute = jsonObj[i].companyname;
  var contract_reference = jsonObj[i].contractref;
  var usertype = jsonObj[i].userType;
  var password = encrypt(jsonObj[i].password);
  var passwrd = jsonObj[i].password;
  var general_Flag = JSON.parse(jsonObj[i].general_Flag);
  var email_flags = jsonObj[i].email_flag;
  var fromEmail = jsonObj[i].from_email;
  var startdate = new Date(jsonObj[i].startdate);
  var enddate = new Date(jsonObj[i].enddate);
  var UpdateBy = jsonObj[i].last_updated_by;
  collection.find({ 'contact_details.email_id': email_id }, function (err, docs) {
    if (err) {
      var obj = {
        status: 'documenterror'
      }
      var arr = JSON.stringify(obj);
      res.send(arr);
    } else {
      if (docs.length == 0) {
        collection.insert({
          "first_name": firstname,
          "last_name": lastname,
          "password_details": {
            "password": password,
            "update_password": "false",
            "last_updated_date": new Date()
          },
          "contact_details": {
            "phone_number": ph_number,
            "email_id": email_id,
          },
          "contract": {
            "contract_reference": contract_reference,
            "start_date": startdate,
            "end_date": enddate,
          },
          "rolename": usertype,
          "department": department,
          "company_institute": company_institute,
          "area_of_interest": area_of_interest,
          "general_alert_flag": general_Flag,
          "user_status": "Active",
          "created_date": new Date(),
          "last_updated_date": new Date(),
          "last_updated_by": UpdateBy,
          "approval_details": {
            "status": "Approved",
          }
        },
          function (err, result) {
            if (err) {
              console.log(err);
            }
            else {
              console.log("Inserted a document into the User collection.");
            }
          });
        // If emailflag is true, email will be sent to the users
        if (email_flags === true) {
          const template = '<p>Dear ' + firstname + ',</p><br /> <b> Your are Registered Successfully </b><br /><br/> Your login credentials are as follows <br /><b>Username : </b>' + email_id + '<br /><b>Password : </b>' + passwrd + '<br /><p>Regards,<br>Support Team</p><br /><br />     *** This is an automatically generated email, please do not reply ***'
          const fromemail = fromEmail;
          const subject = 'User Registered Successfully ✔';
          const text = ' Welcome!';
          const copyMail = '';
          //  Method call to send email 
          const newTransportPromise = mail(fromemail, email_id, subject, template, auth_user, auth_password, mailService, secureConn, hostName, port, copyMail);
          newTransportPromise.then(docs => {
            existArr.push(email_id);
          }).catch((err) => {
            console.log('Error' + err);
          });
        }
      }
      else {
        existsmailid += email_id + ",";
        existArr.push(email_id);
      }
    }
    if (i < jsonObj.length - 1) {
      insertRow(collection, jsonObj, existsmailid, existArr, res, ++i);
    }
    else {
      var obj = {
        mail_id: existsmailid
      }
      var arr = JSON.stringify(obj);	//array stores the emailid that already exists
      var temp = ((jsonObj.length) - (existArr.length));
      arrypush.push("Mail sent = " + temp);
      temp = existArr.length;
      arrypush.push("Email already exist = " + temp);
      res.send(arrypush);
      res.end();
    }
  })
}
module.exports = router;

