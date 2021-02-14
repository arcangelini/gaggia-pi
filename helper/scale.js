/**
 * Process scale data
 */
const spawn = require('child_process').spawnSync;
const setWeight = process.argv[2]

console.log( "Brew starting" )

const scale = spawn( 'python', [ '/home/pi/gaggia/helper/hx711py/scale.py', setWeight ], {
    timeout: 15000,
    stdio: 'inherit'
});

console.log( "Brew finished" )