<?php
// 핸들을 가져오는 함수
session_start();
$id = $_GET["id"];
$oj = $_GET["oj"];

$file = fopen("../user/user.json", "r");
while (!feof($file)) {
  $line = fgets($file);
  $u = json_decode($line, true);
  if ($u["id"] == $id) {
		if (!$u[$oj]) {
			echo "no handle";
		} else {
			echo $u[$oj];
		}
		break;
	}
}
?>