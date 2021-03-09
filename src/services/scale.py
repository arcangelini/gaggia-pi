#! /usr/bin/python3

import time
import sys
sys.path.insert(0, '/home/pi/gaggia/hx711py/')

import RPi.GPIO as GPIO
from hx711 import HX711
GPIO.setwarnings( False )

def cleanAndExit():
    GPIO.cleanup()
    sys.exit()

# Setup scale 1
hxYellow = HX711( 27, 17 )
hxYellow.set_reading_format( "MSB", "MSB" )
hxYellow.set_reference_unit( 6943 )
hxYellow.reset()
hxYellow.tare()

# Setup scale 2
hxRed = HX711( 23, 24 )
hxRed.set_reading_format( "MSB", "MSB" )
hxRed.set_reference_unit( 6943 )
hxRed.reset()
hxRed.tare()

current_weight = 0
target_weight = int( sys.argv[1] )
adjusted = 2

sys.stdout.write( "Filling to: " + str( target_weight ) )
time.sleep( 3 )

tic = time.perf_counter()

# Infinite loop till full
while current_weight < target_weight - adjusted:
    try:
        toc = time.perf_counter()
        current_weight = hxYellow.get_weight( 3 ) + hxRed.get_weight( 5 )
        
        if current_weight < 0.02:
            current_weight = 0.00
        elif current_weight > 60:
            current_weight = hxYellow.get_weight( 3 ) + hxRed.get_weight( 5 )

        current_time = str( '{0:.2f}'.format( toc - tic ) )
        weight = str( '{0:.2f}'.format( current_weight ) )
        
        sys.stdout.write( current_time + '|' + weight )
        time.sleep(1)


    except (KeyboardInterrupt, SystemExit):
        cleanAndExit()

sys.stdout.write( "Brew complete: " + weight )
