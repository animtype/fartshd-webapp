// copyright Dr.Peter

// do transitions to 
// different screens
app.app_mix.doTransition = function (reveal,was) {
	
	app.app_mix.allowBack = false;
	
	if(!allow_clicks) { return }
	allow_clicks=false;
	var tmp_width = parseInt($(window).width());
	
	// SHOW SOUNDS
	if (reveal == 1) {
		// which block
		var tmp_id = String($(was).attr("id")).split("mixer")[1];
		app.app_mix.currentSlot = tmp_id;
		$(".mix_row").removeClass("mix_activ");		
		// REVEAL screen
		$("#mix_screen1").css({"margin-left":0}).transition({"margin-left":-tmp_width},app.app_mix.duration2,function () {
			$(this).css({"display":"none"});
			// close
			app.app_mix.showClose();			
			// reveal screen
			$("#mix_screen2").css({"display":"block","margin-left":-tmp_width}).transition({"margin-left":0},app.app_mix.duration,function () {
				allow_clicks=true;
				app.app_mix.checkScreen();								
			});
			app.app_mix.allowBack = true;
		});
	} else if (reveal == 2) {
		// REVEAL screen
		$("#mix_screen1").css({"margin-left":0}).transition({"margin-left":-tmp_width},app.app_mix.duration2,function () {
			$(this).css({"display":"none"});
			// close
			app.app_mix.showClose();			
			// reveal screen
			$("#mix_save").remove();
			var tmp_height = parseInt($(window).height()) + 100;
			$("#mix_screen3").css({"display":"block","margin-left":-tmp_width,"height":tmp_height,"min-height":tmp_height}).transition({"margin-left":0},app.app_mix.duration,function () {
				allow_clicks=true;
				app.app_mix.saveScreen();
				$("#mix_screen_close").click(function () { app.app_mix.closeScreen3(); })				
			});
			app.app_mix.allowBack = true;
		});
	} else if (reveal == 3) {
		// REVEAL screen
		$("#mix_screen1").css({"margin-left":0}).transition({"margin-left":-tmp_width},app.app_mix.duration2,function () {
			$(this).css({"display":"none"});
			// close
			app.app_mix.showClose();			
			// reveal screen
			$("#mix_share").remove();
			var tmp_height = parseInt($(window).height()) + 10;
			$("#mix_screen4").css({"display":"block","margin-left":-tmp_width,"height":tmp_height,"min-height":tmp_height}).transition({"margin-left":0},app.app_mix.duration,function () {
				allow_clicks=true;
				app.app_mix.shareScreen();				
				$("#mix_screen_close").click(function () { app.app_mix.closeScreen4(); })				
			});
			app.app_mix.allowBack = true;
		});
	} else {
		app.app_mix.allowBack = false;
		// CLOSE screen
		$("#mix_screen_close").unbind("click");
		$("#" + was).css({"margin-left":0}).transition({"margin-left":-tmp_width},app.app_mix.duration2,function () {
			$(this).css({"display":"none"});
			$("#mix_screen_close").transition({"margin-left":-tmp_width},100,function () { $(this).css({"display":"none"})});			
			// reveal screen
			$("#mix_screen1").css({"display":"block","margin-left":-tmp_width}).transition({"margin-left":0},app.app_mix.duration,function () {
				// only for screen 2
				if (was == "mix_screen2") {
					// blink a selection
					app.app_mix.blinkblock($("#mixer" + app.app_mix.currentSlot).find(".slot_change"));
					// show the name of the fart
					app.app_mix.setTitle(app.app_mix.soundObject[app.app_mix.slotArray[app.app_mix.currentSlot]].title);
				}
				app.app_mix.refreshButtons();
				allow_clicks=true;
				app.app_mix.refresh(true);
			});
		})
	}
}

app.app_mix.showClose = function () {
	var tmp_width = parseInt($(window).width());
	$("#mix_screen_close").css({"display":"block", "margin-left":-tmp_width})
	$("#mix_screen_close").transition({"margin-left":0},200);	
}


