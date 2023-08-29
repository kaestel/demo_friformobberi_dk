<?php
	$name = isset($_GET["name"]) ? $_GET["name"] : "";
	$gender = isset($_GET["gender"]) ? $_GET["gender"] : "";
?>
<!DOCTYPE html>
<html>
<head>
	<title>Fri for mobberi - Vennediplom - <?= $name ?></title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;" />
	<link rel="shortcut icon" href="/icon.png" />
	<link rel="apple-touch-icon" href="/icon.png" />
	<style type="text/css">
		body {margin: 0;}
		.diploma {postion: absolute; top: 0; left: 0; height: 941px; width: 650px; background: transparent url(/img/bg_2_0_diplom_girl.jpg) no-repeat top center;}
		.boy .diploma {background-image: url(/img/bg_2_0_diplom_boy.jpg);}
		.name {position: absolute; top: 400px; width: 650px; text-align: center; font-family: Times; font-size: 45px; color: #ffffff;}
	</style>
</head>

<body class="<?= $gender ?>">

<div class="diploma">
	<div class="name"><?= $name ?></div>
</div>

</body>
</html>
