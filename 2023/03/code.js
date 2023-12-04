#!/usr/bin/env node

// Puzzle URL: https://adventofcode.com/2023/day/3

var lib = require( '../../lib' ),
    sample = lib.readFile( 'input_sample.txt', cleanData ),
    input = lib.readFile( 'input.txt', cleanData );
    

/*****************************************
 *  Main
 *****************************************/ 

 var result = {
    "Part 1": {
        'Sample Expected': '4361',
        'Sample Calculated': part1( sample ), 
        // 'Real Calculated': part1( input ) 
    },
    "Part 2": {
        // 'Sample Expected': 'N/A',
        // 'Sample Calculated': part2( sample ), 
        // 'Real Calculated': part2( input ) 
    }
};

// console.table( result );
/* Result:
*/

/*****************************************
 *  FUNCTIONS
 *****************************************/ 

function cleanData( data ){
    return data.split('\n');
}

function part1( data ){
    /* Given a grid of data consisting of numbers, symbols, and periods,
     * Identify valid part numbers by determining which numbers are within 1 hop of a symbol.
     * Add up all valid part numbers.
     */
    var coordinates, index, positions,
        grid_dimensions = [ data.length, data[0].length ],  // [ Rows, Columns ]
        sequence = data.join(''),                           // Data converted into a single string
        numbers = sequence.match( /\d+/g );                 // An array of all numbers found in the data
       
    positions = numbers.map( num => {                   // An array of positions for the start of each number
        index = [ sequence.indexOf( num ), num.length ];
        coordinates = convert_to_coordinates( index[0], grid_dimensions );
        console.log( 'Number Coordinates: ' + num + ': ' + coordinates );
        return index;
    } );
    console.table( positions );
}

function part2( input ){
    return input;
}

function isDigit( char ){
    return /\d/.test( char );
}

function isSymbol( char ){
    return /[^\d.]/.test( char );
}

function convert_to_coordinates( index, grid_dimensions ){
    var row = Math.floor( index / grid_dimensions[0] ),
        col = index % grid_dimensions[0];

    return [ row, col ];
}
