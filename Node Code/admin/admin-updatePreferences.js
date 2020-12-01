/* To set the user preference in 'userpreference' collection, updates when the preference is changed */
const express = require('express');
const updatePreferences = express.Router();
updatePreferences.post('/', function (req, res, next) {
    const db = req.admin_db;
    const coll = db.collection('Userpreference');
    if (!db || !db.collection) {
        res.json({});
        return;
    }
    // Query to update the userpreference
    coll.update(
        { email_id: req.body.userName },
        {
            $set: {
                preference_id: req.body.preferenceId,
                last_updated_date: new Date(),
                last_updated_by: req.body.userName
            }
        },
        { upsert: true }
    ).then((docs) => {
        res.send(docs);
    }).catch((err) => {
        console.log("Error in Updating DB " + err);
        errorcount++
    })
});

module.exports = updatePreferences;