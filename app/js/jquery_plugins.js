/* J Q U E R Y */
/* ***************************************** */
//jquery center
jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
    return this;
}
// jquery remove class
jQuery.fn.removeCss = function (css) {
    var properties = [];
    var is = $.type(css);

    if (is === 'array') properties = css;
    if (is === 'object') for (var rule in css) properties.push(rule);
    if (is === 'string') properties = css.replace(/,$/, '').split(',');

    return this.each(function () {
        var $this = $(this);
        $.map(properties, function (prop) {
            $this.css(prop, '');
        });
    });
};
//jquery timer
/*
timer.set(options);
timer.play(reset);  // Boolean. Defaults to false.
timer.pause();
timer.stop();  // Pause and resets
timer.toggle(reset);  // Boolean. Defaults to false.
timer.once(time);  // Number. Defaults to 0.
timer.isActive  // Returns true if timer is running
timer.remaining // Remaining time when paused
*/
jQuery.timer = function(func, time, autostart) {	
	this.set = function(func, time, autostart) {
		this.init = true;
		if(typeof func == 'object') {
			var paramList = ['autostart', 'time'];
			for(var arg in paramList) {if(func[paramList[arg]] != undefined) {eval(paramList[arg] + " = func[paramList[arg]]");}};
			func = func.action;
		}
		if(typeof func == 'function') {this.action = func;}
		if(!isNaN(time)) {this.intervalTime = time;}
		if(autostart && !this.active) {
			this.active = true;
			this.setTimer();
		}
		return this;
	};
	this.once = function(time) {
		var timer = this;
		if(isNaN(time)) {time = 0;}
		window.setTimeout(function() {timer.action();}, time);
		return this;
	};
	this.play = function(reset) {
		if(!this.active) {
			if(reset) {this.setTimer();}
			else {this.setTimer(this.remaining);}
			this.active = true;
		}
		return this;
	};
	this.pause = function() {
		if(this.active) {
			this.active = false;
			this.remaining -= new Date() - this.last;
			this.clearTimer();
		}
		return this;
	};
	this.stop = function() {
		this.active = false;
		this.remaining = this.intervalTime;
		this.clearTimer();
		return this;
	};
	this.toggle = function(reset) {
		if(this.active) {this.pause();}
		else if(reset) {this.play(true);}
		else {this.play();}
		return this;
	};
	this.reset = function() {
		this.active = false;
		this.play(true);
		return this;
	};
	this.clearTimer = function() {
		window.clearTimeout(this.timeoutObject);
	};
	this.setTimer = function(time) {
		var timer = this;
		if(typeof this.action != 'function') {return;}
		if(isNaN(time)) {time = this.intervalTime;}
		this.remaining = time;
		this.last = new Date();
		this.clearTimer();
		this.timeoutObject = window.setTimeout(function() {timer.go();}, time);
	};
	this.go = function() {
		if(this.active) {
			this.action();
			this.setTimer();
		}
	};
	
	if(this.init) {
		return new $.timer(func, time, autostart);
	} else {
		this.set(func, time, autostart);
		return this;
	}
};


