<%@ Page Language="C#" MasterPageFile="~/PropertyApp.Master" AutoEventWireup="true" CodeBehind="register.aspx.cs" ClientIDMode="Static" Inherits="Login.register" EnableEventValidation="false" %>

<%--<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">--%>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
     <link href="../includes/css/font-awe.css" rel="stylesheet" />
    <title></title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <script type="text/javascript">

        $(document).ready(function () {
            setFieldsAnonymous();
            $('#ddlusrrole').empty();
            $('#ddlusrrole').append("<option value='none'>Select Role</option>");
        });
        fnSessionMangement(); //Added by Anupriya to call set interval function
        function setFieldsAnonymous() {
            GetCountry();
            GetUnits();
            var anonymousUser = '<%=Session["Anonymous"]%>';
            if (anonymousUser == "1") {
                //alert("anonymous")
                $("#ddlusrrole").parent('div').parent('div.row').hide()
                $("#ddlusrrole").parent('div').parent('div.row').next().remove()
                $("#txtusrid").parent('div').parent('div.row').hide()
                $("#txtusrid").parent('div').parent('div.row').next().remove()
                //$("#FileUpload1").hide();
            }
            else {
                //alert("Old USer")
            }

        }

        function fnchkcompany() {
            if ('<%=Session["UserType"]%>' == "Lender") {
                if ($('#ddlOrgType').val() == "Company") {
                    $('#Compname').show();
                    $('#Txtcompname').attr('required', true)
                }
                else if ($('#ddlOrgType').val() == "Individual") {
                    $('#Compname').hide();
                    $('#Txtcompname').attr('required', false)
                }
            }
             //For Self Registration
            //else if ('<%=Session["UserType"]%>' == "anonymous")
            /*{
                if ($('#ddlOrgType').val() == "Company") {
                    $('#Compname').show();
                    $('#Txtcompname').attr('required', true)
                }
                if ($('#ddlOrgType').val() == "Individual") {
                    $('#Compname').hide();
                    $('#Txtcompname').attr('required', false)
                }
            }*/
            else if ('<%=Session["UserType"]%>' == "Appraiser") {

                if ('<%=Session["ddlusrtype"]%>' == "Lender") {
                    if ($('#ddlOrgType').val() == "Company") {
                        $('#Compname').show();
                        $('#Txtcompname').attr('required', true)
                    }
                    if ($('#ddlOrgType').val() == "Individual") {
                        $('#Compname').hide();
                        $('#Txtcompname').attr('required', false)
                    }
                }
                else if ('<%=Session["ddlusrtype"]%>' == "Borrower") {
                    if ($('#ddlOrgType').val() == "Company") {
                        $('#Compname').show();
                        $('#Txtcompname').attr('required', true)
                    }
                    if ($('#ddlOrgType').val() == "Individual") {
                        $('#Compname').hide();
                        $('#Txtcompname').attr('required', false)
                    }

                }
                else if ('<%=Session["ddlusrtype"]%>' == "Appraiser") {
                    if ($('#ddlOrgType').val() == "Individual") {
                        $('#Compname').show();
                        $('#Txtcompname').attr('required', true)
                    }
                }

        }
}

function fngetroles() {
    if ($('#ddlOrgType').val() != "none") {
        var obj = {
            parentid: $("#ddlOrgType option:selected").attr('pid'),
            paramname: "CustUserRole",
            accesstype: '<%=Session["UserType"]%>'
        }

        obj = JSON.stringify(obj);

        $.ajax({
            type: "POST",
            url: "register.aspx/loaddropdowns",
            data: obj,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (response.d == "0") {
                    alert("0");
                }
                else {
                    fnloadroles(response.d)
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Request: 123 " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
            },
        });
    }
}

function fnloadroles(dropdownvalues) {
    var dropdownobj = JSON.parse(dropdownvalues);
    $('#ddlusrrole').empty();
    $('#ddlusrrole').append("<option value='none'>Select Role</option>");
    for (var i = 0; i < dropdownobj.length; i++) {
        var option = "<option value='" + dropdownobj[i].ParamValue + "'>" + dropdownobj[i].ParamValue + "</option>";
        $("#ddlusrrole").append(option);
    }
}

