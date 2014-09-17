<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default2.aspx.cs" Inherits="Default2" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        .firstColumn
        {
            width: 123px;
        }
        #Notes
        {
            height: 208px;
            width: 342px;
        }
        .secondColumn
        {
            width: 356px;
        }
        #RequiredFieldValidatorRadio, #RequiredFieldValidatorPW, #RequiredFieldValidatorPW2, #RegularExpressionValidatorPW
        {
            color: Red; 
        }
    </style>

    <!--javascript:處理密碼檢查-->
<script LANGUAGE= "javascript">
    function checkPW() {
        with (document.all) {
            if (Password.value != PasswordCheck.value) {
                PwErrorMsg.innerHTML = "*密碼不同";
            }
            else {
                PwErrorMsg.innerHTML = "";
            } 
        }
    }
</script>
<script runat="server">

</script>

</head>
<body>
    <form id="form1" runat="server" METHOD=POST ACTION="">
    <div>
    
        <table style="width:100%;">
            <tr>
                <td class="firstColumn">
                    居住地</td>
                <td class="secondColumn">
                <asp:RadioButtonList ID="location" runat="server" RepeatDirection="Horizontal" AutoPostBack="true" OnSelectedIndexChanged = "location_SelectedIndexChanged"  >
                    <asp:ListItem Text="北部" Value="北部"></asp:ListItem>
                    <asp:ListItem Text="中部" Value="中部"></asp:ListItem>
                    <asp:ListItem Text="南部" Value="南部"></asp:ListItem>
                    <asp:ListItem Text="東部" Value="東部"></asp:ListItem>
                    <asp:ListItem Text="離島" Value="離島"></asp:ListItem>
                </asp:RadioButtonList>
                </td>

                <td>
                <asp:RequiredFieldValidator ID="RequiredFieldValidatorRadio" controltovalidate="location" runat="server" ErrorMessage="*出發地未選擇"></asp:RequiredFieldValidator>
                </td>

            </tr>
            <tr>
                <td class="firstColumn">
                    專長</td>
                <td class="secondColumn">
                <asp:CheckBoxList ID="languageTool" runat="server" RepeatDirection="Horizontal">
                    <asp:ListItem Text="HTML" Value="HTML" ></asp:ListItem>
                    <asp:ListItem Text="CSS" Value="CSS"></asp:ListItem>
                    <asp:ListItem Text="Javascript" Value="Javascript"></asp:ListItem>
                    <asp:ListItem Text="C#" Value="C#"></asp:ListItem>
                    <asp:ListItem Text="SQL" Value="SQL"></asp:ListItem>
                </asp:CheckBoxList>
                </td>
            </tr>
            <tr>
                <td class="firstColumn">
                    密碼</td>
                <td class="secondColumn">
                    <asp:TextBox ID="Password" TextMode="Password" runat="server" onblur="checkPW()"/>
                    <asp:RegularExpressionValidator ID="RegularExpressionValidatorPW" ControlToValidate="Password" runat="server" ValidationExpression=".{8,}" ErrorMessage="*密碼至少八碼"  Display="Dynamic"></asp:RegularExpressionValidator>
                    <asp:RequiredFieldValidator ID="RequiredFieldValidatorPW" controltovalidate="Password" runat="server" ErrorMessage="*密碼必填" Display="Dynamic"></asp:RequiredFieldValidator>
                    <span id="PwErrorMsg" style="color:red"></span>
                </td>
            </tr>
            <tr>
                <td class="firstColumn">
                    確認密碼
                </td>
                <td class="secondColumn">
                    <asp:TextBox ID="PasswordCheck" TextMode="Password" runat="server" onblur="checkPW()"/>
                    <asp:RequiredFieldValidator ID="RequiredFieldValidatorPW2" controltovalidate="PasswordCheck" runat="server" ErrorMessage="*確認密碼必填"></asp:RequiredFieldValidator>
                </td> 
            </tr>
            <tr>
                <td class="firstColumn">
                    備註</td>
                <td class="secondColumn">
                <textarea id="Notes" cols="20" rows="2"></textarea>
            </tr>
        </table>
    
    </div>
    <asp:Button ID="Button1" runat="server" Text="上一步" onclick="Button1_Click" />
&nbsp;<asp:Button ID="Button2" runat="server" Text="下一步" onclick="Button2_Click"/>
    </form>
</body>
</html>
