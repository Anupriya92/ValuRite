/* To Fetch the 'UnApproved' users from 'user' collection */
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    //DB Connection 
    var db = req.admin_db;
    var project = db.collection('User');
    // Query to bind the data with UnApproved Status
    project.aggregate([
        { $match: { "ApprovalDetails.Status": "unApproved" } },
        { $unwind: { path: "$ApprovalDetails", preserveNullAndEmptyArrays: true } },
        { $sort: { 'CreatedDate': -1 } }
    ]).then((docs) => {
        res.json(docs);
    }).catch((err) => {
        console.log("Error in retriving into DB " + err);
    }).then(() => db.close())
});
module.exports = router;