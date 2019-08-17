// copyright Dr.Peter

app.app_puzzle = function(soundObject) {
	app.app_puzzle.soundObject = null;
	app.app_puzzle.soundObject = soundObject;
	app.app_puzzle.init();
	//drawLogs("FART SOUND")	
}
app.app_puzzle.refresh = function (firsttimer) {
	//drawLogs("refresh memory : " + $("#memory_holder").innerHeight())
	
	if (firsttimer) {
		var tmp_height = $("#app_holder").height();
		app.scrollDownScreen(tmp_height);
	}	
	app.getBackgroundStyle();
	
	
	// check width first
	// 450 normal
	var tmp_min = app.app_puzzle.w
	var tmp_w = $("#app_holder").width();
	
	if (tmp_w < tmp_min) {
		var tmp_percent = (tmp_w)/tmp_min;
		$('#puzzle_area').css({"scale":tmp_percent});
		console.log(tmp_w + " - " + tmp_percent + "%")
	} else {
		$('#puzzle_area').css({"scale":1});	
	}
	
	
}
app.app_puzzle.init = function (which_level) {

	$("#puzzle").remove();	
	allow_clicks=false;
	app.app_puzzle.set = new Array();
	
	app.app_puzzle.shuffleCounter = 0;
	app.app_puzzle.shuffleOld = 0;	
	app.app_puzzle.tries = 0;
	app.app_puzzle.level = 1;
	app.app_puzzle.playing = null;
	app.app_puzzle.levels = new Array (null);
	// width , columns , tiles , shuffles
	app.app_puzzle.levels.push(new Array (150,3,9,40)); // 3x3
	app.app_puzzle.levels.push(new Array (112,4,16,80)); // 4x4
	app.app_puzzle.levels.push(new Array (90,5,25,140)); // 5x5
	// inital one
	app.app_puzzle.w = app.app_puzzle.levels[app.app_puzzle.level][0] * app.app_puzzle.levels[app.app_puzzle.level][1];
	
	$("#app_holder").css({"opacity":0});
	$("#app_holder").append('<div id="puzzle" class="app gpuAcc"><div id="puzzle_holder" class="gpuAcc"><p id="puzzle_tries">&nbsp;</p><div id="puzzle_area" class="puzzles_bg puzzle450_1 gpuAcc"></div></div></div>');
	
	
	$("#app_holder").transition({"opacity":1}, duration*2,function() {	

		if (which_level) {
			// go to a level
			app.app_puzzle.makeLevel(which_level);
		} else {	
			// choose a level
			app.app_puzzle.askGame();
		}
	});
	
	app.app_puzzle.addTries(true);
	app.app_puzzle.refresh(true);	

}



app.app_puzzle.setGame = function () {
	
	// create a puzzle
	app.app_puzzle.w = app.app_puzzle.levels[app.app_puzzle.level][0] * app.app_puzzle.levels[app.app_puzzle.level][1];
	$('#puzzle_area').css({"width":app.app_puzzle.w , "height": app.app_puzzle.w});	
	$('#puzzle_area').puzzle_game(app.app_puzzle.levels[app.app_puzzle.level][0],app.app_puzzle.levels[app.app_puzzle.level][1],app.app_puzzle.levels[app.app_puzzle.level][2]);

	allow_clicks = false;
	
	for (var t=1; t<app.app_puzzle.levels[app.app_puzzle.level][2];t++) {
		var tmp_obj = $("#puzzle_tile"+t);
		var tmp_left = parseInt(tmp_obj.css("left"));
		var tmp_top = parseInt(tmp_obj.css("top"));
		app.app_puzzle.set.push(new Object({name: t, "left":tmp_left, "top": tmp_top }));
	}
	// now do shuffle
	app.app_puzzle.startShuffle();
}
app.app_puzzle.startShuffle = function () {
	// remove bg pictures	
	$('#puzzle_area').css({"background-image":"none"}).delay(500).transition({"opacity":1},0,function() {
		// draw score
		app.app_puzzle.addTries(false,true);	
		// make shuffle
		app.app_puzzle.makeShuffle();
	});
}

app.app_puzzle.makeShuffle = function (next) {
	if (next) { app.app_puzzle.shuffleCounter++; }
	if (app.app_puzzle.shuffleCounter >= app.app_puzzle.levels[app.app_puzzle.level][3]) {
		console.log("stop shuffle");
		
		// start a game
		// touch on	
		app.app_puzzle.playing = $("#puzzle_board").hammer();
		app.app_puzzle.playing.on("touch", "div", function(ev) {
			ev.stopPropagation();
			puzzleMove($(this),app.app_puzzle.levels[app.app_puzzle.level][0])
		});	
			
		allow_clicks = true;
		return;	
	}
		
	var tmp_position = randomFromInterval (1,app.app_puzzle.set.length);
	if (tmp_position == app.app_puzzle.shuffleOld) {
		app.app_puzzle.makeShuffle(false);	
	} else {
		var tmp_object = $("#puzzle_tile"+tmp_position);
		app.app_puzzle.shuffleOld = tmp_position;
		puzzleMove(tmp_object,app.app_puzzle.levels[app.app_puzzle.level][0],true);
	}
}

