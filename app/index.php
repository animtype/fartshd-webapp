<!DOCTYPE HTML>
<html>
<head>
<title>Farts HD [funny fart sounds]</title>
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="description" content="A web app to blow away the most serious of days. Farts HD is perfect for connoisseurs or amateur farters, providing a smorgasbord of fart sounds for all occasions">
<meta name="keywords" content="farts, fun, arcade, puzzle, android, ios, app">
<meta name="author" content="dr.animtype@gmail.com">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Farts HD">  
<meta property="og:url" content="http://fartshd.com/app"> 
<meta property="og:title" content="Farts HD [funny fart sounds]">
<meta property="og:image" content="http://fartshd.com/img/farts_webapp.jpg">
<meta property="og:description" content="A rambunctious app to waft away the most serious of days. Farts HD is perfect for connoisseurs or amateur farters, providing a smorgasbord of fart sounds for all occasions">

<link rel="apple-touch-icon" sizes="180x180" href="../favicons/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="../favicons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="../favicons/favicon-16x16.png">
<link rel="manifest" href="../favicons/manifest.json">
<link rel="mask-icon" href="../favicons/safari-pinned-tab.svg" color="#5bbad5">
<link rel="shortcut icon" href="../favicons/favicon.ico">
<meta name="msapplication-config" content="../favicons/browserconfig.xml">
	
<meta name="msapplication-tap-highlight" content="no">
<?php /* <script src="cordova.js"></script> */ ?>
<script src="farts_language.js?v3"></script>
<script src="farts_validation.js?v2"></script>
<script src="farts_var.js?v3"></script>
<script src="farts_hd.js?v3"></script>
<script src="js/jquery.js?v2"></script>
<script src="js/transit.js?v2"></script>

<script src="js/jquery_plugins.js"></script>
<script src="js/iscroll.js"></script>
<script src="js/jcanvas.js"></script>
<script src="js/jhammer.js"></script>
<script src="js/howler.js"></script>
<script src="js/crypt.js"></script>

<script src="app/app_home.js?v8"></script>
<script src="app/app_phonegap.js"></script>
<script src="app/app_storage.js?v1"></script>
<script src="app/app_sound.js"></script>
<script src="app/app_category.js"></script>
<script src="app/app_list.js"></script>
<script src="app/app_fartsays.js"></script>
<script src="app/app_memory.js"></script>
<script src="app/app_counter.js"></script>
<script src="app/app_sweeper.js"></script>
<script src="app/app_hidefart.js"></script>
<script src="app/app_piano.js"></script>
<script src="app/app_puzzle.js"></script>
<script src="app/app_shake.js"></script>
<script src="app/app_mix.js?v1"></script>
<script src="app/app_mix_screens.js?v3"></script>
<script src="app/app_settings.js"></script>
<script src="app/app_info.js"></script>
<script src="app/app_gaplugin.js?v2"></script>
<script src="app/app_vibrate.js"></script>
	
	
<link href="css/farts_fonts.css?v2" type="text/css" rel="stylesheet">
<link href="css/jquery_ui.css?v2" type="text/css" rel="stylesheet">
<link href="css/farts_hd.css?v2" type="text/css" rel="stylesheet">
<script>
 	// Wait for device API libraries to load
    // document.addEventListener("deviceready", onDeviceReady, false);
    // device APIs are available
    function onDeviceReady() {
		/*
		var element = document.getElementById('splashscreen');
        element.innerHTML = element.innerHTML + '<br />'

			'Device Name: '     + device.name     + '<br />' +
			'Device Cordova: '  + device.cordova  + '<br />' +
			'Device Platform: ' + device.platform + '<br />' +
			'Device UUID: '     + device.uuid     + '<br />' +
			'Device Model: '    + device.model    + '<br />' +
			'Device Version: '  + device.version  + '<br />';
		*/
		initjQuery ()	
	}
	
	if (justDesktop) { initjQuery(); }
	
	function initjQuery () {
		$(document).ready(function () {
			loadingLoader ();
			// hack
			$("#splashscreen").append("<p class='loadingtxt' id='loadmsg'>...</p>");
			$("#loadmsg").html("L O A D I N G ...");
			$("#splashscreen").css({"opacity":0.01,"width":"100%", "height":"100%"}).transition({"opacity":1},1000, function () {
				// start adding other scripts
				// this is neccessary because cordova sometimes doesn't fire device ok on script heavy pages
				/*
				loadJS("js/jquery_plugins.js");
				loadJS("js/iscroll.js");
				loadJS("js/jcanvas.js");
				loadJS("js/jhammer.js");
				loadJS("js/howler.js");
				loadJS("js/crypt.js");	
						
				loadJS("app/app_home.js");
				loadJS("app/app_phonegap.js");
				loadJS("app/app_storage.js");
				loadJS("app/app_sound.js");
				loadJS("app/app_category.js");
				loadJS("app/app_list.js");
				loadJS("app/app_fartsays.js");
				loadJS("app/app_memory.js");
				loadJS("app/app_counter.js");
				loadJS("app/app_sweeper.js");
				loadJS("app/app_hidefart.js");
				loadJS("app/app_piano.js");
				loadJS("app/app_puzzle.js");
				loadJS("app/app_shake.js");
				loadJS("app/app_mix.js");
				loadJS("app/app_mix_screens.js");
				loadJS("app/app_settings.js");
				loadJS("app/app_info.js");
				loadJS("app/app_gaplugin.js");
				loadJS("app/app_vibrate.js");
				*/	
				// last one with init included
				loadJS("app/app_splashscreen.js");
			});
		});		
	}
	
	loadJS = function(src) {
     	var jsLink = $("<script type='text/javascript' src='"+src+"'>");
     	$("head").append(jsLink); 
 	};	

	// rainbow loader
	var colorArray = new Array("#5751d9","#ffcd00","#54c7fc","#8451d9","#26b2b0","#0076ff","#ff2851","#2a7d9f","#323232","#44db5e","#ff9600","#c43627","#247679","#05388b","#111111","#5F0000");
	var colorIndex = 0;
	var loadingIndex = 901;
	function loadingLoader () {
		if(!$("#splashscreen").html()) { return; }
		$("#splashscreen").append("<div id='holderld"+loadingIndex+"' style='z-index: "+loadingIndex+"' class='loading gpuAcc'><div id='ld"+loadingIndex+"' class='loader gpuAcc'></div></div>");
		$("#ld" + loadingIndex).css({"width":"10%", "background-color":colorArray[colorIndex]}).transition({"width":"100%"},600,function () {
			$("#holderld" + (loadingIndex-2)).remove(); // remove redundant
			colorIndex++;
			if (colorIndex >= colorArray.length ) { colorIndex = 0; }
			loadingIndex++;			
			loadingLoader ();		
		});	
	}
