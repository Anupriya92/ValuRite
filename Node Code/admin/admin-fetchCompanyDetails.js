/* Fetch the Company details from 'company' & 'contracts' collection */
var express = require('express');
var Router = express.Router();
Router.get('/', function (req, res, next) {
    //DB connection and its parameters
    var strBody = req.body;
    var companyname = req.query.companyname;
    var db = req.admin_db;
    var collection = db.collection('Company');
    if (!db || !db.collection) {
        console.log("collection not found");
        res.json({});
        return;
    }
    try {
        //DB Query
        collection.aggregate([{ $match: { "CompanyName": req.query.companyname } },
        {
            $lookup:
                {
                    from: "Contracts",
                    localField: "Contract.Contract_reference",
                    foreignField: "contract_reference",
                    as: "docs2"
                }
        }]).then((docs) => {
            res.json(docs);
        }).catch((err) => {
            console.log("Error in retriving from DB" + err);
        }).then(() => db.close())
    }
    catch (ex) { }
});
module.exports = Router;