app.app_mix.drawSave = function () {
	$("#mix_saveslots").html('');
	
	var html = '';
	html += '<table width="100%" class="mixtitle_table">'	
	
	var tmp_length = 0;
	for (var t=0; t< app.app_mix.allsaveslot; t++) {
		// first check if save exists
		if (app.localStorage.fartshd_mix[t]) { 
			var tmp_title = app.localStorage.read_key(app.localStorage.fartshd_mix[t]);
			
			html += '<tr><td valign="middle">'
			html += '<div class="mixtitle_small radius gpuAcc" onclick="app.app_mix.loadSavedSlot('+t+')">'+lng[language].mix+' '+ (t+1) +'</div>';
			html += '<div class="mixtitle_icon radius gpuAcc icon_back" onclick="app.app_mix.deleteSave('+t+')">&nbsp;</div>';
			html += '<span onclick="app.app_mix.loadSavedSlot('+t+')">'+tmp_title.title+'</span>';
			html += '</td></tr>';

			//$("#mix_saveslots").append('<p onclick="app.app_mix.loadSavedSlot('+t+')">0'+(t+1)+':&nbsp;&nbsp;'+tmp_title.title+'</p><small onclick="app.app_mix.deleteSave('+t+')">delete</small>')
			tmp_length++;
		} else {
			html += '<tr><td>'
			html += '<div class="mixtitle_small radius gpuAcc">'+lng[language].mix+' '+ (t+1) +'</div>';
			html += '<span>'+lng[language].mix_noname+'</span>';
			html += '</td></tr>';

		}
	}
	
	html += '</table>';
	$("#mix_saveslots").append(html);
	
	$("#mix_saveslots").prepend('<p style="font-size: 1em;"><strong>'+lng[language].mix_saved+' ('+tmp_length+'/'+app.app_mix.allsaveslot+')</strong></p>');
}



app.app_mix.deleteSave = function (num) {
	// delete and init
	app.localStorage.change_mix(num,"delete");
	app.app_mix.init();	
}
// screen 2 - for choosing fart
app.app_mix.drawAllSounds = function () {
	
	$("#mix_screen2").append('<div id="mix_list" class="gpuAcc"></div>')
	$("#mix_list").append('<div class="mix_row gpuAcc"><h3 class="gpuAcc">Choose Fart</h3></div>')

	for (var i = 0; i < app.app_mix.soundObject.length; i++) {
		
		var tmp_id = "mixfarts" + i;
		var tmp_mp3 = app.app_mix.soundObject[i].mp3;
		var tmp_number = i;
		var tmp_title = app.app_mix.soundObject[i].title
		
		if (tmp_mp3 == "empty") {
			// for titles
			var tmp_add = '';
			var tmp_play = '';
			var tmp_row = '<div class="mix_row"></div>';
			
		} else {		
			var tmp_add = '<div class="mix_button radius icon_add" onclick="app.app_mix.selectSound('+tmp_number+')")"></div>';
			var tmp_play = '<div name="'+tmp_mp3+'" class="mix_button_right radius icon_play" onclick="app.app_mix.playSound(this)"></div>';
			var tmp_row = '<div class="mix_row"></div>';
		}
		$("#mix_list").append('<div id="mixfarts'+tmp_number+'"class="mix_row gpuAcc">'+tmp_add+tmp_play+'<span>'+tmp_title+'</span></div>');
	}
	$("#mix_list").append('<p>&nbsp;</p>');
}


