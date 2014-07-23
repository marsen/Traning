<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Form.aspx.cs" Inherits="_002_form" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:multiview ID="MultiView1" runat="server">
            <asp:View ID="View1" runat="server">
                <table>	
	      <tbody>
          <tr>
            <td>姓名</td>                
		    <td><asp:TextBox ID="tbName" runat="server"></asp:TextBox>
                <asp:RequiredFieldValidator ControlToValidate="tbName" ID="RequiredFieldValidator1" runat="server" ErrorMessage="*姓名必填" ForeColor="red"></asp:RequiredFieldValidator>
		    </td>
	      </tr>
          <tr>
            <td>電話</td>                
		    <td><asp:TextBox ID="tbPhone" runat="server"></asp:TextBox>
                <asp:RequiredFieldValidator ControlToValidate="tbPhone" ID="RequiredFieldValidator2" runat="server" ErrorMessage="*姓名必填" ForeColor="red"></asp:RequiredFieldValidator>
		    </td>
	      </tr>
          <tr>
            <td>信箱</td>                
		    <td><asp:TextBox ID="tbEmail" runat="server"></asp:TextBox>
                <asp:RequiredFieldValidator ControlToValidate="tbEmail" ID="RequiredFieldValidator3" runat="server" ErrorMessage="*姓名必填" ForeColor="red"></asp:RequiredFieldValidator>
		    </td>
	      </tr>
          <tr>
            <td>公司</td>                
		    <td><asp:TextBox ID="TextBox4" runat="server"></asp:TextBox>                
		    </td>
	      </tr>
          <tr>
		    <td colspan="2"><asp:Button ID="Button1" runat="server" Text="下一步" OnClick="Button1_Click" /></td>
	      </tr>
        </tbody>
        </table>
            </asp:View>
            <asp:View ID="View2" runat="server">
                <table>	
	      <tbody>
          <tr>
            <td>居住地</td>                
		    <td>
                <asp:RadioButtonList ID="rblFrom"  runat="server" RepeatDirection="Horizontal" RepeatLayout="Flow">
                     <asp:ListItem>北部</asp:ListItem>
                       <asp:ListItem>中部</asp:ListItem>
                       <asp:ListItem>南部</asp:ListItem>                       
                    <asp:ListItem>東部</asp:ListItem>                       
                    <asp:ListItem>離島</asp:ListItem>                       
                </asp:RadioButtonList>
                <asp:RequiredFieldValidator ControlToValidate="rblFrom" ID="RequiredFieldValidator4" runat="server" ErrorMessage="*出發地未選擇" ForeColor="red"></asp:RequiredFieldValidator>
		    </td>
	      </tr>
          <tr>
            <td>專長</td>                
		    <td>                
                <asp:CheckBoxList ID="cblHabit"  runat="server" RepeatDirection="Horizontal" RepeatLayout="Flow">
                    <asp:ListItem>HTML</asp:ListItem>
                    <asp:ListItem>CSS</asp:ListItem>
                    <asp:ListItem>Javascript</asp:ListItem>                       
                    <asp:ListItem>C#</asp:ListItem>                       
                    <asp:ListItem>SQL</asp:ListItem>                       
                </asp:CheckBoxList>                
		    </td>
	      </tr>
          <tr>
            <td>密碼</td>                
		    <td><asp:TextBox ID="tbPassword" TextMode="Password" runat="server"></asp:TextBox>
                <asp:RequiredFieldValidator ControlToValidate="tbPassword" ID="RequiredFieldValidator5" runat="server" ErrorMessage="*密碼必填" ForeColor="red" Display="Dynamic"></asp:RequiredFieldValidator>
                <asp:CompareValidator ControlToValidate="tbPassword" ControlToCompare="tbPassword2" ID="CompareValidator1" runat="server" ErrorMessage="*密碼不同" ForeColor="red"></asp:CompareValidator>                
		    </td>
	      </tr>
          <tr>
            <td>確認密碼</td>                
		    <td><asp:TextBox ID="tbPassword2" TextMode="Password" runat="server"></asp:TextBox>
                <asp:RequiredFieldValidator ControlToValidate="tbPassword2" ID="RequiredFieldValidator6" runat="server" ErrorMessage="*確認密碼必填" ForeColor="red"></asp:RequiredFieldValidator>                
		    </td>
	      </tr>
          <tr>
            <td>備註</td>                
		    <td><asp:TextBox ID="TextBox5" runat="server" MaxLength="400" Rows="20" TextMode="MultiLine" Width="500px"></asp:TextBox>                
		    </td>
	      </tr>
          <tr>
		    <td colspan="2"><asp:Button ID="Button2" runat="server" Text="上一步" OnClick="Button2_Click" /><asp:Button ID="Button3" runat="server" Text="下一步" OnClick="Button3_Click" /></td>
	      </tr>
        </tbody>
        </table>
            </asp:View>
            <asp:View ID="View3" runat="server">
                <table>	
	      <tbody>
          <tr>
            <td>驗証碼<asp:Image ID="Image2" runat="server" ImageUrl="ValidateCode.aspx" /></td>                
		    <td>
                <asp:TextBox ID="tbValidateCode" runat="server"></asp:TextBox>
		    </td>
	      </tr>
          <tr>
		    <td colspan="2"><asp:Button ID="btnSubmit" runat="server" Text="送出" OnClick="btnSubmit_Click" /></td>
	      </tr>
        </tbody>
        </table>
            </asp:View>
            <asp:View ID="View4" runat="server">
                完成<asp:Button ID="btnReset" runat="server" Text="重頭來過" OnClick="btnReset_Click" />
                </asp:View>
            <asp:View ID="View5" runat="server">
                驗証碼錯誤<asp:Button ID="Button4" runat="server" Text="上一步" OnClick="Button4_Click" />
                </asp:View>
        </asp:multiview>
    </div>
        
    </form>
</body>
</html>

