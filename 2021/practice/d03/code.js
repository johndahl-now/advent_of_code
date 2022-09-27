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
    return input.split( '\n' );
}

function part1( data, slope ){
    var count = 0,
        x = 0,
        y = 0,
        slope = slope || [3,1],
        width = data[0].length,
        height = data.length;

    x += slope[0];
    y += slope[1];

    while( y < height ){

        if( x >= width ){ x -= width; }
        
        if( data[y][x] == '#' ){
            count++;
        }

        x += slope[0];
        y += slope[1];

    }

    return count;
}

function part2( data ){
    var answer = 1,
        slopes = [
            [1,1],
            [3,1],
            [5,1],
            [7,1],
            [1,2]
        ];
    
    slopes.forEach( function( slope ){
        answer *= part1( data, slope );
    });

    return answer;
}

/*
┌─────────┬──────────────┬────────────┐
│ (index) │ Sample Input │ Real Input │
├─────────┼──────────────┼────────────┤
│ Part 1  │      7       │    211     │
│ Part 2  │     336      │ 3584591857 │
└─────────┴──────────────┴────────────┘
*/