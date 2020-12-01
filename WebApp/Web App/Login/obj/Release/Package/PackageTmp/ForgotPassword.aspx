<%@ Page Language="C#" MasterPageFile="PropertyApp.Master" AutoEventWireup="true" CodeBehind="ForgotPassword.aspx.cs" Inherits="Login.ValuRite.ForgotPassword" %>

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
        .myrow {
            padding-top: 6px;
        }

        .myrow1 {
            padding-top: 16px;
        }

        h4 > a, h4 > a > span {
            color: #102e3d;
            font-weight: bold;
            transition: all 0.1s;
        }

            h4 > a:hover, h4 > a:active, h4 > a:focus, h4 > a > span:hover, h4 > a > span:active, h4 > a > span:focus, h4 > a > span:visited {
                color: #042535;
                font-weight: bold;
                transition: all 0.1s;
            }

        .btn-link, .btn-link:active, .btn-link[disabled], fieldset[disabled] .btn-link {
            -webkit-box-shadow: none;
            box-shadow: none;
        }
        .custtop {
            padding-top:5px;
        }

        .jumbotron {
            background-color: white;
            margin-bottom: 0;
        }

        .custom-chevron-right:before {
            content: "\e080";
        }

        .transpdiv {
            color: black;
        }

        .labeltxt {
            color: black;
        }

        .img-wrap {
            position: relative;
            display: inline-block;
            border: 1px black solid;
            font-size: 0;
        }

            .img-wrap .close {
                position: absolute;
                top: 2px;
                right: 2px;
                z-index: 100;
                background-color: #FFF;
                padding: 5px 2px 2px;
                color: #000;
                font-weight: bolder;
                cursor: pointer;
                opacity: .2;
                text-align: center;
                font-size: 22px;
                line-height: 10px;
                border-radius: 50%;
            }

            .img-wrap:hover .close {
                opacity: 1;
            }

        .custom-chevron-down:before {
            content: "\e114";
        }

        .tooltip > .tooltip-inner {
            background-color: #B1302C;
        }

        .tooltip.top .tooltip-arrow {
            border-top-color: #B1302C;
        }

        .tooltip.top-left .tooltip-arrow {
            border-top-color: #B1302C;
        }

        .tooltip.top-right .tooltip-arrow {
            border-top-color: #B1302C;
        }

        .tooltip.right .tooltip-arrow {
            border-right-color: #B1302C;
        }

        .tooltip.left .tooltip-arrow {
            border-left-color: #B1302C;
        }

        .tooltip.bottom .tooltip-arrow {
            border-bottom-color: #B1302C;
        }

        .tooltip.bottom-left .tooltip-arrow {
            border-bottom-color: #B1302C;
        }

        .tooltip.bottom-right .tooltip-arrow {
            border-bottom-color: #B1302C;
        }

        .tooltip > .tooltip-inner {
            background-color: #B1302C;
        }

        .jumbotron {
            padding: 30px 15px;
            color: inherit;
            background-color: #eee;
        }
    </style>
    <script>

        $(document).ready(function () {

            $("#divmenu").hide();
            $('#div_forgpass').collapse('show');
            $("#secuques").hide();
            $("#DropDownList1").hide();
            $("#enteransw").hide();
            $("#btnupdate").hide();
            $("#btncancel").hide();
        });
        fnSessionMangement(); //Added by Anupriya to call set interval function
        var passques;
        var passans;

        function CheckUserExists() {
            
            var obj = {
                UserID: $("#TextBox1").val(),
            }

            obj = JSON.stringify(obj);

            $.ajax({
                type: "POST",
                url: "ForgotPassword.aspx/CheckUserExists",
                data: obj,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    //debugger
                    jsonObj = JSON.parse(response.d);

                    if (response.d != "0") {
                        passques = jsonObj[0].PasswordDetails.PasswordQuestion;
                        passans = jsonObj[0].PasswordDetails.PasswordAnswer;
                        $('#DropDownList1').empty();
                        $('#DropDownList1').append('<option>' + passques + '</option>');
                        //bootbox.alert("User exists");
                        $("#secuques").show();
                        $("#DropDownList1").show();
                        $("#DropDownList1").prop("disabled", true);
                        $("#enteransw").show();
                        $("#btnsubmit").show();
                        $("#Butnreset").show();
                        $("#btnupdate").show();
                        $("#btncancel").show();
                    }
                    else {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'small',
                            message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> User not Exists...</p>',
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 2500);
                       // bootbox.alert("User not exists");
                        $("#secuques").hide();
                        $("#DropDownList1").hide();
                        $("#enteransw").hide();
                        $("#btnsubmit").hide();
                        $("#Butnreset").hide();
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                },
            });
        }
        //forgot password 
        function Getforgotpassword() {
            localStorage.setItem('UserID', $("#TextBox1").val());

            var userid = $("#TextBox1").val();
            var secques = $("#DropDownList1").val();
            var secans = $("#enteransw").val();

            if (passques == secques && secans == passans) {

                $(function () {
                    bootbox.dialog({
                        closeButton: false,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i>Are You Sure You Want to Update Your Password?...</p>',
                        buttons: {
                            Yes: {
                                callback: fnforgotpass
                            },
                            No: {
                                callback: Redirect
                            }
                        },
                    });
                });

            }
            else {
                bootbox.dialog({
                    closeButton: true,
                    size: 'medium',
                    message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Security Answer not Matched...</p>',
                });
                setTimeout(function () {
                    bootbox.hideAll();
                }, 2500);
                //bootbox.alert("Security Answer not matched");
            }

        }
        function fnforgotpass() {

            window.location.href = "updatepassword.aspx"
        }


        function Redirect() {
            window.location = "login.aspx";
        }


    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row">
        <div class="" id="div_forgtpass" runat="server">
            <div class="panel panel-default">
                <div class="panel-heading" style="background: #1b4e66; /*border-radius: 11px 11px 0px 0px; */">
                    <h4 style="text-align: center;">
                        <a class="accordion-toggle" data-toggle="collapse" data-parent="#myAccordion" href="#div_forgpass">
                            <span id="spnAccordionHeader" class="sectionheader">Forgot Password</span> </a>
                    </h4>
                </div>
                <div id="div_forgpass" class="panel-collapse">
                    <div class="panel-body">
                        <div class="row custtop">
                            <div class="col-lg-4 col-md-3 col-sm-4 col-xs-2">
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-8">
                                <asp:Label ID="Label1" CssClass="titlefont" runat="server" align-center="true" Font-Bold="true">Enter your details</asp:Label>
                            </div>
                            <div class="col-lg-1 col-md-3 col-sm-2 col-xs-2">
                            </div>
                        </div>
                        <br />
                        <br />
                        <div class="row custtop">
                            <div class="col-lg-1">
                            </div>
                            <div class="col-lg-10 col-md-12 col-sm-12 col-xs-12">
                                <div class="row custtop">
                                    <div class="col-lg-2 col-md-2 col-sm-1 col-xs-12">
                                    </div>
                                    <div class="col-lg-2 col-md-2 col-sm-3 col-xs-6 contfont divmiddle">
                                        <asp:Label runat="server" ID="Label2" for="txtusrID" Font-Bold="true">User ID:</asp:Label>
                                    </div>
                                    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-10">
                                        <asp:TextBox ID="TextBox1" runat="server" placeholder="User ID" CssClass="form-control" ClientIDMode="Static" Font-Bold="true"></asp:TextBox>
                                    </div>
                                    <div class="col-lg-2 col-md-3 col-sm-4 col-xs-11 contfont">
                                        <button type="button" class="btn btnreset" id="btncheck" value="Check" onclick="CheckUserExists()">Check</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-1 col-md-1">
                            </div>
                        </div>

                        <div class="row custtop">
                            <div class="col-lg-1 col-md-1">
                            </div>
                            <div class="col-lg-10 col-md-12 col-sm-10 col-xs-12">
                                <div class="row custtop">
                                    <div class="col-lg-1 col-md-1 col-sm-1 col-xs-12">
                                    </div>
                                    <div class="col-lg-3 col-md-3 col-sm-5 col-xs-6 contfont divmiddle">
                                        <asp:Label ID="secuques" runat="server" for="ddlQues" Font-Bold="true">Security Question: </asp:Label>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        <div class="row custtop">
                                            <div class="col-lg-12 col-md-12 col-sm-1 col-xs-1">
                                            </div>
                                            <div class="col-lg-12 col-md-12 col-sm-9 col-xs-11">
                                                <asp:DropDownList ID="DropDownList1" runat="server" CssClass="form-control" ClientIDMode="Static" Font-Bold="true">
                                                    <asp:ListItem Value="none" Selected="True">Select a Security Question</asp:ListItem>
                                                </asp:DropDownList>
                                            </div>
                                        </div>
                                        <div class="row custtop">
                                            <div class="col-lg-12 col-md-12 col-sm-1 col-xs-1">
                                            </div>
                                            <div class="col-lg-12 col-md-12 col-sm-9 col-xs-11">
                                                <asp:TextBox ID="enteransw" runat="server" placeholder="Enter your Answer" CssClass="form-control" ClientIDMode="Static" Font-Bold="true">
                                                </asp:TextBox>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-1 col-md-1">
                            </div>
                        </div>
                        <div class="row custtop">
                            <div class="col-lg-4 col-md-4 col-sm-1 col-xs-1">
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-12">
                                <div class="row">
                                    <div id="buttn" class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                                        <button type="button" class="btn btnreset" id="btnupdate" value="Update" onclick="Getforgotpassword()">Update</button>
                                        <button type="button" class="btn btnreset" id="btncancel" value="Cancel" onclick="Redirect()">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
