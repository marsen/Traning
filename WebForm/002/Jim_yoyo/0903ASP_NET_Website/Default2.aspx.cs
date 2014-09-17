using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Default2 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //觸發事件:RadioButtonList選擇時
        location.SelectedIndexChanged += new EventHandler(location_SelectedIndexChanged);

        //用location.Items.Value判斷
        if (Session["location"] != null)
        {
            foreach(ListItem v in location.Items)
            {
                if (v.Value == Session["location"].ToString())
                {
                    v.Selected = true;
                }
            }
        }

        //checkBoxList判斷
        if (Session["language"] != null)
        {
            List<ListItem> SelectedList = (List<ListItem>)Session["language"];

            foreach (ListItem item in languageTool.Items)
            {
                if (SelectedList.Contains(item))
                {
                    item.Selected = true;
                }
                else
                {
                    item.Selected = false;
                }
            }
        }
    }

    //觸發事件:將RadioButtonList選擇的選項用Seesion記住，待Page_Load時載入
    protected void location_SelectedIndexChanged(object sender, EventArgs e)
    {
        Session["location"] = location.SelectedValue;
    }

    //按鈕:下一步
    protected void Button2_Click(object sender, EventArgs e)
    {
        //跳至下一頁
        Response.Redirect("Default3.aspx", false);
    }

    //按鈕:上一步
    protected void Button1_Click(object sender, EventArgs e)
    {
        //記憶選擇過哪些checkbox
        List<ListItem> selection = new List<ListItem>();

        foreach (ListItem li in languageTool.Items)
        {
            if (li.Selected)
            {
                selection.Add(li);
            }
        }
        Session["language"] = selection;

        //回到上一頁
        Response.Redirect("Default.aspx", false);
    }
}