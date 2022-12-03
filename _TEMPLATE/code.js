#!/usr/bin/env node

// Puzzle URL: 

var lib = require( '../../lib' ),
    sample = lib.readFile( 'input_sample.txt', cleanData ),
    input = lib.readFile( 'input.txt', cleanData );
    

/*****************************************
 *  Main
 *****************************************/ 

 var result = {
    "Part 1": {
        'Sample Input': part1( sample ), 
        // 'Real Input': part1( input ) 
    },
    "Part 2": {
        'Sample Input': part2( sample ), 
        // 'Real Input': part2( input ) 
    }
};

console.table( result );


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

