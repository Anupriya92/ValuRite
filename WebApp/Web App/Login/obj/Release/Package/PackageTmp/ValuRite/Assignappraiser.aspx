<%@ Page Language="C#" MasterPageFile="~/PropertyApp.Master" AutoEventWireup="true" CodeBehind="Assignappraiser.aspx.cs" Inherits="Login.Assignappraiser" ClientIDMode="Static" EnableEventValidation="false" %>

<%--<!DOCTYPE html>--%>

<%--<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">--%>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <title>Property Appraisal - AssignAppraiser</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="../Jquerycustomselect/jquery-customselect.js"></script>
    <script src="../Js/AssignAppraiser.js"></script>
    <link href="../Jquerycustomselect/jquery-customselect.css" rel="stylesheet" />
     <link href="../includes/css/font-awe.css" rel="stylesheet" />
    <script src="../includes/js/tooltips.js"></script>
    <link href="../includes/css/tooltips.css" rel="stylesheet" />
    <style>
        /*.custom-select {
            width: 231px !important;
        }*/

         .custom-select input {
            width: 220px !important;
        }

        .labeltxt {
            color: black;
            font-size: 15px;
            font-family: 'ProximaNova-Bold'
        }
        .labeltxtassign {
            color: black;
            font-size: 20px;
            font-family: 'ProximaNova-Bold'
        }
        .center {
          margin-left: 17%;
          width: 80%;
          padding: 10px;
        }
        /*input[type="submit"] {
         width: 86%;
         margin-left: 19%;
        }
         input[type="button"] {
         width: 83%;
        }*/

         .buttonsavereset{
            font-size: 14px;
            border: none;
            font-family: 'ProximaNova-Bold';
            color: #fff;
            padding: 5px 20px;
            margin: 10px auto;
            background-color: #428bca;
            text-align: center;
            display: block;
            border-radius: 3px;
            /*width: 90px*/
        }


    </style>
    <script type="text/javascript">


        $(document).ready(function () {

            $.fn.customSelect = function () {
                if ($(this).length) {
                    $(this).find('select').attr('selectedIndex', -1).bind('change.customSelect ', function () {
                        var optionText = $(this).find('option:selected').text();
                        $(this).siblings('label').text(optionText);
                    });
                }
            };
            fnSessionMangement(); //Added by Anupriya to call set interval function
            var usertype = '<%=Session["UserType"] %>';
            var userrole = '<%=Session["UserRole"] %>';

            if (usertype == "Lender" && userrole == "User") {
                $("#divlenderdetlist").hide();
            }
            else if (usertype == "Appraiser" && userrole == "Ind app without lender") {
                $("#divappraiserdetlist").hide();
                document.getElementById("divlenderdetlist").style.marginTop = "-19PX"
                $("#divborrowerdetlist").show();
            }
            else if (usertype == "Appraiser" && userrole == "Comp app without lender") {
                $("#divappraiserdetlist").show();
                $("#divborrowerdetlist").show();
            }
            else if (usertype == "Appraiser" && userrole == "Ind with lender") {
                $("#divlenderdetlist").hide();
            }
            else if (usertype == "Appraiser" && userrole == "Comp with lender") {
                $("#divlenderdetlist").hide();
            }

        });

        function loadpropclick() {
            var obj = $('#chkshowrejlist');
            $('#modalloading').modal('show');
            fnloadproplist($(obj).get(0));

            setTimeout(function () {
                $('#modalloading').modal('hide');
                $("#myddlvaluationID.custom-select").addClass("custom-select-open");
            }, 300);
        }


        function getusertyyype() {
            var UserType = '<%=Session["UserType"]%>';
            return UserType;
        }

        function fnloadproplist(elm) {
            var userid = '<%=Session["UserID"]%>';
            var UserType = '<%=Session["UserType"]%>';
            var ortype = '<%=Session["OrgType"]%>';
            var UserRole = '<%=Session["UserRole"]%>';
            //if (UserType == "Lender" || (UserType == "Appraiser" && UserRole == "Ind app without lender" && ortype == "Individual") || (UserType == "Appraiser" && UserRole == "Comp app without lender" && ortype == "Company")) {
            if (UserType == "Lender" || (UserType == "Appraiser" && UserRole == "Ind app without lender" && ortype == "Individual") || (UserType == "Appraiser" && UserRole == "Comp app without lender")) {
                if (elm.checked) {
                    $("#divborrowerdetlist").hide()
                    var obj = {
                        Rejapp: '1'
                    }
                    var getpropdesc = JSON.stringify(obj);
                    fngetRejvallist(getpropdesc);
                }
                else {
                    fnloadval();
                    $("#divborrowerdetlist").show()
                }
            }
            else if (UserType == "Appraiser" && ortype == "Company") {
                $("#divborrowerdetlist").hide()
                $("#lblValuationlist").html("Valuation List")
                $("#btnassignAppraiser").attr("onclick", "fnassgnApprr(event)");
                if (elm.checked) {
                    var obj = {
                        Rejapp: '1'
                    }
                    var getpropdesc = JSON.stringify(obj);
                    fngetRejvallist(getpropdesc);
                }
                else {
                    var obj = {
                        UserID: userid
                    }
                    var Userdet = JSON.stringify(obj);
                    fnApprovervaluation(Userdet);
                }

            }
        }

        function fnassgnApprr(e) {
            e.preventDefault();
            var Reassign = "";
            if (chkshowrejlist.checked == true) {
                Reassign = "1";
            }
            else {
                Reassign = "0";
            }
            if ($('#ddlAppraiserlist :selected').val() == 'none') {
                bootbox.dialog({
                    closeButton: true,
                    size: 'small',
                    message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> Select an Appraiser...</p>',
                });
                setTimeout(function () {
                    bootbox.hideAll();
                }, 2500);

               // bootbox.alert("Select an Appraiser")
            } else if ($('#ddlvaluationID :selected').val() == 'none') {
                bootbox.dialog({
                    closeButton: true,
                    size: 'small',
                    message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> Select a Property...</p>',
                });
                setTimeout(function () {
                    bootbox.hideAll();
                }, 2500);

               // bootbox.alert("Select a Property")
            } else {
                var Propdet = $('#ddlvaluationID :selected').val(); ddlvaluationID
                var selappraiserID = $('#ddlAppraiserlist :selected').val();
                selappraiserID = selappraiserID.split(",");
                var obj = {
                    AppraiserID: selappraiserID[0],
                    ValuationID: Propdet,
                    Reassign: Reassign

                }
                var appassign = JSON.stringify(obj);
                //alert(appassign)
                fncreateAppr(appassign);
            }

        }

        <%--    function fnassignApp(e) {
        e.preventDefault();
        if (chkshowrejlist.checked) {
            if ($('#ddlAppraiserlist :selected').val() == 'none') {
                bootbox.alert("Select a Appraiser")
            } else if ($('#ddlvaluationID :selected').val() == 'none') {
                bootbox.alert("Select a Property")
            } else {
                var Propdet = $('#ddlvaluationID :selected').val();
                Propdet = Propdet.split(',')
                var valuationID = Propdet[0];
                var borrowerID = Propdet[1];
                var propertyID = Propdet[2];
                var appraiserID = Propdet[3];
                //var selappraiserID = $('#ddlAppraiserlist :selected').val
                var appraisersplit = $('#ddlAppraiserlist :selected').val();
                appraisersplit = appraisersplit.split(',');
                var obj = {
                    BorrowerID: borrowerID,
                    UserID: '<%=Session["UserID"]%>',
                    AppraiserID: appraisersplit[0],
                    PropertyID: propertyID,
                    ValuationID: valuationID,
                    ApproverID: appraisersplit[1]
                }
                var appassign = JSON.stringify(obj);
                fnassignappraiser(appassign);
            }
    }
    else {
        if ($('#ddlborrowerlist :selected').val() == 'none') {
            bootbox.alert("Select a Borrower")
        } else if ($('#ddlvaluationID :selected').val() == 'none') {
            bootbox.alert("Select a Property")
        } else if ($('#ddlAppraiserlist :selected').val() == 'none') {
            bootbox.alert("Select a Appraiser")
        } else {
            var appraisersplit = $('#ddlAppraiserlist :selected').val();
            appraisersplit = appraisersplit.split(',');
            var obj = {
                BorrowerID: $('#ddlborrowerlist :selected').val(),
                UserID: '<%=Session["UserID"]%>',
                AppraiserID: appraisersplit[0],
                PropertyID: $('#ddlvaluationID :selected').val(),
                ApproverID: appraisersplit[1],
                ValuationID: ""
            }
            var appassign = JSON.stringify(obj);
            fnassignappraiser(appassign);
        }
}
}--%>

        function fnassignApp(e) {
           e.preventDefault();
            if (chkshowrejlist.checked) {
                if ($('#ddlAppraiserlist :selected').val() == 'none') {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'small',
                        message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> Select an Appraiser...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);

                    //bootbox.alert("Select an Appraiser")
                } else if ($('#ddlvaluationID :selected').val() == 'none') {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'small',
                        message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> Select a Property...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                   // bootbox.alert("Select a Property")
                } else {
                    var Propdet = $('#ddlvaluationID :selected').val();
                    Propdet = Propdet.split(',')
                    var valuationID = Propdet[0];
                    var borrowerID = Propdet[1];
                    var propertyID = Propdet[2];
                    var appraiserID = Propdet[3];
                    var appraisersplit = $('#ddlAppraiserlist :selected').val();
                    appraisersplit = appraisersplit.split(',');
                    var obj = {
                        BorrowerID: borrowerID,
                        UserID: '<%=Session["UserID"]%>',
                        AppraiserID: appraisersplit[0],
                        PropertyID: propertyID,
                        ValuationID: valuationID,<%--Added by Anupriya--%>
                        ApproverID: appraisersplit[1],
                        LenderID: '<%=Session["UserID"]%>',
                    }
                    var appassign = JSON.stringify(obj);
                    fnassignappraiser(appassign);
                }
            }
            else {
                var UserType = '<%=Session["UserType"]%>';
                var ortype = '<%=Session["OrgType"]%>';
                var UserRole = '<%=Session["UserRole"]%>';
                if (UserType == "Appraiser" && UserRole == "Ind app without lender" && ortype == "Individual") {
                    if ($('#ddlborrowerlist :selected').val() == 'none') {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'small',
                            message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> Select a Borrower...</p>',
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 2500);

                       // bootbox.alert("Select a Borrower")
                    } else if ($('#ddlvaluationID :selected').val() == 'none') {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'small',
                            message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> Select a Property...</p>',
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 2500);

                       // bootbox.alert("Select a Property")
                    } else if ($('#ddllenderlist :selected').val() == 'none') {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'small',
                            message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> Select a Lender...</p>',
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 2500);

                        //bootbox.alert("Select a Lender")
                    } else if ($('#refidtxtbox').val() == '') {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'medium',
                            message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please fill the Unique Reference ID...</p>',
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 2500);

                        //bootbox.alert("Please fill the unique Reference ID")<%--Added by Anupriya--%>
                    }
                    else {
                        var appraisersplit = "";
                        var obj = {
                            BorrowerID: $('#ddlborrowerlist :selected').val(),
                            UserID: '<%=Session["UserID"]%>',
                            AppraiserID: '<%=Session["UserID"]%>',
                            PropertyID: $('#ddlvaluationID :selected').val(),
                            ApproverID: '<%=Session["OrgType"]%>',
                            ValuationID: $('#refidtxtbox').val(),<%--Added by Anupriya--%>
                            LenderID: $('#ddllenderlist :selected').val(),
                            UserID: '<%=Session["UserID"]%>',
                        }
                        var appassign = JSON.stringify(obj);
                        fnassignappraiser(appassign);
                    }
                }

                if (UserType == "Appraiser" && UserRole == "Comp app without lender" && ortype == "Company") {
                    if ($('#ddlborrowerlist :selected').val() == 'none') {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'small',
                            message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> Select a Borrower...</p>',
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 2500);

                      //  bootbox.alert("Select a Borrower")
                    } else if ($('#ddlvaluationID :selected').val() == 'none') {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'small',
                            message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> Select a Property...</p>',
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 2500);

                       // bootbox.alert("Select a Property")
                    } else if ($('#ddllenderlist :selected').val() == 'none') {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'small',
                            message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> Select a Lender...</p>',
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 2500);

                       // bootbox.alert("Select a Lender")
                    } else if ($('#ddlAppraiserlist :selected').val() == 'none') {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'small',
                            message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> Select an Appraiser...</p>',
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 2500);


                       // bootbox.alert("Select an Appraiser")
                    } else if ($('#refidtxtbox').val() == '') {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'medium',
                            message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please fill the Unique Reference ID...</p>',
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 2500);


                        //bootbox.alert("Please fill the unique Reference ID")<%--Added by Anupriya--%>
                    }
                    else {
                        var appraisersplit = $('#ddlAppraiserlist :selected').val();
                        appraisersplit = appraisersplit.split(',');
                        var obj = {
                            BorrowerID: $('#ddlborrowerlist :selected').val(),
                            UserID: '<%=Session["UserID"]%>',
                            AppraiserID: appraisersplit[0],
                            PropertyID: $('#ddlvaluationID :selected').val(),
                            ApproverID: '<%=Session["OrgType"]%>',
                            ValuationID: $('#refidtxtbox').val(),<%--Added by Anupriya--%>
                            LenderID: $('#ddllenderlist :selected').val(),
                            UserID: '<%=Session["UserID"]%>',
                        }
                        var appassign = JSON.stringify(obj);
                        fnassignappraiser(appassign);
                    }
                }
                <%--if (UserType == "Appraiser" && UserRole == "Ind with lender" && ortype == "Individual") {
                    if ($('#ddlborrowerlist :selected').val() == 'none') {
                        bootbox.alert("Select a Borrower")
                    } else if ($('#ddlvaluationID :selected').val() == 'none') {
                        bootbox.alert("Select a Property")
                    } else if ($('#ddlAppraiserlist :selected').val() == 'none') {
                        bootbox.alert("Select a Appraiser")
                    }
                    else {
                        var appraisersplit = $('#ddlAppraiserlist :selected').val();
                        appraisersplit = appraisersplit.split(',');
                        var obj = {
                            BorrowerID: $('#ddlborrowerlist :selected').val(),
                            UserID: '<%=Session["UserID"]%>',
                            AppraiserID: appraisersplit[0],
                            PropertyID: $('#ddlvaluationID :selected').val(),
                            ApproverID: appraisersplit[1],
                            ValuationID: "",
                            LenderID: $('#ddllenderlist :selected').val(),
                            UserID: '<%=Session["UserID"]%>',
                        }
                        var appassign = JSON.stringify(obj);
                        fnassignappraiser(appassign);
                    }
                }
    --%>
                if (UserType == "Appraiser" && UserRole == "Comp with lender" && ortype == "Company") {
                    if ($('#ddlborrowerlist :selected').val() == 'none') {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'small',
                            message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> Select a Borrower...</p>',
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 2500);
                        //bootbox.alert("Select a Borrower")
                    } else if ($('#ddlvaluationID :selected').val() == 'none') {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'small',
                            message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> Select a Property...</p>',
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 2500);
                       // bootbox.alert("Select a Property")
                    } else if ($('#ddlAppraiserlist :selected').val() == 'none') {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'small',
                            message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> Select an Appraiser...</p>',
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 2500);
                        //bootbox.alert("Select an Appraiser")
                    } else if ($('#refidtxtbox').val() == '') {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'medium',
                            message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please fill the Unique Reference ID...</p>',
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 2500);
                       // bootbox.alert("Please fill the unique Reference ID") <%--Added by Anupriya--%>
                    }
                    else {
                        var appraisersplit = $('#ddlAppraiserlist :selected').val();
                        appraisersplit = appraisersplit.split(',');
                        var obj = {
                            BorrowerID: $('#ddlborrowerlist :selected').val(),
                            UserID: '<%=Session["UserID"]%>',
                            AppraiserID: appraisersplit[0],
                            PropertyID: $('#ddlvaluationID :selected').val(),
                            ApproverID: appraisersplit[1],
                            ValuationID: $('#refidtxtbox').val(),<%--Added by Anupriya--%>
                            LenderID: $('#ddllenderlist :selected').val(),
                            UserID: '<%=Session["UserID"]%>',
                        }
                        var appassign = JSON.stringify(obj);
                        fnassignappraiser(appassign);
                    }
                }
                if (UserType == "Lender" && UserRole == "User") {
                    if ($('#ddlborrowerlist :selected').val() == 'none') {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'small',
                            message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> Select a Borrower...</p>',
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 2500);

                       // bootbox.alert("Select a Borrower")
                    } else if ($('#ddlvaluationID :selected').val() == 'none') {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'small',
                            message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> Select a Property...</p>',
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 2500);

                       // bootbox.alert("Select a Property")
                    } else if ($('#ddlAppraiserlist :selected').val() == 'none') {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'small',
                            message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> Select an Appraiser...</p>',
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 2500);

                        //bootbox.alert("Select an Appraiser")
                    } else if ($('#refidtxtbox').val() == '') {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'medium',
                            message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> Please fill the Unique Reference ID...</p>',
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 2500);

                       // bootbox.alert("Please fill the unique Reference ID") <%--Added by Anupriya--%>
                    }
                else {
                    var appraisersplit = $('#ddlAppraiserlist :selected').val();
                    appraisersplit = appraisersplit.split(',');
                    var obj = {
                        BorrowerID: $('#ddlborrowerlist :selected').val(),
                        UserID: '<%=Session["UserID"]%>',
                        AppraiserID: appraisersplit[0],
                        PropertyID: $('#ddlvaluationID :selected').val(),
                        ApproverID: appraisersplit[1],
                        ValuationID: $('#refidtxtbox').val(), <%--Added by Anupriya--%>
                        LenderID: "",
                        UserID: '<%=Session["UserID"]%>',
                    }
                    var appassign = JSON.stringify(obj);
                    fnassignappraiser(appassign);
                }
            }
        }
    }



    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div>
        <div>

            <div class="modal-header-primary" align="center">
                <span class="sectionheader labeltxtassign" style="margin-left: -66px;">Assign Appraiser</span>
            </div>
        </div>
        <div id="divasgnAppraiserBdy" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 labeltxt transpdiv" style="padding-top: 0px; background-color: #ececec;">
            <div class ="center">
                <div class="row">
                <br />
                <br />
            </div>

            <div class="row labeltxt">
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 divmiddle">
                    <asp:Label ID="lblborrowerlist" runat="server" CssClass="labeltxt" Text="Borrower Name"></asp:Label>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12" id="divborrowerinfo">
                    <asp:DropDownList ID="ddlborrowerlist" runat="server" CssClass="form-control custom-select">
                        <asp:ListItem Text="Select Borrower" Value="none"></asp:ListItem>
                    </asp:DropDownList>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"></div>
            </div>

            <br />
            <div class="row labeltxt" id="divpropertydetlist">
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 divmiddle">
                    <asp:Label ID="lblValuationlist" runat="server" CssClass="labeltxt" Text="Property Description"></asp:Label>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12" id="divpropertyinfo">
                    <asp:DropDownList ID="ddlvaluationID" title="Text" runat="server" CssClass="form-control custom-select">
                        <asp:ListItem Text="Select Property" Value="none"></asp:ListItem>
                    </asp:DropDownList>
                </div>
                <%-- <div class="col-lg-2 col-md-2 col-sm-3 col-xs-6">
                            <asp:Button ID="Propertycreation" runat="server" Text="Property creation" CssClass="btn btnsave btn-block"  onclick="getPathFromUrl(); fnpageredirect('Appraisalpage.aspx','list_prop')" />
                        </div>--%>
                <%--onclick="getPathFromUrl(); fnpageredirect('Appraisalpage.aspx','list_prop')"--%>
                <%-- Property Add Changes--%>
                <%-- <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1" >
                 <button type="button" class="btn btn-sm btnsave"> 
                    <a  href="#" id="lbpropcreate"  class="anchortext" title="Create Property" onclick="getPathFromUrl(); fnpageredirect('Appraisalpage.aspx','list_prop')">+</a>                  
                  </button>
                  </div>--%>
                <div class="hidden-lg hidden-md col-sm-12 col-xs-12">
                </div>
                <div class="hidden-lg hidden-md col-sm-4 col-xs-4">
                </div>
                <%-- <div class="col-lg-2 col-md-2 col-sm-4 col-xs-11" id="divrejchkbox">--%>
                <div class="col-lg-4 col-md-4 col-sm-8 col-xs-11" id="divrejchkbox">
                    <asp:CheckBox ID="chkshowrejlist" runat="server" onclick="fnloadproplist(this)" />
                    <span></span>
                    <asp:Label ID="Label1" runat="server" CssClass="labeltxt" Text="Show Rejected Property"></asp:Label>
                </div>

            </div>
            <br />

            <div class="row labeltxt" id="divappraiserdetlist">
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 divmiddle">
                    <asp:Label ID="lblAppraiserlist" runat="server" CssClass="labeltxt" Text="Appraiser Name"></asp:Label>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12" id="divappraiserinfo">
                    <asp:DropDownList ID="ddlAppraiserlist" runat="server" CssClass="form-control custom-select">
                        <asp:ListItem Text="Select Appraiser" Value="none"></asp:ListItem>
                    </asp:DropDownList>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"></div>
            </div>
            <br />
            <div class="row labeltxt" id="divlenderdetlist">
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 divmiddle">
                    <asp:Label ID="Lbllenderlist" runat="server" CssClass="labeltxt" Text="Lender Name"></asp:Label>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12" id="divlenderinfo">
                    <asp:DropDownList ID="ddllenderlist" runat="server" CssClass="form-control custom-select">
                        <asp:ListItem Text="Select Lender" Value="none"></asp:ListItem>
                    </asp:DropDownList>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"></div>
            </div>
            <br />

            <div class="row labeltxt" id="divRefid">
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 divmiddle">
                    <asp:Label ID="Lblrefid" runat="server" CssClass="labeltxt" Text="Reference ID"></asp:Label>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12" id="divrefidinfo">
                    <asp:TextBox class="custom-select" ID="refidtxtbox" runat="server" placeholder="Provide Reference id" Style="padding: inherit; height: 31px;"></asp:TextBox>
                </div>
            </div>
            <br />
            <div>
                <div class="col-lg-4 col-md-3 col-sm-3 col-xs-3"></div>
                <div class="col-lg-5 col-md-8 col-sm-8 col-xs-12">
                    <div class="row labeltxt">
                        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <asp:Button ID="btnassignAppraiser" runat="server" Text="Assign Appraiser" CssClass="btn buttonsavereset" OnClientClick="fnassignApp(event)" />
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <button type="button" id="btnassigncancel" value="Back" class="btn buttonsavereset" onclick="resetcustomdrop()">Reset</button>
                        </div>
                        <%-- <div class="col-lg-2"></div>--%>
                    </div>

                </div>

                <div class="col-lg-3 col-md-1 col-sm-1 col-xs-1"></div>
            </div>


            <div class="row">
                <br />
                <br />
            </div>
            </div>
            
        </div>

            <div class="col-lg-1 col-md-1" style="display: none">
                <button type="button" class="btn btn-sm btnsave" onclick="fnback2que()"><span class="glyphicon glyphicon-backward">&nbsp;Back</span></button>
            </div>
 </div>
       <%-- </div>--%>
    
</asp:Content>
<%--    </form>
</body>
</html>--%>
