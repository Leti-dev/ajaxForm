<?php
if(array_key_exists('email',$_POST)){
    $email = $_POST['email'];
    $db = new PDO('mysql:host=localhost;dbname=ajax_form', 'root', 'troiswa');
    $db->exec('SET NAMES UTF8');

    $req = "SELECT * FROM user WHERE email='$email'";
    $res = $db->query($req, PDO::FETCH_ASSOC);
    $res = $res->fetch();
    if(is_array($res) && count($res) > 0){
        $res["result"] = "true";
       // $res = json_encode($res);
        echo json_encode($res);
     } else {
         echo json_encode(["result"=>"false"]);
     }
}