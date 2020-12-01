/* Fetch contract details from 'contracts' collection for the respective contract reference*/
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    //DB Connection and its parameters
    var strBody = req.query;
    var db = req.admin_db;
    var collection = db.collection('Contracts');
    var tempObj = {};
    tempObj["$match"] = { contract_reference: strBody.referencenum };
    var ProjectObject = {};
    ProjectObject["$project"] = {
        // "Exportflag": "$export_flag",
        // "DownloadLimit": "$download_limit",
        "GeneralAlert": "$general_alert_flag",
        "StartDate": "$valid_start_date",
        "EndDate": "$valid_to_date", _id: 0
    };
    try {
        //DB Query
        collection.aggregate([tempObj, ProjectObject],
            function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    var obj = {
                        status: 'valid'
                    }
                    var arr = JSON.stringify(result);
                    res.send(arr);
                }
            });
    }
    catch (ex) {
        console.dir(ex);
    }
});
module.exports = router;