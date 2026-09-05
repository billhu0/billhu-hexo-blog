---
title: LeetCode C++ 常用数据结构
date: 2024-08-09 00:48:03
code: true
tags:
---



# C++ STL

## `std::queue` 

- 头文件: `#include <queue>`

```c++
std::queue<int> q;
q.push(1);  // 加入队列
q.push(2);
q.front();  // 获取队首元素(oldest element), 返回1
q.back();   // 获取队尾元素, 返回2
q.pop();    // 出队 (没有返回值)
q.empty();  // 判断是否为空
q.size();   // 获取大小
```

## `std::deque` (double-ended queue, 双端队列)

- 头文件: `#include <deque>`

```c++
std::deque<int> dq;
dq.push_back(1);   // 尾部插入
dq.push_front(2);  // 头部插入
dq.pop_back();     // 尾部删除(没有返回值)
dq.pop_front();    // 头部删除(没有返回值)
dq.empty();   // 判断是否为空
dq[i];        // 随机访问 (普通std::queue不支持operator[])
```

- `std::deque` 的底层内存存储不连续, 使用`dq[i]`随机访问需要通过中控数组进行 二次指针解引用, 开销比`std::vector`随机访问要略大. 但是仍然是 O(1).

## `std::priority_queue` 优先队列，使用heap实现

- 头文件: `#include <queue>`

```c++
// 大顶堆(默认) 堆顶元素最大
std::priority_queue<int> pq;
// 小顶堆 堆顶元素最小
std::priority_queue<int, std::vector<int>, std::greater<int>> pq;

pq.push(1);        // 入队
pq.top();          // 获取堆顶元素
pq.pop();          // 出队(无返回值)
pq.empty();        // 判断是否为空
pq.size();         // 获取大小
```

- 如果要自定义比较器：

```c++
struct your_struct { ... }
struct cmp {
  bool operator() (your_struct a, your_struct b) {
    return ...;  // compare your struct
  }
};

std::priority_queue<your_struct, vector<your_struct>, cmp> pq;
```

- 自定义比较器 Compare(a, b) 的意思是 **a的优先级是否低于b** （优先级最高的元素在堆顶）

  因此比较器写 a<b (类似std::less) 代表越大元素优先级越高 -> 大顶堆, 同理 a>b 代表小顶堆

## `std::set` 集合，集合中元素有序，不会有重复元素

- 头文件: `#include <set>`
- 添加: `.insert()`
  - 如果添加的元素是结构体，必须重载 `operator<`
- 删除: `.erase()`
- 判断元素是否存在: `.count()` 
- 遍历: `for (auto& p: s)`或者 `for (auto it = s.begin(); it != s.end(); ++it) {  *it;  }`

```c++
#include <set>

struct Point {
    int x, y;

    bool operator<(const Point& other) const {
        if (x == other.x) {
            return y < other.y;
        }
        return x < other.x;
    }
};

int main() {
    std::set<Point> points; 
    points.insert({1, 2});
    points.insert({0, 5});

    for (const auto& p : points) {
        std::cout << "(" << p.x << ", " << p.y << ")\n";
    }
}
```



## `std::unordered_set` 无序集合，也保证不会有重复元素

- 头文件: `#include <unordered_set>`
- 跟`std::set` 的使用方法相同，区别在于 `std::set` 用红黑树, `std::unordered_set` 用哈希表



## `std::unordered_map` 哈希表，一个key只能对应一个value不会重复

- 头文件: `#include <unordered_map>`

- 添加元素: 下标添加或`.insert( {key, value} )`. 

  如果添加的是重复的key, 则使用下标会修改value，使用insert不会修改value.

- 查找元素用[]下标, `.at()`或者`.find`:

  `if (m.find(key) != m.end()) { ... }`

- 检查元素是否存在可以使用 `m.count(key)` 或 `m.find(key) != m.end()`

- 删除：`.erase( key )`

- 遍历：

  `for (auto iter = m.begin(); iter != m.end(); iter++) {  }`

  key = `iter->first`, value = `iter->second`.

```c++
std::unordered_map<int, std::string> m;

// insert
m[1] = "one";
m.insert({2, "second"});
m.insert(std::make_pair(3, "third"));
m[1] = "first";  // will modify value
m.insert({3, "three"});  // will not overwrite value

// access
std::cout << m[0] << '\n';  // output empty. 但是会发生隐式插入
std::cout << m[1] << '\n';  // "first"
std::cout << m.at(2) << '\n';  // "second"
std::cout << m.at(-1) << '\n';  // std::out_of_range exception
auto iter = m.find(3);
if (iter != m.end()) {
    // key = iter->first, value = iter->second
    std::cout << "key " << iter->first << " value " << iter->second << '\n';
}

// traverse
for (auto iter = m.begin(); iter != m.end(); iter++) {
    // key = iter->first, value = iter->second
    std::cout << "key " << iter->first << " value " << iter->second << '\n';
```

## `std::unordered_multimap` 也是哈希表，但允许重复的key

- 头文件: `#include <unordered_map>`

- 插入元素: 不能使用operator[], 只能使用 `.insert`

- 查找指定key的一个元素: `.find( key )`

- 查找key的所有元素: `.equal_range( key )`

  `auto range = m.equal_range (key)`

  `for (auto it = range.first; it != range.second; ++it) {  }`

```c++
std::unordered_multimap<int, std::string> m;

// insert
m.insert({1, "one"});
m.insert({1, "first"});
// m[1] = "one";  // no such operator!
m.insert({2, "second"});

// access
std::cout << m.count(3) << '\n';
std::cout << m.count(1) << '\n';
auto range = m.equal_range(1);
for (auto it = range.first; it != range.second; ++it) {
    std::cout << "key " << it->first << " value " << it->second << '\n';
}
```



