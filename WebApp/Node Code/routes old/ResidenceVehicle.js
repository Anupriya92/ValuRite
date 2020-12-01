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
		var residenceId = "";
		var OwnerShip = jsonObj.OwnerShip;
		var park = jsonObj.park;
		var gasConn = jsonObj.gasConn;
		var entryPermission = jsonObj.entryPermission;
		var livingStyle = jsonObj.livingStyle;
		var productMatch = jsonObj.productMatch;
		var negativeList = jsonObj.negativeList;
		var negativeProf = jsonObj.negativeProf;
		var stablilityDev = jsonObj.stablilityDev;
		var borrowerDev = jsonObj.borrowerDev;
		var propDev = jsonObj.propDev;
		var repRef = jsonObj.repRef;
		var hirerName = jsonObj.hirerName;
		var resAddr = jsonObj.resAddr;
		var landMark = jsonObj.landMark;
		var telNo = jsonObj.telNo;
		var age = jsonObj.age;
		var maritalStatus = jsonObj.maritalStatus;
		var asset = jsonObj.asset;
		var vehType = jsonObj.vehType;
		var yearNo = jsonObj.yearNo;
		var personCont = jsonObj.personCont;
		var rent = jsonObj.rent;
		var relationshp = jsonObj.relationshp;
		var curResYr = jsonObj.curResYr;
		var areaHouse = jsonObj.areaHouse;
		var inmate = jsonObj.inmate;
		var otherVeh = jsonObj.otherVeh;
		var verifierObs = jsonObj.verifierObs;
		var interiorItemsNo = jsonObj.interiorItemsNo;
		var totalDurable = jsonObj.totalDurable;
		var entryReasn = jsonObj.entryReasn;
		var summaryVerify = jsonObj.summaryVerify;
		var mapResidence = jsonObj.mapResidence;
		var areaRange = jsonObj.areaRange;
		var noOfMembers = jsonObj.noOfMembers;
		var borrowerMeet = jsonObj.borrowerMeet;
		var NameVerified = jsonObj.NameVerified;
		var locality = jsonObj.locality;
		var residence = jsonObj.residence;
		var interior = jsonObj.interior;
		var stdLiv = jsonObj.stdLiv;
		var Easerep = jsonObj.Easerep;
		var construction = jsonObj.construction;
		var customer = jsonObj.customer;
		var Easeloc = jsonObj.Easeloc;
		var ResStatus = jsonObj.ResStatus;
		
		var ResidenceID;
		console.log(ResidenceID);
		
		if (residenceId == "") {
            console.log("Connected to Database");
            var db = req.db;
            var collection = db.get('Vehicle');
			
			collection.find({"Type" : "Residence"}, {
									sort: {
									'ResidenceID': -1
									},
									limit: 1
									}, function(err, docs) {
				
			
						if (err) {
                            console.log(err)
                        }
                        if (docs.length == 0) {
                            ResidenceID = "0000000001";
                            console.log("1st ResidenceID");
                        }
						else
						{
							console.log("else part ");
							console.log("else part "+docs.length+", "+docs.ResidenceID);
							//console.log("Document 3 = ");
								//ResidenceID = parseInt(doc.ResidenceID, 10);
								//console.log("Res = "+doc.ResidenceID);
								//console.log(ResidenceID+"new id")
                                //ResidenceID++;
								//console.log("ResidenceID = "+parseInt(doc.ResidenceID, 10));
								
								docs.forEach(function(docSub) {
								console.log(docSub.ResidenceID);
								ResidenceID = parseInt(docSub.ResidenceID, 10);
								console.log("ResidenceID parse "+ResidenceID);
                                ResidenceID = ResidenceID+1;
								console.log("ResidenceID inc "+ResidenceID);
								strval = 10 - ResidenceID.toString().length;
								newstring = "";
								for (i = 1; i <= strval; i++) {
									newstring = newstring + "0";
								}
								ResidenceID = newstring + ResidenceID.toString();
								console.log("ResidenceID = "+ResidenceID);
								});
						}
						
						collection.insert({
							"Type":Type,
							"ResidenceID":ResidenceID,
							"OwnerShip":OwnerShip,
							"ParkingSpaceAvailable":park,
							"GasConnection":gasConn,
							"EntryPermitted":entryPermission,
							"LivingStyle":livingStyle,
							"ProductMatches":productMatch,
							"NegativeList":negativeList,
							"NegativeProfile":negativeProf,
							"StabilityDeviation":stablilityDev,
							"Co_borrowerDeviation":borrowerDev,
							"PropertyDeviation":propDev,
							"ReportRefNo":repRef,
							"HirerName":hirerName,
							"ResidentialAddress":resAddr,
							"LandMark":landMark,
							"TelephoneNo":telNo,
							"Age":age,
							"MaritalStatus":maritalStatus,
							"AssetValue":asset,
							"VehicleType":vehType,
							"AgeOfAsset":yearNo,
							"PersonContacted":personCont,
							"MonthlyRentalAmount":rent,
							"Relationship":relationshp,
							"CurrentResidenceYear":curResYr,
							"AreaOfHouse":areaHouse,
							"InmateDetails":inmate,
							"OtherVehiclesOwned":otherVeh,
							"VerifierObservation":verifierObs,
							"NoOfInteriorItems":interiorItemsNo,
							"Durable":totalDurable,
							"EntryReason":entryReasn,
							"VerifierSummary":summaryVerify,
							"MapOfResidence":mapResidence,
							"AreaRange":areaRange,
							"FamilyMembersEarnings":noOfMembers,
							"BorrowerMet":borrowerMeet,
							"NameVerified":NameVerified,
							"Locality":locality,
							"ResidenceType":residence,
							"Interior":interior,
							"StandradOfLiving":stdLiv,
							"EaseOfRepossesion":Easerep,
							"ConstructionResidence":construction,
							"CustomerCo_operation":customer,
							"EaseOfLocation":Easeloc,
							"ResidenceStatus":ResStatus
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