/**
 * Enquiry Form
 * this feature is used by users to enquiry their queries by sending email 
 by filling some required fields with validations in it. 
 */
//var http = require("http");
var mail = require("../commonjs/admin-mail");
var express = require('express');
var router = express.Router();
//DB connection and parameters used
router.post('/', function (req, res) {

    var db = req.admin_db;
    var paramcollection = db.collection('param');
    var jsonObj = req.body;
    var name = jsonObj.name;
    var emailid = jsonObj.email;
    var phone = jsonObj.phone;
    var message = jsonObj.message;

    let email_Flag;
    let to_email;
    //DB Query Here
    paramcollection.find({
        "param_name": {
            $in: [
                "email_flag",
                "from_mail",
                "User_Name",
                "Password",
                "Service",
                "Secure_Connection",
                "Host_Name",
                "Port"
            ]
        }
    },
        { "_id": 0, "param_value": 1, "param_name": 1 })
        .then((docs) => {
            email_Flag = docs[1].param_value;
            to_email = docs[0].param_value;
            var auth_user = docs[2].param_value;
            var auth_password = docs[3].param_value;
            var mailService = docs[4].param_value;
            var secureConn = docs[5].param_value;
            var hostName = docs[6].param_value;
            var port = docs[7].param_value;
            //condition for sending email
            if (email_Flag == true) {
                const template = 'Dear Sir/Madam,<br/><br/>Following user has sent an Enquiry:<br/><br/><b>User: </b> ' + name + '</b><br/><b>Email ID : </b>' + emailid + '</b><br/><b>Mobile : </b>' + phone + '</b><br/><b>Message : </b>' + message + '</b><br/><br/>Best regards,<br />' + name + '<br />'
                const fromemail = to_email;
                const toEmail = to_email;
                const subject = 'Enquiry from User';
                const copyMail = emailid;
                const newTransportPromise = mail(toEmail, fromemail, subject, template, auth_user, auth_password, mailService, secureConn, hostName, port, copyMail);
                newTransportPromise.then(docs => {
                    res.send("1");
                    res.end();
                }).catch((err) => {
                    res.send("0");
                    res.end();
                });
            }
            else{
                res.send("2");
            }
        }).catch((err) => {
            res.send("0");
            res.end();
        })
})
module.exports = router;















