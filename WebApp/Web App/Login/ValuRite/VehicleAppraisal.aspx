<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/PropertyApp.Master" ClientIDMode="Static" CodeBehind="VehicleAppraisal.aspx.cs" Inherits="Login.ValuRite.VehicleAppraisal" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <title></title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="text/javascript">
        function vehicleresisave() {
            var obj = {
                repRef: $('#txtRefNo').val(),
                resAddr: $('#txtresaddr').val(),
                telNo: $('#txttelenum').val(),
                maritalStatus: $('#txtmartialstatus').val(),
                vehType: $('#txtvechtype').val(),
                personCont: $('#txtpersoncont').val(),
                rent: $('#txtmnthlyrent').val(),
                relationshp: $('#txtrelationship').val(),
                areaHouse: $('#txtareaofhouse').val(),
                otherVeh: $('#txtothervehicle').val(),
                verifierObs: $('#txtverifierobs').val(),
                residence: $('#ddlResType').val(),
                interiorItemsNo: $('#txtinterioritems').val(),
                totalDurable: $('#txtdurable').val(),
                entryPermission: $('input:radio[name$=rdnentryperm]:checked').val(),
                entryReasn: $('#txtentryperm').val(),
                productMatch: $('input:radio[name$=rdnlifestyle]:checked').val(),
                negativeList: $('input:radio[name$=rdnneglist]:checked').val(),
                summaryVerify: $('#txtverifiersum').val(),
                construction: $('#ddlconsresid').val(),
                Easeloc: $('#ddleaseofloc').val(),
                areaRange: $('#txtarearange').val(),
                stablilityDev: $('input:radio[name$=rdnstabdev]:checked').val(),
                propDev: $('input:radio[name$=rdnpropdev]:checked').val(),
                borrowerMeet: $('#txtmetborrower').val(),
                hirerName: $('#txtHirerName').val(),
                landMark: $('#txtLandmark').val(),
                age: $('#txtage').val(),
                asset: $('#txtassetvalue').val(),
                yearNo: $('#txtassetyrs').val(),
                OwnerShip: $('input:radio[name$=LocationDetails]:checked').val(),
                NameVerified: $('#ddlverifiedfrm').val(),
                curResYr: $('#txtyearscurrent').val(),
                inmate: $('#txtinmate').val(),
                park: $('input:radio[name$=rdnparkavail]:checked').val(),
                locality: $('#ddllocal').val(),
                interior: $('#ddlInterior').val(),
                gasConn: $('input:radio[name$=rdnpermgasconn]:checked').val(),
                stdLiv: $('#ddllivingstyle').val(),
                //livingStyle: $('#ddlstandardofliving').val(),
                livingStyle: $('input:radio[name$=rdnoveralllivingsty]:checked').val(),
                Easerep: $('#ddlreposses').val(),
                mapResidence: $('#txtmapofresi').val(),
                customer: $('#ddlcustcop').val(),
                negativeProf: $('input:radio[name$=rdnnegprof]:checked').val(),
                ResStatus: $('#ddlresidencestatus').val(),
                borrowerDev: $('input:radio[name$=rdnco_borrdev]:checked').val(),
                noOfMembers: $('#txtfamily').val(),
                Type: "Residence"
            }
            var jsonobj = JSON.stringify(obj);
            //alert("Json Response" + jsonobj)
            vehicleajax(jsonobj);
        }
        fnSessionMangement(); //Added by Anupriya to call set interval function

        function vehicleresireset() {
            if ('<%=Session["UserType"]%>' == "Appraiser") {
                  $('#txtRefNo').val('');
                  $('#txtresaddr').val('');
                  $('#txttelenum').val('');
                  $('#txtmartialstatus').val('');
                  $('#txtvechtype').val('');
                  $('#txtpersoncont').val('');
                  $('#txtmnthlyrent').val('');
                  $('#txtrelationship').val('');
                  $('#txtareaofhouse').val('');
                  $('#txtothervehicle').val('');
                  $('#txtverifierobs').val('');
                  $('#txtinterioritems').val('');
                  $('#txtdurable').val('');
                  $('#txtentryperm').val('');
                  $('#txtverifiersum').val('');
                  $('#txtarearange').val('');
                  $('#txtHirerName').val('');
                  $('#txtLandmark').val('');
                  $('#txtage').val('');
                  $('#txtassetvalue').val('');
                  $('#txtassetyrs').val('');
                  $('#txtyearscurrent').val('');
                  $('#txtinmate').val('');
                  $('#txtmapofresi').val('');
                  $('#txtfamily').val('');
                  $('#ddlactlevel').prop('selectedIndex', 0);
                  $('#ddlResType').prop('selectedIndex', 0);
                  $('#ddlconsresid').prop('selectedIndex', 0);
                  $('#ddleaseofloc').prop('selectedIndex', 0);
                  $('#ddlverifiedfrm').prop('selectedIndex', 0);
                  $('#ddllocal').prop('selectedIndex', 0);
                  $('#ddlInterior').prop('selectedIndex', 0);
                  //$('#ddllivingstyle').prop('selectedIndex',0);
                  $('#ddlstandardofliving').prop('selectedIndex', 0);
                  $('#ddlreposses').prop('selectedIndex', 0);
                  $('#ddlcustcop').prop('selectedIndex', 0);
                  $('#ddlresidencestatus').prop('selectedIndex', 0);
                  $('input[name=rdnentryperm]').attr('checked', false);
                  $('input[name=rdnlifestyle]').attr('checked', false);
                  $('input[name=rdnneglist]').attr('checked', false);
                  $('input[name=rdnstabdev]').attr('checked', false);
                  $('input[name=rdnpropdev]').attr('checked', false);
                  $('input[name=LocationDetails]').attr('checked', false);
                  $('input[name=rdnparkavail]').attr('checked', false);
                  $('input[name=rdnpermgasconn]').attr('checked', false);
                  $('input[name=rdnnegprof]').attr('checked', false);
                  $('input[name=rdnco_borrdev]').attr('checked', false);
                  $('input[name=rdnoveralllivingsty').attr('checked', false);

              }
              else {
                  location.reload();
              }
        }

          function vehicleajax(objreg) {
              $.ajax({
                  type: "POST",
                  url: "VehicleAppraisal.aspx/vechicleResiSaveDetails",
                  data: objreg,
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  success: function (response) {
                      if (response.d == "1") {
                          $(function () {
                              bootbox.dialog({
                                  closeButton: true,
                                  size: 'medium',
                                  message: '<p class="text-center mb-0"><i class="fa fa-check-square-o fa-lg"></i> Data Saved Successfully...</p>',
                                  buttons: {
                                      success: {
                                          label: "OK",
                                          callback: vehicleresireset
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
                                  message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> This details Already Exists...</p>',
                              });
                              setTimeout(function () {
                                  bootbox.hideAll();
                              }, 1500);
                              //bootbox.alert("This details already Exists");
                          });
                      }
                  },
                  error: function (XMLHttpRequest, textStatus, errorThrown) {
                      alert("Request: 123 " + XMLHttpRequest.responseText);
                  },
              });

          }


    </script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
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
                                        <span class="sectionheader" id="spnAccordionResType">Vechicle Appraisal (Resident type customer)</span> </a>
                                </h4>
                            </div>
                            <div id="divesidentTypebodycont" class="panel-collapse accordionmain accordionshadow">
                                <div id="divResidentTypebody" class="panel-body  jumbotron" style="display: block">
                                    <div class="row">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Report Ref No: </span><span id="spnvalid" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtRefNo" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Name of Hirer: </span><span id="Span1" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtHirerName" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Residential Address: </span><span id="Span2" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtresaddr" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Landmark: </span><span id="Span3" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtLandmark" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Telephone No: </span><span id="Span4" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txttelenum" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Age: </span><span id="Span5" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtage" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Marital Status: </span><span id="Span6" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtmartialstatus" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Asset Value: </span><span id="Span7" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtassetvalue" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Vehicle Type: </span><span id="Span8" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtvechtype" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">No of years (Age of asset): </span><span id="Span9" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtassetyrs" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Person contacted: </span><span id="Span10" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtpersoncont" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Ownership: </span><span id="Span11" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <div class="row">
                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 divmiddle1">
                                                    <asp:RadioButton CssClass="radio-inline" ID="rdnown" GroupName="LocationDetails" Checked="true" runat="server" Text="Own" value="Own" />
                                                    <asp:RadioButton CssClass="radio-inline" ID="rdnrented" runat="server" GroupName="LocationDetails" Text="Rented" value="Rented" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Monthly Rental amount: </span><span id="Span12" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtmnthlyrent" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Name verified from: </span><span id="Span13" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <select id="ddlverifiedfrm" class="form-control">
                                                <option>Select</option>
                                                <option>Nameplate</option>
                                                <option>Watchman</option>
                                                <option>Neighbour</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Relationship between Hirer / guarantor: </span><span id="Span14" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtrelationship" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Years at current residence: </span><span id="Span15" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtyearscurrent" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Area of house: </span><span id="Span16" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtareaofhouse" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Other inmate details: </span><span id="Span17" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtinmate" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Other vehicles owned: </span><span id="Span18" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtothervehicle" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Parking space available : </span><span id="Span19" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 divmiddle1">
                                                <asp:RadioButton CssClass="radio-inline" GroupName="rdnparkavail" runat="server" Checked="true" Text="Yes" value="Yes" />
                                                <asp:RadioButton CssClass="radio-inline" runat="server" GroupName="rdnparkavail" Text="No" value="No" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Verifier's Observations: </span><span id="Span20" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtverifierobs" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Locality : </span><span id="Span21" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <select id="ddllocal" class="form-control">
                                                <option>Select</option>
                                                <option>lower Middle</option>
                                                <option>Middle</option>
                                                <option>others</option>
                                                <option>Slum</option>
                                                <option>Posh locality</option>
                                                <option>Upper middle</option>
                                                <option>village area</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Residence Type: </span><span id="Span22" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <select id="ddlResType" class="form-control">
                                                <option>Select</option>
                                                <option>Bunglow</option>
                                                <option>Flat</option>
                                                <option>hutment</option>
                                                <option>Apartment</option>
                                                <option>Janata Flat</option>
                                                <option>Multi Tenant</option>
                                                <option>Part of Independent house</option>
                                                <option>Row House</option>
                                                <option>Sitting Chawl</option>
                                                <option>Standing Chawl</option>
                                                <option>Temporary shed</option>
                                            </select>

                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Interior: </span><span id="Span24" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <select id="ddlInterior" class="form-control">
                                                <option>Select</option>
                                                <option>Painted</option>
                                                <option>Clean</option>
                                                <option>Not maintained</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="row myrow">

                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Total number of interior items present : </span><span id="Span25" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtinterioritems" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Durable (Total): </span><span id="Span26" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtdurable" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Permanent Gas connection: </span><span id="Span27" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 divmiddle1">
                                                <asp:RadioButton CssClass="radio-inline" GroupName="rdnpermgasconn" runat="server" Checked="true" Text="Yes" value="Yes" />
                                                <asp:RadioButton CssClass="radio-inline" runat="server" GroupName="rdnpermgasconn" Text="No" value="No" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Entry Permitted inside the house: </span><span id="Span28" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <div class="row">
                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 divmiddle1">
                                                    <asp:RadioButton CssClass="radio-inline" GroupName="rdnentryperm" runat="server" Checked="true" Text="Yes" value="Yes" />
                                                    <asp:RadioButton CssClass="radio-inline" runat="server" GroupName="rdnentryperm" Text="No" value="No" />
                                                    <asp:TextBox ID="txtentryperm" runat="server" CssClass="form-control">
                                                    </asp:TextBox>
                                                </div>
                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 divmiddle1">
                                                    <div class="row">
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Overall living style: </span><span id="Span29" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <select id="ddllivingstyle" class="form-control">
                                                <option>Select</option>
                                                <option>Good</option>
                                                <option>Avergae</option>
                                                <option>lower</option>
                                            </select>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 divmiddle1">
                                                <asp:RadioButton CssClass="radio-inline" GroupName="rdnoveralllivingsty" runat="server" Checked="true" Text="Yes" value="Yes" />
                                                <asp:RadioButton CssClass="radio-inline" runat="server" GroupName="rdnoveralllivingsty" Text="No" value="No" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Whether product matches lifestyle: </span><span id="Span30" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <div class="row">
                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 divmiddle1">
                                                    <asp:RadioButton CssClass="radio-inline" GroupName="rdnlifestyle" runat="server" Checked="true" Text="Yes" value="Yes" />
                                                    <asp:RadioButton CssClass="radio-inline" runat="server" GroupName="rdnlifestyle" Text="No" value="No" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Standard of living: </span><span id="Span31" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <select id="ddlstandardofliving" class="form-control">
                                                <option>Select</option>
                                                <option>Low</option>
                                                <option>Middle</option>
                                                <option>Upper</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Negative list / area: </span><span id="Span32" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <div class="row">
                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 divmiddle1">
                                                    <asp:RadioButton CssClass="radio-inline" GroupName="rdnneglist" runat="server" Checked="true" Text="Yes" value="Yes" />
                                                    <asp:RadioButton CssClass="radio-inline" runat="server" GroupName="rdnneglist" Text="No" value="No" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Ease of repossesion : </span><span id="Span33" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <select id="ddlreposses" class="form-control">
                                                <option>Select</option>
                                                <option>Easy</option>
                                                <option>Difficult</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Verifier's Summary: </span><span id="Span34" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtverifiersum" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Map of Residence: </span><span id="Span35" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtmapofresi" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Construction - Residence: </span><span id="Span36" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <select id="ddlconsresid" class="form-control">
                                                <option>Select</option>
                                                <option>pukka</option>
                                                <option>semi pukka</option>
                                                <option>kuchcha</option>
                                                <option>temp</option>
                                            </select>
                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Customer Co-operation: </span><span id="Span37" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <select id="ddlcustcop" class="form-control">
                                                <option>Select</option>
                                                <option>Polite</option>
                                                <option>Rude</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Ease of location: </span><span id="Span38" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <select id="ddleaseofloc" class="form-control">
                                                <option>Select</option>
                                                <option>Difficult</option>
                                                <option>easy</option>
                                            </select>
                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Negative Profile: </span><span id="Span39" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <div class="row">
                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 divmiddle1">
                                                    <asp:RadioButton CssClass="radio-inline" GroupName="rdnnegprof" runat="server" Checked="true" Text="Yes" value="Yes" />
                                                    <asp:RadioButton CssClass="radio-inline" runat="server" GroupName="rdnnegprof" Text="No" value="No" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Area Range sq.ft: </span><span id="Span40" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtarearange" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Residence status: </span><span id="Span41" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <select id="ddlresidencestatus" class="form-control">
                                                <option>Select</option>
                                                <option>self</option>
                                                <option>rented</option>
                                                <option>parent</option>
                                                <option>PG</option>
                                                <option>relative</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Residence Stability Deviation? </span><span id="Span42" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <div class="row">
                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 divmiddle1">
                                                    <asp:RadioButton CssClass="radio-inline" GroupName="rdnstabdev" runat="server" Checked="true" Text="Yes" value="Yes" />
                                                    <asp:RadioButton CssClass="radio-inline" runat="server" GroupName="rdnstabdev" Text="No" value="No" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Co-borrower deviation? </span><span id="Span43" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <div class="row">
                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 divmiddle1">
                                                    <asp:RadioButton CssClass="radio-inline" GroupName="rdnco_borrdev" runat="server" Checked="true" Text="Yes" value="Yes" />
                                                    <asp:RadioButton CssClass="radio-inline" runat="server" GroupName="rdnco_borrdev" Text="No" value="No" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Property deviation? </span><span id="Span44" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <div class="row">
                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 divmiddle1">
                                                    <asp:RadioButton CssClass="radio-inline" GroupName="rdnpropdev" runat="server" Checked="true" Text="Yes" value="Yes" />
                                                    <asp:RadioButton CssClass="radio-inline" runat="server" GroupName="rdnpropdev" Text="No" value="No" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">How many close family members are earning? </span><span id="Span45" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtfamily" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <span class="ValuRitelbl">Met the borrower in person at residence? </span><span id="Span46" runat="server"></span>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                                            <asp:TextBox ID="txtmetborrower" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="row">
                                            <div class="col-lg-2 col-md-4 col-sm-6 col-xs-12 divmiddle">
                                                <button type="button" id="btnsubmit" runat="server" class="btn btnsave" onclick="vehicleresisave()">Save</button>
                                            </div>
                                            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                                <button type="button" id="btnreset" runat="server" class="btn btnreset" onclick="vehicleresireset()">Reset</button>
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
</asp:Content>
