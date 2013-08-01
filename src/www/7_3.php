<? include_once($_SERVER['FRAMEWORK_PATH']."/include/segment.php") ?>
<?php
$ps = isset($_POST["ps"]) ? $_POST["ps"] : false;
$options = isset($_POST["options"]) ? $_POST["options"] : "";

if($ps == "answer" && $options) {
	// no actions
}
else {
	$ps = false;
}
?>
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
		<h1>Dilemma 3</h1>
		<div class="front"><a href="/">Forsiden</a></div>
	</div>

	<div id="content">

		<div class="canvas">
			<form name="dilemma" action="7_3.php" method="post" class="i:dilemma dilemma_3">
				<input type="hidden" name="ps" value="answer" />
				<div class="evaluate">
				<? if($ps == "answer") { ?>
					<? if($options == "a") { ?>
						<p class="evaluate_a">
							Det kan være den letteste måde at reagere på, hvis man ikke ved, hvad man
							ellers skal gøre. Men hvis du vil være en god kammerat, kan du hente en
							voksen og få dem til at hjælpe pigen. Det kan gøre én rigtig glad når man
							hjælper sine skolekammerater, og ens skolekammerater er også glade for at få hjælp.
							<a href="/media/audio/dilemma/dk_DL_kvinde_3_a_2.mp3" class="sound">Lyt til bamse</a>
						</p>
					<? }
					else if($options == "b") { ?>
						<p class="evaluate_b">
							Det er sødt af dig, at du hjælper pigen. Det vil betyde meget for hende.
							Når man har oplevet at blive drillet for alvor betyder det meget, at
							man har nogle søde skolekammerater.
							<a href="/media/audio/dilemma/dk_DL_kvinde_3_b_2.mp3" class="sound">Lyt til bamse</a>
						</p>
					<? }
					else if($options == "c") { ?>
						<p class="evaluate_c">
							Du siger fra på en kammerats vegne. Det er meget modigt, at du hjælper 
							én af dine skolekammerater. Flot!
							<a href="/media/audio/dilemma/dk_DL_kvinde_3_c_2.mp3" class="sound">Lyt til bamse</a>
						</p>
					<? } ?>
				<? } ?>
				</div>
			
				<p class="dilemma">
					To store piger fra fjerde klasse har spændt ben for én af dine klassekammerater.
					Hun er faldet og har tabt alt mælken.
					<a href="/media/audio/dilemma/dk_DL_kvinde_3_1_1.mp3" class="sound">Lyt til dilemmaet</a>
				</p>

				<input type="radio" name="options" value="a" class="ra" id="ra"<?= $options == "a" ? ' checked="checked"' : '' ?> />
				<label for="ra" class="option_a">
					<span>Jeg er lidt bange for de større elever på skolen, så jeg går videre.</span>
					<a href="/media/audio/dilemma/dk_DL_kvinde_3_a_1.mp3" class="sound">Lyt til svaret</a>
				</label>

				<hr />

				<input type="radio" name="options" value="b" class="rb" id="rb"<?= $options == "b" ? ' checked="checked"' : '' ?> />
				<label for="rb" class="option_b">
					<span>Jeg hjælper pigen, som er faldet, med at samle mælken op og vi går sammen op
					på lærerværelset, da pigen er ked af det.</span>
					<a href="/media/audio/dilemma/dk_DL_kvinde_3_b_1.mp3" class="sound">Lyt til svaret</a>
				</label>

				<hr />

				<input type="radio" name="options" value="c" class="rc" id="rc"<?= $options == "c" ? ' checked="checked"' : '' ?> />
				<label for="rc" class="option_c">
					<span>Jeg siger til de store elever, som har spændt ben, at de ikke kan være det bekendt</span>
					<a href="/media/audio/dilemma/dk_DL_kvinde_3_c_1.mp3" class="sound">Lyt til svaret</a>
				</label>

				<hr />

				<input type="submit" value="Vælg" class="button" />

				<ul class="nav">
					<li class="dilemma"><a href="7_0.php">Tilbage</a></li>
				</ul>

			</form>
		</div>

	</div>

	<div id="footer">
		<div class="teddy">
			<h2>Bamse siger:</h2>
			<p>...</p>
		</div>
		<ul class="externals">
			<li class="parents"><a href="#">Forældre</a></li>
			<li class="professionals"><a href="#">Fagfolk</a></li>
		</ul>
	</div>

</div>

</body>
</html>