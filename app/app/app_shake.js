// copyright Dr.Peter

// !!!! RENDOM & SHAKE !!!!

app.app_shake = function(malefarts,femalefarts,oldfarts,favfarts) {
	app.app_shake.malefarts = null;
	app.app_shake.femalefarts = null;
	app.app_shake.oldfarts = null;
	app.app_shake.favfarts = null;
	app.app_shake.malefarts = malefarts;	
	app.app_shake.femalefarts = femalefarts;	
	app.app_shake.oldfarts = oldfarts;
	// if favorites is empty get the editors
	app.app_shake.favfarts = favfarts.length > 0?favfarts:false;
	app.app_shake.init();
	//drawLogs("FART SOUND")
	app.getBackgroundStyle();	
}

app.app_shake.refresh = function (firsttimer) {
	
	var tmp_margin = 10;
	var tmp_min = 290;
	var tmp_max = 600;
	var tmp_width = parseInt($(window).width()) - (tmp_margin*2);
	var tmp_height = parseInt($(window).height()) - 90 - 100;
	var tmp_circle = Math.min(tmp_width,tmp_height);
	tmp_circle = tmp_circle>tmp_min?tmp_circle:tmp_min;
	tmp_circle = tmp_circle<tmp_max?tmp_circle:tmp_max;
	//console.log(tmp_height + " ::: " + tmp_width + " /// " + tmp_circle)
	$("#random_player").css({"width":tmp_circle,"height":tmp_circle});
	$("#random_wave").css({"top": ((tmp_circle/2)-100)});
		
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

app.app_shake.init = function () {
	// app holder
	// init variables
	$("#counter").remove();
	allow_clicks=true;
	app.app_shake.previous = -1;
	app.app_shake.watchID = null;
	
	app.app_shake.accX = new Array(0,0,0);
	app.app_shake.accY = new Array(0,0,0);
	app.app_shake.accZ = new Array(0,0,0);	
	
	app.app_shake.shakeLength = 6;
		
	// create an app
	$("#app_holder").css({"opacity":0});
	$("#app_holder").append('<div id="random" class="app gpuAcc"><div id="random_holder" class="gpuAcc"></div></div>');
	
	$("#random_holder").append(app.drawSelector('app.app_shake.open_listview',app.app_shake.favfarts));
	$("#random_holder").append('<div id="random_player" class="gpuAcc" onclick="app.app_shake.runSound()"><div id="random_wave" class="gpuAcc"></div><div class="gpuAcc icon_shake" id="random_play" onclick="app.app_shake.runSound()"></div></div>');
		
	$("#app_holder").transition({"opacity":1},duration*2,function() {
		allow_clicks = true;
		app.flipSelector(0);
		app.app_shake.startWatch();		
	});
	app.app_shake.refresh(true);
}



app.app_shake.open_listview = function (was) {
	app.app_shake.previous = was;
}

app.app_shake.runSound = function() {
	
	if (!allow_clicks) { return }
	
	var sounds = null;
	if (app.app_shake.previous == 0) {
		//drawLogs("MALE")
		sounds = app.app_shake.malefarts;
	} else if (app.app_shake.previous	== 1) {
		//drawLogs("FEMALE")
		sounds = app.app_shake.femalefarts
	} else if (app.app_shake.previous	== 2) {
		//drawLogs("OLD")
		sounds = app.app_shake.oldfarts
	} else if (app.app_shake.previous	== 3) {
		//drawLogs("FAV")
		sounds = app.app_shake.favfarts
	}
	//var tmp_l = sounds.length;	
	var tmp_snd = Math.ceil(Math.random()*sounds.length) - 1;
	app.app_shake.app_playing (sounds[tmp_snd].mp3);
	app.soundArray(sounds[tmp_snd].mp3);
	
}

app.app_shake.app_playing = function (id) {
	
	allow_clicks = false;
	var tmp_obj = app.getTrueSoundID (id);
	var snd_timer = Number(tmp_obj.timer)>100?Number(tmp_obj.timer)-30:500;
	var snd_volume = (Number(tmp_obj.value1)>0?Number(tmp_obj.value1):1)/10;
	console.log  (snd_timer + " ::: " + snd_volume)
	
	$("#random_play").css({"display":"none"});
	
	var tmp_y = $("#random_wave").css("top")
	$("#random_wave").removeAttr("style");
	$("#random_wave").css({
		"opacity":0.5,
		"top":tmp_y,
		"display":"block",
		"scale":[1, 0.01]
		}).transition({
			"scale":[1, snd_volume]
			},snd_timer/2,"easeOutExpo",function() {
				$(this).transition({
				"scale":[1, 0.01]	
				},snd_timer/2,"easeInExpo", function () {
					allow_clicks = true;
					$(this).css({"display":"none",});
					$("#random_play").css({"opacity":0.01,"display":"block"}).transition({"opacity":1},100);	
				});				
			})
}

// Start watching the acceleration
//
app.app_shake.startWatch = function() {
	// Update acceleration every 3 seconds
	var options = { frequency: 150 };

	try {
		app.app_shake.watchID = navigator.accelerometer.watchAcceleration(app.app_shake.onSuccess, app.app_shake.onError, options);
	} catch (e) {}
}

// Stop watching the acceleration
//
app.app_shake.stopWatch = function () {
	if (app.app_shake.watchID) {
		navigator.accelerometer.clearWatch(app.app_shake.watchID);
		app.app_shake.watchID = null;
	}
}


// onSuccess: Get a snapshot of the current acceleration
app.app_shake.onSuccess = function (acceleration) {
	
	if(!$("#random").html()) { app.app_shake.stopWatch(); return; }
	// console.log("acc")

	// new positions
	app.app_shake.accX[1] = acceleration.x;
	app.app_shake.accY[1] = acceleration.y;
	app.app_shake.accZ[1] = acceleration.z;
	
	// CHECK ALL STATES
	var tmp_x = differenceNumbers (app.app_shake.accX[0],app.app_shake.accX[1]);
	var tmp_y = differenceNumbers (app.app_shake.accY[0],app.app_shake.accY[1]);
	var tmp_z = differenceNumbers (app.app_shake.accZ[0],app.app_shake.accZ[1]);

	
	
	if (tmp_x > app.app_shake.shakeLength) {
		// check only X
		// SHAKE !!!
		app.app_shake.runSound();
	} else if (tmp_y > app.app_shake.shakeLength) {
		// check only Y
		// SHAKE !!!
		app.app_shake.runSound();	
	}
	
	// old positions
	app.app_shake.accX[0] = acceleration.x;
	app.app_shake.accY[0] = acceleration.y;
	app.app_shake.accZ[0] = acceleration.z;	
}

// onError: Failed to get the acceleration
app.app_shake.onError = function () {
	//alert('onError!');
}