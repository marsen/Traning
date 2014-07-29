
_PageObject = new PageObject();

(function () {

    //*****set list*****
    _PageObject.SetList();
    //*****
    
    //*****event*****
    //sort
    $("#sort").change(function () {
        _PageObject.SetStatus(this);
    });
    //buttons of status
    $(".btn").live("click",function() {
        _PageObject.SetStatus(this);
    });
    //more
    $("#more").click(function () {
        _PageObject.SetStatus(this);
    });
    //*****
})();

function PageObject() {

    this.Sort = sort;

    this.SetStatus = setStatus;

    this.SetList = setList;
    
    this.setMore = setMore;

    function sort(index) {
        //sort
    }
    
    function setStatus(that) {
        //set channel's status
    }

    function setList() {
        var template = getTemplate();
        var code = "";
        for (var i = 0; i < 10; i++) {
            code += template;
        }
        $("#list").html(code);
    }
    
    function setMore() {

    }
    
    function getTemplate() {
        var code = "<li><div class='rss-content-bast-hot-image-bastnew cardShow'>";
        code += "<span class=''><a href='#'><img src='../images/head/370759_100001233124312_1167673990_q.jpg' width='30' height='30'></a></span></div>";
        code += "<div class='rss-content-right-text' style='width:400px; margin-bottom:15px'>";
        code += "<div class='mc-box'><span class='member-name cardShow'><a href='#'>Yui Aragaki</a></span></div>";
        code += "<div class='push-content-title-order-right'>文章：<span class='usefont-color-red'>427,433</span>&nbsp;&nbsp;&nbsp;收到讚：<span class='usefont-color-red'>19,171</span></div></div>";
        code += "<input type='button' value='已收看' class='watchal-b'></li>";
        return code;
    }
}