// copyright Dr.Peter

app.app_hidefart = function() {
	//drawLogs("HIDE FART")	
	app.app_hidefart.init();	
	
}

app.app_hidefart.refresh = function (firsttimer) {
	var tmp_margin = 10;
	var tmp_min = 310;
	var tmp_max = 720;
	var tmp_width = parseInt($(window).width()) - (tmp_margin*2);
	var tmp_height = parseInt($(window).height()) - 90 - (tmp_margin*2) - app.topPadding;
	tmp_height = tmp_height>tmp_min?tmp_height:tmp_min;
	tmp_height = tmp_height<tmp_max?tmp_height:tmp_max;
	//drawLogs(tmp_width + " ::: " + tmp_height)
	$("#hidefart_holder").css({
		"left": 10,
		"top": 90,
		"width": tmp_width,
		"height": tmp_height		
	})
	
	
	// remove redundant objects
	if(parseInt($(window).width()) < 400) {
		$("#hidefart_info").css({"display":"none"});
	} else {	
		$("#hidefart_info").css({"display":"block"});
	}
	
	if (firsttimer) {
		app.scrollDownScreen(tmp_height);
	}
	
	app.getBackgroundStyle();
}

app.app_hidefart.init = function (alerts) {
	
	$("#hidefart").remove();	
	
	if(app.app_hidefart.timer) {
		clearTimeout(app.app_hidefart.timer);
	}
	app.app_hidefart.timer = null;
	app.app_hidefart.time = 100;
	app.app_hidefart.speed = 1500;
	app.app_hidefart.level = 2;
	app.app_hidefart.allow = false;
	app.app_hidefart.farting = false;
	app.app_hidefart.presure = 10;
	app.app_hidefart.detected = 10;
	app.app_hidefart.status = 0;
	app.app_hidefart.blinks = 1;
	app.app_hidefart.ends = "";
	app.app_hidefart.prevskirt = -1;
	app.app_hidefart.current = 0;
	app.app_hidefart.score = 0;
	app.app_hidefart.highscore = app.localStorage.fartshd_hidefarts[0];
	
	$("#app_holder").css({"opacity":0});
	$("#app_holder").append('<div id="hidefart" class="app gpuAcc"><div id="hidefart_holder" class="gpuAcc"></div></div>');
	$("#hidefart_holder").append('<div id="hidefart_transport" class="gpuAcc"></div>');	
	$("#hidefart_holder").append('<div id="hidefart_woman" class="gpuAcc"></div>');
	
	$("#hidefart_holder").append('<div id="fart_calc1" class="gpuAcc"><div class="graph_title gpuAcc">' + lng[language].hide_graph1 + '</div><div id="fart_num1"></div><div id="fart_icon1"></div><div class="gradient graph gpuAcc"></div></div>');
	$("#hidefart_holder").append('<div id="fart_calc2" class="gpuAcc"><div class="graph_title gpuAcc">' + lng[language].hide_graph2 + '</div><div id="fart_num2"></div><div id="fart_icon2"></div><div class="gradient graph gpuAcc"></div></div>');
	$("#hidefart_holder").append('<div id="fart_calc3" class="gpuAcc"><span class="light">00000</span></div>');
	$("#hidefart_holder").append('<div id="fart_calc4" class="gpuAcc">' + lng[language].hide_high + app.app_hidefart.highscore + '</div>');
	
	$("#hidefart_transport").append('<div id="car1" class="car gpuAcc"></div>');
	
	// info
	$("#hidefart_holder").append('<div id="hidefart_info" class="gpuAcc">' + lng[language].hide_info + '</div>');	
	
	// controls
	$("#hidefart_holder").append('<div id="hidefart_controls" class="gpuAcc"></div>');
	
	// woman skirt
	$("#hidefart_woman").append('<div id="hidefart_skirt1" class="skirt gpuAcc"></div>');
	$("#hidefart_woman").append('<div id="hidefart_skirt2" class="skirt gpuAcc"></div>');
	$("#hidefart_woman").append('<div id="hidefart_skirt3" class="skirt gpuAcc"></div>');
	$("#hidefart_woman").append('<div id="hidefart_skirt4" class="skirt gpuAcc"></div>');
	$("#hidefart_woman").append('<div id="hidefart_skirt5" class="skirt gpuAcc"></div>');
	$("#hidefart_woman").append('<div id="hidefart_skirt6" class="skirt gpuAcc"></div>');
	$("#hidefart_woman").append('<div id="hidefart_skirt7" class="skirt gpuAcc"></div>');
	$("#hidefart_woman").append('<div id="hidefart_skirt8" class="skirt gpuAcc"></div>');
	$("#hidefart_woman").append('<div id="hidefart_skirt9" class="skirt gpuAcc"></div>');
	$("#hidefart_woman").append('<div id="hidefart_skirt10" class="skirt gpuAcc"></div>');
	$("#hidefart_woman").append('<div id="hidefart_skirt11" class="skirt gpuAcc"></div>');
	$("#hidefart_woman").append('<div id="hidefart_skirt12" class="skirt gpuAcc"></div>');
	$("#hidefart_woman").append('<div id="hidefart_skirt13" class="skirt gpuAcc"></div>');
	$("#hidefart_woman").append('<div id="hidefart_skirt14" class="skirt gpuAcc"></div>');
	
	// do opacity
	$("#hidefart_holder").css({"opacity":0.01}).transition({"opacity":1},duration*2);

	
	// rotate detection
	$(".graph_title").css({"rotate": "90deg"});
	

	// calculate area
	app.app_hidefart.refresh(true);	
  
  	$("#app_holder").transition({"opacity":1}, duration*2, function() {
		// alert
		if (alerts) {
			app.app_hidefart.runGame(true);
			return;	
		}
		app.alerts("alert",lng[language].hide_alert1,lng[language].hide_alert2,lng[language].hide_alert3,"app.app_hidefart.runGame(true)");
	});

}

