//send PropID to load location details
var ValID;
var PropID;
var locpropertytype = "";
var ddlmeasurementval;
var summarydropdown;
var ddlAppstatus;
var Imglist = [];
function fngetid(valID, PrpID) {
    $('#modalloading').modal('show');
    GetgeneralDetails();
    GetStatusdetailsforacc(); 

    localStorage.setItem('PropertyType', "1");
    ValID = valID;
    PropID = PrpID;
    ValID = getIDs();
    GetPrpoId = PropID;

    var obj = {
        PropertyID: PrpID
    }

    var PropID = JSON.stringify(obj);
    $.ajax({
        async: true,
        type: "POST",
        url: "landingpage.aspx/Getlocationdetails",
        data: PropID,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $('#modalloading').modal('hide');
            var locdetails = [];
            locdetails = JSON.stringify(response.d);
            var json_obj = $.parseJSON(response.d);//parse JSON 
            for (var i in json_obj) {
                var Country = json_obj[i].Address.Country.toString();
                var State = json_obj[i].Address.State.toString();
                var City = json_obj[i].Address.City.toString();
                GetCountry();

                setTimeout(function () {
                    $("#ddlloccountry").val(Country)
                    GetState(Country);
                    setTimeout(function () {
                        $("#ddllocstate").val(State)
                        Getcity(State);
                        setTimeout(function () {
                            if ($("#ddlloccity option[value='" + City + "']").length) {
                                $("#ddlloccity").val(City)
                            }
                            else {
                                var option = "";
                                option = "<option value='" + City + "'>" + City + "</option>";
                                $("#ddlloccity").append(option);
                                $("#ddlloccity").val(City)
                            }
                        }, 500);
                    }, 500);
                }, 500);

                localStorage.setItem("State", State);
                $("#txtlocValuationPurpose").val(json_obj[i].ValuationPurpose)
                $("#txtlocPropertyID").val(json_obj[i].PropertyID)
                // $('input:radio[name$=LocationDetails][value=' + json_obj[i].Location + ']').prop('checked', true);
                $("#txtlocprojsite").val(json_obj[i].ProjectSiteName)
                $("#txtlocaddr1").val(json_obj[i].Address.AddressLine1)
                $("#txtlocaddr2").val(json_obj[i].Address.AddressLine2)
                $("#txtloclandmark").val(json_obj[i].Address.Landmark)
                $("#txtlocpincode").val(json_obj[i].Address.Pincode)
                $("#txtstreetnameval").val(json_obj[i].Address.StreetName)

                $("#txtlocaddr1").attr("tooltip", json_obj[i].Address.AddressLine1)
                $("#txtlocaddr2").attr("tooltip", json_obj[i].Address.AddressLine2)
                $("#txtloclandmark").attr("tooltip", json_obj[i].Address.Landmark)
                $("#txtlocpincode").attr("tooltip", json_obj[i].Address.Pincode)
                $("#ddlloccountry").attr("tooltip", Country)
                $("#ddllocstate").attr("tooltip", State)
                $("#ddlloccity").attr("tooltip", City)
                $("#txtlocprojsite").attr("tooltip", json_obj[i].ProjectSiteName)
                $("#txtlocproptype").attr("tooltip", json_obj[i].PropertyType)
                $("#txtstreetnameval").attr("tooltip", json_obj[i].Address.StreetName)

                $("#txtloclandmark").attr("data-original-title", json_obj[i].Address.Landmark)
                $("#txtlocpincode").attr("data-original-title", json_obj[i].Address.Pincode)
                $("#txtstreetnameval").attr("data-original-title", json_obj[i].Address.StreetName)
                $("#ddlloccountry").attr("data-original-title", Country)
                $("#ddllocstate").attr("data-original-title", State)
                $("#ddlloccity").attr("data-original-title", City)
                $("#txtlocprojsite").attr("data-original-title", json_obj[i].ProjectSiteName)
                $("#txtlocproptype").attr("data-original-title", json_obj[i].PropertyType)

                localStorage.setItem('PropertyType', json_obj[i].PropertyType);
                $("#txtlocproptype").val(json_obj[i].PropertyType);
                $("#txtpropdoorNo").val(json_obj[i].Address.DoorNumber);
                $("#txtareaname").val(json_obj[i].Address.AddArea);
                locpropertytype = json_obj[i].PropertyType;

                streetName = json_obj[i].Address.StreetName;
                City12 = json_obj[i].Address.City;
                Area = json_obj[i].Address.AddArea;

                fncheckPropFootage();

                if (locpropertytype == "Land") {
                    $("#txtconstruction").attr('disabled', true).parent().parent().hide();
                    $("#txtlift").attr('disabled', true).parent().parent().hide();
                    $("#txtcarpark").attr('disabled', true).parent().parent().hide();
                    $("#txtcovered").attr('disabled', true).parent().parent().hide();
                    $("#txtresident").attr('disabled', true).parent().parent().hide();

                    $("#rdnlocrequireYes").attr('disabled', true).removeAttr('onclick');
                    $("#rdnlocrequireNo").attr('disabled', true).removeAttr('onclick');
                    $("#rdnlocrequireYes").attr('checked', false);

                    $("#rdncomphouse").attr('disabled', true).parent().parent().parent().hide();
                    $("#rdnconshouse").attr('disabled', true).parent().parent().hide();
                    $("#rdncompApart").attr('disabled', true).parent().parent().hide();
                    $("#rdnconsApart").attr('disabled', true).parent().parent().hide();


                    //Property Details Section Items Hidden for Property Type Land
                    $("#rdnlivableyes").attr('disabled', true)
                    $("#rdnlivableyes").attr('checked', false)

                    $("#txtlocFootageReason").parent().parent().hide();
                    $("#rdnlivableno").attr('disabled', true).parent().parent().parent().hide();
                    $("#txthouseage").attr('disabled', true).parent().parent().hide();
                    $("#txtreason").attr('disabled', true).parent().parent().hide();
                    $("#txtfootage").attr('disabled', true).parent().parent().hide();
                    $("#txtfloors").attr('disabled', true).parent().parent().hide();
                    $("#txtrooms").attr('disabled', true).parent().parent().hide();
                    $("#txtsqfoot").attr('disabled', true).parent().parent().hide();
                    $("#txtplinth").attr('disabled', true).parent().parent().hide();
                    $("#txtcommon").attr('disabled', true).parent().parent().hide();
                    $("#txtcommonper").attr('disabled', true).parent().parent().hide();
                    $("#txtcarpet").attr('disabled', true).parent().parent().hide();
                    $("#txtconstruction").attr('disabled', true).parent().parent().hide();


                    //Misc Section Items Hidden for Property Type Land
                    $("#txttypeofstruct").attr("disabled", true).val('').parent().parent().hide();
                    //  $("#txtdwllingunits").attr("disabled", true).val('').parent().parent().hide();
                    $("#txtQuality").attr("disabled", true).val('').parent().parent().hide();
                    $("#txtBuildingAppearance").attr("disabled", true).parent().parent().hide();
                    $("#txtMaintenance").attr("disabled", true).val('').parent().parent().hide();
                    $("#txtFloor").attr("disabled", true).val('').parent().parent().hide();
                    $("#txtspecification").attr("disabled", true).val('').parent().parent().hide();
                    $("#txtAssessment").attr("disabled", true).val('').parent().parent().hide();
                    $("#txttaxpayname").attr("disabled", true).val('').parent().parent().hide();
                    $("#txttaxamount").attr("disabled", true).val('').parent().parent().hide();
                    $("#txtelectricitynum").attr("disabled", true).val('').parent().parent().hide();
                    $("#txtmastercardname").attr("disabled", true).val('').parent().parent().hide();
                    $("#txtresidentialcomm").attr("disabled", true).val('').parent().parent().hide();

                    $("#txtnewcompositelocality").attr("disabled", true).val('').parent().parent().hide();
                    $("#txtreplacecost").attr("disabled", true).val('').parent().parent().hide();
                    $("#txtbuildinglife").attr("disabled", true).val('').parent().parent().hide();

                    $("#tblAmenitiesbuilding").parent().parent().hide();
                    $("#lblAmenitiesbuilding").parent().parent().hide();


                }
                else if (locpropertytype == "Apartment") {
                    $("#txtconstruction").attr('disabled', false)
                    $("#rdncompApart").attr('checked', true);
                    $("#rdnconsApart").attr('checked', false);

                    $("#txttotalarea").attr('disabled', true)
                    $("#txtlocprojsite").attr("disabled", false);
                    $("#rdncomphouse").attr('disabled', true);
                    $("#rdnconshouse").attr('disabled', true);
                    $("#rdncompApart").attr('disabled', false);
                    $("#rdnconsApart").attr('disabled', false);
                }
                else {
                    $("#txtconstruction").attr('disabled', false)
                    $("#rdncomphouse").attr('checked', true);
                    $("#rdnconshouse").attr('checked', false);

                    $("#txtplinth").attr('disabled', true).val('').parent().parent().hide();
                    $("#txtcommon").attr('disabled', true).val('').parent().parent().hide();
                    $("#txtcommonper").attr('disabled', true).val('').parent().parent().hide();
                    $("#txtcarpet").attr('disabled', true).val('').parent().parent().hide();

                    $("#rdncomphouse").attr('disabled', false);
                    $("#rdnconshouse").attr('disabled', false);
                    $("#rdncompApart").attr('disabled', true).parent().parent().hide();
                    $("#rdnconsApart").attr('disabled', true).parent().parent().hide();
                }
            }
            localStorage.setItem("LatLongitue", JSON.stringify(json_obj[i].Address.latlng));
            GetUnits();
            const valSummDesc = setInterval(function () {
                if (fnsummarydropdown() && fnsummarydropdown().length > 0) {
                    var dropoption = '<option value="none">Select</option>' + fnsummarydropdown();
                    $('#ddlpropTypeSum').append(dropoption);
                    $('#ddlProptypeapp').append(dropoption);
                    clearInterval(valSummDesc);
                }
            }, 1000);

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#modalloading').modal('hide');
            //alert("Function: Get ID \nRequest: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);

        },
    });
}

function GetUnits() {
    //alert($('#lblnewuser').html())
    var ortype = getorgtype();
    var utype = getusrtype();
    var path = window.location.pathname;
    var page = path.split("/").pop();
    if (utype == "Appraiser" && ortype == "Company" && page == "register.aspx" && $('#lblnewuser').html() == 'Appraiser Registration') {
        $('#modalloading').modal('show');
        setcreateappraiser();
    }

    var obj;
    var getprop = getpropertytype()

    if (getprop == "Land") {
        if (ortype == "Company") {
            obj = {
                Unit: "Measurement,PropertyType,PropertyDescription,MethodOfValuation,AppraisalStatus,ValuationSummary,Amenities"
                //Unit: "Measurement,PropertyType,PropertyDescription,MethodOfValuation,LandUtility,LandFitness,LandHealth,AppraisalStatus,Building,ValuationSummary,Amenities"
            }
        } else {
            obj = {
                Unit: "Measurement,PropertyType,PropertyDescription,MethodOfValuation,AppraisalStatus,Building,ValuationSummary,Amenities"
                // Unit: "Measurement,PropertyType,PropertyDescription,MethodOfValuation,LandUtility,LandFitness,LandHealth,AppraisalStatus,Building,ValuationSummary,Amenities"
            }
        }
    }
    else {
        if (ortype == "Company") {
            obj = {
                Unit: "Measurement,PropertyType,PropertyDescription,MethodOfValuation,AppraisalStatus,Building,ValuationSummary,Amenities"
                //Unit: "Measurement,PropertyType,PropertyDescription,MethodOfValuation,Utility,Fitness,Health,AppraisalStatus,Building,ValuationSummary,Amenities"
            }

        } else {
            obj = {
                Unit: "Measurement,PropertyType,PropertyDescription,MethodOfValuation,AppraisalStatus,Building,ValuationSummary,Amenities"
                // Unit: "Measurement,PropertyType,PropertyDescription,MethodOfValuation,Utility,Fitness,Health,AppraisalStatus,Building,ValuationSummary,Amenities"
            }
        }
    }
    var jsonobj = JSON.stringify(obj);
    setTimeout(function () {
        Getmeasurementunits(jsonobj.toString());
    }, 500);
}

function Getmeasurementunits(jsonobj) {
    $('#modalloading').modal('show');
    var ortype = getorgtype();
    setTimeout(function () {
        $.ajax({
            type: "POST",
            url: "Appraisalpage.aspx/GetUnits",
            data: jsonobj,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                $('#modalloading').modal('hide');
                ddlmeasurementval = "";
                summarydropdown = "";
                ddlAppstatus = "";
                var jsonObj = JSON.parse(response.d);
                $('#ddlpropunits').empty();
                $('#ddllocunits').empty();
                $('#ddllocunits').append("<option value='none'>Select</option>");
                $('#txtProptype').empty();
                $('#dlamenity').empty();
                $('#dlfitness').empty();
                $('#dlhealth').empty();
                $('#dlAmenitiesbuilding').empty();//Added by Deepa
                $('#ddlselectSubscription').empty();
                $('#ddlselectSubscription').append("<option value='none'>Select your subscription</option>");
                $("#ddlmethodofvaluation").html("");
                var ValuationSummaryArray = [];
                var ValuationSummaryArraysort = [];
                for (var i in jsonObj) {
                    if (jsonObj[i].ParamName == "ValuationSummary") {

                        for (j = 0; j < jsonObj[i].Description.length; j++) {
                            ValuationSummaryArray.push(jsonObj[i].Description[j].ParamValue);
                        }
                        ValuationSummaryArraysort = ValuationSummaryArray.sort();
                        for (k = 0; k < ValuationSummaryArraysort.length; k++) {
                            var option = '<option value="' + ValuationSummaryArraysort[k] + '">' + ValuationSummaryArraysort[k] + "</option>";
                            summarydropdown += option;
                        }
                    }
                    if (jsonObj[i].ParamName == "Measurement") {
                        var option = "<option value='" + jsonObj[i].ParamValue + "'>" + jsonObj[i].ParamValue + "</option>";
                        $('#ddlpropunits').append(option);
                        $('#ddllocunits').append(option);
                    }
                    if (jsonObj[i].ParamName == "Subscription") {
                        var option = "<option value='" + jsonObj[i].ParamValue + "'>" + jsonObj[i].ParamValue + "</option>";
                        console.log(option);
                        $('#ddlselectSubscription').append(option);
                    }
                    if (jsonObj[i].ParamName == "PropertyType") {
                        var option = "<option value='" + jsonObj[i].ParamValue + "'>" + jsonObj[i].ParamValue + "</option>";
                        $('#txtProptype').append(option);
                    }
                    //jsonObj[i].ParamName == "MethodOfValuation" Added by Anupriya
                    if (jsonObj[i].ParamName == "PropertyDescription" || jsonObj[i].ParamName == "MethodOfValuation") {
                        if (locpropertytype == "Land") {
                            ddlmeasurementval = "<option value='Land'>Land</option>";
                            $('#btnaddnewrow').hide()
                            $('#btnremrow').hide()
                        }
                        //Added by Anupriya
                        if (jsonObj[i].ParamName == "MethodOfValuation") {
                            var option = '<option value="' + jsonObj[i].ParamValue + '">' + jsonObj[i].ParamValue + "</option>";
                            $('#ddlmethodofvaluation').append(option);
                        }
                        else {
                            var option = "<option value='" + jsonObj[i].ParamValue + "'>" + jsonObj[i].ParamValue + "</option>";
                            ddlmeasurementval += option;
                        }
                    }

                    if (jsonObj[i].ParamName == "Amenities") {
                        var getprop = getpropertytype();
                        if (getprop == "Land") {
                            var UtilityLandArray = [];
                            var UtilityLandArraysort = [];
                            var FitnessLandArray = [];
                            var FitnessLandArraysort = [];
                            var HealthLandArray = [];
                            var HealthLandArraysort = [];
                            ///Amenities LandUtility.....
                            for (a = 0; a < jsonObj[i].Utility.length; a++) {
                                if (jsonObj[i].Utility[a].PropertyType == "Land") {
                                    UtilityLandArray.push(jsonObj[i].Utility[a].ParamValue);
                                }
                            }
                            UtilityLandArraysort = UtilityLandArray.sort();
                            for (utilitylandarraysort = 0; utilitylandarraysort < UtilityLandArraysort.length; utilitylandarraysort++) {
                                var option = '<option value="' + UtilityLandArraysort[utilitylandarraysort] + '">' + UtilityLandArraysort[utilitylandarraysort] + "</option>";
                                $('#dlamenity').append(option);
                            }
                            ///Amenities LandFitness.....
                            for (b = 0; b < jsonObj[i].Fitness.length; b++) {
                                if (jsonObj[i].Fitness[b].PropertyType == "Land") {
                                    FitnessLandArray.push(jsonObj[i].Fitness[b].ParamValue);
                                }
                            }
                            FitnessLandArraysort = FitnessLandArray.sort();
                            for (fitnesslandarraysort = 0; fitnesslandarraysort < FitnessLandArraysort.length; fitnesslandarraysort++) {
                                var option = '<option value="' + FitnessLandArraysort[fitnesslandarraysort] + '">' + FitnessLandArraysort[fitnesslandarraysort] + "</option>";
                                $('#dlfitness').append(option);
                            }
                            ///Amenities LandHealth.....
                            for (c = 0; c < jsonObj[i].Health.length; c++) {
                                if (jsonObj[i].Health[c].PropertyType == "Land") {
                                    HealthLandArray.push(jsonObj[i].Health[c].ParamValue);
                                }
                            }
                            HealthLandArraysort = HealthLandArray.sort();
                            for (healthlandarraysort = 0; healthlandarraysort < HealthLandArraysort.length; healthlandarraysort++) {
                                var option = '<option value="' + HealthLandArraysort[healthlandarraysort] + '">' + HealthLandArraysort[healthlandarraysort] + "</option>";
                                $('#dlhealth').append(option);
                            }
                        }
                        else {
                            var BuildingArray = [];
                            var BuildingArraysort = [];
                            var UtilityArray = [];
                            var UtilityArraysort = [];
                            var FitnessArray = [];
                            var FitnessArraysort = [];
                            var HealthArray = [];
                            var HealthArraysort = [];
                            var option = '<option selected disabled value=\'' + 'Select' + '\'>' + 'Select' + '</option>';
                            ///Amenities Building.....
                            for (j = 0; j < jsonObj[i].Building.length; j++) {
                                BuildingArray.push(jsonObj[i].Building[j].ParamValue);
                            }
                            BuildingArraysort = BuildingArray.sort();
                            for (buildarraysort = 0; buildarraysort < BuildingArraysort.length; buildarraysort++) {
                                option += '<option value="' + BuildingArraysort[buildarraysort] + '">' + BuildingArraysort[buildarraysort] + "</option>";
                            }
                            $('#dlAmenitiesbuilding').append(option);
                            ///Amenities Utility.....
                            for (k = 0; k < jsonObj[i].Utility.length; k++) {
                                UtilityArray.push(jsonObj[i].Utility[k].ParamValue);
                            }
                            UtilityArraysort = UtilityArray.sort();
                            for (utilityarraysort = 0; utilityarraysort < UtilityArraysort.length; utilityarraysort++) {
                                var option = '<option value="' + UtilityArraysort[utilityarraysort] + '">' + UtilityArraysort[utilityarraysort] + "</option>";
                                $('#dlamenity').append(option);
                            }
                            ///Amenities Fitness.....                       
                            for (l = 0; l < jsonObj[i].Fitness.length; l++) {
                                FitnessArray.push(jsonObj[i].Fitness[l].ParamValue);
                            }
                            FitnessArraysort = FitnessArray.sort();
                            for (fitnessarraysort = 0; fitnessarraysort < FitnessArraysort.length; fitnessarraysort++) {
                                var option = '<option value="' + FitnessArraysort[fitnessarraysort] + '">' + FitnessArraysort[fitnessarraysort] + "</option>";
                                $('#dlfitness').append(option);
                            }
                            ///Amenities Health.....                       
                            for (m = 0; m < jsonObj[i].Health.length; m++) {
                                HealthArray.push(jsonObj[i].Health[m].ParamValue);
                            }
                            HealthArraysort = HealthArray.sort();
                            for (healtharraysort = 0; healtharraysort < HealthArraysort.length; healtharraysort++) {
                                var option = '<option value="' + HealthArraysort[healtharraysort] + '">' + HealthArraysort[healtharraysort] + "</option>";
                                $('#dlhealth').append(option);
                            }

                        }
                    }


                    if (jsonObj[i].ParamName == "AppraisalStatus") {
                        var option = '<option value="' + jsonObj[i].ParamValue + '">' + jsonObj[i].ParamValue + "</option>";
                        ddlAppstatus += option;
                    }
                }
                $('#ddlmethodofvaluation option[value="' + sessionStorage.getItem("valMethd") + '"]').attr("selected", "selected");//Added by Anupriya
                $('#ddllocunits').val('ground(s)');                //$('#modalloading').modal('hide');
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //alert(errorThrown);
                $('#modalloading').modal('hide');
                // $('#modalloading').modal('hide');
                //alert("Function: Getmeasurementunits12 \nRequest: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
            },
        });
    }, 2000)
}

function AdminUserDropDetails() {

    var UserId = getuserID();
    var obj = {
        UserID: UserId
    }
    AdminUserDetails(JSON.stringify(obj));
}

