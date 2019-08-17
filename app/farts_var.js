// copyright Dr.Peter

var page_scroll = null;
var pause = 100;
var duration = 150;
var trans = 2000;
var transitiondelay = 500;

var opener = null;	
var page_width = 0;
var page_height = 0;
var widths = 0;
var heights = 0;
var columns = 0;
var calcx = calcy = 0;
var cnt1 = cnt2 = cnt3 = 0;
var iscroll = 0;

var topMargins = 0;
var max_width = 230;
var mid_width = 170;
var min_width = 150;

// status
var doingTransition = false;
var alertOpen = false;
var all_blocks = 10;
var allow_clicks = false;
var selected_page = 0;

// main screen positions
var mains = new Array();

// for games and pages
var app = new Object();

// push menus
var menus = new Array();


menus.push(new Object({"name":lng[language].menu0, 	"style": "color_bg", 		"app": "home",		"bg":false}));

menus.push(new Object({"name":lng[language].menu1, 	"style": "color_editors", 	"app": "editor",	"bg":true}));

menus.push(new Object({"name":lng[language].menu19, "style": "color_mix", 		"app": "mix",		"bg":false}));

menus.push(new Object({"name":lng[language].menu2, 	"style": "color_favor", 	"app": "favorites",	"bg":true}));

menus.push(new Object({"name":lng[language].menu3, 	"style": "color_male", 		"app": "male",		"bg":true}));
menus.push(new Object({"name":lng[language].menu4, 	"style": "color_female", 	"app": "female",	"bg":true}));
menus.push(new Object({"name":lng[language].menu5, 	"style": "color_old", 		"app": "old",		"bg":true}));

menus.push(new Object({"name":lng[language].menu10, "style": "color_list", 		"app": "list",		"bg":true}));
menus.push(new Object({"name":lng[language].menu17,	"style": "color_shake",		"app": "shake",		"bg":true}));
menus.push(new Object({"name":lng[language].menu6, 	"style": "color_app_timer", "app": "counter",	"bg":true}));


menus.push(new Object({"name":lng[language].menu12,	"style": "color_hidefart", 	"app": "hidefart",	"bg":false}));
menus.push(new Object({"name":lng[language].menu7, 	"style": "color_app_memory","app": "memory",	"bg":true}));
menus.push(new Object({"name":lng[language].menu8,	"style": "color_fartsays",	"app": "fartsays",	"bg":true}));
menus.push(new Object({"name":lng[language].menu16, "style": "color_puzzle", 	"app": "puzzle",	"bg":true}));
menus.push(new Object({"name":lng[language].menu11, "style": "color_sweeper", 	"app": "sweeper",	"bg":true}));
menus.push(new Object({"name":lng[language].menu13,	"style": "color_piano", 	"app": "piano",		"bg":false}));

menus.push(new Object({"name":lng[language].menu14,	"style": "color_settings", 	"app": "settings", 	"bg":false}));
menus.push(new Object({"name":lng[language].menu9, 	"style": "color_info", 		"app": "info", 		"bg":false}));



// store session data
var store = new Object();

// memory
store.app_memory = new Object();
store.app_memory.max_block = 140;
store.app_memory.mid_block = 120;
store.app_memory.min_block = 80;







// category
var sounds = new Object();

// MALE FARTS 
sounds.male = new Array(); 
sounds.male.push(new Object({"mp3":"10006",	"title":"Start a Harley", "value1":"8", "value2":"7", "value3":"5", "value4":"6", "value5":"7", "timer":"1359"})); 
sounds.male.push(new Object({"mp3":"10002",	"title":"Broken Trumpet", "value1":"8", "value2":"8", "value3":"5", "value4":"7", "value5":"7", "timer":"550"})); 
sounds.male.push(new Object({"mp3":"10014",	"title":"Gatling Gun", "value1":"9", "value2":"4", "value3":"4", "value4":"3", "value5":"8", "timer":"810"})); 
sounds.male.push(new Object({"mp3":"10004",	"title":"After Burrito", "value1":"10", "value2":"10", "value3":"10", "value4":"10", "value5":"10", "timer":"1045"})); 
sounds.male.push(new Object({"mp3":"10105",	"title":"Step on a Fart Snake", "value1":"8", "value2":"6", "value3":"7", "value4":"7", "value5":"9", "timer":"4704"})); 
sounds.male.push(new Object({"mp3":"10007",	"title":"Roar From The Rear", "value1":"10", "value2":"5", "value3":"6", "value4":"6", "value5":"9", "timer":"2744"})); 
sounds.male.push(new Object({"mp3":"10076",	"title":"Who's There?", "value1":"6", "value2":"4", "value3":"5", "value4":"3", "value5":"7", "timer":"1204"})); 
sounds.male.push(new Object({"mp3":"10077",	"title":"Mario Game", "value1":"5", "value2":"3", "value3":"4", "value4":"4", "value5":"4", "timer":"1647"})); 
sounds.male.push(new Object({"mp3":"10021",	"title":"Blowing Your Nose", "value1":"9", "value2":"4", "value3":"5", "value4":"6", "value5":"10", "timer":"2587"})); 
sounds.male.push(new Object({"mp3":"10080",	"title":"I didn't Expect That", "value1":"6", "value2":"10", "value3":"6", "value4":"7", "value5":"5", "timer":"2117"})); 
sounds.male.push(new Object({"mp3":"10082",	"title":"Ohh Noo!", "value1":"5", "value2":"5", "value3":"6", "value4":"3", "value5":"4", "timer":"1595"})); 
sounds.male.push(new Object({"mp3":"10026",	"title":" Can't Handle It", "value1":"10", "value2":"9", "value3":"7", "value4":"10", "value5":"10", "timer":"6977"})); 
sounds.male.push(new Object({"mp3":"10024",	"title":"Weed Wacker Won't Start", "value1":"5", "value2":"8", "value3":"10", "value4":"8", "value5":"6", "timer":"1020"})); 
sounds.male.push(new Object({"mp3":"10028",	"title":" Rally Car", "value1":"10", "value2":"9", "value3":"7", "value4":"10", "value5":"10", "timer":"2483"})); 
sounds.male.push(new Object({"mp3":"10031",	"title":" Cave Fart", "value1":"6", "value2":"3", "value3":"4", "value4":"3", "value5":"10", "timer":"1491"})); 
sounds.male.push(new Object({"mp3":"10032",	"title":"Full Lecture Room a Nerd Fart", "value1":"7", "value2":"3", "value3":"7", "value4":"4", "value5":"5", "timer":"785"})); 
sounds.male.push(new Object({"mp3":"10087",	"title":"Dive Alert", "value1":"10", "value2":"6", "value3":"5", "value4":"7", "value5":"10", "timer":"968"})); 
sounds.male.push(new Object({"mp3":"10035",	"title":" Too Much Beans ", "value1":"4", "value2":"8", "value3":"9", "value4":"5", "value5":"6", "timer":"734"})); 
sounds.male.push(new Object({"mp3":"10043",	"title":" Chainsaw Won't Start", "value1":"7", "value2":"5", "value3":"4", "value4":"3", "value5":"6", "timer":"472"})); 
sounds.male.push(new Object({"mp3":"10044",	"title":" Liquid Fart", "value1":"5", "value2":"10", "value3":"6", "value4":"10", "value5":"4", "timer":"501"})); 
sounds.male.push(new Object({"mp3":"10088",	"title":"Rip Ass", "value1":"7", "value2":"5", "value3":"6", "value4":"4", "value5":"4", "timer":"656"})); 
sounds.male.push(new Object({"mp3":"10047",	"title":" Everyday Starts the Same", "value1":"6", "value2":"3", "value3":"4", "value4":"5", "value5":"7", "timer":"525"})); 
sounds.male.push(new Object({"mp3":"10049",	"title":" It Wasn't Me", "value1":"7", "value2":"5", "value3":"7", "value4":"6", "value5":"6", "timer":"445"})); 
sounds.male.push(new Object({"mp3":"10053",	"title":" Forever Young", "value1":"10", "value2":"5", "value3":"7", "value4":"6", "value5":"8", "timer":"732"})); 
sounds.male.push(new Object({"mp3":"10054",	"title":" God Mercy", "value1":"3", "value2":"8", "value3":"10", "value4":"6", "value5":"4", "timer":"837"})); 
sounds.male.push(new Object({"mp3":"10057",	"title":" Overpriced Soup", "value1":"5", "value2":"4", "value3":"6", "value4":"3", "value5":"6", "timer":"551"})); 
sounds.male.push(new Object({"mp3":"10059",	"title":" Short But Stinky", "value1":"5", "value2":"7", "value3":"8", "value4":"4", "value5":"6", "timer":"368"})); 
sounds.male.push(new Object({"mp3":"10060",	"title":" User Friendly", "value1":"6", "value2":"4", "value3":"3", "value4":"3", "value5":"5", "timer":"315"})); 
sounds.male.push(new Object({"mp3":"10104",	"title":" Old Lasagna Bolognese", "value1":"7", "value2":"6", "value3":"5", "value4":"10", "value5":"8", "timer":"1181"})); 
sounds.male.push(new Object({"mp3":"10108",	"title":" Buttquake", "value1":"10", "value2":"5", "value3":"6", "value4":"5", "value5":"10", "timer":"786"})); 
sounds.male.push(new Object({"mp3":"10083",	"title":"Erupt One", "value1":"8", "value2":"6", "value3":"7", "value4":"5", "value5":"7", "timer":"1517"})); 
sounds.male.push(new Object({"mp3":"10096",	"title":" Pass Gas", "value1":"7", "value2":"5", "value3":"4", "value4":"4", "value5":"6", "timer":"785"})); 