// screen 3 - for saving mix
app.app_mix.saveScreen = function () {

	// draw table
	$("#mix_screen3").append('<div id="mix_save" class="gpuAcc"></div>');
	$("#mix_save").css({"opacity":0.01})
	
		// create table
	var tmp_trs = 	'<tr><td class="td1">';
	var tmp_tr1 = 	'</td><td class="td3 gpuAcc"><div class="small_icon s1"></div></td>';
		tmp_tr1 +=	'<td class="td2 gpuAcc"><input step="1" value="5" type="range" id="mix_save_val1" name="mix_save_val1" min="1" max="10">';
	var tmp_tr2 = 	'</td><td class="td3 gpuAcc"><div class="small_icon s2"></div></td>';
		tmp_tr2 +=	'<td class="td2 gpuAcc"><input step="1" value="5" type="range" id="mix_save_val3" name="mix_save_val3" min="1" max="10">';
	var tmp_tr3 = 	'</td><td class="td3 gpuAcc"><div class="small_icon s3"></div></td>';
		tmp_tr3 +=	'<td class="td2 gpuAcc"><input step="1" value="5" type="range" id="mix_save_val4" name="mix_save_val4" min="1" max="10">';
	var tmp_tr4 = 	'</td><td class="td3 gpuAcc"><div class="small_icon s4"></div></td>';
		tmp_tr4 +=	'<td class="td2 gpuAcc"><input step="1" value="5" type="range" id="mix_save_val5" name="mix_save_val5" min="1" max="10">';
	var tmp_tr5 = 	'</td><td class="td3 gpuAcc"><div class="small_icon s5"></div></td>';
		tmp_tr5 +=	'<td class="td2 gpuAcc"><input step="1" value="5" type="range" id="mix_save_val2" name="mix_save_val2" min="1" max="10">';
	var tmp_tre1 = '</div></div><td class="td3 gpuAcc"><div class="small_icon e1"></td></tr>';
	var tmp_tre2 = '</div></div><td class="td3 gpuAcc"><div class="small_icon e2"></td></tr>';
	var tmp_tre3 = '</div></div><td class="td3 gpuAcc"><div class="small_icon e3"></td></tr>';
	var tmp_tre4 = '</div></div><td class="td3 gpuAcc"><div class="small_icon e4"></td></tr>';
	var tmp_tre5 = '</div></div><td class="td3 gpuAcc"><div class="small_icon e5"></td></tr>';

	var tmp_value1 = tmp_trs+''+lng[language].cat_level+''+tmp_tr1+''+''+tmp_tre1;
	var tmp_value2 = tmp_trs+''+lng[language].cat_aware+''+tmp_tr5+''+''+tmp_tre5;
	var tmp_value3 = tmp_trs+''+lng[language].cat_dirty+''+tmp_tr2+''+''+tmp_tre2;
	var tmp_value4 = tmp_trs+''+lng[language].cat_smell+''+tmp_tr3+''+''+tmp_tre3;
	var tmp_value5 = tmp_trs+''+lng[language].cat_throw+''+tmp_tr4+''+''+tmp_tre4;
	
	$("#mix_save").append('');
	$("#mix_save").append('<h3>'+lng[language].title+'</h3>');	
	$("#mix_save").append('<textarea maxlength="50" id="mix_save_title" name="mix_save_title">'+app.app_mix.mixname+'</textarea>');	
	$("#mix_save").append('<table align="center" id="category_values" class="gpuAcc">'+tmp_value1+tmp_value2+tmp_value3+tmp_value4+tmp_value5+'</table>');

	$("#mix_save").append('<hr class="mix_control" />');
	$("#mix_save").append('<div onclick="app.app_mix.playfart()" class="button mix_org nohighlight gpuAcc"><div class="icon_play gpuAcc"></div><span>'+lng[language].mix_play+'</span></div>');
	$("#mix_save").append('<div id="mix_to_save" onclick="app.app_mix.finalSave()" class="button mix_red nohighlight gpuAcc"><div class="icon_starts gpuAcc"></div><span>'+lng[language].mix_alert6+'</span></div>');

	app.app_mix.checkScreen3 ();
		
	$("#mix_save").append('<p>&nbsp;</p>');		
	$("#mix_screen3").css({"height":"auto"})

	$("#mix_save").transition({"opacity":1});
	
}
app.app_mix.checkScreen3 = function () {
	// check if there is loaded
	var tmp_length = app.localStorage.fartshd_mix.length;
	var tmp_location = app.localStorage.get_mix(app.app_mix.randomID);
	console.log (tmp_length + " ::: " + tmp_location)
	if (tmp_length > tmp_location) {
		console.log ("SAME OLD SOUND. READ A MIX");
		var tmp_key = app.localStorage.read_key(app.localStorage.fartshd_mix[tmp_location]);
		$("#mix_save_title").html(tmp_key.title);
		$("#mix_save_val1").val(tmp_key.val1);
		$("#mix_save_val2").val(tmp_key.val2);
		$("#mix_save_val3").val(tmp_key.val3);
		$("#mix_save_val4").val(tmp_key.val4);
		$("#mix_save_val5").val(tmp_key.val5);	
	} else {
		console.log ("NEW SOUND")		
	}
}
app.app_mix.closeScreen2 = function () {
	if(!allow_clicks) { return }
	app.app_mix.doTransition (false,"mix_screen2");	
}
app.app_mix.closeScreen3 = function () {
	if(!allow_clicks) { return }
	app.app_mix.doTransition (false,"mix_screen3");	
}
app.app_mix.closeScreen4 = function () {
	if(!allow_clicks) { return }
	app.app_mix.doTransition (false,"mix_screen4");	
}