app.app_hidefart.startFarting = function (ev) {
	// start
	if (ev=="start") {
		app.soundPress("longfart",true)	
		//drawLogs("start");
		app.app_hidefart.farting = true;
			
	} else if (ev=="stop") {
		app.soundPress("longfart",false)	
		//drawLogs("stop")		
		app.app_hidefart.farting = false;	
	}	
}


app.app_hidefart.runtrafic = function () {
	// just test
	if(!$("#hidefart").html()) { return; }
	if(!app.app_hidefart.status) { return; }
	
	// draw a car
	
	// calculate level	
	var tmp_level = Math.ceil(app.app_hidefart.level + (app.app_hidefart.score/1000));
	var tmp_delay = (randomFromInterval(1,tmp_level)*1000);
	// start the fart
	app.app_hidefart.allow = true;
	
	// vibrate if allow
	if (app.localStorage.fartshd_settings[2]) {		
		app.vibrate();		
	}
	if (app.platform != "winphone") {
		app.soundPlay("car" + randomFromInterval(1,3));
	}
	// run car
	$("#car1").removeAttr("style");
	$("#car1").css({
		"left": "-150px",
		"bottom": 100	
	}).transition({
		"left": parseInt($(window).width()) +"px",
		"bottom": 100
	},app.app_hidefart.speed, "linear", function() {
		app.app_hidefart.allow = false;
		setTimeout('app.app_hidefart.runtrafic()',tmp_delay);
	})
}
app.app_hidefart.startTimer = function () {
	app.app_hidefart.timer = setInterval('app.app_hidefart.runTimer()', app.app_hidefart.time);
}
app.app_hidefart.stopTimer = function () {
	clearTimeout(app.app_hidefart.timer);
}
app.app_hidefart.runTimer = function () {
		
	if(!$("#hidefart").html()) { 
		app.app_hidefart.stopTimer();
		return; 
	}
	if (app.app_hidefart.farting) {
		app.app_hidefart.presure = app.app_hidefart.presure - 1.5;	
	} else {
		app.app_hidefart.presure = app.app_hidefart.presure + 1;
	}	
	if (!app.app_hidefart.allow && app.app_hidefart.farting) {
		app.app_hidefart.detected = app.app_hidefart.detected + 4;
	} else {
		app.app_hidefart.detected = app.app_hidefart.detected - 0.2;	
	}
	if (app.app_hidefart.presure < 1) { app.app_hidefart.presure = 1; }
	if (app.app_hidefart.detected < 1) { app.app_hidefart.detected = 1; }
	
	// check if end game
	if (app.app_hidefart.presure >= 100) {
		app.app_hidefart.presure = 100;
		app.app_hidefart.ends= "presure";		
		app.app_hidefart.endGame();	
	}
	if (app.app_hidefart.detected >= 100) {	
		app.app_hidefart.detected = 100;
		app.app_hidefart.ends = "detected";
		app.app_hidefart.endGame();		
	}
	
	// drag graph
	$("#fart_num1").html(Math.ceil(app.app_hidefart.presure));
	$("#fart_num2").html(Math.ceil(app.app_hidefart.detected));	
	$("#fart_calc1 .graph").css({"height": app.app_hidefart.presure*2});
	$("#fart_calc2 .graph").css({"height": app.app_hidefart.detected*2});
	
	// change skirt position
	app.app_hidefart.changeskirt(true);
}
app.app_hidefart.changeskirt = function (calculating) {
	// change skirt
	//var tmp_skirts = new Array (0,1,2,3,4,5,6,7,6,5);
	var tmp_skirts = new Array (0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,13,12,11);
	var tmp_current = 0;
	if (app.app_hidefart.farting) {
		// farting !!!
		app.app_hidefart.current++;
		if (app.app_hidefart.current >= tmp_skirts.length) {
			app.app_hidefart.current = 	tmp_skirts.length-5;			
			tmp_current = 	tmp_skirts[app.app_hidefart.current];
		} else {			
			tmp_current = 	tmp_skirts[app.app_hidefart.current];
		}
	} else {
		// not farting
		tmp_current = 	app.app_hidefart.prevskirt - 1;
		app.app_hidefart.current = tmp_current>0?tmp_current:0;
	}
	if (app.app_hidefart.prevskirt > 0) {
		$("#hidefart_skirt" + app.app_hidefart.prevskirt).css({"display":"none"});		
	}
	if (app.app_hidefart.current > 0) {
		//drawLogs()
		$("#hidefart_skirt" + tmp_current).css({"display":"block"});
		app.app_hidefart.prevskirt = tmp_current;
	}
	if(calculating) {
		app.app_hidefart.calcScore(app.app_hidefart.current);
	}
			
}

