#!/usr/bin/php

<?php

$host = "localhost";
$port = 8080;
$now = date("Y-m-d H:i:s");
$log_message = "[".$now."] ceci est un message a logguer !!!";

$url = "http://".$host.":".$port."?log_message=".urlencode($log_message);
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_NOBODY, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response    = curl_exec($ch);
$curl_info   = curl_getinfo($ch);
$status_code = $curl_info['http_code'];
curl_close($ch);

echo "Response :\n";
print_r($response);
echo "\n";
echo "Curl info :\n";
print_r($curl_info);
