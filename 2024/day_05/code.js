#!/usr/bin/env node

/**************************
 * Advent of Code
 * 
 * Year: 2024
 * Day: 05
 * 
 * Puzzle URL: https://adventofcode.com/2024/day/5
 */

var lib = require( '../../lib' ),
    sample = lib.readFile( 'input_sample.txt', cleanData ),
    input = lib.readFile( 'input.txt', cleanData );
var bad_updates = [];

/*****************************************
 *  Main
 *****************************************/ 

 var result = {
    "Part 1": {
        'Sample Expected': 143,
        'Sample Calculated': part1( sample ), 
        'Real Calculated': part1( input ) 
    },
    "Part 2": {
        'Sample Expected': 123,
        'Sample Calculated': part2( sample ), 
        'Real Calculated': part2( input ) 
    }
};

console.table( result );
/* Result:

┌─────────┬─────────────────┬───────────────────┬─────────────────┐
│ (index) │ Sample Expected │ Sample Calculated │ Real Calculated │
├─────────┼─────────────────┼───────────────────┼─────────────────┤
│ Part 1  │ 143             │ 143               │ 4924            │
│ Part 2  │ 123             │ 123               │ 6085            │
└─────────┴─────────────────┴───────────────────┴─────────────────┘

*/

/*****************************************
 *  FUNCTIONS
 *****************************************/ 

function cleanData( data ){
    let [rules, updates] = data.split('\n\n');
    
    rules = rules
        .split('\n')
        .map( rule => rule.match( /\d+/g ) )
        .map( arr => arr.parseInt() );
    updates = updates
        .split('\n')
        .map( update => update.match( /\d+/g ) )
        .map( arr => arr.parseInt() );

    return {
            rules: rules,
            updates: updates
        };
}

function part1( data ){
    let rules = data.rules;
    let updates = data.updates.slice(0);
    let result = 0;
    bad_updates = [];

    updates.forEach( ( update, idx, arr ) => {

        for( let rule of rules ){
            let index1 = update.indexOf( rule[0] ),
                index2 = update.indexOf( rule[1] );

            if( index1 == -1 || index2 == -1 ) continue;

            if( index1 > index2 ){
                bad_updates.push( arr[ idx ].slice(0) ); // Added for part 2.
                delete arr[ idx ];
                break;
            }
        }
    } );

    updates.forEach( update => {
        if( update.length > 0 )
            result += getMiddleValue( update );
    } );

    return result;
}

function part2( data ){
    let rules = data.rules
        result = 0;
    
    part1( data );

    let fixed_updates = bad_updates
        .map( update => sortBadUpdate( update, rules ) );

    fixed_updates.forEach( update => {
        if( update.length > 0 )
            result += getMiddleValue( update );
    } );

    return result;
}

function getMiddleValue( update ){
    return update[ Math.floor( ( update.length ) / 2 ) ];
}

function sortBadUpdate( update, rules ){
    /* Use Kahn's algorithm to sort the update based on the rules.
     * Shout-out to Earl Duque for the note about Kahn's algorithm and
     * the inspiration for this function!
     */
    let degrees = {},
        queue = [],
        relevantRules = {},
        fixed_update = [],
        updateSet = new Set(update);
 
    // Initialize the relevantRules and degrees objects.
    update.forEach( page => {
        relevantRules[ page ] = [];
        degrees[ page ] = 0;
    } );

    // Check the rules to set the relevantRules and the rule's degree for this update.
    rules.forEach( rule => {
        let [ a, b ] = rule;
        if( updateSet.has( a ) && updateSet.has( b ) ){
            relevantRules[ a ].push( b );
            degrees[ b ]++;
        }
    } );

    // Queue up the pages with degree=0
    update.forEach( page => {
        if( degrees[ page ] === 0 ){
            queue.push( page );
        }
    } );

    // Process the queue and sort the update pages
    while( queue.length > 0 ){
        let currentPage = queue.shift();
        fixed_update.push( currentPage );

        relevantRules[ currentPage ].forEach( dependentPage => {
            degrees[ dependentPage ]--;
            if( degrees[ dependentPage ] === 0 ){
                queue.push( dependentPage );
            }
        } );
    }

    return fixed_update;

}
