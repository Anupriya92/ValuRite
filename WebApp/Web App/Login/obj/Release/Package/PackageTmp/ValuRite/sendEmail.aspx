<%@ Page Language="C#" MasterPageFile="~/PropertyApp.Master" AutoEventWireup="true" ClientIDMode="Static" CodeBehind="sendEmail.aspx.cs" Inherits="Login.ValuRite.sendEmail" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <title></title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="text/javascript">
        function fnback2dashboard() {
            window.location.href="ApplicationQueue.aspx"
        }
        fnSessionMangement(); //Added by Anupriya to call set interval function
    </script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="row myrow1">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="text-align: center; font-size: 18px">
            <span>
                <label>Email Details</label></span>
        </div>
    </div>
    <div class="row myrow">
        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle">
            <span>
                <label>To:</label>
            </span>
        </div>
        <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
            <span>
                <input type="text" id="txtsenderEmail" class="form-control" runat="server" placeholder="Email Address" disabled="disabled" />
            </span>
        </div>
        <div class="col-lg-2">
        </div>
    </div>

    <div class="row myrow">
        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle">
            <span>
                <label>Subject:</label>
            </span>
        </div>
        <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12 divmiddle">
            <input type="text" id="txtsubjectEmail" class="form-control" runat="server" placeholder="Subject" disabled="disabled" />
        </div>
        <div class="col-lg-2">
        </div>
    </div>

    <div class="row myrow">
        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 divmiddle">
            <span>
                <label>Message:</label>
            </span>
        </div>
        <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
            <textarea class="form-control" id="txtemailContent" runat="server" rows="8" style="resize: none" placeholder="Your mail content here" disabled="disabled"></textarea>
        </div>
        <div class="col-lg-2">
        </div>
    </div>

    <div class="row myrow">
        <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
        </div>
        <div class="col-lg-10 col-md-10 col-sm-12 col-xs-12 divmiddle">
            <div class="row">
                <div class="col-lg-1 col-md-2 col-sm-12 col-xs-12 divmiddle">
                    <span>
                        <input type="button" class="btn btn-primary" value="Cancel" onclick="fnback2dashboard()" />
                    </span>
                </div>
                <div class="col-lg-1 col-md-1 col-sm-12 col-xs-12 divmiddle">
                    <span>
                        <input type="button" class="btn btn-primary" value="Edit" onclick="fnenblEmailfields()" />
                    </span>
                </div>
                <div class="col-lg-1 col-md-1 col-sm-12 col-xs-12 divmiddle">
                    <span>
                        <input type="button" class="btn btn-primary" value="Send" onclick="fnSendEmail()" />
                    </span>
                </div>

            </div>
        </div>
        <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12 divmiddle"></div>
        <%--<div class="col-lg-2" style="padding-left: 12px">
            <span>
                <input type="button" class="btn btn-primary" value="Submit" onclick="SubmitAppraisal()" />
            </span>
        </div>--%>
    </div>
</asp:Content>
