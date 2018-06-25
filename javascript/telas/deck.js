function openDeckScreenCreator(){
    openScreen('card-creator');
}

function salvarDeck(deck){
    writeFirebase("/decks/"+ deck.id, deck);
}

function updateDeck(deck){
    updateFirebase("/decks/"+ deck.id, deck);
}

function readDeckFirebase(idDeck, tempDeck, callback){
    readFirebase("/decks/"+idDeck,function(snapShot){
        var dbDeck = snapShot.val();
        tempDeck.id = dbDeck.id;
        tempDeck.titulo = dbDeck.titulo;
        tempDeck.categoria = dbDeck.titulo;
        tempDeck.nota = dbDeck.nota;
        tempDeck.autor = dbDeck.autor;
        tempDeck.usuario = dbDeck.usuario;
        tempDeck.isPrivado = dbDeck.isPrivado;
        tempDeck.listaCards = dbDeck.listaCards

        callback(dbDeck);
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
    var cardNumber = $('#cardContainer-creator').find('.flip').length;
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

    createHomeCard(tempDeck.id,deckName, getFormatedDate(), cardNumber, selected);
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


var TEST = [];
var curentQuestion = 0;


function initStudy(){
    curentQuestion = 0;
    buildTest(tempDeck);
    setQuestion(TEST[curentQuestion]);
    openScreen('study');
}

function setQuestion(question){
    $('.answer').addClass('wrong');

    $('#question').text(question.pergunta);

    $('#a-1').val(question.resposta);
    $('#a-1').removeClass('wrong');
    $('#a-1').addClass('correct');


    $('#a-2').val(question.erradas[0]);
    $('#a-3').val(question.erradas[1]);
    $('#a-4').val(question.erradas[2]);

    curentQuestion++;

    if(curentQuestion >= TEST.length)
        alert('ACABOU');
}



function buildTest(deck){
    var i;
    var lastChosen;
    var chosen;

    TEST = [];

    for(i=0; i<=9;i++){
        while(chosen === lastChosen){
            chosen = random(deck.listaCards.length);
        }

        TEST.push(buildQuestion(deck,deck.listaCards[chosen]));
        lastChosen = chosen;
    }
}

function random(limit){
    return Math.floor(Math.random() * limit);
}

function buildQuestion(deck,card){

    var question = new Question();
    var erradas =[];

    var side = random(2);

    if(side){
        question.pergunta = card.frente;
        question.resposta = card.verso;
    }else{
        question.pergunta = card.verso;
        question.resposta = card.frente;
    }
    question.erradas = getWrongAnswers(deck,question.resposta,side);

    return question;
}


function getWrongAnswers(deck, right, side){
    var wrongs = [];
    var wrong;
    var i;
    var other = false;

    for(i = 0; i<=2;i++){
        wrong = ((side) ? deck.listaCards[random(deck.listaCards.length)].verso : deck.listaCards[random(deck.listaCards.length)].frente);

        wrongs.indexOf(wrong) === -1 ? other = false : other = true;

        while(wrong === right || other){
            wrong = ((side) ? deck.listaCards[random(deck.listaCards.length)].verso : deck.listaCards[random(deck.listaCards.length)].frente);

            wrongs.indexOf(wrong) === -1 ? other = false : other = true;
        }
        wrongs.push(wrong);
    }
    return wrongs;
}

function rightAnswer(userAnswer){
    return (userAnswer === RIGHT_ANSWER);
}
