#!/usr/bin/env node

// Puzzle URL: 

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
    /** 
     * Given the puzzle raw input, 
     * clean and format the raw information into usable data, and
     * return the data.
    */
    return input
        .split( '\n' );
}

function part1( data ){
    var answer = 0;

    data.forEach( secret_key => {
        print( 'Secret Key: ' + secret_key );
        var num = 0;
        var hash = md5( secret_key + num );
        while( hash.slice(0,5) != '00000' ){
            num++
            hash = md5( secret_key + num );
            print( hash + ': ' + num );
        }

        print( num );
    } );

    return answer;
}

function part2( data ){
    var answer = 0;

    data.forEach();

    return answer;
}

