---
title: Algorithm templates (C++)
date: 2021-11-11 21:32:00
description: Some algorithm implementation and c++ code snippets here
categories: 
- C++
tags:
- C
- C++
---

## Some sort algorithms

### 1. Mergesort

```c++
// Normal Mergesort (templated)

template <class T>
void __mergesort(T src[], int l, int r, T out[]){
    if ( l >= r ) return;
    int mid = (l + r) / 2;
    __mergesort(src, l,     mid, out);
    __mergesort(src, mid+1, r,   out);
    int i = l, j = mid + 1, k = l;
    while (i <= mid && j <= r)
        out[k++] = (src[i] < src[j])? src[i++]:src[j++];
    while (i <= mid) out[k++] = src[i++];
    while (j <= r)   out[k++] = src[j++];
    for (int m = l; m <= r; m++) src[m] = out[m];
}

template <class T>
void mergesort(T src[], int n){
    T *arrout = new T[n];
    __mergesort(src, 0, n-1, arrout);
    delete[] arrout;
}

```

```c++
// mergesort with customized comparator (e.g. 'operator<' )
template <class T, class Compare>
void __mergesort(T src[], int l, int r, T out[], Compare comp){
    if ( l >= r ) return;
    int mid = (l + r) / 2;
    __mergesort(src, l,     mid, out, comp);
    __mergesort(src, mid+1, r,   out, comp);
    int i = l, j = mid + 1, k = l;
    while (i <= mid && j <= r)
        out[k++] = (comp(src[i], src[j]))? src[i++]:src[j++];
    while (i <= mid) out[k++] = src[i++];
    while (j <= r)   out[k++] = src[j++];
    for (int m = l; m <= r; m++) src[m] = out[m];
}

template <class T, class Compare>
void mergesort(T src[], int n, Compare comp){
    T *arrout = new T[n];
    __mergesort(src, 0, n-1, arrout, comp);
    delete[] arrout;
}

```

Usage:

```c++
int arr[15] = {98, 36, 44, 83, 91, 84, 62, 35, 77, 87, 34, 55, 48, 54, 32};
mergesort(arr, 15);
```



### 2. Quicksort

```c++
template <class T>
void __quicksort(T src[], int l, int r){
    if (l >= r) return;
    std::swap(src[l], src[(l + r) / 2]);
    int i = l, j = r;
    T pivot = src[l];
    while (i < j){
        while(i < j && src[j] >= pivot) j--;  
        if(i < j) src[i++] = src[j];
        while(i < j && src[i] < pivot) i++;  
        if(i < j) src[j--] = src[i];
    }
    src[i] = pivot;
    __quicksort(src, l, i - 1); 
    __quicksort(src, i + 1, r);
}

template <class T>
void quicksort(T src[], int n){
    __quicksort(src, 0, n-1);
}
```

Usage:

```c++
int arr[15] = {98, 36, 44, 83, 91, 84, 62, 35, 77, 87, 34, 55, 48, 54, 32};
quicksort(arr, 15);
```



## Some data structures

### 1. Simple `std::vector` with only `pushback` and `clear`

```c++
#define MAX_NUM 1000

class Vector{
public:
    int size = 0;
    int array[MAX_NUM];
    void push_back(int given_value) { array[size++] = given_value; }
    void clear() { size = 0; }
    int& operator[](int i) { return array[i]; }
};
```



### 2. Simple `std::queue`

```c++
#define MAX_NUM 1000

class Queue{
public:
    int m_array[MAX_NUM];
    int start_ptr = 0;
    int end_ptr = 0;
    int  size() { return end_ptr - start_ptr; }
    bool is_not_empty() { return end_ptr - start_ptr; }
    void push(int value) { m_array[++end_ptr] = value; }
    int  pop() { return m_array[++start_ptr]; }
};
```

Usage:

