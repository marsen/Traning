<%@ Page Language="VB" AutoEventWireup="false" CodeFile="JSONP.aspx.vb" Inherits="JSONP_JSONP" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.8.3.min.js"></script>
    <script type="text/javascript">
        $(function() {
            $.ajax({
                url: "https://localhost/testweb/ashx/jsonphandler.ashx",
                async: true,
                type: 'get',
                dataType: 'jsonp'
            }).done(function (data) {
                debugger;
                  if (console && console.log) {
                      console.log("Sample of data:", data.slice(0, 100));
                  }
              });
        });
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
    </div>
    </form>
</body>
</html>
