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
//console.log("Entering createhtml.js");
//var d = new Date();
//var datetime = moment().format('DD-MM-YYYY');

var express = require('express');
var router = express.Router();
router.post('/', function(req, res, next) {
		console.log("Entered createhtml.js");
	try{
		console.log("Entered createhtml");
		var imagearr = [];
        var jsonobjPDF = {};
        var imagejsobj = {}

        var strBody = req.body;
        //console.log("Received posted data: " + strBody);
		
		var jsonObj = strBody;
		var ValuationID = jsonObj.ValuationID;
		var PropertyID = jsonObj.PropertyID;
		var intpropid = parseInt(PropertyID);
		var BorrowerID = jsonObj.BorrowerID;
		var UserID = jsonObj.AppraiserID;
        var PropertyType = jsonObj.PropertyType;			   
		//let TodayDate = new Date();
		let current_datetime = new Date()
       let formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()  + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds() 
      // console.log(formatted_date)
		var db = req.db;
		var admin_db = req.admin_db;
		var coll = admin_db.get('User');
        console.log("Connecting to User Table To Get User info");
		
		coll.find({
			'UserID': BorrowerID
		}, function(err, result){
			console.log("Entered createhtml.js function"+JSON.stringify(result));
			if (err){
				console.log(err);
			}else if (result.length){
				result.forEach(function(BorrowerTable){
					console.log("BorrowerTable          "+JSON.stringify(BorrowerTable))
					var db1 = req.db;
                    var colprop = db1.get('Property');
					colprop.find({
						'PropertyID': intpropid
					}, function(err, result1){
						console.log("Accessing Property Details")
						if (result1.length){
							result1.forEach(function(PropertyTable){
								var db2 = req.db;
                                var colApp = db2.get('Appraisal');
							colApp.find({
									'ValuationID': ValuationID,
                                    'ValuationStatus': 'true'
								}, function(err, result2){
									if (result2.length){
										console.log("Accessing Valuation Details"+result2.length)
                                        result2.forEach(function(AppraisalTable){
											//result3.forEach(function(AppraiserTable){
																	console.log("AppraisalTable   "+JSON.stringify(AppraisalTable))
																	/*
																		Building Details
																	*/
																	jsonobjPDF['TypeOfConstruction'] = AppraisalTable.BuildingDetails.TypeOfConstruction;
																	jsonobjPDF['Quality'] = AppraisalTable.BuildingDetails.Quality;
																	jsonobjPDF['BuildingAppearance'] = AppraisalTable.BuildingDetails.BuildingAppearance;
																	jsonobjPDF['MaintenanceInterior'] = AppraisalTable.BuildingDetails.Maintenance_Interior;
																	jsonobjPDF['MaintenanceExterior'] = AppraisalTable.BuildingDetails.Maintenance_Exterior;
																	jsonobjPDF['OccupiedBy'] = AppraisalTable.BuildingDetails.OccupiedBy;
																	jsonobjPDF['GrossMonthlyRent'] = AppraisalTable.BuildingDetails.GrossMonthlyRent;
																	jsonobjPDF['GrossAdvanceAmt'] = AppraisalTable.BuildingDetails.GrossAdvanceAmt
																	
																	var plinthfloortot = [];
																	var heightfloor =[];
																	var floortot = AppraisalTable.BuildingDetails.PlinthArea;
																	for (var floor = 0; floor < floortot.length; floor++) {
																		heightfloor.push(floortot[floor].Heightofthefloor);
																		plinthfloortot.push(floortot[floor].FloorNum);
																	}
																	var TotalNoOfFloor = plinthfloortot.length;
																	jsonobjPDF['TotalFloor'] = TotalNoOfFloor;
																	jsonobjPDF['HeightFloor'] = heightfloor;
																	
																	jsonobjPDF['YearReported1'] = ""
																	jsonobjPDF['YearObserved1'] = ""
																	jsonobjPDF['YearAsPerDeed1'] = ""
																	
																	jsonobjPDF['YearReported2'] = ""
																	jsonobjPDF['YearObserved2'] = ""
																	jsonobjPDF['YearAsPerDeed2'] = ""
																	
																	jsonobjPDF['YearReported3'] = ""
																	jsonobjPDF['YearObserved3'] = ""
																	jsonobjPDF['YearAsPerDeed3'] = ""
																	
																	jsonobjPDF['Reported1'] = ""
																	jsonobjPDF['Reported2'] = ""
																	jsonobjPDF['Reported3'] = ""
																	
																	var floor = AppraisalTable.BuildingDetails.YearOfConstruction;
																	var flrtot = [];
																	for(var floorlen = 0; floorlen < floor.length; floorlen++){
																		flrtot.push(floor[floorlen].FloorNum);
																	}
																	var flrtotlen = flrtot.length;
																	var i =1;
																	var a=[];
																	var jsonobj = {};
																	var yrconstruction = AppraisalTable.BuildingDetails.YearOfConstruction;
																	for(var year = 0; year < yrconstruction.length; year++){
																		if(i <= flrtotlen){
																			YearReported = yrconstruction[year].YearReported;
																			YearObserved = yrconstruction[year].YearObserved;
																			YearAsPerDeed = yrconstruction[year].YearAsPerDeed;
																			
																			jsonobjPDF['YearReported'+i] = YearReported;
																			jsonobjPDF['YearObserved'+i] = YearObserved;
																			jsonobjPDF['YearAsPerDeed'+i] = YearAsPerDeed;
																			
																			jsonobjPDF['Reported'+i] = YearReported + "||" + YearObserved + "||" +YearAsPerDeed;
																		}
																		i++;
																	}
																	
																	jsonobjPDF['PlinthAreaMain1'] = ""
																	jsonobjPDF['PlinthAreaCantilevered1'] = ""
																	jsonobjPDF['PlinthAreaTotal1'] = ""
																	
																	jsonobjPDF['PlinthAreaMain2'] = ""
																	jsonobjPDF['PlinthAreaCantilevered2'] = ""
																	jsonobjPDF['PlinthAreaTotal2'] = ""
																	
																	jsonobjPDF['PlinthAreaMain3'] = ""
																	jsonobjPDF['PlinthAreaCantilevered3'] = ""
																	jsonobjPDF['PlinthAreaTotal3'] = ""
																	
																	var canfloor = AppraisalTable.BuildingDetails.PlinthArea;
																	var canflrtot = [];
																	for(var canfloorlen = 0; canfloorlen < canfloor.length; canfloorlen++){
																		canflrtot.push(canfloor[canfloorlen].FloorNum);
																	}
																	var canflrtotlen = canflrtot.length;
																	var j= 1;
																	var Cantileveredtot = AppraisalTable.BuildingDetails.PlinthArea;
																	for(var plinthtot = 0; plinthtot < Cantileveredtot.length; plinthtot++){
																		var plinthfloor = AppraisalTable.BuildingDetails.PlinthArea[plinthtot].FloorNum;
																		if(j <= canflrtotlen){
																			PlinthAreaMain = Cantileveredtot[plinthtot].PlinthAreaMain;
																			PlinthAreaCantilevered = Cantileveredtot[plinthtot].PlinthAreaCantilevered;
																			PlinthAreaTotal = Cantileveredtot[plinthtot].PlinthAreaTotal;
																			
																			jsonobjPDF['PlinthAreaMain'+j] = PlinthAreaMain;
																			jsonobjPDF['PlinthAreaCantilevered'+j] = PlinthAreaCantilevered;
																			jsonobjPDF['PlinthAreaTotal'+j] = PlinthAreaTotal;
																		}
																		j++;
																	}
																	/*
																		ValuationGeneral Details
																	*/
																	
																	jsonobjPDF['Marketability'] = AppraisalTable.ValuationGeneral.Marketability;
																	jsonobjPDF['PrevailingMarketRate'] = AppraisalTable.ValuationGeneral.PrevailingMarketRate;
																	jsonobjPDF['ValueLandPMR'] = AppraisalTable.ValuationGeneral.ValueLandPMR;
																	jsonobjPDF['Guidelinesqft'] = AppraisalTable.ValuationGeneral.Guidelinesqft;
																	jsonobjPDF['GuidelineValue'] = AppraisalTable.ValuationGeneral.GuidelineValue;
																	jsonobjPDF['UnitRatePrevMarket'] = AppraisalTable.ValuationGeneral.UnitRatePrevMarket;
																	
																	jsonobjPDF['Age1'] = ""
																	jsonobjPDF['LifeOfBuilding1'] = ""
																	jsonobjPDF['RateDepreciation1'] = ""
																	jsonobjPDF['RepEstRatePerSqFt1'] = ""
																	jsonobjPDF['RepEstimatedValue1'] = ""
																	jsonobjPDF['AmountDepreciation1'] = ""
																	
																	jsonobjPDF['Age2'] = ""
																	jsonobjPDF['LifeOfBuilding2'] = ""
																	jsonobjPDF['RateDepreciation2'] = ""
																	jsonobjPDF['RepEstRatePerSqFt2'] = ""
																	jsonobjPDF['RepEstimatedValue2'] = ""
																	jsonobjPDF['AmountDepreciation2'] = ""
																	
																	jsonobjPDF['Age3'] = ""
																	jsonobjPDF['LifeOfBuilding3'] = ""
																	jsonobjPDF['RateDepreciation3'] = ""
																	jsonobjPDF['RepEstRatePerSqFt3'] = ""
																	jsonobjPDF['RepEstimatedValue3'] = ""
																	jsonobjPDF['AmountDepreciation3'] = ""
																	
																	jsonobjPDF['Age4'] = ""
																	jsonobjPDF['LifeOfBuilding4'] = ""
																	jsonobjPDF['RateDepreciation4'] = ""
																	jsonobjPDF['RepEstRatePerSqFt4'] = ""
																	jsonobjPDF['RepEstimatedValue4'] = ""
																	jsonobjPDF['AmountDepreciation4'] = ""
																	
																	var valgenfloor = AppraisalTable.ValuationGeneral.LifeBuildingEstimated;
																	var valgenflrtot = [];
																	for(var valgenfloorlen = 0; valgenfloorlen < valgenfloor.length; valgenfloorlen++){
																		valgenflrtot.push(valgenfloor[valgenfloorlen].FloorNum);
																	}
																	var valgenflrtotlen = valgenflrtot.length;
																	var k= 1;
																	var valgentot = AppraisalTable.ValuationGeneral.LifeBuildingEstimated;
																	for(var valuationtot = 0; valuationtot < valgentot.length; valuationtot++){
																		var valuationfloor = AppraisalTable.ValuationGeneral.LifeBuildingEstimated[valuationtot].FloorNum;
																		if(k <= valgenflrtotlen){
																			Age = valgentot[valuationtot].Age;
																			LifeOfBuilding = valgentot[valuationtot].LifeOfBuilding;
																			RateDepreciation = valgentot[valuationtot].RateDepreciation;
																			RepEstRatePerSqFt = valgentot[valuationtot].RepEstRatePerSqFt;
																			RepEstimatedValue = valgentot[valuationtot].RepEstimatedValue;
																			AmountDepreciation = valgentot[valuationtot].AmountDepreciation;
																			
																			jsonobjPDF['Age'+k] = Age;
																			jsonobjPDF['LifeOfBuilding'+k] = LifeOfBuilding;
																			jsonobjPDF['RateDepreciation'+k] = RateDepreciation;
																			jsonobjPDF['RepEstRatePerSqFt'+k] = RepEstRatePerSqFt;
																			jsonobjPDF['RepEstimatedValue'+k] = RepEstimatedValue;
																			jsonobjPDF['AmountDepreciation'+k] = AmountDepreciation;
																		}
																		k++;
																	}
																	
																	jsonobjPDF['Floorfinish1'] = ""
																	jsonobjPDF['Floorfinish2'] = ""
																	jsonobjPDF['Floorfinish3'] = ""
																	jsonobjPDF['Floorfinish4'] = ""
																	
																	jsonobjPDF['SuperStructure1'] = ""
																	jsonobjPDF['SuperStructure2'] = ""
																	jsonobjPDF['SuperStructure3'] = ""
																	jsonobjPDF['SuperStructure4'] = ""
																	
																	jsonobjPDF['Roof1'] = ""
																	jsonobjPDF['Roof2'] = ""
																	jsonobjPDF['Roof3'] = ""
																	jsonobjPDF['Roof4'] = ""
																	
																	jsonobjPDF['Doors1'] = ""
																	jsonobjPDF['Doors2'] = ""
																	jsonobjPDF['Doors3'] = ""
																	jsonobjPDF['Doors4'] = ""
																	
																	jsonobjPDF['Windows1'] = ""
																	jsonobjPDF['Windows2'] = ""
																	jsonobjPDF['Windows3'] = ""
																	jsonobjPDF['Windows4'] = ""
																	
																	jsonobjPDF['Weatheringcourse1'] = ""
																	jsonobjPDF['Weatheringcourse2'] = ""
																	jsonobjPDF['Weatheringcourse3'] = ""
																	jsonobjPDF['Weatheringcourse4'] = ""
																	
																	
																	var classificationlength = AppraisalTable.ValuationGeneral.TableData;
																	for (var classification = 0; classification < classificationlength.length; classification++) {
																		var classificationname = AppraisalTable.ValuationGeneral.TableData[classification].Name;
																		if(classificationname == "Flooring"){
																			var floornum = AppraisalTable.ValuationGeneral.TableData[classification].FloorNum;
																			jsonobjPDF['Floorfinish'+floornum] = classificationlength[classification].SpecificationValue;
																		}
																		if(classificationname == "SuperStructure"){
																			var floornum = AppraisalTable.ValuationGeneral.TableData[classification].FloorNum;
																			jsonobjPDF['SuperStructure'+floornum] = classificationlength[classification].SpecificationValue;
																		}
																		if(classificationname == "Roof"){
																			var floornum = AppraisalTable.ValuationGeneral.TableData[classification].FloorNum;
																			jsonobjPDF['Roof'+floornum] = classificationlength[classification].SpecificationValue;
																		}
																		if(classificationname == "Doors"){
																			var floornum = AppraisalTable.ValuationGeneral.TableData[classification].FloorNum;
																			jsonobjPDF['Doors'+floornum] = classificationlength[classification].SpecificationValue;
																		}
																		if(classificationname == "Windows"){
																			var floornum = AppraisalTable.ValuationGeneral.TableData[classification].FloorNum;
																			jsonobjPDF['Windows'+floornum] = classificationlength[classification].SpecificationValue;
																		}
																		if(classificationname == "Weatheringcourse"){
																			var floornum = AppraisalTable.ValuationGeneral.TableData[classification].FloorNum;
																			jsonobjPDF['Weatheringcourse'+floornum] = classificationlength[classification].SpecificationValue;
																		}
																			
																	}
																	/*
																		Amenities Details
																	*/
																	
																	jsonobjPDF["Aluminum handrails"] = ""
																	jsonobjPDF["Aluminum works"] = ""
																	jsonobjPDF["Any other"] = ""
																	jsonobjPDF["Architectural Elevation works"] = ""
																	jsonobjPDF["Extra Steel/collapsible gates"] = ""
																	jsonobjPDF["Extra sinks and bath tub"] = ""
																	jsonobjPDF["False ceiling works"] = ""
																	jsonobjPDF["Glazed tiles"] = ""
																	jsonobjPDF["Interior decorations"] = ""
																	jsonobjPDF["Marble/ceramic tiles flooring"] = ""
																	jsonobjPDF["Open staircase"] = ""
																	jsonobjPDF["Ornamental Front / Pooja door"] = ""
																	jsonobjPDF["Paneling works"] = ""
																	jsonobjPDF["Portico"] = ""
																	jsonobjPDF["Separate Lumber Room"] = ""
																	jsonobjPDF["Separate Toiler Room"] = ""
																	jsonobjPDF["Separate water tank/sump"] = ""
																	jsonobjPDF["Sitout/Verandah with Steel grills"] = ""
																	jsonobjPDF["Trees, gardening"] = ""
																	jsonobjPDF["Wardrobes,showcases,wooden cupboards"] = ""
																	var bulidinglength = AppraisalTable.Amenities.Building
																	for (var build = 0; build < bulidinglength.length; build++) {
																			//if(AppraisalTable.Amenities.Building[build].DepreciationValue == undefined){AppraisalTable.Amenities.Building[build].DepreciationValue = ""}
																			if(AppraisalTable.Amenities.Building[build].DepreciationValue){
																			jsonobjPDF[AppraisalTable.Amenities.Building[build].Amenitiesname] = AppraisalTable.Amenities.Building[build].DepreciationValue
																			}																			
																			}
																	
																	/*
																		General Details
																	*/	
																	jsonobjPDF['ValuationID'] = AppraisalTable.ValuationID;
																	jsonobjPDF['TodayDate'] = formatted_date;
																	jsonobjPDF['ValuationPurpose'] = AppraisalTable.ValuationPurpose;
																	jsonobjPDF['DateofInspection'] = AppraisalTable.DateofInspection;
																	jsonobjPDF['ValuationDate'] = AppraisalTable.ValuationDate;
																	
																var genarray="";
														     	var Gentable = AppraisalTable.OwnerDetails.JointOwners;
														 for (var General = 0; General < Gentable.length; General++) {
															 if(Gentable[General].OwnerName==""||Gentable[General].OwnerName==null||Gentable[General].OwnerName==undefined){
															genarray="";
															}
															 else{
                                                                var  OwnerName = AppraisalTable.OwnerDetails.JointOwners[General].OwnerName;
																var	OwnerAddress = AppraisalTable.OwnerDetails.JointOwners[General].OwnerAddress;
																var	OwnerPhone = AppraisalTable.OwnerDetails.JointOwners[General].OwnerPhone;
																var	SharePercent = AppraisalTable.OwnerDetails.JointOwners[General].SharePercent
														genarray += OwnerName+', ' +OwnerAddress +', ' + OwnerPhone +', ' + SharePercent+'                                            \n     ';
														}
														 }
																	jsonobjPDF['JointOwners'] = genarray;
																	jsonobjPDF['ValuationDocs'] = AppraisalTable.ValuationDocs;
																	jsonobjPDF['BriefDesc'] = PropertyTable.BriefDesc;
																	jsonobjPDF['ValuationScope'] = AppraisalTable.ValuationScope;
																	jsonobjPDF['NameOfBank'] = AppraisalTable.NameOfBank;
																	jsonobjPDF['ReportForBankBranch'] = AppraisalTable.ReportForBankBranch;
																	/*
																		Property Description Details
																	*/
																	jsonobjPDF['DoorNumber'] = PropertyTable.Address.DoorNumber;
																	jsonobjPDF['StreetName'] = PropertyTable.Address.StreetName;
																	jsonobjPDF['AddArea'] = PropertyTable.Address.AddArea;
																	jsonobjPDF['City'] = PropertyTable.Address.City;
																	jsonobjPDF['State'] = PropertyTable.Address.State;
																	jsonobjPDF['Country'] = PropertyTable.Address.Country;
																	jsonobjPDF['Pincode'] = PropertyTable.Address.Pincode;
																	jsonobjPDF['PropertyArea'] = AppraisalTable.PropertyArea;
																	jsonobjPDF['AreaClassification'] = AppraisalTable.AreaClassification;
																	jsonobjPDF['EconomicClassification'] = AppraisalTable.EconomicClassification;
																	jsonobjPDF['SurveyNumber'] = AppraisalTable.RegnDetails.SurveyNumber;
																	jsonobjPDF['Location'] = PropertyTable.Location;
																	jsonobjPDF['Village'] = AppraisalTable.RegnDetails.Village;
																	jsonobjPDF['Zone'] = AppraisalTable.RegnDetails.Zone;
																	jsonobjPDF['SROLocation'] = AppraisalTable.RegnDetails.SROLocation;
																	jsonobjPDF['NoOfDwellingUnits'] = AppraisalTable.NoOfDwellingUnits;
																	/*
																		Statutory  Details
																	*/
																	jsonobjPDF['RestrictiveClause'] = AppraisalTable.Statutory.RestrictiveClause;
																	jsonobjPDF['GovtAuthorityID'] = AppraisalTable.Statutory.GovtAuthorityID;
																	jsonobjPDF['ReservedLand'] = AppraisalTable.Statutory.MarkedforGovtProj.ReservedLand;
																	jsonobjPDF['AgriLandConvPlots'] = AppraisalTable.Statutory.AgriLandConvPlots;
																	jsonobjPDF['PropTaxAssessmentNumber'] = AppraisalTable.Statutory.PropTaxAssessmentNumber;
																	jsonobjPDF['PropTaxAmount'] = AppraisalTable.Statutory.PropTaxAmount;
																	jsonobjPDF['PropTaxPayerName'] = AppraisalTable.Statutory.PropTaxPayerName;
																	jsonobjPDF['ElectricityNum'] = AppraisalTable.Statutory.ElectricityNum;
																	jsonobjPDF['AthenticityMap'] = AppraisalTable.Statutory.AthenticityMap;
																	jsonobjPDF['CommentsValuers'] = AppraisalTable.Statutory.CommentsValuers;
																	jsonobjPDF['ElectricityInNameOf'] =AppraisalTable.Statutory.ElectricityInNameOf;
																	jsonobjPDF['LandLocked'] = AppraisalTable.Statutory.LandLocked;
																	jsonobjPDF['LandUsageType'] = AppraisalTable.Statutory.LandUsageType;
																	jsonobjPDF['LandApprovedLayout'] = AppraisalTable.Statutory.LandApprovedLayout;
																	
																	/*
																		Summary Details
																	*/
																	jsonobjPDF['LandGLR'] =0;
																	jsonobjPDF['LandPMR'] =0;
																	jsonobjPDF['BuildingGLR'] =0;
																	jsonobjPDF['BuildingPMR'] =0;
																	jsonobjPDF['AmenitiesGLR']  =0;	
																	jsonobjPDF['AmenitiesPMR']  =0;
																	jsonobjPDF['ServiceGLR']  =0;	
																	jsonobjPDF['ServicePMR'] =0;
																	jsonobjPDF['AddRemark'] ="";	
																	jsonobjPDF['AddPMR'] =0;
																	jsonobjPDF['LessRemark'] ="";	
																	jsonobjPDF['LessPMR']  =0;
																	
																	
																	var ValSummary = AppraisalTable.SummaryDetails.ValuationSummary.TableData
																	
																	for (var ValSum = 0; ValSum < ValSummary.length; ValSum++) {
																	if(ValSummary[ValSum].Type=="Land"){
																		
																	jsonobjPDF['LandGLR'] = ValSummary[ValSum].TotalGlr ||0;	
																	jsonobjPDF['LandPMR'] = ValSummary[ValSum].TotalPMR ||0;	
																	}
																	else if(ValSummary[ValSum].Type=="Building"){
																	jsonobjPDF['BuildingGLR'] = ValSummary[ValSum].TotalGlr ||0;	
																	jsonobjPDF['BuildingPMR'] = ValSummary[ValSum].TotalPMR ||0	
																	}
																	else if(ValSummary[ValSum].Type=="Amenities"){
																	jsonobjPDF['AmenitiesGLR'] = ValSummary[ValSum].TotalGlr ||0;	
																	jsonobjPDF['AmenitiesPMR'] = ValSummary[ValSum].TotalPMR ||0;	
																	}
																	else if(ValSummary[ValSum].Type=="Service"){
																	jsonobjPDF['ServiceGLR'] = ValSummary[ValSum].TotalGlr ||0;	
																	jsonobjPDF['ServicePMR'] = ValSummary[ValSum].TotalPMR ||0	
																	}
																	else if(ValSummary[ValSum].Type=="Factors favouring for an Additional Value"){
																	jsonobjPDF['AddRemark'] = ValSummary[ValSum].Remark;	
																	jsonobjPDF['AddPMR'] = ValSummary[ValSum].TotalPMR ||0;	
																	}
																	else if(ValSummary[ValSum].Type=="Factors affecting marketability for lesser value"){
																	jsonobjPDF['LessRemark'] = ValSummary[ValSum].Remark;	
																	jsonobjPDF['LessPMR'] = ValSummary[ValSum].TotalPMR ||0;	
																	}
																	}
																	var Currentvalue = 0;
																	if(jsonobjPDF['LandGLR']!="" ||jsonobjPDF['LandGLR']!=undefined){
																		Currentvalue += parseInt(jsonobjPDF['LandGLR'])
																	}
																	if(jsonobjPDF['BuildingGLR']!=""||jsonobjPDF['BuildingGLR']!=undefined){
																		Currentvalue += parseInt(jsonobjPDF['BuildingGLR'])
																	}
																	if(jsonobjPDF['AmenitiesGLR']!=""||jsonobjPDF['AmenitiesGLR']!=undefined){
																		Currentvalue += parseInt(jsonobjPDF['AmenitiesGLR'])
																	}
																	if(jsonobjPDF['ServiceGLR']!=""||jsonobjPDF['ServiceGLR']!=undefined){
																		Currentvalue += parseInt(jsonobjPDF['ServiceGLR'])
																	}
																	jsonobjPDF['TotalGLR']= Currentvalue;
																	
																	var CurrentvaluePMR = 0;
																	if(jsonobjPDF['LandPMR']!="" ||jsonobjPDF['LandPMR']!=undefined){
																		CurrentvaluePMR += parseInt(jsonobjPDF['LandPMR'])
																	}
																	if(jsonobjPDF['BuildingPMR']!="" ||jsonobjPDF['BuildingPMR']!=undefined){
																		CurrentvaluePMR += parseInt(jsonobjPDF['BuildingPMR'])
																	}
																	if(jsonobjPDF['AmenitiesPMR']!="" ||jsonobjPDF['AmenitiesPMR']!=undefined){
																		CurrentvaluePMR += parseInt(jsonobjPDF['AmenitiesPMR'])
																	}
																	if(jsonobjPDF['ServicePMR']!="" ||jsonobjPDF['ServicePMR']!=undefined){
																		CurrentvaluePMR += parseInt(jsonobjPDF['ServicePMR'])
																	}
																	jsonobjPDF['TotalPMR1']= CurrentvaluePMR;
																	
																	var TotalvaluePMR = 0;
																	if(jsonobjPDF['TotalPMR1']!="" ||jsonobjPDF['TotalPMR1']!=undefined){
																		TotalvaluePMR += parseInt(jsonobjPDF['TotalPMR1'])
																	}
																	if(jsonobjPDF['AddPMR']!="" ||jsonobjPDF['AddPMR']!=undefined){
																		TotalvaluePMR += parseInt(jsonobjPDF['AddPMR'])
																	}
																	if(jsonobjPDF['LessPMR']!="" ||jsonobjPDF['LessPMR']!=undefined){
																		
																		TotalvaluePMR += parseInt(jsonobjPDF['LessPMR'])
																	}
																	
																	jsonobjPDF['TotalPMR2']= TotalvaluePMR;
															
																	
																	jsonobjPDF['GLR'] = AppraisalTable.SummaryDetails.ValuationSummary.TableData.GLR;
																	jsonobjPDF['PMR'] = AppraisalTable.SummaryDetails.ValuationSummary.TableData.PMR;
																	jsonobjPDF['TotalRecommendedValueGLR'] = AppraisalTable.SummaryDetails.ValuationSummary.TotalRecommendedValueGLR;
																	jsonobjPDF['TotalRecommendedValuePMR'] = AppraisalTable.SummaryDetails.ValuationSummary.TotalRecommendedValuePMR;
																	jsonobjPDF['CompositeRate'] = AppraisalTable.CompositeRate;
																	/*
																		Land Details
																	*/
																	jsonobjPDF['AsPerDeedDimensionNorth'] = AppraisalTable.LandDetails.AsPerDeed.DimensionNorth;
																	jsonobjPDF['AsPerDeedDimensionSouth'] = AppraisalTable.LandDetails.AsPerDeed.DimensionSouth;
																	jsonobjPDF['AsPerDeedDimensionEast'] = AppraisalTable.LandDetails.AsPerDeed.DimensionEast;
																	jsonobjPDF['AsPerDeedDimensionWest'] = AppraisalTable.LandDetails.AsPerDeed.DimensionWest;
																	jsonobjPDF['AsPerDeedExtentAsPerDeed'] = AppraisalTable.LandDetails.AsPerDeed.ExtentAsPerDeed;
																	jsonobjPDF['ActualDimensionNorth'] = AppraisalTable.LandDetails.Actual.DimensionNorth;
																	jsonobjPDF['ActualDimensionSouth'] = AppraisalTable.LandDetails.Actual.DimensionSouth;
																	jsonobjPDF['ActualDimensionEast'] = AppraisalTable.LandDetails.Actual.DimensionEast;
																	jsonobjPDF['ActualDimensionWest'] = AppraisalTable.LandDetails.Actual.DimensionWest;
																	jsonobjPDF['ActualExtentActual'] = AppraisalTable.LandDetails.Actual.ExtentActual;
																	//jsonobjPDF['CalculatedValue'] = AppraisalTable.LandDetails.CalculatedValue;
																	
																	var ExtentAPD = AppraisalTable.LandDetails.AsPerDeed.ExtentAsPerDeed;
																	var ExtentACT = AppraisalTable.LandDetails.Actual.ExtentActual;																	
																	if(ExtentAPD.includes("ft"))
																	{
																	 ExtentAPD = ExtentAPD.replace("ft","")
																	 ExtentAPD = ExtentAPD.trim()
																	}
																	if(ExtentAPD.includes("feet"))
																	{
																		ExtentAPD = ExtentAPD.replace("feet","")
																		ExtentAPD = ExtentAPD.trim()
																	}
																	if(ExtentACT.includes("ft"))
																	{
																	ExtentACT = ExtentACT.replace("ft","")
																	 ExtentACT = ExtentACT.trim()
																	}
																	if(ExtentACT.includes("feet"))
																	{
																	    ExtentACT = ExtentACT.replace("feet","")
																		ExtentACT = ExtentACT.trim()
																	}																	
																	if(ExtentAPD > ExtentACT)
																	{jsonobjPDF['CalculatedValue'] = AppraisalTable.LandDetails.Actual.ExtentActual}
																	else if(ExtentAPD < ExtentACT)
																	{jsonobjPDF['CalculatedValue'] = AppraisalTable.LandDetails.AsPerDeed.ExtentAsPerDeed}
																	console.log("CalculatedValue "+JSON.stringify(jsonobjPDF['CalculatedValue']))
																	jsonobjPDF['Sizeofplot'] = AppraisalTable.LandDetails.PlotSize;
																	jsonobjPDF['NorthSouth'] = AppraisalTable.LandDetails.PlotNorthSouthSize;
																	jsonobjPDF['EastWest'] = AppraisalTable.LandDetails.PlotEastWestSize;
																	jsonobjPDF['TotalExtent'] = AppraisalTable.LandDetails.PlotTotalExtent;
																	jsonobjPDF['Devofsurrondingarea'] = AppraisalTable.LandDetails.AreaSurroundDevelopment;																	
																	jsonobjPDF['FreqFlooding'] = AppraisalTable.LandDetails.FreqFlooding;
																	jsonobjPDF['CivicAmenities'] = AppraisalTable.LandDetails.Nearby;
																	jsonobjPDF['LevelTopography'] = AppraisalTable.LandDetails.LevelTopography;
																	jsonobjPDF['Shapeofland'] = AppraisalTable.LandDetails.LandShapeMeasure;
																	jsonobjPDF['CornerPlot'] = AppraisalTable.LandDetails.CornerPlot;
																	jsonobjPDF['TypeofRoad'] = AppraisalTable.LandDetails.TypeOfRoad;																	
																	jsonobjPDF['RoadFactilies'] = AppraisalTable.LandDetails.RoadFacility;																	
																	jsonobjPDF['WaterPotentially'] = AppraisalTable.LandDetails.WaterPotential;
																	jsonobjPDF['WidthofRoad'] = AppraisalTable.LandDetails.RoadWidth;
																	var width20feet = AppraisalTable.LandDetails.RoadWidth;																	
																	if(width20feet.includes("ft"))
																	{
																	 width20feet = width20feet.replace("ft","")
																	 width20feet = width20feet.trim()
																	}
																	if(width20feet.includes("feet"))
																	{
																	    width20feet = width20feet.replace("feet","")
																		width20feet = width20feet.trim()
																	}																	
																	if(width20feet > "20")
																	{jsonobjPDF['WidthofRoad20Ft'] = "Yes"}
																	else{jsonobjPDF['WidthofRoad20Ft'] = "No"}
																	jsonobjPDF['Undergrounsew'] = AppraisalTable.LandDetails.LandSewerage;
																	jsonobjPDF['PowerSupply'] = AppraisalTable.LandDetails.LandPowerSupply;
																	jsonobjPDF['SpecialRemarks'] = AppraisalTable.LandDetails.LandSpecialRemark;
																	
																	
																	/* Building Details*/
																	jsonobjPDF['BoundaryAsPerDeedPropertyNorth'] = AppraisalTable.BuildingDetails.AsPerDeed.PropertyNorth;
																	jsonobjPDF['BoundaryAsPerDeedPropertySouth'] = AppraisalTable.BuildingDetails.AsPerDeed.PropertySouth;
																	jsonobjPDF['BoundaryAsPerDeedPropertyEast'] = AppraisalTable.BuildingDetails.AsPerDeed.PropertyEast;
																	jsonobjPDF['BoundaryAsPerDeedPropertyWest'] = AppraisalTable.BuildingDetails.AsPerDeed.PropertyWest;
																	jsonobjPDF['BoundaryActualPropertyNorth'] = AppraisalTable.BuildingDetails.Actual.PropertyNorth;
																	jsonobjPDF['BoundaryActualPropertySouth'] = AppraisalTable.BuildingDetails.Actual.PropertySouth;
																	jsonobjPDF['BoundaryActualPropertyEast'] = AppraisalTable.BuildingDetails.Actual.PropertyEast;
																	jsonobjPDF['BoundaryActualPropertyWest'] = AppraisalTable.BuildingDetails.Actual.PropertyWest;
																	
																	/*
																		Services Details
																	*/
																	
																	jsonobjPDF["WaterSupplyArrangements"] = ""
																	jsonobjPDF["OpenWell"] = ""
																	jsonobjPDF["DeepBore"] = ""
																	jsonobjPDF["HandPump"] = ""
																	jsonobjPDF["Motor"] = ""
																	jsonobjPDF["CorporationTap"] = ""
																	jsonobjPDF["UndergroundLevelsump"] = ""
																	jsonobjPDF["OverheadWaterTank"] = ""
																	jsonobjPDF["DrainageArrangements"] = ""
																	jsonobjPDF["SepticTank"] = ""
																	jsonobjPDF["UndergroundSewerage"] = ""
																	jsonobjPDF["CompoundwallRMvalue"] = ""
																	jsonobjPDF["CompoundwallRSvalue"] = ""
																	jsonobjPDF["CompoundWallInRupees"] = ""
																	jsonobjPDF["Height"] = ""
																	jsonobjPDF["Length"] = ""
																	jsonobjPDF["TypeOfConstruct"] = ""
																	jsonobjPDF["PavementsRMvalue"] = ""
																	jsonobjPDF["PavementsRSvalue"] = ""
																	jsonobjPDF["PavementsMain"] = ""
																	jsonobjPDF["SteelGateRMvalue"] = ""
																	jsonobjPDF["SteelGateRSvalue"] = ""
																	jsonobjPDF["SteelGateMain"] = ""
																	jsonobjPDF["EBWaterDrainageDeposits"] = ""
																	jsonobjPDF["ElectricalFittings"] = ""
																	jsonobjPDF["TypeofWiring"] = ""
																	jsonobjPDF["NoofLightPTS"] = ""
																	jsonobjPDF["FanPTS"] = ""
																	jsonobjPDF["SparePlugPTS"] = ""
																	jsonobjPDF["AnyOtherItem"] = ""
																	jsonobjPDF["PlumbingInstallation"] = ""
																	jsonobjPDF["NoofWaterClosets"] = ""
																	jsonobjPDF["WashBasins"] = ""
																	jsonobjPDF["BathTubs"] = ""
																	jsonobjPDF["WaterMeter"] = ""
																	jsonobjPDF["AnyOtherFixtures"] = ""
																	jsonobjPDF["AnyOther"] = ""
																	jsonobjPDF["Total"] = ""
																	jsonobjPDF["ClassofFitting"] = ""
																	
																	var Serviceslength = AppraisalTable.SummaryDetails.Services
																	for (var Serv = 0; Serv < Serviceslength.length; Serv++) {
																			//console.log("AppraisalTable.Amenities.Building[build].DepreciationValue"   + AppraisalTable.Amenities.Building[build].DepreciationValue)
																			//console.log("Serviceslength[Serv].Servicesname"   + Serviceslength[Serv].Value)
																			//console.log("Serviceslength[Serv].Servicesname"   + parseInt(Serviceslength[Serv].Value))
																			if (Serviceslength[Serv].Value == 'undefined'){Serviceslength[Serv].Value=""}
																			var x = Serviceslength[Serv].Value 
																			jsonobjPDF[Serviceslength[Serv].Servicesname] = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
																		}																	
																	
																		
																	
																	try{
																		var fs = require('fs');
																		var path = require('path');
																		//var imageModule = new ImageModule(opts);
																		var Docxtemplater = require('docxtemplater');
																		var JSZip = require('jszip');
																		var PropertyType = jsonObj.PropertyType;
																		var LenderID = jsonObj.LenderID;
																		console.log("Property         "+JSON.stringify(PropertyType))
																		console.log("lender        "+JSON.stringify(LenderID))
																		db.collection("Template").find({LenderID:LenderID, PropertyType:PropertyType},{TemplateName:1, _id:0}, function(tempErr, tempResp)
																		{
																			console.log("Template Response = "+JSON.stringify(tempResp));
																			if(tempResp && tempResp.length > 0) Templatename = tempResp[0]["TemplateName"];
																			else if(PropertyType == "Building") Templatename = "BuildingTemplate";
																			else if(PropertyType == "Apartment") Templatename = "ApartmentTemplate";
																			else if(PropertyType == "Land") Templatename = "LandTemplate";
																			console.log("Templatename ="+Templatename);
																			var content = fs.readFileSync('C:\\inetpub\\wwwroot\\Data\\Templates\\' + Templatename + '.docx', 'binary');
																			var zip = new JSZip(content);
																			var doc = new Docxtemplater();
																			console.log("doc render Previous");
																			//doc.attachModule(imageModule)
																			doc.loadZip(zip);
																			console.log("jsonobjPDF ="+JSON.stringify(jsonobjPDF));
																			doc.setData(jsonobjPDF);
																			try {
																				 console.log("doc render");
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
																				 console.log("error in pdf");
																				throw error;
																			}

																			var buf = doc.getZip().generate({
																				type: 'nodebuffer'
																			});
																			console.log("creat doc");
																			console.log(ValuationID);
																			console.log(buf);
																			fs.writeFileSync('C:\\Data\\' + ValuationID + '.docx', buf);
																			
																			//fs.writeFileSync('C:\\inetpub\\wwwroot\\Data\\DOCS\\' + ValuationID + '.docx', buf);
																			//fs.writeFileSync('C:\\Data\\DOCS\\' + ValuationID + '.docx', buf);
																		  
																			var util = require('util'),
																				exec = require('child_process').exec,																				
																				child;
																			var test = "";
																			//var testt = "C:\\Data\\Devi2.docx";
																			//setTimeout(() => {
																			child = exec('C:\\Data\\convdocx2pdf.exe ' + test,
																				function(error, stdout, stderr) {
																					console.log(stdout);
																					console.log('STDOUT1' + test);
																					test = stdout;
																					console.log(stderr);
																					if (error == null) {
																						console.log('exec error: ' + error);
																					} else {
																						console.log('STDOUT2' + test);
																						res.send(test);
																						//console.log(jsonobjPDF['DateofValuation'] + "----------------------" + jsonobjPDF['DateofInspection']);
																					}
																				});
																			//},2000);
																		});
																	}catch(ex) { console.log("Last error = "+ex);}											
											//});
										});
									}
								});
							});
						}else {
                            console.log("Property Detailserr" + result1)
                        }
					});
				});
			}else {
				console.log("Entered createhtml.js else");
                res.send("0");
                console.log('No document(s) found with defined "find" criteria!');
            }
		});
		
		
	}catch (Ex) {
        console.log("connection error");
    }
});
module.exports = router;