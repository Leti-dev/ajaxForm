'use strict';

$(document).ready(function(){
    $('form').on('submit', connexion);
});

function connexion(e){
     $(".alert-danger").remove();
    // on récupère les valeurs des champs du formulaire
    var email = $('#inputEmail').val();
    var mdp = $('#inputPassword').val();
    var result = true;
    //on vérifie avec une expression régulière que l'email a un format valide
    var regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.trim().length > 0 && mdp.trim().length > 0){
      if (! regEmail.test(String(email).toLowerCase())){
          $('<div class="alert alert-danger" role="alert">Mauvais email</div>').insertAfter("h1"); //si invalide : message d'erreur
      } else {
        //appel AJAX vers la page PHP
        $.ajax({
            url: 'php/connexion-submit.php',
            method: 'POST',
            data: { email: email, mdp: mdp },
            dataType: 'json',
            success: function(data){
                if (data.result == "true"){
                    $(".form-signin").html(
                        '<div class="alert alert-success" role="alert"><p>Connexion réussie !</p><a href="users.html">Voir la liste des membres</a></div>'
                    );
                } else {
                   $(
                        '<div class="alert alert-danger" role="alert">Mauvais identifiants</div>'
                    ).insertAfter("h1");
                }
            },
            error: function(e){
                console.log(e.status);
            }
        });
      }
    }
    
    
    
    e.preventDefault();
}
