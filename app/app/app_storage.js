// copyright Dr.Peter

app.localStorage = new Object ();
app.localStorage.fartshd_settings = new Array ();
app.localStorage.fartshd_appversion = new Array ();
app.localStorage.fartshd_favorites = new Array ();
app.localStorage.fartshd_hidefarts = new Array ();
app.localStorage.fartshd_memory = new Array ();
app.localStorage.fartshd_sweeper = new Array ();
app.localStorage.fartshd_fartsay = new Array ();
app.localStorage.fartshd_puzzle = new Array ();
app.localStorage.fartshd_skin = new Array ();
app.localStorage.fartshd_mix = new Array ();
// the list of supported files
// fartshd_favorites
// fartshd_hidefarts 
app.localStorage.header = "animtypecom_fartshd";
app.localStorage.spliter = "#$#";
app.localStorage.inner = "$#$";
app.localStorage.empty = "/";

app.localStorage.read = function () {
	
	//window.localStorage.fartshd_settings = ""
	//window.localStorage.fartshd_appversion = ""
	//window.localStorage.fartshd_mix = "animtypecom_fartshd#$#0xb3cef44b1619697025ac8cf77bb3baf08a74561102e0484573677188a7e9a91945f3f59c72d80c0a2da41c71682573e40a5eea9d395db9a985c53bec61215d77ec3c640ec9d7b1bdff269b25e2d4bb69d0512c174eb6a8f47ef763451c981f07"
	//window.localStorage.fartshd_mix = "";
	/*
	window.localStorage.fartshd_skin = ""
	window.localStorage.fartshd_skin = ""
	window.localStorage.fartshd_puzzle = ""
	window.localStorage.fartshd_settings = ""
	window.localStorage.fartshd_appversion = ""
	window.localStorage.fartshd_favorites = ""
	window.localStorage.fartshd_hidefarts = ""
	window.localStorage.fartshd_memory = ""
	window.localStorage.fartshd_sweeper = ""
	window.localStorage.fartshd_fartsay = ""
	*/
	
	var get_set = app.localStorage.check(window.localStorage.fartshd_settings);
	var get_app = app.localStorage.check(window.localStorage.fartshd_appversion);
	var get_fav = app.localStorage.check(window.localStorage.fartshd_favorites);
	var get_hidfar = app.localStorage.check(window.localStorage.fartshd_hidefarts);
	var get_memory = app.localStorage.check(window.localStorage.fartshd_memory);
	var get_sweep = app.localStorage.check(window.localStorage.fartshd_sweeper);
	var get_say = app.localStorage.check(window.localStorage.fartshd_fartsay);
	var get_puzz = app.localStorage.check(window.localStorage.fartshd_puzzle);
	var get_skin = app.localStorage.check(window.localStorage.fartshd_skin);
	var get_mix = app.localStorage.check(window.localStorage.fartshd_mix);
	
	console.log ("----------- STORAGE -----------");
	console.log ("sett : " + window.localStorage.fartshd_settings);
	console.log ("appv : " + window.localStorage.fartshd_appversion);
	console.log ("favo : " + window.localStorage.fartshd_favorites);
	console.log ("hide : " + window.localStorage.fartshd_hidefarts);
	console.log ("memo : " + window.localStorage.fartshd_memory);
	console.log ("swee : " + window.localStorage.fartshd_sweeper);
	console.log ("says : " + window.localStorage.fartshd_fartsay);
	console.log ("puzz : " + window.localStorage.fartshd_puzzle);
	console.log ("skin : " + window.localStorage.fartshd_skin);
	console.log ("mix : " + window.localStorage.fartshd_mix);
	console.log ("----------- STORAGE -----------");
	
	// set objects
	app.localStorage.set_settings(get_set);
	app.localStorage.set_appversion(get_app);
	app.localStorage.set_favorites(get_fav);
	app.localStorage.set_hidefarts(get_hidfar);
	app.localStorage.set_memory(get_memory);
	app.localStorage.set_sweeper(get_sweep);
	app.localStorage.set_say(get_say);
	app.localStorage.set_puzzle(get_puzz);
	app.localStorage.set_skin(get_skin);
	app.localStorage.set_mix(get_mix);
	

}
app.localStorage.check = function (was) {
	was = String(was);
	if(was == "undefined") { return false };
	if(was == false) { return false };
	if(was == "") { return false };
	if(was.indexOf(app.localStorage.header) == -1) { return false };
	
	// everything is OK
	return was;
}

