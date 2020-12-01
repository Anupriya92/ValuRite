using System;

namespace Login
{

    //To capture response from the login page
    public class Valid_User
    {
        public string BorrowerID;
        public string UserName;
        public string UserType;
        public string UserID;
        public string UserRole;
        public string status;
        public string ValuationID;
        public string UserStatus;
        public string Organization;
        public string Imagename;
    }


    //To send Userdetails to the server js
    public class Uservalidation
    {
        public string strID;/*need to remove*/
        public string ID;/*User Id*/
        public string strPassword;/*Login Password*/
        public string newPassword;/*New password*/
        public string securityQuestion;/*Security Question*/
        public string securityAnswer;/*Security Answer*/

        public string key;/*Encryption key*/
        public string iv;/*Encryption iv*/
        public string strKey;/*need to remove*/
        public string striv;/*need to remove*/

        public string sessionID; //Added by Anupriya

        //Password encrption using iv and key pair
        public string fn_encrypt(string strOrgpwd)
        {
            CryptLib _crypt = new CryptLib();
            string plainText = strOrgpwd;
            iv = CryptLib.GenerateRandomIV(16); //16 bytes = 128 bits
            striv = iv;
            key = CryptLib.getHashSha256("my secret key", 31); //32 bytes = 256 bits
            strKey = key;
            String strencpwd = _crypt.encrypt(plainText, key, iv);
            return strencpwd;
        }
    }

    public class createuser
    {
        public string strusrname;
        public string strusrtype;
        public string strusrrole;
        public string strphno;
        public string strmobno;
        public string stremail;
        public string strcountry;
        public string strstate;
        public string strcity;
        public string strarea;
        public string strlandmark;
        public string straddr1;
        public string straddr2;
        public string strpincode;
        public string struserid;
        public string OrgType;
        public string UserID;
        public string strcompname;
        public string struploading;
    }
}