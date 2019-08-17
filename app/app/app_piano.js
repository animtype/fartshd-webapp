// copyright Dr.Peter

app.app_piano = function(soundObject) {
	app.app_piano.init();
	//drawLogs("FART SOUND")	
}

app.app_piano.refresh = function () {
	app.getBackgroundStyle();
	app.app_piano.calculateKey();
}

app.app_piano.init = function () {
	// app holder
	// init variables
	$("#piano").remove();
	allow_clicks=true;
	app.app_piano.previous = -1;
	app.app_piano.sustain = false;
	app.app_piano.duet = false;
	app.app_piano.snd = 1;
	app.app_piano.notes = new Array ("c","c#","d","d#","e","f","f#","g","g#","a","a#","b","c2");
	app.app_piano.white = new Array(0,2,4,5,7,9,11,12);
	app.app_piano.black = new Array(1,3,6,8,10);
	app.app_piano.duets = new Array([0,4],[1,5],[2,5],[3,6],[4,7],[5,9],[6,10],[7,11],[8,12],[9,12],[10,-1],[11,-1],[12,-1]);
	app.app_piano.blackpositions = new Array(0,2,5,7,9);
	// create an app
	$("#app_holder").css({"opacity":0});
	$("#app_holder").append('<div id="piano" class="app gpuAcc"><div id="piano_holder" class="gpuAcc"></div></div>');
	
	var tmp_nameview = "";
	tmp_nameview += '<td id="flip1" class="active gpuAcc color_black" onclick="app.app_piano.open_listview(1);">'+lng[language].piano_snd1+'</td>';
	tmp_nameview += '<td id="flip2" class="active gpuAcc color_black" onclick="app.app_piano.open_listview(2);">'+lng[language].piano_snd2+'</td>';
	tmp_nameview += '<td id="flip3" class="active gpuAcc color_black" onclick="app.app_piano.open_listview(3);">'+lng[language].piano_snd3+'</td>';	
	/*tmp_nameview += '<td id="togll1" class="nonactive gpuAcc color_white" onclick="app.app_piano.eff_sustain();">'+lng[language].piano_snd4+'</td>';*/
	tmp_nameview += '<td id="togll2" class="nonactive gpuAcc color_white" onclick="app.app_piano.eff_duet();">'+lng[language].piano_snd5+'</td>';	
	
	$("#piano_holder").append('<table align="center" class="nameview gpuAcc"><tr>'+tmp_nameview+'</tr></table>');
	
	// append piano
	$("#piano_holder").append('<div id="key_holder" class="gpuAcc"></div>');

	// white keys
	var tmp_piano = ""
	tmp_piano += '<div id="key0" name="0" class="key gpuAcc gradient"></div>';
	tmp_piano += '<div id="key2" name="2" class="key gpuAcc gradient"></div>';
	tmp_piano += '<div id="key4" name="4" class="key gpuAcc gradient"></div>';
	tmp_piano += '<div id="key5" name="5" class="key gpuAcc gradient"></div>';
	tmp_piano += '<div id="key7" name="7" class="key gpuAcc gradient"></div>';
	tmp_piano += '<div id="key9" name="9" class="key gpuAcc gradient"></div>';
	tmp_piano += '<div id="key11" name="11" class="key gpuAcc gradient"></div>';
	tmp_piano += '<div id="key12" name="12" class="key gpuAcc gradient"></div>';
	
	// black keys
	tmp_piano += '<div id="key1" name="1" class="blackkey gpuAcc gradient"></div>';
	tmp_piano += '<div id="key3" name="3" class="blackkey gpuAcc gradient"></div>';
	tmp_piano += '<div id="key6" name="6" class="blackkey gpuAcc gradient"></div>';
	tmp_piano += '<div id="key8" name="8" class="blackkey gpuAcc gradient"></div>';
	tmp_piano += '<div id="key10" name="10" class="blackkey gpuAcc gradient"></div>';
	
	$("#key_holder").append(tmp_piano);

	
	// touch on	
	var playingpiano = $("#key_holder").hammer();
	playingpiano.on("touch", "div", function(ev) {
		ev.stopPropagation();
		var tmp_num = parseInt($(this).attr("name"));
	  	app.app_piano.pressKey(tmp_num);
	});

	// transit an app
	$("#app_holder").transition({"opacity":1},duration*2, function() {
		app.app_piano.open_listview(1);
		app.app_piano.eff_sustain();		
	});	
	
	app.app_piano.calculateKey();
	
}
app.app_piano.calculateKey = function () { 
	var tmp_space = 5;
	var tmp_max_w = 800;
	var tmp_margin = margins;
	var tmp_w = parseInt($("#piano_holder").width() - (tmp_margin*2));
	if (tmp_w > (tmp_max_w+(tmp_margin*2))) {
		tmp_margin = (tmp_w-tmp_max_w)/2;
		tmp_w = parseInt($("#piano_holder").width() - (tmp_margin*2));
	}
	
	var tmp_key = tmp_w/8;
	var tmp_key_w = tmp_key - tmp_space;
	var tmp_z = 0;
	
	// white keys	
	for (var t = 0; t < app.app_piano.white.length; t++) {
		var tmp_left = tmp_margin + (tmp_key * t);
		tmp_z++;
		$("#key" + app.app_piano.white[t]).css({
			"width": tmp_key_w,
			"left": tmp_left,
			"z-index": tmp_z
		});		
	}
	// black keys
	for (var t = 0; t < app.app_piano.black.length; t++) {
		var tmp_left = parseInt($("#key" + app.app_piano.blackpositions[t]).css("left")) + (tmp_key_w/2);
		tmp_z++;
		$("#key" + app.app_piano.black[t]).css({
			"width": tmp_key_w,
			"left": tmp_left,
			"z-index": tmp_z
		});		
	}
}


