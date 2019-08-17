// copyright Dr.Peter

app.app_category = function(soundObject,isAllowToRemove) {
	app.app_category.isAllowToRemove = isAllowToRemove?true:false;
	app.app_category.soundObject = null;
	app.app_category.soundObject = soundObject;
	app.app_category.init();
	//drawLogs("FART SOUND")	
}
app.app_category.refresh = function () {
	//drawLogs("refresh memory : " + $("#memory_holder").innerHeight())
	var tmp_w = $("#category_holder").width();
	$("#category_sound ul").css({"width":(tmp_w*app.app_category.all)+10});
	$("#category_sound li").css({"width":(tmp_w)});
	// refresh scroller
	app.app_category.scroller.refresh();	
	app.app_category.scrollto(app.app_category.sound);
	app.getBackgroundStyle();
}
app.app_category.init = function () {	
	// init variables
	$("#category").remove();
	allow_clicks=true;	
	if(app.app_category.scroller) {
		app.app_category.scroller.destroy();	
	}
	app.app_category.bg = 0;
	app.app_category.scroller = null;
	app.app_category.sound = 0;
	app.app_category.all = app.app_category.soundObject.length;
	
	// create an app
	$("#app_holder").append('<div id="category" class="app gpuAcc"><div id="category_holder" class="gpuAcc"></div></div>');
	$("#category_holder").append('<div id="category_sound" class="gpuAcc"><div id="wrapper" class="gpuAcc"><ul id="category_scroller" class="gpuAcc"></ul></div></div></div>');
	
	// check if anything is there
	if(app.app_category.all < 1) {
		$("#category_holder").html('<h2 style="text-align: center; width: 100%">'+lng[language].cat_empty+'</h2>');
		return;	
	}

	// create navigation
	$("#category_sound").append('<div id="scroll_prev" class="icons prev gpuAcc"></div>');
	$("#category_sound").append('<div id="scroll_next" class="icons next gpuAcc"></div>');
	$("#scroll_prev").click(function() {
		app.app_category.scrollto("prev");			
	})
	$("#scroll_next").click(function() {
		app.app_category.scrollto("next");			
	})
	// create sounds	
	for (var i=0; i<app.app_category.all;i++) {
		var tmp_title = '<div class="name gpuAcc">'+app.app_category.soundObject[i].title+'</div>';
		$("#category_scroller").append
		('<li class="gpuAcc"><div id="play'+i+'" class="icons play gpuAcc" onclick="app.app_category.play('+i+')"></div>'+tmp_title+'</li>');
	}
	var tmp_w = $("#category_holder").width();
	$("#category_sound ul").css({"width":(tmp_w*app.app_category.all)+10});
	$("#category_sound li").css({"width":(tmp_w)});
	// attach scroller
	$("#category_sound").css({"opacity":0,"display":"block"}).transition({"opacity":1},duration, function () {
		app.app_category.scroller = new iScroll('wrapper', 
		{snap: 'li', momentum: false, hScrollbar: true, vScrollbar: false, fadeScrollbar:true, hideScrollbar:true, 
		onScrollEnd: function () {
			// gesture scroll
			app.app_category.sound = this.currPageX;		
		}});
		app.app_category.scroller.scrollToPage(3,0,0);
		app.app_category.scrollto(0);
	});	
	// create table
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
	
	// draw add to and remove from favorites
	if(app.app_category.isAllowToRemove) {
		$("#category_holder").append('<div id="category_fav" class="button gpuAcc" onclick="app.app_category.confirm_from_fav()"><div class="gpuAcc icon_trash"></div><span>'+lng[language].delfav+'</span></div>');	
	} else {
		$("#category_holder").append('<div id="category_fav" class="button gpuAcc" onclick="app.app_category.confirm_to_fav()"><div class="gpuAcc icon_fav"></div><span>'+lng[language].addfav+'</span></div>');		
	}
	
	// draw table
	$("#category_holder").append('<table align="center" id="category_values" class="gpuAcc">'+tmp_value1+tmp_value2+tmp_value3+tmp_value4+tmp_value5+'</table>');
	
}
app.app_category.scrollto = function (was) {	
	if (was == "prev") {		
		app.app_category.sound  = app.app_category.sound-1>0?app.app_category.sound-1:0;
		app.app_category.scroller.scrollToPage(app.app_category.sound,0,duration);
		return;	
	}
	if (was == "next") {
		app.app_category.sound  = app.app_category.sound+1<app.app_category.all?app.app_category.sound+1:app.app_category.all;
		app.app_category.scroller.scrollToPage(app.app_category.sound,0,duration);
		return;
	}	
	app.app_category.sound = was;
	app.app_category.scroller.scrollToPage(app.app_category.sound,0,duration);
}
// play sound
app.app_category.play = function (was) {	
	if(!allow_clicks) { return; }
	
	allow_clicks = false;
	app.soundArray(app.app_category.soundObject[was].mp3);
	app.app_category.draw(was);	
}
// draw
app.app_category.draw = function (was) {
	var tmp_w = $(".graph").width();
	var tmp_width1 = (100 - (app.app_category.soundObject[was].value1*10));
	var tmp_width2 = (100 - (app.app_category.soundObject[was].value2*10));
	var tmp_width3 = (100 - (app.app_category.soundObject[was].value3*10));
	var tmp_width4 = (100 - (app.app_category.soundObject[was].value4*10));
	var tmp_width5 = (100 - (app.app_category.soundObject[was].value5*10));	

	app.app_category.animategraph($("#td1"),tmp_w,tmp_width1, false);
	app.app_category.animategraph($("#td2"),tmp_w,tmp_width2, false);
	app.app_category.animategraph($("#td3"),tmp_w,tmp_width3, false);
	app.app_category.animategraph($("#td4"),tmp_w,tmp_width4, false);
	app.app_category.animategraph($("#td5"),tmp_w,tmp_width5, true);
}
app.app_category.animategraph = function (obj, wid, pecent, doclick) {

	var timer = ((Math.ceil(Math.random()*3)+1)*duration)/2;
	var percent_calc = Math.ceil(Math.random()*20)-10;

	var start_pecrcent = Number(pecent + percent_calc) + "%";
	var end_pecrcent = pecent + "%";

	if (!doclick) {
		obj.stop(true, false);
		obj.removeAttr("style");
		obj.css({ 
			"opacity":1, 
			"width":wid,
			"right":-1
		}).transition({
			"opacity":1, 
			"right":-1, 
			"width": start_pecrcent
		},timer, "in-out").transition({
			"width": end_pecrcent	
		},timer/1.5, "in-out",function(){});
	} else {
		obj.stop(true, false);
		obj.removeAttr("style");
		obj.css({ 
			"opacity":1, 
			"width":wid,
			"right":-1
		}).transition({
			"opacity":1, 
			"right":-1, 
			"width": start_pecrcent
		},timer, "in-out").transition({
			"width": end_pecrcent	
		},timer/1.5, "in-out",function(){
			allow_clicks = true;	
		});		
	}	
}

