#!/usr/bin/env node

// Puzzle URL: https://adventofcode.com/2022/day/10

var lib = require( '../../lib' ),
    sample = lib.readFile( 'input_sample.txt', cleanData ),
    input = lib.readFile( 'input.txt', cleanData );
    

/*****************************************
 *  Main
 *****************************************/ 

 var result = {
    "Part 1": {
        'Sample Expected': 13140,
        'Sample Calculated': part1( sample ), 
        'Real Calculated': part1( input ) 
    },
    "Part 2": {
        'Sample Expected': `##..##..##..##..##..##..##..##..##..##..
        ###...###...###...###...###...###...###.
        ####....####....####....####....####....
        #####.....#####.....#####.....#####.....
        ######......######......######......####
        #######.......#######.......#######.....`,
        'Sample Calculated': part2( sample ), 
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
    var x = 1,
        cycle = 0,
        signal = [];

    data.forEach( ( instruction, idx ) => {
        if( ++cycle == 20 || ( ( cycle - 20 ) % 40 == 0 ) ){
            signal.push( cycle * x );
        }
        if( instruction.startsWith( 'noop' ) ) return null;
        if( ++cycle == 20 || ( cycle - 20 ) % 40 == 0 ){
            signal.push( cycle * x );
        }
        x += Number( instruction.match( /(-?[0-9]+)/ )[1] );
    })

    return signal.sum();
}

function part2( data ){
    var grid, instruction,
        cycle = 0,
        x = 1,
        rows = 6,
        cols = 40,
        stream = Array( rows * cols ).fill('.');

    while( true ){
        if( data.length == 0 ) break;

        cycle++;
        console.log( `Cycle: ${cycle}\tRegister: ${x}` );

        switch( cycle ){
            case x-1:
            case x:
            case x+1:
                stream[ cycle ] = '#';
                break;
            default:
                stream[ cycle ] = '.';
        }

        instruction = data.shift()
        if( instruction == 'noop' ) continue;

        cycle++;
        x += Number( instruction.split(' ')[1] );
        
        switch( cycle ){
            case x-1:
            case x:
            case x+1:
                stream[ cycle ] = '#';
                break;
            default:
                stream[ cycle ] = '.';
        }

    }

    grid = Array( rows ).fill( [] );
    for( var row=0; row<rows; row++ ){
        for( var col=0; col<cols; col++ ){
            grid[row][col] = stream.shift();
        }
    }


    console.table( grid );

    return grid;

}
