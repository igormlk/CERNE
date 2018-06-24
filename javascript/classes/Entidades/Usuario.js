class Usuario
{

    constructor()
    {
        this.nome = "";
        this.usuario = "";
        this.titulo = "";
        this.avatar = "";
        this.id = 0;
        this.deck = "";
        this.senha = '';
        this.preferencias = new Preferencias();
    }


    toJSON()
    {
        let {nome, usuario, titulo, avatar, id, senha,deck, preferencias} = this;
        return {nome, usuario,titulo,avatar,id, senha,deck,preferencias};
    }


}
