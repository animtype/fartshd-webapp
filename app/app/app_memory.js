// copyright Dr.Peter

app.app_memory = function(soundObject) {
	app.app_memory.soundObject = null;
	app.app_memory.soundObject = soundObject;
	app.app_memory.init();
	//drawLogs("FART SOUND")	
}
app.app_memory.refresh = function (firsttimer) {
	var tmp_w = calcWidthBlocks()
	//drawLogs("refresh memory : " + $("#memory_holder").innerHeight())
	$(".memory_block").css({
		"margin": margins/2,
		"width": tmp_w,	
		"height": tmp_w,
	});
	
	if (firsttimer) {
		var tmp_height = $("#app_holder").height();
		app.scrollDownScreen(tmp_height);
	}
	app.getBackgroundStyle();	
}
app.app_memory.init = function (next) {	
	// init variables
	$("#memory").remove();	
	allow_clicks=false;	
	app.app_memory.memory_level = 4;
	app.app_memory.memory_maxlevel = 10;
	app.app_memory.current_level = next?next:app.localStorage.fartshd_memory[0];
	app.app_memory.blocks = app.app_memory.memory_level * app.app_memory.current_level;
	app.app_memory.maxpars = 26; /* depricated */
	app.app_memory.wins = 0;
	app.app_memory.trys = 0;
	app.app_memory.orders = null;
	app.app_memory.orders = new Array();
	app.app_memory.opens = new Array(null,null,null,null,null,null);
	app.app_memory.prev = -100;
	app.app_memory.par = 0;	
	for (var r=0; r<app.app_memory.blocks; r++) {
		app.app_memory.orders.push(r);	
		app.app_memory.orders.push(r);
	}
	// mix array
	app.app_memory.orders = shuffle(app.app_memory.orders)
	// attach all divs
	$("#app_holder").css({"opacity":0});
	$("#app_holder").append('<div id="memory" class="app gpuAcc"><div id="memory_holder" class="gpuAcc"></div></div>');
	$("#memory_holder").append('<h3 class="subtitle gpuAcc">Level ' + app.app_memory.current_level +' / '+app.app_memory.memory_maxlevel+'</h3>');
	$("#memory_holder").css({"margin-left": margins/2});
	// draw all boxes
	for (var i=0; i<app.app_memory.orders.length; i++) {
		//app.app_memory.orders[i]
		$("#memory_holder").append('<div id="memory' + i + '" class="memory_block gpuAcc"><div class="icon gpuAcc"></div><div class="title"></div></div>');
		// if testing
		if(isTesting) {
			$("#memory" + i + " .title").append	(app.app_memory.orders[i])
		}
		// animate memory blocks
		var tmp_w = calcWidthBlocks();
		$("#memory" + i).attr({"name":i});
		$("#memory" + i).click(function() {
			if(allow_clicks) {
				app.app_memory.openBlock($(this), $(this).attr("name"));
			}	
		})
		$("#memory" + i).stop(true,false).css({"opacity":0});
		$("#memory" + i).css({			
			"display": "block",
			"margin": margins/2,
			"width": tmp_w,	
			"height": tmp_w, 			 
			perspective: 900, 
			rotateY: 45}).delay(pause*i).transition({
				opacity: 1,
				perspective: 900,
				rotateY: 0
			},duration/2, function () {
				// reset
				$(this).css({perspective: 0,rotateY: 0});
				if ((app.app_memory.orders.length-1) == Number($(this).attr("name"))) {
					allow_clicks=true;
				}
			})
		}
	$("#memory_holder").append('<div style="clear: both"></div><p style="height: 10px;">&nbsp;</p>');
	
	$("#app_holder").transition({"opacity":1}, duration*2, function() {
		app.app_memory.refresh(true);
	})
	
	
}

