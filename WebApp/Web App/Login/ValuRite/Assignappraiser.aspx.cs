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

namespace Login
{
    public class RejApplist
    {
        public object PropList;
    }
    public partial class Assignappraiser : System.Web.UI.Page
    {

        string responsejson = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            Page.ClientScript.RegisterStartupScript(this.GetType(), "GetAppraiserddl", "var obj = $('#chkshowrejlist');fnloadproplist($(obj).get(0));", true);
            GetUserlist();
        }


        public void GetUserlist()
        {
            try
            {
                //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5003");
                Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/GetUserlist");
                //GetUserlist
                Userlist usrdet = new Userlist();
                usrdet.UserID = Session["UserID"].ToString();
                usrdet.UserType = Session["UserType"].ToString();
                usrdet.UserRole = Session["UserRole"].ToString();
                usrdet.CompanyName = Session["CompName"].ToString();
                usrdet.UserName = Session["UserName"].ToString();

                var javaScriptSerializer = new JavaScriptSerializer();
                string jsonString = javaScriptSerializer.Serialize(usrdet);
                var client = new HttpClient();
                client.BaseAddress = urlTemplate;

                client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
                client.Timeout = TimeSpan.FromMilliseconds(600000);
                StringContent htpcontent = new StringContent(jsonString, Encoding.UTF8, "application/json");
                var response = client.PostAsync("", htpcontent).Result;
                var receiveStream = response.Content.ReadAsStringAsync();
                responsejson = receiveStream.Result;
                if (responsejson != "0")
                {
                    populatedropdown();
                }
                else {
                    Nodata(0, 0, 0);
                }
            }

            catch (Exception ex)
            {
                Trace.Write(ex.Message);
            }
        }

