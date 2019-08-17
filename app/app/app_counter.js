// copyright Dr.Peter

app.app_counter = function(malefarts,femalefarts,oldfarts,favfarts) {
	app.app_counter.malefarts = null;
	app.app_counter.femalefarts = null;
	app.app_counter.oldfarts = null;
	app.app_counter.favfarts = null;
	app.app_counter.malefarts = malefarts;	
	app.app_counter.femalefarts = femalefarts;	
	app.app_counter.oldfarts = oldfarts;
	// if favorites is empty get the editors
	app.app_counter.favfarts = favfarts.length > 0?favfarts:false;
	app.app_counter.init();
	//drawLogs("FART SOUND")
	app.getBackgroundStyle();	
}

app.app_counter.refresh = function (firsttimer) {
	
	if (firsttimer) {
		var tmp_height = $("#app_holder").height();
		app.scrollDownScreen(tmp_height);
	}	
	app.getBackgroundStyle();
	
}

app.app_counter.init = function () {
	// app holder
	// init variables
	$("#counter").remove();
	allow_clicks=true;
	app.app_counter.bgcolor = $("#main_body").css("background-color");
	app.app_counter.previous = -1;
	app.app_counter.canvas = null;
	app.app_counter.max = 60;
	app.app_counter.min = 1
	app.app_counter.start = 10
	app.app_counter.counter = app.app_counter.start;
	app.app_counter.mili = 10;
	app.app_counter.counting = "";
	// set timer	
	app.app_counter.timer = null;	
	app.app_counter.timer = $.timer(function() {
		// check zero
		//drawLogs("+")
		if(app.app_counter.counter < 1) {
				// zero
				// release the sound
				app.app_counter.drawTimer(0,0);
				app.app_counter.timer.stop();
				app.app_counter.runSound ();
				return;	
		}
		
		// LOW QUALITY TAG ******************
		if(!app.highPlatform) {
			app.app_counter.mili = 0;	
		}
		
		// check milisecondes
		if(app.app_counter.mili > 0) {			
			//drawLogs(app.app_counter.mili)
			app.app_counter.drawTimer(app.app_counter.counter,app.app_counter.mili);
			app.app_counter.mili--;	
		} else {		
			if (!$("#counter_holder").html()) {
				// stop the timer
				// just in case
				app.app_counter.timer.stop();
			} else {
				app.app_counter.drawTimer(app.app_counter.counter,10);
				
			}
			// change slider
			$("#counter_slider").val(app.app_counter.counter);
			
			app.app_counter.mili = 10;
			app.app_counter.counter--;
		}		
    });	
	// create an app
	$("#app_holder").css({"opacity":0});
	$("#app_holder").append('<div id="counter" class="app gpuAcc"><div id="counter_holder" class="gpuAcc"></div></div>');

	$("#counter_holder").append(app.drawSelector('app.app_counter.open_listview',app.app_counter.favfarts));
	
	$("#counter_holder").append('<canvas class="nohighlight" id="canvas_counter" width="280" height="280" onclick="app.app_counter.toggleCounter()"></canvas>');
	
	$("#counter_holder").append('<br /><div id="counter_slider_holder" class="app gpuAcc"></div>');
	
	$("#counter_slider_holder").append('<input step="1" value="'+app.app_counter.start+'" type="range" id="counter_slider" name="counter_slider" min="'+app.app_counter.min+'" max="'+app.app_counter.max+'">');
	
	// on change slider
	$("#counter_slider").change(function () {
		app.app_counter.counter = $(this).val();
		app.app_counter.drawTimer(app.app_counter.counter,10);	
	});
	
	
	$("canvas").css({
		 //"background-color":app.app_counter.bgcolor
		 "background-color": "none"		
	});
	
	// 3 or 4 columns
	if (app.app_counter.favfarts) {
		$("table.nameview td").css({"width": "25%"})
	}

	// draw timer for the first time
	$("#app_holder").css({"opacity":0}).transition({
		"opacity":0.3
	},duration, function() {
		app.app_counter.drawTimer(app.app_counter.counter,10);
		$(this).transition({"opacity":1},duration)
		app.app_counter.open_listview(1);
		app.flipSelector(0);
	})
	
	app.app_puzzle.refresh(true);
	
	// LOW QUALITY TAG ******************
	if(!app.highPlatform) {
		app.app_counter.timer.set({ time : 1000, autostart : false });
	} else {
		app.app_counter.timer.set({ time : 100, autostart : false });
	}
	
}


