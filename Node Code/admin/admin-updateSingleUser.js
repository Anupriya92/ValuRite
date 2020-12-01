/* Update the user details (Single user) */
var express = require('express');
var router = express.Router();
router.post('/', function (req, res, next) {
    //DB Connection and its parameters
   
    var jsonObj = req.body;
    console.log(jsonObj)
    var email_id = jsonObj.EmailID[0]["text"];
    var FirstName = jsonObj.FName;
    var LastName = jsonObj.LName;
    var Compname = jsonObj.CompanyName;
    var userType = jsonObj.userType;
    var MobileNo = jsonObj.MobileNo;
    var Address1 = jsonObj.Address1;
    var Address2 = jsonObj.Address2;
    var Country = jsonObj.Country;
    var City = jsonObj.City;
    var State = jsonObj.State;
    var Area = jsonObj.Area;
    var Landmark = jsonObj.Landmark;
    var Pincode = jsonObj.Pincode;
    var contracRef = jsonObj.contracRef;
    var userRole = jsonObj.userRole;
    var alertGeneral = JSON.parse(jsonObj.generalalert);
    var startDate = new Date(jsonObj.stDate);
    var endDate = new Date(jsonObj.edDate);
    var status = jsonObj.user_Status;
    var Association = jsonObj.AssociationName;
    // var updatedby = jsonObj.last_updated_by;
    var deletedate = status == 'InActive' ? new Date() : '';
    var db = req.admin_db;
    var collection = db.collection('User');
    try {
        //DB Query
        collection.update({ "ContactDetails.EmailID": email_id },
            {
                $set:
                    {
                        "FirstName": FirstName,
                        "LastName": LastName,
                        "UserID": email_id,
                        "UserRole": userRole,
                        "UserType": userType,
                        "CompanyName": Compname,
                        "ContactDetails": {
                            "MobileNo": MobileNo,
                            "EmailID": email_id
                        },
                        "Address" : {
                            "AddressLine1" : Address1,
                            "AddressLine2" : Address2,
                            "AddArea" : Area,
                            "City" : City,
                            "State" : State,
                            "Country" : Country,
                            "Pincode" : Pincode,
                            "Landmark" : Landmark
                        },
                        "Contract": {
                            "ContractReference": contracRef,
                            "StartDate": startDate,
                            "EndDate": endDate,
                        },
                        "general_alert_flag": alertGeneral,
                        "UserStatus": status,
                        "LastUpDate": new Date(),
                        "userDeleted_Date": deletedate,
                        "AssociationDetails" : Association,
                        "UserName" : FirstName+" "+LastName
                    }
            },
            function (err, docs) {
                res.send(docs)
                res.end();
            })
    }
    catch (ex) {
        console.dir(ex);
    }
});

module.exports = router;

