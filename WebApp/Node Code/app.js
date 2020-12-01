
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// Database
var monk = require('monk');
//var db = monk('mongodb://ValuRiteAdmin:ValuRite123@182.72.100.214:27017/ValuRitedemo?authSource=admin');//182.72.100.214
//var db = monk('mongodb://myAdmin:ValuRite123@182.72.100.214:27017/ValuRitedemo?authSource=admin');//182.72.100.214
//var db = monk('mongodb://GobiomUser:Test123@192.168.1.221:27017/ValuRitedemo?authSource=admin');
var db = monk('mongodb://GobiomUser:Test123@192.168.1.220:27017/ValuRite20?authSource=admin');
var admin_db = monk('mongodb://GobiomUser:Test123@192.168.1.220:27017/ValuRite_Admin?authSource=admin');
//var db = monk('mongodb://myUserAdmin:abc123@192.168.1.110:27017/ValuRitedemo?authSource=admin');
//var admin_db = monk('mongodb://myUserAdmin:abc123@192.168.1.110:27017/ValuRite_Admin?authSource=admin');

var routes = require('./routes/index');
var users = require('./routes/users');
var getParam = require('./routes/GenericParamDetails');
var getLogin = require('./routes/pwdvalid');
var updatePassword = require('./routes/newpassvalid');
var Adduser = require('./routes/regpage');
var GetParamDet=require('./routes/GetParamDetails');
var GetUserDetails=require('./routes/getuseronchange');
var GetCompUserDetails=require('./routes/GetCompleteUserlist');
var UpdateUserDetails=require('./routes/SaveUserDetails');
var DeleteUserDetails=require('./routes/deleteuser');
var GetParentParam=require('./routes/getparentparam');
var GetCurrentParam=require('./routes/getparamonchange');
var SaveParamDetails=require('./routes/Saveparamdetails');
var deleteparam=require('./routes/deleteparam');
var GenerateChart=require('./routes/GenerateQueuePage');
var UpdateAppraisalStatus=require('./routes/AppraisalStatusUpdate');
var GetQueueDetails=require('./routes/GetQueueDetails');
var GetProperty=require('./routes/getProperty');
var LenderApplicationQueue=require('./routes/LenderApplicationQueueupdated');
var GetApprovedList=require('./routes/getApprovedlist');
var GetApprovedBorrowers=require('./routes/getBorrower4App');
var GetLocationDetails=require('./routes/GetLocationDetails');
var GetAppraisalStatus=require('./routes/GetAppraisalStatus');
var ChangeStatus=require('./routes/ChangeStatus');
var ApprovalDetailsSave=require('./routes/ApprovalDetailsSave');
var PricingDetailsSave=require('./routes/PricingDetailsSave');
var AmenitiesPageSave=require('./routes/AmenitiesPageSave');
var SummaryPageSave=require('./routes/SummaryPageSave');
var OnCompleteAppraisalStatusChange=require('./routes/OnCompleteAppraisalStatusChange');
var Oncreate=require('./routes/Oncreate');
var getGuideLinevalues=require('./routes/getGuideLinevalues');
var ChangeStatusSubmit=require('./routes/ChangeStatusSubmit');
var CreatePDF=require('./routes/createHtmlnew');
var Retrieveapproval=require('./routes/Retrieveapproval');
var UpdateAppraisalReason=require('./routes/UpdateAppraisalReason');
var GetPropertyDesc=require('./routes/GetPropertyDesc');
var GetUserList=require('./routes/GetUserlist');
var GetRejectValuationList=require('./routes/GetRejectValuationList');
var GetRejectedProp=require('./routes/GetRejectedProp');
var GetApproverRecords=require('./routes/GetApproverRecords');
var CreateAppraisalNew=require('./routes/CreateAppraisalNew');
var CreateAppraisalByAppr=require('./routes/CreateAppraisalByAppr');
var UpdateLocationDetails=require('./routes/UpdateLocationDetails');
var savePropertydetails=require('./routes/savePropertydetails');
var getStreet=require('./routes/getStreet');
var getarea=require('./routes/getarea');
var GetMatchingStreets=require('./routes/GetMatchingStreets');
var Exportfile=require('./routes/Exportfile');
var GetImage=require('./routes/GetImage');
var ImageUpload=require('./routes/ImageUpload');
var GetTime=require('./routes/GetTime');
var getUserInformation=require('./routes/getUserInformation');
var SaveMiscDetails=require('./routes/SaveMiscDetails');
var GetOfflineData=require('./routes/GetOfflineData');
var getLenderlist=require('./routes/GetLenderlist');
var RaiseInvoice=require('./routes/RaiseInvoice');
var InvoiceReceiptRetrieve=require('./routes/InvoiceReceiptRetrieve');
var Invoiceretrieve=require('./routes/Invoiceretrieve');
var getInvoiceReceipt=require('./routes/GetInvoiceReceipt');
var UpdateInvoiceReceipt=require('./routes/UpdateInvoiceReceipt');
var UpdateChildRows=require('./routes/UpdateChildRows');
var RetrievePropertyValues=require('./routes/RetrievePropertyValues');
var ForgetPassword=require('./routes/ForgetPassword');
var ForUpdatePassword=require('./routes/UpdatePassword');
var GetApproverMailDetails=require('./routes/GetApproverMailDetails');
var LoadRegPageDropdown=require('./routes/LoadRegPageDropdown');
var GetAssignedProperty=require('./routes/GetAssignedProperty');
var CreateSchedule=require('./routes/CreateSchedule');
var GetScheduledProperty=require('./routes/GetScheduledProperty');
var Reschedule=require('./routes/Reschedule');
//var template=require('./routes/template');

