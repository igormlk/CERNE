class Preferencias
{

    constructor()
    {
        this.noturno = false;
        this.daltonico = false;

    }


    toJSON()
    {
        let {noturno, daltonico} = this;
        return {noturno,daltonico};
    }


}
