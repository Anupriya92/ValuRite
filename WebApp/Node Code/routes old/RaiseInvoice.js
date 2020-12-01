var http = require("http");
var express = require('express');

var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
newdate = year + "/" + month + "/" + day;

var CurrentDate = new Date();

//console.log(newdate = year + "/" + month + "/" + day+"newdate = year + "/" + month + "/" + day")

// var CurrentDate = new Date();
// CurrentDate.format("mm/dd/yy");
//console.log(CurrentDate.format("mm/dd/yy")+"onlydate")

//myDate.format("mm/dd/yy");

  
fs = require('fs');
var CaptureLog = require("./log.js");
capturelog = new CaptureLog();
var router = express.Router();

router.post('/', function(req, res, next) {
try
{
	    var jsonObj = req.body;
        var UserID = jsonObj.UserID;
        var LenderID = jsonObj.LenderID;
        var InvoiceAmt = jsonObj.InvoiceAmt;
        var ValuationID = jsonObj.ValuationID;
		 var Amount = jsonObj.Amount;
		var CustomerID=""; 
		var InvoiceNo="";
		var curryear="";
		
		console.log("UserID : "+UserID);
		console.log("LenderID : "+LenderID);
		console.log("InvoiceAmt : "+InvoiceAmt);
		console.log("ValuationID : "+ValuationID);
		// console.log(CurrentDate.format("mm/dd/yy")+"onlydate")
		 var Templatename = "invoice";

	var db = req.db;
	var Invoicecollection = db.get("Invoice");
	Invoicecollection.find({ "AppraiserID": UserID }, { fields: { InvoiceNo: 1, _id: 0 }, sort: { 'InvoiceNo': -1 }, limit: 1 }, function (err, docs) {
            if (err) {
                console.log(err);
                res.send("0");
            }
			else
			{
				console.log("Retrieving Customer ID from User Table")
				var db2=req.db;
				var UserCollection=db.get("User");
				
				UserCollection.find({UserID:UserID},{},function(err,usertableresult){
					if(err){
						console.log(err);
						res.send("0");
					}
					else if(usertableresult.length){
						
						usertableresult.forEach(function(userdoc){
							CustomerID=userdoc.CustomerID;
						})
						console.log("Got Customer  ID From User Table"+CustomerID)
						var db3=req.db;
						var col3=db3.collection('Param');
						console.log("Retrieving Finanicial Year from Param Table")
						col3.find({ParamName:{$in:["YearStartDate","YearEndDate"]}},function(err3,res3){
							if(err3){
								console.log(err3);
								res.send("0");
							}
							else if(res3.length){
								console.log("Got Finanicial Year from Param Table"+JSON.stringify(res3))
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
							
								if (docs == "") {
									InvoiceNo = CustomerID+"-"+curryear+"I000001";
								}
								else 
								{
									docs.forEach(function (doc) {
										console.log("doc" +JSON.stringify(doc))
										console.log("CustomerID"+CustomerID)
										//console.log("CustomerID"+CustomerID)
										InvoiceNo = doc.InvoiceNo.replace(CustomerID+"-"+curryear+"I","");
										console.log("Invoice Number After Replace"+InvoiceNo);
										InvoiceNo = InvoiceNo;
										console.log("Invoice Number After Int Convert"+InvoiceNo);
										InvoiceNo++;
										console.log("Invoice Number After Increment"+InvoiceNo);
										var InvoiceNoint = InvoiceNo;
										strval = 6 - InvoiceNoint.toString().length;
										console.log("string remaining to append"+strval);
										newstring = "";
										for (i = 1; i <= strval; i++) {
											newstring = newstring + "0";
										}
										InvoiceNo = CustomerID+"-"+curryear+"I"+newstring+ InvoiceNoint.toString();
										console.log("Final Invoice Number"+InvoiceNo);
									});
								} 
								console.log("InvoiceNo : "+InvoiceNo);
						
								Invoicecollection.insert(
								{    
									"InvoiceNo":InvoiceNo,
									"AppraiserID" : UserID,
									"LenderID" : LenderID,
									"TotalReceivedAmount":0,
									"AmountPending":InvoiceAmt,
									"InvoiceAmount":InvoiceAmt,
									"ModifiedDate" :CurrentDate,
									"InvoiceDate":CurrentDate,
									"ModifiedBy" : UserID
								}, function(err, result) 
								{
									if(err)
									{
										console.log(err);
										res.send("0");
										capturelog.fnuserlog("\r\n\r\n Invoice Creation -- FAILED  -- UserID : "+UserID+", Date :"+new Date()+", Error Occurrred "+err)	
									}
									else
									{
										ValuationID=ValuationID.split(',')
										 Amount = Amount.split(',')
										//console.log("Valuation ID"+ typeof ValuationID);
										for(i=0;i<ValuationID.length;i++){
											var AppColl=db.get("Appraisal")
											AppColl.update({
												'ValuationID':  ValuationID[i],
												'ValuationStatus': 'true'
											}, {
												$set: {InvoiceNo:InvoiceNo}
												}, function(err, results) {
													if (err) {
														capturelog.fnuserlog("\r\n\r\n AppraisalStatusUpdate -- Updation Failed -- ValuationID : " + GetValuationID + ", UpdatedStatus : " + GetAppraisalStatus + ", UserID : " + UserID + ", Date :" + CurrentDate + ", Error Occurred : " + err)
														console.log(err);
													} else {
														//res.send("1");
														//capturelog.fnuserlog("\r\n\r\n AppraisalStatusUpdate -- SUCCESS -- ValuationID : " + GetValuationID + ", UpdatedStatus : " + GetAppraisalStatus + ", UserID : " + UserID + ", Date :" + CurrentDate)
														console.log(results);
													}
												});
										}	
										console.log("Invoice Id Generated and New Invoice is created successfully");
										var obj={
											Invoicestatus:'1',
											InvoiceNo:InvoiceNo
										}
										var jsonarr=JSON.stringify(obj)
						var jsonobjPDF={};
						jsonobjPDF['InvoiceAmount'] = InvoiceAmt;
                        jsonobjPDF['PaymentDate'] = newdate;
                        jsonobjPDF['InvoiceNo'] = InvoiceNo;
                        jsonobjPDF['ValuationID'] = ValuationID;
                        jsonobjPDF['Amount'] = Amount;
					   
					   
                       

                    var db1 = req.db;
                        var coll1 = db.get('User');

                        
                        coll1.find({
                            'UserID': LenderID
                        }, {
                            fields: {
                                Address: 1,
                                _id: 0,
                                UserName: 1
                            }
                        }, function(err, result) {
                            if (err) {
                              
                                res.send("0");
                            } else if (result.length) {
                                

                                var AddressLine1 = (result[0].Address.AddressLine1);
                                var City = (result[0].Address.City);
                                var State = (result[0].Address.State);
                                var Country = (result[0].Address.Country);
                                var Pincode = (result[0].Address.Pincode);
                                var UserName = (result[0].UserName);
                               

                                jsonobjPDF['LenderID'] = LenderID;
                                jsonobjPDF['AddressLine1'] = AddressLine1;
                                jsonobjPDF['City'] = City;
                                jsonobjPDF['State'] = State;
                                jsonobjPDF['Country'] = Country;
                                jsonobjPDF['Pincode'] = Pincode;
                                jsonobjPDF['UserName'] = UserName;
                               

                                var coll2 = db.get('User');
                                coll2.find({
                                    'UserID': UserID
                                }, function(err, result) {
                                    if (err) {
                                        console.log(err);
                                        res.send("0");
                                    } else if (result.length) {
                                        
                                        var undchk;
                                        if (result[0].CompanyName != undchk && result[0].CompanyName != "") {
                                            jsonobjPDF["CompanyName"] = result[0].CompanyName;
                                            
                                        } else {
                                            jsonobjPDF["CompanyName"] = result[0].UserName;
                                           

                                        }

                                        var AppraiserAddressLine1 = result[0].Address.AddressLine1;
                                        var AppraiserCity = result[0].Address.City;
                                        var AppraiserState = result[0].Address.State;
                                        var AppraiserCountry = result[0].Address.Country;
                                        var AppraiserPincode = result[0].Address.Pincode;
                                       
                                     


                                        jsonobjPDF['AppraiserAddressLine1'] = AppraiserAddressLine1;
                                        jsonobjPDF['AppraiserCity'] = AppraiserCity;
                                        jsonobjPDF['AppraiserState'] = AppraiserState;
                                        jsonobjPDF['AppraiserCountry'] = AppraiserCountry;
                                        jsonobjPDF['AppraiserPincode'] = AppraiserPincode;
                                       

                                        var Docxtemplater = require('docxtemplater');
                                        var JSZip = require('jszip');

                                        var content = fs.readFileSync('C:\\inetpub\\wwwroot\\Data\\Templates\\' + Templatename + '.docx', 'binary');

                                        console.log("Template Read Successfullly");	

                                        var zip = new JSZip(content);

                                        var doc = new Docxtemplater();

                                        doc.loadZip(zip);
                                        
                                        jsonobjPDF["InvoiceTable"] = []
                                        for (var a = 0; a < ValuationID.length; a++) {
                                            var obj = {
                                                ValuationID: ValuationID[a],
                                                Amount: Amount[a]
                                            }
                                            jsonobjPDF["InvoiceTable"].push(obj)

                                        }

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
                                            console.log(JSON.stringify({error: e}));
                                            throw error;
                                        }

                                        var buf = doc.getZip().generate({
                                            type: 'nodebuffer'
                                        });
                                       
                                        fs.writeFileSync('C:\\inetpub\\wwwroot\\Data\\DOCS\\' + InvoiceNo + '.docx', buf);
										 var util = require('util'),
																		exec = require('child_process').exec,
																		child;
																		var test="";
																		child = exec('C:\\Data\\convdocx2pdf.exe '+InvoiceNo,
																		  function (error, stdout, stderr) {
																			console.log(stdout);
																			console.log('STDOUT' + test);
																			test=stdout;
																			
																			console.log(stderr);
																			if (error !== null) {
																			  console.log('exec error: ' + error);
																			}
																			else{
																				console.log('STDOUT' + test);
																			res.send(jsonarr);	
																				 // console.log(jsonobjPDF['DateofValuation']+"----------------------"+jsonobjPDF['DateofInspection']);
																			}
																		});	
                                        

                                    }
                                })


                                //capturelog.fnuserlog("\r\n\r\n InvoiceCreation -- CREATED SUCCESSFULLY  -- InvoiceNo : "+InvoiceNo+", UserID : "+id+", Date :"+new Date())

                            }
                        })

									}
								}
								);
							}
							else{
								console.log("No Data found in Param Table")
								res.send("0");
							}
						})
						
					}
					else{
						
					}
				})
				  
			}
	});
} catch (ex) {
        console.log(ex);
}	
});
module.exports = router; 
