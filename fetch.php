<?php
error_reporting(0);

function getdata($id) {
$curl = curl_init();
	$opts = [
		CURLOPT_URL => 'https://api.jikan.moe/v3/anime/'.$id.'', 
		CURLOPT_RETURNTRANSFER => true,
	];
	curl_setopt_array($curl, $opts);
	$response = json_decode(curl_exec($curl), true);
	return $response;
	}

if(isset($_GET[id])){

$data = getdata($_GET[id]);

$jumlahgenre = count($data[genres]);
$genre1 = $data[genres][0][name];
$genre2 = $data[genres][1][name];
$genre3 = $data[genres][2][name];
$genre4 = $data[genres][3][name];
$genre5 = $data[genres][4][name];
$genre6 = $data[genres][5][name];

if($jumlahgenre == "1"){
$genre = $genre1; }
else if($jumlahgenre == "2"){
$genre = "$genre1, $genre2"; }
else if($jumlahgenre == "3"){
$genre = "$genre1, $genre2, $genre3"; }
else if($jumlahgenre == "4"){
$genre = "$genre1, $genre2, $genre3, $genre4"; }
else if($jumlahgenre == "5"){
$genre = "$genre1, $genre2, $genre3, $genre4, $genre5"; }
else if($jumlahgenre >= "6"){
$genre = "$genre1, $genre2, $genre3, $genre4, $genre5, $genre6"; }

$hasil = array(
             title => $data[title],
             japanese => $data[title_japanese],
             genre => $genre,
             type => $data[type],
             status => $data[status],
             episode => $data[episodes],
             aired => $data[aired][string],
             season => $data[premiered],
             studio => $data[studios][0][name],
             duration => $data[duration],
             score => $data[score]
             );

echo json_encode($hasil, JSON_PRETTY_PRINT);

}

?>