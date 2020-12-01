/* Insert data into User collection (Single User) */
var http = require("http");
var express = require('express');
var router = express.Router();
var mail = require('../commonjs/admin-mail')
router.post('/', function (req, res) {
    //DB Connection and its parameters
    var jsonObj = req.body;
    var firstname = jsonObj.firstName;
    var lastname = jsonObj.lastName;
    var email_id = jsonObj.UserName.toLowerCase();;
    var mobile_number = jsonObj.phoneNumber;
    var addressline1 = jsonObj.AddressLine1;
    var addressline2 = jsonObj.AddressLine2;
    var country = jsonObj.Country;
    var state = jsonObj.State;
    var city = jsonObj.City;
    var area = jsonObj.areaName;
    var landmark = jsonObj.landmark;
    var pincode = jsonObj.pinCode;
    var area_of_interest = jsonObj.areaOfInterest;
    var companyname = jsonObj.companyname[0].text;
    var contract_reference = jsonObj.contractref;
    var password = encrypt(jsonObj.retypepassword);
    var pass = jsonObj.retypepassword;
    var usertype = jsonObj.userType;
    var userRole = jsonObj.userRole;
    var startdate = new Date(jsonObj.startDate);
    var enddate = new Date(jsonObj.endDate);
     var updatedBy = jsonObj.lastUpdatedBy;
    var generalalert = JSON.parse(jsonObj.generalalert);
    var email_flag = jsonObj.emailFlag;
    var fromemail = jsonObj.fromEmail;
    var Association = jsonObj.AssociationDetails;
    var OrgType = jsonObj.OrgType
    var db = req.admin_db;
    var collection = db.collection('User');
    var paramcollection = db.collection('Param');

    // Method to Encrypt Password
    function encrypt(password) {
        var cryptLib = require('cryptlib'),
            iv = 'rv6Isv_BpSFBrB2V'                              //cryptLib.generateRandomIV(16), //16 bytes = 128 bit 
        key = 'b16920894899c7780b5fc7161560a412'             //cryptLib.getHashSha256('my secret key', 32), //32 bytes = 256 bits 
        encryptedText = cryptLib.encrypt(password, key, iv);
        return encryptedText;
    }
//DB Query
    try {
        collection.insert({
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
            "CompanyName": companyname,
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
            "general_alert_flag": generalalert,
            "UserStatus": "Active",
            "CreatedDate": new Date(),
            "LastUpDate": new Date(),
            "lastUpdatedBy": updatedBy,
            "ApprovalDetails": {
                "Status": "Approved",
            },
            "OrgType": OrgType,
            "AssociationDetails" : Association,
            "UserName" : firstname+" "+lastname
        })
        // If emailflag is true, email will be sent to the user
        if (email_flag === true) {
            // Get the values from param for email authenication
            paramcollection.find({ "ParamName": { $in: ["UserName", "Password", "Service", "SecureConnection", "HostName", "Port"] } }, { "_id": 0, "ParamValue": 1, "ParamName": 1 }).then((docs) => {
                for(let i=0; i< docs.length; i++) {
                    if(docs[i].ParamName == 'UserName' ) {
                     var auth_user = docs[i].ParamValue;
                    } else if (docs[i].ParamName == 'Password') {
                     var auth_password = docs[i].ParamValue;
                    } else if (docs[i].ParamName == 'Service') {
                     var mailService = docs[i].ParamValue;
                    } else if (docs[i].ParamName == 'SecureConnection') {
                     var secureConn = docs[i].ParamValue;
                    } else if (docs[i].ParamName == 'HostName') {
                     var hostName = docs[i].ParamValue;
                    } else if (docs[i].ParamName == 'Port') {
                      var port = docs[i].ParamValue;
                    }         
                } 
              
                const template = '<p>Dear ' + firstname + ', </p><b> Your are Registered Successfully </b><br /><br/> Your login credentials are as follows <br /><b>Username : </b>' + email_id + '<br /><b>Password : </b>' + pass + '<br /><p>Regards, <br>Gobiom Support Team</p><br /><br />     *** This is an automatically generated email, please do not reply ***'
                const from_email = fromemail;
                const subject = 'User Registered Successfully ✔';
                const text = ' Welcome!';
                const copyMail = '';
                // Method call to send email
                const newTransportPromise = mail(from_email, email_id, subject, template, auth_user, auth_password, mailService, secureConn, hostName, port, copyMail);
                newTransportPromise.then(docs => {
                    res.send("1");
                }).catch((err) => {
                    res.send("3");
                });
            }).catch((err) => {
                console.log("Error in retriving param values from DB " + err);

            })
        } else {
            res.send("1");
        }
    }
    catch (ex) {
        console.dir(ex);
    }
});
module.exports = router;
