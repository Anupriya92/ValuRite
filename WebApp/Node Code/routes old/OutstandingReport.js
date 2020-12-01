var http = require("http");
var express = require('express');


fs = require('fs');
var router = express.Router();
router.post('/', function(req, res, next) {
    try {
        var jsonObj = req.body;
        var LenderID = jsonObj.LenderID;
        var UserID = jsonObj.UserID;
        var AppraiserID = jsonObj.UserID;
        var UserName = jsonObj.UserName;
        var TotalReceivedAmount = jsonObj.TotalReceivedAmount;
        var AmountPending = jsonObj.AmountPending;
        var InvoiceNo = jsonObj.InvoiceNo;
        var InvoiceAmount = jsonObj.InvoiceAmount;
        var CreatedByUserid = jsonObj.CreatedByUserid;
        var finalresult = []
		var jsonobjPDF={};
        // var UserType=jsonObj.UserType;

        console.log(jsonObj);
		
        var d1 = new Date();
        d1.setDate(d1.getDate() - 30);
        console.log(d1.toLocaleString())

        var d2 = new Date();
        d2.setDate(d2.getDate() - 60);
        console.log(d2.toLocaleString())

        var d3 = new Date();
        d3.setDate(d3.getDate() - 90);
        console.log(d3.toLocaleString())
		
        var db = req.db;
        var col1 = db.get('Invoice');

        col1.find({
            'AppraiserID': UserID
        }, {
            fields: {
                TotalReceivedAmount: 1,
                _id: 0,
                AmountPending: 1,
                InvoiceNo: 1,
                InvoiceAmount: 1,
                LenderID: 1,
                InvoiceDate: 1
            },
        sort : { 'LenderID' : 1 } },function(err, result) {
            if (err) {
                console.log(err);
                res.send("0");
            } else if (result.length) {
                console.log('Found:', result[0]);
                //console.log(result[0].LenderID);

                var count = 0;
                result.forEach(function(InvoiceTable) {
					console.log("LenID"+InvoiceTable.LenderID)
                    var col2 = db.get('User');
                    col2.find({
                        'UserID': InvoiceTable.LenderID
                    }, {
                        fields: {
                            UserName: 1,
                            _id: 0
                        }
                    }, function(err, userresult) {
                        if (err) {
                            console.log(err);
                            res.send("0");
                        } else if (userresult.length) {
							
                            console.log('Found:', userresult[0]);
                            var obj = {}
                            obj["LenderName"] = userresult[0].UserName;
                            obj["InvoiceAmount"] = InvoiceTable.InvoiceAmount;
                            obj["TotalReceivedAmount"] = InvoiceTable.TotalReceivedAmount;
                            obj["AmountPending"] = InvoiceTable.AmountPending;
                            obj["InvoiceDate"] = InvoiceTable.InvoiceDate;
							obj["InvoiceNo"]= InvoiceTable.InvoiceNo;
                            obj["30days"] = d1.toLocaleString();
                            obj["60days"] = d2.toLocaleString();
                            obj["90days"] = d3.toLocaleString();
						

                            finalresult.push(obj)
                            console.log(obj);
                           
                            console.log(result.length + "Length")
                            console.log(result.length - 1 == count)
                            if (result.length - 1 == count) {
                                var jsonarr = JSON.stringify(finalresult)
                                console.log(jsonarr);
                                res.send(jsonarr);
                            }
							count++;

						
                        } else {
							res.end("0");
                            console.log("No Documents found");
                        }
                    })
                })


            } else {
				res.end("0");
                console.log("No Documents found");
            }


        })

    } catch (ex) {
        console.dir(ex);
    }
})
module.exports = router;