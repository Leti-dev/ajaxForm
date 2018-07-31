'use strict';

// could use event on submit button.

function validateForm(){

    // mail verification
    var mail = $("input[type=email").val();
    var password = $("input[type=password").val();

    if(mail.trim().length > 0 && password.trim().length > 0){
        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))){
            $(".alert-danger").show();
            $(".alert-danger").append("Mail invalide");
        }else{
            $(".alert-danger").hide();

            // sending data connection
            $.ajax({
                type : 'POST',
                url : 'submit.php',
                data : {mail:mail, password:password},
                dataType : 'json',
                success : function(response){
                    if(response.validation){
                        $("form").hide();
                        $(".alert-success").show();
                    }else{
                        $("#tryAgain").show();
                    }
                }
            });
        }
    }
}