#!/usr/bin/env python
from random import random
import flask
from flask import request
import serial.tools.list_ports  # pyserial


app = flask.Flask(__name__)
app.config["DEBUG"] = True

# ser = serial.Serial('/dev/ttyACM0', 9600, timeout = 1)
# Windows
# ser = serial.Serial('COM3', 9600, timeout=1)

# Get the COM port
Ports = serial.tools.list_ports.comports()

if len(Ports) == 0:
    print("[ERROR] No COM ports found!")
    exit()

TargetPort = None
for Port in Ports:
    StringPort = str(Port)
    print("[INFO] Port: {}".format(StringPort))
    if "COM3" in StringPort:
        TargetPort = StringPort.split(" ")[0]
        print(TargetPort)
        print("[INFO] Use {}...".format(TargetPort))
    elif "/dev/ttyACM0" in StringPort:
        TargetPort = StringPort.split(" ")[0]
        print(TargetPort)
        print("[INFO] Use {}...".format(TargetPort))
if TargetPort is None:
    print("[ERROR] No target COM port found!")
    exit()

# Open the COM port
ser = serial.Serial(TargetPort, 9600, timeout=5)
if not ser.isOpen():
    ser.open()


@app.route('/', methods=['GET'])
def home():
    return '<h1>Aquarium Monitor v0.1</h1>'


@app.route('/http/lights', methods=['POST'])
def change():
    new_illumination = request.form['illumination']
    ser.write(bytes(str(new_illumination), "ascii"))
    return "<p>Good</p>"


def run():
    print("API on")


if __name__ == '__main__':
    run()
