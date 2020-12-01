// Insert the company information in 'company' collection
var http = require("http");
var express = require('express');
var path = require("path");
var app1router = express.Router();
var mail = require('../commonjs/admin-mail'); //import for email 
var strEmail = '';
app1router.post('/', function (req, res) {

    const emailIDArray = [];
    // Pushing the email id's in array
    for (let contactDetails of req.body.contactdetails) {
        emailIDArray.push(contactDetails.email_id);
    }
      // String building of email id's with ';' seperation
    emailIDArray.forEach(function (i) {
        strEmail = strEmail + i + ';';
    });
    //DB Connection and its query
    const db = req.admin_db;
    const coll = db.collection('Company');
    var paramcollection = db.collection('Param');
    const email_flags = req.body.email_flag;
    const fromEmail = req.body.from_Email;
    coll.insert({
        CompanyName : req.body.companyname,
        GstNumber : req.body.gst_num,
        PanNumber: req.body.panNum,
        CompanyDescription : req.body.companydesc,
        Address: {
            AddressLine1: req.body.companyaddress,
            City: req.body.cities,
            State: req.body.states,
            Country: req.body.countries,
            Pincode: req.body.zipcode
        },
        Contact_details: req.body.contactdetails,
        Contract: {
            Contract_reference: req.body.contractdetails
        },
        CreatedDate : new Date(),
        LastUpDate: new Date(),
        last_updated_by: req.body.lastUpdatedValue,
    }).then((docs) => {
        //  If emailflag is true, email will be sent to the users
        if (email_flags === true) {
            // Get the email authenication, mail service, port details from param collection
            paramcollection.find({ "ParamName": { $in: ["UserName", "Password", "Service", "SecureConnection", "HostName", "Port"] } }, { "_id": 0, "ParamValue": 1, "ParamName": 1 }).then((docs) => {
                for(let i=0; i< docs.length; i++) {
                    if(docs[i].ParamName == 'UserName' ) {
                     let auth_user = docs[i].ParamValue;
                    } else if (docs[i].ParamName == 'Password') {
                     let auth_password = docs[i].ParamValue;
                    } else if (docs[i].ParamName == 'Service') {
                     let mailService = docs[i].ParamValue;
                    } else if (docs[i].ParamName == 'SecureConnection') {
                     let secureConn = docs[i].ParamValue;
                    } else if (docs[i].ParamName == 'HostName') {
                     let hostName = docs[i].ParamValue;
                    } else if (docs[i].ParamName == 'Port') {
                      let port = docs[i].ParamValue;
                    }         
                } 
        

                const template = '<p>Dear Sir/Madam,</p> Your Company ' + req.body.companyname + ' is Registered Successfully <br/><p>Regards, <br>Gobiom Support Team</p><br/>    *** This is an automatically generated email, please do not reply ***'
                const from_Email = fromEmail;
                const subject = 'Company Registered Successfully ✔';
                const text = ' Welcome!';
                const copymail = '';
                //  Method call to send email
                const newTransportPromise = mail(from_Email, strEmail, subject, template, auth_user, auth_password, mailService, secureConn, hostName, port, copymail);
                newTransportPromise.then(docs => {
                    res.send("1");
                    // If inserted into DB & mail sent '1' will be sent
                }).catch((err) => {
                    res.send("3");
                    // If error occurs '3' will be sent
                });
            }).catch((err) => {
                console.log("Error in inserting company details " + err);
            })
        } else {
            res.send('1');
            // If inserted in DB '1' will be sent
        }
    }).catch((err) => {
        console.log(err);
        res.send('3');
        // If error occurs '3' will be sent
    });
});

module.exports = app1router;

