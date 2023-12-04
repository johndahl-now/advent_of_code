#!/usr/bin/env node

// Puzzle URL: https://adventofcode.com/2023/day/4

var lib = require( '../../lib' ),
    sample = lib.readFile( 'input_sample.txt', cleanData ),
    input = lib.readFile( 'input.txt', cleanData );
    

/*****************************************
 *  Main
 *****************************************/ 

 var result = {
    "Part 1": {
        'Sample Expected': '13',
        'Sample Calculated': part1( sample ), 
        'Real Calculated': part1( input ) 
    },
    "Part 2": {
        'Sample Expected': '30',
        'Sample Calculated': part2( sample ), 
        // 'Real Calculated': part2( input ) 
    }
};

console.table( result );
/* Result:
*/

/*****************************************
 *  FUNCTIONS
 *****************************************/ 

function cleanData( data ){
    return data.split('\n');
}

function part1( data ){
    // For each row or card, determine how many of the numbers in the first sequence are found in the second sequence.
    // Add a point for the first match and double the points for each successive match in the game.
    // Sum the points of all cards to get the answer.

    var total = 0;
    data.forEach( card => {
        var running_total = 0;
        var [ winning_numbers, my_numbers ] = [ ...card.split( ': ' )[1].split( ' | ' ) ];

        winning_numbers = winning_numbers.split( /\s+/ ).map( number => parseInt( number ) );
        my_numbers = my_numbers.split( /\s+/ ).map( number => parseInt( number ) );

        my_numbers.forEach( my_number => {
            if( running_total == 0 && winning_numbers.indexOf( my_number ) > -1){
                running_total = 1;
                return;
            }
            if( winning_numbers.indexOf( my_number ) > -1 ){
                running_total *= 2;
                return;
            }
        } );

        total += running_total;
        
    } )

    return total;
}

function part2( data ){
    // For each row or card, determine how many of the numbers in the first sequence are found in the second sequence.
    // Add a point for the first match and double the points for each successive match in the game.
    // For each point that a card earns, copy that number of successive cards.

    data.forEach( ( card ) => {
        var copies = [];
        var running_total = 0;
        var [ card_id, numbers ] = [ ...card.split('').splice( 5 ).join('').split( ': ' ) ];
        var [ winning_numbers, my_numbers ] = [ ...numbers.split( ' | ' ) ];
        console.log( 'Processing card ' + card_id );
    
        winning_numbers = winning_numbers.split( /\s+/ ).map( number => parseInt( number ) );
        my_numbers = my_numbers.split( /\s+/ ).map( number => parseInt( number ) );

        // Determine how many winning numbers:
        my_numbers.forEach( my_number => {
            if( winning_numbers.indexOf( my_number ) > -1) ++running_total;
        } );

        // Copy the successive cards
        copies = data.slice( card_id, card_id + running_total - 1 );
        console.log( 'Winning number count: ' + running_total +
            '\nCopies: ' + copies
         );
        

        copies.forEach( copy => data.push( copy ) );
        
    } )

    return data.length;
}

