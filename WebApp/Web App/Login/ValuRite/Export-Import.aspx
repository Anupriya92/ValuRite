<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/PropertyApp.Master" ClientIDMode="Static" CodeBehind="Export-Import.aspx.cs" Inherits="Login.Export_Import" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <title>Export Files - Here</title>
    <script src="../scripts/moment.min.js"></script>
    <script src="../scripts/bootstrap-datetimepicker.min.js"></script>
    <link href="../Content/bootstrap-datetimepicker.min.css" rel="stylesheet" />
    <link href="../includes/css/font-awe.css" rel="stylesheet" />
    <link href="../includes/css/dataTables.fontAwesome.css" rel="stylesheet" />
     <style>
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

        .buttonsavereset{
            font-size: 14px;
            border: none;
            font-family: 'ProximaNova-Bold';
            color: #fff;
            padding: 5px 20px;
            /*margin: 10px auto;*/
            background-color: #428bca;
            text-align: center;
            display: block;
            border-radius: 3px;
            /*width: 90px*/
        }

    </style>
    <script type="text/javascript">
        
        $(document).ready(function () {
            $('#dtpickerstart').datetimepicker(
                { maxDate: new Date(), format: 'MM/DD/YYYY' }
            );
            $('#dtpickerend').datetimepicker({
                maxDate: new Date(), format: 'MM/DD/YYYY'
            });
            $("#dtpickerstart").on("dp.change", function (e) {
                $('#dtpickerend').data("DateTimePicker").minDate(e.date);
            });
            $("#dtpickerend").on("dp.change", function (e) {
                $('#dtpickerstart').data("DateTimePicker").maxDate(e.date);
            });
            $('#divexportcont').toggle();
        });
        fnSessionMangement(); //Added by Anupriya to call set interval function
        function divvalid(elem) {
            status = 0;
            validator = $("#masterform").validate();
            $('input', $('#' + elem)).each(function () {
                try {
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

        function fnExport() {
            $('#txtstartdate').attr('required', true);
            $('#txtenddate').attr('required', true);
            var valid = divvalid("divexport");
            if (valid == 1) {
                bootbox.dialog({
                    closeButton: true,
                    size: 'medium',
                    message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i>  Please Select Valid Date...</p>',
                });
                setTimeout(function () {
                    bootbox.hideAll();
                }, 2500);

                //bootbox.alert("Please Select Valid Date");
            } else {
                var parStartdate = Date.parse($("#txtstartdate").val())
                var parEnddate = Date.parse($("#txtenddate").val());
                var filetype = $('input:radio[name$=ftype]:checked').val()
                var a = new Date(parStartdate);
                a.setDate(a.getDate() + 1);

                var b = new Date(parEnddate);
                b.setDate(b.getDate() + 1);
                $('#modalloading').modal('show');
                var obj = {
                    fromdate: a.toISOString(),
                    todate: b.toISOString(),
                    ftype: filetype
                }

                var jsonobj = JSON.stringify(obj);
                $.ajax({
                    type: "POST",
                    url: "Export-Import.aspx/Exportfile",
                    data: jsonobj,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {
                        $('#modalloading').modal('hide');
                        if (response.d == "0") {
                            bootbox.dialog({
                                closeButton: true,
                                size: 'medium',
                                message: '<p class="text-center mb-0"><i class="fa fa-info-circle fa-lg"></i> No Records Found for the Search Criteria...</p>',
                            });
                            setTimeout(function () {
                                bootbox.hideAll();
                            }, 2500);

                            //bootbox.alert("No Records Found for the search Criteria");
                        }
                        else {
                            if (obj.ftype == "xls") {
                                var xlsString = response.d;
                                <%--  var a = document.createElement('a');
                                a.target = '_blank';
                                a.href = "<%=ConfigurationManager.AppSettings["NewServerAddress"] %>/Data/" + response.d + '.xlsx';
                                a.download = $("#txtstartdate").val() + ' To ' + $("#txtenddate").val() + ' -- <%=Session["UserID"]%>' + '.xlsx';
                                document.body.appendChild(a);
                                a.click();--%>
                              fetch('https://cors-anywhere.herokuapp.com/' + "<%=ConfigurationManager.AppSettings["NewServerAddress"] %>/Data/" + response.d + '.xlsx')
                               //   fetch("<%=ConfigurationManager.AppSettings["NewServerAddress"] %>/Data/" + response.d + '.xlsx', { mode: 'no-cors' })
                               .then(res => res.blob())
                               .then(blob => {
                                var filename =$("#txtstartdate").val() + ' To ' + $("#txtenddate").val() + ' -- <%=Session["UserID"]%>' + '.xlsx';
                                var a = document.createElement('a');
                                a.setAttribute('href', window.URL.createObjectURL(blob));
                                a.setAttribute('download', filename);
                                a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
                                a.draggable = true;
                                a.classList.add('dragout');
                                a.click();
                                });

                            }
                            else if (obj.ftype == "csv") {
                                var csvString = response.d;
                                <%-- var a = document.createElement('a');
                                a.target = '_blank';
                                a.href = "<%=ConfigurationManager.AppSettings["NewServerAddress"] %>/Data/" + response.d + '.csv' ;
                                a.download = $("#txtstartdate").val() + ' To ' + $("#txtenddate").val() + ' -- <%=Session["UserID"]%>' + '.csv';
                                document.body.appendChild(a);
                                a.click();--%>
                                fetch('https://cors-anywhere.herokuapp.com/' + "<%=ConfigurationManager.AppSettings["NewServerAddress"] %>/Data/" + response.d + '.csv')
                              //  fetch("<%=ConfigurationManager.AppSettings["NewServerAddress"] %>/Data/" + response.d + '.csv', { mode: 'no-cors' })
                               .then(res => res.blob())
                               .then(blob => {
                                var filename =$("#txtstartdate").val() + ' To ' + $("#txtenddate").val() + ' -- <%=Session["UserID"]%>' + '.csv';
                                var a = document.createElement('a');
                                a.setAttribute('href', window.URL.createObjectURL(blob));
                                a.setAttribute('download', filename);
                                a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
                                a.draggable = true;
                                a.classList.add('dragout');
                                a.click();
                                });
                            }
                            else if (obj.ftype == "xml") {
                                var xmlString = response.d;
                                <%--var a = document.createElement('a');
                                a.target = '_blank';
                                a.href = "<%=ConfigurationManager.AppSettings["NewServerAddress"] %>/Data/" + response.d + '.xml';
                                a.download = $("#txtstartdate").val() + ' To ' + $("#txtenddate").val() + ' -- <%=Session["UserID"]%>' + '.xml';
                                document.body.appendChild(a);
                                a.click();--%>
                                 fetch('https://cors-anywhere.herokuapp.com/' + "<%=ConfigurationManager.AppSettings["NewServerAddress"] %>/Data/" + response.d + '.xml')
                              //   fetch("<%=ConfigurationManager.AppSettings["NewServerAddress"] %>/Data/" + response.d + '.xml', { mode: 'no-cors' })
                               .then(res => res.blob())
                               .then(blob => {
                                var filename =$("#txtstartdate").val() + ' To ' + $("#txtenddate").val() + ' -- <%=Session["UserID"]%>' + '.xml';
                                var a = document.createElement('a');
                                a.setAttribute('href', window.URL.createObjectURL(blob));
                                a.setAttribute('download', filename);
                                a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
                                a.draggable = true;
                                a.classList.add('dragout');
                                a.click();
                                });
                            }
                            else if (obj.ftype == "pdf") {
                                alert("Pdf under construction")
                            }
                            else if (obj.ftype == "json") {
                               var jsonString = response.d;
                                <%--  var a = document.createElement('a');
                                a.target = '_blank';
                                a.href = "<%=ConfigurationManager.AppSettings["NewServerAddress"] %>/Data/" + response.d + '.json';
                                a.download = $("#txtstartdate").val() + ' To ' + $("#txtenddate").val() + ' -- <%=Session["UserID"]%>' + '.json';
                                document.body.appendChild(a);
                                a.click();--%>
                              
                                fetch('https://cors-anywhere.herokuapp.com/' + "<%=ConfigurationManager.AppSettings["NewServerAddress"] %>/Data/" + response.d + '.json')
                              //     fetch("<%=ConfigurationManager.AppSettings["NewServerAddress"] %>/Data/" + response.d + '.json', { mode: 'no-cors' })
                               .then(res => res.blob())
                               .then(blob => {
                                var filename =$("#txtstartdate").val() + ' To ' + $("#txtenddate").val() + ' -- <%=Session["UserID"]%>' + '.json';
                                var a = document.createElement('a');
                                a.setAttribute('href', window.URL.createObjectURL(blob));
                                a.setAttribute('download', filename);
                                a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
                                a.draggable = true;
                                a.classList.add('dragout');
                                a.click();
                                });
                            }
                            Download(response.d);
                        }
                        
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        $('#modalloading').modal('hide');
                        //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                    },
                });
            

}
        }
        function Download(url) {
       
            var filetype = $('input:radio[name$=ftype]:checked').val()
             document.getElementById('downloadfiletype').src = "<%=ConfigurationManager.AppSettings["NewServerAddress"] %>/Data/" + url + '.' +filetype;
            // document.getElementById('downloadfiletype').src = "<%=ConfigurationManager.AppSettings["NewServerAddress"] %>/Data/" + url + '.json' ;
        };
    </script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <iframe id="downloadfiletype" style="display:none;"></iframe>
    <div class="row">
        <%--<div class="col-lg-1 col-md-1 col-sm-12 col-xs-12"></div>--%>
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 labeltxt">
            <div class="row" id="divexport">
                <div class="">
                    <div class="accordionShoHide" id="div_exportdetails" runat="server"> 
                        <div class="panel-default">                           
                            <div class="modal-header-primary" id="divexportheader">
                                <h4 class="panel-title" style="text-align: center;">
                                    <a class="accordion-toggle notactive" data-toggle="collapse" href="#divexportcont">
                                        <i class="indicator glyphicon custom-chevron-right"></i>&nbsp;
                                        <span class="sectionheader labeltxtassign" id="spnAccordionHeader">Export Appraisal Details</span> </a>
                                </h4>
                            </div>
                            <div id="divexportcont" class="panel-collapse collapse accordionmain accordionshadow">
                                <div id="divexportbody" class="panel-body  jumbotron transpdiv" style="display: block">
                                    <div class="row"> 
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
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
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-5 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <div class="row" style="padding-top: 15px; padding-right: 10px; font-size: 18px">
                                                <label id="lblfileType">File Type </label>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <div class="row" style="padding-top: 15px; font-size: 14px">
                                                <label class="control-label radio-inline" for="rdncsv">
                                                    <input type="radio" id="rdncsv" value="csv" name="ftype" checked="checked" />
                                                    <span>CSV</span></label>
                                                <label class="control-label radio-inline" for="rdnxls">
                                                    <input type="radio" id="rdnxls" value="xls" name="ftype" />
                                                    <%--<i class="fa fa-file-excel-o" aria-hidden="true"></i>--%>
                                                    <span>XLS</span></label>
                                                <%--<label class="control-label radio-inline" for="rdnpdf">
                                                    <input type="radio" id="rdnpdf" value="pdf" name="ftype" />
                                                    <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
                                                    <span>PDF</span></label>--%>
                                                <label class="control-label radio-inline" for="rdnxml">
                                                    <input type="radio" id="rdnxml" value="xml" name="ftype" /><span>XML</span></label>
                                                <label class="control-label radio-inline" for="rdnjson">
                                                    <input type="radio" id="rdnjson" value="json" name="ftype" /><span>JSON</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row" style="padding-top: 20px;">
                                        <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12"></div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                           <button type="button" id="btngenfile" onclick="fnExport()" class="btn buttonsavereset">Generate File</button>

                                           <%--   <asp:Button ID="Button1" runat="server" OnClick="Button1_Click"  class="btn btnsave" Text="Generate File" />--%>
                                        </div>
                                        <div class="col-lg-4"></div>
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
    </div>
</asp:Content>
