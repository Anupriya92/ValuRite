<%@ Page Language="C#" MasterPageFile="~/PropertyApp.Master" AutoEventWireup="true" ClientIDMode="Static" CodeBehind="Appraisalpage.aspx.cs" Inherits="Login.Appraisalpage" EnableEventValidation="false" %>

<%--<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">--%>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <title></title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="../Jquerycustomselect/jquery-customselect.js"></script>
    <link href="../Jquerycustomselect/jquery-customselect.css" rel="stylesheet" />
    <link href="../includes/css/font-awe.css" rel="stylesheet" />
    <script src="../Jquerycustomselect/Select2js/select2.min.js"></script>
    <link href="../Jquerycustomselect/Select2js/select2.min.css" rel="stylesheet" />
    <script src="../scripts/GenericForm.js"></script>
    <script src="../scripts/PropertyCreation.js"></script>
    <script src="../Js/GoogleMap.js"></script>
    <style>
        /*.custom-select {
            position: relative;
            width: 130px;
            height: 36px;
            border: 1px ridge #888;
            font-weight: 500;
            font-size: 11px;
            background-color: rgba(0,0,0,0.1);
            color: white;
        }*/
        /*.custom-select {
               width: 230px !important;
        }*/
        .modal-header-primary {
    color: #fff;
    padding: 9px 15px;
    border-bottom: 1px solid #eee;
    font-weight: bold;
    background-color: white;   
        }
        .modal-header {
            min-height: 16.43px;
            padding: 15px;
            border-bottom: 1px solid #e5e5e5;
        }

            .custom-select a {
                color: #fff;
            }

        .select2-container .select2-selection--single {
            cursor: default;
        }

        .custom-select > div {
            position: relative;
            top: 0;
            left: 0;
            margin: 1px 0 0 -1px;
            width: auto;
            border: 1px solid #888;
            border-top: 0;
            background: #FFFFFF;
            z-index: 10;
            overflow: hidden;
        }

        .custom-select input {
            width: 115px;
            border: 1px solid #888;
            margin: 5px 5px 0;
            padding: 5px;
            font-size: 14px;
            color: black;
        }

        .form-control.error {
            background-color: inherit !important;
        }

        select.error {
            color: #A94442;
        }

        .error .select2-selection__rendered {
            background-color: inherit !important;
        }
        .labeltxt {
   font-family: 'ProximaNova-Bold';
    font-weight: 700;
}
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
            width: 90px
        }
        .labeltxtassign {
            color: black;
            font-size: 20px;
            font-family: 'ProximaNova-Bold'
        }

    </style>
    <script type="text/javascript">
        var latitudelong;
        $(document).ready(function () {
            $('#modalloading').modal('show');
            GetCountry();
            GetUnits();
            //initialize("", "map");
            $('#modalloading').modal('hide');
        });
        fnSessionMangement(); //Added by Anupriya to call set interval function
        $(document).ready(function () {
            $('#ddlpropcountry').change(function (e) {
                GetState($('#ddlpropcountry').val(), 1);
                $('#ddlpropcountry').siblings('span').find('.select2-selection--single').removeClass('error')

            });
            $('#ddlpropstate').change(function (e) {
                Getcity($('#ddlpropstate').val(), 1);
                $('#ddlpropstate').siblings('span').find('.select2-selection--single').removeClass('error')
            });
            $('#ddlpropcity').change(function (e) {
                getarea($('#ddlpropcity').val(), 1);
                $('#ddlpropcity').siblings('span').find('.select2-selection--single').removeClass('error')
            });
            $('#ddlareaname').change(function (e) {
                getstreet($('#ddlareaname').val(), 1);
                addoption(1, "ddlareaname");
                $('#ddlareaname').siblings('span').find('.select2-selection--single').removeClass('error')
            });
            $('#ddlstreetname').change(function (e) {
                addoption(1, "ddlstreetname");
                $('#ddlstreetname').siblings('span').find('.select2-selection--single').removeClass('error')
            });
            $(".js-example-basic-single").select2();
        });
        var validator;

        function resetcustomdrop(dropid) {
            //ddlpropcountry
            var $ddl;
            var divid = 'my' + dropid;
            $('#' + dropid).closest('div.custom-select').attr('id', divid);
            $ddl = $("#" + dropid).clone()
            $('#' + dropid).empty();
            $('#' + dropid).remove()
            $("#" + divid).remove()
            $ddl.addClass('custom-select')
            $ddl.appendTo("#div" + dropid)
            $ddl.customselect({
            });
        }

        function checkvalprop(elem) {
            status = 0;
            validator = $("#masterform").validate();
            $.validator.messages.required = '';
            $.validator.addMethod(
                 "regex",
                function (value, element, regexp) {
                    var re = new RegExp(regexp);
                    return this.optional(element) || re.test(value);
                });

            //for to force user to select a value in dropdown
            $.validator.addMethod("aFunction",
                function (value, element) {
                    if (value == "none")
                        return false;
                    else
                        return true;
                }, "");

            $('#txtproppin').rules("add", {
                regex: /^[0-9]{6}$/,
                messages: {
                    regex: "Enter Valid Pin code"
                }
            });

            $('#ddlpropcountry').rules("add", {
                aFunction: true,
                messages: {

                }
            });

            $('#ddlpropstate').rules("add", {
                aFunction: true,
                messages: {

                }
            });

            $('#ddlpropcity').rules("add", {
                aFunction: true,
                messages: {

                }
            });
           $('#ddlareaname').rules("add", {
                aFunction: true,
                messages: {
                    aFunction: ""
                }
            });
           $('#ddlstreetname').rules("add", {
                aFunction: true,
                messages: {
                    aFunction: ""
                }
            });


            $('textarea', $('#' + elem)).each(function () {
                //alert(this.id+" text area ID")
                try {
                    validator.element('#' + this.id)
                    if (validator.element('#' + this.id) == false) {
                        //alert(this.id + " text area ID inner")
                        status = 1;
                    }
                }
                catch (exp) {
                    console.log("Element ID " + this.id + " --textarea -- " + exp)
                    //alert(this.id)
                }
            });

            $('input', $('#' + elem)).each(function () {
                //alert(this.id+" input ID")
                try {
                    validator.element('#' + this.id)
                    if (validator.element('#' + this.id) == false) {
                        //alert(this.id + " input ID inner")
                        status = 1;
                    }
                }
                catch (exp) {
                    console.log("Element ID " + this.id + " --input -- " + exp)
                    //alert(this.id)
                }
            });

            $('select', $('#' + elem)).each(function () {
                //alert(this.id)
                try {
                    validator.element('#' + this.id)
                    if (validator.element('#' + this.id) == false) {
                        //alert(this.id)
                        $('#' + this.id).siblings('span').find('.select2-selection--single').addClass('error')
                        status = 1;
                    }
                    else {
                        $('#' + this.id).siblings('span').find('.select2-selection--single').removeClass('error')
                    }
                }
                catch (exp) {
                    console.log("Element ID " + this.id + " --Exception -- " + exp)
                    //alert(this.id)
                }
            });
            return status;
        }

        function fncreateprop() {
          fncheckPropFootage()
            $('#txtpropAddrline1').attr('required', true)
            $('#modalloading').modal('show');
            $('#ddlstreetname').attr('required', true)
            $('#ddlareaname').attr('required', true)
            $('#txtpropArea').attr('required', true)
            $('#txtpropLM').attr('required', true)
            $('#txtproppin').attr('required', true)
          //  $('#txtValuationPurpose').attr('required', true);
            $('#modalloading').modal('hide');
            divstatus = checkvalprop('divpropertydetails');
            if (divstatus == 0) {
                $("#btnpropsave").attr("disabled", true)
                var obj = {
                    UserID: '<%=Session["UserID"]%>',
                    PropertyType: $('#txtProptype :selected').val(),
                    PropertyID: '',
                    ProjectSiteName: $('#txtProjsitename').val(),
                    AddArea: $('#ddlareaname').val(),
                   // AddArea:"",
                    Landmark: $('#txtpropLM').val(),
                    Pincode: $('#txtproppin').val(),
                    Country: $('#ddlpropcountry :selected').val(),
                     State: $('#ddlpropstate :selected').val(),
                   // State:"",
                    City: $('#ddlpropcity :selected').val(),
                   // City:"",
                    LocationType: $('input[name$=PropertyLocation]:checked').val(),
                    LandExtent: "",
                    SurroundedBy: "",
                    RoadWidth: "",
                    FootageDetails: "",
                    FootageReason: "",
                    Unit: "",
                    DoorNumber: $("#txtdoorNo").val(),
                    StreetName: $('#ddlstreetname').val(),
                   // StreetName: "",
                    RoadName: $("#txtRoadName").val(),
                    latlng: latitudelong,
                   // ValuationPurpose: $("#txtValuationPurpose").val()
                }
                //alert(obj);
                var jsonobj = JSON.stringify(obj);
                //alert(jsonobj);
                fnproptysave(jsonobj);
            }
            else {
                $("#btnpropsave").attr("disabled", false)
                // $('#txtpropAddrline1').attr('required', false)
                $('#txtpropArea').attr('required', false)
                $('#txtpropLM').attr('required', false)
                $('#txtproppin').attr('required', false)
               // $('#txtValuationPurpose').attr('required', false);
                //alert("123")
                bootbox.dialog({
                    closeButton: true,
                    size: 'medium',
                    message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> Please enter Valid Values in the Highlighted Mandatory Field(s)...</p>',
                });
                setTimeout(function () {
                    bootbox.hideAll();
                }, 3000);

                //bootbox.alert("<div>Please enter valid values in the highlighted mandatory field(s)</div>");
            }
        }

        /*Get country detail*/
        function fnchkpropertyType() {
            //debugger
            $('#modalloading').modal('hide');
            propertytype = $('#txtProptype :selected').val();
            if (propertytype == "Land") {
                //alert(propertytype)
                //$('#txtProjsitename').attr("disabled", true); 
                $('#txtproprjustification').attr("disabled", true);
                $('input[name$=PropFootage]').attr('disabled', true);
                $('input[name$=PropFootage]').attr('checked', false);
                fncheckPropFootage()
                $('#modalloading').modal('hide');
            }
            else {
                //debugger
                $('#txtProjsitename').attr("disabled", false);
                $('#txtproprjustification').attr("disabled", false);
                $('input[name$=PropFootage]').attr('disabled', false);
                $("#rdnproprequireNo").prop('checked', 'checked');
                fncheckPropFootage();
            }
        }

    </script>
    <%--</head>--%>
    <style>
        .customform-control {
            font-size: 11px;
            background-color: rgba(0,0,0,0.1) !important;
            color: white !important;
        }

        /*select > option {
            background-color: rgba(0,0,0,0.9);
            color: white;
        }*/

        #address {
            color: #2c2e2f !important;
        }

        .row {
            padding-bottom: 6px;
        }

        /*.col-lg-3 {
            width: 30%;
        }*/

        .select2-search__field {
            color: brown;
        }

        .select2-dropdown {
            font-size: 11px;
            border: 1px solid #1e5671;
            border-radius: 4px;
            box-sizing: border-box;
            display: block;
            position: absolute;
            left: -100000px;
            width: 100%;
            z-index: 1051;
            background-color: rgba(0,0,0,0.8);
            color: white;
        }

        span.select2.select2-container.select2-container--default {
            width: 100% !important;
        }

        .select2-container--default .select2-selection--single {
            font-size: 11px;
            background-color: rgba(0,0,0,0.1);
            color: white;
        }

            .select2-container--default .select2-selection--single .select2-selection__rendered {
                color: white;
                line-height: 28px;
            }

        .select2-container .select2-selection--single {
            height: 34px;
        }
    </style>
