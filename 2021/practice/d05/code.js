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

table( sample );
// table( input );

result['Part 1'] = { 'Sample Input': part1( sample ), 'Real Input': part1( input ) };
result['Part 2'] = { 'Sample Input': part2( sample ), 'Real Input': part2( input ) };

// table( result );


/*****************************************
 *  FUNCTIONS
 *****************************************/ 


function cleanData( input ){
    /** 
     * Given the puzzle raw input, 
     * clean and format the raw information into usable data, and
     * return the data.
    */
    return input.split( '\n' );
}

function part1( data ){
    
    data.forEach( function( ticket ){
        var row = [0,127],
            col = [0,7];

        ticket.split('').forEach( function( step ){
            
        });
    });
}

function part2( data ){
    return data;
}

function half( range, code ){
    var min = range[0],
        max = range[1],
        mid = Math.floor( (max - min) / 2 ) + min;
    
    if( code == 'F' || code == 'L' ){
        return [ min, mid ];
    }
    else{
        return [ mid+1, max ];
    }
}
