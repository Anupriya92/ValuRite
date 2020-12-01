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

    public class forgotpassword
    {
        public string UserID;
        public string mailID;
        public string SecurityQuestion;
        public string SecurityAnswer;
        private object iv;
        private object key;
    }

    public partial class ForgotPassword : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static string CheckUserExists(string UserID)
        {

            forgotpassword Objcreateuser = new forgotpassword();
            Objcreateuser.UserID = UserID;
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/ForgetPassword");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(Objcreateuser);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }
    }
}