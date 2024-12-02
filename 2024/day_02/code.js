#!/usr/bin/env node

var lib = require( '../../lib' ),
    sample = lib.readFile( 'input_sample.txt', cleanData );
    input = lib.readFile( 'input.txt', cleanData );
    

/*****************************************
 *  Main
 *****************************************/ 

 var result = {
    "Part 1": {
        'Sample Expected': 2,
        'Sample Calculated': part1( sample.slice(0) ), 
        'Real Calculated': part1( input.slice(0) ) 
    },
    "Part 2": {
        'Sample Expected': 4,
        'Sample Calculated': part2( sample.slice(0) ), 
        'Real Calculated': part2( input.slice(0) ) 
    }
};

console.table( result );
/* Result:
┌─────────┬─────────────────┬───────────────────┬─────────────────┐
│ (index) │ Sample Expected │ Sample Calculated │ Real Calculated │
├─────────┼─────────────────┼───────────────────┼─────────────────┤
│ Part 1  │ 2               │ 2                 │ 670             │
│ Part 2  │ 4               │ 4                 │ 700             │
└─────────┴─────────────────┴───────────────────┴─────────────────┘
*/

/*****************************************
 *  FUNCTIONS
 *****************************************/ 

function cleanData( data ){
   /* Given a string containing a grid of data representing:
    * reports (rows) and levels (columns),
    * convert the string into a matrix (array of arrays),
    * Return the matrix.
    */

   return data
    .split('\n')
    .map( row => row.split( " " ) )
    .map( row => row.parseInt() );

}

function part1( data ){
    /* Given a matrix (array of arrays) of values,
     * examine each row and determine if:
     *    1. the numbers are sorted in either direction and
     *    2. the difference between any two values is between 1 and 3 inclusively.
     * Return the number of safe reports.
     */
    var safe_reports = 0;

    // Filter out reports that are not fully ascending or descending.
    data = data.filter( report => {
        
        // Make sorted copies of the report.
        var sortedAsc = report.slice(0).numSort(),
            sortedDesc = report.slice(0).numSort( 'desc' );

        // Convert reports to strings
        sortedAsc = sortedAsc.join(',');
        sortedDesc = sortedDesc.join(',');
        report = report.join(',');

        return ( report === sortedAsc ) || ( report === sortedDesc );

    } );

    // Filter out reports with a variance less than 1 or greater than 3
    data = data.filter( report => {
        var variance;

        for( var i=1; i<report.length; i++ ){
        
            variance = Math.abs( report[ i ] - report[ i-1 ] );
        
            if( variance == 0 || variance > 3 ) return false;
        
        }

        return true;
    } );

    return data.length;

}

function part2( data ){
    /* Given a matrix (array of arrays) of values,
     * examine each row and determine if:
     *    1. the numbers are sorted in either direction and
     *    2. the difference between any two values is between 1 and 3 inclusively.
     * If a level fails a test, see if removing a single level will render the report safe.
     * Return the number of safe reports.
     */

    data = data.filter( report => {

        var safeReport = isReportSafe( report );
        if( safeReport ) return true;

        // Determine if removing a single level will make the report safe.
        var reducedReport;
        for( var i=0; i<report.length; i++ ){
            reducedReport = removeLevel( report, i );
            if( isReportSafe( reducedReport ) ) return true;
        }

        // The report is not safe, either unmodified or by removing a single level.
        return false;

    } );

    return data.length;
}

function isReportSafe( report ){
    var variance

    // Make sorted copies of the report.
    var sortedAsc = report.slice(0).numSort(),
        sortedDesc = report.slice(0).numSort( 'desc' );

    // Convert reports to strings
    sortedAsc = sortedAsc.join(',');
    sortedDesc = sortedDesc.join(',');

    if ( report.join(',') !== sortedAsc  &&  report.join(',') !== sortedDesc ) return false;

    for( var i=1; i<report.length; i++ ){

        variance = Math.abs( report[ i ] - report[ i-1 ] );

        if( variance == 0 || variance > 3 ) return false;

    }

    return true;
}

function removeLevel( report, index ){
    /* Given a report and an index,
     * remove the level at the given index.
     * Return a NEW report without the indexed level.
     */
    return report.slice( 0, index ).concat( report.slice( index + 1 ) );
}