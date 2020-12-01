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
    public partial class VehicleAppraisal : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        public class residencedetails
        {
            public string repRef;
            public string resAddr;
            public string telNo;
            public string maritalStatus;
            public string vehType;
            public string personCont;
            public string rent;
            public string relationshp;
            public string areaHouse;
            public string otherVeh;
            public string verifierObs;
            public string residence;
            public string interiorItemsNo;
            public string totalDurable;
            public string entryPermission;
            public string entryReasn;
            public string productMatch;
            public string negativeList;
            public string summaryVerify;
            public string construction;
            public string Easeloc;
            public string areaRange;
            public string stablilityDev;
            public string propDev;
            public string borrowerMeet;
            public string hirerName;
            public string landMark;
            public string age;
            public string asset;
            public string yearNo;
            public string OwnerShip;
            public string NameVerified;
            public string curResYr;
            public string inmate;
            public string park;
            public string locality;
            public string interior;
            public string gasConn;
            public string stdLiv;
            public string livingStyle;
            public string Easerep;
            public string mapResidence;
            public string customer;
            public string negativeProf;
            public string ResStatus;
            public string borrowerDev;
            public string noOfMembers;
            public string Type;

        }
        [WebMethod]
        public static string vechicleResiSaveDetails(string repRef, string resAddr, string telNo,
        string maritalStatus, string vehType, string personCont,
        string rent, string relationshp, string areaHouse,
        string otherVeh, string verifierObs, string residence,
        string interiorItemsNo, string totalDurable, string entryPermission,
        string entryReasn, string productMatch, string negativeList,
        string summaryVerify, string construction, string Easeloc,
        string areaRange, string stablilityDev, string propDev,
        string borrowerMeet, string hirerName, string landMark,
        string age, string asset, string yearNo,
        string OwnerShip, string NameVerified, string curResYr,
        string inmate, string park, string locality,
        string interior, string gasConn, string stdLiv,
        string livingStyle, string Easerep, string mapResidence,
        string customer, string negativeProf, string ResStatus,
        string borrowerDev, string noOfMembers, string Type)
        {
            //Creating Object to store new User details..
            residencedetails Objcreateuser = new residencedetails();
            Objcreateuser.repRef = repRef;
            Objcreateuser.resAddr = resAddr;
            Objcreateuser.telNo = telNo;
            Objcreateuser.maritalStatus = maritalStatus;
            Objcreateuser.vehType = vehType;
            Objcreateuser.personCont = personCont;
            Objcreateuser.rent = rent;
            Objcreateuser.relationshp = relationshp;
            Objcreateuser.areaHouse = areaHouse;
            Objcreateuser.otherVeh = otherVeh;
            Objcreateuser.verifierObs = verifierObs;
            Objcreateuser.residence = residence;
            Objcreateuser.interiorItemsNo = interiorItemsNo;
            Objcreateuser.totalDurable = totalDurable;
            Objcreateuser.entryPermission = entryPermission;
            Objcreateuser.entryReasn = entryReasn;
            Objcreateuser.productMatch = productMatch;
            Objcreateuser.negativeList = negativeList;
            Objcreateuser.summaryVerify = summaryVerify;
            Objcreateuser.construction = construction;
            Objcreateuser.Easeloc = Easeloc;
            Objcreateuser.areaRange = areaRange;
            Objcreateuser.stablilityDev = stablilityDev;
            Objcreateuser.propDev = propDev;
            Objcreateuser.borrowerMeet = borrowerMeet;
            Objcreateuser.hirerName = hirerName;
            Objcreateuser.landMark = landMark;
            Objcreateuser.age = age;
            Objcreateuser.asset = asset;
            Objcreateuser.yearNo = yearNo;
            Objcreateuser.OwnerShip = OwnerShip;
            Objcreateuser.NameVerified = NameVerified;
            Objcreateuser.curResYr = curResYr;
            Objcreateuser.inmate = inmate;
            Objcreateuser.park = park;
            Objcreateuser.locality = locality;
            Objcreateuser.interior = interior;
            Objcreateuser.gasConn = gasConn;
            Objcreateuser.stdLiv = stdLiv;
            Objcreateuser.livingStyle = livingStyle;
            Objcreateuser.mapResidence = mapResidence;
            Objcreateuser.customer = customer;
            Objcreateuser.negativeProf = negativeProf;
            Objcreateuser.ResStatus = ResStatus;
            Objcreateuser.borrowerDev = borrowerDev;
            Objcreateuser.noOfMembers = noOfMembers;
            Objcreateuser.Type = Type;
            try
            {

                //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":3000/regpage");
                Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/ResidenceVehicle");
               // Uri urlTemplate = new Uri("http://localhost" + ":3000/ResidenceVehicle");
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
        public static string Getresidence()
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

        public void Clearfields()
        {


            txtRefNo.Text = "";
            txtresaddr.Text = "";
            txttelenum.Text = "";
            txtmartialstatus.Text = "";
            txtvechtype.Text = "";
            txtpersoncont.Text = "";
            txtmnthlyrent.Text = "";
            txtrelationship.Text = "";
            txtareaofhouse.Text = "";
            txtothervehicle.Text = "";
            txtverifierobs.Text = "";
            txtinterioritems.Text = "";
            txtdurable.Text = "";
            txtentryperm.Text = "";
            txtverifiersum.Text = "";
            txtarearange.Text = "";
            txtHirerName.Text = "";
            txtLandmark.Text = "";
            txtage.Text = "";
            txtassetvalue.Text = "";
            txtassetyrs.Text = "";
            txtyearscurrent.Text = "";
            txtinmate.Text = "";
            txtmapofresi.Text = "";
            txtfamily.Text = "";

            //$('#ddlactlevel').('selectedIndex', 0);
            //   $('#ddlResType').prop('selectedIndex', 0);
            //   $('#ddlconsresid').prop('selectedIndex', 0);
            //   $('#ddleaseofloc').prop('selectedIndex', 0);
            //   $('#ddlverifiedfrm').prop('selectedIndex', 0);
            //   $('#ddllocal').prop('selectedIndex', 0);
            //   $('#ddlInterior').prop('selectedIndex', 0);
            //   $('#ddllivingstyle').prop('selectedIndex', 0);
            //   $('#ddlstandardofliving').prop('selectedIndex', 0);
            //   $('#ddlreposses').prop('selectedIndex', 0);
            //   $('#ddlcustcop').prop('selectedIndex', 0);
            //   $('#ddlresidencestatus').prop('selectedIndex', 0);

            //   $('input[name=rdnentryperm]').attr('checked', false);
            //   $('input[name=rdnlifestyle]').attr('checked', false);
            //   $('input[name=rdnneglist]').attr('checked', false);
            //   $('input[name=rdnstabdev]').attr('checked', false);
            //   $('input[name=rdnpropdev]').attr('checked', false);
            //   $('input[name=LocationDetails]').attr('checked', false);
            //   $('input[name=rdnparkavail]').attr('checked', false);
            //   $('input[name=rdnpermgasconn]').attr('checked', false);
            //   $('input[name=rdnnegprof]').attr('checked', false);
            //   $('input[name=rdnco_borrdev]').attr('checked', false);



        }
    }
}