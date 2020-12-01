/* To Fetch the username from 'user' collection */
const express = require('express');
const getUsers = express.Router();
getUsers.get('/', function (req, res, next) {
      //DB Connection and its query
    const db = req.admin_db;
    const coll = db.collection('User');
    coll.aggregate([
        {
            $match: {
                "ApprovalDetails.Status": "Approved"
            }
        },
        {
            "$project":
                {
                    'ContactDetails.EmailID': 1, "_id": 0
                }
        }
    ]).then((docs) => {
        res.json(docs);
    }).catch((err) => {
        console.log("Error in retrieving data from DB " + err);
    });
});
module.exports = getUsers;