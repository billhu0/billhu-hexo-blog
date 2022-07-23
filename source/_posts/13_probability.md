---
title: "[Lecture Notes] SI140 Probability and statistics"
date: 2022-01-21 17:12:41
description: Probability & statistics (概率论与数理统计) lecture notes, SI140/Math1212
categories:
- Lecture Notes
tags:
- Math
- Probability
- Lecture Notes
math: true
---

## **Typical distributions**  

<div class="note note-success">
<p>表中的mean就是expectation</p>
</div>


#### Discrete distributions  离散型分布

| Name      | Param | PMF                                                 | Mean                   | Var                                                          |
| --------- | ------- | --------------------------------------------------- | ---------------------- | ------------------------------------------------------------ |
| Bernoulli 伯努利 | $p$     | $\cdots$                                            | $p$                    | $pq$                                                         |
| Binomial 二项 | $n,p$   | $\binom{n}{k}p^k q^{n-k}$                           | $np$                   | $npq$                                                        |
| FS 首次成功   | $p$     | $pq^{k-1}$                                          | $1/p$                  | $q/p^2$                                                      |
| Geom 几何   | $p$     | $pq^k$                                              | $q/p$                  | $q/p^2$                                                      |
| NBinom 负二项 | $r,p$   | $\binom{r+n-1}{r-1}p^rq^n$                          | $rq/p$                 | $rq/p^2$                                                     |
| HGeom 超几何 | $w,b,n$ | $\frac{\binom{w}{k}\binom{b}{n-k}}{\binom{w+b}{n}}$ | $\mu = \frac{nw}{w+b}$ | $\left(\frac{w+b-n}{w+b-1}\right)n\frac{\mu}{n}\left(1-\frac{\mu}{n}\right)$ |
| Poisson 泊松 | $\lambda$       | $\frac{e^{-\lambda}\lambda^k}{k!}$                          | $\lambda$             | $\lambda$                  |

#### Continous distributions  连续型分布

| Name         | Param           | PDF                                                         | Mean                  | Var                        |
| ------------ | --------------- | ----------------------------------------------------------- | --------------------- | -------------------------- |
| Uniform 均匀 | $a<b$           | $\frac{1}{b-a}$ for $x\in (a,b)$                            | $\frac{a+b}{2}$       | $\frac{(b-a)^2}{12}$       |
| Normal 正态  | $\mu, \sigma^2$ | $\frac{1}{\sigma \sqrt{2\pi} }e^{-(x-\mu)^2 / (2\sigma^2)}$ | $\mu$                 | $\sigma^2$                 |
| Expo 指数    | $\lambda$       | $\lambda e^{-\lambda x}$ for $x>0$                          | $1/\lambda$           | $1/\lambda^2$              |
| Gamma        | $a, \lambda$    | $\Gamma(a)^{-1} (\lambda x)^a e^{-\lambda x} x^{-1}$        | $a/\lambda$           | $a/\lambda^2$              |
| Beta         | $a,b$           | $\frac{\Gamma(a+b)}{\Gamma(a)\Gamma(b)}x^{a-1} (1-x)^{b-1}$ | $\mu = \frac{a}{a+b}$ | $\frac{\mu(1-\mu)}{a+b+1}$ |



## Lecture 2 : Conditional Probability

### 1. Definition & Intuition

- Definition of Conditional Probability 条件概率

$$
P(A\mid B) = \frac{P(A\cap B)}{P(B)}
$$

### 2. Bayes' Rule & LOTP

- Chain Rule 链式法则

  $$
  P(A_1, A_2) = P(A_1)P(A_2\mid A_1)
  $$
  
  $$
  P(A_1, \cdots, A_n) = P(A_1)P(A_2\mid A_1)P(A_3\mid A_1, A_2) \cdots P(A_n\mid A_1, \cdots, A_n-1)
  $$
- **Bayes' Rule 贝叶斯公式**
  $$
  P(A\mid B) = \frac{P(B\mid A)P(A)}{P(B)}
  $$

- The Law of Total Probability / **LOTP 全概率公式**

  Let $A_1, \cdots, A_n$ be a partition of sample space $S$, with $P(A_i)>0$
  $$
  P(B) = \sum_{i=1}^{n} P(B\mid A_i)P(A_i)
  $$
  
- Inference & Bayes' Rule （其实就是把LOTP和贝叶斯公式套一起）

$$
P(A_i\mid B) = \frac{P(A_i)P(B\mid A_i)}{P(A_1)P(B\mid A_1) + \cdots + P(A_n)P(B\mid A_n)}
$$

