/**
 * Process scale data
 */
const spawn = require('child_process').spawnSync;
const setWeight = process.argv[2]

const scale = spawn( 'python', [ '/home/pi/gaggia/helper/hx711py/scale.py', setWeight ], {
    timeout: 10000,
    stdio: 'inherit'
});