// ********************************* //
// SETTINGS
app.localStorage.set_settings = function (was) {
	if(!was) {
		// no settings
		// 0 - scroll down
		// 1 - sounds on alert window
		// 2 - car vibrate
		app.localStorage.change_settings (0,1);
		app.localStorage.change_settings (1,1);
		
		// first time settings
		if (app.platform == "winphone") {
			// for windows phone
			app.localStorage.change_settings (2,1);	
		} else {
			app.localStorage.change_settings (2,0);		
		}
		
	} else {
		var tmp_snd = was.split(app.localStorage.spliter);	
		app.localStorage.fartshd_settings[0] = tmp_snd[1].split(app.localStorage.inner)[0];
		app.localStorage.fartshd_settings[1] = tmp_snd[1].split(app.localStorage.inner)[1];
		app.localStorage.fartshd_settings[2] = tmp_snd[1].split(app.localStorage.inner)[2];
	}
}
app.localStorage.change_settings = function (positions, values) {
	
	// check for toggle
	if(values == "toggle") {
	 values = app.localStorage.fartshd_settings[positions]==1?0:1;	
	}
	
	// create a value out of position
	app.localStorage.fartshd_settings[positions] = values;
	
	// save value
	var tmp_save = app.localStorage.header;
	tmp_save += app.localStorage.spliter;	
	for (var s=0; s<app.localStorage.fartshd_settings.length;s++){
		tmp_save += app.localStorage.fartshd_settings[s];
		tmp_save += app.localStorage.inner;
	}
		
	window.localStorage.fartshd_settings = tmp_save;
	
}


// ********************************* //
// APP VERSION CHANGED !!!
app.localStorage.set_appversion = function (was) {
	
	if(!was) {
		// no version
		app.localStorage.change_appversion (0);
	} else {
		var tmp_snd = was.split(app.localStorage.spliter)	
		app.localStorage.fartshd_appversion[0] = tmp_snd[1];
	}
}
app.localStorage.change_appversion = function (was) {
	var tmp_save = app.localStorage.header;
	tmp_save += app.localStorage.spliter;
	tmp_save += was;
	app.localStorage.fartshd_appversion[0] = was;		
	window.localStorage.fartshd_appversion = tmp_save;
}


// ********************************* //
// FAVORITES
app.localStorage.clear_favorites  = function () { 
	app.localStorage.fartshd_favorites = new Array ();
	window.localStorage.fartshd_favorites = "";	
}
app.localStorage.set_favorites = function (was) {
	if(!was) { return false }
	// now split
	var tmp_snd = was.split(app.localStorage.spliter)
	for (var s=1; s<tmp_snd.length; s++) {
		app.localStorage.fartshd_favorites.push(app.getSoundID(tmp_snd[s]));
	}
}
app.localStorage.save_favorites = function () {
	var tmp_save = app.localStorage.header;
	for (t=0; t<app.localStorage.fartshd_favorites.length; t++) {
		tmp_save += app.localStorage.spliter;
		tmp_save += app.localStorage.fartshd_favorites[t].mp3;	
	}	
	window.localStorage.fartshd_favorites = tmp_save;
	
}
app.localStorage.delete_favorites = function (was) {
	was = String(was);
	var tmp_index = false;
	for (var t in app.localStorage.fartshd_favorites) {
		if (app.localStorage.fartshd_favorites[t].mp3 == was) {
			tmp_index = t;		
		}		
	}
	if (tmp_index) {
		app.localStorage.fartshd_favorites.splice(tmp_index,1);
	}
	app.localStorage.save_favorites();	
}
app.localStorage.add_favorites = function (was) {
	var tmp_id = app.getSoundID(was)
	app.localStorage.fartshd_favorites.push(tmp_id);
	app.localStorage.save_favorites();	
}


// ********************************* //
// HIDE FARTS
app.localStorage.clear_hidefarts  = function () { 
	app.localStorage.set_hidefarts(false);
}
app.localStorage.set_hidefarts = function (was) {
	if(!was) { 
		// zero
		app.localStorage.change_hidefarts (0);		
	} else {
		var tmp_snd = was.split(app.localStorage.spliter);	
		app.localStorage.fartshd_hidefarts[0] = tmp_snd[1];
	}
}
app.localStorage.change_hidefarts = function (was) {
	var tmp_save = app.localStorage.header;
	tmp_save += app.localStorage.spliter;
	tmp_save += was;
	app.localStorage.fartshd_hidefarts[0] = was;		
	window.localStorage.fartshd_hidefarts = tmp_save;	
}


