/* Fetch the Userlog for selected company, users from 'userlogs' collection */
var express = require('express');
var userlogrouter = express.Router();
var http = require("http");
userlogrouter.get('/', function (req, res, next) {
    //DB Connection and its parameters
    var strBody = req.body;
    var company = req.query.companyName;
    var db = req.admin_db;
    var collection = db.collection('User');
    if (!db || !db.collection) {
        console.log("collection not found");
        res.json({});
        return;
    }
    // Method to convert duration in HH:MM:SS format
    function msToTime(duration) {
        var milliseconds = parseInt((duration % 1000) / 100),
            seconds = parseInt((duration / 1000) % 60),
            minutes = parseInt((duration / (1000 * 60)) % 60),
            hours = parseInt((duration / (1000 * 60 * 60)) % 24);
        hours = (hours < 10) ? + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        return hours + " :" + minutes + " :" + seconds;
    }
    // Query to get Userlog for based on companyname
    collection.aggregate([{ $match: { 'CompanyName': company, 'ApprovalDetails.Status': 'Approved' } },
    {
        $lookup:
            {
                from: "Userlogs",
                localField: "ContactDetails.EmailID",
                foreignField: "email_id",
                as: "docs"
            }
    },
    {
        $unwind: "$docs"
    },
    {
        $project: {
            _id: 0,
            CompanyName: 1,
            "docs": 1
        }
    },
    {
        $group: {
            "_id": {
                company_name: "$CompanyName",
                user_name: "$docs.email_id",
                login_time: "$docs.login_time",
                logout_time: "$docs.logout_time"
            },
            "count": { "$sum": 1 }
        }
    },
    {
        $project: {
            _id: 0,
            "companyname": "$_id.company_name",
            "username": "$_id.user_name",
            "Login": "$_id.login_time",
            "Logout": "$_id.logout_time"
        }
    },
    {
        $sort: { "Login": -1 }
    }
    ]).then((docs) => {
        for (let obj of docs) {
            if (obj.Logout === void (0))//void(0) to check null or undefined
             {
                obj.duration = 'NA';
                obj.logoutTime = 'NA';
            } else {
                obj.duration = msToTime(obj.Logout - obj.Login);
            }
        }
        res.json(docs);
    }).catch((err) => {
        console.log("Error in retriving into DB " + err);
    }).then(() => db.close())
});
module.exports = userlogrouter;

