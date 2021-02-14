#! /usr/bin/python2

import time
import sys

EMULATE_HX711=False

referenceUnit = 1

if not EMULATE_HX711:
    import RPi.GPIO as GPIO
    from hx711 import HX711
else:
    from emulated_hx711 import HX711

def cleanAndExit():
    print("Cleaning...")

    if not EMULATE_HX711:
        GPIO.cleanup()
        
    print("Bye!")
    sys.exit()

hx = HX711(6,5)
hx.set_reading_format("MSB", "MSB")

hx.set_reference_unit(6943)
hx.reset()
hx.tare()

val = 0
targetWeight = int( sys.argv[1] )

print( "Filling to: " + str( targetWeight ) )

while val < targetWeight:
    try:
        val =  hx.get_weight(5)
        print(val)

        hx.reset()

    except (KeyboardInterrupt, SystemExit):
        cleanAndExit()

