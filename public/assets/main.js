/**
 * Gaggia response
 */

let button_brew = document.getElementById( 'brew' )
let isConnectionActive = false
let connection = io( 'http://gaggia.local:9000' )
import ApexCharts from 'apexcharts'


connection.on( 'connect', ( server ) => {
    isConnectionActive = true;
});

connection.on( 'disconnect', () => {
    isConnectionActive = false;
});

button_brew.addEventListener( 'click', () => {
    let brewTime = document.getElementById( 'amount' ).value;
    connection.emit( 'brew_start', brewTime );
})

connection.on( 'brewing', ( data ) => {
    let brew = []
    brew.push( data )
    
    const options = {
        chart: {
            type: 'line'
        },
        series: [{
            name: 'Brew',
            data: brew
        }],
        xaxis: {
            type: 'numeric'
        }
    }
    let chart = new ApexCharts( document.querySelector( '#chart' ), options );
    
    chart.render();

    console.log( data )
})