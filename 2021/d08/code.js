#!/usr/bin/env node

// Puzzle URL: https://adventofcode.com/2020/day/8

var lib = require('../lib'),
    // filename = './input.txt',
    filename = './input_sample.txt',
    input = lib.readFile(filename).split('\n'),
    print = console.log,
    table = console.table;

/*
 *  Main  ---------------------------------------------------------------------
 */ 
var line = 0,
    accumulator = 0,
    history = [];

answer = process_input(input);
print(answer);
print(history);
print_history();


/*
 *  FUNCTIONS  ----------------------------------------------------------------
 */

function process_input(input){
    var instruction;
    line = 0;
    accumulator = 0;
    history = [];
    while(true){
        instruction = get_instruction(line);
        history.push(line);
        run_instruction(instruction);
        if (repeated(line)){
            return 0;
        }
        if (end_of_instructions(line)){ return accumulator; }
    }
    print('Accumulator Value: ' + accumulator);
}

function toggle_instruction(inst){
    if (inst == 'nop'){
        return 'jmp';
    }
    else if (inst == 'jmp'){
        return 'nop';
    }
    else { return inst; }
}

function print_history(){
    var inst, output = {};
    history.forEach((item, idx) => {
        inst = input[item].split(' ');
        // output[idx] = [item, inst[0], inst[1]];
        output[idx] = {'line#': item, 'cmd': inst[0], 'arg': inst[1]};
    })
    table(output);
    print(output);
}

function repeated(line){
    /* Given a line number,
    determine if the line has already executed.
    Return a boolean result. */

    return history.indexOf(line) > -1;
}

function end_of_instructions(line){
    /* Given a line number,
    determine if the line is beyond the end of the instructions list.
    Return a boolean result. */

    return line >= input.length;
}

function run_instruction(instruction){
    /* Given an array with the command and argument,
    run the command with the given argument. */

    var command = instruction[0],
        argument = instruction[1],
        commands = {
            'acc': function(val){
                accumulator += parseInt(val);
                line += 1;
            },
            'jmp': function(val){
                line += parseInt(val);
            },
            'nop': function(val){
                line += 1;
            }
        };
        
    commands[command](argument);
}

function get_instruction(line){
    /* given a line number, 
    return an array with the command and argument. */

    return input[line].split(' ');
}

