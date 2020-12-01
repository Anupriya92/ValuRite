<%@ Page Title="" Language="C#" MasterPageFile="~/PropertyApp.Master" AutoEventWireup="true" CodeBehind="AgingReport.aspx.cs" Inherits="Login.ValuRite.AgingReport" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <title>Aging Report - Here</title>
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
        var table = "";
        $(document).ready(function () {

            // Add event listener for opening and closing details
            $('#tbcontent').on('click', '#tbAgingReport tbody tr td.hand', function () {

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
        fnSessionMangement(); //Added by Anupriya to call set interval function
        function format(CurrentLender) {


            // $(this).parent().parent().remove();

            //if (CurrentLender.hasOwnProperty('CurrentLender')) {
            var childlendertable = '<table style="width:100%" id="' + CurrentLender.LenderName + '">' +
                                  '<thead>' +
                                        '<tr>' +
                                            '<th style="width:18%">Invoice No</th>' +
                                            '<th style="width:28%">Invoice Date</th>' +
                                            '<th style="width:18%">Invoice  Amount</th>' +
                                              '<th style="width:18%">Paid Amount</th>' +
                                                '<th style="width:18%">Outstanding Amount</th>' +
                                        '</tr>' +
                                    '</thead>' +
                                    '<tbody>';


            for (var outstandlen = 0; outstandlen < CurrentLender.InvoiceReceipt.length; outstandlen++) {
                var date = new Date(CurrentLender.InvoiceReceipt[outstandlen].InvoiceDate);

                childlendertable += '<tr>' +
                    '<td class="invno">' + CurrentLender.InvoiceReceipt[outstandlen].InvoiceNo + '</td>' +
                    '<td class="invdate">' + (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear() + '</td>' +
                    //'<td class="Paydesc">' + l.CurrentLender[outstandlen].InvoiceDate + '</td>' +
                    '<td class="invamt">' + CurrentLender.InvoiceReceipt[outstandlen].InvoiceAmount + '</td>' +
                     '<td class="paidamt">' + CurrentLender.InvoiceReceipt[outstandlen].TotalReceivedAmount + '</td>' +
                      '<td class="outstamt">' + CurrentLender.InvoiceReceipt[outstandlen].AmountPending + '</td>' +

                '</tr>';
            }

            childlendertable += '</tbody></table>';
            return childlendertable;
        }


        // alert(JSON.stringify(finalresult) + "Final json object to build table ")

        var jsonobj = {
            UserID: '<%=Session["UserID"]%>'
        }

        jsonobj = JSON.stringify(jsonobj);


        $.ajax({
            type: "POST",
            url: "AgingReport.aspx/getOutstanding",
            data: jsonobj,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                debugger;
                var responsedata = JSON.parse(response.d)


                //var finaltabledata = [];
                //for (var i = 0; i < responsedata.length; i++) {
                //    if (finaltabledata.length != 0) {
                //        for (var j = 0; j < finaltabledata.length; j++) {
                //            if (finaltabledata[j].LenderName == responsedata[i].LenderName) {
                //                finaltabledata[j].InvoiceAmount = parseInt(finaltabledata[j].InvoiceAmount) + parseInt(responsedata[i].InvoiceAmount);
                //                finaltabledata[j].TotalReceivedAmount = parseInt(finaltabledata[j].TotalReceivedAmount) + parseInt(responsedata[i].TotalReceivedAmount);
                //                finaltabledata[j].AmountPending = parseInt(finaltabledata[j].AmountPending) + parseInt(responsedata[i].AmountPending);
                //            }
                //            else {
                //                j++;
                //                finaltabledata[j] = responsedata[i];
                //                j--;
                //            }
                //        }
                //    }
                //    else {
                //        finaltabledata[i] = responsedata[i];
                //    }
                //}

                var LenderNames = []
                var finalresult = []

                for (var i = 0; i < responsedata.length; i++) {

                    if (LenderNames.indexOf(responsedata[i].LenderName) < 0) {
                        LenderNames.push(responsedata[i].LenderName)
                    }

                }

                for (var i = 0; i < LenderNames.length; i++) {
                    var lendname = LenderNames[i];
                    var InvoiceAmount = 0;
                    var TotalReceivedAmount = 0;
                    var AmountPending = 0;
                    var Invoicenum = 0;
                    var Invoicedate = 0;

                    var days30 = 0;
                    var days60 = 0;
                    var days90 = 0;
                    var days90gr = 0;

                    var invoicereceipt = [];

                    for (j = 0; j < responsedata.length; j++) {

                        if (lendname == responsedata[j].LenderName) {
                            InvoiceAmount = InvoiceAmount + parseInt(responsedata[j].InvoiceAmount);
                            TotalReceivedAmount = TotalReceivedAmount + parseInt(responsedata[j].TotalReceivedAmount);
                            AmountPending = AmountPending + parseInt(responsedata[j].AmountPending);


                            var obj = {}

                            obj["InvoiceNo"] = responsedata[j].InvoiceNo;
                            obj["InvoiceDate"] = new Date(responsedata[j].InvoiceDate);
                            obj["InvoiceAmount"] = parseInt(responsedata[j].InvoiceAmount);
                            obj["TotalReceivedAmount"] = parseInt(responsedata[j].TotalReceivedAmount);
                            obj["AmountPending"] = parseInt(responsedata[j].AmountPending);

                            invoicereceipt.push(obj);
                            var daydiff = parseInt(new Date(new Date() - new Date(responsedata[j].InvoiceDate)) / (1000 * 60 * 60 * 24))


                            if (daydiff >= 0 && daydiff < 30) {
                                days30 = parseInt(responsedata[j].AmountPending)
                            }
                            if (daydiff >= 30 && daydiff < 60) {
                                days60 = parseInt(responsedata[j].AmountPending)
                            }
                            if (daydiff >= 60 && daydiff < 90) {

                                days90 = parseInt(responsedata[j].AmountPending)
                            }
                            if (daydiff >= 90) {

                                days90gr = parseInt(responsedata[j].AmountPending)
                            }
                        }
                    }
                    var obj = {}

                    obj["LenderName"] = lendname;
                    obj["InvoiceAmount"] = InvoiceAmount;
                    obj["TotalReceivedAmount"] = TotalReceivedAmount;
                    obj["AmountPending"] = AmountPending;
                    obj["days30"] = days30;
                    obj["days60"] = days60;
                    obj["days90"] = days90;
                    obj["days90gr"] = days90gr;
                    obj["InvoiceReceipt"] = invoicereceipt;

                    finalresult.push(obj);

                }



                $("#tbcontent").html('');

                var mytable = '<table id="tbAgingReport" class="table display table-striped table-bordered table-hover">'
                               + '<thead>'
                                     + '<tr>'
                                     + '<th>Lender Name</th>'
                                      + '<th>Invoiced Amount</th>'
                                      + '<th>Paid  Amount</th>'
                                     + '<th>Outstanding Amount</th>'
                                     + '<th>O/S upto 30 days</th>'
                                     + '<th>30-60 days</th>'
                                      + '<th>60-90 days</th>'
                                      + '<th>>90 days</th>'
                                      + '<th><i class="fa fa-file-pdf-o" aria-hidden="true" title="PDF"></i></th>'
                                      + '<th><i class="fa fa-file-excel-o" aria-hidden="true" title="Excel"></i></th>'
                                   + '</tr>'
                              + '</thead>'
                          + '</table>';

                $("#tbcontent").append(mytable);


                table = $('#tbAgingReport').DataTable({
                    destroy: true,
                    retrieve: true,
                    data: finalresult,
                    aoColumnDefs: [
                { "className": "dt-center", "targets": "_all" },

                 {
                     aTargets: [8],
                     mRender: function (data, type, full) {
                         return '<i class="fa fa-file-pdf-o" aria-hidden="true" title="PDF" fun="PDF" onclick=fnoutstanding(this)></i>'
                     }
                 },
                 {
                     aTargets: [9],
                     mRender: function (data, type, full) {
                         return '<i class="fa fa-file-excel-o" aria-hidden="true"  title="Excel" fun="Excel" onclick=fnexceloutstanding(this) ></i>'
                     }
                 },
                    ],

                    columns: [
                        { data: 'LenderName', className: "hand" },
                        { data: 'InvoiceAmount' },
                        { data: 'TotalReceivedAmount' },
                        { data: 'AmountPending' },
                        { data: 'days30' },
                        { data: 'days60' },
                        { data: 'days90' },
                        { data: 'days90gr' },
                        { data: null },
                        { data: null },

                    ]
                });
            },

            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
            },
        });




        function fnoutstanding(obj) {
            $('#modalloading').modal('show');
            var Jsonobj = {}
            //var str = document.getElementById("LenderName").innerHTML;
            //var res = str.replace(" ", "_");
            //document.getElementById("LenderName").innerHTML = res;

            Jsonobj["LenderName"] = $(obj).parent('td').parent('tr').find('td:eq(0)').text();
            Jsonobj["InvoiceAmount"] = $(obj).parent('td').parent('tr').find('td:eq(1)').text();
            Jsonobj["TotalReceivedAmount"] = $(obj).parent('td').parent('tr').find('td:eq(2)').text();
            Jsonobj["AmountPending"] = $(obj).parent('td').parent('tr').find('td:eq(3)').text();
            Jsonobj["days30"] = $(obj).parent('td').parent('tr').find('td:eq(4)').text();
            Jsonobj["days60"] = $(obj).parent('td').parent('tr').find('td:eq(5)').text();
            Jsonobj["days90"] = $(obj).parent('td').parent('tr').find('td:eq(6)').text();
            Jsonobj["days90gr"] = $(obj).parent('td').parent('tr').find('td:eq(7)').text();

            Jsonobj = JSON.stringify(Jsonobj);


            $.ajax({
                type: "POST",
                url: "AgingReport.aspx/Outstanding",
                data: Jsonobj,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    $('#modalloading').modal('hide');
                    if (response.d == 1) {
                        //var LenderName = response.d;
                        var newstr = $(obj).parent('td').parent('tr').find('td:eq(0)').text()
                        newstr = newstr.replace(/\s/g, "_");

                        var date = new Date()
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        dt = date.getDate();

                        if (dt < 10) {
                            dt = '0' + dt;
                        }
                        if (month < 10) {
                            month = '0' + month;
                        }

                        //alert(dt + '-' + month + '-' + year);
                        var dateformate = dt + '-' + month + '-' + year;
                        //date = date.replace(/\s/g, "_");
                        //date.getDate()+ '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
                        bootbox.dialog({
                            closeButton: true,
                            size: 'medium',
                            message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Oustanding Invoice Generated Successfully...</p>',
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 1500);
                       // bootbox.alert("Oustanding Invoice Generated Successfully");
                        var a = document.createElement('a');
                        a.target = '_blank';
                        a.href = "<%=ConfigurationManager.AppSettings["ServerAddress"] %>/Data/" + newstr + dateformate + ".pdf";
                        a.download = newstr + dateformate + '.pdf';
                        document.body.appendChild(a);
                        a.click();
                    }
                    else {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'small',
                            message: '<p class="text-center mb-0"><i class="fa fa-frown-o fa-lg"></i> Report Generate Failed!</p>'
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 1500);
                       // bootbox.alert("Receipt Generate Failed");
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $('#modalloading').modal('hide');
                    alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                },
            })
        }


        function fnexceloutstanding(obj) {
            $('#modalloading').modal('show');
            var Jsonobj = {}
            Jsonobj["LenderName"] = $(obj).parent('td').parent('tr').find('td:eq(0)').text();
            Jsonobj["InvoiceAmount"] = $(obj).parent('td').parent('tr').find('td:eq(1)').text();
            Jsonobj["TotalReceivedAmount"] = $(obj).parent('td').parent('tr').find('td:eq(2)').text();
            Jsonobj["AmountPending"] = $(obj).parent('td').parent('tr').find('td:eq(3)').text();
            Jsonobj["days30"] = $(obj).parent('td').parent('tr').find('td:eq(4)').text();
            Jsonobj["days60"] = $(obj).parent('td').parent('tr').find('td:eq(5)').text();
            Jsonobj["days90"] = $(obj).parent('td').parent('tr').find('td:eq(6)').text();
            Jsonobj["days90gr"] = $(obj).parent('td').parent('tr').find('td:eq(7)').text();

            Jsonobj = JSON.stringify(Jsonobj);

            $.ajax({
                type: "POST",
                url: "AgingReport.aspx/Exceloutstanding",
                data: Jsonobj,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    $('#modalloading').modal('hide');
                    if (response.d == 1) {
                        //alert(response.d)
                        var newstr = $(obj).parent('td').parent('tr').find('td:eq(0)').text()
                        newstr = newstr.replace(/\s/g, "_");
                        var date = new Date()
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        dt = date.getDate();

                        if (dt < 10) {
                            dt = '0' + dt;
                        }
                        if (month < 10) {
                            month = '0' + month;
                        }

                        //alert(dt + '-' + month + '-' + year);
                        var dateformate = dt + '-' + month + '-' + year;
                        bootbox.dialog({
                            closeButton: true,
                            size: 'medium',
                            message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Oustanding Invoice Generated Successfully...</p>',
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 1500);
                       // bootbox.alert("Oustanding Invoice Generated Successfully");

                        var blob = new Blob([response], { type: 'application/vnd.ms-excel' });
                        var downloadUrl = URL.createObjectURL(blob);
                        var a = document.createElement("a");
                        a.target = '_blank';
                        a.href = "<%=ConfigurationManager.AppSettings["ServerAddress"] %>/Data/" + newstr + dateformate + ".xlsx";
                        a.download = newstr + dateformate + ".xlsx";
                        //alert(a.download)
                        document.body.appendChild(a);
                        a.click();
                        //alert(document.body.appendChild(a))
                    }
                    else {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'small',
                            message: '<p class="text-center mb-0"><i class="fa fa-frown-o fa-lg"></i> Report Generate Failed!</p>'
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 1500);
                       // bootbox.alert("Report Generate Failed");
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $('#modalloading').modal('hide');
                    alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                },
            })
        }

    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row" style="padding-top: 30px;">
        <div class="col-lg-12" id="tbcontent">
        </div>
    </div>
    <div class="row" style="padding-top: 30px;">

        <%-- <div class="row" style="padding-top: 30px;">
        <div class="col-lg-12" id="lendertable">
        </div>--%>
    </div>
</asp:Content>

