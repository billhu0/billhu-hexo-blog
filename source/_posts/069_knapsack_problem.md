---
title: "背包问题"
date: 2026-09-26 00:01:00
categories:
tags:
description: "01背包问题和完全背包问题"
math: true
---

## 01背包问题

有一个容量为`W`的背包，有`n`个物品，其中第`i`个物品的重量为`weight[i]`, 价值为`value[i]`, 每个物品**最多只能选择一次**. 目标是在总重量不超过`W`的情况下，使总价值最大

定义 `dp[i][j]` 为：只考虑前 `i` 个物品，且背包总重 `<= j` 时，可以获得的最大总价值

初始状态:

- `dp[任意值][0] = 0`, 因为背包总重为0时，装不了任何物品自然最大总价值为 `0`
- 对所有 `x<weight[0]`, `dp[0][x] = 0` 因为只考虑第0件物品，背包装不下这个第0件物品，价值为 `0`
- 对所有 `x>=weight[0]`, `dp[0][x] = value[0]`, 因为只考虑第0件物品且容量够，背包一定要装这件物品

状态转移: 新考虑第 `i` 个物品的时候

- 如果装不下（或者能够装下但不选装），则 `dp[i][j] = dp[i-1][j]`

- 如果能够装下并且选装，则 `dp[i][j] = dp[i-1][j - weight[i]] + value[i]`
- 综合两个选择: `dp[i][j] = max(dp[i-1][j], dp[i-1][j - weight[i]] + value[i])`

综合写法：

```c++
初始化dp[n][W+1]数组为全0
// n是物品数量, W是背包容积
for (int j = weight[0]; j <= W; j++) {
    dp[0][j] = value[0];
}

for (int i = 1; i < n; ++i) {
    for (int j = 0; j <= W; ++j) {
        // 不选择物品 i
        dp[i][j] = dp[i - 1][j];

        // 选择物品 i
        if (j >= weight[i]) {
            dp[i][j] = max(
                dp[i][j],
                dp[i - 1][j - weight[i]] + value[i]
            );
        }
    }
}

// 输出最大价值
return dp[n - 1][W];
```



### 从二维dp压缩到一维dp

上面的写法用了二维dp，但可以发现第`i`行只依赖第 `i-1` 行，因此物品这一维 (`i`这一维) 可以删除

`dp[i][j]` 可以只保留 `dp[j]`, `dp[j]` 的含义是已经考虑过第几件物品时，背包总重不超过 `j` 能获得的最大价值

```c++
for (int i = 0; i < n; i++) {
	for (int j = W; j >= weight[i]; j--) {
        dp[j] = max(
        	dp[j],
            dp[j - weight[i]] + value[i]
        );
    }
}

// 输出最大价值
return dp[W];
```

为什么一维DP必须要倒序? 因为要避免重复考虑物品

假设只有一个物品，重量为2，价值为5，背包容量为4

- 如果容量正序遍历

  ```c++
  for (int j = weight[i]; j <= W; j++)
  ```

  那么 `dp[2] = dp[0] + 5 = 5`, 之后计算 `dp[4] = dp[2] + 5 = 10`, 但此时 `dp[2]` 已经选了当前物品，同一个物品被选了两次

- 如果容量倒序遍历，则计算 `dp[j]` 时，`dp[j - weight[i]]` 还是处理当前物品之前的状态，因此保证了只选一次。

  `dp[4] = dp[2] + 5 = 5`, `dp[3] = dp[1] + 5 = 5`, `dp[2] = dp[0] + 5 = 5`, `dp[1] = 0`, `dp[0] = 0`

   

## 完全背包问题

和01背包问题的区别就是同一件物品可以选择无限次

有一个容量为`W`的背包，有`n`个物品，其中第`i`个物品的重量为`weight[i]`, 价值为`value[i]`, 每个物品**可以选择无限次**. 目标是在总重量不超过`W`的情况下，使总价值最大

初始状态: 只考虑物品 `0` 时，容量为 `j` 时，最多可以装 `j / weight[0]` 件物品

