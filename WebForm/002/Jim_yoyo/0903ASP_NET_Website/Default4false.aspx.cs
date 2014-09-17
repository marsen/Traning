using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Default4false : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
    }

    //回到上一頁(第3頁)
    protected void BtnLastPage_Click(object sender, EventArgs e)
    {
        Response.Redirect("Default3.aspx", false);
    }
}