# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.

# import time
import datetime
import json
import math
import sys
import time
import requests

import yaml
import serial as serial
from dateutil.parser import parse
from dateutil import tz
from os import path

if sys.platform.startswith('linux'):
    # Linux OS
    ser = serial.Serial('/dev/ttyACM0', 9600, timeout=1)
elif sys.platform.startswith('win32'):
    # Windows
    ser = serial.serial('COM3', 9600, timeout=1)

currentDateTime = datetime.datetime.now()
currentDaylightData = {}
HERE = tz.tzlocal()
UTC = tz.gettz('UTC')

lightMin = 0
lightMax = 100

config_path = path.join(path.dirname(__file__), 'config.yaml')
with open(config_path) as file:
    # The FullLoader parameter handles the conversion from YAML
    # scalar values to Python the dictionary format
    config = yaml.load(file, Loader=yaml.FullLoader)
    # print(location_list)


# create a formatted string of the Python JSON object
def json_print(obj):
    text = json.dumps(obj, sort_keys=True, indent=4)
    print(text)


# format for API query
# location_parameters = {
#   "lat": 33.4942,  # latitude
#   "lng":,  # longitude
#   "date": "today",  # this is the default value, but can be used for custom day
#   "formatted": 0  # a value of 1 brings back readable form, 0 brings back raw
# }

# build the location query with the above format for the sunrise-sunset API
def build_location_query():
    query = {
        'lat': config.get('locations').get('phoenix').get('latitude'),
        'lng': config.get('locations').get('phoenix').get('longitude'),
        'formatted': 0
    }
    return query


# get sunrise and sunset data from the web
def get_today_sunrise_sunset():
    global currentDaylightData

    location_parameters = build_location_query()
    response = requests.get('https://api.sunrise-sunset.org/json', params=location_parameters)
    if 200 <= response.status_code < 300:
        # responseStatus = (response.status_code)
        print("Data for " + str(currentDateTime.date()))
        # json_print(response.json())

        sunrise = parse(response.json()['results']['sunrise']).replace(tzinfo=HERE)
        sunset = parse(response.json()['results']['sunset']).replace(tzinfo=HERE)
        print("Today's sunrise is at " + str(sunrise.isoformat()))
        print("Today's sunset is at " + str(sunset.isoformat()))

        currentDaylightData = response.json()

    else:
        print("ERROR: could not access sunrise-sunset API")
        print("Retrying in 60 seconds...")
        time.sleep(60)


def update_lights():
    # global lightOn
    global currentDaylightData
    global currentDateTime
    # request daylight settings for today
    currentDateTime = parse(datetime.datetime.utcnow().replace(tzinfo=HERE).isoformat())

    sunrise_datetime_object = parse(currentDaylightData['results']['sunrise']).replace(tzinfo=HERE)
    sunset_datetime_object = parse(currentDaylightData['results']['sunset']).replace(tzinfo=HERE)

    # if the day has changed, query the daylight API again
    if sunset_datetime_object.date() < datetime.datetime.today().date():
        currentDaylightData = get_today_sunrise_sunset().json()
    # execute loop as normal
    else:
        #
        if currentDateTime < sunrise_datetime_object:
            print("Time to sunrise: ", round((sunrise_datetime_object - currentDateTime).seconds / 60, 2), " minutes")
        elif sunrise_datetime_object < currentDateTime < sunset_datetime_object:
            print("Time to sunset: ", round((sunset_datetime_object - currentDateTime).seconds / 60, 2), " minutes")
            # print("Mapping daylight curve")
            # wave equation = A * sin(B(x + C)) + D
            # A - amplitude
            # B - period
            # C - phase shift (positive to the left)
            # D - vertical shift (in this case equal to the amplitude)
            # if LightMax = 220 and lightMin = 27
            amplitude = (lightMax - lightMin)
            vertical_shift = lightMin
            period_coefficient = 2 * math.pi / (
                    currentDaylightData['results']['day_length'] / 60)  # convert to seconds
            period = 1 / 2

            # numeric representation of curve on 1/26/2020
            # 193 * sin(pi * {x} / 626.1) + 27

            light_intensity = amplitude * math.sin(period_coefficient * period * (
                    (sunset_datetime_object - currentDateTime).seconds / 60)) + vertical_shift
            # print("Light intensity: ", light_intensity)

            # write light intensity to controller
            # print("Writing to controller: ", int(round(light_intensity, 0)))
            ser.write(bytes(str(int(light_intensity)), "ascii"))
        elif currentDateTime > sunrise_datetime_object and currentDateTime > sunset_datetime_object:
            print("The sun has set")
        else:
            print("WARN: unknown state")


def run():
    get_today_sunrise_sunset()
    # execute running loop every minute
    while True:
        update_lights()
        time.sleep(60)


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    print("Hello Friend")
    print("Starting Aquarium Circadian Rhythm")
    run()
