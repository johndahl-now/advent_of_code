#!/usr/bin/env node

// Puzzle URL: 

var lib = require('../lib'),
    sample = lib.readFile('input_sample.txt'),
    input = lib.readFile('input.txt'),
    print = console.log,
    table = console.table;
    

/*****************************************
 *  Main
 *****************************************/ 

var result = {},
    sample = cleanData( sample ),
    input = cleanData( input ),
    fields = ['byr', 'cid', 'ecl', 'eyr', 'hcl', 'hgt', 'iyr', 'pid'],
    requirements = {
        'byr': 'Between 1920 and 2002 inclusively.',
        'iyr': 'Between 2010 and 2020 inclusively.',
        'eyr': 'Between 2020 and 2030 inclusively.',
        'hgt': 'Between 150cm/50in and 193cm/76in inclusively.',
        'hcl': 'Formatted as #0099aaff',
        'ecl': 'One of amb blu brn gry grn hzl oth',
        'pid': '9-digit number, including leading zeros',
        'cid': 'Ignored.'
    };
    
table( sample );
table( input );

result['Part 1'] = {};
result['Part 1']['Sample Input'] = part1( sample );
result['Part 1']['Real Input'] = part1( input );

result['Part 2'] = {};
result['Part 2']['Sample Input'] = part2( sample );
result['Part 2']['Real Input'] = part2( input );

table( result );


/*****************************************
 *  FUNCTIONS
 *****************************************/ 


function cleanData( input ){
    /** 
     * Given the puzzle raw input, 
     * clean and format the raw information into an array of objects where each field label is an object key, and
     * return the data.
    */

    var field,
        passports = [],
        data = input.replaceAll( '\n\n', '@@' ).replaceAll( '\n', ' ' ).split('@@');

    // data = data.slice(0,10); // Temporarily limit the input to 10 passports.

    data.forEach( function( record ){
        var passport = {};

        record = record.split(' ').sort();

        record.forEach( function( field ){
            var key = field.split(':')[0];
            var value = field.split(':')[1];
            if( key == 'cid' ){ return; }
            passport[ key ] = value;
        });

        passports.push( passport );
    });

    return passports;
}


function part1( passports ){
    var count = 0;

    passports.forEach( function( passport ){
        var valid = isValidPassport( passport );
        passport.valid = valid;
        if( valid === true ){
            count++;
        }
    });

    // table( passports );
    return count; 
}

function isValidPassport( passport ){
    var keys = Object.keys( passport );
    return ( keys.length == 7 );
}

function part2( data ){
    var count = 0;

    data.forEach( function( passport ){
        var result = isValidPassport2( passport )
        passport.valid = result;
        if( result === true ){
            count++;
        }
        else{
            if( result.indexOf('Missing Fields') != 0 ){
                result += ' ' + passport[result] + ' is not: ' + requirements[result];
            }
            //print( 'Error: ' + result );
        }
    });

    // table( data );
    return count; 
}

function isValidPassport2( passport ){
    var keys = Object.keys( passport );

    // print('Passport: ' + JSON.stringify(passport) );

    if( keys.length < 8 ){ return 'Missing Fields'; }

    // Is byr between 1920 and 2002?
    var byr = Number( passport.byr );
    // if( byr < 1920 ) { return 'byr too low'; };
    // if( byr > 2002 ) { return 'byr too high'; };
    if( byr < 1920 || byr > 2002 ){ return 'byr'; }

    // Is iyr between 2010 and 2020?
    var iyr = Number( passport.iyr );
    // if( iyr < 2010 ){ return 'iyr too low'; };
    // if( iyr > 2020 ){ return 'iyr too high'; };
    if( iyr < 2010 || byr > 2020 ){ return 'iyr'; }

    // Is eyr between 2020 and 2030?
    var eyr = Number( passport.eyr );
    // if( eyr < 2020 ){ return 'eyr too low'; }
    // if( eyr > 2030 ){ return 'eyr too high'; }
    if( eyr < 2020 || eyr > 2030 ){ return 'eyr'; }

    // Is the hgt valid?
    if( !passport.hgt.match( /\d{2,3}(in|cm)/ ) ){ return 'hgt'; }
    try{
        var scale = passport.hgt.slice(-2);
        var hgt = Number( passport.hgt.slice( 0,-2 ) );
        if( scale == 'in' && ( hgt < 59 || hgt > 76 )){ return 'hgt'; }
        if( scale == 'cm'  && ( hgt < 150 || hgt > 193 )){ return 'hgt'; }
    }
    catch(e){
        print(e.name + ': ' + e.message);
        print('hgt is of type: ' + typeof passport.hgt );
        print('Passport: ' + JSON.stringify(passport) );
    }

    // Is hcl valid?
    try{
        if( !passport.hcl.match( /#[\da-f]{6}/ ) ){ return 'hcl'; }
    }
    catch(e){
        print(e.name + ': ' + e.message);
        print('hcl is of type: ' + typeof passport.hcl );
        print('hcl has a value of: ' + passport.hcl );
    }

    // Is ecl valid?
    if( ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].indexOf( passport.ecl ) == -1 ){ return 'ecl'; }

    // Is pid valid?
    if( !passport.pid.match( /\d{9}/ ) ){ return 'pid'; };
    
    // After testing everything, this must be valid.
    return true;
}


//     /*
//         byr (Birth Year) - four digits; at least 1920 and at most 2002.
//         iyr (Issue Year) - four digits; at least 2010 and at most 2020.
//         eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
//         hgt (Height) - a number followed by either cm or in:
//             If cm, the number must be at least 150 and at most 193.
//             If in, the number must be at least 59 and at most 76.
//         hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
//         ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
//         pid (Passport ID) - a nine-digit number, including leading zeroes.
//         cid (Country ID) - ignored, missing or not.
//     */