(function( $ ){
 	/* ***************************************************** */
 	/* RANDOM PLUGINS */ 
 	/* ***************************************************** */
	// I get a random value between the min and max values
	// (inclusive). The min and max values are expected to be
	// interger values.
	$.randRange = function( minValue, maxValue ){
		var delta = (maxValue - minValue); 
		var randomValue = Math.floor( Math.random() * delta );
		return( minValue + randomValue );
	};
 
	/* ***************************************************** */ 
	// I repeat the given string the given number of times.
	$.repeatString = function( value, count ){
		return(
			(new Array( count + 1 )).join( value )
		);
	}; 
	/* ***************************************************** */ 
	// I filter the given collection down to the given size by
	// randomly selecting the filtered elements.
	$.fn.randomFilter = function( size ){
		size = Math.min( size, this.size() );
		var indexes = new Array( this.size() );
		for (var i = 0 ; i < this.size() ; i++){
			indexes[ i ] = i;
		}
		var randomIndexes = {};
		for (var i = 0 ; i < size ; i++){
			randomIndex = $.randRange( 0, indexes.length - 1 );
 			randomIndexes[ indexes[ randomIndex ] ] = true;
			indexes.splice( randomIndex, 1 );
		}
		return(
			this.filter(
				function( index ){
					return( index in randomIndexes );
				}
			)
		);
	};
 
	/* ***************************************************** */ 
	// This is meant to be used on collections of TD elements.
	// It will get at most the 8 surrounding TD cells.
	$.fn.near = function(){
		var nearNodes = $( [] );
		var currentCell = $( this );
		var currentRow = currentCell.parent( "tr" );
		var tbody = currentRow.parent();
		var prevRow = currentRow.prev();
		var nextRow = currentRow.next();
		var currentCellIndex = currentRow.find( "td" ).index( currentCell );
		// Check to see if there is a previous row.
		if (prevRow.size()){ 
			var prevRowCell = prevRow.find( "td:eq(" + currentCellIndex + ")" );
			nearNodes = nearNodes
				.add( prevRowCell.prev() )
				.add( prevRowCell )
				.add( prevRowCell.next() )
			;
 
		}
		nearNodes = nearNodes
			.add( currentCell.prev() )
			.add( currentCell.next() )
		;
		if (nextRow.size()){
			// Grab the cell just below the current cell.
			var nextRowCell = nextRow.find( "td:eq(" + currentCellIndex + ")" );
			// Add the bottom 3 near cells to the collection that
			// we are going to return.
			nearNodes = nearNodes
				.add( nextRowCell.prev() )
				.add( nextRowCell )
				.add( nextRowCell.next() )
			;
		}
		return( nearNodes );
	}
 

	/* ***************************************************** */
 	/* CREDITS to Ben from jQuery team who inspired me*/
	function MineSweeper( selector, columnCount, rowCount, bombCount ){
		var self = this;
		this.table = $( selector );
		this.columnCount = (columnCount || 30);
		this.rowCount = (rowCount || 30);
		if (
			(typeof( bombCount ) == "string") &&
			(bombCount.indexOf( "%" ) > 0)
			){
			// The bomb count is a percentage of the total number
			// of cells.
			this.bombCount = Math.floor(
				(this.columnCount * this.rowCount) *
				(parseInt( bombCount ) / 100)
			);
 
		} else {
			// The bomb count is just a standard number.
			this.bombCount = (bombCount || 15);
		}
		// Bind the click handler for the table. This way, we
		// don't have to attach event handlers to each cell.
		this.table.click(
			function( event ){
				// Pass off to the table click handler.
				self.onClick( event ); 
				// Cancel default event.
				return( false );
			}
		); 
		// Initialize the table.
		this.initTable();
	};
 
	MineSweeper.prototype.buildTable = function(){
		var rowHtml = ("<tr>" + $.repeatString( "<td class=\"active\">&nbsp;</td>", this.columnCount ) + "</tr>");
		var tableHtml = $.repeatString( rowHtml, this.rowCount );
		this.table.html( tableHtml );
	}; 
 
	MineSweeper.prototype.checkEndGame = function(){
		var message = "";
		var isEndGame = false;
 
		// Check to see if any of the bombs have exploded.
		if (this.bombCells.filter( ".bombed" ).size()){
			 
			// LOSE
			isEndGame = true;
			app.app_sweeper.lose();

		} else if (!this.nonBombCells.filter( ".active" ).size()){
 
			// WIN		
			isEndGame = true;
			this.revealBoard();
			app.app_sweeper.win();
 
		}
	};
 
 
	// I clear the table of any markup.
	MineSweeper.prototype.clearTable = function(){
		this.table.empty();
	};

	// I initialize the table.
	MineSweeper.prototype.initTable = function(){
		var self = this;
 
		// Clear the table if there is any existing markup.
		this.clearTable();
 
		// Now that we have ensured that the table is
		// empty, let's build out the HTML for the table.
		this.buildTable();
 
		// Gather the cells of the table.
		this.cells = this.table.find( "td" );
 
		// Set the "near bombs" data for each cell to
		// zero. This is the number of bombs that the cell
		// is near.
		this.cells.data( "nearBombs", 0 );
 
		// For each cell, keep a collection of the cells
		// that are near this cell.
		this.cells.each(
			function( index, cellNode ){
				var cell = $( this );
 
				// Store the near cells.
				cell.data( "near", cell.near() );
			}
		);
 
		// Randomly select and gather the bomb cells.
		this.bombCells = this.cells
			.randomFilter( this.bombCount )
			.addClass( "bomb" );
		;
 
		// Now that we've selected the bomb cells, let's
		// get teh non-bomb cells.
		this.nonBombCells = this.cells.filter(
			function( index ){
				// If this cell does NOT appear in the bomb
				// cells collection, then it's a non-bomb
				// cell.
				return( self.bombCells.index( this ) == -1 );
			}
		);
 
		// Now that we have the bomb cells, let's go through
		// each of them and apply its "nearness" to the
		// cells around it.
		this.bombCells.each(
			function( index, node ){
				var cell = $( this );
				var nearCells = cell.data( "near" );
 
				// For each near cell, increment the near
				// data counter.
				nearCells.each(
					function(){
						var nearCell = $( this );
 
						// Get the current near data and
						// increment it.
						nearCell.data(
							"nearBombs",
							(nearCell.data( "nearBombs" ) + 1)
						);
					}
				);
			}
		);
	};
 
 
	// I handle the clicks at the table level.
	MineSweeper.prototype.onClick = function( event ){
		// Get the trigger for the event.
		var target = $( event.target );
 
		// Check to make sure the target is an active cell.
		// If it is not, then we are not interested.
		if (!target.is( "td.active" )){
 
			// This cell is not of any concern; simply
			// return out to prevent processing.
			return;
 
		}
 
 
		// Check to see if the ALT key was pressed. If it
		// was, then we are handling the caution toggle.
		// If not, then we are going to process a normal
		// click event.
		if (event.altKey){
 
			// Toggle the caution nature of this cell.
			this.toggleCaution( target );
 
		} else {
 
			// Check to see if the target was a bomb cell.
			if (target.is( ".bomb" )){
 
				// The user clicked on a bomb, which will end
				// the game. Reveal the whole board (end-game
				// check comes below).
				this.revealBoard();
 
			} else {
 
				// The target was not a bomb, so show it.
				this.revealCell( target );
				app.app_sweeper.clicked();
 
			}
 
			// Check end game.
			this.checkEndGame();
 
		}
	};
 
 
	// I restart the game.
	MineSweeper.prototype.restart = function(){
		// Re-initialize the table.
		this.initTable();
	};
 
 
	// I reveal the entire board.
	MineSweeper.prototype.revealBoard = function(){
		// Remove the transient classes.
		this.cells
			.removeClass( "active" )
			.removeClass( "caution" )
		;
 
		// Add the bombed classes to the bombs.
		this.bombCells.addClass( "bombed" )
 
		// Set the cell contents.
		this.cells.each(
			function( index, cellNode ){
				var cell = $( this );
 
				// Check to see if this is a bomb cell.
				if (cell.is( ".bomb" )){
 
					// Show an *.
					//cell.html( "*" );
 
				} else if (cell.data( "nearBombs" )){
 
					// Show the count.
					cell.html( cell.data( "nearBombs" ) );
 
				}
			}
		);
	};
 
 
	// I reveal the given cell.
	MineSweeper.prototype.revealCell = function( cell ){
		var self = this;
 
		// Remove the active nature of the cell.
		cell
			.removeClass( "active" )
			.removeClass( "caution" )
		;
 
		// Check to see if the current cell is near any
		// bombs. If it is, then we'll just show the
		// current cell and it's nearness. If not, then
		// we'll continue to show the surrounding cells.
		if (cell.data( "nearBombs" )){
 
			// Set the content of the cell.
			cell.html( cell.data( "nearBombs" ) );
 
		} else {
 
			// Make sure the cell has no markup.
			cell.html( "&nbsp;" );
 
			// This cell was not near any bombs. Therefore,
			// it is reasonable to assume the user would
			// quickly reveal all cells around it. As such,
			// we will do that for them.
			cell.data( "near" )
				.filter( ".active" )
					.each(
						function( index, cellNode ){
							self.revealCell( $( this ) );
						}
					)
			;
 
		}
	};
 
 
	// I toggle the cautionary nature and display of the
	// given cell.
	MineSweeper.prototype.toggleCaution = function( cell ){
		// Check to see if there is already a caution on it.
		if (cell.is( ".caution" )){
 
			// Remove caution class.
			cell.removeClass( "caution" );
 
			// Set appropriate markup.
			cell.html( "&nbsp;" );
 
		} else {
 
			// Add caution class.
			cell.addClass( "caution" );
 
			// Set appropriate markup.
			cell.html( "?" );
 
		}
	};
	window.MineSweeper = MineSweeper;
			
})(jQuery);

