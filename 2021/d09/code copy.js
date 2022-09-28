#!/usr/bin/env node

// Puzzle URL: https://adventofcode.com/2020/day/9

var lib = require('../lib'),
    // filename = 'input_sample.txt',
    filename = 'input.txt',
    input = lib.readFile(filename).split('\n'),
    print = console.log,
    table = console.table;
    

/*
 *  Main
 */ 
var answer, next_sum, window,
    pointer = 0,
    window_size = (filename == 'input.txt') ? 25 : 5,
    input_size = input.length;

input.forEach((entry, idx) => { input[idx] = parseInt(entry); });

window = get_window(pointer, window_size);
next_sum = get_next_sum(pointer + window_size);
while(pointer + window_size < input_size){
    answer = get_addends(next_sum, window);
    if (!answer){
        print(next_sum);
        break;
    }
    pointer++;
    window = get_window(pointer, window_size);
    next_sum = get_next_sum(pointer + window_size);
}


/* -------- FUNCTIONS ------------- */

function get_window(start, size){
    return input.slice(start,start + size);
}

function get_next_sum(position){
    return input[position];
}

function get_addends(sum, window){
    var i, l, addend, candidate, answer = []
    print(sum + ': ' + window);
    function is_included(candidate, window){
        return window.indexOf(candidate) > -1;
    }
    for(i=0, l=window.length; i<l; i++){
        addend = window[i];
        candidate = sum - addend;
        if( addend == candidate ){ continue; }
        if( is_included(candidate, window)){
            return [addend, candidate];
        }
    }
    return NaN;
}
