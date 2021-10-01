/**
 * 2C= TWO OF CLUBS
 * 2D = TWO OF DIAMONDS
 * 2H = TWO OF HEARTS
 * 2S = TWO OF SPADES
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputadora = 0;


//Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const puntosHTML = document.querySelectorAll('small');

//Esta funcion crea una nueva baraja
const crearDeck = ( ) => {
    
    for(let i = 2; i <= 10; i++ ){
        for ( let tipo of tipos ) {
            deck.push(i + tipo);
        }
    }

    for ( let tipo of tipos ) {
        for ( let esp of especiales) {
            deck.push(esp + tipo);
        }
    }
    
    deck = _.shuffle( deck );
    return deck;
}

crearDeck();

//Esta funcion me permite tomar una carta 

const pedirCarta = () => {
    if ( deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();

    return carta;
}

const valorCarta = ( carta ) => {

    const valor = carta.substring(0, carta.length -1);
    
    return( isNaN( valor ) ) ?
    ( valor === 'A' ) ? 11 : 10
    : valor * 1;
    
}
const valor = valorCarta( pedirCarta() );

//Logica del turno de la computadora 
const turnoComputadora = ( puntosMinimos) => {
    
    do {  
        const carta = pedirCarta();
    
        puntosComputadora = puntosComputadora + valorCarta( carta );
        puntosHTML[1].innerHTML = puntosComputadora; /* Con esta manipulacion del DOM
        puedo reflejar el resultado de esta funcion en el html*/
    
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`; // backticks me ayudan a insertar js
        imgCarta.classList.add('carta'); //esto le agrega mi clase para poder añadir css
        divCartasComputadora.append( imgCarta );

        if ( puntosMinimos > 21 ){
            break;
        }
    } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos < 21 ) );
    
    setTimeout(() => {
     
   
    if ( puntosComputadora === puntosMinimos ){
        alert ('Nadie gana:(');
    } else if (puntosMinimos > 21 ) {
        alert('Computadora gana')
    } else if ( puntosComputadora > 21 ) {
        alert('Jugador Gana');
    }else if (puntosMinimos === 21) {       
        alert("Ganaste!");     
    } else {
        alert('Computadora Gana');
    }
}, 10 );
}



// Eventos
//Logica turno Jugador
btnPedir.addEventListener('click', () => {
    
    const carta = pedirCarta();
    
    puntosJugador = puntosJugador + valorCarta( carta );
    puntosHTML[0].innerHTML = puntosJugador; /* Con esta manipulacion del DOM
    puedo reflejar el resultado de esta funcion en el html*/

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`; // backticks me ayudan a insertar js
    imgCarta.classList.add('carta'); //esto le agrega mi clase para poder añadir css
    divCartasJugador.append( imgCarta );

    if ( puntosJugador > 21 ) {
        console.warn('PERDISTE');
        btnPedir.disabled = true; //disabled deshabilita el boton
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );

    } else  if (puntosJugador === 21 ) {
        console.warn('21, genial!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora ( puntosJugador);
        
    }

    
});



btnDetener.addEventListener('click', () => {
    
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora ( puntosJugador );
    
});

btnNuevo.addEventListener('click', () => {
    deck = [];
    deck = crearDeck(); 

    puntosJugador = 0;
    puntosComputadora = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';
    
    btnPedir.disabled = false;
    btnDetener.disabled = false;

    
});

