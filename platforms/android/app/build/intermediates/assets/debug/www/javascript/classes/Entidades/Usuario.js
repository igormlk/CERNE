class Usuario
{

    constructor()
    {
        this.nome = "";
        this.titulo = "";
        this.avatar = 0;
        this.id = 0;
        this.deck = [];
        this.senha = '';
        this.preferencias = new Preferencias();
    }


    toJSON()
    {
        let {nome, titulo, avatar, id, senha,deck, preferencias} = this;
        return {nome,titulo,avatar,id, senha,deck,preferencias};
    }


}
