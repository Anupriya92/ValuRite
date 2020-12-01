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
using System.Net;
using System.Configuration;
namespace Login
{
    public class Appraisaldetail
    {

        public int PropertyID;
        public string AppraisalStatus;
        public string ValuationID;
        public string UserID;
        public string OrgType;
        public string EmailID;
        public string EmailContent;
        public string EmailSubject;
        public string UserRole;
        HiddenField hdnEnc;
    }
    public partial class PreviewPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                try
                {
                    if (Request.QueryString["ValID"] != null)
                    {

                        string PDFID = Request.QueryString["ValID"].ToString();
                        showpdf(PDFID);
                    }
                    else {
                        string valid;
                        if (Session["ValuationID"] == null)
                        {
                            valid = Session["TempValuation"].ToString();
                        }
                        else {
                            valid = Session["ValuationID"].ToString();
                        }
                        showpdf(valid);

                    }

                }
                catch (Exception exp)
                {
                    Trace.Write(exp.Message);
                }
            }
        }
        [WebMethod]
        //in Amenities details section
        public static string SubmitAppraisal(string ValuationID)
        {
            Appraisaldetail Submitappraisal = new Appraisaldetail();

            Submitappraisal.ValuationID = ValuationID;
            Submitappraisal.UserID = HttpContext.Current.Session["UserID"].ToString();
            Submitappraisal.OrgType = HttpContext.Current.Session["OrgType"].ToString();
            Submitappraisal.UserRole= HttpContext.Current.Session["UserRole"].ToString();
            
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5022");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/ChangeStatusSubmit");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(Submitappraisal);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }

        [WebMethod]
        public static string SendEmail(string ValuationID, string EmailID, string EmailContent, string EmailSubject)
        {
            Appraisaldetail Submitappraisal = new Appraisaldetail();
            Submitappraisal.ValuationID = ValuationID;
            Submitappraisal.EmailID = EmailID;
            Submitappraisal.EmailContent = EmailContent;
            Submitappraisal.EmailSubject = EmailSubject;
            
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/ChangeStatusSubmit");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(Submitappraisal);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }
       // public string Getpdf(params string[] MapEcn) //params string[] MapEcn added by Anupriya
        public string Getpdf() //params string[] MapEcn added by Anupriya
        {
            PropertyDetails objPreviewdetails = new PropertyDetails();
            objPreviewdetails.ValuationID = Session["ValuationID"].ToString();
            objPreviewdetails.PropertyID = Convert.ToInt32(Session["PropertyID"]);
            objPreviewdetails.BorrowerID = Session["BorrowerID"].ToString();
            objPreviewdetails.AppraiserID = Session["UserID"].ToString();
            objPreviewdetails.LenderID = Session["LenderID"].ToString(); // added feb 05 2019
            objPreviewdetails.PropertyType = Session["PropertyType"].ToString();// added feb 05 2019
            objPreviewdetails.TemplateName = "Template1";
          //  objPreviewdetails.mapDataURL = MapEcn[0].ToString();//Added by Anupriya
            var javaScriptSerializer = new JavaScriptSerializer();
            string strjson = javaScriptSerializer.Serialize(objPreviewdetails);
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5040");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/CreatePDF");
            //Uri urlTemplate = new Uri("http://localhost" + ":3000/CreatePDF");
            //CreatePDF
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result;
            return resultContent;
        }
        public void showpdf(string valuationID)
        {
            try
            {
                //string a = Session["ServAddr"].ToString();
                //string b = Session["FolderPath"].ToString();
                //string path = @"" + Session["ServAddr"].ToString() + "/"+Session["FolderPath"].ToString() + "/" + valuationID + ".pdf";
                //string path = ConfigurationManager.AppSettings["Serverimgpath"].ToString() + valuationID + ".pdf";
                string path = "http://49.207.182.154" + "/" + "Data" + "/" + valuationID + ".pdf";
                //string path = "http://192.168.1.203" + "/" + "Data" + "/" + valuationID + ".pdf";
                // string path = @"" + HttpContext.Current.Session["ServAddr"].ToString() + "/" + Session["FolderPath"].ToString() + "/" + valuationID + ".pdf";
                WebClient client = new WebClient();
                Byte[] buffer = buffer = client.DownloadData(path);
                if (buffer != null)
                {
                    Response.ContentType = "application/pdf";
                    Response.AddHeader("content-length", buffer.Length.ToString());
                    Response.BinaryWrite(buffer);
                }

            }
            catch (Exception exp)
            {
                Console.WriteLine(exp);
            }
        }
    }
}