// copyright Dr.Peter

function init() {
	if(selected_page == 0) {
		app.home.refresh ();
	} else {
		app.refreshOthers();	
	}
	// if alert is oppened ?
	if (alertOpen) {
		var tmp_height = $(".app").height()>$(window).height()?$(".app").height():$(window).height();
		$("#darken").css({
			"width": $(".app").width(),
			"height": tmp_height
		})
		$("#alert").center();
	}
}
// calculate page and blocks
function calcBlocks () {
	page_width = $("#main_body").width();
	var tmpw = min_width;
	if (page_width > 410) {	tmpw = mid_width; }
	if (page_width > 990) {	tmpw = max_width; }
	var tmp_width = Math.floor((page_width) / tmpw);
	var tmp_block = Math.floor((page_width-(margins*(tmp_width+1))) / tmp_width);
	return(tmp_block);
}
// calculate page and blocks
function calcWidthBlocks () {
	page_width = $("#main_body").width();
	var tmpw = store.app_memory.min_block;
	if (page_width > 560) {	tmpw = store.app_memory.mid_block; }
	if (page_width > 990) {	tmpw = store.app_memory.max_block; }
	var tmp_width = Math.floor((page_width) / tmpw);
	var tmp_block = Math.floor((page_width-(margins*(tmp_width+1))) / tmp_width);
	return(tmp_block);
}
// allow click and refresh scroller
function check_callbacks (was) {
	if (was != all_blocks) { return }
	$("#page_scroller").css({"height": (calcy + widths + margins) + "px"});
	// attach iscroll
	if(page_scroll) {
		page_scroll.destroy();
		page_scroll = null;
	}
	allow_clicks = true;
}
function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
function randomFromInterval(from,to)
{
    return Math.floor(Math.random()*(to-from+1)+from);
}
function differenceNumbers (a,b) { 
	return Math.abs(a - b);
} 
function drawLogs (was) {
	$("#log").append( " | " + was + " " );
	console.log	(was)
}

/* I N I T */
/* ***************************************** */

function refresh_home () {
	$.fx.off = true;
	allow_clicks = false;
	
	if(page_scroll) {
		page_scroll.destroy();
		page_scroll = null;
	}
	

	

	// calc blocks
	var wid = calcBlocks ();	
	$( ".block" ).remove();
	for (var i = 1; i <= all_blocks; i++) {		
		$("#home_menu").append('<div id="block' + i + '" class="block gpuAcc"><div class="icon gpuAcc"></div><div class="title gpuAcc">' + menus[i].name + '</div></div>');
		$("#block" + i).stop(true,false);
		$("#block" + i).css({
			"margin-top": margins,
			"margin-left": margins,
			"display": "block",
			"opacity": 0.01,
			"width": wid + "px",
			"height": wid + "px"
		});
		$("#block" + i).unbind( "click" );
		$("#block" + i).addClass( "" + menus[i].style);
	}
	// draw blocks
	cnt1 = 0;
	drawBlocks()
	
	
	
}

// draw blocks with animation
function drawBlocks ()  {
	var v = 0;
	var h = 0;
	for (var i = 1; i <= all_blocks; i++) {
		if(h>(columns-1)) {
			h=0;
			v++;	
		}
		calcx = (margins*(h+1)) + (widths * h);
		calcy = topMargins + (margins*(v+1)) + (heights*v);
		$("#block" + i).stop(true,false).css({"opacity":0.01});
		$("#block" + i).attr({"name":i});
		$("#block" + i).css({			
			width:100,
			height:100,
			opacity: 0.01,
			}).delay(pause*(i+1)).transition({
				opacity: 1,
		},duration, function () {
			// claback
			$(this).click(function() {
				openBlock(Number($(this).attr("name")));
			});
			check_callbacks(Number($(this).attr("name")));
			//$("#log").append( " / " + $(this).attr("name") + " " );
		});
		mains[i] = new Object({"left":calcx, "top": calcy, "width": widths, "height": heights})
		h++;
		highestZ++;
	}
	// finished
}
// open block
function openBlock (which) {
	
	if(allow_clicks != true) { return }
	allow_clicks = false;
	selected_page = which;

	$("#page").stop(false,false);
	$("#page").transition({"opacity": 0.01},duration, function(){
		$(this).css({"display":"none"});
		if(page_scroll) {
			page_scroll.destroy();
			page_scroll = null;
		}
	});
	
	var move_y = 0;
	if(page_scroll) {
		move_y = page_scroll.y
		iscroll = page_scroll.y;
	}
	
	$("#page_transition").stop(true,true);
	$("#page_transition").css({
		display:"block",
		opacity: 1,
		//left : mains[selected_page].left,
		//top : mains[selected_page].top + move_y,
		//width : mains[selected_page].width,
		//height : mains[selected_page].height,
		left : 0,
		top : 0,
		width : page_width,
		height : page_height,
		perspective: 900, 
		rotateY: 90
	});
	$("#content").css({"display":"block"});
	$("#page_transition").removeClass();
	$("#page_transition").addClass( "" + menus[selected_page].style );
	$("#page_transition").transition({
			left: 0,
			top: 0,
			width: page_width,
			height: page_height,
			perspective: 900, 
			rotateY: 0
		}, duration, function () {
			// run the page	
			$(this).css({perspective: 0,rotateY: 0});
			app.runApp();
		});
}



/* C L O S E - A P P S */
/* ***************************************** */
function closeApp() {
	// open close button
	$("#close").unbind( "click" );
	$("#close").removeAttr("style");
	$(".app").transition({"opacity":0.01},duration/4, function() {
		$(".app").remove();	
	});	
	$("#close").transition({"opacity":0.01},duration/2, function () {
		$(this).css({"display":"none"})
		$("#page_transition").stop(true,true);
		$("#page_transition").css({perspective: 900,rotateY: 180}).transition({
			left: 0,
			top: 0,
			width: page_width,
			height: page_height,
			perspective: 900, 
			rotateY: 90,
			opacity: 0.01
		}, duration/2, function () {
			// close and init
			$(this).css({"display":"none"});
			$("#content").css({"display":"none"});
			selected_page = 0;
			init();
		});
	});	
}



/* OTHER PLUGINS */
/* ***************************************** */
