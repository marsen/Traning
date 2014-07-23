window.onload = function () {

    var timer = setInterval(function() { clockStart(); }, 10);
    var dragData;
    var clock = document.getElementById('clock'),
        alertTime = document.getElementById("alertTime");
    var clockX = clock.offsetLeft + clock.offsetWidth / 2,
        clockY = clock.offsetTop + clock.offsetHeight / 2;

    function clockStart() {
        var hourPoint = document.getElementsByClassName("hand hour")[0],
            minutePoint = document.getElementsByClassName("hand minute")[0],
            secondsPoint = document.getElementsByClassName("hand second")[0],
            alertPoint = document.getElementById("alert");
        var date = new Date();
        var seconds = date.getSeconds() * 6,
            minute = date.getMinutes() * 6,
            hours = date.getHours()%12 * 30 + (minute / 12);        
        secondsPoint.style.webkitTransform = "rotate(" + seconds + "deg)";
        minutePoint.style.webkitTransform = "rotate(" + minute + "deg)";
        hourPoint.style.webkitTransform = "rotate(" + hours + "deg)";
        if (!dragData) {
            checkAlert(alertPoint, hourPoint);
        }
        

    }

    function checkAlert(alertPoint, hourPoint) {
        var alertAngle = alertPoint.style.webkitTransform.replace(/^rotate\(|deg\)/g, ""),
            hourAngle = hourPoint.style.webkitTransform.replace(/^rotate\(|deg\)/g, "");
        
        if (Math.abs(alertAngle - hourAngle) < 6 && document.getElementById("audio").innerHTML == "") {
            document.getElementById("audio").innerHTML = '<embed hidden="true" autostart="true" loop="true" src="alert.wav" />';
        }
    }

    function myStopFunction() {
        document.getElementById("audio").innerHTML = "";
    }
    
    document.getElementById('stop').onclick = myStopFunction;
    document.getElementById('alert').onmousedown = startDrag;
    document.body.onmousemove = draging;
    document.body.onmouseup = stopDrag;

    function startDrag(ev) {
        if (!dragData) {

            ev = ev || event;
            dragData = {
                x: ev.clientX - clock.offsetLeft,
                y: ev.clientY - clock.offsetTop
            };
        };
    }
    function draging(ev) {
        if (dragData) {
            ev = ev || event;
            var angle = getAngle(clockX, clockY, ev.clientX, ev.clientY);
            var difX = ev.clientX - clockX, difY = ev.clientY - clockY;
            //console.log("angle:"+angle);
            if (difX >= 0 && difY < 0) {
                //象限 I
                document.getElementById('alert').style.webkitTransform = "rotate(" + angle + "deg)";
                setAlertTime(angle);
            } else if (difX < 0 && difY < 0) {
                //象限 II
                document.getElementById('alert').style.webkitTransform = "rotate(" + (360 - angle) + "deg)";
                setAlertTime(360 - angle);
            } else if (difX < 0 && difY >= 0) {
                //象限 III
                document.getElementById('alert').style.webkitTransform = "rotate(" + (180 + angle) + "deg)";
                setAlertTime(180 + angle);
            } else if (difX >= 0 && difY >= 0) {
                //象限 IV
                document.getElementById('alert').style.webkitTransform = "rotate(" + (180 - angle) + "deg)";
                setAlertTime(180 - angle);
            }

        }
    }
    function stopDrag(ev) {
        if (dragData) {
            ev = ev || event;
            clock.style.left = ev.clientX - dragData.x + "px";
            clock.style.top = ev.clientY - dragData.y + "px";
            dragData = null;
            console.log('stop drag');
        }
    }

    function getAngle(x1, y1, x2, y2) {
        var x = Math.abs(x1 - x2), y = Math.abs(y1 - y2);
        //console.log("x:" + x + "y:" + y);
        var angle = Math.atan2(x, y) * 180 / Math.PI;
        return angle;
    }

    function setAlertTime(angle) {

        var hour = Math.floor(angle / 30);
        var min = Math.floor((angle % 30) * 2);
        if (hour < 10) {
            hour = "0" + hour;
        }
        if (min < 10) {
            min = "0" + min;
        }
        alertTime.value = hour + ":" + min;
    }

    (function () {


    }());


};

