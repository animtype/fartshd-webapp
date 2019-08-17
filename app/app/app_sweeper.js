// copyright Dr.Peter

app.app_sweeper = function(soundObject) {
	app.app_sweeper.soundObject = null;
	app.app_sweeper.soundObject = soundObject;
	app.app_sweeper.init();
	//drawLogs("FART SOUND")	
}
app.app_sweeper.refresh = function (firsttimer) {
	//drawLogs("refresh memory : " + $("#memory_holder").innerHeight())
	
	if (firsttimer) {
		var tmp_height = $("#app_holder").height();
		app.scrollDownScreen(tmp_height);
	}
	
	app.getBackgroundStyle();

	
}
app.app_sweeper.init = function () {
		
	$("#sweeper").remove();	
	allow_clicks=false;
	app.app_sweeper.next = 10;
	app.app_sweeper.level = app.localStorage.fartshd_sweeper[0];

	$("#app_holder").css({"opacity":0});
	$("#app_holder").append('<div id="sweeper" class="app gpuAcc"><div id="sweeper_holder" class="gpuAcc"></div></div>');
	$("#sweeper_holder").append('<h3 class="subtitle gpuAcc">Level ' + app.app_sweeper.level +'</h3>');	
	$("#sweeper_holder").append('<table id="table_sweeper" cellspacing="4" class="fart-sweeper gpuAcc" align="center"></table>');
	$("#sweeper_holder").css({"opacity":0}).transition({"opacity":1},duration);
	
	// calculate level
	
	app.app_sweeper.leveling = new Array(null)
	app.app_sweeper.leveling.push(new Array (8,6,3)); // 1
	app.app_sweeper.leveling.push(new Array (10,8,6)); // 2
	app.app_sweeper.leveling.push(new Array (12,10,12)); // 3
	app.app_sweeper.leveling.push(new Array (14,12,16)); // 4
	app.app_sweeper.leveling.push(new Array (16,14,20)); // 5
	app.app_sweeper.leveling.push(new Array (18,16,30)); // 6
	app.app_sweeper.leveling.push(new Array (20,18,40)); // 7

	try {
		var tmp_Xgrid = app.app_sweeper.leveling[app.app_sweeper.level][0]; 
		var tmp_Ygrid = app.app_sweeper.leveling[app.app_sweeper.level][1];
		var tmp_farts = app.app_sweeper.leveling[app.app_sweeper.level][2];
	} catch (e) {}

	
	if (!tmp_Xgrid) {
		// if the player exceed all levels
		var tmp_level = app.app_sweeper.leveling.length - 1;
		tmp_Xgrid = app.app_sweeper.leveling[tmp_level][0]; 
		tmp_Ygrid = app.app_sweeper.leveling[tmp_level][1];
		tmp_farts = app.app_sweeper.leveling[tmp_level][2] + app.app_sweeper.level;
	}	
	// drawLogs("level: "+ app.app_sweeper.level + " - " + tmp_Xgrid + " X " + tmp_Ygrid + " - " +  tmp_farts)
	var mineSweerper = new MineSweeper($( "table.fart-sweeper" ), tmp_Xgrid, tmp_Ygrid, tmp_farts);
	
	$("#app_holder").transition({"opacity":1}, duration*2,function() {
		app.app_sweeper.refresh(true);	
	});
	
}
app.app_sweeper.win = function ()  {
	
	$("#sweeper_holder").css({
		"opacity":0,	
	}).transition({
		"opacity":1,
		},duration);
		
	app.gaplugin.sweeper(app.app_sweeper.level)
	
	$(".fart-sweeper").transition({"background-color":"#008800"},duration*5,function(){
		// just in case
		if(!$("#sweeper").html()) { return; }
		app.alerts("alert","You win!","Would you like to continue to the next level?","Next level","app.app_sweeper.nextlevel()");
	})
	
	
}
app.app_sweeper.lose = function ()  {
	
	app.soundPlay("explosion");
	
	// vibrate if allow
	if (app.localStorage.fartshd_settings[2]) {		
		app.vibrateCasual();		
	}
	
	$("#sweeper_holder").css({
		"opacity":0,	
	}).transition({
		"opacity":1,
		},duration);

	$(".fart-sweeper").transition({"background-color":"#990000"},duration*5,function(){
		// just in case
		if(!$("#sweeper").html()) { return; }
		app.alerts("alert","You lose!","Would you like to play again?","Play again","app.app_sweeper.restartlevel()");	
	})

	
}
app.app_sweeper.clicked = function() {	
	app.app_sweeper.runSound();	
}
app.app_sweeper.nextlevel = function() {	
	if(!$("#sweeper").html()) { return; }
	app.app_sweeper.level++;
	app.localStorage.change_sweeper(app.app_sweeper.level);
	app.app_sweeper.init();	
}
app.app_sweeper.restartlevel = function() {	
	if(!$("#sweeper").html()) { return; }
	app.app_sweeper.init();	
}
app.app_sweeper.runSound = function() {
	//var tmp_l = sounds.length;
	var tmp_snd = Math.ceil(Math.random()*app.app_sweeper.soundObject.length) - 1;
	app.soundArray(app.app_sweeper.soundObject[tmp_snd].mp3);
	
}