app.app_puzzle.checkGame = function () {
	var game_win = true;
	for (var t in app.app_puzzle.set) {
		var tmp_obj = $("#puzzle_tile"+app.app_puzzle.set[t].name);
		var tmp_left = parseInt(tmp_obj.css("left"));
		var tmp_top = parseInt(tmp_obj.css("top"));
		// check tiles properties
		if (app.app_puzzle.set[t].left != tmp_left) { game_win = false; }
		if (app.app_puzzle.set[t].top != tmp_top) { game_win = false; }
	}
	app.app_puzzle.runSound ();
	console.log( game_win );
	if (game_win) {
		app.app_puzzle.finishGame();	
	}
}

app.app_puzzle.runSound = function() {
	// no sounds
	
	/*
	var tmp_snd = Math.ceil(Math.random()*app.app_puzzle.soundObject.length) - 1;
	app.soundArray(app.app_puzzle.soundObject[tmp_snd].mp3);
	*/	
	
	// set tries
	app.app_puzzle.addTries();
}

app.app_puzzle.addTries = function(firstime,refreshs) {
	if (firstime) {
		$("#puzzle_tries").html(lng[language].mem_your + " " + app.app_puzzle.tries);	
		return;
	}
	if (!refreshs) {
		app.app_puzzle.tries++;
	}	
	var tmp_high = "";
	var tmp_highscore = app.localStorage.fartshd_puzzle[app.app_puzzle.level-1]
	if (tmp_highscore>1) {
		tmp_high =  "&nbsp;&nbsp;|&nbsp;&nbsp;<small style='color: rgba(255,255,255,0.6)'>" + lng[language].mem_best + " " + tmp_highscore + "</small>"; 	
	}

	$("#puzzle_tries").html(lng[language].mem_your + " " + app.app_puzzle.tries + tmp_high);	
}

app.app_puzzle.checkHighscore = function ()  {
	 // app.localStorage.fartshd_puzzle[0]
	 //	app.app_puzzle.tries = 0;
	 // app.app_puzzle.level = 0; 
 	var tmp_highscore = app.localStorage.fartshd_puzzle[app.app_puzzle.level-1];
	tmp_highscore = tmp_highscore==0?99999:tmp_highscore;
 
 	if (app.app_puzzle.tries < tmp_highscore) {
		// new highscore	
		app.localStorage.change_puzzle (app.app_puzzle.level-1,app.app_puzzle.tries);
		console.log ("HIGH !!! " + tmp_highscore + " vs " + app.app_puzzle.tries)	
	} 	else {
		console.log ("NO HIGH SCORE !!! " + tmp_highscore + " vs " + app.app_puzzle.tries)	
	}
}

app.app_puzzle.reopen = function () {
	if (!allow_clicks) { return; }	
	allow_clicks = false;
	
	$("#puzzle_picture").removeAttr("style");
	$("#puzzle_picture").css({"opacity":0.5, "display": "block"}).transition({"opacity":1},500).delay(500).transition({
		"opacity":0	
	},1000, function () {
		allow_clicks = true;
		$(this).transition({"display":"none"});			
	})
}

app.app_puzzle.askGame = function () {	
	var tmp_buttons = new Array ();
	var tmp_actions = new Array();
	tmp_buttons.push(lng[language].puzzle_grid3);
	tmp_buttons.push(lng[language].puzzle_grid4);
	tmp_buttons.push(lng[language].puzzle_grid5);	
	tmp_actions.push("app.app_puzzle.makeLevel(1)");
	tmp_actions.push("app.app_puzzle.makeLevel(2)");
	tmp_actions.push("app.app_puzzle.makeLevel(3)");
	app.alerts("confirm",lng[language].puzzle_alert1,lng[language].puzzle_alert2,tmp_buttons,tmp_actions);

}

app.app_puzzle.finishGame = function () {	
	// do sound
	app.soundPlay("longfart");	
	// gaplugin
	app.gaplugin.puzzle(app.app_puzzle.tries,Number(Number(app.app_puzzle.level)+2));
	// highscore
	app.app_puzzle.checkHighscore();
	
	var tmp_buttons = new Array ();
	var tmp_actions = new Array();
	tmp_buttons.push(lng[language].puzzle_grid3);
	tmp_buttons.push(lng[language].puzzle_grid4);
	tmp_buttons.push(lng[language].puzzle_grid5);	
	tmp_actions.push("app.app_puzzle.init(1)");
	tmp_actions.push("app.app_puzzle.init(2)");
	tmp_actions.push("app.app_puzzle.init(3)");
	app.alerts("chooser",lng[language].mem_cong,lng[language].puzzle_alert4,tmp_buttons,tmp_actions);
}

app.app_puzzle.restartGame = function () {
	if (!allow_clicks) { return; }
	var tmp_buttons = new Array ();
	var tmp_actions = new Array();
	tmp_buttons.push(lng[language].cancel);
	tmp_buttons.push(lng[language].puzzle_grid3);
	tmp_buttons.push(lng[language].puzzle_grid4);
	tmp_buttons.push(lng[language].puzzle_grid5);
	tmp_actions.push("");	
	tmp_actions.push("app.app_puzzle.init(1)");
	tmp_actions.push("app.app_puzzle.init(2)");
	tmp_actions.push("app.app_puzzle.init(3)");
	app.alerts("confirm",lng[language].puzzle_alert1,lng[language].puzzle_alert2,tmp_buttons,tmp_actions);
}

app.app_puzzle.makeLevel = function (was) {	
	app.app_puzzle.level = was?was:1;	
	app.app_puzzle.setGame();
}