using Login;
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
    public class Invoice_to_file
    {
        public string fromdate;
        public string todate;
        public string UserID;
        public string LenderID;
        public string OrgType;
    }
    public class RaiseInvoice_to_file
    {
        public string UserID;
        public string LenderID;
        public string InvoiceAmt;
        public string ValuationID;
        public string Amount;
       // public string InvoiceAmount;
    }
    public class EmailInvoice
    {
        public string LenderID;
        public string InvoiceNo;
        public string UserID;
    }

    public partial class Invoice_retrieve : System.Web.UI.Page
    {

        protected void Page_Load(object sender, EventArgs e)
        {
            GetLenderlist();
            //Invoiceretri();


        }


        public void GetLenderlist()
        {
            try
            {
                //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5003");
                Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/getLenderlist");
              // Uri urlTemplate = new Uri("http://localhost" + ":3000/getLenderlist");
                //GetUserlist
                Userlist usrdet = new Userlist();
                usrdet.UserID = Session["UserID"].ToString();
                usrdet.UserType = Session["UserType"].ToString();
                usrdet.OrgType = Session["OrgType"].ToString();
                usrdet.UserRole = Session["UserRole"].ToString();

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
                    Page.ClientScript.RegisterStartupScript(this.GetType(), "No Lenders", "bootbox.alert('No data Available');$('#ddllenderlist').attr('disabled', 'disabled');$('#btngenfile').attr('disabled', 'disabled');$('#txtstartdate').attr('disabled', 'disabled');$('#txtenddate').attr('disabled', 'disabled');$('#Raisebutton').attr('disabled', 'disabled')", true);
                }
                else
                {

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

                        ListItem test = new ListItem { Text = param.UserName, Value = param.UserID };
                        test.Attributes.Add("title", strtitle);
                        ddllenderlist.Items.Add(test);

                    }
                   // Page.ClientScript.RegisterStartupScript(this.GetType(), "Lenderddl", "$('#ddllenderlist').customselect({});", true);
                   // Page.ClientScript.RegisterStartupScript(this.GetType(), "Lenderattr", " fncpyattr('ddllenderlist'); ", true);
                }
            }


            catch (Exception ee)
            {
                
                Console.Write(ee);
            }

        }


        [WebMethod]
        public static string RaiseInvoicefile(string InvoiceAmt, string LenderID, string ValuationID,string Amount)
         {
            RaiseInvoice_to_file objexport = new RaiseInvoice_to_file();
            objexport.InvoiceAmt = InvoiceAmt;
            objexport.LenderID = LenderID;
            objexport.ValuationID = ValuationID;
            objexport.Amount = Amount;

            objexport.UserID = HttpContext.Current.Session["UserID"].ToString();
            var javaScriptSerializer = new JavaScriptSerializer();
            string strjson = javaScriptSerializer.Serialize(objexport);
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":8040");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/RaiseInvoice");
           // Uri urlTemplate = new Uri("http://localhost" + ":3000/RaiseInvoice");
          
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
        public static string Invoicefile(string fromdate, string todate, string LenderID)
        {
            Invoice_to_file objexport = new Invoice_to_file();
            objexport.fromdate = fromdate;
            objexport.todate = todate;
            objexport.LenderID = LenderID;
            objexport.OrgType = HttpContext.Current.Session["OrgType"].ToString(); ;
            objexport.UserID = HttpContext.Current.Session["UserID"].ToString();
            var javaScriptSerializer = new JavaScriptSerializer();
            string strjson = javaScriptSerializer.Serialize(objexport);
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":8040");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/Invoiceretrieve");
           // Uri urlTemplate = new Uri("http://localhost" + ":3000/Invoiceretrieve");
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
        public static string EmailInvoice(string LenderID, string InvoiceNo, string UserID)
        {
            EmailInvoice objexport = new EmailInvoice();
            objexport.LenderID = LenderID;
            objexport.InvoiceNo = InvoiceNo;
            objexport.UserID = HttpContext.Current.Session["UserID"].ToString();


            var javaScriptSerializer = new JavaScriptSerializer();
            string strjson = javaScriptSerializer.Serialize(objexport);
          //  Uri urlTemplate = new Uri("http://localhost" + ":3000/EmailInvoice");
           // Uri urlTemplate = new Uri("http://192.168.2.208:3000/EmailInvoice");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/EmailInvoice");
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

