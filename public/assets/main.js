/**
 * Client response
 */

let button_brew = document.getElementById( 'brew' )
let isConnectionActive = false
let connection = io( 'http://gaggia.local:9000' )

connection.on( 'connect', ( server ) => {
    isConnectionActive = true;

    server.on( 'brewing', ( data ) => {
        console.log( data )
    })

});

connection.on( 'disconnect', () => {
    isConnectionActive = false;
});

button_brew.addEventListener( 'click', () => {
    let brewTime = document.getElementById( 'amount' ).value;
    connection.emit( 'brew_start', brewTime );
})