app.app_memory.openBlock = function (obj,was) {
	var was = Number(was);
	if(app.app_memory.prev == was) { return }		
	app.app_memory.prev = was;
	app.app_memory.par++;
	// play sound
	app.soundArray(app.app_memory.soundObject[app.app_memory.orders[was]].mp3);
	// first par
	if(app.app_memory.par == 1) {
		allow_clicks=false;
		app.app_memory.opens[0] = was;
		app.app_memory.opens[1] = app.app_memory.orders[was];
		app.app_memory.opens[2] = obj;
		app.app_memory.openPar(obj,false);
		return;
	}
	// second par
	if(app.app_memory.par == 2) {
		allow_clicks=false;
		app.app_memory.opens[3] = was;
		app.app_memory.opens[4] = app.app_memory.orders[was];
		app.app_memory.opens[5] = obj;
		app.app_memory.openPar(obj,true);	
	}
}
app.app_memory.openPar = function (obj,check) {
	// open par
	// unbind click
	// check if second par is oppened
	
	
	obj.css({
		opacity:1,
		scale: [1, 1]
	}).transition({
		opacity:0.3, 
		scale: [0.9, 0.9]
	},duration/2,function() {
		allow_clicks=true;
		if (check) {
			app.app_memory.checkPar();	
		}	
	});
	obj.unbind("click");
}
app.app_memory.closePar = function (obj,was) {
	obj.stop(true,false);
	obj.transition({
		opacity:1,
		scale: [1, 1]
	},duration*2, function() {		
	});
	obj.click(function() {
		app.app_memory.openBlock($(this), was);		
	});
}
app.app_memory.checkPar = function () {
	// check the game
	if (app.app_memory.opens[1] == app.app_memory.opens[4]) {
		//drawLogs("!!!WIN");
		app.app_memory.wins++;
		//app.app_memory.opens[2].find(".icon").transition({"opacity":0});
		app.app_memory.opens[2].css({"perspective":500,"rotateY":0}).transition({"perspective":500,"opacity":0,"rotateY":179},duration);
		//app.app_memory.opens[5].find(".icon").transition({"opacity":0});
		app.app_memory.opens[5].css({"perspective":500,"rotateY":0}).transition({"perspective":500,"opacity":0,"rotateY":179},duration);
		if (app.app_memory.wins == app.app_memory.blocks) {
			//drawLogs("ALL");
			var tmp_text = "";
			tmp_text += lng[language].mem_txt1 + " " + app.app_memory.blocks + " ";
			tmp_text += lng[language].mem_txt2 + " " + lng[language].mem_txt3 + " "
			tmp_text += (app.app_memory.trys+1) + " " + lng[language].mem_txt4 +".<br />";
			 
			tmp_text += "" + app.app_memory.calcualteScore();
			
			// gaplugin
			app.gaplugin.memory(app.app_memory.current_level);
			
			if (app.app_memory.current_level<app.app_memory.memory_maxlevel) {
				app.app_memory.current_level++;
				app.localStorage.change_memory(app.app_memory.current_level);
				// next level
				app.alerts("alert",lng[language].mem_cong,tmp_text,lng[language].mem_next,"app.app_memory.init("+store.app_memory.memory_currentlevel+")");
			} else {
				tmp_text += "<br />" + lng[language].mem_finish;
				app.alerts("alert",lng[language].mem_cong,tmp_text);	
			}
		}
	} else {
		//drawLogs("LOOSE");	
		app.app_memory.closePar(app.app_memory.opens[2],app.app_memory.opens[0])
		app.app_memory.closePar(app.app_memory.opens[5],app.app_memory.opens[3])
	}
	app.app_memory.opens = new Array(null,null,null,null,null,null);
	app.app_memory.prev = -100;
	app.app_memory.par = 0;
	app.app_memory.trys++;
}
app.app_memory.calcualteScore = function (){
	var trys = app.app_memory.trys+1;
	var pars = app.app_memory.blocks;
	var calcs = trys / pars;
	var tmp_copy = "";
	if (calcs < 1.4) {
		// insane
		tmp_copy += lng[language].mem_high1;
		return tmp_copy;
	}
	if (calcs < 1.8) {
		// best
		tmp_copy += lng[language].mem_high2;
		return tmp_copy;
		
	} else if (calcs < 2.5) {
		// medium
		tmp_copy += lng[language].mem_high3;
		return tmp_copy;
		
	} else if (calcs < 5) {
		// medium
		tmp_copy += lng[language].mem_high4;
		return tmp_copy;
		
	} else {
		// poor
		tmp_copy += lng[language].mem_high5;
	}	
	
	return tmp_copy;	
}