### 3. Conditional Probabilities are Probabilities

- **所有条件概率都是概率**，也就是说条件概率也满足所有概率的性质，比如可以把上面公式中的普通概率$P(.)$用条件概率$P(.\mid E)$代替，就能得到一些新的东西

- Bayes' Rule with extra conditioning

$$
P(A\mid B, E) = \frac{P(B\mid A, E)P(A\mid E)}{P(B\mid E)}
$$

- LOTP with extra conditioning

$$
P(B\mid E) = \sum_{i=1}^{n} P(B\mid A_i, E)P(A_i, E)
$$

### 4. Independence of Events

- Independence of two events 两个事件的**独立性**：

  ​	Events $A$ and $B$ are independent if 

$$
P(A\cap B) = P(A)P(B)
$$

​			If $P(A)>0$ and $P(B)>0$, this is equivalent to 
$$
P(A\mid B) = P(A), P(B\mid A)=P(B)
$$



## Lecture 3 4 5 unfinished

<div class="note note-success">
<p>Nothing here</p>
</div>

## Lecture 6: Joint Distributions

### **Covariance** 

**Definition**
$$
    \mathrm{Cov}(x,y) = E((X-EX)(Y-EY)) = E(XY) - E(X)E(Y)
$$

**Properties**

- $Cov(X,X) = Var(X)$

- $Cov(X,Y) = Cov(Y,X)$

- $Cov(X,c) = 0$ 

- $Cov(aX, Y) = a \cdot Cov(X,Y)$ 

- $Cov(X+Y,Z) = Cov(X,Z)+ Cov(Y,Z)$

- $Cov(X+Y, Z+W) = Cov(X,Z) + Cov(X,W) + Cov(Y,Z) + Cov(Y,W)$

- $Var(X+Y) = Var(X) + Var(Y) + 2Cov(X,Y)$

- For $n$ r.v.s $X_1, \cdots, X_n$, 
  $$
  Var(X_1 + \cdots + X_n) = Var(X_1) + \cdots + Var(X_n) + 2 \sum_{i<j}Cov(X_i, Y_j)
  $$

### **Correlation**

**Definition**
$$
Corr(X,Y) = \frac{Cov(X,Y)}{\sqrt{Var(X)Var(Y)}}
$$

**Properties**
Theorem: 
$$
    Cov(X,Y) = 0 \mathrm{\ \ \ or\ \ \ } Corr(X,Y) = 0 \ \ \ \Rightarrow \ \ \ \mathrm{Uncorrelated}
$$

$$
\mathrm{Independent \ \ \ } \Rightarrow\ \ \ \mathrm{Uncorrelated}
$$

$$
-1 \leq Corr(X,Y) \leq 1
$$

### Multinomial Distribution

**Multinomial Joint PMF**: $X\sim Mult_k(n, p)$, then the joint PMF is 
$$
P(X_1=n_1, \cdots, X_k=n_k) = \frac{n!}{n_1!n_2!\cdots n_k!}p_1^{n_1}\cdots p_k^{n_k}
$$
for $n_1 + \cdots + n_k = n$

**Multinomial Marginal**: 
$$
X\sim Mult_k(n,p) \mathrm{\ \ \Rightarrow\ \ } X_j \sim Bin(n, p_j)
$$



### Multivariate Normal Distribution (多元正态分布 MVN)

**Definition**: A random vector $X=(X_1, \cdots, X_k)$ is said to have a MVN distribution if every linear conbination of $X_j$ has a normal distribution. 

That is, $t_1 X_1 + \cdots + t_k X_k$ have normal distribution for any choice of constants $t_1, \cdots, t_k$.

When $k=2$, **Bivariate Normal (二元正态分布 BVN)**

**Theorem**: If $(X_1, X_2, X_3)$ is MVN, then $(X_1, X_2)$ is MVN

**Theorem**: 

.......




## Lecture 7: Transformations

### 1. Change of variables 

#### 已知 $X$ 的PDF，求 $g(X)$ 的PDF

Let $X$ be a continous r.v. with PDF $f_X$, let $Y=g(X)$ ( $g$ 可导且严格单调递增/递减), then the PDF of $Y$ is 
$$
f_Y(y) = f_X(x) \left\lvert \frac{\mathrm{d}x}{\mathrm{d}y} \right\rvert 
$$

#### Jacobi行列式

