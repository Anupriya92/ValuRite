using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net.Http;
using System.Web.UI.HtmlControls;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Security;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Collections;
using System.Drawing;
using System.Drawing.Imaging;

namespace Login
{
    public class SummaryDetails
    {
        public string EstRatePerSqFt;
        public string EstimatedValue;
        public string Guidelinesqft;
        public string GuidelineValue;
        public string CompositeRate;
        public string ValuationMethod;
        public string NewConstructionCompositeRate;
        public string ReplacementCost;
        public string LifeOfBuilding;
        public string TotalCompositeRate;
        public string Summarydetails;
        public string Reason;
        public string ImageName;
        public string InvoiceAmt;
        public string AppReason;
        public string LenderID;
        public string AppraiserID;
        public string ApprovalDate;
        public string ApprovalReason;
        public string ApprovalStatus;
        public string ValuationID;
        public string AppraisalStatus;
        public string UserID;
    }

    public class RegisteredProperty
    {
        public string LocationType;
        public string Zone;
        public string SROLOC;
        public string Village;
    }

    public class ApplicationQueue
    {
        public int PropertyID;
        public string BorrowerID;
        public string AppraiserID;
        public string AppraiserName;
        public string AppraisalStatus;
        public string AssignDate;
        public string ModifiedBy;
        public string ModifiedDate;
        public string ValuationID;
        public string Address;
        public string Location;
        public string UserID;
        public string PropertyType;
        public string LenderID;
        public string BorrowerName;
        public string OrgType;
        public string UserType;
    }

    public class Propertyloc
    {

        public string Address;
        public string Location;
        public string PropertyType;
        public string AppraiserName;
        public string BorrowerName;
    }

    public class Approvaldetails
    {
        public string ValuationID;
        //public string ApprovedStatus;
        public string GovtAuthorityID;
        public string ApprovalNoandDate;
        public string NonApprovalReason;
        public string SurveyReportDetail;
        public string CertMatchStatus;
        public string CertDeviationReason;
        public string SketchMatchStatus;
        public string SketchDeviationReason;
       // public string ReleaseCertNo;
       // public string MarkedforGovtProj;
      //  public string earmarkForGovt; //Added By Anupriya
     //   public string DeRegulatedZoneProject;
        public string forestOrCoastalReason; //Added By Anupriya
      //  public string RegnStatus;
        public string RegnReason; //Added By Anupriya
        public string SurveyNumber;
        public string SurveyDate;
       // public string RegnDate;
        public string Zone;
        public string Village;
        public string SroLocation;
      //  public string RegnValue;
        public string RegnName;
        public string PropertyTaxLand; //Added By Anupriya
        public string PropertyTaxHouse; //Added By Anupriya
        public string PropertyTaxWater; //Added By Anupriya
        // public string PropertyTaxDetails;
        public string UserID;
       // public string UndividedShare;
    }
    //Added by Nirmala
    public class generaldetails
    {
        public string ValuationPurpose;
        public string PropertyID;
        public string InspectionDate;
        public string ValuationDate;
        public string Ownerdetails;
        public string AppraisalStatus;
        public string owningproperty;
        public string Listdocumentsperusal;
        public string BriefDescriptionProperty;
        public string ScopeValuation;
        public string Nameofbank;
        public string Branchbankappraisal;
        public string Valuerassociationdropdown;
        public string Personsvisitingsite;
        public string Projectsitename;
        public string LocationType;
        public string PropertyType;
        public string UserID;
        public string ValuationID;
        public bool flag;

    }

    public class propdescdetails
    {
        public string ValuationID;
        public string PropertyID;
        public string DoorNo;
        public string StreetName;
        public string AreaName;
        public string City;
        public string State;
        public string Country;
        public string Pincode;
        public string Areaclassification;
        public string EconomicClassification;
        public string RegnStatus;
        public string RegnReason;
        public string RegnDate;
        public string RegnValue;
        public string UndividedShare;
        public string RoadWidth;
        public string Surroundedbyfence;
        public string landmeasurement;
        public string MismatchReason;
        public string PropertyArea;
        public string NoOfDwelling;
        public string Zone;
        public string SROLocation;
        public string Village;
        public string SurveyNumber;
        public string SurveyDate;
        public string NamebuttingRoad;
        public string Orientationplot;
        public string Landmark;
        public string Proximitysurcomm;
        public string Distancecitylimits;
        public string TotalArea;
        public string UserID;
        public string AppraisalStatus;
        public bool flag;
    }

    public class PropDescQueue
    {
        public string ValuationID;
        public string PropertyID;
        public string DoorNo;
        public string StreetName;
        public string AreaName;
        public string City;
        public string State;
        public string Country;
        public string Pincode;
        public string Areaclassification;
        public string EconomicClassification;
        public string RegnStatus;
        public string RegnReason;
        public string RegnDate;
        public string RegnValue;
        public string UndividedShare;
        public string RoadWidth;
        public string Surroundedbyfence;
        public string landmeasurement;
        public string MismatchReason;
        public string PropertyArea;
        public string NoOfDwelling;
        public string Zone;
        public string SROLocation;
        public string Village;
        public string SurveyNumber;
        public string SurveyDate;
        public string NamebuttingRoad;
        public string Orientationplot;
        public string Landmark;
        public string Proximitysurcomm;
        public string Distancecitylimits;
        public string TotalArea;
        public string UserID;
        public string AppraisalStatus;
        public bool flag;


    }
    public class generalQueue
    {
        public string ValuationPurpose;
        public string PropertyID;
        public string InspectionDate;
        public string ValuationDate;
        public string Ownerdetails;
        public string AppraisalStatus;
        public string owningproperty;
        public string Listdocumentsperusal;
        public string BriefDescriptionProperty;
        public string ScopeValuation;
        public string Nameofbank;
        public string Branchbankappraisal;
        public string Valuerassociationdropdown;
        public string Personsvisitingsite;
        public string Projectsitename;
        public string LocationType;
        public string PropertyType;
        public string UserID;
        public string ValuationID;
        public bool flag;

    }

    //Added by Nirmala
    public class statutorydetails
    {
        public string PropertyID;
        public string ValuationID;
        public string Restrictiveclauses;
        public string Typeofusetoput;
        public string ReservedLand;
        public string ReserveComments;
        public string caseconversionsite;
        public string lockedland;
        public string approvedlayout;
        public string drawingapprovaldate;
        public string ApprovingAuthority;
        public string ApprovingAuthorityNo;
        public string ApprovingAuthorityDate;
        public string ReleaseCertNo;
        public string ApprovedStatus;
        public string approvedverified;
        public string sanctionedplan;
        public string Detailsofvariations;
        public string empanelledvaluers;
        public string Valuationearlier;
        public string PropertyAssessmentno;
        public string PropertyTaxAmount;
        public string PropertyTaxReceiptNo;
        public string PropertyTaxPaidPeriod;
        public string PropertyTaxPaidname;
        public string ElectricityService;
        public string MasterCardname;
        public string WealthTaxpaidAmount;
        public string Agreementseasements;
        public string WaterTaxespaid;
        public string AppraisalStatus;
        public bool flag;
        public string UserID;
    }
    //Added by Nirmala
    public class statutoryQueue
    {
        public string PropertyID;
        public string ValuationID;
        public string Restrictiveclauses;
        public string Typeofusetoput;
        public string ReservedLand;
        public string ReserveComments;
        public string caseconversionsite;
        public string lockedland;
        public string approvedlayout;
        public string drawingapprovaldate;
        public string ApprovingAuthority;
        public string ApprovingAuthorityNo;
        public string ApprovingAuthorityDate;
        public string ReleaseCertNo;
        public string ApprovedStatus;
        public string approvedverified;
        public string sanctionedplan;
        public string Detailsofvariations;
        public string empanelledvaluers;
        public string Valuationearlier;
        public string PropertyAssessmentno;
        public string PropertyTaxAmount;
        public string PropertyTaxReceiptNo;
        public string PropertyTaxPaidPeriod;
        public string PropertyTaxPaidname;
        public string ElectricityService;
        public string MasterCardname;
        public string WealthTaxpaidAmount;
        public string Agreementseasements;
        public string WaterTaxespaid;
        public string AppraisalStatus;
        public bool flag;
        public string UserID;

    }
    //Added by Anupriya
    public class Buildingdetails
    {
        public string ValuationID;
        public string UserID;
        public string BuildingDetails;
        /*public string TypeOfConstruction;
        public string QualityOfConstruction;
        public string ApperanceOfBuilding;
        public string Maintenance_Interior;
        public string Maintenance_Exterior;
        public string OccupiedBy;
        public string GrossMonthlyRent;
        public string GrossAdvanceAmount;*/
    }