/**
 * 
 * Thanks Dhiraj for inspiring and jquery plugin
 */
 
var tiles_zi = 1; 
var tiles_columns = 3;
var tiles_number = 9;
var tiles_block = 100;
$.fn.extend({puzzle_game:function(e,tilesColumns,tilesNumber){
	tiles_zi = 1;
	e = e?e:tiles_block;
	tiles_columns = tilesColumns?tilesColumns:tiles_columns;
	tiles_number = tilesNumber?tilesNumber:tiles_number;
	tiles_empty = tiles_number;	
	var t="#"+$(this).attr("id");
	var n=e+"px";
	var r=e*tiles_columns+"px";
	$(t).html('<div id="puzzle_board"></div>');
	$("#puzzle_board").css({position:"absolute",width:r,height:r});
	$("#puzzle_area").append('<div id="puzzle_picture" class="puzzles_bg gpuAcc"></div>');
	$("#puzzle_area").append('<div id="puzzle_restart" class="smallbutton gpuAcc" onclick="app.app_puzzle.restartGame()"><div class="gpuAcc icon_redo"></div></div>');
	$("#puzzle_area").append('<div id="puzzle_reopen" class="smallbutton gpuAcc" onclick="app.app_puzzle.reopen()"><div class="icon_play gpuAcc"></div></div>');
	
	for(var i=0;i<tiles_number;i++){
		$("#puzzle_board").append("<div id ='puzzle_tile"+(i+1)+"' class='puzzles gpuAcc' style='left: "+i%tiles_columns*e+"px; top: "+Math.floor(i/tiles_columns)*e+"px; width: "+e+"px; height: "+e+"px; background-position: "+ -(i%tiles_columns)*e+"px "+ -Math.floor(i/tiles_columns)*e+"px '></div>")}
		$("#puzzle_board").children("div:nth-child("+tiles_empty+")").css({backgroundImage:"none",background:"#ffffff"});
		//$("#puzzle_board").children("div").click(function(){puzzleMove(this,e)})
	}	
})
function puzzleMove(e,t,shuffle){
	
	var n=false;
	var r=$("#puzzle_board").children("div:nth-child("+tiles_empty+")").css("left");
	var i=$("#puzzle_board").children("div:nth-child("+tiles_empty+")").css("top");
	var s=$(e).css("left");
	var o=$(e).css("top");
	if(r==s&&o==parseInt(i)-t+"px")n=true;
	if(r==s&&o==parseInt(i)+t+"px")n=true;
	if(parseInt(r)-t+"px"==s&&o==i)n=true;
	if(parseInt(r)+t+"px"==s&&o==i)n=true;
	
	
	if (shuffle) {
		// do shuffle
		// console.log (e.attr('id') + " --- " + app.app_puzzle.shuffleCounter + " ::: " + n);		
		if(n){
			// legit shuffle
			$(e).css("z-index",tiles_zi++);
			$(e).delay(60).transition({left:r,top:i},0,function(){
				$("#puzzle_board").children("div:nth-child("+tiles_empty+")").css("left",s);
				$("#puzzle_board").children("div:nth-child("+tiles_empty+")").css("top",o)
				app.app_puzzle.makeShuffle (true);
				return;
			});
		} else {
			// try again
			app.app_puzzle.makeShuffle (false); // next one
			return;
		}
	} else {
		
		if(!allow_clicks) { return; }
		
		// CLICK	
		if(n){
			allow_clicks = false;
			$(e).css("z-index",tiles_zi++);
			$(e).transition({left:r,top:i},150,function(){
				$("#puzzle_board").children("div:nth-child("+tiles_empty+")").css("left",s);
				$("#puzzle_board").children("div:nth-child("+tiles_empty+")").css("top",o);
				allow_clicks = true;
				app.app_puzzle.checkGame();
			})
		}
	}
}