/* Fetch all the Param values from 'param' collection */
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    //DB Connection
    const db = req.admin_db;
    const coll = db.collection('Param');
    coll.find({ "ParamName": { $ne: null } }, { "ParamValue": 1, "ParamName": 1, 'CreatedDate': 1, 'ParamId': 1, "_id": 0 })
        .then((docs) => {
            console.log('Data retrieved');
            res.json(docs);
        }).catch((err) => {
            console.log("Error in retriving into DB " + err);
        })
});
module.exports = router;