//Added by Nirmala
function AdminUserDetails(obj) {
    $('#modalloading').modal('show');
    $.ajax({
        type: "POST",
        url: "Appraisalpage.aspx/GetAdminUserDetails",
        data: obj,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            $('#modalloading').modal('hide');
            admindrop = "";
            var jsonObj = JSON.parse(response.d);
            if (jsonObj == "" || jsonObj == undefined) {
                $('#textgenvalasso').prop("disabled", true);
                return;
            }

            $('#textgenvalasso').empty();
            if (jsonObj[0].AssociationDetails == undefined || jsonObj[0].AssociationDetails == null || jsonObj[0].AssociationDetails == "") {
                $('#textgenvalasso').prop("disabled", true);
                return;
            }
            if (jsonObj[0].AssociationDetails.length < 1) {
                $('#textgenvalasso').prop("disabled", true);
                return;
            }
            if (jsonObj[0].AssociationDetails.length == 1) {
                var textgenvalasso = jsonObj[0].AssociationDetails[0].AssociationName;
                var html = "<input type= 'text' class= 'form-control txtboxsize' id= 'textgenvalasso' readonly= 'readonly' value='" +textgenvalasso+ "' />";
                $("#textgenvalasso").replaceWith(html);
            }
            else {
                for (var i = 0; i < jsonObj[0].AssociationDetails.length; i++) { // Added by Nirmala
                    //    if (jsonObj[0].AssociationDetails[i].AssociationName != "" || jsonObj[0].AssociationDetails[i].AssociationName != undefined) {
                    //        var option = "<option value='" + jsonObj[0].AssociationDetails[i].AssociationName + "'>" + jsonObj[0].AssociationDetails[i].AssociationName + "</option>";
                    //        $('#textgenvalasso').append(option);
                    //        admindrop += option;
                    //    }

                    //}
                    if (jsonObj[0].AssociationDetails[i].AssociationName != "" || jsonObj[0].AssociationDetails[i].AssociationName != undefined || jsonObj[0].AssociationDetails[i].AssociationName != null) {
                        var option = "<option value='" + jsonObj[0].AssociationDetails[i].AssociationName + "'>" + jsonObj[0].AssociationDetails[i].AssociationName + "</option>";
                        $('#textgenvalasso').append(option);
                        admindrop += option;
                    }
                    //if (jsonObj[0].AssociationDetails.length == 1) {
                    //    //   $('#textgenvalasso').replaceWith($('<input/>', { 'type': 'text', 'class': 'form-control', 'id': 'textgenvalasso', 'disabled': 'disabled' }));
                    //    var textgenvalasso = jsonObj[0].AssociationDetails[0].AssociationName;
                    //   // $('#textgenvalasso').replaceWith($('<input/>', { 'type': 'text', 'class': 'form-control', 'id': 'textgenvalasso', 'disabled': 'disabled', 'value': '+textgenvalasso +' }));

                    //    var html = "<input type= 'text' class= 'form-control txtboxsize' id= 'textgenvalasso' readonly= 'readonly' value=" + textgenvalasso + " />";
                    //    $("#textgenvalasso").replaceWith(html);
                    //}
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#modalloading').modal('hide');
        },
    });
}


function setcreateappraiser() {
    var obj = {
        UserID: getappid()
    }
    var value = JSON.stringify(obj);
    $.ajax({
        type: "POST",
        url: "Userconfig.aspx/GetUserdetailsonchange",
        data: value,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $('#modalloading').modal('hide');
            var jsonObj = JSON.parse(response.d);
            $("#Txtcompname").val(jsonObj[0].CompanyName);
            $("#Txtcompname").attr('disabled', true);
            $("#ddlusrrole").val("User");
            $("#txtphone").val(jsonObj[0].ContactDetails.PhoneNo)
            $("#txtmobile").val(jsonObj[0].ContactDetails.MobileNo)
            $("#txtemail").val(jsonObj[0].ContactDetails.EmailID)
            $("#txtaddr1").val(jsonObj[0].Address.AddressLine1)
            $("#txtaddr2").val(jsonObj[0].Address.AddressLine2)
            $("#txtlandmark").val(jsonObj[0].Address.Landmark)
            $("#txtArea").val(jsonObj[0].Address.AddArea)
            $("#txtpincode").val(jsonObj[0].Address.Pincode)
            GetCountry();
            setTimeout(function () {
                $("#ddlcountry").val(jsonObj[0].Address.Country)
                GetState(jsonObj[0].Address.Country);
                setTimeout(function () {
                    $("#ddlstate").val(jsonObj[0].Address.State)
                    Getcity(jsonObj[0].Address.State);
                    setTimeout(function () {
                        if ($("#ddlcity option[value='" + jsonObj[0].Address.City + "']").length) {
                            $("#ddlcity").val(jsonObj[0].Address.City)
                        }
                        else {
                            var option = "";
                            option = "<option value='" + jsonObj[0].Address.City + "'>" + jsonObj[0].Address.City + "</option>";
                            $("#ddlcity").append(option);
                            $("#ddlcity").val(jsonObj[0].Address.City)
                        }
                        $("#ddlOrgType").val("Individual");
                        $("#ddlOrgType").attr('readonly', true);
                        $("#ddlusrrole").attr('readonly', true);
                        $("#ddlOrgType").attr('disabled', true);
                        $("#ddlusrrole").attr('disabled', true);
                        $("#ddlOrgType").val("Individual").trigger('change');
                        fnchkcompany();
                        setTimeout(function () {
                            $("#ddlusrrole").val("User");
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 1000);

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#modalloading').modal('hide');
            //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });
}

function admindropdown() {
    return admindrop;
}
function fnsummarydropdown() {
    return summarydropdown;
}
function getdropdownval() {
    return ddlmeasurementval;
}

function getdropstatus() {
    return ddlAppstatus;
}

//To get status Of each section for a valuation record
//and setting header colors based on the status.
function GetStatusdetailsforacc() {
    var valID = getIDs();
    var obj = {
        ValuationID: valID
    }
    var Approvaldet = JSON.stringify(obj);
    $.ajax({
        async: true,
        type: "POST",
        url: "landingpage.aspx/GetStatusAcc",
        data: Approvaldet,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            tblbuildest
            $('#modalloading1').modal('show');
            var statusdetails = [];
            statusdetails = JSON.stringify(response.d);
            $('#modalloading1').modal('hide');
            var json_obj = $.parseJSON(response.d);
            for (var i in json_obj) {
                var PriceStatus = json_obj[i].PricingStatus;
                var AmenitiesStatus = json_obj[i].AmenitiesStatus;
                var ApprovalStatus = json_obj[i].ApprovalStatus;
                var GeneralStatus = json_obj[i].GeneralStatus;//Added by Nirmala
                var PropDescStatus = json_obj[i].PropDescStatus;//Added by Nirmala
                var StatutoryStatus = json_obj[i].StatutoryStatus;//Added by Nirmala
                var BuildingStatus = json_obj[i].BuildingStatus;//Added by Anupriya
                var ValuationGeneralStatus = json_obj[i].ValuationGeneralStatus;//Added by Anupriya
                var LandStatus = json_obj[i].LandStatus;//Added by Deepa
                var ServiceStatus = json_obj[i].ServiceStatus;//Added by Deepa
                var AppraisalStatus = json_obj[i].AppraisalStatus;
                var SummaryStatus = json_obj[i].SummaryStatus;
                var MiscStatus = json_obj[i].MiscelaneousStatus;
                $("#locationheading").css("background", "rgba(68, 125, 7, 0.47)");
                var appraisalstatus = json_obj[i].AppraisalStatus;
                if (appraisalstatus == "InProgress") {
                    $("#spnstatval").html("In Progress")
                }
                else {
                    $("#spnstatval").html(appraisalstatus)
                }

                if (appraisalstatus == "Submitted") {
                    $("#btnsendEmail").attr('disabled', false);
                }
                else {
                    $("#btnsendEmail").attr('disabled', true);
                }

                if (appraisalstatus == "Submitted" || appraisalstatus == "Submitted to Approver") {
                    GetUnits();
                    $('#divAppraisalapproval').collapse('show');
                    $('.modal-backdrop').remove();
                    $('fade in').remove();
                    setTimeout(function () {
                        GetAccptstatus();
                    }, 1000);
                }

              /*  if (PriceStatus == "New") {
                    $("#DivSummarydetailsaccordion").addClass("notactive")
                    $("#sumheading").css("background", "rgba(193,193,193,1)");
                }*/
                if (GeneralStatus == "Completed" || GeneralStatus == "Retrieved")
                { 
                    $("#generalheading").css("background", "rgba(68, 125, 7, 0.47)"); 
                }
                if (PropDescStatus == "Completed" || PropDescStatus == "Retrieved")
                { 
                    $("#propertydescheading").css("background", "rgba(68, 125, 7, 0.47)");
                }
                if (BuildingStatus == "Completed" || BuildingStatus == "Retrieved") //Added by Anupriya
                { 
                    $("#buildingheading").css("background", "rgba(68, 125, 7, 0.47)");
                }
                if (LandStatus == "Completed" || LandStatus == "Retrieved")//Added by Deepa
                { 
                    $("#Landheading").css("background", "rgba(68, 125, 7, 0.47)");
                }
                if (AmenitiesStatus == "Completed" || AmenitiesStatus == "Retrieved")
                { 
                    $("#amenityheading").css("background", "rgba(68, 125, 7, 0.47)");
                }
                if (StatutoryStatus == "Completed" || StatutoryStatus == "Retrieved")
                { 
                    $("#statutoryheading").css("background", "rgba(68, 125, 7, 0.47)");
                }
                if (ServiceStatus == "Completed" || ServiceStatus == "Retrieved") //Added by Deepa
                { 
                    $("#Servicesheading").css("background", "rgba(68, 125, 7, 0.47)");
                }
                if (ValuationGeneralStatus == "Completed" || ValuationGeneralStatus == "Retrieved") //Added by Anupriya
                { 
                    $("#valgenheading").css("background", "rgba(68, 125, 7, 0.47)");
                }
                if (SummaryStatus == "Completed" || SummaryStatus == "Retrieved")
                {
                    $("#sumheading").css("background", "rgba(68, 125, 7, 0.47)");
                }
                if(ApprovalStatus == "Completed" || ApprovalStatus == "Retrieved")
                {
                    $("#Approvalheading").css("background", "rgba(68, 125, 7, 0.47)");
                }
               
                
                

                //if (ApprovalStatus == "Completed")
               // { $("#Approvalheading").css("background", "rgba(68, 125, 7, 0.47)"); }
                /*if (PriceStatus == "Completed")
                { $("#priceheading").css("background", "rgba(68, 125, 7, 0.47)"); $("#DivSummarydetailsaccordion").removeClass("notactive"); $("#sumheading").css("background", ""); }*/
               // if (AmenitiesStatus == "Completed")
               // { $("#amenityheading").css("background", "rgba(68, 125, 7, 0.47)"); }
               // if (SummaryStatus == "Completed") {
               //     $("#sumheading").css("background", "rgba(68, 125, 7, 0.47)");
               // }
               // if (MiscStatus == "Completed")
              //  { $("#MiscHeading").css("background", "rgba(68, 125, 7, 0.47)"); }

               // if (ApprovalStatus == "Retrieved")
              //  { $("#Approvalheading").css("background", "rgba(68, 125, 7, 0.47)"); }

               
                //if (ValuationGeneralStatus == "Completed") //Added by Anupriya
               // { $("#valgenheading").css("background", "rgba(68, 125, 7, 0.47)"); }
               // if (LandStatus == "Completed") //Added by Deepa
               // { $("#Landheading").css("background", "rgba(68, 125, 7, 0.47)"); }
                //if (ServiceStatus == "Completed") //Added by Deepa
                //{ $("#Servicesheading").css("background", "rgba(68, 125, 7, 0.47)"); }
               /* if (PriceStatus == "Retrieved") {
                    $("#priceheading").css("background", "rgba(68, 125, 7, 0.47)");
                    if (SummaryStatus == "New") {
                        $("#DivSummarydetailsaccordion").removeClass("notactive");
                        $("#sumheading").css("background", "");
                    } else if (SummaryStatus == "Retrieved" || SummaryStatus == "Completed") {
                        $("#sumheading").css("background", "rgba(68, 125, 7, 0.47)");
                    }
                }*/
              //  if (AmenitiesStatus == "Retrieved")
              //  { $("#amenityheading").css("background", "rgba(68, 125, 7, 0.47)"); }

                //if (SummaryStatus == "Retrieved")
               // { $("#sumheading").css("background", "rgba(68, 125, 7, 0.47)"); }
              //  if (MiscStatus == "Retrieved")
              //  { $("#MiscHeading").css("background", "rgba(68, 125, 7, 0.47)"); }
               // if (BuildingStatus == "Retrieved") //Added by Anupriya
               // { $("#buildingheading").css("background", "rgba(68, 125, 7, 0.47)"); }
              //  if (ValuationGeneralStatus == "Retrieved") //Added by Anupriya
               // { $("#valgenheading").css("background", "rgba(68, 125, 7, 0.47)"); }
               // if (LandStatus == "Retrieved")//Added by Deepa
               // { $("#Landheading").css("background", "rgba(68, 125, 7, 0.47)"); }
               // if (ServiceStatus == "Retrieved") //Added by Deepa
               // { $("#Servicesheading").css("background", "rgba(68, 125, 7, 0.47)"); }
                //Added by Nirmala
                if (StatutoryStatus == "New") {
                   // $("#Divstatutoryaccordion").addClass("notactive")
                    //$("#statutoryheading").css("background", "rgba(193,193,193,1)");
                    //$("#statutoryheading").css("background", "rgba(68, 125, 7, 0.47)");
                }

                //if (StatutoryStatus == "Completed")
                //{ $("#statutoryheading").css("background", "rgba(68, 125, 7, 0.47)"); }

               // if (StatutoryStatus == "Retrieved")
               // { $("#statutoryheading").css("background", "rgba(68, 125, 7, 0.47)"); }

                //Added by Nirmala
                if (GeneralStatus == "New") {
                   // $("#Divgeneraldetailsaccordion").addClass("notactive")
                    //$("#generalheading").css("background", "rgba(193,193,193,1)");
                    //$("#generalheading").css("background", "rgba(68, 125, 7, 0.47)");
                }
                if (PropDescStatus == "New") {
                   // $("#DivpropertyDescaccordion").addClass("notactive")
                   // $("#propertydescheading").css("background", "rgba(193,193,193,1)");
                    //$("#propertydescheading").css("background", "rgba(68, 125, 7, 0.47)");
                }
               // if (GeneralStatus == "Completed")
               // { $("#generalheading").css("background", "rgba(68, 125, 7, 0.47)"); }

               // if (PropDescStatus == "Completed")
              //  { $("#propertydescheading").css("background", "rgba(68, 125, 7, 0.47)"); }

               // if (GeneralStatus == "Retrieved")
              //  { $("#generalheading").css("background", "rgba(68, 125, 7, 0.47)"); }

              //  if (PropDescStatus == "Retrieved")
               // { $("#propertydescheading").css("background", "rgba(68, 125, 7, 0.47)"); }



                var usrtype = getusrtype();
                var ortype = getorgtype();
                if ((ortype == "Company" && usrtype == "Appraiser") && (appraisalstatus == "Submitted" || appraisalstatus == "Approved" || appraisalstatus == "Rejected" || appraisalstatus == "Rejected By Approver" || appraisalstatus == "Approved By Approver")) {
                    $("#myAccordion :input").attr({ disabled: true, readonly: true });
                }
                else if ((ortype != "Company" && usrtype == "Appraiser") && (appraisalstatus == "Submitted" || appraisalstatus == "Submitted to Approver" || appraisalstatus == "Approved" || appraisalstatus == "Rejected" || appraisalstatus == "Rejected By Approver" || appraisalstatus == "Approved By Approver")) {
                    $("#myAccordion :input").attr({ disabled: true, readonly: true });
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert("Function: GetStatusdetailsforacc \nRequest: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });

}

function fnpropclear() {
    $('#txtProptype').val('Apartment');
    txtProjsitename.value = "";
    txtpropArea.value = "";
   // txtValuationPurpose.value = "";
    txtpropLM.value = "";
    txtproppin.value = "";
    ddlpropcountry.selectedIndex = 0;
    ddlpropstate.selectedIndex = 0;
    ddlpropcity.selectedIndex = 0;
    ddlstreetname.selectedIndex = 0;
    ddlareaname.selectedIndex = 0;
    document.getElementById("rdnMetro").checked = true;
    txtdoorNo.value = "";
    $("#ddlpropcountry").trigger('change.select2');
    $("#ddlpropstate").trigger('change.select2');
    $("#ddlpropcity").trigger('change.select2');
    $("#ddlstreetname").trigger('change.select2');
    $("#ddlareaname").trigger('change.select2');
    //  $("#txtValuationPurpose").val("");
   // fnpropok();//Property Add Functionality
    
}
//Property Add Functionality
/*function fnalert()
{
    var msgs = "<div style='font-weight:bold'>Are you need to go back Assign Appraisal Page<br />";
    $(function () {
        bootbox.dialog({
            closeButton: true,
            message: msgs,
            buttons: {
                success: {
                    label: "Back",
                    callback: fnpropclear
                }
            }
        });
    });
}

function fnpropok() {    
    window.location.href = "Assignappraiser.aspx"
}*///Property Add Functionality

function fnresetlocdetails() {
    txtlocproptype.value = "";
    txtlocprojsite.value = "";
    txtlocaddr1.value = "";
    txtlocaddr2.value = "";
    txtloclandmark.value = "";
    txtlocpincode.value = "";
    ddlloccountry.selectedIndex = 0;
    ddllocstate.selectedIndex = 0;
    ddlloccity.selectedIndex = 0;
    document.getElementById("rdnlocmetro").checked = true;
    txtlocPropertyID.value = "";
}

function GetApprovaldetails() {
    var valID = getIDs();
    var obj = {
        ValuationID: valID
    }
    var Approvaldet = JSON.stringify(obj);
    $.ajax({
        type: "POST",
        url: "landingpage.aspx/GetApprovaldetail",
        data: Approvaldet,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            try {
                $('#modalloading').modal('hide');
                var approvaldetails = [];
                approvaldetails = JSON.stringify(response.d);
                var json_obj = $.parseJSON(response.d);
                var zone = "";
                var sro = "";
                var vill = "";
                //var earmarkforgovt = "";
                var forestorcostalreason = "";
                var und;
                // if (json_obj.ApprovalDetails.ApprovedStatus != "" && json_obj.ApprovalDetails.ApprovedStatus != und && json_obj.ApprovalDetails.ApprovedStatus != null) {
                //     $('input:radio[name$=Approved][value="' + json_obj.ApprovalDetails.ApprovedStatus + '"]').prop('checked', true);
                // }

                if (json_obj.ApprovalDetails.GovtAuthorityID != "" && json_obj.ApprovalDetails.GovtAuthorityID != und && json_obj.ApprovalDetails.GovtAuthorityID != null) {
                    $('input:radio[name$=Approvedby][value=' + json_obj.ApprovalDetails.GovtAuthorityID + ']').prop('checked', true);
                }
                //var obj = $('input:radio[name$=Approved]:checked');
                // txtboxenabled($(obj).get(0));
                $("#txtApprovaNo").val(json_obj.ApprovalDetails.ApprovalNoandDate)
                $("#txtnonapproval").val(json_obj.ApprovalDetails.NonApprovalReason)
                //  $("#txtReleaseCertNo").val(json_obj.ReleaseCertNo)
                //   $('input:radio[name$=LandEnmarked][value=' + json_obj.MarkedforGovtProj + ']').prop('checked', true);
                //   $('input:radio[name$=LandZone][value=' + json_obj.DeRegulatedZoneProject + ']').prop('checked', true);
                //   (json_obj.RegnDetails.RegnStatus == "Yes") ? $("#rdnalreadyregYes").click() : $("#rdnalreadyregNo").click();
                //   $('input:radio[name$=AlreadyRegistered][value=' + json_obj.RegnDetails.RegnStatus + ']').prop('checked', true);
                //   $("#txtdateofregn").val(json_obj.RegnDetails.RegnDate)
                zone = json_obj.RegnDetails.Zone;
                sro = json_obj.RegnDetails.SroLocation;
                vill = json_obj.RegnDetails.Village;
                // earmarkforgovt = json_obj.earmarkForGovt; //Added By Anupriya
                forestorcostalreason = json_obj.forestOrCoastalReason; //Added By Anupriya
                //$("#landearmarkgovtid").val(earmarkforgovt)//Added By Anupriya
                $("#landforestzoneid").val(forestorcostalreason)//Added By Anupriya
                $("#landAptid").val(json_obj.RegnDetails.RegnReason)//Added By Anupriya
                // $("#txtundividedshare").val(json_obj.RegnDetails.UndividedShare)
                $("#txtsurveyno").val(json_obj.RegnDetails.SurveyNumber)
                $("#txtsurveydate").val(json_obj.RegnDetails.SurveyDate)

                //      $("#txtRegistrationvalue").val(json_obj.RegnDetails.RegnValue)
                $("#txtregName").val(json_obj.RegnDetails.RegnName)
                $("#txtpaidland").val(json_obj.PropertyTaxLand)//Added By Anupriya
                $("#txtpaidhouse").val(json_obj.PropertyTaxHouse)//Added By Anupriya
                $("#txtpaidwater").val(json_obj.PropertyTaxWater)//Added By Anupriya

                if (zone.trim() != "") {
                    $("#ddlzone").val(zone);
                    //$("#txtZone").val(zone);

                    retrievezonelist('SRO');
                    setTimeout(function () {
                        $("#ddlsroloc").val(sro);
                        retrievezonelist('Village');
                        setTimeout(function () {
                            $("#ddlvillage").val(vill);
                        }, 100)
                    }, 100)
                }

                $('#modalloading').modal('hide');
            } catch (Ex) {
                console.log("Exceptn = " + Ex);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#modalloading').modal('hide');
            alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });

}

function saveApprovaldetails(objApproval) {
    $.ajax({
        type: "POST",
        url: "landingpage.aspx/saveApprovaldetails",
        data: objApproval,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $('#modalloading').modal('hide');
            var approvaldetails = [];
            approvaldetails = JSON.stringify(response.d);
            var json_obj = $.parseJSON(response.d);//parse JSON
            if (json_obj == "1") {
                $("#Approvalheading").css("background", "rgba(68, 125, 7, 0.47)");
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Approval Details Saved Successfully...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                  //  bootbox.alert("Approval Details saved successfully");
                    $('#modalloading').modal('hide');
                });
            }
            else if (json_obj == "2") {
                $("#Approvalheading").css("background", "rgba(68, 125, 7, 0.47)");
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Approval Details Saved Successfully <br /> Guide Line Value For the Given Survey Number is not Available in TN Government WebSite...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 3000);
                   // bootbox.alert("Approval Details saved successfully <br /> Guide Line Value For the Given Survey Number is not Available in TN Government WebSite");
                    $('#modalloading').modal('hide');
                });
            }
            else if (json_obj == "3") {
                $("#Approvalheading").css("background", "rgba(68, 125, 7, 0.47)");
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Approval Details Saved Successfully <br /> Unable to get the Guideline Value for the Given Survey Number from TN Government WebSite...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 3000);
                    //bootbox.alert("Approval Details saved successfully <br /> Unable to get the guideline value for the Given Survey Number from TN Government WebSite");
                    $('#modalloading').modal('hide');
                });
            }

            else if (json_obj != "1" && json_obj != "0") {
                bootbox.dialog({
                    closeButton: true,
                    size: 'medium',
                    message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Approval Details Saved Successfully...</p>',
                });
                setTimeout(function () {
                    bootbox.hideAll();
                }, 2500);
                //bootbox.alert("Approval Details saved successfully");
                $('#modalloading').modal('hide');
                fnsaveApprovaldetails();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#modalloading').modal('hide');
        },
    });
}
//Added By Nirmala
function saveGeneraldetails(objgeneraldetails) {
    $.ajax({
        type: "POST",
        url: "landingpage.aspx/saveGeneraldetails",
        data: objgeneraldetails,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $('#modalloading').modal('hide');
            var generaldetails = [];
            generaldetails = JSON.stringify(response.d);
            var json_obj = $.parseJSON(response.d);//parse JSON
            if (json_obj == "1") {
                $("#generalheading").css("background", "rgba(68, 125, 7, 0.47)");
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> General Details Saved Successfully...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                   // bootbox.alert("General Details saved successfully");
                    $('#modalloading').modal('hide');
                });
            }
            else if (json_obj == "2") {
                $("#generalheading").css("background", "rgba(68, 125, 7, 0.47)");
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> General Details Saved Successfully <br /> Guide Line Value For the Given Survey Number is not Available in TN Government WebSite...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 3000);
                    //bootbox.alert("General Details saved successfully <br /> Guide Line Value For the Given Survey Number is not Available in TN Government WebSite");
                    $('#modalloading').modal('hide');
                });
            }
            else if (json_obj == "3") {
                $("#Generalheading").css("background", "rgba(68, 125, 7, 0.47)");
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> General Details Saved Successfully <br /> Unable to get the Guideline Value for the Given Survey Number from TN Government WebSite...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 3000);
                    //bootbox.alert("General Details saved successfully <br /> Unable to get the guideline value for the Given Survey Number from TN Government WebSite");
                    $('#modalloading').modal('hide');
                });
            }

            else if (json_obj != "1" && json_obj != "0") {
              bootbox.dialog({
                    addClass: 'alertbootbox',
                    closeButton: true,
                     size: 'medium',
                    // type: 'sucess',
                  //   className: 'rubberBand animated',
                  //   animate: true,
                    //buttons: {
                    //    success: {
                    //        label: "OK"
                    //       // callback: fnpropclear
                    //    }
                        //},
                     //height: "1%",
                     message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> General Details Saved Successfully...</p>'
                   
                });
                  setTimeout(function () {
                   bootbox.hideAll();
                  }, 2500);

                // bootbox.alert("General Details saved successfully");
                $('#modalloading').modal('hide');
                // fnsaveGeneral();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#modalloading').modal('hide');
        },
    });
}

function savepropdescdetails(objpropdescdetails) {
    $.ajax({
        type: "POST",
        url: "landingpage.aspx/savepropdescdetails",
        data: objpropdescdetails,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $('#modalloading').modal('hide');
            var propdescdetails = [];
            propdescdetails = JSON.stringify(response.d);
            var json_obj = $.parseJSON(response.d);//parse JSON
            if (json_obj == "1") {
                $("#propertydescheading").css("background", "rgba(68, 125, 7, 0.47)");
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Property Description Details Saved Successfully...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);

                   // bootbox.alert("Property Description Details saved successfully");
                    $('#modalloading').modal('hide');
                });
            }
            else if (json_obj == "2") {
                $("#propertydescheading").css("background", "rgba(68, 125, 7, 0.47)");
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Property Details Saved Successfully <br /> Guide Line Value For the Given Survey Number is not Available in TN Government WebSite...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 3000);
                 //   bootbox.alert("Property Details saved successfully <br /> Guide Line Value For the Given Survey Number is not Available in TN Government WebSite");
                    $('#modalloading').modal('hide');
                });
            }
            else if (json_obj == "3") {
                $("#propertydescheading").css("background", "rgba(68, 125, 7, 0.47)");
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Property Description Details Saved Successfully <br /> Unable to get the Guideline value for the Given Survey Number from TN Government WebSite...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 3000);
                 //   bootbox.alert("Property Description Details saved successfully <br /> Unable to get the guideline value for the Given Survey Number from TN Government WebSite");
                    $('#modalloading').modal('hide');
                });
            }

            //else if (json_obj != "1" && json_obj != "0") {
            //    bootbox.alert("Property Description Details saved successfully");
            //    $('#modalloading').modal('hide');
            //    //fnsavePropdesc();
            //}
            else if (json_obj != "1" && json_obj != "0") {
              //  if (json_obj == "1") {
                    $("#propertydescheading").css("background", "rgba(68, 125, 7, 0.47)");
                    $(function () {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'medium',
                            message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Property Description Details Saved Successfully...</p>',
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 2500);
                      //  bootbox.alert("Property Description Details saved successfully");
                        $('#modalloading').modal('hide');
                    });
            //    }

                //fnsavePropdesc();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#modalloading').modal('hide');
        },
    });
}

