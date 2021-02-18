/**
 * Gaggia response
 */

let button_brew = document.getElementById( 'brew' )
let isConnectionActive = false
let connection = io( 'http://gaggia.local:9000' )
let chart = new ApexCharts( document.querySelector( '#chart' ), options );
const options = {
    chart: {
        type: 'line'
    },
    series: [{
        name: 'Brew',
        data: []
    }],
    xaxis: {
        type: 'numeric'
    },
    animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
    }
}

connection.on( 'connect', () => {
    isConnectionActive = true;
});

connection.on( 'disconnect', () => {
    isConnectionActive = false;
});

button_brew.addEventListener( 'click', () => {
    let brewTime = document.getElementById( 'amount' ).value;
    connection.emit( 'brew_start', brewTime );

    chart.render();
})

connection.on( 'brewing', ( data ) => {

    if ( data.startsWith( "Filling" ) ) {
        console.log( data );
    } else {
        chart.updateSeries([{
            data: brew
        }])
    }

    console.log( brew )
})
