var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    try {
        var strBody = req.body;
        var jsonObj = strBody;
        var EmailID = jsonObj.userID.toLowerCase();
        var param = jsonObj.param;
        var session_id = jsonObj.session_id;
        // DB connection
        const db = req.admin_db;
        var collection = db.collection('Userlogs');
        var usercollection = db.collection('User');
        //*******************************Retrieves set of docs matching the find Criteria**********************************//
        var match = {};
        if (param == "killsession") {
            match = { 'email_id': EmailID, 'logout_time': { $eq: null } }
        } else {
            match = { 'email_id': EmailID, 'session_id': session_id, 'logout_time': { $eq: null } }
        }
        collection.find(match, function (err, docs) {
            if (docs == "") {
                var obj = { status: 'InValid' }
                var arr = JSON.stringify(obj);
                res.send(arr);
                res.end();
            }
            else {
                try {
                    let nowtime = new Date();
                    if (param == "logout") {
                        collection.update({ 'email_id': EmailID, 'session_id': session_id, 'logout_time': { $eq: null } },
                            {
                                $set: {
                                    'logout_time': nowtime
                                }
                            }, { multi: true });
                        var obj = { status: 'Valid' }
                        var arr = JSON.stringify(obj);
                        res.send(arr);
                        res.end();
                    } else if (param == "sessionupdate") {
                        collection.update({ 'email_id': EmailID, 'session_id': session_id, 'logout_time': { $eq: null } },
                            {
                                $set: {
                                    'session_update_time': nowtime
                                }
                            });
                        var obj = { status: 'Valid' }
                        var arr = JSON.stringify(obj);
                        res.send(arr);
                        res.end();
                    }
                    else if (param == "killsession") {
                        collection.update({ 'email_id': EmailID, 'logout_time': { $eq: null } },
                            {
                                $set: {
                                    'logout_time': docs[0].session_update_time
                                }
                            }, { multi: true });
                        var obj = { status: 'Valid' }
                        var arr = JSON.stringify(obj);
                        res.send(arr);
                        res.end();
                    }
                }
                catch (ex) {
                    res.end();
                }
            }
        });
    }
    catch (ex) {
    }
});
module.exports = router;