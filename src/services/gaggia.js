/**
 * Scale object
 */
const { spawn } = require('child_process');

class Scale {
    constructor( client, targetWeight ) {
        this.client = client;
        this.targetWeight = targetWeight;
        this.read = spawn( 'python3', [ '-u', __dirname + '/scale.py', this.targetWeight ], {
            detached: true,
            } 
        );
    }

    brew() {  
        this.read.stderr.on( 'error', data => {
            this.client.emit( 'error', data )
        } )

        this.read.stdout.on( 'data', data => {
            this.client.emit( 'brewing', data )
            if( data.startsWith( 'Brew complete' ) ){
                console.log( 'Brew finished' );
            }
        } )
        
    }

    stop() {

    }
}

 module.exports = Scale;
