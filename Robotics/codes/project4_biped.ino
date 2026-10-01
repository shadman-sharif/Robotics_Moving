#include <Servo.h>

Servo leftThigh;
Servo leftFoot;
Servo rightThigh;
Servo rightFoot;

void setup() {
  leftThigh.attach(9);
  leftFoot.attach(10);
  rightFoot.attach(5);
  rightThigh.attach(3);
}

void stand() {
  leftThigh.write(90);
  leftFoot.write(90);
  rightThigh.write(90);
  rightFoot.write(90);
}

void loop() {
  stand();
  delay(800);

  leftThigh.write(70);
  rightThigh.write(110);
  delay(400);
  leftFoot.write(60);
  rightFoot.write(120);
  delay(500);

  leftThigh.write(110);
  rightThigh.write(70);
  delay(400);
  leftFoot.write(120);
  rightFoot.write(60);
  delay(500);
}
