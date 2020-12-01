const express = require('express');
const globalSettings = express.Router();
//DB connection
//Post method
globalSettings.post('/', function (req, res, next) {
    const db = req.admin_db;
    const coll = db.collection('Param');

    if (!db || !db.collection) {
        res.json({});
        return;
    }

    const jsonObj = req.body;
    console.log(jsonObj)
    console.log("ss")
    let errorcount = 0;

    /** Backend Loop */
    for (let key in jsonObj) {
        if (jsonObj.hasOwnProperty(key)) {

            // DB Query Here
            coll.update({ ParamName: key },
                {
                    $set: { ParamValue: jsonObj[key] },
                    $currentDate: { LastUpdatedDate: true }
                }
            ).then((docs) => {
                // docs contains the documents inserted with added **_id** fields
                // Inserted 1 documents into the document collection
            }).catch((err) => {
                // An error happened while inserting
                errorcount++
            })
        }
    }
    //Method to check whether DB is updated
    if (errorcount) {
        res.status(400).send("unable to update the database");
        return;
    }
    res.status(200).json({ 'Global Settings': 'Updated Successfully' });
})
//DB connection
//Get method
globalSettings.get('/', function (req, res, next) {
    const db = req.admin_db;
    const coll = db.collection('Param');

    if (!db || !db.collection) {
        res.json({});
        return;
    }
    // DB Query here
    coll.find({ ParamName: { $ne: null } },
        { "_id": 0, "ParamName": 1, "ParamValue": 1 }
    ).then((docs) => {
        res.json(docs);
    }).catch((err) => {
    });
})

module.exports = globalSettings;