        public void populatedropdown()
        {
            try
            {
                JavaScriptSerializer js = new JavaScriptSerializer();
                Userlist[] Params = js.Deserialize<Userlist[]>(responsejson.ToString());
                int borrowercount = 0;
                int lendercount = 0;
                int appraisercount = 0;
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

                    if (param.UserType.Equals("Borrower"))
                    {
                        borrowercount = 1;
                        Console.WriteLine(param.UserID);
                        ListItem test = new ListItem { Text = param.UserName, Value = param.UserName };
                        test.Attributes.Add("title", strtitle);
                        ddlborrowerlist.Items.Add(test);
                    }
                    else if (param.UserType.Equals("Lender"))
                    {
                        lendercount = 1;
                        Console.WriteLine(param.UserID);
                        ListItem Lenderddl = new ListItem { Text = param.UserName, Value = param.UserName };
                        Lenderddl.Attributes.Add("title", strtitle);
                        ddllenderlist.Items.Add(Lenderddl);
                    }
                    else
                    {
                        appraisercount = 1;
                        ListItem test = new ListItem { Text = param.UserName, Value = param.UserName };
                        test.Attributes.Add("title", strtitle);
                        ddlAppraiserlist.Items.Add(test);
                    //      if (param.OrgType.Equals("Company"))
                    //      {
                    //    if (param.UserRole.Equals("Comp with lender"))
                    //        {
                    //            ListItem test = new ListItem { Text = param.CompanyName, Value = param.UserID + "," + param.OrgType };
                    //            test.Attributes.Add("title", strtitle);
                    //            ddlAppraiserlist.Items.Add(test);
                    //        }
                    //    }
                    //    else if (param.OrgType.Equals("Individual"))
                    //   {
                    //        if (param.UserRole.Equals("Ind with lender"))
                    //        {
                    //            ListItem test = new ListItem { Text = param.UserName, Value = param.UserID + "," + param.OrgType };
                    //            test.Attributes.Add("title", strtitle);
                    //            ddlAppraiserlist.Items.Add(test);
                    //        }
                    //        else if (param.UserRole.Equals("User"))
                    //        {
                    //            ListItem test = new ListItem { Text = param.UserName, Value = param.UserID + "," + param.OrgType };
                    //            test.Attributes.Add("title", strtitle);
                    //            ddlAppraiserlist.Items.Add(test);
                    //        }
                    //    }
                    }
                }
                Nodata(borrowercount, lendercount, appraisercount);
            }
            catch (Exception exp)
            {
                Console.WriteLine(exp.Message);
            }
        }

        public void Nodata(int borrowercount, int lendercount, int appraisercount) {

            if (borrowercount == 0)
            {
                ListItem test = new ListItem { Text = "-No Borrower Found-", Value = "none" };
                test.Attributes.Add("title", "-No Borrower Found-");
                ddlborrowerlist.Items.Add(test);
            }
            if (lendercount == 0)
            {
                ListItem test = new ListItem { Text = "-No Lender Found-", Value = "none" };
                test.Attributes.Add("title", "-No Lender Found-");
                ddllenderlist.Items.Add(test);
            }
            if (appraisercount == 0)
            {
                ListItem test = new ListItem { Text = "-No Appraiser Found-", Value = "none" };
                test.Attributes.Add("title", "-No Appraiser Found-");
                ddlAppraiserlist.Items.Add(test);
            }

            Page.ClientScript.RegisterStartupScript(this.GetType(), "Borrowerddl", " $('#ddlborrowerlist').customselect({}); ", true);
            Page.ClientScript.RegisterStartupScript(this.GetType(), "borrowerattr", " fncpyattr('ddlborrowerlist'); ", true);
            //Page.ClientScript.RegisterStartupScript(this.GetType(), "adding title borrowerlist", "var $select = $('#ddlborrowerlist > option');$('#ddlborrowerlist').closest('div.custom-select').attr('id', 'myddldivborrowerlist');$('#myddldivborrowerlist').find('ul').each(function() {optlist = $select;$(this).find('li').each(function() {if ($(this).text() == 'Select Borrower') {$(this).attr('title', 'Select Borrower');optlist = optlist.next('option');}else {$(this).attr('title', optlist.attr('title'));optlist = optlist.next('option');}});$('#myddldivborrowerlist li.active').tooltips();$('div.tooltip').css('text-align', 'left')});", true);
            Page.ClientScript.RegisterStartupScript(this.GetType(), "Appraiserddl", " $('#ddlAppraiserlist').customselect({}); ", true);
            Page.ClientScript.RegisterStartupScript(this.GetType(), "appraiserattr", " fncpyattr('ddlAppraiserlist'); ", true);
            Page.ClientScript.RegisterStartupScript(this.GetType(), "Lenderddl", " $('#ddllenderlist').customselect({}); ", true);
            Page.ClientScript.RegisterStartupScript(this.GetType(), "lenderattr", " fncpyattr('ddllenderlist'); ", true);

        }

        //Load property Details
        [System.Web.Services.WebMethod]
        public static string GetValuation()
        {
            try
            {
                Valid_User objgetvaluation = new Valid_User();
                objgetvaluation.UserID = HttpContext.Current.Session["UserID"].ToString();
                //objgetvaluation.BorrowerID = ID;
                var javaScriptSerializer = new JavaScriptSerializer();
                string strjson = javaScriptSerializer.Serialize(objgetvaluation);
                //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5021");
                Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/GetPropertyDesc");
                //GetPropertyDesc
                var client = new HttpClient();
                client.BaseAddress = urlTemplate;
                client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
                client.Timeout = TimeSpan.FromMilliseconds(600000);
                StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
                var response = client.PostAsync("", htpcontent).Result;
                string resultContent = response.Content.ReadAsStringAsync().Result;
                return resultContent;
            }
            catch (Exception exp)
            {
                Console.Write(exp.Message);
                return exp.Message;
            }
        }

        //Load Rejected Valuation List
        [System.Web.Services.WebMethod]
        public static string GetRejValuationList(string Rejapp)
        {
            try
            {
                Console.Write(Rejapp);
                Valid_User objgetvaluation = new Valid_User();
                objgetvaluation.ValuationID = Rejapp;
                objgetvaluation.UserID = HttpContext.Current.Session["UserID"].ToString();
                objgetvaluation.Organization = HttpContext.Current.Session["OrgType"].ToString();
                var javaScriptSerializer = new JavaScriptSerializer();
                string strjson = javaScriptSerializer.Serialize(objgetvaluation);
                //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":8021");
                Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/GetRejectValuationList");
                var client = new HttpClient();
                client.BaseAddress = urlTemplate;
                client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
                client.Timeout = TimeSpan.FromMilliseconds(600000);
                StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
                var response = client.PostAsync("", htpcontent).Result;
                string resultContent = response.Content.ReadAsStringAsync().Result;
                return resultContent;
            }
            catch (Exception exp)
            {
                Console.Write(exp.Message);
                return exp.Message;
            }
        }

        //Get rejected property list
        [System.Web.Services.WebMethod]
        public static string GetRejApp(object propid)
        {
            Console.Write(propid);
            Console.Write(propid);
            RejApplist objrejapp = new RejApplist();
            objrejapp.PropList = propid;
            Console.Write(objrejapp.PropList);
            var javaScriptSerializer = new JavaScriptSerializer();
            string strjson = javaScriptSerializer.Serialize(objrejapp);
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":7005");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/GetRejectedProp");
            //GetRejectedProp
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result;
            return resultContent;
        }


        [System.Web.Services.WebMethod]
        public static string GetApproverRecords(string UserID)
        {
            Console.Write(UserID);
            Valid_User objgetvaluation = new Valid_User();
            objgetvaluation.UserID = UserID;
            //objgetvaluation.BorrowerID = ID;
            var javaScriptSerializer = new JavaScriptSerializer();
            string strjson = javaScriptSerializer.Serialize(objgetvaluation);
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":8022");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/GetApproverRecords");
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":3000/GetApproverRecordsWEB");
            //GetApproverRecords
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result;
            return resultContent;
            //return "";
        }


        //Create new Valuation
        [System.Web.Services.WebMethod]
        public static string CreateAppraisal(string AppraiserID, int PropertyID, string UserID, string BorrowerID, string ValuationID, string ApproverID, string LenderID)
        {
            try
            {
                PropertyDetails Objcreateuser = new PropertyDetails();
                Objcreateuser.BorrowerID = BorrowerID;
                Objcreateuser.AppraiserID = AppraiserID;
                Objcreateuser.PropertyID = PropertyID;
                Objcreateuser.ApproverID = ApproverID;
                Objcreateuser.UserID = UserID;
                Objcreateuser.ValuationID = ValuationID;
                Objcreateuser.LenderID = LenderID;
                // Objcreateuser.UserRole = HttpContext.Current.Session["UserRole"].ToString();
                Objcreateuser.UserRole = "User";
                 var javaScriptSerializer = new JavaScriptSerializer();
                string strjson = javaScriptSerializer.Serialize(Objcreateuser);
                //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":7777");
                Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/CreateAppraisalNew");
                //CreateAppraisalNew
                var client = new HttpClient();
                client.BaseAddress = urlTemplate;
                client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
                client.Timeout = TimeSpan.FromMilliseconds(600000);
                StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
                var response = client.PostAsync("", htpcontent).Result;
                string resultContent = response.Content.ReadAsStringAsync().Result;
                return resultContent;
            }
            catch (Exception exp)
            {
                Console.Write(exp.Message);
                return exp.Message;
            }
        }

        //Create new Valuation
        [System.Web.Services.WebMethod]
        public static string CreateAppr(string ValuationID, string AppraiserID, string Reassign)
        {
            try
            {
                PropertyDetails Objcreateuser = new PropertyDetails();
                Objcreateuser.AppraiserID = AppraiserID;
                Objcreateuser.UserID = HttpContext.Current.Session["UserID"].ToString();
                Objcreateuser.ValuationID = ValuationID;
                Objcreateuser.Reassign = Reassign;
                var javaScriptSerializer = new JavaScriptSerializer();
                string strjson = javaScriptSerializer.Serialize(Objcreateuser);
                //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":8088");
                Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/CreateAppraisalByAppr");
                //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":3000/CreateAppraisalByApprWEB");
                //CreateAppraisalByAppr
                var client = new HttpClient();
                client.BaseAddress = urlTemplate;
                client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
                client.Timeout = TimeSpan.FromMilliseconds(600000);
                StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
                var response = client.PostAsync("", htpcontent).Result;
                string resultContent = response.Content.ReadAsStringAsync().Result;
                return resultContent;
            }
            catch (Exception exp)
            {
                Console.Write(exp.Message);
                return exp.Message;

            }
        }
    }
}