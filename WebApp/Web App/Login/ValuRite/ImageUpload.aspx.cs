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
using System.Text;

public class encodImg
{

    public string image;
    public string name;
    public string extension;

}

namespace Login
{
    public partial class ImageUpload : System.Web.UI.Page
    {
        string ValuationID = string.Empty;
        string filenamestring = string.Empty;
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (Session["ValuationID"].ToString() != "")
                {
                    ValuationID = Session["ValuationID"].ToString();
                }
                UploadFile();
                //ScriptManager.RegisterStartupScript(this.Page, this.Page.GetType(), "err_msg", "sendImagename();", true);

            }
            catch (Exception exp)
            {
                Console.Write(exp);
            }
        }
        public static void Auditlog(string message)
        {
            try
            {
                string outputPath = "";
                outputPath = System.Configuration.ConfigurationManager.AppSettings.Get("LogPath").ToString();
                string fileName = "AuditLog.txt";
                if (!System.IO.Directory.Exists(outputPath))
                {
                    System.IO.Directory.CreateDirectory(outputPath);
                }
                string sourceFile = System.IO.Path.Combine(outputPath, fileName);

                if (!System.IO.File.Exists(sourceFile))
                {
                    System.IO.File.Create(sourceFile).Dispose();
                }
                using (System.IO.StreamWriter writer = new System.IO.StreamWriter(sourceFile, true))
                {
                    writer.WriteLine(DateTime.Now.ToString("yyyy:MM:dd HH:mm:ss:fff") + " - " + message);
                }
            }
            catch (Exception ex)
            {

            }
        }
        protected string UploadFile()
        {
            string strFile, strFolder, strErrmsg = "", message = "";

            try
            {
                string valID = ValuationID;

                Auditlog("Upload function call:" + valID);
                foreach (string s in Request.Files)
                {
                    HttpPostedFile file = Request.Files[s];

                    int fileSizeInBytes = file.ContentLength;

                    string name = file.FileName;

                    string fileName = Path.GetFileName(name);

                    string NamewithoutExt = Path.GetFileNameWithoutExtension(name);

                    string fileExtension = "";

                    if (!string.IsNullOrEmpty(fileName)) { }

                        fileExtension = Path.GetExtension(fileName);
                    
                    //string newfilename = ValuationID + NamewithoutExt + fileExtension;
                    //newfilename = ValuationID + NamewithoutExt;
                    string newfilename = HttpContext.Current.Request.Form["fileName"];
                    newfilename = ValuationID+newfilename;

                    string strFileExt = fileExtension;

                    int intFileSize = fileSizeInBytes;

                    System.IO.Stream fs = file.InputStream;
                    System.IO.BinaryReader br = new System.IO.BinaryReader(fs);
                    Byte[] bytes = br.ReadBytes((Int32)fs.Length);
                    string base64String = Convert.ToBase64String(bytes, 0, bytes.Length);



                    encodImg objencimg = new encodImg();
                    objencimg.image = base64String;
                    objencimg.name = newfilename;
                    objencimg.extension = fileExtension;

                    Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/ImageUpload");
                    //Uri urlTemplate = new Uri("http://localhost" + ":3000/ImageUpload");
                    //ImageUpload
                    Auditlog("Upload function newfilename:" + newfilename);
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
                        Auditlog("Upload function Failed");
                        Console.Write("Failed");

                    }
                    else
                    {
                        Auditlog("Upload function successfully");
                        Console.Write("Uploaded successfully");
                    }





                    // Byte[] bytes = File.ReadAllBytes("path");
                    //String file = Convert.ToBase64String(bytes);

                    //Bitmap bmp = new Bitmap(file.InputStream);
                    //using (MemoryStream m = new MemoryStream())
                    ////using (FileStream file = new FileStream("file.bin", FileMode.Create, System.IO.FileAccess.Write)) 
                    //{
                    //    bmp.Save(m, bmp.RawFormat);
                    //    byte[] imageBytes = m.ToArray();
                    //    string base64String = Convert.ToBase64String(imageBytes);
                    //    //return base64String;
                    //    encodImg objencimg = new encodImg();
                    //    objencimg.image = base64String;
                    //    objencimg.name = newfilename;

                    //    Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/ImageUpload");
                    //    //Uri urlTemplate = new Uri("http://localhost" + ":3000/ImageUpload");
                    //    //ImageUpload
                    //    Auditlog("Upload function newfilename:" + newfilename);
                    //    var javaScriptSerializer = new JavaScriptSerializer();
                    //    string jsonString = javaScriptSerializer.Serialize(objencimg);
                    //    var client = new HttpClient();
                    //    client.BaseAddress = urlTemplate;
                    //    client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
                    //    client.Timeout = TimeSpan.FromMilliseconds(600000);
                    //    StringContent htpcontent = new StringContent(jsonString, Encoding.UTF8, "application/json");
                    //    var response = client.PostAsync("", htpcontent).Result;
                    //    string resultContent = response.Content.ReadAsStringAsync().Result;
                    //    if (resultContent == "0")
                    //    {
                    //        Auditlog("Upload function Failed");
                    //        Console.Write("Failed");

                    //    }
                    //    else
                    //    {
                    //        Auditlog("Upload function successfully");
                    //        Console.Write("Uploaded successfully");
                    //    }
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