// ********************************* //
// MEMORY
app.localStorage.clear_memory  = function () { 
	app.localStorage.set_memory(false);
}
app.localStorage.set_memory = function (was) {
	if(!was) {
		// first level
		app.localStorage.change_memory (1);
	} else {
		//app.localStorage.fartshd_hidefarts[0];
		var tmp_snd = was.split(app.localStorage.spliter)	
		app.localStorage.fartshd_memory[0] = tmp_snd[1];
	}
}
app.localStorage.change_memory = function (was) {
	var tmp_save = app.localStorage.header;
	tmp_save += app.localStorage.spliter;
	tmp_save += was;
	app.localStorage.fartshd_memory[0] = was;		
	window.localStorage.fartshd_memory = tmp_save;
}


// ********************************* //
// SWEEPER
app.localStorage.clear_sweeper  = function () { 
	app.localStorage.set_sweeper(false);
}
app.localStorage.set_sweeper = function (was) {
	if(!was) {
		// first level
		app.localStorage.change_sweeper (1);
	} else {
		//app.localStorage.fartshd_hidefarts[0];
		var tmp_snd = was.split(app.localStorage.spliter)	
		app.localStorage.fartshd_sweeper[0] = tmp_snd[1];
	}
}
app.localStorage.change_sweeper = function (was) {
	var tmp_save = app.localStorage.header;
	tmp_save += app.localStorage.spliter;
	tmp_save += was;
	app.localStorage.fartshd_sweeper[0] = was;		
	window.localStorage.fartshd_sweeper = tmp_save;
}


// ********************************* //
// FART SAYS
app.localStorage.clear_say  = function () { 
	app.localStorage.set_say(false);
}
app.localStorage.set_say = function (was) {
	if(!was) {
		// first level
		app.localStorage.change_say (0);
	} else {
		//app.localStorage.fartshd_hidefarts[0];
		var tmp_snd = was.split(app.localStorage.spliter)	
		app.localStorage.fartshd_fartsay[0] = tmp_snd[1];
	}
}
app.localStorage.change_say = function (was) {
	var tmp_save = app.localStorage.header;
	tmp_save += app.localStorage.spliter;
	tmp_save += was;
	app.localStorage.fartshd_fartsay[0] = was;		
	window.localStorage.fartshd_fartsay = tmp_save;
}

// ********************************* //
// PUZZLE
app.localStorage.set_puzzle = function (was) {
	if(!was) {
		// 0 - 3x3
		// 1 - 4x4
		// 2 - 5x5
		app.localStorage.change_puzzle (0,0);
		app.localStorage.change_puzzle (1,0);
		app.localStorage.change_puzzle (2,0);
	} else {
		var tmp_snd = was.split(app.localStorage.spliter);	
		app.localStorage.fartshd_puzzle[0] = tmp_snd[1].split(app.localStorage.inner)[0];
		app.localStorage.fartshd_puzzle[1] = tmp_snd[1].split(app.localStorage.inner)[1];
		app.localStorage.fartshd_puzzle[2] = tmp_snd[1].split(app.localStorage.inner)[2];
	}
}
app.localStorage.change_puzzle = function (positions, values) {
	
	// create a value out of position
	app.localStorage.fartshd_puzzle[positions] = values;
		
	// save value
	var tmp_save = app.localStorage.header;
	tmp_save += app.localStorage.spliter;	
	for (var s=0; s<app.localStorage.fartshd_puzzle.length;s++){
		tmp_save += app.localStorage.fartshd_puzzle[s];
		tmp_save += app.localStorage.inner;
	}	
	window.localStorage.fartshd_puzzle = tmp_save;
}

// ********************************* //
// SKIN
app.localStorage.clear_skin  = function () { 
	app.localStorage.set_skin(false);
}
app.localStorage.set_skin = function (was) {
	if(!was) {		
		// 0 - default
		// 1 - Android
		// 2 - ios
		// 3 - windows 8
		app.localStorage.change_skin (2);
	} else {
		//app.localStorage.fartshd_hidefarts[0];
		var tmp_snd = was.split(app.localStorage.spliter)	
		app.localStorage.fartshd_skin[0] = tmp_snd[1];
	}
}
app.localStorage.change_skin = function (was) {
	var tmp_save = app.localStorage.header;
	tmp_save += app.localStorage.spliter;
	tmp_save += was;
	app.localStorage.fartshd_skin[0] = was;		
	window.localStorage.fartshd_skin = tmp_save;
}

