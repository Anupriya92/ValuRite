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
    public class userdetails
    {
        public string UserID;
        public string UserRole;
        public string UserType;
        public string UserName;
        public string PhoneNo;
        public string MobileNo;
        public string EmailID;
        public string AddressLine1;
        public string AddressLine2;
        public string AddArea;
        public string City;
        public string State;
        public string Country;
        public string Pincode;
        public string Landmark;
        public string UserStatus;
    }
    public partial class Userconfig : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static string Getuserlist()
        {
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/GetCompleteUserlist");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            HttpResponseMessage response = client.GetAsync(urlTemplate).Result;
            string receiveStream = response.Content.ReadAsStringAsync().Result;
            return receiveStream;
        }

        [WebMethod]
        public static string GetUserdetailsonchange(string UserID)
        {
            userdetails usrdetails = new userdetails();
            usrdetails.UserID = UserID;
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/Getuseronchange");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(usrdetails);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }

        [WebMethod]
        public static string deleteuserdetails(string UserID)
        {
            userdetails userdetails = new userdetails();
            userdetails.UserID = UserID;
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/Deleteuser");            //Deleteuser
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(userdetails);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }

        [WebMethod]
        public static string saveedituserdetails(string UserID, string UserRole, string UserType, string UserName, string PhoneNo,string MobileNo, string EmailID, string AddressLine1, string AddressLine2, string AddArea, string City, string State,string Country, string Pincode, string Landmark,string UserStatus)
        {
            userdetails userdetails = new userdetails();
            userdetails.UserID = UserID;
            userdetails.UserRole = UserRole;
            userdetails.UserType = UserType;
            userdetails.UserName = UserName;
            userdetails.PhoneNo = PhoneNo;
            userdetails.MobileNo = MobileNo;
            userdetails.EmailID = EmailID;
            userdetails.AddressLine1 = AddressLine1;
            userdetails.AddressLine2 = AddressLine2;
            userdetails.AddArea = AddArea;
            userdetails.City = City;
            userdetails.State = State;
            userdetails.Country = Country;
            userdetails.Pincode = Pincode;
            userdetails.Landmark = Landmark;
            userdetails.UserStatus = UserStatus;
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/SaveUserDetails");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(userdetails);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }
    }
}