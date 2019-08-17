<?php ?>
<script>
$( document ).ready(function() {
	$(window).resize(function() {
		refreshWin ();
	});
  	refreshWin ();
});

var galw = 1024;
var galh = 768;
var youtubew = 1280;
var youtubeh = 720;
var mrg = 40;
var pics = 8;
var myScroll = null;

function refreshWin () {
	var tmp_width = $("#gallery_wrapper").width()-mrg;
	var percent = (100*tmp_width/galw);
	var tmp_height = Math.floor(galh*percent/100);
	var you_perc = (100*tmp_width/youtubew);
	var you_width = tmp_width;
	var you_height = tmp_height-50;	
	console.log(tmp_width + " ;;; " + percent);
	$("#gallery").css({"height":tmp_height, "width":tmp_width});
	$("#scroller").css({"height":tmp_height, "width":((tmp_width*pics) + 10)});
	$(".gallery").css({"height":tmp_height, "width":tmp_width});
	$(".youtuber").css({"height":you_height, "width":you_width});
	$(".youtuber").attr({"height":you_height, "width":you_width})
	
	myScroll = new IScroll('#gallery', {  snap: true,  scrollX: true, scrollY: false, momentum: false });
	
	// <span onclick="myScroll.prev()">back</span>&nbsp;|&nbsp;<span onclick="myScroll.next()">next</span>
}

</script>

<h3 id="gallery_wrapper">
	<div id="gallery">
    	<ul id="scroller">
       
        	<li class="gallery" style="background-image: none; background-color: #000">
            <iframe class="youtuber" style="margin: 0px auto;" width="640" height="360" src="https://www.youtube.com/embed/xUkjG0kaGkM" frameborder="0" allowfullscreen></iframe>
           	<br /><br />
            <label onclick="myScroll.next()" class="blue">Go to gallery >></label>
           
            </li>
            <li class="gallery" style="background-image: url(gallery/1024x768_7.jpg)">&nbsp;</li>
        	<li class="gallery" style="background-image: url(gallery/1024x768_0.jpg)">&nbsp;</li>
            <li class="gallery" style="background-image: url(gallery/1024x768_1.jpg)">&nbsp;</li>
            <li class="gallery" style="background-image: url(gallery/1024x768_2.jpg)">&nbsp;</li>
            <li class="gallery" style="background-image: url(gallery/1024x768_3.jpg)">&nbsp;</li>
            <li class="gallery" style="background-image: url(gallery/1024x768_4.jpg)">&nbsp;</li>
            <li class="gallery" style="background-image: url(gallery/1024x768_5.jpg)">&nbsp;</li>
            <li class="gallery" style="background-image: url(gallery/1024x768_6.jpg)">&nbsp;</li>
    	</ul>
    </div>
    <div id="gallery_navigation" class="blue" >
    	<label onclick="myScroll.prev()">back</label>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<label onclick="myScroll.next()">next</label>
    </div>
</h3>
