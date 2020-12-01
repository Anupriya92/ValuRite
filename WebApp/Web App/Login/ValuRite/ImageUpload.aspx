<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ImageUpload.aspx.cs" ClientIDMode="Static" Inherits="Login.ImageUpload" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script type="text/javascript" src="../Dropzone/downloads/dropzone.js"></script>
    <script src="../bootstrap/js/jquery.min.js"></script>

    <script src="../bootstrap/js/bootstrap.js"></script>
    <script src="../bootstrap/Bootbox/bootbox.min.js"></script>

    <link href="../Dropzone/downloads/css/basic.css" rel="stylesheet" type="text/css" />
    <link href="../Dropzone/downloads/css/dropzone.css" rel="stylesheet" type="text/css" />
    <link href="../bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <script src="../Js/Valuationdetails.js"></script>
    <script>
        var chkimg = "";
        var chkimglen = "";

        $(document).ready(function () {
            $('#Button1', window.parent.document).on('click', function (e) {
                e.preventDefault();
            });
        })
       // fnSessionMangement(); //Added by Anupriya to call set interval function
        var fname = "";
        Dropzone.options.frmMainScanDoc = {
            init: function () {
                myDropzone = this;
                uploadMultiple: false;
                autoProcessQueue: false;

                this.on("maxfilesexceeded", function (file) {
                    bootbox.dialog({
                        animate: true,
                        title: "",
                        message: "<div class=text-danger><b>Error :</b></div> <div class='text-center text-warning'>You have already reached the maximum no of uploads </div>",
                        buttons: {
                            danger: {
                                label: "OK",
                                className: "btn-danger",
                                callback: function () {
                                }
                            }
                        }
                    });

                });

                this.on("addedfile", function (file) {
                    try {
                        myDropzone.options.maxFiles = localStorage.getItem("uploadrem");
                    }
                    catch (ex) {
                        alert(ex.message);
                    }
                }, 500);

                this.on("sending", function (file, xhr, formData) {
                    formData.append("filesize", file.size);
                    var filename = prompt("Enter the Image Description")
                    localStorage.setItem("TempImgname", '<%=Session["ValuationID"]%>' + filename);
                    console.log(formData.get("fileName") + " sFile name");
                    fname = filename;
                    formData.append("filename", filename);
                });

                this.on("success", function (file, responseText) {
                    var filename = file.name;
                    filename = '<%=Session["ValuationID"]%>' + fname;
                    //var mytest = localStorage.getItem("locImagegrp")
                    var Imagegroup = localStorage.getItem("locImagegrp")
                    if (Imagegroup != "") {
                        Imagegroup = Imagegroup.split(',');
                    }
                    else {
                        Imagegroup = [];
                    }
                    Imagegroup.push(filename);
                    localStorage.setItem("uploadrem", 5 - Imagegroup.length);
                    localStorage.setItem("locImagegrp", Imagegroup.toString())
                    Loadfile(file, this);
                });

                this.on("error", function (file, message) {
                    this.removeFile(file);
                });
            }
        };

        //function Loadfile(file, dropobj) {
        //    var fr = new FileReader();
        //    var imagdiv = '<div class="my img-wrap " style="cursor: pointer;"><span class="close" style="color: red; font-weight: bolder" onclick="imgcloseclick(this)">×</span><img id="Image5" src="" onclick="window.open(this.src)"></div>'
        //    var img = []

        //    $(".img-wrap", window.parent.document).each(function (divelm, ee) {
        //        if ($(ee).find('img').attr('src') != "") {
        //            img.push($(ee).find('img').attr('id'))
        //        }
        //    })


        //    var filename = localStorage.getItem("TempImgname")//localStorage.setItem("TempImgname"

        //    if (!$("#divimages", window.parent.document).is(":visible")) {
        //        $("#divimages", window.parent.document).show();
        //    }

        //    var orgimgids = ["Image1", "Image2", "Image3", "Image4", "Image5"]
        //    for (var m = 0; m < orgimgids.length; m++) {
        //        if (img[m] == orgimgids[m]) {

        //        } else {
        //            if ($("#" + orgimgids[m], window.parent.document).length) {
        //                fr.onload = function () {
        //                    $($("#" + orgimgids[m], window.parent.document)).parent('.img-wrap').removeAttr('style');
        //                    $("#" + orgimgids[m], window.parent.document).attr('src', fr.result)
        //                    $("#" + orgimgids[m], window.parent.document).attr("height", "100px");
        //                    $("#" + orgimgids[m], window.parent.document).attr("width", "100px");
        //                    var filenamewithoutext = filename;
        //                    $("#" + orgimgids[m], window.parent.document).attr("alt", filename);
        //                    $("#" + orgimgids[m], window.parent.document).attr("src", "ImageServer.aspx?filename='" + filename + "'");
        //                    $("#" + orgimgids[m], window.parent.document).parent('.img-wrap').removeClass("my");
        //                }
        //            } else {
        //                //If value of orgimgids[m] has no length that image tag is deleted so recreating and appending the tag 
        //                if ($("#Image5", window.parent.document).length) {
        //                    $("#Image5", window.parent.document).parent('.img-wrap').after(imagdiv);
        //                    $('.my', window.parent.document).find('img').attr('id', orgimgids[m]);
        //                    $("#" + orgimgids[m], window.parent.document).attr('src', fr.result)
        //                    $("#" + orgimgids[m], window.parent.document).attr("height", "100px");
        //                    $("#" + orgimgids[m], window.parent.document).attr("width", "100px");
        //                    var filenamewithoutext = filename;
        //                    $("#" + orgimgids[m], window.parent.document).attr("alt", filename);
        //                    $("#" + orgimgids[m], window.parent.document).attr("src", "ImageServer.aspx?filename='" + filename + "'");
        //                    $("#" + orgimgids[m], window.parent.document).parent('.img-wrap').removeClass("my");
        //                }
        //                else if ($("#Image4", window.parent.document).length) {
        //                    $("#Image4", window.parent.document).parent('.img-wrap').after(imagdiv);
        //                    $('.my', window.parent.document).find('img').attr('id', orgimgids[m]);
        //                    $("#" + orgimgids[m], window.parent.document).attr('src', fr.result)
        //                    $("#" + orgimgids[m], window.parent.document).attr("height", "100px");
        //                    $("#" + orgimgids[m], window.parent.document).attr("width", "100px");
        //                    $("#" + orgimgids[m], window.parent.document).parent('.img-wrap').removeClass("my");
        //                    var filenamewithoutext = filename;
        //                    $("#" + orgimgids[m], window.parent.document).attr("alt", filename);
        //                    $("#" + orgimgids[m], window.parent.document).attr("src", "ImageServer.aspx?filename='" + filename + "'");
        //                }
        //                else if ($("#Image3", window.parent.document).length) {
        //                    $("#Image3", window.parent.document).parent('.img-wrap').after(imagdiv);
        //                    $('.my', window.parent.document).find('img').attr('id', orgimgids[m]);
        //                    $("#" + orgimgids[m], window.parent.document).attr('src', fr.result);
        //                    $("#" + orgimgids[m], window.parent.document).attr("height", "100px");
        //                    $("#" + orgimgids[m], window.parent.document).attr("width", "100px");
        //                    $("#" + orgimgids[m], window.parent.document).parent('.img-wrap').removeClass("my");
        //                    var filenamewithoutext = filename;
        //                    $("#" + orgimgids[m], window.parent.document).attr("alt", filename);
        //                    $("#" + orgimgids[m], window.parent.document).attr("src", "ImageServer.aspx?filename='" + filename + "'");
        //                }

        //                else if ($("#Image2", window.parent.document).length) {
        //                    $("#Image2", window.parent.document).parent('.img-wrap').after(imagdiv);
        //                    $('.my', window.parent.document).find('img').attr('id', orgimgids[m]);
        //                    $("#" + orgimgids[m], window.parent.document).attr('src', fr.result)
        //                    $("#" + orgimgids[m], window.parent.document).attr("height", "100px");
        //                    $("#" + orgimgids[m], window.parent.document).attr("width", "100px");
        //                    $("#" + orgimgids[m], window.parent.document).parent('.img-wrap').removeClass("my");
        //                    var filenamewithoutext = filename;
        //                    $("#" + orgimgids[m], window.parent.document).attr("alt", filename);
        //                    $("#" + orgimgids[m], window.parent.document).attr("src", "ImageServer.aspx?filename='" + filename + "'");
        //                }
        //                else if ($("#Image1", window.parent.document).length) {
        //                    $("#Image1", window.parent.document).parent('.img-wrap').after(imagdiv);
        //                    $('.my', window.parent.document).find('img').attr('id', orgimgids[m]);
        //                    $("#" + orgimgids[m], window.parent.document).attr('src', fr.result);
        //                    $("#" + orgimgids[m], window.parent.document).attr("height", "100px");
        //                    $("#" + orgimgids[m], window.parent.document).attr("width", "100px");
        //                    $("#" + orgimgids[m], window.parent.document).parent('.img-wrap').removeClass("my");
        //                    var filenamewithoutext = filename;
        //                    $("#" + orgimgids[m], window.parent.document).attr("alt", filename);
        //                    $("#" + orgimgids[m], window.parent.document).attr("src", "ImageServer.aspx?filename='" + filename + "'");
        //                }
        //                else {

        //                    $("#divimggrp", window.parent.document).append(imagdiv);
        //                    $('.my', window.parent.document).find('img').attr('id', orgimgids[m]);
        //                    $("#" + orgimgids[m], window.parent.document).attr('src', fr.result);
        //                    $("#" + orgimgids[m], window.parent.document).attr("height", "100px");
        //                    $("#" + orgimgids[m], window.parent.document).attr("width", "100px");
        //                    $("#" + orgimgids[m], window.parent.document).parent('.img-wrap').removeClass("my");
        //                    var filenamewithoutext = filename;
        //                    $("#" + orgimgids[m], window.parent.document).attr("alt", filename);
        //                    $("#" + orgimgids[m], window.parent.document).attr("src", "ImageServer.aspx?filename='" + filename + "'");
        //                }
        //            }
        //            fr.readAsDataURL(file);
        //            dropobj.removeFile(file);
        //            localStorage.setItem("uploadrem", localStorage.getItem("uploadrem") - 1);
        //            break;
        //        }
        //    }
        //}

        function Loadfile(file, dropobj) {

            var fr = new FileReader();
            var img = []
            $('#divimages', window.parent.document).show();
            $(".img-wrap", window.parent.document).each(function (divelm, ee) {
                if ($(ee).find('img').attr('src') != "") {
                    img.push($(ee).find('img').attr('id'))
                }
            })

            var filename = localStorage.getItem("TempImgname")
            var orgimgids = ["Image1", "Image2", "Image3", "Image4", "Image5"]
            var imgid = "";
            var imagdiv = '<div class="my img-wrap " style="cursor: pointer;"><span class="close" style="color: red; font-weight: bolder" onclick="imgcloseclick(this)">×</span><img id="' + imgid + '" src="" onclick="window.open(this.src)"></div>'

            if (img.length == 0) {
                //no images added previously
                imgid = "Image1";
                imagdiv = '<div class="my img-wrap " style="cursor: pointer;"><span class="close" style="color: red; font-weight: bolder" onclick="imgcloseclick(this)">×</span><img id="' + imgid + '" src="" onclick="window.open(this.src)"></div>'
                if ($("#Image1", window.parent.document).length > 0) {
                    $($("#" + imgid, window.parent.document)).parent('.img-wrap').removeAttr('style');
                    $("#" + imgid, window.parent.document).attr("height", "100px");
                    $("#" + imgid, window.parent.document).attr("width", "100px");
                    var filenamewithoutext = filename;
                    $("#" + imgid, window.parent.document).attr("alt", filename);
                    $("#" + orgimgids[0], window.parent.document).attr("src", "ImageServer.aspx?filename='" + filename + "'");
                    $("#" + imgid, window.parent.document).parent('.img-wrap').removeClass("my");
                }
                else {
                    $("#divimggrp", window.parent.document).append(imagdiv);
                    $('.my', window.parent.document).find('img').attr('id', imgid);
                    $("#" + imgid, window.parent.document).attr("height", "100px");
                    $("#" + imgid, window.parent.document).attr("width", "100px");
                    $("#" + imgid, window.parent.document).parent('.img-wrap').removeClass("my");
                    $("#" + imgid, window.parent.document).attr("alt", filename);
                    $("#" + imgid, window.parent.document).attr("src", "ImageServer.aspx?filename='" + filename + "'");
                }
                fr.readAsDataURL(file);
                dropobj.removeFile(file);
            }
            else {
                //having images in the image tag
                for (var count = 0; count < img.length; count++) {
                    orgimgids.splice(orgimgids.indexOf(img[count]), 1)
                }
                imgid = orgimgids[0];
                imagdiv = '<div class="my img-wrap " style="cursor: pointer;"><span class="close" style="color: red; font-weight: bolder" onclick="imgcloseclick(this)">×</span><img id="' + imgid + '" src="" onclick="window.open(this.src)"></div>'
                if ($("#" + orgimgids[0], window.parent.document).length > 0) {
                    $($("#" + orgimgids[0], window.parent.document)).parent('.img-wrap').removeAttr('style');
                    $("#" + orgimgids[0], window.parent.document).attr('src', fr.result)
                    $("#" + orgimgids[0], window.parent.document).attr("height", "100px");
                    $("#" + orgimgids[0], window.parent.document).attr("width", "100px");
                    $("#" + orgimgids[0], window.parent.document).attr("alt", filename);
                    $("#" + orgimgids[0], window.parent.document).attr("src", "ImageServer.aspx?filename='" + filename + "'");
                    $("#" + orgimgids[0], window.parent.document).parent('.img-wrap').removeClass("my");
                }
                else {
                    $("#divimggrp", window.parent.document).append(imagdiv);
                    $('.my', window.parent.document).find('img').attr('id', orgimgids[0]);
                    $("#" + orgimgids[0], window.parent.document).attr("height", "100px");
                    $("#" + orgimgids[0], window.parent.document).attr("width", "100px");
                    $("#" + orgimgids[0], window.parent.document).parent('.img-wrap').removeClass("my");
                    $("#" + orgimgids[0], window.parent.document).attr("alt", filename);
                    $("#" + orgimgids[0], window.parent.document).attr("src", "ImageServer.aspx?filename='" + filename + "'");
                }
                dropobj.removeFile(file);
            }
        }

        $(document).ready(function () {
            try {
                chkimg = localStorage.getItem("locImagegrp")
                chkimg = chkimg.split(',')
                chkimglen = chkimg.length;
                chkimglen = 5 - chkimglen;
                localStorage.setItem("uploadrem", chkimglen);
                $('#frmMainScanDoc').dropzone();
                myDropzone.options.maxFiles = localStorage.getItem("uploadrem");
            } catch (ex) {
                console.log(ex);
            }
        });
    </script>
</head>
<body>
    <form id="frmMainScanDoc" runat="server" class="dropzone" method="post">
        <div class="fallback">
            <%--<input name="file" type="file" accept=".png,.jpg,.jpe,.pdf,.csv,.xsl,.xml,.xlsx,.docx,.txt" />--%>
            <input type="file" id="file" name="file" />
        </div>
        <div id="alert" hidden="hidden" class="row col-xs-12 col-sm-12 col-md-2 col-lg-2 align-left width-auto">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
                &times;</button>
            <label id="message"></label>
        </div>
        <asp:HiddenField ID="imglist" runat="server" />
    </form>
</body>
</html>
