// copyright Dr.Peter

var loadingDelay = 1000;
function loadingApp () {	
	selected_page = 0;
	// check phonegap
	app.phonegap();
	// check local storage
	app.localStorage.read();
	// load skin
	app.changeSkin ();
	// init google
	app.gaplugin ();
	// add init event
	$(window).resize(function() { init(); });
	// add version
	$("#splashscreen").append('<div class="appversion">'+appversion+'</div>');
	// go to splash screen
	fadeinApp_splashscreen ();


}
function returnApp_commercial () {
	var commercial = true;	
	if (app.localStorage.fartshd_appversion == appversion) { commercial = false; };	
	if (app.platform == "ios") { commercial = false; };
	if (app.platform == "winphone") { commercial = false; };
		
	// no commercial right now !!!
	if (!commercialAllow) { commercial = false; }	
	return commercial;	
}


function fadeinApp_splashscreen () {

		$("#splashscreen").transition({"opacity":1},loadingDelay,function() {
					
			if (returnApp_commercial()) {
				// comercial if avaliable
				loadingDelay = 0;
				var tmp_title = lng[language].update_title;
				var tmp_text = lng[language].update_news1 + lng[language].update_news2;
				var tmp_buttons = "OK";
				var tmp_actions = "fadeoutApp_splashscreen()";
				app.alerts("confirm",tmp_title, tmp_text, tmp_buttons,tmp_actions);
			} else {
				// already check the version
				fadeoutApp_splashscreen ()
			}
		});
}

function fadeoutApp_splashscreen () {
	if (!app.forcePreloadSounds) {	
		kill_splashscreen(); 
	} else {		
		// howler audio
		// preload sound
		console.log ("desktop audio ********** " + app.forcePreloadSounds + " : " + app.platform)
		// to moram popraviti
		// $("#splashscreen").append("<p class='loadingtxt' id='loadmsg'>...</p>");
		app.preloadAllSounds();
	}
}

function kill_splashscreen () {
	$("#splashscreen").css({"opacity":1}).delay(loadingDelay).transition({"opacity":0},1000,function() {
		app.home();	
		app.localStorage.change_appversion (appversion);
		$(this).remove();
	});
}

// start loading
loadingApp ();

