const fs = require('fs');

// if( !Array.prototype ){
//     Array.prototype = 
// }

exports.print = console.log;
exports.table = console.table;

exports.readFile = function(filename){
    return fs.readFileSync(filename, 'utf-8');
}

if( !Array.prototype.sum ){
    Array.prototype.sum = function(){

        return this.reduce( function( total, value ){
            return total += value;
        }, 0 );
    }
}


if( !Array.prototype.product ){
    Array.prototype.product = function(){
        
        return this.reduce( function( total, value ){
            return total *= value;
        }, 1 );
    }
}

if( !Array.prototype.parseInt ){
    Array.prototype.parseInt = function(){
        return this.map( num => parseInt( num ) );
    }
}

if( !Array.prototype.numSort ){
    Array.prototype.numSort = function( order ){
        ( order == 'desc' ) ? this.sort( ( a, b ) => b-a ) : this.sort( ( a, b ) => a-b );
        return this;
    }
}


/*****************************************************
 * Deprecated functions. Use Array methods instead.
 *****************************************************/
 

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
