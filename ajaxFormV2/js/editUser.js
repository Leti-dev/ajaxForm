'use strict';

$(document).ready(function(){
    $('form').on('submit', connexion);
    $('#customFile').change(function(){
        $(".custom-file-label").text($('#customFile').get(0).files[0].name);
    });
    $('#inputEmail').on('input', search);
    $(document).on('load', searchById());
    
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

function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}

function searchById(){
    var id = $_GET('id');
     $.ajax({
         url: 'php/searchUser_id.php',
         method: 'POST',
         data: { id: id },
         dataType: 'json',
         success: function(data){
             $("#image").show();
            $("input[name=email]").val(data.email);
            $("input[name=nom]").val(data.lastname);
            $("input[name=prenom]").val(data.firstname);
            $("input[name=adresse]").val(data.address);
            $("input[name=cp]").val(data.postalCode);
            $("input[name=ville]").val(data.city);
            $(".infos").show();
            if (data.firstname && data.lastname && data.postalCode && data.city && data.cni != false){ 
                $("#image").attr('src', "upload/" + data.cni);
                $("#infoEmail").text(data.lastname + " " + data.firstname);
                $("#infoLoc").text(data.address + " " + data.postalCode + " " + data.city);
            }else{
                $("#image").hide();
                $("#infoLoc").text(data.email);
            }
         },
         error: function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
         
     });
}