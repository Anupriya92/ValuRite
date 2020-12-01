using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Drawing;
using System.Web.Script.Serialization;
using System.Net.Http;
using System.Configuration;

namespace Login.ValuRite
{
    public partial class TestDropzone : System.Web.UI.Page
    {
        string ValuationID = string.Empty;
        string filenamestring = string.Empty;
        protected void Page_Load(object sender, EventArgs e)
        {
            UploadFile();

        }
        protected string UploadFile()
        {
            string strFile, strFolder, strErrmsg = "", message = "";

            try
            {
                string valID = "";

                foreach (string s in Request.Files)
                {
                    HttpPostedFile file = Request.Files[s];

                    int fileSizeInBytes = file.ContentLength;

                    string name = file.FileName;

                    string fileName = Path.GetFileName(name);

                    string NamewithoutExt = Path.GetFileNameWithoutExtension(name);

                    string fileExtension = "";

                    if (!string.IsNullOrEmpty(fileName))

                        fileExtension = Path.GetExtension(fileName);

                    //string newfilename = ValuationID + NamewithoutExt + fileExtension;
                    string newfilename = valID + NamewithoutExt;

                    filenamestring = newfilename;



                    string strFileExt = fileExtension;

                    int intFileSize = fileSizeInBytes;

                    //if (strFileExt != ".jpg" && strFileExt != ".JPG" && strFileExt != ".JPG" && strFileExt != ".png" && strFileExt != ".PNG")
                    //{
                    //    return "";
                    //}
                    //else
                    //{
                    Bitmap bmp = new Bitmap(file.InputStream);
                    using (MemoryStream m = new MemoryStream())
                    {
                        bmp.Save(m, bmp.RawFormat);
                        byte[] imageBytes = m.ToArray();
                        string base64String = Convert.ToBase64String(imageBytes);
                        //return base64String;
                        encodImg objencimg = new encodImg();
                        objencimg.image = base64String;
                        objencimg.name = newfilename;

                        Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5015");
                        var javaScriptSerializer = new JavaScriptSerializer();
                        string jsonString = javaScriptSerializer.Serialize(objencimg);
                        var client = new HttpClient();
                        client.BaseAddress = urlTemplate;
                        client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
                        client.Timeout = TimeSpan.FromMilliseconds(600000);
                        StringContent htpcontent = new StringContent(jsonString);
                        var response = client.PostAsync("", htpcontent).Result;
                        string resultContent = response.Content.ReadAsStringAsync().Result;
                        if (resultContent == "0")
                        {

                            Console.Write("Failed");
                        }
                        else {
                            Console.Write("Uploaded successfully");
                        }

                    }

                    //}
                }
                return filenamestring;
            }
            catch (Exception Ex)
            {
                throw Ex;
            }
        }

    }
}