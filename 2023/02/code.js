#!/usr/bin/env node

// Puzzle URL: https://adventofcode.com/2023/day/2

var lib = require( '../../lib' ),
    sample = lib.readFile( 'input_sample.txt', cleanData ),
    input = lib.readFile( 'input.txt', cleanData );
    

/*****************************************
 *  Main
 *****************************************/ 

 var result = {
    "Part 1": {
        'Sample Expected': 'N/A',
        'Sample Calculated': part1( sample ), 
        'Real Calculated': part1( input ) 
    },
    "Part 2": {
        'Sample Expected': 'N/A',
        'Sample Calculated': part2( sample ), 
        'Real Calculated': part2( input ) 
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
    var rgb = [ 12, 13, 14 ];
    var possible_games = [];

    data.forEach( ( game ) => {
        var game_id = game.match( /Game (\d+):/ )[1];

        var max_rgb = {
            'red': 0,
            'green': 0,
            'blue': 0
        };

        var hands = game.match( /Game \d+: (.*)/ )[1].split( '; ' );
        
        hands.forEach( ( hand ) => {
            hand = hand.split( ', ' );
            
            hand.forEach( ( color ) => {
                color = color.split(' ');
                max_rgb[ color[1] ] = Math.max( max_rgb[ color[1] ], color[0] );
            } );

        } );

        var possible = max_rgb.red <= rgb[0] && max_rgb.green <= rgb[1] && max_rgb.blue <= rgb[2];
        if( possible ){
            possible_games.push( game_id );
        }
    } )

    return possible_games.sum();

}

function part2( data ){
    var rgb = [ 12, 13, 14 ];
    var game_powers = [];

    data.forEach( ( game ) => {
        var power;

        var min_rgb = {
            'red': 0,
            'green': 0,
            'blue': 0
        };

        var hands = game.match( /Game \d+: (.*)/ )[1].split( '; ' );
        
        hands.forEach( ( hand ) => {
            hand = hand.split( ', ' );
            
            hand.forEach( ( color ) => {
                color = color.split(' ');
                min_rgb[ color[1] ] = Math.max( min_rgb[ color[1] ], color[0] );
            } );

        } );

        power = min_rgb.red * min_rgb.green * min_rgb.blue;

        game_powers.push( power );
        
    } )

    return game_powers.sum();
}

