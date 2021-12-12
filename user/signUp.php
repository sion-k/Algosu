<?php
$user["id"] = $_GET["id"];
$user["pw"] = $_GET["pw"];
$file = fopen("user.json", "a");
fwrite($file, json_encode($user));
fwrite($file, "\n");
echo "Success";
?>