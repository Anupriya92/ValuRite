var express = require('express');
var session = require('express-session')
var path = require('path');
var bodyParser = require('body-parser');
var monk = require('monk');

var config = require('./config.json');
var db = monk(config.db);
const admin_db = monk(config.admin_db);

// Menu & Home 
var menu = require('../admin/menu');
var regpage = require('../admin/regpage');
var newuserinsert = require('../admin/newuserinsert');
var PwdValid = require('../admin/PwdValid');
var forgot = require('../admin/forgot');
var updatepassword = require('../admin/updatepassword');
var logout = require('../admin/logout');
var Landing = require('../admin/Landing');
var feedback=require('../admin/feedback');
var enquiry=require('../admin/enquiryform');
const globalsettings = require('../admin/admin-globalsettings');
var login = require('../admin/loginpage');
var webToken = require('../admin/getWebTokens');
var verifytoken =  require('../admin/verifyWebToken');


// Admin
const loggedinusers = require('../admin/admin-loggedinusers');
const getCompanyNames = require('../admin/admin-getCompanyNames');
const getYearFromUserlogs = require('../admin/admin-getYearFromUserlogs');
const getMonthStatsForAnYear = require('../admin/admin-getMonthStatsForAnYear');
const getCompanyUsers = require('../admin/admin-getCompanyUsers');
const updatePreferences = require('../admin/admin-updatePreferences');
const getPreferences = require('../admin/admin-getPreferences');
const registering=require('../admin/admin-postCompanyDetails');
const contractregistering=require('../admin/admin-postCompanyContract');
const getvalue=require('../admin/admin-fetchCompanyDetails');
const updateCompany = require('../admin/admin-updateCompanyDetails');
const updateContract = require('../admin/admin-updateCompanyContract');
const contractParam = require('../admin/admin-onloadParamForCompany');
const companyName = require('../admin/admin-company-name');
const postSingleUserDetails = require('../admin/admin-postSingleUserDetails');
const postBulkUserDetails = require('../admin/admin-postBulkUserDetails');
const getApprovalUsers = require('../admin/admin-getApprovalUsers');
const updateApprovedUsers = require('../admin/admin-updateApprovedUsers');
const updateRejectedUsers = require('../admin/admin-updateRejectedUsers');
const getContractRef = require('../admin/admin-getContractRef');
const getContractDetails = require('../admin/admin-getContractDetails');
const getUsername = require('../admin/admin-getUsername');
const updateUserPassword = require('../admin/admin-updateUserPassword');
const getUserlog = require('../admin/admin-getUserlog');
const getSingleUser = require('../admin/admin-getSingleUser');
const updateSingleUser = require('../admin/admin-updateSingleUser');
const fetchCompanyUsers = require('../admin/admin-fetchCompanyUsers');
const updateBulkUser = require('../admin/admin-updateBulkUser');
const CompanyNameExisting = require('../admin/admin-onCheckCompanyNameExisting');
const getUserlogforCompany = require('../admin/admin-getUserlogForCompany');
const getEmailFlag = require('../admin/admin-getEmailFlag');
const getUserNames = require('../admin/admin-getUserNamesForUserLog');
const getRoleName = require('../admin/admin-getRolename');
const contractReferences = require('../admin/admin-contractReferences');
const contractRef = require('../admin/admin-getAllContractReferences');
const getAllCompanyUserlogs = require('../admin/admin-getAllCompanyUserLogs');
const getNewUserList = require('../admin/admin-getUserlist');
const postParamValue = require('../admin/admin-postParamValues');
const fetchingParamValue = require('../admin/admin-fetchingParamValues');
const approvedUsersForUpdation = require('../admin/admin-getOnlyApprovedUsers');
const admin_dashboardpopup = require('../admin/admin-dashboardpopup');
const admin_generalstatistics = require('../admin/admin-dashboardpopup');
const admin_changepassword = require('../admin/admin-changepassword');
const getYearmonthWiseStatsforUser = require('../admin/admin-getYearmonthWiseStatsforUser');
const getYearmonthWiseStatsforCompanies = require('../admin/admin-getYearmonthWiseStatsforCompanies');
const getUsersCompany = require('../admin/admin-getOnlyApprovedUsersCompany');

