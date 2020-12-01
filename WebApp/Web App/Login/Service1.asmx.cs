using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Configuration;
using System.Web.Script.Serialization;
using System.Net.Http;
using System.Text;

namespace Login
{
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.None)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class Service1 : System.Web.Services.WebService
    {
        string Serveraddr = ConfigurationManager.AppSettings["ServerAddress"].ToString();

        [WebMethod]
        public string HelloWorld()
        {
            return "Hello World";
        }

        [WebMethod]
        public String LoginService(string UserID, string Password)
        {
            //JavaScriptSerializer js = new JavaScriptSerializer();
            //Console.Write(JsonString);
            //Uservalidation reqUserlogin = js.Deserialize<Uservalidation>(JsonString);
            Uservalidation Objuservalid = new Uservalidation();
            Objuservalid.strID = UserID;
            Objuservalid.ID = Password;
            Objuservalid.strPassword = Objuservalid.fn_encrypt(Password);
            //Uri urlTemplate = new Uri(Serveraddr + ":4000");

            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString()+"/pwdvalid");
            var javaScriptSerializer = new JavaScriptSerializer();
            string jsonString = javaScriptSerializer.Serialize(Objuservalid);
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            StringContent htpcontent = new StringContent(jsonString, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result;
            return resultContent;
        }


        [WebMethod]
        public String LoginJsonString(string JsonString)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            Console.Write(JsonString);
            Uservalidation reqUserlogin = js.Deserialize<Uservalidation>(JsonString);
            Uservalidation Objuservalid = new Uservalidation();
            Objuservalid.strID = reqUserlogin.strID;
            Objuservalid.ID = reqUserlogin.ID;
            Objuservalid.strPassword = Objuservalid.fn_encrypt(reqUserlogin.ID);
            //Uri urlTemplate = new Uri(Serveraddr + ":4000");

            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString()+"/pwdvalid");
            var javaScriptSerializer = new JavaScriptSerializer();
            string jsonString = javaScriptSerializer.Serialize(Objuservalid);
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            StringContent htpcontent = new StringContent(jsonString, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result;
            return resultContent;
        }

        [WebMethod]
        public String PasswordUpdate(string JsonString)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            Uservalidation reqPwdUpdate = js.Deserialize<Uservalidation>(JsonString);
            Uservalidation Objcreateuser = new Uservalidation();
            Objcreateuser.strID = reqPwdUpdate.strID;
            Objcreateuser.newPassword = Objcreateuser.fn_encrypt(reqPwdUpdate.newPassword);
            Objcreateuser.securityQuestion = reqPwdUpdate.securityQuestion;
            Objcreateuser.securityAnswer = reqPwdUpdate.securityAnswer;

            //Uri urlTemplate = new Uri(Serveraddr + ":5002");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString()+"/newpassvalid");

            var javaScriptSerializer = new JavaScriptSerializer();
            string jsonString = javaScriptSerializer.Serialize(Objcreateuser);
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            StringContent htpcontent = new StringContent(jsonString, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result;
            return resultContent;
        }

        [WebMethod]
        public String Userregistration(string JsonString)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            createuser reqcreateuser = js.Deserialize<createuser>(JsonString);

            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5000");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString()+"/regpage");
            var javaScriptSerializer = new JavaScriptSerializer();
            string strjson = javaScriptSerializer.Serialize(reqcreateuser);
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
