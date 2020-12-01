//Load Property Details in the Property Dropdown - Assign Appraiser Page
function fnloadval() {
    var $elem;
    $.ajax({
        type: "POST",
        url: "AssignAppraiser.aspx/GetValuation",
        data: "",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var jsonObj = [];
            jsonObj = JSON.parse(response.d);
            var i = 0;
            try {
                $('#ddlvaluationID').empty()
                $elem = $("#ddlvaluationID").clone()
                $('#ddlvaluationID').remove()
                $('#myddlvaluationID').remove()
                $elem.appendTo("#divpropertyinfo")
                var option = '<option value="none">Select Property</option>';
                $elem.append(option);
            }
            catch (exp) {
                alert(exp)
            }
            if (response.d != "0") {
                $(jsonObj).each(function () {
                    var strtitle = "Property Type : " + this.PropertyType + "<br />";
                    strtitle += "Property Location : " + this.Location + "<br />";
                    if (this.ProjectSiteName != "") {
                        strtitle += "ProjectSiteName : " + this.ProjectSiteName + "<br />";
                    }
                    strtitle += "Country / State / City : " + this.Address.Country + " \/ " + this.Address.State + " \/ " + this.Address.City + "<br />";
                    strtitle += "DoorNo : " + this.Address.DoorNumber + "<br />";
                    strtitle += "StreetName : " + this.Address.StreetName + "<br />";
                    strtitle += "Area : " + this.Address.AddArea + "<br />";
                    strtitle += "Landmark : " + this.Address.Landmark + "<br />";
                    strtitle += "Pincode : " + this.Address.Pincode + "<br />";

                    var option = '<option title="' + strtitle + '" value=' + this.PropertyID + '>' + this.Address.StreetName + ' | ' + this.Address.AddArea + '</option>';
                    $elem.append(option);
                });
            }
            else if (response.d == "") {
                fnloadval()
            }
            else {
                var option = $('<option />');
                option.attr('value', "-No Property Found-").text("-No Property Found-");
                $elem.append(option);
            }
            $elem.addClass('custom-select')
            $elem.customselect({
            });
            fncpyattr('ddlvaluationID');
            $('#modalloading').modal('hide');
            //$("#myddlvaluationID.custom-select").find('a').attr("onclick", "loadpropclick()");
            
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            errorhandling(XMLHttpRequest, textStatus, errorThrown)
        },
    });
}


function fnApprovervaluation(userdet) {
    $.ajax({
        type: "POST",
        url: "AssignAppraiser.aspx/GetApproverRecords",
        data: userdet,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.d != "0") {
                var jsonObj = [];
                jsonObj = JSON.parse(response.d);
                loadrejPropertylist(jsonObj);
            }
            else {
                $('#ddlvaluationID').empty()

                $elem = $("#ddlvaluationID").clone()

                $('#ddlvaluationID').remove()
                $('#myddlvaluationID').remove()

                $elem.appendTo("#divpropertyinfo")
                var option = '<option value="none">Select Property</option>';
                $elem.append(option);

                option = $('<option />');
                option.attr('value', "-No Property Found-").text("-No Property Found-").attr('title', "-No Property Found-");
                $elem.append(option);

                $elem.addClass('custom-select')
                $elem.customselect({});

                fncpyattr('ddlvaluationID');
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            errorhandling(XMLHttpRequest, textStatus, errorThrown)
        },
    });


}

function errorhandling(xmlre1, txtstatus, errorthrown) {
    if (xmlre1.status == "401") {
        alert("Session Out, Please login in to Continue");
    }
    else {
        //alert(xmlre1.status + "Status Code");
    }
}

function fngetRejvallist(rejstatus) {
    $.ajax({
        type: "POST",
        url: "AssignAppraiser.aspx/GetRejValuationList",
        data: rejstatus,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.d != "0") {
                var jsonObj = [];
                jsonObj = JSON.parse(response.d);
                loadrejPropertylist(jsonObj);
            }
            else {
                $('#ddlvaluationID').empty()

                $elem = $("#ddlvaluationID").clone()

                $('#ddlvaluationID').remove()
                $('#myddlvaluationID').remove()

                $elem.appendTo("#divpropertyinfo")
                var option = '<option value="none">Select Property</option>';
                $elem.append(option);

                option = $('<option />');
                option.attr('value', "-No Property Found-").text("-No Property Found-").attr('title', "-No Property Found-");
                $elem.append(option);

                $elem.addClass('custom-select')
                $elem.customselect({});

                fncpyattr('ddlvaluationID');
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            errorhandling(XMLHttpRequest, textStatus, errorThrown)
        },
    });
}