app.app_hidefart.blinking = function (obj) {
	if (app.app_hidefart.blinks >= 40) {
		
		// gaplugin
		app.gaplugin.hidefart(app.app_hidefart.score);
		
		// check high score
		if (app.app_hidefart.score > app.app_hidefart.highscore) {
			app.localStorage.change_hidefarts(app.app_hidefart.score);	
		}
				
		// end game !!!
		if (app.app_hidefart.ends == "presure") {
			 // alert
			if(!$("#hidefart").html()) { return; }
			app.alerts("alert",lng[language].hide_alert4,lng[language].hide_alert5,lng[language].hide_alert3,"app.app_hidefart.restartlevel()");
		} else {
			// alert
			if(!$("#hidefart").html()) { return; }
			app.alerts("alert",lng[language].hide_alert4,lng[language].hide_alert6,lng[language].hide_alert3,"app.app_hidefart.restartlevel()");
		}
			
	} else {
		if (app.app_hidefart.blinks%2 == 0) {
			var tmp_color = "#ffffff";
		} else {
			var tmp_color = "#cc0000";
		}
		obj.transition({"background-color":tmp_color},100, function () {
			app.app_hidefart.blinking(this);	
		});
		$("#fart_calc3").css({"color":tmp_color});		
	}
	app.app_hidefart.blinks++;
	
	// skirt
	app.app_hidefart.farting = true;
	app.app_hidefart.changeskirt();
	

	
	
}
app.app_hidefart.calcScore = function (add) {
//app.app_hidefart.score
	app.app_hidefart.score = app.app_hidefart.score + add;
	var tmp_scores = "";
	if (app.app_hidefart.score>9999) {
		tmp_scores = app.app_hidefart.score;	
	} else if (app.app_hidefart.score>999) {
		tmp_scores = '<span class="light">0</span>' + app.app_hidefart.score;
	} else if (app.app_hidefart.score>99) {
		tmp_scores = '<span class="light">00</span>' + app.app_hidefart.score;
	} else if (app.app_hidefart.score>9) {
		tmp_scores = '<span class="light">000</span>' + app.app_hidefart.score;
	} else {
		tmp_scores = '<span class="light">0000</span>' + app.app_hidefart.score;
	}	
	$("#fart_calc3").html(tmp_scores);
}
/* R U N */
//app.coutdown("GO",3,0,app.akcija);
app.app_hidefart.runGame = function (running) {
	//drawLogs("1")
	if (!running) {
		
		
		// create start / stop event	
		// touch start
		var startingFart = $("#hidefart_controls").hammer();
		startingFart.on("touch", function(ev) {
			ev.stopPropagation();
			//drawLogs("!!! start")
			if (app.app_hidefart.farting) { return; } 
			if (!app.app_hidefart.status) { return; } 
			app.app_hidefart.startFarting("start")
		});	
		var stopingFart = $("#hidefart_controls").hammer();
		stopingFart.on("release", function(ev) {
			//drawLogs("!!! end")
			app.app_hidefart.startFarting("stop")
		});
		
		
		// RUN the GAME
		app.app_hidefart.farting = false;
		app.app_hidefart.status = 1;
		app.app_hidefart.startTimer();
		setTimeout('app.app_hidefart.runtrafic()',1000);	
	} else {
		// start counter first
		// from 3 to 0	
		app.coutdown("GO",3,0,app.app_hidefart.runGame);
	}
	

}
/* E N D */
app.app_hidefart.endGame = function () {
	
	// end game
	app.soundPlay("longfart");
	app.app_hidefart.status = 0;
	app.app_hidefart.stopTimer();
	
	// check the game
	if (app.app_hidefart.ends == "presure") {
		app.app_hidefart.blinking($("#fart_icon1"))	
	} else {
		app.app_hidefart.blinking($("#fart_icon2"))	
	}

}
/* A G A I N */
app.app_hidefart.restartlevel = function() {	
	if(!$("#hidefart").html()) { return; }
	app.app_hidefart.init(true);
}

