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
        this.read.stdout.setEncoding( 'utf-8' )
        this.read.stdout.on( 'data', data => {
            this.client.emit( 'brewing', data )
            if( data.startsWith( "Brew complete" ) ){
                console.log( "Brew ending" );
            }
        } )
        
        this.read.stderr.setEncoding( 'utf-8' )
        this.read.stderr.on( 'error', data => {
            this.client.emit( 'error', data )
        } )
    }

    stop() {

    }
}

 module.exports = Scale;
