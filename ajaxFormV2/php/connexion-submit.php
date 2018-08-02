<?php
if(array_key_exists('email',$_POST) && array_key_exists('mdp',$_POST)){
    $email = $_POST['email'];
    $mdp = $_POST['mdp'];
    
    $bdd = new PDO('mysql:host=localhost;dbname=ajax_form', 'root', 'troiswa');
    $req = "SELECT id FROM user WHERE email='$email' AND password='$mdp'";
    $res = $bdd->query($req, PDO::FETCH_ASSOC);
    $res = $res->fetch();
    
    if(is_array($res) && count($res) > 0){
         echo json_encode(["result"=>"true"]);
     } else {
         echo json_encode(["result"=>"false"]);
     }
}