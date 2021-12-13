<?php
session_start();
$id = $_GET["id"];
$pw = $_GET["pw"];
$file = fopen("user.json", "r");
while (!feof($file)) {
  $line = fgets($file);
  $u = json_decode($line, true);
  if ($u["id"] == $id && $u["pw"] == $pw) {
    echo $id;
    break;
  }
}
?>