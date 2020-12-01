/* Insert/Update data in 'param' collection */
var express = require('express');
var path = require("path");
var app1router = express.Router();
app1router.post('/', function (req, res) {
    //DB Connection and its query
    const db = req.admin_db;
    const coll = db.collection('Param');
    for (let obj of req.body) {
        coll.update({ 'ParamName': obj.param_name },
            {
                $set: {
                    "ParamId": obj.param_id,
                    "ParentId": obj.parent_id,
                    "ParamValue": obj.param_value,
                    "CreatedDate": new Date(),
                    "LastUpdatedDate": new Date()
                }
            },
            { upsert: true },
        );
    }
},
    function (err, update) {
        if (update) {
            res.json(update);
        }
        if (err) console.log('Error' + err);
    });
module.exports = app1router;