app.app_piano.open_listview = function (was) {
	
	if (was == app.app_piano.previous) { return; }	
	if (!allow_clicks) { return; }	
	allow_clicks=false;
	
	if (was == 1) {
		app.app_piano.open_close(null,true,"flip1");
		app.app_piano.snd = 1;	
	} 
	if (was == 2) {
		app.app_piano.open_close(null,true,"flip2");
		app.app_piano.snd = 2;			
	}
	if (was == 3) {
		app.app_piano.open_close(null,true,"flip3");
		app.app_piano.snd = 3;			
	}
	if (app.app_piano.previous == 1) {
		app.app_piano.open_close(null,false,"flip1");		
	} 
	if (app.app_piano.previous == 2) {
		app.app_piano.open_close(null,false,"flip2");		
	}
	if (app.app_piano.previous == 3) {
		app.app_piano.open_close(null,false,"flip3");		
	}
	app.app_piano.previous = was;
}

app.app_piano.eff_sustain = function () {	
	if(app.app_piano.sustain) {
		app.app_piano.open_close(null,false,"togll1");
		app.app_piano.sustain = false;	
	} else {
		app.app_piano.open_close(null,true,"togll1");
		app.app_piano.sustain = true;
	}	
}
app.app_piano.eff_duet = function () {
	if(app.app_piano.duet == true) {
		app.app_piano.open_close(null,false,"togll2");
		app.app_piano.duet = -1;	
	} else {
		app.app_piano.open_close(null,true,"togll2");
		app.app_piano.duet = true;
	}	
}

app.app_piano.open_close = function (obj,what,style) {
	if (what) {
		// open	
		$("#" + style).css({"opacity":0.3,"perspective":500,"rotateY":25}).transition({"opacity":1,"perspective":500,"rotateY":0},duration, function () {
			allow_clicks=true;		
		});
	} else {
		// close
		$("#" + style).css({"opacity":1}).transition({"opacity":0.3},duration);		
	}	
}

// press key
app.app_piano.pressKey = function (snd) {
	// check for effects
	// duet
	if (app.app_piano.duet == true) {
		var tmp_snd = app.app_piano.duets[snd]
		app.app_piano.playKey(tmp_snd[0]);
		app.app_piano.playKey(tmp_snd[1]);
	} else {
		app.app_piano.playKey(snd);	
	}	
}

// play the sound
app.app_piano.playKey = function (snd) {
	console.log("snd " + snd)
	if ((snd < 0) || (snd > 12)) { return; }
	// choose the right sound
	var play_snd = "s" + app.app_piano.snd + "_" + snd;	
	var tmp_l = $("#key" + snd).css("left");
	var tmp_w = $("#key" + snd).css("width");
	var tmp_z = $("#key" + snd).css("z-index");
	
	$("#key" + snd).removeAttr("style");
	
	if ((app.platform == "ios") || (!app.highPlatform)) {
		// 2D effects
		$("#key" + snd).css({
			"z-index": tmp_z,
			"left": tmp_l,
			"width": tmp_w,
 			"opacity":0.5
		}).transition({
			"opacity":1		
		},duration);
	
	} else {
		// 3D effects
		$("#key" + snd).css({
			"z-index": tmp_z,
			"left": tmp_l,
			"width": tmp_w,
			"perspective": 900, 
			"rotateX": -20	
		}).transition({
			"z-index": tmp_z,
			"left": tmp_l,
			"width": tmp_w,
			"perspective": 900, 
			"rotateX": 0		
		},duration);	
	}
	
	app.pianoKey(play_snd, app.app_piano.sustain);
}



