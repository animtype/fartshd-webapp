// copyright Dr.Peter

app.app_settings = function(soundObject) {
	app.app_settings.init();
	//drawLogs("FART SOUND")
}

app.app_settings.refresh = function () {
	
	app.getBackgroundStyle();

}

app.app_settings.init = function () {
	// app holder
	// init variables
	$("#settings").remove();
	allow_clicks=false;
	app.app_settings.del = false;
	// create an app
	$("#app_holder").css({"opacity":0});
	$("#app_holder").append('<div id="settings" class="app gpuAcc"><div id="settings_holder" class="gpuAcc"></div></div>');
	
	$("#settings_holder").append("<button onclick='app.app_settings.showUpdate()'>"+lng[language].update_title+"</button>");
	
	// skin
	var tmp_obj = new Array(null);
	tmp_obj.push(lng[language].sett_skin1);
	tmp_obj.push(lng[language].sett_skin2);
	tmp_obj.push(lng[language].sett_skin3);
	$("#settings_holder").append(app.app_settings.draw_skin(tmp_obj));
	
	// settings
	var tmp_obj = new Array();
	tmp_obj.push(lng[language].sett_settings0);
	tmp_obj.push(lng[language].sett_settings1);
	tmp_obj.push(lng[language].sett_settings2);
	tmp_obj.push(lng[language].sett_settings3);
	$("#settings_holder").append(app.app_settings.draw_checkbox(tmp_obj));
	
	var tmp_obj = new Object();
	tmp_obj.name = "favorites";
	tmp_obj.title = lng[language].sett_title1;
	tmp_obj.array = app.localStorage.fartshd_favorites.length;
	tmp_obj.button = lng[language].sett_title2;	
	$("#settings_holder").append(app.app_settings.draw_settings(tmp_obj));

	var tmp_obj = new Object();
	tmp_obj.name = "sweeper";
	tmp_obj.title = lng[language].sett_title3;
	tmp_obj.array = app.localStorage.fartshd_sweeper[0];
	tmp_obj.button = lng[language].sett_title4;
	$("#settings_holder").append(app.app_settings.draw_settings(tmp_obj));
	
	var tmp_obj = new Object();
	tmp_obj.name = "memory";
	tmp_obj.title = lng[language].sett_title3;
	tmp_obj.array = app.localStorage.fartshd_memory[0];
	tmp_obj.button = lng[language].sett_title4;
	$("#settings_holder").append(app.app_settings.draw_settings(tmp_obj));
	
	var tmp_obj = new Object();
	tmp_obj.name = "hidefart";
	tmp_obj.title = lng[language].sett_title5;
	tmp_obj.array = app.localStorage.fartshd_hidefarts[0];
	tmp_obj.button = lng[language].sett_title6;
	$("#settings_holder").append(app.app_settings.draw_settings(tmp_obj));
	
	if (app.platform != "winphone") {
		var tmp_obj = new Object();
		tmp_obj.name = "fartsays";
		tmp_obj.title = lng[language].sett_title5;
		tmp_obj.array = app.localStorage.fartshd_fartsay[0];
		tmp_obj.button = lng[language].sett_title6;
		$("#settings_holder").append(app.app_settings.draw_settings(tmp_obj));
	}
	
	var tmp_obj = new Object();
	tmp_obj.name = "puzzle";
	tmp_obj.title = new Array (lng[language].mem_best+" ",lng[language].mem_best+" ",lng[language].mem_best+" ");
	tmp_obj.array = new Array (app.localStorage.fartshd_puzzle[0],app.localStorage.fartshd_puzzle[1],app.localStorage.fartshd_puzzle[2]);
	tmp_obj.button = new Array (lng[language].puzzle_grid3,lng[language].puzzle_grid4,lng[language].puzzle_grid5);
	$("#settings_holder").append(app.app_settings.draw_settings(tmp_obj,true));


	
	
	/* DEBUG ONLY ********************* */
	/* ******************************** */
	if(isDebug) {
		var tmp_snd1 = 'app.soundArray(10001)';
		var tmp_snd2 = "app.soundPlay('explosion')";
		var tmp_html = '';
		tmp_html += '';	
		tmp_html += 'app.testing : ' + app.testing + '<br />';
		tmp_html += 'app.platform : ' + app.platform + '<br />';
		tmp_html += 'app.soundFolder : ' + app.soundFolder + '<br />';
		tmp_html += 'app.highPlatform : ' + app.highPlatform + '<br />';
		tmp_html += 'app.topPadding : ' + app.topPadding + '<br />';
		tmp_html += 'Width : ' + $(window).width() + '<br />';
		tmp_html += 'Height : ' + $(window).height() + '<br />';
		tmp_html += 'window.location : ' + window.location + '<br />';
		tmp_html += '<hr />';
		tmp_html += 'set sound folder to : <div onclick="app.app_settings.changefolder(1);">+ blank</div><br />';
		tmp_html += 'set sound folder to : <div onclick="app.app_settings.changefolder(2);">+ /app/www/</div><br />';
		tmp_html += 'set sound folder to : <div onclick="app.app_settings.changefolder(3);">+ app/www/</div><br />';
		tmp_html += 'set sound folder to : <div onclick="app.app_settings.changefolder(4);">+ /www/</div><br />';
		tmp_html += 'set sound folder to : <div onclick="app.app_settings.changefolder(5);">+ www/</div><br />';
		tmp_html += 'set sound folder to : <div onclick="app.app_settings.changefolder(6);">+ /android_asset/www/</div><br />';
		tmp_html += 'set sound folder to : <div onclick="app.app_settings.changefolder(7);">+ android_asset/www/</div><br />';
		tmp_html += '<hr />';
		tmp_html += 'test sound 1 <div onclick="'+tmp_snd1+'">[ play 1 ]</div><br />';
		tmp_html += 'test sound 2 <div onclick="'+tmp_snd2+'">[ play 2 ]</div><br />';
		tmp_html += ''+ '<br />';
		tmp_html += '';		
		$("#settings_holder").append(tmp_html);
		app.app_settings.changefolder = function (nm) {
			switch (nm) {
				case 1:
					app.soundFolder = ""
					break;
				case 2:
					app.soundFolder = "/app/www/"
					break;
				case 3:
					app.soundFolder = "app/www/"
					break;
				case 4:
					app.soundFolder = "/www/"
					break;
				case 5:
					app.soundFolder = "www/"
					break;
				case 6:
					app.soundFolder = "/android_asset/www/"
					break;
				case 7:
					app.soundFolder = "android_asset/www/"
					break;
			}
			app.app_settings.init();
		}
	}
	/* ******************************** */
	/* DEBUG ONLY ********************* */
	

	$("#app_holder").css({"opacity":0}).transition({"opacity":1},duration*2, function () {
		allow_clicks=true;		
	})
	
	app.app_settings.refresh();

}

