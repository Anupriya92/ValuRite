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
   var Restrictiveclauses= jsonObj.Restrictiveclauses;
   var Typeofusetoput= jsonObj.Typeofusetoput;
   var ReservedLand= jsonObj.ReservedLand;
    var ReserveComments= jsonObj.ReserveComments;
   var caseconversionsite=jsonObj.caseconversionsite;
   var lockedland= jsonObj.lockedland;
   var approvedlayout= jsonObj.approvedlayout;
   var drawingapprovaldate = jsonObj.drawingapprovaldate;
   var ApprovedStatus = jsonObj.ApprovedStatus;
   var ApprovingAuthority = jsonObj.ApprovingAuthority;
   var ApprovingAuthorityNo = jsonObj.ApprovingAuthorityNo;
   var ApprovingAuthorityDate = jsonObj.ApprovingAuthorityDate;
   var ReleaseCertNo = jsonObj.ReleaseCertNo;
   var approvedverified= jsonObj.approvedverified;
   var sanctionedplan= jsonObj.sanctionedplan;
   var Detailsofvariations= jsonObj.Detailsofvariations;
   var empanelledvaluers=jsonObj.empanelledvaluers;
   var Valuationearlier= jsonObj.Valuationearlier;
   var PropertyAssessmentno= jsonObj.PropertyAssessmentno;
   var PropertyTaxAmount = jsonObj.PropertyTaxAmount;
   var PropertyTaxReceiptNo = jsonObj.PropertyTaxReceiptNo;
    var PropertyTaxPaidPeriod= jsonObj.PropertyTaxPaidPeriod;
   var PropertyTaxPaidname= jsonObj.PropertyTaxPaidname;
   var ElectricityService = jsonObj.ElectricityService;
   var MasterCardname = jsonObj.MasterCardname;
   var WealthTaxpaidAmount = jsonObj.WealthTaxpaidAmount;
   var Agreementseasements = jsonObj.Agreementseasements;
   var WaterTaxespaid = jsonObj.WaterTaxespaid;
   var ReservedLandtext;
  // if(ReservedLand== "Notified_for_by_Govt"||ReservedLand=="Notified_under_agency_area" ||ReservedLand=="Scheduled_Area" ||ReservedLand=="Contonment_Area")
	//{
		ReservedLandtext= ReservedLand 
	//}
	//else{
	    
	//	ReservedLandtext= {"Others":ReservedLand}
	//}	
	
	collection.update({'ValuationID':ValuationID,'ValuationStatus':'true'} ,
	{$set :
	{
     "Statutory":{
	               "RestrictiveClause" : Restrictiveclauses,
	               "LandUsageType" : Typeofusetoput,
	               "MarkedforGovtProj":
				   {"ReservedLand":ReservedLand,
				   "Comments":ReserveComments
				   },
	               "AgriLandConvPlots" : caseconversionsite,
	               "LandLocked":lockedland,
	               "LandApprovedLayout":approvedlayout,
	               "ProbDrawingApproval":drawingapprovaldate,
				   "ReleaseCertificateNo":ReleaseCertNo,
				   "ProjectApproved":ApprovedStatus,
	               "GovtAuthorityID":ApprovingAuthority,
	               "ApprovalNo":ApprovingAuthorityNo,
	               "ApprovalDate":ApprovingAuthorityDate,
	               "AthenticityMap" : approvedverified,
	               "InSyncWithPlan" : sanctionedplan,
	               "InSyncVariationEffect":Detailsofvariations,	 
	               "CommentsValuers" : empanelledvaluers,
	               "EarlierValuation":Valuationearlier,
	               "PropTaxAssessmentNumber":PropertyAssessmentno,
	               "PropTaxAmount":PropertyTaxAmount,
	               "PropTaxReceiptNo":PropertyTaxReceiptNo,	 
	               "PropTaxPaidPeriod" : PropertyTaxPaidPeriod,
	               "PropTaxPayerName":PropertyTaxPaidname,
	               "ElectricityNum":ElectricityService,
	               "ElectricityInNameOf":MasterCardname,
	               "WealthTaxPaidAmount":WealthTaxpaidAmount,
	               "AgreementOfEasements":Agreementseasements,
	               "PropertyTaxWater":WaterTaxespaid,	
		       },
	         "StatutoryStatus":"Completed" 
	}
	},{multi:true}, {upsert : true});
}
collection.find({'ValuationID':ValuationID,'ValuationStatus':'true'},function(err, docs) {	
	    docs.forEach(function(subdocs){	
	    var coll = db.get('Appraisal');
		coll.update({'ValuationID':ValuationID,'ValuationStatus':'true'}, {$set : {StatutoryStatus : "Retrieved"}});
 		var arr = JSON.stringify(subdocs);	
        collarr.push(subdocs)
		 res.send(collarr);
		capturelog.fnuserlog("\r\n\r\n StatutoryStatus Details Section --RETRIEVED-- ValuationID : "+ValuationID+", UserID : "+UserID+", Date :"+CurrentDate)
})
});  
   
		} catch( ex ) {
         console.dir(ex);
		}
});
module.exports = router;