    //Added by Anupriya
    public class Buildingretrivedetails
    {
        public string ValuationID;
        public string UserID;
        public string BuildingDetails;
        /*public string TypeOfConstruction;
        public string QualityOfConstruction;
        public string ApperanceOfBuilding;
        public string Maintenance_Interior;
        public string Maintenance_Exterior;
        public string OccupiedBy;
        public string GrossMonthlyRent;
        public string GrossAdvanceAmount;*/
        public bool flag;
    }

    //Added by Anupriya for Valuation general
    public class ValGendetails
    {
        public string ValuationID;
        public string UserID;
        public string ValuationGeneral;
    }

    //Added by Anupriya for Valuation general
    public class RevValGendetails
    {
        public string ValuationID;
        public string UserID;
        public string ValuationGeneral;
        public bool flag;
    }

    //Added by Deepa
    //Save Land details
    public class Propertylanddetails
    {
        public string UserID;
        public string ValuationID;
        public string LandDetails;    

    }
    //Added by Deepa
    //Retrive Land details
    public class Landretrivedetails
    {
        public string UserID;
        public string ValuationID;
        public string LandDetails;       
        public bool flag;
    }
    public class PricingDetails
    {
        public string ValuationID;
        public string PricingStatus;
        public string PropertyTaxDetails;
        public string PropertyStatus;
        public string TotalArea;
        public string CommonArea;
        public string CommonAreaPercentage;
        public string PlinthArea;
        public string CarpetArea;
        public string Age;
        public string NoofFloors;
        public string Footage;
        public string LivableStatus;
        public string NonLivableReason;
        public string NoofRooms;
        public string RoomsFootage;
        public string AppraisedArea;
       // public string LandMeasure;
       // public string MismatchReason;
        public string UserID;

        public string LandExtent;
        public string Unit;
       // public string SurroundedBy;
       // public string RoadWidth;
        public string FootageDetails;
        public string FootageReason;
        //public string Totalvalue;

        public string YearConstructed;
        public string FloorSpaceIndex;
        public string PropertyNorth;//Added by Anupriya
        public string PropertySouth;//Added by Anupriya
        public string PropertyEast;//Added by Anupriya
        public string PropertyWest;//Added by Anupriya
        public string[] RoomDescription;//Added by Anupriya
    }
    //Added by Deepa
    // Save Service details
    public class Servicesdetails
    {
        public string ValuationID;
        public string UserID;
        public string ServiceDetails;
    }

    //Added by Deepa
    // Retrieve Service details
    public class Serviceretrivedetails
    {
        public string UserID;
        public string ValuationID;
        public bool flag;
    }

    //Added by Deepa
    // Depreciation Value details
    public class DepreciationValueDetails
    {
        public string SelectedValues;
    }

    public class AmenitiesDetails
    {
        public string ValuationID;
        //public string NoofLifts;
       // public string NoofCarpark;
        //public string NoofCoveredCarpark;
       // public string WelfareAssn;
       // public string Others;
        public string UtilitySelect;
        public string UtilityFitness;
        public string UtilityHealth;
        public string UserID;
        //public string FlatMaintainance;
        public string UtilityBuilding;//Added by Deepa
        public string AmenitiesFinal;
        //public string DepreciationValue;//Added by Deepa

    }

    public class GuideLineValue
    {
        public string StreetName;
        public string Zone;
        public string SROLOC;
        public string Village;
        public string ValuationID;
    }

    public class MiscDetails
    {

       // public string PropertyArea;
        public string AreaClassification;
        public string OccupiedBy;
        public string OccupiedPeriod;
        public string RentAmount;
        public string TypeOfStructure;
        //public string DwllingUnits;
        public string Quality;
        public string BuildingAppearance;
        public string Maintenance;
        public string Floor;
        public string Specification;
        public string HouseTax;
        public string Assessment;
        public string TaxPayerName;
        public string TaxAmount;
        public string ElectricityNum;
        public string MasterCardName;
        public string Purpose;
        public string Marketablility;
        public string MarketabilityInfo;
        public string FactorFav;
        public string Docs;
        public string BriefDesc;
        public string NegativeFactors;
        public string ValuationID;
        public string UserID;

    }

    public class logoutSessionUpdate
    {
        public string sessionID;
        public string UserID;
        public string type;
    }


    public partial class landingpage : System.Web.UI.Page
    {
        string userid = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            //Capture("E:/ScreenShot.bmp");
            Page.ClientScript.RegisterStartupScript(this.GetType(), "CallMyFunction", "toggleChevronOnload();", true);
            try
            {

                string str_loguserrole = Session["UserRole"].ToString();
                string str_logusertype = Session["UserType"].ToString();
                string str_orgtype = Session["OrgType"].ToString();
                userid = Session["UserID"].ToString();


                //Display Password update fields for first time login.
                string str_firstlogin = Session["hdnpwdupdate"].ToString();
                if (str_firstlogin.Equals("false"))
                {
                    myAccordion.Style["display"] = "block";
                    div_pwddetails.Style["display"] = "block";
                    Div_ValuationDetails.Style["display"] = "none";
                    //Div_Locationdetails.Style["display"] = "none";
                   // DivApprovaldetailsaccordion.Style["display"] = "none";
                   // DivPricedetailsaccordion.Style["display"] = "none";
                    DivAmenitiesdetailsaccordion.Style["display"] = "none";
                    DivSummarydetailsaccordion.Style["display"] = "none";
                    DivAppraisalapprovalaccordion.Style["display"] = "none";
                    //DivMiscelaneousaccordion.Style["display"] = "none";
                    Divgeneraldetailsaccordion.Style["display"] = "none";//Added by Nirmala
                    DivpropertyDescaccordion.Style["display"] = "none";//Added by Nirmala
                    Divstatutoryaccordion.Style["display"] = "none";//Added by Nirmala

                    Page.ClientScript.RegisterStartupScript(this.GetType(), "showpwdDiv", "$('#div_pwdupdate').collapse('show');$('#spnAccordionHeader').parent('a').css('pointer-events','none');", true);
                }
                else
                {
                    div_pwddetails.Style["display"] = "none";
                    if (Request.QueryString["valuationID"] != null)
                    {

                        string ValuationID = Request.QueryString["valuationID"].ToString();
                        string PropertyID = Request.QueryString["propertyId"].ToString();
                        string BorrowerID = Request.QueryString["BorrID"].ToString();
                        string BorrowerName = Request.QueryString["BorrName"].ToString();
                        string LenderID = Request.QueryString["lenderID"].ToString(); // added feb 05 2019
                        string PropertyType = Request.QueryString["PropertyType"].ToString();// added feb 05 2019

                        Session["PropertyType"] = PropertyType;// added feb 05 2019
                        Session["LenderID"] = LenderID;// added feb 05 2019

                        Session["BorrName"] = BorrowerName;
                        spnvalid.InnerText = ValuationID.IndexOf('-') != -1 ? ValuationID.Split('-')[1] : ValuationID;
                        spnbrwrid.InnerText = BorrowerName;
                        spnproprid.InnerText = PropertyID;

                        Session["ValuationID"] = ValuationID;
                        Session["PropertyID"] = PropertyID;
                        Session["BorrowerID"] = BorrowerID;
                        string VAlID = ValuationID.ToString();
                        ClientScriptManager cs = Page.ClientScript;
                        StringBuilder sb = new StringBuilder();
                        sb.Append("<script type=text/javascript>fngetid('" + ValuationID + "', " + PropertyID + ");</");
                        sb.Append("script>");
                        cs.RegisterStartupScript(this.GetType(), "ValuationDetails", sb.ToString());
                    }

                    if (str_logusertype.Equals("Lender"))// ||(Session["OrgType"].ToString()=="Company" && Session["UserType"].ToString()=="Appraiser"))
                    {
                        SetReadOnlyTrue();
                        if (str_loguserrole.Equals("Admin"))
                        {
                            divuploadpicappr.Style["display"] = "none";
                            myAccordion.Style["display"] = "none";
                        }
                        else
                        {
                            divuploadpicappr.Style["display"] = "none";
                        }
                    }
                    else if (str_logusertype.Equals("Appraiser") && !str_orgtype.Equals("Company"))
                    {
                        SetReadOnlyTrueApp();
                    }
                    else if (str_logusertype.Equals("Borrower"))
                    {
                        //Borrower
                        div_pwddetails.Style["display"] = "none";
                        //Div_Locationdetails.Style["display"] = "none";
                        //DivApprovaldetailsaccordion.Style["display"] = "none";
                        //DivPricedetailsaccordion.Style["display"] = "none";
                        DivAmenitiesdetailsaccordion.Style["display"] = "none";
                        DivSummarydetailsaccordion.Style["display"] = "none";
                        DivAppraisalapprovalaccordion.Style["display"] = "none";
                        Divgeneraldetailsaccordion.Style["display"] = "none";//Added by Nirmala
                        DivpropertyDescaccordion.Style["display"] = "none";//Added by Nirmala
                        Divstatutoryaccordion.Style["display"] = "none";//Added by Nirmala
                    }
                    Page.ClientScript.RegisterStartupScript(this.GetType(), "ChangeStatusOFAllSections", "GetStatusChange('Chkall', 'Chkall');", true);
                }
            }
            catch (Exception exp)
            {
                Trace.Write(exp.Message);

            }
        }
        // Capturing screenshot for google maps.
        /* public static void Capture(string CapturedFilePath)
         {
             Bitmap bitmap = new Bitmap
           (System.Windows.Forms.Screen.PrimaryScreen.Bounds.Width, System.Windows.Forms.Screen.PrimaryScreen.Bounds.Height);

             Graphics graphics = Graphics.FromImage(bitmap as System.Drawing.Image);
             graphics.CopyFromScreen(25, 25, 25, 25, bitmap.Size);

             bitmap.Save(CapturedFilePath, ImageFormat.Bmp);
         }*/

