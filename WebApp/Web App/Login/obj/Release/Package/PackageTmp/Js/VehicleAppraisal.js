function fnresetResidentdet() {
    $("#txtRefNo").val("");
    $("#txtHirerName").val("");
    $("#txtresaddr").val("");
    $("#txtLandmark").val("");
    $("#txttelenum").val("");
    $("#txtage").val("");
    $("#txtmartialstatus").val("");
    $("#txtassetvalue").val("");
    $("#txtvechtype").val("");
    $("#txtassetyrs").val("");
    $("#txtpersoncont").val("");
    $('input:radio[name$=LocationDetails][value="Own"]').prop('checked', true);
    $("#txtmnthlyrent").val("");
    $("#ddlverifiedfrm").prop('selectedIndex', 0);
    $("#txtrelationship").val("");
    $("#txtyearscurrent").val("");
    $("#txtareahouse").val("");
    $("#txtinmatedet").val("");
    $("#txtvehiclesown").val("");
    $('input:radio[name$=rdnparkavail][value="Yes"]').prop('checked', true);
    $("#txtverfyobserv").val("");
    $("#ddllocal").prop('selectedIndex', 0);
    $("#ddlResType").prop('selectedIndex', 0);
    $("#ddlInterior").prop('selectedIndex', 0);
    $("#txttotnuminteriors").val("");
    $("#txtdurabletot").val("");
    $('input:radio[name$=rdnpermgasconn][value="Yes"]').prop('checked', true);
    $('input:radio[name$=rdnentryperm][value="Yes"]').prop('checked', true);
    $("#ddllivingstyle").prop('selectedIndex', 0);
    $('input:radio[name$=rdnlifestyle][value="Yes"]').prop('checked', true);
    $("#ddlstandardofliving").prop('selectedIndex', 0);
    $('input:radio[name$=rdnneglist][value="Yes"]').prop('checked', true);
    $("#ddlreposses").prop('selectedIndex', 0);
    $("#txtverfysummary").val("");
    $("#txtmapresidence").val("");
    $("#ddlconsresid").prop('selectedIndex', 0);
    $("#ddlcustcop").prop('selectedIndex', 0);
    $("#ddleaseofloc").prop('selectedIndex', 0);
    $('input:radio[name$=rdnnegprof][value="Yes"]').prop('checked', true);
    $("#txtarearange").val("");
    $("#ddlresidencestatus").prop('selectedIndex', 0);
    $('input:radio[name$=rdnstabdev][value="Yes"]').prop('checked', true);
    $('input:radio[name$=rdnco_borrdev][value="Yes"]').prop('checked', true);
    $('input:radio[name$=rdnpropdev][value="Yes"]').prop('checked', true);
    $('input:radio[name$=rdnpropdev][value="Yes"]').prop('checked', true);
    $("#txtclsefamilyearn").val("");
    $("#txtborrpersonresid").val("");
}


function fnsaveResidentdet() {

    var obj = {}

    obj["Report_Ref_No"] = $("#txtRefNo").val();
    obj["Name_of_Hirer"] = $("#txtHirerName").val();
    obj["Residential_Address"] = $("#txtresaddr").val();
    obj["Landmark"] = $("#txtLandmark").val();
    obj["Telephone_No"] = $("#txttelenum").val();
    obj["Age"] = $("#txtage").val();
    obj["Marital_Status"] = $("#txtmartialstatus").val();
    obj["Asset_Value"] = $("#txtassetvalue").val();
    obj["Vehicle_Type"] = $("#txtvechtype").val();
    obj["Age_of_asset"] = $("#txtassetyrs").val();
    obj["Person_contacted"] = $("#txtpersoncont").val();
    obj["Ownership"] = $('input:radio[name$=LocationDetails]:checked').val()
    obj["Monthly_Rental_amount"] = $("#txtmnthlyrent").val();
    obj["Name_verified_from"] = $("#ddlverifiedfrm").val()
    obj["Hirer_guarantor_relation"] = $("#txtrelationship").val();
    obj["Years_current_residence"] = $("#txtyearscurrent").val();
    obj["Area_of_house"] = $("#txtareahouse").val();
    obj["Other_inmate_details"] = $("#txtinmatedet").val();
    obj["Other_vehicles_owned"] = $("#txtvehiclesown").val();
    obj["Parking_available"] = $('input:radio[name$=rdnparkavail]:checked').val();
    obj["Verifiers_observation"] = $("#txtverfyobserv").val();
    obj["Locality"] = $("#ddllocal").val();
    obj["Residence_type"] = $("#ddlResType").val();
    obj["Interior"] = $("#ddlInterior").val();
    obj["num_interior_present"] = $("#txttotnuminteriors").val();
    obj["Durable_total"] = $("#txtdurabletot").val();
    obj["Permnt_gas_connec"] = $('input:radio[name$=rdnpermgasconn]:checked').val();
    obj["Entry_permit_in_house"] = $('input:radio[name$=rdnentryperm]:checked').val();
    obj["Overall_living_style"] = $("#ddllivingstyle").val();

    obj["Product_matches_lifestyle"] = $('input:radio[name$=rdnlifestyle]:checked').val();
    obj["Standard_of_living"] = $("#ddlstandardofliving").val();
    obj["Negative_list_area"] = $('input:radio[name$=rdnneglist]:checked').val();
    obj["Ease_of_repossesion"] = $("#ddlreposses").val();

    obj["Verifier_summary"] = $("#txtverfysummary").val();
    obj["Map_of_residence"] = $("#txtmapresidence").val();
    obj["Constuction_residence"] = $("#ddlconsresid").val();
    obj["Customer_co_operation"] = $("#ddlcustcop").val();
    obj["Ease_of_location"] =  $("#ddleaseofloc").val();
    obj["Negative_profile"] = $('input:radio[name$=rdnnegprof]:checked').val();

    obj["Report_Ref_No"] = $("#txtarearange").val();
    obj["Area_range_sqft"] = $("#ddlresidencestatus").val();
    obj["Residence_status"] = $('input:radio[name$=rdnstabdev]:checked').val();
    obj["Residence_Stability_Deviation"] = $('input:radio[name$=rdnco_borrdev]:checked').val();
    obj["Co-borrower_deviation"] = $('input:radio[name$=rdnpropdev]:checked').val();
    obj["Property_deviation"] = $('input:radio[name$=rdnpropdev]:checked').val();
    obj["Family_members_earning"] = $("#txtclsefamilyearn").val();
    obj["Borrower_person_residence"] = $("#txtborrpersonresid").val();

    //alert(" Json Result " + JSON.stringify(obj))
}


