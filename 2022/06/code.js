#!/usr/bin/env node

// Puzzle URL: https://adventofcode.com/2022/day/6

var lib = require( '../../lib' ),
    sample = lib.readFile( 'input_sample.txt', cleanData ),
    input = lib.readFile( 'input.txt', cleanData );
    

/*****************************************
 *  Main
 *****************************************/ 

 var result = {
    "Part 1": {
        'Sample Expected': '5,6,10,11',
        'Sample Calculated': part1( sample ), 
        'Real Calculated': part1( input ) 
    },
    "Part 2": {
        'Sample Expected': '19,23,23,29,26',
        'Sample Calculated': part2( sample ), 
        'Real Calculated': part2( input ) 
    }
};

console.table( result );
/* Result:
┌─────────┬──────────────────┬───────────────────┬─────────────────┐
│ (index) │ Sample Expected  │ Sample Calculated │ Real Calculated │
├─────────┼──────────────────┼───────────────────┼─────────────────┤
│ Part 1  │   '5,6,10,11'    │  '7,5,6,10,11'    │     '1909'      │
│ Part 2  │ '19,23,23,29,26' │ '19,23,23,29,26'  │     '3380'      │
└─────────┴──────────────────┴───────────────────┴─────────────────┘
Note: The first sample signal (7) was added for part 2 and is not used for part 1.
*/

/*****************************************
 *  FUNCTIONS
 *****************************************/ 

function cleanData( data ){
    return data.split('\n');
}

function part1( data ){
    let markerLength = 4;

    return data.reduce( function( arr, signal ){ 
        arr.push( findMarker( signal, markerLength ) );
        return arr;
    }, [] ).join(',');
}

function part2( data ){
    let markerLength = 14;

    return data.reduce( function( arr, signal ){ 
        arr.push( findMarker( signal, markerLength ) );
        return arr;
    }, [] ).join(',');
}

function findMarker( signal, markerLength ){
    /* Given a signal and marker length,
     * calculate the size of the packet.
     */
    let marker, packet;
    for( let i=markerLength; i<signal.length; i++ ){
        packet = signal.slice( 0, i );
        marker = packet.slice( -markerLength );
        if( marker.length == marker.split('').deduplicate().length ) break;
        // Note: Could have used a set: if( marker.length == new Set( marker ).size ) break;
    }
    return packet.length;
}