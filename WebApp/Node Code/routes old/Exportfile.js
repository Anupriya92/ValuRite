var http = require("http");
var express = require('express');
var express = require('mongodb');
var moment = require('moment');
var url1 = require('url');
var htmlToPdf = require('html-to-pdf');
var request = require('request');

//Module to write log file
var CaptureLog = require("./log.js");
capturelog = new CaptureLog();

var d = new Date();
var datetime = moment().format('DD-MM-YYYY');

var express = require('express');
var router = express.Router();
router.post('/', function(req, res, next) {
    try {
            var strBody = req.body;
            /*req.on("data", function (chunk) {
                strBody += chunk;
            });*/
            //req.on("end", function () {
                var jsonObj = strBody;
                var fromdate = jsonObj.fromdate;
                var todate = jsonObj.todate;
                var ftype = jsonObj.ftype;
                var UserID = jsonObj.UserID;
				var ResObj=[];
				var obj={
					propID:[]
				};
                console.log(ftype + " File Type");
                console.log(fromdate + "<--From Date\n" + todate + "<--To Date");
				var reqstatus="";
				//Writing to the log file 
				// capturelog.fnuserlog("Exporting Valuation Details -- Requested -- FileType : "+ftype+" RequestedBy : "+UserID+"Date Range - (From : "+fromdate+" ,To : "+todate+" )")
				reqstatus="Before DB Call";
				err="none";
				writelog(err,ftype,UserID,fromdate,todate,reqstatus)
				
                    console.log("Connected to Database");
					var db=req.db;
                    var coll = db.get('Appraisal');
                    // db.mycollection.find({ "dt" : { "$gte" : ISODate("2013-10-01T00:00:00Z"), "$lt" : ISODate("2013-10-02T00:00:00Z") }})
                    coll.find({ "ModifiedDate": { "$gte": new Date(fromdate), "$lt": new Date(todate) } },function (err, result) {
                        if (err) {
                            console.log('Error' + err)
							res.send("0");
							reqstatus="Getting Values from DB";
							writelog(err,ftype,UserID,fromdate,todate,reqstatus)
                        }
                        else {
                            if (result.length) {
								err="none"
								reqstatus="Getting Values from DB";
								var i=0;
								var j=0;
								writelog(err,ftype,UserID,fromdate,todate,reqstatus)
								console.log("before  For each")
								//console.log(typeof result)
								console.log(result.length+"b4" );
								result.forEach(function(doc){
									var propcol=db.get("Property");
									propcol.find({PropertyID:doc.PropertyID},{_id:0,PropertyID:0},function(err,docss){
										if(err){
											console.log(err+" Error Occurred")
										}else{
											//console.log(docss[0]+" docs" + doc.PropertyID)
											//result.push(docss[0]);
											str = JSON.stringify(result[j]).slice(0, -1);
											str=str+', "LocationDetails" : '+JSON.stringify(docss[0])+'}'
											//console.log(str);
											str=JSON.parse(str);
											ResObj.push(str);
											j++;
											//console.log(j+"J val");
											if(j==result.length){
												//res.end(JSON.stringify(ResObj))
												generateFile(ResObj,fromdate,todate,ftype,UserID,res,db);
											}
										}
									});
									i++;
								});
                            }
                            else {
                                console.log('result is ' + result);
                                res.send("0");
                            }
                        }
                    });
            //});
    }
    catch (exp) {

    }
});
module.exports = router;
/************Capturing log details**************/
		function writelog(err,ftype,UserID,fromdate,todate,reqstatus)
		{
			capturelog.fnuserlog("\r\nFile Export -- Requested -- ERR : "+err+" , FileType : "+ftype+" , RequestedBy : "+UserID+" , Date Range - (From : "+fromdate+" ,To : "+todate+" ) , Status : "+reqstatus)
		}
		
