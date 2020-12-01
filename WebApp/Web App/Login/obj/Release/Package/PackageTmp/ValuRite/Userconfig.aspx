<%@ Page Title="" Language="C#" MasterPageFile="~/PropertyApp.Master" AutoEventWireup="true" ClientIDMode="Static" CodeBehind="Userconfig.aspx.cs" Inherits="Login.Userconfig" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <meta name="google" content="notranslate" />
    <script src="../bootstrap/DataTables-1.10.10/media/js/jquery.dataTables.min.js"></script>
    <script src="../bootstrap/DataTables-1.10.10/media/js/jquery.dataTables.js"></script>
     <script src="../bootstrap/DataTables-1.10.10/media/js/dataTables.responsive.min.js"></script>
    <script src="../bootstrap/DataTables-1.10.10/media/js/responsive.bootstrap.min.js"></script>
    <link href="../bootstrap/DataTables-1.10.10/media/css/dataTables.jqueryui.css" rel="stylesheet" />
    <link href="../bootstrap-3.3.6-dist/css/bootstrap-theme.css" rel="stylesheet" />
    <link href="../bootstrap/css/dataTables.tableTools.css" rel="stylesheet" />
    <link href="../bootstrap/css/editor.dataTables.min.css" rel="stylesheet" />
    <link href="../bootstrap/css/select.dataTables.min.css" rel="stylesheet" />
    <link href="../bootstrap/css/buttons.dataTables.min.css" rel="stylesheet" />
    <link href="../bootstrap/DataTables-1.10.10/media/css/dataTables.jqueryui.min.css" rel="stylesheet" />
    <link href="../bootstrap/DataTables-1.10.10/media/css/jquery.dataTables.css" rel="stylesheet" />
    <link href="http://code.jquery.com/ui/1.10.4/themes/ui-lightness/jquery-ui.css" rel="stylesheet" />
    <link href="../includes/css/font-awe.css" rel="stylesheet" />
    <link href="../includes/css/dataTables.fontAwesome.css" rel="stylesheet" />
    <link href="https://cdn.datatables.net/1.10.15/css/dataTables.bootstrap.min.css" rel="stylesheet" />
    <link href="https://cdn.datatables.net/responsive/2.1.1/css/responsive.dataTables.min.css" rel="stylesheet" />


    <style>
        .modal-header-primary {
            border-top-left-radius: 0px !important;
            border-top-right-radius: 0px !important;
        }
    </style>
    <script type="text/javascript">
        var rowid = "";
        var columdata = "";
        $(document).ready(function () {
            fnchkduphighlight();
            $("#list_usrconfig").addClass("highlight");
            $('#divadduser').collapse('show');
            getuserdetails();
        });

        fnSessionMangement(); //Added by Anupriya to call set interval function
        function Saveuser() {
            var id = checkuseridexists()
            var obj = {

                UserID: $("#txtedituserid").val(),
                UserRole: $("#txtusrrole").val(),
                UserType: $("#txteditusertype").val(),
                UserName: $("#txteditusername").val(),
                PhoneNo: $("#txteditcontact").val(),
                MobileNo: $("#txtusrmobno").val(),
                EmailID: $("#txtusermail").val(),
                AddressLine1: $("#txtusraddr").val(),
                AddressLine2: $("#txtaddrline2").val(),
                AddArea: $("#txtusrarea").val(),
                City: $("#txtusrcity").val(),
                State: $("#txtusrstate").val(),
                Country: $("#txtusrcounty").val(),
                Pincode: $("#txtusrpin").val(),
                Landmark: $("#txtusrlandmark").val(),
                UserStatus: $("#ddlusrstatus :selected").val()
            }
            var jsonobj = JSON.stringify(obj);
            //alert(jsonobj)
            fnusereditsave(jsonobj);
            //}
        }
        function checkuseridexists() {
            var addpuserid = $('#txtedituserid').val()
            if (columdata.indexOf(addpuserid) > 0) {
                return 1;
            } else {
                return -1;
            }
        }
    </script>
    <style>
        
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <%--<div class="row">
        <br />
    </div>--%>
    <div class="row">

        <%--<div class="col-lg-1"></div>--%>
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding-left: 6px; padding-right: 0px; padding-top: 0px;">
            <div class="" id="myAddAccordion">
                <div class="">
                    <div class="accordionShoHide" id="div_adduserdetails" runat="server">
                        <div class="panel-default">
                            <div class="modal-header modal-header-primary" id="userlist">
                                <h4 class="panel-title" style="text-align: center;">
                                    <a class="accordion-toggle notactive " data-toggle="collapse" href="#divadduser">
                                        <i class="indicator glyphicon custom-chevron-right"></i>&nbsp;
                                        <span class="sectionheader" id="spnAccordionHeader">User Details</span> </a>
                                </h4>
                            </div>
                            <div id="divadduser" class="panel-collapse collapse accordionmain accordionshadow">
                                <div id="userlisttable" class="panel-body table-responsive" style="display: block">
                                    <table id="userdata" class="display nowrap table  table  gvdatatable dt-responsive " cellspacing="0" width="100%">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>UserType</th>
                                                <th>UserName</th>
                                                <th>Contact Details</th>
                                                <th>Address</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                            </tr>
                                        </tfoot>
                                    </table>
                                    <input type="button" id="adduserRow" value="Add New Row" class="btn btn-primary" onclick="adduser();" />
                                    <input type="button" id="Edituserrow" value="Edit" class="btn btn-primary" data-toggle="modal" onclick="edituserrecord();" />
                                    <input type="button" id="userdelete" value="Delete" class="btn btn-primary" onclick="userdelate()" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="modaledituserdetails" role="dialog">
                <div class="modal-dialog modal-md">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header modal-header-primary">
                            <button type="button" class="close" data-dismiss="modal">
                                &times;</button>
                            <h4 class="modal-title"><b>User Details</b></h4>
                        </div>
                        <div class="modal-body form-horizontal">
                            <div class="form-group">
                                <%--<div class="col-lg-2"></div>
                                <div class="col-lg-3">--%>
                                <asp:Label ID="lblusrrole" runat="server" Font-Bold="true" Text="UserRole :" ClientIDMode="Static" CssClass="col-xs-3 control-label"></asp:Label>
                                <%--</div>--%>
                                <div class="col-xs-5  input-group">
                                    <asp:TextBox ID="txtusrrole" runat="server" class="form-control" ClientIDMode="Static"></asp:TextBox>
                                </div>
                                <%--<div class="col-lg-2"></div>--%>
                            </div>
                            <div class="form-group">
                                <%--<div class="col-lg-2"></div>
                                <div class="col-lg-3">--%>
                                <asp:Label ID="lbledituserid" runat="server" CssClass="col-xs-3 control-label" Font-Bold="true" Text="UserID :" ClientIDMode="Static"></asp:Label>
                                <%--</div>--%>
                                <div class="col-xs-5 input-group">
                                    <asp:TextBox ID="txtedituserid" runat="server" class="form-control" ClientIDMode="Static"></asp:TextBox>
                                </div>
                                <%--<div class="col-lg-2"></div>--%>
                            </div>
                            <div class="form-group">
                                <%--<div class="col-lg-2"></div>
                                <div class="col-lg-3">--%>
                                <asp:Label ID="lbleditusertype" runat="server" CssClass="col-xs-3 control-label" Font-Bold="true" Text="UserType :" ClientIDMode="Static"></asp:Label>
                                <%--</div>--%>
                                <div class="col-xs-5 input-group">
                                    <asp:TextBox ID="txteditusertype" runat="server" class="form-control" ClientIDMode="Static"></asp:TextBox>
                                </div>
                                <%-- <div class="col-lg-2"></div>--%>
                            </div>
                            <div class="form-group">
                                <%--<div class="col-lg-2"></div>
                                <div class="col-lg-3">--%>
                                <asp:Label ID="lbleditusername" runat="server" CssClass="col-xs-3 control-label" Font-Bold="true" Text="UserName :" ClientIDMode="Static"></asp:Label>
                                <%--</div>--%>
                                <div class="col-xs-5 input-group">
                                    <asp:TextBox ID="txteditusername" runat="server" class="form-control" ClientIDMode="Static"></asp:TextBox>
                                </div>
                                <%--<div class="col-lg-2"></div>--%>
                            </div>
                            <div class="form-group">
                                <%--<div class="col-lg-2"></div>
                                <div class="col-lg-3">--%>
                                <asp:Label ID="lbleditcontact" runat="server" CssClass="col-xs-3 control-label" Font-Bold="true" Text="Landline :" ClientIDMode="Static"></asp:Label>
                                <%--</div>--%>
                                <div class="col-xs-5 input-group">
                                    <asp:TextBox ID="txteditcontact" runat="server" class="form-control" ClientIDMode="Static"></asp:TextBox>
                                </div>
                                <%-- <div class="col-lg-2"></div>--%>
                            </div>

                            <div class="form-group">
                                <%--<div class="col-lg-2"></div>
                                <div class="col-lg-3">--%>
                                <asp:Label ID="lblusrmobno" runat="server" CssClass="col-xs-3 control-label" Font-Bold="true" Text="Mobile No :" ClientIDMode="Static"></asp:Label>
                                <%--</div>--%>
                                <div class="col-xs-5 input-group">
                                    <asp:TextBox ID="txtusrmobno" runat="server" class="form-control" ClientIDMode="Static"></asp:TextBox>
                                </div>
                                <%--<div class="col-lg-2"></div>--%>
                            </div>

                            <div class="form-group">
                                <%--<div class="col-lg-2"></div>
                                <div class="col-lg-3">--%>
                                <asp:Label ID="lblusermail" runat="server" CssClass="col-xs-3 control-label" Font-Bold="true" Text="Email-ID :" ClientIDMode="Static"></asp:Label>
                                <%--</div>--%>
                                <div class="col-xs-5 input-group">
                                    <asp:TextBox ID="txtusermail" runat="server" class="form-control" ClientIDMode="Static"></asp:TextBox>
                                </div>
                                <%--<div class="col-lg-2"></div>--%>
                            </div>
                            <div class="form-group">
                                <%--<div class="col-lg-2"></div>
                                <div class="col-lg-3">--%>
                                <asp:Label ID="lblusraddr" runat="server" CssClass="col-xs-3 control-label" Font-Bold="true" Text="Address :" ClientIDMode="Static"></asp:Label>
                                <%--</div>--%>
                                <div class="col-xs-5 input-group">
                                    <asp:TextBox ID="txtusraddr" runat="server" placeholder="Address Line1" class="form-control" ClientIDMode="Static"></asp:TextBox>
                                </div>
                                <%--<div class="col-lg-2"></div>--%>
                            </div>

                            <div class="form-group">
                                <label class="col-xs-3 control-label"></label>
                                <div class="col-xs-5 input-group">
                                    <asp:TextBox ID="txtaddrline2" runat="server" placeholder="Address Line2" class="form-control" ClientIDMode="Static"></asp:TextBox>
                                </div>
                                <%-- <div class="col-lg-2"></div>--%>
                            </div>

                            <div class="form-group">
                                <label class="col-xs-3 control-label"></label>
                                <div class="col-xs-5 input-group">
                                    <asp:TextBox ID="txtusrarea" runat="server" placeholder="Area" class="form-control" ClientIDMode="Static"></asp:TextBox>
                                </div>
                                <div class="col-lg-2"></div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label"></label>
                                <div class="col-xs-5 input-group">
                                    <asp:TextBox ID="txtusrcity" runat="server" placeholder="City" class="form-control" ClientIDMode="Static"></asp:TextBox>
                                </div>
                                <div class="col-lg-2"></div>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label"></label>
                                <div class="col-xs-5 input-group">
                                    <asp:TextBox ID="txtusrstate" runat="server" placeholder="State" class="form-control" ClientIDMode="Static"></asp:TextBox>
                                </div>
                                <%--<div class="col-lg-2"></div>--%>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label"></label>
                                <div class="col-xs-5 input-group">
                                    <asp:TextBox ID="txtusrcounty" runat="server" placeholder="Country" class="form-control" ClientIDMode="Static"></asp:TextBox>
                                </div>
                                <%--<div class="col-lg-2"></div>--%>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label"></label>
                                <div class="col-xs-5 input-group">
                                    <asp:TextBox ID="txtusrpin" runat="server" placeholder="Pincode" class="form-control" ClientIDMode="Static"></asp:TextBox>
                                </div>
                                <%--<div class="col-lg-2"></div>--%>
                            </div>
                            <div class="form-group">
                                <label class="col-xs-3 control-label"></label>
                                <div class="col-xs-5 input-group">
                                    <asp:TextBox ID="txtusrlandmark" runat="server" placeholder="Landmark" class="form-control" ClientIDMode="Static"></asp:TextBox>
                                </div>
                                <%--<div class="col-lg-2"></div>--%>
                            </div>
                            <div class="form-group">
                                <%--<div class="col-lg-2"></div>--%>
                                <%--<div class="col-xs-3 control-label">--%>
                                <asp:Label ID="lblusrstatus" CssClass="col-xs-3 control-label" Font-Bold="true" runat="server" Text="Status :" ClientIDMode="Static"></asp:Label>
                                <%--</div>--%>
                                <div class="col-xs-5 input-group">
                                    <select id="ddlusrstatus" class="form-control">
                                        <option value="Active">Active</option>
                                        <option value="InActive">InActive</option>
                                    </select>
                                </div>
                                <%--<div class="col-lg-2"></div>--%>
                            </div>
                            <%--<br />
                            <div class="row">
                                <div class="col-lg-4">
                                </div>
                                <div class="col-lg-6">
                                </div>
                                <div class="col-lg-2">
                                </div>
                            </div>--%>
                        </div>
                        <div class="modal-footer" style="text-align:center">
                            <input type="button"  id="editparamdetail" value="Save" class="btn btn-primary" onclick="Saveuser();" />
                            <input type="button"  id="editparamcancel" value="Cancel" class="btn btn-default" onclick="canceledituser();" />
                            
                            
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="modalchooseuser" role="dialog">
                <div class="modal-dialog modal-sm">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header modal-header-primary">
                            <button type="button" class="close" data-dismiss="modal">
                                &times;</button>
                            <h4 class="modal-title">Select User Type</h4>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-lg-2"></div>
                                <div class="col-lg-7">
                                    <asp:Label ID="lblusrtype" runat="server" Text="User Type: " Font-Bold="true"></asp:Label>
                                </div>
                                <div class="col-lg-3"></div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="col-lg-2"></div>
                                <div class="col-lg-7">
                                    <asp:DropDownList ID="chooseddlusr" runat="server" CssClass="form-control" ClientIDMode="Static">
                                        <asp:ListItem Value="Lender"></asp:ListItem>
                                        <asp:ListItem Value="Borrower"></asp:ListItem>
                                        <asp:ListItem Value="Appraiser"></asp:ListItem>
                                    </asp:DropDownList><br />
                                </div>
                                <div class="col-lg-2"></div>
                            </div>
                            <br />
                            <br />
                            <div class="row">
                                <div class="col-lg-3"></div>
                                <div class="col-lg-6">
                                    <input type="button" id="adduserdetail" value="Submit" class="btn btn-primary" onclick="goaduserpage();" />
                                </div>
                                <div class="col-lg-3"></div>
                            </div>
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <%--<div class="col-lg-1">
            <button type="button" id="btnbackconfig" class="btn btnsave" onclick="fnback2que()"><span class="glyphicon glyphicon-backward">&nbsp;Back</span></button>
        </div>--%>
    </div>
</asp:Content>
