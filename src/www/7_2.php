<?php include_once("include/segment.php") ?>
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
		<h1>Dilemma 2</h1>
		<div class="front"><a href="/">Forsiden</a></div>
	</div>

	<div id="content">

		<div class="canvas">
			<form name="dilemma" action="7_2.php" method="post" class="i:dilemma dilemma_2">
				<input type="hidden" name="ps" value="answer" />
				<div class="evaluate">
				<? if($ps == "answer") { ?>
					<? if($options == "a") { ?>
						<p class="evaluate_a">
							Du viser mod, da du siger fra overfor ham der tegner kruseduller på den anden
							drengs tegning. Det er at være en god kammerat!
							<a href="/media/audio/dilemma/dk_DL_kvinde_2_a_2.mp3" class="sound">Lyt til bamse</a>
						</p>
					<? }
					else if($options == "b") { ?>
						<p class="evaluate_b">
							Hvis du ikke ved, hvordan du selv kan sige fra, er det en god idé at hente
							en voksen og få dem til at hjælpe.
							<a href="/media/audio/dilemma/dk_DL_kvinde_2_b_2.mp3" class="sound">Lyt til bamse</a>
						</p>
					<? }
					else if($options == "c") { ?>
						<p class="evaluate_c">
							Hvis drengen der får tegnet på sin tegning også grinede, var det en sjov leg I
							havde gang i - men han ser ked ud af det, og derfor er det ikke i orden. En
							måde at finde ud af om det er i orden at grine, er at se på de andre børn, der
							er med i legen. Viser de, at de synes det er sjovt eller ej?
							<a href="/media/audio/dilemma/dk_DL_kvinde_2_c_2.mp3" class="sound">Lyt til bamse</a>
						</p>
					<? } ?>
				<? } ?>
				</div>

				<p class="dilemma">
					Flere børn sidder sammen og tegner. Èn dreng tegner kruseduller på en anden drengs
					tegning og det bliver han ked af.
					<a href="/media/audio/dilemma/dk_DL_kvinde_2_1_1.mp3" class="sound">Lyt til dilemmaet</a>
				</p>

				<input type="radio" name="options" value="a" class="ra" id="ra"<?= $options == "a" ? ' checked="checked"' : '' ?> />
				<label for="ra" class="option_a">
					<span>Jeg siger til ham der tegner kruseduller, at han skal stoppe.</span>
					<a href="/media/audio/dilemma/dk_DL_kvinde_2_a_1.mp3" class="sound">Lyt til svaret</a>
				</label>

				<hr />

				<input type="radio" name="options" value="b" class="rb" id="rb"<?= $options == "b" ? ' checked="checked"' : '' ?> />
				<label for="rb" class="option_b">
					<span>Jeg kan se, at drengen der får tegnet på sin tegning ikke er glad, så jeg henter en voksen.</span>
					<a href="/media/audio/dilemma/dk_DL_kvinde_2_b_1.mp3" class="sound">Lyt til svaret</a>
				</label>

				<hr />

				<input type="radio" name="options" value="c" class="rc" id="rc"<?= $options == "c" ? ' checked="checked"' : '' ?> />
				<label for="rc" class="option_c">
					<span>Ham der tegner kruseduller ser ud til at more sig, og jeg griner sammen med ham.</span>
					<a href="/media/audio/dilemma/dk_DL_kvinde_2_c_1.mp3" class="sound">Lyt til svaret</a>
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