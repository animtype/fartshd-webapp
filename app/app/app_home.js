// copyright Dr.Peter

// home buttons
app.home = function () {
	allow_clicks = false;
	app.home.init();
	//drawLogs("HOME")		
}
app.home.refresh = function () {
	app.home.width = calcBlocks()
	$(".block").css({
		"margin": margins/2,
		"width": app.home.width,	
		"height": app.home.width
	});
}
var hashDetection = false;
app.changeHash = function (selected_page) {
	hashDetection = false;
	window.location.hash = menus[selected_page].name;
	
}
$(window).on('hashchange',function(){ 
	if (hashDetection) {		
		// same page
		if (selected_page == 0) { return; }
		// not allow to transit
		if (doingTransition) { return; }
		// clicks not allowed
		if (!allow_clicks) { return; }
		// alert is oppened
		if (alertOpen) { return; }
		console.log ("allowed hash change")
		// I guess, a back button is being triggerd
		app.makeTransition(0);
	} else {
		// allow hash detection
		hashDetection = true;	
	}
});
app.home.init = function () {
	app.home.width = 0;
	app.changeHash(0);
	// append inner div
	$("#app_home").remove();
	$("#home_menu").append('<div id="app_home" class="app gpuAcc"></div>');
	// draw blocks

	$("#app_home").css({"opacity":0}).transition({"opacity":1},500,function(){
		allow_clicks=true;		
	});
	for (var i=1; i<menus.length; i++) {
		// draw blocks
		app.home.width = calcBlocks();		
		$("#app_home").append('<div id="block' + i + '" class="block gradient gpuAcc"><div class="icon gpuAcc"></div><div class="title gpuAcc">' + menus[i].name + '</div></div>');
		$("#block" + i).stop(true,false).css({"opacity":0.01});
		$("#block" + i).attr({"name":i});
		$("#block" + i).css({			
			"display": "block",
			"margin": margins/2,
			"width": app.home.width,	
			"height": app.home.width,
			"opacity":0.01,
			perspective: 900, 
			rotateY: 35
			}).delay(800+(pause*i)).transition({
				opacity: 1,
				perspective: 900,
				rotateY: 0
			},duration/2, function () {
				
			})
		$("#block" + i).click(function() {
			// click menu
			if(allow_clicks) {			
				app.makeTransition(Number($(this).attr("name")));
			}
		});
		$("#block" + i).addClass( "" + menus[i].style);
	}
	$("#app_home").append('<div style="clear: both"></div><p style="height: 10px;">&nbsp;</p>');
	if (app.platform == "desktop") { app.home.refresh (); }	
}

app.scrollDownScreen = function (appH) {
	
	if (app.localStorage.fartshd_settings[0] != 1) { return }
	
	var tmp_head = 90;
	var tmp_app = Number(appH) + tmp_head;
	var tmp_screen =  $(window).height(); 
	console.log ("app : " + tmp_app + "; win : " + tmp_screen + "; y : " + $(window).scrollTop());
	
	// go scroll down
	if (tmp_app > tmp_screen) {
		console.log ("scroll down")
		var target = tmp_head;
		var durr = duration || 16;
		var scrollTopProxy = { value: $(window).scrollTop() };
		if (scrollTopProxy.value != target) {
			$(scrollTopProxy).animate(
				{ value: target }, 
				{ duration: durr, step: function (stepValue) {
					var rounded = Math.round(stepValue);
					$(window).scrollTop(rounded);
				}
			});
		}
	}	
}
app.getMenuTitle =  function (obj) {
	for (var t in menus) {
		if (menus[t].app == obj) {
			return menus[t];	
		}		
	}
}

