// const button = document.getElementById('my-button');
// const baseInput = document.getElementById('base');
// const powInput = document.getElementById('pow');
// const resultSpan = document.getElementById('result');

// button.addEventListener('click', calculatePow);  //ricorda che calculatePow è il callback

// function calculatePow() {
//     const base = baseInput.value;
//     const pow = powInput.value;

//     const result = base ** pow;

//     resultSpan.innerHTML = result;
// }


////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////Worker

const button = document.getElementById('my-button');
const rootBtn = document.getElementById('root-btn');
const baseInput = document.getElementById('base');
const powInput = document.getElementById('pow');
const resultSpan = document.getElementById('result');

//Worker è una classe che rappresenta un thread separato di esecuzione, e il costruttore accetta come argomento il percorso del file JavaScript che contiene il codice da eseguire in quel thread (in questo caso, worker.js).
const slave = new Worker('./worker.js');  //creo un nuovo worker, che è un thread separato che esegue il codice in worker.js
slave.onmessage = (message) => {
    console.log('Sono app e ho ricevuto un messagio da worker js', message.data);
    const result = message.data;
    resultSpan.innerHTML = result;
}

button.addEventListener('click', calculatePow);  //ricorda che calculatePow è il callback

function calculatePow() {
    const base = baseInput.value;
    const pow = powInput.value;

    const message = {
        base: base,
        pow:pow,
        operation: 'pow'
    }
    console.log('Sono app e sto inviando un messagio a worker js', message);
    slave.postMessage(message);
}


rootBtn.addEventListener('click', calculateRoot);

function calculateRoot() {
    const base = baseInput.value;
    const pow = powInput.value;

    const message = {
        base: base,
        pow:pow,
        operation: 'root'
    }
    console.log('Sono app e sto inviando un messagio a worker js', message);
    slave.postMessage(message);
}