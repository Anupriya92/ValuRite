/* Get the Email Flag & from mail id from the param table */
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    //DB Connection
    const db = req.admin_db;
    const paramcollection = db.collection('Param');
    //DB Query
    paramcollection.find({
        "ParamName": {
            $in: [
                "Email_Flag",
                "FromEmail"
            ]
        }
    }, { "_id": 0, "ParamValue": 1, "ParamName": 1 })
        .then((docs) => {
            res.send(docs);
        }).catch((err) => {
            console.log("Error in retriving from DB " + err);
        })
});
module.exports = router;