Let $X=(X_1, \cdots, X_n)$ be a continous random vector with joint PDF $f_X(x)$, and let $Y=g(X)$ where $g$ is an invertible function. $y=g(x)$ and $\frac{\partial x_i}{\partial y_i}$ exists.

**Jacobi**
$$
\frac{\partial x}{\partial y} =
    \begin{pmatrix}
        \frac{\partial x_1}{\partial y_1} &
        \frac{\partial x_1}{\partial y_2} & 
        \cdots &
        \frac{\partial x_1}{\partial y_n}\\
        \vdots & \vdots &  & \vdots\\
        \frac{\partial x_n}{\partial y_1} &
        \frac{\partial x_n}{\partial y_2} &
        \cdots &
        \frac{\partial x_n}{\partial y_n}
    \end{pmatrix}
$$
Then the joint PDF of $Y$ is 
$$
    f_Y(y) = f_X(x) \left\lvert \frac{\partial x}{\partial y} \right\rvert
$$

### 2. Convolutions 卷积

#### Convolution sums and integrals 两个随机变量之和的分布

**Theorem**: $X,Y$ independent, discrete, $T=X+Y$ PMF is (独立，离散，加起来的PMF是)
$$
\begin{aligned}
    P(T=t) &= \sum_x P(Y=t-x)P(X=x)\\
    &= \sum_y P(X=t-y)P(Y=y)
\end{aligned}
$$

**Theorem**: $X,Y$ independent, continous, $T=X+Y$ PDF is (独立，连续，加起来的PDF是)
$$
\begin{aligned}
    f_T(t) &= \int_{-\infty}^{\infty} f_Y(t-x)f_X(x)dx\\
    &= \int_{-\infty}^{\infty} f_X(t-y)f_Y(y)dy
\end{aligned}
$$

### 3. Order statistics 顺序统计量

**CDF & PDF of order statistics 顺序统计量的PDF和CDF**:
Let $X_1, \cdots, X_n$ be i.i.d continous r.v.s with CDF $F$, PDF $f$, then the PDF and CDF of $X_{(j)}$ is 
$$
    P(X_{(j)}\leq x) = \sum_{k=j}^{n} \binom{n}{k} F(x)^k (1-F(X))^{n-k}
$$

$$
f_{X_{(j)}}(x) = n \binom{n-1}{j-1} f(x) F(x)^{j-1} (1-F(x))^{n-j}
$$

**Joint PDF 顺序统计量的联合分布**: ($x_1 < x_2 < \cdots < x_n$)
$$
    f_{X_{(1)}, X_{(2)},\cdots, X_{(n)}}(x_1, \cdots, x_n) = n! \prod_{i=1}^{n} f(X_i) 
$$

**Related Indentity 离散与连续中的恒等式**

Theorem: For $0<p<1$, nonnegative integer $k$, 
$$
    \sum_{j=0}^{k} \binom{n}{j} p^j (1-p)^{n-j} = 
    \frac{n!}{k! (n-k-1)!}\int_p^1 x^k (1-x)^{n-k-1} dx
$$

### 4. Beta distribution

#### Beta分布

- **$X\sim Beta(a,b)$** ($a>0, b>0$)
- **PDF**: (for $0<x<1$)

$$
f(x) = \frac{1}{\beta(a,b)} x^{a-1} (1-x)^{b-1}
$$

- **Beta function**: 

$$
\beta(a,b) = \int_{0}^{1} x^{a-1} (1-x)^{b-1}dx
$$

$$
\beta(a,b) = \frac{(a-1)!(b-1)!}{(a+b-1)!} = \frac{\Gamma(a)\Gamma(b)}{\Gamma(a+b)}
$$

#### Story: Bayes' billiards 

$$
\int_0^1 \binom{n}{k} x^k (1-x)^{n-k} dx = \frac{1}{n+1}
$$

for any integer $k$ and $n$ with $0\leq k \leq n$

#### Story: Beta-binomial conjugacy 共轭

$n$ tosses, $k$ of $n$ tosses lands heads, what is the estimator of $\hat{p}$? 

设先验分布为 $p\sim Beta(a,b)$ ，则后验分布为 $p\sim Beta(a+k, b+n-k)$，期望 $E(p) = \frac{a+k}{b+n-k}$.

如果先验分布是beta，且data是条件二项分布 given $p$，那么后验分布也是beta，称 beta是binomial的 共轭先验 conjugate prior.

### 5. Gamma distribution 

#### gamma function $\Gamma(.)$

For $a>0$, 
$$
\Gamma(a) = \int_0^\infty x^{a-1} e^{-x} dx 
$$

