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
		
		
		
		 var jsonobjExcel={};
	   // var Templatename="Exceloutstanding";
	// console.log(Templatename+" Templatename");	 
		 
		                   jsonobjExcel['LenderName']=LenderName;
				           console.log("LenderName :"+LenderName);
				 
					       jsonobjExcel['InvoiceAmount']= InvoiceAmount;
					       console.log("InvoiceAmount :"+InvoiceAmount);
					
					        jsonobjExcel['TotalReceivedAmount']=TotalReceivedAmount;
					        console.log("TotalReceivedAmount :"+ TotalReceivedAmount);
					
						    jsonobjExcel['AmountPending']=AmountPending;
						    console.log("AmountPending :"+AmountPending);
						
							jsonobjExcel['days30']=days30;
							 console.log("days30 :" +days30);
							
							 jsonobjExcel['days60']=days60;
							 console.log("days60 :" +days60);
							
							jsonobjExcel['days90']=days90;
							 console.log("days90 :" +days90);
							 
							 jsonobjExcel['days90gr']=days90gr;
							 console.log("days90gr :" +days90gr);
							 
		var XlsxTemplate = require('xlsx-template');
	
                   var newstr = LenderName.replace(/\s/g, "_");
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

                  
                    var dateformate = dt + '-' + month + '-' + year;
	// Load an XLSX file into memory
	 // fs.readFile(path.join('C:\\inetpub\\wwwroot\\Data\\Templates\\'+Templatename+'.xlsx'), function(err, data) {
    // var content = fs.readFile('C:\\inetpub\\wwwroot\\Data\\Templates\\'+Templatename+'.xlsx', 'binary')
	// fs.readFile(path.join('C:\\inetpub\\wwwroot\\Data\\Templates\\', 'templates', 'Exceloutstanding.xlsx'), function(err, data) {
		// console.log(__dirname)
		 //fs.readFile("routes\\Exceloutstanding.xlsx", 'utf8',function(err, data) {
		  fs.readFile('C:\\inetpub\\wwwroot\\Data\\Templates\\Exceloutstanding.xlsx', function(err, data) {	
			if(err){
				console.log("errrrr"+err)
				res.send("1");
			}
		 else{
				//console.log("dataaaaa"+data)
				
				 //Create a template
				var template = new XlsxTemplate(data);
				
				  // Replacements take place on first sheet
				var sheetNumber = 1;
				
				  // Set up some placeholder values matching the placeholders in the template
				var values = jsonobjExcel;

				
				 // Perform substitution
				template.substitute(sheetNumber, values);
				// Get binary data
				// var data = template.generate({type: 'uint8array'});
				var data = template.generate({type: 'nodebuffer'});
				 
				fs.writeFile('C:\\inetpub\\wwwroot\\Data\\'+newstr + dateformate+'.xlsx', data, function(err) {
				if(err) {
					return console.log(err);
				}
				else{
					console.log("The file was saved!");
					res.send("1")
				}
			}); 
						
		 }
        });
    } catch (Ex) {
        console.log("ex" + Ex.message);
    }
});
module.exports = router;