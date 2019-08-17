// copyright Dr.Peter

app.app_mix = function(soundObject) {
	app.app_mix.soundObject = null;
	app.app_mix.soundObject = soundObject;
	
	// check if there is any empty slots
	app.app_mix.mixSlot = 5;
	//alert(app.localStorage.fartshd_mix.length  + " ::: " + app.app_mix.mixSlot)
	if (app.localStorage.fartshd_mix.length >= app.app_mix.mixSlot) {
		// load last save slot
		app.app_mix.init(false,(app.app_mix.mixSlot-1));	
	} else {
		// load empty
		app.app_mix.init();
	}
}
app.app_mix.refresh = function (firsttimer) {
	if (firsttimer) {
		var tmp_height = $("#app_holder").height();
		app.scrollDownScreen(tmp_height);		
	}
	app.getBackgroundStyle();
	
	// mix table
	var tmp_width = parseInt($(window).width());
	if (tmp_width<400) {
		$(".mix_block").css({"width": "55px","height":"55px"});
		$(".mix_table").css({"width": "55px","height":"120px"});
		$("#mix_table").css({"width": "300px","height":"120px"});
	} else {
		$(".mix_block").css({"width": "70px","height":"70px"});
		$(".mix_table").css({"width": "70px","height":"150px"});
		$("#mix_table").css({"width": "375px","height":"120px"});
	}
	
	// save screen
	var tmp_height = parseInt($(window).height()) + 100;
	$("#mix_screen3").css({"height":tmp_height});

	
		
}
app.app_mix.init = function (next, loadsound) {	
	// init variables
	$("#mix").remove();	
	allow_clicks=false;	
	app.app_mix.deactive = 0.2;
	app.app_mix.active = 1;
	app.app_mix.duration = 800;
	app.app_mix.duration2 = 400;
	app.app_mix.delay = 100;
	app.app_mix.currentSlot = null;	
	app.app_mix.slotArray = new Array (null,null,null,null,null);
	app.app_mix.mixArray = new Array();
	app.app_mix.timeArray = new Array();
	app.app_mix.nameArray = new Array();
	app.app_mix.blockArray = new Array();
	app.app_mix.timer = 0;
	app.app_mix.randomID = randomFromInterval(1000,9999);
	app.app_mix.mixname = lng[language].mix_noname;
	app.app_mix.allsaveslot = 5;
	app.app_mix.saveslot = app.localStorage.fartshd_mix.length?app.localStorage.fartshd_mix.length:0;
	app.app_mix.loadsound = isNaN(loadsound)?false:true;
	app.app_mix.allowBack = false;
	// attach all divs
	$("#app_holder").css({"opacity":0});
	$("#app_holder").append('<div id="mix" class="app gpuAcc"><div id="mix_screen_close" class="truegpuAcc"></div><div id="mix_holder" class="gpuAcc"></div></div>');

	$("#mix_screen_close").append('<br /><div class="button nohighlight truegpuAcc"><div class="icon_prev truegpuAcc"></div><span>'+lng[language].cancel+'</span></div>');
	
	$("#mix_holder").append('<div id="mix_screen1" class="gpuAcc"></div>');
	$("#mix_holder").append('<div id="mix_screen2" class="gpuAcc"></div>');
	$("#mix_holder").append('<div id="mix_screen3" class="gpuAcc">&nbsp;<br /></div>');
	$("#mix_holder").append('<div id="mix_screen4" class="gpuAcc"></div>');
	
	
	
	$("#mix_screen1").append('<h3 id="mix_title" class="gpuAcc">&nbsp;</h3>');
	$("#mix_screen1").append('<div id="mix_table" class="gpuAcc"></div>');
	
	for (var t=0; t<app.app_mix.mixSlot; t++) {
		var tmp_id = "mixer" + t;
		$("#mix_table").append('<div id="'+tmp_id+'" class="gpuAcc mix_table"></div>');
		$("#" + tmp_id).css({"opacity":app.app_mix.deactive})
		$("#" + tmp_id).click (function() { app.app_mix.addSlot($(this)); })
		$("#" + tmp_id).append('<div class="gpuAcc radius mix_block slot_change icon_add"></div>');
		$("#" + tmp_id).append('<div class="gpuAcc radius mix_block slot_delete icon_trash"></div>');
	}
	
	$("#mix_screen1").append('<div id="mix_controls"></div>');
	$("#mix_controls").append('<div onclick="app.app_mix.playfart()" class="button mix_org nohighlight gpuAcc"><div class="icon_play gpuAcc"></div><span>'+lng[language].mix_play+'</span></div>');
	
	$("#mix_controls").append('<div id="mix_name" class="mixtitle_main" style="text-align: center"></div>');	
	
	$("#mix_controls").append('<hr class="mix_control" />');
	$("#mix_controls").append('<div onclick="app.app_mix.newfart()" class="button mix_black nohighlight gpuAcc"><div class="icon_shit gpuAcc"></div><span>'+lng[language].mix_new+'</span></div>');
	$("#mix_controls").append('<div onclick="app.app_mix.savefart()" class="button mix_save_disabled mix_black nohighlight gpuAcc"><div class="icon_starts gpuAcc"></div><span>'+lng[language].mix_save+'</span></div>');
	
	$("#mix_controls").append('<div onclick="app.app_mix.sharefart()" class="button mix_share_disabled mix_black nohighlight gpuAcc"><div class="icon_share gpuAcc"></div><span>'+lng[language].mix_share+'</span></div>');
	
	$("#mix_controls").append('<div onclick="app.app_mix.previewFart()" class="button mix_share_disabled mix_black nohighlight gpuAcc"><div class="icon_globe gpuAcc"></div><span>or Preview it on web</span></div>');

	// save slots
	$("#mix_screen1").append('<hr class="mix_control" />');	
	$("#mix_screen1").append('<div id="mix_saveslots"></div>');
	app.app_mix.drawSave();
	$("#mix_screen1").append('<hr class="mix_control" />');	
	
	$("#mix_screen1").append('<div id="mix_tc"></div>');
	$("#mix_tc").append('<p>&nbsp;</p>');
	//$("#mix_tc").append('<small><strong>'+lng[language].tc_title+'</strong></small><br />');	
	//$("#mix_tc").append('<small>'+lng[language].tc_text+'</small>');
	//$("#mix_tc").append('<p>&nbsp;</p>');
	
	
	
	// LOAD A SOUND from save slot
	if (app.app_mix.loadsound ) {
		// get an object
		var tmp_title = app.localStorage.read_key(app.localStorage.fartshd_mix[loadsound]);
		console.log	("load : " + tmp_title.title);
	
		for (var m=0; m<app.app_mix.mixSlot; m++) {
			if (tmp_title["mp3" + m] != app.localStorage.empty) {
				$("#mixer" + m).transition({"opacity":1},500);
				console.log ("mp3 : " + tmp_title["mp3" + m] + " order : " + app.app_mix.getMP3Order(tmp_title["mp3" + m]))
				app.app_mix.slotArray[m] = app.app_mix.getMP3Order(tmp_title["mp3" + m]);
			}		
		}
		app.app_mix.saveslot = loadsound;
		app.app_mix.randomID = tmp_title.id;
		app.app_mix.mixname = tmp_title.title;
		//$("#mix_name").html(app.app_mix.mixname);
	}
	app.app_mix.setName ((Number(app.app_mix.saveslot)+1), app.app_mix.mixname)
	
	$("#app_holder").transition({"opacity":1}, duration*2, function() {
		allow_clicks=true;
		app.app_mix.drawAllSounds();
		if (next) { app.app_mix.alertStart(); }
	})
	app.app_mix.refreshButtons();
	app.app_mix.refresh(true);	

}
app.app_mix.alertStart = function () {
	app.alerts("confirm",lng[language].mix_alert1,lng[language].mix_alert2,lng[language].mix_alert3,"");	
}
app.app_mix.alertNew = function () {
	app.alerts("confirm",lng[language].mix_alert4,lng[language].mix_alert5,lng[language].mix_alert3,"");	
}
app.app_mix.refreshButtons = function () {
	var tmp_counter = 0;
	for (var t=0; t <app.app_mix.slotArray.length; t++) {
		if (app.app_mix.slotArray[t] !== null) {		
			tmp_counter++;
		}
	}
	// SAVE
	if(tmp_counter<1) {		
		$(".mix_save_disabled").css({"opacity":0.3 })
	} else {
		$(".mix_save_disabled").css({"opacity":1 })	
	}

	// SHARE
	var tmp_length = app.localStorage.fartshd_mix.length;
	var tmp_location = app.localStorage.get_mix(app.app_mix.randomID);
	if (tmp_location >= tmp_length) {
		$(".mix_share_disabled").css({"opacity":0.3 })
	} else {
		$(".mix_share_disabled").css({"opacity":1 })
	}

	
}
app.app_mix.getMP3Order = function (val) {
	var tmp_order = 0;
	for (var v=0; v<app.app_mix.soundObject.length; v++) {
		if(app.app_mix.soundObject[v].mp3 == val) { tmp_order = v; }	
	}
	return tmp_order;	
}
app.app_mix.setTitle = function (txt) {
	var tmp_a = app.app_mix.duration / 2;
	var tmp_b = app.app_mix.duration / 2;
	$("#mix_title").html(txt);
	$("#mix_title").css({"opacity":1}).delay(tmp_a).transition({"opacity":0},app.app_mix.duration);	
}
app.app_mix.setName = function (n,txt) {
	$("#mix_name").html('');
	$("#mix_name").append('<span style="font-size: 0.7em; color: #bbbbbb;">'+lng[language].mix+' '+ n +'</span><br />' + txt + '');	
}
app.app_mix.flipSlot = function (obj,dur,del) {
	
	var dur = dur?dur:app.app_mix.duration;
	var del = del?del:0;

	// just flip
	$(obj).css({"perspective":500,"rotateY":90}).delay(del).transition({
		"perspective":500,
		"rotateY":0
		},dur);
}
app.app_mix.addSlot = function (was) {
	
	if(!allow_clicks) { return }
	allow_clicks=false;
	
	// console.log ("active " + was.attr("id"))
	// add slot
	// app.app_mix.slotArray[was] = 1;
	was.unbind( "click" );	
	app.app_mix.setTitle(lng[language].mix_add);	
	
	was.css({"opacity":app.app_mix.deactive}).transition({
		"opacity":app.app_mix.active
		},app.app_mix.duration, function () {
			$(this).find(".slot_change").click(function(){ 
				console.log("change snd " + was.attr("id"));
				app.app_mix.changeSlot (was)
			});
			$(this).find(".slot_delete").click(function(){ 
				app.app_mix.deleteSlot (was)
			});
			allow_clicks=true;
			app.app_mix.doTransition(1,was);
		});
	app.app_mix.flipSlot(was.find(".slot_change"),app.app_mix.duration2,0);
	app.app_mix.flipSlot(was.find(".slot_delete"),app.app_mix.duration2,app.app_mix.delay);
	app.app_mix.refreshButtons ();
}

