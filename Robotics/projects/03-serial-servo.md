# প্রজেক্ট ৩ — সিরিয়াল মনিটর দিয়ে সারভো

মূল বইয়ের প্রজেক্ট ১৪।

## ধারণা

কম্পিউটারের সিরিয়াল মনিটরে সংখ্যা লিখে সারভোকে সেই কোণে পাঠানো।

## সার্কিট

প্রজেক্ট ১-এর মতোই। সিগন্যাল পিন 9।

![প্রজেক্ট ১৪ সার্কিট](../images/p14-circuit.png)

| Arduino | সারভো |
|---|---|
| 5V | লাল |
| GND | কালো |
| ডিজিটাল 9 | সিগন্যাল |

## কোড

ফাইল: `codes/project3_serial_servo.ino`

```cpp
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
```

বোর্ড রেট 9600 রাখো। মনিটরে 90 লিখে Enter দিলে সারভো 90 ডিগ্রিতে যায়। 0–180-এর বাইরে মান উপেক্ষা হয়।

আগে একবার 0, 90, 180-এ ক্যালিব্রেট করে নাও, যাতে হর্ন সোজা থাকে।
