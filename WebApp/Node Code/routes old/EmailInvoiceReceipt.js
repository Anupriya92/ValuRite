var http = require("http");
var express = require('express');
var mongodb = require('mongodb');

var express = require('express');
var router = express.Router();

var SendEmail = require("./EmailModule.js");
SendEmail = new SendEmail();


router.post('/', function(req, res, next) {
    try {
        var jsonObj = req.body;
        var UserID = jsonObj.UserID;
        var AmountPaid = jsonObj.AmountPaid;
        var AmountPending = jsonObj.AmountPending;
        var PaymentDate = jsonObj.PaymentDate;
        var InvoiceID = jsonObj.InvoiceID;
        var PaymentDescription = jsonObj.PaymentDescription;
		var LenderID=jsonObj.LenderID;
        console.log(jsonObj + "--" + UserID);


        var db = req.db;

        var coll1 = db.get('User');
        coll1.find({
            'UserID': UserID
        }, {
            //fields: {
                ContactDetails: 1,
                _id: 0
           // }
        }, function(er, Result) {
            if (er) {
                console.log(er);
                res.send("0");
            } else if (Result.length) {
                var email = Result[0].ContactDetails.EmailID;
                console.log(email);
                console.log('Found', Result[0]);


                var coll2 = db.get('User');
                coll2.find({
                    'UserID': LenderID
                }, {
                    fields: {
                        UserName: 1,
                        _id: 0
                    }
                }, function(errr, result) {
                    if (errr) {
                        console.log(errr);
                        res.send("0");
                    } else if (result.length) {
                        console.log('Found', result[0]);

                        var UserName = Result[0].UserName;
                        console.log("UserName" + UserName);
                        UserName = UserName.toString();



                        var MailContents = {
                            to: email,
                            cc:'vijays.ab@analyticbrains.com,csatishkumar@analyticbrains.com',
                            subject: 'Invoice Receipt',
                            text: '',
                            html: '<style>p{padding-top:5px;}</style><div style="color: #000; background-color: #fff;font-family: Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;"><p>For Invoice ID: ' + InvoiceID + ' amount has been paid ' + AmountPaid + ' Rupees by ' + UserName + ' on ' + PaymentDate + ' <br/> Please find the attachment below,<br /></p><p>*** This is an automatically generated email, please do not reply ***',
                            Attachments: InvoiceID
                        }
                        console.log(SendEmail.fnsendemail(MailContents,"") + "Sending Email");
                        res.send("1");

                    } else {
                        console.log("No documents");
                    }
                });
            } else {
                console.log("No documents for Appraiser");

            }
        });
    } catch (ex) {
        console.dir(ex);
    }
});
module.exports = router;