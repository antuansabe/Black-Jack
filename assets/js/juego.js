/**
 * 2C= TWO OF CLUBS
 * 2D = TWO OF DIAMONDS
 * 2H = TWO OF HEARTS
 * 2S = TWO OF SPADES
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

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
    console.log( deck );
    return deck;
}

crearDeck();

//Esta funcion me permite tomar una carta 

const pedirCarta = () => {
    if ( deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();

    console.log( deck )
    console.log( carta ); // carta debe ser de la baraja
    return carta;
}
/*
for ( let i =0; i <= 100; i++ ) {
    pedirCarta();
}
*/

