class Usuario
{

    constructor()
    {
        this.nome = "";
        this.usuario = "";
        this.titulo = "";
        this.avatar = "";
        this.id = 0;
        this.deck = [];
        this.senha = '';
        this.email = "";
        this.preferencias = new Preferencias();
    }

    toJSON()
    {
        let {nome, usuario, titulo, avatar, id, senha,deck, preferencias, email} = this;
        return {nome, usuario,titulo,avatar,id, senha,deck,preferencias, email};
    }

    addDeck(objCard){
        this.deck.push(objCard.id);
    }

}