        //Set REadonly for Lender
        [System.Web.Services.WebMethod]
        protected void SetReadOnlyTrue()
        {
            /*foreach (Control ctrl in Div_Locationdetails.Controls)
            {
                btnlocsubmit.Disabled = true;
                btnlocreset.Disabled = true;
                if (ctrl is TextBox)
                {
                    ((TextBox)ctrl).ReadOnly = true;
                }
                if (ctrl is DropDownList)
                {
                    ((DropDownList)ctrl).Enabled = false;
                }
                if (ctrl is RadioButton)
                {
                    ((RadioButton)ctrl).Enabled = false;
                }
            }
            foreach (Control ctrl in DivApprovaldetailsaccordion.Controls)
            {
                btnApprovalnext.Disabled = true;
                btnApprovalreset.Disabled = true;
               // txtdateofregn.Disabled = true;
               // txtRegistrationvalue.Disabled = true;
                txtregName.Disabled = true;
                ddlzone.Disabled = true;
                ddlsroloc.Disabled = true;
                ddlvillage.Disabled = true;
                if (ctrl is TextBox)
                {
                    ((TextBox)ctrl).ReadOnly = true;
                }
                if (ctrl is DropDownList)
                {
                    ((DropDownList)ctrl).Enabled = false;
                }
                if (ctrl is RadioButton)
                {
                    ((RadioButton)ctrl).Enabled = false;
                }
                if (ctrl is Button)
                {
                    ((Button)ctrl).Enabled = false;
                }
            }
            foreach (Control ctrl in DivPricedetailsaccordion.Controls)
            {
                pricingsave.Disabled = true;
                pricingreset.Disabled = true;
                txtsurveydate.Disabled = true;
                if (ctrl is TextBox)
                {
                    ((TextBox)ctrl).ReadOnly = true;
                }
                if (ctrl is DropDownList)
                {
                    ((DropDownList)ctrl).Enabled = false;
                }
                if (ctrl is RadioButton)
                {
                    ((RadioButton)ctrl).Enabled = false;
                }
                if (ctrl is Button)
                {
                    ((Button)ctrl).Enabled = false;
                }
            }*/
            foreach (Control ctrl in DivAmenitiesdetailsaccordion.Controls)
            {
                btnamenitysave.Disabled = true;
                btnamenityreset.Disabled = true;
                if (ctrl is TextBox)
                {
                    ((TextBox)ctrl).ReadOnly = true;
                }
                if (ctrl is ListBox)
                {
                    ((ListBox)ctrl).Enabled = false;
                    ((ListBox)ctrl).Attributes.Add("disabled", "true");
                }
                if (ctrl is RadioButton)
                {
                    ((RadioButton)ctrl).Enabled = false;
                }
                if (ctrl is Button)
                {
                    ((Button)ctrl).Enabled = false;
                }
            }

            /*foreach (Control ctrl in DivMiscelaneousaccordion.Controls)
            {
                btnsaveMisc.Disabled = true;
                btnresetMisc.Disabled = true;
                if (ctrl is TextBox)
                {
                    ((TextBox)ctrl).ReadOnly = true;
                }
                if (ctrl is RadioButton)
                {
                    ((RadioButton)ctrl).Enabled = false;
                }
            }*/
            foreach (Control ctrl in DivSummarydetailsaccordion.Controls)
            {
                btnaddnewrow.Visible = false;
                btnremrow.Visible = false;
                txtrecommendedvalue.Disabled = true;
                txtmismatchreason.Disabled = true;
                btnSummarydetailSave.Disabled = true;
                btnappraisalcomplete.Disabled = true;
                btnSummarydetailreset.Disabled = true;
                if (ctrl is TextBox)
                {
                    ((TextBox)ctrl).ReadOnly = true;
                }
                if (ctrl is DropDownList)
                {
                    ((DropDownList)ctrl).Enabled = false;
                }
                if (ctrl is CheckBox)
                {
                    ((CheckBox)ctrl).Enabled = false;
                }
            }
        }

        [System.Web.Services.WebMethod]
        protected void SetReadOnlyTrueApp()
        {
            foreach (Control ctrl in DivAppraisalapprovalaccordion.Controls)
            {
                if (ctrl is TextBox)
                {
                    ((TextBox)ctrl).ReadOnly = true;
                }
                if (ctrl is DropDownList)
                {
                    ((DropDownList)ctrl).Enabled = false;
                }
                if (ctrl is Button)
                {
                    ((Button)ctrl).Enabled = false;
                }
            }
        }

