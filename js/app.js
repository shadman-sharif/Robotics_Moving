// ===== Theme Toggle =====
const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;

function setTheme(theme) {
  html.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  document.querySelector(".theme-label").textContent =
    theme === "dark" ? "DARK MODE" : "LIGHT MODE";
}

const savedTheme = localStorage.getItem("theme") || "light";
setTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const current = html.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
});

// ===== Language Switch =====
const translations = {
  en: {
    chapter: "Chapter 7",
    title: "Robot Movement",
    intro: "In the previous chapters we worked with different inputs and outputs for our robot, but we never made the robot move! Motors are used to make a robot move. Servo motors are easier to control than other motors and can be moved to a specific position.",
    p12_title: "Project 12: Laser Light Game with Servo Motor for Birds",
    p12_body: "A servo motor has a DC motor inside, a gearbox, and a potentiometer for position feedback. The control unit continuously compares the current position with the target and adjusts until it reaches the desired angle. Popular micro servos like the SG90 can rotate from 0° to 180°.",
    p12_materials: "Required: Arduino, jumper wires, servo motor, laser light.",
    p12_how: "How to do it",
    p12_step1: "1. First set up the circuit.",
    p12_step2: "Connect the servo: brown/black → GND, red → 5V, orange/yellow → PWM pin (e.g. pin 9).",
    p13_title: "Project 13: Continuous Rotation / Robot Wheel Drive",
    p13_body: "Some servos are modified for continuous rotation. These are useful for driving robot wheels so the robot can move from one place to another.",
    p14_title: "Project 14: Simple Robotic Arm with Servo",
    p14_body: "With servo motors you can easily build a robotic arm or the hands and legs of a humanoid robot. Multiple servos can be coordinated to create complex movements.",
    p15_title: "Project 15: Multi-Servo Control",
    p15_body: "Controlling several servos together allows more interesting projects such as a pan-tilt laser pointer or a simple walking mechanism.",
    p16_title: "Project 16: Sensor + Servo Interaction",
    p16_body: "Combine sensors (ultrasonic, IR, potentiometer) with servos so the robot can react to its environment.",
    p17_title: "Project 17: Advanced Movement Sequence",
    p17_body: "Write sequences of movements so the robot performs a programmed dance or follow a path automatically.",
    p18_title: "Project 18: Final Combined Robot Project",
    p18_body: "Put everything together: sensors, multiple servos, and logic to create a complete moving robot.",
    materials_label: "Materials needed",
    circuit_label: "Circuit Diagram",
    final_label: "Final View",
    credit: "Made by Shadman",
    help: "With help from"
  },
  bn: {
    chapter: "সপ্তম অধ্যায়",
    title: "রোবটের নড়াচড়া",
    intro: "এর আগের অধ্যায় পর্যন্ত আমাদের রোবটের জন্য আমরা বিভিন্ন ইনপুট-আউটপুট নিয়ে কাজ করলেও রোবটকে কোনো রকম নড়াচড়া করাইনি! রোবটকে নড়াচড়া করানোর জন্য ব্যবহার করা যায় মোটর। অন্য মোটরগুলোর চেয়ে সারভো মোটর সহজে নিয়ন্ত্রণ করা যায়। আবার সারভো মোটরকে নির্দিষ্ট পজিশনে অবস্থান পরিবর্তন করা যায়।",
    p12_title: "প্রজেক্ট ১২: সারভো মোটর দিয়ে বিড়ালের লেজার লাইট খেলা",
    p12_body: "একটা সারভো মোটরের ভেতরে মূলত একটা ডিসি মোটর থাকে! সেই মোটরের আউটপুটের সঙ্গে যুক্ত থাকে একটা পটেনশিওমিটার। পটেনশিওমিটার এই মুহূর্তে তার অবস্থান ফিডব্যাক দেয় সারভোর কন্ট্রোল ইউনিটের কাছে। কন্ট্রোল ইউনিট আগে থেকেই জানে আমরা ঠিক কোন পজিশনে যেতে চাচ্ছি। এভাবে লক্ষ্য অনুযায়ী পজিশনে না পৌঁছানো পর্যন্ত কাজ চলতে থাকে।",
    p12_materials: "যা লাগবে: আরডুইনো, জাম্পার তার, সারভো মোটর, লেজার লাইট।",
    p12_how: "যেভাবে করব",
    p12_step1: "১. প্রথমে সার্কিট সেটআপ করি।",
    p12_step2: "সারভো মোটরের বাদামি তার GND, লাল তার 5V এবং কমলা তার কন্ট্রোল পিন (PWM) এ সংযোগ করুন।",
    p13_title: "প্রজেক্ট ১৩: কন্টিনিউয়াস রোটেশন / রোবটের চাকা চালানো",
    p13_body: "কিছু সারভো কন্টিনিউয়াস রোটেশনের জন্য মডিফাই করা থাকে। এগুলো রোবটের চাকার সঙ্গে লাগিয়ে রোবটকে এক জায়গা থেকে আরেক জায়গায় ঘোরানো যায়।",
    p14_title: "প্রজেক্ট ১৪: সারভো দিয়ে সহজ রোবোটিক আর্ম",
    p14_body: "সারভো মোটর দিয়ে সহজেই রোবোটিক আর্ম বা হিউম্যানয়েড রোবটের হাত-পা তৈরি করা যায়।",
    p15_title: "প্রজেক্ট ১৫: মাল্টি-সারভো কন্ট্রোল",
    p15_body: "একাধিক সারভো একসাথে নিয়ন্ত্রণ করে আরও আকর্ষণীয় প্রজেক্ট তৈরি করা যায়।",
    p16_title: "প্রজেক্ট ১৬: সেন্সর + সারভো ইন্টারঅ্যাকশন",
    p16_body: "সেন্সরের সঙ্গে সারভো যুক্ত করে রোবটকে পরিবেশের সঙ্গে প্রতিক্রিয়া জানাতে শেখানো যায়।",
    p17_title: "প্রজেক্ট ১৭: অ্যাডভান্সড মুভমেন্ট সিকোয়েন্স",
    p17_body: "নির্দিষ্ট সিকোয়েন্স লিখে রোবটকে স্বয়ংক্রিয়ভাবে নাচ বা পথ অনুসরণ করানো যায়।",
    p18_title: "প্রজেক্ট ১৮: ফাইনাল কম্বাইন্ড রোবট প্রজেক্ট",
    p18_body: "সবকিছু একসাথে করে একটি সম্পূর্ণ নড়াচড়া করতে পারা রোবট তৈরি করা।",
    materials_label: "যা লাগবে",
    circuit_label: "সার্কিট ডায়াগ্রাম",
    final_label: "ফাইনাল ভিউ",
    credit: "তৈরি করেছেন শাদমান",
    help: "সাহায্য নিয়ে"
  },
  ja: {
    chapter: "第7章",
    title: "ロボットの動き",
    intro: "これまでの章ではロボットのさまざまな入出力を扱いましたが、ロボットを動かすことはありませんでした！ロボットを動かすにはモーターを使います。サーボモーターは他のモーターより制御しやすく、特定の位置に動かすことができます。",
    p12_title: "プロジェクト12：サーボモーターを使った鳥用レーザーライトゲーム",
    p12_body: "サーボモーターの内部には主にDCモーターがあり、ギアボックスと位置フィードバック用のポテンショメータが付いています。制御ユニットは現在位置と目標位置を比較し、目的の角度に達するまで調整し続けます。SG90などの人気のマイクロサーボは0°から180°まで回転できます。",
    p12_materials: "必要なもの：Arduino、ジャンパー線、サーボモーター、レーザーライト。",
    p12_how: "作り方",
    p12_step1: "1. まず回路をセットアップします。",
    p12_step2: "サーボの接続：茶/黒 → GND、赤 → 5V、橙/黄 → PWMピン（例：ピン9）。",
    p13_title: "プロジェクト13：連続回転 / ロボットの車輪駆動",
    p13_body: "一部のサーボは連続回転用に改造されています。これらはロボットの車輪を駆動して移動させるのに便利です。",
    p14_title: "プロジェクト14：サーボを使ったシンプルなロボットアーム",
    p14_body: "サーボモーターを使えば簡単にロボットアームや人型ロボットの手足を作れます。",
    p15_title: "プロジェクト15：マルチサーボ制御",
    p15_body: "複数のサーボを同時に制御することで、より興味深いプロジェクトが可能になります。",
    p16_title: "プロジェクト16：センサー + サーボの相互作用",
    p16_body: "センサーとサーボを組み合わせて、ロボットが環境に反応できるようにします。",
    p17_title: "プロジェクト17：高度な動作シーケンス",
    p17_body: "動作のシーケンスを書いて、ロボットが自動でダンスしたり経路をたどったりできるようにします。",
    p18_title: "プロジェクト18：最終統合ロボットプロジェクト",
    p18_body: "すべてを組み合わせて、センサー・複数のサーボ・ロジックを使った完全に動くロボットを作ります。",
    materials_label: "必要な材料",
    circuit_label: "回路図",
    final_label: "完成図",
    credit: "作成者：Shadman",
    help: "協力："
  }
};

function setLanguage(lang) {
  localStorage.setItem("lang", lang);
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  const t = translations[lang];
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) el.textContent = t[key];
  });

  // Update html lang attribute
  document.documentElement.lang = lang === "bn" ? "bn" : lang === "ja" ? "ja" : "en";
}

const savedLang = localStorage.getItem("lang") || "en";
setLanguage(savedLang);

document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
});
