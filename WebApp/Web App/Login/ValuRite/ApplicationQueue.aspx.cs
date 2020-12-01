using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Login
{
    public class IntervalTimer
    {
        public string user;
        public string sessionID;
        public string type;
    }
    public partial class ApplicationQueue1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string firstname = Request.QueryString["SessionID"];
            if (Session["LogTimer"] == null)
            {
                ScriptManager.RegisterStartupScript(this, this.GetType(), System.Guid.NewGuid().ToString(), "myFunction()", true);
                Session["LogTimer"] = "set";
            }
        }
        // [WebMethod]
        //public static string UserSession(string user, string sessionID, string type)
        //{
        //    IntervalTimer obj = new IntervalTimer();
        //    obj.user = user;
        //    obj.sessionID = sessionID;
        //    obj.type = type;
        //    Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/LoggedInSession");
        //    var client = new HttpClient();
        //    client.BaseAddress = urlTemplate;
        //    client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
        //    client.Timeout = TimeSpan.FromMilliseconds(600000);
        //    JavaScriptSerializer js = new JavaScriptSerializer();
        //    string strjson = js.Serialize(obj);
        //    StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
        //    var response = client.PostAsync("", htpcontent).Result;
        //    string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
        //    return resultContent;

        //}

        [WebMethod]
        public static object GetAppraisalDetails(string AppraiserID, string AppraisalStatus, string OrgType)
        {
            try
            {
                ApplicationQueue Objcreateuser = new ApplicationQueue();
                Objcreateuser.AppraiserID = AppraiserID;
                Objcreateuser.AppraisalStatus = AppraisalStatus;
                Objcreateuser.OrgType = OrgType;
                //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":6030");
                Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/GetQueueDetails");
                //GetQueueDetails
                var client = new HttpClient();
                client.BaseAddress = urlTemplate;
                client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
                client.Timeout = TimeSpan.FromMilliseconds(600000);
                JavaScriptSerializer js = new JavaScriptSerializer();
                ApplicationQueue ApplicationQueue = new ApplicationQueue();
                ApplicationQueue.Address = null;
                ApplicationQueue.Location = null;
                string strjson = js.Serialize(Objcreateuser);
                StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
                var response = client.PostAsync("", htpcontent).Result;
                string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
                IList<ApplicationQueue> AppQueue = js.Deserialize<IList<ApplicationQueue>>(resultContent);
                Console.Write(AppQueue.Count);

                //Sending property ID to get property details
                //Uri urltemp = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5005");
                Uri urltemp = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/getProperty");
                var htpclient = new HttpClient();
                htpclient.BaseAddress = urltemp;
                htpclient.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
                htpclient.Timeout = TimeSpan.FromMilliseconds(600000);
                ApplicationQueue appque = new ApplicationQueue();
                for (int i = 0; i < AppQueue.Count; i++)
                {
                    appque.PropertyID = AppQueue[i].PropertyID;
                    appque.AppraiserID = AppQueue[i].AppraiserID;
                    appque.BorrowerID = AppQueue[i].BorrowerID;

                    JavaScriptSerializer javascript = new JavaScriptSerializer();
                    string json = javascript.Serialize(appque);
                    StringContent httpcontent = new StringContent(json, Encoding.UTF8, "application/json");
                    var resp = htpclient.PostAsync("", httpcontent).Result;
                    string resultcont = resp.Content.ReadAsStringAsync().Result.ToString();
                    var PropQueue = js.Deserialize<Propertyloc>(resultcont);
                    AppQueue[i].Address = PropQueue.Address;
                    AppQueue[i].Location = PropQueue.Location;
                    AppQueue[i].PropertyType = PropQueue.PropertyType;
                    AppQueue[i].BorrowerName = PropQueue.BorrowerName;
                }
                return AppQueue;
            }

            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return ex;
            }
        }
        [WebMethod]
        public static object GetChartOverview(string UserID, string Usertype, string OrgType)
        {
            try
            {
                Userlist Objcreateuser = new Userlist();

                Objcreateuser.OrgType = OrgType;

                var checkusertype = Usertype;
                if (checkusertype == "Lender")
                {
                    Objcreateuser.LenderID = UserID;
                    Objcreateuser.AppraiserID = "";
                }
                else
                {
                    Objcreateuser.AppraiserID = UserID;
                    Objcreateuser.LenderID = "";
                }

                // Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5004");
               Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/GenerateQueuePage");
               // Uri urlTemplate = new Uri("http://localhost" + ":3000/GenerateQueuePage");
                // GenerateQueuePage
                var client = new HttpClient();
                client.BaseAddress = urlTemplate;
                client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
                client.Timeout = TimeSpan.FromMilliseconds(600000);
                JavaScriptSerializer js = new JavaScriptSerializer();
                ApplicationQueue ApplicationQueue = new ApplicationQueue();
                ApplicationQueue.Address = null;
                ApplicationQueue.Location = null;
                string strjson = js.Serialize(Objcreateuser);
                StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
                var response = client.PostAsync("", htpcontent).Result;
                string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
                IList<ApplicationQueue> AppQueue = js.Deserialize<IList<ApplicationQueue>>(resultContent);
                Console.Write(AppQueue.Count);
                return AppQueue;
            }

            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return ex;
            }
        }


        [WebMethod]
        public static string UpdateStatus(string AppraisalStatus, string ValuationID)
        {

            ApplicationQueue apqueue = new ApplicationQueue();
            apqueue.AppraisalStatus = AppraisalStatus;
            apqueue.ValuationID = ValuationID;
            apqueue.UserID = HttpContext.Current.Session["UserID"].ToString();
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() +":5006");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/UpdateAppraisalStatus");
            //UpdateAppraisalStatus
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(apqueue);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }

        [WebMethod]
        public static object GetAppraisalDet(string AppraiserID, string AppStatus)
        {
            try
            {
                ApplicationQueue appqueue = new ApplicationQueue();
                appqueue.UserID = AppraiserID;
                appqueue.AppraisalStatus = AppStatus;
                //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() +":7025");
                Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/LenderQueue");

                var client = new HttpClient();
                client.BaseAddress = urlTemplate;
                client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
                client.Timeout = TimeSpan.FromMilliseconds(600000);
                JavaScriptSerializer js = new JavaScriptSerializer();
                string strjson = js.Serialize(appqueue);
                StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
                var response = client.PostAsync("", htpcontent).Result;
                string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
                //return resultContent;
                IList<ApplicationQueue> AppQueue = js.Deserialize<IList<ApplicationQueue>>(resultContent);
                Console.Write(AppQueue.Count);

                //Sending property ID to get property details
                //Uri urltemp = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() +":5005");
                Uri urltemp = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/getProperty");
                var htpclient = new HttpClient();
                htpclient.BaseAddress = urltemp;
                htpclient.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
                htpclient.Timeout = TimeSpan.FromMilliseconds(600000);
                ApplicationQueue appque = new ApplicationQueue();
                for (int i = 0; i < AppQueue.Count; i++)
                {
                    appque.PropertyID = AppQueue[i].PropertyID;
                    appque.AppraiserID = AppQueue[i].AppraiserID;
                    appque.BorrowerID = AppQueue[i].BorrowerID;
                    //   appque.BorrowerName

                    JavaScriptSerializer javascript = new JavaScriptSerializer();
                    string json = javascript.Serialize(appque);
                    StringContent httpcontent = new StringContent(json, Encoding.UTF8, "application/json");
                    var resp = htpclient.PostAsync("", httpcontent).Result;
                    string resultcont = resp.Content.ReadAsStringAsync().Result.ToString();
                    var PropQueue = js.Deserialize<Propertyloc>(resultcont);
                    AppQueue[i].Address = PropQueue.Address;
                    AppQueue[i].Location = PropQueue.Location;
                    AppQueue[i].PropertyType = PropQueue.PropertyType;
                    AppQueue[i].BorrowerName = PropQueue.BorrowerName;
                }
                return AppQueue;
            }
            catch (Exception exp)
            {
                return exp.Message;
            }
        }

        [WebMethod]
        public static object GetApprovedVal(string BorrowerID, string AppraiserID, string ValuationID)
        {
            try
            {
                ApplicationQueue getapprovedval = new ApplicationQueue();
                var getusetype = HttpContext.Current.Session["UserType"].ToString();
                if (getusetype == "Lender")
                {
                    getapprovedval.LenderID = HttpContext.Current.Session["UserID"].ToString();
                    getapprovedval.AppraiserID = "";
                }
                else {
                    getapprovedval.LenderID = "";
                    getapprovedval.AppraiserID = HttpContext.Current.Session["UserID"].ToString();
                }
                getapprovedval.BorrowerID = BorrowerID;
                getapprovedval.ValuationID = ValuationID;
                getapprovedval.OrgType = HttpContext.Current.Session["OrgType"].ToString();
                getapprovedval.UserType = HttpContext.Current.Session["UserType"].ToString();

                //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":8030");
                Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/getApprovedlist");
                ///getApprovedlist
                var client = new HttpClient();
                client.BaseAddress = urlTemplate;
                client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
                client.Timeout = TimeSpan.FromMilliseconds(600000);
                JavaScriptSerializer js = new JavaScriptSerializer();
                string strjson = js.Serialize(getapprovedval);
                StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
                var response = client.PostAsync("", htpcontent).Result;
                string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
                IList<ApplicationQueue> AppQueue = js.Deserialize<IList<ApplicationQueue>>(resultContent);
                Console.Write(AppQueue.Count);

                //Sending property ID to get property details
                //Uri urltemp = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5005");
                Uri urltemp = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/getProperty");
                var htpclient = new HttpClient();
                htpclient.BaseAddress = urltemp;
                htpclient.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
                htpclient.Timeout = TimeSpan.FromMilliseconds(600000);
                ApplicationQueue appque = new ApplicationQueue();
                for (int i = 0; i < AppQueue.Count; i++)
                {
                    appque.BorrowerID = AppQueue[i].BorrowerID;
                    appque.PropertyID = AppQueue[i].PropertyID;

                    JavaScriptSerializer javascript = new JavaScriptSerializer();
                    string json = javascript.Serialize(appque);
                    StringContent httpcontent = new StringContent(json, Encoding.UTF8, "application/json");
                    var resp = htpclient.PostAsync("", httpcontent).Result;
                    string resultcont = resp.Content.ReadAsStringAsync().Result.ToString();
                    var PropQueue = js.Deserialize<Propertyloc>(resultcont);
                    AppQueue[i].Address = PropQueue.Address;
                    AppQueue[i].Location = PropQueue.Location;
                    AppQueue[i].PropertyType = PropQueue.PropertyType;
                    AppQueue[i].BorrowerName = PropQueue.BorrowerName;
                }
                return AppQueue;
            }
            catch
            {
                return "0";
            }
        }

        [WebMethod]
        public static string GetApprovedBorrower()
        {

            ApplicationQueue getapprovedval = new ApplicationQueue();
            var getusetype = HttpContext.Current.Session["UserType"].ToString();
            if (getusetype == "Lender")
            {
                getapprovedval.LenderID = HttpContext.Current.Session["UserID"].ToString();
                getapprovedval.AppraiserID = "";
            }
            else {
                getapprovedval.LenderID = "";
                getapprovedval.AppraiserID = HttpContext.Current.Session["UserID"].ToString();
            }

            getapprovedval.OrgType = HttpContext.Current.Session["OrgType"].ToString();
            getapprovedval.UserType = HttpContext.Current.Session["UserType"].ToString();

            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":8031");
            Uri urltemp = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/getBorrower4App");
            var client = new HttpClient();
            client.BaseAddress = urltemp; 
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(getapprovedval);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }
    }
}