// get right object
app.app_settings.get_settings = function (obj) {
	for (var t in menus) {
		if (menus[t].app == obj) {
			return menus[t];	
		}		
	}	
}

// draw skin
app.app_settings.draw_skin = function (tmp_obj) {

	var tmp_html = "";
	tmp_html += '<table class="settings rounded gpuAcc">';
	var tmp_sett = app.localStorage.fartshd_skin[0];
	for (var s=1; s<4;s++){		
		var tmp_checked = tmp_sett==s?"icon_yes":"icon_no";
		
		var tmp_click = "app.app_settings.confirm_skin("+s+")";

		tmp_html += '<tr>';
		tmp_html += '<td width="60" class="gpuAcc" align="left" valign="middle">';
		tmp_html += '<div class="smallbutton" onclick="'+tmp_click+'"><div class="gpuAcc '+tmp_checked+'"></div></div></td>';
		tmp_html += '<td class="gpuAcc" align="left" valign="middle">'+tmp_obj[s]+'</td>';
		tmp_html += '</tr>';
	}	
	tmp_html += '</table>';
	return tmp_html;
}

// draw checkbox
app.app_settings.draw_checkbox = function (tmp_obj) {

	var tmp_html = "";
	tmp_html += '<table class="settings rounded gpuAcc">';
	for (var s=0; s<app.localStorage.fartshd_settings.length;s++){
		var tmp_sett = app.localStorage.fartshd_settings[s];
		var tmp_checked = tmp_sett==1?"icon_yes":"icon_no";
		var tmp_click = "app.app_settings.confirm_to_toggle('settings"+s+"')";
		tmp_html += '<tr>';
		tmp_html += '<td width="60" class="gpuAcc" align="left" valign="middle">';
		tmp_html += '<div class="smallbutton" onclick="'+tmp_click+'"><div class="gpuAcc '+tmp_checked+'"></div></div></td>';
		tmp_html += '<td class="gpuAcc" align="left" valign="middle">'+tmp_obj[s]+'</td>';
		tmp_html += '</tr>';
	}	
	tmp_html += '</table>';
	return tmp_html;
}


