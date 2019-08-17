// copyright Dr.Peter

app.vibrate = function () {
	console.log("V I B R A T E ******");
	try {
		navigator.notification.vibrate(100);			
	} catch (e) {}	
}
app.vibrateCasual = function () {
	console.log("V I B R A T E ******");
	try {
		navigator.notification.vibrate(250);			
	} catch (e) {}	
}