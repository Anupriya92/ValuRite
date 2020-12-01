<%@ Page Language="C#" MasterPageFile="PropertyApp.Master" AutoEventWireup="true" ClientIDMode="Static" CodeBehind="WebForm1.aspx.cs" Inherits="Login.ValuRite.WebForm1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
     <script src='https://api.mapbox.com/mapbox.js/v2.4.0/mapbox.js'></script>
  <link href='https://api.mapbox.com/mapbox.js/v2.4.0/mapbox.css' rel='stylesheet' />
     <style>
    /*body { margin:0; padding:0; }*/
    .map { position:absolute; top:0; bottom:0; height:100%; width:100%; }
  </style>
    <script type="text/javascript">
        $(document).ready(function () {
            L.mapbox.accessToken = 'pk.eyJ1IjoibWFwYm94YWIiLCJhIjoiY2lzYmVqcHp4MDEyNzJ5cG4xbHA0a2JkeSJ9.2yXMcJqHA7MjQEDMPHCCSA';
            var tilejson = {
                "tiles": ["https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpbG10dnA3NzY3OTZ0dmtwejN2ZnUycjYifQ.1W5oTOnWXQ9R1w8u3Oo1yA"],
                "minzoom": 0,
                "maxzoom": 18
            }
            L.mapbox.map('map', tilejson, {
                scrollWheelZoom: false
            }).setView([43.6519, -79.3852], 15);
        })
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="leaflet-container">
        <div class="row">
           <div id='map' class='map'> </div>
        </div>
    </div>
</asp:Content>
