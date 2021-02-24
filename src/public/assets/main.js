/**
 * Gaggia response
 */
let buttonBrew = document.getElementById( 'brew' )
let connection = io( 'http://gaggia.local:9000' )
chart.render();

buttonBrew.addEventListener( 'click', () => {
    let brewTime = document.getElementById( 'amount' ).value;
    connection.emit( 'brew_start', brewTime );
    
    chartData = []

    chart.updateSeries([{
        name: 'Brew',
        data: []
    }])
})

connection.on( 'error', ( error ) => {
    console.log( error )
} )

connection.on( 'brewing', ( brewData ) => {
    
    switch ( brewData.charAt(0) ) {
        case "F":
            console.log( brewData );
            break;

        case "B":
            console.log( brewData );
            delete chartData
            delete brewData
            break;

        default:
            time = parseFloat( brewData.split("|")[0] )
            weight = parseFloat( brewData.split("|")[1] )
            data = {
                x: time,
                y: weight
            }

            chartData.push(data)

            console.log( time + '||' + weight )

            chart.updateSeries([{
                name: 'Brew',
                data: chartData
            }])

    }
} )