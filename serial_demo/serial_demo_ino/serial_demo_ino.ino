char incomingByte = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  /*Serial.println("Working");
  delay(500);
  if(Serial.available() > 0) {
    char input = Serial.read();
    Serial.println(input);
  }*/
  
  if(Serial.available() > 0) {
    int count = Serial.parseInt();
    
    if(count > 0) {
      Serial.print("You have input: ");
      Serial.println(String(count));
    }
  }
}
