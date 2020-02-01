# Script runs continuously as daemon on system startup
# Request is made to get the current time of day, then increments the light accordingly to the ToD
import time
from datetime import datetime
from dateutil.parser import *
import requests
import json
from dateutil import tz
import math
import serial


# Sunrise & Sunset API can be found here: 
# https://sunrise-sunset.org/api

api_parameters = {
    # Rio Negro, BRA 0°25'25.9"S 64°39'23.0"W -0.423861, -64.656390 
    #"lat": -0.423861,   # latitude
    #"lng": -64.656390,  # longitude
    # Phoenix
    "lat": 33.4942,   # latitude
    "lng": -111.9261,  # longitude
    # "date": "today",  # this is the default value, but can be used for custom day
    "formatted": 0 # a value of 1 brings back readable form, 0 brings back raw
}

#Linux
#ser = serial.Serial('/dev/ttyACM0', 9600, timeout = 1)
#Windows
ser = serial.Serial('COM3', 9600, timeout = 1)

currentDateTime = datetime.now()
currentDaylightData = {}
mode = "AUTO"
sunrise = ""
sunset = ""
HERE = tz.tzlocal()
UTC = tz.gettz('UTC')
lightOn = False
lightMax = 220
lightMin = 27

def getCurrentTime():
    # print("The time is now " + time.ctime())
    #  "2020-01-10T09:33:43+00:00"
    #'%m/%d/%y %H:%M:%S'
    # '%y-%m-%dT%H:%M:%S'
    print("Current time: ")
    print(datetime.utcnow())
    #formattedDate = datetime.strptime(time.ctime(), '%m/%d/%y %H:%M:%S'  )
    #print("formatted current time: " + formattedDate)
    #time.sleep(60)

def jprint(obj):
    # create a formatted string of the Python JSON object
    text = json.dumps(obj, sort_keys=True, indent=4)
    print(text)

def getTodaysDaylightSettings():
    response = requests.get('https://api.sunrise-sunset.org/json', params=api_parameters)
    # responseStatus = (response.status_code)
    jprint(response.json())
    return response

def writeStatusToDatabase():
    print("Writing state to DB")
    time.sleep(10)

    

def writeAquariumStatusToDatabase():
    print("Writing aquarium status to database")
    # ser.write(bytes(str(5), "ascii"))

def checkLightSettings():
    global lightOn
    #global ser

    print("Checking current time against light settings")
    currentDateTime = parse(datetime.utcnow().replace(tzinfo=HERE).isoformat())
    #print(currentDateTime)
    #print("-----------")
    #print("Sunrise: ") 
    #jprint(currentDaylightData['results']['sunrise'])
    #print("Sunset: ")
    #jprint(currentDaylightData['results']['sunset'])

    sunrise_datetime_object = parse(currentDaylightData['results']['sunrise']).replace(tzinfo=HERE)
    sunset_datetime_object = parse(currentDaylightData['results']['sunset']).replace(tzinfo=HERE)

    #print(sunrise_datetime_object.isoformat())
    #print(sunset_datetime_object.isoformat())

    #
    if(currentDateTime < sunrise_datetime_object):
        print("Time to sunrise: ", round((sunrise_datetime_object - currentDateTime).seconds / 60, 2), " minutes")
    elif(currentDateTime > sunrise_datetime_object and currentDateTime < sunset_datetime_object):
        print("Time to sunset: ", round((sunset_datetime_object - currentDateTime).seconds / 60, 2), " minutes")
    elif(currentDateTime > sunrise_datetime_object and currentDateTime > sunset_datetime_object):
        print("The sun has set")
    else:
        print("IDK what time it is")

    # if light is on
    if(lightOn):
        # if current time is past sunset, turn off lights
        if(currentDateTime > sunrise_datetime_object and currentDateTime > sunset_datetime_object):
            print("The sun has set.  Turning off lights")
            # turn off lights
            lightOn = False
            ser.write(bytes(str(2), "ascii"))
            print("Lights on: ", lightOn)
        
        print("Mapping daylight curve")
        # wave equation = A * sin(B(x + C)) + D
        # A - amplitude
        # B - period
        # C - phase shift (positive to the left)
        # D - vertical shift (in this case equal to the amplitude)
        # if LightMax = 220 and lightMin = 27
        amplitude = (lightMax - lightMin)
        vertical_shift = lightMin
        period_coefficient = 2 * math.pi / (currentDaylightData['results']['day_length'] / 60)   # convert to seconds
        period = 1 / 2

        # numeric representation of curve on 1/26/2020
        # 193 * sin(pi * {x} / 626.1) + 27

        light_intensity = amplitude * math.sin(period_coefficient * period * ((sunset_datetime_object - currentDateTime).seconds / 60)) + vertical_shift
        print("Light intensity: ", light_intensity)

        # write light intensity to controller
        print("Writing to controller: ", int(round(light_intensity, 0)))
        ser.write(bytes(str(int(light_intensity)), "ascii"))

    # if light is off
    elif(not lightOn):
        # if current time is past sunrise, turn on lights
        if(currentDateTime > sunrise_datetime_object and currentDateTime < sunset_datetime_object):
            print("Turning on lights")
            lightOn = True
            ser.write(bytes(str(1), "ascii"))
            print("Light on: ", lightOn)


def run():
    global currentDaylightData
    # get current date and time
    # getCurrentTime()
    # request daylight settings for today
    currentDaylightData = getTodaysDaylightSettings().json()
    # map light curve ?
    # mapLightCurve(currentDaylightData)
    # get current aquarium status

    # execute running loop every 10 seconds
    while True:
        # write current aquarium status to database
        writeAquariumStatusToDatabase()
        # check aquarium mode ?

        # every 30th iteration, update the light status
        checkLightSettings()

            

        # if current day does not match previous day
            # fetch new day data and set new daylight settings

        time.sleep(10)
            



    #getTodaysDaylightSettings()
    #while True:
        #getCurrentTime()
        #writeStatusToDatabase()

if __name__ == "__main__":
    run()