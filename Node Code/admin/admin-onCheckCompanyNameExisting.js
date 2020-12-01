// To check the Company Name exist or not
var express = require('express');
var Router = express.Router();
Router.get('/', function (req, res, next) {
      //DB Connection and its query
    var strBody = req.query;
    var db = req.admin_db;
    var collection = db.collection('Company');
    var companyName = strBody.companyname;
    try {
        // Query to check the companyname
        collection.find({ 'CompanyName': companyName }, function (error, docs) {
            if (error) {
                res.send('1');
            //if error occurs '1' will be sent
            } if (docs == "") {
                res.send('2');
                //if not exists '2' will be sent
            } else {
                console.log('Already Exists Company Name');
                res.send('3');
                //if exists '3' will be sent
            }
        });
    }
    catch (ex) { }
});
module.exports = Router;