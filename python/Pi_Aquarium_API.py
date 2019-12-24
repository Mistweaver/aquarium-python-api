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
    print("Get stats")
    ser.write(bytes(str(5), "ascii"))
    return '<p>Pinged controller</p>'
    
@app.route('/lightson', methods=['GET'])
def lightson():
    print("lightson")
    ser.write(bytes(str(1), "ascii"))
    return '<p>Lights now on</p>'

@app.route('/lightsoff', methods=['GET'])
def lightsoff():
    print("lightsoff")
    ser.write(bytes(str(2), "ascii"))
    return '<p>Lights now off</p>'


@app.route('/raiselights', methods=['GET'])
def raiselights():
    print("Sent brighten lamp command")
    ser.write(bytes(str(3), "ascii"))
    return '<p>lights raised</p>'
    
@app.route('/lowerlights', methods=['GET'])
def lowerlights():
    print("Sent dim lamp command")
    ser.write(bytes(str(4), "ascii"))
    return '<p>lights lowered</p>'

#while 1:
    #if(ser.in_waiting > 0):
        #line = ser.readline()
        #print(line)
        #ser.write("T".encode())
    #if(ser.in_waiting > 0):
        #line = ser.readline()
        #print(line)
        #return line
        
app.run()