// ********************************* //
// MIX
// ********************************* //
app.localStorage.set_mix = function (was) {
	if(!was) {
		// no mix
	} else {
		var tmp_snd = was.split(app.localStorage.spliter);
		for (var t = 1; t < tmp_snd.length; t++) {
			// create object foe each storage entry
			app.localStorage.fartshd_mix[t-1] = tmp_snd[t];
		}
		console.log("all mixes ...")
		console.log(app.localStorage.fartshd_mix);
	}
}
app.localStorage.change_mix = function (positions, values) {
	
	if(values == "delete") {
		// delete position 
		console.log("delete mix : " + positions)
		app.localStorage.fartshd_mix.splice(positions,1);
	} else {
		// create a value out of position
		app.localStorage.fartshd_mix[positions] = values;	
	}

	// save value for all objects and save it in storage
	var tmp_save = app.localStorage.header;
	for (var s=0; s<app.localStorage.fartshd_mix.length;s++){
		tmp_save += app.localStorage.spliter
		tmp_save += app.localStorage.fartshd_mix[s];
	}		
	window.localStorage.fartshd_mix = tmp_save;
		
	console.log("showing ALL decrypted mixes ... ")
	console.log(app.localStorage.fartshd_mix)
	
}
app.localStorage.get_mix = function (tmp_id) {
	// get mix from ID number
	// first check if save already exist
	var tmp_location = app.localStorage.fartshd_mix.length;
	for (var t=0; t<app.localStorage.fartshd_mix.length; t++) {
		// just in case for wrong data
		var tmp_read_id = 999;
		try {
			tmp_read_id = app.localStorage.read_key(app.localStorage.fartshd_mix[t]).id	
		} catch (e) {}
		console.log("compare ids : " + tmp_read_id + " ::: this id " + tmp_id)
		if	(tmp_read_id == tmp_id) {
			tmp_location = t;
		}
	}
	// return location of the mix
	return tmp_location;
}

app.localStorage.save_mix = function (key) {
	// save mix
	// key is string with delimiters
	// create an object out of sring
	var tmp_object = app.localStorage.split_key(key);
	// encrypt key sting 	
	var encrypt_key = app.localStorage.encrypt_key(key);
	// get location ID for saving
	tmp_location = app.localStorage.get_mix(tmp_object.id);
	console.log ("location to save : " + tmp_location);
	// save mix	
	app.localStorage.change_mix (tmp_location,encrypt_key);
}
app.localStorage.decrypt_key = function (key) {
	// decrypt string key
	var decrypted = RunDes (false, key);
	return (decrypted);
}
app.localStorage.encrypt_key = function (key) {
	// decrypt string key
	var encrypt = RunDes (true, key);
	return (encrypt);
}
app.localStorage.read_key = function (key) {
	// return object for stored encrypted key
	var read = 	app.localStorage.split_key(app.localStorage.decrypt_key(key));
	return (read);
}
app.localStorage.split_key = function (key) {
	
	// only string
	// return object
	var return_object = new Object();
	var key = key.split(app.localStorage.inner);
	
	// check leading key if it is correct	
	if (key[0] == "mix1") {
		// mix 1 is simple array
		// with 20 fields				
		return_object.type = key[0];
		return_object.id = key[1];
		return_object.cat = key[2];
		return_object.title = key[3];
		
		return_object.mp30 = key[4];
		return_object.mp31 = key[5];
		return_object.mp32 = key[6];
		return_object.mp33 = key[7];
		return_object.mp34 = key[8];
		
		return_object.tim0 = key[9];
		return_object.tim1 = key[10];
		return_object.tim2 = key[11];
		return_object.tim3 = key[12];
		return_object.tim4 = key[13];
		
		return_object.val1 = key[14];
		return_object.val2 = key[15];
		return_object.val3 = key[16];
		return_object.val4 = key[17];
		return_object.val5 = key[18];
		
		return_object.author = key[19];
		return_object.device = key[20];							
		}
	// on error returns an empty object
	return (return_object);			
}