```c++
int main(){
  	Queue queue;
  	queue.push(100);
    queue.push(34);
    queue.push(23);
    std::cout << queue.pop() << ' ';
    queue.push(200);
    while (queue.is_not_empty()){
        std::cout << queue.pop() << ' ';
    }
}
```



### 3. Disjoint sets 

- Disjoint set with path compression. 

  Implemented with only path compression. Despite union by size is not enabled, which means it cannot achieve $O(\alpha(n))$ time complexity, it is fast enough in practice.

```c++
#define MAX_NUM 1000

int parent[MAX_NUM];
// Initialize
void init(){
    for (int i = 0; i < MAX_NUM; i++){
        parent[i] = i;
    }
}
// Find parent (with path compression)
int find(int i){
    return (parent[i] == i)? i : ( parent[i] = find(parent[i]) );
}
// Set Union (includes path compression)
void set_union(int i, int j){
    if (find(i) != find(j)) parent[find(j)] = find(i);
}
```

- (Excerpted from Gkxx's article [CS101 2021Fall PA3,4 题解](https://blog.csdn.net/qq_39677783/article/details/122613401?spm=1001.2014.3001.5501) ))

  启发式合并。也能保证高度控制在$O(\log n)$

```c++
#define MAX_NUM 1000

int parent[MAX_NUM];
int size[MAX_NUM];
void init(){
    for (int i = 0; i < MAX_NUM; i++){
        parent[i] = i;
        size[i] = 1;
    }
}
int find(int i){
    return (parent[i] == i)? i : ( parent[i] = find(parent[i]) );
}
void set_union(int i, int j){
    i = find(i);
    j = find(j);
    if (i == j) return;
    if (size[i] < size[j]){
        parent[i] = j;
        size[j] += size[i];
    } else {
        parent[j] = i;
        size[i] += size[j];
    }
}
```



## Common coding snippets 

### QuickRead 

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

Usage:

```c++
quickRead(a);        // Same as 'std::cin >> a'
quickRead(b, c, d);  // Same as 'std::cin >> b >> c >> d'
```



### `bits/stdc++.h` omnipotent header  

(Note that, personally, I STRONGLY DISLIKE the following two lines of code. The first line will significantly reduce compilation speed, not supported by some compiler, and is not in C++ standard. The second line will lead to potential problems. **Except for ACM and OI.**)

```c++
#include <bits/stdc++.h>
using namespace std;
```

Clang, MSVC may not support `bits/stdc++.h`. If you want to use it, you can find the include path of the compiler first, add a new folder `bits`, and create a file `stdc++.h` with the following:

```c++
// C++ includes used for precompiling -*- C++ -*-

// Copyright (C) 2003-2019 Free Software Foundation, Inc.
//
// This file is part of the GNU ISO C++ Library.  This library is free
// software; you can redistribute it and/or modify it under the
// terms of the GNU General Public License as published by the
// Free Software Foundation; either version 3, or (at your option)
// any later version.

// This library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// Under Section 7 of GPL version 3, you are granted additional
// permissions described in the GCC Runtime Library Exception, version
// 3.1, as published by the Free Software Foundation.

// You should have received a copy of the GNU General Public License and
// a copy of the GCC Runtime Library Exception along with this program;
// see the files COPYING3 and COPYING.RUNTIME respectively.  If not, see
// <http://www.gnu.org/licenses/>.

/** @file stdc++.h
 *  This is an implementation file for a precompiled header.
 */

// 17.4.1.2 Headers

// C
#ifndef _GLIBCXX_NO_ASSERT
#include <cassert>
#endif
#include <cctype>
#include <cerrno>
#include <cfloat>
#include <ciso646>
#include <climits>
#include <clocale>
#include <cmath>
#include <csetjmp>
#include <csignal>
#include <cstdarg>
#include <cstddef>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <ctime>
#include <cwchar>
#include <cwctype>

#if __cplusplus >= 201103L
#include <ccomplex>
#include <cfenv>
#include <cinttypes>
#include <cstdalign>
#include <cstdbool>
#include <cstdint>
#include <ctgmath>
#include <cuchar>
#endif

// C++
#include <algorithm>
#include <bitset>
#include <complex>
#include <deque>
#include <exception>
#include <fstream>
#include <functional>
#include <iomanip>
#include <ios>
#include <iosfwd>
#include <iostream>
#include <istream>
#include <iterator>
#include <limits>
#include <list>
#include <locale>
#include <map>
#include <memory>
#include <new>
#include <numeric>
#include <ostream>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <stdexcept>
#include <streambuf>
#include <string>
#include <typeinfo>
#include <utility>
#include <valarray>
#include <vector>

#if __cplusplus >= 201103L
#include <array>
#include <atomic>
#include <chrono>
#include <codecvt>
#include <condition_variable>
#include <forward_list>
#include <future>
#include <initializer_list>
#include <mutex>
#include <random>
#include <ratio>
#include <regex>
#include <scoped_allocator>
#include <system_error>
#include <thread>
#include <tuple>
#include <typeindex>
#include <type_traits>
#include <unordered_map>
#include <unordered_set>
#endif

#if __cplusplus >= 201402L
#include <shared_mutex>
#endif

#if __cplusplus >= 201703L
#include <any>
#include <charconv>
#include <filesystem>
#include <optional>
#include <memory_resource>
#include <string_view>
#include <variant>
#endif

#if __cplusplus > 201703L
#include <bit>
#include <version>
#endif

```

## Boom !


### Include something that is endless

```c++
#include </dev/random>  // for linux and macOS
```

```c++
#include <CON>   // for Windows
```

### Similarly, we can stuck the preprocessing

```c++
int f(int num) {
    return num;
}
#define TEN(i, t) (t[++i] = f(i), t[++i] = f(i), t[++i] = f(i), t[++i] = f(i), t[++i] = f(i), t[++i] = f(i), t[++i] = f(i), t[++i] = f(i), t[++i] = f(i))
#define HUN(i, t) (TEN(i, t),TEN(i, t),TEN(i, t),TEN(i, t),TEN(i, t),TEN(i, t),TEN(i, t),TEN(i, t),TEN(i, t),TEN(i, t))
#define THO(i, t) (HUN(i, t),HUN(i, t),HUN(i, t),HUN(i, t),HUN(i, t),HUN(i, t),HUN(i, t),HUN(i, t),HUN(i, t),HUN(i, t))
#define TTT(i, t) (THO(i, t),THO(i, t),THO(i, t),THO(i, t),THO(i, t),THO(i, t),THO(i, t),THO(i, t),THO(i, t),THO(i, t))
#define YYY(i, t) (TTT(i, t),TTT(i, t),TTT(i, t),TTT(i, t),TTT(i, t),TTT(i, t),TTT(i, t),TTT(i, t),TTT(i, t),TTT(i, t))
#define UUU(i, t) (YYY(i, t),YYY(i, t),YYY(i, t),YYY(i, t),YYY(i, t),YYY(i, t),YYY(i, t),YYY(i, t),YYY(i, t),YYY(i, t))
#define III(i, t) (UUU(i, t),UUU(i, t),UUU(i, t),UUU(i, t),UUU(i, t),UUU(i, t),UUU(i, t),UUU(i, t),UUU(i, t),UUU(i, t))
#define OOO(i, t) (III(i, t),III(i, t),III(i, t),III(i, t),III(i, t),III(i, t),III(i, t),III(i, t),III(i, t),III(i, t))
#define PPP(i, t) (OOO(i, t),OOO(i, t),OOO(i, t),OOO(i, t),OOO(i, t),OOO(i, t),OOO(i, t),OOO(i, t),OOO(i, t),OOO(i, t))
int arr[99999999999];
int main(int argc, char const *argv[]){
    int i = 0;
    PPP(i, arr);
    return 0;
}
```

When compiling the above program, the compiler will use tremendous amount of memory and takes an EXTREMELY long time.

