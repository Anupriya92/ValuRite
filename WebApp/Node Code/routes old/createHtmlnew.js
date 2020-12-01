var http = require("http");
var express = require('express');
var express = require('mongodb');
var moment = require('moment');
var fs = require('fs');
var url1 = require('url');
var numberToText = require('number2text');
var request = require('request');
var exec = require('child_process').execFile;
//var fileurl = url1.parse('http://localhost/Data/businesscard.html');
var fileName; //= 'C:/Data/businesscard.html';
//console.log(fileName);

//variable declarations
var d = new Date();
var datetime = moment().format('DD-MM-YYYY');

var express = require('express');
var router = express.Router();
router.post('/', function(req, res, next) {
    try {
        var imagearr = [];
        var jsonobjPDF = {};
        var imagejsobj = {}

        var strBody = req.body;
        console.log("Received posted data: " + strBody);

        //Getting UserType details.. 
        var jsonObj = strBody;
        var ValuationID = jsonObj.ValuationID;
        var PropertyID = jsonObj.PropertyID;
        var intpropid = parseInt(PropertyID);
        var BorrowerID = jsonObj.BorrowerID;
        var UserID = jsonObj.AppraiserID;

        console.log(jsonObj.TemplateName + " Template Name");
        var Templatename = "Template3";
        console.log("UserID 	" + UserID);
        console.log(" BorrowerID    " + BorrowerID);
        console.log("PropertyID : " + PropertyID + " : " + intpropid)


        console.log("Connected to Database");
        var db = req.db;
        var coll = db.get('User');
        console.log("Connecting to User Table To Get User info");
        coll.find({
            'UserID': BorrowerID
        }, function(err, result) {
            if (err) {
                console.log(err);
            } else if (result.length) {
                result.forEach(function(BorrowerTable) {
                    var db1 = req.db;
                    var colprop = db1.get('Property');
                    colprop.find({
                        'PropertyID': intpropid
                    }, function(err, result1) {
                        console.log("Accessing Property Details")
                        if (result1.length) {
                            result1.forEach(function(PropertyTable) {
                                var db2 = req.db;
                                var colApp = db2.get('Appraisal');
                                colApp.find({
                                    'ValuationID': ValuationID,
                                    'ValuationStatus': 'true'
                                }, function(err, result2) {
                                    if (result2.length) {
                                        console.log("Accessing Valuation Details")
                                        result2.forEach(function(ValuationTable) {
                                            var db4 = req.db;
                                            var collender = db4.get('User');
                                            console.log("Lender Name Checking " + ValuationTable.ManagedBy)
                                            collender.find({
                                                'UserID': ValuationTable.ManagedBy
                                            }, function(Lenerr, result4) {
                                                if (Lenerr) {
                                                    console.log(Lenerr + "Error readin lender details");

                                                } else if (result4.length) {
                                                    result4.forEach(function(LenTable) {
                                                        console.log(LenTable.UserName + "Name of the Lender")
                                                        var db3 = req.db;
                                                        var coluser = db3.get('User');
                                                        coluser.find({
                                                            'UserID': UserID
                                                        }, function(err, result3) {
                                                            if (result3.length) {
                                                                result3.forEach(function(AppraiserTable) {
                                                                    jsonobjPDF['AppraiserMobile'] = AppraiserTable.ContactDetails.MobileNo;
                                                                    jsonobjPDF['AppraiserEmail'] = AppraiserTable.ContactDetails.EmailID;
                                                                    jsonobjPDF['LenderName'] = LenTable.UserName;
                                                                    jsonobjPDF['PropertyID'] = intpropid;
                                                                    jsonobjPDF['UserID'] = BorrowerTable.UserID;
                                                                    jsonobjPDF['BorrName'] = BorrowerTable.UserName;
                                                                    jsonobjPDF['BorrType'] = BorrowerTable.UserType;
                                                                    jsonobjPDF['BorrRole'] = BorrowerTable.UserRole;


                                                                    var undchhhk;
                                                                    if (LenTable.TemplateName != "" && LenTable.TemplateName != null && LenTable.TemplateName != undchhhk) {
                                                                        Templatename = LenTable.TemplateName;
                                                                    }


                                                                    if (BorrowerTable.ContactDetails.PhoneNo != "" && BorrowerTable.ContactDetails.PhoneNo != null && BorrowerTable.ContactDetails.PhoneNo != undchhhk) {
                                                                        jsonobjPDF['BorrPhoneNumber'] = BorrowerTable.ContactDetails.PhoneNo;
                                                                    } else {
                                                                        jsonobjPDF['BorrPhoneNumber'] = "N/A";
                                                                    }

                                                                    jsonobjPDF['BorrMobileNumber'] = BorrowerTable.ContactDetails.MobileNo;
                                                                    jsonobjPDF['BorrEmailID'] = BorrowerTable.ContactDetails.EmailID;

                                                                    if (BorrowerTable.Address.AddressLine1 != "" && BorrowerTable.Address.AddressLine1 != null && BorrowerTable.Address.AddressLine1 != undchhhk) {
                                                                        jsonobjPDF['BorrAddressLine1'] = BorrowerTable.Address.AddressLine1;
                                                                    } else {
                                                                        jsonobjPDF['BorrAddressLine1'] = "N/A";
                                                                    }

                                                                    if (BorrowerTable.Address.AddressLine2 != "" && BorrowerTable.Address.AddressLine2 != null && BorrowerTable.Address.AddressLine2 != undchhhk) {
                                                                        jsonobjPDF['BorrAddressLine2'] = BorrowerTable.Address.AddressLine2;
                                                                    } else {
                                                                        jsonobjPDF['BorrAddressLine2'] = "N/A";
                                                                    }

                                                                    if (BorrowerTable.Address.Landmark != "" && BorrowerTable.Address.Landmark != null && BorrowerTable.Address.Landmark != undchhhk) {
                                                                        jsonobjPDF['BorrLandMark'] = BorrowerTable.Address.Landmark;
                                                                    } else {
                                                                        jsonobjPDF['BorrLandMark'] = "N/A";
                                                                    }

                                                                    if (BorrowerTable.Address.AddArea != "" && BorrowerTable.Address.AddArea != null && BorrowerTable.Address.AddArea != undchhhk) {
                                                                        jsonobjPDF['BorrArea'] = BorrowerTable.Address.AddArea;
                                                                    } else {
                                                                        jsonobjPDF['BorrArea'] = "N/A";
                                                                    }

                                                                    if (BorrowerTable.Address.City != "" && BorrowerTable.Address.City != null && BorrowerTable.Address.City != undchhhk) {
                                                                        jsonobjPDF['BorrCity'] = BorrowerTable.Address.City;
                                                                    } else {
                                                                        jsonobjPDF['BorrCity'] = "N/A";
                                                                    }

                                                                    if (BorrowerTable.Address.State != "" && BorrowerTable.Address.State != null && BorrowerTable.Address.State != undchhhk) {
                                                                        jsonobjPDF['BorrState'] = BorrowerTable.Address.State;
                                                                    } else {
                                                                        jsonobjPDF['BorrState'] = "N/A";
                                                                    }

                                                                    if (BorrowerTable.Address.Country != "" && BorrowerTable.Address.Country != null && BorrowerTable.Address.Country != undchhhk) {
                                                                        jsonobjPDF['BorrCountry'] = BorrowerTable.Address.Country;
                                                                    } else {
                                                                        jsonobjPDF['BorrCountry'] = "N/A";
                                                                    }

                                                                    if (BorrowerTable.Address.Pincode != "" && BorrowerTable.Address.Pincode != null && BorrowerTable.Address.Pincode != undchhhk) {
                                                                        jsonobjPDF['BorrPincode'] = BorrowerTable.Address.Pincode;
                                                                    } else {
                                                                        jsonobjPDF['BorrPincode'] = "N/A";
                                                                    }

                                                                    if (PropertyTable.PropertyType != "" && PropertyTable.PropertyType != null && PropertyTable.PropertyType != undchhhk) {
                                                                        jsonobjPDF['PropertyType'] = PropertyTable.PropertyType;
                                                                    } else {
                                                                        jsonobjPDF['PropertyType'] = "N/A";
                                                                    }
                                                                    if (PropertyTable.PropertyType == "Land" || PropertyTable.PropertyType == "Building") {

                                                                        Templatename = "Template3";
                                                                    }

                                                                    if (PropertyTable.Location != "" && PropertyTable.Location != null && PropertyTable.Location != undchhhk) {
                                                                        jsonobjPDF['Location'] = PropertyTable.Location;
                                                                    } else {
                                                                        jsonobjPDF['Location'] = "N/A";
                                                                    }

                                                                    if (PropertyTable.ProjectSiteName != "" && PropertyTable.ProjectSiteName != null && PropertyTable.ProjectSiteName != undchhhk) {
                                                                        jsonobjPDF['ProjectSiteName'] = PropertyTable.ProjectSiteName;
                                                                    } else {
                                                                        jsonobjPDF['ProjectSiteName'] = "N/A";
                                                                    }

                                                                    if (PropertyTable.Address.DoorNumber != "" && PropertyTable.Address.DoorNumber != null && PropertyTable.Address.DoorNumber != undchhhk) {
                                                                        jsonobjPDF['pDoorNum'] = PropertyTable.Address.DoorNumber;
                                                                    } else {
                                                                        jsonobjPDF['pDoorNum'] = "N/A";
                                                                    }

                                                                    if (PropertyTable.Address.StreetName != "" && PropertyTable.Address.StreetName != null && PropertyTable.Address.StreetName != undchhhk) {
                                                                        jsonobjPDF['pStreetName'] = PropertyTable.Address.StreetName;
                                                                    } else {
                                                                        jsonobjPDF['pStreetName'] = "N/A";
                                                                    }

                                                                    if (PropertyTable.Address.Landmark != "" && PropertyTable.Address.Landmark != null && PropertyTable.Address.Landmark != undchhhk) {
                                                                        jsonobjPDF['pLandMark'] = PropertyTable.Address.Landmark;
                                                                    } else {
                                                                        jsonobjPDF['pLandMark'] = "N/A";
                                                                    }

                                                                    if (PropertyTable.Address.AddArea != "" && PropertyTable.Address.AddArea != null && PropertyTable.Address.AddArea != undchhhk) {
                                                                        jsonobjPDF['pArea'] = PropertyTable.Address.AddArea;
                                                                    } else {
                                                                        jsonobjPDF['pArea'] = "N/A";
                                                                    }

                                                                    if (PropertyTable.Address.City != "" && PropertyTable.Address.City != null && PropertyTable.Address.City != undchhhk) {
                                                                        jsonobjPDF['pCity'] = PropertyTable.Address.City;
                                                                    } else {
                                                                        jsonobjPDF['pCity'] = "N/A";
                                                                    }

                                                                    if (PropertyTable.Address.State != "" && PropertyTable.Address.State != null && PropertyTable.Address.State != undchhhk) {
                                                                        jsonobjPDF['pState'] = PropertyTable.Address.State;
                                                                    } else {
                                                                        jsonobjPDF['pState'] = "N/A";
                                                                    }

                                                                    if (PropertyTable.Address.Country != "" && PropertyTable.Address.Country != null && PropertyTable.Address.Country != undchhhk) {
                                                                        jsonobjPDF['pCountry'] = PropertyTable.Address.Country;
                                                                    } else {
                                                                        jsonobjPDF['pCountry'] = "N/A";
                                                                    }

                                                                    if (PropertyTable.Address.Pincode != "" && PropertyTable.Address.Pincode != null && PropertyTable.Address.Pincode != undchhhk) {
                                                                        jsonobjPDF['pPincode'] = PropertyTable.Address.Pincode;
                                                                    } else {
                                                                        jsonobjPDF['pPincode'] = "N/A";
                                                                    }

                                                                    if (PropertyTable.ValuationPurpose != "" && PropertyTable.ValuationPurpose != null && PropertyTable.ValuationPurpose != undchhhk) {
                                                                        jsonobjPDF['pValuationPurpose'] = PropertyTable.ValuationPurpose;
                                                                    } else {
                                                                        jsonobjPDF['pValuationPurpose'] = "N/A";
                                                                    }

                                                                    if (PropertyTable.ValuationPurpose != "" && PropertyTable.ValuationPurpose != null && PropertyTable.ValuationPurpose != undchhhk) {
                                                                        jsonobjPDF['pValuationPurpose'] = PropertyTable.ValuationPurpose;
                                                                    } else {
                                                                        jsonobjPDF['pValuationPurpose'] = "N/A";
                                                                    }

                                                                    //Assign Appraisal Values
                                                                    jsonobjPDF['AssignDate'] = ValuationTable.AssignDate;
                                                                    jsonobjPDF['ModifiedBy'] = ValuationTable.ModifiedBy;
                                                                    jsonobjPDF['ModifiedDate'] = ValuationTable.ModifiedDate;
                                                                    jsonobjPDF['AppraisalStatus'] = ValuationTable.AppraisalStatus;

                                                                    if (ValuationTable.ApprovalDetails.ApprovedStatus != "" && ValuationTable.ApprovalDetails.ApprovedStatus != null && ValuationTable.ApprovalDetails.ApprovedStatus != undchhhk) {
                                                                        jsonobjPDF['ApprovedStatus'] = ValuationTable.ApprovalDetails.ApprovedStatus;
                                                                    } else {
                                                                        jsonobjPDF['ApprovedStatus'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.ApprovalDetails.GovtAuthorityID != "" && ValuationTable.ApprovalDetails.GovtAuthorityID != null && ValuationTable.ApprovalDetails.GovtAuthorityID != undchhhk) {
                                                                        jsonobjPDF['GovernmentAuthorityID'] = ValuationTable.ApprovalDetails.GovtAuthorityID;
                                                                    } else {
                                                                        jsonobjPDF['GovernmentAuthorityID'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.ApprovalDetails.ApprovalNoandDate != "" && ValuationTable.ApprovalDetails.ApprovalNoandDate != null && ValuationTable.ApprovalDetails.ApprovalNoandDate != undchhhk) {
                                                                        jsonobjPDF['ApprovalNumberAndDate'] = ValuationTable.ApprovalDetails.ApprovalNoandDate;
                                                                    } else {
                                                                        jsonobjPDF['ApprovalNumberAndDate'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.ApprovalDetails.NonApprovalReason != "" && ValuationTable.ApprovalDetails.NonApprovalReason != null && ValuationTable.ApprovalDetails.NonApprovalReason != undchhhk) {
                                                                        jsonobjPDF['NonApprovalReason'] = ValuationTable.ApprovalDetails.NonApprovalReason;
                                                                    } else {
                                                                        jsonobjPDF['NonApprovalReason'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.RegnDetails.RegnStatus != "" && ValuationTable.RegnDetails.RegnStatus != null && ValuationTable.RegnDetails.RegnStatus != undchhhk) {
                                                                        jsonobjPDF['RegistrationStatus'] = ValuationTable.RegnDetails.RegnStatus;
                                                                    } else {
                                                                        jsonobjPDF['RegistrationStatus'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.RegnDetails.RegnDate != "" && ValuationTable.RegnDetails.RegnDate != null && ValuationTable.RegnDetails.RegnDate != undchhhk) {
                                                                        jsonobjPDF['RegistrationDate'] = ValuationTable.RegnDetails.RegnDate;
                                                                    } else {
                                                                        jsonobjPDF['RegistrationDate'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.RegnDetails.SroLocation != "" && ValuationTable.RegnDetails.SroLocation != null && ValuationTable.RegnDetails.SroLocation != undchhhk) {
                                                                        jsonobjPDF['SROLocation'] = ValuationTable.RegnDetails.SroLocation;
                                                                    } else {
                                                                        jsonobjPDF['SROLocation'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.RegnDetails.RegnValue != "" && ValuationTable.RegnDetails.RegnValue != null && ValuationTable.RegnDetails.RegnValue != undchhhk) {
                                                                        jsonobjPDF['RegistrationValue'] = ValuationTable.RegnDetails.RegnValue;
                                                                    } else {
                                                                        jsonobjPDF['RegistrationValue'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.RegnDetails.RegnName != "" && ValuationTable.RegnDetails.RegnName != null && ValuationTable.RegnDetails.RegnName != undchhhk) {
                                                                        jsonobjPDF['RegisteredName'] = ValuationTable.RegnDetails.RegnName;
                                                                    } else {
                                                                        jsonobjPDF['RegisteredName'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.RegnDetails.Zone != "" && ValuationTable.RegnDetails.Zone != null && ValuationTable.RegnDetails.Zone != undchhhk) {
                                                                        jsonobjPDF['Zone'] = ValuationTable.RegnDetails.Zone;
                                                                    } else {
                                                                        jsonobjPDF['Zone'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.RegnDetails.Village != "" && ValuationTable.RegnDetails.Village != null && ValuationTable.RegnDetails.Village != undchhhk) {
                                                                        jsonobjPDF['Village'] = ValuationTable.RegnDetails.Village;
                                                                    } else {
                                                                        jsonobjPDF['Village'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.PricingPropertyDetails.YearConstructed != "" && ValuationTable.PricingPropertyDetails.YearConstructed != null && ValuationTable.PricingPropertyDetails.YearConstructed != undchhhk) {
                                                                        jsonobjPDF['YearConstructed'] = ValuationTable.PricingPropertyDetails.YearConstructed;
                                                                    } else {
                                                                        jsonobjPDF['YearConstructed'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.PricingPropertyDetails.FloorSpaceIndex != "" && ValuationTable.PricingPropertyDetails.FloorSpaceIndex != null && ValuationTable.PricingPropertyDetails.FloorSpaceIndex != undchhhk) {
                                                                        jsonobjPDF['SpaceIndex'] = ValuationTable.PricingPropertyDetails.FloorSpaceIndex;
                                                                    } else {
                                                                        jsonobjPDF['SpaceIndex'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.ReleaseCertNo != "" && ValuationTable.ReleaseCertNo != null && ValuationTable.ReleaseCertNo != undchhhk) {
                                                                        jsonobjPDF['ReleaseCertificateNumber'] = ValuationTable.ReleaseCertNo;
                                                                    } else {
                                                                        jsonobjPDF['ReleaseCertificateNumber'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.MarkedforGovtProj != "" && ValuationTable.MarkedforGovtProj != null && ValuationTable.MarkedforGovtProj != undchhhk) {
                                                                        jsonobjPDF['MarkedforGovernmentProject'] = ValuationTable.MarkedforGovtProj;
                                                                    } else {
                                                                        jsonobjPDF['MarkedforGovernmentProject'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.DeRegulatedZoneProject != "" && ValuationTable.DeRegulatedZoneProject != null && ValuationTable.DeRegulatedZoneProject != undchhhk) {
                                                                        jsonobjPDF['DeRegulatedZoneProject'] = ValuationTable.DeRegulatedZoneProject;
                                                                    } else {
                                                                        jsonobjPDF['DeRegulatedZoneProject'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.PropertyTaxDetails != "" && ValuationTable.PropertyTaxDetails != null && ValuationTable.PropertyTaxDetails != undchhhk) {
                                                                        jsonobjPDF['PropertyTaxDetails'] = ValuationTable.PropertyTaxDetails;
                                                                    } else {
                                                                        jsonobjPDF['PropertyTaxDetails'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.PropertyTaxDetails != "" && ValuationTable.PropertyTaxDetails != null && ValuationTable.PropertyTaxDetails != undchhhk) {
                                                                        jsonobjPDF['PropertyTaxDetails'] = ValuationTable.PropertyTaxDetails;
                                                                    } else {
                                                                        jsonobjPDF['PropertyTaxDetails'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.PropertyStatus != "" && ValuationTable.PropertyStatus != null && ValuationTable.PropertyStatus != undchhhk) {
                                                                        jsonobjPDF['PropertyStatus'] = ValuationTable.PropertyStatus;
                                                                    } else {
                                                                        jsonobjPDF['PropertyStatus'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.RegnDetails.SurveyNumber != "" && ValuationTable.RegnDetails.SurveyNumber != null && ValuationTable.RegnDetails.SurveyNumber != undchhhk) {
                                                                        jsonobjPDF['SurveyNumber'] = ValuationTable.RegnDetails.SurveyNumber;
                                                                    } else {
                                                                        jsonobjPDF['SurveyNumber'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.RegnDetails.SurveyDate != "" && ValuationTable.RegnDetails.SurveyDate != null && ValuationTable.RegnDetails.SurveyDate != undchhhk) {
                                                                        jsonobjPDF['SurveyDate'] = ValuationTable.RegnDetails.SurveyDate;
                                                                    } else {
                                                                        jsonobjPDF['SurveyDate'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.RegnDetails.UndividedShare != "" && ValuationTable.RegnDetails.UndividedShare != null && ValuationTable.RegnDetails.UndividedShare != undchhhk) {
                                                                        jsonobjPDF['UndividedShare'] = ValuationTable.RegnDetails.UndividedShare;
                                                                    } else {
                                                                        jsonobjPDF['UndividedShare'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.SurveyDetails.LandMeasure != "" && ValuationTable.SurveyDetails.LandMeasure != null && ValuationTable.SurveyDetails.LandMeasure != undchhhk) {
                                                                        jsonobjPDF['LandMeasure'] = ValuationTable.SurveyDetails.LandMeasure;
                                                                    } else {
                                                                        jsonobjPDF['LandMeasure'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.SurveyDetails.MismatchReason != "" && ValuationTable.SurveyDetails.MismatchReason != null && ValuationTable.SurveyDetails.MismatchReason != undchhhk) {
                                                                        jsonobjPDF['MismatchReason'] = ValuationTable.SurveyDetails.MismatchReason;
                                                                    } else {
                                                                        jsonobjPDF['MismatchReason'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.BuildingDetails.TotalArea != "" && ValuationTable.BuildingDetails.TotalArea != null && ValuationTable.BuildingDetails.TotalArea != undchhhk) {
                                                                        jsonobjPDF['TotalArea'] = ValuationTable.BuildingDetails.TotalArea;
                                                                    } else {
                                                                        jsonobjPDF['TotalArea'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.BuildingDetails.CommonArea != "" && ValuationTable.BuildingDetails.CommonArea != null && ValuationTable.BuildingDetails.CommonArea != undchhhk) {
                                                                        jsonobjPDF['CommonArea'] = ValuationTable.BuildingDetails.CommonArea;
                                                                    } else {
                                                                        jsonobjPDF['CommonArea'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.BuildingDetails.PlinthArea != "" && ValuationTable.BuildingDetails.PlinthArea != null && ValuationTable.BuildingDetails.PlinthArea != undchhhk) {
                                                                        jsonobjPDF['PlinthArea'] = ValuationTable.BuildingDetails.PlinthArea;
                                                                    } else {
                                                                        jsonobjPDF['PlinthArea'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.BuildingDetails.CarpetArea != "" && ValuationTable.BuildingDetails.CarpetArea != null && ValuationTable.BuildingDetails.CarpetArea != undchhhk) {
                                                                        jsonobjPDF['CarpetArea'] = ValuationTable.BuildingDetails.CarpetArea;
                                                                    } else {
                                                                        jsonobjPDF['CarpetArea'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.PricingPropertyDetails.Age != "" && ValuationTable.PricingPropertyDetails.Age != null && ValuationTable.PricingPropertyDetails.Age != undchhhk) {
                                                                        jsonobjPDF['Age'] = ValuationTable.PricingPropertyDetails.Age;
                                                                    } else {
                                                                        jsonobjPDF['Age'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.PricingPropertyDetails.NoofFloors != "" && ValuationTable.PricingPropertyDetails.NoofFloors != null && ValuationTable.PricingPropertyDetails.NoofFloors != undchhhk) {
                                                                        jsonobjPDF['NumberofFloors'] = ValuationTable.PricingPropertyDetails.NoofFloors;
                                                                    } else {
                                                                        jsonobjPDF['NumberofFloors'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.PricingPropertyDetails.Footage != "" && ValuationTable.PricingPropertyDetails.Footage != null && ValuationTable.PricingPropertyDetails.Footage != undchhhk) {
                                                                        jsonobjPDF['Footage'] = ValuationTable.PricingPropertyDetails.Footage;
                                                                    } else {
                                                                        jsonobjPDF['Footage'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.PricingPropertyDetails.Livable.LivableStatus != "" && ValuationTable.PricingPropertyDetails.Livable.LivableStatus != null && ValuationTable.PricingPropertyDetails.Livable.LivableStatus != undchhhk) {
                                                                        jsonobjPDF['LivableStatus'] = ValuationTable.PricingPropertyDetails.Livable.LivableStatus;
                                                                    } else {
                                                                        jsonobjPDF['LivableStatus'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.PricingPropertyDetails.Livable.NonLivableReason != "" && ValuationTable.PricingPropertyDetails.Livable.NonLivableReason != null && ValuationTable.PricingPropertyDetails.Livable.NonLivableReason != undchhhk) {
                                                                        jsonobjPDF['NonLivableReason'] = ValuationTable.PricingPropertyDetails.Livable.NonLivableReason;
                                                                    } else {
                                                                        jsonobjPDF['NonLivableReason'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.PricingPropertyDetails.Rooms.NoofRooms != "" && ValuationTable.PricingPropertyDetails.Rooms.NoofRooms != null && ValuationTable.PricingPropertyDetails.Rooms.NoofRooms != undchhhk) {
                                                                        jsonobjPDF['NumberofRooms'] = ValuationTable.PricingPropertyDetails.Rooms.NoofRooms;
                                                                    } else {
                                                                        jsonobjPDF['NumberofRooms'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.PricingPropertyDetails.Rooms.RoomsFootage != "" && ValuationTable.PricingPropertyDetails.Rooms.RoomsFootage != null && ValuationTable.PricingPropertyDetails.Rooms.RoomsFootage != undchhhk) {
                                                                        jsonobjPDF['RoomsFootage'] = ValuationTable.PricingPropertyDetails.Rooms.RoomsFootage;
                                                                    } else {
                                                                        jsonobjPDF['RoomsFootage'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.LocationPropertyDetails.LandExtent != "" && ValuationTable.LocationPropertyDetails.LandExtent != null && ValuationTable.LocationPropertyDetails.LandExtent != undchhhk) {
                                                                        jsonobjPDF['LandExtent'] = ValuationTable.LocationPropertyDetails.LandExtent;
                                                                    } else {
                                                                        jsonobjPDF['LandExtent'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.LocationPropertyDetails.Unit != "" && ValuationTable.LocationPropertyDetails.Unit != null && ValuationTable.LocationPropertyDetails.Unit != undchhhk) {
                                                                        jsonobjPDF['unit'] = ValuationTable.LocationPropertyDetails.Unit;
                                                                    } else {
                                                                        jsonobjPDF['unit'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.LocationPropertyDetails.SurroundedBy != "" && ValuationTable.LocationPropertyDetails.SurroundedBy != null && ValuationTable.LocationPropertyDetails.SurroundedBy != undchhhk) {
                                                                        jsonobjPDF['SurroundedBy'] = ValuationTable.LocationPropertyDetails.SurroundedBy;
                                                                    } else {
                                                                        jsonobjPDF['SurroundedBy'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.LocationPropertyDetails.RoadWidth != "" && ValuationTable.LocationPropertyDetails.RoadWidth != null && ValuationTable.LocationPropertyDetails.RoadWidth != undchhhk) {
                                                                        jsonobjPDF['RoadWidth'] = ValuationTable.LocationPropertyDetails.RoadWidth;
                                                                    } else {
                                                                        jsonobjPDF['RoadWidth'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.LocationPropertyDetails.FootageDetails != "" && ValuationTable.LocationPropertyDetails.FootageDetails != null && ValuationTable.LocationPropertyDetails.FootageDetails != undchhhk) {
                                                                        jsonobjPDF['FootageDetails'] = ValuationTable.LocationPropertyDetails.FootageDetails;
                                                                    } else {
                                                                        jsonobjPDF['FootageDetails'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.LocationPropertyDetails.FootageReason != "" && ValuationTable.LocationPropertyDetails.FootageReason != null && ValuationTable.LocationPropertyDetails.FootageReason != undchhhk) {
                                                                        jsonobjPDF['FootageReason'] = ValuationTable.LocationPropertyDetails.FootageReason;
                                                                    } else {
                                                                        jsonobjPDF['FootageReason'] = "N/A";
                                                                    }

                                                                    //TotalValue=ValuationTable.Pricing.Totalvalue;

                                                                    PropertyType = PropertyTable.PropertyType;

                                                                    console.log(PropertyType)
                                                                    if (PropertyType == "Land") {
                                                                        jsonobjPDF['NumberofLifts'] = "NA";
                                                                        jsonobjPDF['NumberofCarPark'] = "NA";
                                                                        jsonobjPDF['NumberofCoveredCarPark'] = "NA";
                                                                        jsonobjPDF['ResidentWelfare'] = "NA";
                                                                        jsonobjPDF['FootageDetails'] = "NA";
                                                                        jsonobjPDF['FootageReason'] = "NA";
                                                                        jsonobjPDF['PropertyStatus'] = "NA"
                                                                        jsonobjPDF['LivableStatus'] = "NA";
                                                                        jsonobjPDF['NonLivableReason'] = "NA";
                                                                        jsonobjPDF['Age'] = "NA";
                                                                        jsonobjPDF['Footage'] = "NA";
                                                                        jsonobjPDF['NumberofFloors'] = "NA";
                                                                        jsonobjPDF['NumberofRooms'] = "NA";
                                                                        jsonobjPDF['RoomsFootage'] = "NA";
                                                                        jsonobjPDF['PlinthArea'] = "NA";
                                                                        jsonobjPDF['CommonArea'] = "NA";
                                                                        jsonobjPDF['CarpetArea'] = "NA";
                                                                        if (ValuationTable.Amenities.Utility.WelfareAssn != "" && ValuationTable.Amenities.Utility.WelfareAssn != null && ValuationTable.Amenities.Utility.WelfareAssn != undchhhk) {
                                                                            jsonobjPDF['ResidentWelfare'] = ValuationTable.Amenities.Utility.WelfareAssn;
                                                                        } else {
                                                                            jsonobjPDF['ResidentWelfare'] = "N/A";
                                                                        }
                                                                        if (ValuationTable.Amenities.Utility.UtilitySelect != "" && ValuationTable.Amenities.Utility.UtilitySelect != null && ValuationTable.Amenities.Utility.UtilitySelect != undchhhk) {
                                                                            OtherUtilities = ValuationTable.Amenities.Utility.UtilitySelect;
                                                                            jsonobjPDF['OtherUtilities'] = OtherUtilities.replace(/,/g, ", ");
                                                                        } else {
                                                                            jsonobjPDF['OtherUtilities'] = "N/A";
                                                                        }

                                                                        if (ValuationTable.Amenities.Fitness.UtilityFitness != "" && ValuationTable.Amenities.Fitness.UtilityFitness != null && ValuationTable.Amenities.Fitness.UtilityFitness != undchhhk) {
                                                                            console.log("after replace , with space" + OtherUtilities)
                                                                            AmenitiesFitness = ValuationTable.Amenities.Fitness.UtilityFitness;
                                                                            jsonobjPDF['AmenitiesFitness'] = AmenitiesFitness.replace(/,/g, ", ");
                                                                        } else {
                                                                            jsonobjPDF['AmenitiesFitness'] = "N/A";
                                                                        }

                                                                        if (ValuationTable.Amenities.Health.UtilityHealth != "" && ValuationTable.Amenities.Health.UtilityHealth != null && ValuationTable.Amenities.Health.UtilityHealth != undchhhk) {
                                                                            AmenitiesHealth = ValuationTable.Amenities.Health.UtilityHealth;
                                                                            console.log("before replace , with space" + AmenitiesHealth)
                                                                            jsonobjPDF['AmenitiesHealth'] = AmenitiesHealth.replace(/,/g, ", ");
                                                                        } else {
                                                                            jsonobjPDF['AmenitiesHealth'] = "N/A";
                                                                        }

                                                                        if (ValuationTable.Amenities.Health.Others != "" && ValuationTable.Amenities.Health.Others != null && ValuationTable.Amenities.Health.Others != undchhhk) {
                                                                            jsonobjPDF['Others'] = ValuationTable.Amenities.Health.Others;
                                                                        } else {
                                                                            jsonobjPDF['Others'] = "N/A";
                                                                        }

                                                                    } else if (PropertyType == "Building") {

                                                                        if (ValuationTable.Amenities.Utility.NoofLifts != "" && ValuationTable.Amenities.Utility.NoofLifts != null && ValuationTable.Amenities.Utility.NoofLifts != undchhhk) {
                                                                            jsonobjPDF['NumberofLifts'] = ValuationTable.Amenities.Utility.NoofLifts;
                                                                        } else {
                                                                            jsonobjPDF['NumberofLifts'] = "N/A";
                                                                        }

                                                                        if (ValuationTable.Amenities.Utility.NoofCarpark != "" && ValuationTable.Amenities.Utility.NoofCarpark != null && ValuationTable.Amenities.Utility.NoofCarpark != undchhhk) {
                                                                            jsonobjPDF['NumberofCarPark'] = ValuationTable.Amenities.Utility.NoofCarpark;
                                                                        } else {
                                                                            jsonobjPDF['NumberofCarPark'] = "N/A";
                                                                        }

                                                                        if (ValuationTable.Amenities.Utility.NoofCoveredCarpark != "" && ValuationTable.Amenities.Utility.NoofCoveredCarpark != null && ValuationTable.Amenities.Utility.NoofCoveredCarpark != undchhhk) {
                                                                            jsonobjPDF['NumberofCoveredCarPark'] = ValuationTable.Amenities.Utility.NoofCoveredCarpark;
                                                                        } else {
                                                                            jsonobjPDF['NumberofCoveredCarPark'] = "N/A";
                                                                        }

                                                                        if (ValuationTable.Amenities.Utility.WelfareAssn != "" && ValuationTable.Amenities.Utility.WelfareAssn != null && ValuationTable.Amenities.Utility.WelfareAssn != undchhhk) {
                                                                            jsonobjPDF['ResidentWelfare'] = ValuationTable.Amenities.Utility.WelfareAssn;
                                                                        } else {
                                                                            jsonobjPDF['ResidentWelfare'] = "N/A";
                                                                        }

                                                                        if (ValuationTable.Amenities.Utility.UtilitySelect != "" && ValuationTable.Amenities.Utility.UtilitySelect != null && ValuationTable.Amenities.Utility.UtilitySelect != undchhhk) {
                                                                            OtherUtilities = ValuationTable.Amenities.Utility.UtilitySelect;
                                                                            console.log("before replace , with space" + OtherUtilities)
                                                                            jsonobjPDF['OtherUtilities'] = OtherUtilities.replace(/,/g, ", ");
                                                                        } else {
                                                                            jsonobjPDF['OtherUtilities'] = "N/A";
                                                                        }

                                                                        if (ValuationTable.Amenities.Fitness.UtilityFitness != "" && ValuationTable.Amenities.Fitness.UtilityFitness != null && ValuationTable.Amenities.Fitness.UtilityFitness != undchhhk) {
                                                                            console.log("after replace , with space" + OtherUtilities)
                                                                            AmenitiesFitness = ValuationTable.Amenities.Fitness.UtilityFitness;
                                                                            jsonobjPDF['AmenitiesFitness'] = AmenitiesFitness.replace(/,/g, ", ");
                                                                        } else {
                                                                            jsonobjPDF['AmenitiesFitness'] = "N/A";
                                                                        }

                                                                        if (ValuationTable.Amenities.Health.UtilityHealth != "" && ValuationTable.Amenities.Health.UtilityHealth != null && ValuationTable.Amenities.Health.UtilityHealth != undchhhk) {
                                                                            AmenitiesHealth = ValuationTable.Amenities.Health.UtilityHealth;
                                                                            console.log("before replace , with space" + AmenitiesHealth)
                                                                            jsonobjPDF['AmenitiesHealth'] = AmenitiesHealth.replace(/,/g, ", ");
                                                                        } else {
                                                                            jsonobjPDF['AmenitiesHealth'] = "N/A";
                                                                        }


                                                                        if (ValuationTable.Amenities.Health.FlatMaintainance != "" && ValuationTable.Amenities.Health.FlatMaintainance != null && ValuationTable.Amenities.Health.FlatMaintainance != undchhhk) {
                                                                            jsonobjPDF['FlatMaintenance'] = ValuationTable.Amenities.Health.FlatMaintainance;
                                                                            console.log("Flat Maintenance" + ValuationTable.Amenities.Health.FlatMaintainance)
                                                                        } else {
                                                                            jsonobjPDF['FlatMaintenance'] = "N/A";
                                                                            console.log("Flat Maintenance" + ValuationTable.Amenities.Health.FlatMaintainance)
                                                                        }

                                                                        if (ValuationTable.Amenities.Health.Others != "" && ValuationTable.Amenities.Health.Others != null && ValuationTable.Amenities.Health.Others != undchhhk) {
                                                                            jsonobjPDF['Others'] = ValuationTable.Amenities.Health.Others;
                                                                        } else {
                                                                            jsonobjPDF['Others'] = "N/A";
                                                                        }

                                                                        jsonobjPDF['PlinthArea'] = "NA";
                                                                        jsonobjPDF['CommonArea'] = "NA";
                                                                        jsonobjPDF['CarpetArea'] = "NA";
                                                                    } else {
                                                                        console.log("Test1");
                                                                        if (ValuationTable.Amenities.Utility.NoofLifts != "" && ValuationTable.Amenities.Utility.NoofLifts != null && ValuationTable.Amenities.Utility.NoofLifts != undchhhk) {
                                                                            jsonobjPDF['NumberofLifts'] = ValuationTable.Amenities.Utility.NoofLifts;
                                                                        } else {
                                                                            jsonobjPDF['NumberofLifts'] = "N/A";
                                                                        }
                                                                        console.log("Test inner 1");
                                                                        if (ValuationTable.Amenities.Utility.NoofCarpark != "" && ValuationTable.Amenities.Utility.NoofCarpark != null && ValuationTable.Amenities.Utility.NoofCarpark != undchhhk) {
                                                                            jsonobjPDF['NumberofCarPark'] = ValuationTable.Amenities.Utility.NoofCarpark;
                                                                        } else {
                                                                            jsonobjPDF['NumberofCarPark'] = "N/A";
                                                                        }
                                                                        console.log("Test inner 2");
                                                                        if (ValuationTable.Amenities.Utility.NoofCoveredCarpark != "" && ValuationTable.Amenities.Utility.NoofCoveredCarpark != null && ValuationTable.Amenities.Utility.NoofCoveredCarpark != undchhhk) {
                                                                            jsonobjPDF['NumberofCoveredCarPark'] = ValuationTable.Amenities.Utility.NoofCoveredCarpark;
                                                                        } else {
                                                                            jsonobjPDF['NumberofCoveredCarPark'] = "N/A";
                                                                        }
                                                                        console.log("Test inner 3");
                                                                        if (ValuationTable.Amenities.Utility.WelfareAssn != "" && ValuationTable.Amenities.Utility.WelfareAssn != null && ValuationTable.Amenities.Utility.WelfareAssn != undchhhk) {
                                                                            jsonobjPDF['ResidentWelfare'] = ValuationTable.Amenities.Utility.WelfareAssn;
                                                                        } else {
                                                                            jsonobjPDF['ResidentWelfare'] = "N/A";
                                                                        }
                                                                        console.log("Test inner 4");
                                                                        if (ValuationTable.Amenities.Utility.UtilitySelect != "" && ValuationTable.Amenities.Utility.UtilitySelect != null && ValuationTable.Amenities.Utility.UtilitySelect != undchhhk) {
                                                                            console.log("In");
                                                                            OtherUtilities = ValuationTable.Amenities.Utility.UtilitySelect;
                                                                            console.log("In 2");
                                                                            jsonobjPDF['OtherUtilities'] = OtherUtilities.replace(/,/g, ", ");
                                                                            console.log("In 3");
                                                                        } else {
                                                                            jsonobjPDF['OtherUtilities'] = "N/A";
                                                                        }
                                                                        console.log("Test inner 5");
                                                                        if (ValuationTable.Amenities.Fitness.UtilityFitness != "" && ValuationTable.Amenities.Fitness.UtilityFitness != null && ValuationTable.Amenities.Fitness.UtilityFitness != undchhhk) {
                                                                            AmenitiesFitness = ValuationTable.Amenities.Fitness.UtilityFitness;
                                                                            jsonobjPDF['AmenitiesFitness'] = AmenitiesFitness.replace(/,/g, ", ");
                                                                        } else {
                                                                            jsonobjPDF['AmenitiesFitness'] = "N/A";
                                                                        }
                                                                        console.log("Test inner 6");
                                                                        if (ValuationTable.Amenities.Health.UtilityHealth != "" && ValuationTable.Amenities.Health.UtilityHealth != null && ValuationTable.Amenities.Health.UtilityHealth != undchhhk) {
                                                                            AmenitiesHealth = ValuationTable.Amenities.Health.UtilityHealth;
                                                                            console.log("before replace , with space" + AmenitiesHealth)
                                                                            jsonobjPDF['AmenitiesHealth'] = AmenitiesHealth.replace(/,/g, ", ");
                                                                        } else {
                                                                            jsonobjPDF['AmenitiesHealth'] = "N/A";
                                                                        }
                                                                        console.log("Test inner 7");
                                                                        if (ValuationTable.Amenities.Health.Others != "" && ValuationTable.Amenities.Health.Others != null && ValuationTable.Amenities.Health.Others != undchhhk) {
                                                                            jsonobjPDF['Others'] = ValuationTable.Amenities.Health.Others;
                                                                        } else {
                                                                            jsonobjPDF['Others'] = "N/A";
                                                                        }
                                                                        console.log("Test inner 8");
                                                                    }

                                                                    console.log("Test2");
                                                                    if (ValuationTable.SummaryDeatils.RecommendedValue != "" && ValuationTable.SummaryDeatils.RecommendedValue != null && ValuationTable.SummaryDeatils.RecommendedValue != undchhhk) {
                                                                        var Recommended = ValuationTable.SummaryDeatils.RecommendedValue;
                                                                        jsonobjPDF['RecommendedValue'] = Math.round(Recommended.replace(/,/g, ""));
                                                                        //var Recommended=ValuationTable.SummaryDeatils.RecommendedValue;
                                                                        jsonobjPDF['Recommvaluerupe'] = numberToText(jsonobjPDF['RecommendedValue']);

                                                                    } else {
                                                                        jsonobjPDF['RecommendedValue'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.CompositeRate != "" && ValuationTable.CompositeRate != null && ValuationTable.CompositeRate != undchhhk) {
                                                                        jsonobjPDF['Compositerate'] = ValuationTable.CompositeRate;
                                                                    } else {
                                                                        jsonobjPDF['Compositerate'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.NewConstructionCompositeRate != "" && ValuationTable.NewConstructionCompositeRate != null && ValuationTable.NewConstructionCompositeRate != undchhhk) {
                                                                        jsonobjPDF['NewConsrate'] = ValuationTable.NewConstructionCompositeRate;
                                                                    } else {
                                                                        jsonobjPDF['NewConsrate'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.ReplacementCost != "" && ValuationTable.ReplacementCost != null && ValuationTable.ReplacementCost != undchhhk) {
                                                                        jsonobjPDF['ReplacementCost'] = ValuationTable.ReplacementCost;
                                                                    } else {
                                                                        jsonobjPDF['ReplacementCost'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.LifeOfBuilding != "" && ValuationTable.LifeOfBuilding != null && ValuationTable.LifeOfBuilding != undchhhk) {
                                                                        jsonobjPDF['EstimateLifeBuilding'] = ValuationTable.LifeOfBuilding;
                                                                    } else {
                                                                        jsonobjPDF['EstimateLifeBuilding'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.TotalCompositeRate != "" && ValuationTable.TotalCompositeRate != null && ValuationTable.TotalCompositeRate != undchhhk) {
                                                                        jsonobjPDF['TotalCompRate'] = ValuationTable.TotalCompositeRate;
                                                                    } else {
                                                                        jsonobjPDF['TotalCompRate'] = "N/A";
                                                                    }
                                                                    console.log("Test3");
                                                                    jsonobjPDF['DateofValuation'] = ValuationTable.DateofValuation;

                                                                    var valuedate = ValuationTable.DateofValuation;
                                                                    console.log(valuedate)

                                                                    var date = new Date(valuedate);
                                                                    year = date.getFullYear();
                                                                    month = date.getMonth() + 1;
                                                                    dt = date.getDate();
                                                                    if (dt < 10) {
                                                                        dt = '0' + dt;
                                                                    }
                                                                    if (month < 10) {
                                                                        month = '0' + month;
                                                                    }

                                                                    var dateformate = (dt + '-' + month + '-' + year);
                                                                    console.log("valuedate" + dateformate)

                                                                    jsonobjPDF['dateformate'] = dateformate;

                                                                    jsonobjPDF['DateofInspection'] = ValuationTable.DateofInspection;

                                                                    var inspectdate = ValuationTable.DateofInspection;
                                                                    console.log(inspectdate)

                                                                    var date = new Date(inspectdate);
                                                                    year = date.getFullYear();
                                                                    month = date.getMonth() + 1;
                                                                    dt = date.getDate();
                                                                    if (dt < 10) {
                                                                        dt = '0' + dt;
                                                                    }
                                                                    if (month < 10) {
                                                                        month = '0' + month;
                                                                    }

                                                                    var inspdate = (dt + '-' + month + '-' + year);
                                                                    console.log("inspdate" + inspdate)

                                                                    jsonobjPDF['inspdate'] = inspdate;




                                                                    var types = ValuationTable.SummaryDeatils.Type;
                                                                    Type = types.replace(/,$/, "");
                                                                    var array1 = Type.split(',');


                                                                    //console.log(array1)
                                                                    var measure = ValuationTable.SummaryDeatils.Measurement;
                                                                    measurement = measure.replace(/,$/, "");
                                                                    var array2 = measurement.split(',');

                                                                    var measure = ValuationTable.SummaryDeatils.Measurement;
                                                                    measurement = measure.replace(/,$/, "");
                                                                    var arry2 = measurement.split(',');

                                                                    var market = ValuationTable.SummaryDeatils.MarketRate;
                                                                    marketrate = market.replace(/,$/, "");
                                                                    var array3 = marketrate.split(',');

                                                                    var market = ValuationTable.SummaryDeatils.MarketRate;
                                                                    marketrate = market.replace(/,$/, "");
                                                                    var arry3 = marketrate.split(',');

                                                                    var tot = ValuationTable.SummaryDeatils.Total;
                                                                    total = tot.replace(/,$/, "");
                                                                    var array4 = total.split(',');

                                                                    var tot = ValuationTable.SummaryDeatils.Total;
                                                                    total = tot.replace(/,$/, "");
                                                                    var arry4 = total.split(',');

                                                                    for (var i = 0; i < array1.length; i++) {
                                                                        array2[i] = array2[i] + "(" + array1[i] + ")";
                                                                        array3[i] = array3[i] + "(" + array1[i] + ")";
                                                                        array4[i] = array4[i] + "(" + array1[i] + ")";
                                                                    }
                                                                    jsonobjPDF['measurements'] = array2;
                                                                    jsonobjPDF['marketrates'] = array3;
                                                                    jsonobjPDF['totals'] = array4;
                                                                    jsonobjPDF['EstimatedRateperSqFt'] = ValuationTable.EstRatePerSqFt;
                                                                    jsonobjPDF['EstimatedMarketValue'] = ValuationTable.EstimatedValue;
                                                                    jsonobjPDF['GuideLineValue'] = ValuationTable.GuidelineValue;
                                                                    jsonobjPDF['Guidelinesqft'] = ValuationTable.Guidelinesqft;

                                                                    if (ValuationTable.SummaryDeatils.RecommendedValue != "" && ValuationTable.SummaryDeatils.RecommendedValue != null && ValuationTable.SummaryDeatils.RecommendedValue != undchhhk) {
                                                                        var Recommended = ValuationTable.SummaryDeatils.RecommendedValue;

                                                                        jsonobjPDF['RecommendedValue'] = Math.round(Recommended.replace(/,/g, ""));

                                                                        console.log("Recommended : " + Recommended.replace(/,/g, ""));
                                                                    } else {
                                                                        jsonobjPDF['RecommendedValue'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.SummaryDeatils.Recommendation != "" && ValuationTable.SummaryDeatils.Recommendation != null && ValuationTable.SummaryDeatils.Recommendation != undchhhk) {
                                                                        jsonobjPDF['Recommendation'] = ValuationTable.SummaryDeatils.Recommendation;
                                                                    } else {
                                                                        jsonobjPDF['Recommendation'] = "N/A";
                                                                    }
                                                                    if (ValuationTable.SummaryDeatils.Type != "" && ValuationTable.SummaryDeatils.Type != null && ValuationTable.SummaryDeatils.Type != undchhhk) {
                                                                        // var types=ValuationTable.SummaryDeatils.Type;
                                                                        // Type=types.replace(/,$/, "");
                                                                        // var array5 = Type.split(',');

                                                                        console.log(array1)
                                                                        var a = array1.indexOf("Depreciation");
                                                                        console.log("a" + a)

                                                                        var b = array1.indexOf("Land");
                                                                        console.log("b" + b)

                                                                        var c = array1.lastIndexOf("Building");
                                                                        console.log("c" + c)

                                                                        var d = array1.lastIndexOf("Apartment");
                                                                        console.log("d" + d)
                                                                        if (a != -1) {
                                                                            jsonobjPDF['Type'] = array1[a];
                                                                        }


                                                                        console.log('Type:' + array1[a]);
                                                                    } else {
                                                                        jsonobjPDF['Type'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.SummaryDeatils.MarketRate != "" && ValuationTable.SummaryDeatils.MarketRate != null && ValuationTable.SummaryDeatils.MarketRate != undchhhk) {
                                                                        // var types=ValuationTable.SummaryDeatils.Type;
                                                                        // Type=types.replace(/,$/, "");
                                                                        // var array5 = Type.split(',');


                                                                        if (arry3[a] != undchhhk) {
                                                                            jsonobjPDF['MarketRate'] = arry3[a];
                                                                        } else {
                                                                            jsonobjPDF['MarketRate'] = "----";
                                                                        }
                                                                        if (arry3[b] != undchhhk) {
                                                                            jsonobjPDF['MarketRateLand'] = arry3[b];
                                                                        } else {
                                                                            jsonobjPDF['MarketRateLand'] = "----";
                                                                        }
                                                                        if (arry3[c] != undchhhk) {
                                                                            jsonobjPDF['MarketRateBuilding'] = arry3[c];
                                                                        } else {
                                                                            jsonobjPDF['MarketRateBuilding'] = "----";
                                                                        }
                                                                        if (arry3[d] != undchhhk) {
                                                                            jsonobjPDF['MarketRateApartment'] = arry3[d];
                                                                        } else {
                                                                            jsonobjPDF['MarketRateApartment'] = "----";
                                                                        }

                                                                        console.log('MarketRate:' + arry3[a]);



                                                                        console.log('MarketRateLand:' + arry3[b]);



                                                                        console.log('MarketRateBuilding:' + arry3[c]);



                                                                        console.log('MarketRateApartment:' + arry3[d]);



                                                                        // var value=;
                                                                        // console(value)
                                                                        // jsonobjPDF['PMRvalue']=value * arry3[b];
                                                                        // console.log('PMRvalue:'+value * arry3[b]);
                                                                    } else {
                                                                        jsonobjPDF['MarketRate'] = "N/A";
                                                                        jsonobjPDF['MarketRateLand'] = "N/A";
                                                                        jsonobjPDF['MarketRateApartment'] = "N/A";
                                                                        jsonobjPDF['MarketRateBuilding'] = "N/A";
                                                                        // jsonobjPDF['PMRvalue']="N/A";
                                                                    }

                                                                    if (ValuationTable.SummaryDeatils.Measurement != "" && ValuationTable.SummaryDeatils.Measurement != null && ValuationTable.SummaryDeatils.Measurement != undchhhk) {

                                                                        console.log(arry2)
                                                                        if (arry2[a] != undchhhk) {
                                                                            jsonobjPDF['Measurement'] = arry2[a] + " per sq/ft,";
                                                                        } else {
                                                                            jsonobjPDF['Measurement'] = "----";
                                                                        }
                                                                        if (arry2[b] != undchhhk) {
                                                                            jsonobjPDF['LandMeasurement'] = arry2[b];
                                                                        } else {
                                                                            jsonobjPDF['LandMeasurement'] = "----";
                                                                        }


                                                                        console.log('Measurement:' + arry2[a]);
                                                                        console.log('LandMeasurement:' + arry2[b]);
                                                                    } else {
                                                                        jsonobjPDF['Measurement'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.SummaryDeatils.Total != "" && ValuationTable.SummaryDeatils.Total != null && ValuationTable.SummaryDeatils.Total != undchhhk) {

                                                                        console.log(arry4)
                                                                        if (arry4[a] != undchhhk) {
                                                                            jsonobjPDF['TotalMarketRate'] = arry4[a];
                                                                        } else {
                                                                            jsonobjPDF['TotalMarketRate'] = "----";
                                                                        }
                                                                        if (arry4[b] != undchhhk) {
                                                                            jsonobjPDF['TotalMarketRateLand'] = arry4[b];
                                                                        } else {
                                                                            jsonobjPDF['TotalMarketRateLand'] = "----";
                                                                        }
                                                                        if (arry4[c] != undchhhk) {
                                                                            jsonobjPDF['TotalMarketRateBuilding'] = arry4[c];
                                                                        } else {
                                                                            jsonobjPDF['TotalMarketRateBuilding'] = "----";
                                                                        }
                                                                        if (arry4[d] != undchhhk) {
                                                                            jsonobjPDF['TotalMarketRateApartment'] = arry4[d];
                                                                        } else {
                                                                            jsonobjPDF['TotalMarketRateApartment'] = "----";
                                                                        }


                                                                        if ((jsonobjPDF['MarketRateLand'] != "----" && jsonobjPDF['MarketRateLand'] != "N/A") && (jsonobjPDF['LandMeasurement'] != "----" && jsonobjPDF['LandMeasurement'] != "N/A")) {
                                                                            var PMRvalue = jsonobjPDF['LandMeasurement'] * jsonobjPDF['MarketRateLand'];
                                                                            jsonobjPDF['PMRvalue'] = PMRvalue;
                                                                            console.log('PMRvalue:' + PMRvalue);
                                                                        } else {
                                                                            jsonobjPDF['PMRvalue'] = "----";
                                                                        }

                                                                    } else {
                                                                        jsonobjPDF['TotalMarketRate'] = "N/A";
                                                                        jsonobjPDF['TotalMarketRateLand'] = "N/A";
                                                                        jsonobjPDF['TotalMarketRateBuilding'] = "N/A";
                                                                        jsonobjPDF['TotalMarketRateApartment'] = "N/A";
                                                                        jsonobjPDF['PMRvalue'] = "N/A";
                                                                    }


                                                                    if (ValuationTable.Miscelaneous.PropertyArea != "" && ValuationTable.Miscelaneous.PropertyArea != null && ValuationTable.Miscelaneous.PropertyArea != undchhhk) {
                                                                        jsonobjPDF['PropertyArea'] = ValuationTable.Miscelaneous.PropertyArea;
                                                                    } else {
                                                                        jsonobjPDF['PropertyArea'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.Miscelaneous.AreaClassification != "" && ValuationTable.Miscelaneous.AreaClassification != null && ValuationTable.Miscelaneous.AreaClassification != undchhhk) {
                                                                        jsonobjPDF['AreaClassification'] = ValuationTable.Miscelaneous.AreaClassification;
                                                                    } else {
                                                                        jsonobjPDF['AreaClassification'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.Miscelaneous.OccupiedBy != "" && ValuationTable.Miscelaneous.OccupiedBy != null && ValuationTable.Miscelaneous.OccupiedBy != undchhhk) {
                                                                        jsonobjPDF['OccupiedBy'] = ValuationTable.Miscelaneous.OccupiedBy;
                                                                    } else {
                                                                        jsonobjPDF['OccupiedBy'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.Miscelaneous.OccupiedPeriod != "" && ValuationTable.Miscelaneous.OccupiedPeriod != null && ValuationTable.Miscelaneous.OccupiedPeriod != undchhhk) {
                                                                        jsonobjPDF['OccupiedPeriod'] = ValuationTable.Miscelaneous.OccupiedPeriod;
                                                                    } else {
                                                                        jsonobjPDF['OccupiedPeriod'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.Miscelaneous.RentAmount != "" && ValuationTable.Miscelaneous.RentAmount != null && ValuationTable.Miscelaneous.RentAmount != undchhhk) {
                                                                        jsonobjPDF['RentAmount'] = ValuationTable.Miscelaneous.RentAmount;
                                                                    } else {
                                                                        jsonobjPDF['RentAmount'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.Miscelaneous.TypeOfStructure != "" && ValuationTable.Miscelaneous.TypeOfStructure != null && ValuationTable.Miscelaneous.TypeOfStructure != undchhhk) {
                                                                        jsonobjPDF['TypeOfStructure'] = ValuationTable.Miscelaneous.TypeOfStructure;
                                                                    } else {
                                                                        jsonobjPDF['TypeOfStructure'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.Miscelaneous.TypeOfStructure != "" && ValuationTable.Miscelaneous.TypeOfStructure != null && ValuationTable.Miscelaneous.TypeOfStructure != undchhhk) {
                                                                        jsonobjPDF['TypeOfStructure'] = ValuationTable.Miscelaneous.TypeOfStructure;
                                                                    } else {
                                                                        jsonobjPDF['TypeOfStructure'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.Miscelaneous.DwllingUnits != "" && ValuationTable.Miscelaneous.DwllingUnits != null && ValuationTable.Miscelaneous.DwllingUnits != undchhhk) {
                                                                        jsonobjPDF['DwllingUnits'] = ValuationTable.Miscelaneous.DwllingUnits;
                                                                    } else {
                                                                        jsonobjPDF['DwllingUnits'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.Miscelaneous.Quality != "" && ValuationTable.Miscelaneous.Quality != null && ValuationTable.Miscelaneous.Quality != undchhhk) {
                                                                        jsonobjPDF['Quality'] = ValuationTable.Miscelaneous.Quality;
                                                                    } else {
                                                                        jsonobjPDF['Quality'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.Miscelaneous.BuildingAppearance != "" && ValuationTable.Miscelaneous.BuildingAppearance != null && ValuationTable.Miscelaneous.BuildingAppearance != undchhhk) {
                                                                        jsonobjPDF['BuildingAppearance'] = ValuationTable.Miscelaneous.BuildingAppearance;
                                                                    } else {
                                                                        jsonobjPDF['BuildingAppearance'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.Miscelaneous.Maintenance != "" && ValuationTable.Miscelaneous.Maintenance != null && ValuationTable.Miscelaneous.Maintenance != undchhhk) {
                                                                        jsonobjPDF['Maintenance'] = ValuationTable.Miscelaneous.Maintenance;
                                                                    } else {
                                                                        jsonobjPDF['Maintenance'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.Miscelaneous.Floor != "" && ValuationTable.Miscelaneous.Floor != null && ValuationTable.Miscelaneous.Floor != undchhhk) {
                                                                        jsonobjPDF['Floor'] = ValuationTable.Miscelaneous.Floor;
                                                                    } else {
                                                                        jsonobjPDF['Floor'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.Miscelaneous.Specification != "" && ValuationTable.Miscelaneous.Specification != null && ValuationTable.Miscelaneous.Specification != undchhhk) {
                                                                        jsonobjPDF['Specification'] = ValuationTable.Miscelaneous.Specification;
                                                                    } else {
                                                                        jsonobjPDF['Specification'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.Miscelaneous.Assessment != "" && ValuationTable.Miscelaneous.Assessment != null && ValuationTable.Miscelaneous.Assessment != undchhhk) {
                                                                        jsonobjPDF['Assessment'] = ValuationTable.Miscelaneous.Assessment;
                                                                    } else {
                                                                        jsonobjPDF['Assessment'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.Miscelaneous.TaxPayerName != "" && ValuationTable.Miscelaneous.TaxPayerName != null && ValuationTable.Miscelaneous.TaxPayerName != undchhhk) {
                                                                        jsonobjPDF['TaxPayerName'] = ValuationTable.Miscelaneous.TaxPayerName;
                                                                    } else {
                                                                        jsonobjPDF['TaxPayerName'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.Miscelaneous.TaxAmount != "" && ValuationTable.Miscelaneous.TaxAmount != null && ValuationTable.Miscelaneous.TaxAmount != undchhhk) {
                                                                        jsonobjPDF['TaxAmount'] = ValuationTable.Miscelaneous.TaxAmount;
                                                                    } else {
                                                                        jsonobjPDF['TaxAmount'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.Miscelaneous.ElectricityNum != "" && ValuationTable.Miscelaneous.ElectricityNum != null && ValuationTable.Miscelaneous.ElectricityNum != undchhhk) {
                                                                        jsonobjPDF['ElectricityNum'] = ValuationTable.Miscelaneous.ElectricityNum;
                                                                    } else {
                                                                        jsonobjPDF['ElectricityNum'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.Miscelaneous.MasterCardName != "" && ValuationTable.Miscelaneous.MasterCardName != null && ValuationTable.Miscelaneous.MasterCardName != undchhhk) {
                                                                        jsonobjPDF['MasterCardName'] = ValuationTable.Miscelaneous.MasterCardName;
                                                                    } else {
                                                                        jsonobjPDF['MasterCardName'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.Miscelaneous.Purpose != "" && ValuationTable.Miscelaneous.Purpose != null && ValuationTable.Miscelaneous.Purpose != undchhhk) {
                                                                        jsonobjPDF['Purpose'] = ValuationTable.Miscelaneous.Purpose;
                                                                    } else {
                                                                        jsonobjPDF['Purpose'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.Miscelaneous.MarketabilityInfo != "" && ValuationTable.Miscelaneous.MarketabilityInfo != null && ValuationTable.Miscelaneous.MarketabilityInfo != undchhhk) {
                                                                        jsonobjPDF['MarketabilityInfo'] = ValuationTable.Miscelaneous.MarketabilityInfo;
                                                                    } else {
                                                                        jsonobjPDF['MarketabilityInfo'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.Miscelaneous.FactorFav != "" && ValuationTable.Miscelaneous.FactorFav != null && ValuationTable.Miscelaneous.FactorFav != undchhhk) {
                                                                        jsonobjPDF['FactorFav'] = ValuationTable.Miscelaneous.FactorFav;
                                                                    } else {
                                                                        jsonobjPDF['FactorFav'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.Miscelaneous.Docs != "" && ValuationTable.Miscelaneous.Docs != null && ValuationTable.Miscelaneous.Docs != undchhhk) {
                                                                        jsonobjPDF['Docs'] = ValuationTable.Miscelaneous.Docs;
                                                                    } else {
                                                                        jsonobjPDF['Docs'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.Miscelaneous.BriefDesc != "" && ValuationTable.Miscelaneous.BriefDesc != null && ValuationTable.Miscelaneous.BriefDesc != undchhhk) {
                                                                        jsonobjPDF['BriefDesc'] = ValuationTable.Miscelaneous.BriefDesc;
                                                                    } else {
                                                                        jsonobjPDF['BriefDesc'] = "N/A";
                                                                    }

                                                                    if (ValuationTable.Miscelaneous.NegativeFactors != "" && ValuationTable.Miscelaneous.NegativeFactors != null && ValuationTable.Miscelaneous.NegativeFactors != undchhhk) {
                                                                        jsonobjPDF['NegativeFactors'] = ValuationTable.Miscelaneous.NegativeFactors;
                                                                    } else {
                                                                        jsonobjPDF['NegativeFactors'] = "N/A";
                                                                    }

                                                                    if (AppraiserTable.Address.City != "" && AppraiserTable.Address.City != null && AppraiserTable.Address.City != undchhhk) {
                                                                        jsonobjPDF['place'] = AppraiserTable.Address.City;
                                                                    } else {
                                                                        jsonobjPDF['place'] = "N/A";
                                                                    }

                                                                    if (AppraiserTable.Address.Pincode != "" && AppraiserTable.Address.Pincode != null && AppraiserTable.Address.Pincode != undchhhk) {
                                                                        jsonobjPDF['pin'] = AppraiserTable.Address.Pincode;
                                                                    } else {
                                                                        jsonobjPDF['pin'] = "N/A";
                                                                    }

                                                                    if (AppraiserTable.UserName != "" && AppraiserTable.UserName != null && AppraiserTable.UserName != undchhhk) {
                                                                        jsonobjPDF['AppraiserName'] = AppraiserTable.UserName;
                                                                    } else {
                                                                        jsonobjPDF['AppraiserName'] = "N/A";
                                                                    }

                                                                    if (ValuationID != "" && ValuationID != null && ValuationID != undchhhk) {
                                                                        jsonobjPDF['ValuationID'] = ValuationID;
                                                                    } else {
                                                                        jsonobjPDF['ValuationID'] = "N/A";
                                                                    }

                                                                    var date = new Date()
                                                                    year = date.getFullYear();
                                                                    month = date.getMonth() + 1;
                                                                    dt = date.getDate();
                                                                    if (dt < 10) {
                                                                        dt = '0' + dt;
                                                                    }
                                                                    if (month < 10) {
                                                                        month = '0' + month;
                                                                    }

                                                                    console.log(dt + '-' + month + '-' + year);
                                                                    var CurrenDate = dt + '-' + month + '-' + year;
                                                                    jsonobjPDF['CurrenDate'] = CurrenDate;
                                                                    jsonobjPDF['OnlyDate'] = CurrenDate; //jsonobjPDF['CurrenDate'].toDateString();

                                                                    //Assign appraiser data

                                                                    console.log("Test4");
                                                                    var imgnames = ValuationTable.Images.ImageName.split(',');
                                                                    if (imgnames.length == 1 && imgnames[0] == "") {
                                                                        /* var imagejsobj={}
																							imagejsobj['Images']="No Images Available..";
																							//jsonobjPDF['EmptyImage']="No Images Available..";
																							console.log(JSON.stringify(imagejsobj))
																							imagearr.push(imagejsobj); */
                                                                        jsonobjPDF['EmptyImage'] = "No Images Available..";
                                                                        console.log("Empty image : " + jsonobjPDF['EmptyImage']);
                                                                    } else {
                                                                        for (var k = 0; k < imgnames.length; k++) {
                                                                            var imagejsobj = {}
                                                                            imagejsobj['Images'] = 'C:\\inetpub\\wwwroot\\Data\\' + imgnames[k].trim() + '.jpg';
                                                                            console.log(JSON.stringify(imagejsobj))
                                                                            imagearr.push(imagejsobj);
                                                                        }
                                                                        jsonobjPDF['PropertyImages'] = imagearr;
                                                                        jsonobjPDF['EmptyImage'] = "";
                                                                    }

                                                                    console.log("Image String" + JSON.stringify(jsonobjPDF['PropertyImages']));

                                                                    var fs = require('fs');
                                                                    var path = require('path');

                                                                    var ImageModule = require('docxtemplater-image-module')

                                                                    var opts = {}

                                                                    opts.centered = false;
                                                                    opts.getImage = function(tagValue, tagName) {
                                                                        return fs.readFileSync(tagValue, 'binary');
                                                                    }

                                                                    opts.getSize = function(img, tagValue, tagName) {
                                                                        return [150, 150];
                                                                    }

                                                                    var imageModule = new ImageModule(opts);
                                                                    var Docxtemplater = require('docxtemplater');
                                                                    var JSZip = require('jszip');

                                                                    var content = fs
                                                                        .readFileSync('C:\\inetpub\\wwwroot\\Data\\Templates\\' + Templatename + '.docx', 'binary');

                                                                    var zip = new JSZip(content);

                                                                    var doc = new Docxtemplater();

                                                                    doc.attachModule(imageModule)
                                                                    doc.loadZip(zip);
                                                                    doc.setData(jsonobjPDF);

                                                                    try {
                                                                        doc.render()
                                                                    } catch (error) {
                                                                        var e = {
                                                                            message: error.message,
                                                                            name: error.name,
                                                                            stack: error.stack,
                                                                            properties: error.properties,
                                                                        }
                                                                        console.log(JSON.stringify({
                                                                            error: e
                                                                        }));
                                                                        throw error;
                                                                    }

                                                                    var buf = doc.getZip().generate({
                                                                        type: 'nodebuffer'
                                                                    });

                                                                    fs.writeFileSync('C:\\inetpub\\wwwroot\\Data\\DOCS\\' + ValuationID + '.docx', buf);

                                                                    var util = require('util'),
                                                                        exec = require('child_process').exec,
                                                                        child;
                                                                    var test = "";
                                                                    child = exec('C:\\Data\\convdocx2pdf.exe ' + ValuationID,
                                                                        function(error, stdout, stderr) {
                                                                            console.log(stdout);
                                                                            console.log('STDOUT' + test);
                                                                            test = stdout;

                                                                            console.log(stderr);
                                                                            if (error !== null) {
                                                                                console.log('exec error: ' + error);
                                                                            } else {
                                                                                console.log('STDOUT' + test);
                                                                                res.send(test);
                                                                                console.log(jsonobjPDF['DateofValuation'] + "----------------------" + jsonobjPDF['DateofInspection']);
                                                                            }
                                                                        });
                                                                });
                                                            }
                                                        });

                                                    })
                                                } else {


                                                }
                                            })

                                        });
                                    }
                                });
                            });
                        } else {

                            console.log("Property Detailserr" + result1)
                        }
                    });
                });
            } else {
                res.send("0");
                console.log('No document(s) found with defined "find" criteria!');
            }
        });
        //});
    } catch (Ex) {
        console.log("connection error");
    }
});
module.exports = router;