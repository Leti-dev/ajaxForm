<?php

$db = new PDO('mysql:host=localhost;dbname=ajax_form', 'root', 'troiswa');
$db->exec('SET NAMES UTF8');

$query = $db->prepare('SELECT id FROM user WHERE email = ? AND password = ?');
$query->execute([$_POST['mail'], $_POST['password']]);
$userInfo = $query->fetch(PDO::FETCH_ASSOC);


if(array_key_exists('mail', $_POST) && array_key_exists('password',$_POST))
    if(!empty($userInfo)){
        echo json_encode(["validation" => true]);
    }else{
        echo json_encode(["validation" => false]);
    }
