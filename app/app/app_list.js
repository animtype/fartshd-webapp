// copyright Dr.Peter

app.app_list = function(malefarts,femalefarts,oldfarts) {
	app.app_list.malefarts = null;
	app.app_list.femalefarts = null;
	app.app_list.oldfarts = null;
	app.app_list.malefarts = malefarts;	
	app.app_list.femalefarts = femalefarts;	
	app.app_list.oldfarts = oldfarts;
	app.app_list.init();
	//drawLogs("FART SOUND")	
}
app.app_list.refresh = function () {
	app.getBackgroundStyle();
}
app.app_list.init = function () {	
	// init variables
	$("#listview").remove();
	allow_clicks=false;
	app.app_list.previous = -1;
	// create an app
	$("#app_holder").css({"opacity":0});
	$("#app_holder").append('<div id="listview" class="app gpuAcc"><div id="list_holder" class="gpuAcc"></div></div>');
	
		
	$("#list_holder").append(app.drawSelector('app.app_list.open_listview',false));
		
	// male farts	
	$("#list_holder").append('<table class="listview malefarts"></table>');
	$(".malefarts").append('<tr><td colspan="4" class="t0 gpuAcc">'+app.getMenuTitle("male").name+'</td></tr>');
	for (var i = 0; i < app.app_list.malefarts.length; i++) {
		var tmp_id = "male" + i;
		var tmp_number = '<td class="t1 gpuAcc">' + (i+1) + '</td>';
		var tmp_play = '<td  class="t2 nohighlight play gpuAcc" onclick="app.app_list.dosound(\''+tmp_id+'\','+app.app_list.malefarts[i].mp3+')">&nbsp;</td>';
		var tmp_title = '<td class="t3 gpuAcc">'+app.app_list.malefarts[i].title+'</td>';
		var tmp_fav = '<td  class="t4 nohighlight fav gpuAcc" onclick="app.app_list.confirm_to_fav('+app.app_list.malefarts[i].mp3+')">&nbsp;</td>';
		$(".malefarts").append('<tr id="'+tmp_id+'">'+tmp_number+tmp_play+tmp_title+tmp_fav+'</tr>');
	}	
	
	//female farts	
	$("#list_holder").append('<table class="listview femalefarts"></table>');
	$(".femalefarts").append('<tr><td colspan="4" class="t0 gpuAcc">'+app.getMenuTitle("female").name+'</td></tr>');	
	for (var i = 0; i < app.app_list.femalefarts.length; i++) {
		var tmp_id = "female" + i;
		var tmp_number = '<td class="t1 gpuAcc">' + (i+1) + '</td>';
		var tmp_play = '<td  class="t2 nohighlight play gpuAcc" onclick="app.app_list.dosound(\''+tmp_id+'\','+app.app_list.femalefarts[i].mp3+')">&nbsp;</td>';
		var tmp_title = '<td class="t3 gpuAcc">'+app.app_list.femalefarts[i].title+'</td>';
		var tmp_fav = '<td  class="t4 nohighlight fav gpuAcc" onclick="app.app_list.confirm_to_fav('+app.app_list.femalefarts[i].mp3+')">&nbsp;</td>';
		$(".femalefarts").append('<tr id="'+tmp_id+'">'+tmp_number+tmp_play+tmp_title+tmp_fav+'</tr>');
	}
	
	//old farts	
	$("#list_holder").append('<table class="listview oldfarts"></table>');
	$(".oldfarts").append('<tr><td colspan="4" class="t0 gpuAcc">'+app.getMenuTitle("old").name+'</td></tr>');	
	for (var i = 0; i < app.app_list.oldfarts.length; i++) {
		var tmp_id = "oldfarts" + i;
		var tmp_number = '<td class="t1 gpuAcc">' + (i+1) + '</td>';
		var tmp_play = '<td  class="t2 nohighlight play gpuAcc" onclick="app.app_list.dosound(\''+tmp_id+'\','+app.app_list.oldfarts[i].mp3+')">&nbsp;</td>';
		var tmp_title = '<td class="t3 gpuAcc">'+app.app_list.oldfarts[i].title+'</td>';
		var tmp_fav = '<td  class="t4 nohighlight fav gpuAcc" onclick="app.app_list.confirm_to_fav('+app.app_list.oldfarts[i].mp3+')">&nbsp;</td>';
		$(".oldfarts").append('<tr id="'+tmp_id+'">'+tmp_number+tmp_play+tmp_title+tmp_fav+'</tr>');
	}
	
	$("#list_holder").append('<p>&nbsp;</p>');
	$("#app_holder").transition({"opacity":1}, duration, function() {
		allow_clicks = true;
		app.flipSelector(0);
	});
}
app.app_list.open_listview = function (was) {
		
	if (was == 0) {
		app.app_list.open_close("malefarts",true);		
	} 
	if (was == 1) {
		app.app_list.open_close("femalefarts",true);		
	}
	if (was == 2) {
		app.app_list.open_close("oldfarts",true);		
	}
	if (app.app_list.previous == 0) {
		app.app_list.open_close("malefarts",false);		
	} 
	if (app.app_list.previous == 1) {
		app.app_list.open_close("femalefarts",false);		
	}
	if (app.app_list.previous == 2) {
		app.app_list.open_close("oldfarts",false);		
	}
	app.app_list.previous = was;
}

app.app_list.open_close = function (obj,what,style) {

	if (what) {
		// open	
		$("." + obj).css({"opacity":0, "display":"table"}).transition({"opacity":1},duration);
	} else {
		// close
		$("." + obj).css({"opacity":0, "display":"none"});
	}	
}

app.app_list.dosound = function (obj,mp3){
	
	if (!allow_clicks) { return; }
	
	// old android hack
	$("#" + obj + " .t2").removeAttr("style");
	$("#" + obj + " .t3").removeAttr("style");
	allow_clicks=false;
	$("#" + obj + " .t2").css({"perspective":500,"rotateY":50}).transition({"perspective":500,"rotateY":0},duration,function() {
		$(this).removeAttr("style");
		allow_clicks=true;
	});
	$("#" + obj + " .t3").css({"scale":0.9}).transition({"scale":1},duration, function() {
		$(this).removeAttr("style");	
	});
	app.soundArray(mp3);	
}
app.app_list.confirm_to_fav = function (id) {
	//app.soundClick();
	app.app_list.add_fart = false;
	var tmp_buttons = new Array(lng[language].no, lng[language].yes);
	var tmp_actions = new Array("", "app.app_list.add_to_fav(" + id +")");
	app.alerts("confirm",lng[language].addfav, lng[language].addfav_alert, tmp_buttons,tmp_actions)
	
}
app.app_list.add_to_fav = function (id) {
	app.localStorage.add_favorites(id);
}
