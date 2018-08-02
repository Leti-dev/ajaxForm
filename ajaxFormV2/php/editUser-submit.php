<?php
//var_dump($_POST);
if($_POST && $_FILES){
    $email = $_POST['email'];
    $nom = $_POST['nom'];
    $prenom = $_POST['prenom'];
    $adresse = $_POST['adresse'];
    $cp = $_POST['cp'];
    $ville = $_POST['ville'];
    
/* Getting file name */
$filename = $_FILES['file']['name'];

/* Location */
$location = "../upload/".$filename;
$uploadOk = 1;
$imageFileType = pathinfo($location,PATHINFO_EXTENSION);

// Check image format
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
 && $imageFileType != "gif" ) {
 $uploadOk = 0;
}

if($uploadOk == 0){
    $location = "";
}else{
    move_uploaded_file($_FILES['file']['tmp_name'],$location);
}
} 

$bdd = new PDO('mysql:host=localhost;dbname=ajax_form;charset=UTF8', 'root', 'troiswa');
//$bdd->exec('SET NAMES UTF8');

$req = "UPDATE user SET lastname='$nom', firstname='$prenom', address='$adresse', postalCode='$cp', city='$ville', cni='$filename' WHERE email='$email'";

$res = $bdd->prepare($req);
if($res->execute()){
    echo json_encode(["result"=>"true"]);
 } else {
     echo json_encode(["result"=>"false"]);
 }