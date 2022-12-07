#!/usr/bin/env node

// Puzzle URL: https://adventofcode.com/2022/day/7

var lib = require( '../../lib' ),
    sample = lib.readFile( 'input_sample.txt', cleanData ),
    input = lib.readFile( 'input.txt', cleanData );
    

/*****************************************
 *  Main
 *****************************************/ 

 var result = {
    "Part 1": {
        'Sample Expected': 95437,
        'Sample Calculated': part1( sample ), 
        'Real Calculated': part1( input ) 
    },
    "Part 2": {
        'Sample Expected': 24933642,
        'Sample Calculated': part2( sample ), 
        'Real Calculated': part2( input ) 
    }
};

console.table( result );
/* Result:
┌─────────┬─────────────────┬───────────────────┬─────────────────┐
│ (index) │ Sample Expected │ Sample Calculated │ Real Calculated │
├─────────┼─────────────────┼───────────────────┼─────────────────┤
│ Part 1  │      95437      │       95437       │     1206825     │
│ Part 2  │    24933642     │     24933642      │     9608311     │
└─────────┴─────────────────┴───────────────────┴─────────────────┘
*/

/*****************************************
 *  FUNCTIONS
 *****************************************/ 

function cleanData( data ){
    return data.split('\n').filter( line => !line.startsWith( '$ ls' ) );
}

function part1( data ){
    var tree = buildTree( data );
    
    return calculateAnswer1( tree )
}

function part2( data ){
    var tree = buildTree( data );
   
    return calculateAnswer2( tree );
}

function buildTree( data ){
    var dir,
        tree = { 'root': 0 },
        pwd = [];

    data.forEach( line => {
        line = line.split(' ');
        // console.log( line );

        if( line[0].match( /^\d+/ ) ){          // Add the file size to the current directory: tree[ pwd ]
            addFile( tree, pwd, line[0] );
        }

        else if( line[0] == 'dir' ){            // Add the directory to the tree if it does not already exist.
            dir = pwd.join('/') + '/' + line[1];
            
            if( tree[ dir ] == undefined ){
                tree[ dir ] = 0;
            }
        }

        else if( line[0] != '$' || line[1] != 'cd' ) {  // Invalid listing entry
            console.log( 'Invalid line: ' + line );
            return null;
        }

        else if( line[2] == '/'){               // Change to the root directory.
            pwd = [ 'root' ];
        }

        else if( line[2] == '..' ){             // Change to the parent directory.
            pwd.pop();
        }

        else{
            pwd.push( line[2] );
            path = pwd.join('/');
            if( tree[ path ] == undefined ){
                tree[ path ] = 0;
            }
        }

    } );

    return tree;
}

function addFile( tree, path, size ){
    path = path.join('/');

    if( tree[ path ] == undefined ){
        tree[ path ] = 0;
    }

    tree[ path ] += parseInt( size );
}

function calculateAnswer1( tree ){
    var answer = 0,
        limit = 100000;

    var paths = Object.keys( tree );
    paths.forEach( path => {
        var groupTotal = 0;
        
        paths.filter( path1 => path1.startsWith( path ) )
        .forEach( path2 => groupTotal += tree[ path2 ] );

        if( groupTotal < limit ){
            answer += groupTotal;
        }
        
    })

    return answer;
}

function calculateAnswer2( tree ){
    var freeSpace,
        diskSize = 70000000,
        spaceNeeded = 30000000;

    var directorySizes = [];
    var paths = Object.keys( tree );

    paths.forEach( path => {
        var groupTotal = 0;
        
        paths.filter( path1 => path1.startsWith( path ) )
        .forEach( path2 => groupTotal += tree[ path2 ] );

        directorySizes.push( [ path, groupTotal ] );
        
    } );

    directorySizes.sort( compareSecondColumn );

    diskUsage = directorySizes.slice(-1)[0][1];
    freeSpace = diskSize - diskUsage;
    spaceNeeded -= freeSpace;

    directorySizes = directorySizes.filter( dir => dir[1] >= spaceNeeded )[0];
 
    return directorySizes[1];
}

function compareSecondColumn( a, b ) {
    if( a[1] === b[1] ){
        return 0;
    }
    else{
        return ( a[1] < b[1] ) ? -1 : 1;
    }
}
