<?php include_once($_SERVER["LOCAL_PATH"]."/includes/segment.php") ?>
<!DOCTYPE html>
<html>
<head>
	<title>Fri for mobberi</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;" />
	<link rel="shortcut icon" href="/icon.png" />
	<link rel="apple-touch-icon" href="/icon.png" />

	<? if($_SESSION["dev"]) { ?>
		<link type="text/css" rel="stylesheet" media="all" href="/css/lib/seg_<?= $_SESSION["segment"] ?>_include.css" />
		<script type="text/javascript" src="/js/lib/seg_<?= $_SESSION["segment"] ?>_include.js"></script>
	<? } else { ?>
		<link type="text/css" rel="stylesheet" media="all" href="/css/seg_<?= $_SESSION["segment"] ?>.css" />
		<script type="text/javascript" src="/js/seg_<?= $_SESSION["segment"] ?>.js"></script>
	<? } ?>

</head>

<body class="front i:validdevice">

<div id="page" class="i:page">

	<div id="header" class="i:header">
		<h1>Fri for mobberi</h1>
		<div class="front"><a href="/">Forsiden</a></div>
	</div>

	<div id="content">
		<div class="canvas">
			<ul class="front i:front">
				<li class="massage"><h3><a href="1_0.php">Bamsemassage</a></h3></li>
				<li class="friends"><h3><a href="2_0.php">Diplom</a></h3></li>
				<!--li class="snowboard"><h3><a href="3_0.php">Snowboard</a></h3></li-->
				<li class="dance"><h3><a href="4_0.php">Rytmik</a></h3></li>
				<li class="puzzle"><h3><a href="5_0.php">Puslespil</a></h3></li>
				<li class="gotchi"><h3><a href="6_0.php">Påklædning</a></h3></li>
				<li class="dilemma"><h3><a href="7_0.php">Hjælp en ven</a></h3></li>
				<!--li class="paint"><h3><a href="8_0.php">Mal</a></h3></li-->
				<li class="jump"><h3><a href="9_0.php">Hoppespil</a></h3></li>
			</ul>
		</div>
	</div>

	<div id="footer">
		<div class="teddy">
			<h2>Hej med dig</h2>
			<p>Hej med dig. Jeg hedder Bamseven. Velkommen indenfor til en verden fri for mopperi. Tag en tur rundt i min verden; her kan du spille, danse til god musik eller give mig nyt tøj på. Så kom nu med!</p>
		</div>
		<ul class="externals">
			<li class="parents"><a href="#">Forældre</a></li>
			<li class="professionals"><a href="#">Fagfolk</a></li>
		</ul>
	</div>

</div>

</body>
</html>