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
		<h1>Dilemma 4</h1>
		<div class="front"><a href="/">Forsiden</a></div>
	</div>

	<div id="content">

		<div class="canvas">
			<form name="dilemma" action="7_4.php" method="post" class="i:dilemma dilemma_4">
				<input type="hidden" name="ps" value="answer" />
				<div class="evaluate">
				<? if($ps == "answer") { ?>
					<? if($options == "a") { ?>
						<p class="evaluate_a">
							Det er en meget sød og omsorgsfuld tanke. Det bliver pigen sikkert meget glad
							for. Hun ser nemlig ikke ud til, at hun er glad for at sidde alene, så det
							er godt I har plads til én mere.
							<a href="/media/audio/dilemma/dk_DL_kvinde_4_a_2.mp3" class="sound">Lyt til bamse</a>
						</p>
					<? }
					else if($options == "b") { ?>
						<p class="evaluate_b">
							Det er forståeligt, at du reagerer sådan, fordi det er blevet en vane, at hun er
							alene. Det behøver dog ikke være et udtryk for, at hun helst vil være alene.
							Måske skal hun blot have en invitation til at være med i en gruppe, da hun måske
							tror, at der ikke er nogen, som vil være sammen med hende.
							<a href="/media/audio/dilemma/dk_DL_kvinde_4_b_2.mp3" class="sound">Lyt til bamse</a>
						</p>
					<? }
					else if($options == "c") { ?>
						<p class="evaluate_c">
							I dette tilfælde kan du prøve at lave nogle nye grupper, så pigen også har nogen
							at være sammen med. Det er ikke sjovt at være alene, hvis man ikke selv har valgt 
							det. Måske kan du endda lære noget nyt ved at være sammen med nogle andre, end dem
							du plejer.
							<a href="/media/audio/dilemma/dk_DL_kvinde_4_c_2.mp3" class="sound">Lyt til bamse</a>
						</p>
					<? } ?>
				<? } ?>
				</div>

				<p class="dilemma">
					I sidder i klasseværelset og skal løse nogle opgaver i mindre grupper.
					Èn af dine klassekammerater har ikke nogen at være sammen med og sidder
					alene bagerst i klasseværelset.
					<a href="/media/audio/dilemma/dk_DL_kvinde_4_1_1.mp3" class="sound">Lyt til dilemmaet</a>
				</p>

				<input type="radio" name="options" value="a" class="ra" id="ra"<?= $options == "a" ? ' checked="checked"' : '' ?> />
				<label for="ra" class="option_a">
					<span>Jeg lægger mærke til, at hun ser lidt ensom ud, og derfor spørger
					jeg hende, om hun vil være med i vores gruppe.</span>
					<a href="/media/audio/dilemma/dk_DL_kvinde_4_a_1.mp3" class="sound">Lyt til svaret</a>
				</label>

				<hr />

				<input type="radio" name="options" value="b" class="rb" id="rb"<?= $options == "b" ? ' checked="checked"' : '' ?> />
				<label for="rb" class="option_b">
					<span>Hun vælger tit at være alene, når vi har gruppearbejde, så derfor gør jeg
					ikke noget.</span>
					<a href="/media/audio/dilemma/dk_DL_kvinde_4_b_1.mp3" class="sound">Lyt til svaret</a>
				</label>

				<hr />

				<input type="radio" name="options" value="c" class="rc" id="rc"<?= $options == "c" ? ' checked="checked"' : '' ?> />
				<label for="rc" class="option_c">
					<span>Pigen der sidder alene plejer at være sammen med én anden pige fra
					klassen - men hun er syg i dag, så derfor er hun alene.</span>
					<a href="/media/audio/dilemma/dk_DL_kvinde_4_c_1.mp3" class="sound">Lyt til svaret</a>
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