#!/usr/bin/env python
import serial
from time import sleep
ser = serial.Serial('/dev/ttyACM2', 9600, timeout = 1)


#while 1:
    #if(ser.in_waiting > 0):
        #line = ser.readline()
        #print(line)
        #command = "test".encode('ascii')
        #ser.write(command)
        #ser.flushInput()
count = 0
while True:
    print(count)
    #ser.write(bytes(count))
    ser.write(bytes(str(count), "ascii"))
    count = (count + 1 ) % 255
    print("sent", count)
    sleep(2)
    if(count > 3):
        count = 0
        
    
    