因此 `dp[0][j] = (j / weight[0]) * value[0]`

状态转移：新考虑物品 `i` 的时候，可以不装，可以选装1个，2个，...，`j/weight[i]` 个第 `i` 号物品

因此 `dp[i][j] = max(dp[i-1][j - k*weight[i]] + k * value[i])` (其中 `k` 的范围为 `0` 到 `k * weight[i] <= j`)

```c++
for (int j = 0; j <= W; ++j) {
    dp[0][j] = (j / weight[0]) * value[0];
}

for (int i = 1; i < n; ++i) {
    for (int j = 0; j <= W; ++j) {
        for (int k = 0; k * weight[i] <= j; ++k) {
            dp[i][j] = max(
                dp[i][j],
                dp[i-1][j - k*weight[i]] + k * value[i]
            );
        }
    }
}

return dp[n - 1][W];
```

这个写法时间复杂度较高，约为 O(n * W^2)

优化一下二维的状态转移，对于物品 `i`，仍然可以分成不选或者选两种选择

如果不选，仍然是 `dp[i][j] = dp[i-1][j]`

如果选，则先装入一个物品 `i`, 添加 `value[i]`, 剩余容量为 `j-weight[i]`。此时由于物品 `i` 可以继续选择，所以剩余状态仍然可以考虑物品 `i` ，可以复用 `dp[i][j - weight[i]]` 的结果

因此综合两个选择 

```c++
dp[i][j] = max(
    dp[i - 1][j],
    dp[i][j - weight[i]] + value[i] // 这里就不是i-1了，因为选择物品i后仍然停留在第i行，还可以再次选择物品i
);
```

优化后的二维dp

```c++
for (int j = 0; j <= W; ++j) {
    dp[0][j] = (j / weight[0]) * value[0];
}

for (int i = 1; i < n; ++i) {
    for (int j = 0; j <= W; ++j) {
        dp[i][j] = dp[i - 1][j];

        if (j >= weight[i]) {
            dp[i][j] = max(
                dp[i - 1][j],
                dp[i][j - weight[i]] + value[i]
            );
        }
    }
}

return dp[n - 1][W];
```

这样复杂度就降低为了 O(n * W)

### 从二维dp压缩到一维dp

和01背包很相似，区别是重量的遍历方向改为了从小到大

```c++
for (int i = 0; i < n; ++i) {
    for (int j = weight[i]; j <= W; ++j) {
        dp[j] = max(
            dp[j],
            dp[j - weight[i]] + value[i]
        );
    }
}

return dp[W];
```

为什么需要正序遍历? 就是因为物品可以选择多次。还是假设只有一个物品，重量为2，价值为5，背包容量为4

则 `dp[0] = 0`, `dp[1] = 0`, `dp[2] = dp[0]+5 = 5`, `dp[3] = dp[1]+5 = 5`, `dp[4] = dp[2]+5 = 10` 这样就实现了同一件物品选取多次

## 01背包的变种：要求总重正好等于 `W`

总重需要正好等于 `W` 而不是 `<=W`, 状态转移基本不变，但是除了容量0以外，其它状态不能初始化为 `0` 而是要初始化为 "不可能到达" （可以用负无穷来表示）

定义 `dp[i][j]` 为只考虑编号为 `0...i`的物品且总重正好等于 `j`时，可获得的最大价值。如果无法让总重恰好等于 `j` 则让值为 `-INF`.

首先初始化所有位置为 `-INF`, 不选择任何物品时总重正好为`0` --> `dp[0][0] = 0`

如果选择第`0`个物品，则`dp[0][weight[0]] = value[0]`

状态转移

- 不选择物品 `i` 则 `dp[i][j] = dp[i-1][j]`
- 选择物品 `i` 需要有前提，`j >= weight[i]` (装得下) 并且 `j-weight[i]` 这个重量可以恰好达到

