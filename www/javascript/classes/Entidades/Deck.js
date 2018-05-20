class Deck
    {
        constructor(_id, _nome, _nota, _temaDeck, _privacidade, _descricao)
        {
            this.listaCards = [];
            this.id = _id;
            this.nome = _nome;
            this.nota = _nota;
            this.temaDeck = _temaDeck;
            this.privacidade = _privacidade;
            this.descricao = _descricao;
        }

        /*
            Mostra as cards do deck
        */
        showCards()
        {

            for(var i = 0; i < this.listaCards.length; i++)
                console.log(this.listaCards[i]);
        }

        addCard(cardObj)
        {
            this.listaCards.push(cardObj);
        }

    }

