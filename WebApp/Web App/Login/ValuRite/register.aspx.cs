using System;
using System.Web.Script.Serialization;
using System.Net.Http;
using System.Web.UI;
using System.Text;
using System.Web.Services;
using System.Configuration;
using System.Web;
using System.Collections.Generic;
using System.Web.UI.WebControls;

namespace Login
{
    public class Params
    {
        //variables to store datas from Param table.
        public string _id { get; set; }
        public string ParamName { get; set; }
        public string ParamID { get; set; }
        public string ParentParamID { get; set; }
        public string ParamValue { get; set; }
        public string ModifiedBy { get; set; }
        public string ModifiedDate { get; set; }
        public string Access { get; set; }
    }

    public partial class register : System.Web.UI.Page
    {

        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (Page.IsPostBack == false)
                {

                    string strusertype = Request.QueryString["ddlusrtype"];
                    Session["ddlusrtype"] = strusertype;
                    lblnewuser.Text = strusertype + " Registration";

                    var paramid = "";

                    var result = register.loaddropdowns("0", "CustUserType", Session["UserType"].ToString());
                    var javaScriptSerializer = new JavaScriptSerializer();
                    if (result != "0")
                    {
                        IList<Params> ParamRows = javaScriptSerializer.Deserialize<IList<Params>>(result);

                        for (int i = 0; i < ParamRows.Count; i++)
                        {

                            if (ParamRows[i].ParamValue == strusertype)
                            {
                                paramid = ParamRows[i].ParamID;
                                break;
                            }

                        }
                    }
                    var result1 = register.loaddropdowns(paramid, "CustOrgType", Session["UserType"].ToString());
                    if (result1 != "0")
                    {
                        IList<Params> ParamRows1 = javaScriptSerializer.Deserialize<IList<Params>>(result1);


                        for (int i = 0; i < ParamRows1.Count; i++)
                        {
                            ListItem Orgtypeddl = new ListItem { Text = ParamRows1[i].ParamValue, Value = ParamRows1[i].ParamValue };
                            Orgtypeddl.Attributes.Add("pid", ParamRows1[i].ParamID);
                            ddlOrgType.Items.Add(Orgtypeddl);
                        }
                    }


                }
            }
            catch (Exception ex)
            {
                Trace.Write(ex.Message);
            }
        }


        [WebMethod]
        public static string loaddropdowns(string parentid, string paramname, string accesstype)
        {
            try
            {
                Valid_User objgetvaluation = new Valid_User();
                Params objparam = new Params();
                objparam.ParentParamID = parentid;
                objparam.ParamName = paramname;
                objparam.Access = accesstype;
                var javaScriptSerializer = new JavaScriptSerializer();
                string strjson = javaScriptSerializer.Serialize(objparam);
                Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/LoadRegPageDropdown");
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
                return "0";
            }
        }

        [WebMethod]
        public static string saveRegdetails(string strusrname, string strcompname, string strusrrole, string strusrtype, string strphno, string strmobno, string stremail, string strcountry, string strstate, string strcity, string strarea, string strlandmark, string straddr1, string straddr2, string strpincode, string struserid, string strorgtype, string struploading)
        {
            //Creating Object to store new User details..
             createuser Objcreateuser = new createuser();
            Objcreateuser.strusrname = strusrname;
            Objcreateuser.strusrrole = strusrrole;
            Objcreateuser.strusrtype = strusrtype;
            Objcreateuser.strphno = strphno;
            Objcreateuser.strmobno = strmobno;
            Objcreateuser.stremail = stremail;
            Objcreateuser.strcountry = strcountry;
            Objcreateuser.strstate = strstate;
            Objcreateuser.strcity = strcity;
            Objcreateuser.strarea = strarea;
            Objcreateuser.strlandmark = strlandmark;
            Objcreateuser.straddr1 = straddr1;
            Objcreateuser.straddr2 = straddr2;
            Objcreateuser.strpincode = strpincode;
            Objcreateuser.struserid = struserid;
            Objcreateuser.OrgType = strorgtype;
            Objcreateuser.strcompname = strcompname;
            Objcreateuser.struploading = struploading;
            Objcreateuser.UserID = HttpContext.Current.Session["UserID"].ToString();
            try
            {
                //WebReference.Service1 obj = new WebReference.Service1();
                //var result = obj.Userregistration(strjson);
                Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/regpage");
                var javaScriptSerializer = new JavaScriptSerializer();
                string strjson = javaScriptSerializer.Serialize(Objcreateuser);
                var client = new HttpClient();
                client.BaseAddress = urlTemplate;
                client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
                client.Timeout = TimeSpan.FromMilliseconds(600000);
                StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
                var response = client.PostAsync("", htpcontent).Result;
                string resultContent = response.Content.ReadAsStringAsync().Result;
                return resultContent;
                // return result;
            }
            catch (Exception exp)
            {
                return exp.ToString();
            }
        }


        public void Clearfields()
        {
            txtfirstname.Text = "";
            txtmidname.Text = "";
            txtlastname.Text = "";
            ddlusrrole.SelectedIndex = 0;
            txtmobile.Text = "";
            txtemail.Text = "";
            ddlcountry.SelectedIndex = 0;
            ddlstate.SelectedIndex = 0;
            ddlcity.SelectedIndex = 0;
            txtArea.Text = "";
            txtlandmark.Text = "";
            txtaddr1.Text = "";
            txtaddr2.Text = "";
            txtpincode.Text = "";
            txtusrid.Text = "";
            Txtcompname.Text = "";
        }
    }
}