function generateFile(ResObj,fromdate,todate,ftype,UserID,res,db){
	var json2csv = require('json2csv');
	var js2xmlparser = require("js2xmlparser");
	var json2xls = require('json2xls');
	var jsonfile = require('jsonfile');
	var fs = require('fs');
	var MongoClient = require('mongodb');
	var splitfname1 = fromdate.split('T')
                                var splitfname2 = todate.split('T')
                                var randomstr = (Math.floor(Math.random() * 1000)).toString();
                                var fname = splitfname1[0] + "_To_" + splitfname2[0] + "_" + UserID + "_" + randomstr;
                                // var jsonstring = JSON.stringify(ResObj);
                                // console.log(jsonstring)

                                var ExcelFields = [];
                                var CustomFieldNames = [];
                                var ParamIDs = [];
									
                                    var coll1 = db.get('Param');
                                    coll1.find({ 'ParamName': 'ExcelHeader' },function (err1, docs) {
                                        if (err1) {
                                            console.log("Error in retrieving ExcelHeader Data from Param Collection")
                                            res.send("0");
											reqstatus="Getting EXCEL Field Values from DB";
											writelog(err1,ftype,UserID,fromdate,todate,reqstatus)
                                        }
                                        else {
											err1="none";
											reqstatus="Getting Field Values from DB";
											writelog(err1,ftype,UserID,fromdate,todate,reqstatus);
											
                                            console.log(docs.length + " Fields in the Document");
                                            docs.forEach(function (doc) {
                                                ExcelFields.push(doc.ParamValue);
                                                ParamIDs.push(doc.ParamID)
                                            })

                                            var fields1 = ExcelFields;
                                            console.log(ExcelFields);
											
                                                var coll2 = db.get('Param');
                                                coll2.find({ 'ParentParamID': { '$in': ParamIDs } },function (err2, docs) {
                                                    if (err2) {
														reqstatus="Getting Custom Field Values from DB";
														writelog(err2,ftype,UserID,fromdate,todate,reqstatus);
														console.log("Error in retrieving Data from Param Collection")
                                                        res.send("0");
                                                    }
                                                    else {
														err2="none";
														reqstatus="Getting Custom Field Values from DB";
														writelog(err2,ftype,UserID,fromdate,todate,reqstatus);
                                                        docs.forEach(function (doc) {
                                                            CustomFieldNames.push(doc.ParamValue);
                                                        })
                                                        console.log(CustomFieldNames);
                                                        var fieldNames1 = CustomFieldNames;
                                                        if (ftype == "csv") {
                                                            json2csv({ data: ResObj, fields: fields1,fieldNames:fieldNames1, excelStrings: true ,defaultValue :"N/A"}, function (err, csv) {
                                                                if (err) console.log(err);
                                                                //replacing Smartquotes(“”‘’) with single quote (`)
                                                                csv = csv.replace(/[“”‘’]/g, "`");
                                                                //console.log(csv+"123123")
                                                                fs.writeFile("C:/inetpub/wwwroot/Data/" + fname + ".csv", csv, function (err) {
                                                                    if (err) throw err;
                                                                    console.log('file saved');
                                                                });
                                                            });
                                                            setTimeout(function () {
                                                                res.send(fname);
																err2="none"
																reqstatus="File Created";
																writelog(err2,ftype,UserID,fromdate,todate,reqstatus);
                                                            }, 3000)
															
                                                            // res.end(fname);
                                                        }
                                                        else if (ftype == "xls") {
                                                            //var xls = json2xls(ResObj, { fields: fields1, style: 'C:\\Data\\nodedemo\\node_modules\\json2xls\\node_modules\\excel-export\\example\\styles.xml' });
															var xls = json2xls(ResObj, {fields: fields1});
                                                            //console.log(xls);
                                                            fs.writeFileSync("C:/inetpub/wwwroot/Data/" + fname + ".xlsx", xls, 'binary');
                                                            res.send(fname)
															err2="none"
															reqstatus="File Created";
															writelog(err2,ftype,UserID,fromdate,todate,reqstatus);
                                                        }
                                                        else if (ftype == "xml") {
                                                            //Maps Each array Elements
                                                            var options = {
                                                                arrayMap: {
                                                                    Root: "Application"
                                                                }
                                                            };
                                                            console.log(ftype + "-- Type of File Requested")
                                                            var Jsonstring = JSON.stringify(ResObj);
                                                            var a = js2xmlparser("Root", Jsonstring, options)
                                                            console.log(a);
                                                            fs.writeFile("C:/inetpub/wwwroot/Data/" + fname + ".xml", a, function (err) {
                                                                res.send(fname);
                                                            })
															err2="none"
															reqstatus="File Created";
															writelog(err2,ftype,UserID,fromdate,todate,reqstatus);
                                                        }
                                                        else if (ftype == "pdf") {
                                                            res.send("");
															err2="none"
															reqstatus="File Created";
															writelog(err2,ftype,UserID,fromdate,todate,reqstatus);
                                                        }
                                                        else if (ftype == "json") {
                                                            console.log("Json" + ftype)
                                                            var file = "C:/inetpub/wwwroot/Data/" + fname + ".json"
                                                            var obj = ResObj;
                                                            console.log("before")
                                                            jsonfile.writeFileSync(file, obj, { spaces: 5 })
                                                            console.log("After")
                                                            res.send(fname);
															err2="none"
															reqstatus="File Created";
															writelog(err2,ftype,UserID,fromdate,todate,reqstatus);
                                                        }
                                                    }
                                                })

                                        }

                                    })
}
