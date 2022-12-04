#!/usr/bin/env node

// Puzzle URL: https://adventofcode.com/2022/day/4

var lib = require( '../../lib' ),
    sample = lib.readFile( 'input_sample.txt', cleanData ),
    input = lib.readFile( 'input.txt', cleanData );
    

/*****************************************
 *  Main
 *****************************************/ 

var result = {
    "Part 1": {
        'Sample Expected': 2,
        'Sample Calculated': part1( sample ), 
        'Real Calculated': part1( input ) 
    },
    "Part 2": {
        'Sample Expected': 4,
        'Sample Calculated': part2( sample ), 
        'Real Calculated': part2( input ) 
    }
};

console.table( result );
/* Result:
┌─────────┬─────────────────┬───────────────────┬─────────────────┐
│ (index) │ Sample Expected │ Sample Calculated │ Real Calculated │
├─────────┼─────────────────┼───────────────────┼─────────────────┤
│ Part 1  │        2        │         2         │       453       │
│ Part 2  │        4        │         4         │       919       │
└─────────┴─────────────────┴───────────────────┴─────────────────┘
*/

/*****************************************
 *  FUNCTIONS
 *****************************************/ 

function cleanData( data ){
    return data.split('\n')
    .map( row => row.split(',').map( elf => elf.split('-').map( Number ) ) );
}

function part1( data ){

    return data.filter( row => {
        let [ elf1, elf2 ] = row;
        let [ min1, max1 ] = elf1;
        let [ min2, max2 ] = elf2;

        return ( min1 >= min2 && max1 <= max2 ) || ( min2 >= min1 && max2 <= max1 );

    } )
    .length;
}

function part2( data ){
    return data.filter( row => {
        let [ elf1, elf2 ] = row;
        let [ min1, max1 ] = elf1;
        let [ min2, max2 ] = elf2;

        return ( min1 <= min2 && max1 >= min2 ) || ( min2 <= min1 && max2 >= min1 );

    } )
    .length;
}
