#!/usr/bin/env node

// Puzzle URL: https://adventofcode.com/2023/day/

var lib = require( '../../lib' ),
    sample = lib.readFile( 'input_sample.txt', cleanData ),
    sample2 = lib.readFile( 'input_sample_2.txt', cleanData ),
    input = lib.readFile( 'input.txt', cleanData );
    

/*****************************************
 *  Main
 *****************************************/ 

 var result = {
    "Part 1": {
        'Sample Expected': '142',
        'Sample Calculated': part1( sample ), 
        // 'Real Calculated': part1( input ) 
    },
    "Part 2": {
        'Sample Expected': '281',
        'Sample Calculated': part2( sample2 ), 
        // 'Real Calculated': part2( input ) 
    }
};

console.table( result );
/* Result:
┌─────────┬─────────────────┬───────────────────┬─────────────────┐
│ (index) │ Sample Expected │ Sample Calculated │ Real Calculated │
├─────────┼─────────────────┼───────────────────┼─────────────────┤
│ Part 1  │ '142'           │ '142'             │ '54940'         │
│ Part 2  │ '281'           │ '281'             │ '54193'         │
└─────────┴─────────────────┴───────────────────┴─────────────────┘
*/

/*****************************************
 *  FUNCTIONS
 *****************************************/ 

function cleanData( data ){
    return data.split('\n');
}

function part1( data ){
    data = data.map( ( row ) => {

        // Find the digits in the string of data
        row = row.match( /\d/g );
        // console.log( 'Match: ' + row + ' - ' + row.length );

        // Combine the first and last digit and return the int
        row = [ row[ 0 ], row.slice( -1 ) ];
        return parseInt( row.join( '' ) );
    } )
    .reduce( ( total, value ) => { 
        return total + value; 
    }, 0 );

    return JSON.stringify( data );
}

function part2( data ){
    var numMap = {
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5,
        'six': 6,
        'seven': 7,
        'eight': 8,
        'nine': 9
    };

    data = data.map( ( row ) => {

        console.log( '\nOriginal Row: ' + row );

        // Get the string numbers found in position order
        var digits = [];
        Object.keys( numMap ).forEach( ( num, idx ) => {
            var position = row.search( num );
            position >= 0 && ( digits[ position ] = num );
        } );

        console.log( 'String numbers found by position: ' + digits );

        // Convert the string numbers into digits
        digits.forEach( ( dig, idx ) => {
            if( dig !== undefined ){
                row = row.split('')
                row[ idx ] = numMap[ dig ];
                row = row.join('');
            }
        } );

        console.log( 'Converted Row: ' + row );

        return row;
    } );

    // console.log( data );
    data = part1( data );

    return data;
}

