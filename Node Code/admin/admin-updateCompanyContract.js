// To update the company contract details
var express = require('express');
var path = require("path");
var mail = require('../commonjs/admin-mail');
let strEmail = '';

var updaterouter = express.Router();
updaterouter.post('/', function (req, res, i) {
    const emailIDArray = [];
    // Pushing the email id's in array
    for (const contactDetails of req.body[(req.body.length - 1)]) {
        emailIDArray.push(contactDetails.email_id);
    }
    // String building of email id's with ';' seperation
    emailIDArray.forEach(function (i) {
        strEmail = strEmail + i + ';';
    });
    const db = req.admin_db;
    const coll = db.collection('Contracts');
    const paramcollection = db.collection('Param');
    const email_flag = req.body[0].email_flag;
    const fromEmail = req.body[0].from_Email;
    flag = 0;
    // With Contract reference as a key element, other details are updated in the contracts collection 
    for (let obj of req.body) {
        if (obj.contract_reference != null && obj.contract_reference != "" && obj.contract_reference != undefined) {
            var companyname = obj.companyName;
            coll.update({
                contract_reference: obj.contract_reference
            },
                {
                    $set: {
                        "contract_reference": obj.contract_reference,
                        "contract_description": obj.contract_description,
                        "contract_date": new Date(obj.contract_date),
                        "valid_start_date": new Date(obj.valid_start_date),
                        "valid_to_date": new Date(obj.valid_to_date),
                        "max_allowed_logins": obj.max_allowed_logins,
                        "general_alert_flag": obj.general_alert_flag,
                        "LastUpDate": new Date(),
                        "last_updated_by": obj.last_updated_by
                    }
                },
                { upsert: true },
            );
        }
    }
    //  If emailflag is true, email will be sent to the users
    if (email_flag == true) {
        // Get the email authenication, mail service, port details from param collection
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
            const template = '<p>Dear Sir/Madam,</p> Your Company ' + companyname + ' details are updated successfully <br/><p>Regards, <br>Gobiom Support Team</p><br/>    *** This is an automatically generated email, please do not reply ***'
            const from_Email = fromEmail;
            const subject = 'Company Updated Successfully ✔';
            const text = ' Welcome!';
            const copymail = '';
              //  Method call to send email 
            const newTransportPromise = mail(from_Email, strEmail, subject, template, auth_user, auth_password, mailService, secureConn, hostName, port, copymail);
            newTransportPromise.then(docs => {
                res.send("1");
            }).catch((err) => {
                res.send("3");
            });
        }).catch((err) => {
            console.log("Error in updating contract details " + err);
        })
    } else {
        res.send('1');
    }
    if (flag === 1) {
        res.json('success');
    }
});
module.exports = updaterouter;
