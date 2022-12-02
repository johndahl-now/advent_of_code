#!/usr/bin/env node

// Puzzle URL: 

var lib = require( '../../lib' ),
    print = console.log,
    table = console.table,
    sample = lib.readFile( 'input_sample.txt', cleanData ),
    input = lib.readFile( 'input.txt', cleanData );
    

/*****************************************
 *  Main
 *****************************************/ 

var result = {};

result['Part 1'] = { 
    'Sample Input': part1( sample ), 
    // 'Real Input': part1( input ) 
};
// result['Part 2'] = { 
//     'Sample Input': part2( sample ), 
//     'Real Input': part2( input ) 
// };

table( result );


/*****************************************
 *  FUNCTIONS
 *****************************************/ 

 function cleanData( input ){
    return input.split('\n');
}

function part1( data ){
    var answer = 0;

    return answer;
}

function part2( data ){
    var answer = 0;

    return answer;
}

