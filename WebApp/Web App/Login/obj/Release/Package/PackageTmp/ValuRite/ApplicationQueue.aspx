<%@ Page Language="C#" MasterPageFile="~/PropertyApp.Master" AutoEventWireup="true" ClientIDMode="Static" CodeBehind="ApplicationQueue.aspx.cs" Inherits="Login.ApplicationQueue1" EnableEventValidation="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <title>Application Queue</title>
    <script src="../bootstrap/DataTables-1.10.10/media/js/jquery.dataTables.min.js"></script>
    <script src="../bootstrap/DataTables-1.10.10/media/js/jquery.dataTables.js"></script>
    <script src="../Jquerycustomselect/jquery-customselect.js"></script>
    <script src="../includes/js/tooltips.js"></script>
    <script src="../Js/canvasjs.min.js"></script>
    <script src="../bootstrap/DataTables-1.10.10/media/js/dataTables.responsive.min.js"></script>
    <script src="../bootstrap/DataTables-1.10.10/media/js/responsive.bootstrap.min.js"></script>


    <link href="../bootstrap/DataTables-1.10.10/media/css/dataTables.jqueryui.css" rel="stylesheet" />
    <link href="../bootstrap-3.3.6-dist/css/bootstrap-theme.css" rel="stylesheet" />
    <link href="../bootstrap/DataTables-1.10.10/media/css/dataTables.jqueryui.min.css" rel="stylesheet" />
    <link href="../bootstrap/DataTables-1.10.10/media/css/jquery.dataTables.css" rel="stylesheet" />
    <link href="../bootstrap/DataTables-1.10.10/media/css/responsive.bootstrap.min.css" rel="stylesheet" />
    <%-- <link href="bootstrap/DataTables-1.10.10/media/css/dataTables.bootstrap4.min.css" rel="stylesheet" />--%>
    <link href="../Jquerycustomselect/jquery-customselect.css" rel="stylesheet" />
    <link href="../includes/css/tooltips.css" rel="stylesheet" />
    <link href="../includes/css/Customcss.css" rel="stylesheet" />
    <%-- <link href="http://code.jquery.com/ui/1.10.4/themes/ui-lightness/jquery-ui.css" rel="stylesheet" /> --%>
    <link href="../includes/css/font-awe.css" rel="stylesheet" />
    <link href="../includes/css/dataTables.fontAwesome.css" rel="stylesheet" />

    <%-- <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"></script> --%>
    <%-- <script src="https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap.min.css"></script> --%>

    <link href="<%=ResolveUrl("~/scripts/jq.css") %>" rel="stylesheet" />

    <link href="<%=ResolveUrl("~/scripts/bootstr.css") %>" rel="stylesheet" />

    <link href="<%=ResolveUrl("~/scripts/bootstr_table.css") %>" rel="stylesheet" />

    <script type="text/javascript">

        //Appraisal details
        var hdnnelem = "";
        var AppraisalStatusQ = "";
        var ValueID = "";
        var dataPoints = [];
        var curtype = "";
        var Usertype = '<%=Session["UserType"]%>';
        var OrgType = '<%=Session["OrgType"]%>';
        var obj = {
            Usertype: '<%=Session["UserType"]%>',
            UserID: '<%=Session["UserID"]%>',
            OrgType: '<%=Session["OrgType"]%>'
        }
        var usrid = JSON.stringify(obj);
        $(document).ready(function () {
            fnchkduphighlight()
            $("#btnApplicationQueue").addClass("highlight");
            $('#divheaderrow').hide();


        });
        fnSessionMangement(); //Added by Anupriya to call set interval function

    </script>
    <style>
        .btnblk {
            border-color: white;
            border-width: 1px;
            background-color: rgba(0,0,0,0.7);
            color: white;
        }

            .btnblk:hover {
                border-color: white;
                border-width: 1px;
                background-color: white;
                color: rgba(27,78,102,1);
            }

        .notactive {
            pointer-events: none;
            cursor: auto;
        }

        .center {
            margin-left: 17%;
            width: 80%;
            padding: 10px;
        }

        .ddlsize {
            width: auto;
        }

        .tdalign {
            width: 15%;
        }

         .tdalignimg {
            width: 8%;
        }
          .tdalignstat {
            width: 5%;
        }
          .tdalignpdf {
            width: 3%;
        }
          .labeltxtassign {
            color: black;
            font-size: 20px;
            font-family: 'ProximaNova'
        }

        /*body {
            margin: 0;
            padding: 20px;
            font-family: sans-serif;
        }

        * {
            box-sizing: border-box;
        }

        .table {
            width: 100%;
            border-collapse: collapse;
        }

            .table td, .table th {
                padding: 12px 15px;
                border: 1px solid #ddd;
                text-align: center;
                font-size: 16px;
            }

            /*.table th {
                background-color: darkblue;
                color: #ffffff;
            }

            .table tbody tr:nth-child(even) {
                background-color: #f5f5f5;
            }*/

        /*responsive*/

       /* @media(max-width: 500px) {
            .table thead {
                display: none;
            }

            .table, .table tbody, .table tr, .table td {
                display: block;
                width: 100%;
            }

                .table tr {
                    margin-bottom: 15px;
                }

                .table td {
                    text-align: right;
                    padding-left: 50%;
                    text-align: right;
                    position: relative;
                }

                    .table td::before {
                        content: attr(data-label);
                        position: absolute;
                        left: 0;
                        width: 50%;
                        padding-left: 15px;
                        font-size: 15px;
                        font-weight: bold;
                        text-align: left;
                    }
        }*/
    </style>
    <script type="text/javascript">
        var dat = "";
        var tittext = "";
        var chart;
        window.onload = function () {
            $('#modalloading').modal('show');
            fnloadpiechartLend(usrid);
            $('#modalloading').modal('hide');
            chart = new CanvasJS.Chart("chartContainer",
               {
                   title: {
                       text: "Valuation Dashboard",
                       titleFontWeight: "bold",
                       verticalAlign: "top",
                       horizontalAlign: "center",
                       fontColor: "#07354b",
                       fontFamily: "ProximaNova-Bold",
                       margin: 10,
                   },
                   animationEnabled: true,
                   legend: {
                       maxWidth: 500,
                       itemWidth: 120,
                       fontSize: 15,
                       fontFamily: "ProximaNova-Bold",
                       fontWeight: "bold",
                       verticalAlign: "bottom",
                       horizontalAlign: "center",
                       fontColor: "#07354b",

                   },
                   backgroundColor: "",
                   theme: "theme3",
                   data: [
                   {
                       indexLabelFontColor: "#1e5671",
                       type: "pie",
                       indexLabelFontFamily: "ProximaNova-Bold",
                       indexLabelFontSize: 15,
                       indexLabelFontWeight: "bold",
                       indexLabel: "{label} {y}%",
                       startAngle: -90,
                       showInLegend: true,
                       toolTipContent: "{label} {y}%",
                       click: function (e) {
                           if (Usertype == "Appraiser" && OrgType == "Company") {
                               //if (e.dataPoint.label == "Submitted to Approver" || e.dataPoint.label == "Rejected" || e.dataPoint.label == "Submitted" || e.dataPoint.label == "Rejected By Approver" || e.dataPoint.label == "Approved By Approver") {
                               fnloadappQ(e.dataPoint.label, '<%=Session["UserID"]%>');
                               //}
                           } else if (Usertype == "Appraiser") {
                               fnloadappQ(e.dataPoint.label, '<%=Session["UserID"]%>');
                           } else {
                               fnGetAppraisallen('<%=Session["UserID"]%>', e.dataPoint.label);
                           }
                       },
                       dataPoints: []
                   }
                   ]
               });
            // $('#modalloading').modal('hide');
        }
       function fndrawpie(dat) {
           var obj = JSON.parse(dat);
           if (obj.Total == 0) {
               bootbox.dialog({
                   closeButton: true,
                   size: 'medium',
                   message: '<p class="text-center mb-0"><i class="fa fa-info-circle fa-lg"></i> All the Records are in Approved Status,<br> Click Approved Application button to View those Records...</p>',
               });
               setTimeout(function () {
                   bootbox.hideAll();
               }, 1500);
              // bootbox.alert("All the Records are in Approved Status, Click Approved Application button to View those Records");
           }
           if (obj.Approved > 0) {
               $("#btnapprovedapps").attr('disabled', false)
           }
           //Chart contents for Appraiser
           if (Usertype == "Appraiser") {
               var assper = parseFloat(obj.Assigned * 100 / obj.Total).toFixed(1)
               assper = parseFloat(assper)
               if (assper > 0) {
                   dataPoints.push({ label: "Assigned", y: assper, legendText: "Assigned", color: "rgb(173,235,173)", cursor: 'pointer', exploded: false });
               }

               var inproper = parseFloat(obj.InProgress * 100 / obj.Total).toFixed(1)
               inproper = parseFloat(inproper)

               if (inproper > 0) {
                   dataPoints.push({ label: "InProgress", y: inproper, legendText: "InProgress", color: "rgb(255,235,153)", cursor: 'pointer', exploded: false });
               }

               var compper = parseFloat(obj.Completed * 100 / obj.Total).toFixed(1)
               compper = parseFloat(compper)

               if (compper > 0) {
                   dataPoints.push({ label: "Completed", y: compper, legendText: "Completed", color: "#f6ac58", cursor: 'pointer', exploded: false });
               }
               var sub2apper = parseFloat(obj.Submitted_to_Approver * 100 / obj.Total).toFixed(1)
               sub2apper = parseFloat(sub2apper)

               if (sub2apper > 0) {
                   dataPoints.push({ label: "Submitted to Approver", y: sub2apper, legendText: "Submitted to Approver", color: "#a8d7fa", cursor: 'pointer', exploded: false });
               }

               var ApprovedbyAppr = parseFloat(obj.Approved_By_Approver * 100 / obj.Total).toFixed(1)
               ApprovedbyAppr = parseFloat(ApprovedbyAppr)

               if (ApprovedbyAppr > 0) {
                   dataPoints.push({ label: "Approved By Approver", y: ApprovedbyAppr, legendText: "Approved By Approver", color: "#4542f4", cursor: 'pointer', exploded: false });
               }
               var rejbyAppr = parseFloat(obj.Rejected_By_Approver * 100 / obj.Total).toFixed(1)
               rejbyAppr = parseFloat(rejbyAppr)
               if (rejbyAppr > 0) {
                   dataPoints.push({ label: "Rejected By Approver", y: rejbyAppr, legendText: "Rejected By Approver", color: "#7d42f4", cursor: 'pointer', exploded: false });
               }
               var subper = parseFloat(obj.Submitted * 100 / obj.Total).toFixed(1)
               subper = parseFloat(subper)

               if (subper > 0) {
                   dataPoints.push({ label: "Submitted", y: subper, legendText: "Submitted", color: "#a8fbf1", cursor: 'pointer', exploded: false });
               }

               var Rejper = parseFloat(obj.Rejected * 100 / obj.Total).toFixed(1)
               Rejper = parseFloat(Rejper)
               if (Rejper > 0) {
                   dataPoints.push({ label: "Rejected", y: Rejper, legendText: "Rejected", color: "rgb(137, 84, 166)", cursor: 'pointer', exploded: false });
               }
           }
               //Chart contents for Lender
           else {
               var assper = parseFloat(obj.Assigned * 100 / obj.Total).toFixed(1)
               assper = parseFloat(assper)
               if (assper > 0) {
                   dataPoints.push({ label: "Assigned", y: assper, legendText: "Assigned", color: "rgb(173,235,173)", exploded: false });
               }

               var inproper = parseFloat(obj.InProgress * 100 / obj.Total).toFixed(1)
               inproper = parseFloat(inproper)

               if (inproper > 0) {
                   dataPoints.push({ label: "InProgress", y: inproper, legendText: "InProgress", color: "rgb(255,235,153)", exploded: false });
               }

               var compper = parseFloat(obj.Completed * 100 / obj.Total).toFixed(1)
               compper = parseFloat(compper)

               if (compper > 0) {
                   dataPoints.push({ label: "Completed", y: compper, legendText: "Completed", color: "#f6ac58", exploded: false });
               }

               var sub2apper = parseFloat(obj.Submitted_to_Approver * 100 / obj.Total).toFixed(1)
               sub2apper = parseFloat(sub2apper)
               if (sub2apper > 0) {
                   dataPoints.push({ label: "Submitted to Approver", y: sub2apper, legendText: "Submitted to Approver", color: "#a8d7fa", cursor: 'pointer', exploded: false });
               }

               var ApprovedbyAppr = parseFloat(obj.Approved_By_Approver * 100 / obj.Total).toFixed(1)
               ApprovedbyAppr = parseFloat(ApprovedbyAppr)

               if (ApprovedbyAppr > 0) {
                   dataPoints.push({ label: "Approved By Approver", y: ApprovedbyAppr, legendText: "Approved By Approver", color: "#4542f4", cursor: 'pointer', exploded: false });
               }

               var rejbyAppr = parseFloat(obj.Rejected_By_Approver * 100 / obj.Total).toFixed(1)
               rejbyAppr = parseFloat(rejbyAppr)

               if (rejbyAppr > 0) {
                   dataPoints.push({ label: "Rejected By Approver", y: rejbyAppr, legendText: "Rejected By Approver", color: "#7d42f4", cursor: 'pointer', exploded: false });
               }

               var subper = parseFloat(obj.Submitted * 100 / obj.Total).toFixed(1)
               subper = parseFloat(subper)
               if (subper > 0) {
                   dataPoints.push({ label: "Submitted", y: subper, legendText: "Submitted", color: "#a8fbf1", cursor: 'pointer', exploded: false });
               }

               var Rejper = parseFloat(obj.Rejected * 100 / obj.Total).toFixed(1)
               Rejper = parseFloat(Rejper)
               if (Rejper > 0) {
                   dataPoints.push({ label: "Rejected", y: Rejper, legendText: "Rejected", color: "rgb(137, 84, 166)", cursor: 'pointer', exploded: false });
               }
           }
           chart.options.data[0].dataPoints = dataPoints;
           chart.render();
           $('#modalloading').modal('hide');
       }

       function fnloadappQ(stat, apprID) {
           $('#modalloading').modal('show');
           var obj = {
               AppraiserID: apprID,
               AppraisalStatus: stat,
               OrgType: getorgtype()
           }
           var jsonobj = JSON.stringify(obj);
           fnloadappdetails(jsonobj)
           $('#divchart').hide();
           $('#divappdetailsContent').show();
       }

       function fnsearch() {
           if ($("#txtvaluationsearch").val() == "" && $("#ddlborrowersearch :selected").val() == "") {
               bootbox.dialog({
                   closeButton: true,
                   size: 'medium',
                   message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please Enter a Valuation ID / Select a Borrower </p>',
               });
               setTimeout(function () {
                   bootbox.hideAll();
               }, 2500);

              // bootbox.alert("Please Enter a Valuation ID / Select a Borrower ")
           }
           else {
               var obj = {
                   BorrowerID: $("#ddlborrowersearch :selected").val(),
                   AppraiserID: '<%=Session["UserID"]%>',
                   ValuationID: $("#txtvaluationsearch").val()
               }
               var jsonobj = JSON.stringify(obj);
               fnloadapprovedval(jsonobj);
           }
       }

       function fnloadapprovedval(jsonobj) {
           $.ajax({
               type: "POST",
               url: "ApplicationQueue.aspx/GetApprovedVal",
               data: jsonobj,
               contentType: "application/json; charset=utf-8",
               dataType: "json",
               success: function (response) {
                   //jsonObj = JSON.parse(response.d);
                   if (response.d == "0") {
                       $(function () {
                           bootbox.dialog({
                               closeButton: true,
                               size: 'small',
                               message: '<p class="text-center mb-0"><i class="fa fa-info-circle fa-lg"></i> No Records Found...</p>',
                           });
                           setTimeout(function () {
                               bootbox.hideAll();
                           }, 2500);
                          // bootbox.alert("No Records Found");
                       });
                   }
                   else {
                       fnloadApprovedlist(response.d)
                   }
               },
               error: function (XMLHttpRequest, textStatus, errorThrown) {
                   alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
               },
           });
       }

       function fnloadapprovedborr() {
           $.ajax({
               type: "POST",
               url: "ApplicationQueue.aspx/GetApprovedBorrower",
               data: {},
               contentType: "application/json; charset=utf-8",
               dataType: "json",
               success: function (response) {
                   try {
                       $('#ddlborrowersearch').empty()
                       $elem = $("#ddlborrowersearch").clone()
                       $('#ddlborrowersearch').remove()
                       $('#myddlborrowersearch').remove()
                       $elem.appendTo("#divddlborrowersearch")
                       var option = '<option value="">Select</option>';
                       $elem.append(option);
                   }
                   catch (exp) {
                       alert(exp)
                   }
                   jsonObj = JSON.parse(response.d);
                   if (response.d == "0") {
                       $(function () {
                           bootbox.dialog({
                               closeButton: true,
                               size: 'medium',
                               message: '<p class="text-center mb-0"><i class="fa fa-info-circle fa-lg"></i> No Approved Records Found...</p>',
                           });
                           setTimeout(function () {
                               bootbox.hideAll();
                           }, 2500);

                          // bootbox.alert("No Approved Records Found");
                       });
                   }
                   else {
                       $(function () {
                           var jsonresp = JSON.parse(response.d)
                           for (var i in jsonresp) {
                               var strtitle = "";
                               strtitle = "User ID : " + jsonresp[i].UserID + "<br />";
                               strtitle += "User Name : " + jsonresp[i].UserName + "<br />";
                               strtitle += "Address : " + jsonresp[i].Address.AddressLine1 + ", " + jsonresp[i].Address.AddressLine2 + "<br />";
                               var option = "<option title='" + strtitle + "' value='" + jsonresp[i].UserID + "'>" + jsonresp[i].UserName + "</option>"
                               $("#ddlborrowersearch").append(option);
                           }
                       });
                   }
                   $elem.addClass('custom-select')
                   $elem.customselect({
                   });
                   fncpyattr('ddlborrowersearch');
               },
               error: function (XMLHttpRequest, textStatus, errorThrown) {
                   alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
               },
           });
       }
       function fnloadApprovedlist(data) {
           var imgurl = "";
           $("#tblAppqueue tbody").empty()
           var chkusrtype = getusertypequeu()
           for (var i = 0; i < data.length; i++) {
               var ValueID = String(data[i].ValuationID);
               var assignedon = data[i].AssignDate.split('T');
               var curproptype = data[i].PropertyType;
               if (curproptype == "Land") {
                   //imgurl = '<%=Session["ServAddr"]%>' + "/" + '<%=Session["FolderPath"]%>' + "/land.png"
                   imgurl = "http://localhost" + "/" + "Data" + "/land.png"
               }
               else if (curproptype == "Apartment") {
                   //imgurl = '<%=Session["ServAddr"]%>' + "/" + '<%=Session["FolderPath"]%>' + "/apartment.png"
                   imgurl = "http://localhost" + "/" + "Data" + "/apartment.png"
               }
               else if (curproptype == "Building") {
                   // imgurl = '<%=Session["ServAddr"]%>' + "/" + '<%=Session["FolderPath"]%>' + "/building.png"
                   imgurl = "http://localhost" + "/" + "Data" + "/building.png"
               }
       var chkusrtype = getusertypequeu()
       var valuation_id = data[i].ValuationID
       valuation_id = (valuation_id.indexOf('-') != -1) ? valuation_id.split('-')[1] : valuation_id;

       if (chkusrtype == "Lender") {
           //alert()
           //$('#modalloading').modal('show');
           var AppStatus = '<select id ="ddlAppStatus" class=form-control ddlsize disabled=disabled tdalign"><option value="Approved">Approved</option ></select>';
           $("#tblAppqueue").append('<tr id="' + data[i].ValuationID + '"><td><a style="cursor: pointer; text-decoration: underline;" onclick="fnredirect(\'' + data[i].ValuationID + '\',' + data[i].PropertyID + ',\'' + data[i].BorrowerID + '\',\'' + data[i].BorrowerName + '\')">' + valuation_id + '</a> </td>'
           + "<td ><img class=img-responsive src='" + imgurl + "' alt=noImage/></td>"
           + "<td>" + data[i].Address + "</td>"
           + '<td>' + AppStatus + '</td>'
           + "<td>" + assignedon[0] + "</td>"
           + "<td>" + data[i].AppraiserName + "</td>"
           + "<td style='text-align:center'><a href='PreviewPage.aspx?ValID=" + data[i].ValuationID + "' target='_blank' style='cursor: pointer; text-decoration: underline;'><i class='fa fa-file-pdf-o'></i></td>"
           + "<td style='text-align:center;'><a style='cursor: pointer; text-decoration: underline;'><i class='fa fa-print' onclick=fnPDFprint('" + data[i].ValuationID + "')></i></td>"
           + "</tr>");
           //$('#modalloading').modal('hide');
       }
       else {
           //alert()
           //$('#modalloading').modal('show');
           var AppStatus = '<select id ="ddlAppStatus" class=form-control ddlsize disabled=disabled"><option value="Approved">Approved</option ></select>';
           $("#tblAppqueue").append('<tr id="' + data[i].ValuationID + '"><td><a style="cursor: pointer; text-decoration: underline;" onclick="fnredirect(\'' + data[i].ValuationID + '\',' + data[i].PropertyID + ',\'' + data[i].BorrowerID + '\',\'' + data[i].BorrowerName + '\')">' + valuation_id + '</a> </td>'
           + "<td ><img class=img-responsive src='" + imgurl + "' alt=noImage/></td>"
           + "<td>" + data[i].Address + "</td>"
           + '<td style="width: 15%;">' + AppStatus + '</td>'
           + "<td>" + assignedon[0] + "</td>"
           + "<td style='text-align:center'><a href='PreviewPage.aspx?ValID=" + data[i].ValuationID + "' target='_blank' style='cursor: pointer; text-decoration: underline;'><i class='fa fa-file-pdf-o'></i></td>"
           + "<td style='text-align:center;'><a style='cursor: pointer; text-decoration: underline;'><i class='fa fa-print' onclick=fnPDFprint('" + data[i].ValuationID + "')></i></td>"
           + "</tr>");
           //$('#modalloading').modal('hide');
       }
   }
    var chkusrtype = getusertypequeu()
    if (chkusrtype == "Lender") {
        $("#tblAppqueue").DataTable({
            destroy: true, retrieve: true,
            columns: [{ title: "Valuation ID" },
                      { title: "Property Type" },
                      { title: "Address" },
                      { title: "Status" },
                      { title: "Assigned on" },
                      { title: "Appraiser" },
                      { title: "PDF" },
                      { title: "Print" }]
        });
    }
    else {
        $("#tblAppqueue").DataTable({
            destroy: true, retrieve: true,
            columns: [{ title: "Valuation ID" },
                      { title: "Property Type" },
                      { title: "Address" },
                      { title: "Status" },
                      { title: "Assigned on" },
                      { title: "PDF" },
                      { title: "Print" }]

        });
    }
    $('#divchart').hide();
    $('#divappdetailsContent').show();
    $('#divSearchApprovedlist').hide()
}