app.app_mix.deleteSlot = function (was) {
	
	if(!allow_clicks) { return }
	allow_clicks=false;
	// delete slot
	// app.app_mix.slotArray[was] = 0;
	app.app_mix.setTitle(lng[language].mix_delete);
	var tmp_id = String($(was).attr("id")).split("mixer")[1];
	app.app_mix.slotArray[tmp_id] = null;
	
	was.css({"opacity":app.app_mix.active}).transition({
		"opacity":app.app_mix.deactive
		},app.app_mix.duration, function () {
			$(this).click(function(){ app.app_mix.addSlot($(this)); })
			$(this).find(".slot_change").unbind( "click" );
			$(this).find(".slot_delete").unbind( "click" );
			allow_clicks=true;
	});
	app.app_mix.refreshButtons();

}

app.app_mix.changeSlot = function (was) {
	
	if(!allow_clicks) { return }
	allow_clicks=false;
	// delete slot
	// app.app_mix.slotArray[was] = 0;
	app.app_mix.setTitle(lng[language].mix_change);
	
	app.app_mix.flipSlot(was.find(".slot_change"),app.app_mix.duration2,0);
	app.app_mix.flipSlot(was.find(".slot_delete"),app.app_mix.duration2,app.app_mix.delay);
	
	was.css({"opacity":app.app_mix.deactive}).transition({
		"opacity":app.app_mix.active
		},app.app_mix.duration, function () {
			allow_clicks=true;
			app.app_mix.doTransition(1,was);
	});
	app.app_mix.refreshButtons();
}

