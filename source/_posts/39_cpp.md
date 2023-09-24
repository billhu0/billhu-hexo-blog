---
title: C++的奇技淫巧
date: 2023-09-01 21:35:00
description: Master C++
categories:
- Code
- C++
tags:
- C++
hide: true
---

## 快读 QuickRead

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

## 编译期计算斐波那契数列 Compile-time Fibonacci

```C++
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
```

用法

```C++
int main(){
    std::cout << fib<10>::value << std::endl;  // output 55
}
```


## 参数数量任意的sum()函数

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

## 参数数量任意的PrintLine()函数

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

