//EVENTO DE INICIALIZAÇÂO DO HARDWARE DO ANDROID PARA CAMERA
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log(navigator.camera);
}
//-----------------------------------------------------

//VARIAVEIS GLOBAIS REFERENTE AO USUARIO

var usuarioCerne = new Usuario();
var tempDeck; // ESSA VARIAVEL É INSTANCIADA NO deck.js toda vez que abrimos a tela de deck

//-------------------------------------

$(function iniciarFlip($) {
    $(".flip").flip();
});

$(function ($) {
    startHome();
});

function startHome() {
    if (!updateUserDecksNumber()) {
        createHomeMessage('deckid-cry.png', 'Você ainda não possui decks!');
    }
}

function createHomeCard(title, date, cards, category) {
    var cat = '#cat-'+ category;
    cat = cat.toLowerCase().replace(/ /g,'');

    if (!existCategory(cat)) {
        createHomeCategory(category,cat);
    }

    $(cat).find('.card-container').append('<div class="card home"><div class="header">' + date + '</div><div class="content"><p class="title">' + title + '</p></div><div class="footer"><div class="growth">' + getStars(5) + '</div><div class="length"><p>' + cards + '</p><img src="img/cards.svg" class="icon"></div></div></div>');

    /**/
}


function createHomeCategory(title, id) {
    $('#categorys').append('<div class="category-container" id="' + id.replace('#','') + '"><p class="category-title">' + title + '</p><div class="card-container column"></div></div>');
}

function createHomeMessage(img, message) {
    $('#categorys').append('<div class="home-message"><img src="img/' + img + '"><p>' + message + '</p></div>');
}

function getStars(number) {
    var i = 0;
    var stars = "";
    for (i = 0; i < number; i++) {
        stars += '<div class="star"></div>';
    }
    return stars;
}

function getFormatedDate() {
    var fullDate = new Date();
    var twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : '0' + (fullDate.getMonth() + 1);
    var currentDate = fullDate.getDate() + "/" + twoDigitMonth + "/" + fullDate.getFullYear();
    return currentDate;
}



function saveProfile() {
    var name = $('#user-name-tb').val();
    var avatar = $('#user-pic-tb').val();

    if (name != "") {
        setProfileName(name);
    }

    if (avatar != "") {
        setProfileAvatar(avatar);
    }

    openScreen('home');
}

function openScreen(screen) {
    $('.body').addClass('hide');
    $('#screen-' + screen).removeClass('hide');
}





/*Sets-----------------------------------------------------------------------------------------------------*/

function setProfileName(name) {
    $('#user-name').text(name);
}

function setProfileTitle(title) {
    $('#user-role').text(title);
}

function setProfileDeckNumber(number) {
    var desc = '';

    (number == 1) ? desc = " DECK": desc = " DECKS";
    (number < 10 && number > 0) ? number = "0" + number: number = number;

    $('#user-deck-number').text(number + desc);
}

function setProfileAvatar(avatar) {
    setImagemScreen('.user-avatar', avatar);
    //$('.user-avatar').css('background-image', 'url(img/' + avatar + '.jpeg),url(img/avatardefault.jpeg)')
}

function existCategory(category){
    if (!$(category).length) {
        return false;
    }
    return true;
}

/*FIREBASE-----------------------------------------------------------------------------------------------------*/

function userPadrao() {
    var usuario = new Usuario();
    var preferencias = new Preferencias();

    usuario.nome = 'Thailon Lucas';
    usuario.titulo = 'Novato';
    usuario.id = 'thailon';
    usuario.avatar = 'avatar';
    usuario.deck = [1, 2, 3];
    usuario.senha = '123';
    preferencias.noturno = false;
    preferencias.daltonico = false;

    usuario.preferencias = preferencias;

    writeFirebase('/users/' + usuario.id, usuario);
}

function deckPadrao() {
    var deck = new Deck();
    var card = new Card();

    deck.id = 'D0101F';
    deck.titulo = 'Membros da família em inglês';
    deck.nota = 5;
    deck.privacidade = false;
    deck.categoria = 'Idioma';
    deck.data = '22/05/2018';
    deck.autor = 'thailon';

    card.id = '001';
    card.frente = 'Mom';
    card.verso = 'Mamãe';

    deck.addCard(card);

    card = new Card();
    card.id = '002';
    card.frente = 'Dad';
    card.verso = 'Papai';

    deck.addCard(card);

    writeFirebase('/decks/' + deck.id, deck);
}

function readUsuario(usuario) {
    readFirebase('/users/' + usuario, function (snapshot) {
        setProfileName(snapshot.val().nome);
        setProfileTitle(snapshot.val().titulo);
        setProfileDeckNumber(snapshot.val().deck.length);
        setProfileAvatar(snapshot.val().avatar);

        snapshot.val().deck.forEach(readDeck);

        openScreen('home');
        $('#user-header').removeClass('close');
    });
}


function readDeck(element) {
    $('.home-message').remove();
    readFirebase('/decks/' + element, function (snapshot) {

        var deck = snapshot.val();

        createHomeCard(deck.titulo, deck.data, deck.listaCards.length, deck.categoria);

        updateUserDecksNumber();

    });
}

//TODO ARRUMAR LEITURA DE DECKS
function updateUsuarioScreen(usuario){

    //Atualiza o objeto
    setProfileName(usuario.nome);
    setProfileTitle(usuario.titulo);
    setProfileDeckNumber((usuario.deck != null) ? usuario.deck.length : 0);
    setProfileAvatar(usuario.avatar);

    if(usuario.deck == null)
        return;

    for(var i = 0; i < usuario.deck.length; i++)
        readDeck(usuario.deck[i]); //TODO leitura dos decks ao logar

}

