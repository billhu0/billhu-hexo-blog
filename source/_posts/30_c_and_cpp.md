---
title: C & C++ Code Snippets
date: 2022-07-11 11:32:00
description: Some c and c++ code snippets here
categories: 
- C++
tags:
- C
- C++
---

## `__VA_ARGS__` usage

`__VA_ARGS__` is a macro, which can take in variable number of arguments and expand to multiple arguments.

```C
int main(){

    /* Without __VA_ARGS__, arguments not correctly expanded */
    #define aaa() some_function()
    aaa();       // expanded to some_function()
    aaa(1, 'a'); // still expanded to some_function() , error

    /* With ... and __VA_ARGS__, arguments expanded */
    #define bbb(...) some_function(__VA_ARGS__)
    bbb();         // expanded to  some_function()
    bbb(123, 'a'); // expanded to  some_function(123, 'a')

}
```

We can also combine the various arguments with some fixed args. 

However, if there're NO arguments, `__VA_ARGS__` will result in a redundant comma (`,`), leading to a syntax error. `##__VA_ARGS__` will remove the previous comma in this cases, and works the same as `__VA_ARGS__` in other cases.

```C
int main(){
    /* With __VA_ARGS__ */
    #define ccc(...) some_function("Fixed", __VA_ARGS__)

    ccc();         // expanded to some_function("Fixed", )  ==> syntax error
    ccc(123, 'a'); // expanded to some_function("Fixed", 123, 'a') ==> fine!
    
    /* With ##__VA_ARGS__ */
    #define ddd(...) some_function("Fixed", ##__VA_ARGS__)

    ddd();         // expanded to some_function("Fixed" )  ==> fine!
    ddd(123, 'a'); // expanded to some_function("Fixed", 123, 'a') ==> fine!
}
```

## A function with variable number of arguments

```C
#include <stdio.h>
#include <stdarg.h>
 
double average(int num,...){
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


## C++: Compile time Fibonacci 

```C++
#include <iostream>

/*
 * region Compile time Fibonacci
 */
template<long a>
struct fib {
    static constexpr const long value = fib<a - 1>::value + fib<a - 2>::value;
};
template<>
struct fib<1> {
    static constexpr const long value = 1;
};
template<>
struct fib<2> {
    static constexpr const long value = 1;
};

int main(){
    std::cout << fib<10>::value << std::endl;  // output 55
}
```

## C++: Templated Sum function
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

## C++ Printline
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


## QuickRead 

```c++
template <typename IntType = int>
inline void quickRead(IntType& number) {
    int f = 0, c;
    number = 0;
    do {
      	c = getchar();
        f |= (c == '-');
    } while (!isdigit(c));
    do {
        number = number * 10 + c - 48;
        c = getchar();
    } while (isdigit(c));
    if (f) number = -number;
}

template <typename IntType = int, typename... Args>
inline void quickRead(IntType &x, Args &... args){
    quickRead(x);
    quickRead(args...);
}
```



