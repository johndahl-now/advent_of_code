#!/usr/bin/env node

// Puzzle URL: https://adventofcode.com/2022/day/9

var lib = require( '../../lib' ),
    sample = lib.readFile( 'input_sample.txt', cleanData ),
    sample2 = lib.readFile( 'input_sample2.txt', cleanData ),
    input = lib.readFile( 'input.txt', cleanData );
    

/*****************************************
 *  Main
 *****************************************/ 

 var result = {
    "Part 1": {
        'Sample Expected': 13,
        'Sample Calculated': part1( sample, 2 ), 
        'Real Calculated': part1( input, 2 ) 
    },
    "Part 2": {
        'Sample Expected': 36,
        'Sample Calculated': part1( sample2, 10 ), 
        'Real Calculated': part1( input, 10 ) 
    }
};

console.table( result );
/* Result:
┌─────────┬─────────────────┬───────────────────┬─────────────────┐
│ (index) │ Sample Expected │ Sample Calculated │ Real Calculated │
├─────────┼─────────────────┼───────────────────┼─────────────────┤
│ Part 1  │       13        │        13         │      5981       │
│ Part 2  │       36        │        36         │      2352       │
└─────────┴─────────────────┴───────────────────┴─────────────────┘
*/

/*****************************************
 *  FUNCTIONS
 *****************************************/ 

function cleanData( data ){
    return data.split('\n')
    .map( row => {
        let move = row.split(' ');
        move[1] = parseInt( move[1] );
        return move;
    } );
}

function part1( data, size ){
    let knots = makeKnots( size );
    let trail = {"0,0": 1};

    data.forEach( move => {
        moveHead( knots[0] , move );
    } );
    
    return Object.values( trail ).length;

    function calculateDistance( knot1, knot2 ){
        // calculate the distance between knot1 and knot2
        // a2 + b2 = c2
        let [ x1, y1 ] = knots[ knot1 ];
        let [ x2, y2 ] = knots[ knot2 ];
        let x = x1 - x2;
        let y = y1 - y2;
        
        return Math.sqrt( ( x * x ) + ( y * y ) );
    }
    
    function markTrail( knot ){
        trail[ knots[ knot ] ] = 1;
    }

    function moveHead( head, move ){
        // Move the head knot based on the "move" instruction given
        let distance;
        let [dir, dis] = move;
        
        let map = {
            "R": () => head[0]++,
            "L": () => head[0]--,
            "U": () => head[1]++,
            "D": () => head[1]--
        };
    
        while( dis-- > 0 ){
            map[ dir ]();
            distance = calculateDistance( 0, 1 );
            if( distance >= 2 ) moveKnot( 1, 0 );
        }
    }
    
    function moveKnot( knot1, knot2 ){
        // Move knot1 towards knot2
        let [ x1, y1 ] = knots[ knot1 ];
        let [ x2, y2 ] = knots[ knot2 ];
        let x = x2 - x1;
        let y = y2 - y1;
        
        let map = {
            "R": () => knots[ knot1 ][0]++,
            "L": () => knots[ knot1 ][0]--,
            "U": () => knots[ knot1 ][1]++,
            "D": () => knots[ knot1 ][1]--
        };
        
        if( x > 0 ) map[ "R" ]();
        if( x < 0 ) map[ "L" ]();
        if( y > 0 ) map[ "U" ]();
        if( y < 0 ) map[ "D" ]();
    
        if( knot1 == Object.keys( knots ).length - 1 ){
            markTrail( knot1 );
        }
        else{
            distance = calculateDistance( knot1, knot1 + 1 );
            if( distance >= 2 ) moveKnot( knot1 + 1, knot1 );
        }
    }

    function makeKnots( size ){
        var knots = {};
        for( var i=0; i<size; i++ ){
            knots[ i ] = [0,0];
        }
        return knots;
    }
}
