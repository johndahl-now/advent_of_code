#!/usr/bin/env node

// Puzzle URL: 

var lib = require( '../../lib' ),
    print = lib.print,
    table = lib.table,
    sample = lib.readFile( 'input_sample.txt' ),
    input = lib.readFile( 'input.txt' );
    

/*****************************************
 *  Main
 *****************************************/ 

var result = {},
    sample = cleanData( sample ),
    input = cleanData( input );

result['Part 1'] = { 
    'Sample Input': part1( sample ), 
    'Real Input': part1( input ) 
};
result['Part 2'] = { 
    'Sample Input': part2( sample ), 
    'Real Input': part2( input ) 
};

table( result );


/*****************************************
 *  FUNCTIONS
 *****************************************/ 

function cleanData( input ){
    return input.split('\n\n');
}

function part1( data ){
    var answer = 0;

    data.forEach( ( elf, idx, arr ) => {
        elf = elf.split('\n')
            .parseInt()
            .sum();
 
        if( elf > answer ){
            answer = elf;
        }
    } )

    return answer;
}

function part2( data ){
    var answer = [];

    data.forEach( ( elf, idx, arr ) => {
        elf = elf.split('\n')
            .parseInt()
            .sum();

        answer.push( elf );
    } );

    return answer
        .numSort( 'desc' )
        .slice( 0, 3 )
        .sum();
}