// SKIN MECHANISM
app.skinTrueNames = new Array ("default","android","ios","metro"); 
app.skinFiles = new Array ("css/farts_colors_metro.css","css/farts_colors.css","css/farts_colors_ios.css","css/farts_colors_metro.css"); 
app.skinFile = app.skinFiles[0];
app.oldSkinFile = "";
app.getSkin = function (num) {
	var skinss = app.skinFiles[0];
	switch (Number(num)) {
		case 0:	
			skinss = app.skinFiles[0];
			break;
		case 1:	
			skinss = app.skinFiles[1];
			break;
		case 2:	
			skinss = app.skinFiles[2];
			break;
		case 3:	
			skinss = app.skinFiles[3];
			break;
		default:	
			skinss = app.skinFiles[0];
	}
	return 	skinss;
}
app.changeSkin = function(doDelay) {
	// 0 - default
	// 1 - Android
	// 2 - ios
	// 3 - windows 8
	if (app.localStorage.fartshd_skin[0] == 0) {
		// change default	
		if (app.platform == "android") { app.localStorage.change_skin(1); }
		if (app.platform == "ios") { app.localStorage.change_skin(2); }
		if (app.platform == "winphone") { app.localStorage.change_skin(3); }
	}
	console.log ("skin : " +app.localStorage.fartshd_skin[0]);
	if (app.localStorage.fartshd_skin[0] == 1) { app.fileExtension = ""; }
	if (app.localStorage.fartshd_skin[0] == 2) { app.fileExtension = "ios_"; }
	if (app.localStorage.fartshd_skin[0] == 3) { app.fileExtension = "metro_"; }
	
	app.skinFile = app.getSkin(app.localStorage.fartshd_skin[0]);

	console.log (app.skinFile);
	// check previous version
	if ( app.skinFile != app.oldSkinFile) {
		// do change	
		console.log("applaying style")
		if (doDelay) {			
			$('link[href="'+app.oldSkinFile+'"]').remove();
			$("head").append('<link href="'+app.skinFile+'" type="text/css" rel="stylesheet">');
			// not ok!!!
			//$("body").css({"opacity":0}).delay(500).transition({"opacity":1},500, function () {});		
		} else {
			$('link[href="'+app.oldSkinFile+'"]').remove();
			$("head").append('<link href="'+app.skinFile+'" type="text/css" rel="stylesheet">');
		}
		app.oldSkinFile = app.skinFile;
	}	
}
app.getBackgroundStyle = function() {
	if (!menus[selected_page].bg) {	return; }
	// check orientaiton first
	if ($(window).width() > $(window).height()) {
		// landscape	
		if (app.backgroundStyle == "landscape") { return; }
		var tmp_bg = "bg_landscape.png"
		app.backgroundStyle = "landscape";
	} else {
		// portrait
		if (app.backgroundStyle == "portrait") { return; }
		var tmp_bg = "bg_portrait.png";
		app.backgroundStyle = "portrait";
	}
	//console.log ("BACKGROUND : " + tmp_bg)
	//drawLogs(tmp_bg)	
	$("#main_body").css({
		"background-image": "url(css/bg/"+app.fileExtension + tmp_bg + ")",
		"background-position": "0px 0px",
		"background-repeat": "no-repeat",
		"background-size": "contain",		
	});		
}
app.releaseMediaObject = function(obj) {
	if (!app.testing) {
		if (app.mediaObject) {
			console.log("delete media")
				obj.stop();
				obj.release();
				obj = null;	
		} else {
			console.log("delete howler")
			try {
				obj.stop();
				//obj.unload();	
				obj = null;	
			} catch(e) {}
		}
	} else {
		delete obj
		obj = null;
	}
}
app.releaseSoundMemory = function() {
	/*
	console.log(app.soundmedia_farts)	
	console.log(app.soundmedia_sound)	
	console.log(app.soundmedia_press)	
	console.log(app.soundmedia_piano1)	
	console.log(app.soundmedia_piano2)
	console.log("******************");
	*/
	if(app.soundmedia_farts) { app.releaseMediaObject(app.soundmedia_farts); }
	if(app.soundmedia_sound) { app.releaseMediaObject(app.soundmedia_sound); }
	if(app.soundmedia_press) { app.releaseMediaObject(app.soundmedia_press); }
	if(app.soundmedia_piano1) { app.releaseMediaObject(app.soundmedia_piano1); }
	if(app.soundmedia_piano2) { app.releaseMediaObject(app.soundmedia_piano2); }
	if(app.soundmedia_mix1) { app.releaseMediaObject(app.soundmedia_mix1); }
	if(app.soundmedia_mix2) { app.releaseMediaObject(app.soundmedia_mix2); }
}
app.shaking = false;
app.releaseWatcher = function () {
	// stop watchers
	if (app.shaking) { shake.stopWatch(); app.shaking = false; }	
}

