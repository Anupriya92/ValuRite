/**
 * Forget Password
 * this feature is used when users forgets their password by sending email 
 by filling some required fields with validations in it. 
 */
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.post('/', function (req, res, next) {
    function randomPassword() {
        chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        pass = "";
        for (x = 0; x < 8; x++) {
            i = Math.floor(Math.random() * 62);
            pass += chars.charAt(i);
        }
        return pass;
    }
    //Method to encrypt the password
    function encrypt(pass) {
        var cryptLib = require('cryptlib'),
            iv = 'rv6Isv_BpSFBrB2V' //cryptLib.generateRandomIV(16), //16 bytes = 128 bit 
        key = 'b16920894899c7780b5fc7161560a412' //cryptLib.getHashSha256('my secret key', 32), //32 bytes = 256 bits 
        encryptedText = cryptLib.encrypt(pass, key, iv);
        return encryptedText;
    }
    //DB connection and parameters used
    try {
        var strBody = req.body;
        var jsonObj = strBody;
        var EmailID = jsonObj.fusername;
        var randomPassword = randomPassword(); //Generate the random password for update password
        var encrypt_password = encrypt(randomPassword);
        var db = req.admin_db;
        var collection = db.collection('User');

        //*******************************Retrieves set of docs matching the find Criteria**********************************//
        collection.find({
            'ContactDetails.EmailID': EmailID
        }, function (err, docs) {
            //Check for Empty docs     
            if (docs == "") {
                var obj = {
                    status: 'notexist'
                }
                var arr = JSON.stringify(obj);
                res.send(arr);
            } else {
                docs.forEach(function (doc) {
                    // condition used when password is not null 
                    if (doc.password_details.password != "") {
                        try {
                            collection.update({
                                "ContactDetails.EmailID": EmailID
                            }, {
                                    $set: {
                                        "PasswordDetails.Password": encrypt_password,
                                        "PasswordDetails.update_password": "false",
                                        "PasswordDetails.last_updated_date": new Date()
                                    }
                                },
                                function (err, result) {
                                    if (err) {
                                    } else {
                                    }
                                });
                            //method used for sending email
                            var transporter = nodemailer.createTransport({
                                service: 'Yahoo',
                                secureConnection: true,
                                auth: {
                                    user: 'support@analyticbrains.com',
                                    pass: 'Abtech1234$'
                                },
                            });

                            var mailOptions = {
                                from: 'support@analyticbrains.com',
                                to: EmailID,
                                cc: 'vijays.ab@analyticbrains.com,csatishkumar@analyticbrains.com,arulayyanar@analyticbrains.com',
                                subject: 'GOBIOM Admin',
                                text: 'Welcome! ' + doc.first_name + '.' + doc.last_name,
                                html: '<p><b>Welcome to GOBIOM</b></p><br /> <b> Your new password is : ' + randomPassword + ' </b><br /><br/>Please go to the following login page : <a href="http://182.72.100.214:8091/#/login">Click here</a><br /><br />   *** This is an automatically generated email, please do not reply ***'
                            };

                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    var obj = {
                                        status: 'mailerror'
                                    }
                                    var arr = JSON.stringify(obj);
                                    res.send(arr);
                                } else {
                                    var obj = {
                                        status: 'valid'
                                    }
                                    var arr = JSON.stringify(obj);
                                    res.send(arr);
                                }
                            });
                        } catch (ex) {
                        }
                    } else {
                        var obj = {
                            status: 'invalid'
                        }
                        var arr = JSON.stringify(obj);
                        res.send(arr);
                    }
                });
            }
        });
    } catch (ex) {
    }
});
module.exports = router;