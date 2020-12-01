/* Get the user details for updating in Single user update */
var express = require('express');
var singleUpdateRouter = express.Router();
singleUpdateRouter.get('/', function (req, res, next) {
    //DB Connection
    var strBody = req.query;
    var email_id = req.query.username;
    var db = req.admin_db;
    var collection = db.collection('User');
    // Query to fetch the user details based on the username(emailid)
    try {
        collection.aggregate([{ $match: { "ContactDetails.EmailID": email_id, "ApprovalDetails.Status": "Approved" } },
        {
            "$lookup":
                {
                    from: "Contracts",
                    localField: "Contract.ContractReference",
                    foreignField: "contract_reference",
                    as: "docs"
                }
        },
        {
            "$unwind": "$docs"
        },
        {
            "$group": {
                _id: {
                    "FirstName": "$FirstName",
                    "LastName": "$LastName",
                    "CompanyName": "$CompanyName",
                    "EmailId": "$ContactDetails.EmailID",
                    "MobileNo": "$ContactDetails.MobileNo",
                    "Country": "$Address.Country",
                    "City":"$Address.City",
                    "State":"$Address.State",
                    "Address1":"$Address.AddressLine1",
                    "Address2":"$Address.AddressLine2",
                    "Landmark":"$Address.Landmark",
                    "Area": "$Address.AddArea",
                    "Pincode": "$Address.Pincode",
                    "ContractRef": "$docs.contract_reference",
                    "Usertype": "$UserType",
                    "Userrole":"$UserRole",
                    "GeneralAlert": "$general_alert_flag",
                    "StartDate": "$Contract.StartDate" ,
                    "EndDate": "$Contract.EndDate" ,
                    "ContractStDate":  "$docs.valid_start_date",
                    "ContractEndDate":  "$docs.valid_to_date",
                    // "Exportflag": "$docs.export_flag",
                    "UserStatus": "$UserStatus",
                    "associationName" : "$AssociationDetails"
                }
            }
        },
        {
            "$project":
                {
                    "FirstName": "$_id.FirstName",
                    "LastName": "$_id.LastName",
                    "CompanyName": "$_id.CompanyName",
                    "EmailId": "$_id.EmailId",
                    "MobileNo": "$_id.MobileNo",
                    "Country": "$_id.Country",
                    "City": "$_id.City",
                    "State": "$_id.State",
                    "UserType": "$_id.Usertype",
                    "UserRole":"$_id.Userrole",
                    "Area": "$_id.Area",
                    "Pincode": "$_id.Pincode",
                    "ContractRef": "$_id.ContractRef",
                    "Addressline1":"$_id.Address1",
                    "Addressline2":"$_id.Address2",
                    "LandMark": "$_id.Landmark",
                    "GeneralAlert": "$_id.GeneralAlert",
                    "StartDate": "$_id.StartDate",
                    "EndDate": "$_id.EndDate",
                    "UserStatus": "$_id.UserStatus",
                    "ContractStDate":  "$_id.ContractStDate",
                    "ContractEndDate":"$_id.ContractEndDate",
                    "AssociationName":"$_id.associationName",
                    "_id":0
                }
        }], function (err, docs) {
            console.log(JSON.stringify(docs))
            res.send(docs)
            res.end();
        })
    }
    catch (ex) { }
});
module.exports = singleUpdateRouter;

