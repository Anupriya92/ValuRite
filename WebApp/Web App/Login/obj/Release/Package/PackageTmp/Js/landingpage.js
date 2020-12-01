//Format number to comma separated values
function formatNumber(elem) {
    //alert()
    elemval = $('#' + elem).val();
    currentculture = "en-IN";
    Globalize.culture(currentculture);

    if (elemval == "") {
        return ('Number not valid');
    }
    else {
        var numval = Globalize.parseFloat(elemval);
        curval = (Globalize.format(numval, "n2"));
        //alert(curval)
        if (curval != "NaN") {
            $('#' + elem).val(curval);
        }
    }
}

//Password update
function passworddetails(e) {
    e.preventDefault();
    var usrid = getuserID();
    divstatus = checkval('div_pwddetails');
    $("#txtpwd").attr('required', true)
    $("#txtconfirmpwd").attr('required', true)
    $("#txtAnswr").attr('required', true)
    $('#ddlQues').attr('required', true)
    if (divstatus == 0) {
        var obj = {
            strID: usrid,
            newPassword: $("#txtpwd").val(),
            securityQuestion: $('#ddlQues :selected').text(),
            securityAnswer: $("#txtAnswr").val()
        }
        document.getElementById('lblpwdok').innerText = "";
        var pwdjson = JSON.stringify(obj);
        fnpwdupdate(pwdjson);
    }
}

//Reset password section
function fnbtnreset() {
    this.event.preventDefault();
    $("#txtpwd").val('');
    $("#txtconfirmpwd").val('');
    $('#ddlQues').prop('selectedIndex', 0);
    $("#txtAnswr").val('');
    $("#lblpwdok").html('');
}



