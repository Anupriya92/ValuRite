/* To Fetch the username for the selected company from 'user' collection */
const express = require('express');
const getCompanyUsers = express.Router();
getCompanyUsers.get('/', function (req, res, next) {
    //DB Connection
    const db = req.admin_db;
    const coll = db.collection('User');
    //DB Query
    coll.aggregate([
        {
            $match: {
                'CompanyName': req.query.companyname,
                "ApprovalDetails.Status": { $in: ["Approved"] }
                // Would contain inactive users
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
        console.log("Error in retriving data from DB " + err);
    });
});
module.exports = getCompanyUsers;