#!/usr/bin/env node

// Puzzle URL: https://adventofcode.com/2022/day/5

var lib = require( '../../lib' ),
    sample = lib.readFile( 'input_sample.txt', cleanData ),
    input = lib.readFile( 'input.txt', cleanData );
    

/*****************************************
 *  Main
 *****************************************/ 

 var result = {
    "Part 1": {
        'Sample Expected': 'CMZ',
        'Sample Calculated': part1( sample ), 
        'Real Calculated': part1( input ) 
    },
    "Part 2": {
        'Sample Expected': 'MCD',
        'Sample Calculated': part2( sample ), 
        'Real Calculated': part2( input ) 
    }
};

console.table( result );
/* Result:
┌─────────┬─────────────────┬───────────────────┬─────────────────┐
│ (index) │ Sample Expected │ Sample Calculated │ Real Calculated │
├─────────┼─────────────────┼───────────────────┼─────────────────┤
│ Part 1  │      'CMZ'      │       'CMZ'       │   'BSDMQFLSP'   │
│ Part 2  │      'MCD'      │       'MCD'       │   'PGSQBFLDP'   │
└─────────┴─────────────────┴───────────────────┴─────────────────┘
*/

/*****************************************
 *  FUNCTIONS
 *****************************************/ 

function cleanData( data ){
    let [ stacks, moves ] = data.split('\n\n');

    stacks = stacks.split( '\n' )
    .map( row => row.split('') )
    .transpose( stacks )
    .filter( stack => stack.slice(-1).join('').match( /\d/ ) )
    .map( stack => stack.reverse().slice(1).filter( crate => crate !== ' ' ) );

    moves = moves.split('\n')
    .map( move => move.match( /\d+/g ).map( x => Number( x ) ) );

    return [ JSON.stringify( stacks ), moves ];
}

function part1( data ){
    var stacks = JSON.parse( data[0] );
    const moves = data[1];
    moves.forEach( move => moveCrate( move, stacks ) );
    stacks = stacks.map( stack => stack.slice(-1) ).join('');

    return stacks;
}

function part2( data ){
    var stacks = JSON.parse( data[0] );
    const moves = data[1];
    moves.forEach( move => moveCrates( move, stacks ) );
    stacks = stacks.map( stack => stack.slice(-1) ).join('');
    return stacks;
}

function moveCrate( move, stacks ){
    let [ count, from, to ] = move;
    from--;
    to--;
    for( var i=0; i<count; i++ ){
        let crate = stacks[ from ].pop();
        if( crate ) stacks[ to ].push( crate );
    }
}

function moveCrates( move, stacks ){
    let [ count, from, to ] = move;
    from--;
    to--;
    let cratesToMove = stacks[ from ].slice( -count );
    stacks[ from ].length = stacks[ from ].length - count;
    stacks[ to ] = stacks[ to ].concat( cratesToMove );
}