// FEMALE FARTS 
sounds.female = new Array(); 
sounds.female.push(new Object({"mp3":"10013",	"title":"Butt yodeling", "value1":"4", "value2":"6", "value3":"10", "value4":"7", "value5":"5", "timer":"2560"})); 
sounds.female.push(new Object({"mp3":"10005",	"title":"Big Mac's Revenge", "value1":"6", "value2":"5", "value3":"8", "value4":"6", "value5":"4", "timer":"992"})); 
sounds.female.push(new Object({"mp3":"10011",	"title":"Victoria's Secret's Worst Nightmare", "value1":"4", "value2":"10", "value3":"10", "value4":"10", "value5":"5", "timer":"5696"})); 
sounds.female.push(new Object({"mp3":"10010",	"title":"Date Breaker", "value1":"3", "value2":"2", "value3":"7", "value4":"5", "value5":"5", "timer":"184"})); 
sounds.female.push(new Object({"mp3":"10008",	"title":"Legal Grounds For a Divorce ", "value1":"10", "value2":"10", "value3":"9", "value4":"10", "value5":"10", "timer":"8255"})); 
sounds.female.push(new Object({"mp3":"10020",	"title":"Dirt BIke", "value1":"9", "value2":"10", "value3":"5", "value4":"7", "value5":"10", "timer":"1803"})); 
sounds.female.push(new Object({"mp3":"10022",	"title":"Peppa Pig", "value1":"5", "value2":"8", "value3":"10", "value4":"7", "value5":"6", "timer":"759"})); 
sounds.female.push(new Object({"mp3":"10027",	"title":" Desperate House Wife", "value1":"10", "value2":"8", "value3":"10", "value4":"9", "value5":"10", "timer":"2352"})); 
sounds.female.push(new Object({"mp3":"10083",	"title":"Drop a Rose", "value1":"6", "value2":"5", "value3":"6", "value4":"5", "value5":"8", "timer":"1520"})); 
sounds.female.push(new Object({"mp3":"10029",	"title":" Even I Was Suprised", "value1":"8", "value2":"9", "value3":"8", "value4":"8", "value5":"10", "timer":"1073"})); 
sounds.female.push(new Object({"mp3":"10085",	"title":"Summoned from Inside", "value1":"5", "value2":"2", "value3":"3", "value4":"2", "value5":"4", "timer":"1438"})); 
sounds.female.push(new Object({"mp3":"10033",	"title":"Cut The Cheese ", "value1":"3", "value2":"5", "value3":"6", "value4":"4", "value5":"4", "timer":"1045"})); 
sounds.female.push(new Object({"mp3":"10037",	"title":"Mouse Squeek", "value1":"8", "value2":"2", "value3":"4", "value4":"3", "value5":"7", "timer":"549"})); 
sounds.female.push(new Object({"mp3":"10041",	"title":"It Was The first in This Day", "value1":"7", "value2":"5", "value3":"6", "value4":"5", "value5":"7", "timer":"420"})); 
sounds.female.push(new Object({"mp3":"10048",	"title":" Morning Rush Hour", "value1":"7", "value2":"5", "value3":"6", "value4":"4", "value5":"6", "timer":"419"})); 
sounds.female.push(new Object({"mp3":"10090",	"title":"Compressed Buttocks", "value1":"6", "value2":"4", "value3":"5", "value4":"7", "value5":"8", "timer":"1073"})); 
sounds.female.push(new Object({"mp3":"10050",	"title":" Surprise!", "value1":"7", "value2":"4", "value3":"6", "value4":"4", "value5":"5", "timer":"445"})); 
sounds.female.push(new Object({"mp3":"10052",	"title":" Hide and Seek", "value1":"4", "value2":"4", "value3":"6", "value4":"3", "value5":"5", "timer":"341"})); 
sounds.female.push(new Object({"mp3":"10058",	"title":" What Does The Fart Say?", "value1":"6", "value2":"7", "value3":"8", "value4":"7", "value5":"8", "timer":"524"})); 
sounds.female.push(new Object({"mp3":"10091",	"title":"He Loved You Untill ...", "value1":"8", "value2":"3", "value3":"4", "value4":"2", "value5":"10", "timer":"657"})); 
sounds.female.push(new Object({"mp3":"10061",	"title":" He Heard That", "value1":"2", "value2":"2", "value3":"7", "value4":"4", "value5":"5", "timer":"392"})); 
sounds.female.push(new Object({"mp3":"10062",	"title":" The Ugly Duckling", "value1":"5", "value2":"7", "value3":"6", "value4":"6", "value5":"6", "timer":"445"})); 
sounds.female.push(new Object({"mp3":"10068",	"title":" Egg's Revenge", "value1":"8", "value2":"9", "value3":"7", "value4":"7", "value5":"8", "timer":"758"})); 
sounds.female.push(new Object({"mp3":"10094",	"title":"Don't Argue with Me", "value1":"5", "value2":"6", "value3":"5", "value4":"6", "value5":"7", "timer":"1282"})); 
sounds.female.push(new Object({"mp3":"10069",	"title":"Let Fly a Fart", "value1":"5", "value2":"4", "value3":"6", "value4":"5", "value5":"6", "timer":"418"})); 
sounds.female.push(new Object({"mp3":"10070",	"title":"Liquid Death", "value1":"3", "value2":"10", "value3":"10", "value4":"10", "value5":"4", "timer":"447"})); 
sounds.female.push(new Object({"mp3":"10105",	"title":" Too Long to be True", "value1":"9", "value2":"9", "value3":"6", "value4":"10", "value5":"10", "timer":"4704"})); 
sounds.female.push(new Object({"mp3":"10109",	"title":" First Attempt to Hide", "value1":"7", "value2":"3", "value3":"4", "value4":"6", "value5":"6", "timer":"2430"})); 
sounds.female.push(new Object({"mp3":"10110",	"title":" Second Attempt to Hide", "value1":"8", "value2":"4", "value3":"5", "value4":"6", "value5":"7", "timer":"3371"})); 
sounds.female.push(new Object({"mp3":"10111",	"title":" Third Attempt to Hide", "value1":"9", "value2":"3", "value3":"5", "value4":"5", "value5":"8", "timer":"3553"})); 
sounds.female.push(new Object({"mp3":"10097",	"title":"Echo Fart", "value1":"3", "value2":"8", "value3":"7", "value4":"4", "value5":"4", "timer":"915"})); 
sounds.female.push(new Object({"mp3":"10089",	"title":"Quack", "value1":"7", "value2":"4", "value3":"5", "value4":"3", "value5":"6", "timer":"707"})); 
sounds.female.push(new Object({"mp3":"10092",	"title":"Good Night", "value1":"8", "value2":"7", "value3":"6", "value4":"7", "value5":"10", "timer":"1098"})); 

