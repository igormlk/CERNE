class Usuario
{

    constructor(_id, _usuario, _senha)
    {
        this.id = _id;
        this.usuario = _usuario;
        this.senha = _senha;
        this.perfil = new Perfil();
        this.estudo = [];
        this.task = [];
        this.preferencias = new Preferencias();
    }


    testeUsuarioTask()
    {
    }

}
