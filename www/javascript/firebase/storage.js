var storage = window.localStorage;

function readStorage(key){
    return storage.getItem(key);
}

function setStorage(key, item){
    storage.setItem(key,item);
}

