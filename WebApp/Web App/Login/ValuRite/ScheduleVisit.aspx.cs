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
    public class Schedule {
        public string ValuationID;
        public string VisitDate;
        public string RequiredDocs;
        public string ScheduleDescription;
        public string UserID;
        public string BorrowerName;
        public string BorrowerNo;
        public string BorrowerEmail;
        public string PropertyType;
        public string PropertyAddress;
        public string ScheduleID;
        public string RescheduleReason;
        public string UserName;
    }

    public partial class ScheduleVisit : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static string GetAssignedProperties(string UserID)
        {
            userdetails Propertyobj = new userdetails();
            Propertyobj.UserID = UserID;
            var javaScriptSerializer = new JavaScriptSerializer();
            string strjson = javaScriptSerializer.Serialize(Propertyobj);
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/GetAssignedProperty");

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
        public static string GetSchedulesProperties(string UserID)
        {
            userdetails Propertyobj = new userdetails();
            Propertyobj.UserID = UserID;
            var javaScriptSerializer = new JavaScriptSerializer();
            string strjson = javaScriptSerializer.Serialize(Propertyobj);
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/GetScheduledProperty");

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
        public static string CreateSchedule(string ValuationID,string VisitDate,string RequiredDocs,string ScheduleDescription,
            string BorrowerName,string BorrowerNo,string BorrowerEmail,string PropertyType,string PropertyAddress) {
            Schedule ScheduleObj = new Schedule();
            ScheduleObj.ValuationID = ValuationID;
            ScheduleObj.VisitDate = VisitDate;
            //ScheduleObj.VisitTime = VisitTime;
            ScheduleObj.RequiredDocs = RequiredDocs;
            ScheduleObj.ScheduleDescription = ScheduleDescription;

            ScheduleObj.BorrowerName = BorrowerName;
            ScheduleObj.BorrowerNo = BorrowerNo;
            ScheduleObj.BorrowerEmail = BorrowerEmail;
            ScheduleObj.PropertyType = PropertyType;
            ScheduleObj.PropertyAddress = PropertyAddress;
            ScheduleObj.UserName= HttpContext.Current.Session["UserName"].ToString();

            ScheduleObj.UserID = HttpContext.Current.Session["UserID"].ToString();

            var javaScriptSerializer = new JavaScriptSerializer();
            string strjson = javaScriptSerializer.Serialize(ScheduleObj);
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/CreateSchedule");

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
        public static string UpdateSchedule(string ValuationID, string VisitDate, string RequiredDocs, string ScheduleDescription,
            string BorrowerName, string BorrowerNo, string BorrowerEmail, string PropertyType, string PropertyAddress,string ScheduleID,string RescheduleReason)
        {
            Schedule ScheduleObj = new Schedule();
            ScheduleObj.ValuationID = ValuationID;
            ScheduleObj.VisitDate = VisitDate;
            ScheduleObj.RequiredDocs = RequiredDocs;
            ScheduleObj.ScheduleDescription = ScheduleDescription;

            ScheduleObj.BorrowerName = BorrowerName;
            ScheduleObj.BorrowerNo = BorrowerNo;
            ScheduleObj.BorrowerEmail = BorrowerEmail;
            ScheduleObj.PropertyType = PropertyType;
            ScheduleObj.PropertyAddress = PropertyAddress;
            ScheduleObj.ScheduleID = ScheduleID;
            ScheduleObj.RescheduleReason = RescheduleReason;

            ScheduleObj.UserName = HttpContext.Current.Session["UserName"].ToString();
            ScheduleObj.UserID = HttpContext.Current.Session["UserID"].ToString();

            var javaScriptSerializer = new JavaScriptSerializer();
            string strjson = javaScriptSerializer.Serialize(ScheduleObj);
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/Reschedule");

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