// make transition
app.makeTransition = function (was) {
	// close alerts
	app.toggleClose(false);
	// same page
	if (selected_page == was) { return; }
	// not allow to transit
	if (doingTransition) { return; }
	// allow clicks	
	allow_clicks = false;
	// new page
	selected_page = was;
	// $(window).scrollTop(0);
	app.releaseSoundMemory();
	// stop watchers
	app.releaseWatcher();
	// make transition
	doingTransition = true;
	$(".app").css({"opacity":1}).transition({"opacity":0.01},duration/2,function(){
		// remove APP
		$(".app").remove();
		// make transition
		var tmp_w = $("#main_body").width();
		var tmp_h = $("#main_body").height();
		$("#transitions").removeClass();
		$("#transitions").addClass( "" + menus[selected_page].style );
		$("#transitions").addClass( "gpuAcc" );
		$("#transitions").css({
			"opacity":0.01,
			"width":tmp_w,
			"height":tmp_h,
			"left":0,
			"top":0,
			"display":"block",
			"perspective": 900, 
			"rotateY": 90,
		}).delay(transitiondelay).transition({
			"opacity":1,
			"perspective": 900, 
			"rotateY": 0
		},duration,function(){
			$("#main_body").removeClass();
			// attach new class
			$("#main_body").addClass( "" + menus[selected_page].style );
			$("#main_body").addClass( "gpuAcc" );
			
			if (selected_page == 0) {
				// reset body
				$("#main_body").css({"background-image":"none"});
			} else {
				// draw body
				app.backgroundStyle = -1;
				app.getBackgroundStyle();
			}
			
			app.changeHash (selected_page);
						
			/*
			$(this).transition({"opacity":0},duration/2,function() {
				$(this).css({"display":"none","opacity":0});
				app.runApp();	
			})
			*/
			doingTransition = false;
			allow_clicks = true;
			$(this).css({"display":"none","opacity":0});
			app.runApp();
			
		});
	});
}
app.toggleClose = function(was) {
	if(was) {
		$("#header").css({"opacity":0,"display":"block"}).transition({
			"opacity":1	
		},500);
		$("#app_close").css({
				"perspective": 200, 
				"rotateY": 60			
			}).transition({
				"perspective": 200, 
				"rotateY": 0
			},duration)
		$("#app_close").click(function(){
			
			// do transition
			app.makeTransition(0);	
		});
		$("#header_name").html(menus[selected_page].name);
	} else {
		$("#header_name").html("");
		$("#header").transition({
			"opacity":0	
		},500,function(){
			if(allow_clicks) {				
				$(this).css({"opacity":0,"display":"none"});
			}
		});
		$("#app_close").unbind( "click" );	
	}
}
/* ****************************** */
/* ALERT APPS */
/* ****************************** */
app.alerts = function (type,title,text,button,action) {
	// open alert
	// not allow doring transition
	if(doingTransition) { return; }
	// check app size
	alertOpen = true;
	var tmp_height = $(".app").height()>$(window).height()?$(".app").height():$(window).height();
	$(".txt").html("");
	$("#darken").css({
		"width": $(".app").width(),
		"height": tmp_height,
		"opacity":0, 
		"display":"block"		
	}).transition({
		"opacity":1				
	},duration).click(function(){
		return;	
	})
	// make text		
	$(".txt").append("<h1>"+title+"</h1>");
	$(".txt").append("<p>"+text+"</p>");
	if(type=="alert") {
		$(".txt").append("<button onclick='app.makeTransition(0); app.alertsClose(); app.soundClick();'>"+lng[language].backto+"</button>");
	}
	if(type=="chooser") {
		$(".txt").append("<button onclick='app.makeTransition(0); app.alertsClose(); app.soundClick();'>"+lng[language].backto+"</button><br />");
	}
	if(button) {
		if(typeof(button) == "string") {
			// one button only
			$(".txt").append("<button onclick='"+action+"; app.alertsClose(); app.soundClick();'>"+button+"</button>");
		} else {
			// array
			for (var b in button) {
				$(".txt").append("<button onclick='"+action[b]+"; app.alertsClose(); app.soundClick();'>"+button[b]+"</button>");	
			}	
		}
	}
	$("#alert button").attr({"disabled":true})
	$("#alert").css({
		"opacity":0.01, 
		"display":"block"
	}).transition({
		"opacity":1
	},duration, function () {
		$("#alert button").removeAttr("disabled");	
	});
	$("#alert").center();
	$(".txt").css({
		"opacity":0.01, 
		"display":"block"
	}).transition({
		"opacity":1
	},duration);	
		
}
app.alertsClose = function (){	
	$("#darken").stop(true,false)
	$("#darken").transition({"opacity":0},duration/5,function() {
		$(this).unbind( "click" );
		$(this).css({"display":"none"});		
	});
	$("#alert").stop(true,false)
	$("#alert").transition({"opacity":0},duration/5,function() {
		$(".txt").html("");
		$(this).css({"display":"none"});
		alertOpen = false;		
	})
}
app.countdownClose = function (){	
	$("#countdown").html('');	
	$("#countdown").stop(true,false)
	$("#countdown").transition({"opacity":0},duration/5,function() {
		$(this).css({"display":"none"});			
	});
}
app.coutdown = function (title,str,end,akc,marg) {
	//("Start the Game","Go",5,0,app.akcija(),margin);
	alertOpen = true;	
	app.coutdown.margin = marg?marg+"px":"150px";
	app.coutdown.goes = false;
	app.coutdown.tit = title;
	app.coutdown.str = str;
	app.coutdown.end = end;
	app.coutdown.akc = akc;
	$("#countdown").stop(true,false)
	$("#countdown").css({
		"opacity":0, 
		"display":"block"		
	}).transition({
		"opacity":1				
	},duration,function() {
		$("#countdown").html('<span style="margin-top: '+app.coutdown.margin+'">' + app.coutdown.str + '</span>');
		//$("#countdown").center();
		app.coutdown.start();	
	})
	

}
app.coutdown.start = function () {
	alertOpen = true;
	var tmp_t = app.coutdown.str;	
	if (app.coutdown.str <= app.coutdown.end) {
		tmp_t = app.coutdown.tit;
		app.coutdown.goes = true;	
	}
	$("#countdown").html('<span class="gpuAcc" style="margin-top: '+app.coutdown.margin+'">' + tmp_t + '<br><small>&nbsp;</small></span>');
	$("#countdown span").css({
		"display":"block",
		"opacity":0,
		"scale":0.5	
	}).transition({
		"opacity":1,
		"scale":1		
	},400).transition({
		"opacity":0,
		"scale":2		
	},500,function () {
		if (app.coutdown.goes) {
			// end countdown
			alertOpen = false;
			app.coutdown.akc();
			app.countdownClose();
			return;	
		} else {
			// keep counting 
			app.coutdown.str--;
			app.coutdown.start();
		}
	});	
}
app.getSoundID = function (id) {
	// get sound from male, female, old
	var tmp_obj = app.getTrueSoundID(id)
	// delete if previously inserted	
	var tmp_index = false;
	for (var t in app.localStorage.fartshd_favorites) {
		if (app.localStorage.fartshd_favorites[t].mp3 == id) {
			tmp_index = t;		
		}		
	}
	if (tmp_index) {
		app.localStorage.fartshd_favorites.splice(tmp_index,1);
	}
	// return object
	return tmp_obj
	
}
app.getTrueSoundID = function (id) {
	// get sound from male, female, old
	var tmp_obj = false;
	for (var t in sounds.male) {
		if (sounds.male[t].mp3 == id) {
			tmp_obj = sounds.male[t];
		}
	}
	for (var t in sounds.female) {
		if (sounds.female[t].mp3 == id) {
			tmp_obj = sounds.female[t];
		}
	}
	for (var t in sounds.old) {
		if (sounds.old[t].mp3 == id) {
			tmp_obj = sounds.old[t];
		}
	}
	// return object
	return tmp_obj
	
}

