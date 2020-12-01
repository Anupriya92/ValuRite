using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Text;
using System.Web.Script.Serialization;
using System.Net.Http;

namespace Login
{
    public partial class GenerateCaptcha : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            Response.Clear();
            int height = 45;
            int width = 120;
            Bitmap bmp = new Bitmap(width, height);

            RectangleF rectf = new RectangleF(15, 5, 0, 0);

            Graphics g = Graphics.FromImage(bmp);
            g.Clear(Color.White);
            g.SmoothingMode = SmoothingMode.AntiAlias;
            g.InterpolationMode = InterpolationMode.HighQualityBicubic;
            g.PixelOffsetMode = PixelOffsetMode.HighQuality;
            g.DrawString(Session["captch"].ToString(), new Font("Chiller", 18, FontStyle.Italic), Brushes.Indigo, rectf);
            g.DrawRectangle(new Pen(Color.Gray), 2, 2, width - 3, height - 3);
            g.Flush();
            Response.ContentType = "image/jpeg";
            bmp.Save(Response.OutputStream, ImageFormat.Jpeg);
            g.Dispose();
            bmp.Dispose();
        }

    }
}