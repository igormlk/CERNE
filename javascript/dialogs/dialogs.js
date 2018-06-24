/* Mostra uma dialog customizavel de alert.
    message = mensagem
    confirmCallBack = function confirm(){}; que executa se for confirmado.
    titulo = titulo do dialog
    buttonLabels = string do titulo do botão
*/
function showMessageAlertDialog(message, alertCallBack, titulo, buttonName){
    navigator.notification.alert(message,alertCallBack,titulo,buttonName);
}

/* Mostra uma dialog customizavel e com botão de confirmar com suporte a uma função quando é confirmado
    message = mensagem
    confirmCallBack = function confirm(buttonIndex){}; que executa se for confirmado, o parametro buttonIndex retorna o numero do botão que foi pressionado iniciando seu indice de 1
    titulo = titulo do dialog
    buttonLabels = vetor com até 3 posiçõs com o nome dos botões
*/
function showMessageConfirmDialog(message, confirmCallBack, titulo, buttonLabels){
    navigator.notification.confirm(message, confirmCallBack, titulo, buttonLabels);
}


function toastShowMessageShortTop(message){
    window.plugins.toast.showShortTop(message);
}
function toastShowMessageShortCenter(message){
    window.plugins.toast.showShortCenter(message);
}
function toastShowMessageShortBottom(message){
    window.plugins.toast.showShortBottom(message);
}
function toastShowMessageLongTop(message){
    window.plugins.toast.showLongTop(message);
}
function toastShowMessageLongCenter(message){
    window.plugins.toast.showLongCenter(message);
}
function toastShowMessageLongBottom(message){
    window.plugins.toast.showLongBottom(message);
}
