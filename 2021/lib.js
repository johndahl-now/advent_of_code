var fs = require('fs');


exports.readFile = function(filename){
    return fs.readFileSync(filename, 'utf-8');
}


exports.convertStringsToInts = function(arr){
    // Given an array of numeric strings,
    // Convert each element into an integer and
    // Return a new array of ints.
    var new_arr = []
    arr.forEach((entry, idx) => { new_arr[idx] = parseInt(entry); });
    return new_arr;
}