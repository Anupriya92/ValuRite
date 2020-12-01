
function fnGetAppraisallen(id, stat) {
    if (stat != "Assigned" && stat != "InProgress" && stat != "Completed" && stat != "Submitted to Approver" && stat != "Approved By Approver" && stat != "Rejected By Approver") {
        $('#divchart').hide();
        $('#divappdetailsContent').show();
        var AppraiserID = id;
        var obj = {
            AppraiserID: AppraiserID,
            AppStatus: stat
        }
        var ID = JSON.stringify(obj);
        $.ajax({
            type: "POST",
            url: "ApplicationQueue.aspx/GetAppraisalDet",
            data: ID,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                var servAddr = getservAdress();
                var FolderPath = getfoldrPath();
                $('#modalloading').modal('hide');
                var und;
                if (response.d[0].ValuationID != und) {

                    for (var i = 0; i < response.d.length; i++) {
                        var imgurl = "";
                        var curproptype = response.d[i].PropertyType;
                        if (curproptype == "Land") {
                            imgurl = "http://localhost" + "/" + "Data" + "/land.png"
                           
                        }
                        else if (curproptype == "Apartment") {
                            imgurl = "http://localhost" + "/" + "Data" + "/apartment.png"
                           
                        }
                        else if (curproptype == "Building") {
                            imgurl = "http://localhost" + "/" + "Data" + "/building.png"
                           
                        }
                        var valuation_id = response.d[i].ValuationID
                        valuation_id = (valuation_id.indexOf('-') != -1) ? valuation_id.split('-')[1] : valuation_id;

                        var AppStatus = '<input type=text class=tblinput/>';
                        $("#tblAppqueue").append('<tr id="' + response.d[i].ValuationID + '"><td><a  onclick="fnredirect(\'' + response.d[i].ValuationID + '\',' + response.d[i].PropertyID + ',\'' + response.d[i].BorrowerID + '\',\'' + response.d[i].BorrowerName + '\',\'' + response.d[i].LenderID + '\',\'' + response.d[i].PropertyType + '\')" disabled="disabled">' + valuation_id + "</a> </td>"
                        + "<td align=center><img class=img-responsive src='" + imgurl + "' alt=noImage style='height: 5%;'/></td>"
                       // + "<td align=center><img class=img-responsive src='" + imgurl + "' alt=noImage '/></td>"
                        + "<td>" + response.d[i].Address + "</td>"
                        + "<td>" + AppStatus + "</td>"
                        + "<td>" + response.d[i].AssignDate.split('T')[0] + "</td>"
                        + "<td>" + response.d[i].AppraiserName + "</td>"
                        + "<td style='text-align:center'><a href='PreviewPage.aspx?ValID=" + response.d[i].ValuationID + "' target='_blank' style='cursor: pointer; text-decoration: underline;'><i class='fa fa-file-pdf-o'></i></td>"
                        + "<td style='text-align:center;'><a style='cursor: pointer; text-decoration: underline;'><i class='fa fa-print' onclick=fnPDFprint('" + response.d[i].ValuationID + "')></i></td>"
                        + "</tr>");


                        $('tr[id=' + response.d[i].ValuationID + ']').find("td:eq(0)").find("a").css('cursor', 'pointer');

                        $('tr[id="' + response.d[i].ValuationID + '"]').find("td:eq(3)").find('input').val(response.d[i].AppraisalStatus).attr("disabled", true);
                        $('tr[id="' + response.d[i].ValuationID + '"]').find("td:eq(3)").find('input').addClass('form-control');
                        $('tr[id=' + response.d[i].ValuationID + ']').find("td:eq(0)").find("a").css('text-decoration', 'underline');

                    }
                    $('#tblAppqueue').DataTable({
                        columns: [
                        { title: "Valuation ID" },
                        { title: "Property Type" },
                        { title: "Address" },
                        { title: "Status"  },
                        { title: "Assigned on" },
                        { title: "Appraiser" },
                        { title: "PDF" },
                        { title: "Print" }]
                    });
                    if ($('.paginate_button').size() > 3) {
                        $('#tblAppqueue_paginate')[0].style.display = "block";
                    }
                    else if ($('.paginate_button').size() == 3) {
                        $('#tblAppqueue_paginate')[0].style.display = "none";
                    }
                }
                else {
                    $(function () {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'small',
                            message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> No Records found!</p>',

                            buttons: {
                                success: {
                                    label: "OK",
                                    callback: fndummy
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
}


function fndummy() {
    window.location.href = "Assignappraiser.aspx"
}

//Pie Chart for Lender  
function fnloadpiechartLend(UserDetails) {
    $('#modalloading').modal('show');
    var appstatus = {
        Approved: 0,
        Submitted: 0,
        Rejected: 0,
        Assigned: 0,
        InProgress: 0,
        Completed: 0,
        Submitted_to_Approver: 0,
        Approved_By_Approver: 0,
        Rejected_By_Approver: 0,
        Total: 0
    }

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "ApplicationQueue.aspx/GetChartOverview",
        data: UserDetails,
        dataType: "json",

        success: function (data) {
            $('#modalloading').modal('hide');
            for (var i = 0; i < data.d.length; i++) {
                if (data.d[i].AppraisalStatus == "Submitted") {
                    appstatus.Submitted++;
                }
                else if (data.d[i].AppraisalStatus == "Approved") {
                    appstatus.Approved++;
                }
                else if (data.d[i].AppraisalStatus == "Rejected") {
                    appstatus.Rejected++;
                }
                else if (data.d[i].AppraisalStatus == "Assigned") {
                    appstatus.Assigned++;
                }
                else if (data.d[i].AppraisalStatus == "InProgress") {
                    appstatus.InProgress++;
                }
                else if (data.d[i].AppraisalStatus == "Completed") {
                    appstatus.Completed++;
                }
                else if (data.d[i].AppraisalStatus == "Submitted to Approver") {
                    appstatus.Submitted_to_Approver++;
                }
                else if (data.d[i].AppraisalStatus == "Approved By Approver") {
                    appstatus.Approved_By_Approver++;
                }
                else if (data.d[i].AppraisalStatus == "Rejected By Approver") {
                    // alert(data.d[i].AppraisalStatus)
                    appstatus.Rejected_By_Approver++;
                }
            }

            appstatus.Total = data.d.length - appstatus.Approved;
            //alert(appstatus.Total + "Total" + data.d.length+"Overall")
            AppraisalStatusQ = JSON.stringify(appstatus);
            fndrawpie(AppraisalStatusQ)
            
        },
        error: function (result) {
            $('#modalloading').modal('hide');
            $(function () {
                bootbox.dialog({
                    closeButton: true,
                    size: 'medium',
                    message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> No Valuation Record in Your Queue...</p>',
                  //  buttons: {
                   //     success: {
                   //         label: "OK"
                   //     }
                   // }
                });
                setTimeout(function () {
                    bootbox.hideAll();
                }, 2500);
            });
        }
    });
}

//Appraiser Queue
function fnloadappdetails(selectedStatus) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "ApplicationQueue.aspx/GetAppraisalDetails",
        data: selectedStatus,
        dataType: "json",
        success: function (data) {
            var servAddr = getservAdress();
            var FolderPath = getfoldrPath();
            var und;
            if (data.d[0].ValuationID != und) {
                for (var i = 0; i < data.d.length; i++) {
                    var ValueID = String(data.d[i].ValuationID);
                    var assignedon = data.d[i].AssignDate.split('T');
                    var curproptype = data.d[i].PropertyType;

                    if (curproptype == "Land") {
                        imgurl = "http://localhost" + "/" + "Data" + "/land.png"
                    }
                    else if (curproptype == "Apartment") {
                        imgurl = "http://localhost" + "/" + "Data" + "/apartment.png"
                       
                    }
                    else if (curproptype == "Building") {
                        imgurl = "http://localhost" + "/" + "Data" + "/building.png"
                       
                    }

                    var valuation_id = data.d[i].ValuationID
                    valuation_id = (valuation_id.indexOf('-') != -1) ? valuation_id.split('-')[1] : valuation_id;

                    var appraisalstatus = data.d[i].AppraisalStatus;                    
                    var AppStatus = '<select id ="ddlAppStatus" class=form-control ddlsize onchange="fnupdatestatus(this.value,\'' + data.d[i].ValuationID + '\',event)"><option value="Assigned">Assigned</option ><option value="InProgress">InProgress</option ><option value="Completed">Completed</option ><option value="Rejected">Rejected</option ><option value="Submitted to Approver">Submitted to Approver</option ><option value="Approved By Approver">Approved By Approver</option ><option value="Rejected By Approver">Rejected By Approver</option ><option value="Submitted">Submitted</option ></select>';
                    $("#tblAppqueue").append('<tr id="' + data.d[i].ValuationID + '"><td class=tdalign><a class="notactive" onclick="fnredirect(\'' + ValueID + '\',' + data.d[i].PropertyID + ',\'' + data.d[i].BorrowerID + '\',\'' + data.d[i].BorrowerName + '\',\'' + data.d[i].LenderID + '\',\'' + data.d[i].PropertyType + '\')">' + valuation_id + '</a> </td>'
                    + "<td align=center class=tdalignimg><img class=img-responsive src='" + imgurl + "' alt=noImage/></td>"
                    + "<td class=tdalign>" + data.d[i].Address + "</td>"
                    + "<td class=tdalignstat>" + AppStatus + "</td>"
                    + "<td class=tdalignstat>" + assignedon[0] + "</td>"
                    + "<td style='text-align:center;'class=tdalignpdf><a href='PreviewPage.aspx?ValID=" + data.d[i].ValuationID + "' target='_blank' style='cursor: pointer; text-decoration: underline;'><i class='fa fa-file-pdf-o'></i></td>"
                    + "<td style='text-align:center;'class=tdalignpdf><a><i class='fa fa-envelope' onclick=Queue2EmailPage('" + data.d[i].ValuationID + "')></i></td>"
                    + "<td style='text-align:center;'class=tdalignpdf><a style='cursor: pointer; text-decoration: underline;'><i class='fa fa-print' onclick=fnPDFprint('" + data.d[i].ValuationID + "')></i></td>"
                    + "</tr>");

                    //</i>

                    //Default value in Dropdown
                    $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(3)").find('select option[value="' + data.d[i].AppraisalStatus + '"]').attr("selected", true);

                    //Link enable/disable on Dropdown load
                    if (data.d[i].AppraisalStatus == "Assigned") {
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(3)").find('select option[value="InProgress"]').attr("disabled", false);
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(3)").find('select option[value="Completed"]').attr("disabled", true);
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(3)").find('select option[value="Submitted"]').attr("disabled", true);
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(3)").find('select option[value="Submitted to Approver"]').attr("disabled", true);
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(3)").find('select option[value="Rejected By Approver"]').attr("disabled", true);
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(3)").find('select option[value="Approved By Approver"]').attr("disabled", true);
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(3)").find('select option[value="Rejected"]').attr("disabled", true);
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(5)").find('a').addClass("notactive").attr("href", "");
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(6)").find('a').addClass("notactive");
                    }
                    if (data.d[i].AppraisalStatus == "InProgress") {
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(3)").find('select').attr("disabled", true);
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(3)").find('select option[value="Assigned"]').attr("disabled", true);
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(3)").find('select option[value="Completed"]').attr("disabled", true);
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(3)").find('select option[value="Submitted"]').attr("disabled", true);
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(3)").find('select option[value="Rejected"]').attr("disabled", true);
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(0)").find("a").removeClass("notactive")
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(0)").find("a").css('cursor', 'pointer');
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(0)").find("a").css('text-decoration', 'underline');
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(5)").find('a').addClass("notactive").attr("href", "");
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(6)").find('a').addClass("notactive");
                    }
                    if (data.d[i].AppraisalStatus == "Completed") {
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(3)").find('select').attr("disabled", true);
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(3)").find('select option[value="Assigned"]').attr("disabled", true);
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(3)").find('select option[value="InProgress"]').attr("disabled", true);
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(3)").find('select option[value="Submitted"]').attr("disabled", true);
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(3)").find('select option[value="Rejected"]').attr("disabled", true);
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(0)").find("a").removeClass("notactive")
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(0)").find("a").css('cursor', 'pointer');
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(0)").find("a").css('text-decoration', 'underline');
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(6)").find('a').addClass("notactive");
                    }
                    if (data.d[i].AppraisalStatus == "Rejected") {
                        //alert("Completed")
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(3)").find('select').attr("disabled", true);
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(0)").find("a").removeClass("notactive")
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(0)").find("a").css('cursor', 'pointer');
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(0)").find("a").css('text-decoration', 'underline');
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(6)").find('a').addClass("notactive");
                    }
                    if (data.d[i].AppraisalStatus == "Submitted") {
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(3)").find('select').attr("disabled", true);
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(0)").find("a").removeClass("notactive")
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(0)").find("a").css('cursor', 'pointer');
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(0)").find("a").css('text-decoration', 'underline');
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(6)").find("a").css('cursor', 'pointer');
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(6)").find("a").css('text-decoration', 'underline');
                    }
                    if (data.d[i].AppraisalStatus == "Submitted to Approver") {
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(3)").find('select').attr("disabled", true);
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(0)").find("a").removeClass("notactive")
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(0)").find("a").css('cursor', 'pointer');
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(0)").find("a").css('text-decoration', 'underline');
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(6)").find("a").css('cursor', 'pointer');
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(6)").find("a").css('text-decoration', 'underline');
                    }
                    if (data.d[i].AppraisalStatus == "Rejected By Approver") {
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(3)").find('select').attr("disabled", true);
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(0)").find("a").removeClass("notactive")
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(0)").find("a").css('cursor', 'pointer');
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(0)").find("a").css('text-decoration', 'underline');
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(6)").find('a').addClass("notactive");

                    }
                    if (data.d[i].AppraisalStatus == "Approved By Approver") {
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(3)").find('select').attr("disabled", true);
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(0)").find("a").removeClass("notactive")
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(0)").find("a").css('cursor', 'pointer');
                        $('tr[id=' + data.d[i].ValuationID + ']').find("td:eq(0)").find("a").css('text-decoration', 'underline');

                    }
                } 
               
                var table = $('#tblAppqueue').DataTable({
                    columns: [
                    { title: "Valuation ID" },
                    { title: "Property Type" },
                    { title: "Address" },
                    { title: "Status" },
                    { title: "Assigned on" },
                    { title: "PDF" },
                    { title: "Email" },
                    { title: "Print" }]
                });

                if (appraisalstatus != "Submitted") {
                    var pdfcolumn = table.column('5');
                    pdfcolumn.visible(false);

                    var emailcolumn = table.column('6');
                    emailcolumn.visible(false);

                    var printcolumn = table.column('7');
                    printcolumn.visible(false);
                }

                //var userType=

                if (appraisalstatus == "Completed") {

                    var pdfcolumn = table.column('5');
                    pdfcolumn.visible(true);

                    var emailcolumn = table.column('6');
                    emailcolumn.visible(false);

                    var printcolumn = table.column('7');
                    printcolumn.visible(true);
                }


                if ($('.paginate_button').size() > 3) {
                    $('#tblAppqueue_paginate')[0].style.display = "block";
                }
                else if ($('.paginate_button').size() == 3) {
                    $('#tblAppqueue_paginate')[0].style.display = "none";
                }
            }
            else {
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> No Valuation Record Assigned to You...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                  //  bootbox.dialog({
                      //  closeButton: false,
                      //  message: "<span style=font-weight:bolder>No valuation record assigned to you!</span>!",
                        //buttons: {
                        //    success: {
                        //        label: "OK"
                        //    }
                        //}
                  //  });
                });
            }
            $('#modalloading').modal('hide');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#modalloading').modal('hide');
            if (XMLHttpRequest.status == "401") {
                sessionout();
            }
            else {
                bootbox.alert(XMLHttpRequest.responseText + "Error in Load Application Details - fnloadappdetails");
            }
        }

    });
}

function fnupdatestatus(data, j, eve) {
    debugger;
    if (data == "Completed" || data == "InProgress") {
        $('tr[id=' + j + ']').find("td:eq(0)").find("a").removeClass("notactive")
        $('tr[id=' + j + ']').find("td:eq(0)").find("a").css('cursor', 'pointer');
        $('tr[id=' + j + ']').find("td:eq(0)").find("a").css('text-decoration', 'underline');
        if (data == "InProgress") {
            $('tr[id=' + j + ']').find("td:eq(3)").find('select option[value="Assigned"]').attr("disabled", true);
            $('tr[id=' + j + ']').find("td:eq(3)").find('select option[value="Completed"]').attr("disabled", true);
        }
        else {
            $('tr[id=' + j + ']').find("td:eq(3)").find('select option[value="Assigned"]').attr("disabled", true);
            $('tr[id=' + j + ']').find("td:eq(3)").find('select option[value="InProgress"]').attr("disabled", true);
        }
        var obj = {
            AppraisalStatus: data,
            ValuationID: j
        }
        var jsonupdate = JSON.stringify(obj);
        $.ajax({
            type: "POST",
            url: "ApplicationQueue.aspx/UpdateStatus",
            data: jsonupdate,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                jsonObj = JSON.parse(response.d);
                if (response.d == "1") {
                    //do nothing
                }
                else {
                    $(function () {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'small',
                            message: '<p class="text-center mb-0"><i class="fa fa-frown-o fa-lg"></i> Status Updation Failed!</p>'
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 1500);
                        //bootbox.alert("Status Updation Failed");
                    });
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
            },
        });
    }
}

function fnredirect(ValID, PropID, Borr, BorrName, lenderID, propType) { //added lenderid and property type 
    window.location.href = "landingpage.aspx?valuationID=" + ValID + "&propertyId=" + PropID + "&BorrID=" + Borr + "&BorrName=" + BorrName + "&lenderid=" + lenderID + "&PropertyType=" + propType;
}


function fnPDFprint(valid) {

    $("#testFrame").attr('src', 'PreviewPage.aspx?ValID=' + valid)
    // $("#testFrame").attr('src', 'PreviewPage.aspx?ValID=' + valid)


    setTimeout(function () {
        $("#testFrame").get(0).contentWindow.print();
    }, 300)


}
