<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        #form1
        {
            height: 312px;
        }
        .firstColumn
        {
            width: 34px;
        }
        #RequiredFieldValidatorName, #RequiredFieldValidatorTel, #RequiredFieldValidatorMail
        {
            color: Red;
        }
        #RegularExpressionValidatorTel, #RegularExpressionValidatorMail
        {
            color: Red;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server" METHOD=POST ACTION="">
    <table style="width:100%;">
        <tr>
            <td class="firstColumn">姓名</td>
            <td>
                <asp:TextBox ID="NameTextBox" runat="server"></asp:TextBox>
                <asp:RequiredFieldValidator ID="RequiredFieldValidatorName" controltovalidate="NameTextBox"  runat="server" ErrorMessage="*姓名必填"></asp:RequiredFieldValidator>
            </td>
        </tr>
        <tr>
            <td class="firstColumn">電話</td>
            <td>
                <asp:TextBox ID="TelTextBox" runat="server"></asp:TextBox>
                <asp:RegularExpressionValidator ID="RegularExpressionValidatorTel" ControlToValidate="TelTextBox" runat="server" ValidationExpression="^(?!.*[^\x30-\x39])(?=.*\d).*$" ErrorMessage="*電話僅能輸入數字" Display="Dynamic"></asp:RegularExpressionValidator>
                <asp:RequiredFieldValidator ID="RequiredFieldValidatorTel" controltovalidate="TelTextBox"  runat="server" ErrorMessage="*電話必填"></asp:RequiredFieldValidator>
            </td>
        </tr>
        <tr>
            <td class="firstColumn">信箱</td>
            <td>
                <asp:TextBox ID="MailTextBox" runat="server"></asp:TextBox>
                <asp:RegularExpressionValidator ID="RegularExpressionValidatorMail" ControlToValidate="MailTextBox" runat="server" ValidationExpression="^[a-zA-Z]{1}([a-zA-Z_0-9.])*\@(\w+)\.(\w+)$" ErrorMessage="*信箱只能英文開頭,必須含「@」" Display="Dynamic"></asp:RegularExpressionValidator>
                <asp:RequiredFieldValidator ID="RequiredFieldValidatorMail" controltovalidate="MailTextBox"  runat="server" ErrorMessage="*信箱必填"></asp:RequiredFieldValidator>
            </td>
        </tr>
        <tr>
            <td class="firstColumn">公司</td>
            <td>
                <asp:TextBox ID="CompTextBox" runat="server"></asp:TextBox>
            </td>
        </tr>
    </table>
    <br />
    <asp:Button ID="ButtonNextPage" runat="server" Text="下一步" onclick="ButtonNextPage_Click"/>
         
    </form>
</body>
</html>
