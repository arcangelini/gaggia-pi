/**
 * Setting up the server. Following these guides for help
 * https://developer.wordpress.org/coding-standards/wordpress-coding-standards/javascript/
 * https://www.javascriptjanuary.com/blog/an-introduction-to-iot-internet-of-toilets
 * https://medium.com/sysf/introduction-to-iot-with-raspberry-pi-and-node-js-using-rgb-led-lights-77f4750a5ea9
<<<<<<< HEAD
 *
 */

const express = require( 'express' )
const socket = require( 'socket.io' )
const app = express()
const port  = 9000

app.get( '/', ( request, response ) => {
    response.sendFile( '/home/pi/gaggia/public/index.html' ), {
        headers: {
            'Content-Type': 'text/html',
=======
 * 
 */

const express   = require( 'express' )
const socket    = require( 'socket.io' )
const app       = express()
const port      = 9000

app.get( '/', ( request, response ) => {
    response.sendFile ( '/home/pi/gaggia/public/index.html' ), {
        headers: {
	    'Content-Type': 'text/html',
>>>>>>> 4e61f01de04b59e1ac10a2958cdd746617dbc90d
        },
    };
});

app.use( '/assets', express.static( '/home/pi/gaggia/public/assets' ) );
app.use( '/assets', express.static( '/home/pi/gaggia/node_modules/socket.io-client/dist' ) );


<<<<<<< HEAD
const server = app.listen( port, () => {
    console.log( 'Express server started!' );
});
const io = socket( server, {
    cors: {
        origin: '*',
    }
})

io.on( 'connection', ( client ) => {
    console.log( 'SOCKET: ', 'A client connected', client.id );

=======
const server    = app.listen( port, () => { console.log('Express server started!'); });
const io        = socket( server, { cors : { origin: '*', } } )

io.on( 'connection', ( client ) => {
    console.log( 'SOCKET: ', 'A client connected', client.id );
    
>>>>>>> 4e61f01de04b59e1ac10a2958cdd746617dbc90d
    client.on( 'brew', () => {
        console.log( "Starting brew" );
    })
});