app.app_mix.blinkblock = function (obj) {
		//app.app_mix.duration2
		$(obj).css({"opacity":app.app_mix.deactive}).transition({
		"opacity":app.app_mix.active
		},app.app_mix.duration)
}

app.app_mix.checkScreen = function () {	

	console.log("farts : " + app.app_mix.slotArray)
	
	if (app.app_mix.slotArray[app.app_mix.currentSlot] !== null ) {
		$(".mix_row").removeClass("mix_activ");
		$("#mixfarts"+app.app_mix.slotArray[app.app_mix.currentSlot]).addClass("mix_activ");
		var tmp_height = (50 * app.app_mix.slotArray[app.app_mix.currentSlot]);
		console.log("HEIGHT + " + tmp_height);
		$("body").scrollTop( tmp_height );	
		$("#mix_screen_close").click(function () { app.app_mix.selectSound(app.app_mix.slotArray[app.app_mix.currentSlot]); })
		
	} else {
		$(".mix_row").removeClass("mix_activ");
		$("#mixfarts1").addClass("mix_activ");
		$("#mix_screen_close").click(function () { app.app_mix.selectSound(1); })
	}	
}

app.app_mix.playSound = function (obj) {	
	$(obj).removeAttr("style");
	$(obj).css({"opacity":0.1}).transition({"opacity":1},duration)
	//app.app_mix.flipSlot(obj);	
	$(".mix_row").removeClass("mix_activ");
	$(obj).parent().addClass("mix_activ");
	app.soundArray($(obj).attr("name"));
}

