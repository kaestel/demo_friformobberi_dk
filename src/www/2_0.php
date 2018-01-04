<?php include_once($_SERVER["LOCAL_PATH"]."/includes/segment.php") ?>
<?php

$ps = isset($_POST["ps"]) ? $_POST["ps"] : false;
$name = isset($_POST["name"]) ? $_POST["name"] : "";
$gender = isset($_POST["gender"]) ? $_POST["gender"] : "";
$file = isset($_POST["file"]) ? $_POST["file"] : "";


// create diploma
if($ps == "create" && $name && $gender) {

	// call image generator
//	print "http://htmlto.dearapi.com/api/v1/jpg?jpg[crop_w]=650&jpg[uri]=".urlencode("http://".$_SERVER["HTTP_HOST"]."/2_0-diploma.php?name=$name&gender=$gender");
	$image = file_get_contents("http://htmlto.dearapi.com/api/v1/jpg?jpg[crop_w]=650&jpg[uri]=".urlencode("http://".$_SERVER["HTTP_HOST"]."/2_0-diploma.php?name=$name&gender=$gender"));
//	$image = file_get_contents("img/bg_2_0_diplom_boy.jpg");
	if($image) {
		$file = "library/diplomas/".date("Ymd_His")."_".preg_replace("/[ÆØÅÖÜæøåöü\?\=\:\.\!\+]/", "", preg_replace("/[, \/]/", "_", $name)).".jpg";

		// save response file
		$image_file = fopen($file, "w+");
		fwrite($image_file, $image);
		fclose($image_file);
	}
	else {
		$ps = false;
	}
}
// force download of diploma
else if($ps == "download" && $file) {

	// Set headers
    header("Cache-Control: public");
    header("Content-Description: Download diplom");
    header("Content-Disposition: attachment; filename=$file");
    header("Content-Type: image/jpg");
    header("Content-Transfer-Encoding: binary");

	readfile($file);

	exit();
}
else {
	$ps = false;
}

?>
<!DOCTYPE html>
<html>
<head>
	<title>Fri for mobberi - Vennediplom</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;" />
	<link rel="shortcut icon" href="/icon.png" />
	<link rel="apple-touch-icon" href="/icon.png" />
	<link type="text/css" rel="stylesheet" media="all" href="css/seg_<?= $_SESSION["segment"] ?>.css" />
	<script type="text/javascript" src="js/seg_<?= $_SESSION["segment"] ?>.js"></script>
</head>

<body class="friends">

<div id="page" class="i:page">

	<div id="header">
		<h1>Vennediplom</h1>
		<div class="front"><a href="/">Forsiden</a></div>
	</div>

	<div id="content">

		<div class="canvas">
			<form name="friends" action="2_0.php" method="post" class="friends i:friends">
			<? if($ps == "create") { ?>
				<input type="hidden" name="ps" value="download" />
				<input type="hidden" name="file" value="<?= $file?>" class="file" />
				<img src="<?= $file ?>" alt="Vennediplom - <?= $name ?>" />
				
				<input type="submit" value="Download" class="button" />
				<a href="2_0.php">Lav et andet diplom</a>
			<? }
			else { ?>
					<input type="hidden" name="ps" value="create" />

					<div class="boy_div">
						<label for="boy">Dreng</label>
						<input type="radio" name="gender" value="boy" class="boy" id="boy" <?= $gender == "boy" ? ' checked="checked"' : '' ?> />
					</div>
					<div class="girl_div">
						<label for="girl">Pige</label>
						<input type="radio" name="gender" value="girl" class="girl" id="girl" <?= $gender == "girl" ? ' checked="checked"' : '' ?> />
					</div>
					<label class="namelabel" for="name">Skriv dit navn:</label>
					<input type="text" name="name" value="<?= $name ?>" class="name" />

					<input type="submit" value="Sæt ind" class="button" />
			<? } ?>
			</form>
		</div>

	</div>

	<div id="footer">
		<div class="teddy">
			<h2>Bamse siger:</h2>
			<p>Juhuu, vi er venner ...</p>
		</div>
		<ul class="externals">
			<li class="parents"><a href="#">Forældre</a></li>
			<li class="professionals"><a href="#">Fagfolk</a></li>
		</ul>
	</div>

</div>

</body>
</html>