// OLD FARTS 
sounds.old = new Array(); 
sounds.old.push(new Object({"mp3":"10015",	"title":"Ocean Liner Titanic", "value1":"10", "value2":"5", "value3":"6", "value4":"8", "value5":"10", "timer":"1307"})); 
sounds.old.push(new Object({"mp3":"10012",	"title":"Bark", "value1":"7", "value2":"3", "value3":"5", "value4":"3", "value5":"6", "timer":"159"})); 
sounds.old.push(new Object({"mp3":"10009",	"title":"Crack The Ripper", "value1":"9", "value2":"6", "value3":"7", "value4":"8", "value5":"9", "timer":"2561"})); 
sounds.old.push(new Object({"mp3":"10003",	"title":"Angry Bee", "value1":"9", "value2":"4", "value3":"7", "value4":"4", "value5":"7", "timer":"731"})); 
sounds.old.push(new Object({"mp3":"10001",	"title":" The Voice Of The Toothless One", "value1":"6", "value2":"4", "value3":"9", "value4":"6", "value5":"4", "timer":"863"})); 
sounds.old.push(new Object({"mp3":"10017",	"title":" Apollo 13 Starts The Engine", "value1":"10", "value2":"8", "value3":"7", "value4":"8", "value5":"10", "timer":"9926"})); 
sounds.old.push(new Object({"mp3":"10016",	"title":"The Sound of dying Elephant", "value1":"10", "value2":"10", "value3":"8", "value4":"10", "value5":"10", "timer":"1411"})); 
sounds.old.push(new Object({"mp3":"10078",	"title":"Stomp on the Barking Spider", "value1":"9", "value2":"6", "value3":"5", "value4":"6", "value5":"10", "timer":"1880"})); 
sounds.old.push(new Object({"mp3":"10030",	"title":" Didn't See That Coming", "value1":"9", "value2":"7", "value3":"8", "value4":"7", "value5":"9", "timer":"1829"})); 
sounds.old.push(new Object({"mp3":"10023",	"title":"YOLO", "value1":"9", "value2":"7", "value3":"10", "value4":"7", "value5":"9", "timer":"2952"})); 
sounds.old.push(new Object({"mp3":"10034",	"title":" Drop One's Guts", "value1":"9", "value2":"10", "value3":"10", "value4":"9", "value5":"8", "timer":"3502"})); 
sounds.old.push(new Object({"mp3":"10039",	"title":"Play The Butt Trumpet", "value1":"9", "value2":"6", "value3":"7", "value4":"8", "value5":"10", "timer":"707"})); 
sounds.old.push(new Object({"mp3":"10038",	"title":" By The Way", "value1":"6", "value2":"4", "value3":"5", "value4":"3", "value5":"6", "timer":"446"})); 
sounds.old.push(new Object({"mp3":"10040",	"title":"It's That Asshole Talking Behind My Back Again", "value1":"4", "value2":"7", "value3":"5", "value4":"5", "value5":"4", "timer":"392"})); 
sounds.old.push(new Object({"mp3":"10042",	"title":"Fart through 5 Underwears", "value1":"2", "value2":"4", "value3":"5", "value4":"3", "value5":"3", "timer":"288"})); 
sounds.old.push(new Object({"mp3":"10046",	"title":" There's a Little Bit More Left", "value1":"4", "value2":"2", "value3":"2", "value4":"3", "value5":"2", "timer":"393"})); 
sounds.old.push(new Object({"mp3":"10045",	"title":" Classic Fart", "value1":"8", "value2":"4", "value3":"7", "value4":"5", "value5":"9", "timer":"445"})); 
sounds.old.push(new Object({"mp3":"10051",	"title":" Pollute The Athmosphere", "value1":"8", "value2":"6", "value3":"7", "value4":"5", "value5":"8", "timer":"575"})); 
sounds.old.push(new Object({"mp3":"10055",	"title":"Full Diaper ", "value1":"7", "value2":"10", "value3":"6", "value4":"5", "value5":"7", "timer":"315"})); 
sounds.old.push(new Object({"mp3":"10063",	"title":" Born To Be Wild", "value1":"9", "value2":"6", "value3":"8", "value4":"7", "value5":"9", "timer":"1019"})); 
sounds.old.push(new Object({"mp3":"10064",	"title":" Vacuum Cleaner", "value1":"8", "value2":"7", "value3":"8", "value4":"6", "value5":"8", "timer":"864"})); 
sounds.old.push(new Object({"mp3":"10067",	"title":"Big Fat Smelly Frog", "value1":"5", "value2":"6", "value3":"7", "value4":"4", "value5":"4", "timer":"784"})); 
sounds.old.push(new Object({"mp3":"10066",	"title":" Diarrhea", "value1":"2", "value2":"10", "value3":"8", "value4":"7", "value5":"3", "timer":"655"})); 
sounds.old.push(new Object({"mp3":"10095",	"title":"Fade Away", "value1":"4", "value2":"5", "value3":"8", "value4":"4", "value5":"4", "timer":"966"})); 
sounds.old.push(new Object({"mp3":"10065",	"title":" Bloody Merry", "value1":"9", "value2":"9", "value3":"9", "value4":"9", "value5":"9", "timer":"1282"})); 
sounds.old.push(new Object({"mp3":"10072",	"title":" No Pain No Gain", "value1":"9", "value2":"10", "value3":"10", "value4":"7", "value5":"9", "timer":"1044"})); 
sounds.old.push(new Object({"mp3":"10103",	"title":"A Week Old Food", "value1":"10", "value2":"7", "value3":"8", "value4":"10", "value5":"10", "timer":"2353"})); 
sounds.old.push(new Object({"mp3":"10102",	"title":" Old Medicines", "value1":"10", "value2":"6", "value3":"6", "value4":"10", "value5":"9", "timer":"1595"})); 
sounds.old.push(new Object({"mp3":"10106",	"title":" Couldn't Hold it any More", "value1":"5", "value2":"10", "value3":"10", "value4":"10", "value5":"6", "timer":"4833"})); 
sounds.old.push(new Object({"mp3":"10098",	"title":"Fardullah", "value1":"4", "value2":"4", "value3":"7", "value4":"6", "value5":"5", "timer":"1334"})); 

