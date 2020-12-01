var http = require("http");
var express = require('express');


fs = require('fs');
var router = express.Router();
router.post('/', function(req, res, next) {
 try
 {
	
	var jsonObj = req.body;
	 var UserName = jsonObj.UserName;
	  var LenderName = jsonObj.LenderName;
	   var AppraiserID = jsonObj.UserID;
	  var InvoiceAmount = jsonObj.InvoiceAmount;
	    var TotalReceivedAmount = jsonObj.TotalReceivedAmount;
		var AmountPaid=jsonObj.AmountPaid;
		 var AmountPending = jsonObj.AmountPending;
		 var days30=jsonObj.days30;
		var days60=jsonObj.days60;
        var days90=jsonObj.days90;
		var days90gr=jsonObj.days90gr;
		var InvoiceID=jsonObj.InvoiceID;
		// var date=new Date();
		
		 var jsonobjPDF={};
		 
		   console.log(jsonObj);
		   
	
	    var Templatename="outstanding";
	console.log(Templatename+" Templatename");
							
				         jsonobjPDF['LenderName']=LenderName;
				         console.log("LenderName :"+LenderName);
				 
					      jsonobjPDF['InvoiceAmount']= InvoiceAmount;
					      console.log("InvoiceAmount :"+InvoiceAmount);
					
					       jsonobjPDF['TotalReceivedAmount']=TotalReceivedAmount;
					      console.log("TotalReceivedAmount :"+ TotalReceivedAmount);
					
						 jsonobjPDF['AmountPending']=AmountPending;
						  console.log("AmountPending :"+AmountPending);
						
							 // jsonobjPDF['InvoiceDate']=InvoiceDate;
							 // console.log("InvoiceDate :"+InvoiceDate);
							
							// jsonobjPDF['InvoiceNo']=InvoiceNo;
							// console.log("InvoiceNo :" +InvoiceNo);
							
							jsonobjPDF['days30']=days30;
							 console.log("days30 :" +days30);
							
							 jsonobjPDF['days60']=days60;
							 console.log("days60 :" +days60);
							
							jsonobjPDF['days90']=days90;
							 console.log("days90 :" +days90);
							 
							 jsonobjPDF['days90gr']=days90gr;
							 console.log("days90gr :" +days90gr);
							
							
							 var Docxtemplater = require('docxtemplater');
																		 var JSZip = require('jszip');
																		
																		 var content = fs
																			 .readFileSync('C:\\inetpub\\wwwroot\\Data\\Templates\\'+Templatename+'.docx', 'binary');

																		 console.log("Template Read Successfullly");	
																			
																		 var zip = new JSZip(content);

																		 var doc = new Docxtemplater();
																		
																		
																		 doc.loadZip(zip);
																		 doc.setData(jsonobjPDF);

																		try {
																			 doc.render()
																		 }
																		 catch (error) {
																		var e = {
																				message: error.message,
																				 name: error.name,
																				 stack: error.stack,
																				 properties: error.properties,
																			 }
																			 console.log(JSON.stringify({error: e}));
																			 throw error;
																	 }
																		
																		 var buf = doc.getZip().generate({type: 'nodebuffer'});
																		 console.log("Document Populated with real data before");
																		 
																		 var newstr = LenderName;
 
                                                                          newstr = newstr.replace(/\s/g, "_");
 
                                                                          console.log(newstr);
																		  
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
                                                                           var dateformate = dt + '-' + month + '-' + year;
																		
																		 fs.writeFileSync('C:\\inetpub\\wwwroot\\Data\\DOCS\\'+ newstr + dateformate +'.docx', buf);
																		 console.log("Document Populated with real data");	
							                                          
							                                                var util = require('util'),
																		 exec = require('child_process').exec,
																			 child;
																		 var test="";
																		  console.log(newstr);
																		 
																		 child = exec('C:\\data\\convdocx2pdf.exe '+ newstr + dateformate,
																		  function (error, stdout, stderr) {
																		    console.log(stdout);
																			 console.log('STDOUT' + test);
																			 test=stdout;
																			
																			 console.log(stderr);
																			 if (error !== null) {
																			  console.log('exec error: ' + error);
																			 }
																			 else{
																			
																				 res.send(test);	
																				
																			 }
																		 });	
		
    } catch (ex) {
        console.dir(ex);
    }
})
module.exports = router;