<!doctype html>
<html ⚡>
<head>
<?php
/* def functions */
function is_localhost() {
    $whitelist = array( '127.0.0.1', '::1', "localhost" );
    if( in_array( $_SERVER['REMOTE_ADDR'], $whitelist) )
        return true;
}
if (is_localhost()) {
	$actual_link = 		"http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
	$farts_link = 		"http://localhost/fartshd/";
	$audio_farts = 		"app/mp3";
	$app_farts =		"http://localhost/fartshd/app";
	$mix_farts = 		"http://localhost/mixfartshd/";
} else {
	$actual_link = 		"http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
	$farts_link = 		"http://fartshd.com/";
	$audio_farts = 		"https://anim.tech/media/mp3";
	$app_farts =		"http://fartshd.com/app";
	$mix_farts = 		"http://mix.fartshd.com/";
}
	$google_play =		"https://play.google.com/store/apps/details?id=com.animtypecom.fartshd";
	$facebook = 		"https://www.facebook.com/Farts-HD-1446433675580200/"
?>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
<title>Funny Farts HD [free funny fart sound & online games]</title>
<link rel="canonical" href="<?php echo $actual_link; ?>">	
<meta property="fb:app_id" content="963224253825414">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Funny Farts HD [free funny fart sound & online games]">  
<meta property="og:url" content="<?php echo $actual_link; ?>"> 
<meta property="og:title" content="Funny Farts HD [free funny fart sound & online games]">
<meta property="og:image" content="img/farts_webapp.jpg">
<meta property="og:description" content="A rambunctious app to waft away the most serious of days. Farts HD is perfect for connoisseurs or amateur farters, providing a smorgasbord of fart sounds for all occasions. Farts HD is free and without ads. Enjoy!"> 
	
<link rel="apple-touch-icon" sizes="180x180" href="favicons/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="favicons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="favicons/favicon-16x16.png">
<link rel="manifest" href="favicons/manifest.json">
<link rel="mask-icon" href="favicons/safari-pinned-tab.svg" color="#5bbad5">
<link rel="shortcut icon" href="favicons/favicon.ico">
<meta name="msapplication-config" content="favicons/browserconfig.xml">
<meta name="theme-color" content="#ffffff">
	
<script async src="https://cdn.ampproject.org/v0.js"></script>
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>

<?php /* components */ ?>
<script async custom-element="amp-social-share" src="https://cdn.ampproject.org/v0/amp-social-share-0.1.js"></script>
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
<script async custom-element="amp-audio" src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"></script>
<script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
	
