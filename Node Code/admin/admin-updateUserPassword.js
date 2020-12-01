/* Update user password in the 'user' collection with respect to the given username(emailid) */
var http = require("http");
var express = require('express');
var router = express.Router();
var mail = require('../commonjs/admin-mail');
router.post('/', function (req, res, next) {
    // Method to encrypt password
    function encrypt(passWrd) {
        const cryptLib = require('cryptlib'),
            iv = 'rv6Isv_BpSFBrB2V'                          //cryptLib.generateRandomIV(16), //16 bytes = 128 bit 
        key = 'b16920894899c7780b5fc7161560a412'             //cryptLib.getHashSha256('my secret key', 32), //32 bytes = 256 bits 
        encryptedText = cryptLib.encrypt(passWrd, key, iv);
        return encryptedText;
    }
    const strBody = req.body;
    const jsonObj = strBody;
    // passing the pwd as obj
    const email_id = jsonObj.username;
    const passWrd = encrypt(jsonObj.password);
    const updatePwd = jsonObj.password;
    const email_flags = jsonObj.flag;
    const update_password = jsonObj.update_password;
    const fromEmail = jsonObj.fromEmail;
    const flag = jsonObj.screenflag;
    const db = req.admin_db;
    var collection = db.collection('User');
    var paramcollection = db.collection('Param');
    try {
        // Query to update password, based on the given username(emailid)
        collection.update({ "ContactDetails.EmailID": email_id },
            {
                $set: {
                    "PasswordDetails.Password": passWrd,
                    // "password_details.update_password": update_password,
                    "password_details.last_updated_date": new Date()
                }
            },
            function (err, result) {
                if (err) {
                    console.log('Error' + err);
                    const obj = {
                        status: 'invalid'
                    };
                    const arr = JSON.stringify(obj);
                } else {
                    const obj = {
                        status: 'valid'
                    };
                    const arr = JSON.stringify(obj);
                    console.log(arr)
                }
            });
    }
    catch (ex) {
    }
    // If the emailflag is true, then email will be sent the respective user
    if (email_flags == true) {
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
          
            const template = '<p>Dear ' + email_id + ',</p><p>Your password has been updated successfully <br> Your New password : <b>' + updatePwd + '</b></p><p>Regards, <br>Gobiom Support Team</p><br />     *** This is an automatically generated email, please do not reply ***'
            const fromemail = fromEmail;
            const subject = 'Password is Updated ✔';
            const text = ' Welcome!';
            const copyMail = '';
            // Method call to send email
            const newTransportPromise = mail(fromemail, email_id, subject, template, auth_user, auth_password, mailService, secureConn, hostName, port, copyMail);
            newTransportPromise.then(docs => {
                res.send("1");
            }).catch((err) => {
                console.log('Error'+err);
            });
        }).catch((err) => {
            console.log("Error in retriving param values from DB " + err);
        })
    }
    else {
        res.send('1');
    }
});
module.exports = router;