// EDITORS PICK 
sounds.editors = new Array(); 
sounds.editors.push(new Object({"mp3":"10006",	"title":"Start a Harley", "value1":"8", "value2":"7", "value3":"5", "value4":"6", "value5":"7", "timer":"1359"})); 
sounds.editors.push(new Object({"mp3":"10015",	"title":"Ocean Liner Titanic", "value1":"10", "value2":"5", "value3":"6", "value4":"8", "value5":"10", "timer":"1307"})); 
sounds.editors.push(new Object({"mp3":"10011",	"title":"Victoria's Secret's Worst Nightmare", "value1":"4", "value2":"10", "value3":"10", "value4":"10", "value5":"5", "timer":"5696"})); 
sounds.editors.push(new Object({"mp3":"10004",	"title":"After Burrito", "value1":"10", "value2":"10", "value3":"10", "value4":"10", "value5":"10", "timer":"1045"})); 
sounds.editors.push(new Object({"mp3":"10008",	"title":"Legal Grounds For a Divorce ", "value1":"10", "value2":"10", "value3":"9", "value4":"10", "value5":"10", "timer":"8255"})); 
sounds.editors.push(new Object({"mp3":"10003",	"title":"Angry Bee", "value1":"9", "value2":"4", "value3":"7", "value4":"4", "value5":"7", "timer":"731"})); 
sounds.editors.push(new Object({"mp3":"10017",	"title":" Apollo 13 Starts The Engine", "value1":"10", "value2":"8", "value3":"7", "value4":"8", "value5":"10", "timer":"9926"})); 
sounds.editors.push(new Object({"mp3":"10016",	"title":"The Sound of dying Elephant", "value1":"10", "value2":"10", "value3":"8", "value4":"10", "value5":"10", "timer":"1411"})); 
sounds.editors.push(new Object({"mp3":"10078",	"title":"Stomp on the Barking Spider", "value1":"9", "value2":"6", "value3":"5", "value4":"6", "value5":"10", "timer":"1880"})); 
sounds.editors.push(new Object({"mp3":"10021",	"title":"Blowing Your Nose", "value1":"9", "value2":"4", "value3":"5", "value4":"6", "value5":"10", "timer":"2587"})); 
sounds.editors.push(new Object({"mp3":"10027",	"title":" Desperate House Wife", "value1":"10", "value2":"8", "value3":"10", "value4":"9", "value5":"10", "timer":"2352"})); 
sounds.editors.push(new Object({"mp3":"10028",	"title":" Rally Car", "value1":"10", "value2":"9", "value3":"7", "value4":"10", "value5":"10", "timer":"2483"})); 
sounds.editors.push(new Object({"mp3":"10023",	"title":"YOLO", "value1":"9", "value2":"7", "value3":"10", "value4":"7", "value5":"9", "timer":"2952"})); 
sounds.editors.push(new Object({"mp3":"10045",	"title":" Classic Fart", "value1":"8", "value2":"4", "value3":"7", "value4":"5", "value5":"9", "timer":"445"})); 
sounds.editors.push(new Object({"mp3":"10058",	"title":" What Does The Fart Say?", "value1":"6", "value2":"7", "value3":"8", "value4":"7", "value5":"8", "timer":"524"})); 
sounds.editors.push(new Object({"mp3":"10104",	"title":" Old Lasagna Bolognese", "value1":"7", "value2":"6", "value3":"5", "value4":"10", "value5":"8", "timer":"1181"})); 
sounds.editors.push(new Object({"mp3":"10063",	"title":" Born To Be Wild", "value1":"9", "value2":"6", "value3":"8", "value4":"7", "value5":"9", "timer":"1019"})); 
sounds.editors.push(new Object({"mp3":"10070",	"title":"Liquid Death", "value1":"3", "value2":"10", "value3":"10", "value4":"10", "value5":"4", "timer":"447"})); 
sounds.editors.push(new Object({"mp3":"10109",	"title":" First Attempt to Hide", "value1":"7", "value2":"3", "value3":"4", "value4":"6", "value5":"6", "timer":"2430"})); 
sounds.editors.push(new Object({"mp3":"10072",	"title":" No Pain No Gain", "value1":"9", "value2":"10", "value3":"10", "value4":"7", "value5":"9", "timer":"1044"})); 
sounds.editors.push(new Object({"mp3":"10103",	"title":"A Week Old Food", "value1":"10", "value2":"7", "value3":"8", "value4":"10", "value5":"10", "timer":"2353"})); 
sounds.editors.push(new Object({"mp3":"10106",	"title":" Couldn't Hold it any More", "value1":"5", "value2":"10", "value3":"10", "value4":"10", "value5":"6", "timer":"4833"})); 

