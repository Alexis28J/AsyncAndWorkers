// //Questo è un piccolo esempio classico di come fare una richiesta HTTP in JavaScript usando XMLHttpRequest
// //Copilot:  https://copilot.microsoft.com/shares/UVZ7gSy7VgLupAKANw3VE

// const url = "https://pokeapi.co/api/v2/pokemon/ditto";  //se mi manca un solo carattere, il browser non si connetterà (troverà) con i dati

// const http = new XMLHttpRequest();

// http.onreadystatechange = callbackXMLHTTP;

// http.open('GET', url, true);

// http.send();

// function callbackXMLHTTP(){
//  //  console.log(this.readyState, this.status)
//     if (this.readyState === 4 && this.status === 200) {
//         const ditto = JSON.parse(http.responseText);
//         console.log(ditto);
//     } else if (this.readyState === 4 && this.status !== 200) {
//         console.log('Siamo nella cacca. Il server ha risposto: ', this.status);  //status 404
//     }
// }

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // Andiamo nel futuro - rifacciamo l'esempio con la fetch

// //Gestione completa di una chiamata web
// fetch(url)
// .then(callbackFetch)
// .then(callbackJson)    //il secondo then è la callback di quella trasformazione di json
// .catch(callbackError)   //al catch le passo un'altra funzione di callback

// function callbackFetch(resp){
//     //console.log(resp);
//     return resp.json();
// }

// function callbackJson(json){
//     console.log(json);
// }

// function callbackError(error) {
//     console.log('Siamo nella cacca. Il server ha risposto: ', error.message);
// }


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Spiegazione Copilot:  https://copilot.microsoft.com/chats/2nPaNbSiS5BNMFGDcbD3b


/// Facciamo i fighetti - usiamo l'async

// function loadPokemon() {

//     const url = "https://pokeapi.co/api/v2/pokemon/ditto";

//     //riscrivo la fetch, ma con la lambda (più compatta)
//     fetch(url)
//     .then(resp => resp.json())
//     .then(json => console.log(json));
// }

// loadPokemon();


// //La riscrivo con l'await e async
// async function loadPokemon() {      

//    const url = "https://pokeapi.co/api/v2/pokemon/ditto";

//    const response = await fetch(url);            

//    const json = await response.json();

//    //console.log(json);

//    return json;
// }

// //questo metodo è completamente uguale a quello con la fetch, solo è una questione di preferenza 

// //loadPokemon();


// function loadPokemon2(){  //questa funzione è identica a loadPokemon (quella fatta con l'await)

//     const url = "https://pokeapi.co/api/v2/pokemon/ditto";

//     return  fetch(url)
//     .then(resp => resp.json())
//     .then(json => json);
// }

// loadPokemon().then(ditto => console.log(ditto, "async await"));
// loadPokemon2().then(ditto => console.log(ditto, "than"));


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///PROMESSE

//Spiegazione Copilot: https://copilot.microsoft.com/shares/v5dejdsnZSHKdVrPVBFoy

// function testaOCroce() {
//     const randomNumber = Math.random();

//    if (randomNumber > 0.5) {
//        return "Testa";
//    } else {
//        return "Croce";
//    }
// }

// //console.log(testaOCroce);

// const risultato = testaOCroce();

// console.log(risultato);


// function testaOCroceWithPromise() {

//     const newPromise = new Promise((resolve, _) => { // _ è un simbolo che indica che è un parametro che non userò

//       const randomNumber = Math.random();

//       if (randomNumber > 0.5) {
//         resolve('Testa');
//       } else {
//         resolve('Croce');
//       }
//     });
//     return newPromise;
// }

// //creo un callback
// function siMangiaLaPizzaStasera(risultatoMoneta) {

//     if (risultatoMoneta === 'Testa') {
//         console.log('Viva, stasera pizza!!!');
//     } else {
//         console.log('Nooo, stasera minestrina');
//     } 
// }

// testaOCroceWithPromise().then(siMangiaLaPizzaStasera)


// /// Si lo si può scrivere così:
// function testaOCroceWithCallback (callback) {
//     const randomNumber = Math.random();

//    if (randomNumber > 0.5) {
//        return "Testa";
//    } else {
//        return "Croce";
//    }
// }

// testaOCroceWithCallback(siMangiaLaPizzaStasera);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////SUPERFETCH - ho provato a fare la fetch con la promise (XMLHttpRequest trasformata in una Promise)

function superFetch(url) {

    const newPromise = new Promise ((bellaStoria, bruttaStoria) => {   //i parametri posso chiamarli come voglio
        
    const http = new XMLHttpRequest();

    //http.onreadystatechange = callbackXMLHTTP;

     // function callbackXMLHTTP(){         //nulla ci vieta di fare una funzione dentro un'altra 
    // if (this.readyState === 4 && this.status === 200) {
    //     const ditto = JSON.parse(http.responseText);
    //     console.log(ditto);
    // } else if (this.readyState === 4 && this.status !== 200) {
    //     console.log('Siamo nella cacca. Il server ha risposto: ', this.status);  //status 404
    // }
    // }

    http.onreadystatechange = () => {    //ma meglio se lo facciamo in lambda
    if (http.readyState === 4 && http.status === 200) {
        const ditto = JSON.parse(http.responseText);
        bellaStoria(ditto);
    } else if (http.readyState === 4 && http.status !== 200) {
        bruttaStoria(http.status);
    }
    }

       http.open('GET', url, true);

       http.send();

    })
    return newPromise;
}

const url = "https://pokeapi.co/api/v2/pokemon/ditto";

superFetch(url)
.then(json => console.log(json))
.catch(error => console.log(error));

