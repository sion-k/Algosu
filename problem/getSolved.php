<?php
$header_data = [];
array_push($header_data, "user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36 Edg/96.0.1054.43");
array_push($header_data, "accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9");
array_push($header_data, "referer: https://www.acmicpc.net/");
array_push($header_data, "accept-language: ko,en;q=0.9,en-US;q=0.8");   // acmicpc.com 서버가 크롬 브라우저로 인식하게 Request header 구성
extract($_POST);
extract($_GET);
extract($_SERVER);

$url = "https://www.acmicpc.net/user/" . $_GET["handle"];     // 내가 푼 문제수를 파싱할 유저 프로필 페이지
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL,$url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER,true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $header_data);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$response = curl_exec($ch);
if(curl_errno($ch)){
    echo 'Curl error: ' . curl_error($ch);
}
cURL_close($ch);
$tmp = explode("맞은 문제</h3></div><div class=\"panel-body\"><div class=\"problem-list\">", $response, 3)[1];  // 맞은문제 div의 앞부분을 잘라냄.
$tmp = explode("</div></div></div>", $tmp, 2)[0];  //맞은문제 </div>와 그 뒤의 텍스트를 잘라냄.
$tmp = explode("\" class=\"\">", $tmp);  //맞은 문제의 url 뒤에 있는 문자열(" class="">)을 기준으로 split
$result = [];
error_reporting(0);
foreach($tmp as $v) {  //$v에는 현재 1156</a> <a href="/problem/1156 형태의 문자열이 들어가있음.
   $cv = explode("</a>", $v, 2)[0];  // 따라서 <a/> 왼쪽의 문자열을 가져오면 최종적으로 문제 번호를 파싱하게됨.
    echo $cv . " ";   // js에서 리스트로 반환하기 편하도록 공백을 기준으로 출력
}
?>