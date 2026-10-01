# প্রজেক্ট ৭ — Adafruit Motor Shield দিয়ে দুই মোটর

মূল বইয়ের প্রজেক্ট ১৮।

## ধারণা

Motor Shield Arduino-র উপরে বসে। আলাদা IN পিন জাম্পার লাগে না। মোটর M1 আর M2 স্ক্রু টার্মিনালে যায়। পাওয়ার আলাদা ব্যাটারি থেকে।

ডায়াগ্রাম: Adafruit Motor Shield v2.3। লেখা আছে 2 steppers অথবা 4 DC motors, প্রতি মোটরে 1.2A, মোট 3A।

## সার্কিট

![প্রজেক্ট ১৮ সার্কিট](../images/p18-circuit.png)

- শিল্ড Arduino-র উপরে বসাও
- বাম মোটর M2 টার্মিনালে (হলুদ-সবুজ)
- ডান মোটর M1 টার্মিনালে
- নিচের পাওয়ার টার্মিনালে 3.7V 2000mAh ব্যাটারি
  - লাল = প্লাস
  - কালো = মাইনাস
- ব্যাটারি লেবেল: E585460-4121, E4104-L58-1, 2000mAh 3.7V

3.7V একটা সেলে অনেক গিয়ার মোটর ধীরে ঘোরে। না ঘুরলে 6V প্যাক ব্যবহার করো, শিল্ডের 5–12V লেবেলের ভেতরে থাকো।

## লাইব্রেরি

Arduino IDE → Library Manager → **Adafruit Motor Shield V2**।

পুরনো v1 শিল্ড হলে `AFMotor` লাইব্রেরি। ডায়াগ্রামে v2.3 লেখা, তাই নিচের কোড v2।

## কোড

ফাইল: `codes/project7_motor_shield.ino`

```cpp
#include <Adafruit_MotorShield.h>

Adafruit_MotorShield AFMS = Adafruit_MotorShield();
Adafruit_DCMotor *motor1 = AFMS.getMotor(1);
Adafruit_DCMotor *motor2 = AFMS.getMotor(2);

void setup() {
  AFMS.begin();
  motor1->setSpeed(200);
  motor2->setSpeed(200);
}

void loop() {
  motor1->run(FORWARD);
  motor2->run(FORWARD);
  delay(2000);

  motor1->run(BACKWARD);
  motor2->run(BACKWARD);
  delay(2000);

  motor1->run(RELEASE);
  motor2->run(RELEASE);
  delay(1000);
}
```

M1 আর M2 উল্টো লাগলে `FORWARD` / `BACKWARD` বদলাও। স্পিড 0–255।
