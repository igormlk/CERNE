function openCardPreviewContainer(){
    $('#card-preview-container').toggleClass('open');
}

function writeOnCard(card, where, text) {
    $('#' + card).find(where)[0].innerText = text;
}

function cleanCardCreator(){
    cleanFrontCardCreator();
    cleanBackCardCreator();
    $('#deck-name').val("");
    $('.container-preview').empty();
    $('#card-preview-container').removeClass('open');
}

NEW_DECK_CATEGORY = 'Adicionados Recentemente';

function createPreviewCard(front, back) {
    $('.container-preview').append('<div class="flip center preview-card"><div class="front card center"><p class="text front-text">' + front + '</p></div><div class="back card center"><p class="text back-text">' + back + '</p></div></div>');

    tempDeck.addCard(new Card(generateUniqueKeyFirebase(), front, back));

    cleanFrontCardCreator();
    cleanBackCardCreator();

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
