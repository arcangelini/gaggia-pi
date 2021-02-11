/**
 * Client response
 */

let button_brew = document.getElementById( 'brew' )
let isConnectionActive = false
let brewTime = document.getElementById( 'amount' )
let connection = io( 'http://gaggia.local:9000' )

connection.on( 'connect', () => {
    isConnectionActive = true;
});

connection.on( 'disconnect', () => {
    isConnectionActive = false;
});

button_brew.addEventListener( 'click', () => {
    connection.emit( 'brew', 'Brew time: ' + brewTime );
})