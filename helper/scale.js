/**
 * Process scale data
 */
const spawn = require('child_process').spawnSync;
/*const setWeight = process.argv[2]*/


process.on( 'message', setWeight =>{
    console.log( "Brew starting" )
    
    process.send(
        spawn( 'python', [ '/home/pi/gaggia/helper/hx711py/scale.py', setWeight ], {
            timeout: 15000,
            stdio: 'inherit'
        })

    )
})