<?php 
/* CUSTOM CSS */?>
<style amp-custom>
body{font-family:Segoe,"Segoe UI","DejaVu Sans","Trebuchet MS",Verdana,"sans-serif";font-size:18px;background:#f4f5f6}*{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}a{text-decoration:none;color:#3d92c9}a:hover,a:focus{text-decoration:none}::-webkit-input-placeholder{color:#bbb}:-ms-input-placeholder{color:#bbb}::-moz-placeholder{color:#bbb;opacity:1}:-moz-placeholder{color:#bbb;opacity:1} .grey{color:#f4f5f6} .gold{color:#daa520} .teal{color:#08b170} .dark{color:#182024} .lead1{color:#5c58dc} .lead2{color:#534fda} .lead3{color:#4743d8} .midium{color:#aaaaaa} .transition {-webkit-transition:all 0.6s;-moz-transition:all 0.6s;-ms-transition:all 0.6s;transition:all 0.6s;}
	
header{position:relative;width:100%;display:block;margin:0;padding:0;background:#4743d8;padding:48px 16px 200px 16px;background-image:url(img/header.jpg);-webkit-background-size:cover;-moz-background-size:cover;-o-background-size:cover;background-size:cover}footer{width:100%;display:block;margin:0;padding:0;background:#182024;padding:32px 16px 96px 16px}.padding{padding:0 16px}.innerSmall{clear:both;width:100%;max-width:600px;margin:0 auto}.inner{clear:both;width:100%;max-width:960px;margin:0 auto}.center{text-align:center}.innerCenter{width:100%;text-align:center}.gallery{background:#182024;padding:8px 0 0}h1,h2,h3,h4,p,ul{font-weight:300;line-height:1em;margin:0}h1{font-size:2.8em}h2{font-size:2.1em}h3{font-size:1.6em}p{font-size:1em;line-height:1.2em;font-weight:400}
	
.small{font-size:.8em}.arrow{background:#534fda;width:72px;height:72px;line-height:72px;vertical-align:middle;border-radius:50%;display:inline-block;margin-right:16px}.forArrow{height:72px;line-height:72px;vertical-align:middle;display:inline-block}.headerFleha{position:absolute;z-index:1;left:0;bottom:-1px;width:100%;height:150px;display:block;-webkit-background-size:cover;-moz-background-size:cover;-o-background-size:cover;background-size:cover;pointer-events:none}.spotFleha{position:absolute;z-index:1;left:0;top:-1px;width:100%;height:150px;display:block;-webkit-background-size:cover;-moz-background-size:cover;-o-background-size:cover;background-size:cover;pointer-events:none}.tile{position:relative;width:220px;height:340px;border-radius:10px;background:#4743d8;display:inline-block;margin:0 8px 16px}.tile img{border-radius:10px;border:0}.tile span{width:100%;display:block;padding:0 8px;font-weight:300}.tile span.big{font-size:1.8em}.tile::before{content:"";position:absolute;left:0;top:20px;width:220px;height:130px;display:block;z-index:2;background:-moz-linear-gradient(top,rgba(92,88,220,0) 0%,rgba(71,67,216,1) 100%);background:-webkit-linear-gradient(top,rgba(92,88,220,0) 0%,rgba(71,67,216,1) 100%);background:linear-gradient(to bottom,rgba(92,88,220,0) 0%,rgba(71,67,216,1) 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#005c58dc',endColorstr='#4743d8',GradientType=0)}.tile::after{content:"";position:absolute;z-index:3;left:50%;top:48px;margin-left:-36px;background:none;width:72px;height:72px;border-radius:50%;display:block;border:4px solid #f4f5f6;-webkit-transition:all .6s;-moz-transition:all .6s;-ms-transition:all .6s;transition:all .6s}.spot{position:relative;background:#4743d8;padding:32px}.decor{width:.8em;height:.8em;line-height:1em;background:#08b170;display:inline-block;border-radius:50%;margin:0 8px}.badge{width:42px;height:42px;line-height:38px;vertical-align:middle;display:block;border-radius:50%;text-align:center;position:absolute;right:-8px;top:-8px;z-index:11;font-size:12px;font-weight:700;border:2px solid #f4f5f6}.badge.new{background-color:#c8202a;color:#f4f5f6}.badge.old{background-color:#413f40;color:#f4f5f6}.top16{margin-top:16px}.top32{margin-top:32px}.top48{margin-top:48px}.top96{margin-top:96px}.farting{position:relative;display:block;position:relative;margin-left:50%}.fartingWoman{position:absolute;left:-200px;top:-120px;z-index:8}.fartingAnimation{position:absolute;left:-200px;top:51px;z-index:9}a:hover .arrow,a.tile:hover::after{-webkit-transform:rotate(360deg) scale(1.2);-moz-transform:rotate(360deg) scale(1.2);transform:rotate(360deg) scale(1.2);-webkit-transform-origin:center;-moz-transform-origin:center;transform-origin:center}.textShadow{text-shadow:0 0 8px rgba(0,0,0,0.5)}.badge,.tile::after,.shadow,.arrowImage{-webkit-box-shadow:0 0 8px rgba(0,0,0,0.5);-moz-box-shadow:0 0 8px rgba(0,0,0,0.5);box-shadow:0 0 8px rgba(0,0,0,0.5)}
	
.arrow,.tile::after{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAABrVBMVEUAAAACAgIFBQUHBwcJCQgKCgoMDAwMDA0NDQ4PDw8WFhYgICAhISEiIiIjIyMvLy8xMTEyMjI6Ojo7OztGRkZISElPUFFTU1RUVVVVVVVVVlZdXV1iYmNlZmacnJ2fn5+oqKiqqqqrq6uvr6+1tbW2trb///9UVFRXV1e1tbW1tre2t7i1tbaxsrPa29sYGBgoKCivsLCxsrLExcatra2np6irq6yPkJCnqKhPUFFiYmNlZmZUVVVTU1RVVlZdXV1UVFRXV1daWlv///+cnJ3////P0NH////W19ixsrO1tba1tre2t7irq6ytra2wsbKxsrKnp6inqKiPkJD////////09fb////4+Pj6+vr19fX////+///////o6end3t/p6uvo6en////////////+/v7////////4+Pj////19fX////19fX6+vr////09fb////7+/v////////////////////////6+/z7/P329/j////7/Pz5+vv3+Pn4+fr4+fr19vfz9PXz9Pb3+Pnz9PXz9Pb09fb19vf3+Pn4+fr5+vv7/Pz7/P38/f7XqkVjAAAAhXRSTlMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQMKCgsMDA0ODg4ODxISFBQXFxcYGRkZGhodISMwQUFESkpKSktLS0tMTE1hYmNjZGRlaW1zfKamqausra6ur7CwsbGysrKztNfk5ebn6Onq7O7w8/T29vf4+vr896+XwAAAAVVJREFUWMPt1lVbAlEQBuARFUWxu7u7u7sLC1sQxU6we1kU9Te7cy7g8ZbPy/P9gPc5Z2bO7FLhP4UkJCEJSUhCEvqb+ODq1bowvcGbPD+hqKpN906NnrzJ8RPq3fCoLmujAYbWfhRVVSzNISjUf/KpatJ2gw6EwtuP3UKqB6E46jxQWLJUYFAsUYfdxZK1HIWo2863U3fLUIh69j40yG0rDQQh6tr38JlstaGUC0HUevillVybzKAsDKK2o2/Ru6Z8EKKWrXeWTvtQKHFdQHcDIJSxfMPO5VwJBqWb77nYVxNgsdPMD9x+xzTY/uKlRx5I5xg4kEXzL3we5zj4RJJMb1xnxyi4RlJNr+xcjICLLXmR76WcT4KLLXPhSTgz6KpdeRZzOAsv/6FbMYf45yhh8FrMIQxF64bPpgJ8DmX7CaUYYyqNEZG+FMj/IwlJSEISkpAvv6/oGtfL3TYOAAAAAElFTkSuQmCC);background-position:center;background-repeat:no-repeat}.headerFleha{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiBmaWxsPSIjZjRmNWY2Ij48cG9seWdvbiBwb2ludHM9IjAsMjAwIDIwMCwyMDAgMjAwLDAgIi8+PC9zdmc+)}.spotFleha{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiBmaWxsPSIjZjRmNWY2Ij48cG9seWdvbiBwb2ludHM9IjAsMCAwLDIwMCAyMDAsMCIvPjwvc3ZnPg==)}.amp-carousel-button{border:2px solid #f4f5f6;background-color:#4743d8}
	
	@media (max-width:780px) {
		.tile {zoom: 0.9; margin: 0px 4px 16px 4px; }		
		
	}
	@media (max-width:520px) {
		.farting { margin-left: 50%; }
		.farting small { display: none; }
		.tile {zoom: 0.8; }		
	}
	@media (max-width:420px) {
		.tile {zoom: 0.7; }		
	}
	
</style>
<body>
<header>
	<section class="innerSmall">
		<h1 class="grey textShadow">Funny Farts <span class="gold"><strong>HD</strong></span></h1>
		<h2 class="grey top16 textShadow">A rambunctious app to waft away the most serious of days</h2>
		<p class="top32 grey textShadow">
			<span class="decor"></span>Bottom burp, butt bombs, ass blast, trouser trumpet, air biscuit, frump, grunt, sphincter whistles - whatever you call them, Farts HD is the only fart app you could ever need.
		</p>
		<p class="top32"><a href="<?php echo $app_farts; ?>" class="grey"><span class="arrow arrowImage transition"></span><span class="forArrow">Start farting!</span></a></p>
	</section>
	<div class="headerFleha transition"></div>
</header>
	
<main>
	<section class="inner top32">
		<h1 class="padding">Funny Farts <span class="gold"><strong>HD</strong></span></h1>
		<h2 class="padding">Free funny fart sounds & online games</h2>
		<p class="innerCenter top32 transition">
			<a href="<?php echo $app_farts; ?>" class="tile transition">				
				<amp-img src="img/tile-smartphone.jpg" width="220" height="150" layout="fixed" alt="smartphone"></amp-img>
				<span class="grey">Let’s play it on</span>
				<span class="grey top16 big">Smartphone</span>
				<span class="grey top32">Supported all screen sizes and models. Enjoy!</span>
				<small class="badge new">v2.1</small>
			</a>
			<a href="<?php echo $app_farts; ?>" class="tile transition">				
				<amp-img src="img/tile-desktop.jpg" width="220" height="150" layout="fixed" alt="smartphone"></amp-img>
				<span class="grey">Let’s play it on</span>
				<span class="grey top16 big">Desktop</span>
				<span class="grey top32">Play it on Mac, PC, Linux Google, etc...</span>
				<small class="badge new">v2.0</small>
			</a>
			<a href="<?php echo $google_play; ?>" class="tile transition">				
				<amp-img src="img/tile-play.jpg" width="220" height="150" layout="fixed" alt="smartphone"></amp-img>
				<span class="grey">Get it on</span>
				<span class="grey top16 big">Google Play</span>
				<span class="grey top32">For all android users, here is our gift for you.</span>
				<small class="badge old">v1.0</small>
			</a>
			<a href="<?php echo $facebook; ?>" class="tile transition">				
				<amp-img src="img/tile-facebook.jpg" width="220" height="150" layout="fixed" alt="smartphone"></amp-img>
				<span class="grey">Be social on</span>
				<span class="grey top16 big">Facebook</span>
				<span class="grey top32">Share it, Like it, Post it. Not necessary in that order.</span>
			</a>
		</p>
	</section>
	
	<section class="top32 spot">
		<div class="spotFleha transition"></div>
			<div class="farting top96 grey">
				<h2>Featured farts</h2>
				<p class="top32 small">
					<amp-audio width="100" src="<?php echo $audio_farts; ?>/10015.mp3" controlsList="nodownload"></amp-audio>
					 &nbsp; <small>Ocean Liner Titanic</small><br>
					<amp-audio width="100" src="<?php echo $audio_farts; ?>/10006.mp3" controlsList="nodownload"></amp-audio> 
					 &nbsp; <small>Start a Harley</small><br>
					<amp-audio width="100" src="<?php echo $audio_farts; ?>/10004.mp3" controlsList="nodownload"></amp-audio> 
					 &nbsp; <small>After Burrito</small><br>
					<amp-audio width="100" src="<?php echo $audio_farts; ?>/10028.mp3" controlsList="nodownload"></amp-audio> 
					 &nbsp; <small>Rally Car</small><br>					
					<amp-audio width="100" src="<?php echo $audio_farts; ?>/10070.mp3" controlsList="nodownload"></amp-audio> 
					 &nbsp; <small>Liquid Death</small><br>
					<amp-audio width="100" src="<?php echo $audio_farts; ?>/10104.mp3" controlsList="nodownload"></amp-audio> 
					 &nbsp; <small>Old Lasagna Bolognese</small><br>
				</p>
				<amp-img class="fartingWoman" src="img/farting-woman.png" width="175" height="400" layout="fixed" alt="farting woman"></amp-img>
				<amp-img class="fartingAnimation" src="img/farts_woman-animation.gif" width="77" height="101" layout="fixed" alt="farting animation"></amp-img>
			</div>
	</section>
	
	<section class="inner padding top48">
		<h2>Free funny fart sounds & online games</h2>
		<p class="top32"><span class="decor"></span>MIX YOUR FARTS<span class="decor"></span>MALE FARTS<span class="decor"></span>FEMALE FARTS<span class="decor"></span>OLD MEN FARTS<span class="decor"></span>HIDE FARTS<span class="decor"></span>FARTS MEMORY<span class="decor"></span>FART SAYS<span class="decor"></span>FART SWEEPER<span class="decor"></span>FART PUZZLE<span class="decor"></span>COMPOSE YOUR FARTS ... and many more...</p>
		
		<p class="top16">Featuring a variety of backdoor trumpet noises, fart games and even a unique Fart Composer - putting the power of the fart in your hands!</p>
		<p class="top16">Easy to use, intuitive, colourful, no adverts and lots of fun for all the family. Farts HD will keep you laughing for days.</p>
		<p class="top32"><a href="<?php echo $app_farts; ?>" class="lead3"><span class="arrow arrowImage transition"></span><span class="forArrow">Start farting!</span>
	</section>
	
	<section class="inner padding top48">
		<amp-youtube width="1280" height="720" layout="responsive" data-videoid="xUkjG0kaGkM"></amp-youtube>
	</section>
	
	<section class="top48 gallery">
		<amp-carousel height="300" layout="fixed-height" type="carousel">
			<amp-img src="gallery/img1.jpg" width="403" height="300" alt="a fart app"></amp-img>
			<amp-img src="gallery/img2.jpg" width="403" height="300" alt="a fart app"></amp-img>
			<amp-img src="gallery/img3.jpg" width="403" height="300" alt="a fart app"></amp-img>
			<amp-img src="gallery/img4.jpg" width="403" height="300" alt="a fart app"></amp-img>
			<amp-img src="gallery/img5.jpg" width="403" height="300" alt="a fart app"></amp-img>
			<amp-img src="gallery/img6.jpg" width="403" height="300" alt="a fart app"></amp-img>
			<amp-img src="gallery/img7.jpg" width="403" height="300" alt="a fart app"></amp-img>
			<amp-img src="gallery/img8.jpg" width="403" height="300" alt="a fart app"></amp-img>
			<amp-img src="gallery/img10.jpg" width="403" height="300" alt="a fart app"></amp-img>
			<amp-img src="gallery/img11.jpg" width="403" height="300" alt="a fart app"></amp-img>
			<amp-img src="gallery/img12.jpg" width="403" height="300" alt="a fart app"></amp-img>
		</amp-carousel>
	</section>
</main>
	
<footer>
	<section class="inner center">
		<p class="grey">We love Cookies</p>
		<p class="midium small">
			We may use cookies to optimize content and reading experience. You can turn off the use of cookies at anytime by changing your specific browser settings. <a href="https://www.digitaltrends.com/computing/how-to-delete-cookies-in-chrome-firefox-safari-and-ie/" title="Cookies" target="_blank">[ I would like to turn off my cookies on this site ]</a>
		</p>		
		<p class="top16 center">
			<amp-social-share class="socials"  width="40" height="36" type="facebook"	data-param-app_id="963224253825414"></amp-social-share>
			<amp-social-share class="socials"  width="40" height="36" type="gplus"></amp-social-share>
			<amp-social-share class="socials"  width="40" height="36" type="tumblr"></amp-social-share>
			<amp-social-share class="socials"  width="40" height="36" type="twitter"></amp-social-share>
			<amp-social-share class="socials"  width="40" height="36" type="whatsapp"></amp-social-share>
		</p>
		<p class="top16 small grey">
			&copy;2014-<?php echo date("Y"); ?> AnimType, special thanks to <a href="https://anim.tech">anim.tech</a>
			<br>
			&nbsp;|&nbsp;
			<a href="<?php echo $farts_link; ?>">Farts HD</a>
			&nbsp;|&nbsp;
			<a href="<?php echo $mix_farts; ?>">MIX Farts HD</a>
			&nbsp;|&nbsp;
			<a href="<?php echo $farts_link; ?>privacy_policy.php">Privacy Policy</a>
			&nbsp;|&nbsp;
			<a href="<?php echo $farts_link; ?>terms.php">Terms and Conditions</a>
			&nbsp;|&nbsp;
			<a href="<?php echo $farts_link; ?>support.php">Info&nbsp;&&nbsp;Support</a>
			&nbsp;|&nbsp;
	</p>
	</section>	
</footer>
<amp-analytics type="googleanalytics">
<script type="application/json">
{
  "vars": {
    "account": "UA-47077018-1"
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    }
  }
}
</script>
</amp-analytics>
</body>
</html>