var selactivity = "<option value='none'>Select ActivityLevel</option>"
var sellocality = "<option value='none'>Select Locality</option>"
var selinterior = "<option value='none'>Select Interior</option>"
var selfurnishing = "<option value='none'>Select Furnishing</option>"
var selexterior = "<option value='none'>Select Exterior</option>"
var selautomationfax = "<option value='none'>Select Automation Fax</option>"
var seleaseofreposs = "<option value='none'>Select ease of repossession</option>"
var selbusiassess = "<option value='none'>Select Business Assessment</option>"

var url = window.location.pathname;
var myPageName;

var obj;
obj = {
    business: "ActivityLevel,Locality,Interior,Furnishing,Exterior,AutomationFax,BusinessAssessment"
}
var jsonobj = JSON.stringify(obj);
function VehicledropdownIDs() {

    myPageName = url.substring(url.lastIndexOf('/') + 1);

    myPageName = 'VehicleAppraisal.aspx'

    ddlactivityID = 'ddlbusiiactivity';
   // alert(ddlactivityID);
    ddllocalityID = 'ddlbusilocality';
    ddlinteriorID = 'ddlbusiinterior';
    ddlfurnishingID = 'ddlbusifurnishing';
    ddlexteriorID = 'ddlbusiexterior';
    ddlautomationfaxID = 'ddlbusiautofax';
    ddleaseofrepossID = 'ddlbusireposs';
    ddlbusiassessID = 'ddlbusibusiassess';

    // ddlresidencetypeID = 'ddlresiresidencetype';
    //ddlconstructionresiID = 'ddlresiconstructionresi';
    //ddlresidencetypeID = 'ddlresiresidencetype';
    //ddleaseoflocationID = 'ddlresieaseoflocation';
    //ddlnameverifiedID = 'ddlresinameverified';
    //ddlstdoflivingID = 'ddlresistdofliving';
    //ddleaseofrepossID = 'ddlresieaseofreposs';
    //ddlresistatusID = 'ddlresiresistatus';
}

