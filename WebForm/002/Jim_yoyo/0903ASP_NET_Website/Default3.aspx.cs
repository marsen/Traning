using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Default3 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //將圖形驗證碼的輸入值記憶為Session["inputCode"]
        Session["inputCode"] = inputValidateCode.Text;

        //僅在已輸入錯誤驗證碼之後，才會在重新輸入時將錯誤驗證碼顯示在該頁
        if (Session["inputErrCode"] != null)
        {
            inputValidateCode.Text = Session["inputErrCode"].ToString();
        }
    }

    //按鈕:送出驗證碼
    protected void BtnSendValidate_Click(object sender, EventArgs e)
    {
        //通過驗證
        if (Session["inputCode"].ToString() == Session["_ValidateCode"].ToString())
        {
            //驗證正確之後，將Session["inputCode"]存至Session["inputCorrectCode"]
            Session["inputCorrectCode"] = Session["inputCode"];
            //導頁至第4頁(Default4.aspx)-驗證正確
            Response.Redirect("Default4.aspx", false);
        }
        //驗證錯誤
        else
        {
            //驗證錯誤之後，將Session["inputCode"]存至Session["inputErrCode"]
            Session["inputErrCode"] = Session["inputCode"];
            //導頁至第4頁(Default4false.aspx)-驗證錯誤
            Response.Redirect("Default4false.aspx", false);
        }
    }
}