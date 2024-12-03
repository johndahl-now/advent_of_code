#!/usr/bin/env node

/**************************
 * Advent of Code
 * 
 * Year: 2024
 * Day: 03
 * 
 * Puzzle URL: https://adventofcode.com/2024/day/3
 */

var lib = require( '../../lib' ),
    sample = lib.readFile( 'input_sample.txt', cleanData ),
    input = lib.readFile( 'input.txt', cleanData );
    

/*****************************************
 *  Main
 *****************************************/ 

 var result = {
    "Part 1": {
        'Sample Expected': 161,
        'Sample Calculated': calculate( cleanData( "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))" ) ), 
        'Real Calculated': calculate( input ) 
    },
    "Part 2": {
        'Sample Expected': 48,
        'Sample Calculated': calculate( cleanData( "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))" ), true ), 
        'Real Calculated': calculate( input, true ) 
    }
};

console.table( result );
/* Result:
┌─────────┬─────────────────┬───────────────────┬─────────────────┐
│ (index) │ Sample Expected │ Sample Calculated │ Real Calculated │
├─────────┼─────────────────┼───────────────────┼─────────────────┤
│ Part 1  │ 161             │ 161               │ 173785482       │
│ Part 2  │ 48              │ 48                │ 83158140        │
└─────────┴─────────────────┴───────────────────┴─────────────────┘
*/

/*****************************************
 *  FUNCTIONS
 *****************************************/ 

function cleanData( data ){
    return data.match( /(mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))/gm );
}

function calculate( data, p2 ){
    let result = 0,
        enabled = true;

    data.forEach( rec => {
        if( p2 && rec.startsWith( "don't" ) ){
            enabled = false;
        }
        else if( p2 && rec.startsWith( "do" ) ){
            enabled = true;
        }
        else if( rec.startsWith( 'mul' ) && enabled == true ){
            result += eval( rec );
        }
            
    } );

    return result;
}

function mul( a,b ){
    return a * b;
}