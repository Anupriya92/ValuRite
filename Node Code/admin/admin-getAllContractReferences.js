/* Check the Contract reference is exists or not in 'contracts' collection*/
var express = require('express');
var Router = express.Router();
Router.get('/', function (req, res, next) {
    //DB Connection and its parameters
    var strBody = req.query;
    var db = req.admin_db;
    var collection = db.collection('Contracts');
    var contRef = strBody.contract_reference;
    try {
        //DB Query 
        collection.find({ 'contract_reference': contRef }, function (error, docs) {
            if (error) {
                res.send('1');
            } if (docs == "") {
                res.send('2');
                // If not present '2' will be sent
            } else {
                res.send('3');
                // If already exits '3' will be sent
            }
        });
    }
    catch (ex) {
        console.dir(ex);
    }
});
module.exports = Router;