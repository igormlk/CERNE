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

function updateUsuarioObject(usuarioTo, usuarioFrom){
    usuarioTo.nome = usuarioFrom.nome;
    usuarioTo.usuario = usuarioFrom.usuario;
    usuarioTo.titulo = usuarioFrom.titulo;
    usuarioTo.avatar = usuarioFrom.avatar;
    usuarioTo.id = usuarioFrom.id;
    usuarioTo.deck = (usuarioFrom.deck != null) ? usuarioFrom.deck : [];
    usuarioTo.senha = usuarioFrom.senha;
    usuarioTo.email = usuarioFrom.email;
    usuarioTo.preferencias = usuarioFrom.preferencias;
}


function logarUsuario(usuario, password){
    usuarioCerne.usuario = usuario;
    usuarioCerne.senha = password;

    readFirebase("/users/"+usuario, function logar(snapshot){

        if(validarLogin(usuarioCerne, snapshot.val())){

            updateUsuarioObject(usuarioCerne, snapshot.val());
            updateUsuarioScreen(usuarioCerne);

            openScreen('home');
            $('#user-header').removeClass('close');
        }

    });

}
