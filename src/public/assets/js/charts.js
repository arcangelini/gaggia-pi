/**
 * Chart functions
 */
const chart = new ApexCharts( document.querySelector( '#chart' ), {
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
        stroke: {
            show: true,
            curve: 'smooth',
        },
        dataLabels: {
            enabled: false
        },
        title: {
            text: 'Brew Weight',
        }
    }
);