function GetBusiness() {

    VehicledropdownIDs();

    var webmethod = "VehicleAppraisalBusiness.aspx/GetUnits";

    //$('#' + ddcountryID).empty();
    $('#' + ddlactivityID).empty();
    $('#' + ddllocalityID).empty();
    $('#' + ddlinteriorID).empty();
    $('#' + ddlfurnishingID).empty();
    $('#' + ddlexteriorID).empty();
    $('#' + ddlautomationfaxID).empty();
    $('#' + ddleaseofrepossID).empty();
    $('#' + ddlbusiassessID).empty();

    $('#' + ddlactivityID).append(selactivity);
    $('#' + ddllocalityID).append(sellocality);
    $('#' + ddlinteriorID).append(selinterior);
    $('#' + ddlfurnishingID).append(selfurnishing);
    $('#' + ddlexteriorID).append(selexterior);
    $('#' + ddlautomationfaxID).append(selautomationfax);
    $('#' + ddleaseofrepossID).append(seleaseofreposs);
    $('#' + ddlbusiassessID).append(selbusiassess);



    //$('#' + ddlconstructionresiID).empty();
    //$('#' + ddlresidencetypeID).empty();
    //$('#' + ddleaseoflocationID).empty();
    //$('#' + ddlnameverifiedID).empty();
    //$('#' + ddlstdoflivingID).empty();
    //$('#' + ddleaseofrepossID).empty();
    //$('#' + ddlresistatusID).empty();
    //$('#' + ddlresidencetypeID).append(selbusiassess);
    //$('#' + ddlconstructionresiID).append(selconstructionresi);
    //$('#' + ddlresidencetypeID).append(selresidencetype);
    //$('#' + ddleaseoflocationID).append(seleaseoflocation);
    //$('#' + ddlnameverifiedID).append(selnameverified);
    //$('#' + ddlstdoflivingID).append(selstdofliving);
    //$('#' + ddleaseofrepossID).append(seleaseofreposs);
    //$('#' + ddlresistatusID).append(selresistatus);
    function GetUnits() {
        var obj;
        obj = {
            Unit: "ActivityLevel,BusiLocality,BusiInterior,Furnishing,Exterior,AutomationFax,EaseofRepossesion,BusinessAssessment"
        }
    }
    var jsonobj = JSON.stringify(obj);
    setTimeout(function () {
        GetBusiness(jsonobj.toString());
    }, 500);
}
function GetBusiness() {
    setTimeout(function () {
        $.ajax({
            type: "POST",
            url: webmethod,
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                var jsonObj = JSON.parse(response.d);
                for (var i in jsonObj) {
                    if (jsonObj[i].ParamName == "ActivityLevel") {
                        var option = "<option value=" + jsonObj[i].ParamValue + ">" + jsonObj[i].ParamValue + "</option>";
                        $('#' + ddlactivityID).append(option);
                    }
                    else if (jsonObj[i].ParamName == "BusiLocality") {
                        var option = "<option value=" + jsonObj[i].ParamValue + ">" + jsonObj[i].ParamValue + "</option>";
                        $('#' + ddllocalityID).append(option);
                    }
                    else if (jsonObj[i].ParamName == "BusiInterior") {
                        var option = "<option value=" + jsonObj[i].ParamValue + ">" + jsonObj[i].ParamValue + "</option>";
                        $('#' + ddlinteriorID).append(option);
                    }
                    else if (jsonObj[i].ParamName == "Furnishing") {
                        var option = "<option value=" + jsonObj[i].ParamValue + ">" + jsonObj[i].ParamValue + "</option>";
                        $('#' + ddlfurnishingID).append(option);
                    }
                    else if (jsonObj[i].ParamName == "Exterior") {
                        var option = "<option value=" + jsonObj[i].ParamValue + ">" + jsonObj[i].ParamValue + "</option>";
                        $('#' + ddlexteriorID).append(option);
                    }
                    else if (jsonObj[i].ParamName == "AutomationFax") {
                        var option = "<option value=" + jsonObj[i].ParamValue + ">" + jsonObj[i].ParamValue + "</option>";
                        $('#' + ddlautomationfaxID).append(option);
                    }
                    else if (jsonObj[i].ParamName == "EaseofRepossesion") {
                        var option = "<option value=" + jsonObj[i].ParamValue + ">" + jsonObj[i].ParamValue + "</option>";
                        $('#' + ddleaseofrepossID).append(option);
                    }
                    else if (jsonObj[i].ParamName == "BusinessAssessment") {
                        var option = "<option value=" + jsonObj[i].ParamValue + ">" + jsonObj[i].ParamValue + "</option>";
                        $('#' + ddlbusiassessID).append(option);
                    }
                    //else if (jsonObj[i].ParamName == "ConstructionResidence") {
                    //    var option = "<option value=" + jsonObj[i].ParamValue + ">" + jsonObj[i].ParamValue + "</option>";
                    //    $('#' + ddlconstructionresiID).append(option);
                    //}
                    //else if (jsonObj[i].ParamName == "ResidenceType") {
                    //    var option = "<option value=" + jsonObj[i].ParamValue + ">" + jsonObj[i].ParamValue + "</option>";
                    //    $('#' + ddlresidencetypeID).append(option);
                    //}
                    //else if (jsonObj[i].ParamName == "EaseOfLocation") {
                    //    var option = "<option value=" + jsonObj[i].ParamValue + ">" + jsonObj[i].ParamValue + "</option>";
                    //    $('#' + ddleaseoflocationID).append(option);
                    //}
                    //else if (jsonObj[i].ParamName == "NameVerifiedFrom") {
                    //    var option = "<option value=" + jsonObj[i].ParamValue + ">" + jsonObj[i].ParamValue + "</option>";
                    //    $('#' + ddlnameverifiedID).append(option);
                    //} else if (jsonObj[i].ParamName == " StandardOfLiving") {
                    //    var option = "<option value=" + jsonObj[i].ParamValue + ">" + jsonObj[i].ParamValue + "</option>";
                    //    $('#' + ddlstdoflivingID).append(option);
                    //}
                    //else if (jsonObj[i].ParamName == "EaseofRepossesion") {
                    //    var option = "<option value=" + jsonObj[i].ParamValue + ">" + jsonObj[i].ParamValue + "</option>";
                    //    $('#' + ddleaseofrepossID).append(option);
                    //}
                    //else if (jsonObj[i].ParamName == "ResidenceStatus") {
                    //    var option = "<option value=" + jsonObj[i].ParamValue + ">" + jsonObj[i].ParamValue + "</option>";
                    //    $('#' + ddlresistatusID).append(option);
                    //}
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
            },
        });
    }, 2000)

}





