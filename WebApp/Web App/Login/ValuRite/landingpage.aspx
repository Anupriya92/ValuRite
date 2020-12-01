<%@ Page Language="C#" MasterPageFile="~/PropertyApp.Master" CodeBehind="landingpage.aspx.cs" Inherits="Login.landingpage" ClientIDMode="Static" EnableEventValidation="false" %>

<%@ Register TagPrefix="asp" Namespace="Saplin.Controls" Assembly="DropDownCheckBoxes" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <title></title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"></script> -->
    <script src="../scripts/canvas.js"></script>
    <script src="../scripts/moment.min.js"></script>
    <script src="../scripts/bootstrap-datetimepicker.min.js"></script>
    <script src="../scripts/globalize.js"></script>
    <script src="../scripts/globalize.cultures.js"></script>
    <script src="../Js/landingpage.js"></script>
    <link href="../Content/bootstrap-datetimepicker.min.css" rel="stylesheet" />
    <link href="../includes/css/font-awe.css" rel="stylesheet" />
    <link href="../includes/css/Customcss.css" rel="stylesheet" />
    <link href="../landingpage.css" rel="stylesheet" />
    <link href="../includes/css/Customcss.css" rel="stylesheet" />
    <%-- <script src="http://maps.google.com/maps/api/js?libraries=geometry"></script>--%>
    <%--Added by anupriya--%>
    <script src="../Js/GoogleMap.js"></script>
    <style>
        .myrow1 {
            padding-top: 16px;
        }

        h4 > a, h4 > a > span {
            color: #102e3d;
            font-weight: bold;
            transition: all 0.1s;
        }

        .radiostyle {
            padding-left: 9px;
        }
            h4 > a:hover, h4 > a:active, h4 > a:focus, h4 > a > span:hover, h4 > a > span:active, h4 > a > span:focus, h4 > a > span:visited {
                color: #042535;
                font-weight: bold;
                transition: all 0.1s;
            }

        .btn-link, .btn-link:active, .btn-link[disabled], fieldset[disabled] .btn-link {
            -webkit-box-shadow: none;
            box-shadow: none;
        }

        .jumbotron {
            background-color: white;
            margin-bottom: 0;
        }
        .panel-body {
            background-color: #eee;
        }

        .custom-chevron-right:before {
            content: "\e080";
        }

        .transpdiv {
            color: black;
        }

        .labeltxt {
            color: black;
        }

        .img-wrap {
            position: relative;
            display: inline-block;
            border: 1px black solid;
            font-size: 0;
        }

        .img-wrap .close {
            position: absolute;
            top: 2px;
            right: 2px;
            z-index: 100;
            background-color: #FFF;
            padding: 5px 2px 2px;
            color: #000;
            font-weight: bolder;
            cursor: pointer;
            opacity: .2;
            text-align: center;
            font-size: 22px;
            line-height: 10px;
            border-radius: 50%;
        }

        .img-wrap:hover .close {
            opacity: 1;
        }

        .custom-chevron-down:before {
            content: "\e114";
        }

        .tooltip>.tooltip-inner {
            background-color: #B1302C;
        }

        .tooltip.top .tooltip-arrow {
            border-top-color: #B1302C;
        }

        .tooltip.top-left .tooltip-arrow {
            border-top-color: #B1302C;
        }

        .tooltip.top-right .tooltip-arrow {
            border-top-color: #B1302C;
        }

        .tooltip.right .tooltip-arrow {
            border-right-color: #B1302C;
        }

        .tooltip.left .tooltip-arrow {
            border-left-color: #B1302C;
        }

        .tooltip.bottom .tooltip-arrow {
            border-bottom-color: #B1302C;
        }

        .tooltip.bottom-left .tooltip-arrow {
            border-bottom-color: #B1302C;
        }

        .tooltip.bottom-right .tooltip-arrow {
            border-bottom-color: #B1302C;
        }

        .tooltip>.tooltip-inner {
            background-color: #B1302C;
        }

        .jumbotron {
            padding: 20px 15px;
            /*margin-bottom: 30px;*/
            color: inherit;
            background-color: #eee;
        }

        input[type="radio"] {
            margin-right: 1%;
        }
    </style>

    <script type="text/javascript">
        //capture screenshot for google maps in onload
        //Added by Anupriya
        /* var getMapEnc = "";
         $(function () {
             var map;
             var latlng = new google.maps.LatLng(49.241943, -122.889318);
             var myOptions = {
                 zoom: 12,
                 center: latlng,
                 disableDefaultUI: true,
                 mapTypeId: google.maps.MapTypeId.ROADMAP
             };
         
             map = new google.maps.Map(document.getElementById("maploc"), myOptions);

             //$("#btnappraisalcomplete").click(function () {
             setTimeout(function () {
                 html2canvas($("#maploc"), {
                     useCORS: true,
                     onrendered: function (canvas) {
                         theCanvas = canvas;

                         var fullQuality = canvas.toDataURL('image/jpeg', 1.0);
                         var mapScreenshot = fullQuality.replace('data:image/jpeg;base64,', '');
                         $(function () {
                             $.session.set("MapEcn", mapScreenshot);
                         });
                     }
                 });
             }, 1000);
         });*/
        fnSessionMangement(); //Added by Anupriya to call set interval function
        //Added by Anupriya for adding dynamic textbox
        function fndynamictxtbox(arg) {
            var noofroomcount = $('#txtrooms').val().trim();
            var i;
            $(".dynamicRoom").remove();
            if (noofroomcount == "") {
                return;
            }
            for (i = noofroomcount; i > 0; i--) {
                $(arg).closest(".myrow").after(
                    '<div class="row myrow dynamicRoom"><div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">' +
                    '<span id="lblrooms">Room ' + i +
                    ' details</span></div><div class="col-lg-4 col-md-4 col-sm-10 col-xs-10 divmiddle1">' +
                    '<input name="ctl00$ContentPlaceHolder1$txtrooms" type="text" id="txtroom' + i +
                    '" class="form-control dynamicTextboxRoom"> </div> </div>')
            }
        }


        var ddlmeasurementval;
        var ddlpropTypeSumlen;
        var ddlProptypeappdlen;

        var streetName = "";
        var City12 = "";
        var Area = "";

        var validator = ""; // To check validity of a form
        var GetvalueId = ""; // Get valuation ID from Session Variable
        var GetPrpoId = ""; // Get Property ID
        var SaveDetails = ""; // Seting accordion name 
        var userid = ""; // Get User ID from Session Variable
        var referrer; //Take link of previous page

        $(window).resize(function () {
            if ($(window).width() <= 776) {
                $("#txtrecommendedvalue").parent('td').removeAttr('colspan')
                $("#Label4").parent('td').removeAttr('colspan')
            }
            if ($(window).width() >= 776) {
                $("#txtrecommendedvalue").parent('td').attr('colspan', '3')
                $("#Label4").parent('td').attr('colspan', '2')
            }
        });

        //document ready function
        $(function () {
            referrer = document.referrer;
            //date picker initialization
            $('#dtpickerReg').datetimepicker({
                format: 'D/M/YYYY'
            });
            $('#dtpickersurvey').datetimepicker({
                format: 'D/M/YYYY'
            });
            $('#dtpickerInspection').datetimepicker({
                format: 'D/M/YYYY'
            }); //Added by Nirmala
            $('#dtpickervaluation').datetimepicker({
                format: 'D/M/YYYY'
            }); //Added by Nirmala
            $('#dtpickersurveydate').datetimepicker({
                format: 'D/M/YYYY'
            }); //Added by Nirmala
            $('#dtpickerappdate').datetimepicker({
                format: 'D/M/YYYY'
            }); //Added by Nirmala


            //Accordion toggle
            var active = true;
            $('#myAccordion').on('show.bs.collapse', function () {
                if (active) $('#myAccordion .in').collapse('hide');
            });

            //Password Check 
            $("#txtpwd").on('keyup', function () {
                var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
                var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
                var enoughRegex = new RegExp("(?=.{8,}).*", "g");
                if (false == enoughRegex.test($(this).val())) {
                    $('#lblpwdok').css("color", "rgba(160, 14, 0, 0.88)");
                    $('#lblpwdok').html('Minimum 8 Characters required !!');
                    return false;
                } else if (strongRegex.test($(this).val())) {
                    $('#lblpwdok').html('Strong!').css("color", "#267B17");
                } else if (mediumRegex.test($(this).val())) {
                    $('#lblpwdok').html('Medium!').css("color", "rgba(160, 14, 0, 0.88)");
                } else {
                    $('#lblpwdok').html('Password should contain combination of uppercase lowercase number and special character').css("color", "red");
                }
                return true;
            });

            //Password page Submit click
            $("#btnSubmit").click(function () {
                var password = $("#txtPassword").val();
                var confirmPassword = $("#txtConfirmPassword").val();
                if (password != confirmPassword) {
                    $(function () {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'medium',
                            message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> Passwords do not Match...</p>',
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 2500);
                       // bootbox.alert("Passwords do not match.");
                    });
                }
            });

            $('.img-wrap').css('cursor', 'pointer');

        });

        function deletecook() {
            var d = new Date();
            document.cookie = "v0='<%=Session["UserID"]%>';expires=" + d.toGMTString() + ";" + ";";
        }

        function fnlocpropcheck() {
            ptype = $('#txtlocproptype').val()
            if (ptype == "Land") {
                $('#txtproprjustification').attr("disabled", true);
                $('input[name$=FootageDetails]').attr('disabled', true);
                $('input[name$=FootageDetails]').attr('checked', false);
                fncheckPropFootage()
            }
            else {
                $('#txtproprjustification').attr("disabled", false);
                $('input[name$=FootageDetails]').attr('disabled', false);
                $("#rdnlocrequireNo").prop('checked', 'checked');
                fncheckPropFootage();
            }
        }

        //Services Textbox enable Function   //Added by Deepa
        function Servicestxtboxenabled(eve) {}
        /* function Servicestxtboxenabled(eve) {
             //alert(eve.id)
             if (eve.id == 'txtwatersupplyarrang') {
                 txtopenwell.disabled = true;
                 txtdeepbore.disabled = true;
                 txthandpump.disabled = true;
                 txtmotor.disabled = true;
                 txtcorpotap.disabled = true;
                 txtundergnd.disabled = true;
                 txtoverheadtank.disabled = true;

             }
             if (eve.id == 'txtopenwell' || eve.id == 'txtdeepbore' ||
                 eve.id == 'txthandpump' || eve.id == 'txtmotor' ||
             eve.id == 'txtcorpotap' || eve.id == 'txtundergnd' || eve.id == 'txtlbloverheadtank') {
                 txtwatersupplyarrang.disabled = true;
             }
             if (eve.id == 'txtdrainagearrang') {
                 txtseptictank.disabled = true;
                 txtundergndsew.disabled = true;
             }
             if (eve.id == 'txtseptictank' || eve.id == 'txtundergndsew') {
                 txtdrainagearrang.disabled = true;
             }
             if (eve.id == 'txtplumbing') {
                 txtclosets.disabled = true;
                 txtwashbasins.disabled = true;
                 txtbathtubs.disabled = true;
                 txtwatermetertaps.disabled = true;
                 txtotherfixtures.disabled = true;
             }
             if (eve.id == 'txtclosets' || eve.id == 'txtwashbasins' ||
                 eve.id == 'txtbathtubs' || eve.id == 'txtwatermetertaps' ||
             eve.id == 'txtotherfixtures') {
                 txtplumbing.disabled = true;
             }
             if (eve.id == 'txtelecfitting') {
                 txtwiring.disabled = true;
                 txtlightpts.disabled = true;
                 $('input[name$=rdnsuperior]').attr('disabled', true);
                 txtfanpts.disabled = true;
                 txtotheritem.disabled = true;
                 txtotherfixtures.disabled = true;
             }
             if (eve.id == 'txtwiring' || eve.id == 'txtlightpts' ||
                 eve.id == 'txtfanpts' || eve.id == 'txtotheritem' ||
                 eve.id == 'txtotherfixtures' || eve.id == 'rdnsuperior') {
                 txtelecfitting.disabled = true;
             }
             if (eve.id == 'txtrmvalueCW' || eve.id == 'txtrmvalueCW2' ||
                eve.id == 'txtcompundwall') {
                 txtheight.disabled = true;
                 txtlength.disabled = true;
                 txttypeofconstruction.disabled = true;
             }
             if (eve.id == 'txtheight' || eve.id == 'txtlength' ||
                eve.id == 'txttypeofconstruction') {
                 txtrmvalueCW.disabled = true;
                 txtrmvalueCW2.disabled = true;
                 txtcompundwall.disabled = true;
             }
         }*/


        //function fnback() {
        //    window.location.href = document.referrer;
        //}

        function txtboxenabled(eve) {
            //if (eve.id == 'rdnApprovedYes' || eve == 'rdnApprovedYes') {
            //    txtnonapproval.disabled = true;
            //    $('input[name$=Approvedby]').attr('disabled', false);
            //    txtApprovaNo.disabled = false;
            //}
            //else if (eve.id == 'rdnApprovedNo' || eve == 'rdnApprovedNo') {
            //    txtnonapproval.disabled = false;
            //    radiobtncheck.disabled = true;
            //    txtApprovaNo.disabled = true;
            //    txtnonapproval.disabled = false;
            //    $('input[name$=Approvedby]').attr('disabled', true);
            //}
            //else if (eve.id == 'rdnApprovedpending' || eve == 'rdnApprovedpending') {
            //    txtnonapproval.disabled = true;
            //    $('input[name$=Approvedby]').attr('disabled', false);
            //    txtApprovaNo.disabled = true;
            //}
            //else if (eve.id == 'rdbtnmeasurementYes') {
            //    txtsurveyorcert.disabled = true;
            //}
            //else if (eve.id == 'rdbtnmeasurementNo') {
            //    txtsurveyorcert.disabled = false;
            //}
            if (eve.id == 'rdnsketchmatchYes') {
                txtsurveysketch.disabled = true;
            }
            else if (eve.id == 'rdnsketchmatchNo') {
                txtsurveysketch.disabled = false;
            }
            //   else if (eve.id == 'rdnalreadyregYes') {
            var State = localStorage.getItem("State");

            if (State != "Tamil Nadu") {
                $("#ddlzone").attr('required', false)
                //$("#txtZone").attr('required', false)
                $("#ddlsroloc").attr('required', false)
                $("#ddlvillage").attr('required', false)
                $('#txtsurveyno').attr('required', false)
                $("#txtsurveydate").attr('required', false)
                var validator = $("#masterform").validate();
                $('#ddlzone').rules("add", {
                    //$('#txtZone').rules("add", {
                    aFunction: false,
                    messages: {
                        aFunction: ""
                    }
                });

                $('#ddlsroloc').rules("add", {
                    aFunction: false,
                    messages: {
                        aFunction: ""
                    }
                });

                $('#ddlvillage').rules("add", {
                    aFunction: false,
                    messages: {
                        aFunction: ""
                    }
                });

                $("#txtsurveyno").attr('disabled', false).val('').attr('required', false)
                $("#txtsurveydate").attr('disabled', false).val('').attr('required', false)

                }
                else {
                    var validator = $("#masterform").validate();

                $('#ddlzone').rules("add", {
                    //$('#txtZone').rules("add", {
                    aFunction: true,
                    messages: {
                        aFunction: ""
                    }
                });

                $('#ddlsroloc').rules("add", {
                    aFunction: true,
                    messages: {
                        aFunction: ""
                    }
                });

                $('#ddlvillage').rules("add", {
                    aFunction: true,
                    messages: {
                        aFunction: ""
                    }
                });
                $("#txtsurveyno").attr('disabled', false).val('').attr('required', true)
                $("#txtsurveydate").attr('disabled', false).val('').attr('required', true)
            }


            //  $('#txtdateofregn').attr('required', true).val('')
            //    $('#txtRegistrationvalue').attr('required', true).val('')
            $('#txtregName').attr('required', true).val('')
            // $('#txtdateofregn').attr('disabled', false).val('').attr('required', true)
            //  $('#txtRegistrationvalue').attr('disabled', false).val('').attr('required', true)
            $('#txtregName').attr('disabled', false).val('').attr('required', true)

            $('#ddlzone').attr('disabled', false)
            //$('#txtZone').attr('disabled', false)
            $('#ddlsroloc').attr('disabled', false)
            $('#ddlvillage').attr('disabled', false)

            ddlzone.selectedIndex = 0;
            //txtZone.selectedIndex = 0;
            ddlsroloc.selectedIndex = 0;
            ddlvillage.selectedIndex = 0;

            //   }
            //    else if (eve.id == 'rdnalreadyregNo') {
            //$('#txtdateofregn').attr('required', false)
            //$('#txtRegistrationvalue').attr('required', false)
            $('#txtregName').attr('required', false)

            //$('#txtdateofregn').attr('disabled', true).val('').attr('required', false)
            //    $('#txtRegistrationvalue').attr('disabled', true).val('').attr('required', false)
            $('#txtregName').attr('disabled', true).val('').attr('required', false)
            $("#txtsurveyno").attr('disabled', true).val('').attr('required', false)
            $("#txtsurveydate").attr('disabled', true).val('').attr('required', false)
            ddlzone.selectedIndex = 0;
            //txtZone.selectedIndex = 0;
            $('#ddlzone').attr('disabled', true)
            // $('#txtZone').attr('disabled', true)
            $('#ddlsroloc').attr('disabled', true)
            $('#ddlvillage').attr('disabled', true)
            var validator = $("#masterform").validate();
            $('#ddlzone').rules("add", {
                //$('#txtZone').rules("add", {
                aFunction: false,
                messages: {
                    aFunction: ""
                }
            });

            $('#ddlsroloc').rules("add", {
                aFunction: false,
                messages: {
                    aFunction: ""
                }
            });

            $('#ddlvillage').rules("add", {
                aFunction: false,
                messages: {
                    aFunction: ""
                }
            });

            ddlsroloc.selectedIndex = 0;
            ddlvillage.selectedIndex = 0;
            //   }
            // else {
            //alert("Radio button click")
            //}
        }

        //Jquery Validation function
        function checkval(elem) {
            status = 0;
            validator = $("#masterform").validate();

            //force user to select a value in dropdown
            $.validator.addMethod("aFunction",
                function (value, element) {
                    if (value == "none")
                        return false;
                    else
                        return true;
                }, "Please select a value");

            //regex validation
            $.validator.addMethod(
                "regex",
                function (value, element, regexp) {
                    var re = new RegExp(regexp);
                    return this.optional(element) || re.test(value);
                });

            $.validator.addMethod("lessThan",
                function (value, element) {
                    var enteredYear = value;
                    var curYear = new Date();
                    curYear = curYear.getFullYear();
                    return enteredYear <= curYear;
                }
            );

            $('#txtpwd').rules("add", {
                required: true,
                regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                minlength: 8,
                messages: {
                    regex: "",
                    required: "",
                    minlength: "Minimum 8 characters required"
                }
            });

            $('#txtconstruction').rules("add", {
                regex: /^[0-9]{4}$/,
                lessThan: $('#txtconstruction').val(),
                messages: {
                    regex: "Year Should contain four digit",
                    lessThan: "Year Value should not Exceed the Current Year"
                }
            });

            $('#txtconstruction').rules("add", {
                regex: /^[0-9]{4}$/,
                messages: {
                    regex: "Year Should contain four digit"
                }
            });

            $('#txtconfirmpwd').rules("add", {
                required: true,
                equalTo: "#txtpwd",
                messages: {
                    required: "",
                    equalTo: "Enter same password again"
                }
            });

            $('#ddlQues').rules("add", {
                aFunction: true,
                messages: {
                    aFunction: ""
                }
            });
            $('#ddlloccountry').rules("add", {
                aFunction: true,
                messages: {
                    aFunction: ""
                }
            });
            $('#ddllocstate').rules("add", {
                aFunction: true,
                messages: {
                    aFunction: ""
                }
            });
            $('#ddlloccity').rules("add", {
                aFunction: true,
                messages: {
                    aFunction: ""
                }
            });

            $.validator.messages.required = '';

            $('textarea', $('#' + elem)).each(function () {
                try {
                    validator.element('#' + this.id)
                    if (validator.element('#' + this.id) == false) {
                        status = 1;
                    }
                }
                catch (exp) {
                    console.log("Element ID " + this.id + " --Exception -- " + exp)
                }
            });

            $('input', $('#' + elem)).each(function () {
                try {
                    validator.element('#' + this.id)
                    if (validator.element('#' + this.id) == false) {
                        status = 1;
                    }
                }
                catch (exp) {
                    console.log("Element ID " + this.id + " --Exception -- " + exp)
                }
            });
            $('select', $('#' + elem)).each(function () {
                try {
                    if (this.id != "ddlzone" && this.id != "ddlsroloc" && this.id != "ddlvillage") {
                        //if (this.id != "txtZone" && this.id != "ddlsroloc" && this.id != "ddlvillage") {
                        $('#' + this.id).rules("add", {
                            aFunction: true,
                            messages: {
                                aFunction: ""
                            }
                        });
                        if (validator.element('#' + this.id) == false) {
                            status = 1;
                        }
                    }
                }
                catch (exp) {
                    console.log("Element ID " + this.id + " --Exception -- 2133223select" + exp)
                }
            });

            return status;
        }
        //Added by Nirmala
        function getPropIDs() {
            GetPropId = '<%=Session["PropertyID"]%>';
            var val = GetPropId;
            return val;
        }

        function getPropType() {
            GetPropType = '<%=Session["PropertyType"]%>';
            var val = GetPropType;
            return val;
        }


        function getIDs() {
            GetvalueId = '<%=Session["ValuationID"]%>';
            var val = GetvalueId;
            return val;
        }

        function getuserID() {
            userid = '<%=Session["UserID"]%>';
            var val = userid;
            return val;
        }

        function approvaldetailclick() {

            var State = localStorage.getItem("State");

            if (State == "Tamil Nadu") {
                retrievezonelist("Zone")
            }
            else {
                $("#ddlzone").attr('disabled', true).parent().parent().hide()
                $("#ddlsroloc").attr('disabled', true).parent().parent().hide()
                $("#ddlvillage").attr('disabled', true).parent().parent().hide()
                $('#txtsurveyno').attr('disabled', true).parent().parent().hide()
                $("#txtsurveydate").attr('disabled', true).parent().parent().hide()
            }

            $('#modalloading').modal('show');
            SaveDetails = "ApprovalDetails";
            GetStatusDetails(SaveDetails);
            $('#modalloading').modal('hide');
        }

        function retrievezonelist(loctype) {

            var obj = {
                LocationType: loctype,
                //Zone: $("#ddlzone").val(),
                //SROLOC: $("#ddlsroloc").val()
                Zone: $("#txtZone").val(),
                SROLOC: $("#txtSRO").val()
            }

            var jsonstring = JSON.stringify(obj);

            $.ajax({
                type: "POST",
                url: "landingpage.aspx/RetrieveRegProp",
                data: jsonstring,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    jsonObj = JSON.parse(response.d);
                    if (response.d == "0") {
                        $(function () {
                            retrievezonelist(loctype)
                        });
                    }
                    else {
                        //debugger
                        var dropdownvalues = jsonObj;
                        var option = '';
                        for (var i = 0; i < dropdownvalues.length; i++) {
                            option += '<option value="' + dropdownvalues[i] + '">' + dropdownvalues[i] + '</option>';
                        }
                        if (loctype == "Zone") {
                            $('#ddlzone').html('');
                            $('#ddlzone').append('<option value="none">Select Zone</option>');
                            $('#ddlzone').append(option);
                            //$('#txtZone').html('');
                            //$('#txtZone').append('<option value="none">Select Zone</option>');
                            //$('#txtZone').append(option);
                        }
                        else if (loctype == "SRO") {
                            $('#ddlsroloc').html('');
                            $('#ddlsroloc').append('<option value="none">Select SRO</option>');
                            $('#ddlsroloc').append(option);
                        }
                        else if (loctype == "Village") {
                            $('#ddlvillage').html('');
                            $('#ddlvillage').append('<option value="none">Select Village</option>');
                            $('#ddlvillage').append(option);
                        }
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                },
            });
        }

        //Get Services detail click.. Added By Deepa
        function servicesdetailclick() {
            $('#modalloading').modal('show');
            SaveDetails = "ServiceStatus";
            GetStatusDetails(SaveDetails);
            var valID = getIDs;
            $('#modalloading').modal('hide');
        }

        function amenitydetailclick() {
            $('#modalloading').modal('show');
            SaveDetails = "AmenityDetails";
            GetStatusDetails(SaveDetails);
            $('#modalloading').modal('hide');
        }

        /*function GetAccptstatus() {
            $('#modalloading').modal('show');
            $('#modalloading').modal('hide');
        }*/
        function pricedetailclick() {
            $('#modalloading').modal('show');
            SaveDetails = "PriceDetails";
            GetStatusDetails(SaveDetails);
            $('#modalloading').modal('hide');
        }
        //Added by Nirmala
        function generaldetailclick() {
             var propType = '<%=Session["PropertyType"]%>';
            $('#textgenproptype').val(propType);
            $('#textgenproptype').attr('readonly', 'readonly');

            $('#modalloading').modal('show');
            SaveDetails = "GeneralDetails";
            GetStatusDetails(SaveDetails);
            $('#modalloading').modal('hide');
        }
        //Added by Nirmala
        function statutorydetailclick() {
            $('#modalloading').modal('show');
            SaveDetails = "StatutoryDetails";
            GetStatusDetails(SaveDetails);
            $('#modalloading').modal('hide');
        }

        function propdescgeneraldetailclick() {
            $('#modalloading').modal('show');
            SaveDetails = "PropDescDetails";
            GetStatusDetails(SaveDetails);
            $('#modalloading').modal('hide');
        }

        //Buliding Details Added by Anupriya
        function buildingdetailclick() {
            $('#modalloading').modal('show');
            SaveDetails = "BuildingStatus";
            GetStatusDetails(SaveDetails);
            var valID = getIDs;
            $('#modalloading').modal('hide');
        }
        //Valuation General Details Added by Anupriya
        function valgenclick() {
            $('#modalloading').modal('show');
            SaveDetails = "ValuationGeneralStatus";
            GetStatusDetails(SaveDetails);
            var valID = getIDs;
            $('#modalloading').modal('hide');
        }
        //Get Property Land detail click..//Added by Deepa
        function landdetailclick() {
            $('#modalloading').modal('show');
            SaveDetails = "LandStatus";
            GetStatusDetails(SaveDetails);
            var valID = getIDs;
            $('#modalloading').modal('hide');
        }
        function summarydetailclick() {
            $('#modalloading').modal('show');
            SaveDetails = "SummaryDetails";
            GetStatusDetails(SaveDetails);
            $('#modalloading').modal('hide');
        }

        function miscdetailclick() {
            //get Property Type
            $('#modalloading').modal('show');
            SaveDetails = "MiscDetails";
            GetStatusDetails(SaveDetails);
            $('#modalloading').modal('hide');
        }

        function appraisaldetailclick() {
             $("#txtestimate").attr('required', true)
            $("#txtestmarket").attr('required', true)
            $("#txtguide").attr('required', true)
            $("#txtrecommendation").attr('required', true)
            $("#txtrecommendedvalue").attr('required', true)
            $("#txtguidpersqft").attr('required', true)
            // $("#txtInvoiceAmt").attr('required', true)

            var image = "";
            if (localStorage.getItem("locImagegrp") != null) {
                image = localStorage.getItem("locImagegrp")
            }
            var obj1 = getPropValSummary();
            var divstatus = checkval('divSummarydetailsContent');
            if (divstatus == 0) {
                $('#modalloading').modal('show');
                SaveDetails = "AppraisalDetails";
                GetStatusDetails(SaveDetails);
                var valID = getIDs;
                //$('#modalloading').modal('hide');
            }
            else {
                bootbox.dialog({
                    closeButton: true,
                    size: 'medium',
                    message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please enter Valid Values in the Highlighted Mandatory Field(s)...</p>',
                });
                setTimeout(function () {
                    bootbox.hideAll();
                }, 2500);
               // bootbox.alert("<div>Please enter valid values in the highlighted mandatory field(s)</div>");
                var id = $('.error').attr('id');
                var selid = $('select.error').attr('id');
                $('label.error').remove();
                $('html,body').animate({
                    scrollTop: $("#" + id).offset().top - 30
                }, 'slow');
            }
        }

        function scrolltoid(elemid) {
            $('html,body').animate({
                scrollTop: $("#" + elemid).offset().top - 30
            }, 'slow');
        }       
        function fnsavePricedetails() {
            //var landmeasurement = $("#txtlandmeasurement").val();
            var totalarea = $('#txttotalarea').val();
            var propstatus;
            var livstatus;
            //landmeasurement = landmeasurement.trim();
            totalarea = totalarea.trim();

            var selprop = getpropertytype();
            if (selprop == "Land") {
                //if (landmeasurement != totalarea && landmeasurement != "") {
                //    $("#txtsurveyorcert").attr('disabled', false)
                //    $("#txtsurveyorcert").attr('required', true)
                //}
                //else {
                //    $("#txtsurveyorcert").attr('disabled', true)
                //    $("#txtsurveyorcert").attr('required', false)
                //}

                $("#txtconstruction").attr('required', false)
                $("#txttotalarea").attr('required', true)
                $("#txtcommon").val('')
                $("#txtplinth").val('')
                $("#txtcarpet").val('')
                propstatus = "";
                livstatus = "";
                propfootage = "";
                footreason = "";

            }
            else if (selprop == "Apartment") {
                $("#txtconstruction").attr('required', true)
                $("#txtcommon").attr('required', true)
                $("#txtplinth").attr('required', true)
                $("#txtcarpet").attr('required', true)

                // $("#txtsurveyorcert").attr('disabled', false)
                // $("#txtsurveyorcert").attr('required', false)

                $("#txttotalarea").attr('disabled', true)
                propstatus = $('input[name$=propstatus]:checked').val()
                livstatus = $('input[name$=rdnlivabl]:checked').val()
                propfootage = $('input[name$=FootageDetails]:checked').val();
                footreason = $('#txtlocFootageReason').val();
                PropertyNorth = $("#txtpropertynorth").val(), //Added by Anupriya
                    PropertySouth = $("#txtpropertysouth").val(), //Added by Anupriya
                    PropertyEast = $("#txtpropertyeast").val(), //Added by Anupriya
                    PropertyWest = $("#txtpropertywest").val() //Added by Anupriya
                //Added by Anupriya
                priceEls = document.getElementsByClassName("dynamicTextboxRoom");
                var myarray = [];
                for (var i = 0; i < priceEls.length; i++) {
                    var price = priceEls[i].value;
                    myarray.push(price);
                }
                RoomDescription = myarray;
            }
            else {
                $("#txtconstruction").attr('required', true)
                $("#txttotalarea").attr('required', true)
                //$("#txtsurveyorcert").attr('disabled', false)
                //$("#txtsurveyorcert").attr('required', false)

                propstatus = $('input[name$=propstatus]:checked').val()
                livstatus = "";
                propfootage = $('input[name$=FootageDetails]:checked').val();
                footreason = $('#txtlocFootageReason').val();
                PropertyNorth = $("#txtpropertynorth").val(),//Added by Anupriya
               PropertySouth = $("#txtpropertysouth").val(),//Added by Anupriya
               PropertyEast = $("#txtpropertyeast").val(),//Added by Anupriya
               PropertyWest = $("#txtpropertywest").val()//Added by Anupriya
                //Added by Anupriya
                priceEls = document.getElementsByClassName("dynamicTextboxRoom");
                var myarray = [];
                for (var i = 0; i < priceEls.length; i++) {
                    var price = priceEls[i].value;
                    myarray.push(price);
                }
                RoomDescription = myarray;
            }

            if ($('input[name$=propstatus]:checked').val() != "House - Completed" && $('input[name$=propstatus]:checked').val() != "Apartment - Completed") {
                //alert($('input[name$=propstatus]:checked').val())
                $("#txtconstruction").attr('required', false)
            }

            fnchklivCond();

            $('#txtlocextendofland').attr('required', true)
            //$('#txtlocroadwidth').attr('required', true)

            divstatus = checkval('divpricingdetailsBody');
            if (divstatus == 0) {
                $('#modalloading').modal('show');
                var valueId = getIDs();
                sessionStorage.setItem('totalarea', "");
                sessionStorage.setItem('totalarea', $("#txttotalarea").val());
                $('#modalloading').modal('hide');
                //hdntotalarea.value = $("#txttotalarea").val();
                var obj = {
                    ValuationID: valueId,
                    PropertyStatus: propstatus,
                    TotalArea: $('#txttotalarea').val(),
                    CommonArea: $('#txtcommon').val(),
                    CommonAreaPercentage: $("#txtcommonper").val(),
                    PlinthArea: $('#txtplinth').val(),
                    CarpetArea: $('#txtcarpet').val(),
                    Age: $('#txthouseage').val(),
                    NoofFloors: $('#txtfloors').val(),
                    Footage: $('#txtfootage').val(),
                    LivableStatus: livstatus,
                    NonLivableReason: $('#txtreason').val(),
                    NoofRooms: $('#txtrooms').val(),
                    RoomDescription: RoomDescription,//Added by Anupriya
                    RoomsFootage: $('#txtsqfoot').val(),
                    //LandMeasure: $("#txtlandmeasurement").val(),
                   // MismatchReason: $("#txtsurveyorcert").val(),
                    LandExtent: $('#txtlocextendofland').val(),
                    Unit: $('#ddllocunits :selected').val(),
                  //SurroundedBy: $('input[name$=SurroundBy]:checked').val(),
                    //RoadWidth: $('#txtlocroadwidth').val(),
                    FootageDetails: propfootage,
                    FootageReason: footreason,
                    YearConstructed: $("#txtconstruction").val(),
                    FloorSpaceIndex: $("#txtfloorspace").val(),
                    PropertyNorth : $("#txtpropertynorth").val(),//Added by Anupriya
                    PropertySouth : $("#txtpropertysouth").val(),//Added by Anupriya
                    PropertyEast : $("#txtpropertyeast").val(),//Added by Anupriya
                    PropertyWest: $("#txtpropertywest").val()//Added by Anupriya
                }
                var jsonobj = JSON.stringify(obj);
                fnpricingsave(jsonobj);
            }
            else {
                bootbox.dialog({
                    closeButton: true,
                    size: 'medium',
                    message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please enter Valid Values in the Highlighted Mandatory Field(s)...</p>',
                });
                setTimeout(function () {
                    bootbox.hideAll();
                }, 2500);
                //bootbox.alert("<div>Please enter valid values in the highlighted mandatory field(s)</div>");
                var id = $('.error').attr('id');
                $('html,body').animate({
                    scrollTop: $("#" + id).offset().top
                }, 'slow');
                $("#txtcommon").attr('required', false)
                $("#txtplinth").attr('required', false)
                $("#txtcarpet").attr('required', false)
                $("#txttotalarea").attr('required', false)
            }
        }

        //Services save Function ///Added by Deepa
        function fnsaveservicesdetails() {          
            var getvalid = getIDs();
            var locsaveusrid = getuserID();
            var Service_DetailsFinal = {};
            sessionStorage.setItem('ServiceTotal',"");
            sessionStorage.setItem('ServiceTotal', $("#txttotal").val());
            var ServiceArray = [];
            var Service_Details = {};
            $('.servicestextbox').each(function (a, doc) {
                var Service_Details = {}; //Added by Deepa
                if ($(doc).val() != "") {
                    Service_Details["Servicesname"] = $(doc).attr("servicestextvalue");
                    Service_Details["Value"] = $(doc).val();
                    ServiceArray.push(Service_Details)
               }               
             });
            if ($('input[name$=rdnsuperior]:checked').attr('disabled')) { }           
            else 
            {
                Service_Details["Servicesname"] = "ClassofFitting";
                Service_Details["Value"] = $('input[name$=rdnsuperior]:checked').val();
                ServiceArray.push(Service_Details)
            }
            var obj = {
                ServiceDetails: JSON.stringify(ServiceArray),
                UserID: locsaveusrid,
                ValuationID: getvalid,
            }
            var jsonobj = JSON.stringify(obj);
            saveservicesdetails(jsonobj);
        }
        //End of the Services save Function

        //Amenities DepreciationValue Added by deepa
        function DepreciationValue() {
            var Obj = {};
            //$('#dlAmenitiesbuilding :selected').each(function (i, selected) {
            //    Obj = {
            //        SelectedValues: $(selected).val(),
            //    }
            //});
            $('#tblAmenitiesbuilding tbody tr').each(function (q, doc) {
                Obj = {
                    SelectedValues: $(this).find("td:eq(1)").find('option:selected').text(),
                }
            });
            var jsonobj = JSON.stringify(Obj);
            DepreciationValuemethod(jsonobj);

        }

        function DepreciationValuemethod(objgetdepvalue) {

            $.ajax({
                type: "POST",
                url: "landingpage.aspx/DepreciationValue",
                data: objgetdepvalue,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    var json_obj = $.parseJSON(response.d);

                    if (json_obj[0].DepreciationValue == "Yes") {
                      //  arg = '#dlAmenitiesbuilding'

                      //  $(arg).closest(".myrow").after('<div class="row myrow dynamicRoom"><div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">' +
                      //'<span id="lblDepValues" class="lblDepValues">' + json_obj[0].ParamValue + ' Depreciation Value (In Rupees):</span></div><div class="col-lg-4 col-md-4 col-sm-10 col-xs-10 divmiddle1">' +
                      //'<input name="ctl00$ContentPlaceHolder1$txtrooms" type="text" onkeypress="return isNumberKey(event)" id="txtDepValues' + json_obj[0].ParamValue + '" class="form-control dynamicTextboxRoom" > </div> </div>')
                      //  // fndynamictxtboxDV("",json_obj[0].ParamValue);
                    }
                    else if (json_obj[0].DepreciationValue == "No")
                    { }


                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                },
            });
        }

        function fnsaveAmenitydetails() {
            $('#modalloading').modal('show');
            var valueId = getIDs();
            var UtilitySelect = [];
            var UtilityFitness = [];
            var UtilityHealth = [];
            var locsaveusrid = getuserID(); //Added by Deepa
            //var UtilityBuilding = [];//Added by Deepa
            var labelDepreciationValue;
            var DepreciationValue;
            var UtilityBuilding = {}; //Added by Deepa
            var UtilityBuildingArray = [];
            $('#modalloading').modal('hide');
            $('#dlamenity :selected').each(function (i, selected) {
                UtilitySelect[i] = $(selected).val();
            });
            $('#dlfitness :selected').each(function (i, selected) {
                UtilityFitness[i] = $(selected).val();
            });
            $('#dlhealth :selected').each(function (i, selected) {
                UtilityHealth[i] = $(selected).val();
            });
            ////Added by Deepa
            //$('#dlAmenitiesbuilding :selected').each(function (i, selected) {
            //    UtilityBuilding[i] = $(selected).val();
            //});
            //Added by Deepa
            if ($("#tblAmenitiesbuilding tbody tr").length > 0 && $("#tblAmenitiesbuilding tbody tr:last td:eq(0)").find("option:selected").text() == "Select") {
                $("#tblAmenitiesbuilding tbody tr:last td:eq(0) select").addClass("error");
                bootbox.dialog({
                    closeButton: true,
                    size: 'medium',
                    message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please Select a Amenities Building...</p>',
                });
                setTimeout(function () {
                    bootbox.hideAll();
                }, 2500);
               // bootbox.alert("Please select a Amenities Building");
                return
            }
            else {
                $('#tblAmenitiesbuilding tbody tr').each(function (q, doc) {
                    var UtilityBuilding = {}; //Added by Deepa
                    labelDepreciationValue = $(this).find("td:eq(0)").find('option:selected').text()
                    DepreciationValue = $(this).find("td:eq(1)").find('input').val()

                    UtilityBuilding['Amenitiesname'] = labelDepreciationValue;
                    UtilityBuilding['DepreciationValue'] = DepreciationValue;
                    UtilityBuildingArray.push(UtilityBuilding)

                });
            }

            ////Added by Deepa
            //priceEls = document.getElementsByClassName("dynamicTextboxRoom");
            //var element = $('.lblDepValues');

            //var myarray = [];
            //var labelmyarray = [];
            //var DepreciationValue_Details = {};
            //var obj1 = {};
            //for (var i = 0; i < priceEls.length; i++) {
            //    var price = priceEls[i].value;
            //    var label = $(element[i]).text();
            //    if (label == "Ornamental Front / Pooja door Depreciation Value (In Rupees):") {
            //        obj1["OrnamentalFrontPoojadoorDepreciationValue"] = price

            //    }
            //    if (label == "Open staircase Depreciation Value (In Rupees):") {
            //        obj1["OpenstaircaseDepreciationValue"] = price

            //    }
            //    if (label == "Wardrobes,showcases,wooden cupboards Depreciation Value (In Rupees):") {
            //        obj1["WardrobesDepreciationValue"] = price

            //    }
            //    if (label == "Interior decorations Depreciation Value (In Rupees):") {
            //        obj1["InteriordecorationsDepreciationValue"] = price

            //    }
            //    if (label == "Architectural Elevation works Depreciation Value (In Rupees):") {
            //        obj1["ArchitecturalElevationworksDepreciationValue"] = price

            //    }
            //    if (label == "False ceiling works Depreciation Value (In Rupees):") {
            //        obj1["FalseceilingworksDepreciationValue"] = price

            //    }
            //    if (label == "Separate Lumber Room Depreciation Value (In Rupees):") {
            //        obj1["SeparateLumberRoomDepreciationValue"] = price

            //    }
            //    if (label == "Separate Toiler Room Depreciation Value (In Rupees):") {
            //        obj1["SeparateToilerRoomDepreciationValue"] = price
            //    }

            //    if (label == "Any other Depreciation Value (In Rupees):") {
            //        obj1["AnyotherDepreciationValue"] = price

            //    }
            //}
            //DepreciationValue_Details["DepreciationValue"] = obj1
            var AmenitiesFinal = {};
            AmenitiesFinal["NoofLifts"] = $('#txtlift').val();
            AmenitiesFinal["NoofCarpark"] = $('#txtcarpark').val();
            AmenitiesFinal["NoofCoveredCarpark"] = $('#txtcovered').val();
            AmenitiesFinal["WelfareAssn"] = $('#txtresident').val();
            AmenitiesFinal["Others"] = $('#txthealthothers').val();
            AmenitiesFinal["FlatMaintainance"] = $('#txtflatmaintainance').val();
            var obj = {
                ValuationID: valueId,
                UserID: locsaveusrid,
                //NoofLifts: $('#txtlift').val(),
                // NoofCarpark: $('#txtcarpark').val(),
                //NoofCoveredCarpark: $('#txtcovered').val(),
                //WelfareAssn: $('#txtresident').val(),
                // Others: $('#txthealthothers').val(),
                //FlatMaintainance: $('#txtflatmaintainance').val(),
                AmenitiesFinal: JSON.stringify(AmenitiesFinal),

                UtilitySelect: UtilitySelect.toString(),
                UtilityFitness: UtilityFitness.toString(),
                UtilityHealth: UtilityHealth.toString(),

                // UtilityBuilding: JSON.stringify(UtilityBuildingArray),//Added by Deepa
                UtilityBuilding: JSON.stringify(UtilityBuildingArray),
                //UtilityBuilding: UtilityBuilding.toString(),  //Added by Deepa
                //DepreciationValue: JSON.stringify(DepreciationValue_Details)//Added by Deepa
            }
            var jsonobj = JSON.stringify(obj);
            fnamenitysave(jsonobj);
        }

        function fnsaveSummary() {
            var locsaveusrid = getuserID();
            var getvalid = getIDs();
            $("#txtestimate").attr('required', true)
            $("#txtestmarket").attr('required', true)
            $("#txtguide").attr('required', true)
            $("#txtrecommendation").attr('required', true)
            $("#txtrecommendedvalue").attr('required', true)
            $("#txtguidpersqft").attr('required', true)
            // $("#txtRemark").attr('required', true)
            var image = "";
            if (localStorage.getItem("locImagegrp") != null) {
                image = localStorage.getItem("locImagegrp")
            }
            $("#tblpropval tbody tr select").removeClass("error");
            if ($("#tblpropval tbody tr").length > 0 && $("#tblpropval tbody tr:last td:eq(0)").find("option:selected").text() == "Select") {
                $("#tblpropval tbody tr:last td:eq(0) select").addClass("error");
                bootbox.dialog({
                    closeButton: true,
                    size: 'medium',
                    message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please Select a Description...</p>',
                });
                setTimeout(function () {
                    bootbox.hideAll();
                }, 2500);
                window.setTimeout(function () {
                    var errors = $('.error')
                    if (errors.length) {
                        $('html, body').animate({ scrollTop: errors.offset().top - 500 }, 500);
                    }
                }, 0);
                //bootbox.alert("Please select a description");
                return
            }
            // debugger
            $("#tblpropval tbody tr ").find("td:eq(1)").find('input').removeClass("error");
            // if ($("#tblpropval tbody tr").length > 0 && $("#tblpropval tbody tr ").find("td:eq(0)").find("option:selected").text() == "Others") {
           if ($("#tblpropval tbody tr").length > 0 && $("#tblpropval tbody tr:last td:eq(0)").find("option:selected").text() == "Others") {
               var Remark = $("#tblpropval tbody tr:last ").find("td:eq(1)").find('input').val()
               if (Remark == "" || Remark == undefined || Remark == null) {
                   // $("#tblpropval tbody  ").closest('tr').find("td:eq(1)").find('input').addClass("error");
                   $("#tblpropval tbody tr:last ").find("td:eq(1)").find('input').addClass("error");
                   bootbox.dialog({
                       closeButton: true,
                       size: 'medium',
                       message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please enter Valid Values in the Highlighted Mandatory Field(s)...</p>',
                   });
                   setTimeout(function () {
                       bootbox.hideAll();
                   }, 2500);
                   window.setTimeout(function () {
                       var errors = $('.error')
                       if (errors.length) {
                           $('html, body').animate({ scrollTop: errors.offset().top - 500 }, 500);
                       }
                   }, 0);
                  // bootbox.alert("<div>Please enter valid values in the highlighted mandatory field(s)</div>");
                   return
               }
           }
            // var obj1 = getPropValSummary();
            divstatus = checkval('divSummarydetailsContent');
            if (divstatus == 0) {
                var recommendedval = $('#txtrecommendedvalue').val();
                recommendedval = recommendedval.replace(/\s*[\r\n]+\s*/g, '\n');
                var recommendedvalpmr = $("#txtrecommendedvaluepmr").val();
                recommendedvalpmr = recommendedvalpmr.replace(/\s*[\r\n]+\s*/g, '\n');
                $('#modalloading').modal('show');

                var ValuationSummary = {};
                var TableData = [];
                var GLR = $('#txtsummaryglr').val()
                var PMR = $('#txtsummarypmr').val()
                var measurement = $('#txtMeasurement').val()

                if (measurement == "" || measurement == undefined || measurement == null) {
                    var TotalGLR = GLR;
                    var TotalPMR = PMR;
                }
                else{
                    var TotalGLR = measurement * GLR;
                    var TotalPMR = measurement * PMR;
                }
                
                if ($("#txtfinalrec").val() == "") {
                  sessionStorage.setItem('TotalRecommPMR', "")
                 sessionStorage.setItem('TotalRecommPMR', $("#txtrecommendedvaluepmr").val())
                var titalrecpmr = localStorage.getItem('TotalRecommPMR');
            }
            else{
                var titalrecpmr = $("#txtfinalrec").val();
            }
               var AdditionalDetail = $('#sumotherdetails').val();
                AdditionalDetail = AdditionalDetail.replace(/\s*[\r\n]+\s*/g, '\n');

                $('#tblpropval tbody tr').each(function (k, doc) {
                    const TableData1 = {
                        Type: $(this).find("td:eq(0)").find('option:selected').val(),
                        Remark: $(this).find("td:eq(1)").find('input').val(),
                        Measurement: $(this).find("td:eq(2)").find('input').val(),
                        GLR: $(this).find("td:eq(3)").find('input').val(),
                        PMR: $(this).find("td:eq(4)").find('input').val(),
                        TotalGlr: $(this).find("td:eq(5)").find('input').val(),
                        TotalPMR: $(this).find("td:eq(6)").find('input').val(),
                    }
                    TableData.push(TableData1)
                });

                ValuationSummary["TableData"] = TableData;
                ValuationSummary["TotalRecommendedValueGLR"] = recommendedval;
                ValuationSummary["TotalRecommendedValuePMR"] = recommendedvalpmr;
                ValuationSummary["Recommendation"] = $('#txtrecommendation').val();
                ValuationSummary["AdditionalDetail"] = AdditionalDetail;
                ValuationSummary["FinalRecommendedValue"] = titalrecpmr;
                var summaryobj = {

                    EstRatePerSqFt: $('#txtestimate').val(),
                    EstimatedValue: $("#txtesttotval").val(),
                    Guidelinesqft: $("#txtguidpersqft").val(),
                    GuidelineValue: $('#txtguide').val(),
                    CompositeRate: $("#txtcompositelocality").val(),
                    ValuationMethod: $('#ddlmethodofvaluation').val(),
                    NewConstructionCompositeRate: $("#txtnewcompositelocality").val(),
                    ReplacementCost: $("#txtreplacecost").val(),
                    LifeOfBuilding: $("#txtbuildinglife").val(),
                    TotalCompositeRate: $("#txttotalcomposite").val(),
                    Summarydetails: JSON.stringify(ValuationSummary),
                    Reason: $("#txtmismatchreason").val(),
                    Images: image,
                    InvoiceAmt: $("#txtInvoiceAmt").val(),
                    UserID: locsaveusrid,
                    ValuationID: getvalid
                }
                var summaryjsonobj = JSON.stringify(summaryobj);
                saveSummaryDetails(summaryjsonobj);
                $('#modalloading').modal('hide');
            }
            else {
                bootbox.dialog({
                    closeButton: true,
                    size: 'medium',
                    message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please enter Valid Values in the Highlighted Mandatory Field(s)...</p>',
                });
                setTimeout(function () {
                    bootbox.hideAll();
                }, 2500);
                window.setTimeout(function () {
                    var errors = $('.error')
                    if (errors.length) {
                        $('html, body').animate({ scrollTop: errors.offset().top - 500 }, 500);
                    }
                }, 0);
               // bootbox.alert("<div>Please enter valid values in the highlighted mandatory field(s)</div>");
               /* var id = $('.error').attr('id');
                var selid = $('select.error').attr('id');
                $('label.error').remove();
                $('html,body').animate({
                    scrollTop: $("#" + id).offset().top
                }, 'slow');*/
            }
        }
        function fnlocsave(eve) {
            $('#txtlocaddr1').attr('required', true)
            //$('#txtlocArea').attr('required', true)
            $('#txtloclandmark').attr('required', true)
            $('#txtlocpincode').attr('required', true)
            $('#txtlocValuationPurpose').attr('required', true);
            $('#ddlloccountry').attr('required', true)
            $('#ddllocstate').attr('required', true)
            $('#ddlloccity').attr('required', true)
            //alert(localStorage.getItem("LatLongitue"))
            divstatus = checkval('divlocdetailscontent');
            if (divstatus == 0) {
                //$('#modalloading1').modal('show');
                var locsaveusrid = getuserID();
                var undval;
                var obj = {
                    UserID: locsaveusrid,
                    PropertyID: $('#txtlocPropertyID').val(),
                    PropertyType: $('#txtlocproptype').val(),
                    ProjectSiteName: $('#txtlocprojsite').val(),
                    AddressLine1: $('#txtlocaddr1').val(),
                    AddressLine2: $('#txtlocaddr2').val(),
                    AddArea: $('#txtareaname').val(),
                    StreetName: $('#txtstreetnameval').val(),
                    Landmark: $('#txtloclandmark').val(),
                    Pincode: $('#txtlocpincode').val(),
                    Country: $('#ddlloccountry :selected').val(),
                    State: $('#ddllocstate :selected').val(),
                    City: $('#ddlloccity :selected').val(),
                   // LocationType: $('input[name$=LocationDetails]:checked').val(),
                    latlng: localStorage.getItem("LatLongitue"),
                    RoadName: "",
                    DoorNumber: $('#txtpropdoorNo').val(),
                    LandExtent: "",
                    Unit: "",
                    SurroundedBy: "",
                    RoadWidth: "",
                    FootageDetails: "",
                    FootageReason: "",
                    ValuationPurpose: $("#txtlocValuationPurpose").val()
                }
                var jsonobj = JSON.stringify(obj);
                fnproptysave(jsonobj);
            }
            else {
                //$('#modalloading1').modal('hide');
                var id = $('.error').attr('id');
                $('html,body').animate({
                    scrollTop: $("#" + id).offset().top
                }, 'slow');
                $("#" + id).tooltip('show');

                $('#txtlocaddr1').attr('required', false)
                // $('#txtlocArea').attr('required', false)
                $('#txtlocValuationPurpose').attr('required', false);
                $('#txtloclandmark').attr('required', false)
                //$('#txtlocArea').attr('required', false)
                $('#txtlocpincode').attr('required', false)
            }
        }

        ////Added by Nirmala
        //function fnregnaddrow(obj) {
        //    $("#" + obj + " tbody").append("<tr><td align=center><input type=checkbox /></td>"
        //           + "<td><input type=text class=form-control /> </td>"
        //           + "<td><input type=text class=form-control /> </td>"
        //           + "<td><input type=text class=form-control /> </td>"
        //           + "<td><input type=text class=form-control /> </td>"
        //           + "</tr>");
        //}
        //Added by Nirmala
        function fnregnaddrow(obj) {            
            $("#" + obj + " tbody").append("<tr>"
                   + "<td><input type=text class=form-control /> </td>"
                   + "<td><input type=text class=form-control /> </td>"
                   + "<td><input type=text class=form-control /> </td>"
                   + "<td><input type=text class=form-control /> </td>"
                   + '<td><button type="button" id="btnregnaddfn" runat="server" class="btn-link" style="color: #0066CC" onclick="fnregnaddrow(`tblregisteredname`);"><span class="glyphicon glyphicon-plus-sign" title"AddRow"></span></button> </td>'
                   + '<td> <button type="button" id="btnregnremoverowfn" runat="server" class="btn-link"><span class="glyphicon glyphicon-trash" title"Delete"></span></button> </td>'
                   + "</tr>");
        }
        $(document).on('click', 'button#btnregnremoverow', function () {
            var i = 1;
            if ($('#tblregisteredname tbody tr').length == i) {
                $(".removethis").toggleClass("removethis");
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> You Cant Remove All the Rows...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                   // bootbox.alert("You cant remove all the rows");
                });
            }
            else {
                $(this).closest('tr').remove();
                return false;
            }
        });
        $(document).on('click', 'button#btnregnremoverowfn', function () {
            var i = 1;
            if ($('#tblregisteredname tbody tr').length == i) {
                $(".removethis").toggleClass("removethis");
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> You Cant Remove All the Rows...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                    //bootbox.alert("You cant remove all the rows");
                });
            }
            else {
                $(this).closest('tr').remove();
                return false;
            }
        });
        //function fnregnremoverow() {
        //    var remrow = [];
        //    var i = 0;

        //    $('#tblregisteredname tbody tr').each(function () {
        //        if ($(this).find("td:eq(0) input").is(":checked") == true) {
        //            $(this).addClass("removethis");
        //            i++;
        //        }
        //    })

        //    if ($('#tblregisteredname tbody tr').length == i) {
        //        $(".removethis").toggleClass("removethis");
        //        $(function () {
        //            bootbox.alert("You cant remove all the rows");
        //        });

        //    }
        //    if (i == 0) {
        //        $(function () {
        //            bootbox.alert("Please select a row to delete");
        //        });
        //    }
        //    else {
        //        $(".removethis").remove();
        //    }
        //}

        function fnsaveGeneral() {
            
            var getvalid = getIDs();
            var locsaveusrid = getuserID();
            var Registerednametbleg1 = {};
            var PropertyID = getPropIDs();
            var PropType = getPropType();
            AdminUserDetails();

            if (obj == 'textgenvalass') {
                var drop = '<select class=form-control ><option value="none">Select</option>' + admindropdown() + '</select>';
            }

            //else {
            //    var drop = '<select class=form-control ><option value="none">Select</option>' + getdropdownval() + '</select>';
            //}
            var Ownerdetails = {};
            var JointOwners = [];
            $('#tblregisteredname tbody tr').each(function (k, doc) {
                const JointOwners1 = {
                    OwnerName: $(this).find("td:eq(0)").find('input').val(),
                    OwnerAddress: $(this).find("td:eq(1)").find('input').val(),
                    OwnerPhone: $(this).find("td:eq(2)").find('input').val(),
                    SharePercent: $(this).find("td:eq(3)").find('input').val()
                }
                JointOwners.push(JointOwners1);
            });


            Ownerdetails["JointOwners"] = JointOwners;

            Ownerdetails["PropertyOwnDuration"] = $("#textgenownprop").val();
            //Registerednametbl["OwnerDetails"] = ownerdetails;
            var documentsperusal = $('#txtperusal').val();
            documentsperusal = documentsperusal.replace(/\s*[\r\n]+\s*/g, '\n');
            var obj = {
                PropertyID: PropertyID,
                UserID: locsaveusrid,
                ValuationID: getvalid,
                ValuationPurpose: $("#textgenval").val(),
                InspectionDate: $("#textgeninsdate").val(),
                ValuationDate: $("#textgenvaldate").val(),
                Ownerdetails: JSON.stringify(Ownerdetails),
                Listdocumentsperusal: documentsperusal,
                BriefDescriptionProperty: $("#textgendescprop").val(),
                ScopeValuation: $("#textgenscopeval").val(),
                Nameofbank: $("#textgennamebank").val(),
                Branchbankappraisal: $("#textgenbankbranch").val(),
                Valuerassociationdropdown: $("#textgenvalasso").val(),
                Personsvisitingsite: $("#textgenpersonacc").val(),
                Projectsitename: $("#textgenprojsite").val(),
                LocationType: $('input[name$=LocationDetails]:checked').val(),
                PropertyType: PropType
            }
            var jsonobj = JSON.stringify(obj);
            saveGeneraldetails(jsonobj);
        }

        function fnsavePropdesc() {
            var getvalid = getIDs();
            var locsaveusrid = getuserID();
            var PropertyID = getPropIDs();
            var RegnReason = $("#landAptid").val()
            RegnReason = RegnReason.replace(/\s*[\r\n]+\s*/g, '\n');
            var NoOfDwelling = $("#txtdwllingunits").val()
            NoOfDwelling = NoOfDwelling.replace(/\s*[\r\n]+\s*/g, '\n');
            var txttotalsqft = $('#txttotalsqft').val();
            sessionStorage.setItem('txttotalsqft',"");
            sessionStorage.setItem('txttotalsqft', $("#txttotalsqft").val());
            var obj = {
                PropertyID: PropertyID,
                UserID: locsaveusrid,
                ValuationID: getvalid,
                DoorNo: $("#txtprodoorNo").val(),
                StreetName: $("#Textpropstreet").val(),
                AreaName: $("#txtproareaname").val(),
                City: $("#txtprocity").val(),
                State: $("#txtprostate").val(),
                Country: $("#Textpropcountry").val(),
                Pincode: $("#textproppin").val(),
                Areaclassification: $('input[name$=propdescDetailsarea]:checked').val(),
                EconomicClassification: $('input[name$=propdescDetailseco]:checked').val(),
                RegnStatus: $('input[name$=AlreadyRegistered]:checked').val(),
                RegnReason: RegnReason,
                RegnDate: $('#txtdateofregn').val(),
                RegnValue: $('#txtRegistrationvalue').val(),
                UndividedShare: $("#txtundividedshare").val(),
                RoadWidth: $('#txtlocroadwidth').val(),
                Surroundedbyfence: $('input[name$=SurroundBy]:checked').val(),
                landmeasurement: $("#txtlandmeasurement").val(),
                MismatchReason: $("#txtsurveyorcert").val(),
                PropertyArea: $('input[name$=rdnPropertyArea]:checked').val(),
                NoOfDwelling: NoOfDwelling,
                Zone: $("#txtprozone").val(),
                SROLocation: $("#txtprosro").val(),
                Village: $("#txtprovillage").val(),
                SurveyNumber: $("#txtprosurno").val(),
                SurveyDate: $("#txtprosurdate").val(),
                NamebuttingRoad: $("#txtproabutrd").val(),
                Orientationplot: $("#txtproorienplot").val(),
                Landmark: $("#txtprolandmark").val(),
                Proximitysurcomm: $("#txtprosurcomm").val(),
                Distancecitylimits: $("#txtprodiscity").val(),
                TotalArea: $("#txttotalsqft").val(),
            }
            var jsonobj = JSON.stringify(obj);
            savepropdescdetails(jsonobj);
        }
        //Added by Nirmala
        //$(function () {
        //    $("input[name$=statreserved]").click(function () {
        //        if ($(this).val() == "Others") {
        //            $("#otherstext").show();
        //        } else {
        //            $("#otherstext").hide();
        //        }
        //    });
        //});

        //Added by Nirmala
        function fnsavestatutory() {
            var getvalid = getIDs();
            var locsaveusrid = getuserID();
            var PropertyID = getPropIDs();
            // var ReservedLand;
            //if (document.getElementById('txtstatreserved5').checked) {
            //    ReservedLand = $("#txtstatreserved6").val()
            //}
            //else {
            //    ReservedLand = $('input[name$=statreserved]:checked').val()
            //}
            var ReserveComments = $("#txtstatreserved9").val();
            ReserveComments = ReserveComments.replace(/\s*[\r\n]+\s*/g, '\n');
            var obj = {
                PropertyID: PropertyID,
                UserID: locsaveusrid,
                ValuationID: getvalid,
                Restrictiveclauses: $("#txtstatrest").val(),
                Typeofusetoput: $('input[name$=stattypeofuse]:checked').val(),
                ReservedLand: $('input[name$=statreserved]:checked').val(),
                ReserveComments: ReserveComments,
                caseconversionsite: $('input[name$=statcontemplated]:checked').val(),
                lockedland: $('input[name$=statlocked]:checked').val(),
                approvedlayout: $('input[name$=stattownplan]:checked').val(),
                drawingapprovaldate: $("#txtstatdrawing").val(),
                ApprovedStatus: $('input[name$=Approved]:checked').val(),
                ApprovingAuthority: $('input[name$=statappauth]:checked').val(),
                ApprovingAuthorityNo: $("#txtstatappnumber").val(),
                ApprovingAuthorityDate: $("#txtstatappdate").val(),
                ReleaseCertNo: $('#txtReleaseCertNo').val(),
                approvedverified: $('input[name$=statauth]:checked').val(),
                sanctionedplan: $("#txtstatsanction").val(),
                Detailsofvariations: $("#txtstatvariations").val(),
                empanelledvaluers: $("#txtstatempanelled").val(),
                Valuationearlier: $("#txtstatvalued").val(),
                PropertyAssessmentno: $("#txtstatassess").val(),
                PropertyTaxAmount: $("#txtstattaxamt").val(),
                PropertyTaxReceiptNo: $("#txtstattaxreceipt").val(),
                PropertyTaxPaidPeriod: $("#txtstatdatepaid").val(),
                PropertyTaxPaidname: $("#txtstattaxpaid").val(),
                ElectricityService: $("#txtstatelectricity").val(),
                MasterCardname: $("#txtstatmaster").val(),
                WealthTaxpaidAmount: $("#txtstatwealth").val(),
                Agreementseasements: $("#txtstatease").val(),
                WaterTaxespaid: $("#txtstatwater").val(),
            }
            var jsonobj = JSON.stringify(obj);
            savestatutorydetails(jsonobj);
        }



        //Added by Anupriya

        /*
            Below code is used to add new row in the table
        */

        function fnhouseapartaddrow(obj) {
            //$("#" + obj + " tbody").append("<tr><td align=center><input type=checkbox /></td>"
                 $("#" + obj + " tbody").append("<tr>"
                   + "<td><input type=text class=form-control  /> </td>"
                   + "<td><input type=text class=form-control /> </td>"
                   + "<td><input type=text class=form-control /> </td>"
                   + "<td><input type=text class=form-control /> </td>"
                   + "<td><input type=text class=form-control /></td>"
                   + '<td><button type="button" id="houserowaddfn" runat="server" class="btn-link" style="color: #0066CC" onclick="fnhouseapartaddrow(`tblhouseapart`);"><span class="glyphicon glyphicon-plus-sign" title="AddRow"></span></button></td>'
                   + '<td><button type="button" id="houserowdeletefn" runat="server" class="btn-link"><span class="glyphicon glyphicon-trash" title="Delete"></span></button></td>'
                   + "</tr>");
        }

        //Added by Anupriya

        /*
            Below function used to remove the rows in table
        */
        //function fnhouseapartremoverow() {
        //    var remrow = [];
        //    var i = 0;

        //    $('#tblhouseapart tbody tr').each(function () {
        //        if ($(this).find("td:eq(0) input").is(":checked") == true) {
        //            $(this).addClass("removethis");
        //            i++;
        //        }
        //    })

        //    if ($('#tblhouseapart tbody tr').length == i) {
        //        $(".removethis").toggleClass("removethis");
        //        $(function () {
        //            bootbox.alert("You cant remove all the rows");
        //        });

        //    }
        //    if (i == 0) {
        //        $(function () {
        //            bootbox.alert("Please select a row to delete");
        //        });
        //    }
        //    else {
        //        $(".removethis").remove();
        //    }
        //}
        $(document).on('click', 'button#houserowdeletefn', function () {
            var i = 1;
            if ($('#tblhouseapart tbody tr').length == i) {
                $(".removethis").toggleClass("removethis");
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> You Cant Remove All the Rows...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                   // bootbox.alert("You cant remove all the rows");
                });
            }
            else {
                $(this).closest('tr').remove();
                return false;
            }
        });
        $(document).on('click', 'button#houserowdelete', function () {
            var i = 1;
            if ($('#tblhouseapart tbody tr').length == i) {
                $(".removethis").toggleClass("removethis");
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> You Cant Remove All the Rows...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                   // bootbox.alert("You cant remove all the rows");
                });
            }
            else {
                $(this).closest('tr').remove();
                return false;
            }
        });
        //Added by Anupriya

        /*
            Below code is used to add new row in the table
        */

        function fnplinthaddrow(obj) {
            //$("#" + obj + " tbody").append("<tr><td align=center><input type=checkbox /></td>"
            $("#" + obj + " tbody").append("<tr>"
                   + "<td><input type=text class=form-control /> </td>"
                   + "<td><input type=text class=form-control /> </td>"
                   + "<td><input type=text class=form-control /> </td>"
                   + "<td><input type=text class=form-control /> </td>"
                   + "<td><input type=text class=form-control /></td>"
                   + "<td><input type=text class=form-control /></td>"
                   + '<td><button type="button" id="btnplinthareaaddfn" runat="server" class="btn-link" style="color: #0066CC" onclick="fnplinthaddrow(`tblplintarea`);"><span class="glyphicon glyphicon-plus-sign" title="AddRow"></span></button></td>'
                   + '<td><button type="button" id="btnplintharearemovefn" runat="server" class="btn-link"><span class="glyphicon glyphicon-trash" title="Delete"></span></button></td>'
                   + "</tr>");
        }

        //Added by Anupriya

        /*
            Below function used to remove the rows in table
        */

        //function fnplinthremoverow() {
        //    var remrow = [];
        //    var i = 0;

        //    $('#tblplintarea tbody tr').each(function () {
        //        if ($(this).find("td:eq(0) input").is(":checked") == true) {
        //            $(this).addClass("removethis");
        //            i++;
        //        }
        //    })

        //    if ($('#tblplintarea tbody tr').length == i) {
        //        $(".removethis").toggleClass("removethis");
        //        $(function () {
        //            bootbox.alert("You cant remove all the rows");
        //        });

        //    }
        //    if (i == 0) {
        //        $(function () {
        //            bootbox.alert("Please select a row to delete");
        //        });
        //    }
        //    else {
        //        $(".removethis").remove();
        //    }
        //}
        $(document).on('click', 'button#btnplintharearemove', function () {
            var i = 1;
            if ($('#tblplintarea tbody tr').length == i) {
                $(".removethis").toggleClass("removethis");
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> You Cant Remove All the Rows...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                  //  bootbox.alert("You cant remove all the rows");
                });
            }
            else {
                $(this).closest('tr').remove();
                return false;
            }
        });
        $(document).on('click', 'button#btnplintharearemovefn', function () {
            var i = 1;
            if ($('#tblplintarea tbody tr').length == i) {
                $(".removethis").toggleClass("removethis");
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> You Cant Remove All the Rows...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                  //  bootbox.alert("You cant remove all the rows");
                });
            }
            else {
                $(this).closest('tr').remove();
                return false;
            }
        });

        function fnotherstxtbox(){
            var other = $('#ddltypeofconst').val();
            if(other == "Other"){
                $('#ddltypeofconst').closest(".myrow").after('<div class="row myrow dynamictxtbox"><div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">' +
                        '</div><div class="col-lg-4 col-md-4 col-sm-10 col-xs-10 divmiddle1">' +
                        '<input name="othertxtbox" type="text" id="txtotherbuilding" class="form-control dynamictxtboxother txtboxsize"> </div> </div>')
            }
            else{
                $('#txtotherbuilding').remove();
                return false;
            }
        }

        //Added by Anupriya
        /*
            Below function used to save the details in db
        */
        function fnsaveBuilddetails() {
            var getvalid = getIDs();
            var Building_Details = {};
            var DeedObj = {};
            var ActualObj = {};
            var ExtentDeedObj = {};
            var ExtentActualObj = {};
            var HeightFloorNum = {};
            var YearOfConstruction = [];
            var PlinthArea = [];
            divstatus = checkval('divbuildingdetailsContent');

            /*
                Below code is used to save the table details
            */

            $('#tblBuliddetnorth tbody tr:eq(0)').each(function (index) {
                DeedObj["PropertyNorth"] = $(this).find("td:eq(1)").find('input').val()
                ActualObj["PropertyNorth"] = $(this).find("td:eq(2)").find('input').val()
                DeedObj["DimensionNorth"] = $(this).find("td:eq(3)").find('input').val()
                ActualObj["DimensionNorth"] = $(this).find("td:eq(4)").find('input').val()
            });
            $('#tblBuliddetnorth tbody tr:eq(1)').each(function (index) {
                DeedObj["PropertySouth"] = $(this).find("td:eq(1)").find('input').val()
                ActualObj["PropertySouth"] = $(this).find("td:eq(2)").find('input').val()
                DeedObj["DimensionSouth"] = $(this).find("td:eq(3)").find('input').val()
                ActualObj["DimensionSouth"] = $(this).find("td:eq(4)").find('input').val()
            });
            $('#tblBuliddetnorth tbody tr:eq(2)').each(function (index) {
                DeedObj["PropertyEast"] = $(this).find("td:eq(1)").find('input').val()
                ActualObj["PropertyEast"] = $(this).find("td:eq(2)").find('input').val()
                DeedObj["DimensionEast"] = $(this).find("td:eq(3)").find('input').val()
                ActualObj["DimensionEast"] = $(this).find("td:eq(4)").find('input').val()
            });

            $('#tblBuliddetnorth tbody tr:eq(3)').each(function (index) {
                DeedObj["PropertyWest"] = $(this).find("td:eq(1)").find('input').val()
                ActualObj["PropertyWest"] = $(this).find("td:eq(2)").find('input').val()
                DeedObj["DimensionWest"] = $(this).find("td:eq(3)").find('input').val()
                ActualObj["DimensionWest"] = $(this).find("td:eq(4)").find('input').val()
            });
            $('#tblBuliddetextent tbody tr:eq(0)').each(function (index) {
                DeedObj["ExtentAsPerDeed"] = $(this).find("td:eq(1)").find('input').val()
                ActualObj["ExtentActual"] = $(this).find("td:eq(2)").find('input').val()
                sessionStorage.setItem('BuildingMeasure', $(this).find("td:eq(1)").find('input').val());
            });

            $('#tblBuliddetextent tbody tr:eq(1)').each(function (index) {
                DeedObj["UnitAsPerDeed"] = $(this).find("td:eq(1)").find('input').val()
                ActualObj["UnitActual"] = $(this).find("td:eq(2)").find('input').val()
            });

            /*
                Below code is used to save the dynamic rows values
            */

            $('#tblhouseapart tbody tr').each(function (k, doc) {
                const YearConstruction = {
                    FloorNum: $(this).find("td:eq(0)").find('input').val(),
                    YearReported: $(this).find("td:eq(1)").find('input').val(),
                    YearObserved: $(this).find("td:eq(2)").find('input').val(),
                    YearAsPerDeed: $(this).find("td:eq(3)").find('input').val(),
                    YearCompleted: $(this).find("td:eq(4)").find('input').val()
                }
                YearOfConstruction.push(YearConstruction);
            });

            $('#tblplintarea tbody tr').each(function (l, doc) {
                const Plinth = {
                    FloorNum: $(this).find("td:eq(0)").find('input').val(),
                    Heightofthefloor: $(this).find("td:eq(1)").find('input').val(),
                    PlinthAreaMain: $(this).find("td:eq(2)").find('input').val(),
                    PlinthAreaCantilevered: $(this).find("td:eq(3)").find('input').val(),
                    PlinthAreaTotal: $(this).find("td:eq(4)").find('input').val(),
                    RoomDetails: $(this).find("td:eq(5)").find('input').val()
                }
                PlinthArea.push(Plinth);
            });

            /*
                Below code is used to save the details in obj
            */

            Building_Details["AsPerDeed"] = DeedObj;
            Building_Details["Actual"] = ActualObj;

            Building_Details["TypeOfConstruction"] = $('#ddltypeofconst').val();
            Building_Details["Others"] = $('#txtotherbuilding').val();
            Building_Details["Quality"] = $('input[name$=rdnsuper]:checked').val();
            Building_Details["BuildingAppearance"] = $('input[name$=rdncommon]:checked').val();

            Building_Details["Maintenance_Interior"] = $('#ddlint').val();
            Building_Details["Maintenance_Exterior"] = $('#ddlext').val();

            Building_Details["YearOfConstruction"] = YearOfConstruction;

            Building_Details["PlinthArea"] = PlinthArea;

            Building_Details["PropertyLivable"] = $('input[name$=rdnlivabl]:checked').val();
            Building_Details["OccupiedPeriod"] = $('#txtoccupiedperiod').val();
            Building_Details["CompoundWall"] = $('input[name$=Compoundwall]:checked').val();
            Building_Details["BuildingCompoundWall"] = $('#txtcompound').val();
            Building_Details["OccupiedBy"] = $('input[name$=rdnoccupied]:checked').val();
            Building_Details["GrossMonthlyRent"] = $('#txtgrossmonthlyrent').val();
            Building_Details["GrossAdvanceAmt"] = $('#txtgrossadvanceamt').val();
            if (divstatus == 0) {
                $('#modalloading').modal('show');
                var locsaveusrid = getuserID();
                var obj = {
                    UserID: locsaveusrid,
                    ValuationID: getvalid,
                    BuildingDetail: JSON.stringify(Building_Details),
                    /* TypeOfConstruction: $('#ddltypeofconst').val(),
                     QualityOfConstruction: $('input[name$=rdnsuper]:checked').val(),
                     ApperanceOfBuilding: $('input[name$=rdncommon]:checked').val(),
                     Maintenance_Interior: $('#ddlint').val(),
                     Maintenance_Exterior: $('#ddlext').val(),
                     OccupiedBy: $('input[name$=rdnoccupiedBy]:checked').val(),
                     GrossMonthlyRent: $('#txtgrossmonthlyrent').val(),
                     GrossAdvanceAmount: $('#txtgrossadvanceamt').val()*/
                }

                var jsonobj = JSON.stringify(obj);
                saveBuildingdetails(jsonobj);//calling the ajax method to save details
            }
            else {
                $("#txtsurveyno").attr("required", false);
                bootbox.dialog({
                    closeButton: true,
                    size: 'medium',
                    message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please enter Valid Values in the Highlighted Mandatory Field(s)...</p>',
                });
                setTimeout(function () {
                    bootbox.hideAll();
                }, 2500);
              //  bootbox.alert("<div>Please enter valid values in the highlighted mandatory field(s)</div>");
                var id = $('.error').attr('id');

                $('html,body').animate({
                    scrollTop: $("#" + id).offset().top
                }, 'slow');
            }
        }

        //Added by Anupriya

        /*
            Below function used to add the rows in table for life,age/apartment,deperation%,deperation value,rep desc,rep tot area sqft,rep est sqft,
            rep est val in rs
        */

        function fnlifebuildaddrow(obj) {
           // $("#" + obj + " tbody").append("<tr><td align=center><input type=checkbox /></td>"
              $("#" + obj + " tbody").append("<tr>"
                   + "<td><input type=text class=form-control /> </td>"
                   + "<td><input type=text class=form-control /> </td>"
                   + "<td><input type=text class=form-control /> </td>"
                   + "<td><input type=text class=form-control /> </td>"
                   + "<td><input type=text class=form-control /></td>"
                   + "<td><input type=text class=form-control /></td>"
                   + "<td><input type=text class=form-control /></td>"
                   + "<td><input type=text class=form-control /></td>"
                   + "<td><input type=text class=form-control /></td>"
                   + '<td><button type="button" id="btnlifebuildaddrowfn" runat="server" class="btn-link" style="color: #0066CC" onclick="fnlifebuildaddrow(`tblbuildest`);"><span class="glyphicon glyphicon-plus-sign" title="AddRow"></span></button></td>'
                   + '<td><button type="button" id="btnlifebuildremoverowfn" runat="server" class="btn-link"><span class="glyphicon glyphicon-trash"  title="Delete"></span></button></td>'
                   + "</tr>");
        }

        //Added by Anupriya

        /*
            Below function used to remove the rows in table
        */

        //function fnlifebuildremoverow() {
        //    var remrow = [];
        //    var i = 0;

        //    $('#tblbuildest tbody tr').each(function () {
        //        if ($(this).find("td:eq(0) input").is(":checked") == true) {
        //            $(this).addClass("removethis");
        //            i++;
        //        }
        //    })

        //    if ($('#tblbuildest tbody tr').length == i) {
        //        $(".removethis").toggleClass("removethis");
        //        $(function () {
        //            bootbox.alert("You cant remove all the rows");
        //        });

        //    }
        //    if (i == 0) {
        //        $(function () {
        //            bootbox.alert("Please select a row to delete");
        //        });
        //    }
        //    else {
        //        $(".removethis").remove();
        //    }
        //}

        //function fnportroomsremoverow() {
        //    var remrow = [];
        //    var i = 0;

        //    $('#tblportrooms tbody tr').each(function () {
        //        if ($(this).find("td:eq(0) input").is(":checked") == true) {
        //            $(this).addClass("removethis");
        //            i++;
        //        }
        //    })

        //    if ($('#tblportrooms tbody tr').length == i) {
        //        $(".removethis").toggleClass("removethis");
        //        $(function () {
        //            bootbox.alert("You cant remove all the rows");
        //        });

        //    }
        //    if (i == 0) {
        //        $(function () {
        //            bootbox.alert("Please select a row to delete");
        //        });
        //    }
        //    else {
        //        $(".removethis").remove();
        //    }
        //}
        $(document).on('click', 'button#btnlifebuildremoverow', function () {
            var i = 1;
            if ($('#tblbuildest tbody tr').length == i) {
                $(".removethis").toggleClass("removethis");
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> You Cant Remove All the Rows...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                    //bootbox.alert("You cant remove all the rows");
                });
            }
            else {
                $(this).closest('tr').remove();
                return false;
            }
        });
        $(document).on('click', 'button#btnlifebuildremoverowfn', function () {
            var i = 1;
            if ($('#tblbuildest tbody tr').length == i) {
                $(".removethis").toggleClass("removethis");
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> You Cant Remove All the Rows...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                   // bootbox.alert("You cant remove all the rows");
                });
            }
            else {
                $(this).closest('tr').remove();
                return false;
            }
        });
        $(document).on('click', 'button#btnportroomremove', function () {
            var i = 1;
            if ($('#tblportrooms tbody tr').length == i) {
                $(".removethis").toggleClass("removethis");
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> You Cant Remove All the Rows...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
            // bootbox.alert("You cant remove all the rows");
                });
            }
            else {
                $(this).closest('tr').remove();
                return false;
            }
        });
        $(document).on('click', 'button#btnportroomremovefn', function () {
            var i = 1;
            if ($('#tblportrooms tbody tr').length == i) {
                $(".removethis").toggleClass("removethis");
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> You Cant Remove All the Rows...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                   // bootbox.alert("You cant remove all the rows");
                });
            }
            else {
                $(this).closest('tr').remove();
                return false;
            }
        });

        /*function fnddloption() {
        debugger
            var msg = "Enter Your Option Here";
            var ddval= $('#tblportrooms').find("td:eq(1)").find('option:selected').text();
            if (ddval == "Others") {
                //bootbox.prompt(msg);
                var ddl = $("#" + ddval + " option:first");
                bootbox.prompt(msg, function (result) {
                    if (result != null && result != "") {
                        ddl.after($("<option />").val(result).text(result));
                        $("#" + ddval).val(result);
                    }
            }
        }*/

        /*
            Below Array values for dropdwon values in Classification,Foundation etc section
        */
        var arr = [
               "ClassificationRooms",
               "Foundation",
               "SuperStructure",
               "Roof",
               "Flooring",
               "Joineries",
               "Wiring",
               "Doors",
               "Windows",
               "WeatheringCourse",
               "Others"
        ]

        //Added by Anupriya

        /*
            Below function used to add the rows in table for room,foundation,superstruct,roof,floor,join,wire,door,window and weathering course
        */

        function fnportroomaddrow(obj) {

            let items = '<option selected disabled value=\'' + 'Select' + '\'>' + 'Select' + '</option>';
            $.each(arr, function (index, item) {
                items += '<option value=\'' + item + '\'>' + item + '</option>';
            });
            //ddl = '<select class=form-control onchange = "fnddloption()" style="width:100%">' + items + '</select>';
            ddl = '<select class=form-control style="width:100%">' + items + '</select>';

           // $("#" + obj + " tbody").append("<tr><td align=center><input type=checkbox /></td>"
              $("#" + obj + " tbody").append("<tr>"
                   + "<td><input type=text class=form-control /> </td>"
                   + "<td>" + ddl + "</td>"
                   + "<td><input type=text class=form-control /> </td>"
                   + '<td><button type="button" id="btnportroomaddfn" runat="server" class="btn-link" style="color: #0066CC" onclick="fnportroomaddrow(`tblportrooms`); fnremoveddlvalue(); "><span class="glyphicon glyphicon-plus-sign" title="AddRow"></span></button></td>'
                   + '<td><button type="button" id="btnportroomremovefn" runat="server" class="btn-link"><span class="glyphicon glyphicon-trash" title="Delete"></span></button></td>'
                   + "</tr>");
        }

        /*
            Added by Anupriya
            Below code is used to remove the dropdown selected values
        */

        function fnremoveddlvalue() {
            var selval = [];
            $('#tblportrooms tbody tr').each(function () {
                var all = $(this).find("td:eq(1)").find('option:selected').val()
                selval.push(all);
            });

            for (i = 0; i < selval.length - 1; i++) {
                if (selval[i] != "none") {
                    $("#tblportrooms tbody tr:last td:eq(1)").find("select > option[value='" + selval[i] + "']").remove();
                }
            }
        }

        //Added by Anupriya for Valuation General details
        function fnsavevalgen() {
            divstatus = checkval('divvalgenContent');
            var getvalid = getIDs();
            var locsaveusrid = getuserID();
            var Valuation_General = {};

            var Marketability = $('#txtmarketinfo').val();
            Marketability = Marketability.replace(/\s*[\r\n]+\s*/g, '\n');
            Valuation_General["Marketability"] = Marketability;
            Valuation_General["PrevailingMarketRate"] = $('#txtpremarrate').val();
            Valuation_General["SourcePrevailingMarket"] = $('#txtsoupremarrate').val();
            Valuation_General["UnitRatePrevMarket"] = $('#txtunitrate').val();
            Valuation_General["ValueLandPMR"] = $('#txtpmr').val();
            Valuation_General["Guidelinesqft"] = $('#txtregoffice').val();
            Valuation_General["GuidelineValue"] = $('#txtglr').val();
            Valuation_General["PresentDepreciatedValue"] = $('#txtpresentval').val();
            Valuation_General["MarketValueBasisAdoptedRate"] = $('#txtrates').val();
            Valuation_General["MarketValueAdoptedRateSyncIT"] = $('#txtdeptrates').val();
            Valuation_General["MarketValueAdoptedRateSyncRagistrar"] = $('#txtregrates').val();
            Valuation_General["IsInsured"] = $('#txtbuildins').val();
            Valuation_General["ForcedSaleValue"] = $('#txtsaleval').val();
            Valuation_General["InfoForcedSaleValue"] = $('#txtsourcesaleval').val();
            Valuation_General["ReasonIncreaseValuation"] = $('#txtproreason').val();
            var ApprovalNotes = $('#txtnotesapp').val();
            ApprovalNotes = ApprovalNotes.replace(/\s*[\r\n]+\s*/g, '\n');
            Valuation_General["AdditionalNotes"] = ApprovalNotes;
            Valuation_General["YearPurchaseAcquisition"] = $('#txtpurland').val();
            Valuation_General["ValuePurchasePaid"] = $('#txtpricepaid').val();
            Valuation_General["YearPurchaseConstruction"] = $('#txtpurbuild').val();
            Valuation_General["CostPurchaseConstruction"] = $('#txtcostconst').val();
            Valuation_General["DetailAdditionImprovement"] = $('#txtimprov').val();
            Valuation_General["CostAdditionImprovement"] = $('#txttotcost').val();
            Valuation_General["PresentWrittenDownValue"] = $('#txtprestprop').val();

            /*
                Below code is used to save the dynamic rows values
            */

            var LifeBuildingEstimated = [];
            $('#tblbuildest tbody tr').each(function (k, doc) {
                const BuildingEstimated = {
                    FloorNum: $(this).find("td:eq(0)").find('input').val(),
                    LifeOfBuilding: $(this).find("td:eq(1)").find('input').val(),
                    Age: $(this).find("td:eq(2)").find('input').val(),
                    RateDepreciation: $(this).find("td:eq(3)").find('input').val(),
                    AmountDepreciation: $(this).find("td:eq(4)").find('input').val(),
                    ReplacementDesc: $(this).find("td:eq(5)").find('input').val(),
                    ReplacementTotalArea: $(this).find("td:eq(6)").find('input').val(),
                    RepEstRatePerSqFt: $(this).find("td:eq(7)").find('input').val(),
                    RepEstimatedValue: $(this).find("td:eq(8)").find('input').val(),
                }
                LifeBuildingEstimated.push(BuildingEstimated);
            });
            Valuation_General["LifeBuildingEstimated"] = LifeBuildingEstimated;

            var TableData = [];
            $('#tblportrooms tbody tr').each(function (q, doc) {
                const ClassificationRooms = {
                    Name :$(this).find("td:eq(1)").find('option:selected').text(),
                    FloorNum: $(this).find("td:eq(0)").find('input').val(),
                    SpecificationValue: $(this).find("td:eq(2)").find('input').val(),
                }
                TableData.push(ClassificationRooms);
            });
            Valuation_General["TableData"] = TableData;

            Valuation_General["SalvageValue"] = $('#txtsalval').val();
            var ref1 = $('#txtref1').val();
            ref1 = ref1.replace(/\s*[\r\n]+\s*/g, '\n');
            Valuation_General["Reference1"] = ref1;
            var ref2 = $('#txtref2').val();
            ref2 = ref2.replace(/\s*[\r\n]+\s*/g, '\n');
            Valuation_General["Reference2"] = ref2;
            Valuation_General["AssessedValue"] = $('#txtassedbuild').val();

            if (divstatus == 0) {
                $('#modalloading').modal('show');
                var locsaveusrid = getuserID();
                var obj = {
                    UserID: locsaveusrid,
                    ValuationID: getvalid,
                    ValuationGeneral: JSON.stringify(Valuation_General)
                }
                var jsonobj = JSON.stringify(obj);
                savevalgendetails(jsonobj);//calling the ajax method to save details
            }
        }


        //Property Land save Function ///Added by Deepa
        function fnsavepropertylanddetails() {

            var getvalid = getIDs();
            var locsaveusrid = getuserID();
            var Land_Details = {};
            var LandDeedObj = {};
            var LandActualObj = {};
            var LandExtentDeedObj = {};
            var LandExtentActualObj = {};

            $('#tblpropdim tbody tr:eq(0)').each(function (index) {
                LandDeedObj["PropertyNorth"] = $(this).find("td:eq(1)").find('input').val()
                LandActualObj["PropertyNorth"] = $(this).find("td:eq(2)").find('input').val()
                LandDeedObj["DimensionNorth"] = $(this).find("td:eq(3)").find('input').val()
                LandActualObj["DimensionNorth"] = $(this).find("td:eq(4)").find('input').val()
            });
            $('#tblpropdim tbody tr:eq(1)').each(function (index) {
                LandDeedObj["PropertySouth"] = $(this).find("td:eq(1)").find('input').val()
                LandActualObj["PropertySouth"] = $(this).find("td:eq(2)").find('input').val()
                LandDeedObj["DimensionSouth"] = $(this).find("td:eq(3)").find('input').val()
                LandActualObj["DimensionSouth"] = $(this).find("td:eq(4)").find('input').val()
            });
            $('#tblpropdim tbody tr:eq(2)').each(function (index) {
                LandDeedObj["PropertyEast"] = $(this).find("td:eq(1)").find('input').val()
                LandActualObj["PropertyEast"] = $(this).find("td:eq(2)").find('input').val()
                LandDeedObj["DimensionEast"] = $(this).find("td:eq(3)").find('input').val()
                LandActualObj["DimensionEast"] = $(this).find("td:eq(4)").find('input').val()
            });

            $('#tblpropdim tbody tr:eq(3)').each(function (index) {
                LandDeedObj["PropertyWest"] = $(this).find("td:eq(1)").find('input').val()
                LandActualObj["PropertyWest"] = $(this).find("td:eq(2)").find('input').val()
                LandDeedObj["DimensionWest"] = $(this).find("td:eq(3)").find('input').val()
                LandActualObj["DimensionWest"] = $(this).find("td:eq(4)").find('input').val()
            });
            $('#tblextentunit tbody tr:eq(0)').each(function (index) {
                LandDeedObj["ExtentAsPerDeed"] = $(this).find("td:eq(1)").find('input').val()
                LandActualObj["ExtentActual"] = $(this).find("td:eq(2)").find('input').val()
            });

            $('#tblextentunit tbody tr:eq(1)').each(function (index) {
                LandDeedObj["UnitAsPerDeed"] = $(this).find("td:eq(1)").find('input').val()
                LandActualObj["UnitActual"] = $(this).find("td:eq(2)").find('input').val()
            });
            sessionStorage.setItem('LandMeasure', $("#txttotalextent").val());
            Land_Details["AsPerDeed"] = LandDeedObj;
            Land_Details["Actual"] = LandActualObj;
            Land_Details["CalculatedValue"] = $("#txtextentsite").val();
            Land_Details["PlotSize"] = $("#txtsize").val();
            Land_Details["PlotNorthSouthSize"] = $("#txtnorthsouth").val();
            Land_Details["PlotEastWestSize"] = $("#txteastwest").val();
            Land_Details["PlotTotalExtent"] = $("#txttotalextent").val();
            Land_Details["FreqFlooding"] = $("#txtfloodingorsubmerging").val();
            Land_Details["AreaSurroundDevelopment"] = $("#txtdevsurroundingareas").val();
            Land_Details["LandShapeMeasure"] = $("#txtshapeandmeasure").val();
            Land_Details["Nearby"] = $("#txtcivicamenities").val();
            Land_Details["LevelTopography"] = $("#txttopographical").val();
            Land_Details["LandTenure"] = $("#txttenureland").val();
            Land_Details["CornerPlot"] = $("#txtcornerplot").val();
            Land_Details["TypeOfRoad"] = $("#txttypeofroad").val();
            Land_Details["RatioDepthWidth"] = $("#txtavgdepthwidth").val();
            Land_Details["RoadFacility"] = $("#txtroadfacilities").val();
            Land_Details["WaterPotential"] = $("#txtwaterpotentiality").val();
            Land_Details["RoadWidth"] = $("#txtwidthoftheroad").val();
            Land_Details["RoadWidthGT20"] = $("#txtwidthoftheroadft").val();
            Land_Details["LandSewerage"] = $("#txtunderground").val();
            Land_Details["LandPowerSupply"] = $("#txtpowersupply").val();
            var SpecialRemark = $("#txtspecialremarks").val(),
                SpecialRemark = SpecialRemark.replace(/\s*[\r\n]+\s*/g, '\n');
            Land_Details["LandSpecialRemark"] = SpecialRemark;
            Land_Details["FloorSpaceIndex"] = $("#txtfloorindex").val();
            Land_Details["PlotCoverage"] = $("#txtplotcoverage").val();
            var obj = {
                LandDetails: JSON.stringify(Land_Details),
                UserID: locsaveusrid,
                ValuationID: getvalid
            }
            var jsonobj = JSON.stringify(obj);
            savepropertylanddetails(jsonobj);
        }
        //End of the Property Land save Function
        function fnsaveApprovaldetails() {
            //debugger
            divstatus = checkval('divapprovaldetailsContent');
            // var isappr = $('input[name$=Approved]:checked').val()
            var getvalid = getIDs();
            if (divstatus == 0) {
                $('#modalloading').modal('show');
                var obj = {
                    ValuationID: getvalid,
                    //ApprovedStatus: $('input[name$=Approved]:checked').val(),
                    GovtAuthorityID: $('input[name$=Approvedby]:checked').val(),
                    ApprovalNoandDate: $('#txtApprovaNo').val(),
                    NonApprovalReason: $('#txtnonapproval').val(),
                    //  ReleaseCertNo: $('#txtReleaseCertNo').val(),
                    //  MarkedforGovtProj: $('input[name$=LandEnmarked]:checked').val(),
                    //   earmarkForGovt: $("#landearmarkgovtid").val(), //Added by Anupriya
                    //    DeRegulatedZoneProject: $('input[name$=LandZone]:checked').val(),
                    forestOrCoastalReason: $("#landforestzoneid").val(), //Added by Anupriya
                    // RegnStatus: $('input[name$=AlreadyRegistered]:checked').val(),
                    RegnReason: $("#landAptid").val(), //Added by Anupriya
                    //RegnDate: $('#txtdateofregn').val(),
                    //RegnValue: $('#txtRegistrationvalue').val(),
                    RegnName: $('#txtregName').val(),
                    //UndividedShare: $("#txtundividedshare").val(),
                    Zone: $("#ddlzone").val(),
                    //Zone: $("#txtZone").val(),
                    SroLocation: $('#ddlsroloc').val(),
                    Village: $("#ddlvillage").val(),
                    SurveyNumber: $('#txtsurveyno').val(),
                    SurveyDate: $("#txtsurveydate").val(),
                    //PropertyTaxDetails: $("#txtpaid").val()
                    //Added By Anupriya
                    PropertyTaxLand: $("#txtpaidland").val(),
                    PropertyTaxHouse: $("#txtpaidhouse").val(),
                    PropertyTaxWater: $("#txtpaidwater").val()

                }
                var jsonobj = JSON.stringify(obj);
                saveApprovaldetails(jsonobj);
                $('#modalloading').modal('hide');
            }
            else {
                $("#txtsurveyno").attr("required", false);
                bootbox.dialog({
                    closeButton: true,
                    size: 'medium',
                    message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please enter Valid Values in the Highlighted Mandatory Field(s)...</p>',
                });
                setTimeout(function () {
                    bootbox.hideAll();
                }, 2500);
               // bootbox.alert("<div>Please enter valid values in the highlighted mandatory field(s)</div>");
                var id = $('.error').attr('id');

                $('html,body').animate({
                    scrollTop: $("#" + id).offset().top
                }, 'slow');
            }
        }

        function fnapprovaladdrow() {
            var drop = '<select class=form-control style="width:100%" onchange="getPropValApproval()"><option value="select">Select</option>' + getdropstatus() + '</select>';
            $("#tblApprovaldet tbody").append("<tr><td><input type=text data-toggle=tooltip class=form-control style=text-align:left /> </td>"
                  + "<td><input type=text data-toggle=tooltip class=form-control style=text-align:left /> </td>"
                  + "<td><input type=text data-toggle=tooltip class=form-control style=text-align:left /></td>"
                  + "<td><input type=text data-toggle=tooltip class=form-control style=text-align:left /></td>"
                  + "<td>" + drop + "</td>"
                  + "</tr>");
        }

        function fnaddrow(obj) {
            var ddllen;
            var tbllen;
            $("#tblpropval tbody tr select").removeClass("error");
            if ($("#tblpropval tbody tr").length > 0 && $("#tblpropval tbody tr:last td:eq(0)").find("option:selected").text() == "Select") {
                $("#tblpropval tbody tr:last td:eq(0) select").addClass("error");
                bootbox.dialog({
                    closeButton: true,
                    size: 'medium',
                    message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please Select a Description...</p>',
                });
                setTimeout(function () {
                    bootbox.hideAll();
                }, 2500);
               // bootbox.alert("Please select a description");
                return
            }
         //debugger
           $("#tblpropval tbody tr ").find("td:eq(1)").find('input').removeClass("error");
           // if ($("#tblpropval tbody tr").length > 0 && $("#tblpropval tbody tr ").find("td:eq(0)").find("option:selected").text() == "Others") {
           if ($("#tblpropval tbody tr").length > 0 && $("#tblpropval tbody tr:last td:eq(0)").find("option:selected").text() == "Others") {
                var Remark = $("#tblpropval tbody tr:last ").find("td:eq(1)").find('input').val()
                if (Remark == "" || Remark == undefined || Remark == null) {
                    // $("#tblpropval tbody  ").closest('tr').find("td:eq(1)").find('input').addClass("error");
                    $("#tblpropval tbody tr:last ").find("td:eq(1)").find('input').addClass("error");
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please enter Valid Values in the Highlighted Mandatory Field(s)...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                    //bootbox.alert("<div>Please enter valid values in the highlighted mandatory field(s)</div>");
                    return
                }
            }
            if (obj == 'tblpropvallend') {
                ddllen = $('#ddlProptypeapp > option').length;
                tbllen = $('#tblpropvallend tbody tr').length;
            }

            //To load Dropdown values - Property Description column
            GetUnits();

            if (obj == 'tblpropval') {
                var drop = '<select class=form-control onchange=calcval("tblpropval") ><option value="none">Select</option>' + fnsummarydropdown() + '</select>';
            }

            else {
                var drop = '<select class=form-control ><option value="none">Select</option>' + fnsummarydropdown() + '</select>';
            }

            //$("#" + obj + " tbody").append("<tr><td align=center><input type=checkbox /></td>"
             $("#" + obj + " tbody").append("<tr>"
                   + "<td>" + drop + "</td>"
                   + "<td><input type=text class=form-control style=text-align:right /> </td>"
                   //+ "<td><textarea rows='1' cols='50' class='form-control'></textarea> </td>"
                   + "<td><input type=text class=form-control onkeyup=calcval('" + obj + "'); onkeypress='return isNumberKey(event)' style=text-align:right /> </td>"
                   + "<td><input type=text class=form-control onkeyup=calcval('" + obj + "'); onkeypress='return isNumberKey(event)' style=text-align:right /> </td>"
                   + "<td><input type=text class=form-control onkeyup=calcval('" + obj + "'); onkeypress='return isNumberKey(event)' style=text-align:right /></td>"
                   + "<td><input type=text class=form-control onkeyup=calcval('" + obj + "'); onkeypress='return isNumberKey(event)' style=text-align:right /></td>"
                   + "<td><input type=text class=form-control onkeyup=calcval('" + obj + "'); onkeypress='return isNumberKey(event)' style=text-align:right /></td>"
                   + '<td><button type="button" id="btnaddnewrowfn" class="btn-link" style="color: #0066CC" onclick="fnaddrow(`tblpropval`); fnDVremovedsummaryvalue();" onmouseover="this.style.color=`#f49430`"onmouseout="this.style.color=`#0066CC`"><span class="glyphicon glyphicon-plus-sign"></span></button></td>'
                   + '<td><button type="button" id="btnremrowfn" class="btn-link" style="color: #0066CC" onmouseover="this.style.color=`#f49430`"onmouseout="this.style.color=`#0066CC`"><span class="glyphicon glyphicon-trash"></span></button></td>'
                   + "</tr>");

            calcval(obj);

            if (obj == 'tblpropval') {
                ddllen = $("#tblpropval tbody tr td:eq(0)").find('select > option').length;
                tbllen = $('#tblpropval tbody tr').length;
                if (tbllen >= ddllen - 1) {
                    $('#btnaddnewrow').prop('disabled', true)
                }
            }
        }
        function fnDVremovedsummaryvalue() {
            Landmeasurebool = true;
            Buildingmeasurebool = true;
            servicemeasurebool = true;
            var selval = [];
            $('#tblpropval tbody tr').each(function () {
                var all = $(this).find("td:eq(0)").find('option:selected').val()
                selval.push(all);
            });

            for (i = 0; i < selval.length - 1; i++) {
                if (selval[i] != "none") {
                    $("#tblpropval tbody tr:last td:eq(0)").find("select > option[value='" + selval[i] + "']").remove();
                }
            }
        }

        //function fnremoverow() {
        //    var remrow = [];
        //    var i = 0;

        //    $('#tblpropval tbody tr').each(function () {
        //        if ($(this).find("td:eq(0) input").is(":checked") == true) {
        //            $(this).addClass("removethis");
        //            i++;
        //        }
        //    })

        //    if ($('#tblpropval tbody tr').length == i) {
        //        $(".removethis").toggleClass("removethis");
        //        $(function () {
        //            bootbox.alert("You cant remove all the rows");
        //        });

        //    }
        //    else {
        //        $(".removethis").remove();
        //    }
        //    calcval('tblpropval');
        //    remddllen = $("#tblpropval tbody tr td:eq(1)").find('select > option').length;
        //    remtbllen = $('#tblpropval tbody tr').length;

        //    if (remtbllen < remddllen) {
        //        $('#btnaddnewrow').removeAttr('disabled')
        //    }
        //    if ($('#btnaddnewrow').is(':disabled')) {
        //        $('#btnaddnewrow').prop('disabled', false)
        //    }
        //    if (i == 0) {
        //        $(function () {
        //            bootbox.alert("Please select a row to delete");
        //        });
        //    }
        //    if ($("#tblpropval tbody tr").length > 1) {
        //        fnDVremovedsummaryvalue()
        //    }
        //}
        $(document).on('click', 'button#btnremrow', function () {
            var i = 1;
            if ($('#tblpropval tbody tr').length == i) {
                $(".removethis").toggleClass("removethis");
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> You Cant Remove All the Rows...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                   // bootbox.alert("You cant remove all the rows");
                });
            }
            else {
                $(this).closest('tr').remove();
                calcval('tblpropval');
                remddllen = $("#tblpropval tbody tr td:eq(0)").find('select > option').length;
                remtbllen = $('#tblpropval tbody tr').length;

                if (remtbllen < remddllen) {
                    $('#btnaddnewrow').removeAttr('disabled')
                }
                if ($('#btnaddnewrow').is(':disabled')) {
                    $('#btnaddnewrow').prop('disabled', false)
                }
                if (i == 0) {
                    $(function () {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'medium',
                            message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please Select a Row to Delete...</p>',
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 2500);
                       // bootbox.alert("Please select a row to delete");
                    });
                }
                if ($("#tblpropval tbody tr").length > 1) {
                    fnDVremovedsummaryvalue()
                }
                return false;
            }

        });
        $(document).on('click', 'button#btnremrowfn', function () {
            var i = 1;
            if ($('#tblpropval tbody tr').length == i) {
                $(".removethis").toggleClass("removethis");
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> You Cant Remove All the Rows...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                  //  bootbox.alert("You cant remove all the rows");
                });
            }
            else {
                $(this).closest('tr').remove();
                calcval('tblpropval');
                remddllen = $("#tblpropval tbody tr td:eq(0)").find('select > option').length;
                remtbllen = $('#tblpropval tbody tr').length;

                if (remtbllen < remddllen) {
                    $('#btnremrowfn').removeAttr('disabled')
                }
                if ($('#btnremrowfn').is(':disabled')) {
                    $('#btnremrowfn').prop('disabled', false)
                }
                if (i == 0) {
                    $(function () {
                        bootbox.dialog({
                            closeButton: true,
                            size: 'medium',
                            message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please Select a Row to Delete...</p>',
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 2500);
                       // bootbox.alert("Please select a row to delete");
                    });
                }
                if ($("#tblpropval tbody tr").length > 1) {
                    fnDVremovedsummaryvalue()
                }
                return false;
            }

        });
        //Added by Deepa
        $(document).on('click', 'button#btnremoverow', function () {
            var i = 1;
            if ($('#tblAmenitiesbuilding tbody tr').length == i) {
                $(".removethis").toggleClass("removethis");
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'medium',
                        message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle fa-lg"></i> You Cant Remove All the Rows...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                   // bootbox.alert("You cant remove all the rows");
                });
            }
            else {                
                $(this).closest('tr').remove();
                return false;
            }
        });

        //function fnDVremoverow() {
        //    var remrow = [];
        //    var i = 0;

        //    $('#tblAmenitiesbuilding tbody tr').each(function () {
        //        if ($(this).find("td:eq(0) input").is(":checked") == true) {
        //            $(this).addClass("removethis");
        //            i++;
        //        }
        //    })

        //    if ($('#tblAmenitiesbuilding tbody tr').length == i) {
        //        $(".removethis").toggleClass("removethis");
        //        $(function () {
        //            bootbox.alert("You cant remove all the rows");
        //        });

        //    }
        //    if (i == 0) {
        //        $(function () {
        //            bootbox.alert("Please select a row to delete");
        //        });
        //    }
        //    else {
        //        $(".removethis").remove();
        //    }
        //}

        var DVarr = [
            "Aluminum handrails",
            "Aluminum works",
            "Any other",
            "Architectural Elevation works",
            "Extra Steel/collapsible gates",
            "Extra sinks and bath tub",
            "False ceiling works",
            "Glazed tiles",
            "Interior decorations",
            "Marble/ceramic tiles flooring",
            "Open staircase",
            "Ornamental Front / Pooja door",
            "Paneling works",
            "Portico",
            "Separate Lumber Room",
            "Separate Toiler Room",
            "Separate water tank/sump",            
            "Sitout/Verandah with Steel grills",              
            "Trees, gardening",
            "Wardrobes,showcases,wooden cupboards"             
        ]





        function fnDVaddrow(obj) {          
            var tablearray = [];
            var DVarr = [             
            "Aluminum handrails",
            "Aluminum works",
            "Any other",
            "Architectural Elevation works",
            "Extra Steel/collapsible gates",
            "Extra sinks and bath tub",
            "False ceiling works",
            "Glazed tiles",
            "Interior decorations",
            "Marble/ceramic tiles flooring",
            "Open staircase",
            "Ornamental Front / Pooja door",
            "Paneling works",
            "Portico",
            "Separate Lumber Room",
            "Separate Toiler Room",
            "Separate water tank/sump",
            "Sitout/Verandah with Steel grills",
            "Trees, gardening",
            "Wardrobes,showcases,wooden cupboards"
            ]

            $("#tblAmenitiesbuilding tbody tr select").removeClass("error");
            $("#txtAmenitiesbuilding").removeClass("error");
            if ($("#tblAmenitiesbuilding tbody tr:last td:eq(1)").val() == "" && $("#tblAmenitiesbuilding tbody tr:last td:eq(0)").find("option:selected").text() == "Select") {
                $("#tblAmenitiesbuilding tbody tr:last td:eq(0) select").addClass("error");
                $("#tblAmenitiesbuilding tbody tr:last td:eq(1)").addClass("error");
                bootbox.dialog({
                    closeButton: true,
                    size: 'medium',
                    message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please Select a Amenities Building...</p>',
                });
                setTimeout(function () {
                    bootbox.hideAll();
                }, 2500);
               // bootbox.alert("Please select a Amenitiesbuilding");
                return;
            }
            if ($("#tblAmenitiesbuilding tbody tr:last td:eq(1)").val() == "" && $("#tblAmenitiesbuilding tbody tr:last td:eq(0)").find("option:selected").text() == "AmenitiesBuilding") {
                $("#tblAmenitiesbuilding tbody tr:last td:eq(0) select").addClass("error");
                $("#tblAmenitiesbuilding tbody tr:last td:eq(1)").addClass("error");
                bootbox.dialog({
                    closeButton: true,
                    size: 'medium',
                    message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please Select a Amenities Building...</p>',
                });
                setTimeout(function () {
                    bootbox.hideAll();
                }, 2500);
               // bootbox.alert("Please select a Amenitiesbuilding");
                return;
            }
            if ($("#txtAmenitiesbuilding").val() == "") {
                $("#txtAmenitiesbuilding").addClass("error");
                bootbox.dialog({
                    closeButton: true,
                    size: 'medium',
                    message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please fill a Depreciation Value...</p>',
                });
                setTimeout(function () {
                    bootbox.hideAll();
                }, 2500);
              //  bootbox.alert("Please fill a Depreciation Value");
                return;
            }
            let items = '<option selected disabled value=\'' + 'Select' + '\'>' + 'Select' + '</option>';
            for (var t1 = 0; t1 < $("#tblAmenitiesbuilding tbody tr").length; t1++)           {
                var a = $("#tblAmenitiesbuilding tbody tr:eq('" + t1 + "') td:eq(0)").find("option:selected").text()
                tablearray.push(a)                              
            }
            for (var Dvarrfinal = 0; Dvarrfinal < DVarr.length; Dvarrfinal++) {                
                for (var tablearrayfinal = 0; tablearrayfinal < tablearray.length; tablearrayfinal++) {
                    if (DVarr[Dvarrfinal] == tablearray[tablearrayfinal]) {
                        var index = DVarr.indexOf(tablearray[tablearrayfinal]);
                    if (index != -1) {
                        DVarr.splice(index, 1);
                    }
                }
                }
            }          

            $.each(DVarr, function (index, item) {
                items += '<option value=\'' + item + '\'>' + item + '</option>';
            });
            ddl = '<select class=form-control onchange="DepreciationValue()"  style="width:100%">' + items + '</select>';

            $("#" + obj + " tbody").append("<tr>"
                   + "<td>" + ddl + "</td>"
                   + "<td><input type=text onkeypress='return isNumberKey(event)' class=form-control /> </td>"
                   + '<td><button type="button"  class="btn-link txtDV" style="color:#0066CC" onclick="fnDVaddrow(`tblAmenitiesbuilding`); fnDVremoveddlvalue();"><span class="glyphicon glyphicon-plus-sign" title="AddRow"></span></button></td>'
                   + "<td><button type='button' id='btnremoverow' class='btn-link'><span class='glyphicon glyphicon-trash' title='Delete'></span></button></td>"
                   + "</tr>");
        }
        function fnDVremoveddlvalue() {
           var selval = [];
            $('#tblAmenitiesbuilding tbody tr').each(function () {
                var all = $(this).find("td:eq(0)").find('option:selected').val()              
                selval.push(all);
            });

            for (i = 0; i < selval.length - 1; i++) {
                if (selval[i] != "none" && selval[i] != "Select") {
                    $("#tblAmenitiesbuilding tbody tr:last td:eq(0)").find("select > option[value='" + selval[i] + "']").remove();
                }
            }
        }

        //Calcualtion values for services //Added by Deepa
        function calcvalservices(elem) {
            if (elem == "compoundwallvalue") {
                var RMValue = $("#txtrmvalueCW").val()
                var RSValue = $("#txtrmvalueCW2").val()
                var totalCompoundwall = (RMValue.trim().length > 0 && RSValue.trim().length > 0) ? RMValue * RSValue : 0;
                $("#txtcompundwall").val(totalCompoundwall)
            }
            else if (elem == "Pavementsvalue") {
                var RMValue = $("#txtpavements1").val()
                var RSValue = $("#txtpavements2").val()
                var totalPavements = (RMValue.trim().length > 0 && RSValue.trim().length > 0) ? RMValue * RSValue : 0;
                $("#txtpavements").val(totalPavements)
            }
            else if (elem == "Steelgatevalue") {
                var RMValue = $("#txtsteelgate1").val()
                var RSValue = $("#txtsteelgate2").val()
                var totalSteelgate = (RMValue.trim().length > 0 && RSValue.trim().length > 0) ? RMValue * RSValue : 0;
                $("#txtsteelgate").val(totalSteelgate)
            }

        }

        //Below Code is used to Calculate all fields values Added by Deepa 
        function calctxtvalservices(elem) {
            var total = 0;
            $('.servicestotalval').each(function (a, doc) {
                var Service_Details = {};//Added by Deepa
                if ($(doc).val() != "") { 
                    total += parseFloat($(doc).val());
                }
            });
            $('#txttotal').val(total);
            //var total;
            //var waterarrange = $('#txtwatersupplyarrang').val();
            //waterarrange = parseFloat(waterarrange);
            //if (waterarrange != '' || waterarrange != 'NaN') {
            //    var drain = $('#txtdrainagearrang').val(); drain = parseFloat(drain); var height = $('#txtheight').val(); height = parseFloat(height);
            //    var typeofconst = $('#txttypeofconstruction').val(); typeofconst = parseFloat(typeofconst);
            //    var electrical = $('#txtelecfitting').val(); electrical = parseFloat(electrical);
            //    var waterclose = $('#txtclosets').val(); waterclose = parseFloat(waterclose); var bathtub = $('#txtbathtubs').val(); bathtub = parseFloat(bathtub);
            //    var length = $('#txtlength').val(); length = parseFloat(length); var plug = $('#txtspareplug').val(); plug = parseFloat(plug);
            //    var washbasin = $('#txtwashbasins').val(); washbasin = parseFloat(washbasin);
            //    var taps = $('#txtwatermetertaps').val(); taps = parseFloat(taps); var anyother = $('#txtanyother').val(); anyother = parseFloat(anyother);

            //    total = waterarrange + drain + height + typeofconst + electrical + waterclose + bathtub + length + plug + washbasin + taps + anyother;
            //    $('#txttotal').val(total);
            //}
            //else {
            //    var deepbore = $('#txtdeepbore').val(); deepbore = parseFloat(deepbore); var motor = $('#txtmotor').val(); motor = parseFloat(motor);
            //    var underlevelsump = $('#txtundergnd').val(); underlevelsump = parseFloat(underlevelsump);
            //    var drainage = $('#txtdrainagearrang').val(); drainage = parseFloat(drainage); var heigth = $('#txtheight').val(); heigth = parseFloat(heigth);
            //    var typeofconst = $('#txttypeofconstruction').val(); typeofconst = parseFloat(typeofconst);
            //    var electrical = $('#txtelecfitting').val(); electrical = parseFloat(electrical);
            //    var waterclose = $('#txtclosets').val(); waterclose = parseFloat(waterclose); var bathtub = $('#txtbathtubs').val(); bathtub = parseFloat(bathtub);
            //    var openwell = $('#txtopenwell').val(); openwell = parseFloat(openwell); var handpump = $('#txthandpump').val(); handpump = parseFloat(handpump);
            //    var tap = $('#txtcorpotap').val(); tap = parseFloat(tap); var headwatertank = $('#txtoverheadtank').val(); headwatertank = parseFloat(headwatertank);
            //    var length = $('#txtlength').val(); length = parseFloat(length); var ebdeposit = $('#txtebdeposits').val(); ebdeposit = parseFloat(ebdeposit);
            //    var plug = $('#txtspareplug').val(); plug = parseFloat(plug); var washbasin = $('#txtwashbasins').val(); washbasin = parseFloat(washbasin);
            //    var anyother = $('#txtanyother').val(); anyother = parseFloat(anyother);

            //    total = deepbore + motor + underlevelsump + drainage + heigth + typeofconst + electrical + waterclose + bathtub + openwell + handpump + tap +
            //        headwatertank + length + ebdeposit + plug + washbasin + anyother;
            //    $('#txttotal').val(total);
            //}
        }

        var Landmeasurebool = true;
        var Buildingmeasurebool = true;
        var servicemeasurebool = true;
        function calcval(elem) {
            var t = 1;
            var m = 2;
            var mr = 3;
            var tot = 4;
            var overallpriceGLR = 0;
            var overallpricePMR = 0;

            $('#' + elem + ' tbody tr').each(function () {
                //debugger
                var proptype = $(this).find("td:eq(0)").find('option:selected').val()
                var Measurement = $(this).find("td:eq(2)").find('input').val()
                var GLR = $(this).find("td:eq(3)").find('input').val()
                var PMR = $(this).find("td:eq(4)").find('input').val()
                var totalGLR = $(this).find("td:eq(5)").find('input').val()
                var totalPMR = $(this).find("td:eq(6)").find('input').val()
              

                if (proptype == "Land" || proptype == "Building") {
                    if (proptype == "Land") {
                        if (Landmeasurebool == true) {
                         var LandMeasure = sessionStorage.getItem('LandMeasure');
                         Measurement = LandMeasure;
                        $(this).find("td:eq(2)").find('input').val(Measurement)
                        Landmeasurebool = false
                    }
                    }
                    if (proptype == "Building") {
                        if (Buildingmeasurebool == true) {
                            var BuildingMeasure = sessionStorage.getItem('BuildingMeasure');
                            Measurement = BuildingMeasure;
                            $(this).find("td:eq(2)").find('input').val(Measurement)
                            Buildingmeasurebool = false
                        }
                    }
                    if (Measurement == "" || Measurement == undefined || Measurement == null) {
                   totalGLR = parseInt(GLR) || 0;
                   totalPMR = parseInt(PMR) || 0;
                }
                else {
                   totalGLR = parseInt(Measurement) * parseInt(GLR) || 0;
                   totalPMR = parseInt(Measurement) * parseInt(PMR) || 0;
                }
            } 
                if (proptype == "Service") {
                    $(this).find("td:eq(5)").find('input').prop('disabled', true)
                    if (servicemeasurebool == true) {
                        var totareapricing = sessionStorage.getItem('ServiceTotal');
                        // var totalPMRR = totareapricing.replace(",", "");
                    var totalPMRR = totareapricing;
                    totalPMR = totalPMRR;
                    servicemeasurebool = false;
                }
                else{
                   totalPMR = totalPMR;
                }
            }
          if (proptype == "Amenities" || proptype == "Service" || proptype == "Depreciation" || proptype == "Factors favouring for an Additional Value"
                     || proptype == "Factors affecting marketability for lesser value") {
                    $(this).find("td:eq(2)").find('input').prop('disabled', true)
                    $(this).find("td:eq(3)").find('input').prop('disabled', true)
                    $(this).find("td:eq(4)").find('input').prop('disabled', true)
                    $(this).find("td:eq(5)").find('input').prop('disabled', true)
                }
                else {
                    $(this).find("td:eq(2)").find('input').prop('disabled', false)
                    $(this).find("td:eq(3)").find('input').prop('disabled', false)
                    $(this).find("td:eq(4)").find('input').prop('disabled', false)
                    $(this).find("td:eq(5)").find('input').prop('disabled', false)
                }
                
                if (proptype == "Factors affecting marketability for lesser value" || proptype == "Depreciation") {
                  if (totalPMR < 0) {
                        totalPMR = totalPMR 
                    }
                    else {
                        totalPMR = -totalPMR 
                    }
                   //Row total
                    $(this).find("td:eq(" + 5 + ")").find('input').val(totalGLR)
                    $(this).find("td:eq(" + 6 + ")").find('input').val(totalPMR)
                  }
                 else {
                    //Row total
                    $(this).find("td:eq(" + 5 + ")").find('input').val(totalGLR)
                    $(this).find("td:eq(" + 6 + ")").find('input').val(totalPMR)
                }
                
                if ($('label').hasClass('error')) {
                    $('label.error').remove();
                }

                overallpriceGLR += parseInt(totalGLR) || 0;
                overallpricePMR += parseInt(totalPMR) || 0;
            });
            if (elem == "tblpropval") {
                formatNumber('txtTotalpropvalueglr');
                formatNumber('txtTotalpropvaluepmr');
                $('#txtTotalpropvalueglr').val(overallpriceGLR);
                $('#txtTotalpropvaluepmr').val(overallpricePMR);
                $('#txtrecommendedvalue').val(overallpriceGLR);
                $('#txtrecommendedvaluepmr').val(overallpricePMR);
                formatNumber('txtTotalpropvalueglr');
                formatNumber('txtTotalpropvaluepmr');
                formatNumber('txtrecommendedvalue');
                formatNumber('txtrecommendedvaluepmr');
            }
            else {
                $('#txtrecmdvalueapp').val(overallpricePMR);
                $('#txtoverallapp').val(overallpricePMR);
                formatNumber('txtrecmdvalueapp');
                formatNumber('txtoverallapp');
            }
        }

        function getPropValSummary() {
            var obj = {
                Type: [],
                Remark: [],
                Measurement: [],
                GLR: [],
                PMR: [],
                TotalGLR: [],
                TotalPMR: []
            }

            $('#tblpropval tbody tr').each(function (index) {
                var proptype = $(this).find("td:eq(0)").find('option:selected').val()
                var remark = $(this).find("td:eq(1)").find('input').val()
                var measurement = $(this).find("td:eq(2)").find('input').val()
                var GLR = $(this).find("td:eq(3)").find('input').val()
                var PMR = $(this).find("td:eq(4)").find('input').val()
                var totalGLR = $(this).find("td:eq(5)").find('input').val()
                var totalPMR = $(this).find("td:eq(6)").find('input').val()


                if (proptype == "Land" || proptype == "Building") {
                    if (proptype == "Land") {
                        if (Landmeasurebool == true) {
                            var LandMeasure = sessionStorage.getItem('LandMeasure');
                            measurement = LandMeasure;
                            $(this).find("td:eq(2)").find('input').val(measurement)
                            Landmeasurebool = false
                        }
                    }
                    if (proptype == "Building") {
                        if (Buildingmeasurebool == true) {
                            var BuildingMeasure = sessionStorage.getItem('BuildingMeasure');
                            measurement = BuildingMeasure;
                            $(this).find("td:eq(2)").find('input').val(measurement)
                            Buildingmeasurebool= false
                        }
                    }
                    if (measurement == "" || measurement == undefined || measurement == null) {
                        totalGLR = parseInt(GLR) || 0;
                        totalPMR = parseInt(PMR) || 0;
                    }
                    else {
                        totalGLR = parseInt(measurement) * parseInt(GLR) || 0;
                        totalPMR = parseInt(measurement) * parseInt(PMR) || 0;
                    }
                }
                if (proptype == "Service") {
                    $(this).find("td:eq(5)").find('input').prop('disabled', true)
                    if (servicemeasurebool == true) {
                        var totareapricing = sessionStorage.getItem('ServiceTotal');
                        var totalPMRR = totareapricing.replace(",", "");
                        totalPMR = totalPMRR;
                        servicemeasurebool=false
                    }
                    else {
                        totalPMR = totalPMR;
                    }
                }
                if (proptype == "Amenities" || proptype == "Service" || proptype == "Depreciation" || proptype == "Factors favouring for an Additional Value"
                           || proptype == "Factors affecting marketability for lesser value") {
                    $(this).find("td:eq(2)").find('input').prop('disabled', true)
                    $(this).find("td:eq(3)").find('input').prop('disabled', true)
                    $(this).find("td:eq(4)").find('input').prop('disabled', true)
                    $(this).find("td:eq(5)").find('input').prop('disabled', true)
                }
                else {
                    $(this).find("td:eq(2)").find('input').prop('disabled', false)
                    $(this).find("td:eq(3)").find('input').prop('disabled', false)
                    $(this).find("td:eq(4)").find('input').prop('disabled', false)
                    $(this).find("td:eq(5)").find('input').prop('disabled', false)
                }

                if (proptype == "Factors affecting marketability for lesser value" || proptype == "Depreciation") {
                    if (totalPMR < 0) {
                        totalPMR = totalPMR
                    }
                    else {
                        totalPMR = -totalPMR
                    }
                    //Row total
                    $(this).find("td:eq(" + 5 + ")").find('input').val(totalGLR)
                    $(this).find("td:eq(" + 6 + ")").find('input').val(totalPMR)
                }
                else {
                    //Row total
                    $(this).find("td:eq(" + 5 + ")").find('input').val(totalGLR)
                    $(this).find("td:eq(" + 6 + ")").find('input').val(totalPMR)
                }



                //if (measurement == "" || measurement == undefined || measurement == null) {
                //    var totalGLR = GLR;
                //    var totalPMR = PMR;
                //}
                //else {
                //    var totalGLR = measurement * GLR;
                //    var totalPMR = measurement * PMR;
                //}
                //if (proptype == "Service") {
                //    var totareapricing = localStorage.getItem('txttotalsqft');
                //    var PMR = totareapricing;
                //}
                //if (proptype == "Amenities" || proptype == "Service" || proptype == "Depreciation" || proptype == "Factors favouring for an Additional Value"
                //     || proptype == "Factors affecting marketeability for lesser value") {
                //    $(this).find("td:eq(2)").find('input').prop('disabled', true)
                //    $(this).find("td:eq(3)").find('input').prop('disabled', true)
                //    $(this).find("td:eq(4)").find('input').prop('disabled', true)

                //}
                //else {
                //    $(this).find("td:eq(2)").find('input').prop('disabled', false)
                //    $(this).find("td:eq(3)").find('input').prop('disabled', false)
                //    $(this).find("td:eq(4)").find('input').prop('disabled', false)
                //}
                
                //if (proptype == "Factors affecting marketeability for lesser value" || proptype == "Depreciation") {
                //    totalPMR = -totalPMR;
                //}


                if (totalGLR != 0 || totalPMR != 0) {
                    obj.Type.push(proptype);
                    obj.Remark.push(remark);
                    obj.Measurement.push(measurement);
                    obj.GLR.push(GLR);
                    obj.PMR.push(PMR);
                    obj.TotalGLR.push(totalGLR);
                    obj.TotalPMR.push(totalPMR);
                }
                $(this).find("td:eq(4)").find('select').attr("id", index + "ddl")
                $("#" + index + "ddl").attr('required', true);
            });
            return obj;
        }

        function fnsetEstValue() {
            if ($("#txtestimate").val() != "") {
                var totareapricing = sessionStorage.getItem('txttotalsqft');
                var totvalue = $("#txtesttotval").val();
                var estmarktsqft = $("#txtestimate").val();
                totvalue = parseFloat(totareapricing.replace(/\s*[\r\n]+\s*/g, '\n')) * parseFloat(estmarktsqft.replace(/\s*[\r\n]+\s*/g, '\n'));
                $("#txtesttotval").val(totvalue)
                formatNumber('txtesttotval');
            }
        }

        function fnsetGuideValue() {
            if ($("#txtguidpersqft").val() != "") {
                var totareapricing = sessionStorage.getItem('txttotalsqft');
                var guidpersqft = $("#txtguidpersqft").val();
                var totGuidevalue = parseFloat(totareapricing.replace(/\s*[\r\n]+\s*/g, '\n')) * parseFloat(guidpersqft.replace(/\s*[\r\n]+\s*/g, '\n'));
                $("#txtguide").val(totGuidevalue)
                formatNumber('txtguide');
            }
            else {
                $("#txtguide").val('')
            }

        }


        function fngetcurrentrow() {
            var t = 0;
            var m = 1;
            var mr = 2;
            var tot = 3;
            var tot1 = 4;
            var obj = {
                LenId: [],
                AppId: [],
                AppDate: [],
                Appreas: [],
                Appstatus: []
            }
            var currow = $('#tblApprovaldet tbody tr').length

            $('#tblApprovaldet tbody tr').each(function () {
                var lenid = $("#tblApprovaldet tbody tr td:eq(" + t + ")").find('input').val()
                var appid = $("#tblApprovaldet tbody tr td:eq(" + m + ")").find('input').val()
                var appdat = $("#tblApprovaldet tbody tr td:eq(" + mr + ")").find('input').val()
                var appres = $("#tblApprovaldet tbody tr td:eq(" + tot + ")").find('input').val()
                var appstat = $("#tblApprovaldet tbody tr td:eq(" + tot1 + ")").find('option:selected').val()
                obj.LenId.push(lenid);
                obj.AppId.push(appid);
                obj.AppDate.push(appdat);
                obj.Appreas.push(appres);
                obj.Appstatus.push(appstat);
                t = t + 5;
                m = m + 5;
                mr = mr + 5;
                tot = tot + 5;
                tot1 = tot1 + 5;
            })
            return obj;
        }


        function getPropValApproval() {
            var msg = "";
            //alert(appstat);
            var d = new Date();
            var divstatus = 0;
            var currdate = d.getDate() + "-" + eval(d.getMonth() + 1) + "-" + d.getFullYear()
            var t = 0;
            var m = 1;
            var mr = 2;
            var tot = 3;
            var tot1 = 4;
            var appstat = $("#tblApprovaldet tbody tr:last td:eq(" + tot1 + ")").find('option:selected').val()
            $("#tblApprovaldet tbody tr:last td:eq(" + mr + ")").find('input').val(currdate)
            if (appstat == "Rejected" || appstat == "Rejected By Approver") {
                $("#tblApprovaldet tbody tr:last td:eq(" + tot + ")").find('input').attr('required', true);
                msg = "Reject";
            }
            else if (appstat == "Approved" || appstat == "Approved By Approver") {
                msg = "Approve";
            }
            bootbox.confirm("Do You want to " + msg + "?", function (result) {
                if (result == true) {
                    divstatus = checkval('divAppraisalapproval');
                    if (divstatus == 0 && appstat != "select") {
                        var jsonobj = fngetcurrentrow();
                        var valId = getIDs();
                        var obj = {
                            valuationID: valId,
                            LenId: jsonobj.LenId.toString(),
                            AppId: jsonobj.AppId.toString(),
                            AppDate: jsonobj.AppDate.toString(),
                            Appreas: jsonobj.Appreas.toString(),
                            Appstatus: jsonobj.Appstatus.toString()
                        }
                        jsonobj = JSON.stringify(obj)
                        setappraisalstatus(jsonobj);
                    }
                    else {
                        $('label.error').remove();
                        bootbox.dialog({
                            closeButton: true,
                            size: 'medium',
                            message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Please enter the Reason for Rejection...</p>',
                        });
                        setTimeout(function () {
                            bootbox.hideAll();
                        }, 2500);
                        //bootbox.alert("Please enter the reason for rejection");
                        $("#tblApprovaldet tbody tr:last td:eq(" + tot + ")").find('input').attr('required', false);
                        $("#tblApprovaldet tbody tr:last td:eq(" + tot1 + ")").find('select').prop('selectedIndex', 0);
                    }

                    //alert(result + " Result")
                }
                else {
                    //alert(result + " Result else")
                    $("#tblApprovaldet tbody tr:last td:eq(" + tot1 + ")").find('select').prop('selectedIndex', 0);
                }
            });
        }


        function fnPreviewclick() {
            window.open("PreviewPage.aspx")
        }

        function setappraisalstatus(objsetappraisal) {
            $.ajax({
                type: "POST",
                url: "landingpage.aspx/Accptstatus",
                data: objsetappraisal,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    jsonObj = JSON.parse(response.d);
                    if (response.d == "1") {
                        window.location.href = "ApplicationQueue.aspx"
                    }
                    else {
                        $(function () {
                            bootbox.dialog({
                                closeButton: true,
                                size: 'medium',
                                message: '<p class="text-center mb-0"><i class="fa fa-frown-o fa-lg"></i> Status Updation Failed!</p>'
                            });
                            setTimeout(function () {
                                bootbox.hideAll();
                            }, 2500);
                         //   bootbox.alert("Status Updation Failed");
                        });
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
                },
            });
        }
        function fnappqueue() {
            window.location.href = "ApplicationQueue.aspx"
        }

        function loadtable() {
            $("#tblpropvallend tbody").replaceWith(TablePropval);
        }

        function calper() {
            //debugger
            var plinthval = $("#txtplinth").val();
            var comval = $("#txtcommon").val();
            var comprct;
            if (plinthval != "" && comval != "") {
                comprct = (comval * 100) / plinthval;
                comprct = parseFloat(comprct).toFixed(2)
                $("#txtcommonper").val(comprct);
            }
        }

        function convper(elem) {
            var elemid = elem;
            var plinthval = $("#txtplinth").val();
            var comper = $("#" + elemid).val();
            var comval;
            if (plinthval != "") {
                comval = (plinthval) / (100 / comper);
                $("#txtcommon").val(comval);
            }
        }

        function fnchklivablestatus() {
            if ($('input:radio[name$=rdnlivabl]:checked').val() == "Yes") {
                $('#txtreason').attr('disabled', true)
            }
            else {
                $('#txtreason').attr('disabled', false)
            }
        }


        function fncaltotarea() {
            var plin = $("#txtplinth").val();
            var commn = $("#txtcommon").val();
            if (plin != "" && commn != "")
                var tot = parseFloat(plin) + parseFloat(commn);
            $("#txttotalarea").val(tot);
        }

        function fnsetdivprop() {

            var userType = '<%=Session["UserType"]%>';
            if (userType == "Appraiser") {
                $('#modalloading').modal('show');
                //Disabled Location details Accordion for appraiser
                $('#Div_Locationdetails  input[type=button]').attr("disabled", "disabled");
                $('#Div_Locationdetails textarea').attr('readonly', 'readonly');
                $('#Div_Locationdetails input[type=text]').attr('readonly', 'readonly');
                $('#Div_Locationdetails select').attr('readonly', 'readonly');
                $('#Div_Locationdetails option').attr('disabled', 'disabled');
                $('#Div_Locationdetails input[type=radio]').attr('disabled', 'disabled');
                $('#btnlocsubmit').removeAttr('onclick');
                $('#modalloading').modal('hide');
            }
            else if (userType == "Lender") {
                $('#modalloading').modal('show');
                $('#Div_Locationdetails  input[type=button]').removeAttr("disabled");
                $('#Div_Locationdetails textarea').removeAttr('readonly');
                $('#Div_Locationdetails input[type=text]').removeAttr('readonly');
                $('#Div_Locationdetails select').removeAttr('disabled');
                $('#Div_Locationdetails option').removeAttr('disabled');
                $('#Div_Locationdetails input[type=radio]').removeAttr('disabled');
                $('#modalloading').modal('hide');
            }
        }

        function focusatelem(elemid) {

            $("#accordion-toggle").accordion({
                heightStyle: "content",
                collapsible: true,
                active: false,
                activate: function (event, ui) {
                    if (!$.isEmptyObject(ui.newHeader.offset())) {
                        $('html:not(:animated), body:not(:animated)').animate({ scrollTop: ui.newHeader.offset().top }, 'fast');
                    }
                }
            });
        }
             
         /*function focusatelem(elemid) {
         
             var id = elemid
 
             if ($("#" + id).offset().top > $(window).height()) {                
                 $('html,body').animate({
                     scrollTop: $(window).height() / 10
                 }, 'slow');
             }
             else {
                 
                 $('html, body').animate({ scrollTop: errors.offset().top - 1000 }, 500);
                 //$('html,body').animate({
                 //    scrollTop: $("#" + id).offset().top
                 //}, 'slow');
             }
            
            //$('html, body').animate({ scrollTop: errors.offset().top - 300 }, 500);
            // $('html,body').animate({
                // scrollTop: $("#" + id).offset().top
             //}, 'slow');
            }*/
        function imgcloseclick(xobj) {
            $('.img-wrap').css('cursor', 'pointer');
            var mybtn = $(xobj);
            bootbox.confirm("Do you want to Remove the Image", function (result) {
                if (result == true) {
                    var imgrem = mybtn.closest('.img-wrap').find('img').attr('alt');//name of the image to remove
                    var imgidrem = mybtn.closest('.img-wrap').find('img').attr('id');//id of the image to remove

                    $('#' + imgidrem).hide(2000, function () {
                        $(this).parent('.img-wrap').remove();
                    });

                    var lclimgset = localStorage.getItem("locImagegrp");
                    lclimgset = lclimgset.split(',')

                    //Remove Image from the localstorage
                    for (var i = lclimgset.length - 1; i >= 0; i--) {
                        if (lclimgset[i] == imgrem) {
                            lclimgset.splice(i, 1);
                            break;       //<-- Uncomment  if only the first term has to be removed
                        }
                    }

                    lclimgset = lclimgset.toString();
                    localStorage.setItem("locImagegrp", lclimgset)
                    var imgcout = 0;
                    var und;
                    for (var ii = 1; ii <= 5; ii++) {
                        if ($("#Image" + ii).attr("src") != "" && $("#Image" + ii).attr("src") != und) {
                            imgcout++;
                        }
                    }
                    localStorage.setItem("uploadrem", 6 - imgcout);

                    //alert("Image Remaining" + localStorage.getItem("uploadrem"))

                    //alert(localStorage.getItem("uploadrem"))
                    if (localStorage.getItem("uploadrem") == 5) {
                        $("#divimages").hide(2000);
                    }
                    //setsession(localStorage.getItem("locImagegrp"));
                }
                else {
                    //alert("Chriie chriee")
                }
            })//bootbox confirm
        }

    </script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <%--    <br />--%>
    <div class="jumbotron col-lg-12 col-sm-12 col-xs-1 col-md-12 navbar navbar-custom ps-container ps-theme-default labeltxt" id="Div_ValuationDetails" 
                runat="server" style="color: white; background-color:#1d6486; border-radius: 0px !important; position:fixed;z-index:200;margin-top: -18px;">
                <%--<asp:Button ID="btnguideline" runat="server" Text="Click" OnClick="btnguideline_Click" />--%>
                <%--<button type="button" onclick="mybtnclick()">GuideLine Value</button>--%>
                <div class="row" align="left">
                    <div class="col-lg-3 col-md-2 col-sm-2 col-xs-4"></div>
                    <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                        <span id="spnvallbl" class="ValuRitelbl">Valuation ID: </span><span id="spnvalid" runat="server"></span>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                        <span id="spnbrwrlbl" class="ValuRitelbl">Borrower Name: </span><span id="spnbrwrid" runat="server"></span>
                    </div>
                      <div class="col-lg-1 col-md-2 col-sm-2 col-xs-4"></div>
                </div>
                <%--<div class="row">
                    <br />
                </div>--%>
                <div class="row" align="left">
                     <div class="col-lg-3 col-md-2 col-sm-2 col-xs-4"></div>
                    <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                        <span id="spnproplbl" class="ValuRitelbl">Property ID: </span><span id="spnproprid" runat="server"></span>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                        <span id="spnstatlbl" class="ValuRitelbl">Appraisal Status: </span><span id="spnstatval" runat="server"></span>
                    </div>
                     <div class="col-lg-1 col-md-2 col-sm-2 col-xs-4"></div>
                </div>
              <%--   <div class="row">
                    <br />
                </div>--%>
                <%--<div class="row" align="left">
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="font-weight: bolder;">
                        <span id="spnpropaddress" class="ValuRitelbl">Property Address: </span><span id="Spnpropertyaddress" runat="server"></span>
                    </div>
                </div>--%>
            </div>
    <div class="row labeltxt">
        <%-- <div class="col-lg-1"></div>--%>
        <%--<div class="col-lg-12">--%>
        <div class="container-fluid panel-group" id="myAccordion" runat="server">
            <%--style="padding-left: 23px; padding-top: 0px;--%>
            <div class="row">
                <div class="modal fade" id="modalusrtypesel" role="dialog">
                    <div class="modal-dialog modal-sm">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">
                                    &times;</button>
                                <h4 class="modal-title">Create a New User</h4>
                            </div>
                            <div class="modal-body">
                                <form role="form">
                                    <div class="form-group">
                                        <asp:Label ID="lblusrtype" runat="server" for="txtusertype" Text="Select User Type: " Font-Bold="true"></asp:Label>
                                        <asp:DropDownList ID="ddlusrtype" runat="server" CssClass="form-control" ClientIDMode="Static">
                                            <asp:ListItem Value="Lender"></asp:ListItem>
                                            <asp:ListItem Value="Borrower"></asp:ListItem>
                                            <asp:ListItem Value="Appraiser"></asp:ListItem>
                                        </asp:DropDownList>
                                        <br />
                                        <asp:Button ID="btnnewuser" runat="server" Text="Submit" CssClass="btn btn-info" OnClientClick="getPathFromUrl(event)" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!------------------------------------------Password details to be placed in  a Accordion------------------------------------------------------>
            <div class="row">
                <div class="" id="div_pwddetails" runat="server">
                    <div class="panel panel-default">
                        <div class="panel-heading" style="background: #1b4e66; /*border-radius: 11px 11px 0px 0px; */">
                            <h4 style="text-align: center;">
                                <a class="accordion-toggle" data-toggle="collapse" data-parent="#myAccordion" href="#div_pwdupdate">
                                    <span id="spnAccordionHeader" class="sectionheader">Password Details</span> </a>
                            </h4>
                        </div>
                        <div id="div_pwdupdate" class="panel-collapse collapse accordionmain">
                            <div class="panel-body jumbotron">
                                <div class="row">
                                    <div class="col-lg-2"></div>
                                    <div class="col-lg-9 labeltxt">
                                        <div class="row">
                                            <div class="col-lg-2">
                                            </div>
                                            <div class="col-lg-8">
                                                <asp:Label ID="lblpwddetails" CssClass="titlefont" runat="server" Font-Bold="true">Enter the new password</asp:Label>
                                            </div>
                                            <div class="col-lg-2">
                                            </div>
                                        </div>
                                        <br />
                                        <br />
                                        <div class="row">
                                            <div class="col-lg-3 contfont" style="width: 27.3%;">
                                                <asp:Label ID="lblpwd" runat="server" Font-Bold="true" for="txtpwd">Password details: </asp:Label>
                                            </div>
                                            <div class="col-lg-4 ">
                                                <span class=""></span>
                                                <asp:TextBox ID="txtpwd" TextMode="Password" runat="server" placeholder="New Password" CssClass="form-control" ToolTip="Password should contain minimum 8 characters" ClientIDMode="Static">
                                                </asp:TextBox>
                                            </div>
                                            <div class="col-lg-4 contfont">
                                                <div class="row">
                                                    <asp:Label ID="lblpwdok" runat="server" Style="font-size: 12px;" ClientIDMode="Static"></asp:Label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row" style="padding-top: 10px">
                                            <div class="col-lg-3 " style="width: 27.3%;">
                                            </div>
                                            <div class="col-lg-4">
                                                <span class=""></span>
                                                <asp:TextBox ID="txtconfirmpwd" TextMode="Password" runat="server" placeholder="Confirm Password" CssClass="form-control" ToolTip="Confirm Password" ClientIDMode="Static">
                                                </asp:TextBox>
                                            </div>
                                            <div class="col-lg-1">
                                            </div>
                                        </div>
                                        <!------------------------------------------Security Question and Answer section------------------------------------>
                                        <div class="row" style="padding-top: 10px">
                                            <div class="col-lg-3 contfont" style="width: 27.3%;">
                                                <asp:Label ID="lblsecques" runat="server" for="ddlQues" Font-Bold="true">Security Question: </asp:Label>
                                            </div>
                                            <div class="col-lg-4">
                                                <span class=""></span>
                                                <asp:DropDownList ID="ddlQues" runat="server" CssClass="form-control" ClientIDMode="Static">
                                                    <asp:ListItem Value="none" Selected="True">Select a Security Question</asp:ListItem>
                                                    <asp:ListItem Value="Who is your favourite teacher?"></asp:ListItem>
                                                    <asp:ListItem Value="What is the name of your favorite pet?"></asp:ListItem>
                                                    <asp:ListItem Value="Which is your favorite web browser?"></asp:ListItem>
                                                    <asp:ListItem Value="What is your favorite color?"></asp:ListItem>
                                                    <asp:ListItem Value="What is your father's middle name?"></asp:ListItem>
                                                </asp:DropDownList>
                                            </div>
                                            <div class="col-lg-1">
                                            </div>
                                        </div>
                                        <div class="row" style="padding-top: 10px">
                                            <div class="col-lg-3" style="width: 27.3%;">
                                            </div>
                                            <div class="col-lg-5">
                                                <span class=""></span>
                                                <asp:TextBox ID="txtAnswr" runat="server" placeholder="Enter your Answer" CssClass="form-control" ClientIDMode="Static">
                                                </asp:TextBox>
                                                <%--<asp:RequiredFieldValidator runat="server" ID="reqName" ControlToValidate="txtAnswr" ErrorMessage="Please Enter your Answer!" ValidationGroup="PasswordUpdate" />--%><br />
                                                <br />
                                            </div>
                                            <div class="col-lg-1">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-3">
                                            </div>
                                            <div class="col-lg-8">
                                                <div class="col-lg-12">
                                                    <button type="button" class="btn btnsave" id="btnpwdupdate" value="Submit" onclick="passworddetails(event)">Submit</button>
                                                    <asp:Button ID="btnreset" runat="server" Text="Reset" CssClass="btn btnreset" OnClientClick="fnbtnreset(event)" />
                                                </div>
                                            </div>
                                            <div class="col-lg-1">
                                            </div>
                                        </div>
                                        <asp:HiddenField ID="hdnpwdupdate" runat="server" />
                                    </div>
                                    <div class="col-lg-1"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Password details End-->

             <!--GeneralDetails-->
            <div class="row">
                <div class="accordionShoHide" id="Divgeneraldetailsaccordion" runat="server"  style="margin-top:4.5%;">
                    <div class="panel panel-default">
                        <div class="panel-heading" id="generalheading" style="margin-top:-39px;">
                            <br /> <br />
                            <h4>
                                <a class="accordion-toggle" data-toggle="collapse" data-parent="#myAccordion" href="#divgeneraldetailsBody" onclick="fncollapse(event); generaldetailclick(); focusatelem('generalheading');">
                                    <i class="indicator glyphicon custom-chevron-down"></i>&nbsp;<span id="spngeneraldetailsHeader">General</span>
                                </a>
                            </h4>
                        </div>
                        <div id="divgeneraldetailsBody" class="panel-collapse collapse in accordionmain">
                            <div class="panel-body">
                                <div id="divgeneraldetailsContent" class="jumbotron accordion-body11">
                                    <%--<div class="row">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                    </div>--%>
                                    <%--  <br />--%>
                                    <%-- <div class="row">
                                                <div id="maploc" style="margin-left: 20px; width: 100%; height: 280px">
                                                </div>
                                            </div>--%>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="Label26" runat="server" Font-Bold="true">Valuation Purpose&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:TextBox type='text' ID="textgenval" autofocus="focus" placeholder="Valuation Purpose" runat="server" class="form-control txtboxsize"></asp:TextBox>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                    </div>
                                    
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="Label27" runat="server" Font-Bold="true">Inspection Date&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <div class="form-group txtboxdatesize" style="margin-bottom: 0px;">
                                                <div class='input-group date' id='dtpickerInspection'>
                                                    <input type='text' runat="server" class="form-control" placeholder="DD/MM/YYYY" id="textgeninsdate" validationgroup="approvalacc"  />
                                                    <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="Label28" runat="server" Font-Bold="true">Valuation Date&nbsp;</asp:Label>
                                        </div>
                                       <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <div class="form-group txtboxdatesize" style="margin-bottom: 0px;">
                                                <div class='input-group date' id='dtpickervaluation'>
                                                    <input type='text' runat="server" class="form-control" placeholder="DD/MM/YYYY" id="textgenvaldate" validationgroup="approvalacc" />
                                                    <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                    </div>
                         <%--  <div class="row myrow">
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <asp:Label ID="Label29" runat="server" Font-Bold="true"> Registered in the name of:&nbsp;</asp:Label>
                                         </div>
                               </div>--%>
                                   
                                 <div class="row myrow">
                                      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4" style="margin-left: 16px; padding-left: 22%;">
                                            <asp:Label ID="Label29" runat="server" Font-Bold="true"> Owner Details&nbsp;</asp:Label>
                                         </div>
                                       <%-- <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">--%>
                                        <div class="container">
                                            <div class="table-responsive">
                                                <table class="table-hover nowrap" id="tblregisteredname">
                                                    <thead>
                                                        <tr class= "regntable" style="background-color: #2E6DA4; color: #FFFFFF;">
                                                           <th style="text-align: center">Owner Name</th>
                                                           <th style="text-align: center">Owner Address</th>
                                                           <th style="text-align: center; padding: 6px;">Owner Phone Number</th>
                                                           <th style="text-align: center; padding: 6px;">% of Shares</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <%-- <td >
                                                                <input type="checkbox" /></td>--%>
                                                            <td style="text-align: center">
                                                               <asp:TextBox ID="tblregisterednametxt1" name="regntxt1" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                           </td>
                                                            <td style="text-align: center">
                                                               <asp:TextBox ID="tblregisterednametxt2" name="regntxt2" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                           </td>
                                                           <td style="text-align: center">
                                                               <asp:TextBox ID="tblregisterednametxt3" name="regntxt3" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                           </td>
                                                           <td style="text-align: center">
                                                               <asp:TextBox ID="tblregisterednametxt4" name="regntxt4" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                             </td>
                                                            <td>
                                                            <button type="button" id="btnregnadd" runat="server" class="btn-link" style="color: #0066CC" onclick="fnregnaddrow('tblregisteredname');">
                                                            <span class="glyphicon glyphicon-plus-sign" title="AddRow"></span>
                                                            </button>
                                                            </td>
                                                            <td>
                                                           <%-- <button type="button" id="Button6" runat="server" class="btn-link" onclick="fnregnremoverow()">--%>
                                                            <button type="button" id="btnregnremoverow" runat="server" class="btn-link">
                                                            <span class="glyphicon glyphicon-trash" title="Delete"></span>
                                                            </button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                   <%-- <tfoot>
                                                        <tr>
                                                           <td></td>
                                                            <td></td><td></td>
                                                            <td>
                                                               <button type="button" id="btnregnadd" runat="server" class="btn-link" style="color: #0066CC" onclick="fnregnaddrow('tblregisteredname');">
                                                                    <span class="glyphicon glyphicon-plus-sign">&nbsp;AddRow</span>
                                                                </button></td>
                                                            <td>
                                                                <button type="button" id="btnregnremoverow" runat="server" class="btn-link" onclick="fnregnremoverow()">
                                                                    <span class="glyphicon glyphicon-trash">&nbsp;RemoveRow</span>
                                                                </button></td>
                                                        </tr>
                                                    </tfoot>--%>
                                                </table>
                                            </div>
                                        </div>
                                        <%--</div>--%>
                                        <%--  </div>--%>
                                        <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="Label30" runat="server" Font-Bold="true">How Long Owning the Property&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:TextBox ID="textgenownprop" runat="server" placeholder="Duration of Owning" class="form-control txtboxsize"></asp:TextBox>
                                        </div>
                                      </div>
                                    <%--<div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="Label31" runat="server" Font-Bold="true">List of documents produced for perusal:&nbsp;</asp:Label>
                                        </div>
                                        <div class="row">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                           <%--<textarea id="txtperusal" rows="5" cols="50" name="description" >
                                            <textarea id="txtperusal" rows="3" cols="30" name="description" > <%--Added by Anupriya For Chrome Mobile View
                                             </textarea>
                                        </div>
                                    </div>
                                      </div>--%>
                                    <%--Added by Anupriya For Chrome Small Screen--%>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="Label2" runat="server">List of Documents Produced for Perusal&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                            <textarea id="txtperusal" class="txtareasize" placeholder="List of Documents" rows="4" cols="46" name="description">
                                             </textarea>
                                        </div>
                                    </div>
                                    <div class="row myrow" >
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="Label32" runat="server" Font-Bold="true">Brief Description of Property (Including Leasehold/Freehold)&nbsp;</asp:Label>
                                        </div>
                                       <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:TextBox ID="textgendescprop" runat="server" placeholder="Description of the Property" class="form-control txtboxsize"></asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="Label33" runat="server" Font-Bold="true">Scope of Valuation&nbsp;</asp:Label>
                                        </div>
                                      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:TextBox ID="textgenscopeval" runat="server" placeholder="Scope of Valuation" class="form-control txtboxsize"></asp:TextBox>
                                        </div>
                                     </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="Label34" runat="server" Font-Bold="true">Name of the Bank&nbsp;</asp:Label>
                                        </div>
                                       <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:TextBox ID="textgennamebank" runat="server" placeholder="Name of the Bank" class="form-control txtboxsize"></asp:TextBox>
                                        </div>
                                        <div class="col-lg-2">
                                        </div>
                                    </div>
                                     <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="Label39" runat="server" Font-Bold="true">Branch of the Bank for which Appraisal is being Done&nbsp;</asp:Label>
                                        </div>
                                       <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:TextBox ID="textgenbankbranch" runat="server"  placeholder="Branch of the Bank" class="form-control txtboxsize"></asp:TextBox>
                                        </div>
                                        <div class="col-lg-2">
                                        </div>
                                    </div>

                                    <%--<div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="valuerAssoName" runat="server" Font-Bold="true">Valuer's association Name:&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:DropDownList ID="textgenvalass" runat="server" CssClass="form-control">
                                                 <asp:ListItem Value="none" Selected="True">Select Association</asp:ListItem>
                                                    <asp:ListItem Value="IOV"></asp:ListItem>
                                            </asp:DropDownList>
                                        </div>
                                        <div class="col-lg-4">
                                        </div>
                                    </div>--%>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="valuerAssoName" runat="server" Font-Bold="true">Valuer's Association Name&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:DropDownList ID="textgenvalasso" runat="server" CssClass="form-control txtboxsize">
                                            </asp:DropDownList>
                                        </div>
                                        <div class="col-lg-4">
                                        </div>
                                    </div>
                                    
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="Label35" runat="server">Persons Accompanied while Visiting the Site&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:TextBox ID="textgenpersonacc" runat="server"  placeholder="Persons Accompanied"  class="form-control txtboxsize"></asp:TextBox>
                                        </div>
                                        <div class="col-lg-4">
                                        </div>
                                    </div>
                                     <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="Label36" runat="server">Project Site Name&nbsp;</asp:Label>
                                          </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                            <asp:TextBox ID="textgenprojsite" runat="server" placeholder="Project Site Name" class="form-control txtboxsize"></asp:TextBox>
                                        </div>
                                    </div>
                                     <div class="row myrow">
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                                    <asp:Label ID="lbllocPropertylocation" runat="server" Text="Property Location" ></asp:Label>
                                                </div>
                                                <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12 divmiddle1">
                                                    <asp:RadioButton CssClass="" ID="rdnlocmetro" GroupName="LocationDetails" runat="server" Text="Metro" value="Metro" Checked="true" />
                                                    <asp:RadioButton CssClass="radiostyle" ID="rdnloctown" runat="server" GroupName="LocationDetails" Text="Town" value="Town" />
                                                    <asp:RadioButton CssClass="radiostyle" ID="rdnlocvillage" runat="server" GroupName="LocationDetails" Text="Village" value="Village" />
                                                </div>
                                                <div class="col-lg-4"></div>
                                            </div>
                                      <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="Label37" runat="server">Property Type&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                        <asp:TextBox ID="textgenproptype" runat="server" placeholder="Property Type" CssClass="form-control txtboxsize" data-toggle="tooltip" data-placement="top"></asp:TextBox>
                                         </div>
                                        <div class="col-lg-4">
                                        </div>
                                    </div>
                                     <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <input type="button" id="Button4" runat="server" value="Save" class="btn btn-primary" onclick="fnsaveGeneral(); return false" />
                                            <input type="button" id="Button5" runat="server" value="Reset" class="btn btn-primary" onclick="fnresetGeneral();" />
                                        </div>
                                        <div class="col-lg-2">
                                        </div>
                                    </div>
                                 </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
                </div>
             <!--End of GeneralDetails div-->

             <!--Property Description-->
            <div class="row">
                <div class="accordionShoHide" id="DivpropertyDescaccordion" runat="server">
                    <div class="panel panel-default">
                        <div class="panel-heading" id="propertydescheading">
                            <h4>
                                <a class="accordion-toggle" data-toggle="collapse" data-parent="#myAccordion" href="#divpropertydescBody" onclick="fncollapse(event); propdescgeneraldetailclick(); focusatelem('propertydescheading') ">
                                    <i class="indicator glyphicon custom-chevron-right"></i>&nbsp;<span id="spnpropertydescHeader">Property Description</span>
                                </a>
                            </h4>
                        </div>
                        <div id="divpropertydescBody" class="panel-collapse collapse accordionmain">
                            <div class="panel-body">
                                <div id="divpropertydescContent" class="jumbotron accordion-body11">
                                    <%--<div class="row">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                    </div>
                                    <br />--%>

                                    <div class="row myrow">
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="Label31">Door No             
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtprodoorNo" runat="server" CssClass="form-control txtboxsize" placeholder="Door No" title="Door No">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-1 col-md-2 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="Label42">Street Name
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                            <span class=" "></span>
                                            <asp:TextBox ID="Textpropstreet" runat="server" CssClass="form-control txtboxsize" placeholder="Enter Street Name" data-toggle="tooltip" data-placement="top">
                                            </asp:TextBox>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="Label43">Area Name             
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtproareaname" runat="server" CssClass="form-control txtboxsize" placeholder="Area">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-1 col-md-2 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="Label44">City             
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtprocity" runat="server" CssClass="form-control txtboxsize" placeholder="City">
                                            </asp:TextBox>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="Label45">State             
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtprostate" runat="server" CssClass="form-control txtboxsize" placeholder="State">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-1 col-md-2 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="Label46">Country             
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                            <span class=" "></span>
                                            <asp:TextBox ID="Textpropcountry" runat="server" CssClass="form-control txtboxsize" placeholder="Country" data-toggle="tooltip" data-placement="top">
                                            </asp:TextBox>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="Label47">Pin code             
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12">
                                            <span class=" "></span>
                                            <asp:TextBox ID="textproppin" runat="server" CssClass="form-control txtboxsize" placeholder="Pin code" onkeypress="return isNumberKey(event)" data-toggle="tooltip" data-placement="top">
                                            </asp:TextBox>
                                        </div>
                                    </div>

                                     <div class="row myrow">
                                        <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="lblpropertyarea" runat="server">Property Area&nbsp;</asp:Label>
                                            <%--<span class="asterisk_input1"></span>--%>
                                        </div>
                                        <div class="col-lg-4 col-md-5 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:RadioButton ID="rdnbtnResidential" GroupName="rdnPropertyArea" runat="server" value="Residential" Text="Residential" Checked="true" />
                                        
                                       
                                            <asp:RadioButton ID="rdnbtnCommercial" CssClass="radiostyle" GroupName="rdnPropertyArea" runat="server" value="Commercial" class="rdnyesno" Text="Commercial" />
                                        
                                            <asp:RadioButton ID="rdnbtnIndustrial" CssClass="radiostyle" GroupName="rdnPropertyArea" runat="server" value="Industrial" class="rdnyesno" Text="Industrial" />
                                                </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="propdescarea" runat="server" Font-Bold="true">Area Classification</asp:Label>
                                        </div>
                                       
                                        <div class="col-lg-3 col-md-5 col-sm-12 col-xs-12 divmiddle1">
                                                    <asp:RadioButton  ID="rdnbtnurban" GroupName="propdescDetailsarea" runat="server" Text="Urban" value="Urban" checked="true"/>
                                                    <asp:RadioButton CssClass="radiostyle" ID="rdnbtnsemi" runat="server" GroupName="propdescDetailsarea" Text="Semi-urban" value="Semi-urban" />
                                                    <asp:RadioButton CssClass="radiostyle" ID="rdnbtnrural" runat="server" GroupName="propdescDetailsarea" Text="Rural" value="Rural" />
                                                </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="propdesceco" runat="server" Font-Bold="true">Economic Classification</asp:Label>
                                        </div>
                                       <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12 divmiddle1">
                                                    <asp:RadioButton  ID="rdnbtnhigh" GroupName="propdescDetailseco" runat="server" Text="High" value="High" Checked="true"/>
                                                    <asp:RadioButton CssClass="radiostyle" ID="rdnbtnmiddle" runat="server" GroupName="propdescDetailseco" Text="Middle" value="Middle" />
                                                    <asp:RadioButton CssClass="radiostyle" ID="rdnbtnpoor" runat="server" GroupName="propdescDetailseco" Text="Poor" value="Poor" />
                                                </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="lblalreadyreg" runat="server">Land/ Apt Already Registered?&nbsp</asp:Label>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:RadioButton CssClass="radio-inline" ID="rdnalreadyregYes" runat="server" GroupName="AlreadyRegistered" Text="Yes" value="Yes" onclick="txtboxenabled(this)" />
                                            <asp:RadioButton CssClass="radio-inline" ID="rdnalreadyregNo" runat="server" GroupName="AlreadyRegistered" Text="No" value="No" Checked="true" onclick="txtboxenabled(this)" />
                                        </div>
                                        <br />
                                        <div class="row myrow">
                                            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle1"></div>
                                            <%--<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle1">
                                                <textarea id="landAptid" rows="3" cols="30" name="description" style="">  <%--Added by Anupriya for Chrome Mobile View only rows and cols changed                                              
                                             </textarea>
                                            </div>--%>
                                            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1" style="padding-left: 22px;">
                                            <span class=""></span>
                                             <textarea id="landAptid"  class="txtareasize" rows="4" cols="46" name="description"> <%--Added by Anupriya for Chrome Mobile View only rows and cols changed--%>
                                                
                                             </textarea>
                                        </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="lbldateofregistration" runat="server">If Yes, Date of Registration&nbsp</asp:Label>
                                           <%-- <span class="asterisk_input1"></span>--%>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <div class="form-group txtboxdatesize" style="margin-bottom: 0px;">
                                                <div class='input-group date' id='dtpickerReg'>
                                                    <input type='text' runat="server" class="form-control" placeholder="Date of Registration" id="txtdateofregn" validationgroup="approvalacc" />
                                                    <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row" style="padding-top: 6px;">
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="Label1" runat="server">Registration Value (In Rupees)&nbsp</asp:Label>
                                            <%--<span class="asterisk_input1"></span>--%>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <input type='text' runat="server" class="form-control txtboxsize" id="txtRegistrationvalue" placeholder="Registration Value" validationgroup="approvalacc" onblur="formatNumber(this.id)"  />
                                        </div>
                                        <div class="col-lg-2">
                                        </div>
                                    </div>
                                     <div class="row" style="padding-top: 6px;">
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="lblundividedshare" runat="server">What is the Undivided Share of Land as per Sale Deed?&nbsp;</asp:Label>
                                            <%--<span class="asterisk_input1"></span>--%>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                            <asp:TextBox ID="txtundividedshare" runat="server"  placeholder="Undivided Share as per Sale Deed" class="form-control txtboxsize"></asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lbllocroadwidth">Width of Road(s) Surrounding the Property                 
                                            </asp:Label>
                                           <%-- <span class="asterisk_input1"></span>--%>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtlocroadwidth" runat="server" placeholder="Width of Road" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                      <div class="row myrow">
                                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                                    <label>Zone </label>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                                    <input type="text" id="txtprozone" class="form-control txtboxsize" placeholder="Zone" title="Zone" />
                                                </div>
                                            </div>
                                      <div class="row myrow">
                                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                                    <label>SRO Location </label>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                                    <input type="text" id="txtprosro" class="form-control txtboxsize" placeholder="SRO Location" title="SRO Location" />
                                                </div>
                                            </div>
                                      <div class="row myrow">
                                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                                    <label>Village </label>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                                    <input type="text" id="txtprovillage" class="form-control txtboxsize" placeholder="Village" title="Village" />
                                                </div>
                                            </div>
                                      <div class="row myrow">
                                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                                    <label>Survey Number </label>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                                    <input type="text" id="txtprosurno" class="form-control txtboxsize" placeholder="Survey Number" title="Survey Number" />
                                                </div>
                                            </div>
                                      
                                    <div class="row myrow">
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="Label40" runat="server" Font-Bold="true">Survey Date&nbsp;</asp:Label>
                                        </div>
                                       <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <div class="form-group txtboxdatesize" style="margin-bottom: 0px;">
                                                <div class='input-group date' id='dtpickersurveydate'>
                                                    <input type='text' runat="server" class="form-control"  placeholder="Survey Date" id="txtprosurdate" validationgroup="approvalacc" />
                                                    <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="lbllandmeasurement" runat="server">Land Measurement as per Survey Certificate (Sq. Ft.)&nbsp; </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:TextBox ID="txtlandmeasurement" placeholder="Land Measurement" runat="server" class="form-control txtboxsize"></asp:TextBox>
                                            <%--<asp:RadioButton ID="rdbtnmeasurementYes" runat="server" GroupName="Landmatches" Text="Yes" value="Yes" Checked="true" onclick="txtboxenabled(this)" />
                                            <asp:RadioButton ID="rdbtnmeasurementNo" runat="server" GroupName="Landmatches" Text="No" value="No" onclick="txtboxenabled(this)" />--%>
                                        </div>
                                        <div class="col-lg-4">
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                                    <label>Total Area (Sq. Ft.) </label>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                                    <input type="text" id="txttotalsqft" class="form-control txtboxsize" placeholder="Total Area (Sq. Ft.)" title="Total Area (Sq. Ft.)" />
                                                </div>
                                            </div>
                                    <%--<br />--%>
                                    <div class="row myrow">
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="lbllandmismatch" runat="server">If Values in Total Area and Land Measurement Fields are Mismatched, Provide Reason&nbsp;</asp:Label>
                                           <%-- <span class="asterisk_input1"></span>--%>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtsurveyorcert" runat="server" placeholder="Mismatch Reason" data-toggle="tooltip" data-placement="Top" CssClass="form-control txtboxsize"></asp:TextBox>
                                        </div>
                                        <div class="col-lg-4">
                                        </div>
                                    </div>
                                    
                                         <div class="row myrow">
                                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                                    <label>Name of the Abutting Road </label>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                                    <input type="text" id="txtproabutrd" class="form-control txtboxsize" placeholder="Name of the Abutting Road" title="Name of the abutting Road" />
                                                </div>
                                            </div>
                                    <div class="row myrow">
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblloccompndwall">Surrounded by Fence or Compound Wall?                 
                                            </asp:Label>

                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:RadioButton ID="rdnlocYes" CssClass="radio-inline" runat="server" Text="Yes" value="Yes"
                                             GroupName="SurroundBy" Checked="true" AutoPostBack="false" Font-Bold="false" />
                                            <asp:RadioButton ID="rdnlocNo" CssClass="radio-inline" runat="server" Text="No"  value="No" GroupName="SurroundBy"
                                             AutoPostBack="false" Font-Bold="false" />
                                        </div>
                                        <div class="col-lg-4">
                                        </div>
                                    </div>
                                      <div class="row myrow">
                                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                                    <label>Orientation of the Plot </label>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                                    <input type="text" id="txtproorienplot" class="form-control txtboxsize"  placeholder="Orientation of the Plot" title="Orientation of the plot" />
                                                </div>
                                            </div>
                                     <div class="row myrow">
                                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                                    <label>LandMark </label>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                                    <input type="text" id="txtprolandmark" class="form-control txtboxsize" placeholder="LandMark" title="LandMark" />
                                                </div>
                                            </div>
                                      <div class="row myrow">
                                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                                    <label>Proximity to Surface Communication </label>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                                    <input type="text" id="txtprosurcomm" class="form-control txtboxsize" placeholder="Proximity to surface communication" title="Proximity to surface communication" />
                                                </div>
                                            </div>
                                     
                                    <div class="row myrow">
                                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                                    <label>Distance from the City/ Municipal Limits </label>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                                    <input type="text" id="txtprodiscity" class="form-control txtboxsize" placeholder="City/Municipal Limits"  title="Distance from the city/ municipal limits" />
                                                </div>
                                            </div>

                                     
                                      <div class="row myrow">
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="Label15" runat="server">Number of Dwelling Units in the Building&nbsp;</asp:Label>
                                            <%--<span class="asterisk_input1"></span>--%>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <span class="""></span>
                                             <textarea id="txtdwllingunits" class="txtareasize" placeholder="Number of Dwelling" rows="4" cols="46" name="description"> <%--Added by Anupriya for Chrome Mobile View only rows and cols changed--%>
                                                
                                             </textarea>
                                        </div>
                                    </div>
                                  <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <input type="button" id="Btnpropertydescsave" runat="server" value="Save" class="btn btn-primary" onclick="fnsavePropdesc(); return false" />
                                            <input type="button" id="Btnpropertydescreset" runat="server" value="Reset" class="btn btn-primary" onclick="fnresetPropdesc();" />
                                        </div>
                                        <div class="col-lg-2">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
             <!--End ofProperty Description div-->

             <!--BulidingDetails-->
            <div class="row">
                <div class="accordionShoHide" id="DivBuliddetailsaccordion" runat="server">
                    <div class="panel panel-default">
                        <div class="panel-heading" id="buildingheading">
                            <h4>
                                <a class="accordion-toggle" data-toggle="collapse" data-parent="#myAccordion" href="#divbuildingdetailsBody" onclick="fncollapse(event); buildingdetailclick(); focusatelem('buildingheading')">
                                    <i class="indicator glyphicon custom-chevron-right"></i>&nbsp;<span id="spnbuilingdetailsHeader">Building Details</span>
                                </a>
                            </h4>
                        </div>
                        <div id="divbuildingdetailsBody" class="panel-collapse collapse accordionmain">
                            <div class="panel-body">
                                <div id="divbuildingdetailsContent" class="jumbotron  accordion-body11">
                                    <div class="row myrow">
                                       <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                             <asp:Label runat="server" ID="boundproperty">Boundaries of the Property               
                                            </asp:Label>
                                        </div>
                                      
                                        <div class="container">
                                            <div class="table-responsive">

                                                <table class="table-bordered" id="tblBuliddetnorth" style="margin-left:15px;">
                                                <thead>
                                                     <tr> 
                                                         <th></th>
                                                        <th  style="text-align:center;background-color: #2E6DA4; color: #FFFFFF;padding: 6px;" colspan="2">Property</th>
                                                        <th style="text-align:center;background-color: #2E6DA4; color: #FFFFFF;padding: 6px;"colspan="2">Dimension</th>                                                                                                                                                                             
                                                    </tr>
                                                    <tr>
                                                        <th style="text-align: center"></th>
                                                        <th style="text-align: center;padding: 6px;background-color: #2E6DA4; color: #FFFFFF;">As Per Deed</th>
                                                        <th style="text-align: center;padding: 6px;background-color: #2E6DA4; color: #FFFFFF;">Actual</th>
                                                        <th style="text-align: center; padding: 6px;background-color: #2E6DA4; color: #FFFFFF;">As Per Deed</th>
                                                        <th style="text-align: center; padding: 6px;background-color: #2E6DA4; color: #FFFFFF;">Actual</th>                                                       
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>                                                        
                                                        <td><asp:Label runat="server"  class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle" style="margin-left:6px;" ID="lblnorth">North              
                                                            </asp:Label></td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtpropertydeednorth" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtpropertyactualnorth" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtdimensdeednorth" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtdimensactualnorth" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>                                                       
                                                    </tr>
                                                    <tr>
                                                        <td><asp:Label runat="server"  class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle" style="margin-left:4px;" ID="lblsouth">South              
                                                            </asp:Label></td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtpropertydeedsouth" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtpropertyactualsouth" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtdimensdeedsouth" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtdimensactualsouth" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>                                                       
                                                    </tr>
                                                    <tr>
                                                         <td><asp:Label runat="server"  class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle" style="margin-left:14px;" ID="lbleast">East             
                                                            </asp:Label></td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtpropertydeedeast" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtpropertyactualeast" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtdimensdeedeast" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtdimensactualeast" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>                                                       
                                                    </tr>
                                                    <tr>
                                                         <td><asp:Label runat="server"  class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle" ID="lblwest" style="margin-left:10px;">West             
                                                            </asp:Label></td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtpropertydeedwest" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtpropertyactualwest" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtdimensdeedwest" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtdimensactualwest" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>                                                       
                                                    </tr>
                                                </tbody>
                                            </table>
                                         
                                        </div>
                                        </div>
                                    </div>
                                    <br />

                                    <%--  Extent And Unit--%>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="extendsite">Extent of Site              
                                            </asp:Label>
                                        </div>
                                        
                                        <div class="container">
                                            <div class="table-responsive">

                                                <table class="table-bordered" id="tblBuliddetextent" style="margin-left:15px;">
                                                <thead>                                                     
                                                    <tr style="">
                                                        <th></th>
                                                        <th style="text-align: center;padding: 6px;background-color: #2E6DA4; color: #FFFFFF;">As Per Deed</th>
                                                        <th style="text-align: center;padding: 6px;background-color: #2E6DA4; color: #FFFFFF;">Actual</th>                                                        
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                         <td><asp:Label runat="server" class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle" ID="lblextent">Extent             
                                                            </asp:Label></td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtextentdeed" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtextentactual" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>                                                                                                              
                                                    </tr>
                                                    <tr>
                                                        <td><asp:Label runat="server" class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle" ID="lblunit" style="margin-left: 16px;">Unit           
                                                            </asp:Label></td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtunitdeed" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtunitactual" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>                                                                                                              
                                                    </tr>                                                    
                                                </tbody>
                                            </table>
                                            </div>
                                        </div>
                                            
                                    </div>
                                    <br />
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblconstuction">Type of Construction             
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=" "></span>
                                            <asp:DropDownList ID="ddltypeofconst" runat="server" onchange="fnotherstxtbox()" CssClass="form-control txtboxsize">
                                                <asp:ListItem>Load Bearing</asp:ListItem>
                                                <asp:ListItem>RCC</asp:ListItem>
                                                <asp:ListItem>Steel Framed</asp:ListItem>
                                                <asp:ListItem>Framed Structure</asp:ListItem>
                                                <asp:ListItem>Other</asp:ListItem>
                                            </asp:DropDownList>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblbuildingcompound">Building to Compound Wall - Adequate Footage Provided                
                                            </asp:Label>
                                            <%--<span class="asterisk_input1"></span>--%>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:RadioButton ID="rbcompoundyes" CssClass="radio-inline" runat="server" Text="Yes" value="Yes" GroupName="Compoundwall" AutoPostBack="false" Font-Bold="false" Checked="true" />
                                            <asp:RadioButton ID="rbcompoundno" CssClass="radio-inline" runat="server" Text="No" value="No" GroupName="Compoundwall" AutoPostBack="false" Font-Bold="false" />
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtcompound" runat="server" CssClass="form-control txtboxsize" placeholder="Provide justification">
                                            </asp:TextBox>
                                        </div>
                                    </div>

                                      <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblapperancebuild">Appearance of Building             
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:RadioButton ID="rbcommon" GroupName="rdncommon" runat="server" value="Common" Text="Common" Checked="true" />

                                            <asp:RadioButton ID="rbattractive" GroupName="rdncommon" runat="server" value="Attractive" Text="Attractive" />

                                            <asp:RadioButton ID="rbaesthetic" GroupName="rdncommon" runat="server" value="Aesthetic" Text="Aesthetic" />

                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblqualityconst">Quality of Construction             
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:RadioButton ID="rbsuper" GroupName="rdnsuper" runat="server" value="Superior" Text="Superior" Checked="true" />

                                            <asp:RadioButton ID="rbclassI" GroupName="rdnsuper" runat="server" value="ClassI" Text="ClassI" />

                                            <asp:RadioButton ID="rbclassII" GroupName="rdnsuper" runat="server" value="ClassII" Text="ClassII" />

                                        </div>
                                    </div>
                                     <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblmanitanceofbuild">Maintenance of Building - Interior          
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=" "></span>
                                            <asp:DropDownList ID="ddlint" runat="server" CssClass="form-control txtboxsize">
                                                <asp:ListItem>Excellent</asp:ListItem>
                                                <asp:ListItem>Good</asp:ListItem>
                                                <asp:ListItem>Normal</asp:ListItem>
                                                <asp:ListItem>Average</asp:ListItem>
                                                <asp:ListItem>Poor</asp:ListItem>
                                            </asp:DropDownList>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="Label20">Maintenance of Building - Exterior
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=" "></span>
                                            <asp:DropDownList ID="ddlext" runat="server" CssClass="form-control txtboxsize">
                                                <asp:ListItem>New one </asp:ListItem>
                                                <asp:ListItem>Excellent</asp:ListItem>
                                                <asp:ListItem>Good</asp:ListItem>
                                                <asp:ListItem>Normal</asp:ListItem>
                                                <asp:ListItem>Average</asp:ListItem>
                                                <asp:ListItem>Poor</asp:ListItem>
                                            </asp:DropDownList>
                                        </div>
                                    </div>

                                    <div class="row myrow1">
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <asp:Label ID="lblhouseapart" runat="server" Font-Bold="true">Year of Construction House/ Apartment&nbsp;</asp:Label>
                                        </div>
                                    </div>
                                    <br />
                                        <div class="container">
                                            <div class="table-responsive">
                                                <table class="table-bordered" id="tblhouseapart">
                                                    <thead>
                                                        <tr style="background-color: #2E6DA4; color: #FFFFFF;">
                                                            <%--<th style="text-align: center; padding: 5px;">Delete</th>--%>
                                                            <th style="text-align: center">Floor Number</th>
                                                            <th style="text-align: center; padding: 6px;">Year Constructed As Reported</th>
                                                            <th style="text-align: center; padding: 6px;">Year Constructed As Observed</th>
                                                            <th style="text-align: center; padding: 6px;">Year Constructed As Per Deed</th>
                                                            <th style="text-align: center; padding: 6px;">Year Completed</th>
                                                        </tr>
                                                    </thead>
                                                  <tbody>
                                                        <tr>
                                                            <%--<td align="center">
                                                                <input type="checkbox" />
                                                            </td>--%>
                                                            <td style="text-align: center">
                                                                <asp:TextBox ID="txthouseapartflornum" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                            </td>
                                                            <td style="text-align: center">
                                                                <asp:TextBox ID="txthouseapartreported" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                            </td>
                                                            <td style="text-align: center">
                                                                <asp:TextBox ID="txthouseapartobserved" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                            </td>
                                                            <td style="text-align: center">
                                                                <asp:TextBox ID="txthouseapartdeed" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                            </td>
                                                            <td style="text-align: center">
                                                                <asp:TextBox ID="txthouseapartyearcomp" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                            </td>
                                                            <td>
                                                                <button type="button" id="houserowadd" runat="server" class="btn-link" style="color: #0066CC" onclick="fnhouseapartaddrow('tblhouseapart');">
                                                                    <span class="glyphicon glyphicon-plus-sign" title="AddRow"></span>
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <%--<button type="button" id="houserowdelete" runat="server" class="btn-link" onclick="fnhouseapartremoverow()">--%>
                                                                   <button type="button" id="houserowdelete" runat="server" class="btn-link">
                                                                   <span class="glyphicon glyphicon-trash" title="Delete"></span>
                                                                </button>
                                                            </td> 
                                                        </tr>
                                                    </tbody>
                                                    <%--<tfoot>
                                                        <tr>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td>
                                                                <button type="button" id="houserowadd" runat="server" class="btn-link" style="color: #0066CC" onclick="fnhouseapartaddrow('tblhouseapart');">
                                                                    <span class="glyphicon glyphicon-plus-sign">&nbsp;AddRow</span>
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button type="button" id="Button2" runat="server" class="btn-link" onclick="fnhouseapartremoverow()">
                                                                    <span class="glyphicon glyphicon-trash">&nbsp;RemoveRow</span>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </tfoot>--%>
                                                </table>
                                            </div>
                                        </div>
                                    <br />


                                    <div class="row myrow1">
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <asp:Label ID="lblplintharea" runat="server" Font-Bold="true">Total for each Floor(Plinth&Cantilevered)&nbsp;</asp:Label>
                                        </div>
                                    </div>
                                    <br />
                                        <div class="container">
                                            <div class="table-responsive">
                                                <table class="table-bordered" id="tblplintarea">
                                                    <thead>
                                                        <tr style="background-color: #2E6DA4; color: #FFFFFF;">
                                                           <%-- <th style="text-align: center; padding: 5px;">Delete</th>--%>
                                                            <th style="text-align: center">Floor Number</th>
                                                            <th style="text-align: center">Height of Each Floor</th>
                                                            <th style="text-align: center; padding: 6px;">Plinth Area Main</th>
                                                            <th style="text-align: center; padding: 6px;">Plinth Area Cantilevered</th>
                                                            <th style="text-align: center; padding: 6px;">Plinth Area Total</th>
                                                            <th style="text-align: center; padding: 6px;">Room Details</th>
                                                        </tr>
                                                    </thead>
                                                  <tbody>
                                                        <tr>
                                                            <%--<td align="center">
                                                                <input type="checkbox" />
                                                            </td>--%>
                                                            <td style="text-align: center">
                                                                <asp:TextBox ID="txtmainportflrnum" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                            </td>
                                                             <td style="text-align: center">
                                                                <asp:TextBox ID="txtheightfloor" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                            </td>
                                                            <td style="text-align: center">
                                                                <asp:TextBox ID="txtmainportplintmain" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                            </td>
                                                            <td style="text-align: center">
                                                                <asp:TextBox ID="txtmainportcantilevered" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                            </td>
                                                            <td style="text-align: center">
                                                                <asp:TextBox ID="txtmainporttotal" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                            </td>
                                                            <td style="text-align: center">
                                                                <asp:TextBox ID="txtroomdetails" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                            </td>
                                                            <td>
                                                                <button type="button" id="btnplinthareaadd" runat="server" class="btn-link" style="color: #0066CC" onclick="fnplinthaddrow('tblplintarea');">
                                                                    <span class="glyphicon glyphicon-plus-sign" title="AddRow"></span>
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button type="button" id="btnplintharearemove" runat="server" class="btn-link">
                                                                    <span class="glyphicon glyphicon-trash" title="Delete"></span>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                    <%--<tfoot>
                                                        <tr>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td><td></td>
                                                            <td>
                                                                <button type="button" id="Button1" runat="server" class="btn-link" style="color: #0066CC" onclick="fnplinthaddrow('tblplintarea');">
                                                                    <span class="glyphicon glyphicon-plus-sign">&nbsp;AddRow</span>
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button type="button" id="Button3" runat="server" class="btn-link" onclick="fnplinthremoverow()">
                                                                    <span class="glyphicon glyphicon-trash">&nbsp;RemoveRow</span>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </tfoot>--%>
                                                </table>
                                            </div>
                                        </div>
                                    <br />

                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="Label6" runat="server">Property in Livable Condition&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:RadioButton ID="rblivableyes" GroupName="rdnlivabl" runat="server" value="Yes" class="rdnyesno" Checked="true" Font-Bold="false" onclick="fnchklivablestatus()" Text="Yes" />
                                       
                                            <asp:RadioButton ID="rblivableno" GroupName="rdnlivabl" runat="server" value="No" class="rdnyesno" onclick="fnchklivablestatus()" Font-Bold="false" Text="No" />
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="Label41" runat="server">If Occupied by Tenant,Since How Long&nbsp;</asp:Label>
                                            <%--<span class="asterisk_input1"></span>--%>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                            <textarea id="txtoccupiedperiod" class="txtareasize" rows="3" cols="30" placeholder="Duration of Tenant Occupied" name="description">
                                                
                                             </textarea>
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="lbloccupiedby" runat="server">Occupied By&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:RadioButton ID="rbowner" GroupName="rdnoccupied" runat="server" value="Owner" Text="Owner" Checked="true" />
                                        
                                            <asp:RadioButton ID="rbtenant" GroupName="rdnoccupied" runat="server" value="Tenant" Text="Tenant" />
                                        
                                            <asp:RadioButton ID="rbboth" GroupName="rdnoccupied" runat="server" value="Both" Text="Both"  />
                                        
                                            <asp:RadioButton ID="rbvacant" GroupName="rdnoccupied" runat="server" value="Vacant" Text="Vacant" />
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblgrossmonthlyrent">Gross Monthly Rent              
                                            </asp:Label>                                         
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtgrossmonthlyrent" runat="server"  CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblgrossadvanceamt">Gross Advance Amount              
                                            </asp:Label>                                         
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtgrossadvanceamt" runat="server" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <input type="button" id="btnbuildsave" value="Save" runat="server" class="btn btn-primary" onclick="fnsaveBuilddetails()" />
                                            <input type="button" id="btnbuildreset" value="Reset" runat="server" class="btn btn-primary" onclick="resetbuild()" />
                                        </div>
                                        <div class="col-lg-2">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
              <!-- End of BuildingDetails-->

             <!--Property Land Details Accordion-->      <%-- Added by Deepa   --%>
             <div class="row">
                <div class="accordionShoHide" id="Div1" runat="server">
                    <div class="panel panel-default">
                        <div class="panel-heading" id="Landheading">
                            <h4>
                                <a class="lnkLanddetails" data-toggle="collapse" data-parent="#myAccordion" href="#divlanddetailsBody" onclick="fncollapse(event); landdetailclick(); focusatelem('Landheading')">
                                    <i class="indicator glyphicon custom-chevron-right"></i>&nbsp;<span id="spnlanddetailsHeader">Land Details</span>
                                </a>
                            </h4>
                        </div>
                         <div id="divlanddetailsBody" class="panel-collapse collapse accordionmain">
                            <div class="panel-body">
                                <div id="divlanddetailsContent" class="jumbotron  accordion-body11">
                                    <div class="row myrow">
                                       <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                             <asp:Label runat="server" ID="landboundproperty">Boundaries of the Property                 
                                            </asp:Label>
                                        </div>
                                        <div class="container">
                                            <div class="table-responsive">

                                                <table class="table-bordered" id="tblpropdim" style="margin-left:15px;">
                                                <thead>
                                                     <tr> 
                                                         <th></th>
                                                        <th  style="text-align:center;background-color: #2E6DA4; color: #FFFFFF;padding: 6px;" colspan="2">Property</th>
                                                        <th style="text-align:center;background-color: #2E6DA4; color: #FFFFFF;padding: 6px;"colspan="2">Dimension</th>                                                                                                                                                                             
                                                    </tr>
                                                    <tr>
                                                        <th style="text-align: center"></th>
                                                        <th style="text-align: center;padding: 6px;background-color: #2E6DA4; color: #FFFFFF;">As Per Deed</th>
                                                        <th style="text-align: center;padding: 6px;background-color: #2E6DA4; color: #FFFFFF;">Actual</th>
                                                        <th style="text-align: center; padding: 6px;background-color: #2E6DA4; color: #FFFFFF;">As Per Deed</th>
                                                        <th style="text-align: center; padding: 6px;background-color: #2E6DA4; color: #FFFFFF;">Actual</th>                                                       
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>                                                        
                                                        <td><asp:Label runat="server"  class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle" style="margin-left:6px;" ID="Label18">North              
                                                            </asp:Label></td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtpropdeednorth" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtpropactualnorth" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtdimdeednorth" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtdimactualnorth" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>                                                       
                                                    </tr>
                                                    <tr>
                                                        <td><asp:Label runat="server"  class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle" style="margin-left:4px;" ID="Label19">South              
                                                            </asp:Label></td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtpropdeedsouth" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtpropactualsouth" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtdimdeedsouth" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtdimactualsouth" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>                                                       
                                                    </tr>
                                                    <tr>
                                                         <td><asp:Label runat="server"  class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle" style="margin-left:14px;" ID="Label21">East              
                                                            </asp:Label></td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtpropdeedeast" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtpropactualeast" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtdimdeedeast" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtdimactualeast" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>                                                       
                                                    </tr>
                                                    <tr>
                                                         <td><asp:Label runat="server"  class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle" ID="Label22" style="margin-left:10px;">West              
                                                            </asp:Label></td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtpropdeedwest" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtpropactualwest" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtdimdeedwest" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtdimactualwest" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>                                                       
                                                    </tr>
                                                </tbody>
                                            </table>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <%--  Extent And Unit--%>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="landextentsite">Extent of Site
                                            </asp:Label>
                                        </div>
                                        <div class="container">
                                            <div class="table-responsive">

                                                <table class="table-bordered" id="tblextentunit" style="margin-left:15px;">
                                                <thead>                                                     
                                                    <tr style="">
                                                        <th></th>
                                                        <th style="text-align: center;padding: 6px;background-color: #2E6DA4; color: #FFFFFF;">As Per Deed</th>
                                                        <th style="text-align: center;padding: 6px;background-color: #2E6DA4; color: #FFFFFF;">Actual</th>                                                        
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                         <td><asp:Label runat="server" class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle" ID="Label23">Extent             
                                                            </asp:Label></td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtextdeed" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtextactual" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>                                                                                                              
                                                    </tr>
                                                    <tr>
                                                        <td><asp:Label runat="server" class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle" ID="Label24" style="margin-left: 16px;">Unit              
                                                            </asp:Label></td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtunideed" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtuniactual" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>                                                                                                              
                                                    </tr>                                                    
                                                </tbody>
                                            </table>
                                            </div>
                                        </div>
                                    </div>
                                     <br />                                      
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblextentsite">Extent of Site(least)                
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin txtboxaccordion">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtextentsite" runat="server" placeholder="Least Extent" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblsize">Size of the Plot                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin txtboxaccordion">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtsize" runat="server" placeholder="Size of the Plot"  CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblnorthsouth">North and South                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin txtboxaccordion">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtnorthsouth" runat="server" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lbleastwest">East and West                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin txtboxaccordion">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txteastwest" runat="server" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lbltotalextent">Total Extent of the Plot                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin txtboxaccordion">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txttotalextent" runat="server"  placeholder="Total Extent of the Plot" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>                                    
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblfloodingorsubmerging">Possibility of Frequent Flooding or Submerging                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin txtboxaccordion">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtfloodingorsubmerging" runat="server" placeholder="Frequent Flooding or Submerging" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lbldevsurroundingareas">Development of Surrounding Areas                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin txtboxaccordion">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtdevsurroundingareas" runat="server" placeholder="Surrounding Areas" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblshapeandmeasure">Shape of the Land                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin txtboxaccordion">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtshapeandmeasure" runat="server" placeholder="Shape of the Land" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblcivicamenities">Accessibility to the Civic Amenities like Schools, Hospitals, Offices, Markets, etc                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin txtboxaccordion">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtcivicamenities" runat="server"  placeholder="Civic Amenities" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lbltopographical">Level of Land with Topographical Conditions                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin txtboxaccordion">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txttopographical" runat="server"  placeholder="Topographical Conditions" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>                                    
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lbltenureland">Tenure of Land                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txttenureland" runat="server" placeholder="Tenure of Land" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>                                    
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblcornerplot">Corner Plot or Intermittent Plot?                
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtcornerplot" placeholder="Corner or Intermittent Plot" runat="server" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lbltypeofroad">Type of Road Available at Present                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txttypeofroad" runat="server" placeholder="Type of Road" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblavgdepthwidth">Ratio Between the Average Depth and Width                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtavgdepthwidth" runat="server" placeholder="Average Depth and Width" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblroadfacilities">Road Facilities are Available?                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtroadfacilities" runat="server" placeholder="Road Facilities" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>                                    
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblwaterpotentiality">Water Potentiality                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtwaterpotentiality" runat="server" placeholder="Water Potentiality" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblwidthoftheroad">Width of the Road                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtwidthoftheroad" runat="server"  placeholder="Width of the Road" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <%--<div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblwidthoftheroadft">Width of the road, is it less than 20 ft or more than 20 ft:                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtwidthoftheroadft" runat="server" CssClass="form-control">
                                            </asp:TextBox>
                                        </div>
                                    </div>--%>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblunderground">Underground Sewerage System                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtunderground" runat="server"  placeholder="Underground Sewerage System" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblpowersupply">Is Power Supply Available at the Site                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtpowersupply" runat="server" placeholder="Power Supply Available" CssClass="form-control txtboxsize" >
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblspecialremarks">Special Remarks If Any                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>                                           
                                            <textarea id="txtspecialremarks" rows="5" cols="35" class="txtareasize" placeholder="Special Remarks" name="description">                                                
                                             </textarea>
                                        </div>
                                    </div>                                    
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblfloorindex">What is the Floor Space Index (app.)                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtfloorindex" runat="server" placeholder="Floor Space Index" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblplotcoverage">Plot Coverage                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtplotcoverage" runat="server" placeholder="Plot Coverage" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <input type="button" id="propertylandsave" runat="server" value="Save" class="btn btn-primary" onclick="fnsavepropertylanddetails(); " />
                                            <input type="button" id="propertylandreset" runat="server" value="Reset" class="btn btn-primary" onclick="resetpropertyland();" />
                                        </div>
                                        <div class="col-lg-2">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--End of Property Land details accordion-->



            <!--AmenitiesDetails-->
            <div class="row">
                <div class="accordionShoHide" id="DivAmenitiesdetailsaccordion" runat="server">
                    <div class="panel panel-default">
                        <div class="panel-heading" id="amenityheading">
                            <h4>
                                <a class="accordion-toggle" data-toggle="collapse" data-parent="#myAccordion" href="#divamenitiesdetailsBody" onclick="fncollapse(event); amenitydetailclick(); focusatelem('amenityheading') ">
                                    <i class="indicator glyphicon custom-chevron-right"></i>&nbsp;<span id="spnamenitiesdetailsHeader">Amenities Details</span>
                                </a>
                            </h4>
                        </div>
                        <div id="divamenitiesdetailsBody" class="panel-collapse collapse accordionmain">
                            <div class="panel-body">
                                <div id="divamenitiesdetailsContent" class="jumbotron accordion-body11">
                                    <%--<div class="row">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                            <asp:Label ID="lblavailable" runat="server" Font-Bold="true">Amenities - Utility</asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                    </div>
                                    <br />--%>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="lbllift" runat="server" Font-Bold="true">Number of Lifts&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:TextBox ID="txtlift" runat="server" class="form-control txtboxsize"  placeholder="No of Lifts" onkeypress="return isNumberKey(event,this)"></asp:TextBox>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                    </div>
                                    <%--<br />--%>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="lblcarpark" runat="server" Font-Bold="true">Number of Car Parks&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:TextBox ID="txtcarpark" runat="server" placeholder="No of Car Parks" class="form-control txtboxsize" onkeypress="return isNumberKey(event,this)"></asp:TextBox>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                    </div>
                                    <%--<br />--%>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="lblcovered" runat="server" Font-Bold="true">Covered Car Parks&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:TextBox ID="txtcovered" runat="server" placeholder="Covered Car Parks" class="form-control txtboxsize"></asp:TextBox>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                    </div>
                                    <%--<br />--%>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="lblresident" runat="server" Font-Bold="true">Resident Welfare&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:TextBox ID="txtresident" runat="server" class="form-control txtboxsize"></asp:TextBox>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                    </div>
                                    <%--<br />--%>
                                    <div class="row myrow" style="display: none">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="Label7" runat="server" Font-Bold="true">Nearest School&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:TextBox ID="txtSchName" runat="server" class="form-control"></asp:TextBox>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                            <asp:TextBox ID="txtschdistance" runat="server" class="form-control" placeholder=""></asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow" style="display: none">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="Label9" runat="server" Font-Bold="true">Nearest Bus Stand&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:TextBox ID="txtNearBus" runat="server" class="form-control"></asp:TextBox>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                            <asp:TextBox ID="txtBusDist" runat="server" class="form-control" placeholder=""></asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow" style="display: none">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="Label10" runat="server" Font-Bold="true">Nearest Hospital&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:TextBox ID="txtNearHosp" runat="server" class="form-control"></asp:TextBox>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                            <asp:TextBox ID="txtHospDist" runat="server" class="form-control" placeholder=""></asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow" style="display: none">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="Label11" runat="server" Font-Bold="true">Nearest College&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:TextBox ID="txtNearColg" runat="server" class="form-control"></asp:TextBox>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                            <asp:TextBox ID="txtColgDist" runat="server" class="form-control" placeholder=""></asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow" style="display: none">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="Label12" runat="server" Font-Bold="true">Nearest Metro Station:&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:TextBox ID="txtNearMetroStat" runat="server" class="form-control"></asp:TextBox>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                            <asp:TextBox ID="txtMetroStatDist" runat="server" class="form-control" placeholder=""></asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow" style="display: none">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="Label13" runat="server" Font-Bold="true">Nearest Police Station&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:TextBox ID="txtNearPoliceStat" runat="server" class="form-control"></asp:TextBox>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                            <asp:TextBox ID="txtPoliceStatDist" runat="server" class="form-control" placeholder=""></asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow" style="display: none">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="Label14" runat="server" Font-Bold="true">Nearest Theater&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:TextBox ID="txtNearTheater" runat="server" class="form-control"></asp:TextBox>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                            <asp:TextBox ID="txtTheaterDist" runat="server" class="form-control" placeholder=""></asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="lblother" runat="server" Font-Bold="true">Other Utility Amenities&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:ListBox ID="dlamenity" runat="server" CssClass="form-control txtboxsize" SelectionMode="Multiple">
                                                <asp:ListItem Text="Select" Value="Select"></asp:ListItem>
                                            </asp:ListBox>
                                        </div>
                                        <div class="col-lg-2">
                                        </div>
                                    </div>
                                    <%--<br />--%>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="lblfitness" runat="server" Font-Bold="true">Amenities – Fitness&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:ListBox ID="dlfitness" runat="server" CssClass="form-control txtboxsize" SelectionMode="Multiple">
                                                <asp:ListItem Text="Select" Value="Select"></asp:ListItem>
                                            </asp:ListBox>
                                        </div>
                                        <div class="col-lg-4">
                                        </div>
                                    </div>
                                    <%--<br />--%>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="lblhealth" runat="server" Font-Bold="true">Amenities - Health&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:ListBox ID="dlhealth" runat="server" CssClass="form-control txtboxsize" SelectionMode="Multiple">
                                                <asp:ListItem Text="Select" Value="Select"></asp:ListItem>
                                            </asp:ListBox>
                                        </div>
                                        <div class="col-lg-4">
                                        </div>
                                    </div>

                                  <%--  ///////Amenities - Building: Added by Deepa////
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="lblAmenitiesbuilding" runat="server" Font-Bold="true">Amenities - Building:&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:ListBox ID="dlAmenitiesbuilding" runat="server" CssClass="form-control" SelectionMode="Multiple" onchange = "DepreciationValue()">
                                                <asp:ListItem Text="Select" Value="Select"></asp:ListItem>
                                            </asp:ListBox>
                                        </div>

                                        <div class="col-lg-4">
                                        </div>
                                    </div>--%>
                                    <%--Amenities - Building: Added by Deepa--%>
                                 
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 divmiddle">
                                            <asp:Label ID="lblAmenitiesbuilding" runat="server" Font-Bold="true">Building-Depreciation Value&nbsp;</asp:Label>
                                        </div>                                   
                                    
                                        <div class="container">
                                            <div class="table-responsive">
                                                <table class="table-bordered" id="tblAmenitiesbuilding" style="margin-left: 2%;">
                                                    <thead>
                                                        <tr style="background-color: #2E6DA4; color: #FFFFFF;">
                                                           <%-- <th style="text-align: center; padding: 5px;">Delete</th>--%>                                                           
                                                            <th style="text-align: center">Amenities Building</th>
                                                            <th style="text-align: center; padding: 6px;">Depreciation Value</th>
                                                        </tr>
                                                    </thead>
                                                  <tbody>
                                                        <tr>
                                                            <%--<td align="center">
                                                                <input type="checkbox" />
                                                            </td> --%>                                                          
                                                            <td>
                                                                    <select class="form-control" id="dlAmenitiesbuilding" onchange="DepreciationValue()" style="width: 100%">
                                                                    </select>
                                                                </td>
                                                            <td style="text-align: center">
                                                                <asp:TextBox ID="txtAmenitiesbuilding" onkeypress="return isNumberKey(event)" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                            </td>
                                                             <td>
                                                                <button type="button" id="btnaddrow" runat="server" class="btn-link" style="color: #0066CC"  onclick="fnDVaddrow('tblAmenitiesbuilding'); fnDVremoveddlvalue();">
                                                                    <span class="glyphicon glyphicon-plus-sign" title="AddRow"></span>
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button type="button" id="btnremoverow" runat="server" class="btn-link">
                                                                    <span class="glyphicon glyphicon-trash" title="Delete"></span>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </tbody>                                                      
                                                </table>
                                            </div>
                                        </div>
                                         </div>
                                 


                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="lblhealthothers" runat="server">Any Other Amenities&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:TextBox ID="txthealthothers" runat="server" placeholder="Other Amenities" class="form-control txtboxsize"></asp:TextBox>
                                        </div>
                                        <div class="col-lg-4">
                                        </div>
                                    </div>

                                    <%--How is the flat maintenance?--%>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="lblflatmaintainance" runat="server">How is the Flat Maintenance?&nbsp;</asp:Label>
                                            <%--<span class="asterisk_input1"></span>--%>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                            <asp:TextBox ID="txtflatmaintainance" runat="server"  placeholder="Flat Maintenance" class="form-control txtboxsize"></asp:TextBox>
                                        </div>
                                    </div>
                                    <%--<br />--%>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <%--<asp:Button ID="btnamenitysave" runat="server" Text="Save" CssClass="btn btn-primary" OnClientClick="fnsaveAmenitydetails();" />--%>
                                            <%--<asp:Button ID="btnamenityreset" runat="server" Text="Reset" CssClass="btn btn-primary" />--%>
                                            <input type="button" id="btnamenitysave" runat="server" value="Save" class="btn btn-primary" onclick="fnsaveAmenitydetails(); " />
                                            <input type="button" id="btnamenityreset" runat="server" value="Reset" class="btn btn-primary" onclick="resetamenities();" />
                                        </div>
                                        <div class="col-lg-2">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--End of AmenitiesDetails div-->
            </div>


            <!-- Statutory Details-->
            <div class="row">
                <div class="accordionShoHide" id="Divstatutoryaccordion" runat="server">
                    <div class="panel panel-default">
                        <div class="panel-heading" id="statutoryheading">
                            <h4>
                                <a class="accordion-toggle" data-toggle="collapse" data-parent="#myAccordion" href="#divstatutoryBody" onclick="fncollapse(event); statutorydetailclick(); focusatelem('statutoryheading') ">
                                    <i class="indicator glyphicon custom-chevron-right"></i>&nbsp;<span id="spnstatutoryHeader">Statutory Details</span>
                                </a>
                            </h4>
                        </div>
                        <div id="divstatutoryBody" class="panel-collapse collapse accordionmain">
                            <div class="panel-body">
                                <div id="divstatutoryContent" class="jumbotron accordion-body11">
                                    <%--<div class="row">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                            <asp:Label ID="Label41" runat="server" Font-Bold="true">Statutory Details</asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                    </div>--%>
                                    <div class="row myrow">
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                            <label>Restrictive Clauses as to Usage of the Property </label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <input type="text" id="txtstatrest"  placeholder="Usage of the Property" class="form-control txtboxsize"  title="Restrictive clauses as to usage of the property" />
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="txtstattype" runat="server" Font-Bold="true">Type of Use to Which it can be Put</asp:Label>
                                        </div>
                                       
                                        <div class="col-lg-4 col-md-5 col-sm-12 col-xs-12 divmiddle1">
                                                    <asp:RadioButton CssClass="" ID="txtstattype1" GroupName="stattypeofuse" runat="server" Text="Residential" value="Residential" checked="true"/>
                                                    <asp:RadioButton CssClass="radiostyle" ID="txtstattype2" runat="server" GroupName="stattypeofuse" Text="Commercial" value="Commercial" />
                                                    <asp:RadioButton CssClass="radiostyle" ID="txtstattype3" runat="server" GroupName="stattypeofuse" Text="Mixed" value="Mixed" />
                                                </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="txtstatreserved" runat="server" Font-Bold="true">Is it a Reserved Land? </asp:Label>
                                        </div>
                                       
                                        <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12 divmiddle1">
                                                    <asp:RadioButton CssClass="" ID="txtstatreserved1" GroupName="statreserved" runat="server" Text="Notified for acquisition by Govt" value="Notified_for_by_Govt"  />
                                                    <asp:RadioButton CssClass="" ID="txtstatreserved2" runat="server" GroupName="statreserved" Text="Notified under agency area" value="Notified_under_agency_area"  style="margin-left:10px;"/>
                                                    <asp:RadioButton CssClass="" ID="txtstatreserved3" runat="server" GroupName="statreserved" Text="Scheduled Area" value="Scheduled_Area"  style="margin-left:10px;"/>
                                                  
                                     <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 divmiddle1" style="margin-left:-24px">
                                          <asp:RadioButton CssClass="" ID="txtstatreserved4" runat="server" GroupName="statreserved" Text="Contonment Area" value="Contonment_Area" style="margin-left:10px;"/>   
                                          <asp:RadioButton CssClass="" ID="txtstatreserved5" runat="server" GroupName="statreserved" Text="Land earmarked for Govt Project" value="Land_earmarked_for_Govt_Project" style="margin-left:10px;"/>
                                          <asp:RadioButton CssClass="" ID="txtstatreserved6" runat="server" GroupName="statreserved" Text="Forest Land" value="forest_land" style="margin-left:10px;" />
                                         
                                          </div>
                                             <div class="col-lg-10 col-md-10 col-sm-12 col-xs-12 divmiddle1" style="margin-left:-24px">
                                                 <asp:RadioButton CssClass="" ID="txtstatreserved7" runat="server" GroupName="statreserved" Text="Coastal Regulation Zone" value="coastal_regulation_zone" style="margin-left:10px;" />
                                                   <asp:RadioButton CssClass="" ID="txtstatreserved8" runat="server" GroupName="statreserved" Text="Others" value="Others"  style="margin-left:10px;"  checked="true" />
                                                  </div>
                                            </div>
                                            
                                    </div>
                                    
                                    <div class="row myrow">
                                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                                  
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12" id="otherstext">
                                                    <textarea id="txtstatreserved9" class="txtareasize" rows="4" cols="46" name="description">                                                
                                             </textarea>
                                                </div>
                                            </div>

                                    <div class="row myrow">
                                        <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="txtstatcontemplated" runat="server" Font-Bold="true">In Case it is an Agricultural Land, Any Conversion to House Site Plots is Contemplated</asp:Label>
                                        </div>
                                       
                                        <div class="col-lg-3 col-md-5 col-sm-12 col-xs-12 divmiddle1">
                                                    <asp:RadioButton CssClass="" ID="txtstatcontemplated1" GroupName="statcontemplated" runat="server" Text="Yes" value="Yes" checked="true"/>
                                                    <asp:RadioButton CssClass="radiostyle" ID="txtstatcontemplated2" runat="server" GroupName="statcontemplated" Text="No" value="No" />
                                                 </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="txtstatlocked" runat="server" Font-Bold="true">Is it a Land or Locked Land</asp:Label>
                                        </div>
                                       
                                        <div class="col-lg-3 col-md-5 col-sm-12 col-xs-12 divmiddle1">
                                                    <asp:RadioButton CssClass="" ID="txtstatlocked1" GroupName="statlocked" runat="server" Text="Open Land" value="OpenLand" checked="true"/>
                                                    <asp:RadioButton CssClass="radiostyle" ID="txtstatlocked2" runat="server" GroupName="statlocked" Text="Locked Land" value="LockedLand" />
                                                 </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                        <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="txtstattownplan" runat="server" Font-Bold="true">Is Plot in Town Planning Approved Layout</asp:Label>
                                        </div>
                                       
                                        <div class="col-lg-3 col-md-5 col-sm-12 col-xs-12 divmiddle1">
                                                    <asp:RadioButton CssClass="" ID="txtstattownplan1" GroupName="stattownplan" runat="server" Text="Yes" value="Yes" checked="true"/>
                                                    <asp:RadioButton CssClass="radiostyle" ID="txtstattownplan2" runat="server" GroupName="stattownplan" Text="No" value="No" />
                                                    <asp:RadioButton CssClass="radiostyle" ID="txtstattownplan3" runat="server" GroupName="stattownplan" Text="Scheme Area" value="Scheme_Area" />
                                                 </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                                    <label>Will there be Any Problem to get Drawing Approval at a Later Date </label>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                                    <input type="text" id="txtstatdrawing" placeholder="Any Problem to Get Drawing Approval" class="form-control txtboxsize" title="Will there be any problem to get drawing approval at a later date " />
                                                </div>
                                            </div>
                                    <div class="row">
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="lblApproved" runat="server">Is the Project Approved?&nbsp</asp:Label>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <asp:RadioButton CssClass="radio-inline" ID="rdnApprovedYes" runat="server" GroupName="Approved" Text="Yes" value="Yes"  />
                                            <asp:RadioButton CssClass="radio-inline" ID="rdnApprovedNo" runat="server" GroupName="Approved" Checked="true" Text="No" value="No" />
                                            <asp:RadioButton CssClass="radio-inline" ID="rdnApprovedpending" runat="server" GroupName="Approved" Text="Approval Pending" value="Approval Pending" />
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                                    <label>Approving Authority </label>
                                                </div>
                                         <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 divmiddle1">
                                                    <asp:RadioButton CssClass="" ID="txtstatappauth1" GroupName="statappauth" runat="server" Text="DTCP" value="DTCP" checked="true"/>
                                                    <asp:RadioButton CssClass="radiostyle" ID="txtstatappauth2" runat="server" GroupName="statappauth" Text="CMDA" value="CMDA" />
                                                    <asp:RadioButton CssClass="radiostyle" ID="txtstatappauth3" runat="server" GroupName="statappauth" Text="Panchayat" value="Panchayat" />
                                             <asp:RadioButton CssClass="radiostyle" ID="txtstatappauth4" runat="server" GroupName="statappauth" Text="Municipality" value="Municipality" />
                                                 </div>
                                            </div>
                                     <div class="row myrow">
                                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                                    <label>Approval No </label>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                                    <input type="text" id="txtstatappnumber" class="form-control txtboxsize" placeholder="Enter Approval No with Date" title="Approving Authority,Text box for capturing Approval No with Date" />
                                                </div>
                                            </div>
                                    <div class="row myrow">
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                            <label>Approval Date&nbsp;</label>
                                        </div>
                                       <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <div class="form-group txtboxdatesize" style="margin-bottom: 0px;">
                                                <div class='input-group date' id='dtpickerappdate'>
                                                    <input type='text' runat="server" placeholder="DD/MM/YYYY" class="form-control" id="txtstatappdate" validationgroup="approvalacc" />
                                                    <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                    </div>
                                    <div class="row" style="padding-top: 6px;">
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="lblreleasecertno" runat="server">Release Certificate Number&nbsp</asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:TextBox ID="txtReleaseCertNo" runat="server" CssClass="form-control txtboxsize" placeholder="Enter Release Certificate Number"></asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="txtstatauth" runat="server" Font-Bold="true">Athenticity of Approved Map/Plan is Verified?</asp:Label>
                                        </div>
                                       
                                        <div class="col-lg-3 col-md-5 col-sm-12 col-xs-12 divmiddle1">
                                                    <asp:RadioButton CssClass="" ID="txtstatauth1" GroupName="statauth" runat="server" Text="Yes" value="Yes" checked="true"/>
                                                    <asp:RadioButton CssClass="radiostyle" ID="txtstatauth2" runat="server" GroupName="statauth" Text="No" value="No" />
                                                 </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                    </div>

                                    <div class="row myrow">
                                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                                    <label>Is the Building Constructed Strictly According to the Sanctioned Plan? </label>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                                    <input type="text" id="txtstatsanction" placeholder="According to the Sanctioned Plan?" class="form-control txtboxsize"  title="According to the Sanctioned Plan?" />
                                                </div>
                                            </div>

                                    <div class="row myrow">
                                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                                    <label>Details of Variations Noticed and its Effect on Valuation </label>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                                    <input type="text" id="txtstatvariations" class="form-control txtboxsize" placeholder="Effect on Valuation" title="Effect on Valuation" />
                                                </div>
                                            </div>

                                    <div class="row myrow">
                                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                                    <label>Comments by Empanelled Valuers on Authentic of Approved Plan</label>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                                    <input type="text" id="txtstatempanelled" placeholder="Authentic of Approved Plan" class="form-control txtboxsize"  title="Authentic of Approved Plan" />
                                                </div>
                                            </div>

                                    <div class="row myrow">
                                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                                    <label>Valuation Details if the Property Valued Earlier </label>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                                    <input type="text" id="txtstatvalued" class="form-control txtboxsize"  placeholder="Property Valued Earlier?" title="Property Valued Earlier?" />
                                                </div>
                                            </div>

                                    <div class="row myrow">
                                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                                    <label>Property Tax Assessment No  </label>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                                    <input type="text" id="txtstatassess"  placeholder="Enter the Property Tax Assessment no" class="form-control txtboxsize"  title="Enter the Property Tax Assessment no" />
                                                </div>
                                            </div>

                                    <div class="row myrow">
                                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                                    <label>Property Tax Amount </label>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                                       <asp:TextBox ID="txtstattaxamt" runat="server"  placeholder="Enter the Property Tax Amount" class="form-control txtboxsize" onkeypress='return isNumberKey(event)' onblur="formatNumber(this.id)"></asp:TextBox>
                                                </div>
                                            </div>

                                    <div class="row myrow">
                                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                                    <label>Property Tax Receipt No </label>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                                    <input type="text" id="txtstattaxreceipt" class="form-control txtboxsize" placeholder="Enter the Property Tax Receipt No" title="Property Tax Receipt No" />
                                                </div>
                                            </div>
                                      <div class="row myrow">
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                            <label>Property Tax Paid Period&nbsp;</label>
                                        </div>
                                       <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <input type="text" id="txtstatdatepaid" class="form-control txtboxsize" placeholder="Enter the Property Tax Paid Period" title="Property Tax Paid Period" />
                                           </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                    </div>
                                         <div class="row myrow">
                                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                                    <label>Property Tax Paid in the Name Of </label>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                                    <input type="text" id="txtstattaxpaid" class="form-control txtboxsize" placeholder="Property Tax Paid in the name of" title="Property Tax Paid in the name of" />
                                                </div>
                                            </div>
                                      <div class="row myrow">
                                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                                    <label>Electricity Service Connection No </label>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                                    <input type="text" id="txtstatelectricity" class="form-control txtboxsize" placeholder="Enter the Electricity Service Connection No" title="Electricity Service Connection No" />
                                                </div>
                                            </div>
                                     <div class="row myrow">
                                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                                    <label>Master Card in the Name Of </label>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                                    <input type="text" id="txtstatmaster" class="form-control txtboxsize" placeholder="Master Card in the name of" title="Master Card in the name of" />
                                                </div>
                                            </div>
                                      <div class="row myrow">
                                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                                    <label>WealthTax Paid Amount </label>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                                     <asp:TextBox ID="txtstatwealth" runat="server" class="form-control txtboxsize" placeholder="Enter the WealthTax Paid Amount" onkeypress='return isNumberKey(event)' onblur="formatNumber(this.id)"></asp:TextBox>
                                                </div>
                                            </div>
                                     
                                    <div class="row myrow">
                                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                                    <label>Agreements of Easements </label>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                                    <input type="text" id="txtstatease" class="form-control txtboxsize" placeholder="Agreements of Easements" title="Agreements of easements" />
                                                </div>
                                            </div>

                                     <div class="row myrow">
                                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                                    <label>Water Taxes paid </label>
                                                </div>
                                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                                     <asp:TextBox ID="txtstatwater" runat="server" class="form-control txtboxsize"  placeholder="Enter the Water Taxes paid" onkeypress='return isNumberKey(event)' onblur="formatNumber(this.id)"></asp:TextBox>
                                                </div>
                                            </div>
                                  <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <input type="button" id="Btnstatsave" runat="server" value="Save" class="btn btn-primary" onclick="fnsavestatutory(); return false" />
                                            <input type="button" id="Btnstatreset" runat="server" value="Reset" class="btn btn-primary" onclick="fnresetstatutory();" />
                                        </div>
                                        <div class="col-lg-2">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
             <!--End of Statutory Details div-->         


           
            
            <!--Services Details Accordion-->      <%-- Added by Deepa   --%>
            <div class="row">
                <div class="accordionShoHide" id="Div3" runat="server">
                    <div class="panel panel-default">
                        <div class="panel-heading" id="Servicesheading">
                            <h4>
                                <a class="lnkServicesdetails" data-toggle="collapse" data-parent="#myAccordion" href="#divservicesdetailsBody" onclick="fncollapse(event); servicesdetailclick(); focusatelem('Servicesheading')">
                                    <i class="indicator glyphicon custom-chevron-right"></i>&nbsp;<span id="spnservicesdetailsHeader">Services</span>
                                </a>
                            </h4>
                        </div>
                         <div id="divservicesdetailsBody" class="panel-collapse collapse accordionmain">
                            <div class="panel-body">
                                <div id="divservicesdetailsContent" class="jumbotron  accordion-body11" style="padding-top: 10px;">
                                    <%--<div class="row myrow">
                                       <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12 divmiddle">                                            
                                        </div>                                        
                                    </div>--%>
                                    <br /> 
                                         <%-- Water Supply arrangements/openwell --%>                         
                                       <div class="row myrow1">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                             <asp:Label runat="server" ID="lblwatersupplyarrang">Water Supply Arrangements (In Rupees)&nbsp;           
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                             <asp:TextBox  servicestextvalue="WaterSupplyArrangements" ID="txtwatersupplyarrang" onclick="Servicestxtboxenabled(this)"  onchange="calctxtvalservices(this)"  onkeypress="return isNumberKey(event)" runat="server" CssClass="form-control servicestextbox servicestotalval" >
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblopenwell">Open Well (In Rupees)&nbsp;              
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                             <asp:TextBox   servicestextvalue="OpenWell" ID="txtopenwell" onclick="Servicestxtboxenabled(this)"  onchange="calctxtvalservices(this)" onkeypress="return isNumberKey(event)" runat="server" CssClass="form-control servicestextbox servicestotalval">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <%-- Deep Bore/Hand pump --%> 
                                     <div class="row myrow1">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                             <asp:Label runat="server" ID="lbldeepbore">Deep Bore (In Rupees)&nbsp;           
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                             <asp:TextBox   servicestextvalue="DeepBore" ID="txtdeepbore" onclick="Servicestxtboxenabled(this)"  onchange="calctxtvalservices(this)"  onkeypress="return isNumberKey(event)" runat="server" CssClass="form-control servicestextbox servicestotalval">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblhandpump">Hand Pump (In Rupees)&nbsp;              
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                             <asp:TextBox    servicestextvalue="HandPump" ID="txthandpump" onclick="Servicestxtboxenabled(this)"  onchange="calctxtvalservices(this)"  onkeypress="return isNumberKey(event)" runat="server" CssClass="form-control servicestextbox servicestotalval">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <%--Motor/Corporation Tap --%> 
                                    <div class="row myrow1">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                             <asp:Label runat="server" ID="lblmotor">Motor (In Rupees)&nbsp;           
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                             <asp:TextBox   ID="txtmotor"  servicestextvalue="Motor" onclick="Servicestxtboxenabled(this)"  onchange="calctxtvalservices(this)"  onkeypress="return isNumberKey(event)" runat="server" CssClass="form-control servicestextbox servicestotalval">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblcorpotap">Corporation Tap (In Rupees)&nbsp;              
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                             <asp:TextBox   ID="txtcorpotap"  servicestextvalue="CorporationTap" onclick="Servicestxtboxenabled(this)"  onchange="calctxtvalservices(this)"  onkeypress="return isNumberKey(event)" runat="server" CssClass="form-control servicestextbox servicestotalval">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                     <%--Underground level sump/Overhead water tank --%>
                                    <div class="row myrow1">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                             <asp:Label runat="server" ID="lblundergnd">Underground Level Sump (In Rupees)&nbsp;           
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                             <asp:TextBox   ID="txtundergnd"  servicestextvalue="UndergroundLevelsump"  onclick="Servicestxtboxenabled(this)"  onchange="calctxtvalservices(this)"  onkeypress="return isNumberKey(event)" runat="server" CssClass="form-control servicestextbox servicestotalval">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lbloverheadtank">Overhead Water Tank (In Rupees)&nbsp;              
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                             <asp:TextBox   ID="txtoverheadtank"  servicestextvalue="OverheadWaterTank" onclick="Servicestxtboxenabled(this)"  onchange="calctxtvalservices(this)"  onkeypress="return isNumberKey(event)" runat="server" CssClass="form-control servicestextbox servicestotalval">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                     <%--Drainage arrangements/Septic Tank --%>
                                    <div class="row myrow1">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                             <asp:Label runat="server" ID="lbldrainagearrang">Drainage Arrangements (In Rupees)&nbsp;           
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                             <asp:TextBox   ID="txtdrainagearrang"  servicestextvalue="DrainageArrangements" onclick="Servicestxtboxenabled(this)"  onchange="calctxtvalservices(this)" onkeypress="return isNumberKey(event)" runat="server" CssClass="form-control servicestextbox servicestotalval">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblseptictank">Septic Tank (In Rupees)&nbsp;              
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                             <asp:TextBox   ID="txtseptictank"  servicestextvalue="SepticTank"  onclick="Servicestxtboxenabled(this)"  onchange="calctxtvalservices(this)"  onkeypress="return isNumberKey(event)" runat="server" CssClass="form-control servicestextbox servicestotalval">
                                            </asp:TextBox>
                                        </div>
                                    </div>                                
                                     <%--Underground sewerage/Compound Wall --%>
                                    <div class="row myrow1">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                             <asp:Label runat="server" ID="lblundergndsew">Underground Sewerage (In Rupees)&nbsp;           
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                             <asp:TextBox   ID="txtundergndsew"  servicestextvalue="UndergroundSewerage"  onclick="Servicestxtboxenabled(this)"  onchange="calctxtvalservices(this)" onkeypress="return isNumberKey(event)" runat="server" CssClass="form-control servicestextbox servicestotalval">
                                            </asp:TextBox>
                                        </div>
                                        <div id="compoundwallvalue" class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                           <label for="lblcompundwall1">Compound Wall:&nbsp; </label>
                                                                      <span><input     class="servicestextbox" servicestextvalue="CompoundwallRMvalue" name="test" style="width: 11%;"  onkeypress="return isNumberKey(event)"  id="txtrmvalueCW" onclick="Servicestxtboxenabled(this)"  onkeyup="calcvalservices('compoundwallvalue');" <%--onkeypress='return isNumberKey(event)'--%>  type="text" /></span>    
                                            <label for="lblcompundwall2">Rm. @ Rs.</label>
                                                                      <span><input    class="servicestextbox"  servicestextvalue="CompoundwallRSvalue"  name="test2" style="width: 11%;"   onkeypress="return isNumberKey(event)"  id="txtrmvalueCW2" onclick="Servicestxtboxenabled(this)" onkeyup="calcvalservices('compoundwallvalue');" <%--onkeypress='return isNumberKey(event)'  --%>type="text" /></span>
                                             <label for="lblcompundwall3">/m2. :</label> 
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                            <asp:TextBox    servicestextvalue="CompoundWallInRupees" ID="txtcompundwall" onclick="Servicestxtboxenabled(this)"  onchange="calctxtvalservices(this)" onkeypress="return isNumberKey(event)" runat="server" CssClass="form-control servicestextbox servicestotalval">
                                            </asp:TextBox>
                                        </div>
                                    </div>                                                                   
                                      <%--Height/Length --%>
                                    <div class="row myrow1">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                             <asp:Label runat="server" ID="lblheight">Height (In Rupees)&nbsp;           
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                             <asp:TextBox    servicestextvalue="Height"  ID="txtheight" onclick="Servicestxtboxenabled(this)"  onchange="calctxtvalservices(this)"  onkeypress="return isNumberKey(event)" runat="server" CssClass="form-control servicestextbox servicestotalval">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lbllength">Length (In Rupees)&nbsp;              
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                             <asp:TextBox    servicestextvalue="Length" ID="txtlength" onclick="Servicestxtboxenabled(this)" onkeypress="return isNumberKey(event)"  onchange="calctxtvalservices(this)" runat="server" CssClass="form-control servicestextbox servicestotalval">
                                            </asp:TextBox>
                                        </div>
                                    </div> 
                                  <%--Type of construction/Pavements --%>
                                    <div class="row myrow1">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                             <asp:Label runat="server" ID="lbltypeofconstruction">Type of Construction (In Rupees)&nbsp;           
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                             <asp:TextBox    servicestextvalue="TypeOfConstruct" ID="txttypeofconstruction" onclick="Servicestxtboxenabled(this)"  onchange="calctxtvalservices(this)" onkeypress="return isNumberKey(event)" runat="server" CssClass="form-control servicestextbox servicestotalval">
                                            </asp:TextBox>
                                        </div>
                                        <div id="Pavementsvalue" class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                           <label for="lblpavements1">Pavements (In Rupees)&nbsp;</label>
                                                                      <span><input name="test"   class="servicestextbox"  servicestextvalue="PavementsRMvalue" onkeypress="return isNumberKey(event)" style="width: 11%;" id="txtpavements1" onkeyup="calcvalservices('Pavementsvalue');"  type="text" /></span>    
                                            <label for="lblpavements2">Rm. @ Rs.</label>
                                                                      <span><input name="test2"  class="servicestextbox"   servicestextvalue="PavementsRSvalue" onkeypress="return isNumberKey(event)" style="width: 11%;" id="txtpavements2" onkeyup="calcvalservices('Pavementsvalue');"    type="text" /></span>
                                             <label for="lblpavements2">/m2. :</label>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                             <asp:TextBox   ID="txtpavements"  servicestextvalue="PavementsMain" onclick="Servicestxtboxenabled(this)"  onchange="calctxtvalservices(this)" onkeypress="return isNumberKey(event)" runat="server" CssClass="form-control servicestextbox servicestotalval">
                                            </asp:TextBox>
                                        </div>
                                    </div> 
                                     <%--Steel gate/E.B Deposits --%>
                                    <div id="Steelgatevalue" class="row myrow1">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                             <label for="lblsteelgate1">Steel Gate</label>
                                                                      <span><input name="test" class="servicestextbox" servicestextvalue="SteelGateRMvalue"   onkeypress="return isNumberKey(event)" style="width: 11%;" id="txtsteelgate1" onkeyup="calcvalservices('Steelgatevalue');"     type="text" /></span>    
                                            <label for="lblsteelgate2">Rm. @ Rs.</label>
                                                                      <span><input name="test2" class="servicestextbox" servicestextvalue="SteelGateRSvalue"   onkeypress="return isNumberKey(event)" style="width: 11%;" id="txtsteelgate2" onkeyup="calcvalservices('Steelgatevalue');"   type="text" /></span>
                                             <label for="lblsteelgate3">/m2. :</label>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                             <asp:TextBox   ID="txtsteelgate"    servicestextvalue="SteelGateMain"   onkeypress="return isNumberKey(event)" onchange="calctxtvalservices(this)"  runat="server" CssClass="form-control servicestextbox servicestotalval">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                          <asp:Label runat="server" ID="lblebdeposits">E.B Deposits, Water Deposits, Drainage Deposits etc                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                            <asp:TextBox ID="txtebdeposits"     servicestextvalue="EBWaterDrainageDeposits"   onkeypress="return isNumberKey(event)" onchange="calctxtvalservices(this)"  runat="server" CssClass="form-control servicestextbox servicestotalval">
                                            </asp:TextBox>
                                        </div>
                                    </div> 
                                     <%--Electrical fittings/E.B Deposits --%>
                                     <div class="row myrow1">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                             <asp:Label runat="server" ID="lblelecfitting">Electrical Fittings & Others (In Rupees)&nbsp;           
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                             <asp:TextBox ID="txtelecfitting"    servicestextvalue="ElectricalFittings" onclick="Servicestxtboxenabled(this)"  onchange="calctxtvalservices(this)"  onkeypress="return isNumberKey(event)"    runat="server" CssClass="form-control servicestextbox servicestotalval">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                             <asp:Label runat="server" ID="lblwiring">Type of Wiring                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                             <asp:TextBox ID="txtwiring" onclick="Servicestxtboxenabled(this)"   servicestextvalue="TypeofWiring" onchange="calctxtvalservices(this)" onkeypress="return isNumberKey(event)" runat="server" CssClass="form-control servicestextbox servicestotalval">
                                            </asp:TextBox>
                                        </div>
                                    </div> 
                                   
                                    <%--Class of fittings/Number of light Points --%>
                                    <div class="row myrow1">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                             <asp:Label runat="server" ID="lblclassfitting">Class of Fittings           
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-3 col-md-2 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:RadioButton ID="rbsuperior" GroupName="rdnsuperior" onclick="Servicestxtboxenabled(this)"  onkeypress="return isNumberKey(event)"  runat="server" value="Superior" Text="Superior" Checked="true" />
                                       
                                            <asp:RadioButton ID="rbordinary" GroupName="rdnsuperior" onclick="Servicestxtboxenabled(this)"  onkeypress="return isNumberKey(event)"  runat="server" value="Ordinary" Text="Ordinary" />
                                        
                                            <asp:RadioButton ID="rbpoor" GroupName="rdnsuperior" onclick="Servicestxtboxenabled(this)"  onkeypress="return isNumberKey(event)"  runat="server" value="Poor" Text="Poor"/>
                                        </div> 
                                        <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                             <asp:Label runat="server" ID="lbllightpts">Number of Light Points (In Rupees)                
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                            <asp:TextBox ID="txtlightpts"    servicestextvalue="NoofLightPTS"  onclick="Servicestxtboxenabled(this)" onchange="calctxtvalservices(this)" onkeypress="return isNumberKey(event)"  runat="server" CssClass="form-control servicestextbox servicestotalval">
                                            </asp:TextBox>
                                        </div>
                                    </div> 
                                   
                                    
                                     <%--Fan Points/Spare Plug Points --%>
                                    <div class="row myrow1">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                              <asp:Label runat="server" ID="lblfanpts">Fan Points                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                             <asp:TextBox ID="txtfanpts"    servicestextvalue="FanPTS" onclick="Servicestxtboxenabled(this)" onchange="calctxtvalservices(this)" onkeypress="return isNumberKey(event)"  runat="server" CssClass="form-control servicestextbox servicestotalval">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblspareplug">Spare Plug Points                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                             <asp:TextBox ID="txtspareplug"    servicestextvalue="SparePlugPTS"  onclick="Servicestxtboxenabled(this)" onchange="calctxtvalservices(this)" onkeypress="return isNumberKey(event)" runat="server" CssClass="form-control servicestextbox servicestotalval">
                                            </asp:TextBox>
                                        </div>
                                    </div> 
                                   
                                     
                                    <%--Any other item/Plumbing installation --%>
                                    <div class="row myrow1">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblotheritem">Any Other Item                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                             <asp:TextBox ID="txtotheritem"    servicestextvalue="AnyOtherItem"  onclick="Servicestxtboxenabled(this)" onchange="calctxtvalservices(this)" onkeypress="return isNumberKey(event)" runat="server" CssClass="form-control servicestextbox servicestotalval">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblplumbing">Plumbing Installation                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                             <asp:TextBox ID="txtplumbing"    servicestextvalue="PlumbingInstallation"  onclick="Servicestxtboxenabled(this)" onchange="calctxtvalservices(this)" onkeypress="return isNumberKey(event)" runat="server" CssClass="form-control servicestextbox servicestotalval">
                                            </asp:TextBox>
                                        </div>
                                    </div> 

                                    
                                     <%-- water closets/wash basins --%>
                                     <div class="row myrow1">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblclosets">No. of Water Closets and their Type                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                             <asp:TextBox ID="txtclosets"    servicestextvalue="NoofWaterClosets"  onclick="Servicestxtboxenabled(this)" onchange="calctxtvalservices(this)"  onkeypress="return isNumberKey(event)" runat="server" CssClass="form-control servicestextbox servicestotalval">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblwashbasins">No.of Wash Basins                
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                             <asp:TextBox ID="txtwashbasins"    servicestextvalue="WashBasins" onclick="Servicestxtboxenabled(this)" onchange="calctxtvalservices(this)"  onkeypress="return isNumberKey(event)" runat="server" CssClass="form-control servicestextbox servicestotalval">
                                            </asp:TextBox>
                                        </div>
                                    </div> 
                                     
                                     <%-- Bath Tubs/Water meter --%>
                                    <div class="row myrow1">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                             <asp:Label runat="server" ID="lblbathtubs">No.of Bath Tubs                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                            <asp:TextBox ID="txtbathtubs"    servicestextvalue="BathTubs"  onclick="Servicestxtboxenabled(this)" onchange="calctxtvalservices(this)"  onkeypress="return isNumberKey(event)" runat="server" CssClass="form-control servicestextbox servicestotalval">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                             <asp:Label runat="server" ID="lblwatermetertaps">Water Meter, Taps etc                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                             <asp:TextBox ID="txtwatermetertaps"    servicestextvalue="WaterMeter" onclick="Servicestxtboxenabled(this)" onchange="calctxtvalservices(this)"  onkeypress="return isNumberKey(event)" runat="server" CssClass="form-control servicestextbox servicestotalval">
                                            </asp:TextBox>
                                        </div>
                                    </div> 
                                    
                                      <%-- fixtures/Any other --%>'
                                    <div class="row myrow1">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblotherfixtures">Any Other Fixtures                
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                             <asp:TextBox ID="txtotherfixtures"    servicestextvalue="AnyOtherFixtures" onclick="Servicestxtboxenabled(this)" onchange="calctxtvalservices(this)"  onkeypress="return isNumberKey(event)" runat="server" CssClass="form-control servicestextbox servicestotalval">
                                            </asp:TextBox>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                             <asp:Label runat="server" ID="lblanyother">Any Other                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                             <asp:TextBox ID="txtanyother"    servicestextvalue="AnyOther"  onchange="calctxtvalservices(this)"   onkeypress="return isNumberKey(event)" runat="server" CssClass="form-control servicestextbox servicestotalval">
                                            </asp:TextBox>
                                        </div>
                                    </div> 
                                    
                                    <%-- Total --%>
                                    <div class="row myrow1">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" style="font-size:larger" ID="lbltotal">TOTAL                
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                            <asp:TextBox ID="txttotal" servicestextvalue="Total" onkeypress='return isNumberKey(event)'  runat="server" CssClass="form-control servicestextbox">
                                            </asp:TextBox>
                                        </div>                                        
                                    </div> 

                                    <br />
                                    <br />
                                                                 
                                     <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <input type="button" id="saveservices" runat="server" value="Save" class="btn btn-primary" onclick="fnsaveservicesdetails(); " />
                                            <input type="button" id="resetservices" runat="server" value="Reset" class="btn btn-primary" onclick="resetservicesdetails();" />
                                        </div>
                                        <div class="col-lg-2">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--End of Services details accordion-->

            


              <!--Valuation-General details Accordion-->
            <div class="row">
                <div class="accordionShoHide" id="Div2" runat="server">
                    <div class="panel panel-default">
                        <div class="panel-heading" id="valgenheading">
                            <h4>
                                <a class="lnkValGendetails" data-toggle="collapse" data-parent="#myAccordion" href="#divvalgenBody" onclick="fncollapse(event); valgenclick(); focusatelem('valgenheading')">
                                    <i class="indicator glyphicon custom-chevron-right"></i>&nbsp;<span id="spnvalgenHeader">Valuation-General</span>
                                </a>
                            </h4>
                        </div>
                        <div id="divvalgenBody" class="panel-collapse collapse accordionmain">
                            <div class="panel-body">
                                <div id="divvalgenContent" class="jumbotron  accordion-body11">
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="lblmarketinfo" runat="server">How is Marketability&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                            <textarea id="txtmarketinfo" class="txtareasize" rows="3" cols="30" name="description">
                                             </textarea>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblpremarrate">Prevailing Market Rate                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtpremarrate" runat="server"  placeholder="Prevailing Market Rate" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblsoupremarrate">Sources of Information for Prevailing Market Rate                
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtsoupremarrate" runat="server" placeholder="Sources of Prevailing Market Rate" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                     <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblunitrate">Unit Rate Adopted Now                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtunitrate" runat="server" placeholder="Unit Rate" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblpmr">Value of the Land Adopting PMR
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtpmr" runat="server"  placeholder="Value of the Land Adopting PMR" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblregoffice">Guideline Rate as Obtained from the Registrar's Office
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtregoffice" runat="server" placeholder="Guideline Rate" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblglr">Value of the Land by Adopting GLR                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtglr" runat="server" placeholder="Value of the Land Adopting GLR" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblpresentval">Present Depreciated Value
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtpresentval" runat="server" placeholder="Depreciated Value" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblrates">Basis of Adapted Rates                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtrates" runat="server"  placeholder="Basis of Adapted Rates" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lbldeptrates">Adapted Rates Related to IT Dept Rates
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtdeptrates" runat="server" placeholder="Adapted Rates Related to IT Dept Rates" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblregrates">Adapted Rates Commensurating with Registrar Rates, if N, Provide Reasons
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtregrates" runat="server" placeholder="Adapted Rates Commensurating" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblbuildins">Whether the Building is Insured
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtbuildins" runat="server" placeholder="Building is Insured?" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblsaleval">Forced Sale Value                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtsaleval" runat="server" placeholder="Forced Sale Value" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblsourcesaleval">Source of Information for Arriving the Forced Sales Value               
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtsourcesaleval" runat="server" placeholder="Arriving the Forced Sales Value" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblproreason">Is Present Valuation Higher than the Previous Valuation. If Y, Provide Reason               
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtproreason" runat="server" placeholder="Provide Reason" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblnotesapp">Additional Notes on Approval                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <textarea id="txtnotesapp" class="txtareasize" rows="3" cols="30" placeholder="Additional Notes" name="description">                                                
                                             </textarea>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblpurland">Year of Acquisition/ Purchase of Land
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtpurland" runat="server" placeholder="Purchase of Land" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblpricepaid">Value/ Purchase Price Paid
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtpricepaid" runat="server" placeholder="Purchase Price Paid" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblpurbuild">Year of Construction of Super Structure/ Purchase of Building                
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtpurbuild" runat="server"  placeholder="Purchase of Building" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblcostconst">Cost of Construction / Purchase Price
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtcostconst" runat="server" placeholder="Purchase Price" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblimprov">Briefly Provide Nature of Addition / Improvements
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtimprov" runat="server" placeholder="Nature of Addition/Improvements" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lbltotcost">Total Cost for Additions  / Improvements Carried Out
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txttotcost" runat="server"   placeholder="Total Cost for Additions/Improvements" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblprestprop">Present Value of the Property                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtprestprop" runat="server" placeholder="Present Value of the Property" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow1">
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <asp:Label ID="lblbuildest" runat="server" Font-Bold="true">Life of Building Estimated Details can be Filled Below&nbsp;</asp:Label>
                                        </div>
                                    </div>
                                    <br />
                                        <div class="container">
                                            <div class="table-responsive">
                                                <table class="table-bordered" id="tblbuildest">
                                                    <thead>
                                                        <tr style="background-color: #2E6DA4; color: #FFFFFF;">
                                                           <%-- <th style="text-align: center; padding: 5px;">Delete</th>--%>
                                                            <th style="text-align: center">Floor Number</th>
                                                            <th style="text-align: center">Life Of Building</th>
                                                            <th style="text-align: center; padding: 6px;">Age</th>
                                                            <th style="text-align: center; padding: 6px;">Rate Depreciation</th>
                                                            <th style="text-align: center; padding: 6px;">Amount Depreciation</th>
                                                            <th style="text-align: center; padding: 6px;">Replacement Desc</th>
                                                            <th style="text-align: center; padding: 6px;">Replacement Total Area</th>
                                                            <th style="text-align: center; padding: 6px;">Rep Est Rate Per SqFt</th>
                                                            <th style="text-align: center; padding: 6px;">Rep Estimated Value</th>
                                                        </tr>
                                                    </thead>
                                                  <tbody>
                                                        <tr>
                                                            <%--<td align="center">
                                                                <input type="checkbox" />
                                                            </td>--%>
                                                            <td style="text-align: center">
                                                                <asp:TextBox ID="txtflrnum" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                            </td>
                                                             <td style="text-align: center">
                                                                <asp:TextBox ID="txtlifebuild" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                            </td>
                                                            <td style="text-align: center">
                                                                <asp:TextBox ID="txtage" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                            </td>
                                                            <td style="text-align: center">
                                                                <asp:TextBox ID="txtratedep" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                            </td>
                                                            <td style="text-align: center">
                                                                <asp:TextBox ID="txtamtdep" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                            </td>
                                                            <td style="text-align: center">
                                                                <asp:TextBox ID="txtrepdesc" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                            </td>
                                                            <td style="text-align: center">
                                                                <asp:TextBox ID="txttotarea" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                            </td>
                                                            <td style="text-align: center">
                                                                <asp:TextBox ID="txtestsqft" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                            </td>
                                                            <td style="text-align: center">
                                                                <asp:TextBox ID="txtestval" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                            </td>
                                                             <td>
                                                                <button type="button" id="btnlifebuildaddrow" runat="server" class="btn-link" style="color: #0066CC" onclick="fnlifebuildaddrow('tblbuildest');">
                                                                    <span class="glyphicon glyphicon-plus-sign" title="AddRow"></span>
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button type="button" id="btnlifebuildremoverow" runat="server" class="btn-link">
                                                                    <span class="glyphicon glyphicon-trash"  title="Delete"></span>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                   <%-- <tfoot>
                                                        <tr>
                                                            <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                                                            <td>
                                                                <button type="button" id="btnlifebuildaddrow" runat="server" class="btn-link" style="color: #0066CC" onclick="fnlifebuildaddrow('tblbuildest');">
                                                                    <span class="glyphicon glyphicon-plus-sign">&nbsp;AddRow</span>
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button type="button" id="btnlifebuildremoverow" runat="server" class="btn-link" onclick="fnlifebuildremoverow()">
                                                                    <span class="glyphicon glyphicon-trash">&nbsp;RemoveRow</span>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </tfoot>--%>
                                                </table>
                                            </div>
                                        </div>
                                    <br />

                                    <div class="row myrow1">
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <asp:Label ID="Label48" runat="server" Font-Bold="true">Floor Wise Specification Details Can be Filled Below&nbsp;</asp:Label>
                                        </div>
                                    </div>
                                    <br />
                                        <div class="container">
                                            <div class="table-responsive">
                                                <table class="table-bordered" id="tblportrooms">
                                                    <thead>
                                                        <tr style="background-color: #2E6DA4; color: #FFFFFF;">
                                                           <%-- <th style="text-align: center; padding: 5px;">Delete</th>--%>
                                                            <th style="text-align: center">Floor Number</th>
                                                            <th style="text-align: center">Specification Name</th>
                                                            <th style="text-align: center; padding: 6px;">Specification Value</th>
                                                        </tr>
                                                    </thead>
                                                  <tbody>
                                                        <tr>
                                                          <%--  <td align="center">
                                                                <input type="checkbox" />
                                                            </td>--%>
                                                            <td style="text-align: center">
                                                                <asp:TextBox ID="txtportroomsflnum" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                            </td>
                                                             <td>
                                                                 <%--<select class="form-control" id="ddlclassification" onchange="fnddloption()" style="width: 100%">--%>
                                                                 <select class="form-control" id="ddlclassification" style="width: 100%">
                                                                     <option selected="" disabled="" value="Select">Select</option>
                                                                     <option value="ClassificationRooms">ClassificationRooms</option>
                                                                     <option value="Foundation">Foundation</option>
                                                                     <option value="SuperStructure">SuperStructure</option>
                                                                     <option value="Roof">Roof</option>
                                                                     <option value="Flooring">Flooring</option>
                                                                     <option value="Joineries">Joineries</option>
                                                                     <option value="Wiring">Wiring</option>
                                                                     <option value="Doors">Doors</option>
                                                                     <option value="Windows">Windows</option>
                                                                     <option value="WeatheringCourse">WeatheringCourse</option>
                                                                     <option value="WeatheringCourse">Others</option>
                                                                 </select>
                                                            </td>
                                                            <td style="text-align: center">
                                                                <asp:TextBox ID="txtportroomspeval" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                            </td>
                                                            <td>
                                                                <button type="button" id="btnportroomadd" runat="server" class="btn-link" style="color: #0066CC" onclick="fnportroomaddrow('tblportrooms'); fnremoveddlvalue(); ">
                                                                    <span class="glyphicon glyphicon-plus-sign" title="AddRow"></span>
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button type="button" id="btnportroomremove" runat="server" class="btn-link">
                                                                    <span class="glyphicon glyphicon-trash" title="Delete"></span>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                    <%--<tfoot>
                                                        <tr>
                                                            <td></td><td></td>
                                                            <td>
                                                                <button type="button" id="btnportroomadd" runat="server" class="btn-link" style="color: #0066CC" onclick="fnportroomaddrow('tblportrooms'); fnremoveddlvalue(); ">
                                                                    <span class="glyphicon glyphicon-plus-sign">&nbsp;AddRow</span>
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button type="button" id="btnportroomremove" runat="server" class="btn-link" onclick="fnportroomsremoverow()">
                                                                    <span class="glyphicon glyphicon-trash">&nbsp;RemoveRow</span>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </tfoot>--%>
                                                </table>
                                            </div>
                                        </div>
                                    <br />

                                     <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblsalval">Salvage Value
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtsalval" runat="server" placeholder="Salvage Value" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblref1">Reference 1             
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <textarea id="txtref1" class="txtareasize" rows="3" cols="30"  placeholder="Reference 1" name="description">                                                
                                             </textarea>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblref2">Reference 2                 
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <textarea id="txtref2" class="txtareasize"  rows="3" cols="30" placeholder="Reference 2" name="description">                                                
                                             </textarea>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label runat="server" ID="lblassedbuild">Assessed Value of the Building                
                                            </asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1 txtboxmargin">
                                            <span class=" "></span>
                                            <asp:TextBox ID="txtassedbuild" runat="server" placeholder="Assessed Value" CssClass="form-control txtboxsize">
                                            </asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <input type="button" id="btnvalgensave" value="Save" runat="server" class="btn btn-primary" onclick="fnsavevalgen()" />
                                            <input type="button" id="btnvalgenreset" value="Reset" runat="server" class="btn btn-primary" onclick="resetvalgen()" />
                                        </div>
                                        <div class="col-lg-2">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- End of Valuation-General Accordion-->

            
   <!--Start of SummaryDetails div-->
            <div class="row">
                <div class="accordionShoHide" id="DivSummarydetailsaccordion" runat="server">
                    <div class="panel panel-default">
                        <div class="panel-heading" id="sumheading">
                            <h4 id="hdsummary">
                                <a id="lnkSummarydetails" class="accordion-toggle" data-toggle="collapse" data-parent="#myAccordion" href="#divSummarydetails" onclick="fncollapse(event);  summarydetailclick(); focusatelem('sumheading'); ">
                                    <i class="indicator glyphicon custom-chevron-right"></i>&nbsp;<span id="spnSummarydetailsHeader">Valuation Summary</span>
                                </a>
                            </h4>
                        </div>
                        <div id="divSummarydetails" class="panel-collapse collapse accordionmain">
                            <div class="panel-body">
                                <div id="divSummarydetailsContent" class="jumbotron accordion-body11" style="padding-top: 10px;">
                                    <div class="row myrow1">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="lblestimate" runat="server">Estimated Rate per Sq. Ft. (In Rupees)&nbsp;</asp:Label>
                                            <span class="asterisk_input1"></span>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                            <span class=""></span>
                                            <asp:TextBox ID="txtestimate" runat="server" placeholder="Estimated Rate" style="width:109%" class="form-control esimatedtxtbox" onkeypress='return isNumberKey(event)' onblur="formatNumber(this.id); fnsetEstValue()"></asp:TextBox>
                                        </div>
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="Label8" runat="server">Estimated Value (In Rupees)&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-2 col-md-3 col-sm-12 col-xs-12">
                                            <asp:TextBox ID="txtesttotval" runat="server"  placeholder="Estimated Value" style="width:109%" class="form-control   esimatedtxtbox disabled" disabled="disabled"></asp:TextBox>
                                        </div>
                                    </div>
                                    <div class="row myrow1" style="display: none">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="lblestmarket" runat="server">Estimated Market Value&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:TextBox ID="txtestmarket" runat="server" placeholder="Estimated Market Value" style="width:109%" class="form-control" onblur="formatNumber(this.id); "></asp:TextBox>
                                        </div>
                                        <div class="col-lg-4">
                                        </div>
                                    </div>

                                    <div class="row myrow">

                                        <div class="col-lg-4">
                                        </div>
                                    </div>

                                    <div class="row myrow1">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <label id="lblestpersqft">Guideline Value per Sq. Ft. (In Rupees)</label>
                                            <span class="asterisk_input1"></span>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                            <input type="text" id="txtguidpersqft"   style="width:109%" placeholder="Guideline Value per Sq. Ft."class="form-control" onkeypress='return isNumberKey(event)' readonly="readonly" />
                                        </div>
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="lblguide" runat="server" readonly="readonly">Guideline Value (In Rupees)&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle1">
                                            <asp:TextBox ID="txtguide" runat="server" placeholder="Guideline Value" style="width:69%" class="form-control" onblur="formatNumber(this.id)" ReadOnly="true"></asp:TextBox>
                                        </div>
                                        
                                    </div>
                                    <%--Composite rate for a similar flat with same specifications in the adjoining locality--%>
                                    <div class="row myrow1">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="lblcompositelocality" runat="server" Font-Bold="true">Composite Rate for a similar Property with same Specifications in the Adjoining Locality&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-2 col-md-4 col-sm-12 col-xs-1">
                                            <asp:TextBox ID="txtcompositelocality" runat="server"  placeholder="Composite Rate" style="width:109%" class="form-control"></asp:TextBox>
                                        </div>
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="Label17" runat="server" Font-Bold="true">Method Of Valuation</asp:Label>
                                        </div>
                                        <div class="col-lg-3">
                                            <asp:DropDownList ID="ddlmethodofvaluation" runat="server" class="form-control" style="width:69%" onchange='calcval("ddlmethodofvaluation")'></asp:DropDownList>
                                        </div>
                                    </div>

                                    <%--New Construction - Adopted Basic Composite rate for a similar flat with same specifications in the adjoining locality--%>
                                    <div class="row myrow1">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="lblnewcompositelocality" runat="server" Font-Bold="true">New Construction - Adopted Basic Composite Rate for a similar Property with same Specifications in the Adjoining Locality&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                            <asp:TextBox ID="txtnewcompositelocality" runat="server"  placeholder="Adjoining Locality" class="form-control estimatetxtboxsize"></asp:TextBox>
                                        </div>
                                        <div class="col-lg-4"></div>
                                    </div>

                                    <%--Replacement cost of flat with services--%>
                                    <div class="row myrow1">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="lblreplacecost" runat="server" Font-Bold="true">Replacement Cost with Services&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                            <asp:TextBox ID="txtreplacecost" runat="server" placeholder="Replacement Cost with Services" class="form-control estimatetxtboxsize"></asp:TextBox>
                                        </div>
                                        <div class="col-lg-4"></div>
                                    </div>


                                    <%--Life of the building estimated--%>
                                    <div class="row myrow1">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="lblbuildinglife" runat="server" Font-Bold="true">Life of the Building Estimated&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                            <asp:TextBox ID="txtbuildinglife" runat="server"  placeholder="Life of the Building" class="form-control estimatetxtboxsize"></asp:TextBox>
                                        </div>
                                        <div class="col-lg-4"></div>
                                    </div>

                                    <%--Total Composite Rate--%>
                                    <div class="row myrow1">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="lbltotalcomposite" runat="server" Font-Bold="true">Total Composite Rate&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                            <asp:TextBox ID="txttotalcomposite" runat="server" placeholder="Total Composite Rate" class="form-control estimatetxtboxsize"></asp:TextBox>
                                        </div>
                                        <div class="col-lg-4"></div>
                                    </div>

                                    <br />
                                    <div class="row myrow1">
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <asp:Label ID="lblrecvalue" runat="server" Font-Bold="true"> Recommended Value&nbsp;</asp:Label>

                                        </div>
                                    </div>
                                    <div class="row myrow1">
                                        <div class="container-fluid">
                                            <div class="table-responsive">
                                                <table class="table-hover nowrap" id="tblpropval">
                                                    <thead>
                                                        <tr style="background-color: #2E6DA4; color: #FFFFFF;">
                                                            <%--<th style="text-align: center; padding: 5px;">Delete</th>--%>
                                                            <th style="text-align: center">Description</th>
                                                            <th style="text-align: center">Remark</th>
                                                            <th style="text-align: center">Measurement</th>
                                                            <th style="text-align: center">GLR</th>
                                                            <th style="text-align: center">PMR</th>
                                                            <th style="text-align: center">Total(GLR)</th>
                                                            <th style="text-align: center">Total(PMR)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <%--<td align="center">
                                                                <input type="checkbox" /></td>--%>
                                                            <td>
                                                                <asp:DropDownList ID="ddlpropTypeSum" runat="server" CssClass="form-control" onchange='calcval("tblpropval")'>
                                                                </asp:DropDownList>
                                                            </td>
                                                            <td>
                                                                <%--<asp:TextBox ID="txtRemark" CssClass="form-control" TextMode="multiline" Columns="50" Rows="1" runat="server" />--%>
                                                                <asp:TextBox ID="txtRemark" runat="server" CssClass="form-control"></asp:TextBox>
                                                            </td>
                                                            <td>
                                                                <asp:TextBox ID="txtMeasurement" runat="server" CssClass="form-control" onkeypress="return isNumberKey(event)" onkeyup="calcval('tblpropval')" Style="text-align: right"></asp:TextBox>
                                                            </td>
                                                            <td>
                                                                <asp:TextBox ID="txtsummarypmr" runat="server" CssClass="form-control" onkeypress="return isNumberKey(event)" onkeyup="calcval('tblpropval')" Style="text-align: right"></asp:TextBox>
                                                            </td>
                                                             <td>
                                                                <asp:TextBox ID="txtsummaryglr" runat="server" CssClass="form-control" onkeypress="return isNumberKey(event)" onkeyup="calcval('tblpropval')" Style="text-align: right"></asp:TextBox>
                                                            </td>
                                                            <td>
                                                                <asp:TextBox ID="txtTotalGLR" runat="server" CssClass="form-control" onkeypress="return isNumberKey(event)" onkeyup="calcval('tblpropval')" Style="text-align: right"></asp:TextBox>
                                                            </td>
                                                             <td>
                                                                <asp:TextBox ID="txtTotalPMR" runat="server" CssClass="form-control" onkeypress="return isNumberKey(event)" onkeyup="calcval('tblpropval')" Style="text-align: right"></asp:TextBox>
                                                            </td>
                                                            <td>
                                                                <button type="button" id="btnaddnewrow" runat="server" class="btn-link" style="color: #0066CC" onclick="fnaddrow('tblpropval'); fnDVremovedsummaryvalue();" onmouseover="this.style.color='#f49430'"
                                                                    onmouseout="this.style.color='#0066CC'">
                                                                    <span class="glyphicon glyphicon-plus-sign" title="AddRow"></span></button></td>
                                                            <td>
                                                                <button type="button" id="btnremrow" runat="server" class="btn-link" onclick="fnremoverow()" style="color: #0066CC" onmouseover="this.style.color='#f49430'"
                                                                    onmouseout="this.style.color='#0066CC'">
                                                                    <span class="glyphicon glyphicon-trash" title="Delete"></span></button></td>
                                                        </tr>

                                                    </tbody>
                                                    <tfoot>
                                                        <tr>
                                                            <td colspan="2"></td>
                                                            <td></td>
                                                            <%--<td colspan="1">
                                                                <button type="button" id="btnaddnewrow" runat="server" class="btn-link" style="color: #0066CC" onclick="fnaddrow('tblpropval'); fnDVremovedsummaryvalue();" onmouseover="this.style.color='#f49430'"
                                                                    onmouseout="this.style.color='#0066CC'">
                                                                    <span class="glyphicon glyphicon-plus-sign"></span> Add Row</button></td>
                                                            <td colspan="1">
                                                                <button type="button" id="btnremrow" runat="server" class="btn-link" onclick="fnremoverow()" style="color: #0066CC" onmouseover="this.style.color='#f49430'"
                                                                    onmouseout="this.style.color='#0066CC'">
                                                                    <span class="glyphicon glyphicon-trash"></span> Delete</button></td>--%>
                                                            <td colspan="2" style="text-align: right">
                                                                <asp:Label ID="Label4" runat="server">Total Value:&nbsp;</asp:Label>
                                                            </td>
                                                            <td colspan="1">
                                                                <input type="text" id="txtrecommendedvalue" runat="server" class="form-control" onblur="calcval('tblpropval')" style="text-align: right" placeholder="GLR Total" readonly="readonly" data-toggle="tooltip" data-placement="bottom" />
                                                                <asp:TextBox ID="txtTotalpropvalueglr" runat="server" CssClass="form-control" style="text-align: right; display: none"></asp:TextBox>
                                                            </td>
                                                            <td colspan="1">
                                                                <input type="text" id="txtrecommendedvaluepmr" runat="server" class="form-control" onblur="calcval('tblpropval')" style="text-align: right" placeholder="PMR Total" readonly="readonly" data-toggle="tooltip" data-placement="bottom" />
                                                                <asp:TextBox ID="txtTotalpropvaluepmr" runat="server" CssClass="form-control" style="text-align: right; display: none"></asp:TextBox>
                                                            </td>
                                                            
                                                        </tr>
                                                       <%-- <tr>
                                                             <td>
                                                                <button type="button" id="btnaddnewrow" runat="server" class="btn-link" style="color: #0066CC" onclick="fnaddrow('tblpropval'); fnDVremovedsummaryvalue();" onmouseover="this.style.color='#f49430'"
                                                                    onmouseout="this.style.color='#0066CC'">
                                                                    <span class="glyphicon glyphicon-plus-sign"></span></button></td>
                                                            <td>
                                                                <button type="button" id="btnremrow" runat="server" class="btn-link" onclick="fnremoverow()" style="color: #0066CC" onmouseover="this.style.color='#f49430'"
                                                                    onmouseout="this.style.color='#0066CC'">
                                                                    <span class="glyphicon glyphicon-trash"></span></button></td>
                                                           
                                                        </tr>--%>
                                                    </tfoot>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                   
                                    <br />
                                    <div class="row myrow1">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="lblfinalrec" runat="server" Font-Bold="true">Final Recommended Value&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                            <asp:TextBox ID="txtfinalrec"  placeholder="Final Recommended Value" runat="server" class="form-control estimatetxtboxsize" onkeypress="return isNumberKey(event)"></asp:TextBox>
                                        </div>
                                        <div class="col-lg-4"></div>
                                    </div>
                                    <div class="row myrow1" id="divmismatch">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="lblmismatchreason" runat="server" ToolTip="">If Values in Estimated Value and Total Recommended Value are Mismatched, Provide Reason&nbsp;</asp:Label>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <%--<asp:TextBox ID="txtrecommendedvalue" runat="server" CssClass="form-control" Style="text-align: right" onkeyup="formatNumber(this.value)"></asp:TextBox>--%>
                                            <input type="text" id="txtmismatchreason" runat="server" placeholder="Provide Reason" class="form-control estimatetxtboxsize" />
                                        </div>
                                        <div class="col-lg-2">
                                        </div>
                                    </div>
                                    <br />
                                    <div class="row myrow1">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="Label5" runat="server">Appraiser’s Recommendation&nbsp;</asp:Label>
                                            <span class="asterisk_input1"></span>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <span class=""></span>
                                            <asp:TextBox ID="txtrecommendation" runat="server" CssClass="form-control estimatetxtboxsize" placeholder="Appraiser’s Recommendation"></asp:TextBox>
                                        </div>
                                        <div class="col-lg-4">
                                        </div>
                                    </div>
                                     <div class="row myrow1">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="otherdetails" runat="server" Font-Bold="true">Any Other Details&nbsp;</asp:Label>
                                        </div>
                                          <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle1">
                                            <textarea id="sumotherdetails" class="estimatetxtareasize" rows="4" cols="46" placeholder="Other Details" name="otherdetails">
                                              </textarea>
                                        </div>
                                        <div class="col-lg-4"></div>
                                    </div>
                                    <br />
                                    <div id="divuploadpic" runat="server">
                                        <div class="row" id="divimages" style="display: none">
                                            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                                <asp:Label ID="Label3" runat="server">Property Images&nbsp;</asp:Label>
                                            </div>
                                            <div id="divimggrp" class="col-lg-6 col-md-6 col-sm-12 col-xs-12 divmiddle1">
                                                <div class="img-wrap" style="display: none">
                                                    <span class="close" style="color: red; font-weight: bolder" onclick="imgcloseclick(this)">&times;</span>
                                                    <img id="Image1" src="" onclick="window.open(this.src)" />
                                                </div>
                                                <div class="img-wrap" style="display: none">
                                                    <span class="close" style="color: red; font-weight: bolder" onclick="imgcloseclick(this)">&times;</span>
                                                    <img id="Image2" src="" onclick="window.open(this.src)" />
                                                </div>
                                                <div class="img-wrap" style="display: none">
                                                    <span class="close" style="color: red; font-weight: bolder" onclick="imgcloseclick(this)">&times;</span>
                                                    <img id="Image3" src="" onclick="window.open(this.src)" />
                                                </div>
                                                <div class="img-wrap" style="display: none">
                                                    <span class="close" style="color: red; font-weight: bolder" onclick="imgcloseclick(this)">&times;</span>
                                                    <img id="Image4" src="" onclick="window.open(this.src)" />
                                                </div>
                                                <div class="img-wrap" style="display: none">
                                                    <span class="close" style="color: red; font-weight: bolder" onclick="imgcloseclick(this)">&times;</span>
                                                    <img id="Image5" src="" onclick="window.open(this.src)" />
                                                </div>
                                            </div>
                                            <div class="col-lg-2">
                                            </div>
                                        </div>

                                        <%-- <div>
                                                <img id="mytestimage" alt="ImageTST" src />                                                
                                            </div>--%>
                                        <div class="row" id="divuploadpicappr" runat="server">
                                            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                                <asp:Label ID="lbluploadpics" runat="server">Upload Documents/ Pictures( Maximum 5 Uploads Allowed ) &nbsp;</asp:Label>
                                            </div>
                                            <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12 divmiddle1">
                                                <iframe id="Uploadframe" src="ImageUpload.aspx" height="100%" width="100%" style="overflow: hidden"></iframe>
                                            </div>
                                            <div class="col-lg-2">
                                            </div>
                                        </div>
                                    </div>
                                    <%--Invoice amount--%>
                                    <div class="row">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 divmiddle">
                                            <asp:Label ID="Label16" runat="server" Font-Bold="true">Invoice Amount&nbsp;</asp:Label>
                                            <%-- <span class="asterisk_input1"></span>--%>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                            <asp:TextBox ID="txtInvoiceAmt" runat="server" class="form-control estimatetxtboxsize" placeholder="Invoice Amount"></asp:TextBox>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12"></div>
                                    </div>

                                    <br />
                                    <div class="row myrow1">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <input type="button" id="btnSummarydetailSave" runat="server" value="Save" class="btn btn-primary" onclick="fnsaveSummary(); return false" />
                                            <input type="button" id="btnSummarydetailreset" runat="server" value="Reset" class="btn btn-primary" onclick="resetsummarydetails();" />
                                            <input type="button" id="btnappraisalcomplete" runat="server" value="Complete" class="btn btn-primary" disabled="disabled" onclick="appraisaldetailclick();" />
                                            <input type="button" id="btnsendEmail" runat="server" value="Send Email" class="btn btn-primary" onclick="Redirect2EmailPage();" />
                                            <input type="button" id="btnappraisalsubmit" runat="server" value="Submit" class="btn btn-primary" disabled="disabled" onclick="SubmitAppraisal();" />
                                            <input type="button" id="btnpreviewpdf" runat="server" value="Preview" class="btn btn-primary" disabled="disabled" onclick="fnPreviewclick();" />
                                            <%--<input type="button" id="Button1" runat="server" value="ProcessQueue" class="btn btn-primary"/>--%>
                                        </div>
                                        <div class="col-lg-2">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--End of SummaryDetails div-->

            <!--Start of Appraisalapproval div-->
            <div class="row">

                <div class="accordionShoHide" id="DivAppraisalapprovalaccordion" runat="server">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 id="hdAppraisalapproval">
                                <a id="lnkAppraisalapproval" class="accordion-toggle" data-toggle="collapse" data-parent="#myAccordion" href="#divAppraisalapproval" onclick="fncollapse(event); GetStatusChange('Chkall','Chkall'); GetAccptstatus(); focusatelem('hdAppraisalapproval')">
                                    <i class="indicator glyphicon custom-chevron-right"></i>&nbsp;<span id="spnAppraisalapprovalHeader">Approval</span>
                                </a>
                            </h4>
                        </div>
                        <div id="divAppraisalapproval" class="panel-collapse collapse accordionmain">
                            <div class="panel-body">
                                <div id="divAppraisalapprovalContent" class="jumbotron accordion-body11" style="padding-top: 10px;">
                                    <div class="container">
                                        <div class="table-responsive ">
                                            <table class="table-bordered" id="tblApprovaldet">
                                                <thead>
                                                    <tr style="background-color: #2E6DA4; color: #FFFFFF;">
                                                        <th style="text-align: center">User ID</th>
                                                        <th style="text-align: center">Appraiser ID</th>
                                                        <th style="text-align: center; padding: 6px;">Date Approved/ Rejected</th>
                                                        <th style="text-align: center; padding: 6px;">Remarks/ Rejection Reason</th>
                                                        <th style="text-align: center; padding: 6px; width: auto;">Approval Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtlenid" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtappid" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtappdate" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>
                                                        <td style="text-align: center">
                                                            <asp:TextBox ID="txtappreason" runat="server" CssClass="form-control" data-toggle="tooltip"></asp:TextBox>
                                                        </td>

                                                        <td style="text-align: center;">
                                                            <asp:DropDownList runat="server" ID="ddlappstatus" CssClass="form-control" data-toggle="tooltip" onchange="getPropValApproval()">
                                                                <asp:ListItem Text="Select" Value="select"></asp:ListItem>
                                                                <asp:ListItem Text="Approved" Value="Approved"></asp:ListItem>
                                                                <asp:ListItem Text="Rejected" Value="Rejected"></asp:ListItem>
                                                                <asp:ListItem Text="Approved By Approver" Value="Approved By Approver"></asp:ListItem>
                                                                <asp:ListItem Text="Rejected By Approver" Value="Rejected By Approver"></asp:ListItem>
                                                            </asp:DropDownList>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <select id="dummieselect" style="display: none">
                    <option></option>
                </select>
            </div>
            <input type="hidden" value="1" id="hdntotalarea" />
        </div>
        <%--</div>--%>
        <div class="col-lg-1" style="display: none">
            <button type="button" class="btn btn-sm btnsave"><span class="glyphicon glyphicon-backward" onclick="fnback()">&nbsp;Back</span></button>
        </div>
    </div>
    <asp:HiddenField runat="server" id="hdnEnc" ClientIDMode="Static" />
    <%--<input type='hidden' id='hdnEnc' runat="server" name='hdnEnc' />--%>

    <script type="text/javascript">
        $(function () {

            $('[data-toggle=tooltip]').tooltip();
            $('[rel=tooltip]').tooltip();
        });
    </script>
</asp:Content>

<%--    </form>
</body>
</html>--%>