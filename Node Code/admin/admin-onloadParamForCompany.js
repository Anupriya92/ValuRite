// Fetch the Param values from Param collection
const express = require('express');
const router = express.Router();
router.get('/', function (req, res, next) {
    const db = req.admin_db;
    const coll = db.collection('param');
    //  Query to get the data from DB for onload param default data
    coll.find({ param_name: { $in: ["export_flag", "download_limit", "general_alert_flag", "No_of_session"] } },
        {
            "_id": 0, "param_name": 1, "param_value": 1
        }).then((docs) => {
            console.log('param values are retrieved');
            res.json(docs);
        }).catch((err) => {
            console.log("Error in retriving param values from DB " + err);
        }).then(() => db.close())
});
module.exports = router;