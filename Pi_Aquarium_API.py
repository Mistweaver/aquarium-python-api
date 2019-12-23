#!/usr/bin/env python
import serial
import http.server
import socketserver
import flask

app = flask.Flask(__name__)
app.config["DEBUG"] = True
ser = serial.Serial('/dev/ttyACM0', 9600, timeout = 1)

@app.route('/', methods=['GET'])
def home():
    return '<h1>Aquarium Monitor v0.1</h1>'
    
@app.route('/getaquariumvitals', methods=['GET'])
def stats():
    if(ser.in_waiting > 0):
        line = ser.readline()
        print(line)
        return line
def raiselights():
    return '<p>lights raised</p>'
def lowerlights():
    return '<p>lights lowered</p>'

#while 1:
    #if(ser.in_waiting > 0):
        #line = ser.readline()
        #print(line)
        #ser.write("T".encode())
        
app.run()