var app = express();

//For session usage
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true, maxAge : 1800000 }
  
}))

const cors = require('cors');

//app.use(cors());
app.use(cors({
    origin: '*',
    credentials: true
}));

//Parse the json request
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.json({ type: 'application/json' }));

// Make our db accessible to our router
app.use(function (req, res, next) {
    req.db = db;
    req.admin_db = admin_db;
    next();
});

// console.customlog = console.log
// console.log =function(){}

//Admin

app.use('/Landing', Landing);
app.use('/PwdValid', PwdValid);
app.use('/forgot', forgot);
app.use('/menu', menu);
app.use('/regpage', regpage);
app.use('/updatepassword', updatepassword);
app.use('/logout',logout);
app.use('/newuserinsert',newuserinsert);
app.use('/feedback',feedback);
app.use('/enquiryform',enquiry);
app.use('/globalsettings', globalsettings);
app.use('/loginpage', login);
app.use('/getWebToken', webToken);
app.use('/verifyWebToken',verifytoken);
app.use('/loggedinusers', loggedinusers);
app.use('/getCompanyNames', getCompanyNames);
app.use('/getYearFromUserlogs', getYearFromUserlogs);
app.use('/getMonthStatsForAnYear', getMonthStatsForAnYear);
app.use('/getCompanyUsers', getCompanyUsers);
app.use('/updatePreferences', updatePreferences);
app.use('/getPreferences', getPreferences);
app.use('/companyregister',registering);
app.use('/companycontract', contractregistering);
app.use('/companyValue',getvalue);
app.use('/update',updateCompany);
app.use('/UpdateCompanyContract',updateContract);
app.use('/ContractParamValue',contractParam);
app.use('/fetchingCompanyName',companyName);
app.use('/postSingleUserDetails', postSingleUserDetails);
app.use('/postBulkUserDetails',postBulkUserDetails);
app.use('/getApprovalUsers',getApprovalUsers);
app.use('/updateApprovedUsers',updateApprovedUsers);
app.use('/updateRejectedUsers',updateRejectedUsers);
app.use('/getContractRef',getContractRef);
app.use('/getContractDetails',getContractDetails);
app.use('/getUsername', getUsername);
app.use('/onChechCompanyNameExisting', CompanyNameExisting);
app.use('/updateUserPassword', updateUserPassword);
app.use('/getUserlog', getUserlog);
app.use('/getSingleUser', getSingleUser);
app.use('/updateSingleUser', updateSingleUser);
app.use('/updateBulkUser', updateBulkUser);
app.use('/fetchCompanyUsers',fetchCompanyUsers);
app.use('/getUserlogforCompany', getUserlogforCompany);
app.use('/getEmailFlag', getEmailFlag);
app.use('/getUserNamesForUserLog', getUserNames);
app.use('/getRoleName', getRoleName);
app.use('/contractReferences',contractReferences);
app.use('/getAllContractReferences', contractRef);
app.use('/getAllCompanyUserLogs', getAllCompanyUserlogs);
app.use('/getUserlist', getNewUserList);
app.use('/postParamValue', postParamValue);
app.use('/fetchingParamValue', fetchingParamValue);
app.use('/getOnlyApprovedUsers', approvedUsersForUpdation);
app.use('/admin-dashboardpopup', admin_dashboardpopup);
app.use('/admin-dashboardpopup',admin_generalstatistics);
app.use('/admin-changepassword',admin_changepassword);
app.use('/getYearmonthWiseStatsforUser',getYearmonthWiseStatsforUser);
app.use('/getYearmonthWiseStatsforCompanies',getYearmonthWiseStatsforCompanies);
app.use('/getOnlyApprovedUsersCompany',getUsersCompany);

// error handlers
// development error handler will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        console.log("Error occurred in node message: " + err.message);
        console.log("Error occurred in node: " + err);
        res.status(err.status || 500);
        res.send('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler no stacktraces leaked to user
app.use(function (err, req, res, next) {
    console.log("Error occurred in node message: " + err.message);
    console.log("Error occurred in node: " + err);
    res.status(err.status || 500);
    res.send('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
