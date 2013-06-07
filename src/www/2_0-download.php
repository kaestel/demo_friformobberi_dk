<?php
	$file = isset($_GET["file"]) ? $_GET["file"] : "";
?>
<!DOCTYPE html>
<html>
<head>
	<title>Fri for mobning - Download</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
	<!--meta name="apple-mobile-web-app-capable" content="yes" /-->
	<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;" />
</head>

<body>

<div>

<p>Hold din finger på billedet i 3 sekunder for at gemme.</p>
<img src="<?= $file ?>" />

</div>

</body>
</html>