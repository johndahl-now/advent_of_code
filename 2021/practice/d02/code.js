#!/usr/bin/env node

// Puzzle URL: 

var lib = require('../lib'),
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

    var result = [],
        pattern = /(\d+)-(\d+) (\w): (\w+)/,
        data = input.split( '\n' );

    data.forEach( function( row, idx, data ){
        data[idx] = row.match( pattern ).slice( 1, 5 );
    });

    return data;
}

function checkPassword1( data ){
    var count,
        minimum = data[0],
        maximum = data[1],
        letter = data[2],
        password = data[3],

        pattern = new RegExp( '(' + letter + ')', 'g' ),
        matches = password.match( pattern );
        count = matches ? matches.length : 0;
        
        if( count >= minimum && count <= maximum ){
            return true;
        }

        return false;
}

function checkPassword2( data ){
    var count = 0,
        position1 = data[0],
        position2 = data[1],
        letter = data[2],
        password = data[3];

    if( password[ position1 - 1 ] == letter ){ count++; }
    if( password[ position2 - 1 ] == letter ){ count++; }

    if( count == 1 ){ return true; }

    return false;
    
}

function part1( data ){
    var count = 0;

    data.forEach( function( row ){

        if( checkPassword1( row ) ){
            count++;
        }

    });

    return count;
}

function part2( data ){
    var count = 0;

    data.forEach( function( row ){

        if( checkPassword2( row ) ){
            count++;
        }

    });

    return count;
}


/*
┌─────────┬──────────────┬────────────┐
│ (index) │ Sample Input │ Real Input │
├─────────┼──────────────┼────────────┤
│ Part 1  │      2       │    638     │
│ Part 2  │      1       │    699     │
└─────────┴──────────────┴────────────┘
*/