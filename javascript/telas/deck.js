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
        tempDeck.categoria = dbDeck.categoria;
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
    tempDeck.nota = "5";
    tempDeck.autor = usuarioCerne.nome;
    tempDeck.usuario = usuarioCerne.usuario;
    tempDeck.isPrivado = false;

    usuarioCerne.addDeck(tempDeck);

    salvarDeck(tempDeck);
    salvarEdicaoUsuario(usuarioCerne);

    createHomeCard(tempDeck.id,deckName, getFormatedDate(), cardNumber, selected,tempDeck.nota);
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
var GRADE = 0;
var scoreText = ["Com um pouco mais de treinamento alcançaremos o sucesso, não desista!",
                "Evolução é sempre bem vinda, continue tentando!",
                "Vejo um avanço e um grande potencial, FOCO!",
                "Você está no caminho certo. Está aprendendo cada dia mais!",
                "Que desempenho ótimo, você realmente aprendeu!",
                "SURPREENDENTE, conteúdo revisado e aprendido!"]
function initStudy(){
    curentQuestion = 0;
    GRADE = 0;
    buildTest(tempDeck);
    setQuestion(TEST[curentQuestion]);
    openScreen('study');
}


var ANSWERS = ["#a-1","#a-2","#a-3","#a-4"];

function getScore(grade){
    return Math.ceil((grade*5) / 10);
}

function setQuestion(question){
    if(curentQuestion == TEST.length){
        tempDeck.nota = getScore(GRADE);
        var id = "#" + tempDeck.id;
        $(id).find('.growth').empty();
        $(id).find('.growth').append(getStars(tempDeck.nota));
        updateDeck(tempDeck);
        $("#score-stars").append(getStars(tempDeck.nota));
        $("#score-title").text("Sua pontuação foi " + GRADE + " de " + TEST.length);
        $("#score-subtitle").text(scoreText[tempDeck.nota]);
        openScreen('score');
        return
    }

    $('.answer').addClass('wrong');
    $('.answer').removeClass('correct');

    $('#question').text(question.pergunta);

    ANSWERS.shuffle();
    question.erradas.shuffle();

    $(ANSWERS[0]).val(question.resposta);
    $(ANSWERS[0]).removeClass('wrong');
    $(ANSWERS[0]).addClass('correct');


    $(ANSWERS[1]).val(question.erradas[0]);
    $(ANSWERS[2]).val(question.erradas[1]);
    $(ANSWERS[3]).val(question.erradas[2]);

    curentQuestion++;
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

function checkAnswer(pressed){
    if($(pressed).hasClass('correct'))
        GRADE++;

    setQuestion(TEST[curentQuestion]);
}
