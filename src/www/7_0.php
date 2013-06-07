<?php include_once("include/segment.php") ?>
<!DOCTYPE html>
<html>
<head>
	<title>Fri for mobberi - Hjælp en ven</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;" />
	<link rel="shortcut icon" href="/icon.png" />
	<link rel="apple-touch-icon" href="/icon.png" />
	<link type="text/css" rel="stylesheet" media="all" href="css/seg_<?= $_SESSION["segment"] ?>.css" />
	<script type="text/javascript" src="js/seg_<?= $_SESSION["segment"] ?>.js"></script>
</head>

<body class="dilemma">

<div id="page" class="i:page">

	<div id="header">
		<h1>Hjælp en ven</h1>
		<div class="front"><a href="/">Forsiden</a></div>
	</div>

	<div id="content">

		<div class="canvas">
			<ul class="start i:dilemmastart">
				<li class="dilemma"><a href="7_1.php" class="dilemma_1">Dilemma 1</a></li>
				<li class="dilemma"><a href="7_2.php" class="dilemma_2">Dilemma 2</a></li>
				<li class="dilemma"><a href="7_3.php" class="dilemma_3">Dilemma 3</a></li>
				<li class="dilemma"><a href="7_4.php" class="dilemma_4">Dilemma 4</a></li>
			</ul>
		</div>

	</div>

	<div id="footer">
		<div class="teddy">
			<h2>Bamse siger:</h2>
			<p>Du ligner en rigtig god ven</p>
		</div>
		<ul class="externals">
			<li class="parents"><a href="#">Forældre</a></li>
			<li class="professionals"><a href="#">Fagfolk</a></li>
		</ul>
	</div>

</div>

</body>
</html>