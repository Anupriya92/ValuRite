const nodemailer = require('nodemailer');
const http = require("http");
const mailService = (fromEmail, toEmail, subject, content,auth_userName,auth_passWord,mail_service,secureConn,hostName,portNumber,copyTo) =>
 {   
    
      const transporter = nodemailer.createTransport({
        host: hostName, // hostname
        secure: secureConn, // TLS requires secureConnection to be false
       port: portNumber, // port for secure SMTP
        auth: {
            user: auth_userName,
            pass: auth_passWord
        },
        
        logger: true, // log to console
     debug: true // include SMTP traffic in the logs
    });
   
    const mailOptions = {
        from: fromEmail,
        to: toEmail,
        cc: copyTo,
        subject: subject,
        html: content
    };

    const newTransportPromise = new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => 
        error ? reject(error) : resolve(info)
        )
    }); 
    console.log('INSIDE MAIL SERVICE');

    // newTransportPromise.then(docs => {
    //     console.log('Sent');
    //     response = "1";
    // }).catch((err) => {
    //     console.log('Error')
    //     response = "3";
    // });
    
    /*transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error' + error);
        //  return  "3";
            response = "3";
        } else {
            console.log('Email sent: ' + info.response);
        //  return "1";
            response = "1";
        }
        console.log('Response', response)
        return response;
    });*/

    return newTransportPromise;

}
module.exports = mailService;
