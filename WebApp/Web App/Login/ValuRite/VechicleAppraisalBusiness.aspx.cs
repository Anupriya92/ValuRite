using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;

namespace Login.ValuRite
{
    public partial class VechicleAppraisalBusiness : System.Web.UI.Page
    {

        protected void Page_Load(object sender, EventArgs e)
        {

        }
        public class businessdetails
        {
            public string vecHirer;
            public string vecBusiaddress;
            public string vecFaxno;
            public string vecCellno;
            public string vecAssetvalue;
            public string vecBusiyears;
            public string vecOwnrented;
            public string vecActivitylevel;
            public string vecNoofemp;
            public string vecMajorcust;
            public string vecLocality;
            public string vecInterior;
            public string vecFurnish;
            public string vecNeglist;
            public string vecWatchlist;
            public string vecRemarks;
            public string vecBusiname;
            public string vecLandline;
            public string vecLandmark;
            public string vecVechicletype;
            public string vecAmtfin;
            public string vecPresentyears;
            public string vecMonthlyrent;
            public string vecTurnover;
            public string vecMachinery;
            public string vecMajorsuppliers;
            public string vecExterior;
            public string vecAutomationfax;
            public string vecRepossesion;
            public string vecBusiasses;
            public string Type;
        }


        [WebMethod]
        public static string vechicleBusiSaveDetails(string vecHirer, string vecBusiaddress, string vecFaxno, string vecCellno, string vecAssetvalue, string vecBusiyears, string vecOwnrented, string vecActivitylevel, string vecNoofemp, string vecMajorcust, string vecLocality, string vecInterior, string vecFurnish, string vecNeglist, string vecWatchlist, string vecRemarks, string vecBusiname, string vecLandline, string vecLandmark, string vecVechicletype, string vecAmtfin, string vecPresentyears, string vecMonthlyrent, string vecTurnover, string vecMachinery, string vecMajorsuppliers, string vecExterior, string vecAutomationfax, string vecRepossesion, string vecBusiasses, string Type)
        {
            //Creating Object to store new User details..
            businessdetails Objcreateuser = new businessdetails();
            Objcreateuser.vecHirer = vecHirer;
            Objcreateuser.vecBusiaddress = vecBusiaddress;
            Objcreateuser.vecFaxno = vecFaxno;
            Objcreateuser.vecCellno = vecCellno;
            Objcreateuser.vecAssetvalue = vecAssetvalue;
            Objcreateuser.vecBusiyears = vecBusiyears;
            Objcreateuser.vecOwnrented = vecOwnrented;
            Objcreateuser.vecActivitylevel = vecActivitylevel;
            Objcreateuser.vecNoofemp = vecNoofemp;
            Objcreateuser.vecMajorcust = vecMajorcust;
            Objcreateuser.vecLocality = vecLocality;
            Objcreateuser.vecInterior = vecInterior;
            Objcreateuser.vecFurnish = vecFurnish;
            Objcreateuser.vecNeglist = vecNeglist;
            Objcreateuser.vecWatchlist = vecWatchlist;
            Objcreateuser.vecRemarks = vecRemarks;
            Objcreateuser.vecBusiname = vecBusiname;
            Objcreateuser.vecLandline = vecLandline;
            Objcreateuser.vecLandmark = vecLandmark;
            Objcreateuser.vecVechicletype = vecVechicletype;
            Objcreateuser.vecAmtfin = vecAmtfin;
            Objcreateuser.vecPresentyears = vecPresentyears;
            Objcreateuser.vecMonthlyrent = vecMonthlyrent;
            Objcreateuser.vecTurnover = vecTurnover;
            Objcreateuser.vecMachinery = vecMachinery;
            Objcreateuser.vecMajorsuppliers = vecMajorsuppliers;
            Objcreateuser.vecExterior = vecExterior;
            Objcreateuser.vecAutomationfax = vecAutomationfax;
            Objcreateuser.vecRepossesion = vecRepossesion;
            Objcreateuser.vecBusiasses = vecBusiasses;
            Objcreateuser.Type = Type;

            try
            {
                //WebReference.Service1 obj = new WebReference.Service1();
                //var result = obj.Userregistration(strjson);
                //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":3000/regpage");
                Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/BusinessVehicle");
               // Uri urlTemplate = new Uri("http://localhost" + ":3000/BusinessVehicle");
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
            }
            catch (Exception exp)
            {
                return exp.ToString();
            }
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

    }
}