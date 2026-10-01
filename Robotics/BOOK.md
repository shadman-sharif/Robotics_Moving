# রোবটের নড়াচড়া — পুরো গাইড

সৃষ্টির উল্লাসে রোবটিক্স, সপ্তম অধ্যায়।  
মূল বইয়ের প্রজেক্ট ১২ এখানে প্রজেক্ট ১। তারপর ১৩=২, ১৪=৩, ১৫=৪, ১৬=৫, ১৭=৬, ১৮=৭।

ছবি এই ফোল্ডারের `images/` এ। ZIP খুলে এই ফাইল মার্কডাউন প্রিভিউতে খুললে ছবি দেখা যাবে। চ্যাটে শুধু টেক্সট দেখালে ছবি আলাদা ফাইল হিসেবে আছে।

## সূচি

1. সারভো কী, ভেতরে কী থাকে
2. প্রজেক্ট ১ — লেজার লাইট (মূল ১২)
3. প্রজেক্ট ২ — রোবটিক আর্ম (মূল ১৩)
4. প্রজেক্ট ৩ — সিরিয়াল মনিটর (মূল ১৪)
5. প্রজেক্ট ৪ — বাইপেডাল (মূল ১৫)
6. প্রজেক্ট ৫ — ডিসি মোটর + 9V (মূল ১৬)
7. প্রজেক্ট ৬ — L298N (মূল ১৭)
8. প্রজেক্ট ৭ — Motor Shield (মূল ১৮)

---

## ১. সারভো কী

আগের অধ্যায় পর্যন্ত ইনপুট-আউটপুট হয়েছে, রোবট নড়েনি। নড়াচড়ার জন্য মোটর।

সারভো অন্য মোটরের চেয়ে সহজে নিয়ন্ত্রণ হয়। নির্দিষ্ট কোণে পাঠানো যায়। বললে “৯০ ডিগ্রিতে যাও”, সেখানে গিয়ে থামে। তাই হাত-পা বানানো যায়।

রোবটিক আর্ম, চাকা (কন্টিনিউয়াস রোটেশন সারভো), হিউম্যানয়েডের জয়েন্ট — সব জায়গায় সারভো লাগে। কন্টিনিউয়াস সারভো থেমে থাকে না, চাকার মতো ঘুরতেই থাকে।

### ভেতরে কী

একটা ছোট ডিসি মোটর, গিয়ারবক্স, আর পটেনশিওমিটার।

পটেনশিওমিটার বলে এখন কোথায় আছে। কন্ট্রোল ইউনিট জানে লক্ষ্য কোথায়। ফিডব্যাক দেখে বাকি ঘূর্ণন হিসাব করে, মোটরকে আরও ঘোরাতে বলে। লক্ষ্যে না পৌঁছানো পর্যন্ত এটা চলে।

### কত ডিগ্রি

SG90 জনপ্রিয়। সাধারণত ০ থেকে ১৮০ ডিগ্রি। এটা অ্যানালগ আউটপুট, তাই সিগন্যাল শুধু PWM পিনে: ৩, ৫, ৬, ৯, ১০, ১১। অন্য পিনে সারভো কাজ করে না।

আরডুইনোকে ডিগ্রি বললে Servo লাইব্রেরি ডিউটি সাইকেল হিসাব করে পালস পাঠায়। নিজে PWM লিখতে হয় না।

### তার

- বাদামি বা কালো = GND
- লাল = VCC, ৫V
- কমলা বা হলুদ = সিগন্যাল

কিছু সারভো ২৫০ mA-এর বেশি টানে। সেগুলোকে Uno-র ৫V থেকে না দিয়ে আলাদা সাপ্লাই দাও। GND অবশ্যই কমন। SG90 সাধারণত বোর্ড থেকেই চলে।

---

## প্রজেক্ট ১ — সারভো দিয়ে বিড়ালের লেজার লাইট

মূল প্রজেক্ট ১২।

যা লাগবে: Arduino Uno, জাম্পার, SG90, খেলনা লেজার।

