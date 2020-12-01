// Update the company details 
var express = require('express');  
var path = require("path"); 
var updaterouter=express.Router();
updaterouter.post('/', function(req, res){
   const db = req.admin_db;
    const coll =db.collection('Company');
// Update Query for updating company details in company collection, with respect to the companyname as a key
  coll.update({CompanyName :req.body.companyname},
  { 
   $set:{
    CompanyName: req.body.companyname,
    GstNumber: req.body.gstnumber,
    PanNumber: req.body.panNum,
    CompanyDescription: req.body.companydesc,
    Address: {
        AddressLine1: req.body.companyaddress,
        City: req.body.cities,
        State: req.body.states,
        Country: req.body.countries,
        Pincode : req.body.zipcode
    },
    Contact_details: req.body.contactdetails,
    Contract: {
        Contract_reference:req.body.contractdetails
    },
    LastUpDate: new Date()
},
     function(err, update){
        if(update){
            res.json(update);
        }
        if (err) console.log('Error in updating company details' +err);
    }   
  });
});

module.exports = updaterouter;

 

  