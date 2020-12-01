var http = require("http");
//var logchk=require("./log.js")
var fs = require("fs")
var CaptureLog = require("./log.js");
capturelog = new CaptureLog();


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

        //Getting User details.. 
        var jsonObj = strBody;
        var PropertyID = jsonObj.PropertyID;
        var PropertyType = jsonObj.PropertyType;
        var Location = jsonObj.Location;
        var ProjectSiteName = jsonObj.ProjectSiteName;
        var Landmark = jsonObj.Landmark;
        var AddArea = jsonObj.AddArea;
        var City = jsonObj.City;
        var streetname = jsonObj.StreetName;
        var State = jsonObj.State;
        var Country = jsonObj.Country;
        var Pincode = jsonObj.Pincode;
        var LandExtent = jsonObj.LandExtent;
        var unit = jsonObj.Unit;
        var DoorNumber = jsonObj.DoorNumber;
        var SurroundedBy = jsonObj.SurroundedBy;
        var RoadWidth = jsonObj.RoadWidth;
        var FootageDetails = jsonObj.FootageDetails;
        var FootageReason = jsonObj.FootageReason;
        //var ValuationPurpose = jsonObj.ValuationPurpose;
        var pid = parseInt(PropertyID);
        var CurrentDate = new Date();
        var UserID = jsonObj.UserID;
        var latlong = JSON.parse(jsonObj.latlng);
        var GPSCoordinates = "";
        if (jsonObj.GPSValues == "true") {
            GPSCoordinates = JSON.parse(jsonObj.GPSCordinates);
        }




        console.log("Connected to Database");
        var db = req.db;
        var collection = db.get('Property');
        collection.find({
            PropertyID: pid
        }, function(err, docs) {
            console.log(docs);

            //updating the property collection when aprraiser edit the information
            var Data;
            if (GPSCoordinates == "") {
                Data = {
                    "PropertyType": PropertyType,
                    "Location": Location,
                    "ProjectSiteName": ProjectSiteName,
                    "Address": {
                        "StreetName": streetname,
                        "Landmark": Landmark,
                        "DoorNumber": DoorNumber,
                        "AddArea": AddArea,
                        "City": City,
                        "State": State,
                        "Country": Country,
                        "Pincode": Pincode,
                        "latlng": latlong
                    },
                //    "ValuationPurpose": ValuationPurpose,
                    "LocationModifiedDate": CurrentDate,
                    "LocationStatus": "Completed",
                    "ModifiedDate": CurrentDate,
                    "ModifiedBy": UserID
                }

            } else {
                Data = {
                    "PropertyType": PropertyType,
                    "Location": Location,
                    "ProjectSiteName": ProjectSiteName,
                    "Address": {
                        "StreetName": streetname,
                        "Landmark": Landmark,
                        "DoorNumber": DoorNumber,
                        "AddArea": AddArea,
                        "City": City,
                        "State": State,
                        "Country": Country,
                        "Pincode": Pincode,
                        "latlng": latlong                        
                    },
					"GPSCoordinates": GPSCoordinates,
                  //  "ValuationPurpose": ValuationPurpose,
                    "LocationModifiedDate": CurrentDate,
                    "LocationStatus": "Completed",
                    "ModifiedDate": CurrentDate,
                    "ModifiedBy": UserID
                }
            }
            collection.update({
                PropertyID: pid
            }, {$set : Data},function(err) {
                if (err) {
                    res.send("0");
                    console.log(err);
                    //capturelog.fnuserlog("\r\n\r\n Update Location details -- Property Data Updation Failed -- PropertyID : "+PropertyID+", UserID : "+UserID+", Date :"+CurrentDate+", Error Occurred : "+err)
                } else {
                    res.send("1");
                    //capturelog.fnuserlog("\r\n\r\n Update Location details -- Property Updated Successfully --PropertyID : "+PropertyID+", UserID : "+UserID+", LocationModifiedDate :"+CurrentDate)
                }
            });

        });
        //});
    } catch (ex) {
        console.dir(ex);
    }
});
module.exports = router;