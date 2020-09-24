#!/usr/bin/env python
import flask
import serial
from flask import request
import serial.tools.list_ports

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
if ser.isOpen() == False:
    ser.open()


@app.route('/aquariumvitals', methods=['GET'])
def stats():
    ser.write(bytes(str(250), "ascii"))
    return "<p>Good</p>"


# @app.route('/login',methods = ['POST', 'GET'])
@app.route('/lights', methods=['POST'])
def adjustLights():
    new_illumination = request.form['illumination']
    ser.write(bytes(str(new_illumination), "ascii"))
    return "<p>Good</p>"


# if request.method == 'POST':
# user = request.form['name']
# return redirect(url_for('dashboard',name = user))
# else:
# user = request.args.get('name')
# return render_template('login.html')

app.run()
