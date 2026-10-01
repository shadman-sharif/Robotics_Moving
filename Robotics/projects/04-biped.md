# প্রজেক্ট ৪ — বাইপেডাল রোবট (দুই পা)

মূল বইয়ের প্রজেক্ট ১৫।

## ধারণা

চারটা সারভো দিয়ে দুই পা। প্রতি পায়ে দুটো জয়েন্ট:

- উরু (thigh)
- পায়ের পাতা (foot)

কোণ পাল্টালে রোবট এক পা তুলে আরেক পায়ে ভর দেয়। এটাই হাঁটার শুরু।

## যা লাগবে

- Arduino Uno
- 4টা SG90
- ব্রেডবোর্ড
- কার্ডবোর্ড / হট গ্লু ফ্রেম
- জাম্পার

চার সারভো একসাথে Uno-র 5V থেকে টানলে বোর্ড রিসেট হতে পারে। সম্ভব হলে সারভোর VCC আলাদা 5V থেকে দাও, GND কমন রাখো।

## সার্কিট

![প্রজেক্ট ১৫ সার্কিট](../images/p15-circuit.png)

ডায়াগ্রামের লেবেল অনুযায়ী:

| অংশ | সিগন্যাল তারের রং (ডায়াগ্রাম) | পিন |
|---|---|---|
| Left thigh | সবুজ | 9 |
| Left foot | ধূসর | 10 |
| Right foot | কমলা | 5 |
| Right thigh | হলুদ | 3 |

সব সারভোর লাল 5V, কালো GND (ব্রেডবোর্ডের রেল দিয়ে)।

পিন সব PWM: 3, 5, 9, 10।

## বানানো ছবি

Arduino উপরে, দুই পা নিচে:

![বিল্ড](../images/p15-build.jpg)

জোড়া সারভোর ক্লোজআপ:

![ফাইনাল ১](../images/p15-final.jpg)

![ফাইনাল ২](../images/p15-final-2.jpg)

আগে সব সারভো 90 ডিগ্রিতে রেখে হর্ন লাগাও। নাহলে হাঁটার সময় পা উল্টো দিকে যাবে।

## কোড

ফাইল: `codes/project4_biped.ino`

```cpp
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
```

কোণগুলো নিজের ফ্রেম দেখে টিউন করো। এক পাশে 70 হলে অন্য পাশে 110 — এভাবে শরীর কাত হয়।