        //Update Password function
        [System.Web.Services.WebMethod]
        public static string pwdupdate(string strID, string newPassword, string securityQuestion, string securityAnswer)
        {
            Uservalidation Objcreateuser = new Uservalidation();
            Objcreateuser.strID = strID;
            var a = Objcreateuser.iv;
            var b = Objcreateuser.key;
            Objcreateuser.newPassword = Objcreateuser.fn_encrypt(newPassword);
            Objcreateuser.securityQuestion = securityQuestion;
            Objcreateuser.securityAnswer = securityAnswer;
            var javaScriptSerializer = new JavaScriptSerializer();
            string jsonString = javaScriptSerializer.Serialize(Objcreateuser);
            //WebReference.Service1 obj = new WebReference.Service1();
            string result = "";
            try
            {
                //obj.PasswordUpdate(jsonString);
                Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/newpassvalid");

                //var javaScriptSerializer = new JavaScriptSerializer();
                //string jsonString = javaScriptSerializer.Serialize(Objcreateuser);
                var client = new HttpClient();
                client.BaseAddress = urlTemplate;
                client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
                client.Timeout = TimeSpan.FromMilliseconds(600000);
                StringContent htpcontent = new StringContent(jsonString, Encoding.UTF8, "application/json");
                var response = client.PostAsync("", htpcontent).Result;
                result = response.Content.ReadAsStringAsync().Result;
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
            return result;
        }


        [WebMethod]
        public static string GetStatusAcc(string ValuationID)
        {
            Approvaldetails approvaldetails = new Approvaldetails();
            approvaldetails.ValuationID = ValuationID;
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5030");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/GetAppraisalStatus");
            // Uri urlTemplate = new Uri("http://localhost" + ":3000/GetAppraisalStatus");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(approvaldetails);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }

        [WebMethod]
        public static string GetStatus(string ValuationID)
        {
            Approvaldetails approvaldetails = new Approvaldetails();
            approvaldetails.ValuationID = ValuationID;
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/Oncreate");
            // Uri urlTemplate = new Uri("http://localhost" + ":3000/Oncreate");
            //Oncreate
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(approvaldetails);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }

        [WebMethod]
        //in Location details section
        public static string Getlocationdetails(int PropertyID)
        {
            ApplicationQueue appqueue = new ApplicationQueue();
            appqueue.PropertyID = PropertyID;
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5007");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/GetLocationDetails");
            //Uri urlTemplate = new Uri("http://localhost" + ":3000/GetLocationDetails");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(appqueue);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }

        [WebMethod]
        public static string GetApprovaldetail(string ValuationID)
        {
            //Approvaldetails objApprovaldetails = new Approvaldetails();
            ApplicationQueue appqueue = new ApplicationQueue();
            appqueue.ValuationID = ValuationID;
            appqueue.UserID = HttpContext.Current.Session["UserID"].ToString();
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5011");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/ApprovalDetailsSave");
            //Uri urlTemplate = new Uri("http://localhost" + ":3000/ApprovalDetailsSave");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            //client.Timeout = TimeSpan.FromMilliseconds(2000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(appqueue);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }

        [WebMethod]
        public static string saveApprovaldetails(string SurveyNumber,
            string SurveyDate, string GovtAuthorityID, string ApprovalNoandDate,
            string NonApprovalReason, string forestOrCoastalReason, string RegnReason, string SroLocation, string Zone, string Village, string RegnName,
            string ValuationID, string PropertyTaxLand, string PropertyTaxHouse, string PropertyTaxWater)
        {
            Approvaldetails objapprovaldet = new Approvaldetails();
            objapprovaldet.ValuationID = ValuationID;
           // objapprovaldet.ApprovedStatus = ApprovedStatus;
            objapprovaldet.GovtAuthorityID = GovtAuthorityID;
            objapprovaldet.ApprovalNoandDate = ApprovalNoandDate;
            objapprovaldet.NonApprovalReason = NonApprovalReason;
         //   objapprovaldet.ReleaseCertNo = ReleaseCertNo;
           // objapprovaldet.MarkedforGovtProj = MarkedforGovtProj;
           // objapprovaldet.earmarkForGovt = earmarkForGovt; //Added by Anupriya
          //  objapprovaldet.DeRegulatedZoneProject = DeRegulatedZoneProject;
            objapprovaldet.forestOrCoastalReason = forestOrCoastalReason; //Added by Anupriya
           // objapprovaldet.RegnStatus = RegnStatus;
            objapprovaldet.RegnReason = RegnReason; //Added by Anupriya
         //   objapprovaldet.RegnDate = RegnDate;
            objapprovaldet.Zone = Zone;
            objapprovaldet.Village = Village;
            objapprovaldet.SroLocation = SroLocation;
       //     objapprovaldet.RegnValue = RegnValue;
            objapprovaldet.RegnName = RegnName;
            objapprovaldet.SurveyNumber = SurveyNumber;
            objapprovaldet.SurveyDate = SurveyDate;
            //objapprovaldet.UndividedShare = UndividedShare;
            objapprovaldet.PropertyTaxLand = PropertyTaxLand; //Added by Anupriya
            objapprovaldet.PropertyTaxHouse = PropertyTaxHouse; //Added by Anupriya
            objapprovaldet.PropertyTaxWater = PropertyTaxWater; //Added by Anupriya
            //objapprovaldet.PropertyTaxDetails = PropertyTaxDetails;

            objapprovaldet.UserID = HttpContext.Current.Session["UserID"].ToString();
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5011");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/ApprovalDetailsSave");
            //Uri urlTemplate = new Uri("http://localhost" + ":3000/ApprovalDetailsSave");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(objapprovaldet);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }
        //Added by Nirmala
        [WebMethod]
        public static string GetgeneralDetails(string ValuationID, string PropertyID)
        {
            generalQueue genqueue = new generalQueue();
            genqueue.ValuationID = ValuationID;
            genqueue.PropertyID = PropertyID;
            genqueue.flag = true;
            genqueue.UserID = HttpContext.Current.Session["UserID"].ToString();
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5011");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/generalDetailsSave");
            //Uri urlTemplate = new Uri("http://localhost" + ":3000/generalDetailsSave");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            //client.Timeout = TimeSpan.FromMilliseconds(2000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(genqueue);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }

        [WebMethod]
        public static string GetpropdescDetails(string ValuationID, string PropertyID)
        {
            PropDescQueue propqueue = new PropDescQueue();
            propqueue.PropertyID = PropertyID;
            propqueue.ValuationID = ValuationID;
            propqueue.flag = true;
            propqueue.UserID = HttpContext.Current.Session["UserID"].ToString();
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5011");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/PropertyDescDetailsSave");
            //Uri urlTemplate = new Uri("http://localhost" + ":3000/PropertyDescDetailsSave");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            //client.Timeout = TimeSpan.FromMilliseconds(2000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(propqueue);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }


        [WebMethod]
        public static string saveGeneraldetails(string PropertyID, string UserID, string ValuationID, string ValuationPurpose, string InspectionDate, string ValuationDate,
        string Ownerdetails, string Listdocumentsperusal, string BriefDescriptionProperty, string ScopeValuation,string Nameofbank, string Branchbankappraisal,
        string Valuerassociationdropdown, string Personsvisitingsite, string Projectsitename,string LocationType, string PropertyType)
        {
            generaldetails objgeneraldet = new generaldetails();
            objgeneraldet.flag = false;
            objgeneraldet.ValuationPurpose = ValuationPurpose;
            objgeneraldet.InspectionDate = InspectionDate;
            objgeneraldet.ValuationDate = ValuationDate;
            objgeneraldet.Ownerdetails = Ownerdetails;
            objgeneraldet.Listdocumentsperusal = Listdocumentsperusal;
            objgeneraldet.BriefDescriptionProperty = BriefDescriptionProperty;
            objgeneraldet.ScopeValuation = ScopeValuation;
            objgeneraldet.Nameofbank = Nameofbank;
            objgeneraldet.Branchbankappraisal = Branchbankappraisal;
            objgeneraldet.Valuerassociationdropdown = Valuerassociationdropdown;
            objgeneraldet.Personsvisitingsite = Personsvisitingsite;
            objgeneraldet.Projectsitename = Projectsitename;
            objgeneraldet.LocationType = LocationType;
            objgeneraldet.PropertyType = PropertyType;
            objgeneraldet.ValuationID = ValuationID;
            objgeneraldet.PropertyID = PropertyID;


            objgeneraldet.UserID = HttpContext.Current.Session["UserID"].ToString();
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5011");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/generalDetailsSave");
            //Uri urlTemplate = new Uri("http://localhost" + ":3000/ApprovalDetailsSave");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(objgeneraldet);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }

        [WebMethod]
        public static string savepropdescdetails(string ValuationID, string PropertyID, string DoorNo, string StreetName, string AreaName, string City, string State, string Country, 
        string Pincode, string Areaclassification, string EconomicClassification, string Zone, string SROLocation, string Village, string SurveyNumber, string SurveyDate, 
        string NamebuttingRoad, string Orientationplot, string Landmark, string Proximitysurcomm, string Distancecitylimits, string TotalArea, string RegnStatus,
        string RegnReason, string RegnDate, string RegnValue, string UndividedShare, string RoadWidth, string Surroundedbyfence, string landmeasurement, string MismatchReason,
        string PropertyArea, string NoOfDwelling)
        {
            propdescdetails objpropdescdet = new propdescdetails();
            objpropdescdet.flag = false;
            objpropdescdet.DoorNo = DoorNo;
            objpropdescdet.StreetName = StreetName;
            objpropdescdet.AreaName = AreaName;
            objpropdescdet.City = City;
            objpropdescdet.State = State;
            objpropdescdet.Country = Country;
            objpropdescdet.Pincode = Pincode;
            objpropdescdet.Areaclassification = Areaclassification;
            objpropdescdet.EconomicClassification = EconomicClassification;
            objpropdescdet.RegnStatus = RegnStatus;
            objpropdescdet.RegnReason = RegnReason;
            objpropdescdet.RegnDate = RegnDate;
            objpropdescdet.RegnValue = RegnValue;
            objpropdescdet.UndividedShare = UndividedShare;
            objpropdescdet.RoadWidth = RoadWidth;
            objpropdescdet.Surroundedbyfence = Surroundedbyfence;
            objpropdescdet.landmeasurement = landmeasurement;
            objpropdescdet.MismatchReason = MismatchReason;
            objpropdescdet.PropertyArea = PropertyArea;
            objpropdescdet.NoOfDwelling = NoOfDwelling;
            objpropdescdet.Zone = Zone;
            objpropdescdet.SROLocation = SROLocation;
            objpropdescdet.Village = Village;
            objpropdescdet.SurveyNumber = SurveyNumber;
            objpropdescdet.SurveyDate = SurveyDate;
            objpropdescdet.NamebuttingRoad = NamebuttingRoad;
            objpropdescdet.Orientationplot = Orientationplot;
            objpropdescdet.Landmark = Landmark;
            objpropdescdet.Proximitysurcomm = Proximitysurcomm;
            objpropdescdet.Distancecitylimits = Distancecitylimits;
            objpropdescdet.TotalArea = TotalArea;
            objpropdescdet.PropertyID = PropertyID;
            objpropdescdet.ValuationID = ValuationID;
            // objpropdescdet.AppraisalStatus = AppraisalStatus;

            objpropdescdet.UserID = HttpContext.Current.Session["UserID"].ToString();
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5011");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/PropertyDescDetailsSave");
            //Uri urlTemplate = new Uri("http://localhost" + ":3000/ApprovalDetailsSave");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(objpropdescdet);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }

        //Added by Nirmala
        [WebMethod]
        public static string GetstatutoryDetails(string ValuationID)
        {
            statutoryQueue statqueue = new statutoryQueue();
            statqueue.ValuationID = ValuationID;
            statqueue.flag = true;
            statqueue.UserID = HttpContext.Current.Session["UserID"].ToString();
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5011");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/Statutorydetailssave");
            //Uri urlTemplate = new Uri("http://localhost" + ":3000/generalDetailsSave");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            //client.Timeout = TimeSpan.FromMilliseconds(2000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(statqueue);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }


        //Added by Nirmala

        [WebMethod]
        public static string savestatutorydetails(string PropertyID, string ValuationID, string Restrictiveclauses, string Typeofusetoput, string ReservedLand,string ReserveComments,
        string caseconversionsite, string lockedland, string approvedlayout, string drawingapprovaldate, string ApprovedStatus, string ApprovingAuthority, string ApprovingAuthorityNo, string ApprovingAuthorityDate,
       string ReleaseCertNo,string approvedverified, string sanctionedplan, string Detailsofvariations, string empanelledvaluers, string Valuationearlier, string PropertyAssessmentno, string PropertyTaxAmount,
        string PropertyTaxReceiptNo, string PropertyTaxPaidPeriod, string PropertyTaxPaidname, string ElectricityService, string MasterCardname, string WealthTaxpaidAmount,
        string Agreementseasements, string WaterTaxespaid, string UserID)
        {
            statutorydetails objstatutorydet = new statutorydetails();
            objstatutorydet.flag = false;
            objstatutorydet.Restrictiveclauses = Restrictiveclauses;
            objstatutorydet.Typeofusetoput = Typeofusetoput;
            objstatutorydet.ReservedLand = ReservedLand;
            objstatutorydet.ReserveComments = ReserveComments;
            objstatutorydet.caseconversionsite = caseconversionsite;
            objstatutorydet.lockedland = lockedland;
            objstatutorydet.approvedlayout = approvedlayout;
            objstatutorydet.drawingapprovaldate = drawingapprovaldate;
            objstatutorydet.ApprovedStatus = ApprovedStatus;
            objstatutorydet.ApprovingAuthority = ApprovingAuthority;
            objstatutorydet.ApprovingAuthorityNo = ApprovingAuthorityNo;
            objstatutorydet.ApprovingAuthorityDate = ApprovingAuthorityDate;
            objstatutorydet.ReleaseCertNo = ReleaseCertNo;
            objstatutorydet.ApprovingAuthorityDate = ApprovingAuthorityDate;
            objstatutorydet.approvedverified = approvedverified;
            objstatutorydet.sanctionedplan = sanctionedplan;
            objstatutorydet.Detailsofvariations = Detailsofvariations;
            objstatutorydet.empanelledvaluers = empanelledvaluers;
            objstatutorydet.Valuationearlier = Valuationearlier;
            objstatutorydet.PropertyAssessmentno = PropertyAssessmentno;
            objstatutorydet.PropertyTaxAmount = PropertyTaxAmount;
            objstatutorydet.PropertyTaxReceiptNo = PropertyTaxReceiptNo;
            objstatutorydet.PropertyTaxPaidPeriod = PropertyTaxPaidPeriod;
            objstatutorydet.PropertyTaxPaidname = PropertyTaxPaidname;
            objstatutorydet.ElectricityService = ElectricityService;
            objstatutorydet.MasterCardname = MasterCardname;
            objstatutorydet.WealthTaxpaidAmount = WealthTaxpaidAmount;
            objstatutorydet.Agreementseasements = Agreementseasements;
            objstatutorydet.WaterTaxespaid = WaterTaxespaid;
            objstatutorydet.PropertyID = PropertyID;
            objstatutorydet.ValuationID = ValuationID;
            // objpropdescdet.AppraisalStatus = AppraisalStatus;

            objstatutorydet.UserID = HttpContext.Current.Session["UserID"].ToString();
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5011");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/Statutorydetailssave");
            //Uri urlTemplate = new Uri("http://localhost" + ":3000/ApprovalDetailsSave");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(objstatutorydet);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }

        //Added by Anupriya
        [WebMethod]
        public static string savebuildingdetails(string ValuationID, string BuildingDetail, /*string TypeOfConstruction, string QualityOfConstruction,
            string ApperanceOfBuilding, string Maintenance_Interior, string Maintenance_Exterior, string OccupiedBy, string GrossMonthlyRent,
            string GrossAdvanceAmount,*/ string UserID)
        {
            Buildingdetails objbuildingdet = new Buildingdetails();
            objbuildingdet.ValuationID = ValuationID;
            objbuildingdet.BuildingDetails = BuildingDetail;
            /*objbuildingdet.TypeOfConstruction = TypeOfConstruction;
            objbuildingdet.QualityOfConstruction = QualityOfConstruction;
            objbuildingdet.ApperanceOfBuilding = ApperanceOfBuilding;
            objbuildingdet.Maintenance_Interior = Maintenance_Interior;
            objbuildingdet.Maintenance_Exterior = Maintenance_Exterior;
            objbuildingdet.OccupiedBy = OccupiedBy;
            objbuildingdet.GrossMonthlyRent = GrossMonthlyRent;
            objbuildingdet.GrossAdvanceAmount = GrossAdvanceAmount;*/

            objbuildingdet.UserID = HttpContext.Current.Session["UserID"].ToString();
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/PropertyBuildingdetailSave");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(objbuildingdet);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }

        //Added by Anupriya
        [WebMethod]
        public static string GetBuildingdetail(string ValuationID)
        {
            Buildingretrivedetails buildretrive = new Buildingretrivedetails();
            buildretrive.ValuationID = ValuationID;
            buildretrive.UserID = HttpContext.Current.Session["UserID"].ToString();
            buildretrive.flag = true;
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/PropertyBuildingdetailSave");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(buildretrive);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }

        //Added by Anupriya for Valuation General Details save
        [WebMethod]
        public static string savevalgendetails(string ValuationID, string ValuationGeneral, string UserID)
        {
            ValGendetails objvalgen = new ValGendetails();
            objvalgen.ValuationID = ValuationID;
            objvalgen.ValuationGeneral = ValuationGeneral;

            objvalgen.UserID = HttpContext.Current.Session["UserID"].ToString();
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/ValuationGeneralSave");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(objvalgen);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }
        //Added by Anupriya for Valuation General Details save
        [WebMethod]
        public static string GetValGendetail(string ValuationID)
        {
            RevValGendetails objrevvalgen = new RevValGendetails();
            objrevvalgen.ValuationID = ValuationID;
            objrevvalgen.UserID = HttpContext.Current.Session["UserID"].ToString();
            objrevvalgen.flag = true;
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/ValuationGeneralSave");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(objrevvalgen);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }

        //Added by Deepa
        //Save Land Details
        [WebMethod]
        public static string savepropertylanddetails(string UserID, string ValuationID, string LandDetails)
        {
            Propertylanddetails objpropertylanddet = new Propertylanddetails();
            objpropertylanddet.UserID = HttpContext.Current.Session["UserID"].ToString();
            objpropertylanddet.ValuationID = ValuationID;
            objpropertylanddet.LandDetails = LandDetails;         

            //objpropertylanddet.UserID = HttpContext.Current.Session["UserID"].ToString();
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5011");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/PropertylanddetailSave");
            //Uri urlTemplate = new Uri("http://localhost" + ":3000/PropertylanddetailSave");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(objpropertylanddet);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }

        //Added by Deepa
        //Retrieve Land Details
        [WebMethod]
        public static string GetLanddetail(string ValuationID)
        {
            //Approvaldetails objApprovaldetails = new Approvaldetails();
            Landretrivedetails landretrive = new Landretrivedetails();
            landretrive.ValuationID = ValuationID;
            landretrive.UserID = HttpContext.Current.Session["UserID"].ToString();
            landretrive.flag = true;
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5011");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/PropertylanddetailSave");
            //Uri urlTemplate = new Uri("http://localhost" + ":3000/ApprovalDetailsSave");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            //client.Timeout = TimeSpan.FromMilliseconds(2000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(landretrive);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }

        [WebMethod]
        public static string StatusChange(string ValuationID)
        {
            PricingDetails Pricedetails = new PricingDetails();
            Pricedetails.ValuationID = ValuationID;
            Pricedetails.UserID = HttpContext.Current.Session["UserID"].ToString();
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5014");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/ChangeStatus");
            //Uri urlTemplate = new Uri("http://localhost" + ":3000/ChangeStatus");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(Pricedetails);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }

        //[WebMethod]
        //public static string GetAmenities()
        //{
        //    ApplicationQueue appqueue = new ApplicationQueue();
        //    var paramval = "Utility , Fitness , Health";
        //    Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5010");
        //    var client = new HttpClient();
        //    client.BaseAddress = urlTemplate;
        //    client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
        //    client.Timeout = TimeSpan.FromMilliseconds(600000);
        //    JavaScriptSerializer js = new JavaScriptSerializer();
        //    string strjson = js.Serialize(paramval);
        //    StringContent htpcontent = new StringContent(strjson);
        //    var response = client.PostAsync("", htpcontent).Result;
        //    string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
        //    return resultContent;
        //}

        [WebMethod]
        //in Pricing details section
        public static string GetPricingdetails(string ValuationID)
        {
            PricingDetails Pricedetails = new PricingDetails();
            Pricedetails.ValuationID = ValuationID;
            Pricedetails.UserID = HttpContext.Current.Session["UserID"].ToString();
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5012");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/PricingDetailsSave");
            //Uri urlTemplate = new Uri("http://localhost" + ":3000/PricingDetailsSave");
            //PricingDetailsSave
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(Pricedetails);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }

        [WebMethod]
        public static string Pricingsave(string ValuationID, string PropertyStatus, string TotalArea, string CommonArea,
            string CommonAreaPercentage, string PlinthArea, string CarpetArea, string Age, string NoofFloors, string Footage,
            string LivableStatus, string NonLivableReason, string NoofRooms, string RoomsFootage, string LandExtent, string Unit,
            string FootageDetails, string FootageReason, string YearConstructed, string FloorSpaceIndex, string PropertyNorth,
            string PropertySouth, string PropertyEast, string PropertyWest, string[] RoomDescription)
        {

            PricingDetails savePricedetails = new PricingDetails();
            savePricedetails.ValuationID = ValuationID;
            savePricedetails.PropertyStatus = PropertyStatus;
            savePricedetails.TotalArea = TotalArea;
            savePricedetails.CommonArea = CommonArea;
            savePricedetails.CommonAreaPercentage = CommonAreaPercentage;
            savePricedetails.PlinthArea = PlinthArea;
            savePricedetails.CarpetArea = CarpetArea;
            savePricedetails.Age = Age;
            savePricedetails.NoofFloors = NoofFloors;
            savePricedetails.Footage = Footage;
            savePricedetails.LivableStatus = LivableStatus;
            savePricedetails.NonLivableReason = NonLivableReason;
            savePricedetails.NoofRooms = NoofRooms;
            savePricedetails.RoomDescription = RoomDescription; //Added by Anupriya
            savePricedetails.RoomsFootage = RoomsFootage;
            //savePricedetails.LandMeasure = LandMeasure;
            //savePricedetails.MismatchReason = MismatchReason;

            savePricedetails.LandExtent = LandExtent;
            savePricedetails.Unit = Unit;
           // savePricedetails.SurroundedBy = SurroundedBy;
            //savePricedetails.RoadWidth = RoadWidth;
            savePricedetails.FootageDetails = FootageDetails;
            savePricedetails.FootageReason = FootageReason;

            savePricedetails.YearConstructed = YearConstructed;
            savePricedetails.FloorSpaceIndex = FloorSpaceIndex;
            savePricedetails.PropertyNorth = PropertyNorth;//Added by Anupriya
            savePricedetails.PropertySouth = PropertySouth;//Added by Anupriya
            savePricedetails.PropertyEast = PropertyEast;//Added by Anupriya
            savePricedetails.PropertyWest = PropertyWest;//Added by Anupriya


            savePricedetails.UserID = HttpContext.Current.Session["UserID"].ToString();
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5012");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/PricingDetailsSave");
            //Uri urlTemplate = new Uri("http://localhost" + ":3000/PricingDetailsSave");
            var javaScriptSerializer = new JavaScriptSerializer();
            string jsonString = javaScriptSerializer.Serialize(savePricedetails);
            System.Diagnostics.Debug.WriteLine("savePricedetails" + savePricedetails);
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            StringContent htpcontent = new StringContent(jsonString, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result;
            return resultContent;
        }
        //Added by Deepa
        [WebMethod]
        public static string saveservicesdetails(string ValuationID, string UserID, string ServiceDetails)
        {
           Servicesdetails objservicesdet = new Servicesdetails();
            objservicesdet.UserID = HttpContext.Current.Session["UserID"].ToString();
            objservicesdet.ValuationID = ValuationID;
            objservicesdet.ServiceDetails = ServiceDetails;


            //objpropertylanddet.UserID = HttpContext.Current.Session["UserID"].ToString();
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5011");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/ServicesdetailSave");
            //Uri urlTemplate = new Uri("http://localhost" + ":3000/PropertylanddetailSave");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(objservicesdet);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }

        //Added by Deepa
        [WebMethod]
        public static string GetServicesdetails(string ValuationID)
        {
            //Approvaldetails objApprovaldetails = new Approvaldetails();
            Serviceretrivedetails serviceretrive = new Serviceretrivedetails();
            serviceretrive.ValuationID = ValuationID;
            serviceretrive.UserID = HttpContext.Current.Session["UserID"].ToString();
            serviceretrive.flag = true;
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5011");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/ServicesdetailSave");
            //Uri urlTemplate = new Uri("http://localhost" + ":3000/ApprovalDetailsSave");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            //client.Timeout = TimeSpan.FromMilliseconds(2000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(serviceretrive);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }
        //Added by Deepa
        [WebMethod]

        public static string DepreciationValue(string SelectedValues)
        {
            //Approvaldetails objApprovaldetails = new Approvaldetails();
            DepreciationValueDetails DepreciationValue = new DepreciationValueDetails();
            DepreciationValue.SelectedValues = SelectedValues;
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5011");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/GetDepreciationValue");
            //Uri urlTemplate = new Uri("http://localhost" + ":3000/ApprovalDetailsSave");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            //client.Timeout = TimeSpan.FromMilliseconds(2000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(DepreciationValue);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }

        [WebMethod]
        public static string Amenitiessave(string ValuationID, string UserID, string AmenitiesFinal,/* string NoofLifts, string NoofCarpark, string NoofCoveredCarpark, string WelfareAssn, string Others,*/ string UtilitySelect, string UtilityFitness, string UtilityHealth, /*string FlatMaintainance,*/ string UtilityBuilding/*, string DepreciationValue*/)
        {
            AmenitiesDetails saveAmenitiesdetails = new AmenitiesDetails();
            saveAmenitiesdetails.ValuationID = ValuationID;
            //saveAmenitiesdetails.NoofLifts = NoofLifts;
            // saveAmenitiesdetails.NoofCarpark = NoofCarpark;
            //  saveAmenitiesdetails.NoofCoveredCarpark = NoofCoveredCarpark;
            // saveAmenitiesdetails.WelfareAssn = WelfareAssn;
            // saveAmenitiesdetails.Others = Others;
            saveAmenitiesdetails.AmenitiesFinal = AmenitiesFinal;
            saveAmenitiesdetails.UtilitySelect = UtilitySelect;
            saveAmenitiesdetails.UtilityFitness = UtilityFitness;
            saveAmenitiesdetails.UtilityHealth = UtilityHealth;
            //saveAmenitiesdetails.FlatMaintainance = FlatMaintainance;
            //saveAmenitiesdetails.DepreciationValue = DepreciationValue;//Added by Deepa
            saveAmenitiesdetails.UtilityBuilding = UtilityBuilding;//Added by Deepa
            saveAmenitiesdetails.UserID = HttpContext.Current.Session["UserID"].ToString();
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5016");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/AmenitiesPageSave");
            //Uri urlTemplate = new Uri("http://localhost" + ":3000/AmenitiesPageSave");
            //AmenitiesPageSave
            var javaScriptSerializer = new JavaScriptSerializer();
            string jsonString = javaScriptSerializer.Serialize(saveAmenitiesdetails);
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
        //in Amenities details section
        public static string GetAmenitiesdetails(string ValuationID)
        {
            ApplicationQueue appqueue = new ApplicationQueue();
            appqueue.ValuationID = ValuationID;
            appqueue.UserID = HttpContext.Current.Session["UserID"].ToString();
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5016");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/AmenitiesPageSave");
            //Uri urlTemplate = new Uri("http://localhost" + ":3000/AmenitiesPageSave");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(appqueue);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }

        [WebMethod]
        //in Amenities details section
        public static string CompleteStatus(string ValuationID/*, string MapEcn*/) // string MapEcn Added by Anupriya
        {

            PreviewPage obj = new PreviewPage();
            ApplicationQueue appqueue = new ApplicationQueue();
            appqueue.ValuationID = ValuationID;
            appqueue.UserID = HttpContext.Current.Session["UserID"].ToString();
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5019");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/OnCompleteAppraisalStatusChange");
            //Uri urlTemplate = new Uri("http://localhost" + ":3000/OnCompleteAppraisalStatusChange");
            //OnCompleteAppraisalStatusChange
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(appqueue);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            // obj.Getpdf(MapEcn); //Added by Anupriya
            obj.Getpdf(); //Added by Anupriya
            return resultContent;
        }

        //[WebMethod(EnableSession = true)]
        //public static void addSession(string Imglist)
        //{

        //    HttpContext.Current.Session.Add("Imglist", Imglist);
        //    string a = HttpContext.Current.Session["Imglist"].ToString();
        //}


        [WebMethod(EnableSession = true)] //string ValuationMethod and string Remark added by Anupriya
        public static string saveSummaryDetails(string EstRatePerSqFt, string EstimatedValue, string Guidelinesqft, string GuidelineValue, string CompositeRate,
            string ValuationMethod, string NewConstructionCompositeRate, string ReplacementCost, string LifeOfBuilding, string TotalCompositeRate, string Summarydetails,
            string Reason, string Images, string InvoiceAmt, string UserID, string ValuationID)
        {
            SummaryDetails objSummarydet = new SummaryDetails();
            objSummarydet.EstRatePerSqFt = EstRatePerSqFt;
            objSummarydet.EstimatedValue = EstimatedValue;
            objSummarydet.Guidelinesqft = Guidelinesqft;
            objSummarydet.GuidelineValue = GuidelineValue;
            objSummarydet.CompositeRate = CompositeRate;
            objSummarydet.ValuationMethod = ValuationMethod;
            objSummarydet.NewConstructionCompositeRate = NewConstructionCompositeRate;
            objSummarydet.ReplacementCost = ReplacementCost;
            objSummarydet.LifeOfBuilding = LifeOfBuilding;
            objSummarydet.TotalCompositeRate = TotalCompositeRate;
            objSummarydet.Summarydetails = Summarydetails;
            objSummarydet.Reason = Reason;
            objSummarydet.InvoiceAmt = InvoiceAmt;

            objSummarydet.UserID = HttpContext.Current.Session["UserID"].ToString();
            try
            {
                //objSummarydet.ImageName = HttpContext.Current.Session["Imglist"].ToString();
                objSummarydet.ImageName = Images;
            }
            catch (Exception img)
            {
                objSummarydet.ImageName = "";
            }
            //objSummarydet.ImageName = HttpContext.Current.Session["Imglist"].ToString();
            objSummarydet.ValuationID = HttpContext.Current.Session["ValuationID"].ToString();
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5017");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/SummaryPageSave");
            //Uri urlTemplate = new Uri("http://localhost" + ":3000/SummaryPageSave");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(objSummarydet);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }

        [WebMethod]
        public static string GetSummarydetails(string ValuationID)
        {
            //Approvaldetails objApprovaldetails = new Approvaldetails();
            SummaryDetails summarydet = new SummaryDetails();
            summarydet.ValuationID = ValuationID;
            summarydet.UserID = HttpContext.Current.Session["UserID"].ToString();
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5017");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/SummaryPageSave");
            //Uri urlTemplate = new Uri("http://localhost" + ":3000/SummaryPageSave");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(summarydet);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }

        [WebMethod]
        //public static string Accptstatus(string ValuationID, string AppraisalStatus, string AppReason, string Recommendation, string RecommendedValue, string Type, string Measurement, string MarketRate, string Total)
        public static string Accptstatus(string LenId, string AppId, string AppDate, string Appreas, string Appstatus, string valuationID)
        {
            SummaryDetails Approveapp = new SummaryDetails();
            Approveapp.LenderID = LenId;
            Approveapp.AppraiserID = AppId;
            Approveapp.ApprovalDate = AppDate;
            Approveapp.ApprovalReason = Appreas;
            Approveapp.ApprovalStatus = Appstatus;
            Approveapp.UserID = HttpContext.Current.Session["UserID"].ToString();
            Approveapp.ValuationID = valuationID;

            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5045");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/UpdateAppraisalReason");
            //Uri urlTemplate = new Uri("http://localhost" + ":3000/UpdateAppraisalReason");

            //UpdateAppraisalReason
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(Approveapp);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }

        [WebMethod]
        public static string GetAccptstatus(string ValuationID)
        {
            SummaryDetails summarydet = new SummaryDetails();
            summarydet.ValuationID = ValuationID;
            summarydet.UserID = HttpContext.Current.Session["UserID"].ToString();
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":5046");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/Retrieveapproval");//Retrieveapproval
            //Uri urlTemplate = new Uri("http://localhost" + ":3000/Retrieveapproval");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(summarydet);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;

        }

        [WebMethod(EnableSession = true)]
        public static string btnlogout()
        {
            //Added by kavitha
            logoutSessionUpdate logoutdata = new logoutSessionUpdate();
            logoutdata.sessionID = HttpContext.Current.Session["SessionID"].ToString();
            logoutdata.UserID = HttpContext.Current.Session["UserID"].ToString();
            logoutdata.type = "logout";
            //
            FormsAuthentication.SignOut();
            HttpContext.Current.Session.Abandon();
            HttpContext.Current.Response.Cache.SetCacheability(HttpCacheability.NoCache);
            HttpContext.Current.Response.Cache.SetCacheability(HttpCacheability.NoCache);
            HttpContext.Current.Response.Cache.SetExpires(DateTime.Now);
            HttpContext.Current.Response.Cache.SetNoServerCaching();
            HttpContext.Current.Response.Cache.SetNoStore();
            landingpage example = new landingpage();
            //Added by kavitha
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/logout");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(logoutdata);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            //
            //example.ClearCacheItems();
            // clear authentication cookie
            List<string> keys = new List<string>();
            IDictionaryEnumerator enumerator = HttpContext.Current.Cache.GetEnumerator();

            while (enumerator.MoveNext())
                keys.Add(enumerator.Key.ToString());

            for (int i = 0; i < keys.Count; i++)
                HttpContext.Current.Cache.Remove(keys[i]);

            HttpCookie cookie1 = new HttpCookie(FormsAuthentication.FormsCookieName, "");
            cookie1.Expires = DateTime.Now.AddYears(-1);
            HttpContext.Current.Response.Cookies.Add(cookie1);
            HttpContext.Current.Response.AppendHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
            HttpContext.Current.Response.AppendHeader("Pragma", "no-cache"); // HTTP 1.0.
            HttpContext.Current.Response.AppendHeader("Expires", "0"); // Proxies.

            return resultContent;
        }

        public void ClearCacheItems()
        {

        }

        [WebMethod]
        public static string getGuideLineValues(string Zone, string StreetName, string Village)
        {
            GuideLineValue guideline = new GuideLineValue();
            guideline.Zone = Zone;
            guideline.StreetName = StreetName;
            guideline.Village = Village;
            //guideline.SROLOC = SROLOC;

            guideline.ValuationID = HttpContext.Current.Session["ValuationID"].ToString();
            //summarydet.ValuationID = ValuationID;
            //summarydet.ValuationID = HttpContext.Current.Session["ValuationID"].ToString();
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":8884");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/getGuideLinevalues");
            //Uri urlTemplate = new Uri("http://localhost" + ":3000/getGuideLinevalues");
            //getGuideLinevalues
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(guideline);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }

