---
title: Kotlin basics (vs Java)
date: 2025-06-15 11:30:03
tags:
- Cross Platform
- Java
- Kotlin
categories:
- Cross Platform
- "Java & Kotlin"
description: "Kotlin isn't just a Syntactic Sugar for Jvav!"
---

# Java vs Kotlin

{% note info%}

Kotlin is not just Java - only **Kotlin/JVM** is mentioned in this blog post. 

But keep in mind, there's also **Kotlin/Native**, **Kotlin/Wasm** (webassembly) and **Kotlin/JS**

{% endnote %}

## main function

**Java**: `public static void main`

```java
public class Main {
	public static void main(String[] args) {
		System.out.println("Hello world");
	}
}
```

**Java** in JDK 21 preview feature: 简化了main函数写法, 可以省去explicitly声明class的步骤, 可以省去`public`和`static`

```java
void main(String[] args) {
	System.out.println("Hello world");
}
```

**Kotlin**

```kotlin
fun main(args: Array<String>) {
	print("Hello world")
}
```

## Class constructor

**Kotlin**: 自动生成all-args constructor和getter

```kotlin
class Person(val name: String, val age: Int)
```

Equivalent to **Java**

```java
class Person {
	private final String name;
	private final int age;

	public Person(final String name, final int age) {
		this.name = name;
		this.age = age;
	}

	String getName() { return name; }
	int getAge() { return age; }
}
```

**Kotlin**: 如果是`var`而非`val`, 则会自动生成getter和setter

```kotlin
class Person(var name: String, var age: Int)
```

Equivalent to Java

```java
class Person {
	private String name;
	private int age;
  
	public Person(final String name, final int age) {
		this.name = name;
		this.age = age;
	}
  
	String getName() { return name; }
	void setName(String name) { this.name = name; }
	int getAge() { return age; }
	void setAge(int age) { this.age = age; }
}
```



## Data class

Data class除了拥有上述的自动生成constructor, getter, setter的功能外,还能生成`toString()`, `hashcode`, `equals`, `componentN`, `copy`方法

**Kotlin**

```kotlin
data class Person(val name: String, val age: Int)
```

以上kotlin代码完全等同于以下的java代码

- 自动生成构造函数, 且参数包含`@NotNull` annotation和`final`关键字, 代表常量
- 自动生成getter和setter. 由于以上使用 `val`, 所以只有getter没有setter
  - 使用kotlin则可以直接通过`p.name`访问, kotlin会自动转换成getter或setter的调用
  - 使用java则必须使用`p.getName()`才能访问
- 自动生成`toString()`, `hashcode`, `equals`
  - 如果不想使用kotlin自动生成的toString, 可以手动 `override fun toString(): String` 代替
- 自动生成`componentN()`方法用于解构赋值

**Java**

```java
class Person {
	private final String name;
	private final int age;
  
	public Person(@NotNull final String name, final int age) {
		this.name = name;
		this.age = age;
	}
	
	// getter (so setter here because fields are final)
	public String getName() { return name; }
	public int getAge() { return age; }
  
	// toString
	@Override
	public String toString() {
		return "Person(" + "name='" + name + ", age=" + age + ')';
	}
  
	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		Person person = (Person) o;
		return age == person.age && Objects.equals(name, person.name)
	}
}
```

如果使用Java+Lombok也有类似的功能

**Java + Lombok**

```java
import lombok.Data;
import lombok.NonNull;

@Data
public class Person {
	@NonNull
	private String name;
	private int age;
}

// lombok.Data will generate getters, setters, hashCode(), toString() and equals()
```

**Kotlin**

如果类的成员带上`@JvmField` 则不能自己定义getter和setter, 且不能设置为private

```kotlin
data class Person(val name: String, @JvmField val age: Int)
// If you access this class in Java, you will see: getName(), setName(), age
```

支持private

```kotlin
data class Person(private val name: String)
```

支持默认值

```kotlin
data class Person(private val name: String = "Default")
```

Don't forget Kotlin also supports 1 or more **`init` codeblock** and 1 or more **secondary constructor**

```kotlin
data class Person(val name: String, val age: Int) {
	init {
		println("Person created with name $name and age $age")
	}
	// secondary constructor
	constructor(name: String): this(name, 0)
}
```



## Methods

**Java**

```java
class Person {
	private String name;
	private int age;
	
	public void print() {
		System.out.println(name + " " + age);
	}
}
```

**Kotlin**

{% note success %}

Lambda函数不要写 `return` 关键词! 函数体内最后一个表达式的值即为返回值

{% endnote %}

