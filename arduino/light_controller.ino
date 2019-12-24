/*
    Aquarium Light Controller
    Board: Krida PWM1ChKrida PWM AC Light Dimmer Module 50Hz 60Hz For Arduino and Raspberry LED Smart Home
    Temperature Probe: DS18B20

*/

#include <TimerOne.h>               // Used for timer interceipt
#include <OneWire.h>                // Temperature probe
#include <DallasTemperature.h>      // Temperature probe


#define ONE_WIRE_BUS 5              // Temperature Probe data wire pin

/****** Lamp Variables ******/
int lampState = 0;                  // lamp starts off (0 = OFF, 1 = ON)
volatile int i = 40;                // Dimmer PWM value
const int AC_PIN = 3;               // AC dimmer board data wire pin
const int LAMP_MAX = 240;           // Max lamp brightness
const int LAMP_MIN = 40;            // min lamp brightness

/****** Temperature Variables ******/
OneWire OneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

void setup() {
    Serial.begin(9600);             // begin serial connection
    sensors.begin();                // Start temperature sensors
    pinMode(AC_PIN, OUTPUT);        // AC dimmer board pin connection
}

void returnAquariumStatus() {
    sensors.requestTemperatures();
    float celciusTemperature = sensors.getTempCByIndex(0);
    Serial.print("#T");
    Serial.print(Celcius);
    Serial.print("#L");
    Serial.print(lampState);
    Serial.print("#PWM");
    Serial.println(i);
}

void loop() {
    if(Serial.available() > 0) {                // execute code if serial input present
        int input = Serial.parseInt();          // parse integer from serial input
        // Serial.println(String(input))        // Debug to check inputs

        switch(input) {
            // AC relay controls
            case 1: // turn on lamp
                Serial.println("Turning lamp on");
                lampState = 1;
                break;
            case 2: // turn off lamp
                Serial.println("Turning lamp off");
                lampState = 0;
                break;
            case 3: // brighten lamp array
                // Serial.println("Brightening lamp");      // Debug
                i = i + 5;
                if(i > LAMP_MAX) {  i = LAMP_MAX;   }
                break;
            case 4: // dim lamp array
                // Serial.println("Dimming lamp");
                i = i - 5;
                if(i < LAMP_MIN) {  i = LAMP_MIN;   }
                break;
            case 5: // return aquarium system state
                // Serial.println("Returning squarium state");
                break;
            default:
                Serial.println("Command not found");
                break;
        }
    }

    // write PWM value to ac dimmer pin
    if(lampState) {
        analogWrite(AC_PIN, i);
    }
}