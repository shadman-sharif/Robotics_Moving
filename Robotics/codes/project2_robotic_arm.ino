#include <Servo.h>

Servo servo1;
Servo servo2;

void setup() {
  servo1.attach(10);
  servo2.attach(9);
}

void loop() {
  servo1.write(0);
  servo2.write(100);
  delay(2000);

  servo1.write(50);
  servo2.write(50);
  delay(2000);
}
