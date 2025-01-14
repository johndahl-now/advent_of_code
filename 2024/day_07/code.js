#!/usr/bin/env node

/**************************
 * Advent of Code
 * 
 * Year: 2024
 * Day: 07
 * 
 * Puzzle URL: https://adventofcode.com/2024/day/7
 */

var lib = require( '../../lib' ),
    sample = lib.readFile( 'input_sample.txt', cleanData ),
    input = lib.readFile( 'input.txt', cleanData );
    

/*****************************************
 *  Main
 *****************************************/ 

 var result = {
    "Part 1": {
        'Sample Expected': 3749,
        'Sample Calculated': part1( sample ), 
        // 'Real Calculated': part1( input ) 
    },
    // "Part 2": {
    //     'Sample Expected': 0,
    //     'Sample Calculated': part2( sample ), 
    //     // 'Real Calculated': part2( input ) 
    // }
};

console.table( result );
/* Result:

PASTE RESULT TABLE HERE

*/

/*****************************************
 *  FUNCTIONS
 *****************************************/ 

function cleanData( data ){
    return data
        .split( '\n' )
        .map( row => {
            row = row.split(': ');
            (row.length > 1) && (row[1] = row[1].split( /\s+/ ) );
            return row;
        } );
}

function part1( data ){
    // return data;
    console.table( data.print() )

    var keep_watching = true;

    while( keep_watching ){
        
    }
}

function part2( data ){
    return data;
}