app.app_mix.finalSave = function () {
	if(!allow_clicks) { return }
	// check the name
	var mix_name = $("#mix_save_title").val();
	
	if ((mix_name == lng[language].mix_noname) || (mix_name.length<3)) {
		allow_clicks = false;
		var tmp_color = $("#mix_save_title").css("background-color");
		$("#mix_save_title").transition({"background-color":"#990000"},500).transition({"background-color":tmp_color},500,function () {
			allow_clicks = true;	
		});
	} else {
		
		allow_clicks = false;		
		app.app_mix.mixArray = new Array("","","","","");
		app.app_mix.timeArray = new Array("","","","","");
		for (var t=0; t <app.app_mix.slotArray.length; t++) {
			if (app.app_mix.slotArray[t] !== null) {		
				app.app_mix.mixArray[t]=(app.app_mix.soundObject[app.app_mix.slotArray[t]].mp3);
				app.app_mix.timeArray[t]=(app.app_mix.soundObject[app.app_mix.slotArray[t]].timer);
			} else {
				app.app_mix.mixArray[t]=(app.localStorage.empty);
				app.app_mix.timeArray[t]=(app.localStorage.empty);	
			}
		}

		// type, id, cat, title, mp3 1-5, time 1-5, value 1-5, timer, autor	
		var mix_type = "mix1";
		var mix_id = app.app_mix.randomID;
		var mix_cat = "mix";
		var mix_title = $("#mix_save_title").val();
		
		var mix_mp30 = app.app_mix.mixArray[0];
		var mix_mp31 = app.app_mix.mixArray[1];
		var mix_mp32 = app.app_mix.mixArray[2];
		var mix_mp33 = app.app_mix.mixArray[3];
		var mix_mp34 = app.app_mix.mixArray[4];
		
		var mix_tim0 = app.app_mix.timeArray[0];
		var mix_tim1 = app.app_mix.timeArray[1];
		var mix_tim2 = app.app_mix.timeArray[2];
		var mix_tim3 = app.app_mix.timeArray[3];
		var mix_tim4 = app.app_mix.timeArray[4];
		
		var mix_val1 = $("#mix_save_val1").val();
		var mix_val2 = $("#mix_save_val2").val();
		var mix_val3 = $("#mix_save_val3").val();
		var mix_val4 = $("#mix_save_val4").val();
		var mix_val5 = $("#mix_save_val5").val();
		
		var mix_author = "app";
		var mix_device = app.platform;
		//app.localStorage.inner
		var create_mix = "";
		create_mix += mix_type + app.localStorage.inner;
		create_mix += mix_id + app.localStorage.inner;
		create_mix += mix_cat + app.localStorage.inner;
		create_mix += mix_title + app.localStorage.inner;
		create_mix += mix_mp30 + app.localStorage.inner;
		create_mix += mix_mp31 + app.localStorage.inner;
		create_mix += mix_mp32 + app.localStorage.inner;
		create_mix += mix_mp33 + app.localStorage.inner;
		create_mix += mix_mp34 + app.localStorage.inner;
		create_mix += mix_tim0 + app.localStorage.inner;
		create_mix += mix_tim1 + app.localStorage.inner;
		create_mix += mix_tim2 + app.localStorage.inner;
		create_mix += mix_tim3 + app.localStorage.inner;
		create_mix += mix_tim4 + app.localStorage.inner;
		create_mix += mix_val1 + app.localStorage.inner;
		create_mix += mix_val2 + app.localStorage.inner;
		create_mix += mix_val3 + app.localStorage.inner;
		create_mix += mix_val4 + app.localStorage.inner;
		create_mix += mix_val5 + app.localStorage.inner;
		create_mix += mix_author + app.localStorage.inner;
		create_mix += mix_device + app.localStorage.inner;
		
		console.log("SAVE --------- ");
		console.log(create_mix)
		console.log("-------------- ");
		//app.localStorage.split_key (create_mix);
		app.localStorage.save_mix(create_mix);
				
		/* set name */
		app.app_mix.mixname = mix_title;
		app.app_mix.setName ((Number(app.localStorage.get_mix(mix_id))+1) , mix_title);
		//app.app_mix.setName (app.app_mix.saveslot, mix_title);
		
		/* refresh saves */
		app.app_mix.drawSave ();
		
		/* close screen */
		$("#mix_to_save").transition({"opacity":0},1000,function () {
			
			allow_clicks = true;
			app.app_mix.closeScreen3();
				
		})
	}
}