### সার্কিট

![প্রজেক্ট ১২ সার্কিট ডায়াগ্রাম](images/p12-circuit.png)

ডায়াগ্রামে সবুজ তার পিন ৯, লাল ৫V, কালো GND।

| Arduino | সারভো |
|---|---|
| 5V | লাল |
| GND | কালো / বাদামি |
| ডিজিটাল ৯ | কমলা সিগন্যাল |

### কোড

`codes/project1_servo_sweep.ino`

```cpp
#include <Servo.h>
Servo servo;
int angle = 0;

void setup() {
  servo.attach(9);
}

void loop() {
  for (angle = 0; angle < 180; angle++) {
    servo.write(angle);
    delay(15);
  }
  for (angle = 180; angle > 0; angle--) {
    servo.write(angle);
    delay(15);
  }
}
```

Servo লাইব্রেরি IDE-তে আগে থেকেই থাকে। `attach(9)` মানে সিগন্যাল পিন ৯। `write(angle)` সেই ডিগ্রিতে পাঠায়। `write(0)` মানে ০ ডিগ্রি, `write(50)` মানে ৫০ ডিগ্রি।

for লুপের তিন অংশ: শুরু (`angle = 0`), শর্ত (`angle < 180`), বাড়ানো (`angle++`)। ০ থেকে ১৭৯ পর্যন্ত ১৮০ বার চলে। `delay(15)` না দিলে সারভো ঝাঁকুনি খায়।

দ্বিতীয় লুপ ১৮০ থেকে ১ পর্যন্ত ফেরে। তাই সারভো সামনে-পেছনে ঝাড়ে।

হর্নে একটা পাখা বা কাগজ লাগিয়ে ঘোরা দেখো। লেজার জুড়লে দেয়ালে আলো ছোটে। বিড়াল সেই আলোর পেছনে দৌড়ায়।

অতিরিক্ত: IDE-র Examples → Servo → Sweep এই প্রজেক্টের মতো। Knob উদাহরণে পটেনশিওমিটার দিয়ে কোণ নিয়ন্ত্রণ।

---

## প্রজেক্ট ২ — রোবটিক আর্ম

মূল প্রজেক্ট ১৩।

দুই সারভো মুখোমুখি। একটা ০°, অন্যটা ১০০° রাখলে হাত খোলা। দুটোকে ৫০°-এ আনলে কাছাকাছি আসে, জিনিস ধরে।

গড় = (100 + 0) / 2 = 50। তাই ০-কে ৫০ বাড়াও, ১০০-কে ৫০ কমাও।

### সার্কিট

![প্রজেক্ট ১৩ সার্কিট](images/p13-circuit.png)

দুই সারভোর লাল একসাথে ৫V, কালো একসাথে GND। সিগন্যাল আলাদা PWM পিনে।

| সারভো | পিন |
|---|---|
| বাম servo1 | ডিজিটাল ১০ |
| ডান servo2 | ডিজিটাল ৯ |

### বানানো ছবি

![কার্ডবোর্ডের দুই হাত](images/p13-photo.jpg)

কার্ডবোর্ডের ফালি হট গ্লু দিয়ে হর্নে লাগানো। হাত খোলা অবস্থায় দূরে, বন্ধ করলে কাছাকাছি। ভারী জিনিস তোলে না। বেশি টর্কের সারভো লাগে। বাজারে ২ DOF আর্মও পাওয়া যায়, সেখানেও কোণ বদলে ধরা-ছাড়া হয়।

### কোড

`codes/project2_robotic_arm.ino`

```cpp
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
```

কোণ নিজের হাত দেখে বদলাও। সব সারভো ০ ডিগ্রিতে একদিকে ঘোরে না।

---

## প্রজেক্ট ৩ — সিরিয়াল মনিটর

মূল প্রজেক্ট ১৪।

সার্কিট প্রজেক্ট ১-এর মতো। সিগন্যাল পিন ৯।

