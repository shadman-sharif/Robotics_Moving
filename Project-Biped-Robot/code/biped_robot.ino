#include <Servo.h>

Servo rightfoot;
Servo rightthigh;
Servo leftfoot;
Servo leftthigh;

int pos;

void setup() {
  rightfoot.attach(3);
  rightthigh.attach(5);
  leftfoot.attach(9);
  leftthigh.attach(6);
}

void loop() {
  int pos = 120;

  rightfoot.write(90);
  rightthigh.write(90);
  leftfoot.write(90);
  leftthigh.write(90);
  delay(500);

  rightfoot.write(120);
  rightthigh.write(65);
  leftfoot.write(90);
  leftthigh.write(90);
  delay(300);

  rightfoot.write(90);
  rightthigh.write(90);
  leftfoot.write(120);
  leftthigh.write(65);
  delay(300);

  // Continue the walking sequence here.
}
