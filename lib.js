var fs = require('fs');


exports.readFile = function(filename){
    return fs.readFileSync(filename, 'utf-8');
}

exports.numSort = function( arr, order ){
    ( order == 'desc' ) ? arr.sort( ( a, b ) => b-a ) : arr.sort( ( a, b ) => a-b );
    return arr;
}

exports.arrParseInt = function( arr ){
    return arr.map( num => { return parseInt( num ); } );
}

exports.arrParseNum = function( arr ){
    return arr.map( num => { return Number( num ); } );
}