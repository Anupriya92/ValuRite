using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net;
using System.IO;
namespace Login
{
    public class Export_to_file {
        public string fromdate;
        public string todate;
        public string ftype;
        public string UserID;
    }

    public partial class Export_Import : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

 [WebMethod]
        public static string Exportfile(string fromdate, string todate, string ftype)
        {
            Export_to_file objexport = new Export_to_file();
            objexport.fromdate = fromdate;
            objexport.todate = todate;
            objexport.ftype = ftype;
            objexport.UserID = HttpContext.Current.Session["UserID"].ToString();
            var javaScriptSerializer = new JavaScriptSerializer();
            string strjson = javaScriptSerializer.Serialize(objexport);
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":8040");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/Exportfile");
            //Exportfile
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json"); 
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result;
            return resultContent;
        }

       // protected void Button1_Click(object sender, EventArgs e)
      //   {

       //     string dirPath = ConfigurationManager.AppSettings["NewServerAddress"].ToString() + "//Data";

        //    string filePath = "http://localhost//Data//2019-06-01_To_2019-07-04_kiran1@_600.csv";
            //filePath = Path.Combine(dirPath, "2019-06-01_To_2019-07-04_kiran1@_600.csv");
           // if (File.Exists(filePath))
          //  {
        //        Response.AppendHeader("Content-Disposition", "attachment;filename=2019-06-01_To_2019-07-04_kiran1@_600.csv");
        //        Response.TransmitFile(filePath);
        //        Response.End();
           // }

       // }
    }
}