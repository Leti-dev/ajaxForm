<?php

$db = new PDO('mysql:host=localhost;dbname=ajax_form', 'root', 'troiswa');
$db->exec('SET NAMES UTF8');

$query = $db->prepare('SELECT id, email, lastname, firstname, address, postalCode, city, cni FROM user');

$query->execute();
$res = $query->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($res);
