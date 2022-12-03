const fs = require('fs');

/* New Array Method Template
if( !Array.prototype.newMethod ){
    Array.prototype.newMethod = function( param1 ){
        // Do something here.
        // Reference the array with `this`.
        // Return a new array to enable chaining.
    }
}
*/

exports.readFile = function( filename, cleanFunction ){
    /* Given a file name (including path if required) and
     * an optional function to clean or manipulate the content,
     * retrieve the file's contents, apply the clean function, and
     * return the resulting data.
     */
    var data = fs.readFileSync(filename, 'utf-8');
    if( cleanFunction !== undefined ){
        return cleanFunction( data );
    }
    else{
        return data;
    }
}

if( !Array.prototype.sum ){
    Array.prototype.sum = function(){
        /* Given an array of numeric values,
         * add the elements together and
         * return the result.
         */
        return this.reduce( function( total, value ){
            return total += Number( value );
        }, 0 );
    }
}


if( !Array.prototype.product ){
    Array.prototype.product = function(){
        /* Given an array of numeric values,
         * multiple the values together and
         * return the result.
         */

        return this.reduce( function( total, value ){
            return total *= Number( value );
        }, 1 );
    }
}

if( !Array.prototype.parseInt ){
    Array.prototype.parseInt = function(){
        /* Given an array of values,
         * parse each value into an Integer.
         * return a new array.
         */
        return this.map( num => parseInt( num ) );
    }
}

if( !Array.prototype.parseNum ){
    Array.prototype.parseNum = function(){
        /* Given an array of values,
         * convert each value into a number.
         * return a new array.
         */
        return this.map( num => Number( num ) );
    }
}

if( !Array.prototype.numSort ){
    Array.prototype.numSort = function( order ){
        /* Given an array of values and optionally an order value,
         * perform a numeric sort of the values in the order provided or ascending.
         * return a new array.
         */
        ( order == 'desc' ) ? this.sort( ( a, b ) => b-a ) : this.sort( ( a, b ) => a-b );
        return this;
    }
}

if( !Array.prototype.intersection ){
    Array.prototype.intersection = function( arr ){
        /* Given an array of values and a second array as a parameter,
         * identify the values that appear in both arrays.
         * return a new array.
         */
        return this.filter( x => arr.indexOf( x ) > -1 );
    }
}

if( !Array.prototype.union ){
    Array.prototype.union = function( arr ){
        /* Given an array of values and a second array as a parameter,
         * identify all of the values that appear in either array.
         * Remove any duplicates and return a new array.
         */
        return this
        .concat( arr )
        .deduplicate();
    }
}

if( !Array.prototype.deduplicate ){
    Array.prototype.deduplicate = function(){
        /* Given an array of values,
         * identify the values that appear more than once.
         * Retain the first occurrence and remove the rest.
         * return a new array.
         */
        return this.filter( ( x, idx, arr ) => arr.indexOf( x ) == idx );
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

