<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ajax.aspx.cs" Inherits="_003_ajax" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="style/main-body.css" rel="stylesheet" type="text/css" />
    <link href="style/main.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <div id="content-round" style="margin: 0 auto; float: none;">
        <div class="rss-content-bast-hot-large">
            <div class="community-title-name">Exercise</div>
            <div class="infnext-out" style="margin-top: 4px;">
                <select class="drop-down-m">
                    <option value="articleCount">文章數</option>
                    <option value="countTotal">統計數</option>
                    <option value="ctime">建檔日期</option>
                </select>
            </div>
        </div>
        <div id="list" class="rss-content-center-box">
            <!-- list content  -->
                    <li>
            <div class="rss-content-bast-hot-image-bastnew cardShow">
                <span class=""><a href="#"><img src="{image}" width="30" height="30"></a></span>
            </div>
            <div class="rss-content-right-text" style="width:400px; margin-bottom:15px">
                <div class="mc-box">
                    <span class="member-name cardShow">
                        <a href="#">{name}</a>
                    </span>
                </div>
                <div class="push-content-title-order-right">文章：<span class="usefont-color-red">{number}</span>&nbsp;&nbsp;&nbsp;收到讚：<span class="usefont-color-red">{like}</span></div>
            </div>
            <input type="button" value="已收看" class="watchal-b">
        </li>
            <!--  -->
        </div>
        <div class="rss-content-center-box" style="height: 90px;">
            <table border="0" align="center" cellpadding="0" cellspacing="0">
                <tbody>
                    <tr>
                        <td>
                            <input type="submit" name="button" id="more" value="更多" class="tb-button" style="width: 100px"></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="rss-content-center-box" style="height: 90px;"></div>
        <div class="rss-content-center-box" style="height: 90px;"></div>
    </div>
    </form>
</body>
</html>
