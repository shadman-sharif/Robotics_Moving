#include <Servo.h>

Servo myservo;
int pos = 0;

void setup() {
  Serial.begin(9600);

  myservo.attach(9);

  Serial.println("calibrating servo...");

  myservo.write(0);
  delay(1000);

  myservo.write(180);
  delay(1000);

  myservo.write(90);
  delay(1000);

  Serial.println("servo calibrated");
  Serial.println("----------------");
  Serial.println("Command input online, write command to perform action");
  Serial.println("----------------");
}

void loop() {
  if (Serial.available()) {
    int state = Serial.parseInt();

    if (state < 10) {
      Serial.print(">");
      Serial.println(state);
      Serial.println("cannot execute command, too low number");
    }

    if (state >= 10 && state < 170) {
      Serial.print(">");
      Serial.println(state);
      Serial.print("turning servo to ");
      Serial.print(state);
      Serial.println(" degrees");
      myservo.write(state);
    }
  }
}