</asp:Content>
<%--<body>--%>
<%--<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div id="map" style="width: 100%; height: 725px; position: relative;"></div>
            <div>
                <input id="address" type="text" class="form-control customform-control" value="Chennai" style="margin-top: 8px; width: 30%; font-size: 10pt;" onfocus="geolocate()" />
            </div>
            <div id="divpropertydetails" class="col-lg-5 col-md-6 col-sm-6 labeltxt controls" style="font-size: 12px; background-color: rgba(0,0,0,0.7); color: white;">
                <div class="row">
                    <div class="col-lg-4 col-md-3 col-sm-3 ">
                    </div>
                    <div class="col-lg-7 col-md-8  col-sm-8">
                        <asp:Label ID="lblPropdetails" CssClass="sectionheader" runat="server" Text="Property Details" Style="font-weight: bold; font-size: 16pt"></asp:Label>
                    </div>
                    <div class="col-lg-1 col-md-1 col-sm-1"></div>
                </div>
                <br />
                <div class="row">
                    <div class="col-lg-3 col-md-4 col-sm-5 divmiddle">
                        <asp:Label ID="lblProplocationtype" runat="server" Text="Property Location: "></asp:Label>
                    </div>
                    <div class="col-lg-5 col-md-6 col-sm-7 divmiddle1">
                        <asp:RadioButton ID="rdnMetro" GroupName="PropertyLocation" runat="server" Text="Metro" value="Metro" Checked="true" autofocus />
                        <asp:RadioButton ID="rdnTown" runat="server" GroupName="PropertyLocation" Text="Town" value="Town" />
                        <asp:RadioButton ID="rdnVillage" runat="server" GroupName="PropertyLocation" Text="Village" value="Village" />
                    </div>
                    <div class="col-lg-4 col-md-2 col-sm-2"></div>
                </div>
                <div class="row">
                    <div class="col-lg-3 col-md-3 col-sm-5 divmiddle">
                        <asp:Label ID="lblProptype" runat="server" Text="Property Type: "></asp:Label>
                    </div>
                    <div class="col-lg-5 col-md-6 col-sm-7">
                        <asp:DropDownList ID="txtProptype" runat="server" CssClass="form-control customform-control" onchange="fnchkpropertyType()">

                        </asp:DropDownList>
                    </div>
                    <div class="col-lg-4 col-md-3"></div>
                </div>
        
                <div class="row">
                    <div class="col-lg-3 col-md-3 col-sm-5 divmiddle">
                        <asp:Label ID="lblProjsitename" runat="server" Text="Project Site Name: "></asp:Label>
                    </div>
                    <div class="col-lg-5 col-md-4 col-sm-7">
                        <asp:TextBox ID="txtProjsitename" runat="server" CssClass="form-control customform-control" ToolTip="Enter project name"></asp:TextBox>
                    </div>
                    <div class="col-lg-4 col-md-2 col-sm-2"></div>
                </div>
              
                <div class="row">
                    <div class="col-lg-3 col-md-3 col-sm-5 divmiddle">
                        <asp:Label runat="server" ID="lblpropaddress">Address:                 
                        </asp:Label>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-7" id="divddlpropcountry">
                        <asp:DropDownList ID="ddlpropcountry" runat="server" CssClass="form-control customform-control js-example-basic-single">
                        </asp:DropDownList>
                    </div>
                    <div class="sm-visible col-sm-5"></div>
                    <div class="col-lg-4 col-md-4 col-sm-7" id="divddlpropstate">
                        <asp:DropDownList ID="ddlpropstate" runat="server" CssClass="form-control customform-control js-example-basic-single">
                           
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="row">

                    <div class="col-lg-3 col-md-3 col-sm-5">
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-7" id="divddlpropcity">
                        <asp:DropDownList ID="ddlpropcity" runat="server" CssClass="form-control customform-control js-example-basic-single">
                           
                        </asp:DropDownList>
                    </div>
                </div>
              
                <div class="row">
                    <div class="col-lg-3 col-md-3 col-sm-5 divmiddle">
                        <label>Area Name & Street Name: </label>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-7" id="divddlareaname">
                       
                        <asp:DropDownList ID="ddlareaname" runat="server" CssClass="form-control customform-control js-example-basic-single">
                         
                            <asp:ListItem Value="none" Text="Select Area"></asp:ListItem>
                            <asp:ListItem Text="Add Option"></asp:ListItem>
                        </asp:DropDownList>

                    </div>
                    <div class="sm-visible col-sm-5"></div>
                    <div class="col-lg-4 col-md-3 col-sm-7" id="divddlstreetname">
                        <asp:DropDownList ID="ddlstreetname" runat="server" CssClass="form-control customform-control js-example-basic-single">
                        
                            <asp:ListItem Value="none" Text="Select Street"></asp:ListItem>
                            <asp:ListItem Text="Add Option"></asp:ListItem>
                        </asp:DropDownList>

                    </div>
                    <div class="col-lg-1">
                    </div>
                </div>
             
                <div class="row">
                  
                    <div class="col-lg-3 col-md-3 col-sm-5 divmiddle">
                        <label>Door No: </label>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-7">
                        <input type="text" id="txtdoorNo" class="form-control customform-control" placeholder="Door No" title="Door No" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-3 col-md-3 col-sm-5"></div>
                    <div class="col-lg-8 col-md-8 col-sm-7" style="display: none">
                        <input type="text" id="txtRoadName" class="form-control customform-control" placeholder="Road Name" title="Road Name" />
                    </div>

                </div>
                <div class="row" style="display: none">
             
                </div>
                <div class="row" style="display: none">
               
                <div class="row">
                    <div class="col-lg-3 col-md-3 col-sm-5">
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-3" style="display: none">
                        <asp:TextBox ID="txtpropArea" runat="server" placeholder="Area" CssClass="form-control customform-control">
                        </asp:TextBox><br />
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-7">
                        <asp:TextBox ID="txtpropLM" runat="server" placeholder="Landmark" CssClass="form-control customform-control">
                        </asp:TextBox>

                    </div>
                    <div class="sm-visible col-sm-5"></div>
                    <div class="col-lg-3 col-md-3 col-sm-7">
                        <asp:TextBox ID="txtproppin" runat="server" placeholder="Pin code" CssClass="form-control customform-control" onkeypress="return isNumberKey(event)">
                        </asp:TextBox>
                    </div>
                </div>
            
                <div class="row">
                    <div class="col-lg-3 col-md-3 col-sm-3"></div>
                    <div class="col-lg-2 col-md-2 col-sm-3 col-xs-5">
                        <input type="button" id="btnpropsave" value="Save" class="btn btnsave" onclick="fncreateprop()" />
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-3 col-xs-3">
                        <input type="button" id="btnpropreset" value="Reset" class="btn btnreset" onclick="fnpropclear()" />
                    </div>
                    <div class="col-lg-2 col-md-2" style="display: none">
                        <button type="button" id="btnpropcancel" value="Back" class="btn btn-primary" onclick="fnregcancel()">Back</button>
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-2"></div>
                    <div class="col-lg-2 col-md-2 col-sm-2">
                    </div>
                </div>
                <div class="col-lg-2"></div>
            </div>
            <div class="col-lg-1 col-md-1" style="display: none">
                <button type="button" class="btn btn-sm btnsave" onclick="fnback2que()"><span class="glyphicon glyphicon-backward">&nbsp;Back</span></button>
            </div>
        </div>
    </div>
