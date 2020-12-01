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

namespace Login.ValuRite
{
    public class Outstanding
    {

        public string LenderName;
        public string InvoiceAmount;
        public string TotalReceivedAmount;
        public string AmountPending;
        public string days30;
        public string days60;
        public string days90;
        public string days90gr;

    }
    public partial class AgingReport : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static string getOutstanding(string UserID)
        {
            RaiseInvoice_to_file objexport = new RaiseInvoice_to_file();
            objexport.UserID = UserID;
            var javaScriptSerializer = new JavaScriptSerializer();
            string strjson = javaScriptSerializer.Serialize(objexport);
            //Uri urlTemplate = new Uri("http://192.168.1.208:3000/OutstandingReport");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/OutstandingReport");

            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result;
            return resultContent;
        }

        [WebMethod]
        public static string Outstanding(string LenderName, string InvoiceAmount, string TotalReceivedAmount,
            string AmountPending, string days30, string days60, string days90, string days90gr)
        {
            Outstanding objoutstanding = new Outstanding();
            objoutstanding.LenderName = LenderName;
            objoutstanding.InvoiceAmount = InvoiceAmount;
            objoutstanding.TotalReceivedAmount = TotalReceivedAmount;
            objoutstanding.AmountPending = AmountPending;
            objoutstanding.days30 = days30;
            objoutstanding.days60 = days60;
            objoutstanding.days90 = days90;
            objoutstanding.days90gr = days90gr;

            var javaScriptSerializer = new JavaScriptSerializer();
            string strjson = javaScriptSerializer.Serialize(objoutstanding);
            //Uri urlTemplate = new Uri("http://192.168.1.208:3000/GenerateOutstanding");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/GenerateOutstanding");

            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result;
            return resultContent;
        }

        [WebMethod]
        public static string Exceloutstanding(string LenderName, string InvoiceAmount, string TotalReceivedAmount,
         string AmountPending, string days30, string days60, string days90, string days90gr)
        {
            Outstanding objoutstanding = new Outstanding();
            objoutstanding.LenderName = LenderName;
            objoutstanding.InvoiceAmount = InvoiceAmount;
            objoutstanding.TotalReceivedAmount = TotalReceivedAmount;
            objoutstanding.AmountPending = AmountPending;
            objoutstanding.days30 = days30;
            objoutstanding.days60 = days60;
            objoutstanding.days90 = days90;
            objoutstanding.days90gr = days90gr;

            var javaScriptSerializer = new JavaScriptSerializer();
            string strjson = javaScriptSerializer.Serialize(objoutstanding);
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":3000/template");
            //Uri urlTemplate = new Uri("http://192.168.1.208:3000/ExcelOutstanding");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/ExcelOutstanding");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result;
            return resultContent;
        }


    }

}