var OutstandingReport=require('./routes/OutstandingReport');
var GenerateOutstanding=require('./routes/GenerateOutstanding');
var ExcelOutstanding=require('./routes/ExcelOutstanding'); 
var EmailInvoice=require('./routes/EmailInvoice');
var EmailInvoiceReceipt=require('./routes/EmailInvoiceReceipt');

var ResidenceVehicle=require('./routes/ResidenceVehicle');
var BusinessVehicle=require('./routes/BusinessVehicle');
var LoggedInSession = require('./routes/LoggedInSession');
var GetSelfRegisteredUsers=require('./routes/GetSelfRegisteredUsers');

var PropertyBuildingdetailSave=require('./routes/PropertyBuildingdetailSave');
var ValuationGeneralSave=require('./routes/ValuationGeneralSave');
var PropertylanddetailSave=require('./routes/PropertylanddetailSave');
var PropertyDescDetailsSave=require('./routes/PropertyDescDetailsSave');
var generalDetailsSave=require('./routes/generalDetailsSave');
var Statutorydetailssave=require('./routes/Statutorydetailssave');
var ServicesdetailSave=require('./routes/ServicesdetailSave');
var GetDepreciationValue=require('./routes/GetDepreciationValue');
var GetAdminDropGeneral=require('./routes/GetAdminDropGeneral');
var logout = require('./routes/logout');
//console.og = console.log;
//console.log = function() {};

var app = express();

//Parse the json request
app.use(bodyParser.urlencoded({
  extended: true
})); 
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.json({ type: 'application/json'})); 

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
	req.admin_db = admin_db;
    next();
}); 