function fnbtnREGreset() {
    if ('<%=Session["UserType"]%>' == "Lender") {
        $('#FileUpload1').val("")
        $("#txtfirstname").val('');
        $("#txtmidname").val('');
        $("#txtlastname").val('');
        $("#txtphone").val('');
        $("#txtmobile").val('');
        $("#txtemail").val('');
        $("#txtArea").val('');
        $("#txtlandmark").val('');
        $('#ddlcountry').prop('selectedIndex', 0);
        $('#ddlstate').prop('selectedIndex', 0);
        $('#ddlcity').prop('selectedIndex', 0);

        $("#txtaddr1").val('');
        $("#txtaddr2").val('');
        $("#txtpincode").val('');
        $("#txtusrid").val('');

        $("#Txtcompname").val('');
        $("#ddlusrrole").prop('selectedIndex', 0);
        $('#ddlOrgType').prop('selectedIndex', 0);
        $("#Compname").css("display", "none");
    }
    else {
        location.reload();
    }
}

function checkvalprop(elem) {
    status = 0;
    validator = $("#masterform").validate({
    });

    $.validator.addMethod("aFunction",
        function (value, element) {
            if (value == "none")
                return false;
            else
                return true;
        }, "");

    $.validator.addMethod(
         "regex",
        function (value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        });

    $('#txtphone').rules("add", {
        required: false,
        regex: /^[0-9]{1,6}[\-][0-9]{6,10}$/,
        messages: {
            regex: "Enter valid Phone number eg.044-22621216"
        }
    });

    $('#txtmobile').rules("add", {
        required: true,
        regex: /^[0-9]{10}$/,
        messages: {
            regex: "Enter 10 digit mobile number",
            required: ""
        }
    });

    $('#txtemail').rules("add", {
        required: true,
        regex: /^([a-zA-Z][\w\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]){1,70}$/,
        messages: {
            regex: "Enter valid e-mail",
            required: ""
        }
    });

    $('#txtpincode').rules("add", {
        required: true,
        regex: /^[0-9]{6}$/,
        messages: {
            regex: "Enter 6 digit pincode",
            required: ""
        }
    });

    $('#txtfirstname').rules("add", {
        required: true,
        messages: {
            required: ""
        }
    });
    $('#txtfirstname').rules("add", {
        required: true,
        messages: {
            required: ""
        }
    });
    $('#txtlastname').rules("add", {
        required: true,
        messages: {
            required: ""
        }
    });
    $('#txtArea').rules("add", {
        required: true,
        messages: {
            required: ""
        }
    });
    $('#txtusrid').rules("add", {
        required: true,
        messages: {
            required: ""
        }
    });

    $('#txtaddr1').rules("add", {
        required: true,
        messages: {
            required: ""
        }
    });

    $('#ddlcountry').rules("add", {
        aFunction: true,
        messages: {
            aFunction: ""
        }
    });

    $('#ddlOrgType').rules("add", {
        aFunction: true,
        messages: {
            aFunction: ""
        }
    });

    $('#ddlusrrole').rules("add", {
        aFunction: true,
        messages: {
            aFunction: ""
        }

    })
    $('#ddlstate').rules("add", {
        aFunction: true,
        messages: {
            aFunction: ""
        }
    });

    $('#Txtcompname').rules("add", {
        messages: {
            required: ""
        }
    });

    $('#ddlcity').rules("add", {
        aFunction: true,
        messages: {
            aFunction: ""
        }
    });

    $('textarea', $('#' + elem)).each(function () {
        try {
            validator.element('#' + this.id)
            if (validator.element('#' + this.id) == false) {
                status = 1;
            }
        }
        catch (exp) {
            console.log("Element ID " + this.id + " --textarea -- " + exp)
        }
    });

    $('input', $('#' + elem)).each(function () {
        try {
            validator.element('#' + this.id)
            if (validator.element('#' + this.id) == false) {
                status = 1;
            }
        }
        catch (exp) {
            console.log("Element ID " + this.id + " --input -- " + exp)
        }
    });

    $('select', $('#' + elem)).each(function () {
        try {
            validator.element('#' + this.id)
            if (validator.element('#' + this.id) == false) {
                status = 1;
            }
        }
        catch (exp) {
            console.log("Element ID " + this.id + " --Exception -- " + exp)
        }
    });


    return status;
}

