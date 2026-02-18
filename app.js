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

const slave = new Worker('./worker.js');
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