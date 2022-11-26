var fs = require('fs');


exports.readFile = function(filename){
    return fs.readFileSync(filename, 'utf-8');
}

exports.numSort = function( arr, order ){
    ( order == 'desc' ) ? arr.sort( ( a, b ) => b-a ) : arr.sort( ( a, b ) => a-b );
    return arr;
}

exports.arrParseInt = function( arr ){
    return arr.map( num => parseInt( num ) );
}

exports.arrParseNum = function( arr ){
    return arr.map( num => Number( num ) );
}

exports.arrSum = function( arr ){

    return arr.reduce( function( total, value ){
        return total += value;
    }, 0 );
}

exports.arrProduct = function( arr ){
    return arr.reduce( function( total, value ){
        return total *= value;
    }, 1 );
}

