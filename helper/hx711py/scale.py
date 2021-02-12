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

hx = HX711(5, 6)
hx.set_reading_format("MSB", "MSB")

hx.set_reference_unit(6943)
hx.reset()
hx.tare()

print("Scale starting")

while True:
    try:
        val = hx.get_weight(5)
        print( '{:.1f}'.format(val + 0) )

        hx.reset()

    except (KeyboardInterrupt, SystemExit):
        cleanAndExit()
