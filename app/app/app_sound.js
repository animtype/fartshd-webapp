// copyright Dr.Peter


app.mp3folder = "mp3/";
app.audiofolder = "sounds/";
app.pianofolder = "piano/";
app.sound_for_click = "sounds/click5.mp3";


// media objects
app.soundmedia_farts = null;
app.soundmedia_sound = null;
app.soundmedia_press = null;
app.soundmedia_piano1 = null;
app.soundmedia_piano2 = null;
app.soundmedia_mix1 = null;
app.soundmedia_mix2 = null;

/* sound events */
app.soundOnSuccess = function () {	
	//drawLogs("!!! play");
}
app.soundOnError = function (error) {
	//drawLogs("!!! error audio: " + error.code);
	//drawLogs("!!! error audio message: " + error.message);
}
app.soundOnStatus = function () {	
	//drawLogs("!!! status");
}
/* FARTS events */
app.fartsOnSuccess = function () { }
app.fartsOnError = function () { }



// for windows and desktop we will use howler
//tmp_snd.unload();



/* FARTS */
app.soundArray = function (url) {
	if (app.soundmedia_farts) {
		app.releaseMediaObject ( app.soundmedia_farts );
	}	
	var snd = app.soundFolder + app.mp3folder + url + ".mp3";
	if (app.mediaObject) {
		// media object
		app.soundmedia_farts = new Media(snd, app.fartsOnSuccess, app.fartsOnError);
		app.soundmedia_farts.play();
	} else {
		// howler audio
		app.soundmedia_farts = new Howl({urls:[snd],volume: 1}).play();	
	}
	console.log(snd);
}

/* CLICKS */
app.soundClick = function () {
	
	if (app.localStorage.fartshd_settings[1] != 1) { return }
	
	if (app.soundmedia_sound) {
		// delete sound media
		app.releaseMediaObject ( app.soundmedia_sound );
	}	
	var snd = app.soundFolder + app.sound_for_click;
	if (app.mediaObject) {	
		app.soundmedia_sound = new Media(snd, app.soundOnSuccess, app.soundOnError, app.soundOnStatus);
		app.soundmedia_sound.play();
	} else {
		// howler audio
		app.soundmedia_sound = new Howl({urls:[snd],volume: 1}).play();		
	}
}

/* PRESS */
app.soundPress = function (url,was) {
	if (was) {
		if (app.soundmedia_press) {
			// delete sound media
			app.releaseMediaObject ( app.soundmedia_press );
		}
		var snd = app.soundFolder + app.audiofolder + url + ".mp3";
		if (app.mediaObject) {
			app.soundmedia_press = new Media(snd, app.soundOnSuccess, app.soundOnError);
			app.soundmedia_press.play();
		} else {
			// howler audio
			app.soundmedia_press = new Howl({urls:[snd],volume: 1}).play();		
		}
	} else {		
		app.soundmedia_press.stop();
		if (app.mediaObject) {
			// delete sound media
			app.releaseMediaObject ( app.soundmedia_press );
		}
	}
}

/* SOUNDS */
app.soundPlay = function (url) {
	if (app.soundmedia_sound) {
		// delete sound media
		app.releaseMediaObject ( app.soundmedia_sound );
	}	
	var snd = app.soundFolder + app.audiofolder + url + ".mp3";	
	if (app.mediaObject) {
		app.soundmedia_sound = new Media(snd, app.soundOnSuccess, app.soundOnError);
		app.soundmedia_sound.play();
	} else {
		// howler audio
		app.soundmedia_sound = new Howl({urls:[snd],volume: 1}).play();		
	}
	
}



/* PIANO */
app.soundmedia_piano = 2;
app.pianoKey = function (url,sustain) {
	
	/* check for piano 1 or 2 */
	if (app.soundmedia_piano == 2) {
		if (app.soundmedia_piano1) {
			// delete sound media
			app.releaseMediaObject ( app.soundmedia_piano1 );
		}	
		//console.log("piano 1")
		var snd = app.soundFolder + app.pianofolder + url + ".mp3";	
		if (app.mediaObject) {
			app.soundmedia_piano1 = new Media(snd, app.soundOnSuccess, app.soundOnError);
			app.soundmedia_piano1.play();
		} else {
			// howler audio
			app.soundmedia_piano1 = new Howl({urls:[snd],volume: 1}).play();	
		}
		app.soundmedia_piano = 1;	
	} else {
		if (app.soundmedia_piano2) {
			// delete sound media
			app.releaseMediaObject ( app.soundmedia_piano2 );
		}	
		//console.log("piano 2")
		var snd = app.soundFolder + app.pianofolder + url + ".mp3";	
		if (app.mediaObject) {
			app.soundmedia_piano2 = new Media(snd, app.soundOnSuccess, app.soundOnError);
			app.soundmedia_piano2.play();
		} else {
			// howler audio
			app.soundmedia_piano2 = new Howl({urls:[snd],volume: 1}).play();	
		}
		app.soundmedia_piano = 2;
	}	
}


