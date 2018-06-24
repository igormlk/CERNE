class Deck
    {
        constructor()
        {
            this.listaCards = [];
            this.id = "";
            this.titulo = "";
            this.nota = "";
            this.isPrivado = true;
            this.categoria = "";
            this.data = new Date().toLocaleDateString();
            this.autor = "";
            this.usuario = "";
        }

        toJSON()
        {
            let {listaCards, id, titulo, nota, isPrivado,categoria, data,autor, usuario} = this;
            return {listaCards, id, titulo, nota, isPrivado,categoria, data,autor, usuario};
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

