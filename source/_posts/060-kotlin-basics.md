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



## Public, Protected, Private

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

  
