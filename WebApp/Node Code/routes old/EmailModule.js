var MyEmailModule = function(){};
var fs = require("fs")
var nodemailer = require('nodemailer');
MyEmailModule.prototype.fnsendemail=function(MailContents,res)
		{
			
			//MailContents=
			// Create a SMTP transporter object
			var transporter = nodemailer.createTransport({
				service: 'Yahoo',
				secureConnection: true,
				
				auth: {
					user: 'support@analyticbrains.com',//Email id here
					pass: 'Abtech1234$' //Password
				},
				logger: true, // log to console
				debug: true // include SMTP traffic in the logs
			}, 
			{
				// default message fields
				// sender info
				from: 'support@analyticbrains.com', //From Address
					headers: {
						//'X-Laziness-level': 1000 // just an example header, no need to use this
					}
			});
			console.log('SMTP Configured');
			
			
			
			console.log(MailContents.to)
			console.log(MailContents.cc)
			
			console.log(MailContents.Attachments)
			
			// Configuring  Mail Details 
			var message = {
				// Comma separated list of recipients
				to: MailContents.to ,
				cc:MailContents.cc,
				
				// Subject of the message
				subject: MailContents.subject, //

				// plaintext body
				text: MailContents.text,

				// HTML body
				html: MailContents.html
			};
			
			
			
			if(MailContents.Attachments!=""){
				
					message = {
						// Comma separated list of recipients
					to: MailContents.to ,
					cc:MailContents.cc,
					
					// Subject of the message
					subject: MailContents.subject, //

					// plaintext body
					text: MailContents.text,

					// HTML body
					html: MailContents.html,
					attachments:[{
						filename: MailContents.Attachments+".pdf",
						path: 'http://localhost/Data/'+MailContents.Attachments+'.pdf'// stream this file	
					}]
				}
				
			}
			
			
			//console.log('http://182.72.100.214/Data/'+MailContents.Attachments+'.pdf')
			//console.log(MailContents.Attachments+"Attachments")
			
			
			//Sending the Email
			transporter.sendMail(message, function (error, info) {
				if (error) {
					console.log('Error occurred');
					console.log(error.message);
					transporter.sendMail(message);
				}
				else{
					if(res==""){
						console.log('Message sent successfully!');
						console.log('Server responded with "%s"', info.response);
					}
					else{
						res.end("1");
						console.log('Message sent successfully!');
						console.log('Server responded with "%s"', info.response);
					}
				}
			});
		}
module.exports = MyEmailModule;