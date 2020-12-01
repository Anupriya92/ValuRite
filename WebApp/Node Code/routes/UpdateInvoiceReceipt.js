var http = require("http");
var express = require('express');


fs = require('fs');
var router = express.Router();
router.post('/', function(req, res, next) {
 try
 {
	
	var jsonObj = req.body;
	
	
	var UserID=jsonObj.UserID;
	var AmountPaid=jsonObj.AmountPaid;
    var AmountPending=jsonObj.AmountPending;
    var PaymentDate=jsonObj.PaymentDate;
    var PaymentDescription=jsonObj.PaymentDescription;
	var InvoiceID=jsonObj.InvoiceID;
	var jsonobjPDF={};

	var Templatename="invoicetempt";
	
	var db=req.db;
  
	var coll = db.get('Invoice');
	
	console.log('InvoiceID:'+typeof InvoiceID+',AppraisalID:'+UserID)
	console.log('InvoiceID:'+InvoiceID+',AppraisalID:'+UserID)
	 
 coll.find({'InvoiceNo':InvoiceID,'AppraiserID':UserID},{fields:{InvoiceDetails:1,_id:0,TotalReceivedAmount:1,LenderID:1,InvoiceNo:1,InvoiceAmount:1,UserID:1}},function (err, InvoiceResult) {
    if (err) {
		console.log(err);
		res.send("0");
    } else if (InvoiceResult.length) {
		console.log('InvoiceResult:'+JSON.stringify(InvoiceResult));
		 var jsonobj={}
		jsonobj["PaymentDescription"]=PaymentDescription;
		jsonobj["PaymentDate"]=PaymentDate;
		jsonobj["AmountPaid"]=AmountPaid;
		
		var TotalPaidAmount=parseInt(InvoiceResult[0].TotalReceivedAmount, 10)+parseInt(AmountPaid);
		//console.log("Total Amount Paid"+TotalPaidAmount);
		TotalPaidAmount=TotalPaidAmount.toString();
		
		var InvoiceAmount=parseInt(InvoiceResult[0].InvoiceAmount, 10);
		//console.log("InvoiceAmount"+InvoiceAmount);
		InvoiceAmount=InvoiceAmount.toString();
		
		var InvoiceNo=InvoiceResult[0].InvoiceNo;
		//console.log("InvoiceNo"+InvoiceNo);
		InvoiceNo=InvoiceNo.toString();
		
		var LenderID=InvoiceResult[0].LenderID;
		//console.log("LenderID"+LenderID);
		LenderID=LenderID.toString();
		
		console.log("LenderID "+LenderID);
	       var admindb = req.admin_db;
		   var coll1 = admindb.get('User');
	 coll1.find({'UserID':LenderID},function (err, result) {
     if (err) {
		  console.log(err);
		  res.send("0");
     } else if (result.length) {
		 console.log(result.length);
		 var AddressLine1=(result[0].Address.AddressLine1);
		//console.log("AddressLine1"+AddressLine1);
		AddressLine1=AddressLine1;
		
		var City=(result[0].Address.City);
		//console.log("City"+City);
		City=City;
		
		var State=(result[0].Address.State);
		//console.log("State"+State);
		State=State;
		
		var Country=(result[0].Address.Country);
		//console.log("Country"+Country);
		Country=Country;
		
		var Pincode=(result[0].Address.Pincode);
		//console.log("Pincode"+Pincode);
		Pincode=Pincode;
		
		LenderID=result[0].UserName;
		
		var admindb = req.admin_db;
		var coll2 = admindb.get('User');
		 coll2.find({'UserID':UserID},{fields:{Address:1,_id:0,AddressLine1:1,City:1,State:1,Country:1,Pincode:1,CompanyName:1,UserName:1}},function (err, result) {
     if (err) {
		  console.log(err);
		  res.send("0");
     } else if (result.length) {
		 //console.log('Found:', result[0]);
		 
		var ApprseAddressLine1=(result[0].Address.AddressLine1);
		 //console.log("AddressLine1: "+ApprseAddressLine1);
		ApprseAddressLine1=ApprseAddressLine1;
		
		var ApprseCity=(result[0].Address.City);
		 //console.log("City: "+ApprseCity);
		ApprseCity=ApprseCity;
		
		var ApprseState=(result[0].Address.State);
		 //console.log("State: "+ApprseState);
		ApprseState=ApprseState;
		
		var ApprseCountry=(result[0].Address.Country);
		 //console.log("Country"+ApprseCountry);
		ApprseCountry=ApprseCountry;
		
		var ApprsePincode=(result[0].Address.Pincode);
		// console.log("Pincode"+ApprsePincode);
		ApprsePincode=ApprsePincode;
		
		 var CompanyName=(result[0].CompanyName);
		// console.log("CompanyName: "+CompanyName);
		 CompanyName=CompanyName;
		
		var undchk;
		var InvoiceDetArr=[];
		
		if(InvoiceResult[0].InvoiceDetails!=undchk && InvoiceResult[0].InvoiceDetails!=null){
			InvoiceDetArr=InvoiceResult[0].InvoiceDetails;
			InvoiceDetArr.push(jsonobj);			
		}
		else{
			InvoiceDetArr.push(jsonobj);
		}
		 
		 if(result[0].CompanyName!=undchk){
			jsonobj["CompanyName"]=result[0].CompanyName;
				console.log("CompanyName"+CompanyName);		
		}
		else{
			jsonobj["CompanyName"]=result[0].UserName;
			console.log("UserName"+UserName);	
		}
		 
		console.log('Added Json:', JSON.stringify(InvoiceDetArr));
		
		var Colupd = db.get('Invoice');
		Colupd.update({'InvoiceNo':InvoiceID,'AppraiserID':UserID},{$set:{InvoiceDetails:InvoiceDetArr,AmountPending:AmountPending,TotalReceivedAmount:TotalPaidAmount}},function(upderr,updresult){
			if(upderr){
				console.log("Update Error"+upderr);
				res.send("0");
			}
			else{
				console.log("Data available");
				 jsonobjPDF['ReceivedAmount']=TotalPaidAmount;
				 console.log("TotalPaidAmount :"+TotalPaidAmount);
				 
					jsonobjPDF['InvoiceAmount']= InvoiceAmount;
					console.log("InvoiceAmount :"+InvoiceAmount);
					
					jsonobjPDF['PaymentDescription']=PaymentDescription;
					console.log("PaymentDescription :"+ PaymentDescription);
					
						jsonobjPDF['PaymentDate']=PaymentDate;
						console.log("PaymentDate :"+PaymentDate);
						
							jsonobjPDF['AmountPaid']=AmountPaid;
							console.log("AmountPaid :"+AmountPaid);
							
							jsonobjPDF['InvoiceNo']=InvoiceID;
							console.log("InvoiceNo :" +InvoiceID);
							
							jsonobjPDF['LenderID']=LenderID;
							console.log("LenderID :" +LenderID);
							
							jsonobjPDF['LenderAddress']=AddressLine1;
							console.log("LenderAddress :" +AddressLine1);
							
							jsonobjPDF['LenderCity']=City;
							console.log("LenderCity :" +City);
							
							jsonobjPDF['LenderState']=State;
							console.log("LenderState :" +State);
							
							jsonobjPDF['LenderCountry']=Country;
							console.log("LenderCountry :" +Country);
							
							jsonobjPDF['LenderPincode']=Pincode;
							console.log("LenderPincode :" +Pincode);
							
							jsonobjPDF['ApprsePincode']=ApprsePincode;
							console.log("ApprsePincode :" +ApprsePincode);
							
							jsonobjPDF['ApprseAddressLine1']=ApprseAddressLine1;
							console.log("ApprseAddressLine1 :" +ApprseAddressLine1);
							
							jsonobjPDF['ApprseCity']=ApprseCity;
							console.log("ApprseCity :" +ApprseCity);
							
							jsonobjPDF['ApprseState']=ApprseState;
							console.log("ApprseState :" +ApprseState);
							
							jsonobjPDF['ApprseCountry']=ApprseCountry;
							console.log("ApprseCountry :" +ApprseCountry);
							
							jsonobjPDF['CompanyName']=CompanyName;
							console.log("CompanyName :" +CompanyName);
							
							console.log("Data available 10");
							
							var Docxtemplater = require('docxtemplater');
																		var JSZip = require('jszip');
																		
																		var content = fs
																			.readFileSync('C:\\inetpub\\wwwroot\\Data\\Templates\\'+Templatename+'.docx', 'binary');

																		console.log("Template Read Successfullly");	
																			
																		var zip = new JSZip(content);

																		var doc = new Docxtemplater();
																		
																		// doc.attachModule(imageModule)
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
																		fs.writeFileSync('C:\\inetpub\\wwwroot\\Data\\DOCS\\'+InvoiceID+'.docx', buf);
																		console.log("Document Populated with real data");	///
							
							                                                var util = require('util'),
																			exec = require('child_process').exec,
																			child;
																		var test="";
																		child = exec('C:\\Data\\convdocx2pdf.exe '+InvoiceID,
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
																				res.send(test);	
																				 // console.log(jsonobjPDF['DateofValuation']+"----------------------"+jsonobjPDF['DateofInspection']);
																			}
																		});		
				
			// console.log('Updated', result);
				// res.send("1");
			}
		})
	 }
		 })
		 }
	  })
	} else {
		res.send("0");
		console.log("Failed in the 1st IF")
		console.log('No document(s) found with defined "find" criteria!');
    }
  })
}
catch( ex ) {
       console.dir(ex);
      }
})
module.exports = router;