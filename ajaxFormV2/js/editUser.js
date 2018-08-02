'use strict';

$(document).ready(function(){
    $('form').on('submit', connexion);
    $('#customFile').change(function(){
        $(".custom-file-label").text($('#customFile').get(0).files[0].name);
    });
    $('#inputEmail').on('input', search);
    
});

function connexion(e){
    // on récupère les valeurs des champs du formulaire
    var email = $('#inputEmail').val();
    var result = true;
    //on vérifie avec une expression régulière que l'email a un format valide
    var regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (! regEmail.test(String(email).toLowerCase())){
        $('#inputEmail').addClass("is-invalid"); //si invalide : message d'erreur
        result = false;
    }
    
    e.preventDefault();
    var fd = new FormData($('#form')[0]);
    
    $.ajax({
        url: 'php/editUser-submit.php',
        method: 'POST',
        data: fd,
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function(data){
            if(data.result == "true"){
                search();
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
    
    
}

function search(){
    var email = $('#inputEmail').val();
    $.ajax({
        url: 'php/editUser-search.php',
        method: 'POST',
        data: { email: email },
        dataType: 'json',
        success: function(data){
            console.log(data);
            if(data.result == "true"){
                $(".infos").show();
                if (data.cni != false) $("#image").attr('src', "upload/" + data.cni);
                $("#infoEmail").text(data.lastname + " " + data.firstname);
                $("#infoLoc").text(data.address + " " + data.postalCode + " " + data.city);
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}