$(function iniciarFlip($) {
  $(".flip").flip();
});

$(function ($){
    startHome();
});

function startHome(){
    if(!updateUserDecksNumber()){
        createHomeMessage('deckid-cry.png','Você ainda não possui cards!');
    }

    $('#user-name-tb').val($('#user-name').text());
}

function createPreviewCard(front, back){
    if(front == '' || back == ''){
        alert('Não é possivel criar um card com campos em branco!');
        return;
    }

    $('#container-preview').append('<div class="flip center"><div class="front card center"><p class="text front-text">'+front+'</p></div><div class="back card center"><p class="text back-text">'+back+'</p></div></div>');

    $(function teste($) {
        $(".flip").flip();
    });

    $('#frente').val('');
    $('#verso').val('');
}

function createHomeCard(title,date,cards,category){
    $(category).find('.card-container').append('<div class="card home"><div class="header">'+date+'</div><div class="content"><p class="title">'+title+'</p></div><div class="footer"><div class="growth">'+getStars(5)+'</div><div class="length"><p>'+cards+'</p><img src="img/cards.svg" class="icon"></div></div></div>');

    /**/
}

function createHomeCategory(title){
    $('#categorys').append('<div class="category-container" id="cat-'+title+'"><p class="category-title">'+ $('#category-select option:selected').text() +'</p><div class="card-container column"></div></div>');
}

function createHomeMessage(img, message){
     $('#categorys').append('<div class="home-message"><img src="img/'+img+'"><p>'+message+'</p></div>');
}

function getStars(number){
    var i = 0;
    var stars = "";
    for(i = 0; i < number; i++){
        stars += '<div class="star"></div>';
    }
    return stars;
}

function getFormatedDate(){
    var fullDate = new Date();
    var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
    var currentDate = fullDate.getDate() + "/" + twoDigitMonth + "/" + fullDate.getFullYear();
    return currentDate;
}

function cleanCardCreator(){
    $('#new-card-visualization').find('.title')[0].innerText = "";
    $('#new-card-visualization').find('.title')[1].innerText = "";

    $('#new-card-name').val('');
    $('#frente').val('');
    $('#verso').val('');

    $('#container-preview').empty();
}

function writeOnCard(card, where, text){
    $('#' + card).find(where)[0].innerText = text;
}

function saveNewDeck(){
    var cardNumber = $('#container-preview').find('.flip').length;
    var deckName = $('#new-card-name').val();

    if(deckName == ''){
        alert('O deck precisa de um nome!');
        return
    }

    if (!cardNumber){
        alert('O deck precisa de no mínimo 1 card!');
        return
    }
    $('.home-message').remove();

    (cardNumber < 10) ? cardNumber = "0" + cardNumber : cardNumber = cardNumber;

    var selected = $('#category-select').val();
    var category = '#cat-' + selected;

    if(!$(category).length){
        createHomeCategory(selected);
    }

    $(category).append(createHomeCard(deckName,getFormatedDate(),cardNumber,category));

    cleanCardCreator();
    updateUserDecksNumber();

    openScreen('home');

}

function saveProfile(){
    var name = $('#user-name-tb').val();

    if(name != ""){
        $('#user-name').text(name);
    }

    openScreen('home');
}

function openScreen(screen){
    $('.body').addClass('hide');
    $('#screen-' + screen).removeClass('hide');
}

function updateUserDecksNumber(){
    var number = $('#categorys').find('.category-container').length;
    var desc = '';

    (number == 1) ? desc = " DECK" : desc = " DECKS";
    (number < 10 && number > 0) ? number = "0" + number : number = number;


    $('#user-deck-number').text(number + desc);

    return number;
}