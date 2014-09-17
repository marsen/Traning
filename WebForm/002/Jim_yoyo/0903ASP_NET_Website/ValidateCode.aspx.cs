using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Drawing;
using System.IO;
using System.Drawing.Imaging;

public partial class ValidateCode : System.Web.UI.Page
{

    protected void Page_Load( object sender, System. EventArgs e)
   {
       string sCode = string.Empty;
 
        //清除該頁輸出緩存，設置該頁無緩存
       Response.Buffer = true ;
       Response.ExpiresAbsolute = System.DateTime.Now.AddMilliseconds(0);
       Response.Expires = 0;
       Response.CacheControl = "no-cache" ;
       Response.AppendHeader( "Pragma" , "No-Cache" );
        //將驗證碼圖片寫入記憶體流，並將其以 "image/Png" 格式輸出
        MemoryStream oStream = new MemoryStream ();
        try
       {
           Massembly.ValidateCode.CreateValidateCodeImage( ref oStream, ref sCode, 4, 200, 80, 36);
           Session["_ValidateCode"] = sCode;
           Response.ClearContent();
           Response.ContentType = "image/Png" ;
           Response.BinaryWrite(oStream.ToArray());
       }
         finally
       {
             //釋放資源
           oStream.Dispose();
       }
    }


}
