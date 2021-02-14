/**
 * Setting up the server. Following these guides for help
 * https://developer.wordpress.org/coding-standards/wordpress-coding-standards/javascript/
 * https://www.javascriptjanuary.com/blog/an-introduction-to-iot-internet-of-toilets
 * https://medium.com/sysf/introduction-to-iot-with-raspberry-pi-and-node-js-using-rgb-led-lights-77f4750a5ea9
 *
 */

const express = require( 'express' )
const socket = require( 'socket.io' )
const spawnSync = require('child_process').spawnSync;
const app = express()
const port  = 9000

app.get( '/', ( request, response ) => {
    response.sendFile( '/home/pi/gaggia/public/index.html' ), {
        headers: {
            'Content-Type': 'text/html',
        },
    };
});

app.use( '/assets', express.static( '/home/pi/gaggia/public/assets' ) );
app.use( '/assets', express.static( '/home/pi/gaggia/node_modules/socket.io-client/dist' ) );


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

    client.emit( "Connected to server" );
    
    client.on( 'brew_start', ( setWeight ) => {
        
        client.emit( 'brewing', ( setWeight ) => {
            const scale = spawnSync( 'python', [ '/home/pi/gaggia/helper/hx711py/scale.py', setWeight ], {
			    stdio: 'inherit',
                timeout: 10000,
		    });
        })

    })

});
