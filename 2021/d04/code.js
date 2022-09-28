#!/usr/bin/env node

var passports,
    lib = require('../lib'),
    filename = 'input.txt',
    print = console.log,
    table = console.table,
    valid_count = 0,
    valid_passports = [];
    

/* -------------- MAIN -------------------- */
passports = get_data(filename);
// table(passports);

passports.forEach(function(item, idx){
    valid_count += check_passport(item);
})
table(valid_passports);
print(valid_count);


/* -------------- FUNCTIONS -------------------- */

function get_data(filename){
    /* Given a file name, read the data and fix the newline characters. */
    var temp_field, temp_passport,
        data = lib.readFile(filename);
    data = data.replace(/\n\n/g, '@@').replace(/\n/g, ' ').split('@@');
    data.forEach(function(passport, idx){
        passport = passport.split(' ');
        temp_passport = {};
        passport.forEach(function(field){
            temp_field = field.split(':');
            temp_passport[temp_field[0]] = temp_field[1];
        })
        data[idx] = temp_passport;
    })
    return data;
}

function check_passport(passport){
    /* Given a passport, check each field against the list of valid fields and values. */
    var unit, size, valid_heights, min_size, max_size,
        byr = parseInt(passport.byr),
        eyr = parseInt(passport.eyr),
        iyr = parseInt(passport.iyr);

    if (!byr || byr < 1920 || byr > 2002){ return false; }
    
    if (!iyr || iyr < 2010 || iyr > 2020){ return false; }

    if (!eyr || eyr < 2020 || eyr > 2030){ return false; }
    
    if (!passport.hcl || passport.hcl.search(/#[0-9a-f]{6}/) == -1){ return false; }
    
    if (!passport.ecl || 'amb,blu,brn,gry,grn,hzl,oth'.search(passport.ecl) == -1){ return false; }
    
    if (!passport.pid || passport.pid.search(/^[0-9]{9}$/) == -1){ return false; }
    
    if (passport.hgt){
        valid_heights = {
            'cm': [150, 193],
            'in': [59, 76]
        };
        
        match = passport.hgt.match(/([0-9]{2,3})(cm|in)/);
        if (! match){ return false; }
        size = parseInt(match[1]);
        unit = match[2];

        min_size = valid_heights[unit][0];
        max_size = valid_heights[unit][1];

        if (size < min_size || size > max_size){ return false; }
    }else{ return false; }

    valid_passports.push(passport);
    return true;
}



