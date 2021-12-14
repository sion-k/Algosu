<?php
$file = fopen("problem.json", "r");
while (!feof($file)) {
  echo fgets($file);
}
?>