---
title: 用 Arduino uno + HC-SR04 做一个超声波测距仪
date: 2021-09-07 17:09:49
categories: 
- Code
- Raspi&Arduino
tags: 
- Linux
- C
- Arduino
---

# Arduino, LCD1602A, HC-SR04 configuration



## LCD1602 display

引脚 4线连线:

| Pin   | Connect to | Explaination                                                 |
| ----- | ---------- | ------------------------------------------------------------ |
| VSS   | ground     | 接地                                                         |
| VDD   | 5V power   | 接电源                                                       |
| V0    | 电位器输出 | 对比度调整端（5V对比度最弱，接地对比度最高；可通过10kΩ电位器调整对比度） |
| RS    | 12口       | 寄存器选择，高电平——数据寄存器；低电平——指令寄存器           |
| R/W   | ground     | 读写信号线，高电平——进行读操作；低电平——进行写操作           |
| E或EN | 11口       | 使能（enable）端，下降沿使能                                 |
| D4    | 5口        | 数据                                                         |
| D5    | 4口        | 数据                                                         |
| D6    | 3口        | 数据                                                         |
| D7    | 2口        | 数据（D0\~D7为数据总线，通常只接D4\~D7）                     |
| A     | 5V power   | 背光电源                                                     |
| K     | ground     | 背光接地                                                     |



## 控制LCD1602的代码实现

```c
#include <LiquidCrystal.h>

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);
//LiquidCrystal (register select, enable, data pin d0, data d1, data d2, data d3);

void setup() {
    lcd.begin(16, 2); // set the row and column number
    lcd.print("hello, world!");
}

void loop() {
    lcd.setCursor(0, 1); // set cursor position (col, row)
    lcd.print(millis()/1000);		// show the time since boot.
}

```



## HC-SR04 引脚连线

| Pin  | Connect to             | Explaination                      |
| ---- | ---------------------- | --------------------------------- |
| Gnd  | Gnd                    | 接地                              |
| Echo | 8口（任意 uint8_t 口） | 然后从Echo读取输出                |
| Trig | 9口（任意 uint8_t 口） | 先向Trig发送长度为8微秒的脉冲信号 |
| Vcc  | Power                  | 电源                              |



## 控制HC-SR04 代码实现

```c
#include <LiquidCrystal.h>

#define SR04_TRIG 9
#define SR04_ECHO 8

void setup(void){
    lcd.begin(16, 2); // set up the LCD's number of columns and rows
    pinMode(SR04_TRIG, OUTPUT);
    pinMode(SR04_ECHO, INPUT);
}

void loop(void){
		// send a 8 microseconds pulse to TRIG
    digitalWrite(SR04_TRIG, LOW);
    delayMicroseconds(2);
    digitalWrite(SR04_TRIG, HIGH);
    delayMicroseconds(10);
    digitalWrite(SR04_TRIG, LOW);

    // `pulseIn` function waits until ECHO turn to HIGH, starts accumulating time
    // until ECHO turn to LOW.
    float temp = pulseIn(SR04_ECHO, HIGH);
    float distance_cm = (temp * 17) / 1000;
    
    lcd.setCursor(0, 1);
    lcd.print("DIS:");
    lcd.print(distance_cm);
    lcd.print("cm");
    lcd.print("   ");
  
}
```



## 最终连线效果...



![](https://pic.imgdb.cn/item/621b069c2ab3f51d913294b8.jpg)