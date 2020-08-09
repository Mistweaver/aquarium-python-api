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
volatile int i = 0;                // Dimmer PWM value
const int AC_PIN = 3;               // AC dimmer board data wire pin


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

void readInput() {
    while(Serial.available() > 0) {
        int input = Serial.parseInt();          // parse integer from serial input
        if(input == 250) {
            returnAquariumStatus(); 
        } else if(input === 251) {
            triggerLightning();
        } else {
            analogWrite(AC_PIN, i);
        }
    }
}

void loop() {
    readInput();
}