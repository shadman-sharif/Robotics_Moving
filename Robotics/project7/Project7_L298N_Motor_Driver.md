# প্রজেক্ট ৭: L298N মোটর ড্রাইভার দিয়ে দুই মোটর নিয়ন্ত্রণ

## উপকরণ
L298N মোটর ড্রাইভার, আরডুইনো, জাম্পার তার, ২টি গিয়ার ডিসি মোটর, 12V অ্যাডাপ্টার, স্ক্রু ড্রাইভার।

## কানেকশন
| মোটর ড্রাইভারের IN1  | আরডুইনোর ডিজিটাল 8 |
| মোটর ড্রাইভারের IN2  | আরডুইনোর ডিজিটাল 7 |
| মোটর ড্রাইভারের IN3  | আরডুইনোর ডিজিটাল 5 |
| মোটর ড্রাইভারের IN4  | আরডুইনোর ডিজিটাল 4 |
| মোটর ড্রাইভারের ENA  | আরডুইনোর ডিজিটাল 9 |
| মোটর ড্রাইভারের ENB  | আরডুইনোর ডিজিটাল 3 |
| OUT1 ও OUT2          | প্রথম মোটরের দুই তার |
| OUT3 ও OUT4          | দ্বিতীয় মোটরের দুই তার |
| VS                   | 12V অ্যাডাপ্টারের ধনাত্মক |
| GND                  | 12V অ্যাডাপ্টারের ঋণাত্মক |
| আরডুইনোর Vin         | 12V অ্যাডাপ্টারের ধনাত্মক |
| আরডুইনোর GND         | 12V অ্যাডাপ্টারের ঋণাত্মক |

ENA ও ENB পিন দিয়ে PWM দিয়ে গতি নিয়ন্ত্রণ করা যায়। SV জাম্পার খুলে নিলেই একমাত্র মোটরের গতি আমরা নিয়ন্ত্রণ করতে পারব।

## কোড

```cpp
// Motor A connections
int enA = 9;
int in1 = 8;
int in2 = 7;
// Motor B connections
int enB = 3;
int in3 = 5;
int in4 = 4;

void setup() {
  // Set all the motor control pins to outputs
  pinMode(enA, OUTPUT);
  pinMode(enB, OUTPUT);
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
  pinMode(in3, OUTPUT);
  pinMode(in4, OUTPUT);
  // Turn off motors - Initial state
  digitalWrite(in1, LOW);
  digitalWrite(in2, LOW);
  digitalWrite(in3, LOW);
  digitalWrite(in4, LOW);
}

void loop() {
  directionControl();
  delay(1000);
  speedControl();
  delay(1000);
}

// This function lets you control spinning direction of motors
void directionControl() {
  // Set motors to maximum speed
  // For PWM maximum possible values are 0 to 255
  analogWrite(enA, 255);
  analogWrite(enB, 255);
  // Turn on motor A & B
  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);
  digitalWrite(in3, HIGH);
  digitalWrite(in4, LOW);
  delay(2000);
  // Now change motor directions
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH);
  delay(2000);
  // Turn off motors
  digitalWrite(in1, LOW);
  digitalWrite(in2, LOW);
  digitalWrite(in3, LOW);
  digitalWrite(in4, LOW);
}

// This function lets you control speed of the motors
void speedControl() {
  // Turn on motors
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH);
  // Accelerate from zero to maximum speed
  for (int i = 0; i < 256; i++) {
    analogWrite(enA, i);
    analogWrite(enB, i);
    delay(20);
  }
  // Decelerate from maximum speed to zero
  for (int i = 255; i >= 0; --i) {
    analogWrite(enA, i);
    analogWrite(enB, i);
    delay(20);
  }
  // Now turn off motors
  digitalWrite(in1, LOW);
  digitalWrite(in2, LOW);
  digitalWrite(in3, LOW);
  digitalWrite(in4, LOW);
}
```
