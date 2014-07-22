window.onload = function () {
    
    var timer = setInterval(function () { clockStart(); }, 10);

    function clockStart() {
        var hourPoint = document.getElementsByClassName("hand hour")[0],
            minutePoint = document.getElementsByClassName("hand minute")[0],
            secondsPoint = document.getElementsByClassName("hand second")[0];
        var date = new Date();
        var seconds = date.getSeconds() * 6,
            minute = date.getMinutes() * 6,
            hours = date.getHours() * 30 + (minute / 12);        
        secondsPoint.style.webkitTransform = "rotate(" + seconds + "deg)";
        minutePoint.style.webkitTransform = "rotate(" + minute + "deg)";
        hourPoint.style.webkitTransform = "rotate(" + hours + "deg)";
    }

    function myStopFunction() {
        clearInterval(timer);
    }
    
};

