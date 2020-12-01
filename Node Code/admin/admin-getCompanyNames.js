/* Fetch the valid contract companyname for binding the Company dropdown in (Single,Bulk User Creation, UserApproval Screens) */
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    //DB Connection
    const db = req.admin_db;
    const coll = db.collection('Company');
    console.log("dsaf")
    try {
        //DB Query
        coll.aggregate([{ $match: { "CompanyName": { $ne: null } } },
        {
            $lookup: {
                from: "Contracts",
                localField: "Contract.Contract_reference",
                foreignField: "contract_reference",
                as: "docs"
            }
        },
        {
            "$unwind": "$docs"
        },
        {
            "$project": {
                temp: {
                    "company_name": {
                        $cond:
                            [
                                { $gte: ["$docs.valid_to_date", new Date()] },
                                "$CompanyName",
                                null
                            ]
                    }
                },
                "contract_reference": "$docs.contract_reference",
                "valid_to_date": "$docs.valid_to_date",
                _id: 0
            }
        },
        {
            "$group": {
                _id: "$temp.company_name",
                contract_reference: { $addToSet: "$contract_reference" },
                valid_to_date: { $addToSet: "$valid_to_date" },
            }
        }],
            function (err, docs) {
                if (err) {
                    console.log(err);
                } else {
                    var arr = [];
                    const result = [...docs.filter(res => res['_id'] !== null)];
                    for (const res of result) {
                        arr.push({ 'companyname': res['_id'] });
                    }
                    res.send(arr);
                }
            });
    }
    catch (ex) {
        console.dir(ex);
    }
});
module.exports = router;    