//use the files based on the request
app.use('/', routes);
app.use('/users', users);
app.use('/GenericParamDetails', getParam);
app.use('/pwdvalid', getLogin);
app.use('/newpassvalid',updatePassword);
app.use('/regpage',Adduser);
app.use('/GetParamDetails',GetParamDet);
app.use('/getuseronchange',GetUserDetails);
app.use('/GetCompleteUserlist',GetCompUserDetails);
app.use('/SaveUserDetails',UpdateUserDetails);
app.use('/Deleteuser',DeleteUserDetails);
app.use('/getparentparam',GetParentParam);
app.use('/getparamonchange',GetCurrentParam);
app.use('/Saveparamdetails',SaveParamDetails);
app.use('/deleteparam',deleteparam);
app.use('/GenerateQueuePage',GenerateChart);
app.use('/UpdateAppraisalStatus',UpdateAppraisalStatus);
app.use('/GetQueueDetails',GetQueueDetails);
app.use('/getProperty',GetProperty);
app.use('/LenderQueue',LenderApplicationQueue);
app.use('/getApprovedlist',GetApprovedList);
app.use('/getBorrower4App',GetApprovedBorrowers);
app.use('/GetLocationDetails',GetLocationDetails);
app.use('/GetAppraisalStatus',GetAppraisalStatus);
app.use('/ChangeStatus',ChangeStatus);
app.use('/ApprovalDetailsSave',ApprovalDetailsSave);
app.use('/PricingDetailsSave',PricingDetailsSave);
app.use('/AmenitiesPageSave',AmenitiesPageSave);
app.use('/SummaryPageSave',SummaryPageSave);
app.use('/OnCompleteAppraisalStatusChange',OnCompleteAppraisalStatusChange);
app.use('/Oncreate',Oncreate);
app.use('/getGuideLinevalues',getGuideLinevalues);
app.use('/ChangeStatusSubmit',ChangeStatusSubmit);
app.use('/CreatePDF',CreatePDF);
app.use('/Retrieveapproval',Retrieveapproval);
app.use('/UpdateAppraisalReason',UpdateAppraisalReason);
app.use('/GetPropertyDesc',GetPropertyDesc);
app.use('/GetUserlist',GetUserList);
app.use('/GetRejectValuationList',GetRejectValuationList);
app.use('/GetRejectedProp',GetRejectedProp);
app.use('/GetApproverRecords',GetApproverRecords);
app.use('/CreateAppraisalNew',CreateAppraisalNew);
app.use('/CreateAppraisalByAppr',CreateAppraisalByAppr);
app.use('/UpdateLocationDetails',UpdateLocationDetails);
app.use('/savePropertydetails',savePropertydetails);
app.use('/getStreet',getStreet);
app.use('/getarea',getarea);
app.use('/GetMatchingStreets',GetMatchingStreets);
app.use('/Exportfile',Exportfile);
app.use('/GetImage',GetImage);
app.use('/ImageUpload',ImageUpload);
app.use('/GetTime',GetTime);
app.use('/getUserInformation',getUserInformation);
app.use('/SaveMiscDetails',SaveMiscDetails);
app.use('/getLenderlist',getLenderlist);
app.use('/Invoiceretrieve',Invoiceretrieve);
app.use('/getInvoiceReceipt',getInvoiceReceipt);
app.use('/RaiseInvoice',RaiseInvoice)
app.use('/UpdateInvoiceReceipt',UpdateInvoiceReceipt);
app.use('/UpdateChildRows',UpdateChildRows);
app.use('/RetrievePropertyValues',RetrievePropertyValues);
app.use('/ForgetPassword',ForgetPassword);
app.use('/GetApproverMailDetails',GetApproverMailDetails);
app.use('/InvoiceReceiptRetrieve',InvoiceReceiptRetrieve);
app.use('/LoadRegPageDropdown',LoadRegPageDropdown);
app.use('/UpdatePassword',ForUpdatePassword);
app.use('/GuideLine',GetOfflineData);
app.use('/GetAssignedProperty',GetAssignedProperty);
app.use('/GetScheduledProperty',GetScheduledProperty);
app.use('/CreateSchedule',CreateSchedule);
app.use('/Reschedule',Reschedule);
app.use('/LoggedInSession', LoggedInSession);
app.use('/OutstandingReport',OutstandingReport);
app.use('/GenerateOutstanding',GenerateOutstanding);
app.use('/ExcelOutstanding',ExcelOutstanding);
app.use('/EmailInvoice',EmailInvoice);
app.use('/EmailInvoiceReceipt',EmailInvoiceReceipt);

app.use('/ResidenceVehicle',ResidenceVehicle);
app.use('/BusinessVehicle',BusinessVehicle);
app.use('/GetSelfRegisteredUsers',GetSelfRegisteredUsers);

app.use('/PropertyBuildingdetailSave',PropertyBuildingdetailSave);
app.use('/ValuationGeneralSave',ValuationGeneralSave);
app.use('/PropertylanddetailSave',PropertylanddetailSave);
app.use('/PropertyDescDetailsSave',PropertyDescDetailsSave);
app.use('/generalDetailsSave',generalDetailsSave);
app.use('/Statutorydetailssave',Statutorydetailssave);
app.use('/ServicesdetailSave',ServicesdetailSave);
app.use('/GetDepreciationValue',GetDepreciationValue);
app.use('/GetAdminDropGeneral',GetAdminDropGeneral);
app.use('/logout',logout);
//app.use('/template',template);
/// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
