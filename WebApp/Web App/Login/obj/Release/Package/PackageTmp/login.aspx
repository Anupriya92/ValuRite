<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="login.aspx.cs" Inherits="Login.login" EnableEventValidation="false" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Property Valuation - Login</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />


    <script src="bootstrap/js/jquery.min.js"></script>
    <script src="bootstrap/js/bootstrap.js"></script>
    <script src="bootstrap/Bootbox/bootbox.min.js"></script>
    <%--<script src='https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js' type='text/javascript'></script>--%>
    <script src="jqueryalert/jquery.ui.draggable.js"></script>
    <script src="jqueryalert/jQueryalert.js"></script>
    <script src="http://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
    <link href="http://code.jquery.com/ui/1.10.4/themes/ui-lightness/jquery-ui.css" rel="stylesheet" />
    <script src="bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <link href="jqueryalert/jQuery.alert.css" rel="stylesheet" />
    <link href="bootstrap/css/bootstrap-theme.css" rel="stylesheet" />
     <link href="../includes/css/font-awe.css" rel="stylesheet" />
    <script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>

    <script src="http://code.jquery.com/ui/1.11.1/jquery-ui.min.js"></script>

    <link rel="stylesheet" href="https://code.jquery.com/ui/1.11.1/themes/smoothness/jquery-ui.css" />
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link href="landingpage.css" rel="stylesheet" />
    <script src="Js/Valuationdetails.js"></script>
    <style>
        @media (max-width: @screen-xs-max) {
            body {
                background-size: auto;
            }
        }

        @media (min-width: @screen-sm-min) and (max-width: @screen-sm-max) {
            body {
                background-size: auto;
            }
        }

        @media (min-width: @screen-md-min) and (max-width: @screen-md-max) {
            body {
                -webkit-background-size: cover;
                -moz-background-size: cover;
                -o-background-size: cover;
                background-size: cover;
            }
        }

        @media (min-width: @screen-lg-min) {
            body {
                -webkit-background-size: cover;
                -moz-background-size: cover;
                -o-background-size: cover;
                background-size: cover;
            }
        }

        @media (max-width: @screen-lg-max) {
            body {
                -webkit-background-size: cover;
                -moz-background-size: cover;
                -o-background-size: cover;
                background-size: cover;
            }
        }
    </style>
    <script type="text/javascript">


        <%--var myVar;
        function myFunction() {
            //debugger;
            //alert('in');
            //alertFunc();
            myVar = setInterval(alertFunc, 10000);
            //Auditlog("hello");
        }
        function alertFunc() {
            var obj = {
                user: $("#txtusrid").val(),
                sessionID: '<%=Session["SessionID"]%>',
                type: "check"
               }
            var jsonobj = JSON.stringify(obj);
            $.ajax({
                
                type: "POST",
                url: "login.aspx/UserSession",
                data: JSON.stringify(obj),
                contentType: "application/json; charset=utf-8",
                datatype: "json",
                success: function (response) {
                    jsonObj = JSON.parse(response.d);
                    if (response.d == "1") {
                        $(function () {
                            alertFunc()
                        });
                    }
                    else {
                        clearInterval(myVar);
                    }
                }
            })
            //alert("Hello!");
        }--%>

        $(document).ready(function () {
            //fnparseJSON();
            fnlogreset();
            //myFunction();
            //if ($("#hdnIsvalidUser").val() == "1")
                //myVar = setInterval(alertFunc, 10);
            localStorage.setItem("pagename", "");
            if (hdnresp.value != "") {
                $(function () {
                    bootbox.alert(hdnresp.value);
                    hdnresp.value = "";
                });
            }
        });

        //code to parse json
        /*function fnparseJSON() {
            var JSONARRAY = [];
            $.get("IOV JSON/IOVbranches.json", function (data)
            {
                for (var obj in data)
                {
                    //console.log("\nOBJ" + JSON.stringify(data[obj]));
                    var CurrentObj = data[obj];
                    if (CurrentObj["Contact_Details"].toString().toLowerCase().includes("e-mail"))
                    {
                        var Mail = CurrentObj["Contact_Details"].substring(CurrentObj["Contact_Details"].indexOf("E-mail"), CurrentObj["Contact_Details"].length);
                        CurrentObj["EMail"] = Mail.split(":")[1].trim();
                        console.log(Mail);
                        CurrentObj["Contact_Details"] = CurrentObj["Contact_Details"].replace(Mail, "");
                        console.log("Replaced String" + CurrentObj["Contact_Details"]);
                        JSONARRAY.push(CurrentObj);
                    }                    
                    
                }
                var data = JSON.stringify(JSONARRAY);
                $('body').html(data);
            }, "json");
        }*/

        function fnlogreset() {
            $('#txtusrid').val('');
            $('#txtpaswd').val('');
        }


    </script>
    <style>
        .btn-success:hover, .btn-success:focus, .btn-success:active, .btn-success.active, .open > .dropdown-toggle.btn-success {
            color: #fff;
            background-color: #21d076;
            border-color: #67bb89;
        }

        .btn-success {
            color: #fff;
            background-color: #37af71;
            border-color: #44b177;
        }

        label {
            color: white;
        }
    </style>
</head>
<body style="background-image: url(Images/loginPROP.jpg); background-repeat: no-repeat; background-size: cover;">
    <form id="frmlogin" runat="server">
        <asp:ScriptManager ID="ScriptManager1" runat="server">
        </asp:ScriptManager>
        <div class="container">
            <br />
            <br />
            <div class="row">
                <div class="col-lg-8 col-md-8 col-sm-4 col-xs-2"></div>
                <div class="col-lg-4 col-md-4 col-sm-8 col-xs-10 jumbotron" style="background-color: rgba(3,49,82,0.7);">
                    <div class="form-group">
                        <div align="center">
                            <img src="Images/appslogo.png" style="height: 80px" class="img-responsive" />
                        </div>
                        <h4 class="text-center">
                            <label>ValuRite</label></h4>
                    </div>
                    <div class="form-group">
                        <label for="txtusrid" runat="server">User ID:</label>
                        <asp:TextBox ID="txtusrid" placeholder="Enter User ID" runat="server" CssClass="form-control" require="" autocomplete="off"></asp:TextBox>
                    </div>
                    <div class="form-group">
                        <label for="pwd" runat="server">Password:</label>
                        <asp:TextBox ID="txtpaswd" placeholder="Enter Password" TextMode="Password" runat="server" CssClass="form-control" require="" autocomplete="off"></asp:TextBox>
                    </div>
                    <div class="form-group">
                        <asp:Button ID="btnsubmit" runat="server" Text="Submit" CssClass="btn btn-success" OnClick="btnsubmit_Click"/>
                        <button type="button" id="btnlogReset" class="btn btn-default" onclick="fnlogreset()">Reset</button>
                    </div>
                    <%--//For Self Registration--%>
                   <%-- <div class="form-group">
                        <a onclick="setsessionForgetpaswd('false','true')">Registration</a>
                    </div>--%>
                    <div class="form-group">
                        <a onclick="setsessionForgetpaswd('true','false')">Forgot Password</a>
                    </div>

                    <div class="form-group" style="position: absolute;">
                        <div style="text-align: right">
                            <span style="color: white; font-size: 10px;">Powered By</span>
                            <br />
                            <span>
                                <img id="imglogo" runat="server" class="img-responsive" style="float: right; padding-bottom: 1%; padding-left: 40%;" /></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <asp:HiddenField ID="hdnresp" runat="server" />   
        <%--<asp:HiddenField ID="hdnIsvalidUser" runat="server" value ="0"/>--%>        
    </form>
</body>
</html>
