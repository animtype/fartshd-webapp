// copyright Dr.Peter

app.phonegap = function () {
	// globals
	app.platform = "desktop";
	app.soundFolder = "";
	app.testing = false;
	app.highPlatform = true;
	app.topPadding = 0;
	app.fileExtension = "";
	app.gpuacc = false;
	app.mediaObject = false;
	app.delayForSounds = 50;
	app.forcePreloadSounds = false;

	try {
		// check the platform
		var platform = device.platform	
		app.platform = String(platform?platform:"desktop").toLowerCase();
	} catch (e) {}
	
	
	// ************************************* //
	// ANDROID
	// ************************************* //
	if (app.platform == "android") {
		app.mediaObject = true;
		app.delayForSounds = 50;
		app.gpuacc = false;
		app.testing = false;		
		app.soundFolder = "/android_asset/www/";
		try {			
			// add buck button
			document.addEventListener("backbutton", onBackKeyDown, false);

			// set a quality parameter for android
			app.highPlatform = Math.min($(window).height(),$(window).width())>330?true:false;
			
		} catch (e) {}	
	}
	
	
	
	// ************************************* //
	// WINDOWS 8 phone
	// ************************************* //
	if ((app.platform == "win32nt") || (app.platform == "winphone") || (app.platform == "windows 8") || (app.platform == "windows8") || (app.platform == "windows")) {
		app.mediaObject = true;
		app.delayForSounds = 0;
		app.gpuacc = true;
		app.platform = "winphone"
		app.testing = false;		
		app.soundFolder = "www/";
		app.topPadding = 0;
		try {			
			// add buck button
			document.addEventListener("backbutton", onBackKeyDown, false);			
		} catch (e) {}	
		
		// remove fart says
		var sliceme = false;
		for (var t in menus) {
			if (menus[t].app == "fartsays")	{ sliceme = t;}
		}
		if (sliceme) { menus.splice(sliceme, 1);}
	
	}
	



	// ************************************* //
	// iOS
	// ************************************* //
	if (((app.platform == "ios")) || (app.platform == "iphone") || (app.platform == "ipod") || (app.platform == "ipad")) {
		app.mediaObject = true;
		app.delayForSounds = 50;
		app.platform = "ios"
		app.gpuacc = true;
		app.testing = false;		
		app.soundFolder = "";
		app.topPadding = 0;		
	}		
	

	// ************************************* //
	// DESKTOP
	// ************************************* //
	if (app.platform == "desktop") {		
		app.mediaObject = false;
		app.delayForSounds = 50;
		app.gpuacc = false;
		app.testing = true;
		app.soundFolder = "";
		app.topPadding = 0;
		app.forcePreloadSounds = true;
		
		// remove shake
		var sliceme = false;
		for (var t in menus) {
			if (menus[t].app == "shake")	{ sliceme = t;}
		}
		if (sliceme) { menus.splice(sliceme, 1);}
	
	}
	
	
	
	
	
	/* testing */
	if (isTesting) {
		app.gpuacc = false;
		app.testing = true;
		app.soundFolder = "";	
	}
	// is local sounds
	try {
		if (
			(window.location == "http://www.fartshd.com/") ||
			(window.location == "http://fartshd.com/") ||
			(window.location == "http://farts-hd.com/") ||
			(window.location == "http://webapp.fartshd.com/") ||
			(window.location == "http://www.farts-hd.com/") ||
			(window.location == "http://localhost/farts/") ||
			(window.location == "http://192.168.1.101/farts/") ||
			(window.location == "http://192.168.1.102/farts/") ||
			(window.location == "http://192.168.1.103/farts/") ||
			(window.location == "http://192.168.1.104/farts/") ||
			(window.location == "http://192.168.1.105/farts/") ||
			(window.location == "http://192.168.1.106/farts/") ||
			(window.location == "http://192.168.1.107/farts/") ||
			(window.location == "http://192.168.1.108/farts/") ||
			(window.location == "http://192.168.1.109/farts/")
		
		) {
			app.soundFolder = "";
		}
	} catch (e) {}
	
	
	
	// back button if exist
	function onBackKeyDown() {		
		// for app: mix
		if (app.app_mix.allowBack && $("#mix_holder").html()) {
			$("#mix_screen_close").click();
			return;
		}
		console.log ("back press")		
		// check if it is not on first page
		if(allow_clicks && !alertOpen) {
			// drawLogs("BACK")		
			if (selected_page == 0) {
				// close app on back
				// app.alerts("confirm",lng[language].close_app,lng[language].close_alert,[lng[language].yes,lng[language].no],["app.closeApp()","app.alertsClose()"]);
				app.makeTransition(0);
				app.closeApp();
			} else {				
				app.makeTransition(0);
			}
			return;
			// $(this).css({"opacity":0,"display":"none"});
		} else {
			
		}
	}
	
	
	// ************************************* //
	// GPU ACC
	// for selected devices
	// ************************************* // 
	if (app.gpuacc) {
		console.log("css/gpuacc.css ")
		var  num = Math.random()*10000;
		// don't do a gpuAcc
		// too many problems
		// $("head").append('<link href="css/gpuacc.css" type="text/css" rel="stylesheet">');
	}
	
	
	// ************************************* //
	// SHARE LINK
	// ************************************* //
	app.shareLink = "http://mix.fartshd.com/?mix=";
	app.shareTitle = "Farts mix created by FartsHD App ";
	app.shareImg = "http://mix.fartshd.com/img/fartsicon.png";
	
	// FACEBOOK - web only
	// https://www.facebook.com/sharer/sharer.php?u=URL
	app.shareFacebook = new Object ();
	app.shareFacebook.url = "https://www.facebook.com/sharer/sharer.php?u=";
	app.shareFacebook.domain = "http%3A%2F%2Fmix.fartshd.com%3Fmix%3D";
	
	// GOOGLE+ - web only
	// https://plus.google.com/share?url=http%3A%2F%2Fexample.com
	app.shareGoogle = new Object ();
	app.shareGoogle.url = "https://plus.google.com/share?url=";
	app.shareGoogle.domain = "http%3A%2F%2Fmix.fartshd.com%3Fmix%3D";
	
	// TWITTER - web only
	// https://twitter.com/intent/tweet?url= &text=
	app.shareTwitter = new Object ();
	app.shareTwitter.url = "https://twitter.com/intent/tweet?url=";
	app.shareTwitter.domain = "http%3A%2F%2Fmix.fartshd.com%3Fmix%3D";
	

	console.log ("****************************");
	console.log ("platform : " + app.platform);
	console.log ("media : " + app.mediaObject);
	console.log ("preload : " + app.forcePreloadSounds);
	console.log ("****************************");
	
	/*
	$("#splashscreen").append("<br>platform : " + app.platform);
	$("#splashscreen").append("<br>media : " + app.mediaObject);
	$("#splashscreen").append("<br>preload : " + app.forcePreloadSounds);
	*/

}