Properties:

- $\Gamma(a+1) = a\Gamma(a)$  ($a>0$)
- $\Gamma(n) = (n-1)!$    ($a$正整数)

#### Gamma distribution 

- $Y\sim Gamma(a, \lambda)$ ($a>0$, $\lambda>0$)
- **PDF**

$$
f(y) = \frac{1}{\Gamma(a)} (\lambda y)^a e^{-\lambda y} \frac{1}{y}
$$

- **Gamma分布是指数分布的推广**

$$
Gamma(1, \lambda) = Expo(\lambda)
$$

- **Moments of gamma distribution**:

  - $X\sim Gamma(a, 1)$

    $E(X) = a, E(X^2) = a(a+1), Var(X) = a$

  - $Y = \frac{X}{\lambda} \sim Gamma(a, \lambda)$

    $E(Y) = \frac{a}{\lambda}, Var(Y) = \frac{a}{\lambda^2}$

**Gamma: convolution of exponential**:

$X_1, \cdots, X_n$ be i.i.d $Expo(\lambda)$, then $X_1 + \cdots + X_n \sim Gamma(n, \lambda)$

Gamma分布可以看做n个指数分布的卷积/叠加

**Beta-Gamma connection (bank-post office story)**:

independent $X\sim Gamma(a, \lambda)$, $Y\sim (b, \lambda)$, then 

$$
\begin{aligned}
    X+Y &\sim Gamma(a+b, \lambda)\\
    \frac{X}{X+Y} &\sim Beta(a, b)
\end{aligned}
$$

and they are independent.

## Lecture 8: Bayesian Statistical Inference

### Bayesian statictics 

#### General LOTP

| .                            | .                                                            |
| ---------------------------- | ------------------------------------------------------------ |
| $X$ discrete, $Y$ discrete   | $P(X=x) = \sum_y P(X=x\mid Y=y) P(Y=y)$                      |
| $X$ discrete, $Y$ continous  | $P(X=x) = \int_{-\infty}^{\infty} P(X=x\mid Y=y) f_Y(y) dy$  |
| $X$ continous, $Y$ discrete  | $f_X(x) = \sum_y f_X(x\mid Y=y) P(Y=y)$                      |
| $X$ continous, $Y$ continous | $f_X(x) = \int_{-\infty}^{\infty} f_{X\mid Y} (x\mid y) f_Y(y) dy$ |

#### General Bayes Rule

| .                            | .                                                            |
| ---------------------------- | ------------------------------------------------------------ |
| $X$ discrete, $Y$ discrete   | $P(Y=y\mid X=x) = \frac{P(X=x\mid Y=y)P(Y=y)}{P(X=x)}$       |
| $X$ discrete, $Y$ continous  | $f_Y(y\mid X=x) = \frac{P(X=x\mid Y=y)f_Y(y)}{P(X=x)}$       |
| $X$ continous, $Y$ discrete  | $P(Y=y\mid X=x) = \frac{f_X(x\mid Y=y)P(Y=y)}{f_X(x)}$       |
| $X$ continous, $Y$ continous | $f_{Y\mid X} (y\mid x) = \frac{f_{X\mid Y}(x\mid y) f_Y(y)}{f_X(x)}$ |


#### MAP (Maximum A Posterior Probability)

Given the observation value x, the MAP rule selects a value $\hat{\theta}$ that maximizes over $\theta$ the posterior distribution $p_{\Theta\mid X} (\theta\mid x)$ or $f_{\Theta\mid X} (\theta\mid x)$

### 3. Conditional expectation 

#### Definition

**Conditional expectation given an event**: 
$$
    E(Y\mid A) = \sum_y y P(Y=y\mid A)\\
    E(Y\mid A) = \int_{-\infty}^{\infty} y f(y\mid A) dy
$$
在测试足够多时， $E(Y\mid A)$近似为$Y$ 的平均值

**LOTE** (law of total expectation)
$$
    E(Y) = \sum_{i=1}^{n} E(Y\mid A_i) P(A_i)
$$

Definition: **Conditional expectation given an r.v**
$$
g(x) = E(Y\mid X=x)
$$
$E(Y\mid X)$ is a function of $X$, and it it also a random variable. 

#### Properties

- **Dropping what's independent**:

  If $X$ and $Y$ are independent, $E(Y\mid X) = E(Y)$

- **Taking out what's known**:

  For any function $h$, $E(h(X)Y\mid X) = h(X) E(Y\mid X)$

