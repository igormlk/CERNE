class Card
{

    constructor(_id,_frente,_verso)
    {
        this.id = _id;
        this.frente = _frente;
        this.verso = _verso;
    }

    toJSON()
    {
        let {id, frente, verso} = this;
        return {id, frente, verso};
    }

}