// MEMORY 
sounds.memory = new Array(); 
sounds.memory.push(new Object({"mp3":"10006",	"title":" Start a Harley", "value1":"8", "value2":"7", "value3":"5", "value4":"6", "value5":"7", "timer":"1359"})); 
sounds.memory.push(new Object({"mp3":"10015",	"title":"Ocean Liner Titanic", "value1":"10", "value2":"5", "value3":"6", "value4":"8", "value5":"10", "timer":"1307"})); 
sounds.memory.push(new Object({"mp3":"10005",	"title":"Big Mac's Revenge", "value1":"6", "value2":"5", "value3":"8", "value4":"6", "value5":"4", "timer":"992"})); 
sounds.memory.push(new Object({"mp3":"10012",	"title":"Bark", "value1":"7", "value2":"3", "value3":"5", "value4":"3", "value5":"6", "timer":"159"})); 
sounds.memory.push(new Object({"mp3":"10009",	"title":"Crack The Ripper", "value1":"9", "value2":"6", "value3":"7", "value4":"8", "value5":"9", "timer":"2561"})); 
sounds.memory.push(new Object({"mp3":"10010",	"title":"Date Breaker", "value1":"3", "value2":"2", "value3":"7", "value4":"5", "value5":"5", "timer":"184"})); 
sounds.memory.push(new Object({"mp3":"10004",	"title":"After Burrito", "value1":"10", "value2":"10", "value3":"10", "value4":"10", "value5":"10", "timer":"1045"})); 
sounds.memory.push(new Object({"mp3":"10007",	"title":"Roar From The Rear", "value1":"10", "value2":"5", "value3":"6", "value4":"6", "value5":"9", "timer":"2744"})); 
sounds.memory.push(new Object({"mp3":"10003",	"title":"Angry Bee", "value1":"9", "value2":"4", "value3":"7", "value4":"4", "value5":"7", "timer":"731"})); 
sounds.memory.push(new Object({"mp3":"10001",	"title":" The Voice Of The Toothless One", "value1":"6", "value2":"4", "value3":"9", "value4":"6", "value5":"4", "timer":"863"})); 
sounds.memory.push(new Object({"mp3":"10076",	"title":"Who's There?", "value1":"6", "value2":"4", "value3":"5", "value4":"3", "value5":"7", "timer":"1204"})); 
sounds.memory.push(new Object({"mp3":"10020",	"title":"Dirt BIke", "value1":"9", "value2":"10", "value3":"5", "value4":"7", "value5":"10", "timer":"1803"})); 
sounds.memory.push(new Object({"mp3":"10078",	"title":"Stomp on the Barking Spider", "value1":"9", "value2":"6", "value3":"5", "value4":"6", "value5":"10", "timer":"1880"})); 
sounds.memory.push(new Object({"mp3":"10022",	"title":"Peppa Pig", "value1":"5", "value2":"8", "value3":"10", "value4":"7", "value5":"6", "timer":"759"})); 
sounds.memory.push(new Object({"mp3":"10080",	"title":"I didn't Expect That", "value1":"6", "value2":"10", "value3":"6", "value4":"7", "value5":"5", "timer":"2117"})); 
sounds.memory.push(new Object({"mp3":"10082",	"title":"Ohh Noo!", "value1":"5", "value2":"5", "value3":"6", "value4":"3", "value5":"4", "timer":"1595"})); 
sounds.memory.push(new Object({"mp3":"10024",	"title":"Weed Wacker Won't Start", "value1":"5", "value2":"8", "value3":"10", "value4":"8", "value5":"6", "timer":"1020"})); 
sounds.memory.push(new Object({"mp3":"10027",	"title":" Desperate House Wife", "value1":"10", "value2":"8", "value3":"10", "value4":"9", "value5":"10", "timer":"2352"})); 
sounds.memory.push(new Object({"mp3":"10083",	"title":"Drop a Rose", "value1":"6", "value2":"5", "value3":"6", "value4":"5", "value5":"8", "timer":"1520"})); 
sounds.memory.push(new Object({"mp3":"10029",	"title":" Even I Was Suprised", "value1":"8", "value2":"9", "value3":"8", "value4":"8", "value5":"10", "timer":"1073"})); 
sounds.memory.push(new Object({"mp3":"10030",	"title":" Didn't See That Coming", "value1":"9", "value2":"7", "value3":"8", "value4":"7", "value5":"9", "timer":"1829"})); 
sounds.memory.push(new Object({"mp3":"10028",	"title":" Rally Car", "value1":"10", "value2":"9", "value3":"7", "value4":"10", "value5":"10", "timer":"2483"})); 
sounds.memory.push(new Object({"mp3":"10031",	"title":" Cave Fart", "value1":"6", "value2":"3", "value3":"4", "value4":"3", "value5":"10", "timer":"1491"})); 
sounds.memory.push(new Object({"mp3":"10032",	"title":"Full Lecture Room a Nerd Fart", "value1":"7", "value2":"3", "value3":"7", "value4":"4", "value5":"5", "timer":"785"})); 
sounds.memory.push(new Object({"mp3":"10033",	"title":"Cut The Cheese ", "value1":"3", "value2":"5", "value3":"6", "value4":"4", "value5":"4", "timer":"1045"})); 
sounds.memory.push(new Object({"mp3":"10087",	"title":"Dive Alert", "value1":"10", "value2":"6", "value3":"5", "value4":"7", "value5":"10", "timer":"968"})); 
sounds.memory.push(new Object({"mp3":"10035",	"title":" Too Much Beans ", "value1":"4", "value2":"8", "value3":"9", "value4":"5", "value5":"6", "timer":"734"})); 
sounds.memory.push(new Object({"mp3":"10039",	"title":"Play The Butt Trumpet", "value1":"9", "value2":"6", "value3":"7", "value4":"8", "value5":"10", "timer":"707"})); 
sounds.memory.push(new Object({"mp3":"10040",	"title":"It's That Asshole Talking Behind My Back Again", "value1":"4", "value2":"7", "value3":"5", "value4":"5", "value5":"4", "timer":"392"})); 
sounds.memory.push(new Object({"mp3":"10041",	"title":"It Was The first in This Day", "value1":"7", "value2":"5", "value3":"6", "value4":"5", "value5":"7", "timer":"420"})); 
sounds.memory.push(new Object({"mp3":"10046",	"title":" There's a Little Bit More Left", "value1":"4", "value2":"2", "value3":"2", "value4":"3", "value5":"2", "timer":"393"})); 
sounds.memory.push(new Object({"mp3":"10044",	"title":" Liquid Fart", "value1":"5", "value2":"10", "value3":"6", "value4":"10", "value5":"4", "timer":"501"})); 
sounds.memory.push(new Object({"mp3":"10088",	"title":"Rip Ass", "value1":"7", "value2":"5", "value3":"6", "value4":"4", "value5":"4", "timer":"656"})); 
sounds.memory.push(new Object({"mp3":"10045",	"title":" Classic Fart", "value1":"8", "value2":"4", "value3":"7", "value4":"5", "value5":"9", "timer":"445"})); 
sounds.memory.push(new Object({"mp3":"10047",	"title":" Everyday Starts the Same", "value1":"6", "value2":"3", "value3":"4", "value4":"5", "value5":"7", "timer":"525"})); 
sounds.memory.push(new Object({"mp3":"10048",	"title":" Morning Rush Hour", "value1":"7", "value2":"5", "value3":"6", "value4":"4", "value5":"6", "timer":"419"})); 
sounds.memory.push(new Object({"mp3":"10051",	"title":" Pollute The Athmosphere", "value1":"8", "value2":"6", "value3":"7", "value4":"5", "value5":"8", "timer":"575"})); 
sounds.memory.push(new Object({"mp3":"10053",	"title":" Forever Young", "value1":"10", "value2":"5", "value3":"7", "value4":"6", "value5":"8", "timer":"732"})); 
sounds.memory.push(new Object({"mp3":"10054",	"title":" God Mercy", "value1":"3", "value2":"8", "value3":"10", "value4":"6", "value5":"4", "timer":"837"})); 
sounds.memory.push(new Object({"mp3":"10058",	"title":" What Does The Fart Say?", "value1":"6", "value2":"7", "value3":"8", "value4":"7", "value5":"8", "timer":"524"})); 
sounds.memory.push(new Object({"mp3":"10091",	"title":"He Loved You Untill ...", "value1":"8", "value2":"3", "value3":"4", "value4":"2", "value5":"10", "timer":"657"})); 
sounds.memory.push(new Object({"mp3":"10060",	"title":" User Friendly", "value1":"6", "value2":"4", "value3":"3", "value4":"3", "value5":"5", "timer":"315"})); 
sounds.memory.push(new Object({"mp3":"10062",	"title":" The Ugly Duckling", "value1":"5", "value2":"7", "value3":"6", "value4":"6", "value5":"6", "timer":"445"})); 
sounds.memory.push(new Object({"mp3":"10104",	"title":" Old Lasagna Bolognese", "value1":"7", "value2":"6", "value3":"5", "value4":"10", "value5":"8", "timer":"1181"})); 
sounds.memory.push(new Object({"mp3":"10063",	"title":" Born To Be Wild", "value1":"9", "value2":"6", "value3":"8", "value4":"7", "value5":"9", "timer":"1019"})); 
sounds.memory.push(new Object({"mp3":"10108",	"title":" Buttquake", "value1":"10", "value2":"5", "value3":"6", "value4":"5", "value5":"10", "timer":"786"})); 
sounds.memory.push(new Object({"mp3":"10064",	"title":" Vacuum Cleaner", "value1":"8", "value2":"7", "value3":"8", "value4":"6", "value5":"8", "timer":"864"})); 
sounds.memory.push(new Object({"mp3":"10095",	"title":"Fade Away", "value1":"4", "value2":"5", "value3":"8", "value4":"4", "value5":"4", "timer":"966"})); 
sounds.memory.push(new Object({"mp3":"10069",	"title":"Let Fly a Fart", "value1":"5", "value2":"4", "value3":"6", "value4":"5", "value5":"6", "timer":"418"})); 
sounds.memory.push(new Object({"mp3":"10070",	"title":"Liquid Death", "value1":"3", "value2":"10", "value3":"10", "value4":"10", "value5":"4", "timer":"447"})); 
sounds.memory.push(new Object({"mp3":"10065",	"title":" Bloody Merry", "value1":"9", "value2":"9", "value3":"9", "value4":"9", "value5":"9", "timer":"1282"})); 
sounds.memory.push(new Object({"mp3":"10105",	"title":" Too Long to be True", "value1":"9", "value2":"9", "value3":"6", "value4":"10", "value5":"10", "timer":"4704"})); 
sounds.memory.push(new Object({"mp3":"10083",	"title":"Erupt One", "value1":"8", "value2":"6", "value3":"7", "value4":"5", "value5":"7", "timer":"1517"})); 
sounds.memory.push(new Object({"mp3":"10096",	"title":" Pass Gas", "value1":"7", "value2":"5", "value3":"4", "value4":"4", "value5":"6", "timer":"785"})); 
sounds.memory.push(new Object({"mp3":"10103",	"title":"A Week Old Food", "value1":"10", "value2":"7", "value3":"8", "value4":"10", "value5":"10", "timer":"2353"})); 
sounds.memory.push(new Object({"mp3":"10097",	"title":"Echo Fart", "value1":"3", "value2":"8", "value3":"7", "value4":"4", "value5":"4", "timer":"915"})); 
sounds.memory.push(new Object({"mp3":"10089",	"title":"Quack", "value1":"7", "value2":"4", "value3":"5", "value4":"3", "value5":"6", "timer":"707"})); 
sounds.memory.push(new Object({"mp3":"10092",	"title":"Good Night", "value1":"8", "value2":"7", "value3":"6", "value4":"7", "value5":"10", "timer":"1098"})); 

