/* Get the User Preference, from 'userpreference' collection */
const express = require('express');
const getPreferences = express.Router();
getPreferences.get('/', function (req, res, next) {
    //DB Connection
    const db = req.admin_db;
    const coll = db.collection('Userpreference');
    const email_id = req.query.username;
    // Query to find the userpreference, based on the given emailid
    coll.find({ 'email_id': email_id }, { 'preference_id': 1, "_id": 0 })
        .then((docs) => {
            console.log('Preferences retrieved');
            console.log(docs);
            res.json(docs);
        }).catch((err) => {
            console.log("Error in retriving Company Names from DB " + err);
        })
});
module.exports = getPreferences;