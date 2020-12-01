<%@ Page Title="" Language="C#" MasterPageFile="~/PropertyApp.Master" AutoEventWireup="true" ClientIDMode="Static" CodeBehind="Subscription.aspx.cs" Inherits="Login.ValuRite.Subscription" %>

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

    <link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet" />
    <script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#dtpickerstart').datetimepicker(
                { minDate: new Date(), format: 'MM/DD/YYYY' }
            );
            $('#dtpickerend').datetimepicker({
                format: 'MM/DD/YYYY'
            });

            $("#txtstartend").attr("disabled", true);
            $("#dtpickerstart").on("dp.change", function (e) {
                //$('#dtpickerend').data("DateTimePicker").minDate(e.date);
                setSubscriptionDate();
            });
            //$("#dtpickerend").on("dp.change", function (e) {
            //    $('#dtpickerstart').data("DateTimePicker").maxDate(e.date);
            //});
            getsubscription();
            setTimeout(function () {
                fngetAppraiserList();
            }, 5000)
        });
        fnSessionMangement(); //Added by Anupriya to call set interval function
        function getsubscription()
        {
            var obj = {
                    Unit: "Subscription"
            }
            var jsonobj = JSON.stringify(obj);
            Getmeasurementunits(jsonobj.toString());
        }

        function setSubscriptionDate()
        {
            var selectedval = $("#ddlselectSubscription").val();
            var seldate = new Date($("#txtpickerstart").val());
            console.log("Selected Date" + seldate);

            if (selectedval == "Trial")
            {
                var trialDate = new Date(seldate.setDate(seldate.getDate() + 30));
                //$("#txtstartend").val('0' + trialDate.getMonth() + 1 + "/" + '0' + trialDate.getDate() + "/" + trialDate.getFullYear())
            }
            else if (selectedval == "Annual")
            {
                var trialDate = new Date(seldate.setDate(seldate.getDate() + 365));
                //$("#txtstartend").val('0' + trialDate.getMonth() + 1 + "/" + '0' + trialDate.getDate() + "/" + trialDate.getFullYear())
            }
            else if (selectedval == "Per Valuation")
            {

                var trialDate = new Date(seldate.setDate(seldate.getDate() + 10));
                //$("#txtstartend").val('0' + trialDate.getMonth() + 1 + "/" + '0' + trialDate.getDate() + "/" + trialDate.getFullYear())
            }
            $("#txtstartend").val(('0' + (trialDate.getMonth() + 1)).slice(-2) + "/" + ('0' + trialDate.getDate()).slice(-2) + "/" + trialDate.getFullYear())

        }

    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="row">
        <%--<div class="col-lg-1"></div>--%>
        <div id="divasgnAppraiserBdy" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 transpdiv labeltxt" style="padding-top: 0px; background-color: #ececec;">
            <div class="row modal-header-primary" align="center">
                <span class="pageheader">Subscription</span>
            </div>
            <div class="row">
                <br />
                <br />
            </div>
            <div class="row" id="divappraiserlist">
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 divmiddle">
                    <asp:Label ID="Label1" CssClass="sectionlabel" runat="server" Text="Select Appraiser"></asp:Label>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12" id="divappraisercontent">
                    <div class="form-group">
                        <select id="ddlselectappraiser" class="form-control">
                            <option>Select</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"></div>
            </div>
            <div class="row" id="divsubscription">
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 divmiddle">
                    <asp:Label ID="lblsubscription" CssClass="sectionlabel" runat="server" Text="Select Subscription"></asp:Label>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12" id="divsubscriptioncontent">
                    <div class="form-group">
                        <select id="ddlselectSubscription" runat="server" class="form-control"  onchange="setSubscriptionDate()">
                            <%--<option>Select your subscription</option>
                            <option>Trial</option>
                            <option>Annual</option>
                            <option>Per Valuation</option>--%>
                        </select>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"></div>
            </div>
            <div class="row" id="divsubscriptiondatestart">
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 divmiddle">
                    <asp:Label ID="lblsubscriptionStart" CssClass="sectionlabel" runat="server" Text="Start Date"></asp:Label>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12" id="divinnerstartdiv">
                    <div class="form-group">
                        <div class='input-group date' id='dtpickerstart'>
                            <input type='text' runat="server" class="form-control" id="txtpickerstart" />
                            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"></div>
            </div>
            <div class="row" id="divsubscriptiondateend">
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 divmiddle">
                    <asp:Label ID="lblsubscriptionend" CssClass="sectionlabel" runat="server" Text="End Date"></asp:Label>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12" id="divinnerenddiv">
                    <div class="form-group">
                        <div class='input-group date' id='dtpickerend'>
                            <input type='text' runat="server" class="form-control" id="txtstartend" />
                            <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"></div>
            </div>
            <div class="row">
                <br />
            </div>
            <div class="row" id="divsubscriptionbuttons">
                <div class="col-lg-3 col-md-2 col-sm-6 col-xs-12">
                </div>
                <div class="col-lg-2 col-md-4 col-sm-6 col-xs-12 divmiddle">
                    <button type="button" id="btnsubmit" runat="server" class="btn" onclick="">Save</button>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <button type="button" id="btnreset" runat="server" class="btn" onclick="">Reset</button>
                </div>
                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-1 "></div>
            </div>
             <div class="row">
                <br />
            </div>
        </div>
    </div>
</asp:Content>
