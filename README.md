# aquarium-python-api

A simple Python API using Flask to communicate with either the serial port on the local machine or an MQTT broker

# Components

There are two main components:

### Flask API

API that sends serial, HTTP, or MQTT commands from user input

### Circadian Script

Script file that sends serial, HTTP, or MQTT commands depending on the time of day, sunrise, sunset, moonrise, moonset, etc.