app.app_mix.selectSound = function (i) {
	app.app_mix.doTransition (false,"mix_screen2");
	app.app_mix.slotArray[app.app_mix.currentSlot] = i;
	$(".mix_row").removeClass("mix_activ");
	$("#mixfarts"+i).addClass("mix_activ");
	app.app_mix.refreshButtons();
}

app.app_mix.playfart = function () {
	
	app.app_mix.mixArray = new Array();
	app.app_mix.timeArray = new Array();
	app.app_mix.nameArray = new Array();
	app.app_mix.blockArray = new Array();
	for (var t=0; t <app.app_mix.slotArray.length; t++) {
		if (app.app_mix.slotArray[t] !== null) {		
			app.app_mix.mixArray.push(app.app_mix.soundObject[app.app_mix.slotArray[t]].mp3);
			app.app_mix.timeArray.push(app.app_mix.soundObject[app.app_mix.slotArray[t]].timer);
			app.app_mix.nameArray.push(app.app_mix.soundObject[app.app_mix.slotArray[t]].title);
			app.app_mix.blockArray.push(t);
		}
	}
	
	// nothing to play
	if(app.app_mix.mixArray<1) { app.app_mix.setTitle(lng[language].mix_nothing); return; }
	
	// play mix	
	console.log("play mix");
	console.log (app.app_mix.mixArray);
	app.app_mix.timer = 0;
	var timer = 0;
	for (var t=0; t<app.app_mix.mixArray.length; t++) {		
		setTimeout(app.app_mix.timeFunction,timer);		
		timer = Number(timer) + Number(app.app_mix.timeArray[t]) - app.delayForSounds;
	}
}
app.app_mix.timeFunction = function () {
	// just in case
	if(!$("#mix").html()) { return; }
	// stop sunds for transitions
	if(!allow_clicks) { return; }
	// set tile
	app.app_mix.setTitle(app.app_mix.nameArray[app.app_mix.timer]);	
	// blink block
	app.app_mix.blinkblock($("#mixer" + app.app_mix.blockArray[app.app_mix.timer]).find(".slot_change"));
	// play sound
	var mp3 = app.app_mix.mixArray[app.app_mix.timer];
	app.mixKey(mp3);	
	app.app_mix.timer++;	
}

