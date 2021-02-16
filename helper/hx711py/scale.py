#! /usr/bin/python2

import time
import sys
import socketio

EMULATE_HX711=False
client = socketio.Client()
client.connect( 'http://gaggia.local:9000' )
client.emit( 'test', "Connected" )

referenceUnit = 1

if not EMULATE_HX711:
    import RPi.GPIO as GPIO
    from hx711 import HX711
    GPIO.setwarnings( False )

else:
    from emulated_hx711 import HX711

def cleanAndExit():
    print( "Cleaning..." )

    if not EMULATE_HX711:
        GPIO.cleanup()
        
    print("Bye!")
    sys.exit()

hx = HX711( 6, 5 )
hx.set_reading_format( "MSB", "MSB" )

hx.set_reference_unit( 6943 )
hx.reset()
hx.tare()

current_weight = 0
target_weight = int( sys.argv[1] )

print( "Filling to: " + str( target_weight ) )

while current_weight < target_weight:
    try:
        current_weight =  hx.get_weight( 5 )
        print( current_weight )

        hx.reset()

    except (KeyboardInterrupt, SystemExit):
        cleanAndExit()

client.disconnect()
