
void setup() {
  Serial.begin(9600);
}

void loop() {
  if(Serial.available()) {
    int inputByte = Serial.read();
    Serial.println(inputByte);
  }
}
