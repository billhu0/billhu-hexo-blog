---
title: "C/C++ 可变数量参数的函数"
date: 2022-07-11 11:32:00
description: "\"__VA_ARGS__\", \"##__VA_ARGS__\""
categories: 
- Algorithm
tags:
- C
- C++
---



# A function with any number of arguments

```C
#include <stdio.h>
#include <stdarg.h>
 
double average(int num, ...){
    va_list valist;
    double sum = 0.0;
    int i;
 
    /* 为 num 个参数初始化 valist */
    va_start(valist, num);
 
    /* 访问所有赋给 valist 的参数 */
    for (i = 0; i < num; i++)
    {
       sum += va_arg(valist, int);
    }
    /* 清理为 valist 保留的内存 */
    va_end(valist);
 
    return sum/num;
}
 
int main(){
    printf("Average of 2, 3, 4, 5 = %f\n", average(4, 2,3,4,5));
    printf("Average of 5, 10, 15 = %f\n", average(3, 5,10,15));
}
```

实际上 `printf` 函数就是这么写出来的，这个函数就是一个能接收任意数量参数的函数。



# `__VA_ARGS__` & `##__VA_ARGS__`

`__VA_ARGS__` 允许宏**接收可变数量的参数**。

`__VA_ARGS__` allows a macro to accept a variable number of arguments.

It is often used with `...` to define macros that can take any number of arguments. 

```C
#include <stdio.h>

#define PRINT_ARGS(...) printf(__VA_ARGS__)

int main() {
    PRINT_ARGS("Hello, %s!\n", "world");  // output: Hello, world!
    return 0;
}
```

In the above example, the code `PRINT_ARGS("Hello, %s!\n", "world")` will be expanded with `printf("Hello, %s!\n", "world")`。

However, if no arguments are passed into a macro that uses `__VA_ARGS__`, it will result in a trailing comma issue (a redundant comma '`,`' at the end).

To avoid this error, use `##__VA_ARGS`, which will remove the previosu comma when no arguments, and works the same as `__VA_ARGS__` normally in other cases. 

`##__VA_ARGS__` 用于在没有参数时**删除前面的逗号或其他分隔符**。

```C
#include <stdio.h>

#define LOG(format, ...) printf(format, __VA_ARGS__)

int main() {
    LOG("Hello, world!\n");
    LOG("Hello, %s!\n", "world");
    return 0;
}
```

In the above example, `LOG("Hello, world!\n")` will be expanded to `printf("Hello, world\n", )`. Note that there's an extra comma `,`, so a compile error will occur. 

To fix it, just replace `__VA_ARGS__` with `##__VA_ARGS__`.



## C++: Templated Sum function

用C++中的模板 template 能更方便实现类似的效果

```C++
#include <iostream>

/*
 * Templated Sum function
 */
template<typename...U>
auto sum_1(U... u) {
    return (u + ...);
}

/*
 * Another templated Sum function
 */
template<auto...item>
auto sum_2() {
    return (item + ...);
}

int main(){
    std::cout << sum_1(1, 2, 3) << std::endl;       // 6
    std::cout << sum_1(1, 2.0f, 3.0l) << std::endl; // 6
    std::cout << sum_2<1, 2, 3>() << std::endl;     // 6
}
```



## C++ Printline (模仿java的println)

```C++
#include <iostream>
/*
 * Multiple args with different types.
 */
template<typename...U>
void print_line(U...u){
    // get the number of arguments
    std::cout << "There are " << sizeof...(u) << " args, namely \n";
    // print them (comma expression)
    ((std::cout << u << ", "), ...) << std::endl;
    // remove the comma in the end
    [[maybe_unused]] int i = 0, last_index = sizeof...(u) - 1;
    ((i++ < last_index ? (std::cout << u << ", ") : (std::cout << u << std::endl) ), ...);
}

int main(){
    // Print Line
    print_line(1, 2, "str", 'a');
    /* Output: 
        There are 4 args, namely, 
        1, 2, str, a,
        1, 2, str, a
    */
}
```