</asp:Content>--%>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div>
    <div>
        
                  <div class="modal-header-primary" align="center">
                <span class="sectionheader labeltxtassign" style="margin-left: -54px;">Property Creation</span>
            </div>
    </div>
            <div id="divpropertydetails" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 labeltxt transpdiv" style="padding-top: 0px; background-color: #ececec;">
                 
                 <div class="row"> <br /><br /> </div>
         
              
                <div class="row labeltxt">
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 divmiddle">
                        <asp:Label ID="lblProplocationtype" runat="server"  CssClass="labeltxt" Text="Property Location "></asp:Label>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 divmiddle1">
                        <asp:RadioButton ID="rdnMetro" GroupName="PropertyLocation" runat="server" Text=" Metro" value="Metro" Checked="true" autofocus />
                        <asp:RadioButton ID="rdnTown" runat="server" GroupName="PropertyLocation" Text=" Town" value="Town" />
                        <asp:RadioButton ID="rdnVillage" runat="server" GroupName="PropertyLocation" Text=" Village" value="Village" />
                    </div>
              
                </div>
                 <br />

                <div class="row">
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 divmiddle"> 
                        <asp:Label ID="lblProptype" runat="server"  CssClass="labeltxt" Text="Property Type "></asp:Label>
                    </div>
                    <div class="col-lg-4 col-md-3 col-sm-3 col-xs-4">
                        <asp:DropDownList ID="txtProptype" runat="server" CssClass="form-control custom-select" onchange="fnchkpropertyType()">
                            <%--<asp:ListItem Value="Apartment" Text="Apartment"></asp:ListItem>
                                <asp:ListItem Value="Land & Building" Text="Land & Building"></asp:ListItem>
                                <asp:ListItem Value="Land" Text="Land"></asp:ListItem>--%>
                        </asp:DropDownList>
                    </div>
                </div>
                 <br />
                
                <div class="row labeltxt">
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 divmiddle">
                        <asp:Label ID="lblProjsitename" runat="server"  CssClass="labeltxt" Text="Project Site Name "></asp:Label>
                    </div>
                    <div class="col-lg-3 col-md-5 col-sm-5 col-xs-5">
                        <asp:TextBox ID="txtProjsitename" runat="server" class="custom-select"  placeholder="Enter Project Name" style ="width: -webkit-fill-available;padding: inherit;height: 31px;"></asp:TextBox>
                    </div>
                <%--    <div class="col-lg-4 col-md-2 col-sm-2"></div>--%>
                </div>
                <br />
                <div class="row labeltxt">
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 divmiddle">
                        <asp:Label runat="server"  CssClass="labeltxt" ID="lblpropaddress">Address                 
                        </asp:Label>
                    </div>
                    <div class="col-lg-2 col-md-3 col-sm-3 col-xs-3" id="divddlpropcountry">
                        <asp:DropDownList ID="ddlpropcountry" runat="server" CssClass="form-control">
                        </asp:DropDownList>
                    </div>
                    <div class="col-lg-2 col-md-3 col-sm-3 col-xs-3" id="divddlpropstate">
                        <asp:DropDownList ID="ddlpropstate" runat="server" CssClass="form-control">
                            <%--codeAddress(this.value+', '+ $('#ddlpropcountry').val())--%>
                        </asp:DropDownList>
                    </div>
                     <div class="col-lg-2 col-md-3 col-sm-3 col-xs-3" id="divddlpropcity">
                        <asp:DropDownList ID="ddlpropcity" runat="server" CssClass="form-control">
                            <%--codeAddress(this.value+', '+ $('#ddlpropstate').val()+', '+ $('#ddlpropcountry').val())--%>
                        </asp:DropDownList>
                    </div>
                </div>
                 <br />
           
                <div class="row labeltxt">
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 divmiddle">
                        <label class="labeltxt">Area Name & Street Name </label>
                    </div>
                    <div class="col-lg-2 col-md-3 col-sm-3 col-xs-4" id="divddlareaname">
                        <%--<asp:TextBox ID="txtstreetname" runat="server" CssClass="form-control" ToolTip="Enter Street Name"></asp:TextBox>--%>
                        <asp:DropDownList ID="ddlareaname" runat="server" CssClass="form-control">
                            <%--codeAddress(this.value+', '+ $('#ddlpropcity').val())--%>
                            <asp:ListItem Value="none" Text="Select Area"></asp:ListItem>
                            <asp:ListItem Text="Add Option"></asp:ListItem>
                        </asp:DropDownList>

                    </div>
                    <%--<div class="sm-visible col-sm-5"></div>--%>
                    <div class="col-lg-2 col-md-3 col-sm-3 col-xs-4" id="divddlstreetname">
                        <asp:DropDownList ID="ddlstreetname" runat="server" CssClass="form-control">
                            <%--codeAddress(this.value+', '+ $('#ddlareaname').val()+', '+ $('#ddlpropcity').val())--%>
                            <asp:ListItem Value="none" Text="Select Street"></asp:ListItem>
                            <asp:ListItem Text="Add Option"></asp:ListItem>
                        </asp:DropDownList>

                    </div>
               <%--     <div class="col-lg-1">
                    </div>--%>
                </div>
                <br />
                <div class="row labeltxt">
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 divmiddle">
                        <label class="labeltxt">Door No </label>
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                        <input type="text" id="txtdoorNo"  placeholder="Door No" style ="width: -webkit-fill-available;padding: inherit;height: 31px;" title="Door No" />
                    </div>
                </div>
                <div class="row labeltxt">
                    <div class="col-lg-3 col-md-3 col-sm-5"></div>
                    <div class="col-lg-8 col-md-8 col-sm-7" style="display: none">
                        <input type="text" id="txtRoadName" class="custom-select" placeholder="Road Name" style ="padding: inherit;height: 31px;" title="Road Name" />
                    </div>

                </div>
             
              
                <br />
                <div class="row labeltxt">
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 divmiddle">
                        <label class="labeltxt">Land Mark & Pin Code </label>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-2" style="display: none">
                        <asp:TextBox ID="txtpropArea" runat="server" placeholder="Area" style ="width: -webkit-fill-available;padding: inherit;height: 31px;" >
                        </asp:TextBox><br />
                    </div>
                    <div class="col-lg-2 col-md-3 col-sm-4 col-xs-4">
                        <asp:TextBox ID="txtpropLM" runat="server" placeholder="Land Mark" style ="width: -webkit-fill-available;padding: inherit;height: 31px;">
                        </asp:TextBox>

                    </div>
               
                    <div class="col-lg-2 col-md-3 col-sm-4 col-xs-5">
                        <asp:TextBox ID="txtproppin" runat="server" placeholder="Pin Code" style ="width: -webkit-fill-available;padding: inherit;height: 31px;" onkeypress="return isNumberKey(event)">
                        </asp:TextBox>
                    </div>
                </div>
                 <br />

                <div class="row labeltxt">
                <div class="col-lg-5 col-md-3 col-sm-3 col-xs-3"></div>
                <div class="col-lg-5 col-md-8 col-sm-8 col-xs-12">
                    <div class="row labeltxt">
                        <div class="col-lg-2 col-md-4 col-sm-6 col-xs-12">
                             <input type="button" id="btnpropsave" value="Save" class="btn buttonsavereset" onclick="fncreateprop()" />
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <input type="button" id="btnpropreset" value="Reset"  class="btn buttonsavereset" onclick="fnpropclear()" />
                        </div>
                       <%-- <div class="col-lg-2"></div>--%>
                    </div>

                </div>

                <div class="col-lg-3 col-md-1 col-sm-1 col-xs-1"></div>

                <%--<div class="col-lg-4">
                    <button type="button" id="btnassigncancel" value="Back" class="btn btn-info" onclick="fnregcancel()">Back</button>
                </div>--%>
            </div>


                <%--<div class="row labeltxt">
                        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-4">
                        <input type="button" id="btnpropsave" value="Save" class="btn btn-primary" onclick="fncreateprop()" />
                    </div>
                      <div class="col-lg-2 col-md-2 col-sm-2 col-xs-4">
                        <input type="button" id="btnpropreset" value="Reset"  class="btn btn-primary" onclick="fnpropclear()" />
                    </div>--%>

                    <%--<div class="col-lg-3 col-md-4 col-sm-4"></div>--%>
                    <%--<div class="col-lg-2 col-md-2 col-sm-2 col-xs-4">
                      
                        <input type="button" id="btnpropsave" value="Save" class="btn btn-primary" onclick="fncreateprop()" />
                    </div>--%>
                   <%-- <div class="col-lg-2 col-md-2 col-sm-2 col-xs-4">
                      
                        <input type="button" id="btnpropreset" value="Reset"  class="btn btn-primary" onclick="fnpropclear()" />
                    </div>--%>
                    <%--<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2" style="display: none">
                        <button type="button" id="btnpropcancel" value="Back" class="btn btn-primary" onclick="fnregcancel()">Back</button>
                    </div>--%>
                  <%-- <div class="col-lg-3 col-md-2 col-sm-2 col-xs-2"></div>--%>
                    <%-- <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                    </div>--%>
                <%--</div>--%>
               
               <%-- <div class="col-lg-2"></div>--%>
                 <div class="row" ><br /><br /> </div>                 
            </div>
            <div class="col-lg-1 col-md-1" style="display: none">
                <button type="button" class="btn btn-sm btnsave" onclick="fnback2que()"><span class="glyphicon glyphicon-backward">&nbsp;Back</span></button>
            </div>

      </div>     
  
</asp:Content>

