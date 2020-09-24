

#include <TimerOne.h>               // Used for timer interceipt
#include <OneWire.h>                // Temperature probe
#include <DallasTemperature.h>      // Temperature probe
#include <RBDdimmer.h>


#define USE_SERIAL Serial
#define outputPin 12 
#define zerocross 5                 // for boards with CHANGEBLE input pins
#define ONE_WIRE_BUS 6              // Temperature Probe data wire pin

/****** Intialize Temperature and Dimmer Variables ******/
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);
dimmerLamp dimmer(outputPin); //initialase port for dimmer for MEGA, Leonardo, UNO, Arduino M0, Arduino Zero
// dimmerLamp dimmer(outputPin, zerocross); //initialase port for dimmer for ESP8266, ESP32, Arduino due boards

/****** Lamp Variables ******/
volatile int i = 0;                // Dimmer PWM value
char mode = 'A';
const int AC_PIN = 2;               // AC dimmer board data wire pin
const int LAMP_MAX = 240;           // Max lamp brightness
const int LAMP_MIN = 0;            // min lamp brightness

// modes for lighting
const char manualMode = 'M';
const char lightningMode = 'L';
const char autoMode = 'A';

int outVal = 0;

void setup() {
  USE_SERIAL.begin(9600);
  dimmer.begin(NORMAL_MODE, ON); //dimmer initialisation: name.begin(MODE, STATE)
  sensors.begin();                // Start temperature sensors
  // pinMode(AC_PIN, OUTPUT);        // AC dimmer board pin connection
}


void returnAquariumStatus() {
    sensors.requestTemperatures();
    float celciusTemperature = sensors.getTempCByIndex(0);
    Serial.print("#T");
    Serial.print(celciusTemperature);\
    Serial.print("#PWM");
    Serial.println(i);
}

void readInput() {
  if(Serial.available() > 0) {                // execute code if serial input present
        int input = Serial.parseInt();          // parse integer from serial input
        Serial.println(String(input)) ;       // Debug to check inputs

        if(input == 250) {
            Serial.println("Returning aquarium status");        // Debug to check inputs
            returnAquariumStatus(); 
        } else if(input == 251) {
            Serial.println("Setting Lightning Mode");        // Debug to check inputs
        } else if(input < 250 && input >=0) {
            Serial.println("Setting Light Level");        // Debug to check inputs
            i = input;
            analogWrite(AC_PIN, i);
        } else {
           // do nothing
           Serial.println("No option found");        // Debug to check inputs
        }
    }
}



void loop() {
  readInput();
  outVal = map(i, LAMP_MIN, LAMP_MAX, 100, 0); // analogRead(analog_pin), min_analog, max_analog, 100%, 0%);
  USE_SERIAL.print("Light Intensity:"); 
  USE_SERIAL.print(i);
  USE_SERIAL.print(" : ");     
  USE_SERIAL.print(outVal); 
  USE_SERIAL.println("%");   
  dimmer.setPower(outVal); // name.setPower(0%-100%)
}
