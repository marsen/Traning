
//new 一個minesweeper大物件, 避開與其他.js file變數/函式衝突問題
var _minesweeper = new minesweeper();

//此處表示ready function(縮寫)
$(function () {
    _minesweeper.Pageload();
});

//minesweeper大物件
function minesweeper() {

    //自定義:當他人呼叫Pageload時, 引導至pageload
    this.Pageload = pageload;

    //將此js的global變數放在這
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    var timeValue;

    //地雷數目
    var bombTotal = 10;

    //總格數-長(x向)
    var gridWidth = 8;

    //總格數-寬(y向)
    var gridLength = 8;

    //地雷陣列(依地雷數目決定大小)
    var bombArray = new Array(bombTotal);

    //checkIndex表示目前產生出的地雷座標, 檢查的次數, 每次產生一串地雷後即歸零
    var checkIndex;

    //周邊地雷數量限制
    var bombLimitNum = 3;

    //是否要重新產生地雷, 預設"要"
    var isRecreateBomb = 1;

    //確認遊戲是否成功
    var checkSuccess = 0;

    //time 變數
    var st;

    //jquery的ready function : 會等至整個HTML網頁被載完後才會執行此處
    function pageload() {

        gameStart();

        //重新開始 事件
        $("input").click(function () {

            //時間暫停
            window.clearTimeout(st);

            //alert("重新開始");
            isRecreateBomb = 1;
            //rePlay = 1;
            //訊息清空
            $('#msg').empty();

            //重新開始遊戲
            gameStart();

            //時間歸零
            hours = 0;
            minutes = 0;
            seconds = 0;
            checkSuccess = 0;
            console.log("checkSuccess=" + checkSuccess);
            timeValue = "0 :00 :00";
            $('#clock').html(timeValue);

        });

    }//end of pageload function

    //time run
    function run() {
        //alert("into run");
        //字串組合
        timeValue = ((hours > 12) ? hours - 12 : hours) + " :";
        timeValue += ((minutes < 10) ? " 0" : " ") + minutes + " :";
        timeValue += ((seconds < 10) ? " 0" : " ") + seconds;
        //document.getElementById('clock').innerHTML = timeValue;
        $('#clock').html(timeValue);

        //時間持續往前推
        seconds++;

        if (seconds % 60 == 0) {
            minutes++;
            //秒針歸零
            seconds = 0;

            if (minutes % 60 == 0) {
                hours++;
                //分針歸零
                minutes = 0;
            }
        }

        //每一千毫秒(1秒)執行一次
        st = window.setTimeout(run, 1000);
    }

    //遊戲開始
    function gameStart() {

        alert("遊戲開始");

        //觸發時間前進
        run();

        //不斷重新產生地雷與劃格, 直到完全符合地雷限制數量為止
        while (isRecreateBomb == 1) {

            //將格子各項參數設定
            setAllGridSetiing();
        }

        //設定div觸發事件
        mouseClick();
    }

    //將格子各項參數設定
    function setAllGridSetiing() {



        //產生隨機"bombTotal"個地雷
        createBomb(bombTotal);

        //畫格子, 放入地雷
        drawGrid();

        //格子分類
        setGridClass();

        //檢查周圍有幾顆地雷
        checkBombNum();

        //檢查地雷限制數量
        checkBombLimit(bombLimitNum);
    }

    //檢查地雷限制數量
    function checkBombLimit(num) {

        //每次重畫key會歸零
        var key = 0;

        $("div[gridclass='center'][isBomb='0'], div[gridclass='edge'][isBomb='0']").each(function () {

            //超過地雷限制數量
            if ($(this).attr("aroundbombnum") > num) {
                //console.log("檢查到超過3");
                //有超過的
                key = 1;
                //確認會重畫
                isRecreateBomb = 1;

            }
            else {
                //即使後面檢查的沒超過limit num , 也會因key = 1, 將isRecreateBomb = 1
                if (key == 1) {
                    //確認會重畫
                    isRecreateBomb = 1;
                }
                else {
                    //該次地雷沒超過限制, 可藉此跳出while迴圈
                    isRecreateBomb = 0;
                    //console.log("檢查沒事都很乖");
                }
            }
        });

        //如需重畫
        if (isRecreateBomb == 1) {

            //清空Body底下的元素
            $('.Body').empty();
        }
    }

    //設定地雷's 座標
    function createBomb(bombNum) {

        //動態產生2維陣列
        for (var i = 0; i < bombNum; i++) {
            bombArray[i] = new Array(2);
        }

        //產生一地雷座標
        for (var i = 0; i < bombNum; i++) {

            //checkIndex表示目前產生出的座標, 必須做幾次檢查
            checkIndex = i;

            //產生一組亂數座標
            var randomNum_X = Math.ceil(Math.random() * (gridWidth - 0) - 1);
            var randomNum_Y = Math.ceil(Math.random() * (gridLength - 0) - 1);

            //放進地雷陣列中
            bombArray[i][0] = randomNum_X;
            bombArray[i][1] = randomNum_Y;

            //alert(bombArray[i][0] + "," + bombArray[i][1]);
            //檢查是否有重複
            checkBombArray(randomNum_X, randomNum_Y);
        }
        //alert(randomNum);
        //將檢查值(次數)歸零
        checkIndex = 0;
    }

    //檢查是否有重複
    function checkBombArray(x, y) {

        //currentBomb = [[x, y]];
        console.log("[" + x + "]" + "[" + y + "]");

        for (var i = 0; i < checkIndex; i++) {
            console.log("檢查一次");

            //發現重複
            if ((bombArray[i][0] == x) && (bombArray[i][1] == y)) {
                console.log("重複了!");

                //重新產生一組地雷
                x = Math.ceil(Math.random() * (gridWidth - 0) - 1);
                y = Math.ceil(Math.random() * (gridLength - 0) - 1);
                bombArray[checkIndex][0] = x;
                bombArray[checkIndex][1] = y;
                console.log("new[" + x + "]" + "[" + y + "]");

                //檢查是否有重複-遞迴
                checkBombArray(x, y, checkIndex);
            }


        }
    }

    //畫格子, 放入地雷
    function drawGrid() {
        //alert("bombArray.length" + bombArray.length);
        for (var i = 0; i < gridLength; i++) {
            for (var j = 0; j < gridWidth; j++) {

                //預設沒地雷
                var isBombKey = 0;

                $('.Body').append("<div class=\"grid\" coordinate_x=\"" + j + "\"" + "coordinate_y=\"" + i + "\"" + "isBomb=\"0\" gridClass=\"center\" gridClassLocate=\"\" aroundBombNum=\"\" opened=\"0\">&nbsp;</div>");

                //依照bombArray, 檢查該格是否為地雷格
                for (var k = 0; k < bombArray.length; k++) {

                    //是地雷
                    if ((bombArray[k][0] == j) && (bombArray[k][1] == i)) {
                        isBombKey = 1;
                    }

                    //不是地雷
                    else {
                    }
                }

                if (isBombKey) {
                    //console.log("放地雷");
                    $("div[coordinate_x=" + j + "]" + "div[coordinate_y=" + i + "]").attr("isBomb", "1");
                    $("div[coordinate_x=" + j + "]" + "div[coordinate_y=" + i + "]").css("background-color", "red");
                }
                else {
                    $(' div[coordinate_x = j] [coordinate_y = i] ').attr("isBomb", "0");
                }
            }
            $('.Body').append("</br>");
        }
    }

    //格子分類
    /*
    一、四角區corner(鄰區僅3-right/bottom_right/bottom)
    二、邊緣區edge(不含四角 鄰區僅5-right/bottom_right/bottom/bottom_left/left)
    三、中央區cneter(鄰區有8 top_left/top/top_right/right/bottom_right/bottom/bottom_left/left)
    */
    function setGridClass() {

        //set to corner
        //top-left
        $("div[coordinate_x = '0'][coordinate_y = '0']").attr("gridClass", "corner");
        $("div[coordinate_x = '0'][coordinate_y = '0']").attr("gridClassLocate", "top_left");

        //top-right
        $("div[coordinate_x =" + (gridWidth - 1) + "]" + "[coordinate_y = '0']").attr("gridClass", "corner");
        $("div[coordinate_x =" + (gridWidth - 1) + "]" + "[coordinate_y = '0']").attr("gridClassLocate", "top_right");

        //bottom-left
        $("div[coordinate_x = '0'][coordinate_y =" + (gridLength - 1) + "]").attr("gridClass", "corner");
        $("div[coordinate_x = '0'][coordinate_y =" + (gridLength - 1) + "]").attr("gridClassLocate", "bottom_left");

        //bottom-right
        $("div[coordinate_x =" + (gridWidth - 1) + "][coordinate_y =" + (gridLength - 1) + "]").attr("gridClass", "corner");
        $("div[coordinate_x =" + (gridWidth - 1) + "][coordinate_y =" + (gridLength - 1) + "]").attr("gridClassLocate", "bottom_right");

        //set to edge
        //top edge
        for (var i = 1; i < (gridWidth - 1); i++) {
            $("div[coordinate_x =" + i + "]" + "[coordinate_y = '0']").attr("gridClass", "edge");
            $("div[coordinate_x =" + i + "]" + "[coordinate_y = '0']").attr("gridClassLocate", "edge_top");
        }

        //right edge
        for (var i = 1; i < (gridLength - 1); i++) {
            $("div[coordinate_x =" + (gridWidth - 1) + "][coordinate_y =" + i + "]").attr("gridClass", "edge");
            $("div[coordinate_x =" + (gridWidth - 1) + "][coordinate_y =" + i + "]").attr("gridClassLocate", "edge_right");
        }

        //bottom edge
        for (var i = 1; i < (gridWidth - 1); i++) {
            $("div[coordinate_x =" + i + "]" + "[coordinate_y =" + (gridWidth - 1) + "]").attr("gridClass", "edge");
            $("div[coordinate_x =" + i + "]" + "[coordinate_y =" + (gridWidth - 1) + "]").attr("gridClassLocate", "edge_bottom");
        }

        //left edge
        for (var i = 1; i < (gridLength - 1); i++) {
            $("div[coordinate_x ='0']" + "[coordinate_y =" + i + "]").attr("gridClass", "edge");
            $("div[coordinate_x ='0']" + "[coordinate_y =" + i + "]").attr("gridClassLocate", "edge_left");
        }
    }

    //檢查周圍有幾顆地雷, 填入周邊地雷數字
    function checkBombNum() {

        for (var i = 0; i < gridWidth; i++) {
            for (var j = 0; j < gridLength; j++) {

                var gridType = $("div[coordinate_x=" + j + "]" + "div[coordinate_y=" + i + "]").attr("gridClass");
                //console.log(gridType);
                switch (gridType) {
                    case "corner":
                        {
                            //console.log("corner:");
                            var gridTypeSec = $("div[coordinate_x=" + j + "]" + "div[coordinate_y=" + i + "]").attr("gridClassLocate");

                            //corner的第二層分類
                            switch (gridTypeSec) {
                                case "top_left":
                                    {
                                        var bombNum = 0;
                                        //var aroundBombNum = calBomb(gridTypeSec);
                                        if ($("div[coordinate_x=" + (j + 1) + "]" + "div[coordinate_y=" + i + "]").attr("isBomb") == 1) {
                                            bombNum++;
                                        }
                                        if ($("div[coordinate_x=" + (j + 1) + "]" + "div[coordinate_y=" + (i + 1) + "]").attr("isBomb") == 1) {
                                            bombNum++;
                                        }
                                        if ($("div[coordinate_x=" + (j) + "]" + "div[coordinate_y=" + (i + 1) + "]").attr("isBomb") == 1) {
                                            bombNum++;
                                        }
                                        //console.log("top_left:" + bombNum);
                                        //set bomb numbers to attribute - aroundBombNum
                                        $("div[coordinate_x=" + (j) + "]" + "div[coordinate_y=" + (i) + "]").attr("aroundBombNum", bombNum);
                                        break;
                                    }
                                case "top_right":
                                    {
                                        var bombNum = 0;
                                        //var aroundBombNum = calBomb(gridTypeSec);
                                        if ($("div[coordinate_x=" + (j) + "]" + "div[coordinate_y=" + (i + 1) + "]").attr("isBomb") == 1) {
                                            bombNum++;
                                        }
                                        if ($("div[coordinate_x=" + (j - 1) + "]" + "div[coordinate_y=" + (i + 1) + "]").attr("isBomb") == 1) {
                                            bombNum++;
                                        }
                                        if ($("div[coordinate_x=" + (j - 1) + "]" + "div[coordinate_y=" + (i) + "]").attr("isBomb") == 1) {
                                            bombNum++;
                                        }
                                        //console.log("top_right:" + bombNum);
                                        //set bomb numbers to attribute - aroundBombNum
                                        $("div[coordinate_x=" + (j) + "]" + "div[coordinate_y=" + (i) + "]").attr("aroundBombNum", bombNum);
                                        break;
                                    }
                                case "bottom_left":
                                    {
                                        var bombNum = 0;
                                        //var aroundBombNum = calBomb(gridTypeSec);
                                        if ($("div[coordinate_x=" + (j) + "]" + "div[coordinate_y=" + (i - 1) + "]").attr("isBomb") == 1) {
                                            bombNum++;
                                        }
                                        if ($("div[coordinate_x=" + (j + 1) + "]" + "div[coordinate_y=" + (i - 1) + "]").attr("isBomb") == 1) {
                                            bombNum++;
                                        }
                                        if ($("div[coordinate_x=" + (j + 1) + "]" + "div[coordinate_y=" + (i) + "]").attr("isBomb") == 1) {
                                            bombNum++;
                                        }
                                        //console.log("bottom_left:" + bombNum);
                                        //set bomb numbers to attribute - aroundBombNum
                                        $("div[coordinate_x=" + (j) + "]" + "div[coordinate_y=" + (i) + "]").attr("aroundBombNum", bombNum);
                                        break;
                                    }
                                case "bottom_right":
                                    {
                                        var bombNum = 0;
                                        //var aroundBombNum = calBomb(gridTypeSec);
                                        if ($("div[coordinate_x=" + (j - 1) + "]" + "div[coordinate_y=" + (i - 1) + "]").attr("isBomb") == 1) {
                                            bombNum++;
                                        }
                                        if ($("div[coordinate_x=" + (j) + "]" + "div[coordinate_y=" + (i - 1) + "]").attr("isBomb") == 1) {
                                            bombNum++;
                                        }
                                        if ($("div[coordinate_x=" + (j - 1) + "]" + "div[coordinate_y=" + (i) + "]").attr("isBomb") == 1) {
                                            bombNum++;
                                        }
                                        //console.log("bottom_right:" + bombNum);
                                        //set bomb numbers to attribute - aroundBombNum
                                        $("div[coordinate_x=" + (j) + "]" + "div[coordinate_y=" + (i) + "]").attr("aroundBombNum", bombNum);
                                        break;
                                    }
                                default:
                                    {
                                        break;
                                    }
                            }

                            //end of case corner
                            break;
                        }
                    case "edge":
                        {
                            //console.log("edge_top:");
                            var gridTypeSec = $("div[coordinate_x=" + j + "]" + "div[coordinate_y=" + i + "]").attr("gridClassLocate");
                            switch (gridTypeSec) {
                                case "edge_top":
                                    {
                                        var bombNum = 0;
                                        if ($("div[coordinate_x=" + (j + 1) + "]" + "div[coordinate_y=" + (i) + "]").attr("isBomb") == 1) {
                                            bombNum++;
                                        }
                                        if ($("div[coordinate_x=" + (j + 1) + "]" + "div[coordinate_y=" + (i + 1) + "]").attr("isBomb") == 1) {
                                            bombNum++;
                                        }
                                        if ($("div[coordinate_x=" + (j) + "]" + "div[coordinate_y=" + (i + 1) + "]").attr("isBomb") == 1) {
                                            bombNum++;
                                        }
                                        if ($("div[coordinate_x=" + (j - 1) + "]" + "div[coordinate_y=" + (i + 1) + "]").attr("isBomb") == 1) {
                                            bombNum++;
                                        }
                                        if ($("div[coordinate_x=" + (j - 1) + "]" + "div[coordinate_y=" + (i) + "]").attr("isBomb") == 1) {
                                            bombNum++;
                                        }
                                        //console.log("edge_top:" + bombNum);
                                        //set bomb numbers to attribute - aroundBombNum
                                        $("div[coordinate_x=" + (j) + "]" + "div[coordinate_y=" + (i) + "]").attr("aroundBombNum", bombNum);
                                        break;
                                    }
                                case "edge_right":
                                    {
                                        var bombNum = 0;
                                        if ($("div[coordinate_x=" + (j - 1) + "]" + "div[coordinate_y=" + (i - 1) + "]").attr("isBomb") == 1) {
                                            bombNum++;
                                        }
                                        if ($("div[coordinate_x=" + (j) + "]" + "div[coordinate_y=" + (i - 1) + "]").attr("isBomb") == 1) {
                                            bombNum++;
                                        }
                                        if ($("div[coordinate_x=" + (j) + "]" + "div[coordinate_y=" + (i + 1) + "]").attr("isBomb") == 1) {
                                            bombNum++;
                                        }
                                        if ($("div[coordinate_x=" + (j - 1) + "]" + "div[coordinate_y=" + (i + 1) + "]").attr("isBomb") == 1) {
                                            bombNum++;
                                        }
                                        if ($("div[coordinate_x=" + (j - 1) + "]" + "div[coordinate_y=" + (i) + "]").attr("isBomb") == 1) {
                                            bombNum++;
                                        }
                                        //console.log("edge_right:" + bombNum);
                                        //set bomb numbers to attribute - aroundBombNum
                                        $("div[coordinate_x=" + (j) + "]" + "div[coordinate_y=" + (i) + "]").attr("aroundBombNum", bombNum);
                                        break;
                                    }
                                case "edge_bottom":
                                    {
                                        var bombNum = 0;
                                        if ($("div[coordinate_x=" + (j - 1) + "]" + "div[coordinate_y=" + (i - 1) + "]").attr("isBomb") == 1) {
                                            bombNum++;
                                        }
                                        if ($("div[coordinate_x=" + (j) + "]" + "div[coordinate_y=" + (i - 1) + "]").attr("isBomb") == 1) {
                                            bombNum++;
                                        }
                                        if ($("div[coordinate_x=" + (j + 1) + "]" + "div[coordinate_y=" + (i - 1) + "]").attr("isBomb") == 1) {
                                            bombNum++;
                                        }
                                        if ($("div[coordinate_x=" + (j + 1) + "]" + "div[coordinate_y=" + (i) + "]").attr("isBomb") == 1) {
                                            bombNum++;
                                        }
                                        if ($("div[coordinate_x=" + (j - 1) + "]" + "div[coordinate_y=" + (i) + "]").attr("isBomb") == 1) {
                                            bombNum++;
                                        }
                                        //console.log("edge_bottom:" + bombNum);
                                        //set bomb numbers to attribute - aroundBombNum
                                        $("div[coordinate_x=" + (j) + "]" + "div[coordinate_y=" + (i) + "]").attr("aroundBombNum", bombNum);
                                        break;
                                    }
                                case "edge_left":
                                    {
                                        var bombNum = 0;
                                        if ($("div[coordinate_x=" + (j) + "]" + "div[coordinate_y=" + (i - 1) + "]").attr("isBomb") == 1) {
                                            bombNum++;
                                        }
                                        if ($("div[coordinate_x=" + (j + 1) + "]" + "div[coordinate_y=" + (i - 1) + "]").attr("isBomb") == 1) {
                                            bombNum++;
                                        }
                                        if ($("div[coordinate_x=" + (j + 1) + "]" + "div[coordinate_y=" + (i) + "]").attr("isBomb") == 1) {
                                            bombNum++;
                                        }
                                        if ($("div[coordinate_x=" + (j + 1) + "]" + "div[coordinate_y=" + (i + 1) + "]").attr("isBomb") == 1) {
                                            bombNum++;
                                        }
                                        if ($("div[coordinate_x=" + (j) + "]" + "div[coordinate_y=" + (i + 1) + "]").attr("isBomb") == 1) {
                                            bombNum++;
                                        }
                                        //console.log("edge_left:" + bombNum);
                                        //set bomb numbers to attribute - aroundBombNum
                                        $("div[coordinate_x=" + (j) + "]" + "div[coordinate_y=" + (i) + "]").attr("aroundBombNum", bombNum);
                                        break;
                                    }
                                default:
                                    {
                                        break;
                                    }
                            }
                            //end of case edge
                            break;
                        }
                    case "center":
                        {
                            var bombNum = 0;
                            if ($("div[coordinate_x=" + (j - 1) + "]" + "div[coordinate_y=" + (i - 1) + "]").attr("isBomb") == 1) {
                                bombNum++;
                            }
                            if ($("div[coordinate_x=" + (j) + "]" + "div[coordinate_y=" + (i - 1) + "]").attr("isBomb") == 1) {
                                bombNum++;
                            }
                            if ($("div[coordinate_x=" + (j + 1) + "]" + "div[coordinate_y=" + (i - 1) + "]").attr("isBomb") == 1) {
                                bombNum++;
                            }
                            if ($("div[coordinate_x=" + (j + 1) + "]" + "div[coordinate_y=" + (i) + "]").attr("isBomb") == 1) {
                                bombNum++;
                            }
                            if ($("div[coordinate_x=" + (j + 1) + "]" + "div[coordinate_y=" + (i + 1) + "]").attr("isBomb") == 1) {
                                bombNum++;
                            }

                            //6
                            if ($("div[coordinate_x=" + (j) + "]" + "div[coordinate_y=" + (i + 1) + "]").attr("isBomb") == 1) {
                                bombNum++;
                            }
                            if ($("div[coordinate_x=" + (j - 1) + "]" + "div[coordinate_y=" + (i + 1) + "]").attr("isBomb") == 1) {
                                bombNum++;
                            }
                            if ($("div[coordinate_x=" + (j - 1) + "]" + "div[coordinate_y=" + (i) + "]").attr("isBomb") == 1) {
                                bombNum++;
                            }
                            //console.log("center:" + bombNum);
                            //set bomb numbers to attribute - aroundBombNum
                            $("div[coordinate_x=" + (j) + "]" + "div[coordinate_y=" + (i) + "]").attr("aroundBombNum", bombNum);
                            break;
                        }
                    default:
                        {
                            break;
                        }
                }
            }
        }

    }

    //打開四周方格
    function openAround(x, y, bombNum) {

        //先開自己
        //設置開過後的顏色
        $("div[coordinate_x=" + x + "]" + "div[coordinate_y=" + y + "]").css("background", "white");

        //周圍地雷數為零時, 不顯示數字
        if (bombNum != 0) {

            //將周圍地雷數顯示在該格 表示該格周圍有幾個地雷
            $("div[coordinate_x=" + x + "]" + "div[coordinate_y=" + y + "]").html(bombNum);
        }
        //設置自己已經被開過
        $("div[coordinate_x=" + x + "]" + "div[coordinate_y=" + y + "]").attr("opened", "1");
        //var aroundBombNum = $("div[coordinate_x=" + (x) + "]" + "div[coordinate_y=" + (y) + "]").attr("aroundBombNum");

        console.log("x,y=" + x + "," + y);
        //console.log("x + 1=" + (x + 1));
        var xx = parseInt(x, 10);
        var yy = parseInt(y, 10);

        console.log("xx=" + xx);
        //確認自己有無被開過
        var isOpen = $("div[coordinate_x=" + x + "]" + "div[coordinate_y=" + y + "]").attr("opened");

        //自己是0 且未被開過才進入3*3迴圈
        //if (bombNum == 0 && isOpen == 0) {
        if (bombNum == 0) {
            console.log("pass checked");
            for (var i = xx - 1; i <= xx + 1; i++) {
                //console.log("i=" + i);
                for (var j = (yy - 1); j <= (yy + 1); j++) {

                    //跳過自己不進入遞迴
                    if (i == xx && j == yy) {
                        j++;
                    }

                    //若該格非地雷周邊

                    console.log("掃雷周邊一格");


                    if (i >= 0 && j >= 0) {
                        console.log("真正需要掃雷格");
                        console.log("掃雷i,j=" + i + "," + j);

                        //設置開過後的顏色
                        $("div[coordinate_x=" + i + "]" + "div[coordinate_y=" + j + "]").css("background", "white");

                        var num = $("div[coordinate_x=" + i + "]" + "div[coordinate_y=" + j + "]").attr("bombNum");
                        
                        //將周圍地雷數顯示在該格 表示該格周圍有幾個地雷
                        $("div[coordinate_x=" + i + "]" + "div[coordinate_y=" + j + "]").html(num);


                        var isOpen = $("div[coordinate_x=" + (i) + "]" + "div[coordinate_y=" + (j) + "]").attr("opened");
                        if (isOpen == 0) {
                            var aroundBombNum = $("div[coordinate_x=" + (i) + "]" + "div[coordinate_y=" + (j) + "]").attr("aroundBombNum");
                            openAround(i, j, aroundBombNum);
                        }

                        //設置已經被開過
                        $("div[coordinate_x=" + i + "]" + "div[coordinate_y=" + j + "]").attr("opened", "1");
                    }
                }//inner for loop
            }//outer for loop
        }
        //console.log("br");
    }

    //滑鼠左鍵觸發事件
    function mouseClick() {
        $('div .grid').on("click", function () {
            console.log("click");

            //該格資訊
            var current_x = $(this).attr("coordinate_x");

            //var testInt = parseInt("current_x", 10);
            //console.log("current_x=" + testInt);

            var current_y = $(this).attr("coordinate_y");
            var aroundBombNum = $(this).attr("aroundBombNum");

            //如未被打開過
            if ($(this).attr("opened") == 0) {
                if ($(this).attr("isBomb") == 1) {

                    //踩到地雷後, 全部地雷攤開為黑色
                    $("div[isBomb='1']").css("background", "black");
                    $("div[isBomb='1']").html("<img class='clanbomber' src = 'images/clanbomber.png' //>");

                    //踩到地雷那格要標記
                    $(this).attr("opened", "1");
                    $(this).css("background", "gray");
                    $(this).html("<img class='clanbomber' src = 'images/Mr. Bomb.png' //>");

                    //警告:遊戲結束
                    //alert("真可惜,你踩到地雷了.下次再加油");
                    $("#msg").text("真可惜,你踩到地雷了.下次再加油");
                    window.clearTimeout(st);
                }
                else {

                    //周圍有雷
                    if ($(this).attr("aroundBombNum") != 0) {
                        //如該格為鄰邊有地雷之格子, 打開8方位的格子

                        //打開四周方格
                        openAround(current_x, current_y, aroundBombNum);
                    }

                    //周圍無雷
                    else {
                        openAround(current_x, current_y, aroundBombNum);
                    }
                }

            }

            //每次點選滑鼠時都會將checkSuccess設回1
            checkSuccess = 1;

            //對所有非雷區做檢查, 若進入isFin == 0表示還未將把所有非雷區開啟, 遊戲尚未結束
            $("div[isBomb='0']").each(function () {
                //查詢是否已開啟
                var isFin = $(this).attr("opened");
                if (isFin == 0) {

                    //表示還有沒開的
                    checkSuccess = 0;
                }

            });

            //每次點選滑鼠時都會檢查遊戲是否結束
            //若到最後所有div grid都查完了, checkSuccess仍為1, 表示遊戲結束
            if (checkSuccess == 1) {
                //var min = $()
                //alert("恭喜你於" + minutes + "分" + (parseInt(seconds, 10) - 1) + "秒完成遊戲");
                $("#msg").text("恭喜你於" + minutes + "分" + (parseInt(seconds, 10) - 1) + "秒完成遊戲");
                window.clearTimeout(st);
            }
        });


    }

} //end of minesweeper function