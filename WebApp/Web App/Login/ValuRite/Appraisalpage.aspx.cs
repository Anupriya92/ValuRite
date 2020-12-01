using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using System.Text;
using System.Configuration;

namespace Login
{

    public class PropertyDetails
    {
        public string UserID { get; set; }
        public int PropertyID { get; set; }
        public string ApproverID { get; set; }
        public string AppraiserID { get; set; }
        public string ValuationID { get; set; }
        public string PropertyType { get; set; }
        public string ProjectSiteName { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string Landmark { get; set; }
        public string AddArea { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string Pincode { get; set; }
        public string LocationType { get; set; }
        public string BorrowerID { get; set; }
        public string Username { get; set; }
        public string Unit { get; set; }
        public string LandExtent { get; set; }
        public string SurroundedBy { get; set; }
        public string RoadWidth { get; set; }
        public string FootageDetails { get; set; }
        public string FootageReason { get; set; }
        public string LenderID { get; set; }
        public string StreetName { get; set; }
        public string DoorNumber { get; set; }
        public string RoadName { get; set; }
       public string latlng { get; set; }
        public string Reassign { get; set; }
        public string TemplateName { get; set; }
        public string ValuationPurpose { get; set; }
        public string UserRole { get; set; }
      //  public string mapDataURL { get; set; }
    }

    public class Userlist
    {
        public string _id { get; set; }
        public string UserID { get; set; }
        public string LenderID { get; set; }
        public string AppraiserID { get; set; }
        public string UserType { get; set; }
        public string UserName { get; set; }
        public string UserRole { get; set; }
        public Passworddetails PasswordDetails { get; set; }
        public Contactdetails ContactDetails { get; set; }
        public Address Address { get; set; }
        public string CreatedByUserid { get; set; }
        public string LastUpdDate { get; set; }
        public string status { get; set; }
        public string OrgType { get; set; }
        public string CompanyName { get; set; }
    }

    public class Passworddetails
    {
        public string Password { get; set; }
        public string PasswordQuestion { get; set; }
        public string PasswordAnswer { get; set; }
    }

    public class Contactdetails
    {
        public string PhoneNo { get; set; }
        public string MobileNo { get; set; }
        public string EmailID { get; set; }
    }

    public class Address
    {
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string Landmark { get; set; }
        public string AddArea { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string Pincode { get; set; }
    }

    public class Param
    {
        public string Unit;

    }

    public class AdminParam
    {
        public string UserID { get; set; }
    }

    public partial class Appraisalpage : System.Web.UI.Page
    {

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        //Save Property details
        [WebMethod]
        public static string Propertysave(/*string latlng, */string RoadName, string DoorNumber, string UserID, string PropertyType, 
            string ProjectSiteName, string AddArea, string Landmark, string Pincode, string Country,
            string State, string City, string LocationType, string LandExtent, string StreetName, 
            string SurroundedBy, string RoadWidth, string FootageDetails, string FootageReason,
            string PropertyID, string Unit)
        {

            PropertyDetails Objpropertydetails = new PropertyDetails();
            Objpropertydetails.UserID = UserID;
            Objpropertydetails.PropertyType = PropertyType;
            Objpropertydetails.ProjectSiteName = ProjectSiteName;
            Objpropertydetails.AddArea = AddArea;
            Objpropertydetails.Landmark = Landmark;
            Objpropertydetails.Pincode = Pincode;
            Objpropertydetails.Country = Country;
            Objpropertydetails.State = State;
            Objpropertydetails.City = City;
            Objpropertydetails.LocationType = LocationType;
            Objpropertydetails.LandExtent = LandExtent;
            Objpropertydetails.SurroundedBy = SurroundedBy;
            Objpropertydetails.RoadWidth = RoadWidth;
            Objpropertydetails.FootageDetails = FootageDetails;
            Objpropertydetails.FootageReason = FootageReason;
            Objpropertydetails.Unit = Unit;
            Objpropertydetails.DoorNumber = DoorNumber;
            Objpropertydetails.StreetName = StreetName;
            Objpropertydetails.RoadName = RoadName;
            Objpropertydetails.latlng = "";
        //    Objpropertydetails.ValuationPurpose = ValuationPurpose;

            Uri urlTemplate;
            if (!PropertyID.Equals(""))
            {
                Objpropertydetails.PropertyID = Convert.ToInt32(PropertyID);
                //urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5008");
                urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/UpdateLocationDetails");
                // urlTemplate = new Uri("http://localhost" + ":3000/UpdateLocationDetails");
                //UpdateLocationDetails
            }
            else {
                //Objpropertydetails.PropertyID = Convert.ToInt32(PropertyID);
                // urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":6003");
                urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/savePropertydetails");
                //savePropertydetails
            }
            var javaScriptSerializer = new JavaScriptSerializer();
            string jsonString = javaScriptSerializer.Serialize(Objpropertydetails);
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            StringContent htpcontent = new StringContent(jsonString, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result;
            return resultContent;
        }

        [WebMethod]
        public static string GetCountry()
        {
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5001");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/GetParamDetails");
          // Uri urlTemplate = new Uri("http://localhost" + ":3000/GetParamDetails");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            HttpResponseMessage response = client.GetAsync(urlTemplate).Result;
            string receiveStream = response.Content.ReadAsStringAsync().Result;
            return receiveStream;
        }

        [WebMethod]
        public static string GetUnits(string Unit)
        {
            Param objparam = new Param();
            objparam.Unit = Unit;
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":6021");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/GenericParamDetails");
           // Uri urlTemplate = new Uri("http://localhost" + ":3000/GenericParamDetails");
            var client = new HttpClient();
            var javaScriptSerializer = new JavaScriptSerializer();
            string jsonString = javaScriptSerializer.Serialize(objparam);
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            StringContent htpcontent = new StringContent(jsonString, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result;
            return resultContent;
        }

        [WebMethod]
        public static string GetAdminUserDetails(string UserID)
        {
            AdminParam objAdminparam = new AdminParam();
            //objAdminparam.Unit = Unit;
            objAdminparam.UserID = UserID;
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":6021");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/GetAdminDropGeneral");
            // Uri urlTemplate = new Uri("http://localhost" + ":3000/GenericParamDetails");
            var client = new HttpClient();
            var javaScriptSerializer = new JavaScriptSerializer();
            string jsonString = javaScriptSerializer.Serialize(objAdminparam);
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            StringContent htpcontent = new StringContent(jsonString, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result;
            return resultContent;
        }


    }
}