/**
 * Process scale data
 */
const spawn = require('child_process').spawn;
const setWeight = process.argv[0]

const scale = spawn( 'python', [ '/home/pi/gaggia/helper/hx711py/scale.py', setWeight ], {
    timeout: 10000,
});

scale.stdout.on( 'data', ( data ) => {
    console.log( data )
})
