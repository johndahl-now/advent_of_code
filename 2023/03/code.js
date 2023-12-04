#!/usr/bin/env node

// Puzzle URL: https://adventofcode.com/2023/day/3

var lib = require( '../../lib' ),
    sample = lib.readFile( 'input_sample.txt', cleanData ),
    input = lib.readFile( 'input.txt', cleanData );
    

/*****************************************
 *  Main
 *****************************************/ 

 var result = {
    "Part 1": {
        'Sample Expected': '4361',
        'Sample Calculated': part1( sample ), 
        'Real Calculated': part1( input ) 
    },
    "Part 2": {
        // 'Sample Expected': 'N/A',
        // 'Sample Calculated': part2( sample ), 
        // 'Real Calculated': part2( input ) 
    }
};

console.table( result );
/* Result:
*/

/*****************************************
 *  FUNCTIONS
 *****************************************/ 

function cleanData( data ){
    return data.split('\n');
}

function part1( data ){
    /* Given a grid of data consisting of numbers, symbols, and periods,
     * Identify valid part numbers by determining which numbers are within 1 hop of a symbol.
     * Add up all valid part numbers.
     */

    // Find all numbers in the data and gather metadata about them
    var total = 0,
        counter = 0,
        grid_dimensions = [ data.length, data[0].length ],  // [ Rows, Columns ]
        sequence = data.join(','),                          // Convert the grid data into a single string
        numbers = sequence.match( /\d+/g );                 // Find all numbers in the data

    sequence = sequence.replace( /,/g, '' )                 // Remove the commas to restore the indexing
    numbers = numbers.reduce( ( obj, number ) => {          // Convert the array into an object.
        var index = sequence.indexOf( number );
        obj[ number ] = { 
            'value': parseInt( number ),                // Set the value
            'length': number.length,                    // Set the length
            'coordinates': convert_to_coordinates( index, grid_dimensions ) // Set the coordinates
        };
        return obj;
    }, {} );

    // console.table( numbers );
 
    // Check neighboring positions for symbols
    Object.keys( numbers ).forEach( ( number ) => {
        number = numbers[ number ];         // Map the key to the number's object value
        var row = number.coordinates[ 0 ];  // Get the number's row
        var col = number.coordinates[ 1 ];  // Get the number's column start position
        var len = number.length;            // Get the number's length
        var columns = getColumns( number, grid_dimensions );
        
        if( row > 0 ){
            // Check the row above the number
            if( hasSymbol( data[ row - 1 ].slice( columns[0], columns[1] ))){
                total += number.value;    // If a symbol is found, add the number and return
                counter++;
                return;
            }
        }
        if( row < grid_dimensions[ 1 ] - 1 ){
            // Check the row below the number
            if( hasSymbol( data[ row + 1 ].slice( columns[0], columns[1] ))){
                total += number.value;    // If a symbol is found, add the number and return
                counter++;
                return;
            }
        }
        // Check the row of the number
        if( hasSymbol( data[ row ].slice( columns[0], columns[1] ))){
            total += number.value;    // If a symbol is found, add the number and return
            counter++;
            return;
        }

    } );

    console.log( counter );
    return total;
}

function part2( input ){
    return input;
}

function isDigit( char ){
    return /\d/.test( char );
}

function hasSymbol( text ){
    return /[^\d.]/.test( text );
}

function convert_to_coordinates( index, grid_dimensions ){
    var row = Math.floor( index / grid_dimensions[0] ),
        col = index % grid_dimensions[0];

    return [ row, col ];
}

function getColumns( number, grid_dimensions ){
    var start_column = number.coordinates[1],
        end_column = start_column + number.length;

    if( start_column > 0 ) start_column--;
    if( end_column <= grid_dimensions[0]+1 ) end_column++;

    return [ start_column, end_column ];
}