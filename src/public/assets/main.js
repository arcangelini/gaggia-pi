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
        time = brewData.split("|")[0]
        weight = brewData.slit("|")[1]
        data = {
            x: time,
            y: weight
        }

        chartData.push(data)

        console.log( chartData )

        chart.appendData([{
            data: chartData
        }])
    }
})
