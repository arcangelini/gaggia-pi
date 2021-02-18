/**
 * Setting up the server. Following these guides for help
 * https://developer.wordpress.org/coding-standards/wordpress-coding-standards/javascript/
 * https://www.javascriptjanuary.com/blog/an-introduction-to-iot-internet-of-toilets
 * https://medium.com/sysf/introduction-to-iot-with-raspberry-pi-and-node-js-using-rgb-led-lights-77f4750a5ea9
 *
 */

const express = require( 'express' )
const socket = require( 'socket.io' )
const Scale = require( '/home/pi/gaggia/helper/gaggia.js' )
const app = express()
const five = require( 'johnny-five' )
const Raspi = require( 'raspi-io' ).RaspiIO;
const board = new five.Board({
    io: new Raspi()
});

app.get( '/', ( request, response ) => {
    response.sendFile( '/home/pi/gaggia/public/index.html' ), {
        headers: {
            'Content-Type': 'text/html',
        },
    };
});

app.use( '/assets', express.static( '/home/pi/gaggia/public/assets' ) );
app.use( '/assets', express.static( '/home/pi/gaggia/node_modules/socket.io-client/dist' ) );
app.use( '/assets', express.static( '/home/pi/gaggia/node_modules/apexcharts/dist' ) );

const server = app.listen( 9000, () => {
    console.log( 'Express server started!' );
});
const io = socket( server, {
    cors: {
        origin: '*',
    }
})

board.on( 'ready', () => {
    io.on( 'connection', ( client ) => {
        console.log( 'SOCKET: ', 'A client connected', client.id );

        client.on( 'brew_start', ( setWeight ) => {
            const scale = new Scale( client, setWeight )

            scale.brew()
        })
    });
});
