/* To check the username is exist or not */
var express = require('express');
var Router = express.Router();
Router.get('/', function (req, res, next) {
    //DB Connection and its query
    var strBody = req.query;
    var db = req.admin_db;
    var collection = db.collection('User');
    var email_id = strBody.username;
    try {
             collection.find({'ContactDetails.EmailID':email_id}, function(error, docs) {
                if (error) {
                    res.send('1');
                    // if error occurs '1' will be sent
                } if (docs == "") {
                    res.send('2');
                    // username is not exist '2' will be sent
                } else {
                    console.log('Already Exists Email');
                    res.send('3');
                    // Already exists '3' will be sent
                }
            });
    }
    catch (ex) { 
        console.dir(ex);
    }
});
module.exports = Router;