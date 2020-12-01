using System;
using System.Web.Script.Serialization;
using System.Net.Http;
using System.Text;
using System.Web.UI;
using System.Web.Security;
using System.Configuration;
using System.Web;
using System.Web.Services;
using System.Timers;
using System.IO;

namespace Login
{
    public partial class login : System.Web.UI.Page
    {
        string Serveraddr = ConfigurationManager.AppSettings["ServerAddress"].ToString();
        protected void Page_Load(object sender, EventArgs e)
        {
            //ScriptManager.RegisterStartupScript(this, this.GetType(), "key1", "alert('TEST');", true);
            if (!IsPostBack)
            {
                if (Session["UserID"] != null)
                {
                    if ((Session["UserType"].ToString() == "Appraiser" || Session["UserType"].ToString() == "Lender") && Session["hdnpwdupdate"].ToString() == "true")
                    {
                        Response.Redirect("~/ValuRite/ApplicationQueue.aspx");
                    }
                    else {
                        Response.Redirect("~/ValuRite/LandingPage.aspx");
                    }
                }
                else {
                    try
                    {
                        GetimageUrl();
                    }
                    catch
                    {
                        imglogo.Attributes["Alt"] = "No Image Availble";
                    }
                }
            }

        }

        public void GetimageUrl()
        {
            Param objparam = new Param();
            objparam.Unit = "Server,Folder";
            //Uri urlTemplate = new Uri(Serveraddr + ":6021");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/GenericParamDetails");
            var client = new HttpClient();
            var javaScriptSerializer = new JavaScriptSerializer();
            string jsonString = javaScriptSerializer.Serialize(objparam);
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json;charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            StringContent htpcontent = new StringContent(jsonString, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result;

            string imgpath = "";
            JavaScriptSerializer js = new JavaScriptSerializer();
            Params[] Params = js.Deserialize<Params[]>(resultContent.ToString());
            foreach (var param in Params)
            {
                if (param.ParamName.Equals("Server"))
                {
                    imgpath = param.ParamValue;
                     // Session["ServAddr"] = param.ParamValue;
                    Session["ServAddr"] = "http://192.168.1.110";
                    //Session["ServAddr"] = @"C:/inetpub/wwwroot/Data/Templates";
                }
            }
            foreach (var param in Params)
            {
                if (param.ParamName.Equals("Folder"))
                {
                    Session["FolderPath"] = param.ParamValue;
                    imgpath = imgpath + "/" + param.ParamValue;
                }
            }

            imglogo.Attributes["src"] = imgpath + "/ablogo.png";
            imglogo.Attributes["width"] = "80%";
        }


        [WebMethod(EnableSession = true)]
        public static void forgtSession(string forpass, string newReg)
        {
            HttpContext.Current.Session.Add("forpass", forpass);
            //For Self Registration
            //HttpContext.Current.Session.Add("NewRegistration", newReg);
            //HttpContext.Current.Session.Add("Anonymous", "1");
            //HttpContext.Current.Session.Add("UserType", "anonymous");
        }


        protected void btnlogReset_Click(object sender, EventArgs e)
        {
            txtpaswd.Text = "";
            txtusrid.Text = "";
        }
        public int randomNum;
        protected void btnsubmit_Click(object sender, EventArgs e)
        {
            try
            {
                //Added by Anupriya
                Random r = new Random();
                randomNum = r.Next();

                Uservalidation Objuservalid = new Uservalidation();
                Objuservalid.strID = txtusrid.Text;
                Objuservalid.ID = txtpaswd.Text;
                Objuservalid.strPassword = Objuservalid.fn_encrypt(txtpaswd.Text);
                Session["SessionID"]= randomNum.ToString();
                Objuservalid.sessionID = randomNum.ToString(); //Added by Anupriya

                Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/pwdvalid");
                var javaScriptSerializer = new JavaScriptSerializer();
                string jsonString = javaScriptSerializer.Serialize(Objuservalid);
                var client = new HttpClient();
                client.BaseAddress = urlTemplate;
                client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
                client.Timeout = TimeSpan.FromMilliseconds(600000);
                StringContent htpcontent = new StringContent(jsonString, Encoding.UTF8, "application/json");
                HttpResponseMessage response = client.PostAsync("", htpcontent).Result;

                string resultContent = response.Content.ReadAsStringAsync().Result;
                //ScriptManager.RegisterStartupScript(this, GetType(), "ScriptManager1", "alert('This pops up');", true);
                //ScriptManager.RegisterStartupScript(Page, this.GetType(), "DatePickerScript", "javascript:alert('Record is not updated');", true);
                Loginauthentication(resultContent);
                //Page.ClientScript.RegisterStartupScript(this.GetType(), "myscript", "alert('hello world!');");
            }
            catch (Exception exp)
            {
                if (((System.ComponentModel.Win32Exception)exp.InnerException.InnerException.InnerException).NativeErrorCode == 10061)
                {
                    hdnresp.Value = "Server is not available now, Contact admin";
                }
                else {
                    hdnresp.Value = "Error Occurred in the Server, Contact admin";
                }
            }
        }
        
        //private static System.Timers.Timer myTimer;
        public string usersession = "";
        public void Loginauthentication(string resultstr)
        {
            var page = "~/ValuRite/landingpage.aspx";
            if (resultstr.Equals("0"))
            {
                hdnresp.Value = "Invalid Credentials";
                //hdnIsvalidUser.Value = "0";
            }
            else {
                JavaScriptSerializer js = new JavaScriptSerializer();
                Console.Write(resultstr.ToString());
                Valid_User Objvalid_User = js.Deserialize<Valid_User>(resultstr.ToString());
                Session["UserStatus"] = Objvalid_User.UserStatus;

                if (Session["UserStatus"].ToString() == "InActive")
                {
                    hdnresp.Value = "User is not Active";
                    var message = hdnresp.Value;
                    //hdnIsvalidUser.Value = "0";
                }
                else {
                    
                    Session["UserType"] = Objvalid_User.UserType;
                    Session["UserID"] = Objvalid_User.UserID;
                    usersession = Session["UserID"].ToString();
                    Session["UserRole"] = Objvalid_User.UserRole;
                    Session["status"] = Objvalid_User.status;
                    Session["UserName"] = Objvalid_User.UserName;
                    Session["OrgType"] = Objvalid_User.Organization;
                    Session["Uploadmage"] = Objvalid_User.Imagename;
                    Session["forpass"] = "false";
                    //hdnIsvalidUser.Value = "1";
                   // string IsvalidUser = UserSession1(Objvalid_User.UserID, randomNum.ToString(), "check");

                    

                    //ScriptManager.RegisterStartupScript(this, this.GetType(), "key", "alertFunc();", true);
                    //ScriptManager.RegisterStartupScript(this, this.GetType(), "key11", "alert('TEST');", true);
                    //ScriptManager.RegisterStartupScript(this, GetType(), "ShowStat", "javascript:alert('Record is not updated');", true);
                    //ScriptManager.RegisterStartupScript(Page, this.GetType(), "DatePickerScript", "javascript:alert('Record is not updated');", true);

                    // System.Web.UI.ScriptManager.RegisterClientScriptBlock(Page, typeof(System.Web.UI.Page), "Script", "myFunction();", true);
                    //Page.ClientScript.RegisterStartupScript(this.GetType(),"alert", "myFunction();", true);
                    //myTimer = new System.Timers.Timer(1000);
                    //myTimer.Elapsed += OnTimedEvent;
                    //myTimer.AutoReset = true;
                    //myTimer.Enabled = true;
                    //myTimer.Stop();
                    //myTimer.Dispose();


                    // For Self Registration
                    //Session["NewRegistration"] = "false";
                    //Session["Anonymous"] = "0";
                    FormsAuthentication.SetAuthCookie(Objvalid_User.UserID, true);
                    string sKey = txtusrid.Text + txtpaswd.Text;
                    string sUser = Convert.ToString(Cache[sKey]);
                    FormsAuthentication.SetAuthCookie(sUser, true);
                    Session["user"] = txtusrid.Text + txtpaswd.Text;

                    if (Objvalid_User.status.Equals("false"))
                    {
                        Session["hdnpwdupdate"] = "false";
                        Response.Redirect(page, false);
                        Context.ApplicationInstance.CompleteRequest();
                    }
                    else {
                        Session["hdnpwdupdate"] = "true";

                        //ScriptManager.RegisterStartupScript(this, this.GetType(), System.Guid.NewGuid().ToString(), "alert('TEST');", true);

                        if (Objvalid_User.UserType == "Appraiser" || Objvalid_User.UserType == "Lender")
                        {
                            if (Objvalid_User.UserType == "Lender" && Objvalid_User.UserRole == "Admin")
                            {
                                Response.Redirect("~/ValuRite/UserConfig.aspx", false);
                                Context.ApplicationInstance.CompleteRequest();
                            }
                            else {
                                Response.Redirect("~/ValuRite/ApplicationQueue.aspx?SessionID="+ randomNum, false);
                                Context.ApplicationInstance.CompleteRequest();
                            }
                        }
                        else {
                            //Response.Redirect(page);
                            Response.Redirect(page, false);
                            Context.ApplicationInstance.CompleteRequest();
                        }
                    }
                }
            }
            txtpaswd.Text = "";
            txtusrid.Text = "";
        }
        private static void OnTimedEvent(Object source, ElapsedEventArgs e)
        {
            //UserSession();
        }
        /*public string UserSession1(string user, string sessionID, string type)
        {
            IntervalTimer obj = new IntervalTimer();
            //login objlogin = new login();
            obj.user = user;
            obj.sessionID = sessionID;
            obj.Type = type;
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/LoggedInSession");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(obj);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            //objlogin.Loginauthentication(resultContent);
            return resultContent;
            //Loginauthentication(resultContent);

        }*/

        /*public void Auditlog(string message)
        {
            //string outputPath = "";
            string fileName = @"D:\ValuRite Code Back\Auditlog\auditlog.txt";
            string sourceFile =fileName;
            using (StreamWriter writer = new StreamWriter(sourceFile, true))
            {
                writer.WriteLine(DateTime.Now.ToString("yyyy:MM:dd HH:mm:ss:fff") + " - " + message);
            }
        }*/
    }
}