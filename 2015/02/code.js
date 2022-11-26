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
    /** 
     * Given the puzzle raw input, 
     * clean and format the raw information into usable data, and
     * return the data.
    */
    return input
        .split( '\n' )
        .map( box => {
            box = box.split('x');
            return lib.numSort( lib.arrParseInt( box ) );
        });
}

function part1( data ){
    var answer = 0;

    data.forEach( ( box ) => {
        var areas, smallest, l, w, h;

        [ l, w, h ] = box;
        
        areas = [
            ( l * w ),
            ( l * h ),
            ( h * w )
        ];
        
        smallest = areas[0];
        areas = areas.map( i => i * 2 );
        
        answer += lib.arrSum( areas ) + smallest;

    } );

    return answer;
}

function part2( data ){
    var answer = 0;

    data.forEach( ( box ) => {
        var bow, circ;

        bow = lib.arrProduct( box );
        circ = ( box[0] + box[1] ) * 2;

        answer += ( circ + bow );
    } );

    return answer;
}

