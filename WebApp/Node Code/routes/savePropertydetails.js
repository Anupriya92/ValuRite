var http = require("http");


var express = require('express');
var router = express.Router();
router.post('/', function(req, res, next) {
try
{
        var strBody = req.body;
		/*req.on("data", function(chunk) {
        strBody += chunk;
    }
	);*/
    //req.on("end", function() {
    console.log("Received posted data: " + strBody);
			
//Getting User details.. 
var jsonObj = strBody;


//Details to Update in Property Collection
var proptype=jsonObj.PropertyType;
var ProjSiteName=jsonObj.ProjectSiteName;
// var add1=jsonObj.AddressLine1;
// var add2=jsonObj.AddressLine2;
var lan=jsonObj.Landmark;
var loc=jsonObj.AddArea;
var loctype=jsonObj.LocationType;
var city=jsonObj.City;
var state=jsonObj.State;
var country=jsonObj.Country;
var pin=jsonObj.Pincode;
//
var proplandextent=jsonObj.LandExtent;
var propsurroundby=jsonObj.SurroundedBy;
var proproadwidth=jsonObj.RoadWidth;
var propFootagedetails=jsonObj.FootageDetails;
var propFootageReason=jsonObj.FootageReason;
var propLocationStatus="Completed";
var unit=jsonObj.Unit;
var streetname=jsonObj.StreetName;
var DoorNumber=jsonObj.DoorNumber;
// var ValuationPurpose=jsonObj.ValuationPurpose;
// var RoadName=jsonObj.RoadName;
//var latlong=JSON.parse(jsonObj.latlng);
//
//Details to Update in Appraisal Collection
var id=jsonObj.UserID;
var appstatus="New";
var borrowerid=jsonObj.BorrowerID;
var PropertyID="";
var CurrentDate = new Date();  
// var datetime = currentdate.getDate() + "/"
// + (currentdate.getMonth()+1)  + "/" 
// + currentdate.getFullYear() + " @ "  
// + currentdate.getHours() + ":"  
// + currentdate.getMinutes() + ":" 
// + currentdate.getSeconds();

var fs = require("fs")
var CaptureLog = require("./log.js");
capturelog = new CaptureLog();



	console.log("Connected to Database");
	var db=req.db;
	var collection = db.get('Property');
	collection.find({},{ 'PropertyID':'1',sort:{'PropertyID' : -1},limit:1},function(err, docs) {
	if(docs=="")
    {
		PropertyID=1;
	} 
	else
    {
		docs.forEach(function(doc)
        {
			console.log(doc.PropertyID);
			PropertyID=doc.PropertyID+1;
		});
	 }
	//Inserting property details in property table
	console.log("loctype  : "+loctype);
	collection.insert(
	{
		"PropertyID" : PropertyID,
		"PropertyType" : proptype,
		"Location":loctype,
		"ProjectSiteName":ProjSiteName,
		"Address" : 
		{
			"StreetName":streetname,
			"DoorNumber":DoorNumber,
			"Landmark" : lan,
			"AddArea" : loc,
			"City" : city,
			"State" : state,
			"Country" : country,
			"Pincode" : pin,
			//"latlng":latlong,
		},
		"createdby":id,
	// "ValuationPurpose":ValuationPurpose,
	"ModifiedDate" :CurrentDate,
    "ModifiedBy" : id
	}, function(err, result) 
		{
			if(err)
			{
				console.log(err);
				capturelog.fnuserlog("\r\n\r\n Property Creation -- FAILED  -- UserID : "+id+", Date :"+new Date()+", Error Occurrred "+err)
			}
			else
			{
				console.log("Property Id Generated and New Property is created successfully");
				var obj={
					Propertystatus:'1',
					PropertyID:PropertyID
				}
				var jsonarr=JSON.stringify(obj)
				res.send(jsonarr);
				capturelog.fnuserlog("\r\n\r\n Property Creation -- CREATED SUCCESSFULLY  -- PropertyID : "+PropertyID+", UserID : "+id+", Date :"+new Date())
				//After Generating property ID
			}
		});	
	});	    
 //});
 } catch( ex ) 
 {
       console.dir(ex);
      }


});
module.exports = router;