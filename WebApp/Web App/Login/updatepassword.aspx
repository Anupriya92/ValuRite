<%@ Page Language="C#" MasterPageFile="PropertyApp.Master" AutoEventWireup="true" CodeBehind="updatepassword.aspx.cs" Inherits="Login.updatepassword" %>

<%@ Register TagPrefix="asp" Namespace="Saplin.Controls" Assembly="DropDownCheckBoxes" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <title>Forgot Password</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <script src="../scripts/moment.min.js"></script>
    <script src="../scripts/bootstrap-datetimepicker.min.js"></script>
    <%--<script src="../scripts/bootstrap-multiselect.js"></script>--%>
    <script src="../scripts/globalize.js"></script>
    <script src="../scripts/globalize.cultures.js"></script>
    <script src="../Js/landingpage.js"></script>
    <script src="../Js/Valuationdetails.js"></script>

    <%--<link href="../scripts/bootstrap-multiselect.css" rel="stylesheet" />--%>
    <%--<link href="../Content/ace.min.css" rel="stylesheet" />--%>
    <link href="../Content/bootstrap-datetimepicker.min.css" rel="stylesheet" />
    <link href="../includes/css/font-awe.css" rel="stylesheet" />
    <link href="../includes/css/Customcss.css" rel="stylesheet" />
    <link href="../landingpage.css" rel="stylesheet" />
    <link href="../includes/css/Customcss.css" rel="stylesheet" />

    <script src="../Js/GoogleMap.js"></script>
    <style>
        .padrow {
            padding-top: 10px;
        }

        .glyphicon-spin {
            -webkit-animation: spin 1000ms infinite linear;
            animation: spin 1000ms infinite linear;
        }

        @-webkit-keyframes spin {
            0% {
                -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
            }

            100% {
                -webkit-transform: rotate(359deg);
                transform: rotate(359deg);
            }
        }

        @keyframes spin {
            0% {
                -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
            }

            100% {
                -webkit-transform: rotate(359deg);
                transform: rotate(359deg);
            }
        }
    </style>
    <script>
        $(document).ready(function () {
            $("#divmenu").hide();
            refreshcaptch()
            $('[data-toggle="tooltip"]').tooltip();
        });
        function Getupdatepassword() {

            if (localStorage.getItem('captch') == $("#txtCaptcha").val()) {

                divstatus = checkval('div_forgtpass');
                if (divstatus == 0) {

                    var userid = localStorage.getItem('UserID');
                    var newpass = $("#txtnewpwd").val();
                    var confrpass = $("#txtconfirmpsswd").val();

                    var obj = {
                        UserID: userid,
                        Password: newpass
                    }

                    obj = JSON.stringify(obj);

                    $.ajax({
                        type: "POST",
                        url: "updatepassword.aspx/UpdatePassword",
                        data: obj,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (response) {
                            if (response.d == "1") {
                                $(function () {
                                    bootbox.dialog({
                                        closeButton: false,
                                        message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Password Updated Successfully...</p>',
                                        buttons: {
                                            success: {
                                                label: "OK",
                                                callback: fnupadatesuccess
                                            }
                                        }
                                    });
                                });
                            }
                            else {
                                bootbox.dialog({
                                    closeButton: true,
                                    size: 'medium',
                                    message: '<p class="text-center mb-0"><i class="fa fa-frown-o fa-lg"></i> Password Update Failed...</p>',
                                });
                                setTimeout(function () {
                                    bootbox.hideAll();
                                }, 2500);
                                //bootbox.alert("Password Update Failed")
                            }
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {

                        },
                    });

                }
                else {
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
            else {
                bootbox.dialog({
                    closeButton: true,
                    size: 'medium',
                    message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Invalid Captcha Code...</p>',
                });
                setTimeout(function () {
                    bootbox.hideAll();
                }, 2500);
                //bootbox.alert("Invalid Captcha Code");
            }

            fnSessionMangement(); //Added by Anupriya to call set interval function
        }

        function fnupadatesuccess() {

            window.location.href = "login.aspx"
        }

        function refreshcaptch() {
            $('#spin').addClass("glyphicon-spin");
            $.ajax({
                type: "POST",
                url: "updatepassword.aspx/captcha",
                data: "",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    $('#spin').removeClass("glyphicon-spin");
                    localStorage.setItem('captch', response.d[0]);
                    $("#imgCaptcha").attr('src', response.d[1]);

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                },
            });

        }

        function checkval(elem) {
            status = 0;
            validator = $("#masterform").validate();

            $.validator.addMethod(
                "regex",
               function (value, element, regexp) {
                   var re = new RegExp(regexp);
                   return this.optional(element) || re.test(value);
               });

            $('#txtnewpwd').rules("add", {
                required: true,
                regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                minlength: 8,
                messages: {
                    regex: "Enter Combination of Uppercase,Lowercase,Special symbols & numeric",
                    required: "",
                    minlength: "Minimum 8 characters required"
                }
            });

            $('#txtconfirmpsswd').rules("add", {
                required: true,
                equalTo: "#txtnewpwd",
                messages: {
                    required: "",
                    equalTo: "Enter same password again"
                }
            });

            $.validator.messages.required = '';


            $('input', $('#' + elem)).each(function () {
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
        function Redirect() {
            window.location = "login.aspx";
        }

    </script>
    <%--<script>--%>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row">
        <div class="" id="div_forgtpass" runat="server">
            <div class="panel panel-default">
                <div class="panel-heading" style="background: #1b4e66; /*border-radius: 11px 11px 0px 0px; */">
                    <h4 style="text-align: center;">
                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#myAccordion" href="#div_forgpass">
                            <span id="spnAccordionHeader" class="sectionheader">Password Update</span> </a>
                    </h4>
                </div>
                <div id="div_forgpass" class="panel-collapse accordionmain">
                    <div class="panel-body jumbotron">
                        <div class="row">
                            <div class="col-lg-2"></div>
                            <div class="col-lg-9 labeltxt"></div>
                        </div>


                        <div class="row">
                            <div class="col-lg-4 col-md-3">
                            </div>
                            <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                <asp:Label ID="Label1" CssClass="titlefont" runat="server" align-center="true" Font-Bold="true">Enter your details</asp:Label>
                            </div>
                            <div class="col-lg-2">
                            </div>
                        </div>
                        <br />
                        <br />
                        <div class="row">
                            <div class="col-lg-4  col-md-4 contfont divmiddle">
                                <asp:Label ID="lblpasswd" runat="server" Font-Bold="true" for="txtpwd">Password details: </asp:Label>
                            </div>

                            <div class="col-lg-4 col-md-4">
                                <span class=""></span>
                                <asp:TextBox ID="txtnewpwd" TextMode="Password" runat="server" placeholder="New Password" CssClass="form-control" ToolTip="Password should contain minimum 8 characters" ClientIDMode="Static">
                                </asp:TextBox>
                            </div>

                        </div>
                        <div class="row padrow">
                            <div class="col-lg-4  col-md-4">
                            </div>
                            <div class="col-lg-4  col-md-4">
                                <span class=""></span>
                                <asp:TextBox ID="txtconfirmpsswd" TextMode="Password" runat="server" placeholder="Confirm Password" CssClass="form-control" ToolTip="Password should contain minimum 8 characters" ClientIDMode="Static">
                                </asp:TextBox>
                            </div>
                            <div class="col-lg-1">
                            </div>
                        </div>
                        <div class="row padrow">
                            <div class="col-lg-4 col-md-4 contfont divmiddle">
                                <asp:Label runat="server" ID="Label" for="txtcaptcha" Font-Bold="true">Captcha: </asp:Label>
                            </div>
                            <div class="form-group col-lg-3 col-md-3 contfont">
                                <div class='input-group date' id='refresh'>
                                    <asp:Image ID="imgCaptcha" runat="server" />
                                    <span class="input-group-addon" style="width: 0px;">
                                        <span class="glyphicon glyphicon-refresh" id="spin" style="top: 3px; font-size: small; color: #07354b;" data-toggle="tooltip" title="try new captcha" onclick="refreshcaptch()"></span></span>
                                </div>
                            </div>
                        </div>
                        <div class="row padrow">
                            <div class="col-lg-4 col-md-4"></div>
                            <div class="col-lg-3 col-md-3 contfont">
                                <asp:TextBox ID="txtCaptcha" runat="server" placeholder="Enter Captcha" CssClass="form-control" ClientIDMode="Static" Font-Bold="true"></asp:TextBox>
                            </div>
                        </div>
                        <div class="row padrow">
                            <div class="col-lg-4 col-md-4"></div>
                            <div class="col-lg-8 col-md-8">
                                <button type="button" class="btn btnreset" id="btnsubmit" value="Update" onclick="Getupdatepassword()">Update</button>
                                <button type="button" class="btn btnreset" id="btncancel" value="Cancel" onclick="Redirect()">Cancel</button>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="col-lg-1">
                </div>

                <div class="col-lg-1"></div>

            </div>
        </div>
    </div>
</asp:Content>
                                                                               