function loadrejPropertylist(obj) {    
    var RejProp = {
        propid: obj.propID
    }
    var getrejproplist = JSON.stringify(RejProp);
    fngetrejprop(getrejproplist, obj);
}

function fngetrejprop(objarr, rejvaldet) {
    var $elem;
    $.ajax({
        type: "POST",
        url: "AssignAppraiser.aspx/GetRejApp",
        data: objarr,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var jsonObj = [];
            jsonObj = JSON.parse(response.d);
            try {
                $('#ddlvaluationID').empty()
                $elem = $("#ddlvaluationID").clone()
                $('#ddlvaluationID').remove()
                $('#myddlvaluationID').remove()
                $elem.appendTo("#divpropertyinfo")
                var option = '<option value="none">Select Property</option>';
                $elem.append(option);
            }
            catch (exp) {
                alert(exp)
            }
            var i = 0;
            if (response.d != "0") {
                for (i = 0; i < rejvaldet.propID.length; i++) {
                    $(jsonObj).each(function () {
                        var valuation_id = "";
                        var splitvalid = rejvaldet.valID[i];
                        splitvalid = splitvalid.split('-');
                        if (splitvalid.length == 2) {
                            valuation_id = splitvalid[1];
                        }
                        else {
                            valuation_id = rejvaldet.valID[i]
                        }
                        var dropvalue = "";
                        if (this.PropertyID == rejvaldet.propID[i]) {
                            var strtitle = "Property Type : " + this.PropertyType + "<br />";
                            strtitle += "Property Location : " + this.Location + "<br />";
                            strtitle += "ProjectSiteName : " + this.ProjectSiteName + "<br />";
                            strtitle += "StreetName : " + this.Address.StreetName + "<br />";
                            strtitle += "DoorNo : " + this.Address.DoorNumber + "<br />";
                            strtitle += "Landmark : " + this.Address.Landmark + "<br />";
                            strtitle += "Area : " + this.Address.AddArea + "<br />";
                            strtitle += "Country / State / City : " + this.Address.Country + " \/ " + this.Address.State + " \/ " + this.Address.City + "<br />";
                            strtitle += "Pincode : " + this.Address.Pincode + "<br />";
                            strtitle += "Valuation ID : " + valuation_id + "<br />";
                            strtitle += "Property ID : " + rejvaldet.propID[i] + "<br />";
                            strtitle += "Borrower ID : " + rejvaldet.BrwrID[i] + "<br />";
                            if (getusertyyype() == "Lender") {
                                strtitle += "Appraiser ID : " + rejvaldet.AppID[i] + "<br />";
                                dropvalue += rejvaldet.valID[i] + "," + rejvaldet.BrwrID[i] + "," + rejvaldet.propID[i] + "," + rejvaldet.AppID[i];
                            }
                            else {
                                dropvalue += rejvaldet.valID[i];
                            }
                            var option = '<option title="' + strtitle + '" value=' + dropvalue + '>' + this.Address.StreetName + ' | ' + this.Address.AddArea + '</option>';
                            $elem.append(option);
                        }
                    });
                }
            }
            else {
                var option = $('<option />');
                option.attr('value', "-No Property Found-").text("-No Property Found-").attr('title', '-No Property found-');
                $elem.append(option);
            }
            $elem.addClass('custom-select')
            $elem.customselect({
            });
            fncpyattr('ddlvaluationID');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            errorhandling(XMLHttpRequest, textStatus, errorThrown)
        }
    })
}