app.app_mix.newfart = function () {
	
	if(!allow_clicks) { return; }
	
	var tmp_counter = 0;
	for (var t=0; t <app.app_mix.slotArray.length; t++) {
		if (app.app_mix.slotArray[t] !== null) {		
			tmp_counter++;
		}
	}
	// check if there is eny empty left
	if (app.localStorage.fartshd_mix.length >= app.app_mix.mixSlot) {
		app.alerts("confirm",lng[language].mix_alert4,lng[language].mix_alert8,lng[language].cancel,"");
		return;
	}
	
	// fresh start
	var tmp_button = new Array(lng[language].cancel,lng[language].yes);
	var tmp_actions = new Array("","app.app_mix.init(false)");
	app.alerts("confirm",lng[language].mix_alert4,lng[language].mix_alert5,tmp_button,tmp_actions);
}
app.app_mix.savefart = function () {
	
	if(!allow_clicks) { return; }
	
	var tmp_counter = 0;
	for (var t=0; t <app.app_mix.slotArray.length; t++) {
		if (app.app_mix.slotArray[t] !== null) {		
			tmp_counter++;
		}
	}
	console.log (tmp_counter)
	// nothing to save
	if(tmp_counter<1) { app.app_mix.setTitle(lng[language].mix_nosave); return; }
	// open save screen
	app.app_mix.doTransition(2,null);
	
	
}
app.app_mix.previewFart = function () {
	
if(!allow_clicks) { return; }
	
	var tmp_counter = 0;
	for (var t=0; t <app.app_mix.slotArray.length; t++) {
		if (app.app_mix.slotArray[t] !== null) {		
			tmp_counter++;
		}
	}
	console.log (tmp_counter)
	// nothing to share
	if(tmp_counter<1) { 
		app.app_mix.setTitle(lng[language].mix_noshare); 
		return; 
	}
	
	// not saved yet
	var tmp_length = app.localStorage.fartshd_mix.length;
	var tmp_location = app.localStorage.get_mix(app.app_mix.randomID);
	if (tmp_location >= tmp_length) {
		app.app_mix.setTitle(lng[language].mix_savefirst); 
		return; 	
	}
	// allowed
	
	var tmp_location = app.localStorage.get_mix(app.app_mix.randomID);
	var tmp_share = app.shareLink + app.localStorage.fartshd_mix[tmp_location];
	window.open(tmp_share, "_blank");
	
}
app.app_mix.sharefart = function () {
	
	if(!allow_clicks) { return; }
	
	var tmp_counter = 0;
	for (var t=0; t <app.app_mix.slotArray.length; t++) {
		if (app.app_mix.slotArray[t] !== null) {		
			tmp_counter++;
		}
	}
	console.log (tmp_counter)
	// nothing to share
	if(tmp_counter<1) { 
		app.app_mix.setTitle(lng[language].mix_noshare); 
		return; 
	}
	
	// not saved yet
	var tmp_length = app.localStorage.fartshd_mix.length;
	var tmp_location = app.localStorage.get_mix(app.app_mix.randomID);
	if (tmp_location >= tmp_length) {
		app.app_mix.setTitle(lng[language].mix_savefirst); 
		return; 	
	}

	// open a share screen
	// this is screen for sharing
	// ********************************
	// app.app_mix.doTransition(3,null);
	// ********************************
	
	
	// this is true sharing
	// var tmp_key = app.localStorage.read_key(app.localStorage.fartshd_mix[tmp_location]);
	var tmp_link = app.shareLink + "" + app.localStorage.fartshd_mix[tmp_location];
	// app.shareLink
	try {
		// true sharing	
		window.plugins.socialsharing.share(app.shareTitle, null, null, tmp_link)	
	} catch (e) {
		// web sharing
		app.app_mix.doTransition(3,null);	
	}
}