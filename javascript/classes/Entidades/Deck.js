class Deck
    {
        constructor(_id, _titulo, _nota, _privacidade, _categoria, _autor)
        {
            this.listaCards = [];
            this.id = _id;
            this.titulo = _titulo;
            this.nota = _nota;
            this.privacidade = _privacidade;
            this.categoria = _categoria;
            this.data = new Date();
            this.autor = _autor;
        }

        toJSON()
        {
            let {listaCards, id, titulo, nota, privacidade,categoria, data,autor} = this;
            return {listaCards, id, titulo, nota, privacidade,categoria, data,autor};

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

