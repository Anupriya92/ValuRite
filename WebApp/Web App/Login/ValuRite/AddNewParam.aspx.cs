using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net.Http;
using System.Text;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Configuration;

namespace Login
{
    public class paramdetails
    {
        public string ParamValue;
        public string ParamName;
        public string ParamID;
        public string ParentParamID;
        public string Editable;
        public string ParamStatus;
        public string Update;
        public string UserAccess;
    }
    public partial class AddNewParam : System.Web.UI.Page
    {
       
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static string GetParamParent()
        {
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString()+":6040");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/getparentparam");

            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            HttpResponseMessage response = client.GetAsync(urlTemplate).Result;
            string receiveStream = response.Content.ReadAsStringAsync().Result;
            return receiveStream;
        }

        [WebMethod]
        public static string GetParamdetailsonchange(string ParamID)
        {
            paramdetails prmdetails = new paramdetails();
            prmdetails.ParamID = ParamID;
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() +":6045");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/GetParamonchange");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(prmdetails);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }

        [WebMethod]
        public static string saveparamdetails(string ParamValue, string ParamID, string ParentParamID, string ParamName, string Editable,string Status,string Update,string UserAccess)
        {
            paramdetails prmdetails = new paramdetails();
            prmdetails.ParamName = ParamName;
            prmdetails.ParamID = ParamID;
            prmdetails.ParentParamID = ParentParamID;
            prmdetails.ParamValue = ParamValue;
            prmdetails.Editable = Editable;
            prmdetails.ParamStatus = Status;
            prmdetails.Update = Update;
            prmdetails.UserAccess = UserAccess;
            //Saveparamdetails
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":6046");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/Saveparamdetails");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(prmdetails);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }

        [WebMethod]
        public static string deleteparamdetails(string ParamID)
        {
            paramdetails prmdetails = new paramdetails();
            prmdetails.ParamID = ParamID;
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":6047");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/deleteparam");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(prmdetails);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }
    }
}