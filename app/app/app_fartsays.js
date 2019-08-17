// copyright Dr.Peter

app.app_fartsays = function(saysound) {
	//drawLogs("FART SAYS")	
	app.app_fartsays.saysound = saysound;	
	app.app_fartsays.init();	
}
app.app_fartsays.refresh = function () {	
	//drawLogs("refresh app_fartsays : ")
	
	app.getBackgroundStyle();

}
app.app_fartsays.nextlevel = function (running) {
	
	if (running) {
		// start countdown
		app.coutdown("GO",3,0,app.app_fartsays.nextlevel,265);
		// draw high score
		$("#fart_level").html(app.localStorage.fartshd_fartsay[0]);
		// draw wait
		$("#fart_turn").delay(500).html(lng[language].mem_wait);
		
			
	} else {
		// reset order
		// simon says
		$("#fart_turn").delay(500).html(lng[language].mem_wait);
		app.app_fartsays.order = 0;
		app.app_fartsays.togleClicks(false);
		app.app_fartsays.addGuess();
		//drawLogs(" " + app.app_fartsays.randoms)	
		app.app_fartsays.rungame(true);	
	}
}
app.app_fartsays.startGuessing = function () {
	// reset order
	// user says
	app.app_fartsays.level = (app.app_fartsays.randoms.length - 1)
	$("#fart_turn").html(lng[language].mem_your + " " + app.app_fartsays.level);
	app.app_fartsays.order = 0;
	app.app_fartsays.togleClicks(true);
	
	// check for HIGH SCORE
	app.app_fartsays.level--;
	if (app.app_fartsays.level > app.localStorage.fartshd_fartsay[0]) {
		// set new highscore
		app.localStorage.change_say (app.app_fartsays.level);
	}
	//drawLogs(" " + app.app_fartsays.randoms.length)	
		
}
app.app_fartsays.addGuess = function () {
	var tmp_add = Math.floor((Math.random()*100));
	if (tmp_add > 75) {
		app.app_fartsays.randoms.push(4);	
	} else if (tmp_add > 50) {
		app.app_fartsays.randoms.push(3);		
	} else if (tmp_add > 25) {
		app.app_fartsays.randoms.push(2);	
	} else {
		app.app_fartsays.randoms.push(1);	
	}
}
app.app_fartsays.rungame = function (firstime) {
	
	// just in case
	if(!$("#fartsays").html()) { return; }
	
	// simonsays
	if(app.app_fartsays.order >= app.app_fartsays.randoms.length) {
		// ended
		app.app_fartsays.startGuessing();
		return;	
	}
	var tmp_pause = firstime?1000:0;
	var tmp_duration = duration;
	var btn = $("#says" + app.app_fartsays.randoms[app.app_fartsays.order]);
	var tmp_color = btn.css("background-color");
	var tmp_press = "#000000";
	
	
	/* approved */
	btn.stop(true,true);	
	btn.removeAttr("style");
	btn.css({
		// original state
		"background-color":tmp_color,
		"border-color": app.app_fartsays.border_original
		}).delay(tmp_pause).transition({
			// pressing state
			"background-color":tmp_press,
			"border-color": app.app_fartsays.border_white
			},100,function() {
				// play sound
				app.soundArray(app.app_fartsays.saysound[app.app_fartsays.randoms[app.app_fartsays.order]].mp3);
				$(this).transition({
					// back to normal
					"background-color":tmp_color,
					"border-color": app.app_fartsays.border_original					
					},tmp_duration,function() {
						// run untill array is set
						app.app_fartsays.order++;
						app.app_fartsays.rungame();
					});
		})
	
	/*
	btn.stop();	
	btn.removeAttr("style");
	btn.css({"opacity":1}).delay(tmp_pause).transition({"opacity":0.1},0,function () {
		// play sound
		app.soundArray(app.app_fartsays.saysound[app.app_fartsays.randoms[app.app_fartsays.order]].mp3);
		$(this).delay(tmp_duration).transition({"opacity":1},tmp_duration,function() {
			// run untill array is set
			app.app_fartsays.order++;
			app.app_fartsays.rungame();
		})
	})
	*/
	
}
app.app_fartsays.init = function () {
	// init
	$("#fartsays").remove();
	app.app_fartsays.trys = 0;
	app.app_fartsays.order = 0;
	app.app_fartsays.randoms = new Array()
	app.app_fartsays.addGuess();
	app.app_fartsays.pouse = 500;
	app.app_fartsays.level = 1
	app.app_fartsays.border_original = "rgba(0,0,0,.2)";
	app.app_fartsays.border_white = "rgba(255,255,255,1)";
	
	// touch on
	app.app_fartsays.touch1 = null;
	app.app_fartsays.touch2 = null;
	app.app_fartsays.touch3 = null;
	app.app_fartsays.touch4 = null;


	// creat an app
	$("#app_holder").css({"opacity":0});
	$("#app_holder").append('<div id="fartsays" class="app gpuAcc"><div id="fartsays_holder" class="gpuAcc"></div></div>');
	$("#fartsays_holder").append('<h3 id="fart_turn" class="subtitle gpuAcc">'+lng[language].mem_wait+'</h3><table id="fartsays_game" class="gpuAcc">')
	$("#fartsays_game").append('<tr><td><div id="says1" class="nohighlight gpuAcc"></div></td><td><div id="says2" class="nohighlight gpuAcc"></div></td></tr>');
	$("#fartsays_game").append('<tr><td><div id="says3" class="nohighlight gpuAcc"></div></td><td><div id="says4" class="nohighlight gpuAcc"></div></td></tr>');
	$("#fartsays_game").append('</table>');
	$("#fartsays_holder").append('<h3 class="subtitle gpuAcc">' +lng[language].mem_best+ ' <span id="fart_level">' + app.localStorage.fartshd_fartsay[0] + '</span> '+lng[language].mem_txt4+'.</h3>')
	
	// transit an app
	$("#app_holder").transition({"opacity":1},duration*2);
	
	app.alerts("confirm",lng[language].say_alert1,lng[language].say_alert2,lng[language].say_button1,"app.app_fartsays.nextlevel(true)");

}
app.app_fartsays.guess = function(was) {
	allow_clicks = false;
	app.soundArray(app.app_fartsays.saysound[was].mp3)
	
	var btn = $("#says" + was);
	var tmp_color = btn.css("background-color");
	var tmp_press = "#000000";

	/* approved */
	btn.stop(true,true);	
	btn.removeAttr("style");
	btn.css({
		// original state
		"background-color":tmp_press,
		"border-color": app.app_fartsays.border_white
		}).transition({
			// back to normal
			"background-color":tmp_color,
			"border-color": app.app_fartsays.border_original	
			
		},app.app_fartsays.pouse,function () {
		// run untill array is set		
		app.app_fartsays.checkGuess(was);
	});
		
	/*
	$("#says" + was).removeAttr("style");
	$("#says" + was).css({"opacity":0.2}).transition({
		"opacity":1
	},app.app_fartsays.pouse,function () {
		// run untill array is set		
		app.app_fartsays.checkGuess(was);
	});
	*/
	
}
app.app_fartsays.checkGuess = function(was) {
	if( app.app_fartsays.randoms[app.app_fartsays.order] == was) {
		allow_clicks = true;
	} else {
		app.app_fartsays.order = 0;
		app.app_fartsays.randoms = new Array()
		app.app_fartsays.addGuess();
		var tmp_text = lng[language].say_alert4;
		tmp_text += "<br />" + lng[language].say_alert5 + " " + app.app_fartsays.trys + " ";
		tmp_text += (app.app_fartsays.trys==1?lng[language].fart:lng[language].farts) + "!";
		
		// gaplugin
		app.gaplugin.fartsays(app.app_fartsays.level);
		
		app.alerts("alert",lng[language].say_alert3,tmp_text,lng[language].say_button2,"app.app_fartsays.nextlevel(true)");
		return;
	}
	app.app_fartsays.order++;
	if(app.app_fartsays.order >= app.app_fartsays.randoms.length) {
		// ended
		allow_clicks = false;
		$("#fartsays_game").css({
			"opacity":0.2	
		}).transition({
			"opacity":1
		},duration,function() {
			app.app_fartsays.trys++;
			app.app_fartsays.nextlevel();	
		});
	}	
	
}

