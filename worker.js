//this.onmessage è un metodo di Worker (è una funzione di callback) che viene chiamato quando il worker riceve un messaggio. 
//Il messaggio è un oggetto che contiene i dati inviati dal thread principale (app.js)
//onemessage è una funzione che accetta un parametro (message) che rappresenta il messaggio ricevuto e 
//poi esegue del codice in base a quel messaggio. In questo caso, il worker riceve un messaggio che contiene l'operazione da eseguire (pow o root) 
//e i valori di base e pow, quindi esegue l'operazione richiesta e invia il risultato al thread principale usando postMessage.

this.onmessage = (message) => {   //si usa this perché siamo in un contesto di worker, e this si riferisce al worker stesso
    console.log('Sono worker e ho ricevuto messaggio da app js', message.data);
    
    const operation = message.data.operation;

    const base = message.data.base;
    const pow = message.data.pow;

    let result;

    if (operation === 'pow') {
        result = calcPow(base, pow);
    } else {
        result = calcRoot(base, pow);
    }


    setTimeout(() => {
        console.log('Sono worker e sto inviando un messaggio ad app js', result);
        this.postMessage(result);
    }, 5000);  //dopo 5 secondi invio il messaggio

}

function calcPow(base, pow){

    let result = 1;

    for (let i = 0; i < pow; i++) {
        result *= base;    
    }
    return result;
}

function calcRoot(base, pow) {
    
    let result = Math.pow(base, 1/pow);
    return result;
}