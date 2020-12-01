using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;


namespace Login.ValuRite
{
    public class EmailDetails
    {

        public string ApproverEmail;
        public string ApproverID;
        public string EmailContent;
        public string Subject;

    }


    public partial class sendEmail : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            //var a = Request.QueryString["ValuationID"];

            if (Request.QueryString["ValuationID"] != null)
            {
                GetApproverEmail(Request.QueryString["ValuationID"]);
                Session["ValuationID"] = Request.QueryString["ValuationID"].ToString();
            }
            else {
                GetApproverEmail(Session["ValuationID"].ToString());
            }

        }


        public void GetApproverEmail(string ValuationID = "")
        {
            PricingDetails Pricedetails = new PricingDetails();

            if (ValuationID == "")
            {
                ValuationID = HttpContext.Current.Session["ValuationID"].ToString();
            }

            Pricedetails.ValuationID = ValuationID;
            Pricedetails.UserID = HttpContext.Current.Session["UserID"].ToString();
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5012");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/GetApproverMailDetails");
            //Uri urlTemplate = new Uri("http://localhost" + ":3000/GetApproverMailDetails");
            //PricingDetailsSave
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(Pricedetails);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();

            EmailDetails EmailDet = js.Deserialize<EmailDetails>(resultContent);
            txtsenderEmail.Value = EmailDet.ApproverEmail.ToString();
            txtemailContent.Value = EmailDet.EmailContent.ToString();
            txtsubjectEmail.Value = EmailDet.Subject.ToString();

        }
    }
}