function fnassignappraiser(str) {
    $.ajax({
        type: "POST",
        url: "AssignAppraiser.aspx/CreateAppraisal",
        data: str,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            //debugger;
            jsonObj = JSON.parse(response.d);            
            if (jsonObj.AssignedStatus == "0" || response.d == "0") {               
                //$(function () {                
                bootbox.dialog({
                    closeButton: false,
                    message: "<div style='font-weight:bold'><i class='fa fa-check-square-o fa-lg'></i>Property ID Already Assigned to the Appraiser! <br /> <br /> Valuation ID : " + jsonObj.ValuationID + "</div>",
                    buttons: {
                        success: {
                            label: "OK",
                            callback: resetcustomdrop
                        }
                    }
                });
            
                   // bootbox.dialog({
                    //    closeButton: false,
                    //    message: "<div style='font-weight:bold'><i class='fa fa-check-square-o fa-lg'></i>Property ID Already Assigned to the Appraiser! <br /> <br /> Valuation ID : " + jsonObj.ValuationID + "</div>",
                    //    buttons: {
                    //        success: {
                     //           label: "OK",
                      //          callback: resetcustomdrop
                        //    }
                      //  }
                    //});
                //});
            }
            else {
                var obj = $('#chkshowrejlist');
                fnloadproplist($(obj).get(0));

               // $(function () {
                    bootbox.dialog({
                        closeButton: false,
                        message: "<div style='font-weight:bold'><i class='fa fa-check-square-o fa-lg'></i>Appraiser Assigned successfully! <br /> Valuation ID : " + jsonObj.ValuationID + "</div>",
                        buttons: {
                            success: {
                                label: "OK",
                                callback: resetcustomdrop
                            }
                        }
                    });
              //  });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            errorhandling(XMLHttpRequest, textStatus, errorThrown)
        },
    });
}

function fncreateAppr(str) {
    $.ajax({
        type: "POST",
        url: "AssignAppraiser.aspx/CreateAppr",
        data: str,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            jsonObj = JSON.parse(response.d);
            if (response.d == "0") {
                $(function () {
                    bootbox.dialog({
                        closeButton: false,
                        message: "<div style='font-weight:bold'><i class='fa fa-frown-o fa-lg'></i>Failed to Assign the Appraiser! Try Again <br /> <br /> ValuationID : " + jsonObj.ValuationID +  "</div>",
                        buttons: {
                            success: {
                                label: "OK",
                                callback: resetcustomdrop
                            }
                        }
                    });
                });
            }
            else {
                var obj = $('#chkshowrejlist');
                fnloadproplist($(obj).get(0));

                $(function () {
                    bootbox.dialog({
                        closeButton: false,
                        message: "<div style='font-weight:bold'><i class='fa fa-check-square-o fa-lg'></i>Appraiser Assigned successfully! <br /> <br /> ValuationID : " + jsonObj.ValuationID + "</div>",
                        buttons: {
                            success: {
                                label: "OK",
                                callback: resetcustomdrop
                            }
                        }
                    });
                });

            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            errorhandling(XMLHttpRequest, textStatus, errorThrown)
        },
    });
}

//reset searchable custom select dropdowns
function resetcustomdrop() {
    //debugger;
    //Reset Borrower Dropdown
    var $ddlbor;
    $ddlbor = $("#ddlborrowerlist").clone()
    $('#ddlborrowerlist').remove()
    $('#myddlborrowerlist').remove()
    $ddlbor.addClass('custom-select')
    $ddlbor.appendTo("#divborrowerinfo")
    $ddlbor.customselect({
    });
    fncpyattr('ddlborrowerlist');

    //Reset Property Dropdown
    var $ddlprop;
    $ddlprop = $("#ddlvaluationID").clone()
    $('#ddlvaluationID').remove()
    $('#myddlvaluationID').remove()
    $ddlprop.addClass('custom-select')
    $ddlprop.appendTo("#divpropertyinfo")
    $ddlprop.customselect({
    });
    fncpyattr('ddlvaluationID');

    //Reset Appraiser Dropdown
    var $ddlappr;
    $ddlappr = $("#ddlAppraiserlist").clone()
    $('#ddlAppraiserlist').remove()
    $('#myddlAppraiserlist').remove()
    $ddlappr.addClass('custom-select')
    $ddlappr.appendTo("#divappraiserinfo")
    $ddlappr.customselect({
    });
    fncpyattr('ddlAppraiserlist');

    //Reset checkbox and load default property values
    $("#chkshowrejlist").attr('checked', false)
    var obj = $('#chkshowrejlist');
    fnloadproplist($(obj).get(0));


    //Reset Lender Dropdown
    var $ddllender;
    $ddllender = $("#ddllenderlist").clone()
    $('#ddllenderlist').remove()
    $('#myddllenderlist').remove()
    $ddllender.addClass('custom-select')
    $ddllender.appendTo("#divlenderinfo")
    $ddllender.customselect({
    });
    fncpyattr('ddllenderlist');

    //Reset Reference ID
    $("#refidtxtbox").val(''); //Added by Anupriya

    //Reset checkbox and load default property values
    $("#chkshowrejlist").attr('checked', false)
    var obj = $('#chkshowrejlist');
    fnloadproplist($(obj).get(0));
}

