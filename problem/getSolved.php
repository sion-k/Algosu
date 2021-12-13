<?php
$header_data = [];
//array_push($header_data, "authority: www.acmicpc.net");
array_push($header_data, "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36 Edg/96.0.1054.43");
array_push($header_data, "accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9");
array_push($header_data, "referer: https://www.acmicpc.net/");
array_push($header_data, "accept-language: ko,en;q=0.9,en-US;q=0.8");
extract($_POST);
extract($_GET);
extract($_SERVER);

$url = "https://www.acmicpc.net/user/" . $_GET["handle"];
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL,$url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER,true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $header_data);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$response = cURL_exec($ch);
if(curl_errno($ch)){
    echo 'Curl error: ' . curl_error($ch);
}
cURL_close($ch);
$tmp = explode("맞은 문제</h3></div><div class=\"panel-body\"><div class=\"problem-list\">", $response, 3)[1];
$tmp = explode("</div></div></div>", $tmp, 2)[0];
$tmp = explode("\" class=\"\">", $tmp);
$result = [];
error_reporting(0);
foreach($tmp as $v) {
    $cv = explode("</a>", explode("/problem/", $v, 2)[1])[0];
    echo $cv . " ";
}
?>