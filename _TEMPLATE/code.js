#!/usr/bin/env node

// Puzzle URL: https://adventofcode.com/2023/day/

var lib = require( '../../lib' ),
    sample = lib.readFile( 'input_sample.txt', cleanData ),
    input = lib.readFile( 'input.txt', cleanData );
    

/*****************************************
 *  Main
 *****************************************/ 

 var result = {
    "Part 1": {
        'Sample Expected': 'N/A',
        'Sample Calculated': part1( sample ), 
        // 'Real Calculated': part1( input ) 
    },
    "Part 2": {
        'Sample Expected': 'N/A',
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
    return data;
}

function part2( data ){
    return data;
}

