<?php

// database connection :
$db = new PDO('mysql:host=localhost;dbname=ajax_form', 'root', 'troiswa');
$db->exec('SET NAMES UTF8');

// get user data from db :
var_dump($_POST);
$query = $db->prepare('SELECT * FROM user WHERE email = ?');

$query->execute([$_POST['mail']]);
$res = $query->fetch(PDO::FETCH_ASSOC);

if(!$res){
    echo json_encode(['validation' => 'badUser',
                      'error'      => 'Veuillez créer un compte']);
    exit();
}

echo json_encode(['validation' => true,
                  'mail'       => $res['email'],
                  'lastName'   => $res['lastname'],
                  'firstName'  => $res['firstname'],
                  'address'    => $res['address'],
                  'zip'        => $res['postalCode'],
                  'city'       => $res['city'],
                  'file'       => $res['cni']]);