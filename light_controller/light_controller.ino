/*
  Aquarium Light Controller
  Relay uses a AC Dimmer board to control the current.  Timer interrupt sets the level of dimming.
  The controller also has a temperature probe attached, as well as a bluetooth module
  and a series of blue LEDs for moonlights
*/

#include <TimerOne.h>

const int temperaturePin = 1;   // temperature probe input
int temperature;                // temperature reading

char inputString;               // serial input code

// int MAX_PWM = 240;           // old Pulse Width Modulation max (0-255)

const int moonlightPin = 9;
int moonlightState = 0;         // moonlight state.  0 is off, 1 is on
byte moonlightBrightness = 255; // moonlight brightness (0 off to 255 on)
int moonlightStep = 5;          // step for moonlight count

volatile int i=0;               // Variable to use as a counter of dimming steps. It is volatile since it is passed between interrupts
volatile boolean zero_cross=0;  // Flag to indicate we have crossed zero
const int AC_pin = 3;                 // Output to Opto Triac pin
int dim2 = 0;                   // led control
int dim = 128;                  // Dimming level (0-128)  0 = on, 128 = 0ff
int pas = 8;                    // step for count;
int freqStep = 75;              // This is the delay-per-brightness step in microseconds. It allows for 128 steps
                                // If using 60 Hz grid frequency set this to 65

// due to timing problems, 0 cam sometimes make a circuit flicker.  Use slightly above 0 if this occurs

void setup() {
  Serial.begin(9600); // starts serial connection
  pinMode(moonlightPin, OUTPUT);                    // initialize moonlight output
  pinMode(AC_pin, OUTPUT);                          // Set the Triac pin as output
  attachInterrupt(0, zero_cross_detect, RISING);    // Attach an Interupt to Pin 2 (interupt 0) for Zero Cross Detection
  Timer1.initialize(freqStep);                      // Initialize TimerOne library for the freq we need
  Timer1.attachInterrupt(dim_check, freqStep);      // Go to dim_check procedure every 75 uS (50Hz)  or 65 uS (60Hz)
  // Use the TimerOne Library to attach an interrupt
}

void zero_cross_detect() {    
  zero_cross = true;               // set flag for dim_check function that a zero cross has occured
  i=0;                             // stepcounter to 0.... as we start a new cycle
  digitalWrite(AC_pin, LOW);
  // analogWrite(AC_LOAD,i);   // writes analog value (PWMwave) to pin
}                                 

// Turn on the TRIAC at the appropriate time
// We arrive here every 75 (65) uS
// First check if a flag has been set
// Then check if the counter 'i' has reached the dimming level
// if so.... switch on the TRIAC and reset the counter
void dim_check() {                   
  if(zero_cross == true) {              
    if(i>=dim) {                     
      digitalWrite(AC_pin, HIGH);  // turn on light   
      // analogWrite(AC_LOAD,i);   // writes analog value (PWMwave) to pin    
      i=0;  // reset time step counter                         
      zero_cross=false;    // reset zero cross detection flag
    } 
    else {
      i++;  // increment time step counter                     
    }                                
  }    
}             

void loop() {
  // put your main code here, to run repeatedly:

  inputString = Serial.read(); // read the serial input
  Serial.print(inputString);  // debug

  temperature = analogRead(temperaturePin);   // read pin for temperature
  // temp = temp * 0.48828125;   // convert output (mv) to readable celcius
  Serial.write(temperature);  // return temperature reading
  
  switch(inputString) {
    
    // AC relay controls
    case 'b': // brighten lamp array
      if (dim>5) {
        dim = dim - pas;
        if (dim<0) {
          dim=0;
        }
      }
      break;
    case 'd': // dim lamp array
      if (dim<127) {
        dim = dim + pas;
        if (dim>127) {
          dim=128;
        }
      }
      break;
      
    // moonlight controls
    case 'm': // turn on moonlights
      moonlightState = 1;
      break;
    case 'o': // turn off moonlights
      moonlightState = 0;
      break;
    case 'e': // brighten moonlight
      if(moonlightBrightness > 255) {
        moonlightBrightness = moonlightBrightness + moonlightStep;
      }
      break;
    case 'f': // dim moonlight
      if(moonlightBrightness > 0) {
        moonlightBrightness = moonlightBrightness - moonlightStep;
      }
    default:  // do nothing
      break;

    if(moonlightState) {
      analogWrite(moonlightPin, moonlightBrightness);
    }
    
    dim2 = 255 - 2 * dim;
    if (dim2<0) {
      dim2 = 0;
    }

  }

  // old loop code
   /* for(i=240;i>20;i--) {
      analogWrite(AC_LOAD,i);   // writes analog value (PWMwave) to pin
      delay(20);
    }
    
    delay(1000);
    
    for(i=20;i<240;i++) {
      analogWrite(AC_LOAD,i);
      delay(20);
    }*/


}
