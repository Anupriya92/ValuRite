<%@ Page Language="C#" MasterPageFile="~/PropertyApp.Master" AutoEventWireup="true" ClientIDMode="Static" CodeBehind="AppraisalSubmit.aspx.cs" Inherits="Login.AppraisalSubmit" EnableEventValidation="false" %>

<%--<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">--%>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <title></title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <%--<link href="bootstrap/css/bootstrap-theme.css" rel="stylesheet" />
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <script src="bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="bootstrap/js/jquery.min.js"></script>
    <script src="bootstrap/js/bootstrap.js"></script>
    <script src="Js/PropertyCreation.js"></script>
    <script src="Js/Valuationdetails.js"></script>--%>

    <link href="../includes/css/font-awe.css" rel="stylesheet" />
    <link href="../includes/css/dataTables.fontAwesome.css" rel="stylesheet" />
    <style type="text/css">
        .iframheigth1011 {
            height: 684px;
        }
    </style>
    <script type="text/javascript">

        window.onload = function () {
            $('html,body').animate({
                scrollTop: $("#divValuationPDF").offset().top
            }, 'slow');
            var a = document.getElementById("framepdf");
            $("#modalpdfload").show();
            setTimeout(function () {
                //debugger
                document.getElementById("framepdf").src = "PreviewPage.aspx";
                $("#modalpdfload").hide()
            }, 3000)
        }
        fnSessionMangement(); //Added by Anupriya to call set interval function
    </script>
    <style>
        #divsubmit {
            padding-left: 30px;
            padding-top: 30px;
            display: none;
            background-color: red;
        }

        .btn-primary {
            color: #ffffff;
            background-color: #1b4e66;
            border-color: #062939;
            border-radius: 8px;
        }

            .btn-primary:hover, .btn-primary:focus, .btn-primary:active, .btn-primary.active {
                color: #e9e9e9;
                background-color: #1b4e66;
                border-color: #1b4e66;
            }
        /* Grow Rotate */
        .fa-check-circle {
            display: inline-block;
            vertical-align: middle;
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            box-shadow: 0 0 1px rgba(0, 0, 0, 0);
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            -moz-osx-font-smoothing: grayscale;
            -webkit-transition-duration: 0.3s;
            transition-duration: 0.3s;
            -webkit-transition-property: transform;
            transition-property: transform;
        }

        .fa-check-circle {
            display: inline-block;
            vertical-align: middle;
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            box-shadow: 0 0 1px rgba(0, 0, 0, 0);
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            -moz-osx-font-smoothing: grayscale;
            position: relative;
            padding-left: 1.3em;
            -webkit-transition-duration: 0.3s;
            transition-duration: 0.3s;
        }

            .fa-check-circle:before {
                content: "\f058";
                position: absolute;
                left: 0.3em;
                padding: 0 1px;
                font-family: FontAwesome;
                -webkit-transform: translateZ(0);
                transform: translateZ(0);
                -webkit-transition-duration: 0.3s;
                transition-duration: 0.3s;
                -webkit-transition-property: transform;
                transition-property: transform;
                -webkit-transition-timing-function: ease-out;
                transition-timing-function: ease-out;
            }

            .fa-check-circle:hover:before, .fa-check-circle:focus:before, .fa-check-circle:active:before {
                -webkit-transform: scale(1.5) rotate(12deg);
                transform: scale(1.5) rotate(12deg);
            }
        /* Icon Buzz Out */
        @-webkit-keyframes fa-times-circle {
            10% {
                -webkit-transform: translateX(3px) rotate(2deg);
                transform: translateX(3px) rotate(2deg);
            }

            20% {
                -webkit-transform: translateX(-3px) rotate(-2deg);
                transform: translateX(-3px) rotate(-2deg);
            }

            30% {
                -webkit-transform: translateX(3px) rotate(2deg);
                transform: translateX(3px) rotate(2deg);
            }

            40% {
                -webkit-transform: translateX(-3px) rotate(-2deg);
                transform: translateX(-3px) rotate(-2deg);
            }

            50% {
                -webkit-transform: translateX(2px) rotate(1deg);
                transform: translateX(2px) rotate(1deg);
            }

            60% {
                -webkit-transform: translateX(-2px) rotate(-1deg);
                transform: translateX(-2px) rotate(-1deg);
            }

            70% {
                -webkit-transform: translateX(2px) rotate(1deg);
                transform: translateX(2px) rotate(1deg);
            }

            80% {
                -webkit-transform: translateX(-2px) rotate(-1deg);
                transform: translateX(-2px) rotate(-1deg);
            }

            90% {
                -webkit-transform: translateX(1px) rotate(0);
                transform: translateX(1px) rotate(0);
            }

            100% {
                -webkit-transform: translateX(-1px) rotate(0);
                transform: translateX(-1px) rotate(0);
            }
        }

        @keyframes fa-times-circle {
            10% {
                -webkit-transform: translateX(3px) rotate(2deg);
                transform: translateX(3px) rotate(2deg);
            }

            20% {
                -webkit-transform: translateX(-3px) rotate(-2deg);
                transform: translateX(-3px) rotate(-2deg);
            }

            30% {
                -webkit-transform: translateX(3px) rotate(2deg);
                transform: translateX(3px) rotate(2deg);
            }

            40% {
                -webkit-transform: translateX(-3px) rotate(-2deg);
                transform: translateX(-3px) rotate(-2deg);
            }

            50% {
                -webkit-transform: translateX(2px) rotate(1deg);
                transform: translateX(2px) rotate(1deg);
            }

            60% {
                -webkit-transform: translateX(-2px) rotate(-1deg);
                transform: translateX(-2px) rotate(-1deg);
            }

            70% {
                -webkit-transform: translateX(2px) rotate(1deg);
                transform: translateX(2px) rotate(1deg);
            }

            80% {
                -webkit-transform: translateX(-2px) rotate(-1deg);
                transform: translateX(-2px) rotate(-1deg);
            }

            90% {
                -webkit-transform: translateX(1px) rotate(0);
                transform: translateX(1px) rotate(0);
            }

            100% {
                -webkit-transform: translateX(-1px) rotate(0);
                transform: translateX(-1px) rotate(0);
            }
        }

        .fa-times-circle {
            display: inline-block;
            vertical-align: middle;
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            box-shadow: 0 0 1px rgba(0, 0, 0, 0);
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            -moz-osx-font-smoothing: grayscale;
            position: relative;
            padding-left: 1.3em;
            -webkit-transition-duration: 0.3s;
            transition-duration: 0.3s;
        }

            .fa-times-circle:before {
                content: "\f057";
                position: absolute;
                left: 0.3em;
                padding: 0 1px;
                font-family: FontAwesome;
                -webkit-transform: translateZ(0);
                transform: translateZ(0);
            }

            .fa-times-circle:hover:before, .fa-times-circle:focus:before, .fa-times-circle:active:before {
                -webkit-animation-name: fa-times-circle;
                animation-name: fa-times-circle;
                -webkit-animation-duration: 0.75s;
                animation-duration: 0.75s;
                -webkit-animation-timing-function: linear;
                animation-timing-function: linear;
                -webkit-animation-iteration-count: 1;
                animation-iteration-count: 1;
            }
    </style>
    <script src='http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.5/jquery-ui.min.js' type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row" id="divValuationPDF">
        <div class="col-lg-1 col-md-1 col-sm-12 col-xs-12"></div>
        <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12 iframheigth1011" style="box-shadow: 20px 20px 100px grey;" id="divpdf">
            <iframe style="border-style: none; border-color: inherit; border-width: medium; width: 100%; height: 100%;" id="framepdf"></iframe>
            <div>
                <%--<object data="PreviewPage.aspx" width="500" height="500">
                    alt : <a href="test.pdf">test.pdf</a>
                </object>--%>
            </div>
        </div>

        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
            <%--<div class="row" style="padding-left: 10px; padding-top: 30px;">
                <button type="button" id="divicon" value="Sub213">dsfsdfsdf</button>
            </div>--%>
            <div class="row" style="padding-left: 30px;">
                <div class="row" style="padding-top: 30px; margin-right: 0px;">
                    <button type="button" id="SectionsCompleted" value="Submit" style="font-size: xx-large;position: relative; z-index: 8800;" class="btn btn-primary fa-check-circle" onclick="SubmitAppraisal()">Submit</button>
                </div>
                <div id="divcancel" class="row" style="padding-top: 10px; margin-right: 0px;">
                    <%--<asp:Button ID="SectionsCompleted" runat="server" Text="Submit" style="font-size:xx-large" CssClass="btn btn-primary" OnClientClick="SubmitAppraisal(event);" />--%>
                    <button type="button" id="BtnSectioncancel" value="Cancel" style="font-size: xx-large" class="btn btn-primary fa-times-circle" onclick="fnback();">Cancel</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade in" id="modalpdfload" runat="server" role="dialog" style="display: none">
        <div class="modal-dialog modal-md">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="" style="">
                    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12" style="top: 180px;">
                        <asp:Image ID="Image1" runat="server" ImageAlign="AbsMiddle" ImageUrl="../Images/pdfgen.gif" />
                    </div>
                    <div class="col-lg-4">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <br />
        <br />
    </div>
    <div class="row">
        <div align="center">
        </div>
        <div class="col-lg-4"></div>
    </div>
</asp:Content>
<%--    </form>
</body>
</html>--%>