- 函数是Kotlin的一等公民, 函数能够当作普通变量存储, 或作为参数传递

```kotlin
data class Person(val name: String, val age: Int) {
	fun print() = println("$name, $age")
}
```

- Lambda函数, 如果只有一个入参, 则可以用`it`代表之

  ```kotlin
  val lambda: (Int) -> Boolean = { num -> num % 2 == 0 }
  // can be simplified to:
  val lambda: (Int) -> Boolean = { it % 2 == 0 }
  ```

- Lambda函数本身是最后一个参数时, 可以移除括号

  ```kotlin
  listOf(1,2,3).filter({it % 2 == 0})
  // can be simplified to:
  listOf(1,2,3).filter{it % 2 == 0}
  ```


## kotlin Lambda, 函数, 匿名函数, 将函数作为参数

Kotlin中可以把函数作为参数传递

```kotlin
// @param
fun operate(x: Int, y: Int, operationFunc: (Int, Int) -> Int): Int {
    return operationFunc(x, y)
}

fun main() {
  
    // We can pass a lambda literal as an arg
    val sum: (Int, Int) -> Int = { a, b -> a + b}
    println(operate(10, 20, sum))  // prints 30

    // We can also pass a function reference
    fun multiply(a: Int, b: Int): Int {
        return a * b
    }
    println(operate(10, 20, ::multiply))  // prints 200
}
```

Java (Java8之前) 中不能把函数作为参数传递. 如果想要实现同样的功能, 只能**将函数包进对象**的`invoke`方法中, 再来传递这个对象.

```java
// Java: need to define a functional interface as a stand-in for "a function"
public interface Operation {
    int invoke(int a, int b);
}

public class Main {
    // The "operate" method takes an Operation object
    static int operate(int x, int y, Operation op) {
        return op.invoke(x, y);
    }

    public static void main(String[] args) {
        // Pre-Java8: use an anonymous class
        Operation sumOp = new Operation() {
            @Override
            public int invoke(int a, int b) {
                return a + b;
            }
        };
        System.out.println( operate(10, 20, sumOp) );  // prints 30
    }
}
```

Kotlin底层使用类似的原理, 实际上kotlin只是提供了“语法糖”, 当你在kotlin中使用函数作为参数传递时, 传递的其实是一个带有`invoke`方法的对象.

Kotlin的底层使用类似的原理, 仍然只有对象才能作为args传递. 如果想将函数作为arg传递, 需要使用双冒号 `::`代表 **function reference**, 代表把一个函数封起来变成一个对象

```kotlin
fun multiply(a: Int, b: Int): Int {
  return a * b
}
println(operate(10, 20, multiply))  // ❌编译错误, 不可以这么写
println(operate(10, 20, ::multiply))  // ✅可以
```

只有对象才能赋值给一个变量. 函数仍然不可以赋值给变量

```kotlin
fun multiply(a: Int, b: Int): Int {
  return a * b
}
val a = multiply;    // ❌编译错误
val a = ::multiply;  // ✅可以
```

将`multiply`的function reference对象 `::multiply`赋值给变量 `a` 后, 就可以使用 `a(...args)` 调用这个函数了. 虽然看起来这个function reference可以直接使用`()`调用, 但jvm实际上执行的仍是对象的 `invoke` 方法.

```kotlin
fun multiply(a: Int, b: Int): Int {
  return a * b
}
val a = ::multiply;
println(a(10, 20))             // also prints 200. Actually calls a.invoke(10,20) underhood.
println(a.invoke(10, 20))      // also prints 200. Same as above
println(multiply(10, 20))      // prints 200.      Directly calls the "multiply" function
println(multiply.invoke(10, 20)) // ❌ The function itself doesn't have "invoke" method.
```

函数也可以作为匿名函数传递. **Kotlin中匿名函数不是函数, 是对象**, 所以才可以传递

```kotlin
println(operate(10, 20, fun(a: Int, b: Int): Int {
	return a * b;
}))  // prints 200
```

大多数情况下, 匿名函数还能再简化成lambda表达式的形式. 

再次注意: Lambda函数不要写 `return` 关键词! 函数体内最后一个表达式的值即为返回值.

```kotlin
println(operate(10, 20, {
    a: Int, b: Int -> a * b
}))  // prints 200
```

如果lambda是函数的最后一个参数, 那么可以把lambda写在函数的外面.  (事实上上面的代码会有同样的IDE提示: Lambda argument should be moved out of parentheses)

```kotlin
println(operate(10, 20) { a: Int, b: Int ->
    a * b
})  // prints 200
```

实际上, lambda函数的参数类型和返回值类型都可以省略. 

