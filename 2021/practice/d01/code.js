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
    input = cleanData( input ),
    total = 2020;

result['Part 1'] = { 'Sample Input': part1( sample ), 'Real Input': part1( input ) };
result['Part 2'] = { 'Sample Input': part2( sample ), 'Real Input': part2( input ) };

table( result );

/*****************************************
 *  FUNCTIONS
 *****************************************/ 

function cleanData( input ){
    /** 
     * Given the puzzle raw input, 
     * split the input into an array,
     * sort the array in descending order,
     * convert the elements to integers, and
     * return the result.
    */
    var arrData = input.split( '\n' );
    arrData = lib.arrParseInt( arrData );
    arrData = lib.numSort( arrData );
    
    return arrData;
}
        
function part1( data ){
    var num1, num2;        

    for( var i=0, l=data.length-1; i<l; i++ ){
        num1 = data[i];
        num2 = total - num1;
        if( data.indexOf( num2 ) >=0 ){
            return num1 * num2;
        }
    }

    return 'No answer found.';
}

function part2( data ){
    var num1, num2, num3;

    for( var i=0, l=data.length-2; i<l; i++ ){
        for( j=i+1, k=l-i; j<k; j++){
            num1 = data[i];
            num2 = data[j];
            num3 = total - (num1 + num2);
            if( data.indexOf( num3 ) >=0 ){
                return num1 * num2 * num3;
            }
        }
    }

    return 'No answer found.';
}

/*
┌─────────┬──────────────┬────────────┐
│ (index) │ Sample Input │ Real Input │
├─────────┼──────────────┼────────────┤
│ Part 1  │    514579    │   970816   │
│ Part 2  │  241861950   │  96047280  │
└─────────┴──────────────┴────────────┘
*/