/* ****************************** */
/* Draw Selector */
app.drawSelector = function (funct,favio) {
	// init
	app.currentSelector = -1;
	app.previousSelector = -1;
	app.functionSelector = funct?funct:"";
	var tmp_obj = new Array ();
	var tmp_html = '';
	tmp_obj.push(app.getMenuTitle("male"));
	tmp_obj.push(app.getMenuTitle("female"));
	tmp_obj.push(app.getMenuTitle("old"));
	if (favio) {
		tmp_obj.push(app.getMenuTitle("favorites"));
	}
	var tmp_width = Math.floor(100/tmp_obj.length);
	tmp_html += '<table class="flipicon gpuAcc" align="center">';
	tmp_html += '<tr>';
	for (var t=0; t<tmp_obj.length; t++) {
		tmp_html += '<td width="'+tmp_width+'%" height="50" class="gpuAcc" align="left" valign="middle">';
		tmp_html += '<div onclick="app.flipSelector('+t+')" id="flipicon'+t+'" class="flipicon '+tmp_obj[t].style+'"><div class="icon gpuAcc"></div></div>';
		tmp_html += '</td>';	
	}
	tmp_html += '</tr>';
	tmp_html += '</table>';
	
	return tmp_html;
}
app.flipSelector = function (was) {
	
	if (was == app.previousSelector) { return; }	
	if (!allow_clicks) { return; }	
	allow_clicks=false;
	
	// flip on
	var eval_function = app.functionSelector + "("+was+")";
	eval(eval_function);
	$("#flipicon" + was).css({"opacity":0.3,"perspective":500,"rotateY":70}).transition({"opacity":1,"perspective":500,"rotateY":0},duration, function () {
			allow_clicks=true;		
	});
	
	// flip out
	if (app.previousSelector >= 0) {
		$("#flipicon" + app.previousSelector).css({"opacity":1}).transition({"opacity":0.3},duration);
	}
	app.previousSelector = was;
	
}


