var idImagemTela = "";

function cameraTakePicture(cameraSuccess, cameraError){

    var camOptions = {
        quality : 100,
        destinationType : Camera.DestinationType.DATA_URL,
        sourceType : Camera.PictureSourceType.CAMERA,
        allowEdit : false,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        correctOrientation: true,
        saveToPhotoAlbum: false};

    navigator.camera.getPicture(cameraSuccess, cameraError, camOptions);
}

function setImagemScreen(id, imageData){
    var img = $(id);
    img.css("background-image",  "url(data:image/jpeg;base64,"+imageData+")");
}

function capturouImagem(imageData){
    setImagemScreen(idImagemTela, imageData);
}

function erroCapturarImagem(messageError){
    console.log("Erro : " + messageError);
}

function getImagemFromScreen(id){
    var img = $(id);
    var str = img.css("background-image");
    str = str.replace("url(\"data:image/jpeg;base64,", "");
    str = str.replace("\")", "");
    str = str.trim();
    return str;
}

function capturarFoto(id){
    idImagemTela = id;
    cameraTakePicture(capturouImagem, erroCapturarImagem);
}


