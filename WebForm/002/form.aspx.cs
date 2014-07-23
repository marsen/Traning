using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class _002_form : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            MultiView1.ActiveViewIndex = 0;
            if (Session[SessionKey.Name]!=null)
            {
                tbName.Text = Session[SessionKey.Name].ToString();
            }
            if (Session[SessionKey.Phone] != null)
            {
                tbPhone.Text = Session[SessionKey.Phone].ToString();
            }
            if (Session[SessionKey.Email] != null)
            {
                tbEmail.Text = Session[SessionKey.Email].ToString();
            }
        }
    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        Session[SessionKey.Name] = tbName.Text;
        Session[SessionKey.Phone] = tbPhone.Text;
        Session[SessionKey.Email] = tbEmail.Text;
        MultiView1.ActiveViewIndex = 1;
    }
    protected void Button2_Click(object sender, EventArgs e)
    {
        MultiView1.ActiveViewIndex = 0;
    }
    protected void Button3_Click(object sender, EventArgs e)
    {
        MultiView1.ActiveViewIndex = 2;
    }

    public class SessionKey
    {
        public static string Name = "Name";
        public static string Phone = "Phone";
        public static string Email = "Email";
        public static string ValidateCode = "ValidateCode";

    }
    protected void btnSubmit_Click(object sender, EventArgs e)
    {
        if (Session[SessionKey.ValidateCode].ToString() == tbValidateCode.Text)
        {
            MultiView1.ActiveViewIndex = 3;
        }
        else
        {
            MultiView1.ActiveViewIndex = 4;
        }
    }
    protected void btnReset_Click(object sender, EventArgs e)
    {
        Session.Clear();
        tbName.Text = string.Empty;
        tbPhone.Text = string.Empty;
        tbEmail.Text = string.Empty;
        MultiView1.ActiveViewIndex = 0;
    }
    protected void Button4_Click(object sender, EventArgs e)
    {
        MultiView1.ActiveViewIndex = 2;
    }
}