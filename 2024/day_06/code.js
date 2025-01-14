#!/usr/bin/env node

/**************************
 * Advent of Code
 * 
 * Year: 2024
 * Day: 06
 * 
 * Puzzle URL: https://adventofcode.com/2024/day/6
 */

var lib = require( '../../lib' ),
    sample = lib.readFile( 'input_sample.txt', cleanData ),
    input = lib.readFile( 'input.txt', cleanData );
    

/*****************************************
 *  Main
 *****************************************/ 

 var result = {
    "Part 1": {
        'Sample Expected': 0,
        'Sample Calculated': part1( sample ), 
        // 'Real Calculated': part1( input ) 
    },
    // "Part 2": {
    //     'Sample Expected': 0,
    //     'Sample Calculated': part2( sample ), 
    //     // 'Real Calculated': part2( input ) 
    // }
};

console.table( result );
/* Result:

PASTE RESULT TABLE HERE

*/

/*****************************************
 *  FUNCTIONS
 *****************************************/ 

function cleanData( data ){
    return data
        .split( '\n' )
        .map( row => row.split( '' ) );
}

function part1( data ){

    const grid_size = { rows: data.length, cols: data[0].length };
    let keep_watching = true;

    // Get the starting position of the guard
    let start_position = [];
    data.forEach( (row, idx) => row.indexOf( '^' ) >= 0 && ( start_position.push( idx ) ) );
    data[ start_position[0] ].forEach( (col, idx) => col.indexOf( '^' ) >= 0 && ( start_position.push( idx ) ) );

    // Create the guard object
    let guard = new Guard( data, start_position, '^' );


    while( keep_watching ){
        if( !guard.move() ) keep_watching = false;
    }
    
    function move( guard ){
     
    
    
    }    
    
}

function part2( data ){
    return data;
}

function Guard( grid, location, direction ){
    let guard = {
        grid: grid,
        location: [], 
        direction: 0
    };

    guard.move = function(){
        const directionMap = {
            0: [-1,0],
            90: [0,1],
            180: [1,0],
            270: [0,-1]
        };

        let next_position = this.location.add( directionMap[ this.direction ] );

        let next_position_state = this.grid[ next_position[0] ][ next_position[1] ];

        if( next_position_state === undefined ){
            this.location = undefined;
            return false;
        }
        else if( next_position_state === '.' ){
            // Move to that position
            this.location = next_position;
            this.grid[ this.location[0] ][ this.location[1] ] = 'X'
        }
        else if( next_position_state === '#' ){
            // Turn to the right.
            this.direction += 90;
            if( this.direction > 270 ) this.direction -= 360;
        }

        console.log( 'Location: ' + this.location + '\nDirection: ' + this.direction );

        return true;

    }

    return guard;
}