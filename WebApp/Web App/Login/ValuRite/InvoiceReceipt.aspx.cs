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

namespace Login
{
    public class InvoiceReceipt_to_file
    {

        public string LenderID;
        public string UserID;
    }

    public class InvoiceHistory
    {
        public string InvoiceID;
        public object InvoiceRecpt;
        public string UserID;
        public string TotalPaidAmount;
        public string AmountPending;
    }

    public class InvoiceReceipt
    {

        public string PaymentDescription;
        public string PaymentDate;
        public string AmountPaid;
        public string AmountPending;

        public string InvoiceID;
        public string UserID;
        public string LenderID;

    }

    public partial class Invoice_Receipt : System.Web.UI.Page
    {


        protected void Page_Load(object sender, EventArgs e)
        {
            GetInvoiceReceipt();
        }

        public void GetInvoiceReceipt()
        {
            try
            {
                Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/getInvoiceReceipt");
               // Uri urlTemplate = new Uri("http://localhost" + ":3000/getInvoiceReceipt");
                //GetUserlist
                Userlist usrdet = new Userlist();
                usrdet.UserID = Session["UserID"].ToString();
                usrdet.OrgType = Session["OrgType"].ToString();

                var javaScriptSerializer = new JavaScriptSerializer();
                string jsonString = javaScriptSerializer.Serialize(usrdet);
                var client = new HttpClient();
                client.BaseAddress = urlTemplate;

                client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
                client.Timeout = TimeSpan.FromMilliseconds(600000);
                StringContent htpcontent = new StringContent(jsonString, Encoding.UTF8, "application/json");
                var response = client.PostAsync("", htpcontent).Result;
                var receiveStream = response.Content.ReadAsStringAsync().Result;
                if (receiveStream == "0")
                {
                    Page.ClientScript.RegisterStartupScript(this.GetType(), "No Lenders", "bootbox.alert('No Data Available');", true);
                    Page.ClientScript.RegisterStartupScript(this.GetType(), "disable searchbutton", "$('#btngenfile').attr('disabled','disabled')", true);
                    //btngenfile
                }
                else {
                    JavaScriptSerializer js = new JavaScriptSerializer();
                    Userlist[] Params = js.Deserialize<Userlist[]>(receiveStream.ToString());
                    foreach (var param in Params)
                    {
                        string strtitle = "UserID : " + param.UserID + "<br />";
                        strtitle += "UserType : " + param.UserType + "<br />";
                        strtitle += "UserRole : " + param.UserRole + "<br />";
                        strtitle += "UserName : " + param.UserName + "<br />";
                        if (param.OrgType != "")
                        {
                            strtitle += "Organization : " + param.OrgType + "<br />";
                        }
                        if (param.ContactDetails.PhoneNo != "")
                        {
                            strtitle += "PhoneNo : " + param.ContactDetails.PhoneNo + "<br />";
                        }
                        strtitle += "MobileNo : " + param.ContactDetails.MobileNo + "<br />";
                        strtitle += "EmailID : " + param.ContactDetails.EmailID + "<br />";
                        strtitle += "AddressLine1 : " + param.Address.AddressLine1 + "<br />";
                        if (param.Address.AddressLine2 != "")
                        {
                            strtitle += "AddressLine2 : " + param.Address.AddressLine2 + "<br />";
                        }
                        if (param.Address.Landmark != "")
                        {
                            strtitle += "Landmark : " + param.Address.Landmark + "<br />";
                        }
                        strtitle += "Area : " + param.Address.AddArea + "<br />";
                        strtitle += "Country / State / City : " + param.Address.Country + " / " + param.Address.State + " / " + param.Address.City + "<br />";
                        strtitle += "Pincode : " + param.Address.Pincode + "<br />";

                        ListItem test = new ListItem { Text = param.UserName, Value = param.UserName };
                        test.Attributes.Add("title", strtitle);

                        ddllendlist.Items.Add(test);

                    }
                    Page.ClientScript.RegisterStartupScript(this.GetType(), "Lenderddl", " $('#ddllendlist').customselect({}); ", true);
                    Page.ClientScript.RegisterStartupScript(this.GetType(), "Lenderattr", " fncpyattr('ddllendlist'); ", true);

                }
            }


            catch (Exception ee)
            {
               Console.Write(ee);
            }

        }



        [WebMethod]
        public static string InvoiceReceiptfile(string LenderID)
        {
            InvoiceReceipt_to_file objexport = new InvoiceReceipt_to_file();
            objexport.LenderID = LenderID;
            objexport.UserID = HttpContext.Current.Session["UserID"].ToString();

            var javaScriptSerializer = new JavaScriptSerializer();
            string strjson = javaScriptSerializer.Serialize(objexport);
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":8040");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/InvoiceReceiptRetrieve");
           // Uri urlTemplate = new Uri("http://localhost" + ":3000/InvoiceReceiptRetrieve");
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
        public static string UpdateInvoiceReceipt(
            string AmountPaid, string AmountPending,
            string PaymentDate, string PaymentDescription,
            string InvoiceID,
            string UserID)
        {
            InvoiceReceipt objInvoiceReceipt = new InvoiceReceipt();

            objInvoiceReceipt.AmountPaid = AmountPaid;
            objInvoiceReceipt.AmountPending = AmountPending;
            objInvoiceReceipt.PaymentDate = PaymentDate;
            objInvoiceReceipt.PaymentDescription = PaymentDescription;

            objInvoiceReceipt.InvoiceID = InvoiceID;
            objInvoiceReceipt.UserID = UserID;


            var javaScriptSerializer = new JavaScriptSerializer();
            string strjson = javaScriptSerializer.Serialize(objInvoiceReceipt);
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/UpdateInvoiceReceipt");
            //Uri urlTemplate = new Uri("http://localhost" + ":3000/UpdateInvoiceReceipt");
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
        public static string SaveChildRows(string InvoiceID, object ReceiptHistory, string UserID, string TotalPaidAmount, string AmountPending)
        {

            InvoiceHistory objInvHist = new InvoiceHistory();
            objInvHist.InvoiceID = InvoiceID;
            objInvHist.InvoiceRecpt = ReceiptHistory;
            objInvHist.UserID = UserID;
            objInvHist.TotalPaidAmount = TotalPaidAmount;
            objInvHist.AmountPending = AmountPending;

            var javaScriptSerializer = new JavaScriptSerializer();
            string strjson = javaScriptSerializer.Serialize(objInvHist);
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/UpdateChildRows");
           // Uri urlTemplate = new Uri("http://localhost" + ":3000/UpdateChildRows");
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
        public static string EmailReceipt(
           string AmountPaid, string AmountPending,
           string PaymentDate,
           string InvoiceID,
           string UserID, string PaymentDescription, string LenderID)
        {
            InvoiceReceipt objInvoiceReceipt = new InvoiceReceipt();

            objInvoiceReceipt.AmountPaid = AmountPaid;
            objInvoiceReceipt.AmountPending = AmountPending;
            objInvoiceReceipt.PaymentDate = PaymentDate;
            objInvoiceReceipt.InvoiceID = InvoiceID;
            objInvoiceReceipt.UserID = UserID;
            objInvoiceReceipt.PaymentDescription = PaymentDescription;
            objInvoiceReceipt.LenderID = LenderID;

            var javaScriptSerializer = new JavaScriptSerializer();
            string strjson = javaScriptSerializer.Serialize(objInvoiceReceipt);
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/EmailInvoiceReceipt");
           // Uri urlTemplate = new Uri("http://localhost" + ":3000/EmailInvoiceReceipt");

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