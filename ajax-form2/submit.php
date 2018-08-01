<?php

// check image type and size :
$allowedTypes = ['jpeg', 'jpg', 'png', 'gif'];
$temporary = explode(".", $_FILES['file']['name']);
$fileExtension = end($temporary);

if(!in_array($fileExtension, $allowedTypes)){
    echo json_encode(['validation' => 'badExt',
                      'error'      => 'Le type de fichier n\'est pas accepté']);
    exit();
}

if($_FILES["file"]["size"] > 100000){
    echo json_encode(['validation' => 'badSize',
                      'error'      => 'La taille du fichier est trop importante']);
    exit();
}

// database connection :
$db = new PDO('mysql:host=localhost;dbname=ajax_form', 'root', 'troiswa');
$db->exec('SET NAMES UTF8');

// update db with new user data :
$query = $db->prepare('UPDATE user SET email = ?, lastname = ?, firstname = ?, address = ?, postalCode = ?, cni = ?');

$query->execute([$_POST['mail'],
                 $_POST['lastName'],
                 $_POST['firstName'],
                 $_POST['address'],
                 $_POST['zip'],
                 $_FILES['file']['name']]);

// get user data from db :
$query = $db->prepare('SELECT * FROM user WHERE email = ?');

$query->execute([$_POST['mail']]);
$res = $query->fetch(PDO::FETCH_ASSOC);

// check existing user :
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