app.app_mix.loadSavedSlot = function (num) {
	// load a save slot
	app.app_mix.init (false,num)

}


/* share screen */
// screen 3 - for saving mix
app.app_mix.shareScreen = function () {

	// draw table
	$("#mix_screen4").append('<div id="mix_share" class="gpuAcc"></div>');
	$("#mix_share").css({"opacity":0.01})
	
	var tmp_length = app.localStorage.fartshd_mix.length;
	var tmp_location = app.localStorage.get_mix(app.app_mix.randomID);
	console.log ("SAME OLD SOUND. READ A MIX");
	console.log (tmp_length + " ::: " + tmp_location)	
	var tmp_key = app.localStorage.read_key(app.localStorage.fartshd_mix[tmp_location]);	
	
	$("#mix_share").append('<br />');	
	
/*
	
	var tmp_trs = 	'<tr><td class="td1">';
	var tmp_tr1 = 	'</td><td class="td3 gpuAcc"><div class="small_icon s1"></div></td>';
		tmp_tr1 +=	'<td class="td2 gpuAcc"><input step="1" value="'+tmp_key.val1+'" type="range" id="mix_share_val1" name="mix_share_val1" min="1" max="10" disabled>';
	var tmp_tr2 = 	'</td><td class="td3 gpuAcc"><div class="small_icon s2"></div></td>';
		tmp_tr2 +=	'<td class="td2 gpuAcc"><input step="1" value="'+tmp_key.val3+'" type="range" id="mix_share_val3" name="mix_share_val3" min="1" max="10" disabled>';
	var tmp_tr3 = 	'</td><td class="td3 gpuAcc"><div class="small_icon s3"></div></td>';
		tmp_tr3 +=	'<td class="td2 gpuAcc"><input step="1" value="'+tmp_key.val4+'" type="range" id="mix_share_val4" name="mix_share_val4" min="1" max="10" disabled>';
	var tmp_tr4 = 	'</td><td class="td3 gpuAcc"><div class="small_icon s4"></div></td>';
		tmp_tr4 +=	'<td class="td2 gpuAcc"><input step="1" value="'+tmp_key.val5+'" type="range" id="mix_share_val5" name="mix_share_val5" min="1" max="10" disabled>';
	var tmp_tr5 = 	'</td><td class="td3 gpuAcc"><div class="small_icon s5"></div></td>';
		tmp_tr5 +=	'<td class="td2 gpuAcc"><input step="1" value="'+tmp_key.val2+'" type="range" id="mix_share_val2" name="mix_share_val2" min="1" max="10" disabled>';
	var tmp_tre1 = 	'</div></div><td class="td3 gpuAcc"><div class="small_icon e1"></td></tr>';
	var tmp_tre2 = 	'</div></div><td class="td3 gpuAcc"><div class="small_icon e2"></td></tr>';
	var tmp_tre3 = 	'</div></div><td class="td3 gpuAcc"><div class="small_icon e3"></td></tr>';
	var tmp_tre4 = 	'</div></div><td class="td3 gpuAcc"><div class="small_icon e4"></td></tr>';
	var tmp_tre5 = 	'</div></div><td class="td3 gpuAcc"><div class="small_icon e5"></td></tr>';
	
	var tmp_value1 = tmp_trs+''+lng[language].cat_level+''+tmp_tr1+''+''+tmp_tre1;
	var tmp_value2 = tmp_trs+''+lng[language].cat_aware+''+tmp_tr5+''+''+tmp_tre5;
	var tmp_value3 = tmp_trs+''+lng[language].cat_dirty+''+tmp_tr2+''+''+tmp_tre2;
	var tmp_value4 = tmp_trs+''+lng[language].cat_smell+''+tmp_tr3+''+''+tmp_tre3;
	var tmp_value5 = tmp_trs+''+lng[language].cat_throw+''+tmp_tr4+''+''+tmp_tre4;
*/	
	
	var tmp_trs = 	'<tr><td class="td1">';
	var tmp_tr1 = 	'</td><td class="td3 gpuAcc"><div class="small_icon s1"></div></td>';
		tmp_tr1 +=	'<td class="td2 gpuAcc"><div class="graph graph_eq gpuAcc">';
	var tmp_tr2 = 	'</td><td class="td3 gpuAcc"><div class="small_icon s2"></div></td>';
		tmp_tr2 +=	'<td class="td2 gpuAcc"><div class="graph graph_dirt gpuAcc">';
	var tmp_tr3 = 	'</td><td class="td3 gpuAcc"><div class="small_icon s3"></div></td>';
		tmp_tr3 +=	'<td class="td2 gpuAcc"><div class="graph graph_smell gpuAcc">';
	var tmp_tr4 = 	'</td><td class="td3 gpuAcc"><div class="small_icon s4"></div></td>';
		tmp_tr4 +=	'<td class="td2 gpuAcc"><div class="graph graph_throw gpuAcc">';
	var tmp_tr5 = 	'</td><td class="td3 gpuAcc"><div class="small_icon s5"></div></td>';
		tmp_tr5 +=	'<td class="td2 gpuAcc"><div class="graph graph_aware gpuAcc">';
	var tmp_tre1 = '</div></div><td class="td3 gpuAcc"><div class="small_icon e1"></td></tr>';
	var tmp_tre2 = '</div></div><td class="td3 gpuAcc"><div class="small_icon e2"></td></tr>';
	var tmp_tre3 = '</div></div><td class="td3 gpuAcc"><div class="small_icon e3"></td></tr>';
	var tmp_tre4 = '</div></div><td class="td3 gpuAcc"><div class="small_icon e4"></td></tr>';
	var tmp_tre5 = '</div></div><td class="td3 gpuAcc"><div class="small_icon e5"></td></tr>';

	var tmp_value1 = tmp_trs+''+lng[language].cat_level+''+tmp_tr1+''+'<div id="td1" class="tds gpuAcc">'+tmp_tre1;
	var tmp_value2 = tmp_trs+''+lng[language].cat_aware+''+tmp_tr5+''+'<div id="td5" class="tds gpuAcc">'+tmp_tre5;
	var tmp_value3 = tmp_trs+''+lng[language].cat_dirty+''+tmp_tr2+''+'<div id="td2" class="tds gpuAcc">'+tmp_tre2;
	var tmp_value4 = tmp_trs+''+lng[language].cat_smell+''+tmp_tr3+''+'<div id="td3" class="tds gpuAcc">'+tmp_tre3;
	var tmp_value5 = tmp_trs+''+lng[language].cat_throw+''+tmp_tr4+''+'<div id="td4" class="tds gpuAcc">'+tmp_tre4;
		
	$("#mix_share").append('');
	$("#mix_share").append('<h3 id="mix_share_title">'+tmp_key.title+'</h3>');	
	$("#mix_share").append('<table onclick="app.app_mix.voiding()" align="center" id="category_values" class="gpuAcc">'+tmp_value1+tmp_value2+tmp_value3+tmp_value4+tmp_value5+'</table>');
	
	var tmp_w = $(".graph").width();
	var tmp_width1 = (100 - (tmp_key.val1*10)) + "%";
	var tmp_width2 = (100 - (tmp_key.val3*10)) + "%";
	var tmp_width3 = (100 - (tmp_key.val4*10)) + "%";
	var tmp_width4 = (100 - (tmp_key.val5*10)) + "%";
	var tmp_width5 = (100 - (tmp_key.val2*10)) + "%";	
	
	$("#td1").css({"width":tmp_width1,"opacity":1,"right":-1});
	$("#td2").css({"width":tmp_width2,"opacity":1,"right":-1});
	$("#td3").css({"width":tmp_width3,"opacity":1,"right":-1});
	$("#td4").css({"width":tmp_width4,"opacity":1,"right":-1});
	$("#td5").css({"width":tmp_width5,"opacity":1,"right":-1});

	
	
	
	$("#mix_share").append('<br />');
	
	var tmp_web = "app.app_mix.viewWeb("+tmp_location+")"; 
	var tmp_facebook = "app.app_mix.shareFacebook("+tmp_location+")";
	var tmp_google = "app.app_mix.shareGoogle("+tmp_location+")";
	var tmp_twitter = "app.app_mix.shareTwitter("+tmp_location+")";
	

	$("#mix_share").append('<div onclick="'+tmp_web+'" class="button nohighlight gpuAcc"><div class="icon_globe gpuAcc"></div><span>View it on web</span></div>');
	$("#mix_share").append('<div onclick="'+tmp_facebook+'" class="button nohighlight gpuAcc"><div class="icon_facebook gpuAcc"></div><span>'+lng[language].share_facebook+'</span></div>');
	$("#mix_share").append('<div onclick="'+tmp_google+'" class="button nohighlight gpuAcc"><div class="icon_google gpuAcc"></div><span>'+lng[language].share_google+'</span></div>');
	$("#mix_share").append('<div onclick="'+tmp_twitter+'" class="button nohighlight gpuAcc"><div class="icon_twitter gpuAcc"></div><span>'+lng[language].share_twitter+'</span></div>');

	
	$("#mix_share").append('<p>&nbsp;</p>');
	$("#mix_share").append('<small><strong>'+lng[language].tc_title+'</strong></small><br />');	
	$("#mix_share").append('<small>'+lng[language].tc_text+'</small>');
	$("#mix_share").append('<p>&nbsp;</p>');
		
	$("#mix_screen4").css({"height":"auto"})
	 

	$("#mix_share").transition({"opacity":1});	

}

app.app_mix.shareFacebook = function (locations) {
	if(!allow_clicks) { return }
	// share on facebook
	var tmp_share = app.shareFacebook.url + app.shareFacebook.domain + app.localStorage.fartshd_mix[locations];
	window.open(tmp_share, "_blank");		
}

app.app_mix.shareGoogle = function (locations) {
	if(!allow_clicks) { return }
	// share on google
	var tmp_share = app.shareGoogle.url + app.shareGoogle.domain + app.localStorage.fartshd_mix[locations];
	window.open(tmp_share, "_blank");
}

app.app_mix.shareTwitter = function (locations) {
	if(!allow_clicks) { return }
	// share on twitter
	var tmp_titles = "&text="+ encodeURI(lng[language].share_title);
	var tmp_share = app.shareTwitter.url + app.shareTwitter.domain + app.localStorage.fartshd_mix[locations] + tmp_titles;
	window.open(tmp_share, "_blank");	
}

app.app_mix.viewWeb = function (locations) {
	if(!allow_clicks) { return }
	// view it on web
	var tmp_share = app.shareLink + app.localStorage.fartshd_mix[locations];
	window.open(tmp_share, "_blank");	
}

app.app_mix.voiding = function () {

}
