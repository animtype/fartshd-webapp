<!DOCTYPE HTML>
<html>
<head>
<title>FartsHD 500</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes">
<link href="fartshd.css" type="text/css" rel="stylesheet">
</head>
<body>
<div id="contents">
<h1 class="blue">500 server error</h1>
<p>
<?
  echo "URL: http://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']."<br>\n";
  $fixer = "checksuexec ".escapeshellarg($_SERVER['DOCUMENT_ROOT'].$_SERVER['REQUEST_URI']);
  echo `$fixer`;
?>
</p>
<div class="separator"></div>
<h3 class="blue">Farts HD</h3>
<p class="blue">
<img src="img/fartshd.png" alt="Farts HD" style="float:left; margin: 0px 20px 20px 0px;" >
A rambunctious app to waft away the most serious of days. Farts HD is perfect for connoisseurs or amateur farters, providing a smorgasbord of fart sounds for all occasions.<br><br>
Easy to use, intuitive, colourful, no adverts and lots of fun for all the family. Farts HD will keep you laughing for days.
</p>
<p style="text-align: center;">

    <a href="https://play.google.com/store/apps/details?id=com.animtypecom.fartshd" target="_blank" class="btn" style="background-image: url(img/google.png)"></a>
    <a href="https://www.facebook.com/pages/Farts-HD/1446433675580200" target="_blank" class="btn" style="background-image: url(img/facebook.png)"></a>

</p>

   
    <div class="separator"></div>
    <p><a href="http://www.fartshd.com">Farts HD</a> | 2014 copyright by AnimType.com</p>

</div>
</body>
</html>
