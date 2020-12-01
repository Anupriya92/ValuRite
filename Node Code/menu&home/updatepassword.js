var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
	//Method to encrypt the password
	function encrypt(pass) {
		var cryptLib = require('cryptlib'),
			iv = 'rv6Isv_BpSFBrB2V'//cryptLib.generateRandomIV(16), //16 bytes = 128 bit 
		key = 'b16920894899c7780b5fc7161560a412'//cryptLib.getHashSha256('my secret key', 32), //32 bytes = 256 bits 
		encryptedText = cryptLib.encrypt(pass, key, iv);
		return encryptedText;
	}
	//Method to decrypt the password
	function decrypt(pass) {
		var cryptLib = require('cryptlib'),
			iv = 'rv6Isv_BpSFBrB2V'//cryptLib.generateRandomIV(16), //16 bytes = 128 bit 
		key = 'b16920894899c7780b5fc7161560a412'//cryptLib.getHashSha256('my secret key', 32), //32 bytes = 256 bits 
		originalText = cryptLib.decrypt(pass, key, iv);
		return originalText;
	}
	//DB connection and parameters	
	try {
		var strBody = req.body;
		var jsonObj = strBody;

		var EmailID = jsonObj.username;
		var pwd = jsonObj.password;
		var upassword = encrypt(jsonObj.upassword);
		var updatepassword = jsonObj.updatepassword;
		var db = req.admin_db;
		var collection = db.collection('User');
		//*******************************Retrieves set of docs matching the find Criteria**********************************//
		collection.find({ 'ContactDetails.EmailID': EmailID }, function (err, docs) {
			//Check for Empty docs     
			if (docs == "") {
				var obj = {
					status: 'notexist'
				}
				var arr = JSON.stringify(obj);
				res.send(arr);
			}
			else {
				docs.forEach(function (doc) {
					var decrypt_password = decrypt(doc.PasswordDetails.Password);
					//if condition is satisfied , it will be updated in DB or error will be shown
					if (decrypt_password == pwd) {
						try {
							collection.update({ "ContactDetails.EmailID": EmailID }, { $set: { "PasswordDetails.Password": upassword, "PasswordDetails.update_password": updatepassword, "PasswordDetails.last_updated_date": new Date() } },
								function (err, result) {
									if (err) {
									} else {
										var obj = {
											status: 'valid'
										}
										var arr = JSON.stringify(obj);
										res.send(arr);
									}
								});
						}
						catch (ex) {
						}
					} else {
						var obj = {
							status: 'error'
						}
						var arr = JSON.stringify(obj);
						res.send(arr);
					}
				});
			}
		});
	}
	catch (ex) {
	}
});
module.exports = router;