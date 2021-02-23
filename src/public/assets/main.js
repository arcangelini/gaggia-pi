/**
 * Gaggia response
 */

let buttonBrew = document.getElementById( 'brew' )
let chartLocation = document.querySelector( '#chart' )
let connection = io( 'http://gaggia.local:9000' )
let chart = new ApexCharts( chartLocation, {
        series: [{
            data: data.slice()
            }],
        chart: {
            id: 'realtime',
            height: 350,
            type: 'line',
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 1000
                }
            },
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'Dynamic Updating Chart',
            align: 'left'
        },
        markers: {
            size: 0
        },
        xaxis: {
            type: 'datetime',
            range: XAXISRANGE,
        },
        yaxis: {
            max: 100
        },
        legend: {
            show: false
        },
    } );

buttonBrew.addEventListener( 'click', () => {
    let brewTime = document.getElementById( 'amount' ).value;
    connection.emit( 'brew_start', brewTime );

    chart.destroy();
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
