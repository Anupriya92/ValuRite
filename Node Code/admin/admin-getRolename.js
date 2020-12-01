/* Fetch the Rolename from userroles collection */
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) 
{
    //DB Connection and its query
    const db = req.admin_db;
    const collection =db.collection('userroles');
    collection.find({rolename:{$ne:null}},{rolename:1,"_id":0})
    .then((docs) => {
        res.json(docs);
    }).catch((err) => {
        console.log("Error in retriving from DB "+ err);
    })
 });
module.exports = router;