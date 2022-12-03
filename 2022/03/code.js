#!/usr/bin/env node

// Puzzle URL: 

var lib = require( '../../lib' ),
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

console.table( result );


/*****************************************
 *  FUNCTIONS
 *****************************************/ 

 function cleanData( input ){
    data = input.split('\n');
    return data.map( row => {
        var l = row.length;
        return [ row.slice( 0,l/2 ).split(''), row.slice( l/2 ).split('') ];
    });
}

function part1( data ){
    
    return data
    .map( row => row[0].intersection( row[1] ).deduplicate()[0] )
    .map( row => calculatePriority( row ) )
    .sum();

}

function part2( data ){
    data = groupElves( data );
    
    return data
    .map( group => group[0].intersection( group[1] ).intersection( group[2] ))
    .map( row => calculatePriority( row[0] ) )
    .sum();
    
}

function calculatePriority( letter ){
    var code = letter.charCodeAt( 0 );
    var isLowerCase = ( code > 90 );

    return isLowerCase ? ( code - 96 ) : ( code - 38 ) ;
}

function groupElves( data ){
    var groups = [];

    data = data.map( row => {
        return row[0].concat( row[1] ).deduplicate();
    })
    .forEach( ( row, idx ) => {
        var groupNumber = parseInt( idx / 3, 10 );
        if( groups[ groupNumber ] == undefined ) groups[ groupNumber ] = [];
        groups[ groupNumber ].push( row );
    });

    return groups;
}