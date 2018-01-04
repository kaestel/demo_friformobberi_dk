<?php include_once($_SERVER["LOCAL_PATH"]."/includes/segment.php") ?>
<!DOCTYPE html>
<html>
<head>
	<title>Fri for mobberi - Bamsegotchi</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;" />
	<link rel="shortcut icon" href="/icon.png" />
	<link rel="apple-touch-icon" href="/icon.png" />
	<link type="text/css" rel="stylesheet" media="all" href="css/seg_<?= $_SESSION["segment"] ?>.css" />
	<script type="text/javascript" src="js/seg_<?= $_SESSION["segment"] ?>.js"></script>
</head>

<body class="gotchi">

<div id="page" class="i:page">

	<div id="header">
		<h1>Bamsegotchi</h1>
		<div class="front"><a href="/">Forsiden</a></div>
	</div>

	<div id="content">

		<div class="canvas">
			<ul class="clothes i:gotchi">
				<li class="t1 i1"><a href="#">Hat red</a></li>
				<li class="t2 i2"><a href="#">Glasses black</a></li>
				<li class="t3 i3"><a href="#">Shirt yellow</a></li>
				<li class="t3 i4"><a href="#">Shirt green</a></li>
				<li class="t3 i5"><a href="#">Shirt white</a></li>
				<li class="t4 i6"><a href="#">Jeans red</a></li>
				<li class="t4 i7"><a href="#">Jeans blue</a></li>
				<li class="t4 i8"><a href="#">Jeans green</a></li>
				<li class="t4 i9"><a href="#">Sweats red</a></li>
				<li class="t4 i10"><a href="#">Sweats blue</a></li>
				<li class="t4 i11"><a href="#">Sweats green</a></li>
				<li class="t5 i12"><a href="#">Shoes white</a></li>
			</ul>
			<div class="clothes_big">
				<div class="t1"></div>
				<div class="t2"></div>
				<div class="t3"></div>
				<div class="t4"></div>
				<div class="t5"></div>
			</div>
		</div>

	</div>

	<div id="footer">
		<div class="teddy">
			<h2>Bamse siger:</h2>
			<p>Hej igen. Har du lyst til at give mig tøj på? Du kan vælge lige hvad du har lyst til. Sejt, ikk`?</p>
		</div>
		<ul class="externals">
			<li class="parents"><a href="#">Forældre</a></li>
			<li class="professionals"><a href="#">Fagfolk</a></li>
		</ul>
	</div>

</div>

</body>
</html>