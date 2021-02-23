/**
 * Gaggia response
 */

let buttonBrew = document.getElementById( 'brew' )
let chartLocation = document.querySelector( '#chart' )
let connection = io( 'http://gaggia.local:9000' )
let chart = new ApexCharts( chartLocation, {
        series: [{
            name: 'Brew',
            data: [],
        }],
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
            type: 'category'
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

connection.on( 'brewing', ( brewData ) => {

    if ( brewData.startsWith( "Filling" ) ) {
        console.log( brewData );
    } else {
        //time = brewData.slice(" , ")[0]
        //weight = brewData.slice(" , ")[1]
        console.log( brewData )

        chart.appendData([{
            data: [ brewData ]
        }])
    }
})
