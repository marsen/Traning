using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

    

public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["SessionName"] != null && Session["SessionTel"] != null && Session["SessionMail"] != null)
        {
            NameTextBox.Text = Convert.ToString(Session["SessionName"]);
            TelTextBox.Text = Convert.ToString(Session["SessionTel"]);
            MailTextBox.Text = Convert.ToString(Session["SessionMail"]);
        }
    }
    //使用Session記憶
    protected void ButtonNextPage_Click(object sender, EventArgs e)
    {
        Session["SessionName"] = NameTextBox.Text;
        Session["SessionTel"] = TelTextBox.Text;
        Session["SessionMail"] = MailTextBox.Text;
        //導頁至第2頁
        Response.Redirect("Default2.aspx", false);
    }
}