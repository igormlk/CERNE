const config = {
    apiKey: "AIzaSyDAb8C7XgrRIvB1bGElwjPJWnltV8NTLQI",
    authDomain: "cerne-a407f.firebaseapp.com",
    databaseURL: "https://cerne-a407f.firebaseio.com",
    projectId: "cerne-a407f",
    storageBucket: "",
    messagingSenderId: "199163663694"
};

firebase.initializeApp(config);
console.log("Firebase iniciado");

var storage = firebase.storage();
var database = firebase.database();



/*
  Remover um dado no banco
  path = caminho no qual vc quer remover o dado no banco
*/
function removeFirebase(path)
{
    updateFirebase(path,null);
}

/*
    Atualiza no banco o valor
    path = caminho no qual vai ser atualizado o valor no banco
    value = objeto que vai ser gravado no banco
*/
function updateFirebase(path, value)
{
    return database.ref(path).update(value);
}

/*
    Escreve no caminho do banco o valor
    path = caminho do banco no qual deve ser escrito o objeto
    value = objeto no qual vai ser gravado
*/
function writeFirebase(path, value)
{
    database.ref(path).set(value.toJSON());
    console.log(value.toJSON());
}

/*
    Le somente uma vez um caminho do banco.
    path = caminho no banco para recuperar o dado.
    retorna = retorna o snapshot.val();
*/


function readFirebase(path, callback){

    return database.ref(path).once('value').then(function(snapshot){
        callback(snapshot.val());
    });
}


/*
    Função de ler automaticamente qualquer mudança no banco Firebase
    evento = tipo de leitura exemplo = 'value'
    pathToObserve = 'Caminho no banco no qual vai observar as mudanças e notificar'
    functionCallBack = funcao que vai ser chamada quando o sofrer mudança no objeto observado, necessario que seja uma função como function callBack(snapshot){}
*/
function addReadCallBackFirebase(evento,pathToObserve, functionCallBack)
{
    var ref = database.ref(pathToObserve);
    ref.on(evento,functionCallBack);
}

/*
    Função de remover o ler automaticamente qualquer mudança no banco Firebase
    evento = tipo de leitura exemplo = 'value'
    pathToObserve = 'Caminho no banco no qual vai observar as mudanças e notificar'
    functionCallBack = funcao que vai ser chamada quando o sofrer mudança no objeto observado, necessario que seja uma função como function callBack(snapshot){}
*/
function removeReadCallBackFirebase(evento,pathToObserve, functionCallBack)
{
    var ref = database.ref(pathToObserve);
    ref.off(evento,functionCallBack);
}