app.app_counter.toggleCounter = function () {
	app.app_counter.timer.toggle(false)	
}

app.app_counter.drawTimer = function (cnt,mili) {


	if(!$("canvas").width()) {
		// just in case
		app.app_counter.timer.stop();
		return;				
	}
	

	cnt = cnt?cnt:0;
	mili = mili?mili:0;	
	
	if (cnt > 0) {
		app.app_counter.counting = lng[language].start + " | " + lng[language].pouse;	
	} else {
		app.app_counter.counting = lng[language].boom; 	
	}
	
	var timer_width = parseInt($("canvas").width());
	var timer_height = parseInt($("canvas").height());
	
	var timer_cnt = 360/60;
	var timer_angle = timer_cnt * cnt;		
	var timer_m = 25;
	var timer_o = 2;
	var timer_x = parseInt($("canvas").width())/2;
	var timer_y = parseInt($("canvas").height())/2;
	var timer_rad = timer_x - (timer_m);
	
	var mili_cnt = 360/10;
	var mili_angle = mili_cnt * mili;
	var mili_stroke = 6;
	var mili_mili = timer_rad - (timer_m/2) - mili_stroke;
	

	$("#canvas_counter").clearCanvas();
	
	$("canvas").drawRect({
	  fillStyle: "rgba(255,255,255,0)",
	  x: timer_x, y: timer_y,
	  width: timer_width,
	  height: timer_height
	});

	
	// draw mili
	$("canvas").drawArc({
	  strokeStyle: "rgba(0,0,0,0.25)",
	  strokeWidth: mili_stroke,
	  x: timer_x, y: timer_y,
	  radius: mili_mili,
	  start: 0, end: mili_angle
	});	
		
	// draw timer
	$("canvas").drawArc({
	  strokeStyle: "rgba(0,0,0,0.5)",
	  strokeWidth: timer_m,
	  x: timer_x, y: timer_y,
	  radius: timer_rad,
	  start: 0, end: timer_angle
	});		
	// draw 360
	$("canvas").drawArc({
		strokeStyle: "rgba(0,0,0,0.2)",
		strokeWidth: timer_m,
		x: timer_x, y: timer_y,
		radius: timer_rad
	});
	// draw outer
	$("canvas").drawArc({
		strokeStyle: "rgba(255,255,255,0.1)",
		strokeWidth: timer_o,
		x: timer_x, y: timer_y,
		radius: timer_rad + (timer_m/2)
	});
	// draw inner
	$("canvas").drawArc({
		strokeStyle: "rgba(255,255,255,0.1)",
		strokeWidth: timer_o,
		x: timer_x, y: timer_y,
		radius: timer_rad - (timer_m/2)
	});	
	// draw text
	$("canvas").drawText({
		fillStyle: "rgba(255,255,255,0.5)",
		fontSize: "16px",
		fontStyle: "normal",
		fontFamily: "LatoLight, Trebuchet MS, Arial, Helvetica, sans-serif",
		text: "" + app.app_counter.counting,
		x: timer_x, y: timer_y + (timer_y/2) - (timer_m/2),
		maxWidth: timer_rad
	})
	// draw text
	$("canvas").drawText({
		fillStyle: "rgba(255,255,255,0.8)",
		fontSize: "5em",
		fontStyle: "normal",
		fontFamily: "LatoLight, Trebuchet MS, Arial, Helvetica, sans-serif",
		text: "" + cnt,
		x: timer_x, y: timer_y,
		maxWidth: timer_rad
	});
	
}


app.app_counter.open_listview = function (was) {
	app.app_counter.previous = was;
}

app.app_counter.runSound = function() {
	
	if (!allow_clicks) { return }
	
	var sounds = null;
	if (app.app_counter.previous == 0) {
		//drawLogs("MALE")
		sounds = app.app_counter.malefarts;
	} else if (app.app_counter.previous	== 1) {
		//drawLogs("FEMALE")
		sounds = app.app_counter.femalefarts
	} else if (app.app_counter.previous	== 2) {
		//drawLogs("OLD")
		sounds = app.app_counter.oldfarts
	} else if (app.app_counter.previous	== 3) {
		//drawLogs("FAV")
		sounds = app.app_counter.favfarts
	}
	//var tmp_l = sounds.length;	
	var tmp_snd = Math.ceil(Math.random()*sounds.length) - 1;
	app.soundArray(sounds[tmp_snd].mp3);
	
}