![প্রজেক্ট ১৪ সার্কিট](images/p14-circuit.png)

মনিটরে ১০ থেকে ১৭০-এর মধ্যে সংখ্যা লিখে Enter দিলে সারভো সেখানে যায়। আগে ক্যালিব্রেশন: ০, ১৮০, ৯০ লিখে হর্ন সোজা করো।

`codes/project3_serial_servo.ino`

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

বোর্ড রেট ৯৬০০। বাক্সে “No line ending” বা Newline — Enter-এর পর সংখ্যা পড়া না গেলে লাইন এন্ডিং বদলাও।

---

## প্রজেক্ট ৪ — বাইপেডাল

মূল প্রজেক্ট ১৫।

চার সারভো। জোড়ায় জোড়ায়। একটা উরু, একটা পায়ের পাতা। দুই জোড়া মানে দুই পা। কোণ পাল্টালে এক পায়ে ভর দিয়ে অন্য পা সরানো যায়।

আগে সব সারভো ৯০° দিয়ে হর্ন লাগাও। নাহলে পা উল্টো দিকে যায়।

চার সারভো একসাথে Uno-র ৫V টানলে বোর্ড রিসেট হতে পারে। সারভোর VCC আলাদা ৫V থেকে দাও, GND কমন রাখো।

### সার্কিট

![প্রজেক্ট ১৫ সার্কিট](images/p15-circuit.png)

| অংশ | ডায়াগ্রামের তার | পিন |
|---|---|---|
| Left thigh | সবুজ | ৯ |
| Left foot | ধূসর | ১০ |
| Right foot | কমলা | ৫ |
| Right thigh | হলুদ | ৩ |

সব লাল ৫V, সব কালো GND। পিন সব PWM।

### বানানো রোবট

Arduino উপরে, পা নিচে:

![বিল্ড](images/p15-build.jpg)

জোড়া সারভো:

![ফাইনাল ১](images/p15-final.jpg)

![ফাইনাল ২](images/p15-final-2.jpg)

হট গ্লু দিয়ে সারভো জোড়া। সাদা কার্ডবোর্ড পা। কালো আর নীল SG90।

### কোড

`codes/project4_biped.ino`

```cpp
#include <Servo.h>
Servo leftThigh, leftFoot, rightThigh, rightFoot;

void setup() {
  leftThigh.attach(9);
  leftFoot.attach(10);
  rightFoot.attach(5);
  rightThigh.attach(3);
}

void loop() {
  leftThigh.write(90);
  leftFoot.write(90);
  rightThigh.write(90);
  rightFoot.write(90);
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

কোণ ফ্রেম দেখে টিউন করো। এক পা ৭০ হলে অন্য পা ১১০, শরীর কাত হয়।

---

## প্রজেক্ট ৫ — ডিসি মোটর

মূল প্রজেক্ট ১৬। Arduino নেই।

ডিসি মোটরে কারেন্ট দিলে কয়েল চুম্বকের সঙ্গে ধাক্কা খেয়ে ঘোরে। বেশি ভোল্টেজ, বেশি RPM। তার উল্টালে দিক বদলায়।

বাড়ির লাইনের কারেন্ট AC, বারবার দিক বদলায়। ব্যাটারি DC।

### সার্কিট

![৯ ভোল্ট আর মোটর](images/p16-circuit.png)

৯V-এর লাল (+) মোটরের এক প্রান্ত, কালো (−) অন্য প্রান্ত। তার উল্টালে উল্টো ঘোরে।

৩V, ৬V, ৯V দিয়ে গতি তুলনা করো। ছোট গিয়ার মোটরের রেট সাধারণত ৩–৬V। ৯V বেশিক্ষণ দিও না।

---

## প্রজেক্ট ৬ — L298N

মূল প্রজেক্ট ১৭।

H-bridge-এ চার সুইচ, মাঝে মোটর। দেখতে H। পোলারিটি উল্টালে দিক বদলায়। L298N-এ দুই চ্যানেল, দুই মোটর।

| IN1 | IN2 | ফল |
|---|---|---|
| LOW | LOW | থেমে |
| HIGH | LOW | সামনে |
| LOW | HIGH | পেছনে |
| HIGH | HIGH | ব্রেক |

ENA আর ENB-তে PWM (০–২৫৫) দিলে গতি বদলায়। জাম্পার লাগানো থাকলে এনাবল সবসময় হাই, গতি বদলায় না। গতি চাইলে জাম্পার খুলে ENA/ENB Arduino-র PWM-এ দাও।

### সার্কিট

![L298N সার্কিট](images/p17-circuit.png)

ডায়াগ্রামে ব্যাটারি 3.7V 2000mAh, লেবেল E585460-4121 / E4104-L58-1। লাল প্লাস L298N-এর মোটর পাওয়ারে, কালো GND। সেই GND Arduino GND-এর সঙ্গে কমন।

| L298N | Arduino |
|---|---|
| ENA | ৯ |
| IN1 | ৮ |
| IN2 | ৭ |
| IN3 | ৫ |
| IN4 | ৪ |
| ENB | ৩ |
| OUT1 OUT2 | মোটর A |
| OUT3 OUT4 | মোটর B |

মোটরের পাওয়ার ব্যাটারি থেকে। Uno-র ৫V দিয়ে মোটর চালাবে না।

### কোড

`codes/project6_L298N.ino`

```cpp
int enA = 9, in1 = 8, in2 = 7;
int enB = 3, in3 = 5, in4 = 4;

