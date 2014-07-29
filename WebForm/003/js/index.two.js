
window.PageObject =
    {
        Sort: function () {

        },
        SetStatus: function (that) {
            console.log(that);
        },
        SetList: function () {
            console.log("SetList");
        },
        SetMore: function () {

        }
    };

(function () {

    //*****set list*****
    PageObject.SetList();
    //*****

    //*****event*****
    //sort
    $("#sort").change(function () {
        PageObject.Sort();
    });
    //buttons of status
    $(".btn").live("click", function () {
        PageObject.SetStatus(this);
    });
    //more
    $("#more").click(function () {
        PageObject.SetMore();
    });
    //*****
})();


