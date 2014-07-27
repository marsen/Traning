/*=================================
CSS3 & jQuery - Clock
July 2014
By : Away
http://www.dfuns.idv.tw
http://wdh2o.com
=================================*/

$(function(){

	var myDate = new Date();
	var myHour = myDate.getHours();
	var myMin = myDate.getMinutes();
	var mySec = myDate.getSeconds();
	var myMillSec = myDate.getMilliseconds();

	todo(myHour, myMin, mySec, myMillSec);


	setInterval(timeInterval, 50);

	function timeInterval(){
		myDate = new Date();
		myHour = myDate.getHours();
		myMin = myDate.getMinutes();
		mySec = myDate.getSeconds();
		myMillSec = myDate.getMilliseconds();

		todo(myHour, myMin, mySec, myMillSec);
	}

	function todo(t1, t2, t3){
		$(".hour").css({
			"-webkit-transform": "rotate(" + ((t1%12)*30+myMin/60*30) + "deg)",
			"-moz-transform": "rotate(" + (t1*30+myMin/60*30) + "deg)",
			"-o-transform": "rotate(" + (t1*30+myMin/60*30) + "deg)",
			"-ms-transform": "rotate(" + (t1*30+myMin/60*30) + "deg)"
		});

		$(".min").css({
			"-webkit-transform": "rotate(" + (t2*6+mySec/60*6) + "deg)",
			"-moz-transform": "rotate(" + (t2*6+mySec/60*6) + "deg)",
			"-o-transform": "rotate(" + (t2*6+mySec/60*6) + "deg)",
			"-ms-transform": "rotate(" + (t2*6+mySec/60*6) + "deg)"
		});

		$(".sec").css({
			"-webkit-transform": "rotate(" + t3*6 + "deg)",
			"-moz-transform": "rotate(" + t3*6 + "deg)",
			"-o-transform": "rotate(" + t3*6 + "deg)",
			"-ms-transform": "rotate(" + t3*6 + "deg)"
		});

		$(".c2 .sec").css({
			"-webkit-transform": "rotate(" + (t3*6+myMillSec/1000*6) + "deg)",
			"-moz-transform": "rotate(" + (t3*6+myMillSec/1000*6) + "deg)",
			"-o-transform": "rotate(" + (t3*6+myMillSec/1000*6) + "deg)",
			"-ms-transform": "rotate(" + (t3*6+myMillSec/1000*6) + "deg)"
		});
	}

	$(".btn").click(function(){
		$(".num").toggleClass("switch");
	});

});