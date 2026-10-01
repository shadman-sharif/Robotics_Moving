# প্রজেক্ট ৩ (মূল বইয়ের প্রজেক্ট ১৪): সিরিয়াল মনিটর দিয়ে সারভো নিয়ন্ত্রণ

বর্তমান প্রজেক্টে আমরা সিরিয়াল মনিটর থেকে কমান্ড দিয়ে সারভোকে বিভিন্ন ডিগ্রি কোণে ঘুরতে বলব।

## যা লাগবে
সারভো মোটর, জাম্পার তার।

## যেভাবে করব
১. প্রথমে চিত্র ৮৮-এর মতো সার্কিট সেটআপ করে ফেলি।

**চিত্র ৮৮: প্রজেক্ট ১৪-এর সার্কিট ডায়াগ্রাম**

| আরডুইনোর 5V          | সারভো মোটরের VCC       |
| আরডুইনোর GND         | সারভো মোটরের GND       |
| আরডুইনোর ডিজিটাল 9   | সারভো মোটরের কন্ট্রোল পিন |

২. এবারে নিচের কোড আপলোড করি!

```cpp
#include <Servo.h>
Servo myservo;
int pos = 0;

void setup() {
  Serial.begin(9600);
  while (!Serial);
  delay(1000);
  myservo.attach(9);
  Serial.println("calibrating Servo...");
  for(pos = 0; pos <= 180; pos += 1) {
    // calibration steps if needed
  }
  myservo.write(0);
  delay(1000);
  myservo.write(180);
  delay(1000);
  myservo.write(90);
  delay(1000);
  Serial.println("servo calibrated");
  Serial.println("input online, write command to perform action");
}

void loop() {
  if (Serial.available()) {
    // read angle from serial and write to servo
    int angle = Serial.parseInt();
    if (angle >= 0 && angle <= 180) {
      myservo.write(angle);
    }
  }
}
```

**নোট:** 10-170 ডিগ্রির মধ্যে তুমি সিরিয়াল মনিটর থেকে একটি কোণের মান সাবমিট করতে পারবে। তখন সারভো নির্দিষ্ট দিকে ঘুরবে।

সারভোকে 50 ডিগ্রি কোণে ঘুরতে বললে সে ক্যালিব্রেশন করে সেই পজিশনে যায়।
