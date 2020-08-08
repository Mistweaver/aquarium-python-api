#!/usr/bin/env python
import serial
import http.server
import socketserver
import flask

import TestFunction

app = flask.Flask(__name__)
app.config["DEBUG"] = True

state = 0

@app.route('/loopfunction', methods=['GET'])
def home():
    TestFunction.do_something()
    return "Beginning loop"

@app.route('/increase', methods=['GET'])
def increase():
    state += 1
    return "Increasing state by 1"

@app.route('/decrease', methods=['GET'])
def decrease():
    state -= 1
    return "Decreasing state by 1"

@app.route('/getstate', methods=['GET'])
def getState():
    return str(state)

app.run()
