var http = require("http");
var fs = require("fs")
var CaptureLog = require("./log.js");
capturelog = new CaptureLog();

var express = require('express');
var router = express.Router();
var custusrid="";
router.post('/', function(req, res, next) {
    try {
        var strBody = req.body;
        /*req.on("data", function(chunk) {
            strBody += chunk;
        });*/
        //req.on("end", function() {
        console.log("Received posted data: " + strBody);

        var jsonObj = strBody;
        var UserID = jsonObj.UserID;
        var RejValuation = jsonObj.ValuationID;
        var BorrowerID = jsonObj.BorrowerID;
        var PropertyID = jsonObj.PropertyID;
        var AppraiserID = jsonObj.AppraiserID;
        var ApproverID = jsonObj.ApproverID;
        var LenderID = jsonObj.LenderID;
        var OrgType = jsonObj.ApproverID;
        var ManagedBy = "";
        var chkcombExist = "";
		var ChkLastValuation="";
        var UserRole = jsonObj.UserRole;
		var customer_ID=""

		console.log(ApproverID+" "+UserRole);

        //ApproverID - OrgType 
        if (ApproverID == "Individual" && UserRole== "User") {
            ApproverID = AppraiserID;
            ManagedBy = UserID;
            chkcombExist = "{ \"BorrowerID\":\"" + BorrowerID + "\",\"PropertyID\":" + PropertyID + ",\"AppraiserID\":\"" + AppraiserID + "\" }";
			console.log(chkcombExist);
			ChkLastValuation={ManagedBy:UserID}
			custusrid=UserID;
			LenderID=UserID;
            chkcombExist = JSON.parse(chkcombExist);
        } else if (ApproverID == "Company" && UserRole== "User" ) {
            ApproverID = AppraiserID;
            AppraiserID = "";
            ManagedBy = UserID;
			LenderID=UserID;
			ChkLastValuation={ManagedBy:UserID}
            chkcombExist = "{ \"BorrowerID\":\"" + BorrowerID + "\",\"PropertyID\":" + PropertyID + ",\"ApproverID\":\"" + ApproverID + "\" }";
            custusrid=UserID;
			chkcombExist = JSON.parse(chkcombExist);
        }
        else if (ApproverID == "Individual" && UserRole == "Ind app without lender") {
            ManagedBy = UserID;
            ApproverID = UserID;
            AppraiserID = UserID;
			LenderID=LenderID;
			ChkLastValuation={ApproverID:UserID}
			custusrid=UserID;
            chkcombExist = "{ \"BorrowerID\":\"" + BorrowerID + "\",\"PropertyID\":" + PropertyID + ",\"ApproverID\":\"" + ApproverID + "\" }";
            chkcombExist = JSON.parse(chkcombExist);
        }
        else if (ApproverID == "Company" && UserRole == "Comp app without lender") {
            ManagedBy = UserID;
            ApproverID = UserID;
			LenderID = LenderID;
            AppraiserID = AppraiserID;
			custusrid = UserID;
			ChkLastValuation = {ApproverID:UserID}
            chkcombExist = "{ \"BorrowerID\":\"" + BorrowerID + "\",\"PropertyID\":" + PropertyID + ",\"ApproverID\":\"" + ApproverID + "\" }";
            chkcombExist = JSON.parse(chkcombExist);
        }

		console.log(JSON.stringify(chkcombExist)+"Comb Print");
        var CurrentDate = new Date();
        var ChkAppraiserID = "";
        var ChkApproverID = "";
        console.log(RejValuation);
        var MongoClient = require('mongodb');
        var propobj = {
            StatusChangeDate: '',
            Reason: '',
            ApprovalStatus: '',
            LenderID: '',
            AppraiserID: '',
            ApproverID: ''
        }

        //If RejValuation is Empty A New ValuationID is Created
        if (RejValuation == "") {
            console.log("Connected to Database");
            var db = req.db;
            var collection = db.collection('Appraisal');
            //Checking for BorrowerID-PropertyID-AppraiseID Combination 
            //If length is 0 New Valuation ID Will be Created
            collection.find(chkcombExist, function(err, obj) {
                console.log("No. of rows : " + obj.length);
                console.log("Checking Combination Exists OR not")
                if (obj.length == 0) {
                    console.log("Not Exist")
					console.log(custusrid+"LenderUD")
					var db2 = req.db;
					var collection2 = db.collection('User');
                    collection2.find({UserID:custusrid},function(err,result){
						if(err){
							console.log(err);
						}
						else if(result.length){
							console.log(JSON.stringify(result))
							result.forEach(function(doc){
								console.log("CustomerID "+doc.CustomerID);
								customer_ID=doc.CustomerID;
								var curryear="";
								var db3=req.db;
								var col3=db3.collection('Param');
								col3.find({ParamName:{$in:["YearStartDate","YearEndDate"]}},function(err3,res3){
									if(err3){
										console.log("0 No Data"+err3)
									}
									else if(res3.length){
										var stdate=""
										var enddate=""
										console.log(JSON.stringify(res3))
										res3.forEach(function(docc){
											if(docc.ParamName=="YearStartDate"){
												stdate=docc.ParamValue;
											}
											if(docc.ParamName=="YearEndDate"){
												enddate=docc.ParamValue;
											}
										})
										console.log("st date"+stdate)
										console.log("end date"+enddate)
										
										if(new Date(stdate)<=new Date() && new Date(enddate)>=new Date()){
											curryear=new Date(stdate).getFullYear();
											console.log(curryear+"Current Year");
										}
										collection.find(ChkLastValuation, {
											sort: {
												'ValuationID': -1
											},
											limit: 1
									}, function(err, docs) {
									if (err) {
										console.log(err)
										res.send('0');
									}
									if (docs == "") {
										ValuationID = customer_ID+"-"+curryear+"000001";
										console.log("Valuation ID 1 First Valuation");
									} else {
										docs.forEach(function(doc) {
											ValuationID = doc.ValuationID.replace(customer_ID+"-"+curryear,"");
											ValutaionID = parseInt(ValuationID, 10);
											ValuationID++;
											var Valuationint = ValuationID;
											strval = 6 - Valuationint.toString().length;
											newstring = "";
											for (i = 1; i <= strval; i++) {
												newstring = newstring + "0";
											}
											ValuationID = customer_ID+"-"+curryear+newstring+ Valuationint.toString();
											console.log("New ValuationID : " + ValuationID);
										});
									}
									console.log("Insert New Valuation With Default Data")
									collection.insert({
										"PropertyID": PropertyID,
										"BorrowerID": BorrowerID,
										"AppraiserID": AppraiserID,
										"ApproverID": ApproverID,
										"LenderID":LenderID,
										"AppraisalStatus": "Assigned",
										"AssignDate": CurrentDate, //datetime,
										"ModifiedBy": ManagedBy,
										"ManagedBy": ManagedBy,
										"ModifiedDate": CurrentDate, //datetime,
										"ValuationID": ValuationID,
										"ApprovalStatus": "New",
										"PricingStatus": "New",
										"AmenitiesStatus": "New",
										"MiscelaneousStatus":"New",
										"SummaryStatus": "New",
										"LocationStatus": "Completed",
										'ValuationStatus': 'true'
									}, function(err, results) {
										if (err) {
											var obj = {
												ValuationID: ValuationID,
												PropertyID: PropertyID,
												BorrowerID: BorrowerID,
												AssignedStatus: '0'
											}
											var jsonarr = JSON.stringify(obj)
											console.log("-----------Insert failed---------");
											res.send(jsonarr);
										} else {
											var obj = {
												ValuationID: ValuationID,
												PropertyID: PropertyID,
												BorrowerID: BorrowerID,
												AssignedStatus: '1'
											}
											var jsonarr = JSON.stringify(obj)
											console.log("Successfully inserted")
											capturelog.fnuserlog("\r\n\r\n Appraisal Creation -- Successfully Created - ValuationID : " + obj.ValuationID + ", PropertyID : " + obj.PropertyID + ", BorrowerID : " + obj.BorrowerID + ", Date :" + new Date() + ", UserID : " + UserID)
											res.send(jsonarr);
										}
									});
								});
							
										
										
									}
									else{
										console.log("0 No Data Found n param")
									}
								})
							})
						}
						else{
							console.log("No CustID not found for the USer")
						}
					})
                } else {
                    console.log("Combination Exists")
                    obj.forEach(function(doc) {
                        ValuationID = doc.ValuationID;
                    });
                    var obj = {
                        ValuationID: ValuationID,
                        PropertyID: PropertyID,
                        BorrowerID: BorrowerID,
                        AssignedStatus: '0'
                    }
                    var jsonarr = JSON.stringify(obj)
                    res.send(jsonarr);
                    console.log("Already Assigned")
                    capturelog.fnuserlog("\r\n\r\n Appraisal Creation -- Already Assigned - ValuationID : " + obj.ValuationID + ", PropertyID : " + obj.PropertyID + ", BorrowerID : " + obj.BorrowerID + ", Date :" + new Date() + ", UserID : " + UserID)
                }
            });
        } else {
            console.log("Rejected Records Will Enter Here")
            var db = req.db;
            var collection = db.get('Appraisal');
            //Retrieving AppraiserID for the RejValuation 
            collection.find({
                'ValuationID': RejValuation,
                'ValuationStatus': 'true'
            }, function(err, olddocs) {
                if (err) {
                    console.log("Error in Finding Last Rejected Record:" + err);
                } else {
                    console.log("Getting Property Approval Section Details")
                    olddocs.forEach(function(doc) {
                        propobj.StatusChangeDate = doc.PropertyApproval.StatusChangeDate;
                        propobj.Reason = doc.PropertyApproval.Reason;
                        propobj.ApprovalStatus = doc.PropertyApproval.ApprovalStatus;
                        propobj.LenderID = doc.PropertyApproval.LenderID;
                        propobj.AppraiserID = doc.PropertyApproval.AppraiserID;
                    })
                    var updcoll = db.get('Appraisal');
                    updcoll.update({
                        'ValuationID': RejValuation,
                        'ValuationStatus': 'true'
                    }, {
                        $set: {
                            ValuationStatus: 'false'
                        }
                    }, {
                        upsert: true
                    }, function(err, result) {
                        if (err) {
							console.log("Errror in 1st if: " + err)
						} else {
                            
							var ApproverExists = "false";
                            var coll1 = db.get('Appraisal');
                            coll1.find({
                                'ValuationID': RejValuation
                            }, function(err, activerec) {
                                activerec.forEach(function(doc) {
                                    if (ApproverID == doc.ApproverID) {
                                        ApproverExists = "true";
                                    }
                                });
								
								console.log("Checking the Previous Records to Match the Valuation is Assigned Previously")
								
                                if (OrgType == "Company") {
                                    AppraiserID = "";
                                    ApproverID = ApproverID;
                                } else {
                                    AppraiserID = ApproverID;
                                    ApproverID = ApproverID;
                                }
								
								console.log("AppraiserID" + AppraiserID);
								console.log("ApproverID" + ApproverID);
								
                                if (ApproverExists == "false") {
									console.log("ApproverExists" + ApproverExists);
                                    var col = db.get('Appraisal');
                                    col.insert({
                                        "PropertyID": PropertyID,
                                        "BorrowerID": BorrowerID,
                                        "AppraiserID": AppraiserID,
                                        "ApproverID": ApproverID,
										"LenderID":LenderID,
                                        "AppraisalStatus": "Assigned",
                                        "AssignDate": CurrentDate,
                                        "ModifiedBy": ManagedBy,
                                        "ManagedBy": ManagedBy,
                                        "ModifiedDate": CurrentDate,
                                        "ValuationID": RejValuation,
                                        "ApprovalStatus": "New",
                                        "PricingStatus": "New",
                                        "AmenitiesStatus": "New",
										"MiscelaneousStatus":"New",
                                        "SummaryStatus": "New",
                                        "LocationStatus": "Completed",
                                        'ValuationStatus': 'true',
                                        "PropertyApproval": {
                                            "StatusChangeDate": propobj.StatusChangeDate,
                                            "Reason": propobj.Reason,
                                            "ApprovalStatus": propobj.ApprovalStatus,
                                            "LenderID": propobj.LenderID,
                                            "AppraiserID": propobj.AppraiserID
                                        }
                                    }, function(err, results) {
                                        if (err) {
                                            var obj = {
                                                ValuationID: RejValuation,
                                                PropertyID: PropertyID,
                                                BorrowerID: BorrowerID,
                                                AssignedStatus: '0'
                                            }
                                            var jsonarr = JSON.stringify(obj)
                                            console.log("-----------Insert failed---------");
                                            res.send(jsonarr);
                                        } else {
                                            var obj = {
                                                ValuationID: RejValuation,
                                                PropertyID: PropertyID,
                                                BorrowerID: BorrowerID,
                                                AssignedStatus: '1'
                                            }
                                            var jsonarr = JSON.stringify(obj)
                                            console.log("Inserted Successfully For Approver Not Matching");
                                            capturelog.fnuserlog("\r\n\r\n Appraisal Creation -- Successfully Created - ValuationID : " + obj.ValuationID + ", PropertyID : " + obj.PropertyID + ", BorrowerID : " + obj.BorrowerID + ", Date :" + new Date() + ", UserID : " + UserID)
                                            res.send(jsonarr);
                                        }
                                    });
                                } else {
									console.log("ApproverExists" + ApproverExists);
									console.log("Updating Old Records status to True and setting the Appraiser ID" + ApproverExists);
                                    collection.update({
                                        'ValuationID': RejValuation,
                                        'ApproverID': jsonObj.AppraiserID
                                    }, {
                                        $set: {
                                            "AppraisalStatus": "Assigned",
											"AppraiserID":AppraiserID,
											"ApproverID":ApproverID,
                                            "ValuationStatus": "true",
                                            "PropertyApproval": {
                                                "StatusChangeDate": propobj.StatusChangeDate,
                                                "Reason": propobj.Reason,
                                                "ApprovalStatus": propobj.ApprovalStatus,
                                                "LenderID": propobj.LenderID,
                                                "AppraiserID": propobj.AppraiserID
                                            }
                                        }
                                    }, {
                                        upsert: true
                                    }, function(err, result) {
                                        if (err) {
                                            console.log("Errror in 1st if: " + err)
                                        } else {
                                            console.log("Updated Successfully Assigned Matching Approver Equals")
                                            console.log(result.nModified)
                                            var obj = {
                                                ValuationID: RejValuation,
                                                PropertyID: PropertyID,
                                                BorrowerID: BorrowerID,
                                                AssignedStatus: '1'
                                            }
                                            var jsonarr = JSON.stringify(obj)
                                            console.log("Inside If" + jsonarr)
                                            capturelog.fnuserlog("\r\n\r\n Appraisal Creation -- Successfully Created - ValuationID : " + obj.ValuationID + ", PropertyID : " + obj.PropertyID + ", BorrowerID : " + obj.BorrowerID + ", Date :" + new Date() + ", UserID : " + UserID)
                                            res.send(jsonarr);
                                        }
                                    });
                                }
                            })

                        }
                    });
                }
            })
        }
        // });
    } catch (ex) {
        console.dir(ex);
    }
});
module.exports = router;


function getCustID(cid,req){
	try{
console.log(cid+"Get cust id function")
	var db = req;
	var collection = db.collection('User');
	var customer_ID="";
	
	collection.find({UserID:cid},function(err,result){
		if(err){
			console.log(err);
		}
		else if(result.length){
			console.log(JSON.stringify(result))
			result.forEach(function(doc){
				console.log("CustomerID "+doc.CustomerID);
				customer_ID=doc.CustomerID;
				return customer_ID;
			})
		}
		else{
			console.log("No customer Id found");
			return "";
		}
	})
	
	}
	catch(ex){
		
		console.log(ex)
		return ""
	}
	
}