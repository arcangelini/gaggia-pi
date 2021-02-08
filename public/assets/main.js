/**
 * Client response
 */

let isConnectionActive = false;
let connection = io( 'http://gaggia.local:9000' );

connection.on( 'connect', () => {
    isConnectionActive = true;
});

connection.on( 'disconnect', () => {
    isConnectionActive = false;
});