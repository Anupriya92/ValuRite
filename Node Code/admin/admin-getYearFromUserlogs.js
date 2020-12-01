// Query to fetch the year from userlogs based on the user login time
const express = require('express');
const getYearFromUserlogs = express.Router();
getYearFromUserlogs.get('/', function (req, res, next) {
      //DB Connection and its query
    const db = req.db;
    const coll = db.collection('Appraisal');

    if (!db || !db.collection) {
        res.json({});
        return;
    }

    coll.aggregate([
        {
            $project:
                {
                    _id: 0,
                    year: { $year: "$ModifiedDate"}
                }
        },
        {
            $group: {
                "_id": {
                    "year": "$year"
                }
            }            
        },
        {
            $project:
                {
                    _id: 0,
                    year: "$_id.year"
                }
        }, { $sort : { year: -1 } }
    ]).then((docs) => {
        res.json(docs);
        console.log(docs)
    }).catch((err) => {
        console.log('Error in retriving Years' + err);
    })
});

module.exports = getYearFromUserlogs; 
