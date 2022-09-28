#!/usr/bin/env node

// Puzzle URL: https://adventofcode.com/2020/day/9

const { unwatchFile } = require('fs');

var lib = require('../lib'),
    filename = 'input_sample.txt',
    // filename = 'input.txt',
    input = lib.readFile(filename).split('\n'),
    print = console.log,
    table = console.table;
    

/* ------------------- Main------------------------ */

var answer,
    input = lib.convertStringsToInts(input),
    pointer = 0,
    window_size = (filename == 'input.txt') ? 25 : 5;

while(!answer && (pointer <= window_size)){
    range = get_range();
    answer = check_range(range);
    print(range);
    pointer++;
}

// while(true){
//     preamble = get_preamble();
//     sum = get_sum();
//     print(preamble);
//     for(i=0; i<window_size; i++){

//     }
//     if(!match_found){ break; } else {match_found = false; }
//     pointer++;
//     if (pointer + window_size < input.length){ break; }
// }


function get_range(){
    return [input[pointer + window_size], input.slice(pointer, pointer + window_size)];
}


function check_range(range){
    var i, j,
        sum = range[0],
        preamble = range[1];

    for(i=0; i<window_size-1; i++){
        for(j=i+1; j<window_size; j++){
            // print([preamble[i] + preamble[j], preamble[i], preamble[j]]);
            if( preamble[i] + preamble[j] == sum){
                return false;
            }
        }
    }

    return true;
}