```c++
// dp[n][W + 1]所有位置初始化为负无穷
dp[0][0] = 0;
if (weight[0] <= W) {
    dp[0][weight[0]] = value[0];
}

for (int i = 1; i < n; i++{
    for (int j = 0; j <= W; j--){
        // 不选择物品 i
        dp[i][j] = dp[i - 1][j];

        // 选择物品 i
        if (j >= weight[i] && p[i - 1][j - weight[i]] != -INF)
            dp[i][j] = max(
                dp[i][j],
                dp[i - 1][j - weight[i]] + value[i]
            );
        }
    }
}
         
// 输出结果
if (dp[n - 1][W] == -INF)
    // 无法使总重量正好等于 W
} else {
    return dp[n - 1][W];
}
```

简化成一维dp如下

```c++
// dp[W+1]
// 所有位置初始化为负无穷
dp[0] = 0;

for (int i = 0; i < n; i++) {
    for (int j = W; j >= weight[i]; j++) {
        if (dp[j - weight[i]] != -INF) {
            dp[j] = max(
                dp[j],
                dp[j - weight[i]] + value[i]
            );
        }
        else {} // 无法装第i件物品，保持值为负无穷不变，代表这个容量没有装
    }
}

if (dp[W] == -INF) {
    // 无法使总重量正好等于 W
} else {
    return dp[W];
}
```



## 01背包的变种：要求输出具体选择了哪些物品

思路：要求输出选择了哪些物品就不能用一维dp了，需要用二维dp反向还原出最有方案

二维dp计算完 `dp[n-1][W]` 后，从这个状态开始向前检查

- 对于物品 `i`，如果 `dp[i][j] == dp[i-1][j - weight[i]] + value[i]`, 则说明有一个最优方案选择了物品`i`, 记录下物品 `i`, 并且从剩余容量 `j-weight[i]` 继续向前寻找
- 最终需要单独判断第0件物品

```c++
int j = W;

for (int i = n - 1; i >= 1; --i) {
    if (j >= weight[i] && dp[i][j] == dp[i-1][j - weight[i]] + value[i]) {
        // 最优方案中选择了物品 i
        selected.push_back(i);
        j -= weight[i];
    }
}

// 单独判断第0件物品
if (j >= weight[0] && dp[0][j] == value[0]) {
    selected.push_back(0);
}
```

注意如果存在多种选法都能达到最优，上面的写法只会输出一种选法

## 01背包的变种：要求总重正好为 `W` ，问有多少种物品选法

思路：不再记录最大价值，而是记录恰好组成每个重量的方案数

定义 `dp[i][j]` 为只考虑编号为 `0...i` 的物品，总重量正好等于 `j` 的选法数量

初始化：所有`dp[xx][yy]`都为0

- 其中 `dp[0][0] = 1` (不选择任何物品时，总重正好为0，正好有一种方案，所以赋值 `1`)
- 如果第 `0` 个物品能够放入背包，则 `dp[0][weight[0]] = 1`
  - 注意如果物品重量有可能为0，则要把 `=1` 换成 `+=1`

对于物品 `i` 仍然有选或者不选两种选择

- 如果不选物品`i`, 则 `dp[i][j] = dp[i-1][j]`
- 如果选择物品 `i`, 则 `dp[i][j] = dp[i-1][j] + dp[i-1][j-weight[i]]` （不选的方法数量+选的方法数量）

二维dp写法

```c++
// dp[n][W + 1] 所有位置初始化为 0
dp[0][0] = 1;

if (weight[0] <= W) {
    dp[0][weight[0]] += 1;
}

for (int i = 1; i < n; ++i) {
    for (int j = 0; j <= W; ++j) {
        // 不选择物品 i
        dp[i][j] = dp[i - 1][j];

        // 选择物品 i
        if (j >= weight[i]) {
            dp[i][j] += dp[i - 1][j - weight[i]];
        }
    }
}

return dp[n - 1][W];
```

压缩成一维dp

```c++
// dp[W + 1] 所有位置初始化为 0

dp[0] = 1;

for (int i = 0; i < n; ++i) {
    for (int j = W; j >= weight[i]; --j) {
        dp[j] += dp[j - weight[i]];
    }
}

return dp[W];
```

