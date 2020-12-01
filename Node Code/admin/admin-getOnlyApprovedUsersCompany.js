/* Fetch the company name based on username selection */
const express = require('express');
const getUsersCompany = express.Router();
getUsersCompany.get('/', function (req, res, next) {
    //DB Connection & Query to get the companyname
    const db = req.admin_db;
    const coll = db.collection('User');
   
    coll.aggregate([
        {
            $match: {
                "ContactDetails.EmailID": req.query.username,
                "ApprovalDetails.Status": { $in: ["Approved"] }
            }
        },
        {
            "$project":
                {
                    'CompanyName': 1, "_id": 0
                }
        }
    ]).then((docs) => {
        res.send(docs);
    }).catch((err) => {
        console.log("Error in retriving Companyname from DB " + err);
    });
});
module.exports = getUsersCompany;