function fnloadAppList() {
    $('#divchart').hide();
    $('#divappdetailsContent').hide();
    $('#divSearchApprovedlist').show()
    var chkusrtype = getusertypequeu()
    //alert(chkusrtype+" From load app")
    if (chkusrtype == "Appraiser") {
        fnloadapprovedborr();
    }
    else {
        fnloadapprovedborr();
    }
    $("#txtvaluationsearch").val('');
}
function fnclearapprval() {
    $("#txtvaluationsearch").val("");
}
function fnclearapprbor() {
    var $ddlbrwr;
    $ddlbrwr = $("#ddlborrowersearch").clone()
    $('#ddlborrowersearch').remove()
    $('#myddlborrowersearch').remove()
    $ddlbrwr.addClass('custom-select')
    $ddlbrwr.appendTo("#divddlborrowersearch")
    $ddlbrwr.customselect({
    });
    fncpyattr('ddlborrowersearch');
}

function fnapproveback() {
    window.location.href = "ApplicationQueue.aspx"
}

function resetbordrop() {
    //Reset Borrower Dropdown
    var $ddlbor;
    $ddlbor = $("#ddlborrowersearch").clone()
    $('#ddlborrowersearch').remove()
    $('#myddlborrowersearch').remove()
    $ddlbor.addClass('custom-select')
    $ddlbor.appendTo("#divddlborrowersearch")
    $ddlbor.customselect({
    });
    fncpyattr('ddlborrowersearch');
    $("#txtvaluationsearch").val('');
}
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row" id="divchart">
        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10" id="divapprovedapps">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div>
                        <button type="button" style="z-index: 10;" class="btn btn-sm btnshow" id="btnapprovedapps" onclick="fnloadAppList()" disabled="disabled" title="View Approved Application(s)">
                            <span class=" glyphicon glyphicon-check"></span>&nbsp; View Approved Application(s)</button>
                    </div>
                    <div id="chartContainer"style="height: 350px; width: 100%;">
                        <div style="width: 100%; background-color: rgb(27, 78, 102)"></div>
                    </div>
                </div>
                <div class="col-lg-1"></div>
            </div>
        </div>
    </div>


    <div id="divappdetailsContent" class="row" style="display: none;">
        <div class="modal-header-primary" align="center">
                <span class="sectionheader labeltxtassign" style="margin-left: -66px;">Appraisal List</span>
            </div>
        <div id="tblAppqueue_wrapper" class="dataTables_wrapper no-footer" style="margin: 20px";>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <table id="tblAppqueue" class="table table-striped table-bordered labeltxt" cellspacing="0">
                <%--<table id="tblAppqueue">--%>
                    <thead>
                    </thead>
                </table>
            </div>
        </div>
        
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="col-lg-2 col-md-2 col-xs-2 col-sm-2">
            </div>
            <div class="col-lg-6 col-md-6 col-xs-6 col-sm-6">
                <img src= "http://localhost/Data/land.png" / style="height:55px;" ><span style="font-size: 12pt; margin-left: 8px; color: #263038; font-family: 'ProximaNova-Bold'; font-weight: bold;">Land</span>
                <img src= "http://localhost/Data/building.png" / style="height:55px;"><span style="font-size: 12pt; color: #263038; font-family: 'ProximaNova-Bold'; font-weight: bold;">Building</span>
                <img src= "http://localhost/Data/apartment.png" / style="height:55px;"><span style="font-size: 12pt; color: #263038; font-family: 'ProximaNova-Bold'; font-weight: bold;">Apartment</span>
            </div>
            <div class="col-lg-1 col-md-1 col-xs-1 col-sm-1">
                <button class="btn btn-lg btnsave" id="btnshowchart" onclick="$('#divchart').show();$('#divappdetailsContent').hide();">
                    <span class="glyphicon glyphicon-stats"></span>&nbsp;Show Chart
                </button>
            </div>
        </div>
    </div>


    <div id="divSearchApprovedlist" style="display: none; background-color: rgba(255, 255, 255, 0.1);" class="row labeltxt">
        <div class="col-lg-1">
        </div>
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 transpdiv labeltxt" style="box-shadow: 2px 2px 10px 2px rgba(0,0,0,0.3);">

            <div class="row">
                <div class="text-center titlefont row headerdiv " style="margin-left: 0px; margin-right: 0px;">
                    <span class="pageheader">Approved Application(s)</span>
                </div>
                <div class="col-lg-1 col-md-1"></div>
                <div class="col-lg-3" style="display: none">
                    <button class="btn btnsave" onclick="fnapproveback()">
                        <span class="glyphicon glyphicon-chevron-left"></span>Back
                    </button>
                </div>
            </div>
            <div class="row padrow"></div>
            <div class="row padrow"></div>
            <div class="row padrow"></div>
            <div class="row  contfont">
                <div class="col-lg-2 col-md-1 col-sm-2 col-xs-2">
                </div>
                <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                    <asp:Label ID="lblvaluationsearch" runat="server" Text="Search By Valuation ID:"></asp:Label>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <asp:TextBox ID="txtvaluationsearch" runat="server" CssClass="form-control" onkeyup="fnclearapprbor()" Style="width: 198px;" onblur="fnclearapprbor()"></asp:TextBox>
                </div>
                <div class="col-lg-1">
                </div>
            </div>
            <div class="row contfont">
                <div class="col-lg-2 col-md-1 col-sm-2 col-xs-12">
                </div>
                <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                    <asp:Label runat="server" ID="lblApprovalor">(Or)</asp:Label>
                </div>
                <div class="col-lg-8"></div>
            </div>
            <div class="row  padrow contfont">
                <div class="col-lg-2 col-md-1 col-sm-2 col-xs-12">
                </div>
                <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                    <asp:Label ID="lblborrowerid" runat="server" Text="By Borrower ID:"></asp:Label>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12" id="divddlborrowersearch">
                    <asp:DropDownList ID="ddlborrowersearch" CssClass="form-control custom-select" runat="server" onchange="fnclearapprval()">
                        <asp:ListItem Text="Select" Value=""></asp:ListItem>
                    </asp:DropDownList>
                </div>
                <div class="col-lg-1">
                </div>
            </div>
            <div class="row padrow">
                <div class="col-lg-4 col-md-4 col-sm-2 col-xs-12">
                </div>
                <div class="col-lg-5 col-md-5 col-sm-10 col-xs-12">
                    <button type="button" onclick="fnsearch()" class="btn btnsave"><span class="glyphicon glyphicon-search"></span>&nbsp;Search</button>
                    <button type="button" class="btn btnsave" onclick="resetbordrop()"><span class="glyphicon glyphicon-refresh"></span>&nbsp;Reset</button>
                </div>
                <div class="col-lg-5"></div>
            </div>
            <div class="row padrow"></div>
            <div class="row padrow"></div>
        </div>
    </div>

    <div style="display: none">
        <iframe src="" id="testFrame"></iframe>
    </div>
</asp:Content>
