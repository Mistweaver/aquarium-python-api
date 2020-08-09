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
OneWire oneWire(ONE_WIRE_BUS);
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
    Serial.print(celciusTemperature);
    Serial.print("#L");
    Serial.print(lampState);
    Serial.print("#PWM");
    Serial.println(i);
}

void triggerLightning() {
    // add yield somewhere in here if the loop is longer
    // than 100ms
    // yield();
    int flashCount = random (3, 15);        // Min. and max. number of flashes each loop
    int flashBrightnessMin =  40;           // flash min. brightness (40-225)
    int flashBrightnessMax =  225;          // flash max. brightness (40-225)

    int flashDurationMin = 1;               // Min. duration of each seperate flash
    int flashDurationMax = 50;              // Max. duration of each seperate flash

    int nextFlashDelayMin = 1;              // Min, delay between each flash and the next
    int nextFlashDelayMax = 150;            // Max, delay between each flash and the next

    int thunderDelay = random (500, 3000);  // Min. and max. delay between flashing and playing sound
    int thunderFile = random (1, 17);       // There are 17 soundfiles: 0001.mp3 ... 0017.mp3
    int loopDelay = random (5000, 30000);   // Min. and max. delay between each loop

    Serial.println();
    Serial.print(F("Flashing, count: "));
    Serial.println( flashCount );

    for (int flash = 0 ; flash <= flashCount; flash += 1) { // Flashing LED strip in a loop, random count

        analogWrite(AC_PIN, random (flashBrightnessMin, flashBrightnessMax)); // Turn LED strip on, random brightness
        delay(random(flashDurationMin, flashDurationMax)); // Keep it tured on, random duration

        analogWrite(AC_PIN, i); // Turn the LED strip off
        delay(random(nextFlashDelayMin, nextFlashDelayMax)); // Random delay before next flash
    }

    Serial.print(F("Pausing before next loop, milliseconds: "));
    Serial.println(loopDelay);
    delay(loopDelay);
}

void loop() {
    if(Serial.available() > 0) {                // execute code if serial input present
        int input = Serial.parseInt();          // parse integer from serial input
        Serial.println(String(input))        // Debug to check inputs

        if(input == 250) {
            returnAquariumStatus(); 
        } else if(input === 251) {
            triggerLightning();
        } else {
            analogWrite(AC_PIN, i);
        }
        /*switch(input) {
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
        }*/
    }

    // write PWM value to ac dimmer pin
    // if(lampState == 1) {
        analogWrite(AC_PIN, i);
    // }
}