var http = require("http");
var fs = require("fs")
var CaptureLog = require("./log.js");
capturelog = new CaptureLog();

var express = require('express');
var router = express.Router();
router.post('/', function(req, res, next) {
    try {
        var strBody = req.body;
        
        console.log("Received posted data: " + strBody);

        var jsonObj = strBody;
		
		var Type = jsonObj.Type;
		console.log("Type--- "+Type);
		console.log("Type--- "+jsonObj);
		var businessId = "";
		var vecHirer = jsonObj.vecHirer;
		var vecBusiaddress = jsonObj.vecBusiaddress;
		var vecFaxno = jsonObj.vecFaxno;
		var vecCellno = jsonObj.vecCellno;
		var vecAssetvalue = jsonObj.vecAssetvalue;
		var vecBusiyears = jsonObj.vecBusiyears;
		var vecOwnrented = jsonObj.vecOwnrented;
		var vecActivitylevel = jsonObj.vecActivitylevel;
		var vecNoofemp = jsonObj.vecNoofemp;
		var vecMajorcust = jsonObj.vecMajorcust;
		var vecLocality = jsonObj.vecLocality;
		var vecInterior = jsonObj.vecInterior;
		var vecFurnish = jsonObj.vecFurnish;
		var vecNeglist = jsonObj.vecNeglist;
		var vecWatchlist = jsonObj.vecWatchlist;
		var vecRemarks = jsonObj.vecRemarks;
		var vecImage = jsonObj.vecImage;
		var vecBusiname = jsonObj.vecBusiname;
		var vecLandline = jsonObj.vecLandline;
		var vecLandmark = jsonObj.vecLandmark;
		var vecVechicletype = jsonObj.vecVechicletype;
		var vecAmtfin = jsonObj.vecAmtfin;
		var vecPresentyears = jsonObj.vecPresentyears;
		var vecMonthlyrent = jsonObj.vecMonthlyrent;
		var vecTurnover = jsonObj.vecTurnover;
		var vecMachinery = jsonObj.vecMachinery;
		var vecMajorsuppliers = jsonObj.vecMajorsuppliers;
		var vecExterior = jsonObj.vecExterior;
		var vecAutomationfax = jsonObj.vecAutomationfax;
		var vecRepossesion = jsonObj.vecRepossesion;
		var vecBusiasses = jsonObj.vecBusiasses;
		var BusinessID;
		
		if (businessId== "") {
            console.log("Connected to Database");
            var db = req.db;
            var collection = db.get('Vehicle');
			
		collection.find({"Type" : "Business"}, {
									sort: {
									'BusinessID': -1
									},
									limit: 1
									}, function(err, docs) {
				
			
						if (err) {
                            console.log(err)
                        }
                        if (docs.length == 0) {
                            BusinessID = "0000000001";
                            console.log("1st BusinessID");
                        }
						else
						{
							console.log("else part ");
								docs.forEach(function(docSub) {
								console.log(docSub.BusinessID);
								BusinessID = parseInt(docSub.BusinessID, 10);
								console.log("BusinessID parse "+BusinessID);
                                BusinessID = BusinessID+1;
								console.log("BusinessID inc "+BusinessID);
								strval = 10 - BusinessID.toString().length;
								newstring = "";
								for (i = 1; i <= strval; i++) {
									newstring = newstring + "0";
								}
								BusinessID = newstring + BusinessID.toString();
								console.log("BusinessID = "+BusinessID);
								});
						}
						collection.insert({
							"Type":Type,
							"BusinessID":BusinessID,
							"Hirer":vecHirer,
							"BusinessAddress":vecBusiaddress,
							"Faxno":vecFaxno,
							"Cellno":vecCellno,
							"AssetValue":vecAssetvalue,
							"BusinessYears":vecBusiyears,
							"OwnRented":vecOwnrented,
							"ActivityLevel":vecActivitylevel,
							"NoOfEmployees":vecNoofemp,
							"MajorCustomers":vecMajorcust,
							"Locality":vecLocality,
							"Interior":vecInterior,
							"Furnish":vecFurnish,
							"NegativeList":vecNeglist,
							"WatchList":vecWatchlist,
							"Remarks":vecRemarks,
							"Image":vecImage,
							"BusinessName":vecBusiname,
							"Landline":vecLandline,
							"Landmark":vecLandmark,
							"VechicleType":vecVechicletype,
							"AmountFinanced":vecAmtfin,
							"PresentYears":vecPresentyears,
							"MonthlyRent":vecMonthlyrent,
							"Turnover":vecTurnover,
							"Machinery":vecMachinery,
							"MajorSuppliers":vecMajorsuppliers,
							"Exterior":vecExterior,
							"AutomationFax":vecAutomationfax,
							"Repossesion":vecRepossesion,
							"BusinessAssessment":vecBusiasses
							
						}, function(err, results) {
								if(err)
								{
									console.log("Error = "+err);
									res.send("0");
								}
								else
								{
									console.log("inserted successfully");
									res.send("1");
								}
						});
						
			});
		}
		
	}
	catch(e)
	{
		console.log(e);
	}
	});
module.exports = router;
		
		