/* ****************************** */
/* RUN APPS */
/* ****************************** */
app.runApp = function() {
	// google app
	app.gaplugin.visits (menus[selected_page].app);

	
	// run app !!!	
	switch(menus[selected_page].app) {		
		case "editor":
			app.toggleClose(true);
			app.app_category(sounds.editors);
		break;
		case "favorites":
			app.toggleClose(true);
			app.app_category(app.localStorage.fartshd_favorites, true);
		break;
		case "male":
			app.toggleClose(true);
			app.app_category(sounds.male);
		break;
		case "female":
			app.toggleClose(true);
			app.app_category(sounds.female);
		break;
		case "old":
			app.toggleClose(true);
			app.app_category(sounds.old);
		break;
		case "list":
			app.toggleClose(true);
			app.app_list(sounds.male,sounds.female,sounds.old);
		break;		
		case "counter":
			app.toggleClose(true);
			app.app_counter(sounds.male,sounds.female,sounds.old,app.localStorage.fartshd_favorites);
		break;
		case "memory":
			app.toggleClose(true);
			app.app_memory(sounds.memory);
		break;
		case "fartsays":
			app.toggleClose(true);
			app.app_fartsays(sounds.says);
		break;
		case "sweeper":
			app.toggleClose(true);
			app.app_sweeper(sounds.memory);
		break;
		case "hidefart":
			app.toggleClose(true);
			app.app_hidefart();
		break;
		case "piano":
			app.toggleClose(true);
			app.app_piano();
		break;
		case "bird":
			app.toggleClose(true);
			app.app_bird();
		break;
		case "puzzle":
			app.toggleClose(true);
			app.app_puzzle(sounds.memory);
		break;
		case "shake":
			app.toggleClose(true);
			app.app_shake(sounds.male,sounds.female,sounds.old,app.localStorage.fartshd_favorites);
		break;
		case "mix":
			app.toggleClose(true);
			app.app_mix(sounds.mix);
		break;
		case "info":
			app.toggleClose(true);
			app.app_info();
		break;
		case "settings":
			app.toggleClose(true);
			app.app_settings();
		break;
		default:
			app.home();
	}
}
/* ****************************** */
/* REFRESH APPS */
/* ****************************** */
app.refreshOthers = function () {
	switch(menus[selected_page].app) {		
		case "editor":
			app.app_category.refresh();
		break;
		case "favorites":
			app.app_category.refresh();
		break;
		case "male":
			app.app_category.refresh();
		break;
		case "female":
			app.app_category.refresh();
		break;
		case "old":
			app.app_category.refresh();
		break;
		case "list":
			app.app_list.refresh();
		break;
		case "counter":
			app.app_counter.refresh();
		break;
		case "memory":
			app.app_memory.refresh();
		break;
		case "fartsays":
			app.app_fartsays.refresh();
		break;
		case "sweeper":
			app.app_sweeper.refresh();
		break;
		case "hidefart":
			app.app_hidefart.refresh();
		break;
		case "piano":
			app.app_piano.refresh();
		break;
		case "bird":
			app.app_bird.refresh();
		break;
		case "puzzle":
			app.app_puzzle.refresh();
		break;
		case "shake":
			app.app_shake.refresh();
		break;
		case "mix":
			app.app_mix.refresh();
		break;
		case "settings":
			app.app_settings.refresh();
		break;
		case "info":
			app.app_info.refresh();
		break;
	}
}
/* ****************************** */
/* CLOSE APP */
/* ****************************** */
app.closeApp = function () {
	try {
		if (navigator && navigator.app) {
				 navigator.app.exitApp();
		} else {
			if (navigator && navigator.device) {
				navigator.device.exitApp();
			}
		}
	} catch (e) {}
}