#!/usr/bin/env node

// Puzzle URL: 

var lib = require( '../../lib' ),
    print = console.log,
    table = console.table,
    sample = lib.readFile( 'input_sample.txt', cleanData ),
    input = lib.readFile( 'input.txt', cleanData );
    

/*****************************************
 *  Main
 *****************************************/ 

var result = {};

result['Part 1'] = { 
    'Sample Input': part1( sample ), 
    'Real Input': part1( input ) 
};
result['Part 2'] = { 
    'Sample Input': part2( sample ), 
    'Real Input': part2( input ) 
};

table( result );


/*****************************************
 *  FUNCTIONS
 *****************************************/ 

 function cleanData( input ){
    return input.split('\n');
}

function part1( data ){
    
    var scores = data.map( row => {
        return calculateScore( row )
     } );

    return scores.sum();
}

function part2( data ){
    
    var scores = data.map( row => {
        row = calculatePlay( row );
        return calculateScore( row );
    } );
    
    return scores.sum();
}

function calculateScore( row ){
    var scores = {
        'A X': (1 + 3), // Rock - Rock = Draw
        'A Y': (2 + 6), // Rock - Paper = Win
        'A Z': (3 + 0), // Rock - Scissors = Loss
        'B X': (1 + 0), // Paper - Rock = Loss
        'B Y': (2 + 3), // Paper - Paper = Draw
        'B Z': (3 + 6), // Paper - Scissors = Win
        'C X': (1 + 6), // Scissors - Rock = Win
        'C Y': (2 + 0), // Scissors - Paper = Loss
        'C Z': (3 + 3)  // Scissors - Scissors = Draw
    };

    return scores[ row ];

}

function calculatePlay( row ){
    var plays = {
        'A': {              // Opponent plays Rock
            'X': 'Z',       // I need to Lose
            'Y': 'X',       // I need to Draw
            'Z': 'Y'        // I need to Win
        },
        'B': {              // Opponent plays Paper
            'X': 'X',       // I need to Lose
            'Y': 'Y',       // I need to Draw
            'Z': 'Z'        // I need to Win
        },
        'C': {              // Opponent plays Scissors
            'X': 'Y',       // I need to Lose
            'Y': 'Z',       // I need to Draw
            'Z': 'X'        // I need to Win
        }
    };

    row = row.split(' ');
    row[1] = plays[ row[0] ][ row[1] ];

    return row.join(' ');
}