//Added by Nirmala
function savestatutorydetails(objstatutorydetails) {
    $.ajax({
        type: "POST",
        url: "landingpage.aspx/savestatutorydetails",
        data: objstatutorydetails,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $('#modalloading').modal('hide');
            var statutorydetails = [];
            statutorydetails = JSON.stringify(response.d);
            var json_obj = $.parseJSON(response.d);//parse JSON
            if (json_obj == "1") {
                $("#statutoryheading").css("background", "rgba(68, 125, 7, 0.47)");
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Statutory Details Saved Successfully...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                    //    bootbox.alert("Statutory Details saved successfully");
                    $('#modalloading').modal('hide');
                });
            }
            else if (json_obj == "2") {
                $("#statutoryheading").css("background", "rgba(68, 125, 7, 0.47)");
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Statutory Details Saved Successfully <br /> Guide Line Value For the Given Survey Number is not Available in TN Government WebSite...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 3000);
                    //  bootbox.alert("Statutory Details saved successfully <br /> Guide Line Value For the Given Survey Number is not Available in TN Government WebSite");
                    $('#modalloading').modal('hide');
                });
            }
            else if (json_obj == "3") {
                $("#statutoryheading").css("background", "rgba(68, 125, 7, 0.47)");
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Statutory Description Details Saved Successfully <br /> Unable to get the Guideline value for the Given Survey Number from TN Government WebSite...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 3000);
                  //  bootbox.alert("Statutory Description Details saved successfully <br /> Unable to get the guideline value for the Given Survey Number from TN Government WebSite");
                    $('#modalloading').modal('hide');
                });
            }

            //else if (json_obj != "1" && json_obj != "0") {
            //    bootbox.alert("Statutory Description Details saved successfully");
            //    $('#modalloading').modal('hide');
            //    //fnsavePropdesc();
            //}
            else if (json_obj != "1" && json_obj != "0") {
                $("#statutoryheading").css("background", "rgba(68, 125, 7, 0.47)");
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Statutory Details Saved Successfully...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                    //  bootbox.alert("Statutory Description Details saved successfully");
                    $('#modalloading').modal('hide');
                    //fnsavePropdesc();
                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#modalloading').modal('hide');
        },
    });
}
//Added by Nirmala
function GetstatutoryDetails() {
    var valID = getIDs();
    var obj = {
        ValuationID: valID
    }
    var valID = JSON.stringify(obj);
    $.ajax({
        type: "POST",
        url: "landingpage.aspx/GetstatutoryDetails",
        data: valID,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $('#modalloading').modal('hide');
            var statutorydetails = [];
            var json_obj = $.parseJSON(response.d);
            var ReservedLand;
            var ReservedLandtext;
            //if (json_obj[0].Statutory.MarkedforGovtProj == "Notified_for_by_Govt" || json_obj[0].Statutory.MarkedforGovtProj == "Notified_under_agency_area"
            //    || json_obj[0].Statutory.MarkedforGovtProj == "Scheduled_Area" || json_obj[0].Statutory.MarkedforGovtProj == "Contonment_Area") {
            //    ReservedLand = json_obj[0].Statutory.MarkedforGovtProj;
            //    $("#otherstext").hide();
            //}
            //else {
            //    ReservedLandtext = json_obj[0].Statutory.MarkedforGovtProj.Others;
            //    ReservedLand = "Others";
            //    $("#otherstext").show();
            //}
            for (var i in json_obj) {

                $("#txtstatrest").val(json_obj[0].Statutory.RestrictiveClause)
                $("#txtstatdrawing").val(json_obj[0].Statutory.ProbDrawingApproval)
                $("#txtstatreserved9").val(json_obj[0].Statutory.MarkedforGovtProj.Comments)
                $("#txtstatappnumber").val(json_obj[0].Statutory.ApprovalNo)
                $("#txtstatappdate").val(json_obj[0].Statutory.ApprovalDate)
                $('#txtReleaseCertNo').val(json_obj[0].Statutory.ReleaseCertificateNo)
                $("#txtstatsanction").val(json_obj[0].Statutory.InSyncWithPlan)
                $("#txtstatvariations").val(json_obj[0].Statutory.InSyncVariationEffect)
                $("#txtstatempanelled").val(json_obj[0].Statutory.CommentsValuers)
                $("#txtstatvalued").val(json_obj[0].Statutory.EarlierValuation)
                $("#txtstatassess").val(json_obj[0].Statutory.PropTaxAssessmentNumber)
                $("#txtstattaxamt").val(json_obj[0].Statutory.PropTaxAmount)
                $("#txtstattaxreceipt").val(json_obj[0].Statutory.PropTaxReceiptNo)
                $("#txtstatdatepaid").val(json_obj[0].Statutory.PropTaxPaidPeriod)
                $("#txtstattaxpaid").val(json_obj[0].Statutory.PropTaxPayerName)
                $("#txtstatelectricity").val(json_obj[0].Statutory.ElectricityNum)
                $("#txtstatmaster").val(json_obj[0].Statutory.ElectricityInNameOf)
                $("#txtstatwealth").val(json_obj[0].Statutory.WealthTaxPaidAmount)
                $("#txtstatease").val(json_obj[0].Statutory.AgreementOfEasements)
                $("#txtstatwater").val(json_obj[0].Statutory.PropertyTaxWater)
                $('input:radio[name$=stattypeofuse][value=' + json_obj[0].Statutory.LandUsageType + ']').prop('checked', true);
                $('input:radio[name$=statreserved][value=' + json_obj[0].Statutory.MarkedforGovtProj.ReservedLand + ']').prop('checked', true);
                $('input:radio[name$=Approved][value=' + json_obj[0].Statutory.ProjectApproved + ']').prop('checked', true);
                $('input:radio[name$=statcontemplated][value=' + json_obj[0].Statutory.AgriLandConvPlots + ']').prop('checked', true);
                $('input:radio[name$=statlocked][value=' + json_obj[0].Statutory.LandLocked + ']').prop('checked', true);
                $('input:radio[name$=stattownplan][value=' + json_obj[0].Statutory.LandApprovedLayout + ']').prop('checked', true);
                $('input:radio[name$=statappauth][value=' + json_obj[0].Statutory.GovtAuthorityID + ']').prop('checked', true);
                $('input:radio[name$=statauth][value=' + json_obj[0].Statutory.AthenticityMap + ']').prop('checked', true);
            }
            $('#modalloading').modal('hide');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#modalloading').modal('hide');
            //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });
}

//Added by Anupriya

/*
    Below code is used to call the db to save the details
*/

function saveBuildingdetails(objBuilding) {
    $.ajax({
        type: "POST",
        url: "landingpage.aspx/savebuildingdetails",//Calling the webmethod
        data: objBuilding,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        success: function (response) {
            $('#modalloading').modal('hide');
            var propertybuilding = [];
            propertybuilding = JSON.stringify(response.d);
            var json_obj = $.parseJSON(response.d);//parse JSON
            if (json_obj == "1") {
                $("#buildingheading").css("background", "rgba(68, 125, 7, 0.47)");
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Building Details Saved Successfully...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                 //   bootbox.alert("Building Details saved successfully");
                    $('#modalloading').modal('hide');
                });
            }
        }

    });
}

