//var http = require("http");
var nodemailer = require('nodemailer');
var mail = require('../commonjs/admin-mail')
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
router.post('/',  function (req, res, next) {
	// jwt.verify(req.token,'secretkey',(err, authData) => {
    //     if(err) {
    //         res.sendStatus(404);
    //     } else {
	// console.log(req.body)
	// if(Object.keys(req.body).length === 0) {
	// 	return res.status(404).send('ErrorMsg : Request body is not found')
	// } else if (Object.keys(req.body).length < 13) {
	// 	return res.status(200).send('ErrorMsg : Please fill the required data')
	// }
	//DB connection and parameters
	try {
		var strBody = req.body;
		var jsonObj = strBody;
		console.log(JSON.stringify(jsonObj));
		var firstname = jsonObj.firstname
		var lastname = jsonObj.lastname
		var email_id = jsonObj.emailid
		var mobile_number = jsonObj.phonenumber
		var address1 = jsonObj.addressLine1;
		var address2 = jsonObj.addressLine2;
		var Landmark = jsonObj.landMark;
		var companyName = jsonObj.company;
		var country = jsonObj.country;
		var state = jsonObj.state;
		var city = jsonObj.city;
		var area = jsonObj.area;
		var pinCode = jsonObj.pincode;
		// var ip_address = jsonObj.ipaddress;
		// var request = jsonObj.request;
		// var navigateurl = jsonObj.url;
		var db = req.admin_db;
		var collection = db.collection('User');
		//DB query to insert new user and to send email
		collection.find({ 'ContactDetails.EmailID': email_id }, function (err, docs) {
			if (docs == "") {
				var db2 = req.db;
				var coll = db2.collection('User');
				coll.find({}, function (err, cc) {
					if (err) {
					//	res.send("0");
						return res.status(500).send("Message : Error in fetching the data from DB");
					}
					else {
						collection.insert({
							"FirstName": firstname,
							"LastName": lastname,
							"UserID": email_id,
							"RegisteredCompanyName": companyName,
							"ContactDetails" : {
								"PhoneNo" : "",
								"MobileNo" : mobile_number,
								"EmailID" : email_id
							},
							"Address" : {
								"AddressLine1" : address1,
								"AddressLine2" : address2,
								"AddArea" : area,
								"City" : city,
								"State" : state,
								"Country" : country,
								"Pincode" : pinCode,
								"Landmark" : Landmark
							},
							"UserStatus" : "InActive",
							"CreatedDate": new Date(),
							"LastUpDate": new Date(),
							"ApprovalDetails": {
								"Status": "unApproved",
							}
						}, function (err, result) {
							if(err){
								console.log(err);
							}else{
								db.collection('Param').find({
									"ParamName": {
										$in: [
											"FromEmail",
											"UserName",
											"Password",
											"Service",
											"SecureConnection",
											"HostName",
											"Port"
										]
									}
								}, { "_id": 0, "ParamValue": 1, "ParamName": 1 }).then((docs) => {
									for(let i=0; i< docs.length; i++) {
										if(docs[i].param_name == 'UserName' ) {
										 var auth_user = docs[i].param_value;
										} else if (docs[i].param_name == 'Password') {
										 var auth_password = docs[i].param_value;
										} else if (docs[i].param_name == 'Service') {
										 var mailService = docs[i].param_value;
										} else if (docs[i].param_name == 'SecureConnection') {
										 var secureConn = docs[i].param_value;
										} else if (docs[i].param_name == 'HostName') {
										 var hostName = docs[i].param_value;
										} else if (docs[i].param_name == 'Port') {
										  var port = docs[i].param_value;
										} else if (docs[i].param_name == 'FromEmail') {
											var from_email = docs[i].param_value;
									} 
								}

									const template = 'Dear Support Team,<br/>The following user requested for evaluation license, please do needfull <br/><br/><table border=1 frame=hsides rules=rows> <tr> <b> <th>S.No</th> <th>First Name</th> <th>Last Name</th> <th>Email ID</th> <th>Mobile Number</th> <th>Company</th> <th>Country</th> <th>Address</th> </b></tr> <tr> <td>1</td> <td>'
										+ firstname + '</td> <td>' + lastname + '</td> <td>' + email_id + '</td> <td>' + mobile_number + '</td> <td>' + companyName +'</td> <td>' + country + '</td> <td>' + address1 + address2 + area + city +Landmark + pinCode+'</td></tr></table><br/><br/>Best Regards,<br/>Admin';
									const fromEmail = from_email;
									const toEmail = from_email;
									console.log(fromEmail, toEmail)
									const subject = 'New User Registration';
									const text = ' Welcome!';
									const copyMail = '';
									const newTransportPromise = mail(fromEmail, toEmail, subject, template, auth_user, auth_password, mailService, secureConn, hostName, port, copyMail);
									newTransportPromise.then(docs => {
										res.send("1");
										res.status(200).send("Message: Data Inserted in DB and mail sent")
									}).catch((err) => {
										res.send("3");
										res.status(200).send("Message: Inserted data, but error in sending the email ")
									});
								})
							}
						});
					}
				})
			}
			else {
				// res.send("2");
				res.status(200).send("Message: Inserted data in DB")
			}
		})
	}
	catch (ex) {
		console.log(ex)
	}
// }
// })
});

function verifyToken (req,res,next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        console.log(req.token)
        next();
    } else {
        res.sendStatus(404);
    }
}
module.exports = router;
