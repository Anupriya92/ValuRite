using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Configuration;

namespace Login
{
    public class Updatepassword
    {
        public string UserID;
        public string Password;
    }
    public partial class updatepassword : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                // generatecaptcha();
            }
        }
        void generatecaptcha()
        {

        }

        protected void btnRefresh_Click(object sender, EventArgs e)
        {
            // generatecaptcha();

        }


        [WebMethod]
        public static string[] captcha()
        {
            try
            {
                Random random = new Random();
                string combination = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
                StringBuilder captcha = new StringBuilder();
                for (int i = 0; i < 5; i++)
                    captcha.Append(combination[random.Next(combination.Length)]);

                var captaval = captcha.ToString();
                var captchpath = "GenerateCaptcha.aspx?" + DateTime.Now.Ticks.ToString();
                HttpContext.Current.Session.Add("captch", captaval);


                string[] marks = new string[] { captaval, captchpath };

                return marks;
            }
            catch
            {

                throw;
            }
        }




        [WebMethod]
        public static string UpdatePassword(string UserID, string Password)
        {

            Updatepassword Objcreateuser = new Updatepassword();
            Objcreateuser.UserID = UserID;
            Objcreateuser.Password = Password;
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/UpdatePassword");
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