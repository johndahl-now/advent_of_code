#!/usr/bin/env node

// Puzzle URL: https://adventofcode.com/2022/day/8

var lib = require( '../../lib' ),
    sample = lib.readFile( 'input_sample.txt', cleanData ),
    input = lib.readFile( 'input.txt', cleanData );
    

/*****************************************
 *  Main
 *****************************************/ 

 var result = {
    "Part 1": {
        'Sample Expected': 21,
        'Sample Calculated': part1( sample ), 
        'Real Calculated': part1( input ) 
    },
    "Part 2": {
        'Sample Expected': 8,
        'Sample Calculated': part2( sample ), 
        'Real Calculated': part2( input ) 
    }
};

console.table( result );
/* Result:
┌─────────┬─────────────────┬───────────────────┬─────────────────┐
│ (index) │ Sample Expected │ Sample Calculated │ Real Calculated │
├─────────┼─────────────────┼───────────────────┼─────────────────┤
│ Part 1  │       21        │        21         │      1870       │
│ Part 2  │        8        │         8         │     517440      │
└─────────┴─────────────────┴───────────────────┴─────────────────┘
*/

/*****************************************
 *  FUNCTIONS
 *****************************************/ 

function cleanData( data ){
    return data.split('\n')
    .map( row => row.split('') );
}

function part1( data ){
    // Determine trees that are visible from the outside.
    var visibleCount = 0;
    var visible = [];

    data.forEach( ( row, row_index ) => {
        visible.push( [] );
        row.forEach( ( treeHeight, col_index ) => {
            var treeCoordinates = [ row_index, col_index ];
            var column = getColumn( data, col_index );

            if( isEdge( data, treeCoordinates ) || 
                isVisible( row.slice( 0, col_index ), treeHeight ) ||
                isVisible( row.slice( col_index+1 ), treeHeight ) ||
                isVisible( column.slice( 0, row_index ), treeHeight ) ||
                isVisible( column.slice( row_index+1 ), treeHeight )
            ){
                visibleCount++;
                return null;
            }

            return null;
            
        } );
    } );
    
    return visibleCount;

}

function part2( data ){
    var scores = [];
    data.forEach( ( row, row_index ) => {
        row.forEach( ( treeHeight, col_index ) => {
            var count, keep_going,
                coordinates = [ row_index, col_index ],
                column = getColumn( data, col_index ),
                counts = [];

            // View left
            keep_going = true;
            count = row.slice( 0, col_index )
                .reverse()
                .filter( ( tree, idx ) => {
                    if( !keep_going ) return false;
                    
                    if( tree >= treeHeight ){
                        keep_going = false;
                        return true;
                    }

                    return true;
                })
                .length;

            counts.push( count );

            // View right
            keep_going = true;
            count = row.slice( col_index+1 )
                .filter( ( tree, idx ) => {
                    if( !keep_going ) return false;
                    
                    if( tree >= treeHeight ){
                        keep_going = false;
                        return true;
                    }

                    return true;
                })
                .length;

            counts.push( count );

            // View up
            keep_going = true;
            count = column.slice( 0, row_index )
                .reverse()
                .filter( ( tree, idx ) => {
                    if( !keep_going ) return false;
                    
                    if( tree >= treeHeight ){
                        keep_going = false;
                        return true;
                    }

                    return true;
                })
                .length;

            counts.push( count );

            // View down
            keep_going = true;
            count = column.slice( row_index + 1 )
                .filter( ( tree, idx ) => {
                    if( !keep_going ) return false;
                    
                    if( tree >= treeHeight ){
                        keep_going = false;
                        return true;
                    }

                    return true;
                })
                .length;

            counts.push( count );

            scores.push( counts.product() );
            return;
            
        } );
    } );

    return scores.max();
}

function isEdge( forest, tree ){
    /* Given a matrix (2-d array) of trees and a tree's coordinates,
     * determine if the tree is on the edge of the matrix.
     * Return a boolean.
     */
    let [ row, col ] = tree;
    let row_count = forest.length;
    let col_count = forest[0].length;

    return row == 0 || row == row_count - 1 || col == 0 || col == col_count - 1;
}

function getColumn( forest, column ){
    /* Given a matrix (2-d array) of trees and a column index,
     * identify only the selected column of values.
     * Return a new array.
     */
    return forest.reduce( ( arr, row ) => {
        arr.push( row[ column ] );
        return arr;
    }, [] );
}

function isVisible( trees, height ){
    /* Given an array of trees, and an individual tree's index
     * determine if the given tree is taller than all of the array.
     * Return a boolean.
     */

    return height > trees.max();
}

