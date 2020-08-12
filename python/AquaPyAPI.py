#!/usr/bin/env python
import serial
import http.server
import socketserver
import flask
from flask import request

app = flask.Flask(__name__)
app.config["DEBUG"] = True
ser = serial.Serial('/dev/ttyACM0', 9600, timeout = 1)
# Windows
#ser = serial.Serial('COM3', 9600, timeout = 1)


    
@app.route('/aquariumvitals', methods=['GET'])
def stats():
    ser.write(bytes(str(250), "ascii"))
    return "<p>Vitals requested</p>"


#@app.route('/login',methods = ['POST', 'GET'])
@app.route('/lights', methods = ['POST'])
def adjustLights():
    newIllumination = request.form['illumination']
    ser.write(bytes(str(newIllumination), "ascii"))
    return "<p>Lights adjusted</p>"
   #if request.method == 'POST':
      #user = request.form['name']
      #return redirect(url_for('dashboard',name = user))
   #else:
      #user = request.args.get('name')
      #return render_template('login.html')

app.run()
