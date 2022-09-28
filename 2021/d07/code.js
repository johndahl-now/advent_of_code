#!/usr/bin/env node

// Puzzle URL: https://adventofcode.com/2020/day/7

var lib = require('../lib'),
    // filename = 'input_sample.txt',
    filename = 'input.txt',
    data = lib.readFile(filename),
    print = console.log,
    table = console.table;
    
var bags, current_bag,
    keep_going = true;
    possible_bags = new Set(),
    rules = clean_data(data),
    santas_bag = 'shiny gold bag';

/* -------------- MAIN -------------------- */

table(rules);
get_containers(santas_bag, possible_bags);
table(possible_bags);
possible_bags.forEach(bag => {
    get_containers(bag, possible_bags);
});
table(possible_bags);

/* ------------ FUNCTIONS ----------------- */


function clean_data(data){
    /* COMPLETE: Given raw data, reformat it to an object. */
    var rows = data.split('\n'),
        bags = {};
    rows.forEach(row => {
        row = row.split(' bags contain ');
        bags[row[0]] = row[1];
    })
    return bags;
}

function get_containers(current_bag, possible_bags){
    function check_rule(rule){
        if(rule[1].search(current_bag) > -1){
            possible_bags.add(rule[0]);
        }
    }
    Object.entries(rules).forEach(rule => {check_rule(rule);});
}