```kotlin
println(operate(10, 20) { a, b ->
    a * b
})  // prints 200
```

为什么可以不写? 因为上文`operate()`函数的定义已经有明确说明: 需要传入函数的参数和返回值类型为 `(Int, Int) -> Int)`

```kotlin
// operate()'s definition, mentioned above
fun operate(x: Int, y: Int, operationFunc: (Int, Int) -> Int): Int {
    return operationFunc(x, y)
}
```





## NullSatety

Kotlin has null-safety from language level.

```kotlin
val p: Person = Person("a", 2)  // ok
val p: Person = null            // compile error
val p: Person? = null           // ok
```

Kotlin has "?" chained safety

**Kotlin**

```kotlin
var maybeName: String? = "Bob"

var length: Int? = maybeName?.length
```

Equivalent to the following **Java** code

```java
int length = (maybeName != null) ? maybeName.length : null
```

**Kotlin**

```kotlin
var domain: String? = user?.profile?.email
```

Equivalent to the following **Java** code

```java
String domain = (user == null)? null :
	(user.profile == null)? null : user.profile.email
```

**Kotlin**

```kotlin
var domain: String = user?.profile?.email?: "no-domain.com"
```

Equivalent to the following **Java** code

```java
String domain = (user == null)? "no-domain.com" :
	(user.profile == null)? "no-domain.com" : 
	(user.profile.email == null)? "no-domain.com": user.profile.email
```

**Kotlin** Not-null assertion: will throw NullPointerException at runtime if the value is null

```kotlin
val sureName: String = maybeName!!
```

Equivalent to the following **Java** code

```java
String sureName;
if (maybeName != null) { sureName = maybeName; }
else {throw new NullPointerException(...); }
```

**Kotlin** safe cast with `as?`: Try to cast into the given type, or return null on failure. 

```kotlin
val obj: Any = "Hello"
val num: Int? = obj as? Int
```

Equivalent to the following **Java** code

```java
Object obj = "Hello";
Integer num = (obj instanceof Integer) ? (Integer) obj : null;
```





## Extension

Kotlin允许在不继承类的情况下, 为类扩展方法

例如: 在不拓展`String`类的情况下, 为其扩展`bold()`方法

Kotlin

```kotlin
fun String.bold(): String = "<b>$this</b>"

// usage:
val boldString = "hello world".bold()
```



## Inheritance

Kotlin默认所有class都继承自`Any`. `Any`类含有`equals()`, `hashCode()`, `toString()` 三个方法

Kotlin默认所有class都为final, 无法被继承. 如果想要class可以被继承, 则需添加`open`关键字

```kotlin
open class Base(p: Int)

class Derived(p: Int): Base(p)
```



## Equals

Kotlin中 `a == b` 相当于java中的 `a?.equals(b)?:(b===null)`

- 如果`a`不为空则等同于 `a.equals(b)`, 如果 `a` 为空则比较a和b是否同时为空

Kotlin中 `a === b` 用于比较两个对象是否是同一个instance (类似Python中的 `is` ). 对于primitive types (例如 `Int` 则相当于 `==`)



## Unit, Nothing, void, java.lang.Void

如果看到一个kotlin函数的返回值是`Unit` , 那么它代表 “no meaningful return value”, 大致相当于`void`, 但不等于 `void`

- **Java**中, `void` 不是类型 (代表它不是class, 不能赋值给任何变量...), 仅仅代表函数没有返回值

- **Kotlin**中, `Unit` 是一个类型, 也是一个**singleton object** (单例对象). 不写函数返回值时, kotlin编译器会隐式加上 `return Unit.INSTANCE`来返回一个 `Unit` 类型的对象

  ```kotlin
  fun sayHello() {
    println("Hello world")
  }
  
  // will be treated as
  fun sayHello(): Unit {
    println("Hello world")
    return Unit.INSTANCE
  }
  ```

- Kt和Java可以互相转化: Java中调用kotlin返回值为`Unit`的函数, 则会看到其返回值为`void`. Kotlin中调用java里`void`返回值的函数, 则会看到其返回 `Unit`.

`Void` 是java中的一个**class `java.lang.Void`**. 注意V是大写的.

- 在**java**中, `Void`是一个class, 但是它的constructor为private, 意味着它 **uninstantiable**, 你无法手动创建 `Void` 的实例, 除了 `null` 以外无法造出任何 `Void` 的值
- Kotlin中没有`Void`, Kotlin的`Void`即为`java.lang.Void`. 

`Nothing`

