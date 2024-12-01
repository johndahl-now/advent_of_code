#!/usr/bin/env node

var lib = require( '../../lib' ),
    sample = lib.readFile( 'input_sample.txt', cleanData ),
    input = lib.readFile( 'input.txt', cleanData );
    

/*****************************************
 *  Main
 *****************************************/ 

 var result = {
    "Part 1": {
        'Sample Expected': '11',
        'Sample Calculated': part1( sample ), 
        'Real Calculated': part1( input ) 
    },
    "Part 2": {
        'Sample Expected': '31',
        'Sample Calculated': part2( sample ), 
        'Real Calculated': part2( input ) 
    }
};

console.table( result );
/* Result:
    ┌─────────┬─────────────────┬───────────────────┬─────────────────┐
    │ (index) │ Sample Expected │ Sample Calculated │ Real Calculated │
    ├─────────┼─────────────────┼───────────────────┼─────────────────┤
    │ Part 1  │ '11'            │ 11                │ 1320851         │
    │ Part 2  │ '31'            │ 31                │ 26859182        │
    └─────────┴─────────────────┴───────────────────┴─────────────────┘
*/

/*****************************************
 *  FUNCTIONS
 *****************************************/ 

function cleanData( data ){
    /* Given a list of pairs,
     * transpose the columns into arrays,
     * sort the arrays.
     * Return the pair of sorted arrays.
     */

    var list1 = [],
        list2 = [];

    data = data
        .split('\n')
        .map( row => row.split( "   " ) );

    data.forEach( row => {
        list1.push( row[0] );
        list2.push( row[1] );
    } );

    list1 = list1.numSort();
    list2 = list2.numSort();

    return [ list1, list2 ];
    
}

function part1( data ){
    /* Given a pair of lists,
     * calculate the difference between the values at each index.
     * Total the differences and return the number.
     */
    var result,
    list1 = data[0],
        list2 = data[1],
        distances = [];

        list1.forEach( ( loc, idx ) => {
        var distance = Math.abs( loc - list2[ idx ] );
        distances.push( distance );
    } );

    return distances.reduce( ( total, distance ) => total += distance )

}

function part2( data ){
    /* Given a pair of lists,
     * score each value from list 1 by determining how many times appears in list 2,
     * then multiple the value from list 1 by the appearance count.
     * Sum and return the scores.
     */

    var result,
        list1 = data[0],
        list2 = data[1].join(','),
        scores = [];

    list1.forEach( ( loc, idx ) => {
        var re = new RegExp( loc, 'g' );
        var apperances = list2.match( re );
        try{
            scores.push( loc * apperances.length );
        }
        catch( e ){
            scores.push( 0 );
        }
    } );

    result = scores.reduce( ( total, score ) => total += score );

    return result;
}

