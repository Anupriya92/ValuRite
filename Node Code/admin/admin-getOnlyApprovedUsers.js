/* Fetch the Username based on Company name selection */
const express = require('express');
const getCompanyUsers = express.Router();
getCompanyUsers.get('/', function (req, res, next) {
    //DB Connection & Query
    const db = req.admin_db;
    const coll = db.collection('User');
    coll.aggregate([
        {
            $match: {
                'CompanyName': req.query.companyname,
                "ApprovalDetails.Status": { $in: ["Approved"] }
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
        console.log("Error in retriving Users of the given Company from DB " + err);
    });
});
module.exports = getCompanyUsers;