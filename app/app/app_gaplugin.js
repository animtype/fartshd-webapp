// version v2
// copyright Dr.Peter

app.gaplugin = function () { }


app.gaplugin.settings = function (cat) {
	// just simple event
	gtag('event', cat);
	console.log ("GTAG settings: " + cat);	
}
app.gaplugin.events = function ( cat, val) {
	// just simple event
	gtag('event', cat);
	console.log ("GTAG event: " + cat);	
}

app.gaplugin.visits = function (aps) {
	// standar events
	aps = aps?aps:"home";
	gtag('event', menus[selected_page].app);
	console.log ("GTAG visit: " +  menus[selected_page].app);	
}

app.gaplugin.change_skin = function (skin) {
	// standar events
	skin = skin?skin:"ios";	
	app.gaplugin.settings ("change-skin-"+skin);	
}
app.gaplugin.memory = function (val) {
	// standar events
	val = val?val:"1";	
	app.gaplugin.events ("memory-level-"+val);	
}
app.gaplugin.hidefart = function (val) {
	// standar events
	val = val?val:"1";
	// raund to 500
	val = Math.round(val / 500) * 500;
	app.gaplugin.events ("hidefart-level-"+val);	
}
app.gaplugin.sweeper = function (val) {
	// standar events
	val = val?val:"1";
	app.gaplugin.events ("sweeper-level-"+val);	
}
app.gaplugin.fartsays = function (val) {
	// standar events
	val = val?val:"1";	
	app.gaplugin.events ("fartsays-level-"+val);	
}
app.gaplugin.puzzle = function (val,num) {
	// standar events
	val = val?val:"1";
	num = num?num:"3"; //3,4,5	
	app.gaplugin.events ("puzzle-level-"+num);	
}