- **Linearity: 线性性**

  $E(Y_1 + Y_2\mid X) = E(Y_1\mid X) + E(Y_2 \mid X)$

- **Adam's Law: 亚当定理 “套娃定理”**

  $E(E(Y\mid X)) = E(Y)$

- **Adam's Law with extra conditioning:**

  $E(E(Y\mid X, Z)\mid Z) = E(Y\mid Z)$

  $E(E(X\mid Z, Y)\mid Y) = E(X\mid Y)$

#### Conditional Variance 

$Var(Y\mid X) = E[(Y-E(Y\mid X))^2\mid X]$

$Var(Y\mid X) = E(Y^2\mid X) - (E(Y\mid X))^2$

##### Eve's Law / EVVE

$Var(Y) = E(Var(Y\mid X)) + Var(E(Y\mid X))$


### 4. Prediction and estimation 

#### Linear Regression

The linear regression model uses a single explanatory variable $X$ to predict a responce variable $Y$, and it assumes that the conditional expectation of $Y$ is linear in $X$: $E(Y\mid X) = a+bX$. 

An equivalent way to express this is to write: $Y=a+bX+\epsilon$.
$$
\begin{cases}
    a = E(Y) - bE(X) = E(Y) - \frac{Cov(X,Y)}{Var(X)}\cdot E(X) \\
    b = \frac{Cov(X,Y)}{Var(X)}
\end{cases}
$$

#### LLSE / Linear Least Square Estimate 

The LLSE of $Y$ given $X$, denoted by $L[Y\mid X]$, is the linear function $a+bX$ that minimizes $E[(Y-a-bX)^2]$. In fact, 
$$
    L[Y\mid X] = E(Y) + \frac{Cov(X,Y)}{Var(X)} (X-E(X))
$$

#### MMSE / Minimum Mean Square Error Estimator 

The MMSE of $Y$ given $X$ is given by 
$$
    g(X) = E(Y\mid X)
$$

#### Projection Interpretation / Geometric perspectve 

$Y-E(Y\mid X) \bot h(X)$

$E((Y-E(Y\mid X)) \cdot h(X)) = 0$

#### Orthoginality Property of MMSE

**Theorem**: 

(a) For any function $\phi(.)$ , $E((Y-E(Y\mid X)) \cdot \phi(X)) = 0$

(b) Moreover, if the function $g(X)$ is such that $E((Y-g(X)) \cdot h(X)) = 0$ for any $\phi$, then $g(X) = E(Y\mid X)$

#### MMSE for jointly gaussian random variables 

**Theorem**: Let $X$, $Y$ be jointly Gaussian random variables, Then 
$$
E[Y\mid X] = L[Y\mid X] = E(Y) + \frac{Cov(X,Y)}{Var(X)} (X-E(X))
$$


## Lecture 9: Classical Statistical Inference 经典统计推断

### 1. Inference Rule: MLE / Maximum likelihood estimation 最大似然估值

#### MLE

- MLE估值就是 使得给定数据的联合分布概率最大: 
  $\hat{\theta_n} = arg \max_{\theta} P_X(x_1, \cdots, x_n; \theta)$

#### MLE under Independent case (在独立的条件下，MLE会更方便计算)

- Observations $X_i$ are independent. We observe $x = (x_1, \cdots, x_n)$.
- **Log-likelihood function**:

$$
    \log\left[P_X(x_1, \cdots, x_n;\theta)\right]
    = \log \prod_{i=1}^{n} P_{X_i} (x_i;\theta) = \sum_{i=1}^{n} \log\left[ P_{X_i}(x_i;\theta) \right]\\
    \log\left[f_X(x_1, \cdots, x_n;\theta)\right]
    = \log \prod_{i=1}^{n} f_{X_i} (x_i;\theta) = \sum_{i=1}^{n} \log\left[ f_{X_i}(x_i;\theta) \right]
$$

- MLE under independent case :

