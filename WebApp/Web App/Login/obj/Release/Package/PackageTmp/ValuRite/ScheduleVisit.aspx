<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/PropertyApp.Master" ClientIDMode="Static" CodeBehind="ScheduleVisit.aspx.cs" Inherits="Login.ValuRite.ScheduleVisit" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../scripts/moment.min.js"></script>

    <script src="../Jquerycustomselect/jquery-customselect.js"></script>

    <script src="../bootstrap/DataTables-1.10.10/media/js/jquery.dataTables.min.js"></script>
    <script src="../bootstrap/DataTables-1.10.10/media/js/jquery.dataTables.js"></script>
    <script src="../bootstrap/DataTables-1.10.10/media/js/dataTables.responsive.min.js"></script>
    <script src="../bootstrap/DataTables-1.10.10/media/js/responsive.bootstrap.min.js"></script>
    <link href="../bootstrap/DataTables-1.10.10/media/css/dataTables.jqueryui.css" rel="stylesheet" />
    <link href="../bootstrap-3.3.6-dist/css/bootstrap-theme.css" rel="stylesheet" />
    <link href="../bootstrap/DataTables-1.10.10/media/css/dataTables.jqueryui.min.css" rel="stylesheet" />
    <link href="../bootstrap/DataTables-1.10.10/media/css/jquery.dataTables.css" rel="stylesheet" />
    <link href="../bootstrap/DataTables-1.10.10/media/css/responsive.bootstrap.min.css" rel="stylesheet" />
    <link href="../Jquerycustomselect/jquery-customselect.css" rel="stylesheet" />
    <link href="../includes/css/dataTables.fontAwesome.css" rel="stylesheet" />
    <script src="../bootstrap/DataTables-1.10.10/media/js/jquery.dataTables.min.js"></script>
    <script src="../bootstrap/DataTables-1.10.10/media/js/jquery.dataTables.js"></script>
    <script src="../bootstrap/DataTables-1.10.10/media/js/dataTables.responsive.min.js"></script>
    <script src="../bootstrap/DataTables-1.10.10/media/js/responsive.bootstrap.min.js"></script>
    <link href="../includes/css/font-awe.css" rel="stylesheet" />

    <!--<link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet" />
    <script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script> -->

    <link href="../scripts/toggle.css" rel="stylesheet" />
    <script src="../scripts/toggle.js"></script>

    <script type="text/javascript">

        $(document).ready(function () {


            $('#toggle-event').change(function () {
                if ($(this).prop('checked')) {
                    fnloadAssignedProp();
                }
                else {
                    fnloadScheduledProp();
                }
            })
            $('#toggle-event').bootstrapToggle('on')
        })

        fnSessionMangement(); //Added by Anupriya to call set interval function
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


        function fnloadAssignedProp() {
            $('#modalloading').modal({ backdrop: 'static', keyboard: false });
            $("#Schdtblcontent").html('')
            var inputobj = {
                UserID: '<%=Session["UserID"]%>'
            };

            var jsonstring = JSON.stringify(inputobj)

            $.ajax({
                type: "POST",
                url: "ScheduleVisit.aspx/GetAssignedProperties",
                data: jsonstring,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    $('#modalloading').modal('hide');
                    if (response.d == 1) {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'medium',
                            message: '<p class="text-center mb-0"><i class="fa fa-info-circle fa-lg"></i> No Assigned Property Available...</p>',
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 2500);
                       // bootbox.alert("No assigned property available");
                    }
                    else if (response.d == 0) {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'small',
                            message: '<p class="text-center mb-0"><i class="fa fa-frown-o fa-lg"></i> Server Error!</p>'
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 1500);
                      //  bootbox.alert("Server Error");
                    }
                    else {
                        $('#dtpickerschdate').datetimepicker({ minDate: new Date(), format: 'MM/DD/YYYY hh:mm a'});

                        var data = JSON.parse(response.d);

                        $("#Schdtblcontent").html('');

                        var mytable = '<table id="tblscheduleAppraisal" class="table display table-striped table-bordered table-hover">'
                                         + '<thead>'
                                             + '<tr>'
                                               + '<th>Valuation ID</th>'
                                               + '<th>Borrower Name</th>'
                                               + '<th>Borrower Mobile No</th>'
                                               + '<th>Property Type</th>'
                                               + '<th>Property Address</th>'
                                               + '<th>Schedule</th>'
                                             + '</tr>'
                                        + '</thead>'
                                    + '</table>';

                        $("#Schdtblcontent").append(mytable);

                        table = $('#tblscheduleAppraisal').DataTable({
                            destroy: true,
                            retrieve: true,
                            data: data,
                            aoColumnDefs: [
                                   { "className": "dt-center", "targets": "_all" },
                                   {
                                       aTargets: [4],
                                       mRender: function (data, type, full) {
                                           return data.DoorNumber + ", " + data.StreetName + ", " + data.AddArea + ", " + data.City
                                       }
                                   },
                                   {
                                       aTargets: [5],
                                       mRender: function (data, type, full) {
                                           return "<button type='button' id=" + data + " class='btn btn-success' onclick=fnshowschemodal('" + data + "','0')>Schedule</button>"//data-toggle='modal' data-target='#divschedulevisit'
                                       }
                                   }
                            ],
                            columns: [
                                { data: 'ValuationID' },
                                { data: 'BorrowerName' },
                                { data: 'BorrowerMob' },
                                { data: 'PropertyType' },
                                { data: 'PropertyAddress' },
                                { data: 'ValuationID' }
                            ]

                        })

                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $('#modalloading').modal('hide');
                    alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                },
            })
        }


        function fnloadScheduledProp() {
            $('#modalloading').modal({ backdrop: 'static', keyboard: false });
            $("#Schdtblcontent").html('')
            var inputobj = {
                UserID: '<%=Session["UserID"]%>'
            };

            var jsonstring = JSON.stringify(inputobj)

            $.ajax({
                type: "POST",
                url: "ScheduleVisit.aspx/GetSchedulesProperties",
                data: jsonstring,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    $('#modalloading').modal('hide');
                    if (response.d == 1) {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'medium',
                            message: '<p class="text-center mb-0"><i class="fa fa-info-circle fa-lg"></i> No Scheduled Property Available...</p>',
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 2500);
                       // bootbox.alert("No scheduled property available");
                    }
                    else if (response.d == 0) {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'small',
                            message: '<p class="text-center mb-0"><i class="fa fa-frown-o fa-lg" ></i> Server Error!</p>'
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 1500);
                       // bootbox.alert("Server Error");
                    }
                    else {
                        $('#dtpickerschdate').datetimepicker({ minDate: new Date(), format: 'MM/DD/YYYY hh:mm a'});

                        var data = JSON.parse(response.d);

                        $("#Schdtblcontent").html('');

                        var mytable = '<table id="tblscheduleAppraisal" class="table display table-striped table-bordered table-hover">'
                                         + '<thead>'
                                             + '<tr>'
                                               + '<th>Valuation ID</th>'
                                               + '<th>Borrower Name</th>'
                                               + '<th>Borrower Mobile No</th>'
                                               + '<th>Property Type</th>'
                                               + '<th>Property Address</th>'
                                               + '<th>Details</th>'
                                             + '</tr>'
                                        + '</thead>'
                                    + '</table>';

                        $("#Schdtblcontent").append(mytable);

                        table = $('#tblscheduleAppraisal').DataTable({
                            destroy: true,
                            retrieve: true,
                            data: data,
                            aoColumnDefs: [
                                   { "className": "dt-center", "targets": "_all" },
                                   {
                                       aTargets: [4],
                                       mRender: function (data, type, full) {
                                           return data.DoorNumber + ", " + data.StreetName + ", " + data.AddArea + ", " + data.City
                                       }
                                   },
                                   {
                                       aTargets: [5],
                                       mRender: function (data, type, full) {
                                           return "<button type='button' id=" + data + " class='btn btn-success' onclick=fnshowconfirmmodel('" + data + "')>Details</button>"//data-toggle='modal' data-target='#divschedulevisit'
                                       }
                                   }
                            ],
                            columns: [
                                { data: 'ValuationID' },
                                { data: 'BorrowerName' },
                                { data: 'BorrowerMob' },
                                { data: 'PropertyType' },
                                { data: 'PropertyAddress' },
                                { data: 'ValuationID' }
                            ]
                        })

                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $('#modalloading').modal('hide');
                    alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                },
            })
        }


        function fnresetschemodal() {
            $("#txtValuationID").val("");
            $("#txtschdate").val("");
            $("#txtschtime").val("");
            $("#txtschddocs").val("");
            $("#txtschddesc").val("");

            $("#txtBorrowerName").val("");
            $("#txtBorrowerNo").val("");
            $("#txtPropertyType").val("");
            $("#txtPropertyAddress").val("");
            $("#txtreschedulereason").val("");
        }

        function fnshowschemodal(btnid) {

            fnresetschemodal();

            var tr = $("#" + btnid).parent('td').parent('tr')

            var tabrow = table.row(tr).data();

            $("#txtValuationID").val(tabrow.ValuationID).attr('disabled', true)
            $("#txtBorrowerName").val(tabrow.BorrowerName).attr('disabled', true)
            $("#txtBorrowerNo").val(tabrow.BorrowerMob).attr('disabled', true)
            $("#txtBorrowerEmail").val(tabrow.EmailID).attr('disabled', true)
            $("#txtPropertyType").val(tabrow.PropertyType).attr('disabled', true)
            $("#txtScheduleID").val(tabrow.ScheduleID).attr('disabled', true)
            $("#txtPropertyAddress").val(tabrow.PropertyAddress.DoorNumber + ", " + tabrow.PropertyAddress.StreetName + ", " + tabrow.PropertyAddress.AddArea + ", " + tabrow.PropertyAddress.City).attr('disabled', true)

            $("#btncreateschd").show();
            $("#btnreschd").hide();
            $("#divreschedul").hide();

            $('#divschedulevisit').modal({ backdrop: 'static', keyboard: false });
        }


        function fnshowconfirmmodel(btnid) {

            $("#btnresched").attr("onclick", "fnshowreschemodal('" + btnid + "')")
            $("#btnschedhistory").attr("onclick", "fnschedulehistory('" + btnid + "')")
            $('#divscheuldeconfirmation').modal({ backdrop: 'static', keyboard: false });

        }

        function fnschedulehistory(btnid) {
            $('#divscheuldeconfirmation').modal({ backdrop: 'static', keyboard: false })

            $("#divhistorycont").html('')
            var tr = $("#" + btnid).parent('td').parent('tr')
            var tabrow = table.row(tr).data();

            var a = tabrow.PrevSchedule.length;

            var tabledata = '<table id="tblscheduleAppraisal" class="table display table-striped table-bordered table-hover">'
                                         + '<thead>'
                                             + '<tr>'
                                               + '<th>Schedule Date/Time</th>'
                                               + '<th>Reschedule Reason</th>'
                                             + '</tr>'
                                        + '</thead>'
                                        + '<tbody>';
            var row = "";

            for (var i = 0; i < tabrow.PrevSchedule.length; i++) {
                row += '<tr>'
                               + '<td>' + tabrow.PrevSchedule[i].DateTime + '</th>'
                               + '<td>' + (tabrow.PrevSchedule[i].hasOwnProperty('Reshedulereason') ? tabrow.PrevSchedule[i].Reshedulereason : '-') + '</th>'
                           + '</tr>';
            }

            tabledata += row+'</table>';

            $("#divhistorycont").append(tabledata);

            $('#divscheuldehistory').modal("show")
        }

        function fnshowreschemodal(btnid) {
            $('#divscheuldeconfirmation').modal("hide")
            fnresetschemodal();

            var tr = $("#" + btnid).parent('td').parent('tr')

            var tabrow = table.row(tr).data();

            $("#txtScheduleID").val(tabrow.CurrentSchedule[0].ScheduleID).attr('disabled', true)
            $("#txtschdate").val(tabrow.CurrentSchedule[0].DateTime);
            $("#txtoldschdate").val(tabrow.CurrentSchedule[0].DateTime);
            $("#txtschddocs").val(tabrow.CurrentSchedule[0].RequiredDocuments);
            $("#txtschddesc").val(tabrow.CurrentSchedule[0].Description);
            
            $("#txtValuationID").val(tabrow.ValuationID).attr('disabled', true)
            $("#txtBorrowerName").val(tabrow.BorrowerName).attr('disabled', true)
            $("#txtBorrowerNo").val(tabrow.BorrowerMob).attr('disabled', true)
            $("#txtBorrowerEmail").val(tabrow.EmailID).attr('disabled', true)
            $("#txtPropertyType").val(tabrow.PropertyType).attr('disabled', true)

            //
            $("#txtPropertyAddress").val(tabrow.PropertyAddress.DoorNumber + ", " + tabrow.PropertyAddress.StreetName + ", " + tabrow.PropertyAddress.AddArea + ", " + tabrow.PropertyAddress.City).attr('disabled', true)

            $("#btncreateschd").hide();
            $("#btnreschd").show();
            $("#divreschedul").show();

            $('#divschedulevisit').modal({ backdrop: 'static', keyboard: false });
        }

        function fncreateschedule() {
            $('#modalloading').modal({ backdrop: 'static', keyboard: false });
            $("#txtschdate").attr('required', true);
            $("#txtschddocs").attr('required', true);
            $("#txtschddesc").attr('required', true);

            var divstatus = checkval('divschedulevisit');

            if (divstatus == 1) {
                $('#modalloading').modal('hide');
                $("#txtschdate").attr('required', false);
                $("#txtschddocs").attr('required', false);
                $("#txtschddesc").attr('required', false);
                bootbox.dialog({
                    closeButton: true,
                    size: 'medium',
                    message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please enter Valid Values in the Highlighted Mandatory Field(s)...</p>',
                });
                setTimeout(function () {
                    bootbox.hideAll();
                }, 2500);
               // bootbox.alert("<div>Please enter valid values in the highlighted mandatory field(s)</div>");
            } else {
                var obj = {}
                $('#modalloading').modal({ backdrop: 'static', keyboard: false });
                obj["ValuationID"] = $("#txtValuationID").val();
                obj["BorrowerName"] = $("#txtBorrowerName").val();
                obj["BorrowerNo"] = $("#txtBorrowerNo").val();
                obj["BorrowerEmail"] = $("#txtBorrowerEmail").val();
                obj["PropertyType"] = $("#txtPropertyType").val();
                obj["PropertyAddress"] = $("#txtPropertyAddress").val();
                obj["VisitDate"] = $("#txtschdate").val();
                obj["RequiredDocs"] = $("#txtschddocs").val();
                obj["ScheduleDescription"] = $("#txtschddesc").val();

                var jsonstring = JSON.stringify(obj)

                $.ajax({
                    type: "POST",
                    url: "ScheduleVisit.aspx/CreateSchedule",
                    data: jsonstring,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {
                        $('#modalloading').modal('hide');
                        if (response.d == "1") {
                            $('#divschedulevisit').modal('hide');
                            //$('#toggle-event').bootstrapToggle('on')
                            $(function () {
                                bootbox.dialog({
                                    closeButton: true,
                                    //  message: "Visit Scheduled Successfully, Confirmation Mail has been Sent",
                                    message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Visit Scheduled Successfully, Confirmation Mail has been Sent...</p>',
                                    buttons: {
                                        success: {
                                            label: "OK",
                                            callback: fnloadAssignedProp,
                                        }
                                    }
                                });
                            });
                        }
                        else {
                            bootbox.dialog({
                                closeButton: true,
                                size: 'medium',
                                message: '<p class="text-center mb-0"><i class="fa fa-frown-o fa-lg"></i> Visit Scheduled Failed, Try Later!</p>'
                            });
                            setTimeout(function () {
                                bootbox.hideAll();
                            }, 2500);
                           // bootbox.alert("Visit Scheduled Failed, Try later")
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        $('#modalloading').modal('hide');
                        alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                    },
                })
            }
        }

        function fnreschedule() {
            $("#txtschdate").attr('required', true);
            $("#txtschddocs").attr('required', true);
            $("#txtschddesc").attr('required', true);
            $("#txtreschedulereason").attr('required', true);
            var divstatus = checkval('divschedulevisit');
            if (divstatus == 1) {
                $('#modalloading').modal('hide');
                $("#txtschdate").attr('required', false);
                $("#txtschddocs").attr('required', false);
                $("#txtschddesc").attr('required', false);
                $("#txtreschedulereason").attr('required', false);
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
            else {
                var obj = {}
                $('#modalloading').modal({ backdrop: 'static', keyboard: false });


                obj["ValuationID"] = $("#txtValuationID").val();

                obj["BorrowerName"] = $("#txtBorrowerName").val();
                obj["BorrowerNo"] = $("#txtBorrowerNo").val();
                obj["BorrowerEmail"] = $("#txtBorrowerEmail").val();
                obj["PropertyType"] = $("#txtPropertyType").val();
                obj["PropertyAddress"] = $("#txtPropertyAddress").val();
                obj["VisitDate"] = $("#txtschdate").val();
                obj["RequiredDocs"] = $("#txtschddocs").val();
                obj["ScheduleDescription"] = $("#txtschddesc").val();
                obj["ScheduleID"] = $("#txtScheduleID").val();
                obj["RescheduleReason"] = $("#txtreschedulereason").val();

                var jsonstring = JSON.stringify(obj)


                $.ajax({
                    type: "POST",
                    url: "ScheduleVisit.aspx/UpdateSchedule",
                    data: jsonstring,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {
                        $('#modalloading').modal('hide');
                        

                        if (response.d == "1") {
                            //$('#toggle-event').bootstrapToggle('off')
                            $('#divschedulevisit').modal('hide');
                            $(function () {
                                bootbox.dialog({
                                    closeButton: true,
                                    size: 'medium',
                                    message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Visit Rescheduled Successfully, Confirmation Mail has been Sent to Borrower...</p>',
                                    buttons: {
                                        success: {
                                            label: "OK",
                                            callback: fnloadScheduledProp,
                                        }
                                    }
                                });
                            });
                        }
                        else {
                            bootbox.dialog({
                                closeButton: true,
                                size: 'medium',
                                message: '<p class="text-center mb-0"><i class="fa fa-frown-o fa-lg"></i> Visit Scheduled Failed, Try Later!</p>'
                            });
                            setTimeout(function () {
                                bootbox.hideAll();
                            }, 2500);
                          //  bootbox.alert("Visit Scheduled Failed, Try later")
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        $('#modalloading').modal('hide');
                        alert("Request: " + XMLHttpRequest.responseText + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                    },
                })

            }
        }
    </script>
</asp:Content>


<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 " style="padding-top: 0px">
            <div class="row" id="divSchedulevisit">
                <div class="">
                    <div class="accordionShoHide" id="div_schedule" runat="server">
                        <div class="panel-default">
                            <div class="modal-header modal-header-primary" id="divexportheader">
                                <h4 class="panel-title" style="text-align: center;">
                                    <a class="accordion-toggle notactive" data-toggle="collapse" href="#divschedule">
                                        <i class="indicator glyphicon custom-chevron-right"></i>&nbsp;
                                        <span class="sectionheader" id="spnAccordionHeader">Schedule Visit</span> </a>
                                </h4>
                            </div>
                            <div id="divschedule" class="panel-collapse accordionmain accordionshadow">
                                <div id="divschedulebody" class="panel-body" style="display: block">
                                    <div class="row">
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <%--<button type="button" id="btnReshedule" class="btn btn-primary" onclick="fnloadScheduledProp()">View Scheduled Valuations</button>--%>
                                            <input id="toggle-event" type="checkbox" data-toggle="toggle" data-off="Schedule" data-on="Reschedule" />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 table-responsive" id="Schdtblcontent">
                                        </div>
                                    </div>

                                    <div id="divschedulevisit" class="modal fade" role="dialog">
                                        <div class="modal-dialog">

                                            <!-- Modal content-->
                                            <div class="modal-content">
                                                <div class="modal-header modal-header-primary">
                                                    <button type="button" class="close" data-dismiss="modal"><span style="color:white">&times;</span></button>
                                                    <h4 class="modal-title" align="center">Schedule Details</h4>
                                                </div>

                                                <div class="modal-body">
                                                    <div class="row" style="display: none">
                                                        <div class="col-lg-1"></div>
                                                        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                                            <div class="row">
                                                                <label id="lblScheduleID">Schedule ID </label>
                                                            </div>
                                                            <div class="row" align="center">
                                                                <div class="form-group">
                                                                    <input type="text" id="txtScheduleID" class="form-control" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1 "></div>
                                                    </div>

                                                    <div class="row">
                                                        <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1 "></div>
                                                        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                                            <div class="row">
                                                                <label id="lblvaluationid">Valuation ID </label>
                                                            </div>
                                                            <div class="row" align="center">
                                                                <div class="form-group">
                                                                    <input type="text" id="txtValuationID" class="form-control" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-1"></div>
                                                    </div>
                                                    <div class="row" style="display: none">
                                                        <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1 "></div>
                                                        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                                            <div class="row">
                                                                <label id="lblBorrowerName">Borrower Name </label>
                                                            </div>
                                                            <div class="row" align="center">
                                                                <div class="form-group">
                                                                    <input type="text" id="txtBorrowerName" class="form-control" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1 "></div>
                                                    </div>
                                                    <div class="row" style="display: none">
                                                        <div class="col-lg-1"></div>
                                                        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                                            <div class="row">
                                                                <label id="lblBorrowerNo">Mobile Number </label>
                                                            </div>
                                                            <div class="row" align="center">
                                                                <div class="form-group">
                                                                    <input type="text" id="txtBorrowerNo" class="form-control" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1 "></div>
                                                    </div>
                                                    <div class="row" style="display: none">
                                                        <div class="col-lg-1"></div>
                                                        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                                            <div class="row">
                                                                <label id="lblBorrowerEmail">Email </label>
                                                            </div>
                                                            <div class="row" align="center">
                                                                <div class="form-group">
                                                                    <input type="text" id="txtBorrowerEmail" class="form-control" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1 "></div>
                                                    </div>

                                                    <div class="row" style="display: none">
                                                        <div class="col-lg-1"></div>
                                                        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                                            <div class="row">
                                                                <label id="lblPropertyType">Property Type </label>
                                                            </div>
                                                            <div class="row" align="center">
                                                                <div class="form-group">
                                                                    <input type="text" id="txtPropertyType" class="form-control" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1 "></div>
                                                    </div>
                                                    <div class="row" style="display: none">
                                                        <div class="col-lg-1"></div>
                                                        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                                            <div class="row">
                                                                <label id="lblPropertyAddress">Property Address </label>
                                                            </div>
                                                            <div class="row" align="center">
                                                                <div class="form-group">
                                                                    <input type="text" id="txtPropertyAddress" class="form-control" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-1 col-md-1"></div>
                                                    </div>



                                                    <div class="row">
                                                        <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1 "></div>
                                                        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                                            <div class="row">
                                                                <label id="lblschdate">Select Date and Time </label>
                                                                <span class="asterisk_input1"></span>
                                                            </div>
                                                            <div class="row" align="center">
                                                                <div class="form-group" style="margin-bottom: 0px;">
                                                                    <div class='input-group date' align="center" id='dtpickerschdate'>
                                                                         <input type='text' runat="server" align="center" class="form-control" style="display:none" id="txtoldschdate" />
                                                                        <input type='text' runat="server" align="center" class="form-control" id="txtschdate" />
                                                                        <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-1 col-md-1"></div>
                                                    </div>
                                                    <div class="row" style="padding-top: 3%">
                                                        <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1 "></div>
                                                        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                                            <div class="row">
                                                                <label id="lblrequireddocuments">Enter Required Documents </label>
                                                                <span class="asterisk_input1"></span>
                                                            </div>
                                                            <div class="row" align="center">
                                                                <div class="form-group">
                                                                    <input type="text" id="txtschddocs" class="form-control" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-1 col-md-1 "></div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1"></div>
                                                        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                                            <div class="row">

                                                                <label id="lblvisitdescription">Description </label>
                                                                <span class="asterisk_input1"></span>
                                                            </div>
                                                            <div class="row" align="center">
                                                                <div class="form-group">
                                                                    <asp:TextBox ID="txtschddesc" runat="server" TextMode="MultiLine" CssClass="form-control input-sm" Style="resize: none;" ClientIDMode="Static">
                                                                    </asp:TextBox>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-1 col-md-1"></div>
                                                    </div>
                                                    <div class="row" id="divreschedul">
                                                        <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1"></div>
                                                        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                                            <div class="row">
                                                                <label id="lblreschedulereason">Reason for rescheduling</label>
                                                                <span class="asterisk_input1"></span>
                                                            </div>
                                                            <div class="row" align="center">
                                                                <div class="form-group">
                                                                    <asp:TextBox ID="txtreschedulereason" runat="server" TextMode="MultiLine" CssClass="form-control input-sm" Style="resize: none;" ClientIDMode="Static">
                                                                    </asp:TextBox>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-1 col-md-1"></div>
                                                    </div>

                                                </div>

                                                <div class="modal-footer">
                                                    <button type="button" id="btncreateschd" class="btn btn-primary" onclick="fncreateschedule()">Create</button>
                                                    <button type="button" id="btnreschd" class="btn btn-primary" onclick="fnreschedule()">Reschedule</button>
                                                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div id="divscheuldeconfirmation" class="modal fade" role="dialog" style="top: 30%;">
                                        <div class="modal-dialog">
                                            <!-- Modal content-->
                                            <div class="modal-content">
                                                <div class="modal-header modal-header-primary">
                                                    <button type="button" class="close" data-dismiss="modal"><span style="color:white">&times;</span></button>
                                                    <h4 class="modal-title" align="center">Select any action</h4>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="row">
                                                        <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12" align="center"T>
                                                            <button type="button" id="btnresched" class="btn btn-primary"><i class="fa fa-check-square-o" aria-hidden="true"></i>Click to Reschedule</button>
                                                            <button type="button" id="btnschedhistory" class="btn btn-default" data-dismiss="modal"><i class="fa fa-history" aria-hidden="true"></i>View History</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="divscheuldehistory" class="modal fade" role="dialog">
                                        <div class="modal-dialog">
                                            <!-- Modal content-->
                                            <div class="modal-content">
                                                <div class="modal-header modal-header-primary">
                                                    <button type="button" class="close" data-dismiss="modal"><span style="color:white;">&times;</span></button>
                                                    <h4 class="modal-title" align="center">Schedule history</h4>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="row">
                                                        <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12" id="divhistorycont">

                                                            <%-- <button type="button" id="btnresched" class="btn btn-primary"><i class="fa fa-check-square-o" aria-hidden="true"></i> Click to Reschedule</button>
                                                            <button type="button" id="btnschedhistory" class="btn btn-default" data-dismiss="modal"><i class="fa fa-history" aria-hidden="true"></i>View History</button>--%>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" data-dismiss="modal" class="btn btn-default">Close</button>
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
