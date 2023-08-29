<?php include_once($_SERVER["LOCAL_PATH"]."/includes/segment.php") ?>
<!DOCTYPE html>
<html>
<head>
	<title>Fri for mobberi - Bamsemassage</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;" />
	<link rel="shortcut icon" href="/icon.png" />
	<link rel="apple-touch-icon" href="/icon.png" />
	<link type="text/css" rel="stylesheet" media="all" href="css/seg_<?= $_SESSION["segment"] ?>.css" />
	<script type="text/javascript" src="js/seg_<?= $_SESSION["segment"] ?>.js"></script>
</head>

<body class="massage">

<div id="page" class="i:page">

	<div id="header">
		<h1>Bamsemassage</h1>
		<div class="front"><a href="/">Forsiden</a></div>
	</div>

	<div id="content">

		<div class="canvas">
			<ul class="i:massage">
				<li class="bamse_kommer"><a href="/media/video/massage/bamse_kommer_til_danmark.mov">Bamse kommer til Danmark</a></li>
				<li class="skildpadde"><a href="/media/video/massage/skille_skildpadde.mov">Skille skildpadde</a></li>
			</ul>
		</div>

	</div>

	<div id="footer">
		<div class="teddy">
			<h2>Bamse siger:</h2>
			<p>Dejligt at se dig. Her kan du lære hvordan man giver en dejlig massage til en god ven. Du kan også høre om hvordan jeg kom til Danmark, høre historien om Skille Skildpadde eller prøve at give en massage selv. Bare tryk på en af skyerne, så går vi i gang!</p>
		</div>
		<ul class="externals">
			<li class="parents"><a href="#">Forældre</a></li>
			<li class="professionals"><a href="#">Fagfolk</a></li>
		</ul>
	</div>

</div>

</body>
</html>