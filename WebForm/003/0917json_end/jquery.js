//jquery的ready function : 會等至整個HTML網頁被載完後才會執行此處
$(document).ready(function () {

    //list id 名稱(可新增:row10 row11...)
    var ArrTest = ["row0", "row1", "row2", "row3", "row4", "row5", "row6", "row7", "row8", "row9"];
    //初始id值, 由row0開始創建
    var currentIDMax = -1;
    var rowStr = "row";
    var randomNum;
    var newArrayElement;

    //第一次載入頁面進入函式, 抓取json資料, 並顯示10筆資料
    getJSON();

    /*遞增遞減function*/

    //文章遞減
    var articleDESC = function (a, b) {
        //console.log("a:" + a + "b:" + b);
        return parseInt($(b).find($('.menu .memList .info .articleNum')).text(), 10) - parseInt($(a).find($('.menu .memList .info .articleNum')).text(), 10);
    }
    //文章遞增
    var articleASC = function (a, b) {
        return parseInt($(a).find($('.menu .memList .info .articleNum')).text(), 10) - parseInt($(b).find($('.menu .memList .info .articleNum')).text(), 10);
    }

    //按讚遞減
    var likedDESC = function (a, b) {
        return parseInt($(b).find($('.menu .memList .info .likedNum')).text(), 10) - parseInt($(a).find($('.menu .memList .info .likedNum')).text(), 10);
    }
    //按讚遞增
    var likedASC = function (a, b) {
        return parseInt($(a).find($('.menu .memList .info .likedNum')).text(), 10) - parseInt($(b).find($('.menu .memList .info .likedNum')).text(), 10);
    }

    //名稱遞減
    var nameDESC = function (a, b) {
        //console.log("+++");
        return $(a).find($('.menu .memList .info .name')).text() > $(b).find($('.menu .memList .info .name')).text() ? 1 : -1;
    }
    //名稱遞增
    var nameASC = function (a, b) {
        return $(a).find($('.menu .memList .info .name')).text() < $(b).find($('.menu .memList .info .name')).text() ? 1 : -1;
    }
    //已訂->未訂
    var followDESC = function (a, b) {
        var aValue = $(a).find($('.menu .memList .isfollow .Btn > button')).val();
        var bValue = $(b).find($('.menu .memList .isfollow .Btn > button')).val();

        if ((aValue - bValue) == 1) {
            return -1;
        }
        if ((aValue - bValue) == -1) {
            return 1;
        }
        else {
            return 1;
        }
    }
    //未訂->已訂
    var followASC = function (a, b) {
        var aValue = $(a).find($('.menu .memList .isfollow .Btn > button')).val();
        var bValue = $(b).find($('.menu .memList .isfollow .Btn > button')).val();

        if ((aValue - bValue) == 1) {
            return 1;
        }
        if ((aValue - bValue) == -1) {
            return -1;
        }
        else {
            return 1;
        }
    }
    //排序function
    var sortByfunction = function (sortBy) {
        var sortEle = $('.menu .memList').sort(sortBy);
        //$('.menu').empty().append(sortEle);

        //刪除舊有br
        $('.menu > br').remove();
        //搜尋結果移到.addMoreBtnLocation之前
        $('.addMoreBtnLocation').before(sortEle);
    }

    //下拉式選單變動時觸發事件
    $("#sortSelect").change(function () {
        //console.log("change!" + $("#sortSelect").val());

        var selectedVal = $("#sortSelect").val();
        //sort分類
        switch (selectedVal) {
            //根據文章數量-遞減                   
            case "sortByArticle":
                {
                    sortByfunction(articleDESC);
                    $('.memList').after("</br>");
                    break;
                }
                //根據文章數量-遞增
            case "sortByArticleReverse":
                {
                    sortByfunction(articleASC);
                    $('.memList').after("</br>");
                    break;
                }
                //根據按讚數量-遞減 
            case "sortByLiked":
                {
                    sortByfunction(likedDESC);
                    $('.memList').after("</br>");
                    break;
                }
                //根據按讚數量-遞增 
            case "sortByLikedReverse":
                {
                    sortByfunction(likedASC);
                    $('.memList').after("</br>");
                    break;
                }
                //根據名稱-遞減 
            case "sortByName":
                {
                    sortByfunction(nameDESC);
                    $('.memList').after("</br>");
                    break;
                }
                //根據名稱-遞增 
            case "sortByNameReverse":
                {
                    sortByfunction(nameASC);
                    $('.memList').after("</br>");
                    break;
                }
            case "sortBySubscribe":
                {
                    sortByfunction(followDESC);
                    $('.memList').after("</br>");
                    break;
                }
            case "sortBySubscribeReverse":
                {
                    sortByfunction(followASC);
                    $('.memList').after("</br>");
                    break;
                }
            default:
                {
                    break;
                }
        }
    });

    //取得資料
    function getJSON() {
        $.ajax({
            //資料來源
            url: "http://192.168.10.109/traning/003/Handler.ashx",
            type: "GET",
            //資料型態
            dataType: "json",
            //讀取成功:Jdata為解析後資料格式
            success: function (Jdata) {
                //alert("Get JSON SUCCESS!!!");
                //初始id(第一次進入頁面, 讀取10筆資料貼至網頁)
                if (currentIDMax == -1) {
                    firstShow(Jdata);
                }
                else {
                    //按下更多按鈕之後
                    secondShow(Jdata);
                }

            }, //end of success: function(Jdata)
            //讀取失敗->警告
            error: function () {
                alert("Get JSON ERROR!!!");
            }
        }); //end of $.ajax
    }
    //第一次顯示10筆資料
    function firstShow(Jdata) {
        //一開始顯示為10筆資料
        //var jsonDataNum = Jdata.length;
        for (var i = 0; i < 10; i++) {
            currentIDMax = currentIDMax + 1;
            //灌入資料
            createChannel(i, Jdata, currentIDMax);
            console.log("currentIDMax = " + currentIDMax);
        }
        //新增按鈕
        createAddChannelBtn(Jdata);
    }

    //按下更多按鈕之後
    function secondShow(Jdata) {
        //顯示5筆資料
        //亂數產生
        var k = 0;
        for (var k = 0; k < 5; k++) {
            //id+1 由row10開始新增 row11 row12 row13...
            currentIDMax = currentIDMax + 1;

            //字串組合, push新增一row?至陣列中充當rowID
            newArrayElement = rowStr.concat(currentIDMax);
            ArrTest.push(newArrayElement);

            //隨機選擇資料 randomNum (範圍:0-9)因原始資料只有10筆
            randomNum = Math.floor((Math.random() * 9) + 1);
            //console.log(randomNum);
            //console.log("now k = " + k);

            //灌入資料, 創建channel row list
            createChannel(randomNum, Jdata, currentIDMax);
            //console.log("currentIDMax = " + currentIDMax);
        }
        //移動按鈕至menu最下方
        $('.addMoreBtnLocation').appendTo('.menu');
    }

    //創建一筆channel, i可自訂
    function createChannel(i, data, dataIndex) {

        var picPath = data[i].Picture;
        //灌入資料
        //使用append插入<table></table>的HTML一列
        $('.menu').append("<div" + " " + "id=\"row" + dataIndex + "\"" + " " + "class=\"memList\">" + "<div class=\"picture\"><div class=\"picBackground\"><img src=\".\\images\\" + picPath + "\"><\/img><\/div><\/div>" + "<div class=\"info\"><\/div>" + "<div class=\"isfollow\"><div class=\"Btn\"><\/div><\/div>" + "<\/div><\/br>");
        //產生info資訊
        $("#" + ArrTest[dataIndex] + " " + ".info").append("<div class=\"name\">" + data[i]["Name"] + "</div><div class='articleTitle'>文章： " + "<div class='articleNum'>" + data[i]["Number"] + "</div>" + "　收到讚： " + "<div class='likedNum'>" + data[i]["Like"] + "</div></div>");

        // 已追蹤,顯示v已收看
        if (data[i]["IsFollow"]) {
            console.log("btn is false");
            // $('#row0 .Btn').append...
            $("#" + ArrTest[dataIndex] + " " + ".Btn").append($('<button type="button" class="receivedBtn" value="1">v已收看</button>'));
            // 按鈕事件處理
            eventHandle(dataIndex);
        }
        // 未追蹤,顯示+收看
        else {
            console.log("btn is true");
            $("#" + ArrTest[dataIndex] + " " + ".Btn").append($('<button type="button" class="receiveBtn" value="0">+收看</button>'));
            // 按鈕事件處理
            eventHandle(dataIndex);
        }

    }

    //訂閱按鈕的事件處理, 其中使用on(), 表示動態產生的follow按鈕也會有其相同效果
    function eventHandle(i) {
        //v已收看 --> +收看
        $("#" + ArrTest[i] + " " + ".isfollow").on("click", ".receivedBtn", function () {
            $(this).attr("class", "receiveBtn");
            $(this).attr("value", "0");
            $(this).html("+收看");
        });
        //+收看-->v已收看
        $("#" + ArrTest[i] + " " + ".isfollow").on("click", ".receiveBtn", function () {
            $(this).attr("class", "receivedBtn");
            $(this).attr("value", "1");
            $(this).html("v已收看");
        });
        //取消收看--> +收看
        $("#" + ArrTest[i] + " " + ".isfollow").on("click", ".cancelReceivedBtn", function () {
            $(this).attr("class", "receiveBtn");
            $(this).attr("value", "0");
            $(this).html("+收看");
        });

        //滑鼠移進
        $("#" + ArrTest[i] + " " + ".isfollow").on("mouseenter", ".receivedBtn", function () {
            $(this).attr("class", "cancelReceivedBtn");
            $(this).html("取消收看");
        });
        //滑鼠移出
        $("#" + ArrTest[i] + " " + ".isfollow").on("mouseleave", ".cancelReceivedBtn", function () {
            $(this).attr("class", "receivedBtn");
            $(this).html("v已收看");
        });
    }

    //新增頻道按鈕(更多)
    function createAddChannelBtn(data) {
        $('.menu').append($('<div class="addMoreBtnLocation"><button type="button" id="addMore" class="addChannelBtn">更多</button></div>'));
        $('#addMore').on("click", function () {
            //新增5筆資料
            getJSON();
            //移動按鈕至menu最下方
            //$('.addMoreBtnLocation').appendTo('.menu');
            //滑動至頁面底端
            $("html, body").animate({ scrollTop: $(document).height() }, "slow");
        });
    }

    //XMLHttpRequest從JSON資料庫中抓取資料，keywords = JSON.parse(http_request.responseText);
    var http_request = false;

    function makeRequest(url) {

        http_request = false;

        if (window.XMLHttpRequest) { // Mozilla, Safari,...
            http_request = new XMLHttpRequest();
            if (http_request.overrideMimeType) {
                http_request.overrideMimeType('text/xml');
            }
        } else if (window.ActiveXObject) { // IE
            try {
                http_request = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    http_request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) { }
            }
        }

        if (!http_request) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }
        http_request.onreadystatechange = alertContents;
        http_request.open('GET', url, true);
        http_request.send(null);

    }

    function alertContents() {

        if (http_request.readyState == 4) {
            if (http_request.status == 200) {
                //alert(http_request.responseText); //http_request.responseText即為抓到的字串
                strJSON = http_request.responseText

                // 剖析JSON
                //var keywords = JSON.parse(http_request.responseText);
                // 字串陣列長度不為0時加以處理
                //var strJSON = keywords.	
                //JData = JSON.parse(http_request.responseText);

            } else {
                alert('There was a problem with the request.');
            }
        }

    }


    //end of ready function
});