// REMOVE
app.app_category.confirm_from_fav = function () {
	//app.soundClick();
	app.app_list.add_fart = false;
	var tmp_buttons = new Array(lng[language].no, lng[language].yes);
	var tmp_actions = new Array("", "app.app_category.remove_from_fav()");
	app.alerts("confirm",lng[language].delfav, lng[language].devfav_alert, tmp_buttons,tmp_actions)
	
}
app.app_category.remove_from_fav = function () {
	var tmp_id = app.app_category.soundObject[app.app_category.sound].mp3;
	app.localStorage.delete_favorites(tmp_id);
	app.app_category(app.localStorage.fartshd_favorites, true);	
}

// ADD 
app.app_category.confirm_to_fav = function () {
	//app.soundClick();
	app.app_list.add_fart = false;
	var tmp_buttons = new Array(lng[language].no, lng[language].yes);
	var tmp_actions = new Array("", "app.app_category.add_to_fav()");
	app.alerts("confirm",lng[language].addfav, lng[language].addfav_alert, tmp_buttons,tmp_actions)
	
}
app.app_category.add_to_fav = function () {
	$("#category_fav").removeAttr("style").css({"opacity":0}).transition({"opacity":1},duration*2);
	var tmp_id = app.app_category.soundObject[app.app_category.sound].mp3;
	app.localStorage.add_favorites(tmp_id);
}