app.app_fartsays.togleClicks = function (allow) {
	if (allow)	 {
		app.app_fartsays.pouse = 300;
		allow_clicks = true;
		
		
		// touch on	
		app.app_fartsays.touch1 = $("#says1").hammer();
		app.app_fartsays.touch1.on("touch", function(ev) {
			ev.stopPropagation();
			if(allow_clicks) { app.app_fartsays.guess(1); }
		});
		app.app_fartsays.touch2 = $("#says2").hammer();
		app.app_fartsays.touch2.on("touch", function(ev) {
			ev.stopPropagation();
			if(allow_clicks) { app.app_fartsays.guess(2); }
		});
		// touch on	
		app.app_fartsays.touch3 = $("#says3").hammer();
		app.app_fartsays.touch3.on("touch", function(ev) {
			ev.stopPropagation();
			if(allow_clicks) { app.app_fartsays.guess(3); }
		});
		app.app_fartsays.touch4 = $("#says4").hammer();
		app.app_fartsays.touch4.on("touch", function(ev) {
			ev.stopPropagation();
			if(allow_clicks) { app.app_fartsays.guess(4); }
		});
		/*$("#says4").click(function() { if(allow_clicks) { app.app_fartsays.guess(4); } });	*/
		
			
	} else {
		app.app_fartsays.pouse = 500;
		allow_clicks = false;
		/*
		app.app_fartsays.touch1.off("tap");
		app.app_fartsays.touch2.off("tap");
		app.app_fartsays.touch3.off("tap");
		app.app_fartsays.touch4.off("tap");
		*/
		/*$("#says4").unbind("click");*/
	}
}