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
hxA = HX711( 6, 5 )
hxA.set_reading_format( "MSB", "MSB" )
hxA.set_reference_unit( 6943 )
hxA.reset()
hxA.tare()

# Setup scale 2

current_weight = 0
target_weight = int( sys.argv[1] )
tic = time.perf_counter()

print( "Filling to: " + str( target_weight ) )

# Infinite loop till full
while current_weight < target_weight:
    try:
        toc = time.perf_counter()
        current_weight = hxA.get_weight( 3 ) #+ hxB.get_weight( 5 )
        if current_weight < 0.009:
            current_weight = 0.000

        data = float( '{0:.2f}'.format( toc - tic ) ), '|', float( '{0:.2f}'.format( current_weight ) )
        
        print( data )

        sys.stdout.flush()

    except (KeyboardInterrupt, SystemExit):
        cleanAndExit()

print( "Brew complete: ", '{0:.2f}'.format( hxA.get_weight( 5 ) ) )