//Added by Nirmala
function GetgeneralDetails() {

    //var UserId = getuserID();
    //GetStatusdetailsforacc();
    AdminUserDropDetails();

    var valID = getIDs();
    var PropertyID = getPropIDs();
    var PropertyType = getPropType();
    $('#textgenproptype').val(PropertyType);
    $('#textgenproptype').attr('readonly', 'readonly');
    var obj = {
        ValuationID: valID,
        PropertyID: PropertyID
    }
    var valID = JSON.stringify(obj);
    $.ajax({
        type: "POST",
        url: "landingpage.aspx/GetgeneralDetails",
        data: valID,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $('#modalloading').modal('hide');
            var generaldetails = [];
            var json_obj = $.parseJSON(response.d);
            var c = Object.keys(json_obj[0].OwnerDetails.JointOwners)
            var d;
            for (var i = 0; i < c.length; i++) {
                d += "<tr>";
                //d += "<td align=center><input type=checkbox /></td>";
                d += "<td><input type=text class=form-control value= '" + json_obj[0].OwnerDetails.JointOwners[c[i]]["OwnerName"] + "' /></td>";
                d += "<td><input type=text class=form-control value= '" + json_obj[0].OwnerDetails.JointOwners[c[i]]["OwnerAddress"] + "' /></td>";
                d += "<td><input type=text class=form-control value= '" + json_obj[0].OwnerDetails.JointOwners[c[i]]["OwnerPhone"] + "' /></td>";
                d += "<td><input type=text class=form-control value= '" + json_obj[0].OwnerDetails.JointOwners[c[i]]["SharePercent"] + "' /></td>";
                d += '<td><button type="button" id="btnregnadd" runat="server" class="btn-link" style="color: #0066CC" onclick="fnregnaddrow(`tblregisteredname`);"><span class="glyphicon glyphicon-plus-sign" title="AddRow"></span></button> </td>'
                d += '<td> <button type="button" id="btnregnremoverow" runat="server" class="btn-link"><span class="glyphicon glyphicon-trash" title="Delete"></span></button> </td>'
                d += "</tr>";
            }
            var value = json_obj[0].ValuerAssociationName;

            for (var i in json_obj) {

                $('#tblregisteredname tbody').html(d)
                $("#textgenval").val(json_obj[0].ValuationPurpose)
                $("#textgeninsdate").val(json_obj[0].DateofInspection)
                $("#textgenvaldate").val(json_obj[0].ValuationDate)
                $("#textgenownprop").val(json_obj[0].OwnerDetails.PropertyOwnDuration);
                $("#txtperusal").val(json_obj[0].ValuationDocs)
                $("#textgendescprop").val(json_obj[1].BriefDesc)
                $("#textgenscopeval").val(json_obj[0].ValuationScope)
                $("#textgennamebank").val(json_obj[0].NameOfBank)
                $("#textgenbankbranch").val(json_obj[0].ReportForBankBranch)
                // $("#textgenvalasso").val(value)
                if (json_obj[0].ValuerAssociationName == "" || json_obj[0].ValuerAssociationName != null || json_obj[0].ValuerAssociationName!= undefined ) {
                $("#textgenvalasso").val(json_obj[0].ValuerAssociationName)
                }
                else {
                    AdminUserDropDetails();
               }
                $("#textgenpersonacc").val(json_obj[0].PersonAccompanied)
                $("#textgenprojsite").val(json_obj[1].ProjectSiteName)
                $('input:radio[name$=LocationDetails][value=' + json_obj[1].Location + ']').prop('checked', true);
               // $("#textgenproptype").val(json_obj[1].PropertyType)
            }
         //   AdminUserDropDetails();
            $('#modalloading').modal('hide');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#modalloading').modal('hide');
            //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });
}

function GetpropdescDetails() {
    var valID = getIDs();
    var PropertyID = getPropIDs();
    var obj = {
        ValuationID: valID,
        PropertyID: PropertyID
    }
    var valID = JSON.stringify(obj);

    $.ajax({
        type: "POST",
        url: "landingpage.aspx/GetpropdescDetails",
        data: valID,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $('#modalloading').modal('hide');
            var propdescdetails = [];
            var json_obj = $.parseJSON(response.d);
            for (var i in json_obj) {
                $("#txtprodoorNo").val(json_obj[1].Address.DoorNumber)
                $("#Textpropstreet").val(json_obj[1].Address.StreetName)
                $("#txtproareaname").val(json_obj[1].Address.AddArea)
                $("#txtprocity").val(json_obj[1].Address.City)
                $("#txtprostate").val(json_obj[1].Address.State)
                $("#Textpropcountry").val(json_obj[1].Address.Country)
                $("#textproppin").val(json_obj[1].Address.Pincode)
                $("#landAptid").val(json_obj[0].Registration.Comments),
                $('#txtdateofregn').val(json_obj[0].DateofRegistration),
                $('#txtRegistrationvalue').val(json_obj[0].RegistrationValue),
                $("#txtundividedshare").val(json_obj[0].UndividedShareOfLand),
                $('#txtlocroadwidth').val(json_obj[0].WidthOfRoad),
                $("#txtlandmeasurement").val(json_obj[0].LandMeasurement),
                $("#txtsurveyorcert").val(json_obj[0].ReasonIfValuesMismatched),
                $("#txtdwllingunits").val(json_obj[0].NoOfDwellingUnits),
                $("#txtprozone").val(json_obj[0].RegnDetails.Zone)
                $("#txtprosro").val(json_obj[0].RegnDetails.SROLocation)
                $("#txtprovillage").val(json_obj[0].RegnDetails.Village)
                $("#txtprosurno").val(json_obj[0].RegnDetails.SurveyNumber)
                $("#txtprosurdate").val(json_obj[0].RegnDetails.SurveyDate)
                $("#txtproabutrd").val(json_obj[0].NameAbuttingRoad)
                $("#txtproorienplot").val(json_obj[0].Orientation)
                $("#txtprolandmark").val(json_obj[0].Landmark)
                $("#txtprosurcomm").val(json_obj[0].Proximity)
                $("#txtprodiscity").val(json_obj[0].DistanceFromCity)
                $("#txttotalsqft").val(json_obj[0].TotalArea)
                $('input:radio[name$=SurroundBy][value=' + json_obj[0].SurroundedByFenceOrWall + ']').prop('checked', true);
                $('input:radio[name$=AlreadyRegistered][value=' + json_obj[0].Registration.YesNo + ']').prop('checked', true);
                $('input:radio[name$=rdnPropertyArea][value=' + json_obj[0].PropertyArea + ']').prop('checked', true);
                $('input:radio[name$=propdescDetailsarea][value=' + json_obj[0].AreaClassification + ']').prop('checked', true);
                $('input:radio[name$=propdescDetailseco][value=' + json_obj[0].EconomicClassification + ']').prop('checked', true);
            }
            $('#modalloading').modal('hide');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#modalloading').modal('hide');
            //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });
}
//Added by Anupriya

/*
    Below code is used to retrive the details from db
*/

function GetBuildingdetail() {
  var valID = getIDs();
    var obj = {
        ValuationID: valID
    }
    var valID = JSON.stringify(obj);
    $.ajax({
        type: "POST",
        url: "landingpage.aspx/GetBuildingdetail",//Calling webmethod
        data: valID,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        success: function (response) {
            try {
                $('#modalloading').modal('hide');
                var buildingdetails = [];
                buildingdetails = JSON.stringify(response.d);
                var json_obj = $.parseJSON(response.d);

                /*
                    Below code is used to retrive the details and show into the UI Fields
                */

                $("#txtpropertydeednorth").val(json_obj.AsPerDeed.PropertyNorth)
                $("#txtpropertydeedsouth").val(json_obj.AsPerDeed.PropertySouth)
                $("#txtpropertydeedeast").val(json_obj.AsPerDeed.PropertyEast)
                $("#txtpropertydeedwest").val(json_obj.AsPerDeed.PropertyWest)

                $("#txtpropertyactualnorth").val(json_obj.Actual.PropertyNorth)
                $("#txtpropertyactualsouth").val(json_obj.Actual.PropertySouth)
                $("#txtpropertyactualeast").val(json_obj.Actual.PropertyEast)
                $("#txtpropertyactualwest").val(json_obj.Actual.PropertyWest)

                $("#txtdimensdeednorth").val(json_obj.AsPerDeed.DimensionNorth)
                $("#txtdimensdeedsouth").val(json_obj.AsPerDeed.DimensionSouth)
                $("#txtdimensdeedeast").val(json_obj.AsPerDeed.DimensionEast)
                $("#txtdimensdeedwest").val(json_obj.AsPerDeed.DimensionWest)

                $("#txtdimensactualnorth").val(json_obj.Actual.DimensionNorth)
                $("#txtdimensactualsouth").val(json_obj.Actual.DimensionSouth)
                $("#txtdimensactualeast").val(json_obj.Actual.DimensionEast)
                $("#txtdimensactualwest").val(json_obj.Actual.DimensionWest)

                $("#txtextentdeed").val(json_obj.AsPerDeed.ExtentAsPerDeed)//for tbl values retrive 
                $("#txtextentactual").val(json_obj.Actual.ExtentActual)
                $("#txtunitdeed").val(json_obj.AsPerDeed.UnitAsPerDeed)
                $("#txtunitactual").val(json_obj.Actual.UnitActual)

                $('input[name$=Compoundwall][value=' + json_obj.CompoundWall + ']').attr('checked', 'checked');
                $("#txtcompound").val(json_obj.BuildingCompoundWall)
                $('input[name$=rdnlivabl][value=' + json_obj.PropertyLivable + ']').attr('checked', 'checked');
                $("#txtoccupiedperiod").val(json_obj.OccupiedPeriod)
                $("#ddltypeofconst").val(json_obj.TypeOfConstruction)
                $("#ddlint").val(json_obj.Maintenance_Interior)
                $("#ddlext").val(json_obj.Maintenance_Exterior)

                var txtavaliable = json_obj.Others;
                if (txtavaliable != "" && txtavaliable != undefined) {
                    $('#ddltypeofconst').closest(".myrow").after('<div class="row myrow dynamictxtbox"><div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">' +
                        '</div><div class="col-lg-4 col-md-4 col-sm-10 col-xs-10 divmiddle1">' +
                        '<input name="othertxtbox" type="text" id="txtotherbuilding" value= ' + txtavaliable + ' class="form-control dynamictxtboxother txtboxsize"> </div> </div>')
                }

                /*
                    Below code is used to retrive details from dynamic rows
                */

                var c = Object.keys(json_obj["YearOfConstruction"])
                var d;
                for (var i = 0; i < c.length; i++) {
                    d += "<tr>";
                    // d += "<td align=center><input type=checkbox /></td>";
                    d += "<td><input type=text class=form-control value= '" + json_obj["YearOfConstruction"][c[i]]["FloorNum"] + "' /></td>";
                    d += "<td><input type=text class=form-control value= '" + json_obj["YearOfConstruction"][c[i]]["YearReported"] + "' /></td>";
                    d += "<td><input type=text class=form-control value= '" + json_obj["YearOfConstruction"][c[i]]["YearObserved"] + "' /></td>";
                    d += "<td><input type=text class=form-control value= '" + json_obj["YearOfConstruction"][c[i]]["YearAsPerDeed"] + "' /></td>";
                    d += "<td><input type=text class=form-control value= '" + json_obj["YearOfConstruction"][c[i]]["YearCompleted"] + "' /></td>";
                    d += '<td><button type="button" id="houserowadd" runat="server" class="btn-link" style="color: #0066CC" onclick="fnhouseapartaddrow(`tblhouseapart`);"><span class="glyphicon glyphicon-plus-sign" title="AddRow"></span></button></td>'
                    d += '<td><button type="button" id="houserowdelete" runat="server" class="btn-link"><span class="glyphicon glyphicon-trash" title="Delete"></span></button></td>'
                    d += "</tr>";

                }
                $('#tblhouseapart tbody').html(d)

                var e = Object.keys(json_obj["PlinthArea"])
                var f;
                for (var j = 0; j < e.length; j++) {
                    f += "<tr>";
                    //f += "<td align=center><input type=checkbox /></td>";
                    f += "<td><input type=text class=form-control value= '" + json_obj["PlinthArea"][e[j]]["FloorNum"] + "' /></td>";
                    f += "<td><input type=text class=form-control value= '" + json_obj["PlinthArea"][e[j]]["Heightofthefloor"] + "' /></td>";
                    f += "<td><input type=text class=form-control value= '" + json_obj["PlinthArea"][e[j]]["PlinthAreaMain"] + "' /></td>";
                    f += "<td><input type=text class=form-control value= '" + json_obj["PlinthArea"][e[j]]["PlinthAreaCantilevered"] + "' /></td>";
                    f += "<td><input type=text class=form-control value= '" + json_obj["PlinthArea"][e[j]]["PlinthAreaTotal"] + "' /></td>";
                    f += "<td><input type=text class=form-control value= '" + json_obj["PlinthArea"][e[j]]["RoomDetails"] + "' /></td>";
                    f += '<td><button type="button" id="btnplinthareaaddfn" runat="server" class="btn-link" style="color: #0066CC" onclick="fnplinthaddrow(`tblplintarea`);"><span class="glyphicon glyphicon-plus-sign" title="AddRow"></span></button></td>'
                    f += '<td><button type="button" id="btnplintharearemovefn" runat="server" class="btn-link"><span class="glyphicon glyphicon-trash" title="Delete"></span></button></td>'
                    f += "</tr>";
                }
                $('#tblplintarea tbody').html(f);

                $('input[name$=rdnsuper][value=' + json_obj.Quality + ']').attr('checked', 'checked');
                $('input:radio[name$=rdncommon][value=' + json_obj.BuildingAppearance + ']').prop('checked', true);
                $('input:radio[name$=rdnoccupied][value=' + json_obj.OccupiedBy + ']').prop('checked', true);
                $("#txtgrossmonthlyrent").val(json_obj.GrossMonthlyRent)
                $("#txtgrossadvanceamt").val(json_obj.GrossAdvanceAmt)


            } catch (Ex) {
                console.log("Exceptn = " + Ex);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#modalloading').modal('hide');
            alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });

}
//Added by Anupriya for valuation general details

/*
    Below code is used to call the db to save the details
*/

function savevalgendetails(objValGen) {
    $.ajax({
        type: "POST",
        url: "landingpage.aspx/savevalgendetails",//Calling the webmethod
        data: objValGen,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        success: function (response) {
            $('#modalloading').modal('hide');
            var Valgen = [];
            Valgen = JSON.stringify(response.d);
            var json_obj = $.parseJSON(response.d);//parse JSON
            if (json_obj == "1") {
                $("#Approvalheading").css("background", "rgba(68, 125, 7, 0.47)");
                if ($("#DivSummarydetailsaccordion").hasClass("notactive")) {
                    $("#DivSummarydetailsaccordion").removeClass("notactive")
                    $("#sumheading").css("background", "");
                }                
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Valuation General Details Saved Successfully...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                   // bootbox.alert("Valuation General Details saved successfully");
                    $('#modalloading').modal('hide');
                });
            }
        }

    });
}

//Added by Anupriya for valuation details

/*
    Below code is used to retrive the details from db
*/

function GetValGendetail() {
    var valID = getIDs();
    var obj = {
        ValuationID: valID
    }
    var valID = JSON.stringify(obj);
    $.ajax({
        type: "POST",
        url: "landingpage.aspx/GetValGendetail",//Calling webmethod
        data: valID,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        success: function (response) {
            try {
                $('#modalloading').modal('hide');
                var valgendetails = [];
                valgendetails = JSON.stringify(response.d);
                var json_obj = $.parseJSON(response.d);

                /*
                    Below code is used to retrive the details and show into the UI Fields
                */
                $("#txtmarketinfo").val(json_obj.Marketability),
                $("#txtpremarrate").val(json_obj.PrevailingMarketRate),
                $("#txtsoupremarrate").val(json_obj.SourcePrevailingMarket),
                $("#txtunitrate").val(json_obj.UnitRatePrevMarket),
                $("#txtpmr").val(json_obj.ValueLandPMR),
                $("#txtregoffice").val(json_obj.Guidelinesqft),
                $("#txtglr").val(json_obj.GuidelineValue),
                $("#txtpresentval").val(json_obj.PresentDepreciatedValue),
                $("#txtrates").val(json_obj.MarketValueBasisAdoptedRate),
                $("#txtdeptrates").val(json_obj.MarketValueAdoptedRateSyncIT),
                $("#txtregrates").val(json_obj.MarketValueAdoptedRateSyncRagistrar),
                $("#txtbuildins").val(json_obj.IsInsured),
                $("#txtsaleval").val(json_obj.ForcedSaleValue),
                $("#txtsourcesaleval").val(json_obj.InfoForcedSaleValue),
                $("#txtproreason").val(json_obj.ReasonIncreaseValuation),
                $("#txtnotesapp").val(json_obj.AdditionalNotes),
                $("#txtpurland").val(json_obj.YearPurchaseAcquisition),
                $("#txtpricepaid").val(json_obj.ValuePurchasePaid),
                $("#txtpurbuild").val(json_obj.YearPurchaseConstruction),
                $("#txtcostconst").val(json_obj.CostPurchaseConstruction),
                $("#txtimprov").val(json_obj.DetailAdditionImprovement),
                $("#txttotcost").val(json_obj.CostAdditionImprovement),
                $("#txtprestprop").val(json_obj.PresentWrittenDownValue)

                /*
                   Below code is used to retrive details from dynamic rows
               */

                var lifebuildkey = Object.keys(json_obj["LifeBuildingEstimated"])
                var lifebuildobj;
                for (var i = 0; i < lifebuildkey.length; i++) {
                    lifebuildobj += "<tr>";
                    //lifebuildobj += "<td align=center><input type=checkbox /></td>";
                    lifebuildobj += "<td><input type=text class=form-control value= '" + json_obj["LifeBuildingEstimated"][lifebuildkey[i]]["FloorNum"] + "' /></td>";
                    lifebuildobj += "<td><input type=text class=form-control value= '" + json_obj["LifeBuildingEstimated"][lifebuildkey[i]]["LifeOfBuilding"] + "' /></td>";
                    lifebuildobj += "<td><input type=text class=form-control value= '" + json_obj["LifeBuildingEstimated"][lifebuildkey[i]]["Age"] + "' /></td>";
                    lifebuildobj += "<td><input type=text class=form-control value= '" + json_obj["LifeBuildingEstimated"][lifebuildkey[i]]["RateDepreciation"] + "' /></td>";
                    lifebuildobj += "<td><input type=text class=form-control value= '" + json_obj["LifeBuildingEstimated"][lifebuildkey[i]]["AmountDepreciation"] + "' /></td>";
                    lifebuildobj += "<td><input type=text class=form-control value= '" + json_obj["LifeBuildingEstimated"][lifebuildkey[i]]["ReplacementDesc"] + "' /></td>";
                    lifebuildobj += "<td><input type=text class=form-control value= '" + json_obj["LifeBuildingEstimated"][lifebuildkey[i]]["ReplacementTotalArea"] + "' /></td>";
                    lifebuildobj += "<td><input type=text class=form-control value= '" + json_obj["LifeBuildingEstimated"][lifebuildkey[i]]["RepEstRatePerSqFt"] + "' /></td>";
                    lifebuildobj += "<td><input type=text class=form-control value= '" + json_obj["LifeBuildingEstimated"][lifebuildkey[i]]["RepEstimatedValue"] + "' /></td>";
                    lifebuildobj += '<td><button type="button" id="btnlifebuildaddrowfn" runat="server" class="btn-link" style="color: #0066CC" onclick="fnlifebuildaddrow(`tblbuildest`);"><span class="glyphicon glyphicon-plus-sign" title="AddRow"></span></button></td>';
                    lifebuildobj += '<td><button type="button" id="btnlifebuildremoverowfn" runat="server" class="btn-link"><span class="glyphicon glyphicon-trash"  title="Delete"></span></button></td>';
                    lifebuildobj += "</tr>";

                }
                $('#tblbuildest tbody').html(lifebuildobj)

                var portionroomkey = Object.keys(json_obj["TableData"])
                var portionroomobj;
                for (var p = 0; p < portionroomkey.length; p++) {

                    let items = '<option selected disabled value=\'' + 'Select' + '\'>' + json_obj["TableData"][portionroomkey[p]]["Name"] + '</option>';
                    $.each(arr, function (index, item) {
                        items += '<option value=\'' + item + '\'>' + item + '</option>';
                    });
                   // ddl = '<select class=form-control onchange = "fnddloption()" style="width:100%">' + items + '</select>';
                    ddl = '<select class=form-control style="width:100%">' + items + '</select>';
                    portionroomobj += "<tr>";
                    // portionroomobj += "<td align=center><input type=checkbox /></td>";
                    portionroomobj += "<td><input type=text class=form-control value= '" + json_obj["TableData"][portionroomkey[p]]["FloorNum"] + "' /></td>";
                    portionroomobj += "<td>" + ddl + "</td>";
                    portionroomobj += "<td><input type=text class=form-control value= '" + json_obj["TableData"][portionroomkey[p]]["SpecificationValue"] + "' /></td>";
                    portionroomobj += '<td><button type="button" id="btnportroomaddfn" runat="server" class="btn-link" style="color: #0066CC" onclick="fnportroomaddrow(`tblportrooms`); fnremoveddlvalue(); "><span class="glyphicon glyphicon-plus-sign" title="AddRow"></span></button></td>';
                    portionroomobj += '<td><button type="button" id="btnportroomremovefn" runat="server" class="btn-link"><span class="glyphicon glyphicon-trash" title="Delete"></span></button></td>';
                    portionroomobj += "</tr>";

                }
                $('#tblportrooms tbody').html(portionroomobj)

                $("#txtsalval").val(json_obj.SalvageValue),
                $("#txtref1").val(json_obj.Reference1),
                $("#txtref2").val(json_obj.Reference2),
                $("#txtassedbuild").val(json_obj.AssessedValue)

            } catch (Ex) {
                console.log("Exceptn = " + Ex);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#modalloading').modal('hide');
            alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });
}
var resultData = ["Mumbai", "Delhi", "Chennai", "Goa"]
$(document).ready(function () {
    var myselect = $('<select>');
    $.each(resultData, function (index, key) {
        myselect.append($('<option></option>').val(key).html(key));
    });
    $('#selectCity').append(myselect.html());
});

//Property Land save details   ///Added by Deepa
function savepropertylanddetails(objpropertyland) {
    $.ajax({
        type: "POST",
        url: "landingpage.aspx/savepropertylanddetails",
        data: objpropertyland,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $('#modalloading').modal('hide');
            var propertyland = [];
            propertyland = JSON.stringify(response.d);
            var json_obj = $.parseJSON(response.d);//parse JSON
            if (json_obj == "1") {
                $("#Landheading").css("background", "rgba(68, 125, 7, 0.47)");
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Property Land Details Saved Successfully...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                    //bootbox.alert("Property Land Details saved successfully");
                    $('#modalloading').modal('hide');
                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#modalloading').modal('hide');
        },
    });
}
//Retrieves the Property Land Details.... //Added by Deepa
function GetLanddetails() {
    //var valID = getIDs();
    var obj = {
        ValuationID: getIDs()
    }
    //var valID = JSON.stringify(obj);
    $.ajax({
        type: "POST",
        url: "landingpage.aspx/GetLanddetail",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            try {
                $('#modalloading').modal('hide');
                var landdetails = [];
                landdetails = JSON.stringify(response.d);
                var json_obj = $.parseJSON(response.d);
                $("#txtpropdeednorth").val(json_obj.AsPerDeed.PropertyNorth)
                //$("#txtdimofnorth").val(json_obj.AsPerDeed.PropertyNorth)//for tbl values retrive 
                $("#txtpropdeedsouth").val(json_obj.AsPerDeed.PropertySouth)
                $("#txtpropdeedeast").val(json_obj.AsPerDeed.PropertyEast)
                $("#txtpropdeedwest").val(json_obj.AsPerDeed.PropertyWest)

                $("#txtpropactualnorth").val(json_obj.Actual.PropertyNorth)//for tbl values retrive 
                $("#txtpropactualsouth").val(json_obj.Actual.PropertySouth)
                $("#txtpropactualeast").val(json_obj.Actual.PropertyEast)
                $("#txtpropactualwest").val(json_obj.Actual.PropertyWest)

                $("#txtdimdeednorth").val(json_obj.AsPerDeed.DimensionNorth)//for tbl values retrive 
                $("#txtdimdeedsouth").val(json_obj.AsPerDeed.DimensionSouth)
                $("#txtdimdeedeast").val(json_obj.AsPerDeed.DimensionEast)
                $("#txtdimdeedwest").val(json_obj.AsPerDeed.DimensionWest)

                $("#txtdimactualnorth").val(json_obj.Actual.DimensionNorth)//for tbl values retrive 
                $("#txtdimactualsouth").val(json_obj.Actual.DimensionSouth)
                $("#txtdimactualeast").val(json_obj.Actual.DimensionEast)
                $("#txtdimactualwest").val(json_obj.Actual.DimensionWest)


                $("#txtextdeed").val(json_obj.AsPerDeed.ExtentAsPerDeed)//for tbl values retrive 
                $("#txtextactual").val(json_obj.Actual.ExtentActual)
                $("#txtunideed").val(json_obj.AsPerDeed.UnitAsPerDeed)
                $("#txtuniactual").val(json_obj.Actual.UnitActual)




                $("#txtextentsite").val(json_obj.CalculatedValue),
                $("#txtsize").val(json_obj.PlotSize),
                $("#txtnorthsouth").val(json_obj.PlotNorthSouthSize),
                $("#txteastwest").val(json_obj.PlotEastWestSize),
                $("#txttotalextent").val(json_obj.PlotTotalExtent),
                $("#txtfloodingorsubmerging").val(json_obj.FreqFlooding),
                $("#txtdevsurroundingareas").val(json_obj.AreaSurroundDevelopment),
                $("#txtshapeandmeasure").val(json_obj.LandShapeMeasure),
                $("#txtcivicamenities").val(json_obj.Nearby),
                $("#txttopographical").val(json_obj.LevelTopography),
                $("#txttenureland").val(json_obj.LandTenure),
                $("#txtcornerplot").val(json_obj.CornerPlot),
                $("#txttypeofroad").val(json_obj.TypeOfRoad),
                $("#txtavgdepthwidth").val(json_obj.RatioDepthWidth),
                $("#txtroadfacilities").val(json_obj.RoadFacility),
                $("#txtwaterpotentiality").val(json_obj.WaterPotential),
                $("#txtwidthoftheroad").val(json_obj.RoadWidth),
                $("#txtwidthoftheroadft").val(json_obj.RoadWidthGT20),
                $("#txtunderground").val(json_obj.LandSewerage),
                $("#txtpowersupply").val(json_obj.LandPowerSupply),
                $("#txtspecialremarks").val(json_obj.LandSpecialRemark),
                $("#txtfloorindex").val(json_obj.FloorSpaceIndex),
                 $("#txtplotcoverage").val(json_obj.PlotCoverage)


            } catch (Ex) {
                console.log("Exceptn = " + Ex);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#modalloading').modal('hide');
            alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });

}
function getpropertytype() {
    return locpropertytype;
}

function isNumberKey(evt, ctrlName) {
    var str = ctrlName.value;
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 && charCode != 46) || charCode > 57) {
        return false;
    }
    else if (charCode == 46 && (str.indexOf(".") != -1)) {
        return false;
    }
    else {
        return true;
    }
}

//Retrieves the Current Valuation Record
function GetStatusDetails(SaveDetails) {
    var valID = getIDs();
    var obj = {
        ValuationID: valID
    }

    var Status = "";
    var valID = JSON.stringify(obj);
    $.ajax({
        type: "POST",
        url: "landingpage.aspx/GetStatus",
        data: valID,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $('#modalloading').modal('hide');
            var pricedetails = [];
            pricedetails = JSON.stringify(response.d);
            var json_obj = $.parseJSON(response.d);
            for (var i in json_obj) {
                var PriceStatus = json_obj[i].PricingStatus;
                var ServiceStatus = json_obj[i].ServiceStatus;//Added by Deepa
                var AmenitiesStatus = json_obj[i].AmenitiesStatus;
                var ApprovalStatus = json_obj[i].ApprovalStatus;
                var StatutoryStatus = json_obj[i].StatutoryStatus;//Added by Nirmala
                var GeneralStatus = json_obj[i].GeneralStatus;//Added by Nirmala
                var PropDescStatus = json_obj[i].PropDescStatus;//Added by Nirmala
                var BuildingStatus = json_obj[i].BuildingStatus;//Added by Anupriya
                var ValuationGeneralStatus = json_obj[i].ValuationGeneralStatus;//Added by Anupriya
                var LandStatus = json_obj[i].LandStatus;//Added by Deepa
                var AppraisalStatus = json_obj[i].AppraisalStatus;
                var SummaryStatus = json_obj[i].SummaryStatus;
                var MiscelaneousStatus = json_obj[i].MiscelaneousStatus;

                if (SaveDetails == "PriceDetails") {
                    Status = "PriceStatus";
                    GetStatusChange(Status, PriceStatus);
                }
                    //Added by Deepa
                else if (SaveDetails == "ServiceStatus") {
                    Status = "ServiceStatus";
                    GetStatusChange(Status, ServiceStatus);
                }
                else if (SaveDetails == "AmenityDetails") {
                    Status = "AmenitiesStatus";
                    GetStatusChange(Status, AmenitiesStatus);
                }
                else if (SaveDetails == "ApprovalDetails") {
                    Status = "ApprovalStatus";
                    GetStatusChange(Status, ApprovalStatus);
                }
                    //Added by Nirmala
                else if (SaveDetails == "StatutoryDetails") {
                    Status = "StatutoryStatus";
                    GetStatusChange(Status, StatutoryStatus);
                }
                    //Added by Nirmala
                else if (SaveDetails == "GeneralDetails") {
                    Status = "GeneralStatus";
                    GetStatusChange(Status, GeneralStatus);
                }
                else if (SaveDetails == "PropDescDetails") {
                    Status = "PropDescStatus";
                    GetStatusChange(Status, PropDescStatus);
                }
                    //Added by Anupriya
                else if (SaveDetails == "BuildingStatus") {
                    Status = "BuildingStatus";
                    GetStatusChange(Status, BuildingStatus);
                }
                    //Added by Anupriya
                else if (SaveDetails == "ValuationGeneralStatus") {
                    Status = "ValuationGeneralStatus";
                    GetStatusChange(Status, ValuationGeneralStatus);
                }
                    //Added by Deepa
                else if (SaveDetails == "LandStatus") {
                    Status = "LandStatus";
                    GetStatusChange(Status, LandStatus);
                }
                else if (SaveDetails == "SummaryDetails") {
                    Status = "SummaryStatus";
                    GetStatusChange(Status, SummaryStatus);

                    var undefin;
                    if (json_obj[i].GuideLineValue == undefin && (json_obj[i].AppraisalStatus == "Assigned" || json_obj[i].AppraisalStatus == "InProgress" || json_obj[i].AppraisalStatus == "Completed")) {
                        $("#txtguidpersqft").removeAttr('readonly').attr('onkeypress', "return isNumberKey(event)").attr('onblur', "formatNumber(this.id); fnsetGuideValue();");
                    }

                    if (SummaryStatus == "New") {
                        if (json_obj[i].GuideLineValue != undefin) {
                            $("#txtguidpersqft").val(json_obj[i].GuideLineValue.PerSQft);
                            localStorage.setItem('totalarea', json_obj[i].BuildingDetails.TotalArea);
                            $("#txtguide").val($("#txtguidpersqft").val() * localStorage.getItem('totalarea'))
                            formatNumber("txtguide");
                        }
                    }
                }
                else if (SaveDetails == "MiscDetails") {
                    Status = "MiscStatus";
                    GetStatusChange(Status, MiscelaneousStatus);
                }
                else if (SaveDetails == "AppraisalDetails") {
                     if ((GeneralStatus == "Completed" || GeneralStatus == "Retrieved") && (PropDescStatus == "Completed" || PropDescStatus == "Retrieved") &&
                            (BuildingStatus == "Completed" || BuildingStatus == "Retrieved") && (LandStatus == "Completed" || LandStatus == "Retrieved") &&
                            (AmenitiesStatus == "Completed" || AmenitiesStatus == "Retrieved") && (StatutoryStatus == "Completed" || StatutoryStatus == "Retrieved") &&
                            (ServiceStatus == "Completed" || ServiceStatus == "Retrieved") && (ValuationGeneralStatus == "Completed" || ValuationGeneralStatus == "Retrieved") &&
                            (SummaryStatus == "Completed" || SummaryStatus == "Retrieved"))
                        {
                             StatusChangeComplete();
                        }
                    else if (GeneralStatus == "New" || PropDescStatus == "New" || BuildingStatus == "New" || LandStatus == "New" || AmenitiesStatus == "New"
                           || StatutoryDetails == "New" || ServiceStatus == "New" || ValuationGeneralStatus == "New" || SummaryStatus == "New" || ApprovalStatus == "New") {
                        $('#modalloading').modal('hide');
                        bootbox.dialog({
                            closeButton: true,
                            size: 'medium',
                            message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please fill all the Sections before Completing the Valuation...</p>',
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 3000);
                            //bootbox.alert("Please fill all the sections before completing the valuation")
                        }
                        else {

                        Status = "AppraisalStatus"
                                        GetStatusChange(Status, "ApprasialComplete");
                         } 
                }
                //
                //else if (SaveDetails == "AppraisalDetails") {
                //    StatusChangeComplete();
                //}
                //else if (SaveDetails == "AppraisalDetails") {
                //    if ((GeneralDetails == "Completed" || GeneralDetails == "Retrieved") && (PropDescDetails == "Completed" || PropDescDetails == "Retrieved") &&
                //        (BuildingStatus == "Completed" || BuildingStatus == "Retrieved") && (LandStatus == "Completed" || LandStatus == "Retrieved") &&
                //        (AmenitiesStatus == "Completed" || AmenitiesStatus == "Retrieved") && (StatutoryStatus == "Completed" || StatutoryStatus == "Retrieved") &&
                //        (ServiceStatus == "Completed" || ServiceStatus == "Retrieved") && (ValuationGeneralStatus == "Completed" || ValuationGeneralStatus == "Retrieved")
                //        (SummaryStatus == "Completed" || SummaryStatus == "Retrieved"))
                //    {
                //           StatusChangeComplete();
                //    }
                //    else if (GeneralDetails == "New" || PropDescDetails == "New" || BuildingStatus == "New" || LandStatus == "New" || AmenitiesStatus == "New"
                //       || StatutoryDetails == "New" || ServiceStatus == "New" || ValuationGeneralStatus == "New" || SummaryStatus == "New" || ApprovalStatus == "New") {
                //        $('#modalloading').modal('hide');
               // bootbox.dialog({
               //     closeButton: true,
                //    size: 'medium',
                //    message: '<p class="text-center mb-0"><i class="fa fa-info-circle"></i> Please fill all the sections before completing the valuation</p>',
               // });
               // setTimeout(function () {
              //      bootbox.hideAll();
               // }, 2500);
                //       // bootbox.alert("Please fill all the sections before completing the valuation")
                //    }
                //    else {
                //                    Status = "AppraisalStatus"
                //                    GetStatusChange(Status, "ApprasialComplete");
                //     }                   
                //}
                //else if (SaveDetails == "AppraisalDetails") {
                //    if (GeneralDetails == "Completed" && PropDescDetails == "Completed" && StatutoryStatus == "Completed" && PriceStatus == "Completed" && ServiceStatus == "Completed" && AmenitiesStatus == "Completed" && ApprovalStatus == "Completed" && BuildingStatus == "Completed" && SummaryStatus == "Completed" && MiscelaneousStatus == "Completed") {
                //        StatusChangeComplete();
                //    }
                //    else {
                //        if (GeneralDetails == "New" || PropDescDetails == "New" || StatutoryDetails == "New" || PriceStatus == "New" || ServiceStatus == "New" || AmenitiesStatus == "New" || ApprovalStatus == "New" || BuildingStatus == "New" || SummaryStatus == "New" || MiscelaneousStatus == "New" || LandStatus == "New" || ValuationGeneralStatus == "New") {
                //            $('#modalloading').modal('hide');
                // bootbox.dialog({
                //     closeButton: true,
                //    size: 'medium',
                //    message: '<p class="text-center mb-0"><i class="fa fa-info-circle"></i> Please fill all the sections before completing the valuation</p>',
                // });
                // setTimeout(function () {
                //      bootbox.hideAll();
                // }, 2500);
                //          //  bootbox.alert("Please fill all the sections before completing the valuation")
                //        }
                //        else {
                //            Status = "AppraisalStatus"
                //            GetStatusChange(Status, "ApprasialComplete");
                //        }
                //    }
                //}
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#modalloading').modal('hide');
            //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });
}

//Change status to complete
function GetStatusChange(Status, section) {
    var valID = getIDs();
    var obj = {
        ValuationID: valID
    }
    var valID = JSON.stringify(obj);
    $.ajax({
        async: true,
        type: "POST",
        url: "landingpage.aspx/StatusChange",
        data: valID,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $('#modalloading').modal('hide');
            var details = [];
            var json_obj = $.parseJSON(response.d);

                //Added by Nirmala
            if (Status == "GeneralStatus" && section != "New")
            {
                GetgeneralDetails();
            }
                //Added by Nirmala
            else if (Status == "PropDescStatus" && section != "New")
            {
                GetpropdescDetails();
            }
                //Added by Anupriya
            else if (Status == "BuildingStatus" && section != "New")
            {
                GetBuildingdetail();
            }
                //Added by Deepa
            else if (Status == "LandStatus" && section != "New")
            {
                GetLanddetails();
            }           
            else if (Status == "AmenitiesStatus" && section != "New")
            {
                GetamenityDetails();
            }            
                //Added by Nirmala
            else if (Status == "StatutoryStatus" && section != "New")
            {
                GetstatutoryDetails();
            }
                //Added by Deepa
            else if (Status == "ServiceStatus" && section != "New")
            {
                 GetServicesdetails();
            }
                //Added by Anupriya
            else if (Status == "ValuationGeneralStatus" && section != "New")
            {
                GetValGendetail();
            }
            else if (Status == "SummaryStatus" && section != "New")
            {
                GetSummaryDetails();
            }            
            else if (Status == "ApprovalStatus" && section != "New")
            {
                GetApprovaldetails();
            }     
           
                //New Accordion
            
                //Added by Nirmala
            else if (Status == "GeneralStatus" && section == "New")
            {
                $('#modalloading').modal('hide');
            }
            else if (Status == "PropDescStatus" && section == "New")
            {
                $('#modalloading').modal('hide');
            }
                //Added by Anupriya
            else if (Status == "BuildingStatus" && section == "New")
            {
                $('#modalloading').modal('hide');
            }
                //Added by Deepa
            else if (Status == "LandStatus" && section == "New")
            {
                $('#modalloading').modal('hide');
            }
            else if (Status == "AmenitiesStatus" && section == "New")
            {
                $('#modalloading').modal('hide');
            }
                //Added by Nirmala
            else if (Status == "StatutoryStatus" && section == "New")
            {
                $('#modalloading').modal('hide');
            }

            else if (Status == "ServiceStatus" && section == "New")
            {
                $('#modalloading').modal('hide');
            }

            //Added by Anupriya
            else if (Status == "ValuationGeneralStatus" && section == "New")
            {
                $('#modalloading').modal('hide');
            }
            else if (Status == "SummaryStatus" && section == "New")
            {
                localStorage.setItem("locImagegrp", "");
                localStorage.setItem("uploadrem", 5);
                $('#modalloading').modal('hide');
            }           
            else if (Status == "ApprovalStatus" && section == "New")
            {
                $('#modalloading').modal('hide');
            }            
            else if (Status == "AppraisalStatus")
            {
                var SaveDetails = "AppraisalDetails";
                StatusChangeComplete();
            }
            else if (Status == "Chkall" && section == "Chkall")
            {}
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
            //GetStatusChange(Status)
        },
    });
}

function GetPriceDetails() {
    var valID = getIDs();
    var obj = {
        ValuationID: valID
    }
    var valID = JSON.stringify(obj);
    $.ajax({
        type: "POST",
        url: "landingpage.aspx/GetPricingdetails",
        data: valID,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $('#modalloading').modal('hide');
            var pricedetails = [];
            pricedetails = JSON.stringify(response.d);
            var json_obj = $.parseJSON(response.d);//parse JSON   

            for (var i in json_obj) {
                if (locpropertytype == "Land") {
                    $("#txthouseage").attr("disabled", true);
                    $("#txtreason").attr("disabled", true);
                    $("#rdnlivableyes").attr("disabled", true);
                    $("#rdnlivableno").attr("disabled", true);
                    $("#rdncomphouse").attr("disabled", true);
                    $("#rdnconshouse").attr("disabled", true);

                    //    if (json_obj.SurveyDetails.MismatchReason != "") {
                    //        $("#txtsurveyorcert").attr("disabled", false)
                    //    } else {
                    //        $("#txtsurveyorcert").attr("disabled", true)
                    //    }
                }
                //else {
                //    $("#txtsurveyorcert").attr("disabled", false)
                //}

                // $("#txtlandmeasurement").val(json_obj.SurveyDetails.LandMeasure)

                //$("#txtsurveyorcert").val(json_obj.SurveyDetails.MismatchReason)

                $("#txtreason").val(json_obj.PricingPropertyDetails.Livable.NonLivableReason)
                $("#txthouseage").val(json_obj.PricingPropertyDetails.Age)
                $("#txtfootage").val(json_obj.PricingPropertyDetails.Footage)
                $("#txtfloors").val(json_obj.PricingPropertyDetails.NoofFloors)
                $("#txtrooms").val(json_obj.PricingPropertyDetails.Rooms.NoofRooms)
                $("#txtsqfoot").val(json_obj.PricingPropertyDetails.Rooms.RoomsFootage)

                $("#txtconstruction").val(json_obj.PricingPropertyDetails.YearConstructed),

                $("#txtfloorspace").val(json_obj.PricingPropertyDetails.FloorSpaceIndex)
                $("#txtpropertynorth").val(json_obj.PricingPropertyDetails.PropertyNorth) //Added by Anupriya
                $("#txtpropertysouth").val(json_obj.PricingPropertyDetails.PropertySouth) //Added by Anupriya
                $("#txtpropertyeast").val(json_obj.PricingPropertyDetails.PropertyEast) //Added by Anupriya
                $("#txtpropertywest").val(json_obj.PricingPropertyDetails.PropertyWest) //Added by Anupriya

                $("#txtcommon").val(json_obj.BuildingDetails.CommonArea)
                $("#txtcommonper").val(json_obj.BuildingDetails.CommonAreaPercentage)
                $("#txtplinth").val(json_obj.BuildingDetails.PlinthArea)
                $("#txtcarpet").val(json_obj.BuildingDetails.CarpetArea)
                $("#txttotalarea").val(json_obj.BuildingDetails.TotalArea)
                $("#txtlocextendofland").val(json_obj.LocationPropertyDetails.LandExtent)
                //   $('input:radio[name$=SurroundBy][value=' + json_obj.LocationPropertyDetails.SurroundedBy + ']').prop('checked', 'checked');
                $("#txtlocFootageReason").val(json_obj.LocationPropertyDetails.FootageReason)
                //  $("#txtlocroadwidth").val(json_obj.LocationPropertyDetails.RoadWidth)
                $("#ddllocunits option[value='" + json_obj.LocationPropertyDetails.Unit + "']").attr('selected', 'selected');
                if (json_obj.LocationPropertyDetails.FootageDetails == "Yes") {
                    $("#rdnlocrequireYes").attr('checked', true)
                }
                else if (json_obj.LocationPropertyDetails.FootageDetails == "No") {
                    $("#rdnlocrequireNo").attr('checked', true)
                }
                fncheckPropFootage();
                localStorage.setItem('totalarea', json_obj.BuildingDetails.TotalArea);

                var PropertyStatus = json_obj.PropertyStatus;
                var und;
                if (PropertyStatus != und && PropertyStatus != "") {
                    $('input:radio[name$=propstatus][value="' + PropertyStatus + '"]').prop('checked', 'checked');
                }

                var livable = json_obj.PricingPropertyDetails.Livable.LivableStatus

                if (livable == "Yes") {
                    $("#rdnlivableyes").attr('checked', 'checked');
                    $("#txtreason").attr('disabled', true)
                }
                else if (livable == "No") {
                    $("#rdnlivableno").attr('checked', 'checked');
                    $("#txtreason").attr('disabled', false)
                }
            }
            $('#modalloading').modal('hide');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#modalloading').modal('hide');
            //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });
}


/*function fnpricingsave(pricedet) {
     $.ajax({
        type: "POST",
        url: "landingpage.aspx/Pricingsave",
        data: pricedet,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $('#modalloading').modal('hide');
            var jsonObj = [];
            jsonObj = JSON.parse(response.d);
            if (response.d == "0") {
                $(function () {
                    bootbox.alert("Failed!");
                });
            }
            else if (response.d != "1" && response.d != "0") {
                fnsavePricedetails();
            }
            else {
                $("#priceheading").css("background", "rgba(68, 125, 7, 0.47)");
                if ($("#DivSummarydetailsaccordion").hasClass("notactive")) {
                    $("#DivSummarydetailsaccordion").removeClass("notactive")
                    $("#sumheading").css("background", "");
                }
                $(function () {
                    bootbox.alert("Pricing Details saved successfully");
                    $('#modalloading').modal('hide');
                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#modalloading').modal('hide');
            //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });
}*/
//Services save details   ///Added by Deepa
function saveservicesdetails(objservices) {
    $.ajax({
        type: "POST",
        url: "landingpage.aspx/saveservicesdetails",
        data: objservices,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $('#modalloading').modal('hide');
            var servicesdetails = [];
            servicesdetails = JSON.stringify(response.d);
            var json_obj = $.parseJSON(response.d);//parse JSON
            if (json_obj == "1") {
               $("#Servicesheading").css("background", "rgba(68, 125, 7, 0.47)");
               $(function () {
                   bootbox.dialog({
                       closeButton: true,
                       size: 'medium',
                       message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Services Details Saved Successfully...</p>',
                   });
                   setTimeout(function () {
                       bootbox.hideAll();
                   }, 2500);
                   // bootbox.alert("Services Details saved successfully");
                    $('#modalloading').modal('hide');
                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#modalloading').modal('hide');
        },
    });
}

//Retrieves the Services Details.... //Added by Deepa
function GetServicesdetails() {
    //var valID = getIDs();
    var obj = {
        ValuationID: getIDs()
    }
    //var valID = JSON.stringify(obj);
    $.ajax({
        type: "POST",
        url: "landingpage.aspx/GetServicesdetails",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            try {
                $('#modalloading').modal('hide');
                var servicedetails = [];
                servicedetails = JSON.stringify(response.d);
                var json_obj = $.parseJSON(response.d);
                for (op = 0; op < json_obj.length; op++) {
                    var expression = json_obj[op].Servicesname;
                    switch (expression) {
                        case "WaterSupplyArrangements":
                            $("#txtwatersupplyarrang").val(json_obj[op].Value)
                            break;
                        case "OpenWell":
                            $("#txtopenwell").val(json_obj[op].Value)
                            break;
                        case "DeepBore":
                            $("#txtdeepbore").val(json_obj[op].Value)
                            break;
                        case "HandPump":
                            $("#txthandpump").val(json_obj[op].Value)
                            break;
                        case "Motor":
                            $("#txtmotor").val(json_obj[op].Value)
                            break;
                        case "CorporationTap":
                            $("#txtcorpotap").val(json_obj[op].Value)
                            break;
                        case "UndergroundLevelsump":
                            $("#txtundergnd").val(json_obj[op].Value)
                            break;
                        case "OverheadWaterTank":
                            $("#txtoverheadtank").val(json_obj[op].Value)
                            break;
                        case "DrainageArrangements":
                            $("#txtdrainagearrang").val(json_obj[op].Value)
                            break;
                        case "SepticTank":
                            $("#txtseptictank").val(json_obj[op].Value)
                            break;
                        case "UndergroundSewerage":
                            $("#txtundergndsew").val(json_obj[op].Value)
                            break;
                        case "CompoundwallRMvalue":
                            $("#txtrmvalueCW").val(json_obj[op].Value)
                            break;
                        case "CompoundwallRSvalue":
                            $("#txtrmvalueCW2").val(json_obj[op].Value)
                            break;
                        case "CompoundWallInRupees":
                            $("#txtcompundwall").val(json_obj[op].Value)
                            break;
                        case "Height":
                            $("#txtheight").val(json_obj[op].Value)
                            break;
                        case "Length":
                            $("#txtlength").val(json_obj[op].Value)
                            break;
                        case "TypeOfConstruct":
                            $("#txttypeofconstruction").val(json_obj[op].Value)
                            break;
                        case "PavementsRMvalue":
                            $("#txtpavements1").val(json_obj[op].Value)
                            break;
                        case "PavementsRSvalue":
                            $("#txtpavements2").val(json_obj[op].Value)
                            break;
                        case "PavementsMain":
                            $("#txtpavements").val(json_obj[op].Value)
                            break;
                        case "SteelGateRMvalue":
                            $("#txtsteelgate1").val(json_obj[op].Value)
                            break;
                        case "SteelGateRSvalue":
                            $("#txtsteelgate2").val(json_obj[op].Value)
                            break;
                        case "SteelGateMain":
                            $("#txtsteelgate").val(json_obj[op].Value)
                            break;
                        case "EBWaterDrainageDeposits":
                            $("#txtebdeposits").val(json_obj[op].Value)
                            break;
                        case "ElectricalFittings":
                            $("#txtelecfitting").val(json_obj[op].Value)
                            break;
                        case "TypeofWiring":
                            $("#txtwiring").val(json_obj[op].Value)
                            break;
                        case "NoofLightPTS":
                            $("#txtlightpts").val(json_obj[op].Value)
                            break;
                        case "FanPTS":
                            $("#txtfanpts").val(json_obj[op].Value)
                            break;
                        case "SparePlugPTS":
                            $("#txtspareplug").val(json_obj[op].Value)
                            break;
                        case "AnyOtherItem":
                            $("#txtotheritem").val(json_obj[op].Value)
                            break;
                        case "PlumbingInstallation":
                            $("#txtplumbing").val(json_obj[op].Value)
                            break;
                        case "NoofWaterClosets":
                            $("#txtclosets").val(json_obj[op].Value)
                            break;
                        case "WashBasins":
                            $("#txtwashbasins").val(json_obj[op].Value)
                            break;
                        case "BathTubs":
                            $("#txtbathtubs").val(json_obj[op].Value)
                            break;
                        case "WaterMeter":
                            $("#txtwatermetertaps").val(json_obj[op].Value)
                            break;
                        case "AnyOtherFixtures":
                            $("#txtotherfixtures").val(json_obj[op].Value)
                            break;
                        case "AnyOther":
                            $("#txtanyother").val(json_obj[op].Value)
                            break;
                        case "Total":
                            $("#txttotal").val(json_obj[op].Value)
                            break;
                        case "ClassofFitting":
                            $('input:radio[name$=rdnsuperior][value=' + json_obj[op].Value + ']').prop('checked', true);
                            break;
                        default:
                            // code block
                    }
                }
                //$("#txtwatersupplyarrang").val(json_obj.WaterSupplyArrangements);
                //$("#txtopenwell").val(json_obj.OpenWell);
                //$("#txtdeepbore").val(json_obj.DeepBore);
                //$("#txthandpump").val(json_obj.HandPump);
                //$("#txtmotor").val(json_obj.Motor);
                //$("#txtcorpotap").val(json_obj.CorporationTap);
                //$("#txtundergnd").val(json_obj.UndergroundLevelsump);
                //$("#txtoverheadtank").val(json_obj.OverheadWaterTank);
                //$("#txtdrainagearrang").val(json_obj.DrainageArrangements);
                //$("#txtseptictank").val(json_obj.SepticTank);
                //$("#txtundergndsew").val(json_obj.UndergroundSewerage);
                //$("#txtrmvalueCW").val(json_obj.CompoundwallRMvalue);
                //$("#txtrmvalueCW2").val(json_obj.CompoundwallRSvalue);
                //$("#txtcompundwall").val(json_obj.CompoundWallInRupees);
                //$("#txtheight").val(json_obj.Height);
                //$("#txtlength").val(json_obj.Length);
                //$("#txttypeofconstruction").val(json_obj.TypeOfConstruction);
                //$("#txtpavements1").val(json_obj.PavementsRMvalue);
                //$("#txtpavements2").val(json_obj.PavementsRSvalue);
                //$("#txtpavements").val(json_obj.PavementsMain);
                //$("#txtsteelgate1").val(json_obj.SteelGateRMvalue);
                //$("#txtsteelgate2").val(json_obj.SteelGateRSvalue);
                //$("#txtsteelgate").val(json_obj.SteelGateMain);
                //$("#txtebdeposits").val(json_obj.EBWaterDrainageDeposits);
                //$("#txtelecfitting").val(json_obj.ElectricalFittings);
                //$("#txtwiring").val(json_obj.TypeofWiring);
                //$("#txtlightpts").val(json_obj.NoofLightPTS);
                //$("#txtfanpts").val(json_obj.FanPTS);
                //$("#txtspareplug").val(json_obj.SparePlugPTS);
                //$("#txtotheritem").val(json_obj.AnyOtherItem);
                //$("#txtplumbing").val(json_obj.PlumbingInstallation);
                //$("#txtclosets").val(json_obj.NoofWaterClosets);
                //$("#txtwashbasins").val(json_obj.WashBasins);

                //$("#txtbathtubs").val(json_obj.BathTubs);
                //$("#txtwatermetertaps").val(json_obj.WaterMeter);
                //$("#txtotherfixtures").val(json_obj.AnyOtherFixtures);
                //$("#txtanyother").val(json_obj.AnyOther);
                //$("#txttotal").val(json_obj.Total);
                //$('input:radio[name$=rdnsuperior][value=' + json_obj.ClassofFitting + ']').prop('checked', true);

            } catch (Ex) {
                console.log("Exceptn = " + Ex);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#modalloading').modal('hide');
            alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });

}



function fnamenitysave(amenitydet) {
    $.ajax({
        type: "POST",
        url: "landingpage.aspx/Amenitiessave",
        data: amenitydet,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $('#modalloading').modal('hide');
            var jsonObj = [];
            jsonObj = JSON.parse(response.d);
            if (response.d == "0") {
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'small',
                        message: '<p class="text-center mb-0"><i class="fa fa-frown-o fa-lg"></i> Failed!</p>'
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                   // bootbox.alert("Failed!");
                });
            }
            else if (response.d != "1" && response.d != "0") {
                fnsaveAmenitydetails();
            }
            else {
                $("#amenityheading").css("background", "rgba(68, 125, 7, 0.47)");
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Amenities Details Saved Successfully...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                 //   bootbox.alert("Amenities Details saved successfully");
                    $('#modalloading').modal('hide');
                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#modalloading').modal('hide');
            //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });
}

function GetamenityDetails() {

    var valID = getIDs();
    var obj = {
        ValuationID: valID
    }
    var valID = JSON.stringify(obj);
    $.ajax({
        type: "POST",
        url: "landingpage.aspx/GetAmenitiesdetails",
        data: valID,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $('#modalloading').modal('hide');
            var amenitydetails = [];
            var json_obj = $.parseJSON(response.d);
            for (var i in json_obj) {
                $("#txtlift").val(json_obj.Amenities.Utility.NoofLifts)
                $("#txtcarpark").val(json_obj.Amenities.Utility.NoofCarpark)
                $("#txtcovered").val(json_obj.Amenities.Utility.NoofCoveredCarpark)
                $("#txtresident").val(json_obj.Amenities.Utility.WelfareAssn)
                $("#txthealthothers").val(json_obj.Amenities.Health.Others)
                $("#dlamenity").val(json_obj.Amenities.Utility.UtilitySelect)
                $("#dlfitness").val(json_obj.Amenities.Fitness.UtilityFitness)
                $("#dlhealth").val(json_obj.Amenities.Health.UtilityHealth)
                $("#txtflatmaintainance").val(json_obj.Amenities.Health.FlatMaintainance)
                // $("#dlAmenitiesbuilding").val(json_obj.Amenities.Building.UtilityBuilding)   //Added by Deepa

                var dlamenity = json_obj.Amenities.Utility.UtilitySelect;
                var ddlfitness = json_obj.Amenities.Fitness.UtilityFitness;
                var ddlhealth = json_obj.Amenities.Health.UtilityHealth;
                //var dlAmenitiesbuilding = json_obj.Amenities.Building.UtilityBuilding;  //Added by Deepa

                $.each(dlamenity.split(","), function (i, e) {
                    $('#dlamenity option[value="' + e + '"]').prop("selected", true);
                });
                $.each(ddlfitness.split(","), function (i, e) {
                    $('#dlfitness option[value="' + e + '"]').prop("selected", true);
                });
                $.each(ddlhealth.split(","), function (i, e) {
                    $('#dlhealth option[value="' + e + '"]').prop("selected", true);
                });
                //$.each(dlAmenitiesbuilding.split(","), function (i, e) {  //Added by Deepa
                //    $('#dlAmenitiesbuilding option[value="' + e + '"]').prop("selected", true);

                //});
            }
            retrievefndynamictxtboxDV(json_obj);
            $('#modalloading').modal('hide');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#modalloading').modal('hide');
            //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });
}
//Added by Deepa
function retrievefndynamictxtboxDV(json_obj) {

    var amenitiesbuildingkey = json_obj.Amenities.Building.Amenitiesname;

    var bulidinglength = json_obj.Amenities.Building
    var amenitiesbuildingobj;
    for (var build = 0; build < bulidinglength.length; build++) {
        let items = '<option selected disabled value=\'' + 'Select' + '\'>' + json_obj.Amenities.Building[build].Amenitiesname + '</option>';
        for (var Dvarrfinal = 0; Dvarrfinal < DVarr.length; Dvarrfinal++) {
            if (DVarr[Dvarrfinal] == json_obj.Amenities.Building[build].Amenitiesname) {
                var index = DVarr.indexOf(json_obj.Amenities.Building[build].Amenitiesname);
                if (index != -1) {
                    DVarr.splice(index, 1);
                }
            }
        }
        $.each(DVarr, function (index, item) {
            items += '<option value=\'' + item + '\'>' + item + '</option>';
        });
        ddl = '<select disabled class=form-control  style="width:100%">' + items + '</select>';
        amenitiesbuildingobj += "<tr>";
        amenitiesbuildingobj += "<td>" + ddl + "</td>";
        amenitiesbuildingobj += "<td><input type=text class=form-control value= '" + json_obj.Amenities.Building[build].DepreciationValue + "' /></td>";
        amenitiesbuildingobj += '<td><button type="button"  class="btn-link" style="color:#0066CC" onclick="fnDVaddrow(`tblAmenitiesbuilding`); fnDVremoveddlvalue();"><span class="glyphicon glyphicon-plus-sign" title="AddRow"></span></button></td>'
        amenitiesbuildingobj += "<td><button type='button' id='btnremoverow' class='btn-link'><span class='glyphicon glyphicon-trash' title='Delete'></span></button></td>"
        amenitiesbuildingobj += "</tr>";

    }
    $('#tblAmenitiesbuilding tbody').html(amenitiesbuildingobj)



}
//function retrievefndynamictxtboxDV(json_obj) {
//    alert(JSON.stringify(json_obj))
//  //  var ci = Object.keys(json_obj.Amenities.Building)
//   // alert(ci)
//    if ((Object.keys(json_obj.Amenities)).indexOf('Building') != -1) {
//       // alert(json_obj.Amenities.Building.Amenitiesname)
//        var amenitiesbuildingkey = Object.keys(json_obj.Amenities.Building.UtilityBuilding)
//        var amenitiesbuildingvalue = Object.values(json_obj.Amenities.Building.UtilityBuilding)
//        var amenitiesbuildingobj;
//        for (var p = 0; p < amenitiesbuildingkey.length; p++) {
//            let items = '<option selected disabled value=\'' + 'Select' + '\'>' + amenitiesbuildingkey[p] + '</option>';
//            for (var Dvarrfinal = 0; Dvarrfinal < DVarr.length; Dvarrfinal++) {
//                if (DVarr[Dvarrfinal] == amenitiesbuildingkey[p]) {
//                    var index = DVarr.indexOf(amenitiesbuildingkey[p]);
//                    if (index != -1) {
//                        DVarr.splice(index, 1);
//                    }
//                }
//            }
//            $.each(DVarr, function (index, item) {
//                items += '<option value=\'' + item + '\'>' + item + '</option>';
//            });
//            ddl = '<select disabled class=form-control  style="width:100%">' + items + '</select>';
//            amenitiesbuildingobj += "<tr>";
//            //  amenitiesbuildingobj += "<td align=center><input type=checkbox /></td>";
//            amenitiesbuildingobj += "<td>" + ddl + "</td>";
//            amenitiesbuildingobj += "<td><input type=text class=form-control value= '" + amenitiesbuildingvalue[p] + "' /></td>";
//            amenitiesbuildingobj += '<td><button type="button"  class="btn-link" style="color:#0066CC" onclick="fnDVaddrow(`tblAmenitiesbuilding`); fnDVremoveddlvalue();"><span class="glyphicon glyphicon-plus-sign" title="AddRow"></span></button></td>'
//            amenitiesbuildingobj += "<td><button type='button' id='btnremoverow' class='btn-link'><span class='glyphicon glyphicon-trash' title='Delete'></span></button></td>"
//            amenitiesbuildingobj += "</tr>";

//        }
//        $('#tblAmenitiesbuilding tbody').html(amenitiesbuildingobj)
//    }
//    //else {
//    //    GetUnits();
//    //}

//}
////Added by Deepa
//function retrievefndynamictxtboxDV(json_obj) {
//    var json_objfinalkey = Object.keys(json_obj.Amenities.BuildingDepreciationValue.DepreciationValue)
//    var json_objfinalvalues = Object.values(json_obj.Amenities.BuildingDepreciationValue.DepreciationValue);
//    arg = '#dlAmenitiesbuilding'
//    for (var p = 0; p < json_objfinalkey.length; p++) {

//        if (json_objfinalkey[p] == "OrnamentalFrontPoojadoorDepreciationValue")
//        { var label = "Ornamental Front / Pooja door Depreciation Value (In Rupees)" }
//        if (json_objfinalkey[p] == "OpenstaircaseDepreciationValue")
//        { var label = "Open staircase Depreciation Value (In Rupees):" }
//        if (json_objfinalkey[p] == "WardrobesDepreciationValue")
//        { var label = "Wardrobes,showcases,wooden cupboards Depreciation Value (In Rupees):" }
//        if (json_objfinalkey[p] == "InteriordecorationsDepreciationValue")
//        { var label = "Interior decorations Depreciation Value (In Rupees):" }
//        if (json_objfinalkey[p] == "ArchitecturalElevationworksDepreciationValue")
//        { var label = "Architectural Elevation works Depreciation Value (In Rupees):" }
//        if (json_objfinalkey[p] == "FalseceilingworksDepreciationValue")
//        { var label = "False ceiling works Depreciation Value (In Rupees):" }
//        if (json_objfinalkey[p] == "SeparateLumberRoomDepreciationValue")
//        { var label = "Separate Lumber Room Depreciation Value (In Rupees):" }
//        if (json_objfinalkey[p] == "SeparateToilerRoomDepreciationValue")
//        { var label = "Separate Toiler Room Depreciation Value (In Rupees):" }
//        if (json_objfinalkey[p] == "AnyotherDepreciationValue")
//        { var label = "Any other Depreciation Value (In Rupees):" }

//        $(arg).closest(".myrow").after('<div class="row myrow dynamicRoom"><div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">' +
//            '<span id="lblDepValues"> ' + label + ' </span></div><div class="col-lg-4 col-md-4 col-sm-10 col-xs-10 divmiddle1">' +
//            '<input name="ctl00$ContentPlaceHolder1$txtrooms" type="text" onkeypress="return isNumberKey(event)" id="txtDepValues" value=' + json_objfinalvalues[p] + ' class="form-control dynamicTextboxRoom"> </div> </div>')
//    }


//}


function StatusChangeComplete() {
   var valID = getIDs();
    //var getMapEcn = $.session.get("MapEcn");//added by Anupriya
    var obj = {
        ValuationID: valID,
       // MapEcn: getMapEcn //Added by Anupriya
    }

    var valID = JSON.stringify(obj);
    $.ajax({
        type: "POST",
        url: "landingpage.aspx/CompleteStatus",
        data: valID,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
           $('#modalloading').modal('hide');
            var details = [];
            details = JSON.stringify(response.d);
            var json_obj = $.parseJSON(response.d);
            if (json_obj == "1") {
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        //    buttons: {
                        //        success: {
                        //            label: "OK",
                        //            callback: callback
                        //        }
                        //    }
                        message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Appraisal Completed Successfully...</p>',                                               
                    });
                    setTimeout(function () {
                        bootbox.hideAll();                       
                    }, 2500);                
                    callback();
                });
                var valID = getIDs();
                var update = "Completed";
            }
            else if (json_obj == "0") {
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'small',
                        message: '<p class="text-center mb-0"><i class="fa fa-frown-o fa-lg"></i> Failed!</p>'
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                  //  bootbox.alert("Failed!");
                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#modalloading').modal('hide');
            //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });
}

function callback() {    
    setTimeout(function () {
        $('#modalloading').modal('hide');
        javascript: window.window.location.href = "AppraisalSubmit.aspx";
    }, 1000)
}

function fnidtosubmit(valuationid) {
    ValIDSubmit = valuationid;
}

function SubmitAppraisal() {

    bootbox.confirm("Do you want to Submit the Record?", function (result) {
        if (result == true) {
            var valID = getIDstosubmit();
            var obj = {
                ValuationID: valID
            }
            var submitapp = JSON.stringify(obj);
            $.ajax({
                type: "POST",
                url: "PreviewPage.aspx/SubmitAppraisal",
                data: submitapp,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    $('#modalloading').modal('hide');
                    var json_obj = $.parseJSON(response.d);
                    if (response.d == "0") {
                        $(function () {
                            bootbox.dialog({
                                closeButton: true,
                                size: 'small',
                                message: '<p class="text-center mb-0"><i class="fa fa-frown-o fa-lg"></i> Failed!</p>'
                            });
                            setTimeout(function () {
                                bootbox.hideAll();
                            }, 2500);
                           // bootbox.alert("Failed!");
                        });
                    }
                    else if (response.d == "1") {
                        $(function () {
                            bootbox.dialog({
                                closeButton: true,
                                message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Appraisal Submitted Successfully...<br> Click Yes, if you want to Send the Report by Mail</p>',
                                buttons: {
                                    success: {
                                        label: "Yes",
                                        callback: Redirect2EmailPage
                                    },
                                    cancel: {
                                        label: 'No',
                                        callback: redirectmee
                                    },
                                }
                            });

                            ////  bootbox.confirm("Appraisal Submitted Successfully. Do you wish to send Email?", function (result) {
                            //bootbox.confirm("Appraisal Submitted Successfully. Click OK, if you want to send the report by mail", function (result) {
                            //    if (result == true) {
                            //        Redirect2EmailPage();
                            //    }
                            //    else {
                            //        window.location.href = "ApplicationQueue.aspx";
                            //    }
                            //})

                        });
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                    $('#modalloading').modal('hide');
                },
            });
        }
    });
}


function redirectmee() {
    javascript: window.window.location.href = "ApplicationQueue.aspx";

}
//Create a Image Array
function ReceiveImage(img) {
    var imgname = img;
    Imglist.push(imgname);
    return Imglist;
}

//Setting All Comma separated Image names in Session variable
//function setsession(str) {
//    $.ajax({
//        type: "POST",
//        url: "landingpage.aspx/addSession",
//        data: "{'Imglist':'" + str + "'}",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (response) {
//        },
//        error: function (XMLHttpRequest, textStatus, errorThrown) {
//            //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
//        },
//    });

//}


function saveSummaryDetails(ObjSummary) {
    $.ajax({
        type: "POST",
        url: "landingpage.aspx/saveSummaryDetails",
        data: ObjSummary,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $('#modalloading').modal('hide');
            if (response.d == "1") {
                var orgtype = getorgtype();
                if (orgtype == "Company") {
                    $('#btnappraisalsubmit').attr('disabled', false);
                } else {
                    $('#btnappraisalcomplete').attr('disabled', false);
                }
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Valuation Summary Data Saved Successfully...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                    //bootbox.alert("Valuation Summary Data saved successfully");
                    $('#modalloading').modal('hide');
                    $("#sumheading").css("background", "rgba(68, 125, 7, 0.47)");

                });
            }
            else if (response.d != "1" && response.d != "0") {
                fnsaveSummary();
            }
            else {
                $(function () {
                    $('#modalloading').modal('hide');
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-frown-o fa-lg"></i> Summary Data Save Failed!</p>'
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                  //  bootbox.alert("Summary data Save Failed");

                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
            $('#modalloading').modal('hide');
        },
    });
}

//var TablePropval;
function GetSummaryDetails() {
    valID = getIDs()
    var obj = {
        ValuationID: valID
    }
    var Summarydet = JSON.stringify(obj);
    $.ajax({
        type: "POST",
        url: "landingpage.aspx/GetSummarydetails",
        data: Summarydet,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            try {
                $('#modalloading').modal('hide');
                var json_obj = $.parseJSON(response.d);
                var Totarea = json_obj.BuildingDetails.TotalArea;
                localStorage.setItem('totalarea', json_obj.BuildingDetails.TotalArea);
                try {
                    Totarea = Totarea.replace(/,/g, '');
                }
                catch (ex) {
                    Totarea = Totarea;
                }

                var estsqft = json_obj.EstRatePerSqFt;
                try {
                    estsqft = estsqft.replace(/,/g, '');
                }
                catch (exp) {
                    estsqft = estsqft;
                }

                Totarea = parseFloat(Totarea)
                estsqft = parseFloat(estsqft);
                var undef;
                var etval;

                if (Totarea != undef) {
                    etval = Totarea * estsqft;
                    $("#txtesttotval").val(etval)
                    formatNumber('txtesttotval');
                }
                //txtrecommendation.value = json_obj.SummaryDetails.Recommendation;
                $("#txtestimate").val(json_obj.EstRatePerSqFt)
                $("#txtesttotval").val(json_obj.EstimatedValue)
                $("#txtguidpersqft").val(json_obj.Guidelinesqft)
                $("#txtguide").val(json_obj.GuidelineValue)
                $("#txtcompositelocality").val(json_obj.CompositeRate);
                $("#txtnewcompositelocality").val(json_obj.NewConstructionCompositeRate);
                $("#txttotalcomposite").val(json_obj.TotalCompositeRate)
                $("#txtreplacecost").val(json_obj.ReplacementCost);
                $("#txtbuildinglife").val(json_obj.LifeOfBuilding);
                $("#txttotalcomposite").val(json_obj.TotalCompositeRate);
                $("#txtmismatchreason").val(json_obj.Reason)
                $("#txtrecommendedvalue").val(json_obj.SummaryDetails.ValuationSummary.TotalRecommendedValueGLR)
                $("#txtrecommendedvaluepmr").val(json_obj.SummaryDetails.ValuationSummary.TotalRecommendedValuePMR)
                $("#txtfinalrec").val(json_obj.SummaryDetails.ValuationSummary.FinalRecommendedValue)
                $("#txtrecommendation").val(json_obj.SummaryDetails.ValuationSummary.Recommendation)
                $("#sumotherdetails").val(json_obj.SummaryDetails.ValuationSummary.AdditionalDetail)
                $("#txtInvoiceAmt").val(json_obj.InvoiceAmt)
                sessionStorage.setItem("valMethd", json_obj.ValuationMethod)
                $('#ddlmethodofvaluation option[value="' + sessionStorage.getItem("valMethd") + '"]').attr("selected", "selected");

                GetUnits();
                setTimeout(function () {
                    var c = Object.keys(json_obj.SummaryDetails.ValuationSummary.TableData)
                    var d;
                    for (var i = 0; i < c.length; i++) {

                        var summdrop = fnsummarydropdown();
                        var value = json_obj.SummaryDetails.ValuationSummary.TableData[c[i]]["Type"];
                        var find = '<option value="' + value + '">' + value + '</option>';
                        var replaceval = '<option value="' + value + '" selected>' + value + '</option>';
                        summdrop = summdrop.replace(find, replaceval);

                        if (value == "Amenities" || value == "Service" || value == "Depreciation" || value == "Factors favouring for an Additional Value"
                            || value == "Factors affecting marketeability for lesser value") {
                            d += "<tr>";
                            d += '<td><select class=form-control id=ddlpropTypeSum ><option value="none">Select</option>' + summdrop + '</select></td>'
                            d += "<td><input type=text class=form-control value= '" + json_obj.SummaryDetails.ValuationSummary.TableData[c[i]]["Remark"] + "' /></td>";
                            d += '<td><input type="text" class="form-control" onkeypress="return isNumberKey(event)" readonly="readonly" value= "' + json_obj.SummaryDetails.ValuationSummary.TableData[c[i]]["Measurement"] + '" /></td>';
                            d += '<td><input type="text" class="form-control" onkeypress="return isNumberKey(event)" readonly="readonly" value= "' + json_obj.SummaryDetails.ValuationSummary.TableData[c[i]]["GLR"] + '" /></td>';
                            d += '<td><input type="text" class="form-control" onkeypress="return isNumberKey(event)" readonly="readonly" value= "' + json_obj.SummaryDetails.ValuationSummary.TableData[c[i]]["PMR"] + '" /></td>';
                            d += '<td><input type="text" class="form-control" onkeypress="return isNumberKey(event)" readonly="readonly" value= "' + json_obj.SummaryDetails.ValuationSummary.TableData[c[i]]["TotalGlr"] + '" /></td>';
                            d += '<td><input type="text" class="form-control" onkeypress="return isNumberKey(event)" value= "' + json_obj.SummaryDetails.ValuationSummary.TableData[c[i]]["TotalPMR"] + '" /></td>';
                            d += '<td><button type="button" id="btnaddnewrow" runat="server" class="btn-link" style="color: #0066CC" onclick="fnaddrow(`tblpropval`); fnDVremovedsummaryvalue();" onmouseover="this.style.color=`#f49430`"onmouseout="this.style.color=`#0066CC`"><span class="glyphicon glyphicon-plus-sign"></span></button></td>'
                            d += '<td><button type="button" id="btnremrow" runat="server" class="btn-link" style="color: #0066CC" onmouseover="this.style.color=`#f49430`"onmouseout="this.style.color=`#0066CC`"><span class="glyphicon glyphicon-trash"></span></button></td>'
                            d += "</tr>";
                        }
                        else {
                            d += "<tr>";
                            d += '<td><select class=form-control id=ddlpropTypeSum >' + summdrop + '</select></td>'
                            d += "<td><input type=text class=form-control value= '" + json_obj.SummaryDetails.ValuationSummary.TableData[c[i]]["Remark"] + "' /></td>";
                            d += '<td><input type="text" class="form-control" onkeypress="return isNumberKey(event)" value= "' + json_obj.SummaryDetails.ValuationSummary.TableData[c[i]]["Measurement"] + '" /></td>';
                            d += '<td><input type="text" class="form-control" onkeypress="return isNumberKey(event)" value= "' + json_obj.SummaryDetails.ValuationSummary.TableData[c[i]]["GLR"] + '" /></td>';
                            d += '<td><input type="text" class="form-control" onkeypress="return isNumberKey(event)" value= "' + json_obj.SummaryDetails.ValuationSummary.TableData[c[i]]["PMR"] + '" /></td>';
                            d += '<td><input type="text" class="form-control" onkeypress="return isNumberKey(event)" value= "' + json_obj.SummaryDetails.ValuationSummary.TableData[c[i]]["TotalGlr"] + '" /></td>';
                            d += '<td><input type="text" class="form-control" onkeypress="return isNumberKey(event)" value= "' + json_obj.SummaryDetails.ValuationSummary.TableData[c[i]]["TotalPMR"] + '" /></td>';
                            d += '<td><button type="button" id="btnaddnewrow" runat="server" class="btn-link" style="color: #0066CC" onclick="fnaddrow(`tblpropval`); fnDVremovedsummaryvalue();" onmouseover="this.style.color=`#f49430`"onmouseout="this.style.color=`#0066CC`"><span class="glyphicon glyphicon-plus-sign"></span></button></td>'
                            d += '<td><button type="button" id="btnremrow" runat="server" class="btn-link" style="color: #0066CC" onmouseover="this.style.color=`#f49430`"onmouseout="this.style.color=`#0066CC`"><span class="glyphicon glyphicon-trash"></span></button></td>'
                            d += "</tr>";
                        }
                    }
                    $('#tblpropval tbody').html(d)
                }, 3000);
                var undefin;
                if (json_obj.GuideLineValue == undefin && (json_obj.AppraisalStatus == "Assigned" || json_obj.AppraisalStatus == "InProgress" || json_obj.AppraisalStatus == "Completed")) {
                    $("#txtguidpersqft").removeAttr('readonly').attr('onkeypress', "return isNumberKey(event)").attr('onblur', "formatNumber(this.id); fnsetGuideValue();");
                    $("#txtguide").val(json_obj.GuidelineValue)
                    $("#txtguidpersqft").val(json_obj.Guidelinesqft)
                }
                else {
                    if (json_obj.GuideLineValue != undefin) {
                        $("#txtguidpersqft").val(json_obj.GuideLineValue.PerSQft);
                        localStorage.setItem('totalarea', json_obj.BuildingDetails.TotalArea);
                        $("#txtguide").val($("#txtguidpersqft").val() * localStorage.getItem('totalarea'))
                        formatNumber("txtguide");
                    }
                    else {
                        $("#txtguide").val(json_obj.GuidelineValue)
                        $("#txtguidpersqft").val(json_obj.Guidelinesqft)
                    }
                }

                var imgname = json_obj.Images.ImageName;

                try {
                    var res = imgname.split(",");
                    localStorage.setItem("locImagegrp", "");
                    localStorage.setItem("locImagegrp", imgname)
                }
                catch (imgexp) {
                    res = [];
                }
                for (i = 0, j = 1; i < res.length; i++, j++) {
                    if (res[i] != "") {
                        $("#divimages").show();
                        var imgid = "Image"
                        imgid = imgid + j;
                        $('#' + imgid).parent('.img-wrap').show();
                        $('#' + imgid).attr("src", "ImageServer.aspx?filename='" + res[i] + "'");
                        $('#' + imgid).attr("alt", res[i]);
                        $('#' + imgid).attr("height", "100px");
                        $('#' + imgid).attr("width", "100px");
                    }
                }

                localStorage.setItem("uploadrem", 5 - res.length);
                var usrtype = getusrtype();
                if (json_obj.AppraisalStatus == "Completed") {
                    $("#btnpreviewpdf").attr('disabled', false);
                    $("#btnpreviewpdf").attr('readonly', false);
                }
                if (usrtype == "Lender") {
                    $('#divSummarydetailsContent input').attr('readonly', 'readonly');
                    $('#divSummarydetailsContent input').attr('disabled', true);
                    $('#divSummarydetailsContent select').attr('disabled', true);
                    $('#divSummarydetailsContent button').attr("disabled", "disabled");
                    $('.close').hide()

                    if (json_obj.AppraisalStatus == "Submitted" || json_obj.AppraisalStatus == "Approved" || json_obj.AppraisalStatus == "Rejected") {
                        $('#divuploadpicappr').show()
                        $('#divuploadpicappr').addClass('notactive')
                        $("#btnpreviewpdf").attr('disabled', false);
                        $("#btnpreviewpdf").attr('readonly', false);
                    }
                }
                else {
                    var orgtype = getorgtype();
                    if (usrtype == "Appraiser" && (json_obj.AppraisalStatus == "Approved" || json_obj.AppraisalStatus == "Rejected" || json_obj.AppraisalStatus == "Submitted" || json_obj.AppraisalStatus == "Submitted to Approver" || json_obj.AppraisalStatus == "Rejected By Approver" || json_obj.AppraisalStatus == "Approved By Approver")) {
                        $('#divSummarydetailsContent :input').attr('disabled', 'disabled');
                        $('.close').hide()
                        $('#divuploadpicappr').show()
                        $('#divuploadpicappr').addClass('notactive')
                        $("#btnpreviewpdf").attr('disabled', false);
                        $("#btnpreviewpdf").attr('readonly', false);
                    }

                    if ((usrtype == "Appraiser" && orgtype == "Company" && json_obj.AppraisalStatus != "Approved" && json_obj.AppraisalStatus != "Rejected")) {
                        if (json_obj.AppraisalStatus == "Submitted to Approver") {
                            $('#divSummarydetailsContent :input').attr('disabled', 'disabled');
                            $('.close').hide();
                            $('#divuploadpicappr').show();
                            $('#divuploadpicappr').addClass('notactive');
                            $("#btnpreviewpdf").attr('disabled', false);
                            $("#btnpreviewpdf").attr('readonly', false);
                        }
                        if (json_obj.AppraisalStatus == "Submitted") {
                            $('#divSummarydetailsContent :input').attr('disabled', 'disabled');
                            $('.close').hide();
                            $('#divuploadpicappr').show();
                            $('#divuploadpicappr').addClass('notactive');
                            $("#btnpreviewpdf").attr('disabled', false);
                            $("#btnpreviewpdf").attr('readonly', false);
                        }
                        if (json_obj.AppraisalStatus == "Approved By Approver") {
                            $('#divSummarydetailsContent :input').attr('readonly', 'readonly');
                            $('#divSummarydetailsContent :input').attr('disabled', true);
                            $('#divSummarydetailsContent select').attr('disabled', true);
                            $('#divSummarydetailsContent button').attr("disabled", "disabled");
                            $("#btnappraisalsubmit").attr('disabled', false)
                            $("#btnappraisalsubmit").attr('readonly', false)
                            $("#btnpreviewpdf").attr('disabled', false);
                            $("#btnpreviewpdf").attr('readonly', false);
                            $('.close').hide()
                            $('#divuploadpicappr').show()
                            $('#divuploadpicappr').addClass('notactive')
                        }
                        //else {
                        //    $('#divSummarydetailsContent :input').attr('readonly', 'readonly');
                        //    $('#divSummarydetailsContent :input').attr('disabled', true);
                        //    $('#divSummarydetailsContent select').attr('disabled', true);
                        //    $('#divSummarydetailsContent button').attr("disabled", "disabled");
                        //}
                    }
                }

                $('#modalloading').modal('hide');

            } catch (ex) {
                //alert(ex);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert(errorThrown);
            //$('#modalloading').modal('hide');
            //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });
}

function GetAccptstatus() {
    GetUnits();
    valID = getIDs()
    var appobj = {
        ValuationID: valID
    }
    var appdet = JSON.stringify(appobj)
    $.ajax({
        type: "POST",
        url: "landingpage.aspx/GetAccptstatus",
        data: appdet,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $('#modalloading').modal('hide');
            var json_obj = $.parseJSON(response.d);
            for (var i in json_obj) {
                var LenderID = json_obj[i].ManagedBy;

                if (json_obj[i].AppraiserID == json_obj[i].ApproverID) {
                    LenderID = json_obj[i].ManagedBy;
                } else {
                    LenderID = json_obj[i].ApproverID;
                }
                var AppraiserID = json_obj[i].AppraiserID;
                var SubdocLenID = "";
                var SubdocAppID = "";
                var StatusChangeDate = "";
                var ApprovalStatus = "";
                var Reason = "";
                var misreason = json_obj[i].PropertyApproval;
                var lendund;
                if (misreason != "" && misreason != lendund) {
                    SubdocLenID = json_obj[i].PropertyApproval.LenderID
                    SubdocAppID = json_obj[i].PropertyApproval.AppraiserID
                    StatusChangeDate = json_obj[i].PropertyApproval.StatusChangeDate;
                    ApprovalStatus = json_obj[i].PropertyApproval.ApprovalStatus;
                    Reason = json_obj[i].PropertyApproval.Reason;
                    SubdocAppID = SubdocAppID.split(',');
                    SubdocLenID = SubdocLenID.split(',');
                    ApprovalStatus = ApprovalStatus.split(',');
                    try {
                        Reason = Reason.split(',');
                    }
                    catch (e) {
                        Reason = Reason;
                    }
                    try {
                        StatusChangeDate = StatusChangeDate.split(',');
                    } catch (er) {
                        StatusChangeDate = StatusChangeDate;
                    }

                    $('#tblApprovaldet tbody').empty()

                    for (j = 0; j < ApprovalStatus.length + 1; j++) {
                        fnapprovaladdrow()
                    }

                    var Lencount = 0;
                    var Appcount = 1;
                    var Datecount = 2;
                    var reascount = 3;
                    var dropcount = 4;
                    var k = 0;
                    var len = $('#tblApprovaldet tbody tr').length;
                    $('#tblApprovaldet tbody tr').each(function () {
                        if (dropcount != (len * 5) - 1) {
                            $("#tblApprovaldet tbody tr td:eq(" + Lencount + ")").find('input').val(SubdocLenID[k]).attr('readonly', 'readonly')
                            $("#tblApprovaldet tbody tr td:eq(" + Appcount + ")").find('input').val(SubdocAppID[k]).attr('readonly', 'readonly')
                            $("#tblApprovaldet tbody tr td:eq(" + Datecount + ")").find('input').val(StatusChangeDate[k]).attr('readonly', 'readonly')
                            $("#tblApprovaldet tbody tr td:eq(" + reascount + ")").find('input').val(Reason[k]).attr('readonly', 'readonly')
                            $("#tblApprovaldet tbody tr td:eq(" + dropcount + ")").find('select option[value="' + ApprovalStatus[k] + '"]').attr({ selected: true });
                            $("#tblApprovaldet tbody tr td:eq(" + dropcount + ")").find('select').attr({ disabled: true, onchange: "" })

                            $("#tblApprovaldet tbody tr td:eq(" + Lencount + ")").find('input').val(SubdocLenID[k]).attr('tooltip', SubdocLenID[k])
                            $("#tblApprovaldet tbody tr td:eq(" + Appcount + ")").find('input').val(SubdocAppID[k]).attr('tooltip', SubdocAppID[k])
                            $("#tblApprovaldet tbody tr td:eq(" + Datecount + ")").find('input').val(StatusChangeDate[k]).attr('tooltip', StatusChangeDate[k])
                            $("#tblApprovaldet tbody tr td:eq(" + reascount + ")").find('input').val(Reason[k]).attr('tooltip', Reason[k])
                            $("#tblApprovaldet tbody tr td:eq(" + dropcount + ")").find('select option[value="' + ApprovalStatus[k] + '"]').attr('title', ApprovalStatus[k]);
                            $("#tblApprovaldet tbody tr td:eq(" + dropcount + ")").find('select option[value="' + ApprovalStatus[k] + '"]').attr('tooltip', ApprovalStatus[k]);

                            $("#tblApprovaldet tbody tr td:eq(" + Lencount + ")").find('input').val(SubdocLenID[k]).attr('data-original-title', SubdocLenID[k])
                            $("#tblApprovaldet tbody tr td:eq(" + Appcount + ")").find('input').val(SubdocAppID[k]).attr('data-original-title', SubdocAppID[k])
                            $("#tblApprovaldet tbody tr td:eq(" + Datecount + ")").find('input').val(StatusChangeDate[k]).attr('data-original-title', StatusChangeDate[k])
                            $("#tblApprovaldet tbody tr td:eq(" + reascount + ")").find('input').val(Reason[k]).attr('data-original-title', Reason[k])
                            $("#tblApprovaldet tbody tr td:eq(" + dropcount + ")").find('select option[value="' + ApprovalStatus[k] + '"]').attr('data-original-title', ApprovalStatus[k]);

                            k++;
                            Lencount = Lencount + 5;
                            Appcount = Appcount + 5;
                            Datecount = Datecount + 5;
                            reascount = reascount + 5;
                            dropcount = dropcount + 5;

                            $("#dummieselect option").val("Approved").text("Approved12312312");
                            $("#tblApprovaldet tbody tr td:eq(" + dropcount + ")").find('select').width($("#dummieselect").width());
                        }
                        else {
                            var usrtype = getusrtype();
                            var orgtype = getorgtype();
                            if ((orgtype == "Company" && json_obj[i].AppraisalStatus == "Submitted to Approver") || (usrtype == "Lender" && json_obj[i].AppraisalStatus == "Submitted" && (orgtype == "Company" || orgtype == "Individual" || orgtype == ""))) {
                                $("#tblApprovaldet tbody tr td:eq(" + Lencount + ")").find('input').val(LenderID).attr('readonly', 'readonly')
                                $("#tblApprovaldet tbody tr td:eq(" + Appcount + ")").find('input').val(AppraiserID).attr('readonly', 'readonly')
                                $("#tblApprovaldet tbody tr td:eq(" + Datecount + ")").find('input').val('').attr('readonly', 'readonly')
                                $("#tblApprovaldet tbody tr td:eq(" + reascount + ")").find('input').val('').attr('id', "myid")

                                $("#dummieselect option").val("Approved").text("Approved12312312");
                                $("#tblApprovaldet tbody tr td:eq(" + dropcount + ")").find('select').width($("#dummieselect").width());
                                if (orgtype == "Company" && usrtype == "Appraiser") {
                                    $("#tblApprovaldet tbody tr td:eq(" + dropcount + ")").find('select option[value="Approved"]').attr("disabled", true);
                                    $("#tblApprovaldet tbody tr td:eq(" + dropcount + ")").find('select option[value="Rejected"]').attr("disabled", true);
                                }
                                else if ((orgtype == "Company" || orgtype == "Individual" || orgtype == "") && usrtype == "Lender") {
                                    $("#tblApprovaldet tbody tr td:eq(" + dropcount + ")").find('select option[value="Approved By Approver"]').attr("disabled", true);
                                    $("#tblApprovaldet tbody tr td:eq(" + dropcount + ")").find('select option[value="Rejected By Approver"]').attr("disabled", true);
                                }
                                k++;

                            } else {
                                $("#tblApprovaldet tbody tr:last").remove();
                                $("#dummieselect option").val("Approved").text("Approved12312312");
                                $("#tblApprovaldet tbody tr td:eq(4)").find('select').width($("#dummieselect").width());
                            }
                        }
                    });
                }
                else {
                    var usrtype = getusrtype();
                    var orgtype = getorgtype();
                    $("#txtlenid").val(LenderID).text(LenderID).attr('readonly', 'readonly')
                    $("#txtappid").val(AppraiserID).text(AppraiserID).attr('readonly', 'readonly')
                    $("#txtappdate").val("").attr('readonly', 'readonly');
                    $("#txtappreason").val("");
                    $("#dummieselect option").val("Select").text("Approve32323d");
                    $("#tblApprovaldet tbody tr:last td:eq(4)").find('select').width($("#dummieselect").width());
                    if (orgtype == "Company") {
                        $("#tblApprovaldet tbody tr td:eq(4)").find('select option[value="Rejected"]').attr("disabled", true);
                        $("#tblApprovaldet tbody tr td:eq(4)").find('select option[value="Approved"]').attr("disabled", true);

                    }
                    else {
                        $("#tblApprovaldet tbody tr td:eq(4)").find('select option[value="Approved By Approver"]').attr("disabled", true);
                        $("#tblApprovaldet tbody tr td:eq(4)").find('select option[value="Rejected By Approver"]').attr("disabled", true);
                    }
                }
            }
            $(function () {
                $('[data-toggle=tooltip]').tooltip();
                $('[rel=tooltip]').tooltip();
            });
            $('#modalloading').modal('hide');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#modalloading').modal('hide');
        },
    });

}

function setEnvironment(usrtype, userrole, newuser, OrgType/*, anonymous*/) {
    
    var usertype = usrtype;
    var userrole = userrole;
    var Isnewuser = newuser;
    /*if (anonymous == "1")
    {
        $("#btnApplicationQueue").hide();
        $("#btnassignappraiser").hide();
        $("#lbpropcreate").hide();
        $("#Configparam").hide();
        $("#configuser").hide();
        $("#divsidenavbar").hide();

        $("#list_queue").hide();
        $("#list_assign").hide();
        $("#list_prop").hide();
        $("#list_paramconfig").hide();

        $("#list_usrconfig").hide();
        $("#list_Invoice").hide();
        $("#list_Inv").hide();
        $("#list_schedule").hide();
        $("#list_Vehicle_Main").hide();
        $("#list_Export").hide();
        $("#list_logout").hide();
    }*/
    //else {
    if (Isnewuser == "false") {
        $("#lbregister").hide();
        $("#btnApplicationQueue").hide();
        $("#btnassignappraiser").hide();
        $("#lbpropcreate").hide();
        $("#Configparam").hide();
        $("#configuser").hide();
        $("#divsidenavbar").hide();
        $('#divusrlist').hide()

        $("#list_usr").hide();
        $("#list_usrcont").hide();
        $("#list_queue").hide();
        $("#list_assign").hide();
        $("#list_prop").hide();
        //$("#list_paramconfig").hide();

        //$("#list_usrconfig").hide();
        $("#config_User_Param").hide()
        $("#list_menu").hide()
        $("#list_Invoice").hide();
        $("#list_Inv").hide();
        $("#list_schedule").hide();
        $("#list_Export").hide();

    }
    else {
        if (usertype == "Lender") {
            if (userrole == "Admin") {
                $("#lbpropcreate").hide();
                $("#btnApplicationQueue").hide();
                $("#btnassignappraiser").hide();

                $("#list_queue").hide();
                $("#list_assign").hide();
                $("#list_prop").hide();

                $('#list_menu br').hide()
                $('#list_paramconfig').next().show()
                $("#list_usrconfig").next().show()
                $("#list_Export").next().show()
            }
            if (userrole == "User") {
                //$("#Configparam").show();
                //$("#configuser").show();
            }
            $("#list_Invoice").hide();
            $("#list_Inv").hide()
            $('ul br').hide()
            $("#list_schedule").hide();
            $('#list_Vehicle_Main').hide();
        }
        else if (usertype == "Appraiser") {
            //$("#list_usrconfig").hide();
            //$("#list_paramconfig").hide();
            $("#config_User_Param").hide()
            $('ul br').hide()

            //if (OrgType == "Company") {

                //$("#list_assign").show();
                //$("#list_usr").show();
                //$('#list_menu br').hide();

                if (userrole == "Comp with lender") {
                    $("#list_assign").show();
                    $("#list_usr").show();
                    $('#list_menu br').hide();

                    $("#lbpropcreate").hide();
                  //  $("#lbregister").show();
                    $("#lbregister").hide();
                    //$("#test1").hide()
                    //$("#test2").hide()
                    //$("#test3").show()
                    $("#list_prop").hide();
                    $('#list_Vehicle_Main').hide();
                }
                else if (userrole == "Comp app without lender") {
                    $("#list_assign").show();
                    $("#list_usr").show();
                    $('#list_menu br').hide();

                    $("#list_Invoice").show();
                    $("#lbregister").hide();
                    //$("#test1").show()
                    //$("#test2").show()
                    //$("#test3").show()
                    $("#lbpropcreate").show();
                    $("#list_prop").show();
                    $("#list_usrconfig").hide();
                    $('#list_Vehicle_Main').hide();
                }
           // }
         //   else if (OrgType == "Individual") {
                //$("#list_assign").hide();
                //$("#list_prop").hide();
               else if (userrole == "Ind with lender") {
                    $("#list_assign").hide();
                    $("#list_prop").hide();

                    $("#list_prop").hide();
                    $("#list_usr").hide();
                    $("#list_usrcont").hide();
                    $("#list_assign").hide();
                    $("#list_prop").hide();
                    $("#list_Invoice").show();
                    $('#list_Vehicle_Main').hide();
                }
                else if (userrole == "Ind app without lender") {
                    $("#list_assign").hide();
                    $("#list_prop").hide();

                    //$("#list_Inv").hide()
                    $("#list_prop").show();
                    $("#lbregister").hide();
                    $("#list_usr").show();
                    //$("#test1").show();
                    //$("#test2").show();
                    //$("#test3").hide();
                    $("#lbregister").hide();
                    $("#lbpropcreate").show();
                    $("#config_User_Param").hide()
                    $("#btnassignappraiser").show();
                    $("#list_usrconfig").hide();
                    $("#btnApplicationQueue").show();
                    $("#list_queue").show();
                    $("#list_prop").show();
                    $("#list_assign").show();
                    $("#list_Invoice").show();
                    $('#list_Vehicle_Main').hide();
                }
                //else {
                //    $("#list_assign").hide();
                //    $("#list_prop").hide();

                //    $("#list_Invoice").hide();
                //    $("#list_Inv").hide()
                //    $("#list_assign").hide();
                //    $('#list_Vehicle_Main').hide();
                //    $("#list_prop").hide();
                //    $("#list_usr").hide();
                //}
          //  }
        }
        else if (usertype == "Borrower") {
            //Hiding buttons
            $("#lbregister").hide();
            $("#btnassignappraiser").hide();
            $("#lbpropcreate").hide();
            $("#Configparam").hide();
            $("#configuser").hide();
            $("list_Vehicle_Main").hide();
            //Hiding list items in nav bar
            $("#list_usr").hide();
            $("#list_usrcont").hide();
            $("#list_assign").hide();
            $("#list_prop").hide();
            //$("#list_paramconfig").hide();
            //$("#list_usrconfig").hide();
            $("#config_User_Param").hide()
            $('#list_menu br').hide()
        }
    }
    //}
}

//param configuration
function fnaddparam() {
    window.location.href = "AddNewParam.aspx";
}

var paramval = "";
function getparamdetails() {
    var userrole = getuserrole();
    $('#ddlparamparent').empty();
    $.ajax({
        type: "POST",
        url: "AddNewParam.aspx/GetParamParent",
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var jsonObj = JSON.parse(response.d);
            $('#modalloading').modal('hide');
            if (userrole == "User") {
                for (var i = 0; i < jsonObj.length; i++) {
                    if (jsonObj[i].Access == "User") {
                        $("#paramdata").append("<tr id=" + jsonObj[i].ParamID + "><td align='center'></td><td>" + jsonObj[i].ParentParamID + "</td>"
                            + "<td>" + jsonObj[i].ParamID + "</td>"
                            + "<td>" + jsonObj[i].ParamName + "</td>"
                            + "<td>" + jsonObj[i].ParamValue + "</td>"
                            + "<td>" + jsonObj[i].Editable + "</td>"
                            + "<td>" + jsonObj[i].ParamStatus + "</td>"
                            + "</tr>");
                    }
                }
            }
            else if (userrole == "Admin") {
                for (var i = 0; i < jsonObj.length; i++) {
                    $("#paramdata").append("<tr id=" + jsonObj[i].ParamID + "><td align='center'></td><td>" + jsonObj[i].ParentParamID + "</td>"
                        + "<td>" + jsonObj[i].ParamID + "</td>"
                        + "<td>" + jsonObj[i].ParamName + "</td>"
                        + "<td>" + jsonObj[i].ParamValue + "</td>"
                        + "<td>" + jsonObj[i].Editable + "</td>"
                        + "<td>" + jsonObj[i].ParamStatus + "</td>"
                        + "</tr>");
                }
            }

            $('#paramdata').DataTable({
                columnDefs: [{
                    className: 'select-checkbox',
                    targets: 0,
                    "orderable": false
                }],
                select: {
                    style: 'os',
                    selector: 'td:first-child'
                },
                order: [[1, 'asc']],

            });
            if ($('.paginate_button').size() > 3) {

                $('#paramdata_paginate')[0].style.display = "block";
            }
            else if ($('.paginate_button').size() == 3) {
                $('#paramdata_paginate')[0].style.display = "none";
            }

            var table = $('#paramdata').DataTable();
            table.columns().eq(0).each(function () {
                var column = table.column(0);
                allData = column.data();
            });

            $('#paramdata tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                    selectedrowparamid = "";
                    selectedrowparamval = "";

                }
                else {
                    selectedrowparamid = $(this).find('td').eq(2).text();
                    selectedrowparamval = $(this).find('td').eq(4).text();
                    table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
            });

            $('#paramdata tbody').on('dblclick', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                    selectedrowparamid = "";
                    selectedrowparamval = "";
                }
                else {
                    selectedrowparamid = $(this).find('td').eq(2).text();
                    selectedrowparamval = $(this).find('td').eq(4).text();
                    table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }

                editparamrecord();
            });

            $('#modalloading').modal('hide');

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#modalloading').modal('hide');
        },
    });
}

function getparamid() {
    var paramid = selectedrowparamid;
    return paramid;
}

function getparamval() {
    var paramval = selectedrowparamval;
    return paramval;
}

function editparamrecord() {
    var ParamID = getparamid();
    if (ParamID != "") {
        Getparamonchange();
        document.getElementById("txteditparamid").disabled = true;
        $('#modaleditparamdetails').modal('show');
    }
    else {
        $(function () {
            bootbox.dialog({
                closeButton: true,
                size: 'medium',
                message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please Select the Parameter to be Edited!</p>',
            });
            setTimeout(function () {
                bootbox.hideAll();
            }, 2500);
           // bootbox.alert("Please select the parameter to be edited!");
        });
    }
}

function Getparamonchange() {
    var paramid = getparamid();
    var obj = {
        ParamID: paramid
    }
    var value = JSON.stringify(obj);
    $.ajax({
        type: "POST",
        url: "AddNewParam.aspx/GetParamdetailsonchange",
        data: value,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var paramdetails = [];
            paramdetails = JSON.stringify(response.d);
            var jsonObj = JSON.parse(response.d);
            $('#modalloading').modal('hide');
            for (var i in jsonObj) {
                $("#txteditparamid").val(jsonObj[i].ParamID)
                $("#txteditparentpar").val(jsonObj[i].ParentParamID)
                $("#txteditparamname").val(jsonObj[i].ParamName)
                $("#txteditparamval").val(jsonObj[i].ParamValue)
                $("#ddlparamstatus").val(jsonObj[i].ParamStatus)
                $("#txtupdtuseraccess").val(jsonObj[i].UserAccess)
                var Editablestatus = jsonObj[i].Editable;
                if (Editablestatus == "N") {
                    document.getElementById("rdneditparams").checked = false;
                    document.getElementById("rdneditparamn").checked = true;
                }
                else if (Editablestatus != "N") {
                    document.getElementById("rdneditparams").checked = true;
                    document.getElementById("rdneditparamn").checked = false;
                }
                editablestatus()
            }
            $('#modalloading').modal('hide');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#modalloading').modal('hide');
            //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });
}

function fnparamsave(paramdet) {
    $.ajax({
        type: "POST",
        url: "AddNewParam.aspx/saveparamdetails",
        data: paramdet,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $('#modalloading').modal('hide');
            var jsonObj = [];
            jsonObj = JSON.parse(response.d);
            if (response.d == "0") {
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'small',
                        message: '<p class="text-center mb-0"><i class="fa fa-frown-o fa-lg"></i> Failed!</p>'
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                  //  bootbox.alert("Failed!");
                });
            }
            else if (response.d == "2") {
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Param ID Already Exists...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2000);
                    //bootbox.alert("Param ID already exists ");
                });
            }
            else {
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Param Details Saved Successfully...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                 
                       
                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#modalloading').modal('hide');
            //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });
}

function paramdelate() {
    var a = getuserrole()
    if (a == "Admin") {
        var ParamID = getparamid();
        if (ParamID != "") {
            bootbox.confirm("Do you want to Delete?", function (result) {
                if (result == true) {
                    fnparamdelete();
                }
            });
        }
        else {
            $(function () {
                bootbox.dialog({
                    closeButton: true,
                    size: 'medium',
                    message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please Select the Parameter to be Deleted!</p>',
                });
                setTimeout(function () {
                    bootbox.hideAll();
                }, 2500);
               // bootbox.alert("Please select the parameter to be deleted!");
            });
        }
    }
    else {
        $(function () {
            bootbox.dialog({
                closeButton: true,
                size: 'medium',
                message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please Contact Admin User to Delete this Parameter!</p>',
            });
            setTimeout(function () {
                bootbox.hideAll();
            }, 2500);
           // bootbox.alert("Please Contact Admin user to delete this parameter!");
        });
    }
}

function fnparamdelete() {
    var ParamID = getparamid();
    var editval = "";
    var obj = {
        ParamID: ParamID
    }
    var value = JSON.stringify(obj);
    $.ajax({
        type: "POST",
        url: "AddNewParam.aspx/deleteparamdetails",
        data: value,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $('#modalloading').modal('hide');
            var jsonObj = [];
            jsonObj = JSON.parse(response.d);
            if (response.d == "0") {
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'small',
                        message: '<p class="text-center mb-0"><i class="fa fa-frown-o fa-lg"></i> Failed!</p>'
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                   // bootbox.alert("Failed!");
                });
            }
            else {
                $(function () {
                    
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Param Deleted Successfully...</p>',
                        buttons: {
                            success: {
                                label: "OK",
                                callback: fnaddparam
                            }
                        }
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#modalloading').modal('hide');
            //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });
}

//User Connfiguration
function fnadduser() {
    window.location.href = "Userconfig.aspx";
}

var paramval = "";
function getuserdetails() {

    $('#modalloading').modal('show');
    $.ajax({
        type: "POST",
        url: "Userconfig.aspx/Getuserlist",
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $('#modalloading').modal('hide');
            var jsonObj = JSON.parse(response.d);
            
            for (var i = 0; i < jsonObj.length; i++) {
                $("#userdata").append("<tr id=" + jsonObj[i].UserID + "><td align='center' id=" + jsonObj[i].UserID + "></td><td>" + jsonObj[i].UserType + "</td>"
                    + "<td>" + jsonObj[i].UserName + "</td>"
                    + "<td>" + jsonObj[i].ContactDetails.EmailID + "</td>"
                    + "<td>" + jsonObj[i].Address.State + "," + jsonObj[i].Address.Country + "</td>"
                    + "<td>" + jsonObj[i].UserStatus + "</td>"
                    + "</tr>");
            }

            $('#userdata').DataTable({
                responsive: {
                    details: {
                        type: 'column'
                    }
                },
                columnDefs: [{
                    className: 'select-checkbox',
                    targets: 0,
                    "orderable": false
                },
                {
                    className: 'control',
                    targets: 1
                }
                ],
                select: {
                    style: 'os',
                    selector: 'td:first-child'
                },
                order: [[1, 'asc']]
            });
            if ($('.paginate_button').size() > 3) {
                $('#userdata_paginate')[0].style.display = "block";
            }
            else if ($('.paginate_button').size() == 3) {
                $('#userdata_paginate')[0].style.display = "none";
            }


            var table = $('#userdata').DataTable();
            table.columns().eq(0).each(function () {
                var rowided = table.column(0);
                columdata = rowided.data();
            });
            $('#userdata tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                    rowid = "";
                }
                else {
                    table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                    rowid = table.row(this).id();
                }
            });

            $('#userdata tbody').on('dblclick', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                    rowid = "";
                }
                else {
                    table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                    rowid = table.row(this).id();
                }
                edituserrecord();
            });

            $('#modalloading').modal('hide');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#modalloading').modal('hide');
            //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });
}

function getuserid() {
    var userlistid = rowid;
    return userlistid;
}

function edituserrecord() {
    var rowuserID = getuserid();
    if (rowuserID != "") {
        Getuseronchange();
        $('#modaledituserdetails').modal('show');
    }
    else {
        $(function () {
            bootbox.dialog({
                closeButton: true,
                size: 'medium',
                message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please Select the User to be Edited!</p>',
            });
            setTimeout(function () {
                bootbox.hideAll();
            }, 2500);
            //bootbox.alert("Please select the user to be edited!");
        });
    }
}

function Getuseronchange() {
    var userrow = getuserid();
    var obj = {
        UserID: userrow
    }
    var value = JSON.stringify(obj);
    $.ajax({
        type: "POST",
        url: "Userconfig.aspx/GetUserdetailsonchange",
        data: value,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var userdetails = [];
            userdetails = JSON.stringify(response.d);
            var jsonObj = JSON.parse(response.d);
            for (var i in jsonObj) {
                $("#txtedituserid").val(jsonObj[i].UserID)
                $("#txtusrrole").val(jsonObj[i].UserRole)
                $("#txteditusertype").val(jsonObj[i].UserType)
                $("#txteditusername").val(jsonObj[i].UserName)
                $("#txteditcontact").val(jsonObj[i].ContactDetails.PhoneNo)
                $("#txtusrmobno").val(jsonObj[i].ContactDetails.MobileNo)
                $("#txtusermail").val(jsonObj[i].ContactDetails.EmailID)
                $("#txtusraddr").val(jsonObj[i].Address.AddressLine1)
                $("#txtaddrline2").val(jsonObj[i].Address.AddressLine2)
                $("#txtusrarea").val(jsonObj[i].Address.AddArea)
                $("#txtusrcity").val(jsonObj[i].Address.City)
                $("#txtusrstate").val(jsonObj[i].Address.State)
                $("#txtusrcounty").val(jsonObj[i].Address.Country)
                $("#txtusrpin").val(jsonObj[i].Address.Pincode)
                $("#txtusrlandmark").val(jsonObj[i].Address.Landmark)
                $("#ddlusrstatus").val(jsonObj[i].UserStatus)

            }
            document.getElementById("txtedituserid").disabled = true;
            $('#modalloading').modal('hide');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#modalloading').modal('hide');
            //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });
}

function canceledituser() {
    $('#modaledituserdetails').modal('hide');
}

function adduser() {
    $('#modalchooseuser').modal('show');
}

function goaduserpage() {
    seluser = $('#chooseddlusr').val();
    fnregredirect1(seluser)
}

function userdelate() {
    var a = getuserrole()
    if (a == "Admin") {
        var UserID = getuserid();
        if (UserID != "") {
            bootbox.confirm("Do you want to Delete?", function (result) {
                if (result == true) {
                    fnuserdelete();
                } else {
                    //
                }
            });

        }
        else {
            $(function () {
                bootbox.dialog({
                    closeButton: true,
                    size: 'medium',
                    message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please Select the User to be Deleted!</p>',
                });
                setTimeout(function () {
                    bootbox.hideAll();
                }, 2500);
                //bootbox.alert("Please select the user to be deleted!");
            });
        }
    }
    else {
        $(function () {
            bootbox.dialog({
                closeButton: true,
                size: 'medium',
                message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please Contact Admin User to Delete a User!</p>',
            });
            setTimeout(function () {
                bootbox.hideAll();
            }, 2500);
           // bootbox.alert("Please contact admin user to delete a user!");
        });
    }
}

function fnuserdelete() {
    var userrowID = getuserid();
    var obj = {
        UserID: userrowID
    }
    var value = JSON.stringify(obj);
    $.ajax({
        type: "POST",
        url: "Userconfig.aspx/deleteuserdetails",
        data: value,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $('#modalloading').modal('hide');
            var jsonObj = [];
            jsonObj = JSON.parse(response.d);
            if (response.d == "0") {
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'small',
                        message: '<p class="text-center mb-0"><i class="fa fa-frown-o fa-lg"></i> Failed!</p>'
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                   // bootbox.alert("Failed!");
                });
            }
            else {
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> User Deleted Successfully...</p>',
                        
                        //message: "User Deleted Successfully!",
                        buttons: {
                            success: {
                                label: "OK",
                                callback: fnaddusers
                            }
                        }
                    });
                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#modalloading').modal('hide');
            //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });
}

function fnusereditsave(userdet) {
    $.ajax({
        type: "POST",
        url: "Userconfig.aspx/saveedituserdetails",
        data: userdet,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $('#modalloading').modal('hide');
            var jsonObj = [];
            jsonObj = JSON.parse(response.d);
            if (response.d == "0") {
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'small',
                        message: '<p class="text-center mb-0"><i class="fa fa-frown-o fa-lg"></i> Failed!</p>'
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                  //  bootbox.alert("Failed!");
                });
            }
            else if (response.d == "2") {
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Param ID Already Exists...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                   // bootbox.alert("Param ID already exists ");
                });
            }
            else {
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> User Details Saved Successfully...</p>',
                       buttons: {
                            success: {
                                label: "OK",
                                callback: fnadduser
                            }
                        }
                    });
                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#modalloading').modal('hide');
            //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });
}

function fnchklivCond() {
    if ($("#rdnlivableno").prop("checked")) {
        if (locpropertytype == "Land") {
            $("#txtreason").attr('required', false)
        }
        else {
            $("#txtreason").attr('required', true)
        }
    }
    else if ($("#rdnlivableyes").prop("checked")) {
        $("#txtreason").attr('required', false)
    }
}
//Approval Reset
function resetapproval() {
    // document.getElementById("txtReleaseCertNo").disabled = false;
    $("#txtApprovaNo").val("").attr("disabled", true)
    $("#txtnonapproval").val("");
    // $("#txtReleaseCertNo").val("");
    txtboxenabled($("#rdnalreadyregNo").get(0));
    $("#txtnonapproval").attr("disabled", false)

    $("#txtsurveyno").val("");
    $("#txtsurveydate").val("");
    //  $("#txtundividedshare").val("");

    //$("#ddlzone").prop('selectedIndex', 0);
    //$("#ddlsroloc").prop('selectedIndex', 0);
    //$("#ddlvillage").prop('selectedIndex', 0);
    $("#txtZone").prop('selectedIndex', 0);
    $("#txtSRO").prop('selectedIndex', 0);
    $("#txtViallage").prop('selectedIndex', 0);

    // document.getElementById("rdnenmarkedYes").checked = false;
    // document.getElementById("rdnenmarkedNo").checked = true;
    // document.getElementById("rdnLandZoneYes").checked = false;
    // document.getElementById("rdnLandZoneNo").checked = true;
    // document.getElementById("rdnalreadyregYes").checked = false;
    //  document.getElementById("rdnalreadyregNo").checked = true;

    // document.getElementById("rdnApprovedYes").checked = false;
    // document.getElementById("rdnApprovedNo").checked = true;
    // document.getElementById("rdnApprovedpending").checked = false;
    document.getElementById("rdnDTCPapprove").checked = true;
    document.getElementById("rdnCMDAapprove").checked = false;
    document.getElementById("rdnPanchayatapprove").checked = false;
    document.getElementById("rdnMunicipalityapprove").checked = false;

    document.getElementById("rdnDTCPapprove").disabled = true;
    document.getElementById("rdnCMDAapprove").disabled = true;
    document.getElementById("rdnPanchayatapprove").disabled = true;
    document.getElementById("rdnMunicipalityapprove").disabled = true;

    $("#txtpaid").val("")
}

//Added by Nirmala
function fnresetGeneral() {

    $("#textgenval").val("");
    $("#textgeninsdate").val("");
    $("#textgenvaldate").val("");
    $("#tblregisteredname input[type=text]").val("");
    $("#textgenownprop").val("");
    $("#txtperusal").val("");
    $("#textgendescprop").val("");
    $("#textgenscopeval").val("");
    $("#textgennamebank").val("");
    $("#textgenbankbranch").val("");
    $("#textgenvalasso")[0].selectedIndex = 0;
    $("#textgenpersonacc").val("");
    $("#textgenprojsite").val("");
    $("#textgenproptype").val("");
    document.getElementById("rdnlocvillage").checked = false;
    document.getElementById("rdnloctown").checked = false;
    document.getElementById("rdnlocmetro").checked = true;

}

function fnresetPropdesc() {
    document.getElementById("rdnalreadyregNo").checked = false;
    document.getElementById("rdnalreadyregYes").checked = true;

    document.getElementById("rdnlocNo").checked = false;
    document.getElementById("rdnlocYes").checked = true;

    document.getElementById("rdnbtnIndustrial").checked = false;
    document.getElementById("rdnbtnCommercial").checked = false;
    document.getElementById("rdnbtnResidential").checked = true;

    document.getElementById("rdnbtnmiddle").checked = false;
    document.getElementById("rdnbtnpoor").checked = false;
    document.getElementById("rdnbtnhigh").checked = true;

    document.getElementById("rdnbtnsemi").checked = false;
    document.getElementById("rdnbtnrural").checked = false;
    document.getElementById("rdnbtnurban").checked = true;
    $("#txtprodoorNo").val("");
    $("#Textpropstreet").val("");
    $("#txtproareaname").val("");
    $("#txtprocity").val("");
    $("#txtprostate").val("");
    $("#Textpropcountry").val("");
    $("#textproppin").val("");
    $("#landAptid").val("");
    $('#txtdateofregn').val("");
    $('#txtRegistrationvalue').val("");
    $("#txtundividedshare").val("");
    $('#txtlocroadwidth').val("");
    $("#txtlandmeasurement").val("");
    $("#txtsurveyorcert").val("");
    $("#txtprozone").val("");
    $("#txtprosro").val("");
    $("#txtprovillage").val("");
    $("#txtprosurno").val("");
    $("#txtprosurdate").val("");
    $("#txtproabutrd").val("");
    $("#txtproorienplot").val("");
    $("#txtprolandmark").val("");
    $("#txtprosurcomm").val("");
    $("#txtprodiscity").val("");
    $("#txttotalsqft").val("");
}

//Added by Nirmala
function fnresetstatutory() {

    document.getElementById("rdnApprovedYes").checked = true;
    document.getElementById("rdnApprovedNo").checked = false;
    document.getElementById("rdnApprovedpending").checked = false;

    document.getElementById("txtstattype1").checked = true;
    document.getElementById("txtstattype2").checked = false;
    document.getElementById("txtstattype3").checked = false;

    document.getElementById("txtstatreserved1").checked = false;
    document.getElementById("txtstatreserved2").checked = false;
    document.getElementById("txtstatreserved3").checked = false;
    document.getElementById("txtstatreserved4").checked = false;
    document.getElementById("txtstatreserved5").checked = false;
    document.getElementById("txtstatreserved6").checked = false;
    document.getElementById("txtstatreserved7").checked = false;
    document.getElementById("txtstatreserved8").checked = true;

    document.getElementById("txtstatcontemplated1").checked = true;
    document.getElementById("txtstatcontemplated2").checked = false;

    document.getElementById("txtstatlocked1").checked = true;
    document.getElementById("txtstatlocked2").checked = false;

    document.getElementById("txtstattownplan1").checked = true;
    document.getElementById("txtstattownplan2").checked = false;
    document.getElementById("txtstattownplan3").checked = false;

    document.getElementById("txtstatappauth1").checked = true;
    document.getElementById("txtstatappauth2").checked = false;
    document.getElementById("txtstatappauth3").checked = false;
    document.getElementById("txtstatappauth4").checked = false;

    document.getElementById("txtstatauth1").checked = true;
    document.getElementById("txtstatauth2").checked = false;
    $("#txtstatreserved9").val("");
    $("#txtstatrest").val("");
    $("#txtstatreserved6").val("");
    $("#txtstatdrawing").val("");
    $("#otherstext").hide();
    $("#txtstatappnumber").val("");
    $("#txtstatappdate").val("");
    $('#txtReleaseCertNo').val("");
    $("#txtstatsanction").val("");
    $("#txtstatvariations").val("");
    $("#txtstatempanelled").val("");
    $("#txtstatvalued").val("");
    $("#txtstatassess").val("");
    $("#txtstattaxamt").val("");
    $("#txtstattaxreceipt").val("");
    $("#txtstatdatepaid").val("");
    $("#txtstattaxpaid").val("");
    $("#txtstatelectricity").val("");
    $("#txtstatmaster").val("");
    $("#txtstatwealth").val("");
    $("#txtstatease").val("");
    $("#txtstatwater").val("");
}
//Added by Anupriya
function resetbuild() {
    $("#tblBuliddetnorth input[type=text]").val("")
    $("#tblBuliddetsouth input[type=text]").val("")
    $("#tblBuliddeteast input[type=text]").val("")
    $("#tblBuliddetwest input[type=text]").val("")
    $("#tblBuliddetextent input[type=text]").val("")
    $("#tblBuliddetunit input[type=text]").val("")
    $("#txtconstuction").val("")
    $("#txtqtyofconstruction").val("")
    $("#txtapperancebuild").val("")
    $("#txtmanitanceofbuild").val("")
    $("#tblnooffloors input[type=text]").val("")
    $("#tblhouseapart input[type=text]").val("")
    $("#tblplintarea input[type=text]").val("")
    $("#txtoccupiedby").val("")
    $("#txtgrossmonthlyrent").val('')
    $("#txtgrossadvanceamt").val('');
}
//Added by Anupriya
function resetvalgen() {
    $("#txtmarketinfo").val("")
    $("#txtpremarrate").val("")
    $("#txtsoupremarrate").val("")
    $("#txtunitrate").val("")
    $("#txtpmr").val("")
    $("#txtregoffice").val("")
    $("#txtglr").val('')
    $("#txtpresentval").val('');
    $("#txtrates").val("");
    $("#txtdeptrates").val("");
    $("#txtregrates").val("");
    $("#txtbuildins").val("");
    $("#txtsaleval").val("");
    $("#txtsourcesaleval").val("");
    $("#txtproreason").val("");
    $("#txtnotesapp").val("");
    $("#txtpurland").val("");
    $("#txtpricepaid").val("");
    $("#txtpurbuild").val("");
    $("#txtcostconst").val("");
    $("#txtimprov").val("");
    $("#txttotcost").val("");
    $("#txtprestprop").val("");
    $("#tblbuildest input[type=text]").val("");
    $("#tblageapart input[type=text]").val("");
    $("#tbldeppercen input[type=text]").val("");
    $("#tbldepval input[type=text]").val("");
    $("#tblrepdesc input[type=text]").val("");
    $("#tbltotsqft input[type=text]").val("");
    $("#tblrepest input[type=text]").val("");
    $("#tblestrs input[type=text]").val("");
    $("#tblportrooms input[type=text]").val("");
    $("#tblfound input[type=text]").val("");
    $("#tblsupstruct input[type=text]").val("");
    $("#tblroof input[type=text]").val("");
    $("#tblflooring input[type=text]").val("");
    $("#tbljoin input[type=text]").val("");
    $("#tblwire input[type=text]").val("");
    $("#tbldoor input[type=text]").val("");
    $("#tblwindow input[type=text]").val("");
    $("#tblwcourse input[type=text]").val("");
    $("#txtsalval").val("");
    $("#txtref1").val("");
    $("#txtref2").val("");
    $("#txtassedbuild").val("");
    // $("#ddlpropTypeSum")[0].selectedIndex = 0;

}


//Property Land Reset ///Added by Deepa
function resetpropertyland() {
    $("#tblpropdim input[type=text]").val("");
    $("#tblextentunit input[type=text]").val("");
    $("#txtwidthoftheroadft").val("");
    $("#txtextentsite").val("");
    $("#txtsize").val("");
    $("#txtnorthsouth").val("");
    $("#txteastwest").val("");
    $("#txttotalextent").val("");
    $("#txtreservedland").val("");
    $("#txtfloodingorsubmerging").val("");
    $("#txtdevsurroundingareas").val("");
    $("#txtshapeandmeasure").val("");
    $("#txtcivicamenities").val("");
    $("#txttopographical").val("");
    $("#txttenureland").val("");
    $("#txtcornerplot").val("");
    $("#txttypeofroad").val("");
    $("#txtavgdepthwidth").val("");
    $("#txtroadfacilities").val("");
    $("#txtwaterpotentiality").val("");
    $("#txtwidthoftheroad").val("");
    $("#txtunderground").val("");
    $("#txtpowersupply").val("");
    $("#txtspecialremarks").val("");
    $("#txtfloorindex").val("")
    $("#txtplotcoverage").val("");
}

//Pricing Property Reset
function resetpricingprop() {


    document.getElementById("rdnlivableyes").checked = true;
    document.getElementById("rdnlivableno").checked = false;

    // document.getElementById("rdnlocYes").checked = true;
    // document.getElementById("rdnlocNo").checked = false;

    //$("#txtlandmeasurement").val("")
    //$("#txtsurveyorcert").val("")
    $("#txtreason").val("")
    $("#txthouseage").val("")
    $("#txtfootage").val("")
    $("#txtfloors").val("")
    $("#txtrooms").val("")
    $("#txtsqfoot").val("")
    $("#txtcommon").val("")
    $("#txtcommonper").val("")
    $("#txtplinth").val("")
    $("#txtcarpet").val("")
    $("#txttotalarea").val("")
    $("#txtconstruction").val("");

    $("#txtfloorspace").val("");
    $("#txtconstruction").attr("disabled", false).val("")
    $("#txtreason").attr("disabled", true).val("")
    $('#ddllocunits').val('ground(s)');

    if (localStorage.getItem("PropertyType") == "Apartment") {
        document.getElementById("rdncomphouse").checked = false;
        document.getElementById("rdnconshouse").checked = false;
        document.getElementById("rdncompApart").checked = true;
        document.getElementById("rdnconsApart").checked = false;

    }
    if (localStorage.getItem("PropertyType") == "Building") {
        document.getElementById("rdncomphouse").checked = true;
        document.getElementById("rdnconshouse").checked = false;
        document.getElementById("rdncompApart").checked = false;
        document.getElementById("rdnconsApart").checked = false;
    }
    if (localStorage.getItem("PropertyType") == "Land") {
        document.getElementById("rdncomphouse").checked = false;
        document.getElementById("rdnconshouse").checked = false;
        document.getElementById("rdncompApart").checked = false;
        document.getElementById("rdnconsApart").checked = false;
    }
    txtlocextendofland.value = "";
    document.getElementById("rdnlocrequireYes").checked = true;
    document.getElementById("lblloccompndwall").checked = true;
    //   txtlocroadwidth.value = "";
    txtlocFootageReason.value = "";
    txtlocFootageReason.disabled = true;
}
//Services Details Reset  ///Added by Deepa...
function resetservicesdetails() {
    document.getElementById("rbsuperior").checked = true;
    document.getElementById("rbordinary").checked = false;
    document.getElementById("rbpoor").checked = false;
    $("#txtwatersupplyarrang").val("");
    $("#txtopenwell").val("");
    $("#txtdeepbore").val("");
    $("#txthandpump").val("");
    $("#txtmotor").val("");
    $("#txtcorpotap").val("");
    $("#txtundergnd").val("");
    $("#txtoverheadtank").val("");
    $("#txtdrainagearrang").val("");
    $("#txtseptictank").val("");
    $("#txtundergndsew").val("");
    $("#txtrmvalueCW").val("");
    $("#txtrmvalueCW2").val("");
    $("#txtcompundwall").val("");
    $("#txtheight").val("");
    $("#txtlength").val("");
    $("#txttypeofconstruction").val("");
    $("#txtpavements1").val("");
    $("#txtpavements2").val("");
    $("#txtpavements").val("");
    $("#txtsteelgate1").val("");
    $("#txtsteelgate2").val("");
    $("#txtsteelgate").val("");
    $("#txtebdeposits").val("");
    $("#txtelecfitting").val("");
    $("#txtwiring").val("");
    $("#txtlightpts").val("");
    $("#txtfanpts").val("");
    $("#txtspareplug").val("");
    $("#txtotheritem").val("");
    $("#txtplumbing").val("");
    $("#txtclosets").val("");
    $("#txtwashbasins").val("");
    $("#txtbathtubs").val("");
    $("#txtwatermetertaps").val("");
    $("#txtotherfixtures").val("");
    $("#txtanyother").val("");
    $("#txttotal").val("");

}


//Amenities Reset
function resetamenities() {
    $("#txtlift").val("")
    $("#txtcarpark").val("")
    $("#txtcovered").val("")
    $("#txtresident").val("")
    $("#txthealthothers").val("")
    $("#dlamenity").val("")
    $("#dlfitness").val("")
    $("#dlhealth").val("")
    $("#txtflatmaintainance").val("");
    $("#dlamenity").prop('selectedIndex', -1);
    $("#dlfitness").prop('selectedIndex', -1);
    $("#dlhealth").prop('selectedIndex', -1);
    //Added by Deepa
    $("#dlAmenitiesbuilding").prop('selectedIndex', -1);
    var dynamicTextbox = document.getElementsByClassName("dynamicTextboxRoom");
    for (var i = 0; i < dynamicTextbox.length; i++) {
        dynamicTextbox[i].value = '';
    }
}


//Summary Reset
function resetsummarydetails() {
    $("#txtestimate").val("");
    $("#txtesttotval").val("");
    $("#txtguidpersqft").val("");
    $("#txtguide").val("");
    $("#txtcompositelocality").val("");
    $("#ddlmethodofvaluation")[0].selectedIndex = 0;
    $("#txtnewcompositelocality").val("");
    $("#txtreplacecost").val("");
    $("#txtbuildinglife").val("");
    $("#txttotalcomposite").val("");
    $("#tblpropval tbody tr:gt(0)").remove();
    $("#tblpropval input[type=text]").val("");
    // $("#ddlpropTypeSum")[0].selectedIndex = 0;
    $('#ddlpropTypeSum').prop('selectedIndex', 0);
    $("#txtRemark").val("")
    $("#txtMeasurement").val("")
    $("#txtsummaryglr").val("")
    $("#txtsummarypmr").val("")
    $("#txtTotalGLR").val("")
    $("#txtTotalPMR").val("")
    $('#txtrecommendedvalue').val("");
    $('#txtrecommendedvaluepmr').val("");
    $('#txtfinalrec').val("");
    $("#txtmismatchreason").val("");
    $('#txtrecommendation').val("");
    $('#sumotherdetails').val("");
    $('#Uploadframe').replaceWith($('#Uploadframe').val('').clone(true))
    $('#txtInvoiceAmt').val("");
}
function setselbtn(str) {
    window.hdnnelem = str;
}

var dum = window.hdnnelem
function getselbtn() {
    return dum;
}

function fncpyattr(dropid) {
    var $select = $("#" + dropid + " > option");
    var divid = 'my' + dropid;
    $('#' + dropid).closest('div.custom-select').attr('id', divid);
    $('#' + divid).find("ul").each(function () {
        optlist = $select;
        $(this).find('li').each(function () {
            if ($(this).text() == "Select Property") {
                $(this).attr("title", "Select Property");
                optlist = optlist.next("option");
            }
            else if ($(this).text() == "Select Borrower") {
                $(this).attr("title", "Select Borrower");
                optlist = optlist.next("option");
            }
            else if ($(this).text() == "Select Appraiser") {
                $(this).attr("title", "Select Appraiser");
                optlist = optlist.next("option");
            }
            else if ($(this).text() == "Select Lender") {
                $(this).attr("title", "Select Lender");
                optlist = optlist.next("option");
            }
            else if ($(this).text() == "Select") {
                $(this).attr("title", "Select");
                optlist = optlist.next("option");
            }
            else {
                $(this).attr("title", optlist.attr("title"));
                optlist = optlist.next("option");
            }
        });
        $("#" + divid + " li.active").tooltips();
        $('div.tooltip').css("text-align", "left")
    });
}

//function getGuideLine() {
//    var obj = {
//        Zone: $('#ddlloccity option:selected').text(),
//        StreetName: $('#txtstreetnameval').val(),
//        Village: $('#txtareaname').val()
//    }
//    var jsonstring = JSON.stringify(obj);
//    $.ajax({
//        type: "POST",
//        url: "landingpage.aspx/getGuideLineValues",
//        data: jsonstring,
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (response) {
//            var gh;
//            if (response.d == "") {
//                $("#txtguide").removeAttr('readonly')
//                $("#txtguidpersqft").removeAttr('readonly')
//            }
//            else if (JSON.parse(response.d).PerSqft == '') {
//                $("#txtguidpersqft").removeAttr('readonly')
//                var totarea = JSON.parse(response.d).TotalArea;
//                localStorage.setItem('totalarea', totarea);
//                $("#txtguidpersqft").on('change', function (event) {
//                    $("#txtguide").val($("#txtguidpersqft").val() * localStorage.getItem('totalarea'))
//                    formatNumber("txtguide");
//                    formatNumber("txtguidpersqft");
//                })
//            }
//            else {
//                var jsonobj = JSON.parse(response.d);
//                var sqft = jsonobj.PerSqft;
//                var sqft1 = sqft.split('/');
//                sqft = sqft1[0];
//                var totarea = jsonobj.TotalArea;
//                var GuideLineval = sqft * totarea
//                localStorage.setItem('totalarea', totarea);
//                $("#txtguide").val(GuideLineval);
//                $("#txtguidpersqft").val(sqft)
//                formatNumber("txtguide");
//            }
//        },
//        error: function (XMLHttpRequest, textStatus, errorThrown) {
//            //$('#modalloading').modal('hide');
//            //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
//        },
//    });
//}

var Jsonareaobj = {
    JsonArea: []
};
var Areacount = 0;
var PrevArea = [];
function getarea(area, codeadd) {
    $("#ddlareaname").empty();
    $("#ddlareaname").append("<option value='none'>Select Area</option>");
    $("#ddlareaname").append("<option value='Add Option'>Add Area</option>");
    var k = "";
    for (var i = 0; i < PrevArea.length; i++) {
        if (PrevArea[i] == area) {
            Jsonareaobj.JsonArea[i].forEach(function (street) {

                if (street.Village != k) {
                    var option = "<option value='" + street.Village + "'>" + street.Village + "</option>";
                    $("#ddlareaname").append(option);
                }
                k = street.Village;
            })
        }
    }

    var obj = {
        zone: area
    }
    var jsonstring = JSON.stringify(obj);
    $.ajax({
        type: "POST",
        url: "landingpage.aspx/getAreaValues",
        data: jsonstring,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.d != "") {
                var jsonobj = JSON.parse(response.d)
                Jsonareaobj.JsonArea[Areacount] = JSON.parse(response.d);
                PrevArea[Areacount] = area;
                Areacount += 1;
                var a = "";
                var areaddl = $("#ddlareaname option:first");
                jsonobj.forEach(function (street) {
                    if (street.Village != a) {
                        areaddl.after($("<option />").val(street.Village).text(street.Village));
                    }
                    a = street.Village;
                })
                if (codeadd == 1) {
                    codeAddress(area + ', ' + $('#ddlareaname').val() + ', ' + $('#ddlpropcity').val())
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //$('#modalloading').modal('hide');
            //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });
}

function getstreet(area, codeadd) {
    $("#ddlstreetname").empty();
    $("#ddlstreetname").append("<option value='none'>Select Street</option>");
    $("#ddlstreetname").append("<option value='Add Option'>Add Street</option>");
    var obj = {
        zone: area
    }
    var jsonstring = JSON.stringify(obj);
    $.ajax({
        type: "POST",
        url: "landingpage.aspx/getStreetValues",
        data: jsonstring,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.d != "") {
                var jsonobj = JSON.parse(response.d)
                var streetddl = $("#ddlstreetname option:first");
                jsonobj.forEach(function (street) {
                    streetddl.after($("<option />").val(street.StreetName).text(street.StreetName));
                })
                if (codeadd == 1) {
                    codeAddress(area + ', ' + $('#ddlpropcity').val())
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //$('#modalloading').modal('hide');
            //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });
}

function addoption(codeadd, elemid) {
    if ($("#" + elemid).val() == "Add Option") {
        var a = "";
        msg = "";
        if (elemid == "ddlareaname") {
            msg = "Enter Area Name";
        }
        /*else if (elemid == "Options") {
            msg = "Enter Text";
        }*/
        else {
            msg = "Enter Street Name";
        }
        var ddl = $("#" + elemid + " option:first");
        bootbox.prompt(msg, function (result) {
            if (result != null && result != "") {
                ddl.after($("<option />").val(result).text(result));
                $("#" + elemid).val(result);
            }
            else {

                if (elemid == "ddlareaname") {
                    ddlareaname.selectedIndex = 0;
                }
                else {
                    ddlstreetname.selectedIndex = 0;
                }
                $("#" + elemid).trigger('change.select2');
                codeadd = 0;
            }

        });

    }
    if (codeadd == 1) {
        //codeAddress($("#ddlstreetname").val() + ', ' + $('#ddlareaname').val() + ', ' + $('#ddlpropcity').val())
    }
}

function setMarkers(cityname, streetname, village, sroloc) {

    var obj = {
        zone: cityname,
        street: streetname,
        village: village,
        sroloc: sroloc
    }
    var jsonstring = JSON.stringify(obj);

    $.ajax({
        type: "POST",
        url: "landingpage.aspx/getMatchingStreets",
        data: jsonstring,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.d != "") {
                var jsonobj = JSON.parse(response.d)
                calme(response);
            } else {
                setTimeout(function () {
                    setMarker1(JSON.parse(localStorage.getItem('LatLongitue')))
                }, 1000)
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //$('#modalloading').modal('hide');
            //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });
}


function fncalAge() {

    var currdate = new Date();
    currdate = currdate.getFullYear();

    var Age;
    Age = currdate - $("#txtconstruction").val();

    if ($("#txtconstruction").val() == "")
        $("#txthouseage").val("0");

    $("#txthouseage").val(Age);
}

function fnresetMisc() {
    $("#txtdocs").val("");
    $("#txtbriefdesc").val("");

    //document.getElementById("rdnbtnCommercial").checked = false;
    //document.getElementById("rdnbtnIndustrial").checked = false;
    //document.getElementById("rdnbtnResidential").checked = true;

    document.getElementById("rdnbtnMiddleClass").checked = false;
    document.getElementById("rdnbtnPoorClass").checked = false;
    document.getElementById("rdnbtnHighClass").checked = true;

    document.getElementById("rdnoccupiedNo").checked = false;
    document.getElementById("rdnoccupiedYes").checked = true;

    $("#txtoccupiedperiod").attr("disabled", true);
    $("#txtRentamount").attr("disabled", true);

    $("#txtoccupiedperiod").val("");
    $("#txtRentamount").val("");
    $("#txttypeofstruct").val("");
    //$("#txtdwllingunits").val("");
    $("#txtQuality").val("");
    $("#txtBuildingAppearance").val("");
    $("#txtMaintenance").val("");
    $("#txtFloor").val("");
    $("#txtspecification").val("");
    $("#txtAssessment").val("");
    $("#txttaxpayname").val("");
    $("#txttaxamount").val("");
    $("#txtelectricitynum").val("");
    $("#txtmastercardname").val("");
    $("#txtresidentialcomm").val("");
    $("#txtmarketabilityinfo").val("");

    $("#txtfactorsfav").val("");
    $("#txtnegativefactors").val("");
}

function fndisabletenent() {
    $("#txtoccupiedperiod").attr("disabled", true);
    $("#txtRentamount").attr("disabled", true);
    $("#txtoccupiedperiod").val("");
    $("#txtRentamount").val("");
}

function fnenabletenent() {
    $('input[name$=rdnoccupiedBy]').attr("disabled", false);
    $("#txtoccupiedperiod").attr("disabled", false);
    $("#txtRentamount").attr("disabled", false);
}

function fndisableyear() {
    $('input[name$=rdnoccupiedBy]').attr("disabled", true);
    $("#txtconstruction").attr("disabled", true);
    $("#txtconstruction").val("");
    $("#txthouseage").val("");
}


function fnenableyear() {
    $("#txtconstruction").attr("disabled", false);
    $("#txtconstruction").val("");
    $('input[name$=rdnoccupiedBy]').attr("disabled", false);
}

function fnsaveMisc() {
    var valueId = getIDs();

    if ($('input[name$=rdnoccupiedBy]:checked').val() == "Tenant") {
        $("#txtoccupiedperiod").attr('required', true)
        $("#txtRentamount").attr('required', true)
    }
    var divstatus = checkval('divMiscelaneousdetails');
    if (divstatus == 0) {
        var obj = {
            // PropertyArea: $('input[name$=rdnPropertyArea]:checked').val(),
            AreaClassification: $('input[name$=rdnAreaClass]:checked').val(),
            lbloccupiedby,
            OccupiedPeriod: $("#txtoccupiedperiod").val(),
            RentAmount: $("#txtRentamount").val(),
            TypeOfStructure: $("#txttypeofstruct").val(),
            //   DwllingUnits: $("#txtdwllingunits").val(),
            Quality: $("#txtQuality").val(),
            BuildingAppearance: $("#txtBuildingAppearance").val(),
            Maintenance: $("#txtMaintenance").val(),
            Floor: $("#txtFloor").val(),
            Specification: $("#txtspecification").val(),

            Assessment: $("#txtAssessment").val(),
            TaxPayerName: $("#txttaxpayname").val(),
            TaxAmount: $("#txttaxamount").val(),
            ElectricityNum: $("#txtelectricitynum").val(),
            MasterCardName: $("#txtmastercardname").val(),
            Purpose: $("#txtresidentialcomm").val(),

            MarketabilityInfo: $("#txtmarketabilityinfo").val(),
            FactorFav: $("#txtfactorsfav").val(),
            Docs: $("#txtdocs").val(),
            BriefDesc: $("#txtbriefdesc").val(),
            NegativeFactors: $("#txtnegativefactors").val(),
            ValuationID: valueId
        }
        fnSaveMiscDetails(JSON.stringify(obj))
    }
    else {
        bootbox.dialog({
            closeButton: true,
            size: 'medium',
            message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please Enter Valid Values in the Highlighted Mandatory Field(s)</p>',
        });
        setTimeout(function () {
            bootbox.hideAll();
        }, 2000);
       // bootbox.alert("<div>Please enter valid values in the highlighted mandatory field(s)</div>");
        var id = $('.error').attr('id');
        $('html,body').animate({
            scrollTop: $("#" + id).offset().top
        }, 'slow');
        $("#txtoccupiedperiod").attr('required', false)
        $("#txtRentamount").attr('required', false)
    }
}


function fnSaveMiscDetails(jsonobj) {
    $.ajax({
        type: "POST",
        url: "landingpage.aspx/SaveMiscDetails",
        data: jsonobj,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.d == "1") {
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Miscellaneous Data Saved Successfully...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                  //  bootbox.alert("Miscellaneous Data Saved Successfully");
                    $('#modalloading').modal('hide');
                    $("#MiscHeading").css("background", "rgba(68, 125, 7, 0.47)");
                });
            } else {
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-frown-o fa-lg"></i> Miscellaneous Data Save Failed!</p>'
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                   // bootbox.alert("Miscellaneous Data Save Failed");
                    $('#modalloading').modal('hide');
                    $("#MiscHeading").css("background", "rgba(68, 125, 7, 0.47)");
                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });
}

function GetMiscdetails() {
    valID = getIDs()
    var obj = {
        ValuationID: valID
    }
    var Miscdet = JSON.stringify(obj);
    $.ajax({
        type: "POST",
        url: "landingpage.aspx/GetMiscDetails",
        data: Miscdet,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var Miscdetails = $.parseJSON(response.d);
            //  $('input:radio[name$=rdnPropertyArea][value="' + Miscdetails.Miscelaneous.PropertyArea + '"]').prop('checked', 'checked');
            $('input:radio[name$=rdnAreaClass][value="' + Miscdetails.Miscelaneous.AreaClassification + '"]').prop('checked', 'checked');
            $('input:radio[name$=rdnoccupiedBy][value="' + Miscdetails.Miscelaneous.OccupiedBy + '"]').prop('checked', 'checked');
            $("#txtoccupiedperiod").val(Miscdetails.Miscelaneous.OccupiedPeriod),
            $("#txtRentamount").val(Miscdetails.Miscelaneous.RentAmount),
            $("#txttypeofstruct").val(Miscdetails.Miscelaneous.TypeOfStructure),
            //    $("#txtdwllingunits").val(Miscdetails.Miscelaneous.DwllingUnits),
            $("#txtQuality").val(Miscdetails.Miscelaneous.Quality),
            $("#txtBuildingAppearance").val(Miscdetails.Miscelaneous.BuildingAppearance),
            $("#txtMaintenance").val(Miscdetails.Miscelaneous.Maintenance),
            $("#txtFloor").val(Miscdetails.Miscelaneous.Floor),
            $("#txtspecification").val(Miscdetails.Miscelaneous.Specification),
            $("#txtAssessment").val(Miscdetails.Miscelaneous.Assessment),
            $("#txttaxpayname").val(Miscdetails.Miscelaneous.TaxPayerName),
            $("#txttaxamount").val(Miscdetails.Miscelaneous.TaxAmount),
            $("#txtelectricitynum").val(Miscdetails.Miscelaneous.ElectricityNum),
            $("#txtmastercardname").val(Miscdetails.Miscelaneous.MasterCardName),
            $("#txtresidentialcomm").val(Miscdetails.Miscelaneous.Purpose),
            $("#txtmarketabilityinfo").val(Miscdetails.Miscelaneous.MarketabilityInfo),
            $("#txtfactorsfav").val(Miscdetails.Miscelaneous.FactorFav),
            $("#txtdocs").val(Miscdetails.Miscelaneous.Docs),
            $("#txtbriefdesc").val(Miscdetails.Miscelaneous.BriefDesc),
            $("#txtnegativefactors").val(Miscdetails.Miscelaneous.NegativeFactors),
            $('input:radio[name$=rdnoccupiedBy][value="' + Miscdetails.Miscelaneous.OccupiedBy + '"]').prop('checked', 'checked').click();
            $('#modalloading').modal('hide');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });
}


function test(fobj) {

}

function fnback2queue() {
    try {
        fnback()
    }
    catch (e) {
        console.log(e)
    }
}

function fnSendEmail() {
    $('#modalloading').modal('show');
    var valID = getIDstosubmit();
    var obj = {
        ValuationID: valID,
        EmailID: $("#txtsenderEmail").val(),
        EmailContent: $("#txtemailContent").val(),
        EmailSubject: $("#txtsubjectEmail").val()
    }
    var EmailString = JSON.stringify(obj);

    $.ajax({
        type: "POST",
        url: "PreviewPage.aspx/SendEmail",
        data: EmailString,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var json_obj = $.parseJSON(response.d);
            if (response.d == "0") {
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'small',
                        message: '<p class="text-center mb-0"><i class="fa fa-frown-o fa-lg"></i> Failed!</p>'
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                   // bootbox.alert("Failed!");
                });
            }
            else if (response.d == "1") {
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Email Sent Successfully...</p>',
                        buttons: {
                            success: {
                                label: "OK",
                                callback: redirectmee
                            }
                        }
                    });
                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
            $('#modalloading').modal('hide');
        },
    });
}

function Redirect2EmailPage() {

    window.location.href = "sendEmail.aspx";
}

function Queue2EmailPage(ValID) {
    window.location.href = "sendEmail.aspx?ValuationID=" + ValID;
}

function fnenblEmailfields() {

    $("#txtsenderEmail").attr("disabled", false);
    $("#txtemailContent").attr("disabled", false);
    $("#txtsubjectEmail").attr("disabled", false);

}


function fnregredirect(seluser, pagename, mainlist) {
    localStorage.setItem("userreg", "1");
    localStorage.setItem("pagename", pagename);
    localStorage.setItem("mainlist", mainlist);
    //alert(window.location.href.toString().includes("login.aspx"))
    if (window.location.href.toString().includes("login.aspx")) {
        window.location.href = "ValuRite/register.aspx?ddlusrtype=" + seluser;
    }
    else {
        window.location.href = "register.aspx?ddlusrtype=" + seluser;
    }

}

//session for forgotpassword
function setsessionForgetpaswd(forgotpss, newUserReg) {
    var obj = {
        forpass: forgotpss,
        newReg: newUserReg
    }
    var jsonstring = JSON.stringify(obj);
    $.ajax({
        type: "POST",
        url: "login.aspx/forgtSession",
        data: jsonstring,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (forgotpss == 'true') {
                window.location.href = "ForgotPassword.aspx";
            }
            else if (newUserReg == 'true') {
                console.log("New User");
                fnregredirect("Appraiser", "test3", "list_usrcont");
                //window.location.href = "ValuRite/register.aspx";
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.responseText)
            //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });

}

function fnchkduphighlight() {
    var pagname = localStorage.getItem('pagename');
    var mainlist = localStorage.getItem('mainlist');

    $("#" + pagname).removeClass("highlight");
    if (mainlist != "" && mainlist != null) {
        $("#" + mainlist).removeClass("in");
    }
}

function fngetAppraiserList() {
    $.ajax({
        async: true,
        type: "POST",
        url: "Subscription.aspx/GetAppraiserList",
        data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.d != 0) {


            }
            else {


            }
            var jsonstring = JSON.stringify(response.d);
            // alert(jsonstring);


            //$("#ddlselectSubscription")

        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            // alert(XMLHttpRequest.responseText)
            //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        }
    });
}