// FART SAYS 
sounds.says = new Array(null); 
sounds.says.push(new Object({"mp3":"10002",	"title":"Broken Trumpet", "value1":"8", "value2":"8", "value3":"5", "value4":"7", "value5":"7", "timer":"550"})); 
sounds.says.push(new Object({"mp3":"10057",	"title":" Overpriced Soup", "value1":"5", "value2":"4", "value3":"6", "value4":"3", "value5":"6", "timer":"551"})); 
sounds.says.push(new Object({"mp3":"10059",	"title":" Short But Stinky", "value1":"5", "value2":"7", "value3":"8", "value4":"4", "value5":"6", "timer":"368"})); 
sounds.says.push(new Object({"mp3":"10068",	"title":" Egg's Revenge", "value1":"8", "value2":"9", "value3":"7", "value4":"7", "value5":"8", "timer":"758"})); 

// FART SWEEPER 
sounds.sweeper = new Array(); 
sounds.sweeper.push(new Object({"mp3":"10006",	"title":" Start a Harley", "value1":"8", "value2":"7", "value3":"5", "value4":"6", "value5":"7", "timer":"1359"})); 
sounds.sweeper.push(new Object({"mp3":"10015",	"title":"Ocean Liner Titanic", "value1":"10", "value2":"5", "value3":"6", "value4":"8", "value5":"10", "timer":"1307"})); 
sounds.sweeper.push(new Object({"mp3":"10005",	"title":"Big Mac's Revenge", "value1":"6", "value2":"5", "value3":"8", "value4":"6", "value5":"4", "timer":"992"})); 
sounds.sweeper.push(new Object({"mp3":"10012",	"title":"Bark", "value1":"7", "value2":"3", "value3":"5", "value4":"3", "value5":"6", "timer":"159"})); 
sounds.sweeper.push(new Object({"mp3":"10009",	"title":"Crack The Ripper", "value1":"9", "value2":"6", "value3":"7", "value4":"8", "value5":"9", "timer":"2561"})); 
sounds.sweeper.push(new Object({"mp3":"10010",	"title":"Date Breaker", "value1":"3", "value2":"2", "value3":"7", "value4":"5", "value5":"5", "timer":"184"})); 
sounds.sweeper.push(new Object({"mp3":"10003",	"title":"Angry Bee", "value1":"9", "value2":"4", "value3":"7", "value4":"4", "value5":"7", "timer":"731"})); 
sounds.sweeper.push(new Object({"mp3":"10001",	"title":" The Voice Of The Toothless One", "value1":"6", "value2":"4", "value3":"9", "value4":"6", "value5":"4", "timer":"863"})); 
sounds.sweeper.push(new Object({"mp3":"10076",	"title":"Who's There?", "value1":"6", "value2":"4", "value3":"5", "value4":"3", "value5":"7", "timer":"1204"})); 
sounds.sweeper.push(new Object({"mp3":"10077",	"title":"Mario Game", "value1":"5", "value2":"3", "value3":"4", "value4":"4", "value5":"4", "timer":"1647"})); 
sounds.sweeper.push(new Object({"mp3":"10020",	"title":"Dirt BIke", "value1":"9", "value2":"10", "value3":"5", "value4":"7", "value5":"10", "timer":"1803"})); 
sounds.sweeper.push(new Object({"mp3":"10078",	"title":"Stomp on the Barking Spider", "value1":"9", "value2":"6", "value3":"5", "value4":"6", "value5":"10", "timer":"1880"})); 
sounds.sweeper.push(new Object({"mp3":"10022",	"title":"Peppa Pig", "value1":"5", "value2":"8", "value3":"10", "value4":"7", "value5":"6", "timer":"759"})); 
sounds.sweeper.push(new Object({"mp3":"10080",	"title":"I didn't Expect That", "value1":"6", "value2":"10", "value3":"6", "value4":"7", "value5":"5", "timer":"2117"})); 
sounds.sweeper.push(new Object({"mp3":"10082",	"title":"Ohh Noo!", "value1":"5", "value2":"5", "value3":"6", "value4":"3", "value5":"4", "timer":"1595"})); 
sounds.sweeper.push(new Object({"mp3":"10024",	"title":"Weed Wacker Won't Start", "value1":"5", "value2":"8", "value3":"10", "value4":"8", "value5":"6", "timer":"1020"})); 
sounds.sweeper.push(new Object({"mp3":"10027",	"title":" Desperate House Wife", "value1":"10", "value2":"8", "value3":"10", "value4":"9", "value5":"10", "timer":"2352"})); 
sounds.sweeper.push(new Object({"mp3":"10083",	"title":"Drop a Rose", "value1":"6", "value2":"5", "value3":"6", "value4":"5", "value5":"8", "timer":"1520"})); 
sounds.sweeper.push(new Object({"mp3":"10029",	"title":" Even I Was Suprised", "value1":"8", "value2":"9", "value3":"8", "value4":"8", "value5":"10", "timer":"1073"})); 
sounds.sweeper.push(new Object({"mp3":"10030",	"title":" Didn't See That Coming", "value1":"9", "value2":"7", "value3":"8", "value4":"7", "value5":"9", "timer":"1829"})); 
sounds.sweeper.push(new Object({"mp3":"10028",	"title":" Rally Car", "value1":"10", "value2":"9", "value3":"7", "value4":"10", "value5":"10", "timer":"2483"})); 
sounds.sweeper.push(new Object({"mp3":"10031",	"title":" Cave Fart", "value1":"6", "value2":"3", "value3":"4", "value4":"3", "value5":"10", "timer":"1491"})); 
sounds.sweeper.push(new Object({"mp3":"10032",	"title":"Full Lecture Room a Nerd Fart", "value1":"7", "value2":"3", "value3":"7", "value4":"4", "value5":"5", "timer":"785"})); 
sounds.sweeper.push(new Object({"mp3":"10033",	"title":"Cut The Cheese ", "value1":"3", "value2":"5", "value3":"6", "value4":"4", "value5":"4", "timer":"1045"})); 
sounds.sweeper.push(new Object({"mp3":"10087",	"title":"Dive Alert", "value1":"10", "value2":"6", "value3":"5", "value4":"7", "value5":"10", "timer":"968"})); 
sounds.sweeper.push(new Object({"mp3":"10035",	"title":" Too Much Beans ", "value1":"4", "value2":"8", "value3":"9", "value4":"5", "value5":"6", "timer":"734"})); 
sounds.sweeper.push(new Object({"mp3":"10039",	"title":"Play The Butt Trumpet", "value1":"9", "value2":"6", "value3":"7", "value4":"8", "value5":"10", "timer":"707"})); 
sounds.sweeper.push(new Object({"mp3":"10040",	"title":"It's That Asshole Talking Behind My Back Again", "value1":"4", "value2":"7", "value3":"5", "value4":"5", "value5":"4", "timer":"392"})); 
sounds.sweeper.push(new Object({"mp3":"10041",	"title":"It Was The first in This Day", "value1":"7", "value2":"5", "value3":"6", "value4":"5", "value5":"7", "timer":"420"})); 
sounds.sweeper.push(new Object({"mp3":"10046",	"title":" There's a Little Bit More Left", "value1":"4", "value2":"2", "value3":"2", "value4":"3", "value5":"2", "timer":"393"})); 
sounds.sweeper.push(new Object({"mp3":"10088",	"title":"Rip Ass", "value1":"7", "value2":"5", "value3":"6", "value4":"4", "value5":"4", "timer":"656"})); 
sounds.sweeper.push(new Object({"mp3":"10045",	"title":" Classic Fart", "value1":"8", "value2":"4", "value3":"7", "value4":"5", "value5":"9", "timer":"445"})); 
sounds.sweeper.push(new Object({"mp3":"10047",	"title":" Everyday Starts the Same", "value1":"6", "value2":"3", "value3":"4", "value4":"5", "value5":"7", "timer":"525"})); 
sounds.sweeper.push(new Object({"mp3":"10048",	"title":" Morning Rush Hour", "value1":"7", "value2":"5", "value3":"6", "value4":"4", "value5":"6", "timer":"419"})); 
sounds.sweeper.push(new Object({"mp3":"10090",	"title":"Compressed Buttocks", "value1":"6", "value2":"4", "value3":"5", "value4":"7", "value5":"8", "timer":"1073"})); 
sounds.sweeper.push(new Object({"mp3":"10051",	"title":" Pollute The Athmosphere", "value1":"8", "value2":"6", "value3":"7", "value4":"5", "value5":"8", "timer":"575"})); 
sounds.sweeper.push(new Object({"mp3":"10053",	"title":" Forever Young", "value1":"10", "value2":"5", "value3":"7", "value4":"6", "value5":"8", "timer":"732"})); 
sounds.sweeper.push(new Object({"mp3":"10054",	"title":" God Mercy", "value1":"3", "value2":"8", "value3":"10", "value4":"6", "value5":"4", "timer":"837"})); 
sounds.sweeper.push(new Object({"mp3":"10055",	"title":"Full Diaper ", "value1":"7", "value2":"10", "value3":"6", "value4":"5", "value5":"7", "timer":"315"})); 
sounds.sweeper.push(new Object({"mp3":"10058",	"title":" What Does The Fart Say?", "value1":"6", "value2":"7", "value3":"8", "value4":"7", "value5":"8", "timer":"524"})); 
sounds.sweeper.push(new Object({"mp3":"10091",	"title":"He Loved You Untill ...", "value1":"8", "value2":"3", "value3":"4", "value4":"2", "value5":"10", "timer":"657"})); 
sounds.sweeper.push(new Object({"mp3":"10060",	"title":" User Friendly", "value1":"6", "value2":"4", "value3":"3", "value4":"3", "value5":"5", "timer":"315"})); 
sounds.sweeper.push(new Object({"mp3":"10062",	"title":" The Ugly Duckling", "value1":"5", "value2":"7", "value3":"6", "value4":"6", "value5":"6", "timer":"445"})); 
sounds.sweeper.push(new Object({"mp3":"10063",	"title":" Born To Be Wild", "value1":"9", "value2":"6", "value3":"8", "value4":"7", "value5":"9", "timer":"1019"})); 
sounds.sweeper.push(new Object({"mp3":"10108",	"title":" Buttquake", "value1":"10", "value2":"5", "value3":"6", "value4":"5", "value5":"10", "timer":"786"})); 
sounds.sweeper.push(new Object({"mp3":"10064",	"title":" Vacuum Cleaner", "value1":"8", "value2":"7", "value3":"8", "value4":"6", "value5":"8", "timer":"864"})); 
sounds.sweeper.push(new Object({"mp3":"10095",	"title":"Fade Away", "value1":"4", "value2":"5", "value3":"8", "value4":"4", "value5":"4", "timer":"966"})); 
sounds.sweeper.push(new Object({"mp3":"10069",	"title":"Let Fly a Fart", "value1":"5", "value2":"4", "value3":"6", "value4":"5", "value5":"6", "timer":"418"})); 
sounds.sweeper.push(new Object({"mp3":"10070",	"title":"Liquid Death", "value1":"3", "value2":"10", "value3":"10", "value4":"10", "value5":"4", "timer":"447"})); 
sounds.sweeper.push(new Object({"mp3":"10065",	"title":" Bloody Merry", "value1":"9", "value2":"9", "value3":"9", "value4":"9", "value5":"9", "timer":"1282"})); 
sounds.sweeper.push(new Object({"mp3":"10105",	"title":" Too Long to be True", "value1":"9", "value2":"9", "value3":"6", "value4":"10", "value5":"10", "timer":"4704"})); 
sounds.sweeper.push(new Object({"mp3":"10083",	"title":"Erupt One", "value1":"8", "value2":"6", "value3":"7", "value4":"5", "value5":"7", "timer":"1517"})); 
sounds.sweeper.push(new Object({"mp3":"10096",	"title":" Pass Gas", "value1":"7", "value2":"5", "value3":"4", "value4":"4", "value5":"6", "timer":"785"})); 
sounds.sweeper.push(new Object({"mp3":"10103",	"title":"A Week Old Food", "value1":"10", "value2":"7", "value3":"8", "value4":"10", "value5":"10", "timer":"2353"})); 
sounds.sweeper.push(new Object({"mp3":"10102",	"title":" Old Medicines", "value1":"10", "value2":"6", "value3":"6", "value4":"10", "value5":"9", "timer":"1595"})); 
sounds.sweeper.push(new Object({"mp3":"10097",	"title":"Echo Fart", "value1":"3", "value2":"8", "value3":"7", "value4":"4", "value5":"4", "timer":"915"})); 
sounds.sweeper.push(new Object({"mp3":"10106",	"title":" Couldn't Hold it any More", "value1":"5", "value2":"10", "value3":"10", "value4":"10", "value5":"6", "timer":"4833"})); 
sounds.sweeper.push(new Object({"mp3":"10089",	"title":"Quack", "value1":"7", "value2":"4", "value3":"5", "value4":"3", "value5":"6", "timer":"707"})); 
sounds.sweeper.push(new Object({"mp3":"10092",	"title":"Good Night", "value1":"8", "value2":"7", "value3":"6", "value4":"7", "value5":"10", "timer":"1098"})); 

