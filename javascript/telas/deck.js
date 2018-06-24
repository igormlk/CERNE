function openDeckScreenCreator(){
    tempDeck = new Deck();
    openScreen('card-creator');
}

function salvarDeck(deck){
    writeFirebase("/decks/"+ deck.id, deck);
}

function updateDeck(deck){
    updateFirebase("/decks/"+ deck.id, deck);
}

function readDeckFirebase(idDeck, tempDeck){
    readFirebase("/decks/"+idDeck,function(snapShot){
        var dbDeck = snapShot.val();
        tempDeck.id = dbDeck.id;
        tempDeck.titulo = dbDeck.titulo;
        tempDeck.categoria = dbDeck.titulo;
        tempDeck.nota = dbDeck.nota;
        tempDeck.autor = dbDeck.autor;
        tempDeck.usuario = dbDeck.usuario;
        tempDeck.isPrivado = dbDeck.isPrivado;
    });
}

function deleteDeckFirebase(idDeck){
    removeFirebase("/decks/"+idDeck);
}

//TESTAR \|/
function deletarDeckFirebase(idDeck, usuario){
    deleteDeckFirebase(idDeck);
    for(var i = 0; i < usuario.deck.length; i++)
        if(usuario.deck[i].id == idDeck)
            usuario.deck.splice(i,1);
}

function saveNewDeck() {
    var cardNumber = $('.container-preview').find('.flip').length;
    var deckName = $('#deck-name').val();
    var selected = $('#category-creator').val();
    var category = '#cat-' + selected;

    if (deckName == '') {
        alert('O deck precisa de um nome!');
        $('#card-preview-container').removeClass('open');
        $('#deck-name').focus();
        return
    }

    if (!cardNumber)
        alert('O deck precisa de no mínimo 1 card!');

    $('.home-message').remove();

    (cardNumber < 10) ? cardNumber = "0" + cardNumber: cardNumber = cardNumber;

    tempDeck.id = generateUniqueKeyFirebase();
    tempDeck.titulo = deckName;
    tempDeck.categoria = selected;
    tempDeck.nota = "0";
    tempDeck.autor = usuarioCerne.nome;
    tempDeck.usuario = usuarioCerne.usuario;
    tempDeck.isPrivado = false;

    usuarioCerne.addDeck(tempDeck);

    salvarDeck(tempDeck);
    salvarEdicaoUsuario(usuarioCerne);

    createHomeCard(deckName, getFormatedDate(), cardNumber, selected);
    cleanCardCreator();
    updateUserDecksNumber();
    openScreen('home');

}

function updateUserDecksNumber() {
    var number = $('#categorys').find('.category-container .card.home').length;
    var desc = '';

    (number == 1) ? desc = " DECK": desc = " DECKS";
    (number < 10 && number > 0) ? number = "0" + number: number = number;


    $('#user-deck-number').text(number + desc);

    return number;
}