function saveRegdetails() {
    //var upload = ($('#FileUpload1').val().replace(/.*(\/|\\)/, '').replace(/\.jpg/, ''));
    var fnam = $('#FileUpload1').val().split('\\').pop();
    var upload = fnam.substring(0, fnam.lastIndexOf('.'))
    var imagename = "";
    divstatus = checkvalprop('divregdetails');
    if (divstatus == 0) {
        if ($('#FileUpload1').val() != "") {
            fnpicsupload();
            imagename = ($("#txtusrid").val() + upload);
        }
        var obj = {
            strusrname: $('#txtfirstname').val() + ' ' + $('#txtmidname').val() + ' ' + $('#txtlastname').val(),
            strcompname: $('#Txtcompname').val(),
            strusrrole: $('#ddlusrrole').val(),
            strusrtype: '<%=Session["ddlusrtype"]%>',
            
            strphno: $('#txtphone').val(),
            strmobno: $('#txtmobile').val(),
            stremail: $('#txtemail').val(),
            strcountry: $('#ddlcountry :selected').val(),
            strstate: $('#ddlstate :selected').val(),
            strcity: $('#ddlcity :selected').val(),
            strarea: $('#txtArea').val(),
            strlandmark: $('#txtlandmark').val(),
            straddr1: $('#txtaddr1').val(),
            straddr2: $('#txtaddr2').val(),
            strpincode: $('#txtpincode').val(),
            struserid: $('#txtusrid').val(),
            strorgtype: $('#ddlOrgType').val(),
            struploading: imagename
        }
        var jsonobj = JSON.stringify(obj);
        fnsaveRegdetails(jsonobj);
    } else {
        bootbox.dialog({
            closeButton: true,
            size: 'medium',
            message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please enter Valid Values in the Highlighted Mandatory Field(s)...</p>',
        });
        setTimeout(function () {
            bootbox.hideAll();
        }, 2500);
       // bootbox.alert("<div>Please enter valid values in the highlighted mandatory field(s)</div>");
    }
}

function fnsaveRegdetails(objreg) {
    $.ajax({
        type: "POST",
        url: "register.aspx/saveRegdetails",
        data: objreg,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $('#FileUpload1').val("")
            if (response.d == "1") {
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<%=Session["ddlusrtype"]%>' + " Data Saved Successfully",
                        buttons: {
                            success: {
                                label: "OK",
                                callback: fnbtnREGreset
                            }
                        }
                    });
                });
            }
            else {
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> User ID Already Exists...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 1500);
                    //bootbox.alert("User Id already Exists");
                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert("Request: 123 " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
        },
    });
}

