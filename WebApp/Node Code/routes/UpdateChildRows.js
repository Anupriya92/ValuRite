var http = require("http");
var express = require('express');


fs = require('fs');
var router = express.Router();
router.post('/', function(req, res, next) {
 try
 {
	
	var jsonObj = req.body;
	
	var UserID=jsonObj.UserID;
    var ReceiptHistory=jsonObj.InvoiceRecpt;
    var InvoiceID=jsonObj.InvoiceID;
	var TotalPaidAmount=jsonObj.TotalPaidAmount;
	var AmountPending=jsonObj.AmountPending;
	
	var db=req.db;
  
	var coll = db.get('Invoice');
	
	console.log('InvoiceID:'+InvoiceID+',AppraisalID:'+UserID+',ReceiptHistory'+jsonObj.InvoiceRecpt)
	
 coll.update({'InvoiceNo':parseInt(InvoiceID, 10),'AppraiserID':UserID},{$set:{InvoiceDetails:ReceiptHistory,AmountPending:AmountPending,TotalReceivedAmount:TotalPaidAmount}},function (err, result) {
    if (err) {
		console.log(err);
		res.send("0");
    } else {
		res.send("1");
	} 
  })
}
catch( ex ) {
       console.dir(ex);
      }
})
module.exports = router;