$$
    \hat{\theta_n} = arg\max_{\theta} \sum_{i=1}^{n} \log\left[P_{X_i}(x_i;\theta)  \right]\\
    \hat{\theta_n} = arg\max_{\theta} \sum_{i=1}^{n} \log\left[f_{X_i}(x_i;\theta  \right]
$$

### 3. Central Limit Theorem 中心极限定理

#### Central Limit Theorem

- As $n\sim \infty$, 

$$
\sqrt{n} \left(\frac{\overline{X_n} - \mu}{\sigma}  \right) \to \mathcal{N}(0,1)
$$

in distribution. In words, the CDF of the left-hand side approaches the CDF of the standard normal distribution.

#### CLT approximation

- For large $n$, the distribution of $\overline{X_n}$ is approximately $\mathcal{N}(\mu,\sigma^2)$.
- For large $n$, the distribution of $n\overline{X_n}$ is approximately $\mathcal{N}(n\mu,n\sigma^2)$.
- （也就是说，n很大的时候，不管$X_n$原来是什么分布，$\overline{X_n}$都能用正态分布来近似）

**Poisson convergence to normal**

Let $Y\sim Pois(n)$. We can consider it to be a sum of $n$ i.i.d $Pois(1)$. Therefore for large $n$, $Y\sim \mathcal{N}(n,n)$

**Gamma convergence to normal**

Let $Y\sim Gamma(n, \lambda)$. We can consider it to be a sum of $n$ i.i.d $Expo(\lambda)$. Therefore for large $n$, $Y\sim \mathcal{N}(\frac{n}{\lambda}, \frac{n}{\lambda^2})$

**Binomial convergence to normal**

Let $Y\sim Bin(n,p)$. We can consider it to be a sum of $n$ i.i.d $Bern(p)$. Therefore for large $n$, $Y\sim \mathcal{N}(np, np(1-p))$

#### Continuity Correction 连续性修正: De Moivre-Laplace Approximation

$$
\begin{aligned}
    P(Y=k) &= P(k-\frac{1}{2} < Y < k+\frac{1}{2})\\
    &\approx \phi(\frac{k + \frac{1}{2} - np}{\sqrt{np(1-p)}}) 
    - \phi(\frac{k - \frac{1}{2} - np}{\sqrt{np(1-p)}}) 
\end{aligned}
$$

$$
\begin{aligned}
    P(k\leq Y\leq I) &= P(k-\frac{1}{2} < Y < I+\frac{1}{2})\\
    &\approx \phi(\frac{I + \frac{1}{2} - np}{\sqrt{np(1-p)}}) 
    - \phi(\frac{k - \frac{1}{2} - np}{\sqrt{np(1-p)}}) 
\end{aligned}
$$

### 4. Confidence Interval 


## Lecture 10: Monte Carlo Statistical Methods 

### 2. Law of large numbers 大数定理

#### Recall: Sample Mean

- Let $X_1, \cdots, X_n$ be i.i.d r.v.s with mean $\mu$ and variance $\sigma^2$. The sample mean $\overline{X_n} = \frac{1}{n}\sum_{j=1}^n X_j$ itself is an r.v. with mean $\mu$ and variance $\sigma^2 / n$.

- 算术平均它自己也是一个随机变量，当n趋近于无穷大时，方差趋于零

#### Strong Law of Large Numbers 强大数定理 / SLLN

- The sample mean $\overline{X_n}$ converges to the true mean $\mu$ pointwise as $n\to\infty$ with probability $1$. In other words, the event $\overline{X_n}\to\mu$ has probability $1$.

#### Weak Law of Large Numbers 弱大数定理 / WLLN

- For all $\epsilon > 0$, $P(\lvert \overline{X_n} - \mu \rvert > \epsilon) \to 0$ as $n\to\infty$.

### 3. Non-asymptotic Analysis: Inequalities 非渐进分析

#### Cauchy-Schwarz Inequality 

- For any r.v.s $X,Y$ with finite variances, 

$$
\lvert E(XY)\rvert \leq \sqrt{E(X^2)E(Y^2)}
$$

#### Second Moment Method 二阶矩

- Let $X$ be 非负rv, then 

$$
P(X=0)\leq \frac{Var(X)}{E(X^2)}
$$

#### Jensen's Inequality 

- If $f$ is a convex function (凸函数，二阶导大于零), $0\leq \lambda_1, \lambda_2 \leq 1, \lambda_1 + \lambda_2 = 1$, then for any $x_1, x_2$, 

$$
    f(\lambda_1 x_1 + \lambda_2 x_2) \leq \lambda_1 f(x_1) + \lambda_2 f(x_2)
$$

- Let $X$ be an r.v. If $g$ is a convex function, then $E(g(x))\geq g(E(X))$. If $g$ is a concave function, then $E(g(x))\leq g(E(X))$.  当且仅当$g(X) = a+bX$时取等号.

#### Entropy

- X is discrete r.v. The entropy of $X$ is 

$$
H(X) = \sum_{j=1}^{n} p_j \log_2 (\frac{1}{p_j})
$$

- 用Jensen不等式证明，当X是uniform的时候熵最大

