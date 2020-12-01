/* Fetch the userlogs for the users for the current year */
const express = require('express');
const getMonthStatsForAnYear = express.Router();
getMonthStatsForAnYear.get('/', function (req, res, next) {
    //DB connection
    const db = req.db;
    const coll = db.collection('Appraisal');
    if (!db || !db.collection) {
        console.log("db object was not found");
        res.json({});
        return;
    }
    const year = parseInt(req.query.year, 10);
    const currentYearString = year.toString();
    const nextYearString = (year + 1).toString();
    // DB Query here
    /* The data will be fetched from 'userlogs' collection for current year */
    coll.aggregate([
        {
            $match: {
                $and: [
                    { "ModifiedDate": { "$lt": new Date(nextYearString) } },
                    { "ModifiedDate": { "$gte": new Date(currentYearString) } }
                ]
            }
        },
        {
            $project: {
                _id: 0,
                month: { $month: "$ModifiedDate" },
                year: { $year: "$ModifiedDate" },
                ValuationID : "$ValuationID"
            }
        },
        {
            $group: {
                "_id": {
                    month: "$month",
                    year: "$year"
                },
                // "count": { "$sum": 1 }
                "count" : {$addToSet : "$ValuationID"}
            }
        },
        { $sort: { "_id.month": 1 } },
        {
            $project: {
                _id: 0,
                month: "$_id.month",
                year: "$_id.year",
                count: {$size : "$count"},
                _id: 0
            }
        }
    ]).then((docs) => {
        res.json(docs);
        console.log(docs)
    }).catch((err) => {
        console.log("Error in retriving monthly statistics for an year from DB " + err);
    })
});

module.exports = getMonthStatsForAnYear;
