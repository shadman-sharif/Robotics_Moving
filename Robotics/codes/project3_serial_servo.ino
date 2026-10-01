#include <Servo.h>

Servo myservo;

void setup() {
  Serial.begin(9600);
  myservo.attach(9);
  Serial.println("Angle likho (0-180):");
}

void loop() {
  if (Serial.available() > 0) {
    int angle = Serial.parseInt();
    if (angle >= 0 && angle <= 180) {
      myservo.write(angle);
      Serial.print("Gelo: ");
      Serial.println(angle);
    }
  }
}
