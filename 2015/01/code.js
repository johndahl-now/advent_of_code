#!/usr/bin/env node

// Puzzle URL: https://adventofcode.com/2015/day/1

var lib = require('../../lib'),
    sample = lib.readFile('input_sample.txt'),
    input = lib.readFile('input.txt'),
    print = console.log,
    table = console.table;
    

/*****************************************
 *  Main
 *****************************************/ 

var result = {},
    sample = cleanData( sample ),
    input = cleanData( input );

result['Part 1'] = { 'Sample Input': part1( sample ), 'Real Input': part1( input ) };
result['Part 2'] = { 'Sample Input': part2( sample ), 'Real Input': part2( input ) };

table( result );


/*****************************************
 *  FUNCTIONS
 *****************************************/ 


function cleanData( input ){
    /** 
     * Given the puzzle raw input, 
     * clean and format the raw information into usable data, and
     * return the data.
    */
    return input
        .split( '\n' )
        .map( ( x ) => x.match( /[\(\)]/g ).join('') );
}

function part1( data ){
    var floor;

    data.forEach( ( apt ) => {
        floor = 0;

        apt = apt.split('');
        apt.forEach( (flight) => {
            if( flight == '(' ){
                floor++;
            }
            else{
                floor--;
            }
        })
        
        print( floor );
    })

    return floor;
}

function part2( data ){
    var floor, idx;

    data.forEach( ( apt ) => {
        floor = 0;

        apt = apt.split('');
        apt.forEach( (flight, idx ) => {
            if( flight == '(' ){
                floor++;
            }
            else{
                floor--;
            }

            if( floor < 0 ) {
                print( 'Index: ' + ( idx + 1 ) );
                apt.length = 0;
            }
        })
        
    })

    return floor;
}

