using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Services;
using System.Configuration;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Login.ValuRite
{
    public partial class Subscription : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
        }

        [WebMethod]
        public static string GetAppraiserList()
        {
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString()+":6040");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/GetSelfRegisteredUsers");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            HttpResponseMessage response = client.GetAsync(urlTemplate).Result;
            string receiveStream = response.Content.ReadAsStringAsync().Result;
            return receiveStream;
        }

    }
}