function preencherUsuarioSettings(){
    usuarioCerne.nome = $("#nomeSettings").val();
    usuarioCerne.avatar = getImagemFromScreen("#imagemPerfilSettings");
    usuarioCerne.usuario = $("#usuarioSettings").val();
    usuarioCerne.senha = $("#senhaSettings").val();
    usuarioCerne.email = $("#emailSettings").val();
}

function validarEdicaoSettings(){

    var confirmaSenha = $("#confirmarSenhaSettings").val();
    var valido = true;
    var msg = "";

    if(usuarioCerne.senha != confirmaSenha){
        msg += "As senhas não condizem. \n";
        valido = false;
    }

    if(!valido)
        toastShowMessageLongCenter(msg);

    return valido;
}

function salvarSettings(){
    preencherUsuarioSettings();
    if(!validarEdicaoSettings())
        return;

    updateFirebase("/users/" + usuarioCerne.usuario, usuarioCerne);

    updateUsuarioScreen(usuarioCerne);

    toastShowMessageLongBottom("Perfil salvo com sucesso.");

    openScreen('home');
}

function openSettings(){

    $("#senhaSettings").val("");
    $("#confirmarSenhaSettings").val("");

    var nome = $("#nomeSettings");
    var usuario = $("#usuarioSettings");
    var email = $("#emailSettings");

    nome.val(usuarioCerne.nome);
    usuario.val(usuarioCerne.usuario);
    email.val(usuarioCerne.email);

    openScreen('settings');
}



