function preencherUsuario(){
    usuarioCerne.nome = $("#nomeUsuarioCadastro").val();
    usuarioCerne.avatar = getImagemFromScreen("#imagemPerfilCadastro");
    usuarioCerne.id = generateUniqueKeyFirebase();
    usuarioCerne.usuario = $("#loginUsuarioCadastro").val();
    usuarioCerne.senha = $("#senhaUsuarioCadastro").val();
    usuarioCerne.email = $("#emailUsuarioCadastro").val();
    usuarioCerne.deck = {};
}

function validarCadastro(){

    var confirmaSenha = $("#confirmaSenhaUsuarioCadastro").val();
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

function cadastrarUsuario(){
    preencherUsuario();
    if(!validarCadastro())
        return;

    writeFirebase("/users/" + usuarioCerne.usuario, usuarioCerne);

   toastShowMessageLongBottom("Usuario cadastrado com sucesso");

}


