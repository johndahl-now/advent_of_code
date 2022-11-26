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
        .map( x => x.split('') );
}

function part1( data ){
    var answer = 0;

    data.forEach( instruction_set => {
        var position = [0,0],
            tracks = {};

        instruction_set.forEach( ( direction, idx, instructions ) => {
            position = move( position, direction );
            tracks[ position ] = tracks[ position ] === undefined ? 1 : ( tracks[ position ] + 1 );
        });

        answer = Object.keys( tracks ).length;
        print( 'Total unique houses: ' + answer );
    });

    return answer;
}

function part2( data ){
    var answer = 0;

    data.forEach( instruction_set => {
        var pos_santa = [0,0],
            pos_robot = [0,0],
            tracks = {};

        instruction_set.forEach( ( direction, idx ) => {
            if( idx % 2 == 0 ){
                pos_santa = move( pos_santa, direction );
                tracks[ pos_santa ] = tracks[ pos_santa ] === undefined ? 1 : ( tracks[ pos_santa ] + 1 );
            }
            else{
                pos_robot = move( pos_robot, direction );
                tracks[ pos_robot ] = tracks[ pos_robot ] === undefined ? 1 : ( tracks[ pos_robot ] + 1 );
            }
        });

        answer = Object.keys( tracks ).length;
        print( 'Total unique houses: ' + answer );
    });

    return answer;
}

function move( position, direction ){
    var [x, y] = position;
    var moves = {
        '>': ()=>{ x++ },
        '<': ()=>{ x-- },
        '^': ()=>{ y++ },
        'v': ()=>{ y-- }
    };
    moves[ direction ]();

    return [x, y];
}