        [WebMethod]
        public static string getStreetValues(string zone)
        {
            GuideLineValue guideline = new GuideLineValue();
            guideline.Zone = zone;
            // Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":8885");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/getStreet");
            //Uri urlTemplate = new Uri("http://localhost" + ":3000/getStreet");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(guideline);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }

        //getAreaValues

        [WebMethod]
        public static string getAreaValues(string zone)
        {
            GuideLineValue guideline = new GuideLineValue();
            guideline.Zone = zone;
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":8886");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/getarea");
            //Uri urlTemplate = new Uri("http://localhost" + ":3000/getarea");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(guideline);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }

        [WebMethod]
        public static string getMatchingStreets(string zone, string street, string village, string sroloc)
        {
            GuideLineValue guideline = new GuideLineValue();
            guideline.Zone = zone;
            guideline.StreetName = street;
            guideline.Village = village;
            guideline.SROLOC = sroloc;
            //Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + ":8887");
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/GetMatchingStreets");
            //Uri urlTemplate = new Uri("http://localhost" + ":3000/GetMatchingStreets");
            //GetMatchingStreets
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(guideline);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }


        [WebMethod]
        public static string SaveMiscDetails(string AreaClassification, string Assessment, string BriefDesc, string BuildingAppearance, string Docs,
            string ElectricityNum, string FactorFav, string Floor, string Maintenance, string MarketabilityInfo, string MasterCardName,
            string NegativeFactors, string OccupiedBy, string OccupiedPeriod, string Purpose, string Quality, string RentAmount, string Specification,
            string TaxAmount, string TaxPayerName, string TypeOfStructure, string ValuationID)
        {

            MiscDetails SaveMiscObj = new MiscDetails();
            SaveMiscObj.AreaClassification = AreaClassification;
            SaveMiscObj.Assessment = Assessment;
            SaveMiscObj.BriefDesc = BriefDesc;
            SaveMiscObj.BuildingAppearance = BuildingAppearance;
            SaveMiscObj.Docs = Docs;
           // SaveMiscObj.DwllingUnits = DwllingUnits;
            SaveMiscObj.ElectricityNum = ElectricityNum;
            SaveMiscObj.FactorFav = FactorFav;
            SaveMiscObj.Floor = Floor;
            //SaveMiscObj.HouseTax = HouseTax;
            SaveMiscObj.Maintenance = Maintenance;
            SaveMiscObj.MarketabilityInfo = MarketabilityInfo;
            //SaveMiscObj.Marketablility = Marketablility;
            SaveMiscObj.MasterCardName = MasterCardName;
            SaveMiscObj.NegativeFactors = NegativeFactors;
            SaveMiscObj.OccupiedBy = OccupiedBy;
            SaveMiscObj.OccupiedPeriod = OccupiedPeriod;
            //SaveMiscObj.PropertyArea = PropertyArea;
            SaveMiscObj.Purpose = Purpose;
            SaveMiscObj.Quality = Quality;
            SaveMiscObj.RentAmount = RentAmount;
            SaveMiscObj.Specification = Specification;
            SaveMiscObj.TaxAmount = TaxAmount;
            SaveMiscObj.TaxPayerName = TaxPayerName;
            SaveMiscObj.TypeOfStructure = TypeOfStructure;
            SaveMiscObj.UserID = HttpContext.Current.Session["UserID"].ToString();
            SaveMiscObj.ValuationID = ValuationID;

            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/SaveMiscDetails");
            //Uri urlTemplate = new Uri("http://localhost" + ":3000/SaveMiscDetails");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(SaveMiscObj);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }


        [WebMethod]
        public static string GetMiscDetails(string ValuationID)
        {
            MiscDetails GetMiscObj = new MiscDetails();
            GetMiscObj.UserID = HttpContext.Current.Session["UserID"].ToString();
            GetMiscObj.ValuationID = ValuationID;

            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/SaveMiscDetails");
            //Uri urlTemplate = new Uri("http://localhost" + ":3000/SaveMiscDetails");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(GetMiscObj);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }

        [WebMethod]
        public static string RetrieveRegProp(string LocationType, string Zone, string SROLOC)
        {

            RegisteredProperty objRegprop = new RegisteredProperty();
            objRegprop.LocationType = LocationType;
            objRegprop.Zone = Zone;
            objRegprop.SROLOC = SROLOC;
            Uri urlTemplate = new Uri(ConfigurationManager.AppSettings["ServerAddress"].ToString() + "/RetrievePropertyValues");
            //Uri urlTemplate = new Uri("http://localhost" + ":3000/RetrievePropertyValues");
            var client = new HttpClient();
            client.BaseAddress = urlTemplate;
            client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json; charset=utf-8");
            client.Timeout = TimeSpan.FromMilliseconds(600000);
            JavaScriptSerializer js = new JavaScriptSerializer();
            string strjson = js.Serialize(objRegprop);
            StringContent htpcontent = new StringContent(strjson, Encoding.UTF8, "application/json");
            var response = client.PostAsync("", htpcontent).Result;
            string resultContent = response.Content.ReadAsStringAsync().Result.ToString();
            return resultContent;
        }
    }
}


