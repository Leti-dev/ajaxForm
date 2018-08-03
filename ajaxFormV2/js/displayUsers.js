$.ajax({
    url: 'php/getUsers.php',
    method: 'POST',
    dataType: 'json',
    success: function(data){
        for(i = 0; i<data.length; i++){
            if(data[i].firstname && data[i].lastname && data[i].postalCode && data[i].city && data[i].cni != null){
            $("#listAll").append("<div class='card' ><img class='card-img-top' src='upload/" + data[i].cni + "' alt='Card image cap'><div class='card-body'><h5 class='card-title'>" + data[i].lastname + " " + data[i].firstname + "</h5><p class='card-text'>" + data[i].address + " " + data[i].postalCode + " " + data[i].city + "</p><a href='editUser.html?id=" + data[i].id + "' class='btn btn-primary'>Editer</a></div></div>");
            }else{
                $("#listAll").append("<div class='card' ><div class='card-body'><p>" + data[i].email + "</p><a href='editUser.html?id=" + data[i].id + "' class='btn btn-primary'>Editer</a></div></div>");
            }
        }
    }
});