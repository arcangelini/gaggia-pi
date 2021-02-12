const hx711 = require('/home/pi/gaggia/helper/hx711');
const SCLK = 5;
const DATA = 6;

var sensor = hx711(SCLK, DATA);
sensor.tare();
sensor.setScale(5000);
while(true){
	console.log(sensor.getUnits());
}