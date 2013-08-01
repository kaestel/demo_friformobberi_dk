<? include_once($_SERVER['FRAMEWORK_PATH']."/include/segment.php") ?>
<!DOCTYPE html>
<html>
<head>
	<title>Fri for mobberi - Puslespil</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;" />
	<link rel="shortcut icon" href="/icon.png" />
	<link rel="apple-touch-icon" href="/icon.png" />
	<link type="text/css" rel="stylesheet" media="all" href="css/seg_<?= $_SESSION["segment"] ?>.css" />
	<script type="text/javascript" src="js/seg_<?= $_SESSION["segment"] ?>.js"></script>
</head>

<body class="puzzle">

<div id="page" class="i:page">

	<div id="header">
		<h1>Puslespil</h1>
		<div class="front"><a href="/">Forsiden</a></div>
	</div>

	<div id="content">

		<div class="canvas">
			<div class="puzzle_4 i:puzzle">
				<div class="piece piece_1"></div>
				<div class="piece piece_2"></div>
				<div class="piece piece_3"></div>
				<div class="piece piece_4"></div>
				<div class="piece piece_5"></div>
				<div class="piece piece_6"></div>
				<div class="piece piece_7"></div>
				<div class="piece piece_8"></div>
				<div class="piece piece_9"></div>
				<div class="piece piece_10"></div>
				<div class="piece piece_11"></div>
				<ul class="nav">
					<li class="puzzle"><a href="5_0.php">Tilbage</a></li>
				</ul>
			</div>
		</div>

	</div>

	<div id="footer">
		<div class="teddy">
			<h2>Bamse siger:</h2>
			<p>Hej med dig.</p>
		</div>
		<ul class="externals">
			<li class="parents"><a href="#">Forældre</a></li>
			<li class="professionals"><a href="#">Fagfolk</a></li>
		</ul>
	</div>

</div>

</body>
</html>