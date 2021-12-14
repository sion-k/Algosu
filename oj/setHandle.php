<?php
session_start();
$id = $_GET["id"];
$oj = $_GET["oj"];
$handle = $_GET["handle"];

$file = fopen("../user/user.json", "r");
$updated = [];
while (!feof($file)) {
  $line = fgets($file);
  $u = json_decode($line, true);
  if ($u["id"] == $id) {
    $u[$oj] = $handle;
    echo "update success";
  }
	array_push($updated, $u);
}
$file = fopen("../user/user.json", "w");
foreach ($updated as $user)
  if ($user) {
    fwrite($file, json_encode($user));
    fwrite($file, "\n");
  }
?>