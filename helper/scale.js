/**
 * Scale object
 */
const { spawn } = require('child_process');

class Scale {
    _constructor(client, targetWeight) {
        this.client = client;
        this.read = spawn( 'python3', [ '/home/pi/gaggia/helper/hx711py/scale.py', targetWeight ], {
            detached: true,
            } 
        );
    }

    brew() {        
        this.read.stdout.setEncoding( 'utf-8' )
        this.read.stdout.on( 'data', data => {
            this.client.emit( 'brewing', data )
        } )
        
        this.read.stderr.setEncoding( 'utf-8' )
        this.read.stderr.on( 'data', data => {
            this.client.emit( 'brewing', data )
        } )
    }
 }