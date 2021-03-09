/**
 * Manage the brewing functions
 */
function startBrew(){
    let brewTime = document.getElementById( 'amount' ).value;
    if ( ! brewTime ) {
        alert( "Oops, I need a brew amount")
    }

    connection.emit( 'brew_start', brewTime );
    
    chartData = []

    chart.updateSeries([{
        name: 'Brew',
        data: []
    }])
}

function stopBrew(){

}