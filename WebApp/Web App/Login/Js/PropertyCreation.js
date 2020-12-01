//Load Country values
var selcountry = "<option value='none'>Select Country</option>";
var selstate = "<option value='none'>Select State</option>";
var selcity = "<option value='none'>Select City</option>";
var url = window.location.pathname;
var myPageName;   //= url.substring(url.lastIndexOf('/') + 1);
var ddcountryID;
var ddstateID;
var ddcityID;//var Addressparam;
var Addressdet;

function setdropdownIDs() {

    myPageName = url.substring(url.lastIndexOf('/') + 1);

    if (myPageName == 'Appraisalpage.aspx') {
        ddcountryID = 'ddlpropcountry';
        ddstateID = 'ddlpropstate';
        ddcityID = 'ddlpropcity';
    }
    else if (myPageName == 'landingpage.aspx') {
        ddcountryID = 'ddlloccountry';
        ddstateID = 'ddllocstate';
        ddcityID = 'ddlloccity';
    }
    else if (myPageName == 'register.aspx') {
        ddcountryID = 'ddlcountry';
        ddstateID = 'ddlstate';
        ddcityID = 'ddlcity';
    }

}

function GetCountry() {

    setdropdownIDs();
    var webmethod = "Appraisalpage.aspx/GetCountry";

    $('#' + ddcountryID).empty();
    $('#' + ddcountryID).append(selcountry);
    $('#' + ddstateID).append(selstate);
    $('#' + ddcityID).append(selcity);

    $.ajax({
        type: "POST",
        url: webmethod,
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var jsonObj = JSON.parse(response.d);
            Addressdet = jsonObj;
            for (var i in jsonObj) {
                if (jsonObj[i].ParamName == "Country") {
                    var option = "<option value=" + jsonObj[i].ParamValue + ">" + jsonObj[i].ParamValue + "</option>";
                    $('#' + ddcountryID).append(option);
                }
            }
            $('#' + ddcountryID).val("India");
            GetState("India");
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });

}


function GetState(seleccount, codeadd) {
     setdropdownIDs();

    $('#' + ddstateID).empty();
    $('#' + ddcityID).empty();
    $('#' + ddstateID).append(selstate);
    $('#' + ddcityID).append(selcity);

    var parent = "";
    var country = seleccount;

    for (var i in Addressdet) {
        if (Addressdet[i].ParamValue == country) {
            parent = Addressdet[i].ParamID;
        }
    }

    for (var j in Addressdet) {
        if (Addressdet[j].ParentParamID == parent) {
            var option = "<option value='" + Addressdet[j].ParamValue + "'>" + Addressdet[j].ParamValue + "</option>";
            $('#' + ddstateID).append(option);
        }
    }

    /*if (codeadd == 1) {
        //codeAddress(seleccount);
    }*/

}

function Getcity(selecstat, codeadd) {

    setdropdownIDs();

    $('#' + ddcityID).empty();
    $('#' + ddcityID).append(selcity);

    var state = selecstat;
    var parent = "";

    for (var i in Addressdet) {
        if (Addressdet[i].ParamValue == state) {
            parent = Addressdet[i].ParamID;
        }
    }

    for (var j in Addressdet) {
        if (Addressdet[j].ParentParamID == parent) {
            var option = "<option value=" + Addressdet[j].ParamValue + ">" + Addressdet[j].ParamValue + "</option>";
            $('#' + ddcityID).append(option);
        }
    }

    /*if (codeadd == 1) {
        //codeAddress(selecstat + " " + $('#' + ddcountryID).val());
    }*/

    $('#modalloading').modal('hide');
}

function fnproptysave(propdet) {

    $.ajax({
        type: "POST",
        url: "Appraisalpage.aspx/Propertysave",
        data: propdet,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            jsonObj = JSON.parse(response.d);
            if (jsonObj.Propertystatus != "1" && response.d != "1") {
                bootbox.dialog({
                    closeButton: true,
                    size: 'small',
                    message: '<p class="text-center mb-0"><i class="fa fa-frown-o fa-lg"></i> Failed to Save Property!</p>'
                });
                setTimeout(function () {
                    bootbox.hideAll();
                }, 2500);
                //bootbox.alert("Failed to save Property");
                $('#modalloading').modal('hide');
            }
            else {
                var msg, cllbck;
                if (response.d == "1") {
                    msg = '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Property Saved Successfully ...</p>';
                    $(function () {
                        //bootbox.dialog({
                        //    closeButton: true,
                        //    message: msg,
                        //    buttons:
                        //        {
                        //            success:
                        //                {
                        //                    label: "OK"
                        //                }
                        //        }
                        //});
                        bootbox.dialog({
                            closeButton: true,
                            size: 'medium',
                            message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Property Saved Successfully...</p>',
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 2500);
                    });

                    $('#modalloading').modal('hide');
                }
                else {
                    $("#btnpropsave").attr("disabled", false)
                    msg = "<div style='font-weight:bold'><i class='fa fa-check-square-o fa-lg'></i>Property Saved Successfully <br /> Property ID : " + jsonObj.PropertyID + "</div>";

                    $(function () {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'medium',
                            message: msg,
                            buttons: {
                                success: {
                                    label: "OK",
                                    callback: fnpropclear,
                                    //callback: fnalert,//Property Add Button Functionality
                                }
                            }
                        });
                    });

                    $('#modalloading').modal('hide');
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert("Request1212: " + XMLHttpRequest.status + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
            $('#modalloading').modal('hide');
        },
    });
}


