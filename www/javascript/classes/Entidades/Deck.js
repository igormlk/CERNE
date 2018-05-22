class Deck
    {
        constructor(_id, _titulo, _nota, _temaDeck, _privacidade, _descricao, _categoria)
        {
            this.listaCards = [];
            this.id = _id;
            this.titulo = _titulo;
            this.nota = _nota;
            this.temaDeck = _temaDeck;
            this.privacidade = _privacidade;
            this.descricao = _descricao;
            this.categoria = _categoria;
            this.data = new Date();
        }

        toJSON()
        {

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