void setup() {
  pinMode(enA, OUTPUT);
  pinMode(enB, OUTPUT);
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
  pinMode(in3, OUTPUT);
  pinMode(in4, OUTPUT);
}

void loop() {
  analogWrite(enA, 200);
  analogWrite(enB, 200);
  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);
  digitalWrite(in3, HIGH);
  digitalWrite(in4, LOW);
  delay(2000);
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH);
  delay(2000);
  digitalWrite(in1, LOW);
  digitalWrite(in2, LOW);
  digitalWrite(in3, LOW);
  digitalWrite(in4, LOW);
  delay(1000);
}
```

এক মোটর উল্টো ঘুরলে OUT তার উল্টে দাও।

গতি বাড়ানোর লুপ:

```cpp
for (int i = 0; i < 256; i++) {
  analogWrite(enA, i);
  analogWrite(enB, i);
  delay(20);
}
```

---

## প্রজেক্ট ৭ — Motor Shield

মূল প্রজেক্ট ১৮।

Adafruit Motor Shield v2.3 Arduino-র উপরে বসে। আলাদা IN জাম্পার লাগে না। লেখা: 2 steppers অথবা 4 DC motors, প্রতি মোটরে 1.2A, মোট 3A।

### সার্কিট

![মোটর শিল্ড](images/p18-circuit.png)

- শিল্ড Uno-র উপরে
- বাম মোটর M2
- ডান মোটর M1
- নিচের পাওয়ার টার্মিনালে 3.7V 2000mAh
- লাল প্লাস, কালো মাইনাস
- ব্যাটারি লেবেল E585460-4121, E4104-L58-1

3.7V-তে অনেক গিয়ার মোটর ধীরে ঘোরে। না ঘুরলে ৬V দাও। শিল্ডের ৫–১২V লেবেলের ভেতরে থাকো।

লাইব্রেরি: Library Manager → Adafruit Motor Shield V2।

`codes/project7_motor_shield.ino`

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

M1 আর M2 উল্টো লাগলে FORWARD আর BACKWARD বদলাও। স্পিড ০–২৫৫।

---

## শেষ

এই সাতে সারভো কোণ, গ্র্যাবার, সিরিয়াল, দুই পা, সরাসরি মোটর, L298N, আর শিল্ড শেষ।

পরের কাজ: পটেনশিওমিটার দিয়ে আর্ম, আল্ট্রাসনিক দিয়ে বাধা এড়ানো, ব্লুটুথ দিয়ে ফোন থেকে চালানো।
