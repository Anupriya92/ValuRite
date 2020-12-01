/* To Fetch the userlog details (login, logout time) based on that access count is determined
 with respective to the given username,startdate and enddate
 'username' is the key element to find the userlogs in 'userlogs' collection */
const express = require('express');
const getYearmonthWiseStatsforUser = express.Router();
getYearmonthWiseStatsforUser.post('/', function (req, res, next) {
    //DB Connection and its parameters
    const db = req.db;
    const coll = db.collection('userlogs');
    const collection = db.collection('Appraisal');

    if (!db || !db.collection) {
        res.json({});
        return;
    }

    const usernames = req.body.userName;
    const companyname = req.body.companyName;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const searchType = req.body.type;
    const valuationStatus =  req.body.valuationstatus;
    // Check the element exist or not
    const propertyStatus = element => (element === null || element === undefined || element.length === 0) ?
        'propertyNotExists' : 'propertyExists';
    const year = new Date().getFullYear();
    const currentYearString = year.toString();
    const nextYearString = (year + 1).toString();
console.log(year +"year")
console.log(valuationStatus +"curent year")
console.log(nextYearString +"nextyear")
    const ms = {
        day: 24 * 60 * 60 * 1000
    };
    // Date conversion
    const dateAfter = (date) => new Date(new Date(date).valueOf() + (ms.day));
    // Array to push the input data for building the match query
    let ArrayMatchQuery = [];
    let searchParameter = {};
    // Tree structure, based on the key the input is pushed into the array
    const matchKeyWordGenerationTree = {
        'propertyExists': {
            'userName': () => {
                ArrayMatchQuery.push({
                    'AppraiserID': { '$in': req.body.userName }
                });
            },
            'companyName': () => {
                ArrayMatchQuery.push({
                    'CompanyName': { '$in': req.body.companyName }
                });
            },
            'startDate': () => {
                ArrayMatchQuery.push({
                    'ModifiedDate': { "$gte": dateAfter(startDate) }
                });
            },
            'endDate': () => {
                ArrayMatchQuery.push({
                    'ModifiedDate': { "$lte": dateAfter(endDate) }
                });
            },
            'valuationstatus': () => {
                ArrayMatchQuery.push({
                    'AppraisalStatus': req.body.valuationstatus
                });
            }
        }
    };

    for (let property in req.body) {
        if (matchKeyWordGenerationTree.hasOwnProperty(propertyStatus(req.body[property]))) {
            if (matchKeyWordGenerationTree[propertyStatus(req.body[property])].hasOwnProperty(property)) {
                // Pattern Matching based on keys on req.body 
                matchKeyWordGenerationTree[propertyStatus(req.body[property])][property]();
            }
        }
    }

    let MatchQuery = {}

    MatchQuery = {
        '$and': ArrayMatchQuery
    }
    console.log(JSON.stringify(MatchQuery))

        var query = [
            {
                $match: MatchQuery
            }, {
                $project: {
                    _id: 0,
                    CompanyName: 1,
                    AppraiserID: 1,
                    year: { $year: "$ModifiedDate" },
                    month: { $month: "$ModifiedDate" }

                }
            },
                        {
                $group: {
                    "_id": {
                        company_name: "$CompanyName",
                        user_name: "$AppraiserID",
                        year: "$year",
                        month: "$month"
                    },
                    "count": { "$sum": 1 }
                }
            },
              {
                $project: {
                    _id: 0,
                    companyname: "$_id.company_name",
                    username: "$_id.user_name",
                    year: "$_id.year",
                    month: "$_id.month",
                    count: "$count"
                }
            }
        ]
        collection.aggregate(query).then((docs) => {
            console.log('Got the yearly statistics of given users for a date Range from DB');
            res.json(docs);
            console.log(docs)
        }).catch((err) => {
            console.log("Error in retriving yearly statistics of given users for a date Range from DB " + err);
        });
    });
    module.exports = getYearmonthWiseStatsforUser;
            // {
            //     $lookup:
            //         {
            //             from: "user",
            //             localField: "email_id",
            //             foreignField: "contact_details.email_id",
            //             as: "docs"
            //         }
            // },
            // { $unwind: "$docs" },
            // {
            //     $project: {
            //         _id: 0,
            //         email_id: 1,
            //         year: { $year: "$login_time" },
            //         month: { $month: "$login_time" },
            //         logintime: "$login_time"
            //     }
            // },
            // {
            //     $group: {
            //         "_id": {
            //             username: "$email_id",
            //             year: "$year",
            //             month: "$month",
            //             logintime: "$logintime"
            //         },
            //         "count": { "$sum": 1 }
            //     }
            // },
            // {
            //     $project: {
            //         _id: 0,
            //         username: "$_id.username",
            //         year: "$_id.year",
            //         count: "$count",
            //         month: "$_id.month",
            //         logintime: "$_id.logintime"

            //     }
            // }
       
    // }

