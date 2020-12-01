<?php
	echo "Hello World";
    $fileToDl = $_POST['imageUrl'];
	$save_dir = 'images/';
	$filename = 'photo.jpg';
	$complete_save_location = $save_dir.$filename;
	file_put_contents($complete_save_location, file_get_contents($fileToDl));
?>