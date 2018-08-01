'use strict';

function getDataForm(){            
    $(".alert-danger").hide();
    $("#validatedCustomFile").text($("#validatedCustomFile").get(0).files[0].name)
    var formElement = $("form").get(0);
    var formData = new FormData(formElement);
    var request = fetch('submit.php', {
        method: 'POST',
        body: formData
    });
    request.then(function(data){
        return data.json();
    }).then(function(data) {
        if(data.validation == true){
            $("#tryAgain").hide();
            $(".alert-success").show();
            $(".infos").show();
            $(".infos img").attr('src', "upload/" + data.file);
            $(".infos h2").text(data.firstName + ' ' + data.lastName);
            $(".infos p").text(data.address + ' ' + data.zip + ' ' + data.city);
        }else{
            $(".alert-success").hide();
            $(".infos").hide();
            if(data.validation == 'badExt'){
                $("#tryAgain").show();
                $("#tryAgain").text(data.error);
            }
            if(data.validation == 'badSize'){
                $("#tryAgain").show();
                $("#tryAgain").text(data.error);
            }
            if(data.validation == 'badUser'){
                $("#tryAgain").show();
                $("#tryAgain").text(data.error);
            }
        }
    })
}

$(document).on("input", "input[type=email]", function(){
    var email = $("input[type=email]").val();
    var request = fetch('displayData.php', {
        method: 'POST',
        body: JSON.stringify({
            email
        })
    });
    request.then(function(data){
        return data.json();
    }).then(function(data){
        if(data.email){
            console.log(data);
        }
    })
})