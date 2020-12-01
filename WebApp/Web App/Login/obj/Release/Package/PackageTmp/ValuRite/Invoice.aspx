<%@ Page Title="" Language="C#" MasterPageFile="~/PropertyApp.Master" AutoEventWireup="true" CodeBehind="Invoice.aspx.cs" Inherits="Login.Invoice_retrieve" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <title>Invoice Files - Here</title>
    <%--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>--%>
    <%--<script src="code.jquery.com/jquery-1.12.4.js"></script>--%>
    <script src="../bootstrap/DataTables-1.10.10/media/js/jquery.dataTables.min.js"></script>
    <script src="../bootstrap/DataTables-1.10.10/media/js/jquery.dataTables.js"></script>
    <script src="../bootstrap/DataTables-1.10.10/media/js/dataTables.responsive.min.js"></script>
    <script src="../bootstrap/DataTables-1.10.10/media/js/responsive.bootstrap.min.js"></script>

    <%--<script src="https://cdn.datatables.net/1.10.13/js/jquery.dataTables.min.js"></script>--%>

    <!--<link href="https://cdn.datatables.net/1.10.13/css/jquery.dataTables.min.css" rel="stylesheet" /> -->
    <link href="<%=ResolveUrl("~/scripts/bootstr_table.css") %>" rel="stylesheet" />
    <link href="../bootstrap/DataTables-1.10.10/media/css/dataTables.jqueryui.css" rel="stylesheet" />
    <link href="../bootstrap-3.3.6-dist/css/bootstrap-theme.css" rel="stylesheet" />
    <link href="../bootstrap/DataTables-1.10.10/media/css/dataTables.jqueryui.min.css" rel="stylesheet" />
    <link href="../bootstrap/DataTables-1.10.10/media/css/jquery.dataTables.css" rel="stylesheet" />
    <%--<script src="code.jquery.com/jquery-1.12.4.js"></script>--%>

    <script src="../scripts/moment.min.js"></script>
    <script src="../scripts/bootstrap-datetimepicker.min.js"></script>
    <script src="../Jquerycustomselect/jquery-customselect.js"></script>
    <link href="../Jquerycustomselect/jquery-customselect.css" rel="stylesheet" />
    <link href="../Content/bootstrap-datetimepicker.min.css" rel="stylesheet" />
    <link href="../includes/css/font-awe.css" rel="stylesheet" />
    <link href="../includes/css/dataTables.fontAwesome.css" rel="stylesheet" />

    <script src="../includes/js/tooltips.js"></script>
    <link href="../includes/css/tooltips.css" rel="stylesheet" />
    <link rel="stylesheet" href="../css/bootstrap.min.css" type="text/css" />
    <script type="text/javascript" src="../js/jquery.min.js"></script>
    <script type="text/javascript" src="../js/bootstrap.min.js"></script>

    <!-- Include the plugin's CSS and JS: -->
    <script src="../MultiSelect/js/bootstrap-multiselect.js"></script>
    <link href="../MultiSelect/css/bootstrap-multiselect.css" rel="stylesheet" />

    <script type="text/javascript">
        $(document).ready(function () {
            $('#ddllenderlist').multiselect({
                includeSelectAllOption: true
            });
        });

    </script>
    <script type="text/javascript">

        var table = "";
        $(document).ready(function () {
            $('#dtpickerstart').datetimepicker(
                { maxDate: new Date(), format: 'MM/DD/YYYY' }
            );
            $('#dtpickerend').datetimepicker({
                maxDate: new Date(), format: 'MM/DD/YYYY'
            });
            $("#dtpickerstart").on("dp.change", function (e) {
                $('#dtpickerend').data("DateTimePicker").minDate(e.date)
            });
            $("#dtpickerend").on("dp.change", function (e) {
                $('#dtpickerstart').data("DateTimePicker").maxDate(e.date);
            });
            fnSessionMangement(); //Added by Anupriya to call set interval function
            // $('#divInvoicecont').toggle();

            $('#Raisebutton').on('click', function () {
                //alert("Invoice raise clicked")
                $('#modalloading').modal('show');
                var Invoiceraise = [];
                var checkIds = [];
                var ValuationArr = [];
                var InvoiceAmount = 0;
                var check = 0;
                var rowschecked = false;
                var InvoiceArr = []
                var HasError = 0;
                table.$('tbody tr').each(function (index, rowhtml) {

                    var checked = $('input[type="checkbox"]:checked', rowhtml).length;
                    if (checked == 1) {
                        rowschecked = true;
                        var obj = {};
                        $(this).find('td').each(function (tdindex, tdhtml) {
                            if (tdindex == 1) {
                                ValuationArr.push($(tdhtml).html());
                            }
                           // Added the below block by Nirmala on 18th June 2019 --Start to check the validation and to add alert
                            else if (tdindex == 2) { // || tdindex == 3) {
                                obj["InvoiceAmt"] = $(tdhtml).find('input').val().trim();
                                InvoiceArr.push($(tdhtml).find('input').val().trim());
                                if (obj["InvoiceAmt"] == "") {
                                    bootbox.dialog({
                                        closeButton: true,
                                        size: 'medium',
                                        message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please enter the Invoice Amount...</p>',
                                    });
                                    setTimeout(function () {
                                        bootbox.hideAll();
                                    }, 2500);

                                   // bootbox.alert("Please enter the Invoice Amount");
                                    $('#modalloading').modal('hide');
                                    HasError = 1;
                                    var inv = $(tdhtml).find('input')[0];
                                    $(inv).addClass('error');
                                    return;
                                }
                                else {
                                    var inv = $(tdhtml).find('input')[0];
                                    $(inv).removeClass('error');
                                    return false;
                                }
                                if (obj["InvoiceAmt"] * 1 == NaN) {
                                    bootbox.dialog({
                                        closeButton: true,
                                        size: 'medium',
                                        message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please enter a valid number in " ' + (tdindex == 2) ? '"invoice amount"' : ' "GST" ' + ' " field...</p>',
                                    });
                                    setTimeout(function () {
                                        bootbox.hideAll();
                                    }, 3000);
                                  //  Bootbox.alert("Please enter a valid number in " + (tdindex == 2) ? "invoice amount" : "GST" + " field");
                                    HasError = 1;
                                    var inv = $(tdhtml).find('input')[0];
                                    $(inv).addClass('error');
                                    return;
                                }
                            }
                            //else if (tdindex == 3) {
                            //    obj["GST"] = $(tdhtml).find('input').val().trim();
                            //    if (obj["GST"] == "") {
                            //        bootbox.alert("Please enter the GST");
                            //        $('#modalloading').modal('hide');
                            //        HasError = 1;
                            //        $(tdhtml).find('input').addClass('error');
                            //        return;
                            //    }
                            //    if (obj["GST"] * 1 == NaN) {
                            //        bootbox.alert("Please enter a valid number in " + (tdindex == 2) ? "GST" : "GST" + " field");
                            //        HasError = 1;
                            //        $(tdhtml).find('input').addClass('error');
                            //        return;
                            //    }
                            //}
                            else if (tdindex == 4) {
                                InvoiceArr.push($(tdhtml).find('input').val().trim());
                                    InvoiceAmount += parseInt(obj["InvoiceAmt"]);
                            }
                         
                        })
                    }
                });//Reading Table Data
                if (HasError == 1)
                    return;
                if (rowschecked == false) {// || obj["InvoiceAmt"] == "") {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please Select ValuationID to Raise Invoice...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                  //  bootbox.alert("Please select ValuationID to raise invoice");
                    $('#modalloading').modal('hide');
                }
                else {
                     $('#modalloading').modal('hide');
                    Invoiceraise.push(obj);
                    var obj = {
                        ValuationID: ValuationArr.join(),
                        LenderID: $("#ddllenderlist").val().toString(),
                        Amount: InvoiceArr.join(),
                        InvoiceAmt: InvoiceArr.join()
                    }
                    var jsonobj = JSON.stringify(obj);
                    // --End
                    //alert(jsonobj);
                    Raisebutton
                    $.ajax({
                        type: "POST",
                        url: "Invoice.aspx/RaiseInvoicefile",
                        data: jsonobj,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (response) {
                            $('#modalloading').modal('hide');
                            jsonObj = JSON.parse(response.d);
                            if (jsonObj.Invoicestatus != "1" && response.d != "1") {
                                bootbox.dialog({
                                    closeButton: true,
                                    size: 'small',
                                    message: '<p class="text-center mb-0"><i class="fa fa-frown-o fa-lg"></i> Failed to Raise Invoice Property!</p>'
                                });
                                setTimeout(function () {
                                    bootbox.hideAll();
                                }, 1500);
                               // bootbox.alert("Failed to Raise Invoice Property");
                            }
                            else {
                                bootbox.dialog({
                                    closeButton: true,
                                    size: 'medium',
                                    message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Invoice Raised Successfully...</p>',
                                });
                                setTimeout(function () {
                                    bootbox.hideAll();
                                }, 1500);
                                // bootbox.alert("Invoice Raised Successfully ")

                                var InvoiceNo = jsonObj.InvoiceNo;
                                console.log(Invoice);
                                var a = document.createElement('a');
                                a.target = '_blank';
                                a.href = '<%=ConfigurationManager.AppSettings["ServerAddress"].ToString() %>'+"/Data/" + InvoiceNo + ".pdf";
                                a.download = InvoiceNo + '.pdf';
                                document.body.appendChild(a);
                                a.click();


                                //fnInvoice();

                                var InvoiceNo = jsonObj.InvoiceNo;
                                localStorage.setItem("InvoiceNo", InvoiceNo);

                                msg = "<div style='font-weight:bold'>Invoice Raised Successfully <br /> InvoiceID :" + jsonObj.InvoiceNo + "<br/> Do you want to send Email? </div>";

                                $(function () {
                                    bootbox.dialog({
                                        closeButton: true,
                                        message: msg,
                                        buttons: {
                                            confirm: {
                                                label: "Yes",
                                                callback: fnInvoicemail,

                                            },
                                            cancel: {
                                                label: "No",
                                                callback: fnInvoice,
                                            }
                                        }
                                    });
                                });
                                $('#modalloading').modal('hide');
                            }

                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            $('#modalloading').modal('hide');
                            bootbox.alert("Request: " + XMLHttpRequest.responseText + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                        },
                    });

                }
            });

        });


        function fnInvoice(pagebtn) {
            $("#refreshtable").html('');
            $("#refreshtable").append('<table id="invoicetable" class="display nowrap table" cellspacing="0" width="100%"></table>');

            $('#modalloading').modal('show');

            if ($("#ddllenderlist").val() == null) {
                bootbox.dialog({
                    closeButton: true,
                    size: 'medium',
                    message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please Select a Lender Name to Proceed...</p>',
                });
                setTimeout(function () {
                    bootbox.hideAll();
                }, 2500);
                //bootbox.alert("Please select a Lender name to proceed")
                $('#modalloading').modal('hide');
                return;
            }

            if ((($("#txtstartdate").val()) == "") || ($("#txtenddate").val()) == "") {
                var obj = {
                    fromdate: '',
                    todate: '',
                    LenderID: $("#ddllenderlist").val().toString()
                }
            }
            else if ((($("#txtstartdate").val()) != "") || ($("#txtenddate").val()) != "") {

                var parStartdate = Date.parse($("#txtstartdate").val())

                var parEnddate = Date.parse($("#txtenddate").val())

                var a = new Date(parStartdate);
                a.setDate(a.getDate() + 1);

                var b = new Date(parEnddate);
                b.setDate(b.getDate() + 1);

                var obj = {
                    fromdate: a.toISOString(),
                    todate: b.toISOString(),
                    LenderID: $("#ddllenderlist").val().toString()
                }
            }
            var jsonobj = JSON.stringify(obj);

            $.ajax({
                type: "POST",
                url: "Invoice.aspx/Invoicefile",
                data: jsonobj,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    $('#modalloading').modal('hide');
                    var data = response.d;
                    if (response.d == "0") {
                       if (pagebtn == "1") {
                           $("#Raisebutton").hide();
                           bootbox.dialog({
                               closeButton: true,
                               size: 'medium',
                               message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> No Records Available to Raise a Invoice...</p>',
                           });
                           setTimeout(function () {
                               bootbox.hideAll();
                           }, 2500);
                           // bootbox.alert("No records available to raise a invoice");
                        }
                        else {
                            $("#Raisebutton").hide();
                        }
                    }
                    else {
                        var jsonobj = JSON.parse(data);
                        $("#Raisebutton").show();
                        for (var i = 0; i < jsonobj.length; i++) {
                            var ValuationID = jsonobj[i].ValuationID;
                            var InvoiceAmt = jsonobj[i].hasOwnProperty('InvoiceAmt') ? jsonobj[i].InvoiceAmt : "";
                            var BorrowerName = jsonobj[i].BorrowerName;
                            $("#invoicetable").append('<tr>'
                                + '<td><input type=checkbox id="chckbox" /></td>'
                                + '<td>' + jsonobj[i].ValuationID + '</td>'
                                + '<td><input type="number" onkeyup="checkForTotal(this)" id="invoiceamtid" class="form-control" value="' + InvoiceAmt + '"></td>'
                                + '<td><input type="number" onkeyup="checkForTotal(this)" class="form-control" value=""></td>'
                                + '<td><input type="number" class="form-control" value="' + InvoiceAmt + '" disabled></td>'
                                + '<td>' + jsonobj[i].BorrowerName + '</td>'// onkeypress="return isNumberKey(event)"
                                + '</tr>');
                        }

                        table = $('#invoicetable').DataTable({
                            destroy: true, retrieve: true,
                            columns: [
                            { title: "Select" },
                            { title: "Valuation ID" },
                            { title: "Invoice Amount" },
                            { title: "GST" },
                            { title: "Total Amount" },
                            { title: "Borrower Name" }]

                        });
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $('#modalloading').modal('hide');
                    bootbox.alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                },
            });

        }

        function checkForTotal(thisRef) {
            var tr = $(thisRef).closest("tr");
            var totalAmnt = 0;
            tr.find("td").each(function (tdindex, tdhtml) {
                if (tdindex == 2 || tdindex == 3) {
                    totalAmnt += ($(tdhtml).find('input').val() * 1) != NaN ? $(tdhtml).find('input').val() * 1 : 0;
                }
            });
            tr.find("td:eq(4) input").val(totalAmnt);
        }

        function fnInvoicemail(InvoiceNo) {
            //alert("invoice")
            $('#modalloading').modal('show');
            var newobj = {
                LenderID: $("#ddllenderlist").val().toString(),
                InvoiceNo: localStorage.getItem("InvoiceNo"),
                UserID: '<%=Session["UserID"]%>'
            }
            var jsonobj = JSON.stringify(newobj);

            $.ajax({
                type: "POST",
                url: "Invoice.aspx/EmailInvoice",
                data: jsonobj,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    $('#modalloading').modal('hide');
                    if (response.d == "1") {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'medium',
                            message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Email Sent Successfully To Lender...</p>',
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 1500);
                      //  bootbox.alert("Email Sent Successfully To Lender");
                        fnInvoice();
                    }
                    else {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'small',
                            message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> Email Not Sent Successfully To Lender!</p>'
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 1500);
                       // bootbox.alert("Email Not Sent Successfully To Lender");
                        fnInvoice();
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    bootbox.alert("Request: " + XMLHttpRequest.responseText + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                },
            });
        }

    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
            <div class="row" id="divInvoice">
                <div class="">
                    <div class="accordionShoHide" id="div_export" runat="server">
                        <div class="panel-default">
                            <div class="modal-header modal-header-primary" id="divexportheader">
                                <h4 class="panel-title" style="text-align: center;">
                                    <a class="accordion-toggle notactive" data-toggle="collapse" href="#divexportcont">
                                        <i class="indicator glyphicon custom-chevron-right"></i>&nbsp;
                                        <span class="sectionheader" id="spnAccordionHeader">Invoice Generation</span> </a>
                                </h4>
                            </div>
                            <div id="divexportcont" class="panel-collapse accordionmain accordionshadow">
                                <div id="divexportbody" class="panel-body  jumbotron" style="display: block">
                                    <div class="row">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                            <div class="row" align="center" style="padding-top: 28px">

                                                <label id="lbllenderlist">Lender List: </label>
                                                <%-- <asp:DropDownList runat="server" ID="ddllenderlist" CssClass="form-control custom-select" data-toggle="tooltip">
                                                    <asp:ListItem Text="Select Lender" Value="none"></asp:ListItem>
                                                </asp:DropDownList>--%>
                                                <asp:DropDownList runat="server" ID="ddllenderlist" Class="multiselect-ui form-control" data-toggle="tooltip" multiple="multiple"></asp:DropDownList>
                                            </div>
                                        </div>

                                         <div class="col-lg-1 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <div class="row">
                                                &nbsp;
                                            </div>
                                            <div class="row" style="font-size: 18px; padding-top: 10px;"> <%--style="padding-top: 15px; padding-right: 10px; font-size: 18px"--%>
                                                <label id="lblchoosedt">Choose Date </label>
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-3 col-sm-12 col-xs-12">
                                            <div class="row" align="center">
                                                <label id="lblstartdate">From </label>
                                            </div>
                                            <div class="row">
                                                <div class="form-group" style="margin-right: 8px;margin-left: 5px;">
                                                    <div class='input-group date' id='dtpickerstart'>
                                                        <input type='text' runat="server" class="form-control" id="txtstartdate" />
                                                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>                                        
                                        <div class="col-lg-2 col-md-3 col-sm-12 col-xs-12">
                                            <div class="row" align="center">
                                                <label id="lblenddate">To </label>
                                            </div>
                                            <div class="row">
                                                <div class="form-group" style="margin-bottom: 0px;">
                                                    <div class='input-group date' id='dtpickerend'>
                                                        <input type='text' runat="server" class="form-control" id="txtenddate" />
                                                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                       <%--  <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                            <div class="row visible-lg visible-md" align="center" style="padding-top: 35px">
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-2 col-md-2 col-sm-5 col-xs-2"></div>
                                                <div class="col-lg-10 col-md-12 col-sm-7 col-xs-10 col-lg-push-3">
                                                    <label id="lblchoosedt">Choose Date: </label>
                                                </div>
                                            </div>
                                            <div class="row" align="center">
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                            <div class="row" align="center">
                                                <label id="lblstartdate">From: </label>
                                            </div>
                                            <div class="row" align="center">
                                                <div class="form-group">
                                                    <div class='input-group date' align="center" id='dtpickerstart'>

                                                        <input type='text' runat="server" align="center" class="form-control" id="txtstartdate" />
                                                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                            <div class="row" align="center">
                                                <label id="lblenddate">To: </label>
                                            </div>
                                            <div class="row" align="right">
                                                <div class="form-group">
                                                    <div class='input-group date' id='dtpickerend'>
                                                        <input type='text' runat="server" class="form-control" id="txtenddate" />
                                                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>--%>
                                    </div>

                                    <div class="row">
                                        <div class="col-lg-6 col-md-4 col-sm-12 col-xs-12 "></div>
                                        <div class="col-lg-4 col-md-5 col-sm-12 col-xs-12 ">
                                            <button type="button" id="btngenfile" onclick="fnInvoice('1')" class="btn btnsave">Submit</button>
                                        </div>
                                        <div class="col-lg-2"></div>
                                    </div>

                                    <div id="refreshtable" class="table-responsive" style="height:430px !important; overflow-y:scroll">
                                        <table id="invoicetable" class="display nowrap table" cellspacing="0" width="100%">
                                        </table>
                                    </div>
                                    <div>
                                        <button type="button" id="Raisebutton" value="RaiseInvoice" class="btn btnsave" style="display: none">RaiseInvoice</button>
                                    </div>
                                    <div class="modal fade in" id="modalloading" role="dialog" style="display: none">
                                        <div class="modal-dialog modal-md">
                                            <!-- Modal content-->
                                            <div class="modal-content">
                                                <div class="" style="">
                                                    <div class="col-lg-4">
                                                    </div>
                                                    <div class="col-lg-4" style="top: 180px;">
                                                        <asp:Image ID="LoadImage" runat="server" ImageAlign="AbsMiddle" ImageUrl="~/Images/1234uytutyu.gif" />
                                                    </div>
                                                    <div class="col-lg-4">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-1">
    </div>
</asp:Content>
