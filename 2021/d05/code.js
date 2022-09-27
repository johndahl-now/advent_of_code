#!/usr/bin/env node

// https://adventofcode.com/2020/day/5

var lib = require('../lib'),
    filename = 'input.txt',
    data = lib.readFile(filename),
    print = console.log,
    table = console.table;

var rows={}, seats = {},
    answer = 0,
    floor = Math.floor,
    ceil = Math.ceil;

    

/* -------------- MAIN -------------------- */
data = data.split('\n');
data.forEach(function(ticket){
    var i,l,low,high,seat,
        row = ticket.match(/^(F|B){7}/)[0].split(''),
        col = ticket.match(/(L|R){3}$/)[0].split('');

    [low, high] = [0,127]
    for(i=0, l=row.length; i<l; i++){
        [low, high] = divide(low, high, row.shift());
    }
    row = parseInt(low);
    rows[row] = (rows[row] + 1) || 1;

    [low, high] = [0,7]
    for(i=0, l=col.length; i<l; i++){
        [low, high] = divide(low, high, col.shift());
    }
    col = parseInt(low);
    try{
        seats[row].push(col);
    }
    catch(err){
        seats[row] = [col];
    }

    seat = get_seat(row, col);
    if (seat > answer){ answer = seat;}

})
print(answer);
table(rows);
table(seats[70])

/* -------------- FUNCTIONS -------------------- */

function get_seat(row, col){
    return row * 8 + col;
}

function divide(low, high, code){
    var mid = low + (high - low)/2;
    if (code == 'F' || code == 'L') {
        high = floor(mid);
    }
    else if (code == 'B' || code == 'R') {
        low = ceil(mid);
    }
    return [low, high];
}

