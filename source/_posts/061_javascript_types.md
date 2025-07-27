---
title: JavaScript中的所有类型(Primitive和Object)
date: 2025-07-26 14:58:56
tags:
- JavaScript
- Cross Platform
- nodejs
category: Frontend
description: "7种primitive原始类型，剩下的全是object对象类型。学了没用，建议写TypeScript避免大部分破事"
---

## JavaScript Primitive

Primitive (primitive value, primitive data type) 原始类型，一共有7种

Primitive的定义：不是 `object`, 并且没有methods和properties (没有方法，没有属性)

- string
- number
- bigint
- boolean
- undefined
- symbol
- null

Primitive都为immutable，不能更改（只能给变量重新赋值，指将另一个primitive value赋值给一个variable，在这个过程中primitive value本身仍然是不可变的）

除了`null`和`undefined`外，所有primitive type都有它们各自的object wrapper type

除了`null`外，所有primitive type都可以使用`typeof`操作符来判断类型 （但`typeof null`会返回`'object'`）

| 原始类型 Primitive Type | `typeof` 操作符的返回值 | Object wrapper 类型                                          |
| :---------------------- | :---------------------- | :----------------------------------------------------------- |
| Null                    | `"object"`              | 没有                                                         |
| Undefined               | `"undefined"`           | 没有                                                         |
| Boolean                 | `"boolean"`             | [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) |
| Number                  | `"number"`              | [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) |
| BigInt                  | `"bigint"`              | [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) |
| String                  | `"string"`              | [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Symbol                  | `"symbol"`              | [`Symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) |

Primitive没有methods，但如果访问一个primitive的property或methods，JavaScript会自动wrap进一个它的object wrapper里，并调用object的方法。

例如:

```javascript
"foo".includes("f")  // returns true
```

JavaScript自动做的事情是

```javascript
(new String("foo")).includes("f")  // String.prototype.includes()
```

## JavaScript's 7 Primitive Types + 1 Object Type

- `Null` 类型: 只有一个值: `null`

- `Undefined` 类型: 只有一个值 `undefined`.
  - 语义上 `undefined` 通常表示值的缺失，`null`表示object的缺失，可以算作`typeof null === 'object'`的借口
    - 实际上 `typeof null === 'object'` 是历史原因，是设计缺陷。参考: [mdn web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#typeof_null)
  - 一些场合下，JavaScript会自动赋值`undefined`: 函数传参没传、object的属性找不到(例如 `obj.dontexist`)、函数不给返回值直接`return;`、声明变量不初始化(例如`let x;`)、许多方法未找到值 (例如`Array.prototype.find()`)
  
- `Number` 类型：双精度64bit的IEEE754浮点数
  
  - 忘了IEEE754的话回去看ShanghaiTech CS110：{% post_link 29_cs110 链接 %} --> Lecture 7
  - 能够表示的**正数**浮点数范围为 `Number.MIN_VALUE` 到 `Number.MAX_VALUE` (约为5e-324 到 1.79e308)
  - 能够精确表示的**整数**范围为 `Number.MIN_SAFE_INTEGER` 到 `Number.MAX_SAFE_INTEGER` ( $-(2^{53}-1)$ 到 $2^{53}-1$ )
  - 大于`Number.MAX_VALUE`或小于 `-Number.MIN_VALUE` 的数会被转换为 `Number.POSITIVE_INFINITY` 和 `Number.NEGATIVE_INFINITY`
  - 小于`Number.MIN_VALUE`的正数，或大于 `-Number.MIN_VALUE`的负数，会被转换为 `0`和 `-0`
  
- `BigInt` 类型

  - 可以表示任意大小的正数Integer，大于 `Number.MAX_SAFE_INTEGER` 也可以

  - 用数字+后缀 `n`表示，或使用 `BigInt(数字)`表示（不要使用`new` 操作符）, 例如 

    ```javascript
    const a = 9007199254740991n;
    const b = BigInt(9007199254740991);
    ```

  - 支持大部分操作符：`+`, `-`, `*`, `/`, `%`, `**`, `>>`, `<<`, `&`, `|`, `^`, `~`, `-`, `++`, `--`。但是通常这些操作符要求左右两边类型相同，要么都是BigInt，要么都是Number或其它

- `String` 类型

  - UTF-16编码的字符串，是一个16-bit unsigned integer值组成的sequence

- `Symbol` 类型
  - 这个是ES6新增的原始类型
  - 是唯一不可变的primitive类型. 

- `Object` 类型

  - 除原始类型外，所有 JavaScript 值均为Object对象
    - 普通对象、数组、函数、`Date`, `RegExp`, `Map`, `Set` 等都是对象

  - 对象是键值对的组合，这里的“键”通常为 `string` 字符串，也可以是 `Symbol`
  - 关于 `Object` 的 data property和 accessor property 可参考另一篇post: {% post_link 49_js_accessor_property 49_js_accessor_property %}
  - `typeof` object 返回值均为 `'object'`, 但有一个例外，`typeof function` 返回值为 `'function'`

## Type coercion 奇奇怪怪的类型转换

- 首先，使用 `==` 比较两个object，只比较的是它们是否指向同一个对象，否则一律为 `false`. 有点类似于Python3中的 `is` 操作符

- object不会被coerce，只有primitive types能被coerce

  - 如果需要对object进行 `coerce`, 则需要先将这个object转为primitive type（例如转string），然后如果仍需coerce，则再对primitive type做coerce操作

- object转为primitive type的过程如下，依次进行

  - (ES6新增) 先调用 `obj[Symbol.toPrimitive]()` 方法，如果返回值为primitive则结束，否则继续下面的尝试
  - 先调用 `obj.valueOf()`, 如果返回值为primitive则结束，否则继续
  - 再调用 `obj.toString()`, 如果返回值为primitive则结束，否则继续
  - 仍然不行则 `throw TypeError`

- 对于大部分object，`toString()` 方法会返回 `[object ObjectName]`, 但是有一些例外，例如

  - 函数function的`toString()` 会返回函数体代码本身，如果函数为内置函数则返回 `function funcName(){[native code]}` 例如

    ```javascript
    function foo(x) { return x * 2; }
    console.log(foo.toString());  // "function foo(x) { return x * 2; }"
    
    console.log(Math.max.toString());  // "function max() { [native code] }"
    ```

  - 数组Array的`toString()` 会返回其所有值使用逗号`,`join起来的结果，例如

    ```javascript
    console.log([1, {}, 3].toString());  // "1,[object Object],3"
    ```

  - Date对象的 `toString()` 返回值为locale time，例如

    ```javascript
    console.log(new Date('2011-04-05T14:19:19Z').toString());
    // Tue Apr 05 2011 10:19:19 GMT-0400 (Eastern Daylight Time)"
    ```

  - Error对象

    ```javascript
    console.log(new Error('Oops!').toString());  // "Error: Oops!"
    ```

  - Symbol类型

    ```javascript
    const sym = Symbol('id');
    console.log(sym.toString());  // "Symbol(id)"
    ```

  - 除此之外，大部分object仍然继承自 `Object.prototype.toString`, 输出格式为 `'[object Type]'`

    ```javascript
    console.log(({}).toString());         // "[object Object]"
    console.log((new Map()).toString());  // "[object Map]"
    ```

- 转为primitive之后，需要考虑的事情就变成了primitive如何互相比较或操作
- 加号 `+` operator: 
  - 如果表达式为 `+value`, 则永远会将`value`给coerce成一个 `number` 类型
  - 如果表达式为 `anything + string`, 则永远会把 `anything` 给coerce成`string`类型，再拼接字符串
  - 除此之外，为数字相加
- 如果表达式需要布尔值 （例如 `if(value)`, `!value`, `!!value`），则会coerce成 `boolean` 类型
  - Coerce成 `boolean` 的规则: `null`, `undefined`, `0`, `-0`, `''`空字符串, `false`, 转换成布尔会变成 `false`, 其余所有东西转换成布尔都是 `true`
- 其它coerce primitive values的规则
  - number转string: 数值的字符串表达式，可能会使用科学技术法表示。参考 `Number.toString()`
  - string转number: 如果string表达的是有效数字（包括科学技术法、16/8/2进制等），则转换为对应的number，否则转为 `NaN`
  - boolean转number: `true` 转为 `1`, `false` 转为 `0`
  - null 和 undefined 转 number 分别为 `0`, `NaN`  （注意 `null` 是 `0` 不是 `NaN` !!!）
  - null 和 undefined 转 string 分别为 `'null'`, `'undefined'`

- 类型转换的例子

  - ```javascript
    console.log(undefined + [])  // 'undefined'
    ```

    加号左边`undefined` 是原始类型，`[]`空数组是一个object。所以需要先将空数组 `[]` 转为原始类型。按照固定的依次顺序进行转换：

    `[][Symbol.toPrimitive]`为 `undefined` 无法调用

    `[].valueOf()` 返回值为空数组 `[]` 本身，仍是object，不是primitive类型

    `[].toString()` 返回值为空字符串 `''`, 空字符串是 `string` 类型，是基本类型，完成

    现在要将 `undefined` 和空字符串 `''` 相加，任何值跟string相加都要先转为 string, 而基本类型 `undefined` 转为string的值即为字符串 `'undefined'`

    因此 `undefined + []` 即为 `'undefined' + ''`, 字符串拼接结果为 `'undefined'`

  - ```javascript
    console.log([] + {})  // '[object Object]'
    ```

    加号左右两边的 `[]` 和 `{}` 都是object，都需要转换成原始类型

    上面的例子说过空数组 `[]` 转原始类型为字符串 `''`。而 `{}` 转原始类型过程如下

    `({})[Symbol.toPrimitive]` 为 `undefined` 无法调用

    `({}).valueOf()` 返回值为对象 `{}` 本身，仍是object，不是primitive类型

    `({}).toString()` 返回值为字符串 `'[object Object]'`

    将字符串 `''`与字符串 `'[object Object]'` 相拼接，结果为字符串 `'[object Object]'`

