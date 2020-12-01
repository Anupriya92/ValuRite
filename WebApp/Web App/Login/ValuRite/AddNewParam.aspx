<%@ Page Title="" Language="C#" MasterPageFile="~/PropertyApp.Master" AutoEventWireup="true" ClientIDMode="Static" CodeBehind="AddNewParam.aspx.cs" Inherits="Login.AddNewParam" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <title>Create Parameters</title>
    <link href="http://code.jquery.com/ui/1.10.4/themes/ui-lightness/jquery-ui.css" rel="stylesheet" />
    <link href="../includes/css/font-awe.css" rel="stylesheet" />
    <link href="../includes/css/dataTables.fontAwesome.css" rel="stylesheet" />

    <script src="../bootstrap/DataTables-1.10.10/media/js/jquery.dataTables.min.js"></script>
    <script src="../bootstrap/DataTables-1.10.10/media/js/jquery.dataTables.js"></script>
    <link href="../bootstrap/DataTables-1.10.10/media/css/dataTables.jqueryui.css" rel="stylesheet" />
    <link href="../bootstrap-3.3.6-dist/css/bootstrap-theme.css" rel="stylesheet" />
    <link href="../bootstrap/css/dataTables.tableTools.css" rel="stylesheet" />
    <link href="../bootstrap/css/editor.dataTables.min.css" rel="stylesheet" />
    <link href="../bootstrap/css/select.dataTables.min.css" rel="stylesheet" />
    <link href="../bootstrap/css/buttons.dataTables.min.css" rel="stylesheet" />
    <link href="../bootstrap/DataTables-1.10.10/media/css/dataTables.jqueryui.min.css" rel="stylesheet" />
    <link href="../bootstrap/DataTables-1.10.10/media/css/jquery.dataTables.css" rel="stylesheet" />
    <link href="http://code.jquery.com/ui/1.10.4/themes/ui-lightness/jquery-ui.css" rel="stylesheet" />



    <script src="../scripts/GenericForm.js"></script>

     <style> 

         .labeltxtassign {
            color: black;
            font-size: 20px;
            font-family: 'ProximaNova-Bold'
        }

     </style>

    <script type="text/javascript">

        var dataArr = [];
        var allData = [];
        var id = '';
        var selectedrowparamid = "";
        var selectedrowparamval = "";

        $(document).ready(function () {
            $('#modalloading').modal('show');
            $('#divaddparam').collapse('show');
            getparamdetails();
            //$('#paramedit').val('Edit');
            //$('#paramcancel').hide();
            $('#modalloading').modal('hide');
            $("#addRow").click(function () {
                $('#txtparamid').val('');
                $('#txtparaname').val('');
                $('#txtparamval').val('');
                $('#txtprntparam').val('');
                $("#paramtable").hide();
                $("#addparamdiv").show();
            });
        });
        fnSessionMangement(); //Added by Anupriya to call set interval function
        function clearval() {
            $('#paramddl').hide();
            $('#paramdelete').hide();
            $('#paramedit').show();
            $('#paramcancel').show();
            document.getElementById("txtparamid").disabled = false;
            document.getElementById("txtparaname").disabled = false;
            document.getElementById("txtparamval").disabled = false;
            document.getElementById("txtprntparam").disabled = false;
            $('#txtparamid').val('');
            $('#txtparaname').val('');
            $('#txtparamval').val('');
            $('#txtprntparam').val('');
            document.getElementById("paramadd").disabled = true;
        }

        //Creating New Param in Param table
        function Saveparam() {

            var id = checkidexists()//Check param id exists (returns -1 for new param id and 1 if it already exists)

            //checking for empty fields
            if ($('#txtparamid').val() == "" || $('#txtparaname').val() == "" ||
                $('#txtparamval').val() == "" || $('#txtprntparam').val() == "") {
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'small',
                        message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Fill the Fields...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                   // bootbox.alert("Fill the Fields");
                });
            } else if (id == '1') {
                //Param id Exists
                $(function () {
                    bootbox.dialog({
                        closeButton: false,
                        message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Param ID Already Exists!</p>',
                        buttons: {
                            success: {
                                label: "OK",
                                callback: function () {
                                    setTimeout(function () {
                                        $('#txtparamid').focus();
                                    }, 10);
                                    $("#txtparamid").val('');
                                }
                            }
                        }
                    });
                });
            }
            else if (id != '1') {
                //Creating a new Param
                var editval = "";
                if (document.getElementById("rdneditno").checked == true) {
                    editval = 'N';
                } else { editval = 'Y'; }
                var obj = {
                    ParamID: $('#txtparamid').val(),
                    ParamName: $('#txtparaname').val(),
                    ParamValue: $('#txtparamval').val(),
                    ParentParamID: $('#txtprntparam').val(),
                    Editable: editval,
                    Status: 'Active',
                    Update: "0",
                    UserAccess: $('#txtaccessto').val(),
                }
                var jsonobj = JSON.stringify(obj);
                fnparamsave(jsonobj);
            }
        }

        //Check param id exists
        function checkidexists() {
            var addparamid = $('#txtparamid').val()
            if (allData.indexOf(addparamid) > 0) {
                return 1;
            } else {
                return -1;
            }
        }

        //Update the Existing Param
        function updateparamdet() {
            if ($('#txteditparamid').val() == "" || $('#txteditparentpar').val() == "" || $('#txteditparamname').val() == "" || $('#txteditparamval').val() == "") {
                $(function () {
                    bootbox.dialog({
                        closeButton: true,
                        size: 'small',
                        message: '<p class="text-center mb-0"><i class="fa fa-exclamation-triangle	fa-lg"></i> Fill the Fields...</p>',
                    });
                    setTimeout(function () {
                        bootbox.hideAll();
                    }, 2500);
                  //  bootbox.alert("Fill the Fields");
                });
            }
            else {
                var editval = "";
                if (document.getElementById("rdneditparamn").checked == true) {
                    editval = 'N';
                } else { editval = 'Y'; }
                var obj = {
                    ParamID: $('#txteditparamid').val(),
                    ParamName: $('#txteditparamname').val(),
                    ParamValue: $('#txteditparamval').val(),
                    ParentParamID: $('#txteditparentpar').val(),
                    Editable: editval,
                    Status: $("#ddlparamstatus :selected").val(),
                    UserAccess: $("#txtupdtuseraccess").val(),
                    Update: "1"
                }
                var jsonobj = JSON.stringify(obj);
                //alert(jsonobj)
                fnparamsave(jsonobj);
            }
        }

        function canceladdparam() {
            fnaddparam();
        }


        function editablestatus() {
            //debugger         

            if ($('#txtparamid').val() != "" && $('#txtparaname').val() != "" && $('#txtparamval').val() != "" && $('#txtprntparam').val() != "") {
                if (document.getElementById("rdneditno").checked == true) {
                    //$('#paramedit').hide();
                    document.getElementById("txtparamid").disabled = true;
                    document.getElementById("txtparaname").disabled = true;
                    document.getElementById("txtparamval").disabled = true;
                    document.getElementById("txtprntparam").disabled = true;
                }
                else {
                    //$('#paramedit').show();
                    document.getElementById("txtparamid").disabled = false;
                    document.getElementById("txtparaname").disabled = false;
                    document.getElementById("txtparamval").disabled = false;
                    document.getElementById("txtprntparam").disabled = false;
                }
            }
            if ($('#txteditparamid').val() != "" && $('#txteditparamname').val() != "" && $('#txteditparamval').val() != "" && $('#txteditparentpar').val() != "") {
                if (document.getElementById("rdneditparamn").checked == true) {
                    document.getElementById("txteditparamid").disabled = true;
                    document.getElementById("txteditparentpar").disabled = true;
                    document.getElementById("txteditparamname").disabled = true;
                    document.getElementById("txteditparamval").disabled = true;
                    document.getElementById("ddlparamstatus").disabled = true;
                    document.getElementById("editparamdetail").disabled = true;
                }
                else {
                    document.getElementById("txteditparentpar").disabled = false;
                    document.getElementById("txteditparamname").disabled = false;
                    document.getElementById("txteditparamval").disabled = false;
                    document.getElementById("ddlparamstatus").disabled = false;
                    document.getElementById("editparamdetail").disabled = false;
                }
            }

        }

        function editablestatus1() {

            if ('<%=Session["UserRole"]%>' == "Admin") {
                if ($('#txtparamid').val() != "" && $('#txtparaname').val() != "" && $('#txtparamval').val() != "" && $('#txtprntparam').val() != "") {
                    if (document.getElementById("rdneditno").checked == true) {
                        //$('#paramedit').hide();
                        document.getElementById("txtparamid").disabled = true;
                        document.getElementById("txtparaname").disabled = true;
                        document.getElementById("txtparamval").disabled = true;
                        document.getElementById("txtprntparam").disabled = true;
                    }
                    else {
                        //$('#paramedit').show();
                        document.getElementById("txtparamid").disabled = false;
                        document.getElementById("txtparaname").disabled = false;
                        document.getElementById("txtparamval").disabled = false;
                        document.getElementById("txtprntparam").disabled = false;
                    }
                }
                if ($('#txteditparamid').val() != "" && $('#txteditparamname').val() != "" && $('#txteditparamval').val() != "" && $('#txteditparentpar').val() != "") {
                    if (document.getElementById("rdneditparamn").checked == true) {
                        document.getElementById("txteditparamid").disabled = true;
                        document.getElementById("txteditparentpar").disabled = true;
                        document.getElementById("txteditparamname").disabled = true;
                        document.getElementById("txteditparamval").disabled = true;
                        document.getElementById("ddlparamstatus").disabled = true;
                        document.getElementById("editparamdetail").disabled = false;
                    }
                    else {
                        document.getElementById("txteditparentpar").disabled = false;
                        document.getElementById("txteditparamname").disabled = false;
                        document.getElementById("txteditparamval").disabled = false;
                        document.getElementById("ddlparamstatus").disabled = false;
                        document.getElementById("editparamdetail").disabled = false;
                    }
                }

            }
        }


        function canceleditmodal() {
            $('#modaleditparamdetails').modal('hide');
        }

    </script>
    <style>
        .modal-header-primary {
            border-top-left-radius: 0px !important;
            border-top-right-radius: 0px !important;
        }

        /*table.dataTable thead th {
            position: relative;
            background-image: none !important;
        }

            table.dataTable thead th.sorting:after,
            table.dataTable thead th.sorting_asc:after,
            table.dataTable thead th.sorting_desc:after {
                position: absolute;
                top: 12px;
                right: 8px;
                display: block;
                font-family: FontAwesome;
            }

            table.dataTable thead th.sorting:after {
                content: "\f0dc";
                color: #ddd;
                font-size: 0.8em;
                padding-top: 0.12em;
            }

            table.dataTable thead th.sorting_asc:after {
                content: "\f0de";
            }

            table.dataTable thead th.sorting_desc:after {
                content: "\f0dd";
            }*/
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <%-- <div class="row">
        <br />
    </div>--%>
    <div class="row">
        <%--<div class="col-lg-1"></div>--%>
       <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-left: 6px; padding-right: 0px; padding-top: 0px;">
            <div class="" id="myAddAccordion">
                <div class="">
                    <div class="accordionShoHide" id="div_adddetails" runat="server">
                        <div class="panel-default">
                            <div class="modal-header modal-header-primary" id="pwdheading">
                                <h4 class="panel-title" style="text-align: center;">
                                    <a class="accordion-toggle notactive" data-toggle="collapse" href="#divaddparam">
                                        <i class="indicator glyphicon custom-chevron-right"></i>&nbsp;<span
                                            id="spnAccordionHeader" class="sectionheader labeltxtassign">Param Details</span> </a>
                                </h4>
                            </div>
                            <div id="divaddparam" class="panel-collapse collapse accordionmain accordionshadow">
                                <div id="addparamdiv" class="panel-body  transpdiv" style="display: none">
                                    <div class="row">
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12"></div>
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                            <asp:Label ID="lblparamid" runat="server" Text="ParamID :"></asp:Label>
                                        </div>
                                        <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                                            <asp:TextBox ID="txtparamid" runat="server" class="form-control"></asp:TextBox>
                                        </div>
                                        <div class="col-lg-2"></div>
                                    </div>
                                    <br />
                                    <div class="row">
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12"></div>
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                            <asp:Label ID="lblParentparamid" runat="server" Text="ParentParamID :"></asp:Label>
                                        </div>
                                        <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                                            <asp:TextBox ID="txtprntparam" runat="server" class="form-control"></asp:TextBox>
                                        </div>
                                        <div class="col-lg-2"></div>
                                    </div>
                                    <br />
                                    <div class="row">
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12"></div>
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                            <asp:Label ID="lblparamname" runat="server" Text="ParamName :"></asp:Label>
                                        </div>
                                        <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                                            <asp:TextBox ID="txtparaname" runat="server" class="form-control"></asp:TextBox>
                                        </div>
                                        <div class="col-lg-2"></div>
                                    </div>
                                    <br />
                                    <div class="row">
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12"></div>
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                            <asp:Label ID="lblparamvalue" runat="server" Text="ParamValue :"></asp:Label>
                                        </div> 
                                        <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                                            <asp:TextBox ID="txtparamval" runat="server" class="form-control"></asp:TextBox>
                                        </div>
                                        <div class="col-lg-2"></div>
                                    </div>
                                    <br />
                                    <div class="row">
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12"></div>
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                            <asp:Label ID="lbledit" runat="server" Text="Editable :"></asp:Label>
                                        </div>
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                            <asp:RadioButton ID="rdnedityes" GroupName="group11" runat="server" value="Yes" Class="rdnyesno" onclick="editablestatus1();" />Yes
                                        </div>
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                            <asp:RadioButton ID="rdneditno" GroupName="group11" runat="server" value="No" Class="rdnyesno" onclick="editablestatus1();" Checked="true" />No
                                        </div>
                                    </div>
                                    <br />
                                    <div class="row">
                                        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12"></div>
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                            <asp:Label ID="lblaccessto" runat="server" Text="Access : "></asp:Label>
                                        </div>
                                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                            <asp:TextBox ID="txtaccessto" runat="server" class="form-control"></asp:TextBox>
                                        </div>
                                    </div>
                                    <br />

                                    <div class="row">
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <%--<input type="button" id="paramadd" value="Add" class="btn btn-primary" onclick="clearval()" />--%>

                                            <input type="button" id="paramedit" value="Save" class="btn btn-primary" onclick="Saveparam();" />
                                            <input type="button" id="paramcancel" value="Cancel" class="btn btn-primary" hidden="hidden" onclick="canceladdparam();" />
                                        </div>
                                        <div class="col-lg-2">
                                        </div>
                                    </div>
                                </div>
                                <div id="paramtable" class="panel-body table-responsive transpdiv" style="display: block">
                                    <table id="paramdata" class="table table-striped table-bordered dataTable no-footer labeltxt" cellspacing="0" width="99%">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>ParentParamID</th>
                                                <th>Param ID</th>
                                                <th>ParamName</th>
                                                <th>ParamValue</th>
                                                <th>Editable</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                            </tr>
                                        </tfoot>
                                    </table>
                                    <input type="button" id="addRow" value="Add New Row" class="btn btn-primary" />
                                    <input type="button" id="Editparamrow" value="Edit" class="btn btn-primary" data-toggle="modal" onclick="editparamrecord();" />
                                    <input type="button" id="paramdelete" value="Delete" class="btn btn-primary" onclick="paramdelate();" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="modaleditparamdetails" role="dialog">
                <div class="modal-dialog modal-md">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header modal-header-primary">
                            <button type="button" class="close" data-dismiss="modal">
                                &times;</button>
                            <h4 class="modal-title">Param Details</h4>
                        </div>
                        <div class="modal-body">

                            <div class="row">
                                <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12"></div>
                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                    <asp:Label ID="lbleditparamid" runat="server" Text="ParamID :" ClientIDMode="Static"></asp:Label>
                                </div>
                                <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                                    <asp:TextBox ID="txteditparamid" runat="server" class="form-control" ClientIDMode="Static"></asp:TextBox>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12"></div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12"></div>
                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                    <asp:Label ID="lbleditparentpar" runat="server" Text="ParentParamID :" ClientIDMode="Static"></asp:Label>
                                </div>
                                <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                                    <asp:TextBox ID="txteditparentpar" runat="server" class="form-control" ClientIDMode="Static"></asp:TextBox>
                                </div>
                                <div class="col-lg-2"></div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12"></div>
                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                    <asp:Label ID="lbleditparamnamne" runat="server" Text="ParamName :" ClientIDMode="Static"></asp:Label>
                                </div>
                                <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                                    <asp:TextBox ID="txteditparamname" runat="server" class="form-control" ClientIDMode="Static"></asp:TextBox>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12"></div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12"></div>
                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                    <asp:Label ID="lbleditparamval" runat="server" Text="ParamValue :" ClientIDMode="Static"></asp:Label>
                                </div>
                                <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                                    <asp:TextBox ID="txteditparamval" runat="server" class="form-control" ClientIDMode="Static"></asp:TextBox>
                                </div>
                                <div class="col-lg-2"></div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12"></div>
                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                    <asp:Label ID="Label5" runat="server" Text="Editable :"></asp:Label>
                                </div>
                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                    <asp:RadioButton ID="rdneditparams" GroupName="group11" runat="server" value="Yes" Class="rdnyesno" onclick="editablestatus1()" ClientIDMode="Static" />Yes
                                </div>
                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                    <asp:RadioButton ID="rdneditparamn" GroupName="group11" runat="server" value="No" Class="rdnyesno" onclick="editablestatus1()" ClientIDMode="Static" />No
                                </div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12"></div>
                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                    <asp:Label ID="lblparamstatus" runat="server" Text="Status :" ClientIDMode="Static"></asp:Label>
                                </div>
                                <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                                    <%--<asp:TextBox ID="txtparamstatus" runat="server" class="form-control" ClientIDMode="Static"></asp:TextBox>--%>
                                    <select id="ddlparamstatus" class="form-control">
                                        <option value="Active">Active</option>
                                        <option value="InActive">InActive</option>
                                    </select>
                                </div>
                                <div class="col-lg-2"></div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12"></div>
                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                    <asp:Label ID="lblupdtuseraccess" runat="server" Text="Access : "></asp:Label>
                                </div>
                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                    <asp:TextBox ID="txtupdtuseraccess" runat="server" class="form-control"></asp:TextBox>
                                </div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">

                                    <input type="button" id="editparamdetail" value="Save" class="btn btn-primary" onclick="updateparamdet();" />
                                    <input type="button" id="editparamcancel" value="Cancel" class="btn btn-default" onclick="canceleditmodal();" />
                                </div>
                                <div class="col-lg-2">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <%--<div class="col-lg-1">
            <button type="button" class="btn btn-sm btn-success" onclick="fnback2que()"><span class="glyphicon glyphicon-backward">&nbsp;Back</span></button>
        </div>--%>
    </div>
</asp:Content>
