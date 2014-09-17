<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default3.aspx.cs" Inherits="Default3" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <table>
    <tr>
        <td>
            驗証碼<asp:Image ID="imgValidate" runat="server" ImageUrl="~/ValidateCode.aspx"/>
        </td>
        <td>
            <asp:TextBox ID="inputValidateCode" runat="server"></asp:TextBox>
        </td>
    </tr>
    <tr>
        <td>
            <asp:Button ID="BtnSendValidate" runat="server" Text="送出" onclick="BtnSendValidate_Click" />
        </td>
    </tr>
    </table>
    </div>


    </form>
</body>
</html>
