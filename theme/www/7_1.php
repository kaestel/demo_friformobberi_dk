<?php include_once($_SERVER["LOCAL_PATH"]."/includes/segment.php") ?>
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
		<h1>Dilemma 1</h1>
		<div class="front"><a href="/">Forsiden</a></div>
	</div>

	<div id="content">

		<div class="canvas">
			<form name="dilemma" action="7_1.php" method="post" class="i:dilemma dilemma_1">
				<input type="hidden" name="ps" value="answer" />
				<div class="evaluate">
				<? if($ps == "answer") { ?>
					<? if($options == "a") { ?>
						<p class="evaluate_a">
							Du skal tænke på, at den der får 'nej' til at være med i legen måske
							bliver ked af det, fordi hun ikke har nogen at lege med. Det er en god
							idé at sige det på en måde, som hun ikke bliver ked af. Du kunne fx sige:
							"Lige nu leger vi tre sammen, men om lidt må du gerne være med."
							<a href="/media/audio/dilemma/dk_DL_kvinde_1_a_2.mp3" class="sound">Lyt til bamse</a>
						</p>
					<? }
					else if($options == "b") { ?>
						<p class="evaluate_b">
							Det er en meget sød tanke, og pigen vil helt sikkert blive glad for din hjælp.
							Det er altid meget omsorgsfuldt at invitere dem, som ikke har nogen at lege med
							til at lege sammen.
							<a href="/media/audio/dilemma/dk_DL_kvinde_1_b_2.mp3" class="sound">Lyt til bamse</a>
						</p>
					<? }
					else if($options == "c") { ?>
						<p class="evaluate_c">
							Nogle gange kan det være godt at hente en voksen, hvis du oplever, at nogen holdes udenfor
							og er kede af det.
							<a href="/media/audio/dilemma/dk_DL_kvinde_1_c_2.mp3" class="sound">Lyt til bamse</a>
						</p>
					<? } ?>
				<? } ?>
				</div>

				<p class="dilemma">
					Tre piger med kjoler på leger sammen. En fjerde pige vil gerne være med, men får at vide:
					"Du må ikke være med, for du har bukser på, og i vores leg skal man altså have kjole på".
					<a href="/media/audio/dilemma/dk_DL_kvinde_1_1_1.mp3" class="sound">Lyt til dilemmaet</a>
				</p>

				<input type="radio" name="options" value="a" class="ra" id="ra"<?= $options == "a" ? ' checked="checked"' : '' ?> />
				<label for="ra" class="option_a">
					<span>Jeg synes, at det er i orden, at de ikke vil have hende med i legen.</span>
					<a href="/media/audio/dilemma/dk_DL_kvinde_1_a_1.mp3" class="sound">Lyt til svaret</a>
				</label>

				<hr />

				<input type="radio" name="options" value="b" class="rb" id="rb"<?= $options == "b" ? ' checked="checked"' : '' ?> />
				<label for="rb" class="option_b">
					<span>Jeg kan se, at pigen er ked af det og prøver at trøste hende.</span>
					<a href="/media/audio/dilemma/dk_DL_kvinde_1_b_1.mp3" class="sound">Lyt til svaret</a>
				</label>

				<hr />

				<input type="radio" name="options" value="c" class="rc" id="rc"<?= $options == "c" ? ' checked="checked"' : '' ?> />
				<label for="rc" class="option_c">
					<span>Jeg synes, at det er synd for pigen og henter en voksen.</span>
					<a href="/media/audio/dilemma/dk_DL_kvinde_1_c_1.mp3" class="sound">Lyt til svaret</a>
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