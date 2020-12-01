var http = require("http");
var express = require('express');
var router = express.Router();
router.post('/', function(req, res, next) {
    try {
        var strBody = req.body;
        /*req.on("data", function(chunk) {
            strBody += chunk;
        });*/
        //req.on("end", function() {
			
            console.log("Received posted data: " + strBody);

            //Getting Param details.. 
            var jsonObj = strBody;

            var UserID = jsonObj.UserID;
            var UserRole = jsonObj.UserRole;
            var UserType = jsonObj.UserType;
            var UserName = jsonObj.UserName;
            var PhoneNo = jsonObj.PhoneNo;
            var MobileNo = jsonObj.MobileNo;
            var EmailId = jsonObj.EmailID;
            var addrline1 = jsonObj.AddressLine1;
            var addrline2 = jsonObj.AddressLine2;
            var addarea = jsonObj.AddArea;
            var city = jsonObj.City;
            var state = jsonObj.State;
            var county = jsonObj.Country;
            var pincode = jsonObj.Pincode;
            var landmark = jsonObj.Landmark;
            var UserStatus = jsonObj.UserStatus;

            console.log(jsonObj);
            var db = req.db;
            var collection = db.get('User');
            collection.find({
                "UserID": UserID
            },function(err, docs) {
                console.log("docs");

                //docs.forEach(function (doc) {
                if (docs.UserID == UserID) {
                    console.log('true');
                    //res.write("2");
                    res.send('2');
                } else {
                    console.log('false');
                    collection.update({
                        "UserID": UserID
                    }, {
                        $set: {
                            "UserID": UserID,
                            "UserRole": UserRole,
                            "UserType": UserType,
                            "UserName": UserName,
                            "ContactDetails": {
                                "PhoneNo": PhoneNo,
                                "MobileNo": MobileNo,
                                "EmailID": EmailId,
                            },
                            "Address": {
                                "AddressLine1": addrline1,
                                "AddressLine2": addrline2,
                                "AddArea": addarea,
                                "City": city,
                                "State": state,
                                "Country": county,
                                "Pincode": pincode,
                                "Landmark": landmark
                            },
                            "UserStatus": UserStatus
                        }
                    }, {
                        upsert: true
                    });
                    console.log("Data written");
                    //res.write("1");
                    res.send('1');
                }
                //});
            });
        //});
    } catch (ex) {
        console.dir(ex);
    }
});
module.exports = router;