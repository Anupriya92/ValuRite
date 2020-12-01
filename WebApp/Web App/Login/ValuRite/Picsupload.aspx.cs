using System;
using System.Collections.Generic;
using System.Configuration;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Login.ValuRite
{
    public partial class Picsupload : System.Web.UI.Page
    {
        private object bmp;



        public object Objcreateuser { get; private set; }

        protected void Page_Load(object sender, EventArgs e)
        {

        }
        // string s;
        protected void Button2_Click(object sender, EventArgs e)
        {
            StartUpload();
        }


        public void StartUpload()
        {

            try
            {
                //string s;
                foreach (string s in Request.Files)
                {
                    //HttpPostedFile file = FileUpload1.PostedFile;

                    HttpPostedFile file = Request.Files[s];
                    string UserID = txtusrid.Text;
                    string imagename = file.FileName;
                    string NamewithoutExt = Path.GetFileNameWithoutExtension(imagename);
                    int fileSizeInBytes = file.ContentLength;
                    Bitmap bmp = new Bitmap(file.InputStream);
                    string imgpath = "";
                    using (MemoryStream m = new MemoryStream())
                    {
                        bmp.Save(m, bmp.RawFormat);
                        byte[] imageBytes = m.ToArray();
                        string base64String = Convert.ToBase64String(imageBytes);
                        //return base64String;
                        encodImg objencimg = new encodImg();
                        objencimg.image = base64String;
                        objencimg.name = UserID + NamewithoutExt;
                        //userimage.Attributes["src"] = imgpath + NamewithoutExt+".JPG";

                        // objencimg.UserID = HttpContext.Current.Session["UserID"].ToString();

                        Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/ImageUpload");
                        //Uri urlTemplate = new Uri("http://192.168.1.203:3000/ImageUpload");

                        //ImageUpload
                        var javaScriptSerializer = new JavaScriptSerializer();
                        string jsonString = javaScriptSerializer.Serialize(objencimg);
                        var client = new HttpClient();
                        client.BaseAddress = urlTemplate;
                        client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
                        client.Timeout = TimeSpan.FromMilliseconds(600000);
                        StringContent htpcontent = new StringContent(jsonString, Encoding.UTF8, "application/json");
                        var response = client.PostAsync("", htpcontent).Result;
                        string resultContent = response.Content.ReadAsStringAsync().Result;
                        if (resultContent == "0")
                        {
                            Console.Write("Failed");
                        }
                        else
                        {
                            Console.Write("Uploaded successfully");

                        }
                    }
                }
            }
            catch (Exception Ex)
            {
                throw Ex;
            }
        }
    }
}