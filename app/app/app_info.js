// copyright Dr.Peter

app.app_info = function(soundObject) {
	app.app_info.init();
	//drawLogs("FART SOUND")	
}

app.app_info.refresh = function () {
	
	app.getBackgroundStyle();

}

app.app_info.init = function () {
	// app holder
	// init variables
	$("#infosupport").remove();
	allow_clicks=true;
	// create an app
	$("#app_holder").css({"opacity":0});
	$("#app_holder").append('<div id="infosupport" class="app gpuAcc"><div id="infosupport_holder" class="gpuAcc"></div></div>');
	
	$("#infosupport_holder").append('<div class="animtype_org"></div><p><strong>' + lng[language].info_txt1 + '</strong></p>');
	$("#infosupport_holder").append('<p>' + lng[language].info_txt2 + '</p>');
	$("#infosupport_holder").append('<p>' + lng[language].info_txt3 + '</p>');
	$("#infosupport_holder").append('<p>' + lng[language].info_txt4 + '</p>');
	$("#infosupport_holder").append('<p>' + lng[language].info_txt5 + '</p>');
	$("#infosupport_holder").append('' + lng[language].info_txt6 + '');
	
	$("#infosupport_holder").append('<hr style="border: 4px solid rgba(0,0,0,0.5)" />');
	
	var tmp_link1 = 'window.open("http://mix.fartshd.com", "_system", "location=yes")';
	var tmp_link2 = 'window.open("http://www.fartshd.com", "_system", "location=yes")';
	var tmp_link3 = 'window.open("http://www.fartshd.com/privacy_policy.php", "_system", "location=yes")';	
	var tmp_link4 = 'window.open("http://www.animtype.com", "_system", "location=yes")';
	$("#infosupport_holder").append("<div onclick='"+tmp_link1+"' class='button nohighlight gpuAcc'>"+lng[language].info_footer1+"</div>");
	$("#infosupport_holder").append("<div onclick='"+tmp_link2+"' class='button nohighlight gpuAcc'>"+lng[language].info_footer2+"</div>");
	$("#infosupport_holder").append("<div onclick='"+tmp_link3+"' class='button nohighlight gpuAcc'>"+lng[language].info_footer3+"</div>");	
	//$("#infosupport_holder").append("<div onclick='"+tmp_link4+"' class='button nohighlight gpuAcc'>"+lng[language].info_footer4+"</div>");
	
	$("#infosupport_holder").append('<hr style="border: 4px solid rgba(0,0,0,0.5)" /><br />');
	$("#infosupport_holder").append('<div class="appversion">'+appversion+'</div>')
	
	$("#app_holder").css({"opacity":0}).transition({"opacity":1},duration*2)

}
