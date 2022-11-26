#!/usr/bin/env node

// Puzzle URL: 

var lib = require('../../lib'),
    sample = lib.readFile('input_sample.txt'),
    input = lib.readFile('input.txt'),
    print = console.log,
    table = console.table;
    

/*****************************************
 *  Main
 *****************************************/ 

var result = {},
    sample = cleanData( sample ),
    input = cleanData( input );

result['Part 1'] = { 
    'Sample Input': part1( sample.slice(0,5) ), 
    'Real Input': part1( input ) 
};
result['Part 2'] = { 
    'Sample Input': part2( sample.slice(5) ), 
    // 'Real Input': part2( input ) 
};

table( result );


/*****************************************
 *  FUNCTIONS
 *****************************************/ 


function cleanData( input ){
    /** 
     * Given the puzzle raw input, 
     * clean and format the raw information into usable data, and
     * return the data.
    */
    return input
        .split( '\n' );
}

function part1( data ){
    var answer = 0;

    data.forEach( word => {
        if( 
            hasThreeVowels( word ) &&
            hasDoubleLetter( word ) &&
            !hasBadLetters( word )
        ){
            answer++;
        }
    });

    return answer;
}

function part2( data ){
    var answer = 0;

    data.forEach( word => {
        if( !hasDoublePair( word ) ) return false;
        if( !hasSplitPair( word ) ) return false;
        answer++;
    } );

    return answer;
}

function hasBadLetters( word ){
    //It does not contain the strings ab, cd, pq, or xy, even if they are part of one of the other requirements.
    return word.search( /(ab|cd|pq|xy)/ ) >= 0;
}

function hasThreeVowels( word ){
    //It contains at least three vowels (aeiou only), like aei, xazegov, or aeiouaeiouaeiou.
    return word.match( /[aeiou]/g ) && word.match( /[aeiou]/g ).length >= 3;
}

function hasDoubleLetter( word ){
    //It contains at least one letter that appears twice in a row, like xx, abcdde (dd), or aabbccdd (aa, bb, cc, or dd).
    return word.search( /(.)\1/ ) >= 0;
}

function hasDoublePair( word ){
    //It contains a pair of any two letters that appears at least twice in the string without overlapping, like xyxy (xy) or aabcdefgaa (aa), but not like aaa (aa, but it overlaps).
    var letters, match;
    for( var i=0; i<word.length; i++ ){
        letters = word.slice(i, i+2);
        if( word[i] != word[i+1] ) continue;
        if( match === undefined ){
            match = i++;
        }
        else{
            return true;
        }
    }

    return false;
}

function hasSplitPair( word ){
    //It contains at least one letter which repeats with exactly one letter between them, like xyx, abcdefeghi (efe), or even aaa.
    return word.search( /(.).\1/) >= 0;
}