// MIX FARTS 
sounds.mix = new Array(); 
sounds.mix.push(new Object({"mp3":"empty",	"title":"TRY HARD", "value1":"5", "value2":"5", "value3":"5", "value4":"5", "value5":"5", "timer":"865"})); 
sounds.mix.push(new Object({"mp3":"t01swe",	"title":"Blow 1", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"993"})); 
sounds.mix.push(new Object({"mp3":"t02kjh",	"title":"Blow 2", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"524"})); 
sounds.mix.push(new Object({"mp3":"t03kio",	"title":" Oooow", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"706"})); 
sounds.mix.push(new Object({"mp3":"t05gtz",	"title":" Ooooghw", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"1255"})); 
sounds.mix.push(new Object({"mp3":"t04cde",	"title":"Ugh", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"835"})); 
sounds.mix.push(new Object({"mp3":"t06nbv",	"title":" Arrrrgh", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"1255"})); 
sounds.mix.push(new Object({"mp3":"t07mki",	"title":" Augggh", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"758"})); 
sounds.mix.push(new Object({"mp3":"t08dsq",	"title":"Yeoooow", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"1492"})); 
sounds.mix.push(new Object({"mp3":"t09dvv",	"title":" Oooof", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"654"})); 
sounds.mix.push(new Object({"mp3":"empty",	"title":"SHORT BUT STINKY", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"0"})); 
sounds.mix.push(new Object({"mp3":"s01fvb",	"title":" Short 1", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"654"})); 
sounds.mix.push(new Object({"mp3":"s02dsa",	"title":" Short 2", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"785"})); 
sounds.mix.push(new Object({"mp3":"s03cds",	"title":" Short 3", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"524"})); 
sounds.mix.push(new Object({"mp3":"s04hzu",	"title":" Short 4", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"392"})); 
sounds.mix.push(new Object({"mp3":"s05yyx",	"title":" Short 5", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"237"})); 
sounds.mix.push(new Object({"mp3":"s06asd",	"title":" Short 6", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"263"})); 
sounds.mix.push(new Object({"mp3":"s07xxs",	"title":" Short 7", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"237"})); 
sounds.mix.push(new Object({"mp3":"s08cdf",	"title":" Short 8", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"262"})); 
sounds.mix.push(new Object({"mp3":"s09jju",	"title":" Short 9", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"758"})); 
sounds.mix.push(new Object({"mp3":"s10wer",	"title":" Short 10", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"392"})); 
sounds.mix.push(new Object({"mp3":"s11hjk",	"title":" Short 11", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"262"})); 
sounds.mix.push(new Object({"mp3":"s12vbn",	"title":" Short 12", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"836"})); 
sounds.mix.push(new Object({"mp3":"s13ysd",	"title":" Short 13", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"527"})); 
sounds.mix.push(new Object({"mp3":"s14dew",	"title":" Short 14", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"654"})); 
sounds.mix.push(new Object({"mp3":"empty",	"title":" LONG AND WET", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"0"})); 
sounds.mix.push(new Object({"mp3":"l01jki",	"title":" Long 1", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"2509"})); 
sounds.mix.push(new Object({"mp3":"l02ghj",	"title":" Long 2", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"1646"})); 
sounds.mix.push(new Object({"mp3":"l03sds",	"title":" Long 3", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"1333"})); 
sounds.mix.push(new Object({"mp3":"l04bnm",	"title":" Long 4", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"446"})); 
sounds.mix.push(new Object({"mp3":"l05qwe",	"title":" Long 5", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"890"})); 
sounds.mix.push(new Object({"mp3":"l06dfr",	"title":" Long 6", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"1218"})); 
sounds.mix.push(new Object({"mp3":"l07mnb",	"title":" Long 7", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"941"})); 
sounds.mix.push(new Object({"mp3":"l08frt",	"title":" Long 8", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"1099"})); 
sounds.mix.push(new Object({"mp3":"l09rtz",	"title":" Long 9", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"916"})); 
sounds.mix.push(new Object({"mp3":"l10poi",	"title":" Long 10", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"1019"})); 
sounds.mix.push(new Object({"mp3":"empty",	"title":"RELEASE AND RELIEVE", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"0"})); 
sounds.mix.push(new Object({"mp3":"r01qss",	"title":"Release 1", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"2221"})); 
sounds.mix.push(new Object({"mp3":"r04xer",	"title":" Release 2", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"3031"})); 
sounds.mix.push(new Object({"mp3":"r05kko",	"title":" Release 3", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"2406"})); 
sounds.mix.push(new Object({"mp3":"r06dfr",	"title":" Release 4", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"1594"})); 
sounds.mix.push(new Object({"mp3":"r02jko",	"title":"Splash 1", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"1098"})); 
sounds.mix.push(new Object({"mp3":"r12ggt",	"title":"Splash 2", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"3424"})); 
sounds.mix.push(new Object({"mp3":"r08hzt",	"title":" Relieve 1", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"1700"})); 
sounds.mix.push(new Object({"mp3":"r09dke",	"title":" Relieve 2", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"1960"})); 
sounds.mix.push(new Object({"mp3":"r10ggt",	"title":" Relieve 3", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"889"})); 
sounds.mix.push(new Object({"mp3":"r03igf",	"title":"Relive 4", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"1151"})); 
sounds.mix.push(new Object({"mp3":"s00blk",	"title":" Pause / Blank 0.5s", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"500"})); 
sounds.mix.push(new Object({"mp3":"s00blk",	"title":" Pause / Blank 0.2s", "value1":"1", "value2":"1", "value3":"1", "value4":"1", "value5":"1", "timer":"250"}));
