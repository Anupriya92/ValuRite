<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Picsupload.aspx.cs" Inherits="Login.ValuRite.Picsupload" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
     <script src="../bootstrap/js/jquery.min.js"></script>
</head>
<body>
    <form id="form1" runat="server">
        
        <div class="row">
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                <asp:FileUpload ID="FileUpload1" runat="server" />
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-4">
                <asp:Button ID="Button2" runat="server" Text="Upload" OnClick="Button2_Click" />
            </div>
             <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                    <span class="asterisk_input"></span>
                 <%--<input type="text" id="txtusrid" runat="server" />--%>
                    <asp:TextBox ID="txtusrid" runat="server" placeholder="User ID" CssClass="form-control" ClientIDMode="Static"></asp:TextBox>
                </div>
            <span>
            <img id="userimage" runat="server" class="img-responsive" />
            </span>
        </div>
  </form>
</body>
</html>