</script>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-47077018-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  //gtag('config', 'UA-47077018-1');
  gtag('config', 'UA-47077018-1');
</script>
</head>
<body id="main_body" class="color_bg gpuAcc">
<div id="splashscreen" class="truegpuAcc"><span><br />&nbsp;</span></div>
<div id="home_menu" class="gpuAcc"></div>
<div id="header" class="gpuAcc"><div id="app_close" class="icons nohighlight gpuAcc"></div><div id="header_name" class="gpuAcc"></div></div>
<div id="app_holder" class="gpuAcc"></div>
<div id="transitions" class="gpuAcc"></div>
<div id="log" class="gpuAcc"></div>
<div id="darken" class="gpuAcc"></div>
<div id="countdown" class="gpuAcc"></div>
<div id="alert" class="gpuAcc gradient"><div class="txt gpuAcc"></div></div>
<div id="footer">
	 
	<a target="_blank" href="http://twitter.com/home?status=A%20rambunctious%20app%20to%20waft%20away%20the%20most%20serious%20of%20days%20%20http%3A%2F%2Fwww.fartshd.com%2Fapp" class="btns btn_twitter"></a>
	<a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fwww.fartshd.com%2Fapp" class="btns btn_facebook"></a>
    <a target="_self" href="http://fartshd.com/" class=""><span style="font-size: 16px; line-height: 28px; color: #fff; margin: 0px 10px;">Back to fartshd.com</span></a>

</div>
<style type="text/css">
#footer {
	position: fixed;
	right: 0px;
	bottom: 0px;
	background-color: rgba(0,0,0,0.5);
	padding: 10px 8px;	
	z-index: 9999;
}

#footer .btns {
	width: 30px;
	height: 30px;
	display: block;
	margin: 0px 0px 0px 0px;
	background-size: 100%;
	float: right;	
}

.btn_twitter { background-image: url(css/icons/icon_twitter.png); }
.btn_facebook { background-image: url(css/icons/icon_facebook.png); }
.btn_google { background-image: url(css/icons/icon_google.png); }
.btn_info { background-image: url(css/icons/icon_info.png); }

</style>
</body>
</html>