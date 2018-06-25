function openCardPreviewContainer(){
    $('.cards-library').toggleClass('open');
}

function writeOnCard(card, where, text) {
    $('#' + card).find(where)[0].innerText = text;
}

function cleanCardCreator(){
    cleanFrontCardCreator();
    cleanBackCardCreator();
    $('#deck-name').val("");
    $('#cardContainer-creator').empty();
    $('#card-preview-container').removeClass('open');
}


function createPreviewCard(front, back,id) {
    return ('<div class="flip center preview-card" id="'+id+'"><div class="front card center"><p class="text front-text">' + front + '</p></div><div class="back card center"><p class="text back-text">' + back + '</p></div></div>');
}

function createNewCard(front, back) {
    var card = new Card();

    card.id = generateUniqueKeyFirebase();
    card.frente = front;
    card.verso = back;

    var preview = createPreviewCard(card.frente,card.verso);
    addPreviewCard(preview,'#cardContainer-creator');

    tempDeck.addCard(card);

    cleanFrontCardCreator();
    cleanBackCardCreator();
}


function addPreviewCard(previewCard, container){
    $(container).append(previewCard);

    $(function teste($) {
        $(".flip").flip();
    });
}

function cleanFrontCardCreator(){
    $('#front-creator').val("");
    $('#front-creator-text').text("");
}

function cleanBackCardCreator(){
    $('#back-creator').val("");
    $('#back-creator-text').text("");
}
