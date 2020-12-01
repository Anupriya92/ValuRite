// To fetch the Company Name from DB
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) 
{
    //DB connection
    const db = req.admin_db;
    const coll =db.collection('Company');
    // Query to get all the companyname from company collection 
    var query = [{$match:{CompanyName:{$ne:null}}},{$project:{CompanyName:1,"_id":0}},{$sort:{CompanyName:1}}];
    coll.aggregate(query)
    .then((docs) => {
        console.log('company dropdown data retrieved');
        res.json(docs);
    }).catch((err) => {
        console.log("Error companyname"+ err);
    })
});
module.exports = router;