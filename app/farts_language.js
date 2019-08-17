// copyright Dr.Peter

var lng = new Object();
lng.english = new Object ();
lng.german = new Object ();
lng.slovenian = new Object ();

// english
lng.english = {
	menu0: "home",
	menu1: "Editors' Picks",
	menu2: "Favorites",
	menu3: "Male Farts",
	menu4: "Female Farts",
	menu5: "Old Farts",
	menu6: "Countdown",
	menu7: "Farts Memory",
	menu8: "Fart Says",
	menu9: "Info & Support",
	menu10: "All Farts",
	menu11: "Fart Sweeper",
	menu12: "Hide Farts",
	menu13: "Compose Farts",
	menu14: "Settings",
	menu15: "Farty Bird",
	menu16: "Fart Puzzle",
	menu17: "Shake It",
	menu18: "Random Farter",
	menu19: "Mix Farts",
	
	// common
	fart: "fart",
	farts: "farts",
	cancel: "cancel",
	start: "start",
	pouse: "pause",
	boom: "Boom!",
	yes: "Yes",
	no: "No",
	ok: "OK",
	tries: "Tries",
	resets: "Reset",
	title: "Title",
	
	// shares
	share_twitter: "Share on Twitter",
	share_facebook: "Share on Facebook",
	share_google: "Share on Google+",
	share_title: "Farts HD, proudly presents a masterpiece: ",
	
	// alerts
	backto: "Back to Home",
	addfav: "Add to Favorites",
	addfav_alert: "Would you like to add this Fart to your Favorites?",
	delfav: "Remove from Favorites",
	devfav_alert: "Would you like to remove this Fart from Favorites?",
	close_app: "Close Farts HD",
	close_alert: "Would you like to close the app?",
	
	// memory
	mem_cong: "Congratulation",
	mem_next: "Next Level",
	mem_prev: "Previous level",
	mem_txt1: "You have guessed",
	mem_txt2: "farts",
	mem_txt3: "in",
	mem_txt4: "tries",
	mem_high1: "<strong>Fart Blossom!</strong> You are a producer of particularly redolent farts. An Artist!",
	mem_high2: "<strong>Fartmeister!</strong> You are an expert and accomplished farter.",
	mem_high3: "<strong>Methane maker!</strong> Not bad for old fart.",
	mem_high4: "<strong>Organ arse!</strong> You could do better than this.",
	mem_high4: "<strong>Snorkeldorfer!</strong> You are to one who farts underwater and then sticks his nose in the bubble.",
	mem_finish: "You finished a final level! You must be accomplished farter. ",	
	mem_wait: "Wait...",
	mem_your: "Try No.",
	mem_best: "Best score:",

	// category
	/*
	cat_level: "Acoustic Level",
	cat_dirty: "Dirty Panties",
	cat_smell: "Smelly Farts",
	cat_throw: "Throwing up",
	cat_aware: "Awareness",
	*/
	cat_empty: "Your favorites Farts list is empty.",
	cat_level: "Volume",
	cat_aware: "Detection",
	cat_dirty: "Dirty Panties",
	cat_smell: "Smell",
	cat_throw: "Throw up",
	
	
	// farts say
	say_alert1: "Farts Says",
	say_alert2: "Have you ever played Simon says?<br />Well, that's it!",
	say_button1: "Play the game",
	say_alert3: "Wrong!",
	say_alert4: "You missed the fart. Too bad!",
	say_alert5: "You guessed",
	say_button2: "Start again",
	
	// hide fart
	hide_alert1: "Hide my farts",
	hide_alert2: "Tap on the screen and hold it to release the Fart.<br />Release the farts only when the car drives by.<br />When the Fart Pressure or Detection meter reaches 100% the game is over.",
	hide_alert3: "Start the game",
	
	hide_alert4: "What a shame!",	
	hide_alert5: "You couldn't hold it any longer. There was too much pressure in your pants, you had to relese it!",
	hide_alert6: "You have been detected!",
	hide_info: "<br />Tap on the screen and hold it<br />to release the Fart.<br />Release the Fart only<br />when the car drives by.",
	hide_high: "High Score: ",
	hide_graph1: "Fart Pressure",
	hide_graph2: "Detection",

	// piano
	piano_snd1: "Wet",
	piano_snd2: "Dry",
	piano_snd3: "Smelly",
	piano_snd4: "Sustain",
	piano_snd5: "Duet",
	
	// settings
	sett_title1: "Favorites list Farts: ",
	sett_title2: "Clear entire favorites list",
	sett_title3: "Current Level: ",
	sett_title4: "Reset back to level 1",
	sett_title5: "Current Highscore: ",
	sett_title6: "Clear Highscore",
	sett_alert1: "Clear data",
	sett_alert2: "Are you sure you would like to reset selected feature?",
	
	sett_settings0: "Scroll down, if screen height is too small.",
	sett_settings1: "Play alert sounds on alert windows.",
	sett_settings2: "Enable vibration.",
	sett_settings3: " ",
	
	sett_skin1: "Android 3D Style",
	sett_skin2: "iOS Style",
	sett_skin3: "Metro Style",
	
	tc_agree: "I agree with Terms and Conditions",
	tc_title: "Mix, Save, Share",
	tc_text: "We offer this service in good faith that you will honour terms & conditions of the social networks you are publishing in. For more info please read our Privacy Policy.<br />Thank you.",
	
	// info
	info_txt1: "Proud member of AnimType",
	info_txt2: "The App is ADS free and help me keep it that way by rating and sharing among your friends.",
	info_txt3: "Farts HD is a project of enthusiastic people. All files, programing and graphics are made especially for this project. Comercial sounds are not allowed to be played outside of this service (app and web page), to make ringtones or any other audio usage.  For more info please read our Privacy policy.",
	info_txt4: "Thanks to all my friends at Animtyp for graphics and framework and all who contributed their »own« sounds and ideas. Special thanks to Dr.Domen and Dr.Rebeka.",
	info_txt5: "If you feel that this App deserves a sequel or at least regular updates including new sounds or features please rate thie App with five stars, share it or donate to this project. Thank you.",
	info_txt6: "<a href='mailto:dr.animtype@gmail.com' class='button gpuAcc'><div class='icon_email'></div><span>dr.animtype@gmail.com</span></a>",
	
	info_footer1: "<div class='icon_mix gpuAcc'></div><span>mix.fartshd.com</span>",
	info_footer2: "<div class='icon_r gpuAcc'></div><span>fartshd.com</span>",
	info_footer3: "<div class='icon_c gpuAcc'></div><span>Privacy Policy</span>",
	info_footer4: "<div class='icon_globe gpuAcc'></div><span>Animtype</span>",
	
	// puzzle
	puzzle_alert1: "Solve the Puzzle",
	puzzle_alert2: "Choose a grid layout.",	
	puzzle_alert3: "Congratulation",
	puzzle_alert4: "Would you like another go?",
	puzzle_grid3: "3x3 grid",
	puzzle_grid4: "4x4 grid",
	puzzle_grid5: "5x5 grid",
	

	// mix
	mix: "MIX",
	mix_alert1: "Mix your Farts",
	mix_alert2: "<strong>MIX - SAVE - SHARE</strong><br /><br /><br />Share it on Facebook, Twitter or Google+",
	mix_alert3: "I am ready",
	mix_alert4: "Create a new MIX",
	mix_alert5: "Would you like to create new MIX?",
	mix_alert6: "Save current MIX",
	mix_alert7: "Would you like to save current MIX to your favorites list?",
	mix_alert8: "There is no empty save slot left.",
	mix_noname: "no name",
	mix_play: "Play Mix",
	mix_new: 	"1.&nbsp;&nbsp;&nbsp;New Mix  ",
	mix_save: 	"2.&nbsp;&nbsp;&nbsp;Save Mix ",
	mix_share: 	"3.&nbsp;&nbsp;&nbsp;Share Mix",
	mix_add: "Add Fart",
	mix_delete: "Delete Fart",
	mix_change: "Change Fart",
	mix_nothing: "Nothing to Play",
	mix_nosave: "Nothing to Save",
	mix_noshare: "Nothing to Share",
	mix_savefirst: "Please, Save First",
	mix_saved: "MIX",
	
	
	// update
	update_title: "What's new?",
	update_news1: "100+ farts,  Additional memory levels, Shake it...<br /><br />New feature: MIX FARTS with new sounds.",
	update_news2: "<div class='update_ads'></div>",

	
	
	empty: ""	
}

