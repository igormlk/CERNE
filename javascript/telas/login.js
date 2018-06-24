function validarLogin(usuarioLogin, usuarioBanco){

    var msg = "Usuário não cadastrado";
    var valido = true;

    if(usuarioBanco == null){
        toastShowMessageLongCenter(msg);
        valido = false;
        return valido;
    }

    if(usuarioLogin.senha != usuarioBanco.senha || usuarioLogin.usuario != usuarioBanco.usuario){
        msg+="Usuário ou senha incorretos";
        valido = false;
    }

    if(!valido){
        toastShowMessageLongCenter(msg);
        console.log(msg);
    }

    return valido;
}



function logarUsuario(usuario, password){
    usuarioCerne.usuario = usuario;
    usuarioCerne.senha = password;

    readFirebase("/users/"+usuario, function logar(snapshot){

        if(validarLogin(usuarioCerne, snapshot.val())){

            updateUsuarioScreen(snapshot.val());

            openScreen('home');
            $('#user-header').removeClass('close');
        }

    });

}
