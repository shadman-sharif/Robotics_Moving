#include <Servo.h>
Servo servo;
int angle = 0; // সারভো ঘোরার কোণ ডিগ্রি এককে

void setup() {
  servo.attach(9);
}

void loop() {
  // 0 থেকে 180 ডিগ্রি কোণে যাবে
  for(angle = 0; angle < 180; angle++) {
    servo.write(angle);
    delay(15);
  }
  // আবার 180 থেকে 0 ডিগ্রি কোণে যাবে
  for(angle = 180; angle > 0; angle--) {
    servo.write(angle);
    delay(15);
  }
}