/* MIX */
app.soundmedia_mix = 2;
app.mixKey = function (url) {
	
	/* check for piano 1 or 2 */
	if (app.soundmedia_mix == 2) {
		if (app.soundmedia_mix1) {
			// delete sound media
			app.releaseMediaObject ( app.soundmedia_mix1 );
		}	
		//console.log("mix 1")
		var snd = app.soundFolder + app.mp3folder + url + ".mp3";
		if (app.mediaObject) {	
			app.soundmedia_mix1 = new Media(snd, app.soundOnSuccess, app.soundOnError);
			app.soundmedia_mix1.play();	
		} else {
			// howler audio
			app.soundmedia_mix1 = new Howl({urls:[snd],volume: 1}).play();	
		}
		app.soundmedia_mix = 1;	
	} else {
		if (app.soundmedia_mix2) {
			// delete sound media
			app.releaseMediaObject ( app.soundmedia_mix2 );
		}	
		//console.log("mix 2")
		var snd = app.soundFolder + app.mp3folder + url + ".mp3";
		if (app.mediaObject) {	
			app.soundmedia_mix2 = new Media(snd, app.soundOnSuccess, app.soundOnError);
			app.soundmedia_mix2.play();	
		} else {
			// howler audio
			app.soundmedia_mix2 = new Howl({urls:[snd],volume: 1}).play();		
		}
		app.soundmedia_mix = 2;
	}	
}



/* PRELOAD SOUNDS */
app.preloadSounds = function (snds,folder,inits) {
	
	if (app.mediaObject) {	
		eval(inits); 
	} else {		
		// howler audio
		console.log ("PRELOAD SOUNDS ****************")

		var tmp_snd = new Array();
		var tmp_length = 0;
		var tmp_counter = 0;
		var allow_init = true;
	
		for(var t=0; t < snds.length; t++) {
			try {		
				if (snds[t].mp3 && snds[t].mp3 != "empty") {
					tmp_length ++;		
					var tmp_mp3 = app.soundFolder + folder + snds[t].mp3 + ".mp3";
					//console.log ("prepare : " + tmp_mp3)
					tmp_snd[t] = new Howl({  urls: [tmp_mp3], volume: 1, buffer: false, onload: function() { preloadAlowstart(); }});
				}
			} catch (e) {}
		}
		// just in case
		setTimeout(function(){ preloadInit("expired"); },10000);
	
		function preloadAlowstart() { 
			tmp_counter++;
			// console.log ("preload sound " + tmp_counter + " /// " + tmp_length);
			if (tmp_counter >= tmp_length) {
				preloadInit("ok");
			}
		}
		
		
		function preloadInit(timers) {
			if (!allow_init) { return; }	
			allow_init = false;			
			for (var v in tmp_snd) { tmp_snd[v].unload(); }				
			console.log ("preload completed " + tmp_counter + " ::: " + timers)
			eval(inits);
		}
	}	
}

app.preloadAllSounds = function () {
	app.preloadMale	();	
}
app.preloadMale = function () {
	console.log ("preload male");
	$("#loadmsg").html("L O A D I N G : male sounds [1/6]");
	app.preloadSounds (sounds.male,app.mp3folder,"app.preloadFemale()");		
}
app.preloadFemale = function () {
	console.log ("preload female");
	$("#loadmsg").html("L O A D I N G : female sounds [2/6]");
	app.preloadSounds (sounds.female,app.mp3folder,"app.preloadOld()");		
}
app.preloadOld = function () {
	console.log ("preload old");
	$("#loadmsg").html("L O A D I N G : old sounds [3/6]");
	app.preloadSounds (sounds.old,app.mp3folder,"app.preloadMix()");		
}
app.preloadMix = function () {
	console.log ("preload mix");
	$("#loadmsg").html("L O A D I N G : mix sounds [4/6]");
	app.preloadSounds (sounds.mix,app.mp3folder,"app.preloadSFX()");		
}
app.preloadSFX = function () {
	var tmp_sounds = new Array();
	tmp_sounds.push(new Object({"mp3":"car1"}));
	tmp_sounds.push(new Object({"mp3":"car2"})); 
	tmp_sounds.push(new Object({"mp3":"car3"})); 
	tmp_sounds.push(new Object({"mp3":"click1"})); 
	tmp_sounds.push(new Object({"mp3":"click2"})); 
	tmp_sounds.push(new Object({"mp3":"click3"})); 
	tmp_sounds.push(new Object({"mp3":"click4"})); 
	tmp_sounds.push(new Object({"mp3":"click5"})); 
	tmp_sounds.push(new Object({"mp3":"explosion"}));
	tmp_sounds.push(new Object({"mp3":"longfart"}));
	console.log ("preload sfx");
	$("#loadmsg").html("L O A D I N G : sfx sounds [5/6]");
	app.preloadSounds (tmp_sounds,app.audiofolder,"app.preloadPiano()");			
}
app.preloadPiano = function () {
	var tmp_sounds = new Array();
	for (var p = 0; p<10; p++) {
		tmp_sounds.push(new Object({"mp3":"s1_" + p}));	
		tmp_sounds.push(new Object({"mp3":"s2_" + p}));
		tmp_sounds.push(new Object({"mp3":"s3_" + p}));
	}
	console.log ("preload piano");
	$("#loadmsg").html("L O A D I N G : piano sounds [6/6]");
	app.preloadSounds (tmp_sounds,app.pianofolder,"kill_splashscreen()");			
}




/* testing ************************ */
/* ******************************** */
/*
if (isTesting) {
	app.soundArray = function (url) { return; }
	app.soundClick = function () { return; }	
	app.soundPress = function (url,was) { return; }	
	app.soundPlay = function (url) { return; }	
	app.pianoKey = function (url,sustain) { return; }	
	app.mixKey = function (url,sustain) { return; }
}
*/









