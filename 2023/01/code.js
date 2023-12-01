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
        'Real Calculated': part1( input ) 
    },
    "Part 2": {
        'Sample Expected': '281',
        'Sample Calculated': part2( sample2 ), 
        'Real Calculated': part2( input ) 
    }
};

console.table( result );
/* Result:
┌─────────┬─────────────────┬───────────────────┬─────────────────┐
│ (index) │ Sample Expected │ Sample Calculated │ Real Calculated │
├─────────┼─────────────────┼───────────────────┼─────────────────┤
│ Part 1  │      '142'      │       '142'       │     '54940'     │
│ Part 2  │      '281'      │       '281'       │     '54208'     │
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
        /* Given a row of input,
         * extract the digits,
         * combine the first and last digets,
         * parse and return a two-digit number.
         */

        row = row.match( /\d/g );
        row = [ row[ 0 ], row.slice( -1 ) ];

        return parseInt( row.join( '' ) );

    } )
    .reduce( ( total, value ) => { 
        /* Given an array of 2-digit numbers,
         * reduce the array to a total sum integer.
         */
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
        /* Given a row of data,
         * convert the spelled-out numbers to digits,
         */

        // Get the string numbers found in position order
        var digits = [];
        Object.keys( numMap ).forEach( ( num, idx ) => {
            var firstPosition = row.search( num );
            var lastPosition = row.lastIndexOf( num );

            firstPosition >= 0 && ( digits[ firstPosition ] = num );
            firstPosition !== lastPosition && ( digits[ lastPosition ] = num );
        } );

        // Convert the string numbers into digits
        digits.forEach( ( dig, idx ) => {
            if( dig !== undefined ){
                row = row.split('')
                row[ idx ] = numMap[ dig ];
                row = row.join('');
            }
        } );

        return row;
    } );

    data = part1( data );

    return data;
}

