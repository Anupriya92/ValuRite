<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/PropertyApp.Master" ClientIDMode="Static" CodeBehind="VechicleAppraisalBusiness.aspx.cs" Inherits="Login.ValuRite.VechicleAppraisalBusiness" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
     <link href="../includes/css/font-awe.css" rel="stylesheet" />
   <title></title>
     <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="text/javascript">
        $(document).ready(function () {
           GetUnits();
        });
        fnSessionMangement(); //Added by Anupriya to call set interval function
        function vechiclebusireset() {
            if ('<%=Session["UserType"]%>' == "Appraiser") {
                $("#txtHirerName").val('');
                $("#txtbusnaddr").val('');
                $("#txtfaxnum").val('');
                $("#txtcellnum").val('');
                $('#txtassetval').val('');
                $('#txtyrsinbuss').val('');
                $('#txtownrented').val('');
                $('#txtnumemp').val('');
                $('#txtmajorcust').val('');
                $('#txtremarks').val('');
                $('#txtBusnname').val('');
                $('#txtlndlinenum').val('');
                $('#txtlndmark').val('');
                $('#txtvechtype').val('');
                $('#txtamountfinc').val('');
                $('#txtnoyrsprstplace').val('');
                $('#txtmnthlyrentals').val('');
                $('#txtturnover').val('');
                $('#txtmachinery').val('');
                $('#txtmajorsuppliers').val('');

                $('#ddlactlevel').prop('selectedIndex', 0);
                $('#ddlloctype').prop('selectedIndex', 0);
                $('#ddlInterior').prop('selectedIndex', 0);
                $('#ddlFurnish').prop('selectedIndex', 0);
                $('#ddlExterior').prop('selectedIndex', 0);
                $('#ddlautofax').prop('selectedIndex', 0);
                $('#ddlreposs').prop('selectedIndex', 0);
                $('#ddlbusiasses').prop('selectedIndex', 0);

                $('input[name=rdnownrented]').attr('checked', false);
                $('input[name=rdnneglist]').attr('checked', false);
                $('input[name=rdnwatch]').attr('checked', false);
               
               


            }
            else {
                location.reload();
            }
        }

        function vechiclebusisave() {
            //divstatus = ('divbusidetails');
          // var upload = ($('#FileUpload2').val().replace(/.*(\/|\\)/, '').replace(/\.jpg/, ''));
            var upload = ($('#FileUpload2').val());
         
           // alert(upload+"hi");
            var busiimage = ""
           
                if ($('#FileUpload2').val() != " ") {
                    fnpicsuploadvec();
                    busiimage = ("Vehicle" + $('#txtHirerName').val() + upload);
                   // alert(busiimage);
               
              
               // alert('in')
                var obj = {

                    vecHirer: $('#txtHirerName').val(),
                    vecBusiaddress: $('#txtbusnaddr').val(),
                    vecFaxno: $('#txtfaxnum').val(),
                    vecCellno: $('#txtcellnum').val(),
                    vecAssetvalue: $('#txtassetval').val(),
                    vecBusiyears: $('#txtyrsinbuss').val(),
                    vecOwnrented: $('input:radio[name$=rdnownrented]:checked').val(),
                    vecActivitylevel: $('#ddlactlevel').val(),
                    vecNoofemp: $('#txtnumemp').val(),
                    vecMajorcust: $('#txtmajorcust').val(),
                    vecLocality: $('#ddlloctype').val(),
                    vecInterior: $('#ddlInterior').val(),
                    vecFurnish: $('#ddlFurnish').val(),
                    vecNeglist: $('input:radio[name$=rdnneglist]:checked').val(),
                    vecWatchlist: $('input:radio[name$=rdnwatch]:checked').val(),
                    vecRemarks: $('#txtremarks').val(),
                    vecBusiname: $('#txtBusnname').val(),
                    vecLandline: $('#txtlndlinenum').val(),
                    vecLandmark: $('#txtlndmark').val(),
                    vecVechicletype: $('#txtvechtype').val(),
                    vecAmtfin: $('#txtamountfinc').val(),
                    vecPresentyears: $('#txtnoyrsprstplace').val(),
                    vecMonthlyrent: $('#txtmnthlyrentals').val(),
                    vecTurnover: $('#txtturnover').val(),
                    vecMachinery: $('#txtmachinery').val(),
                    vecMajorsuppliers: $('#txtmajorsuppliers').val(),
                    vecExterior: $('#ddlExterior').val(),
                    vecAutomationfax: $('#ddlautofax').val(),
                    vecRepossesion: $('#ddlreposs').val(),
                    vecBusiasses: $('#ddlbusiasses').val(),
                    vecImage: busiimage,
                    Type: "Business"
                }
                
                var jsonobj = JSON.stringify(obj);
               // alert("Json Response" + jsonobj)
                vehicleajax(jsonobj);
         
                } else {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please enter Valid Values in the Highlighted Mandatory Field(s)...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 3000);
               // bootbox.alert("<div>Please enter valid values in the highlighted mandatory field(s)</div>");
            }
         // alert(obj);
          //vehicleupload();
         
                 
                 
        }
        function vehicleajax(objreg) {
            $.ajax({
                type: "POST",
                url: "VechicleAppraisalBusiness.aspx/vechicleBusiSaveDetails",
                data: objreg,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    if (response.d == "1") {
                        $(function () {
                            bootbox.dialog({
                                closeButton: false,
                                message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Data Saved Successfully...</p>',
                                buttons: {
                                    success: {
                                        label: "OK",
                                        callback: vechiclebusireset
                                    }
                                }
                            });
                        });
                    }
                    else {
                        $(function () {
                            bootbox.dialog({
                                closeButton: true,
                                size: 'medium',
                                message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> This Details Already Exists...</p>',
                            });
                            setTimeout(function () {
                                bootbox.hideAll();
                            }, 1500);
                            //bootbox.alert("This details already Exists");
                        });
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("Request: 123 " + XMLHttpRequest.responseText + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                },
            });
           
           


        }
        function fnpicsuploadvec() {

            $("#frmlogocapturevec").contents().find("#FileUpload2").remove();
            $("#frmlogocapturevec").contents().find("body").find("div.row").find("#txtHirerName").val($("#txtHirerName").val())
            $("#frmlogocapturevec").contents().find("body").find("div.row").append($("#FileUpload2").clone());
            $("#frmlogocapturevec").contents().find("body").find("div.row").find("#Button3").click()
        }
    </script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <div class="row" id="divbusidetails">
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
            <div class="row" id="divrestype">
                <div class="">
                    <div class="accordionShoHide" id="div_restype" runat="server">
                        <div class="panel-default">
                            <div class="modal-header modal-header-primary" id="divexportheader">
                                <h4 class="panel-title" style="text-align: center;">
                                    <a class="accordion-toggle notactive" data-toggle="collapse" href="#divesidentTypebodycont">
                                        <i class="indicator glyphicon custom-chevron-right"></i>&nbsp;
                                        <span class="sectionheader" id="spnAccordionResType">Vechicle Appraisal (Business type customer)</span> </a>
                                </h4>
                            </div>
                            <div id="divesidentTypebodycont" class="panel-collapse accordionmain accordionshadow">
                                <div id="divResidentTypebody" class="panel-body  jumbotron" style="display: block">
                                    <div class="row">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Name of Hirer: </span><span id="spnvalid" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtHirerName" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Business Name: </span><span id="Span1" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtBusnname" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                    </div>


                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Business Address: </span><span id="Span4" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtbusnaddr" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Landline Telephone No: </span><span id="Span5" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtlndlinenum" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Fax No: </span><span id="Span6" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtfaxnum" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Landmark: </span><span id="Span7" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtlndmark" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Cell Number: </span><span id="Span8" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtcellnum" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Vehicle Type: </span><span id="Span9" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtvechtype" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Asset Value: </span><span id="Span10" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtassetval" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Amount to be financed: </span><span id="Span11" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtamountfinc" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">No of years in Business: </span><span id="Span12" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtyrsinbuss" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">No of years in present place ( business address): </span><span id="Span13" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtnoyrsprstplace" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Own / Rented: </span><span id="Span14" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <%--<asp:TextBox ID="txtownrented" runat="server" CssClass="form-control">
                                            </asp:TextBox>--%>
                                             <asp:RadioButton ID="rb1" CssClass="radio-inline" GroupName="rdnownrented" runat="server" Checked="true" Text="Yes" value="Yes" />
                                             <asp:RadioButton CssClass="radio-inline" runat="server" GroupName="rdnownrented" Text="No" value="No" />
                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Monthly Rentals: </span><span id="Span15" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtmnthlyrentals" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Activity level: </span><span id="Span16" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <select id="ddlactlevel" class="form-control">
                                                <option>Select</option>
                                                <option>Good</option>
                                                <option>Average</option>
                                                <option>Bad</option>
                                            </select>
                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Turnover: </span><span id="Span17" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtturnover" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">No of Employees: </span><span id="Span18" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtnumemp" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">No of Machinery: </span><span id="Span19" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtmachinery" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Major customers: </span><span id="Span20" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtmajorcust" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Major Suppliers: </span><span id="Span21" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtmajorsuppliers" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Locality: </span><span id="Span22" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <select id="ddlloctype" class="form-control">
                                                <option>Select</option>
                                                <option>Commercial</option>
                                                <option>Residential</option>
                                            </select>

                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Exterior: </span><span id="Span24" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <select id="ddlExterior" class="form-control">
                                                <option>Select</option>
                                                <option>Wall</option>
                                                <option>Painting</option>
                                                <option>Lift</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="row myrow">

                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Interior: </span><span id="Span25" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <select id="ddlInterior" class="form-control">
                                                <option>Select</option>
                                                <option>Painted</option>
                                                <option>Cleaned</option>
                                                <option>Not Maintained</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Furnishings: </span><span id="Span26" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <select id="ddlFurnish" class="form-control">
                                                <option>Select</option>
                                                <option>satisfactory</option>
                                                <option>average</option>
                                                <option>sparsely</option>
                                            </select>
                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Automation Fax: </span><span id="Span27" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <select id="ddlautofax" class="form-control">
                                                <option>Select</option>
                                                <option>Telephone</option>
                                                <option>Computer</option>
                                                <option>Xerox</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Negative list : </span><span id="Span28" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <div class="row">
                                                <div id="rbuton" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 divmiddle1">
                                                    <asp:RadioButton CssClass="radio-inline" GroupName="rdnneglist" runat="server" Checked="true" Text="Yes" value="Yes" />
                                                    <asp:RadioButton CssClass="radio-inline" runat="server" GroupName="rdnneglist" Text="No" value="No" />
                                                </div>
                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 divmiddle1">
                                                    <div class="row">
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Ease of repossesion: </span><span id="Span29" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <select id="ddlreposs" class="form-control">
                                                <option>Select</option>
                                                <option>Easy</option>
                                                <option>Difficult</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Watch list: </span><span id="Span30" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <div class="row">
                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 divmiddle1">
                                                    <asp:RadioButton CssClass="radio-inline" GroupName="rdnwatch" runat="server" Checked="true" Text="Yes" value="Yes" />
                                                    <asp:RadioButton CssClass="radio-inline" runat="server" GroupName="rdnwatch" Text="No" value="No" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Business Assessment: </span><span id="Span31" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <select id="ddlbusiasses" class="form-control">
                                                <option>Select</option>
                                                <option>Excellent</option>
                                                <option>Satisfactory</option>
                                                <option>Unsatisfactory</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Remarks: </span><span id="Span32" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtremarks" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>

                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Option to upload Business Card image: </span><span id="Span33" runat="server"></span>
                                        </div>
                                        <%--<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <input type="file" id="businessimage" />
                                        </div>--%>
                                  
                                    
                <div class="row">
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">  
                <asp:FileUpload ID="FileUpload2" runat="server"/>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 divmiddle1">
                   <iframe id="frmlogocapturevec" name="Frame" src="PicsuploadVec.aspx" height="100%" width="100%" style="overflow: hidden; display: none;"  scrolling="yes" ></iframe>
                  </div>
                 <div class="col-lg-2 col-md-2 col-sm-2 col-xs-4"">  
                   <button type="button" id="btnlogoupload1" runat="server"  onclick="fnpicsuploadvec()" style="display:none">Upload</button>
                </div>
                </div>
                </div>
                <br />
                                     <div class="row myrow">
                                        <div class="row">
                                            <div class="col-lg-2 col-md-4 col-sm-6 col-xs-12 divmiddle">
                                                <button type="button" id="btnsubmit" runat="server" class="btn btnsave" onclick="vechiclebusisave()">Save</button>
                                            </div>
                                            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                                <button type="button" id="btnreset" runat="server" class="btn btnreset" onclick="vechiclebusireset()">Reset</button>
                                            </div>
                                            <div class="col-lg-2 hidden-xs hidden-sm" style="display: none">
                                                <button type="button" id="btnregcancel" value="Cancel" class="btn btn-primary" onclick="()">Cancel</button>
                                            </div>
                                            <div class="col-lg-2 hidden-xs hidden-sm"></div>
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

</asp:Content>