function fnregcancel() {
    window.location.href = "landingpage.aspx"
}
function fnpicsupload() {
    $("#frmlogocapture").contents().find("#FileUpload1").remove();
    $("#frmlogocapture").contents().find("body").find("div.row").find("#txtusrid").val($("#txtusrid").val())
    $("#frmlogocapture").contents().find("body").find("div.row").append($("#FileUpload1").clone());
    $("#frmlogocapture").contents().find("body").find("div.row").find("#Button2").click()
}
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="row" id="divregdetails">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 transpdiv labeltxt" style="padding-top: 0px; background-color: #ececec;">
            <div class="row modal-header-primary">
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-1">
                </div>
                <div class="col-lg-7 col-md-7 col-sm-7 col-xs-10">
                    <asp:Label runat="server" ID="lblnewuser" CssClass="sectionheader" Style="font-weight: bold; font-size: 16pt">
                    </asp:Label>
                </div>
                <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1"></div>
            </div>
            <br />
            <br />
            <div class="row" id="organi">
                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-4 divmiddle">
                    <asp:Label runat="server" ID="lbll" for="ddlOrgType" Font-Bold="true" CssClass="">Organization: </asp:Label>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <span class="asterisk_input"></span>
                    <asp:DropDownList ID="ddlOrgType" runat="server" CssClass="form-control" AutoPostBack="false" ClientIDMode="Static" EnableViewState="true" onchange="fnchkcompany(); fngetroles()">
                        <asp:ListItem Text="Select Organization" Value="none"></asp:ListItem>
                    </asp:DropDownList>
                </div>
                <div id="Compname" class="col-lg-3 col-md-3 col-sm-3 col-xs-12" style="display: none">
                    <span class="asterisk_input"></span>
                    <asp:TextBox ID="Txtcompname" runat="server" placeholder="Company Name" CssClass="form-control" ClientIDMode="Static"></asp:TextBox>
                </div>
                <div class="col-lg-1"></div>
            </div>
            <br />
            <div class="row">
                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-4 divmiddle">
                    <asp:Label runat="server" ID="lblusrname" for="txtusrname" Font-Bold="true" CssClass="">Name:                 
                    </asp:Label>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <span class="asterisk_input"></span>
                    <asp:TextBox ID="txtfirstname" runat="server" placeholder="First Name" ToolTip="First Name" CssClass="form-control" onkeypress="return onlyAlphabets(event,this);" ClientIDMode="Static"></asp:TextBox>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <asp:TextBox ID="txtmidname" runat="server" placeholder="Middle Name" ToolTip="Non mandatory" CssClass="form-control" onkeypress="return onlyAlphabets(event,this);" ClientIDMode="Static"></asp:TextBox>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <span class="asterisk_input"></span>
                    <asp:TextBox ID="txtlastname" runat="server" placeholder="Last Name" ToolTip="Lastname" CssClass="form-control" onkeypress="return onlyAlphabets(event,this);" ClientIDMode="Static"></asp:TextBox>
                </div>
            </div>
            <br />
            <div class="row">
                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-4 divmiddle">
                    <asp:Label runat="server" ID="lblusrrole" for="ddlusrrole" Font-Bold="true" CssClass="">User Role: </asp:Label>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <span class="asterisk_input"></span>
                    <asp:DropDownList ID="ddlusrrole" runat="server" CssClass="form-control" AutoPostBack="false" ClientIDMode="Static" EnableViewState="true">
                    </asp:DropDownList>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                </div>
                <div class="col-lg-1 col-md-1 col-sm-1 col-xs-12"></div>
            </div>
            <br />
            <div class="row">
                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-4 divmiddle">
                    <asp:Label runat="server" ID="lblcontact" Font-Bold="true" CssClass="">Contact details:                  
                    </asp:Label>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <%--                    <asp:Label runat="server" ID="lblphone" for="txtphone" Font-Bold="true">Phone number                  
                    </asp:Label>--%>
                    <asp:TextBox ID="txtphone" runat="server" placeholder="Phone number" ToolTip="Enter Number in ###-###### Format" CssClass="form-control" ClientIDMode="Static"></asp:TextBox>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <%--<asp:Label runat="server" ID="lblmob" for="txtmobile" Font-Bold="true">Mobile number                  
                    </asp:Label>--%>
                    <span class="asterisk_input"></span>
                    <asp:TextBox ID="txtmobile" runat="server" ToolTip="Enter 10 digit Mobile Number" placeholder="Mobile number" CssClass="form-control" onkeypress="return isNumberKey(event)" ClientIDMode="Static"></asp:TextBox>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <span class="asterisk_input"></span>
                    <asp:TextBox ID="txtemail" runat="server" placeholder="Email Address" ToolTip="someexample@someemail.com" CssClass="form-control" ClientIDMode="Static"></asp:TextBox>
                </div>
            </div>
            <br />
            <div class="row">
                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-4 divmiddle">
                    <asp:Label runat="server" ID="lbladdr" for="txtmobile" CssClass="" Font-Bold="true">Address:                 
                    </asp:Label>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <span class="asterisk_input"></span>
                    <asp:DropDownList ID="ddlcountry" runat="server" CssClass="form-control" onchange="GetState(this.value)" ClientIDMode="Static">
                        <%--<asp:ListItem Value="">--City--</asp:ListItem>--%>
                    </asp:DropDownList>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <span class="asterisk_input"></span>
                    <asp:DropDownList ID="ddlstate" runat="server" CssClass="form-control" onchange="Getcity(this.value)" ClientIDMode="Static">
                        <%--<asp:ListItem Value="">--State--</asp:ListItem>--%>
                    </asp:DropDownList>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <span class="asterisk_input"></span>
                    <asp:DropDownList ID="ddlcity" runat="server" CssClass="form-control" ClientIDMode="Static">
                        <%--<asp:ListItem Value="">--State--</asp:ListItem>--%>
                    </asp:DropDownList>
                </div>
                <div class="col-lg-1 col-md-1 col-sm-1 col-xs-12">
                </div>
            </div>
            <br />
            <div class="row">
                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-4">
                </div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <span class="asterisk_input"></span>
                    <asp:TextBox ID="txtaddr1" runat="server" TextMode="MultiLine" ToolTip="Enter Your Address" placeholder="Address line 1" CssClass="form-control input-sm" Style="resize: none;" ClientIDMode="Static">
                    </asp:TextBox>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <asp:TextBox ID="txtaddr2" runat="server" TextMode="MultiLine" placeholder="Address line 2" CssClass="form-control input-sm" Style="resize: none;" ClientIDMode="Static">
                    </asp:TextBox>
                </div>
            </div>
            <br />
            <div class="row">
                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-4">
                </div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <span class="asterisk_input"></span>
                    <asp:TextBox ID="txtArea" runat="server" placeholder="Area" CssClass="form-control" ClientIDMode="Static">
                    </asp:TextBox>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <asp:TextBox ID="txtlandmark" runat="server" placeholder="Landmark" CssClass="form-control" ClientIDMode="Static">
                    </asp:TextBox>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <span class="asterisk_input"></span>
                    <asp:TextBox ID="txtpincode" ToolTip="Enter 6 digit Pin code" runat="server" placeholder="Pin code" CssClass="form-control" onkeypress="return isNumberKey(event)" ClientIDMode="Static">
                    </asp:TextBox>
                </div>
            </div>
            <br />
            <div class="row">
                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-6 divmiddle">
                    <asp:Label runat="server" ID="lblusrid" for="txtusrid" Font-Bold="true">User ID:                
                    </asp:Label>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <span class="asterisk_input"></span>
                    <asp:TextBox ID="txtusrid" runat="server" placeholder="User ID" CssClass="form-control" ClientIDMode="Static"></asp:TextBox>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <%--<asp:TextBox ID="" runat="server" placeholder="Lastname" CssClass="form-control"></asp:TextBox>--%>
                </div>
                <div class="col-lg-1"></div>
            </div>
            <br />
            <div class="row">
              <div class="col-lg-2 col-md-2  col-xs-12 col-sm-2">
                </div>
                 <div class="row">
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">  
                <asp:FileUpload ID="FileUpload1" runat="server"/>
                </div>
                     <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 divmiddle1">
                   <iframe id="frmlogocapture" name="Frame" src="Picsupload.aspx" height="100%" width="100%" style="overflow: hidden; display: none;"  scrolling="yes" ></iframe>
                  </div>
                 <div class="col-lg-2 col-md-2 col-sm-2 col-xs-4"">  
                   <button type="button" id="btnlogoupload" runat="server"  onclick="fnpicsupload()" style="display:none">Upload</button>
                </div>
                     </div>

              <%--  <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                    <div class="row">
                        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-4 " >
                            <button type="button" id="btnsubmit" runat="server" class="btn btnsave"  onclick="saveRegdetails()">Save</button>
                        </div>
                         <div class="col-lg-2 col-md-2 col-sm-4 col-xs-4">
                            <button type="button" id="btnreset" runat="server" class="btn btnreset" onclick="fnbtnREGreset()">Reset</button>
                        </div>
                        <div class="col-lg-2 hidden-xs hidden-sm" style="display: none">
                            <button type="button" id="btnregcancel" value="Cancel" class="btn btn-primary" onclick="fnregcancel()">Cancel</button>
                        </div>
                        <div class="col-lg-2 hidden-xs hidden-sm"></div>
                    </div>
                </div>--%>
                <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"></div>
                </div>
               <%-- <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"></div>
                </div>--%>
               <br />
                  <div class="row">
                <div class="col-lg-2 col-md-3 col-sm-3 col-xs-3"></div>
                <div class="col-lg-7 col-md-8 col-sm-8 col-xs-12">
                    <div class="row">
                        <div class="col-lg-2 col-md-4 col-sm-6 col-xs-12 divmiddle">
                            <button type="button" id="btnsubmit" runat="server" class="btn btnsave"  onclick="saveRegdetails()">Save</button>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                           <button type="button" id="btnreset" runat="server" class="btn btnreset" onclick="fnbtnREGreset()">Reset</button>
                        </div>
                   <div class="col-lg-2 hidden-xs hidden-sm" style="display: none">
                            <button type="button" id="btnregcancel" value="Cancel" class="btn btn-primary" onclick="fnregcancel()">Cancel</button>
                        </div>
                        <div class="col-lg-2 hidden-xs hidden-sm"></div>
                    </div>
                   </div>
           <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1"></div>
             </div>
                 <br />
        <div class="col-lg-2 hidden-xs hidden-sm">
                </div>
            </div>


        </div>
        <!--End of Registration Form-->
        <div class="col-lg-1" style="display: none">
            <button type="button" class="btn btn-sm btnsave"><span class="glyphicon glyphicon-backward" onclick="fnback2que()">&nbsp;Back</span></button>
        </div>
    </div>

    <div class="col-lg-1">
    </div>
    <asp:HiddenField ID="hdnusrtype" runat="server" />
    <asp:HiddenField ID="hdnregstatus" runat="server" />
</asp:Content>
<%--    </form>
</body>
</html>--%>
