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

namespace Login
{
    public class imageupload {
        public string fname;
       // public string extension;
    }
    public partial class ImageServer : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                imageupload obj = new imageupload();
              //  foreach (string s in Request.Files)
            //    {
                 //   HttpPostedFile file = Request.Files;
                   //string name = Request.QueryString["name"];
                  //  string fileName = Path.GetFileName(name);
                
                  //  string NamewithoutExt = Path.GetFileNameWithoutExtension(name);

                string filename = Request.QueryString["filename"]; 
                   // string fileExtension = "";
                  //  fileExtension = Path.GetExtension(filename);
                    filename = filename.Trim('\'');
                    obj.fname = filename;
                 //   obj.extension = fileExtension;
                    //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5018");
                    Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/GetImage");
                    //GetImage
                    var javaScriptSerializer = new JavaScriptSerializer();
                    string jsonString = javaScriptSerializer.Serialize(obj);
                    var client = new HttpClient();
                    client.BaseAddress = urlTemplate;
                    client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
                    client.Timeout = TimeSpan.FromMilliseconds(600000);
                    StringContent htpcontent = new StringContent(jsonString, Encoding.UTF8, "application/json");
                    var response = client.PostAsync("", htpcontent).Result;
                    string resultContent = response.Content.ReadAsStringAsync().Result;
                    // Response.ContentType = "image/jpeg"; // for JPEG file
                    Response.ContentType = "application/octet-stream";
                    if (resultContent != "0")
                    {
                        byte[] data = System.Convert.FromBase64String(resultContent);
                        Response.BinaryWrite(data);
                    }
             //   }
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
        }

    }

}