// draw settings
app.app_settings.draw_settings = function (tmp_obj,more_than_once) {
	var tmp_menu = app.app_settings.get_settings(tmp_obj.name);
	var tmp_html = "";
	
	tmp_html += '<table class="settings rounded gpuAcc">';

	tmp_html += '<tr>';
	tmp_html += '<td width="60" class="gpuAcc" align="left" valign="middle">';
	tmp_html += '<div class="smallbutton '+tmp_menu.style+'"><div class="icon gpuAcc"></div></div></td>';
	tmp_html += '<td class="settings_title gpuAcc" align="left" valign="middle">'+tmp_menu.name+'</td>';
	tmp_html += '</tr>';
		
	if (more_than_once) {
		// more then one
		for (var t=0; t < tmp_obj.array.length;  t++) {
			var tmp_click = "app.app_settings.confirm_to_delete('"+tmp_obj.name+t+"')";
			tmp_html += '<tr>';
			tmp_html += '<td width="60" class="gpuAcc" align="left" valign="middle">';
			tmp_html += '<div class="smallbutton" onclick="'+tmp_click+'"><div class="icon_trash gpuAcc"></div></div></td>';
			tmp_html += '<td class="gpuAcc" align="left" valign="middle">'+tmp_obj.button[t]+'. ' + tmp_obj.title[t]+tmp_obj.array[t] + '</td>';
			tmp_html += '</tr>';	
		}
	} else {
		// only one
		var tmp_click = "app.app_settings.confirm_to_delete('"+tmp_obj.name+"')";
		tmp_html += '<tr>';
		tmp_html += '<td width="60" class="gpuAcc" align="left" valign="middle">';
		tmp_html += '<div class="smallbutton" onclick="'+tmp_click+'"><div class="icon_trash gpuAcc"></div></div></td>';
		tmp_html += '<td class="gpuAcc" align="left" valign="middle">'+tmp_obj.button+'<br />' + tmp_obj.title+tmp_obj.array + '</td>';
		tmp_html += '</tr>';
	}
	
	tmp_html += '</table>';	
	return tmp_html;
}

// confirm delete
app.app_settings.confirm_to_delete = function (tmp_name) {
	//app.soundClick();
	app.app_list.add_fart = false;
	app.app_settings.del = tmp_name;
	var tmp_buttons = new Array(lng[language].no, lng[language].yes);
	var tmp_actions = new Array("", "app.app_settings.changing()");
	app.alerts("confirm",lng[language].sett_alert1, lng[language].sett_alert2, tmp_buttons,tmp_actions)
	
}
// confirm skin
app.app_settings.confirm_skin = function (was) {
	
	if (app.localStorage.fartshd_skin[0] == was) { return; }
	
	// gaplugin
	app.gaplugin.change_skin (app.skinTrueNames[was]);
	
	//app.soundClick();
	app.soundClick();
	app.app_settings.del = "skin"+was;
	app.app_settings.changing ();	
}
// confirm checkbox
app.app_settings.confirm_to_toggle = function (tmp_name) {
	//app.soundClick();
	app.soundClick();
	app.app_settings.del = tmp_name;
	app.app_settings.changing ();	
}
// changing
app.app_settings.changing = function () {
	
	if (!allow_clicks) { return }
	
	switch(app.app_settings.del) {

	case "skin1":
		app.app_settings.changeSkin(1);
		break;
	case "skin2":
		app.app_settings.changeSkin(2);
		break;
	case "skin3":
		app.app_settings.changeSkin(3);
		break;
	case "settings0":
		app.localStorage.change_settings(0,"toggle");
		break;
	case "settings1":
		app.localStorage.change_settings(1,"toggle");
		break;
	case "settings2":		
		app.localStorage.change_settings(2,"toggle");
		break;		
	case "favorites":
		app.localStorage.clear_favorites();
		break;
	case "sweeper":
		app.localStorage.clear_sweeper();	
		break;
	case "memory":
		app.localStorage.clear_memory();
		break;
	case "hidefart":
		app.localStorage.clear_hidefarts();	
		break;
	case "fartsays":
		app.localStorage.clear_say();	
		break;	
	case "puzzle0":
		app.localStorage.change_puzzle(0,0);
		break;	
	case "puzzle1":
		app.localStorage.change_puzzle(1,0);	
		break;	
	case "puzzle2":
		app.localStorage.change_puzzle(2,0);	
		break;	
	}
	app.app_settings.init();
}

// updated version
app.app_settings.showUpdate = function() {
	
	var tmp_title = lng[language].update_title;
	var tmp_text = lng[language].update_news1+lng[language].update_news2;
	var tmp_buttons = "OK";
	var tmp_actions = "void(0)";
	app.alerts("confirm",tmp_title, tmp_text, tmp_buttons,tmp_actions);	

}

app.app_settings.changeSkin = function (was) {
	
	// 0 - default
	// 1 - iOS
	// 2 - metro
	app.localStorage.change_skin(was);
	app.changeSkin (true);	
}
app.app_settings.run = function () {
	$("head").append('<link href="css/farts_colors.css" type="text/css" rel="stylesheet">')	
}