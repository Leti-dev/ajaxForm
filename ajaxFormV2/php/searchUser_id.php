<?php


$db = new PDO('mysql:host=localhost;dbname=ajax_form', 'root', 'troiswa');
$db->exec('SET NAMES UTF8');

$query = $db->prepare("SELECT * FROM user WHERE id = ?");

$query->execute([$_POST['id']]);
$res = $query->fetch(PDO::FETCH_ASSOC);
$result = json_encode($res);
echo $result;

