function onlyAlphabets(e, t) {
    try {
        if (window.event) {
            var charCode = window.event.keyCode;
        }
        else if (e) {
            var charCode = e.which;
        }
        else { return true; }
        if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123))
            return true;
        else
            return false;
    }
    catch (err) {
        alert(err.Description);
    }
}
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 46 && charCode > 31
            && (charCode < 48 || charCode > 57)) {
        return false;
    }
    else {
        return true;
    }
}

//Accordion Toggle
function toggleChevronOnload() {
    try {
        $('.accordionShoHide').each(function () {
            $(this).on('hidden.bs.collapse', toggleChevron);
            $(this).on('shown.bs.collapse', toggleChevron);
        });
    }
    catch (e) {
        alert(e.message);
    }
}

//Accordion Indicator change
function toggleChevron(e) {
    try {
        /*
            Below focus code writen by Anupriya
        */
        $('#textgenval').focus();
        $('#txtprodoorNo').focus(); 
        $('#txtpropertydeednorth').focus(); 
        $('#txtpropdeednorth').focus();
        $('#txtlift').focus();
        $('#txtstatrest').focus();
        $('#txtwatersupplyarrang').focus();
        $('#txtmarketinfo').focus();
        $('#txtestimate').focus();
        $(e.target)
            .prev('.panel-heading')
            .find("i.indicator")
            .toggleClass('custom-chevron-right custom-chevron-down');
    }
    catch (ex) {
        alert(ex.message);
    }
}
//Accordion 1-Expand / 0-collapse
//function fnExpColl(Expand) {
//    var objAccord;
//    alert(Expand)
//    if (Expand == "1") {
//        alert('1');
//        objAccord = $('.panel-collapse');
//        objAccord = $(objAccord).collapse('show');
//        $('.panel-title').attr('data-toggle', '');
//    } else {
//        alert('0');
//        objAccord = $('.panel-collapse');
//        objAccord = $(objAccord).collapse('hide');
//        $('.panel-title').attr('data-toggle', 'collapse');
//    }
//}

function fnExpColl(eve) {
    eve.preventDefault();
    alert(eve.target)
    $(eve.target).closest("div.panel-collapse").collapse('hide');
    $(eve.target).closest("i.indicator").toggleClass('custom-chevron-right');
}

function fncollapse(eve) {
    //debugger
    $('.panel-title').removeClass("notactive");
    $(eve.target).closest("h4.panel-title").addClass("notactive");
}



//Password update for first time user.
function fnpwdupdate(jsonobj) {
    $('#modalloading').modal('show');
    $.ajax({
        type: "POST",
        url: "landingpage.aspx/pwdupdate",
        data: jsonobj,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $('#modalloading').modal('hide');
            if (response.d == "1") {
              //  strstatus = "Password Updated Successfully!";
                document.getElementById("div_pwddetails").style.display = "none";
                $(function () {
                    bootbox.dialog({
                        closeButton: false,
                        message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Password Updated Successfully...</p>',
                        buttons: {
                            success: {
                                label: "OK",
                                callback: fnpwdredirect
                            }
                        }
                    });
                });
            }
            else {
                $('#modalloading').modal('hide');
               // strstatus = "Password updation Failed !.";
                document.getElementById("div_pwddetails").style.display = "block";
                // bootbox.alert(strstatus);
                bootbox.dialog({
                    closeButton: true,
                    size: 'medium',
                    message: '<p class="text-center mb-0"><i class="fa fa-frown-o fa-lg"></i> Password updation Failed!</p>',
                });
                setTimeout(function () {
                    bootbox.hideAll();
                }, 2500);
            }
        },
        error: function (XMLHttpRequest, textStatus, xhr) {
            $('#modalloading').modal('hide');
            //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "StatusCode: " + XMLHttpRequest.status);
            if (XMLHttpRequest.status == "401") {
                alert(XMLHttpRequest.status)
            }
        },
    });

}

function fnpwdredirect() {
    fnclearsession();
    window.location.href = "../login.aspx"
    return false;

}

//function fnloadval(str) {
//    $.ajax({
//        type: "POST",
//        url: "landingpage.aspx/GetValuation",
//        data: str,
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (response) {
//            if (response.d != "0") {
//                var jsonObj = [];
//                jsonObj = JSON.parse(response.d);
//                $('#ddlvaluationID').empty();
//                var i = 0;
//                $(jsonObj).each(function () {
//                    for (i = 0; i < this.propid.length; i++) {
//                        var option = "<option value=" + this.propid[i] + ">" + this.address[i] + "</option>";
//                        $('#ddlvaluationID').append(option);
//                    }

//                });
//            }
//            else {
//                $('#ddlvaluationID').empty();
//                var option = $('<option />');
//                option.attr('value', "-No Property Found-").text("-No Property Found-");
//                $('#ddlvaluationID').append(option);
//            }
//        },
//        error: function (XMLHttpRequest, textStatus, errorThrown) {
//            alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
//        },
//    });
//}


function fncheckPropFootage() {
    if ($("#rdnproprequireYes").prop("checked")) {
        $("#txtproprjustification").prop('disabled', true);
        $('#txtproprjustification').prop('required', false);
        $("#txtproprjustification").prop('class', '');
        $("#txtproprjustification").prop('class', 'form-control');
        $("#txtproprjustification").siblings('label.error').hide();
    }
    else if ($("#rdnproprequireNo").prop("checked")) {
        $("#txtproprjustification").prop('disabled', false);
        $('#txtproprjustification').prop('required', true);
    }
    else {
        $("#txtproprjustification").prop('disabled', true);
        $('#txtproprjustification').prop('required', false);
    }
    if ($("#rdnlocrequireYes").prop("checked")) {
        $("#txtlocFootageReason").prop('disabled', true);
        $('#txtlocFootageReason').prop('required', false);
        $("#txtlocFootageReason").prop('class', '');
        $("#txtlocFootageReason").prop('class', 'form-control');
        $("#txtlocFootageReason").siblings('label.error').hide();

    }
    else if ($("#rdnlocrequireNo").prop("checked")) {
        $("#txtlocFootageReason").prop('disabled', false)
        $('#txtlocFootageReason').prop('required', true);
    }
    else {
        $("#txtlocFootageReason").prop('disabled', true);
        $('#txtlocFootageReason').prop('required', false);
    }
}

function fnregcancel() {
    window.location.href = "ApplicationQueue.aspx"
}


function getPathFromUrl() {
    debugger;
    url = window.location.href;
    url = url.split("?")[0];
    window.location.href = url;
}
function fnregredirect1(seluser) {
    window.location.href = "register.aspx?ddlusrtype=" + seluser;
}

function fnback2que() {
    var chkusrtype = getusertypequeu();
    var chkusrrole = getuserrole();
    if (chkusrtype == "Lender" && chkusrrole == "Admin") {
        window.location.href = "UserConfig.aspx";
    }
    else {
        window.location.href = "ApplicationQueue.aspx";
    }
}