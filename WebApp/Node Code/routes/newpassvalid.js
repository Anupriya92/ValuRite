var http = require("http");
var cryptLib = require('cryptlib')
var fs = require("fs")
var CaptureLog = require("./log.js");

var express = require('express');
var router = express.Router();
capturelog = new CaptureLog();

router.post('/', function(req, res, next) {
    try {
        var strBody = req.body;
        /*req.on("data", function(chunk) {
            strBody += chunk;
        });*/
       // req.on("end", function() {
            console.log("Received posted data: " + strBody);
            //Getting User details.. 
            var jsonObj = strBody;
            var userid = jsonObj.strID;
            var pass = jsonObj.newPassword;
            var secQuestion = jsonObj.securityQuestion;
            var secAnswer = jsonObj.securityAnswer;
            var key = jsonObj.strKey;
            var iv = jsonObj.striv;
            //password decryption
            console.log(userid);
            console.log(pass + " pass")
            console.log(cryptLib.decrypt(pass, key, iv) + " desc");
            var decPass = cryptLib.decrypt(pass, key, iv);

            console.log("Connected to Database");
			var db = req.db;
            var collection = db.get('User');
            collection.find({
                UserID: userid
            }, function(err, docs) {
                console.log(docs );
                //updating the password details in User collection
                collection.update({
                    UserID: userid
                }, {$set:{
                        "PasswordDetails.Password": decPass,
                        "PasswordDetails.PasswordQuestion": secQuestion,
                        "PasswordDetails.PasswordAnswer": secAnswer,
						"status": "true"
					}
                }, function(err, results) {
                    if (err) {
						console.log(err)
						console.log('Error in updating Password')
                        res.send("0");
                        capturelog.fnuserlog("\r\n\r\n PasswordUpdate Page -- Update Failed -- UserID : " + userid + ", Date :" + new Date())
                    } else {
						console.log('Password Updated Successfully')
                        res.send("1");
                        capturelog.fnuserlog("\r\n\r\n PasswordUpdate Page -- Update Success  -- UserID : " + userid + ", Date :" + new Date())
                    }
                });
            });
       // });
    } catch (ex) {
        console.dir(ex);
    }
});
module.exports = router;