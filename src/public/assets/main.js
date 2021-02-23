/**
 * Gaggia response
 */

let buttonBrew = document.getElementById( 'brew' )
let chartLocation = document.querySelector( '#chart' )
let connection = io( 'http://gaggia.local:9000' )
let chart = new ApexCharts( chartLocation, {
        series: [],
        noData: {
            text: "Brewing..."
        },
        chart: {
            animations: {
                enabled: true,
                easing: 'linear',
                speed: 500,
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            },
            height: 350,
            type: 'line',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        xaxis: {
            type: 'numeric'
        },
        dataLabels: {
            enabled: false
        },
        title: {
            text: 'Brew Weight',
        }
    } );

buttonBrew.addEventListener( 'click', () => {
    let brewTime = document.getElementById( 'amount' ).value;
    connection.emit( 'brew_start', brewTime );

    chart.render();
})

chartData = []
connection.on( 'brewing', ( brewData ) => {

    if ( brewData.startsWith( "Filling" ) ) {
        console.log( brewData );
    } else {
        time = parseFloat( brewData.split("|")[0] )
        weight = parseFloat( brewData.split("|")[1] )
        data = {
            x: time,
            y: weight
        }

        chartData.push(data)

        console.log( chartData )

        chart.updateSeries([{
            data: chartData
        }])
    }
})