- Kotlin中有一个`class Nothing`, 跟`java.lang.Void`有些许类似: 它也拥有一个private的constructor, 意味着不可能创建出任何`Nothing`的实例. 但是`null`也不行 (注意`Nothing`和`Nothing?`的区别). 

  它的源码如下, 就一行. 

  ```kotlin
  public class Nothing private constructor()
  ```

  Nothing有什么作用? 

  - 当`Nothing`作为函数返回值时, 函数体内无法写任何`return`语句 (因为不可能创建出`Nothing`类的对象). 常用来给开发者/函数调用者一个提示, 代表这个函数只用来抛异常或这个函数是无限循环, 永远不会返回.

 

## Public, Protected, Private, Internal

Kotlin中对于top-level

- 不写则默认 `public`

- 标注 `private` 则仅当前文件可见

- 标注 `internal` 则同一个module下可见

- 不支持 `protected`

- e.g. 

  ```kotlin
  // file name: example.kt
  package foo
  
  fun foo() { ... }         // visible everywhere
  private fun foo() { ... } // visible only inside example.kt
  
  public var bar: Int = 5 // property is visible everywhere
      private set         // setter is visible only in example.kt
  
  internal val baz = 6    // visible only inside the same module
  ```

对于class的成员

- 不写则默认 `public `

- `protected`, `private` 与java中相同

- `internal` 代表同一个module下可见

- e.g.

  ```kotlin
  open class Outer {
      private val a = 1         // visible for only this class
      protected open val b = 2  // visible for subclasses
      internal open val c = 3   // visible for same module
      val d = 4                 // public by default
  
      protected class Nested {  // visible for subclasses
          public val e: Int = 5 // If "Nested" is visible, then this is visible
      }
  }
  
  class Subclass : Outer() {
      // a is not visible
      // b, c, d, Nested, e are visible
      override val b = 5   // 'b' is protected
      override val c = 7   // 'c' is internal
  }
  
  class Unrelated(o: Outer) {
      // o.a, o.b, o.Nested, o.Nested.e are not visible
      // o.c and o.d are visible (same module)
  }
  ```

  

## 泛型 <>

Java中不能将子类泛型对象赋值给父类的泛型类型声明. 例如以下代码是不允许的. 

```java
public class Child extends Parent {
  /* some code here */
}

List<Parent> list = new ArrayList<Child>();  // ❌ Compile Error
```

这是因为编译器会把不同类型的泛型当作互不相关的类型来处理, `List<Parent>` 和 `List<Child>` 是完全不相关的东西. 为了类型安全起见, 不能允许这种操作.

如果允许这种操作, 那么就可以往一个`List<Parent>`中加入一个`new Parent()` 父类对象, 而由于底层的存储实际上是`ArrayList<Child>`, 往`Child` 集合中加入非`Child`的对象就会导致运行时`ClassCastException`.

解决方法是

- **Covariant**: Producer extends.

  任何 `List<Parent>`, `List<Child>` 都能赋值给 `List<? extends Parent>`

  ```java
  List<? extends Parent> list = new ArrayList<Child>();  // ✅ ok
  ```

  副作用是: 只能读取 (从中读出值并当作父类使用), 不能添加 (除了例外null以外, 不能往里添加任何对象)

  ```java
  Parent p = list.get(0);  // ✅ ok. Can Read value.
  list.add(new Child());   // ❌ Compile Error.
  list.add(null);          // ✅ ok. null is the only value you can add.
  ```

- **Contravariant**: Consumer Super.

	父类泛型类型对象赋值给子类的泛型类型声明

	任何 `List<Child>`,`List<Parent>`,`List<Object>` 都可以赋给 `List<? super Child>`。
	
	```java
	List<? super Child> list = new ArrayList<Parent>();  // ✅ ok
	```
	
	副作用是: 只能添加`Child`或`Child`的子类, 不能读取 (只能当作Object类读取出来, 因为编译器只能确定list中实际存在的对象是`Child`或其父类)
	
	```java
	list.add(new Child());      // ✅ ok. You can add Child.
	list.add(new SubChild());   // ✅ ok. You can also add its subclasses.
	Child c = list.get(0);      // ❌ Compile error. Return value is always Object.
	Object o = list.get(0);     // ✅ You can only treat it as Object.
	```

**Kotlin** 中 `in` 和 `out` 就分别相当于 `? super` 和 `? extends`.

```kotlin
// Covariant
interface Producer<out T> {  // equivalent to Producer<? extends T>
    fun produce(): T
    // fun consume(item: T) // ❌ Not allowed.
}

// Contravariant
interface Consumer<in T> {  // equivalent to Consumer<? super T>
    // fun produce(): T  // ❌ Not allowed
    fun consume(item: T)
}
```

