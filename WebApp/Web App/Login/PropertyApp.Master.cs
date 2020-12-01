using System;
using System.Web.UI;
using System.Web.Routing;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.Collections;
using System.Web.Services;
using System.Web.Helpers;
using System.IO;
using System.Net;
using System.Configuration;
using System.Web.WebPages;
using System.Net.Http;
using System.Configuration;
using System.Web.Script.Serialization;
using System.Text;
using System.Timers;

//using System.Threading;

namespace Login1
{
    public partial class PropertyApp : System.Web.UI.MasterPage
    {
        public class IntervalTimer
        {
            public string UserID;
            public string sessionID;
            public string type;
        }
        public class sessionData
        {
            public string userid;
            public string sessionid;
        }
        System.Timers.Timer time = null;
        //Timer _timer = null;
        double interval = Double.Parse(ConfigurationManager.AppSettings["timeoutduration"]);
    

        private void time_elapsed(object sender, ElapsedEventArgs e)
        {
            UserSession();
        }


        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {

                //string json;
                //var repsonse = Request.CreateResponse(HttpStatusCode.Moved);


                //using (var reader = new StreamReader(Request.InputStream))
                //{
                // json = reader.ReadToEnd();
                //}
                //var person = Json.Decode(json);
                //var userType = person.role;
                //Label2.Text = userType;
                //var sessionId = person.sessionID;
                //Response.Redirect("https://www.google.com/", true);
                // Response.Redirect("~/ValuRite/ApplicationQueue.aspx");
                //Console.WriteLine("Name : " + person.role);
                // Console.WriteLine("Teamname : " + person.session_Id);

                // var response = Request.CreateResponse(HttpStatusCode.Moved);
                // response.Headers.Location = new Uri("http://www.abcmvc.com");
                // return response;

                // MessageBox.Show("Data inserted successfully");
                // Page.ClientScript.RegisterStartupScript(this.GetType(), "Session Time Out", "alert('"+ person.role+ "')", true);
                // var keys = HttpContext.Current.Request.QueryString["firstname"];
                // var keyss = HttpContext.Current.Request.Params.AllKeys[0];
                // for (int i = 0; i < keys.Length; i++)
                // {
                //Response.Write(keys[i] + ": " + Request.Form[keys[i]] + "<br>");
                // }
                // var ss = Request.Querytring("ids")
                /* Session["UserType"] = "Appraiser";
                Session["UserID"] = "kiran1@";
                Session["UserRole"] = "User";
                Session["status"] = "true";
                Session["UserName"] = "Kiran Raja";
                Session["OrgType"] = "Individual";
                Session["Uploadmage"] = null;
                Session["forpass"] = "false";
                Session["hdnpwdupdate"] = "true"; */
                // For Self Registration
                //Getting the user details and stored in session
                if (Request.QueryString["usertype"] != null)
                {
                    sessionData data = new sessionData();
                    Session["UserType"] = Request.QueryString["usertype"];
                    Session["UserID"] = Request.QueryString["userId"];
                    Session["UserName"] = Request.QueryString["firstname"];
                    Session["EmailId"] = Request.QueryString["username"];
                    Session["CompName"] = Request.QueryString["companyName"];
                    Session["forpass"] = "false";
                    Session["status"] = "true";
                    Session["UserRole"] = Request.QueryString["role"];
                    Session["Uploadmage"] = null;
                    Session["OrgType"] = Request.QueryString["OrgType"];
                    Session["hdnpwdupdate"] = "true";
                    Session["SessionID"] = Request.QueryString["sessionid"];
                    data.sessionid = Session["SessionID"].ToString();
                    data.userid = Session["UserID"].ToString();
                    var today = DateTime.Today.ToString();
                    var date = new Date();
                    Session["idle session time"] = today + data.sessionid;
                    
                     UserSession();

                    time = new System.Timers.Timer(interval);
                    time.AutoReset = true;
                    time.Enabled = true;
                    time.Start();
                    time.Elapsed += new ElapsedEventHandler(time_elapsed);


                }
                // Session["SessionId"] = Request.QueryString["sessionid"];
                /// var username = Request.QueryString["username"];
                // var sessionid = Request.QueryString["sessionid"];
                // var rolename = Request.QueryString["role"];
                // var userid = Request.QueryString["userid"];
                // Label2.Text = username + sessionid + rolename + userid;

                if (Session["forpass"].ToString() == "false" /*&& Session["NewRegistration"].ToString() == "false"*/)
                {

                    if (Session["UserName"].ToString() != "" || Session["UserName"].ToString() != null)
                    {
                        // Page.ClientScript.RegisterStartupScript(this.idlesession(), "CallMyFunction", "MyFunction()", true);
                        //idlesession ()
                        lblusername.InnerHtml = "Hi " + Session["UserName"].ToString();
                        lblCompName.InnerHtml = Session["CompName"].ToString();
                        var ServerAddress = Session["ServAddr"];
                        var ImageFolder = Session["FolderPath"];
                        var Imagename = Session["Uploadmage"];

                        if (Imagename == null)
                        {
                            //var imagepath = ServerAddress + "/" + ImageFolder + "/" + Imagename + ".jpg";
                            Image8.ImageUrl = ResolveUrl("http://localhost/Data/logo.png");
                        }
                        else
                        {
                            var imagepath = ServerAddress + "/" + ImageFolder + "/" + Imagename + ".jpg";
                            Image8.ImageUrl = imagepath;
                        }

                    }
                }
                else
                {
                    lblusername.InnerHtml = "";
                    lblCompName.InnerHtml = "";
                    Image8.ImageUrl = ResolveUrl("http://localhost/Data/logo.png");
                }
            }
            catch (Exception ex)
            {
                //  sessionData data = new sessionData();
                var url = ConfigurationManager.AppSettings["localPort"];
                Response.Redirect(url + "?idleSession=kill&userID=");
            }
        }


  
        public void UserSession()
        {
            IntervalTimer obj = new IntervalTimer();
            obj.UserID = Session["EmailId"].ToString();
            obj.sessionID = Session["SessionID"].ToString();
            obj.type = "sessionupdate";
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/logout");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(obj);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();

            if (resultContent == "Valid")
            {
                Console.WriteLine("Session Logged In");
            }
            else
            {
                ScriptManager.RegisterStartupScript(this, this.GetType(), System.Guid.NewGuid().ToString(), "fnclearsession()", true);
            }

            //var javaScriptSerializer = new JavaScriptSerializer();
            //string jsonString = javaScriptSerializer.Serialize(usrdet);
            //var client = new HttpClient();
            //client.BaseAddress = urlTemplate;

            //client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            //client.Timeout = TimeSpan.FromMilliseconds(600000);
            //StringContent htpcontent = new StringContent(jsonString, Encoding.UTF8, "application/json");
            //var response = client.PostAsync("", htpcontent).Result;
            //var receiveStream = response.Content.ReadAsStringAsync().Result;
            // return resultContent;
        }


    }

    internal class Date
    {
        public Date()
        {
        }
    }
}