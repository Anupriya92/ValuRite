var http = require("http");
var fs = require("fs")
var CaptureLog = require("./log.js");
capturelog = new CaptureLog();
var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
try
{
var strBody = req.body;	 
var jsonObj = strBody;
var ValuationID = jsonObj.ValuationID;
var UserID=jsonObj.UserID;
var CurrentDate = new Date();
var pid = parseInt(jsonObj.PropertyID);
var collarr=[];

var db=req.db;
var collection = db.get('Appraisal');
if(!jsonObj.flag){
   var ValuationPurpose= jsonObj.ValuationPurpose;
   var InspectionDate= jsonObj.InspectionDate;
   var ValuationDate= jsonObj.ValuationDate;
   var Ownerdetails=JSON.parse(jsonObj.Ownerdetails);
   var owningproperty= jsonObj.owningproperty;
   var Listdocumentsperusal= jsonObj.Listdocumentsperusal;
   var ScopeValuation = jsonObj.ScopeValuation;
   var Nameofbank = jsonObj.Nameofbank;
   var Branchbankappraisal = jsonObj.Branchbankappraisal;
   var Valuerassociationdropdown = jsonObj.Valuerassociationdropdown;
   var Personsvisitingsite = jsonObj.Personsvisitingsite;
   
	console.log("Ownerdetails"+JSON.stringify(Ownerdetails))
	collection.update({'ValuationID':ValuationID,'ValuationStatus':'true'} ,
	{$set :
	{
	"ValuationPurpose" : ValuationPurpose,
	"DateofInspection" : InspectionDate,
	"ValuationDate":ValuationDate,	 
	"OwnerDetails" : Ownerdetails,
	"ValuationDocs":Listdocumentsperusal,
	"ValuationScope":ScopeValuation,
	"NameOfBank":Nameofbank,
	"ReportForBankBranch":Branchbankappraisal,
	"ValuerAssociationName":Valuerassociationdropdown,
	"PersonAccompanied":Personsvisitingsite,
	"GeneralStatus":"Completed" 
	}
	},{multi:true}, {upsert : true});
}
collection.find({'ValuationID':ValuationID,'ValuationStatus':'true'},function(err, docs) {	
	    docs.forEach(function(subdocs){	
	    var coll = db.get('Appraisal');
		coll.update({'ValuationID':ValuationID,'ValuationStatus':'true'}, {$set : {GeneralStatus : "Retrieved"}});
 		var arr = JSON.stringify(subdocs);	
        collarr.push(subdocs)
		capturelog.fnuserlog("\r\n\r\n GeneralStatus Details Section --RETRIEVED-- ValuationID : "+ValuationID+", UserID : "+UserID+", Date :"+CurrentDate)
})
});  

//Property Collection.. 
var collection1 = db.get('Property');
if(!jsonObj.flag){
	 var BriefDescriptionProperty= jsonObj.BriefDescriptionProperty;
     var Projectsitename = jsonObj.Projectsitename;
	 var LocationType = jsonObj.LocationType;
     var PropertyType = jsonObj.PropertyType; 
	
	collection1.update({'PropertyID':pid} ,
	{$set :
	{
	"BriefDesc":BriefDescriptionProperty,
	"ProjectSiteName":Projectsitename,
	"PropertyType":PropertyType,
	"Location":LocationType
	}
	},{multi:true}, {upsert : true});	
}
 collection1.find({'PropertyID':pid},function(err, propdocs) {
	    propdocs.forEach(function(propsubdocs){	
		var propcol = db.get('Property');
		propcol.update({'PropertyID':pid});
 		var proparr = JSON.stringify(propsubdocs);
        collarr.push(propsubdocs)	
        res.send(collarr);
		capturelog.fnuserlog("\r\n\r\n PropDescStatus Details Section --RETRIEVED-- ValuationID : "+ValuationID+", UserID : "+UserID+", Date :"+CurrentDate)
})
});   
		} catch( ex ) {
         console.dir(ex);
		}
});
module.exports = router;