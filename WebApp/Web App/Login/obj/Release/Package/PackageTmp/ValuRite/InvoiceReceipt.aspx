<%@ Page Title="" Language="C#" MasterPageFile="~/PropertyApp.Master" AutoEventWireup="true" CodeBehind="InvoiceReceipt.aspx.cs" Inherits="Login.Invoice_Receipt" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <title>InvoiceReceipt Files - Here</title>
    <script src="../scripts/moment.min.js"></script>

    <script src="../Jquerycustomselect/jquery-customselect.js"></script>

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
    <script src="../includes/js/tooltips.js"></script>

    <link href="../includes/css/tooltips.css" rel="stylesheet" />
    <link href="../Jquerycustomselect/jquery-customselect.css" rel="stylesheet" />
    <link href="../includes/css/dataTables.fontAwesome.css" rel="stylesheet" />


    <script src="../bootstrap/DataTables-1.10.10/media/js/jquery.dataTables.min.js"></script>
    <script src="../bootstrap/DataTables-1.10.10/media/js/jquery.dataTables.js"></script>
    <script src="../Jquerycustomselect/jquery-customselect.js"></script>
    <script src="../includes/js/tooltips.js"></script>
    <script src="../Js/canvasjs.min.js"></script>
    <script src="../bootstrap/DataTables-1.10.10/media/js/dataTables.responsive.min.js"></script>
    <script src="../bootstrap/DataTables-1.10.10/media/js/responsive.bootstrap.min.js"></script>
    <script src="../MultiSelect/js/bootstrap-multiselect.js"></script>
    <link href="../MultiSelect/css/bootstrap-multiselect.css" rel="stylesheet" />


    <link href="../includes/css/font-awe.css" rel="stylesheet" />
    <style>
        td.details-control {
            background: url('../resources/details_open.png') no-repeat center center;
            cursor: pointer;
        }

        tr.shown td.details-control {
            background: url('../resources/details_close.png') no-repeat center center;
        }

        .hand {
            cursor: pointer;
        }
    </style>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#ddllendlist').multiselect({
                includeSelectAllOption: true
            });
        });
        fnSessionMangement(); //Added by Anupriya to call set interval function
    </script>
    <script type="text/javascript">



        /* Formatting function for row details - modify as you need */

        function fnEditChildrows(obj) {
            $(obj).closest('table').find('tbody tr').each(function () {
                if ($(this).hasClass('myeditable')) {
                    fnresetChildRow(this);
                }
            })

            var tr = $(obj).closest('tr');
            if (!$(tr).hasClass('myeditable')) {
                $(tr).addClass('myeditable')

                var paidDate = $(tr).find("td.PayDate").html();
                var PayDesc = $(tr).find("td.Paydesc").html();
                var PaidAmount = $(tr).find("td.currpaid").html();

                var datediv = '<div class="form-group" style="margin-bottom: 0px;">'
                                                + '<div class="input-group date mydate">'
                                                   + '<input type=text class=form-control value="' + paidDate + '" />'
                                                    + '<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>'
                                                + '</div>'
                                            + '</div>'

                $(tr).find("td.PayDate").replaceWith("<td class='PayDate'>" + datediv + "</td>");//+ $(this).text() + "</div>");
                $(tr).find("td.Paydesc").replaceWith("<td class='Paydesc'><textarea class='form-control Paydesc' style='resize: none; paymntdesc'>" + PayDesc + "</textarea></td>");
                $(tr).find("td.currpaid").replaceWith("<td class='currpaid'><input type=text class='form-control currpaid' value='" + PaidAmount + "' /></td>");


                $('.mydate').datetimepicker(
                    { maxDate: new Date(), format: 'MM/DD/YYYY' });
            }
        }

        function fnSaveChildRows(obj) {
            var tr = $(obj).closest('tr');
            if ($(tr).hasClass('myeditable')) {
                $(tr).removeClass('myeditable')

                //replacing individual input fields with div
                var paidDate = $(tr).find("td.PayDate .mydate").find('input').val()
                var PayDesc = $(tr).find("td.Paydesc .Paydesc").val();
                var PaidAmount = $(tr).find("td .currpaid").val();

                $(tr).find("td.PayDate").replaceWith("<td class='PayDate'>" + paidDate + "</td>");//+ $(this).text() + "</div>");
                $(tr).find("td.Paydesc .Paydesc").replaceWith(PayDesc);
                $(tr).find("td .currpaid").replaceWith(PaidAmount);

                //Reading the child rows data on save click
                setTimeout(function () {
                    var InvoiceID = $(obj).closest('table').attr('id');

                    var ReceiptHistoryJson = {}
                    var ReceiptHistory = [];
                    var testamountpaid = 0;
                    $(obj).closest('table').find('tbody').find('tr').each(function (index, divhtml) {
                        var obj = {};
                        $(divhtml).find('td').each(function (tdindex, tdhtml) {

                            if (tdindex == 0) {
                                obj["PaymentDate"] = tdhtml.innerText;
                            }
                            else if (tdindex == 1) {
                                obj["PaymentDescription"] = tdhtml.innerText;
                            }
                            else if (tdindex == 2) {
                                obj["AmountPaid"] = tdhtml.innerText;
                                testamountpaid += parseInt(obj["AmountPaid"])
                            }
                        })
                        ReceiptHistory.push(obj);
                    })
                    ReceiptHistoryJson["ReceiptHistory"] = ReceiptHistory;
                    ReceiptHistoryJson["InvoiceID"] = InvoiceID;
                    ReceiptHistoryJson["TotalPaidAmount"] = testamountpaid.toString();

                    var currtr = $("#" + InvoiceID).parent('td').parent('tr').prev()
                    var row = table.row(currtr);
                    var InvAmount = table.cell(row.index(), 1).data();
                    if (InvAmount > testamountpaid) {
                        var pendamount = InvAmount - testamountpaid;
                        table.cell(row.index(), 2).data(pendamount)
                        row.data().InvoiceDetails = ReceiptHistoryJson.ReceiptHistory;

                        ReceiptHistoryJson["UserID"] = '<%=Session["UserID"]%>';
                        ReceiptHistoryJson["AmountPending"] = pendamount.toString();
                        ReceiptHistoryJson = JSON.stringify(ReceiptHistoryJson);

                        $.ajax({
                            type: "POST",
                            url: "InvoiceReceipt.aspx/SaveChildRows",
                            data: ReceiptHistoryJson,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (response) {
                                if (response.d == 1) {
                                    bootbox.dialog({
                                        closeButton: true,
                                        size: 'medium',
                                        message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Invoice Receipt Updated Successfully...</p>',
                                    });
                                    setTimeout(function () {
                                        bootbox.hideAll();
                                    }, 1500);
                                   // bootbox.alert("Invoice Receipt Updated Successfully")
                                }
                                else {
                                    bootbox.dialog({
                                        closeButton: true,
                                        size: 'small',
                                        message: '<p class="text-center mb-0"><i class="fa fa-frown-o fa-lg"></i> Invoice Receipt Update Failed!</p>'
                                    });
                                    setTimeout(function () {
                                        bootbox.hideAll();
                                    }, 1500);
                             //bootbox.alert("Invoice Receipt Update Failed")
                                }
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                            },
                        });
                    }
                    else {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'medium',
                            message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> Amount Exceeding the Pending Amount...</p>',
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 2500);
                       // bootbox.alert("Amount Exceeding the Pending Amount")


                        $(tr).closest('td.hand').trigger('click');

                        $(tr).find("td.currpaid").html(PaidAmount);
                    }
                }, 500)
            }
            //alert($(obj).closest('table').attr('id'))            
        }

        function fnresetChildRow(obj) {
            var tr = $(obj).closest('tr');
            if ($(tr).hasClass('myeditable')) {
                $(tr).removeClass('myeditable')
                var paidDate = $(tr).find("td .mydate").find('input').val()
                var PayDesc = $(tr).find("td .Paydesc").val();
                var PaidAmount = $(tr).find("td .currpaid").val();

                var datediv = '<div class="form-group" style="margin-bottom: 0px;">'
                                               + '<div class="input-group date mydate">'
                                                  + '<input type=text class=form-control value="' + paidDate + '" />'
                                                   + '<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>'
                                               + '</div>'
                                           + '</div>'

                $(tr).find("td.PayDate").replaceWith("<td class='PayDate'>" + paidDate + "</td>");//+ $(this).text() + "</div>");
                $(tr).find("td .Paydesc").replaceWith(PayDesc);
                $(tr).find("td .currpaid").replaceWith(PaidAmount);
            }
        }

        //function fnclearChildRow(obj) {
        //    var tr = $(obj).closest('tr');
        //    if ($(tr).hasClass('myeditable')) {
        //        $(tr).find("td .mydate").find('input').val('')
        //        $(tr).find("td .Paydesc").html('');
        //        $(tr).find("td .currpaid").val('');
        //    }
        //}


        function format(d) {

            //alert(d.InvoiceID);
            if (d.hasOwnProperty('InvoiceDetails')) {
                var childtable = '<table style="width:100%" id="' + d.InvoiceNo + '">' +
                                  '<thead>' +
                                        '<tr>' +
                                            '<th style="width:18%">Payment Date</th>' +
                                            '<th style="width:28%">Payment Description</th>' +
                                            '<th style="width:18%">Amount Paid</th>' +
                                            '<th style="width:8%"><i class="fa fa-pencil-square-o hand" aria-hidden="true" title="Edit"></i></th>' +
                                            '<th style="width:8%"><i class="fa fa-floppy-o hand" aria-hidden="true" title="Save"></i></th>' +
                                        '</tr>' +
                                    '</thead>' +
                                    '<tbody>';
                for (var Invoicelen = 0; Invoicelen < d.InvoiceDetails.length; Invoicelen++) {

                    var date = new Date(d.InvoiceDetails[Invoicelen].PaymentDate);
                    childtable += '<tr>' +
                        '<td class="PayDate">' + (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear() + '</td>' +
                        //'<td class="PayDate">' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '</td>' +
                        '<td class="Paydesc">' + d.InvoiceDetails[Invoicelen].PaymentDescription + '</td>' +
                        '<td class="currpaid">' + d.InvoiceDetails[Invoicelen].AmountPaid + '</td>' +
                        '<td ><i class="fa fa-pencil-square-o hand" aria-hidden="true" onclick=fnEditChildrows(this) title="Edit"></i></td>' +
                        '<td><i class="fa fa-floppy-o hand" aria-hidden="true" onclick=fnSaveChildRows(this) title="Save"></i></td>' +
                    '</tr>';
                }
                childtable += '</tbody></table>';
                return childtable;
            }
            else {
                var childtable = '<table style="width:100%">' +
                                  '<thead>' +
                                        '<tr>' +
                                            '<th>Payment Description</th>' +
                                            '<th>Payment Date</th>' +
                                            '<th>Amount Paid</th>' +
                                        '</tr>' +
                                    '</thead>' +
                                    '<tbody>' +
                                    '<tr>' +
                                    '<td>No Records Found</td>' +
                                    '</tr></tbody</table>';
                return childtable;
            }
        }

        var table = ""; //global reference for Invoice Receipt datatable

        $(document).ready(function () {

            // Add event listener for opening and closing details
            $('#tblcontent').on('click', '#tblInvoiceReceipt tbody tr td.hand', function () {
                var tr = $(this).closest('tr');

                var row = table.row(tr);

                if (row.child.isShown()) {
                    row.child.hide();
                    tr.removeClass('shown');
                }
                else {
                    row.child(format(row.data())).show();
                    tr.addClass('shown');
                }
            });
        })

        function checkval(elem) {
            var status = 0;
            validator = $("#masterform").validate();
            $.validator.messages.required = '';

            $('textarea', $('#' + elem)).each(function () {
                try {
                    validator.element(this)
                    if (validator.element(this) == false) {
                        status = 1;
                    }
                }
                catch (exp) {
                    console.log("Element ID " + this.id + " --Exception -- " + exp)
                }
            });

            $('input', $('#' + elem)).each(function () {
                try {
                    validator.element(this)
                    if (validator.element(this) == false) {
                        status = 1;
                    }
                }
                catch (exp) {
                    console.log("Element ID " + this + " --Exception -- " + exp)
                }
            });
            return status;
        }

        //Save Invoice row
        function fnsaveInvoice(obj) {
            try {
                $('#modalloading').modal('show');
                var invoiceid = "";
                $(obj).addClass('notactive')
                //$(obj).prop('disabled', true);
                $(obj).parent('td').parent('tr').find('td .paydesc').attr('required', true);
                $(obj).parent('td').parent('tr').find('td .currpaid').attr('required', true);
                $(obj).parent('td').parent('tr').find('td').find('.PayDate').attr('required', true);

                var tr = $(obj).parent('td').parent('tr');
                tr = table.row(tr)

                var divstatus = checkval('tblInvoiceReceipt');
                if (divstatus == 1) {
                    //$(obj).attr('disabled', false);
                    $('#modalloading').modal('hide');
                    $(obj).removeClass('notactive')
                    $(obj).prop('disabled', false);
                    bootbox.dialog({
                        closeButton: true,
                        size: 'small',
                        message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please Enter Valid Values in the Highlighted Mandatory Field(s)...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                   // bootbox.alert("Enter Mandatory Fields")
                    $(obj).parent('td').parent('tr').find('td .paydesc').attr('required', false);
                    $(obj).parent('td').parent('tr').find('td .currpaid').attr('required', false);
                    $(obj).parent('td').parent('tr').find('td').find('.PayDate').attr('required', false);
                }
                else {
                    var Jsonobj = {}
                    Jsonobj["InvoiceID"] = $(obj).parent('td').parent('tr').find('td .invoiceid').attr('invoiceid');
                    // Jsonobj["InvoiceID"] = $(obj).parent('td').parent('tr').find('td .invoiceid').text();
                    invoiceid = Jsonobj["InvoiceID"]
                    Jsonobj["AmountPending"] = $(obj).parent('td').parent('tr').find('td .pendamt').val();
                    Jsonobj["PaymentDescription"] = $(obj).parent('td').parent('tr').find('td .paydesc').val();
                    Jsonobj["AmountPaid"] = $(obj).parent('td').parent('tr').find('td .currpaid').val();
                    Jsonobj["PaymentDate"] = $(obj).parent('td').parent('tr').find('td').find('.PayDate').val()
                    Jsonobj["UserID"] = '<%=Session["UserID"]%>';

                    Jsonobj = JSON.stringify(Jsonobj);


                    $.ajax({
                        type: "POST",
                        url: "InvoiceReceipt.aspx/UpdateInvoiceReceipt",
                        data: Jsonobj,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (response) {
                            $('#modalloading').modal('hide');
                            $(obj).removeClass('notactive')
                            if (response.d == "1") {
                                //alert(response.d)
                                var a = document.createElement('a');
                                a.target = '_blank';
                                a.href = '<%=Session["ServAddr"]%>' + "/" + '<%=Session["FolderPath"]%>' + "/" + invoiceid + ".pdf";
                                a.download = invoiceid + '.pdf';
                                document.body.appendChild(a);
                                a.click();
                      <%--  success: function (response) {
                            if (response.d == 1) {
                                var InvoiceID = response.d;
                                //$(obj).prop('disabled', false);
                                bootbox.alert("Invoice Receipt Generated Successfully");
                                var a = document.createElement('a');
                                a.target = '_blank';
                                 a.href = '<%=Session["ServAddr"]%>' + "/" + '<%=Session["FolderPath"]%>' + "/" + invoiceid + ".pdf";
                               // a.href = "http://192.168.2.203/" + InvoiceID + ".pdf";
                                a.download = InvoiceID + '.pdf';
                                document.body.appendChild(a);
                                a.click();--%>

                                msg = "<div style='font-weight:bold'>Invoice Receipt Generated Successfully <br /> InvoiceID :" + invoiceid + "<br/> Do you want to send Email? </div>";
                                $(function () {
                                    bootbox.dialog({
                                        closeButton: true,
                                        message: msg,
                                        buttons: {
                                            confirm: {
                                                label: "Yes",
                                                callback:
                                                    function () {
                                                        fnEmailInvoiceReceipt(Jsonobj)
                                                    }
                                            },
                                            cancel: {
                                                label: "No",
                                                callback: fnInvoiceReceipt,
                                            }
                                        }
                                    });
                                });

                                var Jsobj = {};
                                Jsonobj = JSON.parse(Jsonobj);
                                table.cell(tr.index(), 2).data(Jsonobj.AmountPending)
                                Jsobj["PaymentDate"] = Jsonobj.PaymentDate;
                                Jsobj["PaymentDescription"] = Jsonobj.PaymentDescription
                                Jsobj["AmountPaid"] = Jsonobj.AmountPaid
                                //.AmountPending

                                tr.data().InvoiceDetails.push(Jsonobj);
                            }
                            else {
                                //$(obj).prop('disabled', false);
                                bootbox.dialog({
                                    closeButton: true,
                                    size: 'small',
                                    message: '<p class="text-center mb-0"><i class="fa fa-frown-o fa-lg"></i> Receipt Generate Failed!</p>'
                                });
                                setTimeout(function () {
                                    bootbox.hideAll();
                                }, 1500);
                               // bootbox.alert("Receipt Generate Failed");
                            }
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            //$(obj).prop('disabled', false);
                            alert("Request: " + XMLHttpRequest.responseText + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                        },
                    })

                    $(obj).parent('td').parent('tr').find('td .paydesc').attr('required', false);
                    $(obj).parent('td').parent('tr').find('td .currpaid').attr('required', false);
                    $(obj).parent('td').parent('tr').find('td').find('.PayDate').attr('required', false);
                }
            }
            catch (ex) {
                //$(obj).attr('disabled', false);
                console.log(ex);
            }
        }

        //Reset Invoice row
        function fninvoicereset(obj) {
            try {
                $(obj).parent('td').parent('tr').find('td .paydesc').val("")
                $(obj).parent('td').parent('tr').find('td').find('.PayDate').val("")
                $(obj).parent('td').parent('tr').find('td .currpaid').val("0").trigger('change');
            }
            catch (ex) {
                console.log(ex);
            }
        }


        //Pending amount update
        function fncheckvalue(obj) {

            var tr = $(obj).closest('tr');
            var td = $(obj).parent('td');
            var row = table.row(tr);
            var rowdata = row.data(); //Json Object

            var amountPendingdata = parseInt(table.cell(table.row(tr).index(), 2).data()); //reading Amount Pending Column's Data

            var amountPaidnow = $(obj).val();

            if (amountPaidnow != "") {
                amountPaidnow = parseInt(amountPaidnow);
            }
            else {
                amountPaidnow = 0;
            }

            var amountPendUpdate = $(obj).parent('td').parent('tr').find('td .pendamt');

            if (amountPendingdata < amountPaidnow) {

                $(obj).val('0');
                bootbox.dialog({
                    closeButton: true,
                    size: 'medium',
                    message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> Amount Paid Exceeded the Pending Amount...</p>',
                });
                setTimeout(function () {
                    bootbox.hideAll();
                }, 2500);
               // bootbox.alert("Amount Paid Exceeded the Pending Amount")
            }
            else {
                $(amountPendUpdate).val(amountPendingdata - amountPaidnow);
            }

        }

        function fnInvoiceReceipt() {
            $('#modalloading').modal('show');

            var lenderid = $("#ddllendlist").val();

            if (lenderid == "none") {
                $("#tblcontent").html('');
                $('#modalloading').modal('hide');
                bootbox.dialog({
                    closeButton: true,
                    size: 'medium',
                    message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please Select a Lender...</p>',
                });
                setTimeout(function () {
                    bootbox.hideAll();
                }, 2500);
               // bootbox.alert("Please Select a Lender")
            }
            else {
                var obj = {
                    LenderID: $("#ddllendlist").val().toString()
                  <%--  UserID: '<%=Session["UserID"]%>'--%>
                }

                var jsonobj = JSON.stringify(obj);

                $.ajax({
                    type: "POST",
                    url: "InvoiceReceipt.aspx/InvoiceReceiptfile",
                    data: jsonobj,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {
                        var data = JSON.parse(response.d)

                        $("#tblcontent").html('');

                        var mytable = '<table id="tblInvoiceReceipt" class="table display table-striped table-bordered table-hover">'
                                         + '<thead>'
                                             + '<tr>'
                                               + '<th>Invoice ID</th>'
                                               + '<th>Invoice Amount</th>'
                                               + '<th>Pending Amount</th>'
                                               + '<th>Payment Description</th>'
                                               + '<th>Payment Date</th>'
                                               + '<th>Amount Paid</th>'
                                               + '<th><i class="fa fa-floppy-o" aria-hidden="true" title="Save"></i></th>'
                                               + '<th><i class="fa fa-refresh" aria-hidden="true" title="Clear"></i></th>'
                                             + '</tr>'
                                        + '</thead>'
                                    + '</table>';

                        $("#tblcontent").append(mytable);

                        table = $('#tblInvoiceReceipt').DataTable({
                            destroy: true,
                            retrieve: true,
                            data: data,
                            aoColumnDefs: [
                                   { "className": "dt-center", "targets": "_all" },
                                   {
                                       aTargets: [0],
                                       mRender: function (data, type, full) {
                                           return '<span class="invoiceid" invoiceid=' + data + '>' + data.split('-')[1] + '</span>'
                                       }
                                   },
                                   {
                                       aTargets: [1],
                                       mRender: function (data, type, full) {
                                           return '<input type="text" class="form-control invoiceamt" value="' + data + '" style="text-align:right;" disabled/>'
                                       }
                                   },
                                   {
                                       aTargets: [2],
                                       mRender: function (data, type, full) {
                                           return '<input type="text" class="form-control pendamt" value="' + data + '" style="text-align:right;" disabled/>'
                                       }
                                   },
                                   {
                                       aTargets: [3],
                                       mRender: function (data, type, full) {
                                           return '<textarea class="form-control paydesc" style="resize: none; paymntdesc"></textarea>'
                                       }
                                   },
                                   {
                                       aTargets: [4],
                                       mRender: function (data, type, full) {
                                           // return '<input type="text" class="form-control paydate" />'

                                           return '<div class="form-group" style="margin-bottom: 0px;">'
                                                    + '<div class="input-group date mydate">'
                                                       + '<input type="text" runat="server" class="form-control PayDate"/>'
                                                        + '<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>'
                                                    + '</div>'
                                                + '</div>'
                                       }
                                   },
                                   {
                                       aTargets: [5],
                                       mRender: function (data, type, full) {
                                           return '<input type="text" class="form-control currpaid" style="text-align:right;" onchange="fncheckvalue(this)"/>'
                                       }
                                   },
                                    {
                                        aTargets: [6],
                                        mRender: function (data, type, full) {
                                            return '<i class="fa fa-floppy-o hand" aria-hidden="true"  title="Save" fun="save" onclick=fnsaveInvoice(this)></i>'
                                        }
                                    },
                                    {
                                        aTargets: [7],
                                        mRender: function (data, type, full) {
                                            return '<i class="fa fa-refresh hand" aria-hidden="true"  title="Clear" fun="reset" onclick=fninvoicereset(this)></i>'
                                        }
                                    }
                            ],
                            columns: [
                                { data: 'InvoiceNo', className: "hand" },
                                { data: 'InvoiceAmount' },
                                { data: 'AmountPending' },
                                { data: null },
                                { data: null },
                                { data: null },
                                { data: null },
                                { data: null }
                            ]
                        });


                        $('#modalloading').modal('hide');
                        $('.mydate').datetimepicker({ maxDate: new Date(), format: 'MM/DD/YYYY' });
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        $('#modalloading').modal('hide');
                      //  alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                    },
                });
            }
        }
        function fnEmailInvoiceReceipt(Jsonobj) {

            Jsonobj["LenderID"] = $("#ddllendlist").val().toString();
            //LenderID: $("#ddllendlist").val()

            Jsonobj = JSON.stringify(Jsonobj);
            // alert(Jsonobj)
            $.ajax({
                type: "POST",
                url: "InvoiceReceipt.aspx/EmailReceipt",
                data: Jsonobj,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    if (response.d == "1") {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'medium',
                            message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Email Sent Successfully To Lender...</p>',
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 1500);
                       // bootbox.alert("Email Sent Successfully To Lender");
                        fnInvoiceReceipt();
                    }
                    else {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'medium',
                            message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> Email Not Sent Successfully To Lender...</p>',
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 2500);
                       // bootbox.alert("Email Not Sent Successfully To Lender");
                        fnInvoiceReceipt();
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $('#modalloading').modal('hide');
                    bootbox.alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
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
                    <div class="accordionShoHide" id="div_InvoiceReceipt" runat="server">
                        <div class="panel-default">
                            <div class="modal-header modal-header-primary" id="divinvoicereceipt">
                                <h4 class="panel-title" style="text-align: center;">
                                    <a class="accordion-toggle notactive" data-toggle="collapse" href="#divinvcont">
                                        <i class="indicator glyphicon custom-chevron-right"></i>&nbsp;
                                        <span class="sectionheader" id="spnAccordionHeader">Invoice Receipt</span> </a>
                                </h4>
                            </div>
                            <div id="divinvcont" class="panel-collapse accordionmain accordionshadow">
                                <div id="divexportbody" class="panel-body" style="display: block">
                                    <div class="row">
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-3">
                                                <label id="lbllendlist" class="sectionlabel">Lender List </label>
                                            </div>
                                            <div class="col-lg-3 col-md-3 col-sm-4 col-xs-6">
                                                <asp:DropDownList runat="server" ID="ddllendlist" Class="multiselect-ui form-control" data-toggle="tooltip" multiple="multiple"></asp:DropDownList>
                                            </div>
                                            <div class="col-lg-2 col-md-3 col-sm-3 col-xs-6">
                                                <button type="button" id="btngenfile" onclick="fnInvoiceReceipt()" class="btn btnsave">View Receipt List</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 table-responsive" id="tblcontent" style="height:430px !important; overflow-y:scroll">
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
