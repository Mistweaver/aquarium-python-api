#!/usr/bin/env python
import serial
from time import sleep
ser = serial.Serial('/dev/ttyACM2', 9600, timeout = 1)

        
while True:
    print("Sent brighten lamp command")
    ser.write(bytes(str(1), "ascii"))
    sleep(2)
    print("Get stats")
    ser.write(bytes(str(3), "ascii"))
    sleep(2)
    #print("Sent dim lamp command")
    #ser.write(bytes(str(2), "ascii"))
    #sleep(2)
    #print("Get stats")
    #ser.write(bytes(str(3), "ascii"))
    #sleep(2)
        
    
    
