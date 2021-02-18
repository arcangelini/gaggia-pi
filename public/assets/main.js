/**
 * Gaggia response
 */

let button_brew = document.getElementById( 'brew' )
let isConnectionActive = false
let connection = io( 'http://gaggia.local:9000' )

const options = {
    chart: {
        type: 'line'
    },
    series: [{
        name: 'Brew',
        data: []
    }],
    animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
    }
}

let chart = new ApexCharts( document.querySelector( '#chart' ), options );

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

connection.on( 'brewing', ( brewData ) => {

    if ( brewData.startsWith( "Filling" ) ) {
        console.log( brewData );
    } else {
        time = brewData.slice(",")[0]
        weight = brewData.slice(",")[1]

        chart.appendData([{
            data: [ [time, weight] ]
        }])
    }

    console.log( brewData )
})
