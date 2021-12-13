<?php
$file = fopen("problem.json", "r");
while (!feof($file)) {
  $line = fgets($file);
  $p = json_decode($line, true);
  echo $p["id"] . " "; 
}
?>