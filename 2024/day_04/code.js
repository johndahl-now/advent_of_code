#!/usr/bin/env node

/**************************
 * Advent of Code
 * 
 * Year: 2024
 * Day: 04
 * 
 * Puzzle URL: https://adventofcode.com/2024/day/4
 */

var lib = require( '../../lib' ),
    sample = lib.readFile( 'input_sample.txt', cleanData ),
    input = lib.readFile( 'input.txt', cleanData );
    

/*****************************************
 *  Main
 *****************************************/ 

 var result = {
    "Part 1": {
        'Sample Expected': 18,
        'Sample Calculated': part1( sample ), 
        'Real Calculated': part1( input ) 
    },
    "Part 2": {
        'Sample Expected': 9,
        'Sample Calculated': part2( sample ), 
        'Real Calculated': part2( input ) 
    }
};

console.table( result );
/* Result:
┌─────────┬─────────────────┬───────────────────┬─────────────────┐
│ (index) │ Sample Expected │ Sample Calculated │ Real Calculated │
├─────────┼─────────────────┼───────────────────┼─────────────────┤
│ Part 1  │ 18              │ 18                │ 2578            │
│ Part 2  │ 9               │ 9                 │ 1972            │
└─────────┴─────────────────┴───────────────────┴─────────────────┘
*/

/*****************************************
 *  FUNCTIONS
 *****************************************/ 

function cleanData( data ){
    return data
    .split('\n')
    .map( row => row.split('') );
}

function part1( data ){
    var rows = data.length,
        cols = data[0].length,
        count = 0;

    for( let y=0; y<rows; y++ ){
        for( let x=0; x<cols; x++ ){
            if( data[y][x] == 'X' ){
                count += checkCoordinate( data, y, x );
            }
        }
    }
    return count;
}

function part2( data ){
    var rows = data.length,
        cols = data[0].length,
        count = 0;

    for( let y=1; y<rows-1; y++ ){
        for( let x=1; x<cols-1; x++ ){
            if( data[y][x] == 'A' ){
                count += checkXCoordinate( data, y, x );
            }
        }
    }
    return count;
}

function checkCoordinate( data, row, col ){

    const rmax = data.length,
          cmax = data[0].length;
    
    let words = {
        N: "",
        NE: "",
        E: "",
        SE: "",
        S: "",
        SW: "",
        W: "",
        NW: ""
    };

    try{
        for( i=0; i<4; i++ ){
            // Check all 3 directions north of (above) the current row
            if( row > 2 ){
                words.N += data[ row - i ][ col ];
                if( col > 2 ) words.NW += data[ row - i ][ col - i ];
                if( col < ( cmax - 3 ) ) words.NE += data[ row - i ][ col + i ];
            }
    
            // Check the 3 directions south of (below) the current row
            if( row < rmax - 3 ){
                words.S += data[ row + i ][ col ];
                if( col > 2 ) words.SW += data[ row + i ][ col - i ];
                if( col < ( cmax - 3 ) ) words.SE += data[ row + i ][ col + i ];
            }
    
            // Check the West direction
            if( col > 2 ) words.W += data[ row ][ col - i ];

            // Check the East direction
            if( col < ( cmax - 3 ) ) words.E += data[ row ][ col + i ];
    
        }

        let found = Object.values( words ).join(',').match( /XMAS/g ) || '';
        
        return found.length;
    }
    catch( e ){
        console.error( e.name + " - " + e.message );
        console.log( 'Iterations: ' + i );
    }
}

function checkXCoordinate( data, row, col ){
    let found, count, total=0;
    
    let words = {
        NE: "",
        SE: ""
    };

    words.NE = data[row + 1 ][ col - 1 ] + "A" + data[row - 1 ][ col + 1 ];
    words.SE = data[row - 1 ][ col - 1 ] + "A" + data[row + 1 ][ col + 1 ];

    found = Object.values( words ).join(',');

    count = ( found.match( /(MAS|SAM)/g ) || '' ).length;

    if( count == 2 ) total += 1;

    return total;

}