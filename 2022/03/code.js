#!/usr/bin/env node

// Puzzle URL: https://adventofcode.com/2022/day/3

var lib = require( '../../lib' ),
    sample = lib.readFile( 'input_sample.txt', cleanData ),
    input = lib.readFile( 'input.txt', cleanData );
    

/*****************************************
 *  Main
 *****************************************/ 

var result = {
        "Part 1": {
            'Sample Answer': 157,
            'Sample Input': part1( sample ), 
            'Real Input': part1( input ) 
        },
        "Part 2": {
            'Sample Answer': 70,
            'Sample Input': part2( sample ), 
            'Real Input': part2( input ) 
        }
};

console.table( result );
/* Result
┌─────────┬─────────────────┬──────────────┬────────────┐
│ (index) │ Expected Sample │ Sample Input │ Real Input │
├─────────┼─────────────────┼──────────────┼────────────┤
│ Part 1  │       157       │     157      │    8252    │
│ Part 2  │       70        │      70      │    2828    │
└─────────┴─────────────────┴──────────────┴────────────┘
*/

/*****************************************
 *  FUNCTIONS
 *****************************************/ 

function cleanData( data ){
    /* Given a file containing rows of data,
     * split the rows into arrays, then
     * split each row into 2 arrays of equal length.
     */
    return data.split('\n')
    .map( row => {
        var l = row.length;
        return [ 
            row.slice( 0,l/2 ).split(''), 
            row.slice( l/2 ).split('') 
        ];
    });
}

function part1( data ){
    
    return data
    .map( row => row[0].intersection( row[1] ).deduplicate().toString() )
    .map( row => calculatePriority( row ) )
    .sum();

}

function part2( data ){

    return groupElves( data )
    .map( group => group[0].intersection( group[1] ).intersection( group[2] ).toString() )
    .map( row => calculatePriority( row[0] ) )
    .sum();
    
}

function calculatePriority( letter ){
    var code = letter.charCodeAt( 0 );
    var isLowerCase = ( code > 90 );

    return isLowerCase ? ( code - 96 ) : ( code - 38 ) ;
}

function groupElves( data ){
    var groups = [];

    data = data.map( row => {
        return row[0].concat( row[1] ).deduplicate();
    })
    .forEach( ( row, idx ) => {
        var groupNumber = parseInt( idx / 3, 10 );
        if( groups[ groupNumber ] == undefined ) groups[ groupNumber ] = [];
        groups[ groupNumber ].push( row );
    });

    return groups;
}