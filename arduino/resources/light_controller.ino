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
                                    
volatile char MODE = "AUTO";         // aquarium lamp mode

// AUTO - auto mode just continually runs the lamp at its current setting
// STORM - lightning mode creates a randomly generated flash of lightning 
// NIGHTSTORM - lightning mode, but between flashes system is dark


/****** Temperature Variables ******/
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

/****** Input Variables *********/
volatile char input;
boolean newCommand = false;

void setup() {
    Serial.begin(9600);             // begin serial connection
    sensors.begin();                // Start temperature sensors
    pinMode(AC_PIN, OUTPUT);        // AC dimmer board pin connection
}

// sends the aquarium status back to the computer via serial
void returnAquariumStatus() {
    sensors.requestTemperatures();
    float celciusTemperature = sensors.getTempCByIndex(0);
    Serial.print("#T");
    Serial.print(celciusTemperature);
    Serial.print("#L");
    Serial.print(lampState);
    Serial.print("#PWM");
    Serial.println(i);
    Serial.print("#MODE");
    Serial.println(MODE);
}

// reads a serial input command
void receiveCommand() {
    static boolean readingCommand = false;      // checks if command is being processed from serial input
    static byte commandIndex = 0;
    char commandStartMarker = "<";
    char commandEndMarker = ">";
    char dataStream;

    while(Serial.available() > 0 && newCommand == false) {      // execute code if serial input present
        dataStream = Serial.read();

        if(readingCommand == true) {
            if(dataStream != commandEndMarker) {
                input[commandIndex] = dataStream;
                dataStream++;
            } else {
                input[commandIndex] = '/0';                     // terminate feed
                readingCommand = false;
                commandIndex = 0;
                newCommand = true;
            }
        } else if(dataStream == commandStartMarker) {
            readingCommand = true;
        }
        
    }
}

void processCommand() {
    if(newCommand == true) {
        Serial.print("Received command ");
        Serial.println(input);
        newCommand = false;

        if(newCommand == "LIGHTS_ON") {

        } else if(newCommand == "LIGHTS_OFF") {

        } else if(newCommand == "LIGHT_LEVEL") {

        } else if(newCommand == "STATUS") {

        } else {
            
        }
    }

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
            returnAquariumStatus();
            break;
        default:
            Serial.println("Command not found");
            break;
    }
}

void loop() {
    receiveCommand();
    processCommand():
    
    // write PWM value to ac dimmer pin
    if(lampState == 1) {
        analogWrite(AC_PIN, i);
    }
}
