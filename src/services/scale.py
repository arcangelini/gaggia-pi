#! /usr/bin/python3

import time
import sys
sys.path.insert(0, '/home/pi/gaggia/hx711py/')
print(sys.path)

EMULATE_HX711=False

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
tic = time.perf_counter()

while current_weight < target_weight:
    try:
        current_weight = hx.get_weight( 3 )

        if current_weight < 0.009:
            current_weight = 0.000

        toc = time.perf_counter()
        print( '{0:.2f}'.format( toc - tic ), ',', '{0:.2f}'.format( current_weight ) )

        hx.reset()

        sys.stdout.flush()

    except (KeyboardInterrupt, SystemExit):
        cleanAndExit()

