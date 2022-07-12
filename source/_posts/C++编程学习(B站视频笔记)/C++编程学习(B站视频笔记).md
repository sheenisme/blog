---
title: C++编程学习(B站视频笔记)
tags:
  - C/C++编程
categories:
  - 学习笔记
date: 2022-05-09 20:51:15
---

## C++编程学习(B站视频笔记)

> [学习笔记] -北京大学 C++程序设计，笔记源自课程PPT。
>
> 课程网址：1. https://www.icourse163.org/course/PKU-1002029030#/info
>
> 2. https://www.bilibili.com/video/BV1Hx411U7xL?p=6

### 一、从C到C++

#### 1 函数指针

如果在程序中定义了一个函数，那么在编译时系统就会为这个函数代码分配一段存储空间，这段存储空间的首地址称为这个函数的地址。而且函数名表示的就是这个地址。既然是地址我们就可以定义一个指针变量来存放，这个指针变量就叫作函数指针变量，简称函数指针。

那么这个指针变量怎么定义呢？虽然同样是指向一个地址，但指向函数的指针变量同我们之前讲的指向变量的指针变量的定义方式是不同的。例如：

```c++
int(*p)(int, int);
```

这个语句就定义了一个指向函数的指针变量 p。首先它是一个指针变量，所以要有一个`“*”`，即`（*p）`；其次前面的 int 表示这个指针变量可以指向返回值类型为 int 型的函数；后面括号中的两个 int 表示这个指针变量可以指向有两个参数且都是 int 型的函数。所以合起来这个语句的意思就是：定义了一个指针变量 p，该指针变量可以指向返回值类型为 int 型，且有两个整型参数的函数。p 的类型为 int(*)(int，int)。

所以函数指针的定义方式为：

```c++
函数返回值类型 (* 指针变量名) (函数参数列表);
```

“函数返回值类型”表示该指针变量可以指向具有什么返回值类型的函数；“函数参数列表”表示该指针变量可以指向具有什么参数列表的函数。这个参数列表中只需要写函数的参数类型即可。

我们看到，函数指针的定义就是将“函数声明”中的“函数名”改成“`（*指针变量名）`”。但是这里需要注意的是：“（*指针变量名）”两端的括号不能省略，括号改变了运算符的优先级。如果省略了括号，就不是定义函数指针而是一个函数声明了，即声明了一个返回值类型为指针型的函数。

那么怎么判断一个指针变量是指向变量的指针变量还是指向函数的指针变量呢？

<!--more-->

首先看变量名前面有没有`“*”`，如果有“*”说明是指针变量；其次看变量名的后面有没有带有形参类型的圆括号，如果有就是指向函数的指针变量，即函数指针，如果没有就是指向变量的指针变量。**最后需要注意的是，指向函数的指针变量没有 ++ 和 -- 运算。**

如何用函数指针调用函数，给大家举一个例子：

```c++
int Func(int x);   /*声明一个函数*/
int (*p) (int x);  /*定义一个函数指针*/
p = Func;          /*将Func函数的首地址赋给指针变量p*/
```

赋值时函数 Func 不带括号，也不带参数。由于函数名 Func 代表函数的首地址，因此经过赋值以后，指针变量 p 就指向函数 Func() 代码的首地址了。

##### 扩展：qsort排序函数

C 库函数 **void qsort(void \*base, size_t nitems, size_t size, int (\*compar)(const void \*, const void\*))** 对数组进行排序。

###### qsort() 函数的声明

```c++
void qsort(void *base, size_t nitems, size_t size, int (*compar)(const void *, const void*))
```

###### 参数：

```
base -- 指向要排序的数组的第一个元素的指针。
nitems -- 由 base 指向的数组中元素的个数。
size -- 数组中每个元素的大小，以字节为单位。
compar -- 用来比较两个元素的函数。
“比较函数(compar)”原型：
int 函数名(const void *elem1, const void *elem2);
其中elem1和elem2是两个待比较的元素
1）如果*elem1应该排在*elem2前面，则函数返回值为负整数
2）如果*elem1和*elem2哪个排在前面都行，则函数返回值为0
3）如果*elem1应该排在elem2后面，则函数返回值为正整数
```

###### 返回值：该函数不返回任何值。

下面来写一个程序，看了这个程序你们就明白函数指针怎么使用了：

```c
#include <stdio.h>
#include <stdlib.h>

int values[] = { 88, 56, 100, 2, 25 };

int cmpfunc (const void *elem1, const void *elem2)
{
   unsigned int * p1,* p2;
   p1 = (unsigned int *) elem1;
   p2 = (unsigned int *) elem2; 
   return (*p1)-(*p2);
   // 或者直接return ( *(int*)elem1 - *(int*)elem2 );
}

int main()
{
   int n;

   printf("排序之前的列表：\n");
   for( n = 0 ; n < 5; n++ ) {
      printf("%d ", values[n]);
   }

   qsort(values, 5, sizeof(int), cmpfunc);

   printf("\n排序之后的列表：\n");
   for( n = 0 ; n < 5; n++ ) {
      printf("%d ", values[n]);
   }
 
  return(0);
}

```

输出结果是：

```
排序之前的列表：
88 56 100 2 25 
排序之后的列表：
2 25 56 88 100
```

###### 【知识扩展】

指针是 C 语言的精华，也是 C 语言的难点，没学会指针就是没学会 C 语言。如果你觉得函数指针还能勉强接受的话，可以尝试理解一些更复杂的指针，例如：

```c
char *(* c[10])(int **p);
int (*(*(*pfunc)(int *))[5])(int *);
```

以上两个指针能分析清楚的话，那么 99% 的 C 语言指针问题都难不住你。

#### 2 命令行参数

命令行参数是使用 main() 函数参数来处理的，其中，**argc** 是指传入参数的个数，**argv[]** 是一个指针数组，指向传递给程序的每个参数。**argv[0]** 存储程序的名称，**argv[1]** 是一个指向第一个命令行参数的指针，***argv[n]** 是最后一个参数。如果没有提供任何参数，**argc** 将为 1，否则，如果传递了一个参数，**argc** 将被设置为 2。

多个命令行参数之间用空格分隔，但是如果参数本身带有空格，那么传递参数的时候应把参数放置在双引号 `""` 或单引号 `''` 内部。

#### 3 位运算符

###### **逻辑运算符：**

| 运算符 | 意义      | 示例 | 对于每个位位置的结果（1=设定，0=清除）                       | 应用场景                                                     |
| ------ | --------- | ---- | ------------------------------------------------------------ | :----------------------------------------------------------- |
| &      | 按位与    | x&y  | 如果 x 和 y 都为 1，则得到 1；如果 x 或 y 任何一个为 0，或都为0，则得到 0 | 1）清零。<br/>2）取一个数中某些指定位。<br/>3）保留指定位。  |
| \|     | 按位或    | x\|y | 如果 x 或 y 为 1，或都为 1，则得到 1；如果 x 和 y 都为 0，则得到 0 | 对一个数据的某些位 定值为1，且保持其他位不变。               |
| ^      | 按位亦或  | x^y  | 如果 x 或 y 的值不同，则得到 1；如果两个值相同，则得到 0     | 1)使特定位翻转。<br/>2) 与0相“异或”，保留原值。<br/>3) 交换两个值，不用临时变量。<br/>想将ａ和ｂ的值互换，可以用以下赋值语句实现：<br/>  ａ＝a∧b;<br/>  ｂ＝b∧a;<br/>  ａ＝a∧b; |
| ~      | 按位 取反 | ~x   | 如果 x 为 0，则得到 1，如果 x 是 1，则得到 0                 | 求整数的二进制反码，即分别将操作数各二进制位上的1变为0，0变为1 |


位运算符的操作数必须是整数类型，并且遵循寻常算术转换（usualarithmetic conversion）。转换后获得的操作数通用类型就是整个计算结果的类型。

###### **移位运算符：**

| 运算符 | 意义     | 示例 | 结果                                                         | 应用                                                         |
| ------ | -------- | ---- | ------------------------------------------------------------ | :----------------------------------------------------------- |
| <<     | 向左移位 | x<<y | x 的每个位向左移动 y 个位，右补0                             | 左移1位相当于该数乘以2，左移2位相当于该数乘以2*2＝4,15<<2=60，即乘了４。但此结论只适用于该数左移时被溢出舍弃的高位中不包含1的情况。 |
| >>     | 向右移位 | x>>y | x 的每个位向右移动 y 个位，对于无符号数，高位补0，有符号数，一般补符号位 | 编译采用的是算术右移,即对有符号数右移时,如果符号位原来为1，左面移入高位的是1。右移n位，相当于处2的n次方。 |

移位运算符的操作数必须是整数。在实际移位操作之前，两个操作数都要进行整数提升（promotion）。右边操作数不可以为负值，并且必须少于左边操作数在整数提升之后的位长。如果不符合这些条件，程序运行结果将无法确定。

移位运算结果的类型等于左操作数在整数提升后的类型。另外，移位运算符的优先级比算术运算符的优先级更低，但相对于比较运算符以及其他的位操作运算符，具有更高的优先级。

> 右移运算符是用来将一个数的各二进制位右移若干位，移动的位数由右操作数指定（右操作数必须是非负值），移到右端的低位被舍弃，对于无符号数，高位补0。对于有符号数，某些机器将对左边空出的部分用符号位填补（即“算术移位”），而另一些机器则对左边空出的部分用0填补（即“逻辑移位”）。注意：对无符号数,右移时左边高位移入0；对于有符号的值,如果原来符号位为0(该数为正),则左边也是移入0。如果符号位原来为1(即负数),则左边移入0还是1,要取决于所用的计算机系统。有的系统移入0,有的系统移入1。移入0的称为“逻辑移位”,即简单移位；移入1的称为“算术移位”。
>
> 更多信息请看：https://www.cnblogs.com/911/archive/2008/05/20/1203477.html

###### 位运算符与赋值运算符可以组成复合赋值运算符。

  例如: &=, |=, >>=, <<=, ∧=
  例： a & = b相当于 a = a & b
     a << =2相当于a = a << 2

#### 4 引用

某个变量的引用 ，等价于这个变量，相当于该变量的一个别名。

```c
int n = 4;
int & r = n;  // r引用了n,r的类型是int &
```

- 定义引用时一定要将其初始化成引用某个变量。
- 初始化后，它就一直引用该变量，不会再引用别的变量了。
- 引用只能引用变量，不能引用常量和表达式。

```c
double a = 4, b = 5; 
double & r1 = a; 
double & r2 = r1; 
r2 = 10;
cout << a << endl;
r1 = b;
cout << b << endl;
```

```
C语言中，如何编写交换两个整型变量值的函数?
void swap( int * a, int * b)
{
	int tmp;
	tmp = * a; * a = * b; * b = tmp;
}
int n1, n2;
swap(& n1,& n2) ; // n1,n2的值被交换
有了C++的引用之后：
void swap( int & a, int & b)
{
	int tmp;
	tmp = a; a = b; b = tmp;
}
int n1, n2;
swap(n1,n2) ; // n1,n2的值被交换
```

引用作为函数的返回值：

```
int n = 4;
int & SetValue() { return n; }
int main() 
{
	SetValue() = 40; 
	cout << n; 
	return 0;
}//输出： 40
```

不能通过**常引用**去修改其引用的内容:

```
int n = 100; 
const int & r = n; 
r = 200;   //编译错
n = 300;  // 没问题
```

```
const T & 和T & 是不同的类型!!!
T & 类型的引用或T类型的变量可以用来初始化const T & 类型的引用。
const T 类型的常变量和const T & 类型的引用则不能用来初始化T &类型的引用，除非进行强制类型转换。
```

#### 5 Const关键字

1）定义常量

2）定义常量指针：不可通过**常量指针**修改其指向的内容.不能把常量指针赋值给非常量指针,反过来可以.

![image-20220412170917643](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220412170917643.png)

3）定义常引用：不能通过**常引用**修改其引用的变量

![image-20220412171000736](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220412171000736.png)

#### 6 动态内存分配

##### C++用new运算符实现动态内存分配。

（1）分配一个变量：

```
P = new T;
T是任意类型名，P是类型为T *的指针。
动态分配出一片大小为sizeof(T)字节的内存空间，并且将该内存空间的起始地址赋值给P。
```

（2）分配一个数组：

```
P = new T[N];
T:任意类型名    P:类型为T *的指针    N:要分配的数组元素的个数，可以是整型表达式
动态分配出一片大小为sizeof(T)*N字节的内存空间，并且将该内存空间的起始地址赋值给P。
```

动态分配数组示例：

```c
int * pn;
int i = 5;
pn = new int[i*20];
pn[0] = 20;
pn[100] = 30; //编译没问题。运行时导致数组越界
```

##### **用“new”动态分配的内存空间，一定要用“delete”运算符进行释放。**

```C
delete 指针；//该指针必须指向new出来的空间
delete []指针；//该指针必须指向new出来的数组
```

```c
int * p = new int[20];
p[0] = 1;
delete []p;
```

#### 7 内联函数 函数重载 函数缺省参数

1. 函数调用是有时间开销的。如果函数本身只有几条语句，执行非常快，而且函数被反复执行很多次，相比之下调用函数所产生的这个开销就会显得比较大。

为了减少函数调用的开销，引入了内联函数机制。**编译器处理对内联函数的调用语句时，是将整个函数的代码插入到调用语句处，而不会产生调用函数的语句。**

2. 一个或多个函数，名字相同，然而参数个数或参数类型不相同，这叫做函数的重载。

以下三个函数是重载关系：

```
int Max(double f1,double f2) { }
int Max(int n1,int n2) { }
int Max(int n1,int n2,int n3) { }
```

函数重载使得函数命名变得简单。编译器根据调用语句的中的实参的个数和类型判断应该调用哪个函数。

3. C++中，定义函数的时候可以让最右边的连续若干个参数有缺省值，那么调用函数的时候，若相应位置不写参数，参数就是缺省值。

函数参数可缺省的目的在于提高程序的可扩充性。即如果某个写好的函数要添加新的参数，而原先那些调用该函数的语句，未必需要使用新增的参数，那么为了避免对原先那些函数调用语句的修改，就可以使用缺省参数。

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220407173006508.png" alt="image-20220407173006508" style="zoom: 50%;" />

#### 8 类和对象的基本概念

结构化程序设计（C语言）：程序=数据结构+算法

程序由全局变量以及众多相互调用的函数组成。算法以函数的形式实现，用于对数据结构进行操作。

![image-20220409094513299](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220409094513299.png)

面向对象的程序设计方法，能够较好解决上述问题。面向对象的程序 =类 +类 +…+类
设计程序的过程，就是设计类的过程。

![image-20220409095557423](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220409095557423.png)

**面向对象的程序设计具有“抽象”，“封装”“继承”“多态”四个基本特点。**

和结构变量一样，对象所占用的内存空间的大小，等于所有成员变量的大小之和。
每个对象各有自己的存储空间。一个对象的某个成员变量被改变了，不会影响到另一个对象。

和结构变量一样，对象之间可以用“=”进行赋值，但是不能用“==”，“!=”，“>”,“<”“>=”“<=”进行比较，除非这些运算符经过了“重载”。

使用类的成员变量和成员函数：

- 用法1：对象名.成员名
- 用法2. 指针->成员名
- 用法3：引用名.成员名

![image-20220409102514322](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220409102514322.png)

### 二、类和对象基础

#### 1 基本概念

- 在类的成员函数内部，能够访问：
  –当前对象的全部属性、函数；
  –同类其它对象的全部属性、函数。

- 在类的成员函数以外的地方，只能够访问该类对象的公有成员。

设置私有成员的机制，叫“隐藏”。“隐藏”的目的是强制对成员变量的访问一定要通过成员函数进行，那么以后成员变量的类型等属性修改后，只需要更改成员函数即可。否则，所有直接访问成员变量的语句都需要修改。

**成员函数也可以重载，成员函数可以带缺省参数。**

![image-20220409105528502](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220409105528502.png)

#### 2 构造函数

是成员函数的一种。

- 名字与类名相同，可以有参数，不能有返回值(void也不行)
- **作用是对对象进行初始化，如给成员变量赋初值**
- 如果定义类时没写构造函数，则编译器生成一个默认的无参数的构造函数
  - 默认构造函数无参数，不做任何操作

- 如果定义了构造函数，则编译器不生成默认的无参数的构造函数
- **对象生成时构造函数自动被调用。对象一旦生成，就再也不能在其上执行构造函数。**
- 一个类可以有多个构造函数

#### 3 复制构造函数

- 只有一个参数,即对同类对象的引用。
- 形如 X::X( X & )或**X::X(const X &),**二者选一
  后者能以常量对象作为参数
- 如果没有定义复制构造函数，那么编译器生成默认复制构造函数。默认的复制构造函数完成复制功能

```c
class Complex {
	private :
 		double real,imag;
};
Complex c1; //调用缺省无参构造函数
Complex c2(c1);//调用缺省的复制构造函数,将 c2初始化成和c1一样
```

如果定义的自己的复制构造函数，则默认的复制构造函数不存在。

**不允许有形如 X::X( X )的构造函数。**

##### 复制构造函数起作用的三种情况： 

1) 当用一个对象去初始化同类的另一个对象时。

```c
Complex c2(c1);
Complex c2 = c1; //初始化语句，非赋值语句，与上面的等价哈
```

2)如果某函数有一个参数是类 A的对象，那么该函数被调用时，类A的复制构造函数将被调用。

![image-20220411164805512](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220411164805512.png)

![image-20220411164557690](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220411164557690.png)

3)如果函数的返回值是类A的对象时，则函数返回时，A的复制构造函数被调用。

![image-20220411165038046](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220411165038046.png)

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220411164636782.png" alt="image-20220411164636782" style="zoom:50%;" />

**注意：对象间赋值并不导致复制构造函数被调用**

![image-20220411165553481](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220411165553481.png)

##### **常量引用参数的使用**

```c++
void fun(CMyclass obj_) {
	cout << "fun" << endl;
}
```

- 这样的函数，调用时生成形参会引发复制构造函数调用，开销比较大。
- 所以可以考虑使 用 CMyclass &引用类型作为参数。
- 如果希望确保实参的值在函数中不应被改变（**因不能通过引用改变其对象**），那么可以加上const关键字：

```c++
void fun(const CMyclass & obj) {
	//函数中任何试图改变 obj值的语句都将是变成非法
}
```

#### 4 类型转换构造函数和析构函数

- 定义转换构造函数的目的是实现类型的自动转换。
- 只有一个参数，而且不是复制构造函数的构造函数，一般就可以看作是转换构造函数。
- 当需要的时候，编译系统会自动调用转换构造函数，建立一个无名的临时对象(或临时变量)。

```
class Complex {
    public:
        double real, imag;
        Complex( int i) {    //类型转换构造函数
            cout << "IntConstructor called" << endl;
            real = i; imag = 0;
        }
        Complex(double r,double i) {
        	real = r; imag = i; 
        	}
};
int main ()
{
    Complex c1(7,8);
    Complex c2 = 12;
    c1 = 9;      // 9被自动转换成一个临时Complex对象
    cout << c1.real << "," << c1.imag << endl;
    return 0;
}
```

- 名字与类名相同，在前面加‘~’，没有参数和返回值，一个类最多只能有一个析构函数。
- 析构函数对象消亡时即自动被调用。可以定义析构函数来在对象消亡前做善后工作，比如释放分配的空间等。
- 如果定义类时没写析构函数，则编译器生成缺省析构函数。缺省析构函数什么也不做。
- 如果定义了析构函数，则编译器不生成缺省析构函数。

```
class String{
    private :
        char * p;
    public:
        String () {
        	p = new char[10];
        }
        ~ String () ;
};
String ::~ String()
{
     delete [] p;
}
```

对象数组生命期结束时，对象数组的每个元素的析构函数都会被调用。

注意：

**delete运算导致析构函数调用**

```
Ctest * pTest;
pTest = new Ctest; //构造函数调用
delete pTest; //析构函数调用
---------------------------------------------------------
pTest = new Ctest[3]; //构造函数调用3次
delete [] pTest; //析构函数调用3次
```

**若new一个对象数组，那么用delete释放时应该写 []。否则只delete一个对象(调用一次析构函数)**

```
class CMyclass {
	public:
		~CMyclass() { cout << "destructor" << endl; }
};
CMyclass obj;
CMyclass fun(CMyclass sobj) { //参数对象消亡也会导致析构函数被调用
    return sobj; //函数调用返回时生成临时对象返回
}
int main(){
	obj = fun(obj); //函数调用的返回值（临时对象）被
	return 0; //用过后，该临时对象析构函数被调用
}
输出：
destructor    // 形参对象sobj
destructor    // 临时对象
destructor    // 全局的obj对象
```

####  5 构造函数析构函数调用时机

![image-20220414165545953](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220414165545953.png)

![image-20220414165617086](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220414165617086.png)

构造函数不负责建造，只负责装修，即复杂初始化，不负责内存分配。析构函数负责善后工作，即将值钱的东西搬走，不负责拆房子，即不负责内存销毁。

注意：

![image-20220414170512035](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220414170512035.png)

![image-20220414170534932](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220414170534932.png)

![image-20220414170559651](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220414170559651.png)

### 三、类和对象提高

#### 1 this指针

**C++程序到C程序的翻译**:

![image-20220416212403273](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220416212403273.png)

**其作用就是指向成员函数所作用的对象**

非静态成员函数中可以直接使用this来代表指向该函数作用的对象的指针。

![image-20220416212820258](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220416212820258.png)

![image-20220416213447938](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220416213447938.png)

![image-20220416213553945](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220416213553945.png)

this指针和静态成员函数：

- 静态成员函数中不能使用 this指针！
- 因为静态成员函数并不具体作用与某个对象!
- **因此，静态成员函数的真实的参数的个数，就是程序中写出的参数个数！**

#### 2 静态成员变量

静态成员：在说明前面加了static关键字的成员。

```c++
class CRectangle
{
    private:
        int w, h;
        static int nTotalArea; //静态成员变量
        static int nTotalNumber;
    public:
        CRectangle(int w_,int h_);
        ~CRectangle();
        static void PrintTotal(); //静态成员函数
};
```

普通成员变量每个对象有各自的一份，而静态成员变量一共就一份，为所有对象共享。

**sizeof运算符不会计算静态成员变量。**

普通成员变量每个对象有各自的一份，而静态成员变量一共就一份，为所有对象共享。普通成员函数必须具体作用于某个对象，而静态成员函数并不具体作用于某个对象。**因此静态成员不需要通过对象就能访问。**

##### 如何访问静态成员

```c++
1)类名::成员名
	CRectangle::PrintTotal();
2)对象名.成员名
	CRectangle r; r.PrintTotal();
3)指针->成员名
	CRectangle * p = &r; p->PrintTotal();
4)引用.成员名
	CRectangle & ref = r; int n = ref.nTotalNumber;
```

- **静态成员变量本质上是全局变量，哪怕一个对象都不存在，类的静态成员变量也存在。**
- **静态成员函数本质上是全局函数。**

##### 为什么要设置静态成员？

- 设置静态成员这种机制的目的是将和某些类紧密相关的全局变量和函数写到类里面，看上去像一个整体，易于维护和理解。

考虑一个需要随时知道矩形总数和总面积的图形处理程序，可以用全局变量来记录总数和总面积，用静态成员将这两个变量封装进类中，就更容易理解和维护。

```c++
class CRectangle
{
    private:
        int w, h;
        static int nTotalArea;
        static int nTotalNumber;
    public:
        CRectangle(int w_,int h_);
        ~CRectangle();
        static void PrintTotal();
};
CRectangle::CRectangle(int w_,int h_)
{
    w = w_;
    h = h_;
    nTotalNumber ++;
    nTotalArea += w * h;
}
CRectangle::~CRectangle()
{
    nTotalNumber --;
    nTotalArea -= w * h;
}
void CRectangle::PrintTotal()
{
	cout << nTotalNumber << "," << nTotalArea << endl;
}
int CRectangle::nTotalNumber = 0;
int CRectangle::nTotalArea = 0;
// 必须在定义类的文件中对静态成员变量进行一次说明或初始化。否则编译能通过，链接不能通过。
int main()
{
    CRectangle r1(3,3), r2(2,2);
    //cout << CRectangle::nTotalNumber; // Wrong ,私有
    CRectangle::PrintTotal();
    r1.PrintTotal();
    return 0;
}
```

输出结果：
2,13
2,13

##### Notes:

###### 在静态成员函数中，不能访问非静态成员变量，也不能调用非静态成员函数.

```c++
void CRectangle::PrintTotal()
{
	cout << w << "," << nTotalNumber << "," <<
	nTotalArea << endl; //wrong
}
CRetangle::PrintTotal(); //解释不通，w到底是属于那个对象的？
```

![image-20220416214718207](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220416214718207.png)

在使用CRectangle类时，**有时会调用复制构造函数生成临时的隐藏的CRectangle对象**

- 调用一个以CRectangle类对象作为参数的函数时，
- 调用一个以CRectangle类对象作为返回值的函数时

**临时对象在消亡时会调用析构函数，减少nTotalNumber和nTotalArea的值，可是这些临时对象在生成时却没有增加nTotalNumber和 nTotalArea的值。**

**解决办法：为CRectangle类写一个复制构造函数。**

![image-20220416214848625](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220416214848625.png)

#### 3 成员对象和封闭类

有成员对象的类叫封闭（enclosing)类。

成员对象：类的成员是其他类的对象。

```c++
class CTyre //轮胎类
{
    private:
        int radius; //半径
        int width; //宽度
    public:
        CTyre(int r,int w):radius(r),width(w) { }  //初始化列表
};
class CEngine //引擎类
{
};
class CCar { //汽车类
    private:
        int price; //价格
        CTyre tyre;
        CEngine engine;
    public:
        CCar(int p,int tr,int tw );
};
CCar::CCar(int p,int tr,int w):price(p),tyre(tr, w)
{
};
int main()
{
	CCar car(20000,17,225);
	return 0;
}
```

上例中，如果 CCar类不定义构造函数，则下面的语句会编译出错：
CCar car;
因为编译器不明白 car.tyre该如何初始化。car.engine的初始化没问题，用默认构造函数即可。
**任何生成封闭类对象的语句，都要让编译器明白，对象中的成员对象，是如何初始化的。**

具体的做法就是：**通过封闭类的构造函数的初始化列表**。
成员对象初始化列表中的参数可以是任意复杂的表达式，可以包括函数，变量，只要表达式中的函数或变量有定义就行。

##### 封闭类构造函数和析构函数的执行顺序

- 封闭类对象生成时，先执行所有对象成员的构造函数，然后才执行封闭类的构造函数。
- 对象成员的构造函数调用次序和对象成员在类中的说明次序一致，与它们在成员初始化列表中出现的次序无关。
- 当封闭类的对象消亡时，先执行封闭类的析构函数，然后再执行成员对象的析构函数。次序和构造函数的调用次序相反

```
class CTyre {
	public:
    	CTyre() { cout << "CTyre contructor" << endl; }
    	~CTyre() { cout << "CTyre destructor" << endl; }
};
class CEngine {
    public:
    	CEngine() { cout << "CEngine contructor" << endl; }
    	~CEngine() { cout << "CEngine destructor" << endl; }
};
class CCar {
    private:
    	CEngine engine;
    	CTyre tyre;
    public:
    	CCar( ) { cout <<“CCar contructor” << endl; }
    	~CCar() { cout << "CCar destructor" << endl; }
};
int main(){
    CCar car;
    return 0;
}
```

输出结果：
CEngine contructor
CTyre contructor
CCar contructor
CCar destructor
CTyre destructor
CEngine destructor

##### 封闭类的复制构造函数

封闭类的对象，如果是用默认复制构造函数初始化的，那么它里面包含的成员对象，也会用复制构造函数初始化。

```c++
class A
{
    public:
        A() { cout << "default" << endl; } // 无参构造函数
        A(A & a) { cout << "copy" << endl;}  // 复制构造函数
};
class B { A a; };
int main()
{
	B b1,b2(b1);
	return 0;
}
```

输出：
default 
Copy
说明b2.a是用类A的复制构造函数初始化的。而且调用复制构造函数时的实参就是b1.a。

#### 4 常量对象，常量成员函数

**如果不希望某个对象的值被改变，则定义该对象的时候可以在前面加 const关键字。**

```c++
class Sample {
    private :
        int value;
    public:
        Sample() { }
        void SetValue() { }
};
const Sample Obj; //常量对象
Obj.SetValue ();  //错误。常量对象只能使用构造函数、析构函数和有const说明的函数(常量方法）
```

- **在类的成员函数说明后面可以加const关键字，则该成员函数成为常量成员函数。**
- 常量成员函数内部不能改变属性的值，也不能调用非常量成员函数。
- 即：常量成员函数执行期间不应修改其所作用的对象。因此，在常量成员函数中不能修改成员变量的值(静态成员变量除外），也不能调用同类的非常量成员函数(静态成员函数除外）。

```c++
class Sample {
    private :
    	int value;
    public:
        void func() { };
        Sample() { }
        void SetValue() const {
        	value = 0; // wrong
        	func(); //wrong
		}
};
const Sample Obj;
Obj.SetValue (); //常量对象上可以使用常量成员函数
```

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220417101205400.png" alt="image-20220417101205400" style="zoom:50%;" />

**在定义常量成员函数和声明常量成员函数时都应该使用const关键字。**

```c++
class Sample {
	private :
		int value;
	public:
		void PrintValue() const;
};
void Sample::PrintValue() const { //此处不使用const会导致编译出错
	cout << value;
}
void Print(const Sample & o) {
	o.PrintValue(); //若 PrintValue非const则编译错
}
```

常量成员函数:**如果一个成员函数中没有调用非常量成员函数，也没有修改成员变量的值，那么，最好将其写成常量成员函数。**

两个函数，名字和参数表都一样，但是一个是const,一个不是，算重载。

```c++
#include <iostream>
using namespace std;
class CTest {
    private :
    	int n;
    public:
        CTest() { n = 1 ; }
        int GetValue() const { return n ; }
        int GetValue() { return 2 * n ; }
};
int main() {
    const CTest objTest1;
    CTest objTest2;
    cout << objTest1.GetValue() << "," << objTest2.GetValue() ;
    return 0;
}
=>1,2
```

**引用前面可以加const关键字，成为常引用。不能通过常引用，修改其引用的变量。**

对象作为函数的参数时，生成该参数需要调用复制构造函数，效率比较低。用指针作参数，代码又不好看，如何解决?  **可以用对象的引用作为参数**

对象引用作为函数的参数有一定风险性，若函数中不小心修改了形参b，则实参也跟着变，这可能不是我们想要的。如何避免?  **可以用对象的常引用作为参数**

可以在const成员函数中修改的成员变量:

在C++中，mutable也是为了突破const的限制而设置的。被mutable修饰的变量，将永远处于可变的状态，即使在一个const函数中。

```c++
class CTest
{
    public:
        bool GetData() const
        {
            m_n1++;  
            return m_b2;
        }
    private:
        mutable int m_n1;
        bool m_b2;
};
```

#### 5 友元

友元分为友元函数和友元类两种：

1. 友元函数:一个类的友元函数可以访问该类的私有成员.（友元函数不是成员函数 ）

   ```c++
   class CCar ; //提前声明 CCar类，以便后面的CDriver类使用
   class CDriver
   {
   	public:
   		void ModifyCar( CCar * pCar) ; //改装汽车
   };
   class CCar
   {
   	private:
           int price;
           friend int MostExpensiveCar( CCar cars[], int total); //声明友元
           friend void CDriver::ModifyCar(CCar * pCar); //声明友元
   };
   void CDriver::ModifyCar( CCar * pCar)
   {
   	pCar->price += 1000; //汽车改装后价值增加
   }
   int MostExpensiveCar( CCar cars[],int total)
   //求最贵汽车的价格
   {
       int tmpMax = -1;
       for( int i = 0;i < total; ++i )
       	if( cars[i].price > tmpMax)
       		tmpMax = cars[i].price;
       return tmpMax;
   }
   int main()
   {
   	return 0;
   }
   ```

   可以将一个类的成员函数(包括构造、析构函数)说明为另一个类的友元。

   ```c++
   class B {
       public:
       	void function();
   };
   class A {
   	friend void B::function();
   };
   ```

2. 友元类: 如果A是B的友元类，那么A的成员函数可以访问B的私有成员。

```c++
class CCar
{
	private:
		int price;
		friend class CDriver; //声明CDriver为友元类
};
class CDriver
{
	public:
        CCar myCar;
        void ModifyCar() {//改装汽车
        	myCar.price += 1000;//因CDriver是CCar的友元类，故此处可以访问其私有成员
        }
};
int main(){ return 0; }
```

**友元类之间的关系不能传递，不能继承。**

### 四、运算符的重载

#### 1 运算符重载的基本概念

C++预定义的运算符，只能用于基本数据类型的运算：整型、实型、字符型、逻辑型....... `+、-、*、/、%、^、&、~、!、|、=、<< 、!=、……`

- 在数学上，两个复数可以直接进行+、-等运算。但在C++中，直接将+或-用于复数对象是不允许的。
- 有时会希望，让对象也能通过运算符进行运算。这样代码更简洁，容易理解。
  • 例如：

​	complex_a和complex_b是两个复数对象；求两个复数的和,希望能直接写：`complex_a + complex_b`

- 运算符重载，就是对已有的运算符(C++中预定义的运算符)赋予多重的含义，使同一运算符作用于不同类型的数据时导致不同类型的行为。

- 运算符重载的目的是：**扩展C++中提供的运算符的适用范围，使之能作用于对象。**
- 同一个运算符，对不同类型的操作数，所发生的行为不同。
  complex_a + complex_b 生成新的复数对象
   	5 + 4 = 9

##### 运算符重载的形式

```
返回值类型 operator运算符（形参表）
{
 ……
}
```

- 运算符重载的实质是函数重载
- 可以重载为普通函数，也可以重载为成员函数
- 把含运算符的表达式转换成对运算符函数的调用。
- 把运算符的操作数转换成运算符函数的参数。
- 运算符被多次重载时，根据实参的类型决定调用哪个运算符函数。

```c++
class Complex
{
    public:
        double real,imag;
        Complex( double r = 0.0, double i= 0.0 ):real(r),imag(i) { }
        Complex operator-(const Complex & c);
};
Complex operator+( const Complex & a, const Complex & b)
{
	return Complex( a.real+b.real,a.imag+b.imag); //返回一个临时对象
}
Complex Complex::operator-(const Complex & c)
{
	return Complex(real - c.real, imag - c.imag); //返回一个临时对象
}
重载为成员函数时，参数个数为运算符目数减一。
重载为普通函数时，参数个数为运算符目数.
int main()
{
    Complex a(4,4),b(1,1),c;
    c = a + b; //等价于c=operator+(a,b);
    cout << c.real << "," << c.imag << endl;
    cout << (a-b).real << "," << (a-b).imag << endl;
    //a-b等价于a.operator-(b)
    return 0;
}
```

输出：
5,5
3,3
c = a + b;等价于c=operator+(a,b);
a-b 等价于a.operator-(b)

#### 2 赋值运算符=重载

有时候希望赋值运算符两边的类型可以不匹配，比如，把一个int类型变量赋值给一个Complex对象，或把一个 char *类型的字符串赋值给一个字符串对象,此时就需要重载赋值运算符“=”。
**赋值运算符“=”只能重载为成员函数。**

```c++
class String {
    private:
    	char * str;
    public:
        String ():str(new char[1]) { str[0] = 0;}
        const char * c_str() { return str; };
        String & operator = (const char * s);
        ~String( ) { delete [] str; }
};
String & String::operator = (const char * s)
{ 	//重载“=”以使得 obj = “hello”能够成立
    delete [] str;
    str = new char[strlen(s)+1];
    strcpy( str, s);
    return * this;
}
int main()
{
    String s;
    s = "Good Luck," ; //等价于 s.operator=("Good Luck,");
    cout << s.c_str() << endl;
    // String s2 = "hello!"; //这条语句要是不注释掉就会出错，他是初始化语句
    s = "Shenzhou 8!"; //等价于 s.operator=("Shenzhou 8!");
    cout << s.c_str() << endl;
    return 0;
}
```

输出：
Good Luck,
Shenzhou 8!

##### 深拷贝和浅拷贝

```c++
class String {
    private:
    	char * str;
    public:
        String ():str(new char[1]) { str[0] = 0;}
        const char * c_str() { return str; };
        String & operator = (const char * s){
            delete [] str;
            str = new char[strlen(s)+1];
            strcpy( str, s);
            return * this;
    	};
		~String( ) { delete [] str; }
};
```

```
希望可以：
String S1, S2;
S1 =“this”;
S2 =“that”;
S1 = S2;
```

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220417110756690.png" alt="image-20220417110756690" style="zoom:50%;" />

如不定义自己的赋值运算符，那么S1=S2实际上导致 S1.str和 S2.str指向同一地方。

- 如果S1对象消亡，析构函数将释放 S1.str指向的空间，则S2消亡时还要释放一次，不妥。

- 另外，如果执行 S1 = "other"；会导致S2.str指向的地方被delete。

- 因此要在 class String里添加成员函数。

  ```c++
  String & operator = (const String & s) {
      delete [] str;
      str = new char[strlen(s.str)+1];
      strcpy(str,s.str);
      return * this;
  }
  ```

**这么做就够了吗？还有什么需要改进的地方？**

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220417111612894.png" alt="image-20220417111612894" style="zoom: 67%;" />

###### 对 operator =返回值类型的讨论

![image-20220417111804873](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220417111804873.png)

###### 上面的String类是否就没有问题了？

为 String类编写复制构造函数的时候，会面临和=同样的问题，用同样的方法处理。

```
String( String & s)
{
	str = new char[strlen(s.str)+1];
	strcpy(str,s.str);
}
```

#### 3 运算符重载为友元

一般情况下，将运算符重载为类的成员函数，是较好的选择。
但有时，重载为成员函数不能满足使用要求，重载为普通函数，又不能访问类的私有成员，所以需要将运算符重载为友元。

```
class Complex
{
    double real,imag;
    public:
        Complex( double r, double i):real(r),imag(i){ };
        Complex operator+( double r );
};
Complex Complex::operator+( double r )
{	//能解释 c+5
	return Complex(real + r,imag);
}
```

经过上述重载后：
`Complex c ;`
`c = c + 5; //有定义，相当于 c = c.operator +(5);`
但是：`c = 5 + c; //编译出错`

所以，为了使得上述的表达式能成立，需要将 +重载为普通函数。

```c++
Complex operator+ (double r,const Complex & c)
{ 	//能解释 5+c
	return Complex( c.real + r, c.imag);
}
```

**但是普通函数又不能访问私有成员，所以，需要将运算符 +重载为友元.**

```c++
class Complex
{
    double real,imag;
    public:
        Complex( double r, double i):real(r),imag(i){ };
        Complex operator+( double r );
        friend Complex operator + (double r,const Complex & c);
};
```

#### 4 运算符重载实例：可变长整型数组

```c++
int main() { //要编写可变长整型数组类，使之能如下使用：
    CArray a; //开始里的数组是空的
    for( int i = 0;i < 5;++i)
    	a.push_back(i);
    CArray a2,a3;
    a2 = a;
    for( int i = 0; i < a.length(); ++i )
    	cout << a2[i] << " " ;
    a2 = a3; //a2是空的
    for( int i = 0; i < a2.length(); ++i ) //a2.length()返回0
    	cout << a2[i] << " ";
    cout << endl;
    a[3] = 100;
    CArray a4(a);
    for( int i = 0; i < a4.length(); ++i )
    	cout << a4[i] << " ";
    return 0;
}
```

程序输出结果是：
0 1 2 3 4
0 1 2 100 4
要做哪些事情?

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220417161852694.png" alt="image-20220417161852694" style="zoom:67%;" />

```c++
class CArray {
    int size; //数组元素的个数
    int *ptr; //指向动态分配的数组
    public:
        CArray(int s = 0); //s代表数组元素的个数
        CArray(CArray & a);
        ~CArray();
        void push_back(int v); //用于在数组尾部添加一个元素v
        CArray & operator=( const CArray & a);
        //用于数组对象间的赋值
        int length() { return size; } //返回数组元素个数
        int & CArray::operator[](int i) //返回值为 int不行!不支持 a[i] = 4。非引用的函数返回值不难作为左值使用。
        {	//用以支持根据下标访问数组元素，
        	//如n = a[i]和a[i] = 4;这样的语句
        	return ptr[i];
        }
};
CArray::CArray(int s):size(s)
{
	if( s == 0)
		ptr = NULL;
	else
 		ptr = new int[s];
}
CArray::CArray(CArray & a) {
    if(!a.ptr) {
    	ptr = NULL;
   		size = 0;
    	return; 
    }
    ptr = new int[a.size];
    memcpy(ptr, a.ptr, sizeof(int ) * a.size);
    size = a.size;
} 
CArray::~CArray()
{
	if(ptr) delete [] ptr;
}
CArray & CArray::operator=( const CArray & a)
{ 	//赋值号的作用是使“=”左边对象里存放的数组，大小和内容都和右边的对象一样
    if( ptr == a.ptr) //防止a=a这样的赋值导致出错
    	return * this;
    if( a.ptr == NULL) { //如果a里面的数组是空的
        if( ptr ) delete [] ptr;
        ptr = NULL;
        size = 0;
        return * this;
    }
    if( size < a.size) { //如果原有空间够大，就不用分配新的空间
        if(ptr)
        	delete [] ptr;
        ptr = new int[a.size];
    }
    memcpy(ptr,a.ptr,sizeof(int)*a.size);
    size = a.size;
    return * this;
} // CArray & CArray::operator=( const CArray & a)
void CArray::push_back(int v)
{ 	//在数组尾部添加一个元素
    if( ptr) {
        int * tmpPtr = new int[size+1]; //重新分配空间
        memcpy(tmpPtr,ptr,sizeof(int)*size); //拷贝原数组内容
        delete [] ptr;
        ptr = tmpPtr;
    }
    else //数组本来是空的
    	ptr = new int[1];
    ptr[size++] = v; //加入新的数组元素
}
```

###### 浅拷贝与深拷贝区别：

![image-20220417164017667](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220417164017667.png)

#### 5 流插入运算符和流提取运算符的重载

##### 流插入运算符的重载

- cout是在 iostream中定义的，ostream类的对象。
- “<<”能用在cout上是因为，在iostream里对“<<”进行了重载。
- 考虑,怎么重载才能使得cout << 5;和 cout <<“this”都能成立?

```c++
ostream & ostream::operator<<(int n)
{
     …… //输出n的代码
    return * this;
}
ostream & ostream::operator<<(const char * s )
{
     …… //输出s的代码
    return * this;
}
```

`cout << 5 <<“this”;`
本质上的函数调用的形式是什么？
`cout.operator<<(5).operator<<(“this”);`

• 假定下面程序输出为 5hello,该补写些什么

```c++
class CStudent{
	public: int nAge;
};
int main(){
    CStudent s ;
    s.nAge = 5;
    cout << s <<"hello";
    return 0;
}

ostream & operator<<( ostream & o,const CStudent & s){
    o << s.nAge ;
    return o;
}
```

假定c是Complex复数类的对象，现在希望写“cout << c;”，就能以“a+bi”的形式输出c的值，写“cin>>c;”，就能从键盘接受“a+bi”形式的输入，并且使得c.real = a,c.imag = b。

```
例题：
int main()
{
    Complex c;
    int n;
    cin >> c >> n;
    cout << c << "," << n;
    return 0;
}
运行结果可以如下：
13.2+133i 87↙
13.2+133i, 87
```

实现代码如下：

```c++
#include <iostream>
#include <string>
#include <cstdlib>
using namespace std;
class Complex {
    double real,imag;
    public:
        Complex( double r=0, double i=0):real(r),imag(i){ };
        friend ostream & operator<<( ostream & os,const Complex & c);
        friend istream & operator>>( istream & is,Complex & c);
};
ostream & operator<<( ostream & os,const Complex & c)
{
    os << c.real << "+" << c.imag << "i"; //以"a+bi"的形式输出
    return os;
}
istream & operator>>( istream & is,Complex & c)
{
    string s;
    is >> s; //将"a+bi"作为字符串读入,“a+bi”中间不能有空格
    int pos = s.find("+",0);
    string sTmp = s.substr(0,pos); //分离出代表实部的字符串
    c.real = atof(sTmp.c_str()); //atof库函数能将const char*指针指向的内容转换成 float
    sTmp = s.substr(pos+1, s.length()-pos-2); //分离出代表虚部的字符串
    c.imag = atof(sTmp.c_str());
    return is;
}
int main()
{
    Complex c;
    int n;
    cin >> c >> n;
    cout << c << "," << n;
    return 0;
}
运行结果可以如下：
13.2+133i 87↙
13.2+133i, 87
```

#### 6 类型转换运算符的重载

```c++
#include <iostream>
using namespace std;
class Complex
{
    double real,imag;
    public:
        Complex(double r=0,double i=0):real(r),imag(i) { };
        //重载强制类型转换运算符 double，不写返回值类型
        operator double () { return real; }
};
int main()
{
    Complex c(1.2,3.4);
    cout << (double)c << endl; //输出 1.2，等价于c.operator double()
    double n = 2 + c; //等价于 double n=2+c.operator double()
    cout << n; //输出 3.2
}

```

#### 7 自增自减运算符的重载

自增运算符++、自减运算符--有前置/后置之分，为了区分所重载的是前置运算符还是后置运算符，C++规定：

- 前置运算符作为一元运算符重载
  重载为成员函数：
  T & operator++();
  T & operator--();
  重载为全局函数：
  T1 & operator++(T2);
  T1 & operator—(T2)
- 后置运算符作为二元运算符重载，多写一个没用的参数：
  重载为成员函数：
  T operator++(int);
  T operator--(int);
  重载为全局函数：
  T1 operator++(T2,int );
  T1 operator—( T2,int);

> 但是在没有后置运算符重载而有前置重载的情况下，
>
> 在vs中，obj++也调用前置重载，而dev,则令 obj ++编译出错

```c++
int main()
{
    CDemo d(5);
    cout << (d++ ) << ","; //等价于 d.operator++(0);
    cout << d << ",";
    cout << (++d) << ","; //等价于 d.operator++();
    cout << d << endl;
    cout << (d-- ) << ","; //等价于 operator--(d,0);
    cout << d << ",";
    cout << (--d) << ","; //等价于 operator--(d);
    cout << d << endl;
    return 0;
}
```

输出结果：
5,6,7,7
7,6,5,5

##### 如何编写 CDemo?[前置++更快的原因]

```c++
class CDemo {
    private :
    	int n;
    public:
        CDemo(int i=0):n(i) { }
        CDemo & operator++(); //用于前置形式
        CDemo operator++( int ); //用于后置形式
        operator int ( ) { return n; }
        friend CDemo & operator--(CDemo & );
        friend CDemo operator--(CDemo & ,int);
};
CDemo & CDemo::operator++()
{ 	//前置 ++
    n ++;
    return * this;
} 	// ++s即为: s.operator++()
CDemo CDemo::operator++( int k )
{ 	//后置 ++
    CDemo tmp(*this); //记录修改前的对象
    n ++;
    return tmp; //返回修改前的对象
} // s++即为: s.operator++(0);
CDemo & operator--(CDemo & d)
{	//前置--
    d.n--;
    return d;
} 	//--s即为: operator--(s);
CDemo operator--(CDemo & d,int)
{	//后置--
    CDemo tmp(d);
    d.n --;
    return tmp;
} 	//s--即为: operator--(s, 0);
```

```
operator int ( ) { return n; }
```

这里，int作为一个类型强制转换运算符被重载, 此后

```
Demo s;
(int) s ; //等效于 s.int();
```

类型强制转换运算符被重载时不能写返回值类型，实际上其返回值类型就是该类型强制转换运算符代表的类型。

##### 运算符重载的注意事项:

```
1. C++不允许定义新的运算符；
2. 重载后运算符的含义应该符合日常习惯；
   		complex_a + complex_b
   		word_a > word_b
  		date_b = date_a + n
3. 运算符重载不改变运算符的优先级；
4. 以下运算符不能被重载：“.”、“.*”、“::”、“?:”、sizeof；
5. 重载运算符()、[]、->或者赋值运算符=时，运算符重载函数必须声明为类的成员函数。
```

### 五、继承

#### 1 基础和派生的基本概念

继承：在定义一个新的类B时，如果该类与某个已有的类A相似(指的是B拥有A的全部特点)，那么就可以把A作为一个基类，而把B作为基类的一个派生类(也称子类)。

- 派生类是通过对基类进行修改和扩充得到的。在派生类中，可以扩充新的成员变量和成员函数。
- 派生类一经定义后，可以独立使用，不依赖于基类。
- 派生类拥有基类的全部成员函数和成员变量，不论是private、protected、public。
  -  在派生类的各个成员函数中，不能访问基类中的private成员

##### 派生类的写法：

```
class派生类名：public 基类名
{
	
};
```

```c++
class CStudent {
    private:
    	string sName;
    	int nAge;
    public:
        bool IsThreeGood() { };
        void SetName( const string & name )
        { sName = name; }
        //......
};
class CUndergraduateStudent: public CStudent {
    private:
    	int nDepartment;
    public:
    	bool IsThreeGood() { ...... }; //覆盖
    	bool CanBaoYan() { .... };
}; //派生类的写法是：类名: public基类名
class CGraduatedStudent:public CStudent {
    private:
    	int nDepartment;
    	char szMentorName[20];
    public:
     	int CountSalary() { ... };
};
```

##### 派生类的内存空间：

派生类对象的体积，等于基类对象的体积，再加上派生类对象自己的成员变量的体积。在派生类对象中，包含着基类对象，而且基类对象的存储位置位于派生类对象新增的成员变量之前。

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220418164302029.png" alt="image-20220418164302029" style="zoom:50%;" />

#### 2 继承关系和复合关系

- 继承：**“是”关系。**
  基类 A，B是基类A的派生类。
  逻辑上要求：“一个B对象也是一个A对象”。

- 复合：**“有”关系。**
  类C中“有”成员变量k，k是类D的对象，则C和D是复合关系
  一般逻辑上要求：“D对象是C对象的固有属性或组成部分”。

  ![image-20220418171046223](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220418171046223.png)

#### 3 覆盖和保护成员

派生类可以定义一个和基类成员同名的成员，这叫覆盖。在派生类中访问这类成员时，缺省的情况是访问派生类中定义的成员。要在派生类中访问由基类定义的同名成员时，要使用`作用域符号::`。

![image-20220418171523567](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220418171523567.png)

##### 另一种存取权限说明符：protected

- 基类的private成员：可以被下列函数访问
  –基类的成员函数
  –基类的友元函数
- 基类的public成员：可以被下列函数访问
  –基类的成员函数
  –基类的友元函数
  –派生类的成员函数
  –派生类的友元函数
  –其他的函数
- 基类的protected成员：可以被下列函数访问
  –基类的成员函数
  –基类的友元函数
  –派生类的成员函数可以访问当前对象的基类的保护成员

```c++
class Father {
    private: int nPrivate; //私有成员
    public: int nPublic; //公有成员
    protected: int nProtected; // 保护成员
};
class Son :public Father{
    void AccessFather () {
        nPublic = 1; // ok;
        nPrivate = 1; // wrong
        nProtected = 1; // OK，访问从基类继承的protected成员
        Son f;
     	f.nProtected = 1; //wrong，f不是当前对象，编译错
    }
};
int main()
{
    Father f;
    Son s;
    f.nPublic = 1; // Ok
    s.nPublic = 1; // Ok
    f.nProtected = 1; // error
    f.nPrivate = 1; // error
    s.nProtected = 1; //error
    s.nPrivate = 1; // error
    return 0;
}
```

#### 4 派生类的构造函数

```c++
class Bug {
    private :
    	int nLegs; int nColor;
    public:
        int nType;
        Bug ( int legs, int color);
        void PrintBug (){ };
};
class FlyBug: public Bug // FlyBug是Bug的派生类
{
    	int nWings;
    public:
    	FlyBug( int legs,int color, int wings);
}
Bug::Bug(int legs, int color)
{
 	nLegs = legs;
	nColor = color;
}
//错误的FlyBug构造函数
FlyBug::FlyBug ( int legs,int color, int wings)
{
    nLegs = legs; //不能访问
    nColor = color; //不能访问
    nType = 1; // ok
    nWings = wings;
}
//正确的FlyBug构造函数：
FlyBug::FlyBug ( int legs, int color, int wings):Bug(legs, color)
{
	nWings = wings;
}
int main() {
    FlyBug fb ( 2,3,4);
    fb.PrintBug();
    fb.nType = 1;
    fb.nLegs = 2 ; // error. nLegs is private
    return 0;
}
```

在创建派生类的对象时，需要调用基类的构造函数：初始化派生类对象中从基类继承的成员。在执行一个派生类的构造函数之前，总是先执行基类的构造函数。

- 调用基类构造函数的两种方式
  –显式方式：在派生类的构造函数中，为基类的构造函数提供参数.
  	derived::derived(arg_derived-list):base(arg_base-list)
  –隐式方式：在派生类的构造函数中，省略基类构造函数时，派生类的构造函数则自动调用基类的默认构造函数.
- 派生类的析构函数被执行时，执行完派生类的析构函数后，自动调用基类的析构函数。


```c++
class Base {
	public:
        int n;
        Base(int i):n(i) { cout << "Base " << n << " constructed" << endl; }
        ~Base(){ cout << "Base " << n << " destructed" << endl; }
};
class Derived:public Base {
    public:
        Derived(int i):Base(i){ cout << "Derived constructed" << endl; }
        ~Derived(){ cout << "Derived destructed" << endl;}
};
int main() { 
    Derived Obj(3); 
    return 0; 
}
```

输出结果:
Base 3 constructed
Derived constructed
Derived destructed
Base 3 destructed

##### 包含成员对象的派生类的构造函数写法：

```c++
class Bug {
    private :
     	int nLegs; int nColor;
    public:
     	int nType;
    	Bug ( int legs, int color);
    	void PrintBug (){ };
};
class Skill {
	public:
 		Skill(int n) { }
};
class FlyBug: public Bug {
    	int nWings;
    	Skill sk1, sk2;
    public:
    	FlyBug( int legs, int color, int wings);
};
FlyBug::FlyBug( int legs, int color, int wings):Bug(legs,color),sk1(5),sk2(color) ,nWings(wings) {
}
```

在创建派生类的对象时:
1)先执行基类的构造函数，用以初始化派生类对象中从基类继承的成员；
2)再执行成员对象类的构造函数，用以初始化派生类对象中成员对象。
3)最后执行派生类自己的构造函数.

在派生类对象消亡时：
1)先执行派生类自己的析构函数
2)再依次执行各成员对象类的析构函数
3)最后执行基类的析构函数析构函数的调用顺序与构造函数的调用顺序相反。

#### 5 public继承的赋值兼容规则

```
class base { };
class derived : public base { };
base b;
derived d;
```

##### public继承的赋值兼容规则:

1. 派生类的对象可以赋值给基类对象
   b = d;
2. 派生类对象可以初始化基类引用
   base & br = d;
3. 派生类对象的地址可以赋值给基类指针
   base * pb = & d;

如果派生方式是 private或protected，则上述三条不可行.

##### 直接基类与简介基类

![image-20220418184602952](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220418184602952.png)

-  在声明派生类时，只需要列出它的直接基类
   - 派生类沿着类的层次自动向上继承它的间接基类
   - 派生类的成员包括
     •派生类自己定义的成员
     •直接基类中的所有成员
     •所有间接基类的全部成员

```c++
#include <iostream>
using namespace std;
class Base {
    public:
        int n;
        Base(int i):n(i) {
        	cout << "Base " << n << " constructed"<< endl;
        }
        ~Base() {
	        cout << "Base " << n << " destructed"<< endl;
        }
};
class Derived:public Base
{
    public:
        Derived(int i):Base(i) {
            cout << "Derived constructed" << endl;
        }
        ~Derived() {
            cout << "Derived destructed" << endl;
        }
};
class MoreDerived:public Derived {
    public:
        MoreDerived():Derived(4) {
            cout << "More Derived constructed" << endl;
        }
        ~MoreDerived() {
            cout << "More Derived destructed" << endl;
        }
};
int main()
{
    MoreDerived Obj;
    return 0;
}
```

输出结果：
Base 4 constructed
Derived constructed
More Derived constructed
More Derived destructed
Derived destructed
Base 4 destructed

##### 扩展：protect与private继承：

```
class base {};
class derived : protected base {};
base b;
derived d;
```

1. protected继承时，基类的public成员和protected成员成为派生类的protected成员。
2. private继承时，基类的public成员成为派生类的private成员，基类的protected成员成为派生类的不可访问成员。
3. protected和private继承不是“是”的关系。

- 公有派生的情况下,派生类对象的指针可以直接赋值给基类指针

  Base * ptrBase = &objDerived;

  ptrBase指向的是一个Derived类的对象；

  *ptrBase可以看作一个Base类的对象，访问它的public成员直接通过ptrBase即可，但不能通过ptrBase访问objDerived对象中属于Derived类而不属于Base类的成员。

- 即便基类指针指向的是一个派生类的对象，也不能通过基类指针访问基类没有，而派生类中有的成员。

- 通过强制指针类型转换，可以把ptrBase转换成Derived类的指针

  Base * ptrBase = &objDerived;

  Derived *ptrDerived = (Derived * ) ptrBase;

  程序员要保证ptrBase指向的是一个Derived类的对象，否则很容易会出错。

```c++
#include <iostream>
using namespace std;
class Base {
    protected:
    	int n;
    public:
    	Base(int i):n(i){ cout << "Base " << n << " constructed" << endl; }
   		~Base() { cout << "Base " << n << " destructed" << endl; }
		void Print() { cout << "Base:n=" << n << endl;}
};
class Derived:public Base {
    public:
        int v;
        Derived(int i):Base(i),v(2 * i) { cout << "Derived constructed" << endl; }
        ~Derived() { cout << "Derived destructed" << endl; }
        void Func() { } ;
        void Print() {
        	cout << "Derived:v=" << v << endl;
        	cout << "Derived:n=" << n << endl;
        }
};
int main() {
    Base objBase(5);
    Derived objDerived(3);
    Base * pBase = & objDerived ;
    //pBase->Func(); //err;Base类没有Func()成员函数
    //pBase->v = 5; //err; Base类没有v成员变量
    pBase->Print();
    //Derived * pDerived = & objBase; //error
    Derived * pDerived = (Derived *)(& objBase);
    pDerived->Print(); //慎用，可能出现不可预期的错误
    pDerived->v = 128; //往别人的空间里写入数据，会有问题
    objDerived.Print();
    return 0;
}
```

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220418184135138.png" alt="image-20220418184135138" style="zoom:50%;" />

输出结果：
Base 5 constructed
Base 3 constructed
Derived constructed
Base:n=3
Derived:v=1245104 //pDerived->n位于别人的空间里
Derived:n=5
Derived:v=6
Derived:n=3
Derived destructed
Base 3 destructed
Base 5 destructed

### 六、多态

#### 1 虚函数和多态的基本概念

在类的定义中，前面有 virtual关键字的成员函数就是虚函数。

virtual关键字只用在类定义里的函数声明中，写函数体时不用。

```c++
class base {
	virtual int get() ;
};
int base::get()
{ }
```

- virtual关键字只用在类定义里的函数声明中，写函数体时不用。

##### 多态的两种表现形式：

- 派生类的指针可以赋给基类指针。
- 通过基类指针调用基类和派生类中的同名虚函数时:
  （1）若该指针指向一个基类的对象，那么被调用是基类的虚函数；
  （2）若该指针指向一个派生类的对象，那么被调用的是派生类的虚函数。
  这种机制就叫做“多态”

```c++
class CBase {
    public:
    	virtual void SomeVirtualFunction() { }
};
class CDerived:public CBase {
    public :
    	virtual void SomeVirtualFunction() { }
};
int main() {
    CDerived ODerived;
    CBase * p = & ODerived;
    p -> SomeVirtualFunction(); //调用哪个虚函数取决于p指向哪种类型的对象
    return 0;
}
```

- 派生类的对象可以赋给基类引用。

- 通过基类引用调用基类和派生类中的同名虚函数时:
  （1）若该引用引用的是一个基类的对象，那么被调用是基类的虚函数；
  （2）若该引用引用的是一个派生类的对象，那么被调用的是派生类的虚函数。
  这种机制也叫做“多态”

```c++
class CBase {
    public:
    	virtual void SomeVirtualFunction() { }
};
class CDerived:public CBase {
    public :
    	virtual void SomeVirtualFunction() { }
};
int main() {
    CDerived ODerived;
    CBase & r = ODerived;
    r.SomeVirtualFunction(); //调用哪个虚函数取决于r引用哪种类型的对象
    return 0;
}
```

![image-20220419094409698](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220419094409698.png)

![image-20220419092952452](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220419092952452.png)

在面向对象的程序设计中使用多态，能够增强程序的可扩充性，即程序需要修改或增加功能的时候，需要改动和增加的代码较少。

#### 2&3 多态的实例

**用基类指针数组存放指向各种派生类对象的指针，然后遍历该数组，就能对各个派生类对象做各种操作，是很常用的做法.**

![image-20220419180929387](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220419180929387.png)

- **在非构造函数，非析构函数的成员函数中调用虚函数，是多态!!!**
- 在构造函数和析构函数中调用虚函数，不是多态。编译时即可确定，调用的函数是自己的类或基类中定义的函数，不会等到运行时才决定调用自己的还是派生类的函数。

![image-20220419181048793](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220419181048793.png)

#### 4 多态的实现原理

多态”的关键在于通过基类指针或引用调用一个虚函数时，编译时不确定到底调用的是基类还是派生类的函数，运行时才确定 ----这叫“动态联编”。“动态联编”底是怎么实现的呢？

![image-20220419182014465](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220419182014465.png)

##### 多态实现的关键 ---虚函数表

**每一个有虚函数的类（或有虚函数的类的派生类）都有一个虚函数表，该类的任何对象中都放着虚函数表的指针。**虚函数表中列出了该类的虚函数地址。多出来的4个字节就是用来放虚函数表的地址的。

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220419182028084.png" alt="image-20220419182028084" style="zoom:50%;" />

![image-20220419182101243](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220419182101243.png)

```c++
#include <iostream>
using namespace std;
class A {
	public: 
		virtual void Func() { cout << "A::Func" << endl; }
};
class B:public A {
	public: 
		virtual void Func() { cout << "B::Func" << endl; }
};
int main() {
    A a;
    A * pa = new B();
    pa->Func();
    //64位程序指针为8字节
    long long * p1 = (long long * ) & a;
    long long * p2 = (long long * ) pa;
    * p2 = * p1;
    pa->Func();
    return 0;
}
```

多态的函数调用语句被编译成一系列根据基类指针所指向的（或基类引用所引用的）对象中存放的虚函数表的地址，在虚函数表中查找虚函数地址，并调用虚函数的指令。

输出：

B::Func
A::Func

纯虚函数：没有函数体的虚函数

#### 5 虚析构函数、纯虚函数和抽象类

- 通过基类的指针删除派生类对象时，通常情况下只调用基类的析构函数
  - 但是，删除一个派生类的对象时，应该先调用派生类的析构函数，然后调用基类的析构函数。
- 解决办法：**把基类的析构函数声明为virtual**
  - 派生类的析构函数可以virtual不进行声明
  - 通过基类的指针删除派生类对象时，首先调用派生类的析构函数，然后调用基类的析构函数
- **一般来说，一个类如果定义了虚函数，则应该将析构函数也定义成虚函数。或者，一个类打算作为基类使用，也应该将析构函数定义成虚函数。**
  - 注意：不允许以虚函数作为构造函数

![image-20220420090652096](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220420090652096.png)

##### 纯虚函数和抽象类

**纯虚函数：没有函数体的虚函数**

```c++
class A {
    private: int a;
    public:
    	virtual void Print( ) = 0 ; //纯虚函数
    	void fun() { cout << "fun"; }
};
```

- **包含纯虚函数的类叫抽象类**
- 抽象类只能作为基类来派生新类使用，不能创建独立的抽象类的对象
- 抽象类的指针和引用可以指向由抽象类派生出来的类的对象

```c++
A a ; 		//错，A是抽象类，不能创建对象
A * pa ; 	//ok,可以定义抽象类的指针和引用
pa = new A; //错误, A是抽象类，不能创建对象
```

- **在抽象类的成员函数内可以调用纯虚函数，但是在构造函数或析构函数内部不能调用纯虚函数。**
- **如果一个类从抽象类派生而来，那么当且仅当它实现了基类中的所有纯虚函数，它才能成为非抽象类。**

![image-20220420090918688](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220420090918688.png)

### 七、输入、输出和模板

#### 1 输入输出流相关的类

![image-20220420104016822](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220420104016822.png)

istream是用于输入的流类，cin就是该类的对象。
ostream是用于输出的流类，cout就是该类的对象。
ifstream是用于从文件读取数据的类。
ofstream是用于向文件写入数据的类。
iostream是既能用于输入，又能用于输出的类。
fstream是既能从文件读取数据，又能向文件写入数据的类。

##### 标准流对象

- 输入流对象:   cin 与标准输入设备相连

- 输出流对象：cout 与标准输出设备相连

  - cerr与标准错误输出设备相连

  - clog 与标准错误输出设备相连

    缺省情况下
    	`cerr << "Hello,world" << endl;`
    	`clog << "Hello,world" << endl;`
    和
     	`cout <<“Hello,world” << endl;`一样

- cin对应于标准输入流，用于从键盘读取数据，也可以被**重定向**为从文件中读取数据。

- cout对应于标准输出流，用于向屏幕输出数据，也可以被**重定向**为向文件写入数据。

- cerr对应于标准错误输出流，用于向屏幕输出出错信息，

- clog对应于标准错误输出流，用于向屏幕输出出错信息，

- cerr和clog的区别在于cerr不使用缓冲区,直接向显示器输出信息；而输出到clog中的信息先会被存放在缓冲区,缓冲区满或者刷新时才输出到屏幕。

![image-20220420104723952](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220420104723952.png)

cin里面有类型强制转换运算符的重载，cin可以强制转换成bool类型。

##### istream类的成员函数：

`istream & getline(char * buf, int bufSize);`
从输入流中读取bufSize-1个字符到缓冲区buf，或读到碰到‘\n’为止（哪个先到算哪个）。
`istream & getline(char * buf, int bufSize,char delim);`
从输入流中读取bufSize-1个字符到缓冲区buf，或读到碰到delim字符为止（哪个先到算哪个）。
**两个函数都会自动在buf中读入数据的结尾添加\0’。,‘\n’或delim都不会被读入buf，但会被从输入流中取走。**如果输入流中‘\n’或delim之前的字符个数达到或超过了bufSize个，就导致读入出错，其结果就是：虽然本次读入已经完成，但是之后的读入就都会失败了。
**可以用 `if(!cin.getline(…))`判断输入是否结束**

```
bool eof();判断输入流是否结束
int peek();返回下一个字符,但不从流中去掉.
istream & putback(char c);将字符ch放回输入流
istream & ignore( int nCount = 1, int delim = EOF );
```


从流中删掉最多nCount个字符，遇到EOF时结束

![image-20220420104932739](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220420104932739.png)

![image-20220420104947952](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220420104947952.png)

#### 2 用流操纵算子控制输出

• 整数流的基数：流操纵算子dec,oct,hex,setbase
• 浮点数的精度（precision,setprecision）
• 设置域宽(setw,width)
• 用户自定义的流操纵算子
使用流操纵算子需要 `#include <iomanip>`

######  整数流的基数：流操纵算子`dec,oct,hex`

```c++
int n = 10;
cout << n << endl;
cout << hex << n << “\n”  // 十六进制
     << dec << n << “\n”  // 十进制
     << oct << n << endl; // 八进制
```

###### 控制浮点数精度的流操纵算子

precision, setprecision：

- precision是成员函数，其调用方式为：
  cout.precision(5);
- setprecision是流操作算子，其调用方式为：
  cout << setprecision(5); //可以连续输出
  它们的功能相同。都长期有效。
  **指定输出浮点数的有效位数（非定点方式输出时）**
  **指定输出浮点数的小数点后的有效位数（定点方式输出时）**
  **定点方式：小数点必须出现在个位数后面**

![image-20220420122616550](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220420122616550.png)

![image-20220420122734705](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220420122734705.png)

###### 设置域宽的流操纵算子

![image-20220420122859478](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220420122859478.png)

```c++
#include <iostream>
#include <iomanip>
using namespace std;
int main() {
	int n = 141;
    //1) 分别以十六进制、十进制、八进制先后输出 n
    cout << "1) " << hex << n << " " << dec << n << " " << oct << n << endl;
    double x = 1234567.89,y = 12.34567;
    //2) 保留5位有效数字
    cout << "2) " << setprecision(5) << x << " " << y << " " << endl;
    //3) 保留小数点后面5位
    cout << "3) " << fixed << setprecision(5) << x << " " << y << endl ;
    //4) 科学计数法输出，且保留小数点后面5位
    cout << "4) " << scientific << setprecision(5) <<x << " " << y << endl ;
    //5) 非负数要显示正号，输出宽度为12字符，宽度不足则用'*'填补
    cout << "5) " << showpos << fixed << setw(12) << setfill('*') << 12.1 << endl;
    //6) 非负数不显示正号，输出宽度为12字符，宽度不足则右边用填充字符填充
    cout << "6) " << noshowpos << setw(12) << left << 12.1 << endl;
    //7) 输出宽度为12字符，宽度不足则左边用填充字符填充
    cout << "7) " << setw(12) << right << 12.1 << endl;
    //8) 宽度不足时，负号和数值分列左右，中间用填充字符填充
    cout << "8) " << setw(12) << internal << -12.1 << endl;
    cout << "9) " << 12.1 << endl;
    return 0;
}
1) 8d 141 215
2) 1.2346e+006 12.346
3) 1234567.89000 12.34567
4) 1.23457e+006 1.23457e+001
5) ***+12.10000
6) 12.10000****
7) ****12.10000
8) -***12.10000
9) 12.10000
```

![image-20220420123026920](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220420123026920.png)

#### 3 文件读写

文件和流：**可以将顺序文件看作一个有限字符构成的顺序字符流，然后像对cin, cout一样的读写。**

![image-20220425123150111](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220425123150111.png)

##### 创建文件

• `#include <fstream> //包含头文件`
• `ofstream outFile(“clients.dat”, ios::out|ios::binary); //创建文件`
	– clients.dat   要创建的文件的名字
	– ios::out        文件打开方式
		• ios:out     输出到文件,删除原有内容
		• ios::app   输出到文件,保留原有内容，总是在尾部添加
	– ios::binary  以二进制文件格式打开文件

- 也可以先创建ofstream对象，再用 open函数打开

  ```c++
  ofstream fout;
  fout.open("test.out",ios::out|ios::binary);
  ```

- 判断打开是否成功：

  ```c++
  if（!fout）{
  	cout <<“File open error!”<<endl;
  }
  ```

- 文件名可以给出绝对路径，也可以给相对路径。没有交代路径信息，就是在当前文件夹下找文件

##### 文件名的路径

![image-20220420131533873](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220420131533873.png)

##### 文件的读写指针

- 对于输入文件,有一个读指针;
- 对于输出文件,有一个写指针;
- 对于输入输出文件,有一个读写指针;
- 标识文件操作的当前位置,该指针在哪里,读写操作就在哪里进行。

```c++
ofstream fout("a1.out",ios::app); //以添加方式打开
long location = fout.tellp(); //取得写指针的位置
location = 10;
fout.seekp(location); //将写指针移动到第10个字节处
fout.seekp(location,ios::beg); //从头数location
fout.seekp(location,ios::cur); //从当前位置数location
fout.seekp(location,ios::end); //从尾部数location
// location可以为负值

ifstream fin(“a1.in”,ios::ate);
//打开文件，定位文件指针到文件尾
long location = fin.tellg(); //取得读指针的位置
location = 10L;
fin.seekg(location); //将读指针移动到第10个字节处
fin.seekg(location,ios::beg); //从头数location
fin.seekg(location,ios::cur); //从当前位置数location
fin.seekg(location,ios::end); //从尾部数location
// location可以为负值
```

##### 显式关闭文件

```c++
ifstream fin(“test.dat”,ios::in);
fin.close();
ofstream fout(“test.dat”,ios::out);
fout.close();
```

##### 字符（文本）文件读写

- **因为文件流也是流，所以流的成员函数和流操作算子也同样适用于文件流。**
  写一个程序，将文件 in.txt里面的整数排序后，输出到out.txt
  例如，若in.txt的内容为：
  1 234 9 45 6 879
  则执行本程序后，生成的out.txt的内容为：
  1 6 9 45 234 879

```c++
#include <iostream>
#include <fstream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v;
    ifstream srcFile("in.txt",ios::in);
    ofstream destFile("out.txt",ios::out);
    int x;
    while( srcFile >> x )
    	v.push_back(x);
    sort(v.begin(),v.end());
    for( int i = 0;i < v.size();i ++ )
    	destFile << v[i] << " ";
    destFile.close();
    srcFile.close();
    return 0;
}
```

##### 二进制文件的读写

- 二进制读文件：

  ​	ifstream和 fstream的成员函数：istream& read (char* s, long n);
  将文件读指针指向的地方的n个字节内容，读入到内存地址s，然后将文件读指针向后移动n字节 (以ios::in方式打开文件时，文件读指针开始指向文件开头)。

- 二进制写文件：

  ​	ofstream和 fstream的成员函数：istream& write (const char* s, long n);
  将内存地址s处的n个字节内容，写入到文件中写指针指向的位置，然后将文件写指针向后移动n字节(以ios::out方式打开文件时，文件写指针开始指向文件开头,以ios::app方式打开文件时，文件写指针开始指向文件尾部 )。

在文件中写入和读取一个整数:

```c++
#include <iostream>
#include <fstream>
using namespace std;
int main() {
    ofstream fout("some.dat", ios::out | ios::binary);
    int x=120;
    fout.write( (const char *)(&x), sizeof(int) );
    fout.close();
    ifstream fin("some.dat",ios::in | ios::binary);
    int y;
    fin.read((char * ) &y,sizeof(int));
    fin.close();
    cout << y <<endl;
    return 0;
}
```

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220420132316257.png" alt="image-20220420132316257" style="zoom:50%;" />

![image-20220420132400246](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220420132400246.png)

![image-20220420132412747](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220420132412747.png)

##### 二进制文件读写实例

###### 将 students.dat文件的内容读出并显示

```c++
#include <iostream>
#include <fstream>
using namespace std;
struct Student {
    char name[20];
    int score;
};
int main() {
    Student s;
    ifstream inFile("students.dat",ios::in | ios::binary );
    if(!inFile) {
        cout << "error" <<endl;
        return 0;
	}
    while( inFile.read( (char* ) &s, sizeof(s) ) ) {
        int readedBytes = inFile.gcount(); //看刚才读了多少字节
        cout << s.name << " " << s.score << endl;
    }
    inFile.close();
    return 0;
}
```

输出：
Tom 60
Jack 80
Jane 40

###### 将 students.dat文件的Jane的名字改成Mike

```c++
#include <iostream>
#include <fstream>
using namespace std;
struct Student {
    char name[20];
    int score;
};
int main()
{
    Student s;
    fstream iofile( "c:\\tmp\\students.dat",
    ios::in|ios::out|ios::binary);
    if( !iofile) {
        cout << "error" ;
        return 0;
    }
    iofile.seekp( 2 * sizeof(s), ios::beg); //定位写指针到第三个记录
    iofile.write("Mike",strlen("Mike")+1);
    iofile.seekg(0,ios::beg); //定位读指针到开头
    while( iofile.read( (char* ) & s, sizeof(s)) )
    	cout << s.name << " " << s.score << endl;
    iofile.close();
	return 1;
}
```

输出：
Tom 60
Jack 80
Mike 40

二进制一般更节省空间，另外，其字节数固定，很方便查找。

##### 文件拷贝程序mycopy示例

```c++
/*用法示例：mycopy src.dat dest.dat,即将 src.dat拷贝到 dest.dat 如果 dest.dat原来就有，则原来的文件会被覆盖 */
#include <iostream>
#include <fstream>
using namespace std;
int main(int argc, char * argv[])
{
    if( argc != 3 ) {
    	cout << "File name missing!" << endl;
    	return 0;
	}
    ifstream inFile(argv[1],ios::binary|ios::in); //打开文件用于读
    if( ! inFile ) {
        cout << "Source file open error." << endl;
        return 0;
	}
    ofstream outFile(argv[2],ios::binary|ios::out); //打开文件用于写
    if( !outFile) {
        cout << "New file open error." << endl;
        inFile.close(); //打开的文件一定要关闭
        return 0;
    }
    char c;
    while( inFile.get(c)) //每次读取一个字符
    	outFile.put(c); //每次写入一个字符
    outFile.close();
    inFile.close();
    return 0;
}
```

##### 二进制文件与文本文件的区别

```
Linux,Unix下的换行符号：‘\n’ (ASCII码: 0x0a)
Windows下的换行符号：‘\r\n’ (ASCII码： 0x0d0a) endl就是 '\n'
Mac OS下的换行符号：‘\r’ (ASCII码：0x0d)
导致 Linux, Mac OS文本文件在Windows记事本中打开时不换行。

 Unix/Linux、MACOS 下打开文件，用不用 ios::binary没区别
 Windows下打开文件，如果不用 ios::binary，则：
	读取文件时，所有的 '\r\n’会被当做一个字符'\n'处理，即少读了一个字符'\r'。
	写入文件时，写入单独的'\n'时，系统自动在前面加一个'\r'，即多写了一个'\r'
```

#### 4 函数模板

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220425145434000.png" alt="image-20220425145434000" style="zoom:67%;" />

##### 用函数模板解决：

template <class 类型参数1，class 类型参数2,……>
返回值类型模板名 (形参表)
{
		函数体
};

```c++
template <class T>
void Swap(T & x,T & y)
{
    T tmp = x;
    x = y;
    y = tmp;
}
```

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220425145556621.png" alt="image-20220425145556621" style="zoom:67%;" />

**函数模板中可以有不止一个类型参数。**

```c++
template <class T1, class T2>
T2 print(T1 arg1, T2 arg2)
{
    cout<< arg1 << " "<< arg2<<endl;
    return arg2;
}
// 求数组最大元素的MaxElement函数模板
template <class T>
T MaxElement(T a[], int size) //size是数组元素个数
{
	T tmpMax = a[0];
    for( int i = 1;i < size;++i)
    	if( tmpMax < a[i] )
    		tmpMax = a[i];
    return tmpMax;
}
```

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220425145719836.png" alt="image-20220425145719836" style="zoom:67%;" />

##### 函数模板的重载

**函数模板可以重载，只要它们的形参表或类型参数表不同即可。**

```c++
template<class T1, class T2>
void print(T1 arg1, T2 arg2) {
	cout<< arg1 << " "<< arg2<<endl;
}
template<class T>
void print(T arg1, T arg2) {
	cout<< arg1 << " "<< arg2<<endl;
}
template<class T,class T2>
void print(T arg1, T arg2) {
    cout<< arg1 << " "<< arg2<<endl;
}
```

##### 函数模板和函数的次序

在有多个函数和函数模板名字相同的情况下，编译器如下处理一条函数调用语句.
1) 先找参数完全匹配的普通函数(非由模板实例化而得的函数)。
2) 再找参数完全匹配的模板函数。
3) 再找实参数经过自动类型转换后能够匹配的普通函数。
4) 上面的都找不到，则报错。

```c++
template <class T>
T Max( T a, T b) {
    cout << "TemplateMax" <<endl; 
    return 0;
}
template <class T,class T2>
T Max( T a, T2 b) {
    cout << "TemplateMax2" <<endl; 
    return 0;
}
double Max(double a, double b){
    cout << "MyMax" << endl;
    return 0;
}
int main() {
    int i=4, j=5;
    Max( 1.2,3.4); // 输出MyMax
    Max(i, j); //输出TemplateMax
    Max( 1.2, 3); //输出TemplateMax2
    return 0;
}
```

**匹配模板函数时，不进行类型自动转换**

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220425150241850.png" alt="image-20220425150241850" style="zoom:67%;" />

##### 函数模板实例：

```c++
#include <iostream>
using namespace std;
template<class T,class Pred>
void Map(T s, T e, T x, Pred op)
{
	for(; s != e; ++s,++x) {
		*x = op(*s);
	}
}
int Cube(int x) { 
    return x * x * x; 
}
double Square(double x) { 
    return x * x; 
}
int a[5] = {1,2,3,4,5}, b[5];
double d[5] = { 1.1,2.1,3.1,4.1,5.1} , c[5];
int main() {
    Map(a,a+5,b,Square);
    for(int i = 0;i < 5; ++i) cout << b[i] << ",";
    cout << endl;
    Map(a,a+5,b,Cube);
    for(int i = 0;i < 5; ++i) cout << b[i] << ",";
    cout << endl;
    Map(d,d+5,c,Square);
    for(int i = 0;i < 5; ++i) cout << c[i] << ",";
    cout << endl;
    return 0; 
}
template<class T,class Pred>
void Map(T s, T e, T x, Pred op) {
    for(; s != e; ++s,++x) {
    	*x = op(*s);
    }
}
int a[5] = {1,2,3,4,5}, b[5];
Map(a,a+5,b,Square); //实例化出以下函数:
void Map(int * s, int * e, int * x, double ( *op)(double)) {
    for(; s != e; ++s,++x) {
    	*x = op(*s);
    }
}
```

输出：
1,4,9,16,25,
1,8,27,64,125,
1.21,4.41,9.61,16.81,26.01

#### 5 类模板

为了多快好省地定义出一批相似的类,可以定义类模板,然后由类模板生成不同的类
• 数组是一种常见的数据类型，元素可以是：
–整数
–学生
–字符串
– ……
• 考虑一个可变长数组类，需要提供的基本操作
– len()：查看数组的长度
– getElement(int index)：获取其中的一个元素
– setElement(int index)：对其中的一个元素进行赋值

• 这些数组类，除了元素的类型不同之外，其他的完全相同
• 类模板：在定义类的时候，加上一个/多个类型参数。在使用类模板时，指定类型参数应该如何替换成具体类型，编译器据此生成相应的模板类

##### 类模板的定义

template <class类型参数1，class类型参数2，……> //类型参数表
class类模板名
{
		成员函数和成员变量
};

// typename与class是一回事

template <typename 类型参数1，typename  类型参数2，……>
//类型参数表
class类模板名
{
 		成员函数和成员变量
};

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220425150743401.png" alt="image-20220425150743401" style="zoom:80%;" />

```c++
template <class T1,class T2>
class Pair
{
    public:
        T1 key; //关键字
        T2 value; //值
        Pair(T1 k,T2 v):key(k),value(v) { };
        bool operator < ( const Pair<T1,T2> & p) const;
};
template<class T1,class T2>
bool Pair<T1,T2>::operator < ( const Pair<T1,T2> & p) const
//Pair的成员函数 operator <
{
	return key < p.key;
}
int main()
{
    Pair<string,int> student("Tom",19);
    //实例化出一个类 Pair<string,int>
    cout << student.key << " " << student.value;
    return 0;
}
输出：
Tom 19
```

编译器由类模板生成类的过程叫类模板的实例化。由类模板实例化得到的类，叫模板类。**同一个类模板的两个模板类是不兼容的.**

```c++
Pair<string,int> * p;
Pair<string,double> a;
p = & a; //wrong
```

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220425151039942.png" alt="image-20220425151039942" style="zoom:67%;" />

#### 6 类模板与派生

• 类模板从类模板派生
• 类模板从模板类派生
• 类模板从普通类派生
• 普通类从模板类派生

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220426145549592.png" alt="image-20220426145549592" style="zoom:50%;" />![image-20220426145639435](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220426145639435.png)

![image-20220426145639435](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220426145639435.png)

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220426145815654.png" alt="image-20220426145815654" style="zoom:80%;" />

##### 类模板与友元

• 函数、类、类的成员函数作为类模板的友元
• 函数模板作为类模板的友元
• 函数模板作为类的友元
• 类模板作为类模板的友元

![image-20220426145917912](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220426145917912.png)

![image-20220426145937454](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220426145937454.png)

![image-20220426145954116](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220426145954116.png)

##### 类模板与静态成员变量

**类模板中可以定义静态成员，那么从该类模板实例化得到的所有类，都包含同样的静态成员。**

![image-20220426150020738](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220426150020738.png)

### 八 标准模板库STL (一）

#### 1 string类

- string类是模板类：
  `typedef basic_string<char> string;`
- 使用string类要包含头文件 `<string>`
- string对象的初始化：
  – string s1("Hello");
  – string month = "March";
  – string s2(8,’x’);
- 错误的初始化方法：
  – string error1 =‘c’; //错
  – string error2(‘u’); //错
  – string error3 = 22; //错
  – string error4(8); //错
- 可以将字符赋值给string对象
  – string s;
  – s =‘n’;

```c++
#include <iostream>
#include <string>
using namespace std;
int main(int argc, char* argv[ ]){
    string s1("Hello");
    cout << s1 << endl;
    string s2(8,'x');
    cout << s2 << endl;
    string month = "March";
    cout << month << endl;
    string s;
    s='n';
    cout << s << endl;
    return 0;
}
```

输出：
Hello
xxxxxxxx
March
n

- string对象的长度用成员函数 length()读取；
  string s("hello");
  cout << s.length() << endl;
- string支持流读取运算符
  – string stringObject;
  – cin >> stringObject;
- string支持getline函数
  – string s;
  – getline(cin ,s);

##### string的赋值和连接

- 用 =赋值
  – string s1("cat"), s2;
  – s2 = s1;

- 用 assign成员函数复制
  – string s1("cat"), s3;
  – s3.assign(s1);

- 用 assign成员函数部分复制
  – string s1("catpig"), s3;
  – s3.assign(s1, 1, 3);
  – //从s1中下标为1的字符开始复制3个字符给s3

- 单个字符复制
  s2[5] = s1[3] =‘a’;

- 逐个访问string对象中的字符

  ```c++
  string s1("Hello");
  for(int i=0;i<s1.length();i++)
  cout << s1.at(i) << endl;
  ```

- 成员函数at会做范围检查，如果超出范围，会抛出out_of_range异常，而下标运算符[]不做范围检查。

- 用 +运算符连接字符串

  ```c++
  string s1("good "), s2("morning! ");
  s1 += s2;
  cout << s1;
  ```

- 用成员函数 append连接字符串

  ```c++
  string s1("good "), s2("morning! ");
  s1.append(s2);
  cout << s1;
  s2.append(s1, 3, s1.size());//s1.size()，s1字符数
  cout << s2;
  //下标为3开始，s1.size()个字符，如果字符串内没有足够字符，则复制到字符串最后一个字符
  ```

##### 比较string

- 用关系运算符比较string的大小
  – `== , >, >=, <, <=, !=`
  –返回值都是bool类型，成立返回true,否则返回false
  –例如：

  ```c++
  string s1("hello"),s2("hello"),s3("hell");
  bool b = (s1 == s2);
  cout << b << endl;
  b = (s1 == s3);
  cout << b << endl;
  b = (s1 > s3);
  cout << b << endl;
  输出：
  1
  0
  1
  ```

- 用成员函数compare比较string的大小

  ```c++
  string s1("hello"),s2("hello"),s3("hell");
  int f1 = s1.compare(s2);
  int f2 = s1.compare(s3);
  int f3 = s3.compare(s1);
  int f4 = s1.compare(1,2,s3,0,3); //s1 1-2; s3 0-3
  int f5 = s1.compare(0,s1.size(),s3);//s1 0-end
  cout << f1 << endl << f2 << endl << f3 << endl;
  cout << f4 << endl << f5 << endl;
  输出:
  0    // hello == hello
  1    // hello > hell
  -1   // hell < hello
  -1   // el < hell
  1    // hello > hell
  ```

##### 子串

**成员函数 substr**

```c++
string s1("hello world"), s2;
s2 = s1.substr(4,5); //下标4开始5个字符
cout << s2 << endl;
输出：
o wor
```

##### 交换string

**成员函数 swap**

```c++
string s1("hello world"), s2("really");
s1.swap(s2);
cout << s1 << endl;
cout << s2 << endl;
输出：
really
hello world
```

##### 寻找string中的字符

- 成员函数 find()
  – string s1("hello world");
  – s1.find("lo");
  –在s1中从**前向后查找“lo”第一次出现的地方，如果找到，返回“lo”开始的位置**，即 l所在的位置下标。如果找不到，**返回string::npos**（string中定义的静态常量）
- 成员函数 rfind()
  – string s1("hello world");
  – s1.rfind("lo");
  –在s1中**从后向前查找**“lo”**第一次出现**的地方，如果找到，返回“lo”开始的位置，即 l所在的位置下标。如果找不到，返回string::npos

```c++
// 成员函数find()可以指定查找的位置
string s1("hello worlld");
cout << s1.find("ll",1) << endl;
cout << s1.find("ll",2) << endl;
cout << s1.find("ll",3) << endl;
// 分别从下标1，2，3开始查找“ll”
输出：
2
2
9
```

- 成员函数 find_first_of()
  – string s1("hello world");
  – s1.find_first_of(“abcd");
  –在s1中从前向后查找“abcd”中**任何一个字符第一次出现的地方**，如果找到，返回找到字母的位置，如果找不到，返回string::npos。
- 成员函数 find_last_of()
  – string s1("hello world");
  – s1.find_last_of(“abcd");
  –在s1中查找“abcd”中**任何一个字符最后一次出现**的地方，如果找到，返回找到字母的位置，如果找不到，返回string::npos。
- 成员函数 find_first_not_of()
  – string s1("hello world");
  – s1.find_first_not_of(“abcd");
  –在s1中**从前向后查找不在“abcd”中的字母第一次出现的地方**，如果找到，返回找到字母的位置，如果找不到，返回string::npos。
- 成员函数 find_last_not_of()
  – string s1("hello world");
  – s1.find_last_not_of(“abcd");
  –在s1中从后向前查找不在“abcd”中的字母第一次出现的地方，如果找到，返回找到字母的位置，如果找不到，返回string::npos

```c++
string s1("hello worlld");
cout << s1.find("ll") << endl;
cout << s1.find("abc") << endl;
cout << s1.rfind("ll") << endl;
cout << s1.rfind("abc") << endl;
cout << s1.find_first_of("abcde") << endl;
cout << s1.find_first_of("abc") << endl;
cout << s1.find_last_of("abcde") << endl;
cout << s1.find_last_of("abc") << endl;
cout << s1.find_first_not_of("abcde") << endl;
cout << s1.find_first_not_of("hello world") << endl;
cout << s1.find_last_not_of("abcde") << endl;
cout << s1.find_last_not_of("hello world") << endl;
```

 输出：
2
4294967295（即string::npos）
9
4294967295
1
4294967295
11
4294967295
0
4294967295
10
4294967295

##### 删除string中的字符

**成员函数erase()**

```c++
string s1("hello worlld");
s1.erase(5);
cout << s1;
cout << s1.length();
cout << s1.size();
//去掉下标 5及之后的字符
输出：
hello55
```

##### 替换string中的字符

**成员函数 replace()**

```c++
string s1("hello world");
s1.replace(2,3,“haha");
cout << s1;
//将s1中下标2开始的3个字符换成“haha”
输出：
hehaha world

string s1("hello world");
s1.replace(2,3, "haha", 1,2);
cout << s1;
//将s1中下标2开始的3个字符换成“haha”中下标1开始的2个字符
输出：
heah world
```

##### 在string中插入字符

**成员函数insert()**

```c++
string s1("hello world");
string s2("show insert");
s1.insert(5,s2); //将s2插入s1下标5的位置
cout << s1 << endl;
s1.insert(2,s2,5,3);//将s2中下标5开始的3个字符插入s1下标2的位置
cout << s1 << endl;
输出：
helloshow insert world
heinslloshow insert world
```

##### 转换成C语言式char *字符串

- **成员函数 c_str()**

```c++
string s1("hello world");
printf("%s\n", s1.c_str());// s1.c_str()返回传统的const char *类型字符串，且该字符串以‘\0’结尾。
输出：
hello world
```

- **成员函数data()**

```c++
string s1("hello world");
const char * p1=s1.data();
for(int i=0;i<s1.length();i++)
printf("%c",*(p1+i));//s1.data()返回一个char *类型的字符串，对s1的修改可能会使p1出错。
输出：
hello world
```

##### **字符串拷贝**

成员函数copy()

```c++
string s1("hello world");
int len = s1.length();
char * p2 = new char[len+1];
s1.copy(p2,5,0);
p2[5]=0;
cout << p2 << endl;// s1.copy(p2,5,0)从s1的下标0的字符开始制作一个最长5个字符长度的字符串副本并将其赋值给p2。返回值表明实际复制字符串的长度。
输出：
hello
```

##### 字符串流处理

- 除了标准流和文件流输入输出外，还可以从string进行输入输出；
- 类似 istream和osteram进行标准流输入输出，我们用istringstream和 ostringstream进行字符串上的输入输出，也称为内存输入输出。

```c++
#include <string>
#include <iostream>
#include <sstream>
```

```c++
// 字符串输入流 istringstream
string input("Input test 123 4.7 A");
istringstream inputString(input);
string string1, string2;
int i;
double d;
char c;
inputString >> string1 >> string2 >> i >> d >> c;
cout << string1 << endl << string2 << endl;
cout << i << endl << d << endl << c <<endl;
long L;
if(inputString >> L) 
    cout << "long\n";
else 
    cout << "empty\n";
```

输出：
Input
test
123
4.7
A
empty

```c++
// 字符串输出流 ostringstream
ostringstream outputString;
int a = 10;
outputString << "This " << a << "ok" << endl;
cout << outputString.str();
```

输出：
This 10ok

#### 2 & 3 标准模板库

##### STL基本概念

###### 泛型程序设计

C++语言的核心优势之一就是便于软件的重用
C++中有两个方面体现重用：
1.面向对象的思想：继承和多态，标准类库
2.泛型程序设计(generic programming)的思想：模板机制，以及标准模板库 STL.

​	简单地说就是使用模板的程序设计法。
​	**将一些常用的数据结构（比如链表，数组，二叉树）和算法（比如排序，查找）写成模板，以后则不论数据结构里放的是什么对象，算法针对什么样的对象，则都不必重新实现数据结构，重新编写算法。**
​	标准模板库 (Standard Template Library)就是一些常用数据结构和算法的模板的集合。
​	有了STL，不必再写大多的标准数据结构和算法，并且可获得非常高的性能。

**容器：可容纳各种数据类型的通用数据结构,是类模板.**
**迭代器：可用于依次存取容器中元素，类似于指针.**
**算法：用来操作容器中的元素的函数模板.**
		sort()来对一个vector中的数据进行排序
		find()来搜索一个list中的对象
算法本身与他们操作的数据的类型无关，因此他们可以在从简单数组到高度复杂容器的任何数据结构上使用.

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220426170539163.png" alt="image-20220426170539163" style="zoom:50%;" />

##### 容器概述

可以用于存放各种类型的数据（基本类型的变量，对象等）的数据结构，都是类模版,分为三种：

1)顺序容器
	vector, deque,list
2)关联容器
	set, multiset, map, multimap
3)容器适配器
	stack, queue, priority_queue

对象被插入容器中时，被插入的是对象的一个复制品。许多算法，比如排序，查找，要求对容器中的元素进行比较，有的容器本身就是排序的，所以，放入容器的对象所属的类，往往还应该重载 ==和 <运算符。

###### 顺序容器简介

容器并非排序的，元素的插入位置同元素的值无关。有vector,deque,list三种

- vector头文件 `<vector>`

  动态数组。元素在内存连续存放。随机存取任何元素都能在常数时间完成。在尾端增删元素具有较佳的性能(大部分情况下是常数时间）。

  <img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220429091306902.png" alt="image-20220429091306902" style="zoom:33%;" />

- deque 头文件 `<deque>`

  双向队列。元素在内存连续存放。随机存取任何元素都能在常数时间完成(但次于vector)。在两端增删元素具有较佳的性能(大部分情况下是常数时间）。

  <img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220429091216435.png" alt="image-20220429091216435" style="zoom:67%;" />

- list 头文件 `<list>`

  双向链表。元素在内存不连续存放。在任何位置增删元素都能在常数时间完成(前提是已找到，找的时间不算)。不支持随机存取。

  <img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220429091256930.png" alt="image-20220429091256930" style="zoom:50%;" />

###### 关联容器简介

- 元素是排序的
- 插入任何元素，都按相应的排序规则来确定其位置
- 在查找时具有非常好的性能 
- 通常以平衡二叉树方式实现，插入和检索的时间都是 O(log(N))
- set/multiset 头文件 `<set>`
  set即集合。set中不允许相同元素，multiset中允许存在相同的元素。
- map/multimap 头文件 `<map>`
  map与set的不同在于map中存放的元素有且仅有两个成员变量，一个名为first,另一个名为second, map根据first值对元素进行从小到大排序，并可快速地根据first来检索元素。
  map同multimap的不同在于是否允许相同first值的元素。

###### 容器适配器简介

- stack :头文件 `<stack>`

  栈。是项的有限序列，并满足序列中被删除、检索和修改的项只能是最近插入序列的项（栈顶的项）。后进先出。

  <img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220429091727480.png" alt="image-20220429091727480" style="zoom:50%;" />

- queue头文件 `<queue>`

  队列。插入只可以在尾部进行，删除、检索和修改只允许从头部进行。先进先出。

  <img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220429091703843.png" alt="image-20220429091703843" style="zoom:50%;" />

- priority_queue头文件 `<queue>`

  优先级队列。最高优先级元素总是第一个出列

###### 顺序容器和关联容器中都有的成员函数：

begin 	返回指向容器中第一个元素的迭代器
end 		返回指向容器中最后一个元素后面的位置的迭代器
rbegin	返回指向容器中最后一个元素的迭代器
rend 		返回指向容器中第一个元素前面的位置的迭代器
erase 		从容器中删除一个或几个元素
clear 		从容器中删除所有元素

###### 顺序容器的常用成员函数：

front :	返回容器中第一个元素的引用
back :	返回容器中最后一个元素的引用
push_back :	在容器末尾增加新元素
pop_back :	删除容器末尾的元素
erase :	删除迭代器指向的元素(可能会使该迭代器失效），或删除一个区间，返回被删除元素后面的那个元素的迭代器

##### 迭代器

- 用于指向顺序容器和关联容器中的元素
- 迭代器用法和指针类似
- 有const和非 const两种
- 通过迭代器可以读取它指向的元素
- 通过非const迭代器还能修改其指向的元素

定义一个容器类的迭代器的方法可以是：
`容器类名::iterator 变量名;`
或：
`容器类名::const_iterator变量名;`
访问一个迭代器指向的元素：
`*迭代器变量名`

迭代器上可以执行 ++操作,以使其指向容器中的下一个元素。如果迭代器到达了容器中的最后一个元素的后面，此时再使用它，就会出错，类似于使用NULL或未初始化的指针一样。

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220429092111464.png" alt="image-20220429092111464" style="zoom:80%;" />

###### 双向迭代器

```
若p和p1都是双向迭代器，则可对p、p1可进行以下操作：
++p, p++ 使p指向容器中下一个元素
--p, p-- 使p指向容器中上一个元素
* p 取p指向的元素
p = p1 赋值
p == p1 , p!= p1 判断是否相等、不等
```

###### 随机访问迭代器

```
若p和p1都是随机访问迭代器，则可对p、p1可进行以下操作：
  双向迭代器的所有操作
  p += i将p向后移动i个元素
  p -= i将p向向前移动i个元素
  p + i值为:指向 p后面的第i个元素的迭代器
  p - i值为:指向 p前面的第i个元素的迭代器
  p[i] 值为: p后面的第i个元素的引用
  p < p1, p <= p1, p > p1, p>= p1
  p– p1 : p1和p之间的元素个数
```

| 容器           | 容器上的迭代器类别 |
| -------------- | ------------------ |
| vector         | 随机访问           |
| deque          | 随机访问           |
| list           | 双向               |
| set/multiset   | 双向               |
| map/multimap   | 双向               |
| stack          | 不支持迭代器       |
| queue          | 不支持迭代器       |
| priority_queue | 不支持迭代器       |

有的算法，例如sort，binary_search需要通过随机访问迭代器来访问容器中的元素，那么list以及关联容器就不支持该算法！

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220429092639171.png" alt="image-20220429092639171" style="zoom:80%;" />

##### 算法简介

- 算法就是一个个函数模板,大多数在`<algorithm>`中定义
- STL中提供能在各种容器中通用的算法，比如查找，排序等
- 算法通过迭代器来操纵容器中的元素。许多算法可以对容器中的一个局部区间进行操作，因此需要两个参数，一个是起始元素的迭代器，一个是终止元素的后面一个元素的迭代器。比如，排序和查找
- 有的算法返回一个迭代器。比如 find()算法，在容器中查找一个元素，并返回一个指向该元素的迭代器
- 算法可以处理容器，也可以处理普通数组

###### 算法示例：find()

```c++
template<class InIt, class T> InIt find(InIt first, InIt last, const T& val);
  first和 last这两个参数都是容器的迭代器，它们给出了容器中的查找区间起点和终点[first,last)。区间的起点是位于查找范围之中的，而终点不是。find在[first,last)查找等于val的元素
  用 == 运算符判断相等
  函数返回值是一个迭代器。如果找到，则该迭代器指向被找到的元素。如果找不到，则该迭代器等于last
```

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220429093115732.png" alt="image-20220429093115732" style="zoom:80%;" />

###### STL中的“大”、“小”和“相等

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220429093146319.png" alt="image-20220429093146319" style="zoom:80%;" />

```c++
#include <iostream>
#include <algorithm>
using namespace std;
class A {
    int v;
    public:
        A(int n):v(n) { }
        bool operator < ( const A & a2) const {
            //必须为常量成员函数
            cout << v << "<" << a2.v << "?" << endl;
            return false;
        }
        bool operator ==(const A & a2) const {
            cout << v << "==" << a2.v << "?" << endl;
            return v == a2.v;
        }
};
int main()
{
	A a [] = { A(1),A(2),A(3),A(4),A(5) };
    cout << binary_search(a,a+4,A(9));
    //折半查找
    return 0;
}
```

输出结果：
3<9?
2<9?
1<9?
9<1?
1

#### 4 vector、deque和list

###### vector示例程序

```c++
#include <iostream>
#include <vector>
using namespace std;
template<class T>
void PrintVector( T s, T e)
{
    for(; s != e; ++s)
    	cout << * s << " ";
    cout << endl;
}
int main() {
    int a[5] = { 1,2,3,4,5 };
    vector<int> v(a,a+5); //将数组a的内容放入v
    cout << "1) " << v.end() - v.begin() << endl;
    //两个随机迭代器可以相减，输出 1) 5
    cout << "2) "; PrintVector(v.begin(),v.end());
    //2) 1 2 3 4 5
    v.insert(v.begin() + 2, 13); //在begin()+2位置插入13
    cout << "3) "; PrintVector(v.begin(),v.end());
    //3) 1 2 13 3 4 5
    v.erase(v.begin() + 2); //删除位于 begin() + 2的元素
    cout << "4) "; PrintVector(v.begin(),v.end());
    //4) 1 2 3 4 5
    vector<int> v2(4,100); //v2 有4个元素，都是100
    v2.insert(v2.begin(),v.begin()+ 1,v.begin()+3);
    //将v的一段插入v2开头
    cout << "5) v2: "; PrintVector(v2.begin(),v2.end());
    //5) v2: 2 3 100 100 100 100
    v.erase(v.begin() + 1, v.begin() + 3);
    //删除 v上的一个区间,即 2,3
    cout << "6) "; PrintVector(v.begin(),v.end());
    //6) 1 4 5
    return 0;
}
```

###### 用vector实现二维数组

```c++
#include <iostream>
#include <vector>
using namespace std;
int main() {
    // 注意"<vector<int> >"这里的空格
    vector<vector<int> > v(3);
    //v有3个元素，每个元素都是vector<int>容器
    for(int i = 0;i < v.size(); ++i)
        for(int j = 0; j < 4; ++j)
        	v[i].push_back(j);
    for(int i = 0;i < v.size(); ++i) {
        for(int j = 0; j < v[i].size(); ++j)
        	cout << v[i][j] << " ";
        cout << endl;
    }
    return 0;
}
```

 程序输出结果：
0 1 2 3
0 1 2 3
0 1 2 3

###### deque

所有适用于 vector的操作都适用于 deque。**deque还有 push_front（将元素插入到最前面）和pop_front(删除最前面的元素）操作，复杂度是O(1)**

###### 双向链表list

- 在任何位置插入删除都是常数时间，不支持随机存取。

- 除了具有所有顺序容器都有的成员函数以外，还支持8个成员函数：

  ```c++
  push_front:	在前面插入，O(1)
  pop_front: 	删除前面的元素，O(1)
  sort: 		排序 ( list不支持 STL的算法 sort)
  remove: 	删除和指定值相等的所有元素
  unique: 	删除所有和前一个元素相同的元素(要做到元素不重复，则unique之前还需要 sort)
  merge: 		合并两个链表，并清空被合并的那个
  reverse:	颠倒链表
  splice: 	在指定位置前面插入另一链表中的一个或多个元素,并在另一链表中删除被插入的元素
  ```

```c++
#include <list>
#include <iostream>
#include <algorithm>
using namespace std;
class A {
	private:
    	int n;
    public:
        A( int n_ ) { n = n_; }
        friend bool operator<( const A & a1, const A & a2);
        friend bool operator==( const A & a1, const A & a2);
        friend ostream & operator <<( ostream & o, const A & a);
};
bool operator<( const A & a1, const A & a2) {
	return a1.n < a2.n;
}
bool operator==( const A & a1, const A & a2) {
	return a1.n == a2.n;
}
ostream & operator <<( ostream & o, const A & a) {
    o << a.n;
    return o;
}
template <class T>
void PrintList(const list<T> & lst) {
    //不推荐的写法，还是用两个迭代器作为参数更好
    int tmp = lst.size();
    if( tmp > 0 ) {
        typename list<T>::const_iterator i;
        i = lst.begin();
        for( i = lst.begin();i != lst.end(); i ++)
        	cout << * i << ",";
    }
}// typename用来说明 list<T>::const_iterator是个类型
//在vs中不写也可以
int main() {
    list<A> lst1,lst2;
    lst1.push_back(1);lst1.push_back(3);
    lst1.push_back(2);lst1.push_back(4);
    lst1.push_back(2);
    lst2.push_back(10);lst2.push_front(20);
    lst2.push_back(30);lst2.push_back(30);
    lst2.push_back(30);lst2.push_front(40);
    lst2.push_back(40);
    cout << "1) "; PrintList( lst1); cout << endl;
    // 1) 1,3,2,4,2,
    cout << "2) "; PrintList( lst2); cout << endl;
    // 2) 40,20,10,30,30,30,40,
    lst2.sort();
    cout << "3) "; PrintList( lst2); cout << endl;
    //3) 10,20,30,30,30,40,40,
    lst2.pop_front();
    cout << "4) "; PrintList( lst2); cout << endl;
    //4) 20,30,30,30,40,40,
    lst1.remove(2); //删除所有和A(2)相等的元素
    cout << "5) "; PrintList( lst1); cout << endl;
    //5) 1,3,4,
    lst2.unique(); //删除所有和前一个元素相等的元素
    cout << "6) "; PrintList( lst2); cout << endl;
    //6) 20,30,40,
    lst1.merge(lst2); //合并 lst2到lst1并清空lst2
    cout << "7) "; PrintList( lst1); cout << endl;
    //7) 1,3,4,20,30,40,
    cout << "8) "; PrintList( lst2); cout << endl;
    //8)
    lst1.reverse();
    cout << "9) "; PrintList( lst1); cout << endl;
    //9) 40,30,20,4,3,1,
    lst2.push_back (100);lst2.push_back (200);
    lst2.push_back (300);lst2.push_back (400);
    list<A>::iterator p1,p2,p3;
    p1 = find(lst1.begin(),lst1.end(),3);
    p2 = find(lst2.begin(),lst2.end(),200);
    p3 = find(lst2.begin(),lst2.end(),400);
    lst1.splice(p1,lst2,p2, p3);
    //将[p2,p3)插入p1之前，并从lst2中删除[p2,p3)
    cout << "10) "; PrintList( lst1); cout << endl;
    //10) 40,30,20,4,200,300,3,1,
    cout << "11) "; PrintList( lst2); cout << endl;
    //11) 100,400,
    return 0;
}
```

#### 5  函数对象

**若一个类重载了运算符”（）“,则该类的对象就成为函数对象。**

是个对象，但是用起来看上去象函数调用，实际上也执行了函数调用

```c++
class CMyAverage {
    public:
        double operator()( int a1, int a2, int a3 ) {
            //重载 ()运算符
            return (double)(a1 + a2+a3) / 3;
        }
};
CMyAverage average; //函数对象
cout << average(3,2,3); // average.operator()(3,2,3)用起来看上去象函数调用
输出
2.66667
```

###### 函数对象的应用：

STL里有以下模板：

```c++
template<class InIt, class T, class Pred> 
T accumulate(InIt first, InIt last, T val, Pred pr);
 pr 就是个函数对象。
	对[first,last)中的每个迭代器 I,
	执行 val = pr(val,* I) ,返回最终的val。
 Pr也可以是个函数。
```

Dev C++中的 Accumulate源代码:

```c++
/*  Dev C++中的 Accumulate源代码1: */
// typename等效于class
template<typename _InputIterator, typename _Tp>
_Tp accumulate(_InputIterator __first, _InputIterator __last, _Tp __init)
{
	for ( ; __first != __last; ++__first)
		__init = __init + *__first;
	return __init;
}
/* Dev C++中的 Accumulate源代码2: */
template<typename _InputIterator, typename _Tp,typename _BinaryOperation>
_Tp accumulate(_InputIterator __first, _InputIterator __last, _Tp __init, _BinaryOperation __binary_op)
{
    for ( ; __first != __last; ++__first)
    	__init = __binary_op(__init, *__first);
    return __init;
}
//调用accumulate时，和binary op对应的实参可以是个函数或函数对象
```

```c++
#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
#include <functional>
using namespace std;
int sumSquares( int total, int value)
{ 
    return total + value * value; 
}
template <class T>
void PrintInterval(T first, T last)
{ 	
    //输出区间[first,last)中的元素
    for( ; first != last; ++ first)
    	cout << * first << " ";
    cout << endl;
}
template<class T>
class SumPowers
{
    private:
    	int power;
    public:
        SumPowers(int p):power(p) { }
        const T operator() ( const T & total, const T & value)
        { 	//计算 value的power次方，加到total上
            T v = value;
            for( int i = 0;i < power - 1; ++ i)
            	v = v * value;
            return total + v;
        }
};
int main()
{
    const int SIZE = 10;
    int a1[] = { 1,2,3,4,5,6,7,8,9,10 };
    vector<int> v(a1,a1+SIZE);
    cout << "1) "; PrintInterval(v.begin(),v.end());
    int result = accumulate(v.begin(),v.end(),0,SumSquares);
    cout << "2)平方和：" << result << endl;
    result = accumulate(v.begin(),v.end(),0,SumPowers<int>(3));
    cout << "3)立方和：" << result << endl;
    result = accumulate(v.begin(),v.end(),0,SumPowers<int>(4));
    cout << "4) 4次方和：" << result;
    return 0;
}
/* 
int result = accumulate(v.begin(),v.end(),0,SumSquares);
会实例化出：
int accumulate(vector<int>::iterator first,vector<int>::iterator last, int init,int ( * op)(int,int))
{
	for ( ; first != last; ++first)
		init = op(init, *first);
	return init;
}
accumulate(v.begin(),v.end(),0,SumPowers<int>(3));
实例化出：
int accumulate(vector<int>::iterator first, vector<int>::iterator last, int init, SumPowers<int> op)
{
    for ( ; first != last; ++first)
    	init = op(init, *first);
    return init;
}
*/
```

 输出：
1) 1 2 3 4 5 6 7 8 9 10
2) 平方和：385
3) 立方和：3025
4) 4次方和：25333

###### 函数对象类模板

STL的`<functional>`里还有以下函数对象类模板：
equal_to
greater
less …….
这些模板可以用来生成函数对象。

###### greater函数对象类模板

```
template<class T>
struct greater : public binary_function<T, T, bool> {
    bool operator()(const T& x, const T& y) const {
    	return x > y;
    }
};
```

binary_function定义：

```c++
template<class Arg1, class Arg2, class Result>
struct binary_function {
    typedef Arg1 first_argument_type;
    typedef Arg2 second_argument_type;
    typedef Result result_type; 
};
```

###### greater的应用

list有两个sort函数，前面例子中看到的是不带参数的sort函数，它将list中的元素按<规定的比较方法升序排列。
list还有另一个sort函数：

```c++
template <class T2>
void sort(T2 op);
```

可以用 op来比较大小，即 op(x,y)为true则认为x应该排在前面。

```C++
#include <list>
#include <iostream>
#include <iterator>
using namespace std;
class MyLess {
	public:
        bool operator()( const int & c1, const int & c2 )
        {
            return (c1 % 10) < (c2 % 10);
        }
};
template <class T>
void Print(T first,T last) {
    for( ; first != last ; ++first ) 
        cout << *first << ",";
}
int main()
{
    const int SIZE = 5;
    int a[SIZE] = {5,21,14,2,3};
    list<int> lst(a,a+SIZE);
    lst.sort(MyLess());
    Print(lst.begin().lst.end());
    // ostream_iterator<int> output(cout,",");
    // copy( lst.begin(),lst.end(),output);
    cout << endl;
    lst.sort(greater<int>()); //greater<int>()是个对象,该语句将降序排列
    // copy(lst.begin(),lst.end(),output); 
    cout << endl;
    return 0;
} 
输出：
21,2,3,14,5,
21,14,5,3,2,
```

###### ostream_iterator

copy类似于

```c++
template <class T1,class T2>
void Copy(T1 s, T1 e, T2 x)
{
    for(; s != e; ++s,++x)
    	*x = *s;
}
```

###### 引入函数对象后，STL中的“大”，“小”关系

关联容器和STL中许多算法，都是可以自定义比较器的。在自定义了比较器op的情况下，以下三种说法是等价的：
1) x小于y
2) op(x,y)返回值为true
3) y大于x

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220429094841973.png" alt="image-20220429094841973" style="zoom:67%;" />

###### 如何编写Mymax？

```c++
#include <iostream>
#include <iterator>
using namespace std;
class MyLess
{
    public:
        bool operator() (int a1,int a2)
        {
            if( ( a1 % 10 ) < ( a2 % 10 ) )
                return true;
            else
                return false;
        }
};
bool MyCompare(int a1,int a2)
{
    if( ( a1 % 10 ) < ( a2 % 10 ) )
    	return false;
    else
    	return true;
}
int main()
{
    int a[] = {35,7,13,19,12};
    cout << MyMax(a,a+5,MyLess()) << endl;
    cout << MyMax(a,a+5,MyCompare) << endl;
    return 0;
}
输出:
19
12
// 要求写出MyMaX
template <class T, class Pred>
T MyMax( T first, T last, Pred myless)
{
    T tmpmax = first;
    for( ;first != last; ++first )
        if( myless(*tmpmax,*first))
        	tmpmax = first;
    return tmpmax;
};
```

### 九 标准模板库STL (二)

#### 1 set和multiset

##### 关联容器

set, multiset, map, multimap
内部元素有序排列，新元素插入的位置取决于它的值，查找速度快。
除了各容器都有的函数外，还支持以下成员函数：
find:查找等于某个值的元素(x小于y和y小于x同时不成立即为相等)
lower_bound :查找某个下界
upper_bound :查找某个上界
equal_range :同时查找上界和下界
count :计算等于某个值的元素个数(x小于y和y小于x同时不成立即为相等)
insert:用以插入一个元素或一个区间

##### 预备知识： pair模板

```c++
template<class _T1, class _T2>
struct pair
{
    typedef _T1 first_type;
    typedef _T2 second_type;
    _T1 first;
    _T2 second;
    pair(): first(), second() { }
    pair(const _T1& __a, const _T2& __b):first(__a), second(__b) { }
    template<class _U1, class _U2> pair(const pair<_U1, _U2>& __p):first(__p.first), second(__p.second) { }
}
```

map/multimap容器里放着的都是pair模版类的对象，且按first从小到大排序.
第三个构造函数用法示例：

```c++
pair<int,int> p(pair<double,double>(5.5,4.6));
// p.first = 5, p.second = 4
```

##### multiset

```c++
template<class Key, class Pred = less<Key>,class A = allocator<Key> >
class multiset { 
    ……
}
```

Pred类型的变量决定了multiset中的元素，“一个比另一个小”是怎么定义的。multiset运行过程中，比较两个元素x,y的大小的做法，就是生成一个 Pred类型的变量，假定为 op,若表达式op(x,y)返回值为true,则 x比y小。Pred的缺省类型是 `less<Key>`。

less模板的定义：

```c++
template<class T> struct less : public binary_function<T, T, bool>
{ 
    bool operator()(const T& x, const T& y) { return x < y ; } const; 
};
//less模板是靠<来比较大小的
```

```c++
multiset的成员函数:
iterator find(const T & val);	在容器中查找值为val的元素，返回其迭代器。如果找不到，返回end()。
iterator insert(const T & val); 	将val插入到容器中并返回其迭代器。
void insert( iterator first,iterator last);		将区间[first,last)插入容器。
int count(const T & val); 	统计有多少个元素的值和val相等。
iterator lower_bound(const T & val);	查找一个最大的位置it,使得[begin(),it)中所有的元素都比 val小。
iterator upper_bound(const T & val);	查找一个最小的位置it,使得[it,end())中所有的元素都比 val大。  
pair<iterator,iterator> equal_range(const T & val);		同时求得lower_bound和upper_bound。
iterator erase(iterator it);	删除it指向的元素，返回其后面的元素的迭代器(Visual studio 2010上如此，但是在C++标准和Dev C++中，返回值不是这样)
```

###### multiset的用法

```c++
#include <set>
using namespace std;
class A { };
int main() {
    multiset<A> a;
    a.insert( A()); //error
}
```

 `multiset <A> a;`就等价于`multiset<A, less<A>> a;`插入元素时，multiset会将被插入元素和已有元素进行比较。由于less模板是用 <进行比较的，所以,这都要求 A的对象能用 <比较，即适当重载了 <。

```c++
#include <iostream>
#include <set> //使用multiset须包含此文件
using namespace std;
template <class T>
void Print(T first, T last)
{ 
    for(;first != last ; ++first) 
        cout << * first << " ";
	cout << endl;
}
class A {
    private:
    	int n;
    public:
        A(int n_ ) { n = n_; }
        friend bool operator< ( const A & a1, const A & a2 ) { 
            return a1.n < a2.n; 
        }
        friend ostream & operator<< ( ostream & o, const A & a2 ) { 
            o << a2.n; 
            return o; 
        }
        friend class MyLess;
};
struct MyLess {
	bool operator()( const A & a1, const A & a2)
	//按个位数 比大小
	{ 
        return ( a1.n % 10 ) < (a2.n % 10); 
    }
};
typedef multiset<A> MSET1; //MSET1用 "<"比较大小
typedef multiset<A,MyLess> MSET2; //MSET2用 MyLess::operator()比较大小
int main()
{
    const int SIZE = 6;
    A a[SIZE] = { 4,22,19,8,33,40 };
    MSET1 m1;
    m1.insert(a,a+SIZE);
    m1.insert(22);
    cout << "1) " << m1.count(22) << endl; //输出 1) 2
    cout << "2) "; Print(m1.begin(),m1.end()); //输出 2) 4 8 19 22 22 33 40
    //m1元素：4 8 19 22 22 33 40
    MSET1::iterator pp = m1.find(19);
    if( pp != m1.end() ) //条件为真说明找到
    	cout << "found" << endl;
    //本行会被执行，输出 found
    cout << "3) "; cout << * m1.lower_bound(22) << "," <<* m1.upper_bound(22)<< endl;
    //输出 3) 22,33
    pp = m1.erase(m1.lower_bound(22),m1.upper_bound(22));
    //pp指向被删元素的下一个元素
    cout << "4) "; Print(m1.begin(),m1.end()); //输出 4) 4 8 19 33 40
    cout << "5) "; cout << * pp << endl; //输出 5) 33
    MSET2 m2; // m2里的元素按n的个位数从小到大排
    m2.insert(a,a+SIZE);
    cout << "6) "; Print(m2.begin(),m2.end()); //输出 6) 40 22 33 4 8 19
    return 0;
}
// iterator lower_bound(const T & val); 查找一个最大的位置it,使得[begin(),it)中所有的元素都比 val小。
```

输出：
1) 2
2) 4 8 19 22 22 33 40
3) 22,33
4) 4 8 19 33 40
5) 33
6) 40 22 33 4 8 19

##### set

```c++
template<class Key, class Pred = less<Key>,class A = allocator<Key> >
class set {
    … 
}
```

插入set中已有的元素时，忽略插入。

```c++
#include <iostream>
#include <set>
using namespace std;
int main() {
    typedef set<int>::iterator IT;
    int a[5] = { 3,4,6,1,2 };
    set<int> st(a,a+5); // st里是 1 2 3 4 6
    pair<IT,bool> result;
    result = st.insert(5); // st变成 1 2 3 4 5 6
    if( result.second ) //插入成功则输出被插入元素
   		cout << *result.first << " inserted" << endl; //输出: 5 inserted
    if( st.insert(5).second ) 
    	cout << *result.first << endl;
    else
    	cout << *result.first << " already exists" << endl; //输出 5 already exists
    pair<IT,IT> bounds = st.equal_range(4);
    cout << * bounds.first << "," << * bounds.second ; //输出：4,5
    return 0;
}
```

 输出结果：
5 inserted
5 already exists
4,5

#### 2 map和multimap

##### 预备知识： pair模板

```c++
template<class _T1, class _T2>
struct pair
{
    typedef _T1 first_type;
    typedef _T2 second_type;
    _T1 first;
    _T2 second;
    pair(): first(), second() { }
    pair(const _T1& __a, const _T2& __b):first(__a), second(__b) { }
    template<class _U1, class _U2> pair(const pair<_U1, _U2>& __p):first(__p.first), second(__p.second) { }
}
```

map/multimap容器里放着的都是pair模版类的对象，且按first从小到大排序.
第三个构造函数用法示例：

```
pair<int,int> p(pair<double,double>(5.5,4.6));
// p.first = 5, p.second = 4
```

##### multimap

```c++
template<class Key, class T, class Pred = less<Key>,class A = allocator<T> >
class multimap {
    …
    typedef pair<const Key, T> value_type;
    ……
}; //Key代表关键字的类型
```

**multimap中的元素由 <关键字,值>组成，每个元素是一个pair对象，关键字就是first成员变量,其类型是Key。**
**multimap中允许多个元素的关键字相同。元素按照first成员变量从小到大排列，缺省情况下用 `less<Key>`定义关键字的“小于”关系。**

```c++
#include <iostream>
#include <map>
using namespace std;
int main() {
    typedef multimap<int,double,less<int> > mmid;
    mmid pairs;
    cout << "1) " << pairs.count(15) << endl;
    pairs.insert(mmid::value_type(15,2.7));//typedef pair<const Key, T> value_type;
    pairs.insert(mmid::value_type(15,99.3));
    cout <<“2)” << pairs.count(15) << endl; //求关键字等于某值的元素个数
    pairs.insert(mmid::value_type(30,111.11));
    pairs.insert(mmid::value_type(10,22.22));
    pairs.insert(mmid::value_type(25,33.333));
    pairs.insert(mmid::value_type(20,9.3));
    for( mmid::const_iterator i = pairs.begin();i != pairs.end() ;i ++ )
    	cout << "(" << i->first << "," << i->second << ")" << ",";
}
```

输出：
1) 0
2) 2
(10,22.22),(15,2.7),(15,99.3),(20,9.3),(25,33.333),(30,111.11)

###### multimap例题

![image-20220507153649760](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220507153649760.png)

```c++
#include <iostream>
#include <map> //使用multimap需要包含此头文件
#include <string>
using namespace std;
class CStudent
{
	public:
        struct CInfo //类的内部还可以定义类
        {
            int id;
            string name;
        };
        int score;
        CInfo info; //学生的其他信息
};
typedef multimap<int, CStudent::CInfo> MAP_STD;
int main() {
    MAP_STD mp;
    CStudent st;
    string cmd;
    while( cin >> cmd ) {
        if( cmd == "Add") {
        	cin >> st.info.name >> st.info.id >> st.score ;
        	mp.insert(MAP_STD::value_type(st.score,st.info ));
        }
        else if( cmd == "Query" ){
            int score;
            cin >> score;
            MAP_STD::iterator p = mp.lower_bound (score);
            if( p!= mp.begin()) {
                --p;
                score = p->first; //比要查询分数低的最高分
                MAP_STD::iterator maxp = p;
                int maxId = p->second.id;
                for( ; p != mp.begin() && p->first==score; --p) {
                    //遍历所有成绩和score相等的学生
                    if( p->second.id > maxId ) {
                        maxp = p;
                        maxId = p->second.id ;
                    }
        		}
                if( p->first == score) {
                    //如果上面循环是因为 p == mp.begin()
                    //而终止，则p指向的元素还要处理
                    if( p->second.id > maxId ) {
                        maxp = p;
                        maxId = p->second.id ;
                    }
                }
                cout << maxp->second.name << "" << maxp->second.id << " " << maxp->first << endl;
            }
        	else
        		//lower_bound的结果就是 begin，说明没人分数比查询分数低
        		cout << "Nobody" << endl;
        }
    }
    return 0;
}
/* 	
	mp.insert(MAP_STD::value_type(st.score,st.info ));
	mp.insert(make_pair(st.score,st.info ));也可以，makepair是一个类模板，可以生成一个pair对象。
*/
```

##### map

```c++
template<class Key, class T, class Pred = less<Key>,class A = allocator<T> >
class map {
    …
    typedef pair<const Key, T> value_type;
    ……
};
```

**map中的元素都是pair模板类对象**。**关键字(first成员变量)各不相同。元素按照关键字从小到大排列，缺省情况下用 `less<Key>`,即“<”定义“小于”。**

###### map的[ ]成员函数

若pairs为map模版类的对象，`pairs[key]`返回对关键字等于key的元素的值(second成员变量）的引用。若没有关键字为key的元素，则会往pairs里插入一个关键字为key的元素，其值用无参构造函数初始化，并返回其值的引用。

如：`map<int,double> pairs;`则：

pairs[50] = 5;会修改pairs中关键字为50的元素，使其值变成5。
若不存在关键字等于50的元素，则插入此元素，并使其值变为5。

###### map示例

```c++
#include <iostream>
#include <map>
using namespace std;
template <class Key,class Value>
ostream & operator <<( ostream & o, const pair<Key,Value> & p)
{
	o << "(" << p.first << "," << p.second << ")";
	return o;
}
int main() {
    typedef map<int, double,less<int> > mmid;
    mmid pairs;
    cout << "1) " << pairs.count(15) << endl;
    pairs.insert(mmid::value_type(15,2.7));
    pairs.insert(make_pair(15,99.3)); //make_pair生成一个pair对象
    cout << "2) " << pairs.count(15) << endl;
    pairs.insert(mmid::value_type(20,9.3));
    mmid::iterator i;
    cout << "3) ";
    for( i = pairs.begin(); i != pairs.end() ;i ++ )
    	cout << * i << ",";
    cout << endl;
    cout << "4) ";
    int n = pairs[40];//如果没有关键字为40的元素，则插入一个
    for( i = pairs.begin(); i != pairs.end();i ++ )
    	cout << * i << ",";
    cout << endl;
    cout << "5) ";
    pairs[15] = 6.28; //把关键字为15的元素值改成6.28
    for( i = pairs.begin(); i != pairs.end();i ++ )
    	cout << * i << ",";
}
```

输出：
1) 0
2) 1
3) (15,2.7),(20,9.3),
4) (15,2.7),(20,9.3),(40,0),
5) (15,6.28),(20,9.3),(40,0),

#### 3 容器适配器

容器适配器上没有迭代器，不能用STL算法对其操作，可以用它自带的成员函数。

##### stack

- stack是后进先出的数据结构，只能插入，删除，访问栈顶的元素。
- 可用 vector, list, deque来实现。缺省情况下，用deque实现。用 vector和deque实现，比用list实现性能好。

```c++
template<class T, class Cont = deque<T> >
class stack {
	…
};
```

stack上可以进行以下操作：
	push 插入元素
	pop 弹出元素
	top 返回栈顶元素的引用

##### queue

- 和stack基本类似，可以用 list和deque实现。缺省情况下用deque实现。

```c++
template<class T, class Cont = deque<T> >
class queue {
	……
};
```

- 同样也有push, pop, top函数。

  但是push发生在队尾；pop, top发生在队头。先进先出。

- 有 back成员函数可以返回队尾元素的引用

##### priority_queue

```c++
template <class T, class Container = vector<T>,class Compare = less<T> >
class priority_queue;
```

- 和 queue类似，可以用vector和deque实现。缺省情况下用vector实现。
- priority_queue通常用堆排序技术实现，保证最大(优先级最高)的元素总是在最前面。即执行pop操作时，删除的是最大的元素；执行top操作时，返回的是最大元素的**常引用**。默认的元素比较器是`less<T>`。
- push、pop时间复杂度O(logn)
- top()时间复杂度O(1)

```c++
#include <queue>
#include <iostream>
using namespace std;
int main()
{
    priority_queue<double> pq1;
    pq1.push(3.2); pq1.push(9.8); pq1.push(9.8); pq1.push(5.4);
    while( !pq1.empty() ) {
    	cout << pq1.top() << " ";
    	pq1.pop();
    } //上面输出 9.8 9.8 5.4 3.2
    cout << endl;
    priority_queue<double,vector<double>,greater<double> > pq2;
    pq2.push(3.2); pq2.push(9.8); pq2.push(9.8); pq2.push(5.4);
    while( !pq2.empty() ) {
    	cout << pq2.top() << " ";
    	pq2.pop();
    }
    //上面输出 3.2 5.4 9.8 9.8
    return 0;
}
```

stack,queue,priority_queue都有:
	empty() 成员函数用于判断适配器是否为空
	size() 成员函数返回适配器中元素个数

#### 4 标准模板库STL（算法）

STL中的算法大致可以分为以下七类：
1)	不变序列算法
2)	变值算法
3)	删除算法
4)	变序算法
5)	排序算法
6)	有序区间算法
7)	数值算法

##### 算法介绍

大多重载的算法都是有两个版本的，其中一个是用“==”判断元素是否相等，或用“<”来比较大小；而另一个版本多出来一个类型参数“Pred”，以及函数形参“Pred op”,该版本通过表达式“op(x,y)”的返回值是ture还是false，来判断x是否“等于”y，或者x是否“小于”y。

如下面的有两个版本的min_element:
iterate min_element(iterate first,iterate last);
iterate min_element(iterate first,iterate last, Pred op);

##### 不变序列算法

此类算法不会修改算法所作用的容器或对象，适用于所有容器（顺序容器和关联容器）。它们的时间复杂度都是O(n)的。

```
min		求两个对象中较小的(可自定义比较器)
max		求两个对象中较大的(可自定义比较器)
min_element		求区间中的最小值(可自定义比较器)
max_element		求区间中的最大值(可自定义比较器)
for_each		对区间中的每个元素都做某种操作
count		计算区间中等于某值的元素个数
count_if		计算区间中符合某种条件的元素个数
find		在区间中查找等于某值的元素
find_if		在区间中查找符合某条件的元素
find_end		在区间中查找另一个区间最后一次出现的位置(可自定义比较器)
find_first_of	在区间中查找第一个出现在另一个区间中的元素 (可自定义比较器)
adjacent_find		在区间中寻找第一次出现连续两个相等元素的位置(可自定义比较器)
search		在区间中查找另一个区间第一次出现的位置(可自定义比较器)
search_n		在区间中查找第一次出现等于某值的连续n个元素(可自定义比较器)
equal		判断两区间是否相等(可自定义比较器)
mismatch		逐个比较两个区间的元素，返回第一次发生不相等的两个元素的位置(可自定义比较器)
lexicographical_compare		按字典序比较两个区间的大小(可自定义比较器)
```

###### find

```
template<class InIt, class T>
InIt find(InIt first, InIt last, const T& val);
```


返回区间 [first,last)中的迭代器 i ,使得 * i == val

###### find_if

```
template<class InIt, class Pred>
InIt find_if(InIt first, InIt last, Pred pr);
```


返回区间 [first,last)中的迭代器 i,使得 pr(*i) == true

###### for_each

```
template<class InIt, class Fun>
Fun for_each(InIt first, InIt last, Fun f);
```


对[first,last)中的每个元素 e ,执行 f(e) ,要求 f(e)不能改变e。

###### count

```
template<class InIt, class T>
size_t count(InIt first, InIt last, const T& val);
```


计算[first,last)中等于val的元素个数（x==y为True算等于）

###### count_if

```
template<class InIt, class Pred>
size_t count_if(InIt first, InIt last, Pred pr);
```


计算[first,last)中符合pr(e) == true的元素 e的个数

###### min_element:

```
template<class FwdIt>
FwdIt min_element(FwdIt first, FwdIt last);
```

返回[first,last)中最小元素的迭代器,以“<”作比较器。

**最小指没有元素比它小，而不是它比别的不同元素都小。**

因为即便a!= b, a<b和b<a有可能都不成立

###### max_element:

```
template<class FwdIt>
FwdIt max_element(FwdIt first, FwdIt last);
```


返回[first,last)中**最大元素(它不小于任何其他元素，但不见得其他不同元素都小于它）**的迭代器,以“<”作比较器。

```c++
#include <iostream>
#include <algorithm>
using namespace std;
class A {
    public: 
    	int n;
    	A(int i):n(i) { }
};
bool operator<( const A & a1, const A & a2) {
    cout << "< called,a1=" << a1.n << " a2=" << a2.n << endl;
    if( a1.n == 3 && a2.n == 7)
    	return true;
    return false;
}
int main() {
    A aa[] = { 3,5,7,2,1};
    cout << min_element(aa,aa+5)->n << endl;
    cout << max_element(aa,aa+5)->n << endl;
    return 0;
}
```

 输出：
< called,a1=5 a2=3
< called,a1=7 a2=3
< called,a1=2 a2=3
< called,a1=1 a2=3
3
< called,a1=3 a2=5
< called,a1=3 a2=7
< called,a1=7 a2=2
< called,a1=7 a2=1
7

##### 变值算法

此类算法会修改源区间或目标区间元素的值。

**值被修改的那个区间，不可以是属于关联容器的。**

```
for_each		对区间中的每个元素都做某种操作
copy			复制一个区间到别处
copy_backward	复制一个区间到别处，但目标区前是从后往前被修改的
transform		将一个区间的元素变形后拷贝到另一个区间
swap_ranges		交换两个区间内容
fill		用某个值填充区间
fill_n		用某个值替换区间中的n个元素
generate	用某个操作的结果填充区间
generate_n	用某个操作的结果替换区间中的n个元素
replace		将区间中的某个值替换为另一个值
replace_if	将区间中符合某种条件的值替换成另一个值
replace_copy	将一个区间拷贝到另一个区间，拷贝时某个值要换成新值拷过去
replace_copy_if	将一个区间拷贝到另一个区间，拷贝时符合某条件的值要换成新值拷过去
```

###### transform

```
template<class InIt, class OutIt, class Unop>
OutIt transform(InIt first, InIt last, OutIt x, Unop uop);
```

对[first,last)中的每个迭代器 I ,执行 uop( * I ) ;并将结果依次放入从 x开始的地方。
要求 uop( * I )不得改变 * I的值。
本模板返回值是个迭代器，即 x + (last-first) , x可以和 first相等。

```c++
#include <vector>
#include <iostream>
#include <numeric>
#include <list>
#include <algorithm>
#include <iterator>
using namespace std;
class CLessThen9 {
    public:
    	bool operator()( int n) { 
            return n < 9; 
        }
};
void outputSquare(int value ) { 
	cout << value * value << " "; 
}
int calculateCube(int value) { 
	return value * value * value; 
}
int main() {
    const int SIZE = 10;
    int a1[] = { 1,2,3,4,5,6,7,8,9,10};
    int a2[] = { 100,2,8,1,50,3,8,9,10,2 };
    vector<int> v(a1,a1+SIZE);
    ostream_iterator<int> output(cout," ");
    random_shuffle(v.begin(),v.end());
    cout << endl << "1) ";
    copy( v.begin(),v.end(),output);
    copy( a2,a2+SIZE,v.begin());
    cout << endl << "2）";
    cout << count(v.begin(),v.end(),8);
    cout << endl << "3）";
    cout << count_if(v.begin(),v.end(),CLessThen9());
    cout << endl << "4）";
    cout << * (min_element(v.begin(),v.end()));
    cout << endl << "5）";
    cout << * (max_element(v.begin(),v.end()));
    cout << endl << "6) ";
    cout << accumulate(v.begin(),v.end(),0);//求和
    cout << endl << "7) ";
    for_each(v.begin(),v.end(),outputSquare);
    vector<int> cubes(SIZE);
    transform(a1,a1+SIZE,cubes.begin(),calculateCube);
    cout << endl << "8) ";
    copy( cubes.begin(),cubes.end(),output);
}
```

输出：
1) 5 4 1 3 7 8 9 10 6 2
2）2
3）6
//1）是随机的
4)1
5)100
6)193
7)10000 4 64 1 2500 9 64 81 100 4
8)1 8 27 64 125 216 343 512 729 1000

```
ostream_iterator<int> output(cout ,"");
```

定义了一个`ostream_iterator<int>`对象，可以通过cout输出以“”(空格)分隔的一个个整数.

```
copy (v.begin(), v.end(), output);
```

导致v的内容在cout上输出

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509094504436.png" alt="image-20220509094504436" style="zoom:67%;" />

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509094541183.png" alt="image-20220509094541183" style="zoom:67%;" />



<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509094752695.png" alt="image-20220509094752695" style="zoom:67%;" />

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509094903825.png" alt="image-20220509094903825" style="zoom:67%;" />

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509095231256.png" alt="image-20220509095231256" style="zoom:67%;" />

##### 删除算法

删除算法会删除一个容器里的某些元素。这里所说的“删除”，并不会使容器里的元素减少，其工作过程是：将所有应该被删除的元素看做空位子，然后用留下的元素从后往前移，依次去填空位子。元素往前移后，它原来的位置也就算是空位子，也应由后面的留下的元素来填上。最后，没有被填上的空位子，维持其原来的值不变。删除算法不应作用于关联容器。

```
remove			删除区间中等于某个值的元素
remove_if		删除区间中满足某种条件的元素
remove_copy		拷贝区间到另一个区间。等于某个值的元素不拷贝
remove_copy_if	拷贝区间到另一个区间。符合某种条件的元素不拷贝
unique			删除区间中连续相等的元素，只留下一个(可自定义比较器)
unique_copy		拷贝区间到另一个区间。连续相等的元素，只拷贝第一个到目标区间 (可自定义比较器)
```

###### unique

```
template<class FwdIt>
FwdIt unique(FwdIt first, FwdIt last);
```

用 ==比较是否等.

```
template<class FwdIt, class Pred>
FwdIt unique(FwdIt first, FwdIt last, Pred pr);
```

用 pr比较是否等.
	对[first,last)这个序列中连续相等的元素，只留下第一个。
	返回值是迭代器，指向元素删除后的区间的最后一个元素的后面。

```c++
int main()
{
    int a[5] = { 1,2,3,2,5};
    int b[6] = { 1,2,3,2,5,6};
    ostream_iterator<int> oit(cout,",");
    int * p = remove(a,a+5,2);
    cout << "1) "; copy(a,a+5,oit); cout << endl;
    //输出 1) 1,3,5,2,5,
    cout << "2) " << p - a << endl; //输出 2) 3
    vector<int> v(b,b+6);
    remove(v.begin(),v.end(),2);
    cout << "3) ";copy(v.begin(),v.end(),oit);cout << endl;
    //输出 3) 1,3,5,6,5,6,
    cout << "4) "; cout << v.size() << endl;
    //v中的元素没有减少,输出 4) 6
    return 0;
}
```

##### 变序算法

变序算法改变容器中元素的顺序，但是不改变元素的值。**变序算法不适用于关联容器。**此类算法复杂度都是O(n)的。

```
reverse			颠倒区间的前后次序
reverse_copy	把一个区间颠倒后的结果拷贝到另一个区间，源区间不变
rotate			将区间进行循环左移
rotate_copy		将区间以首尾相接的形式进行旋转后的结果拷贝到另一个区间，源区间不变
next_permutation	将区间改为下一个排列(可自定义比较器)
prev_permutation	将区间改为上一个排列(可自定义比较器)
random_shuffle		随机打乱区间内元素的顺序
partition			把区间内满足某个条件的元素移到前面，不满足该条件的移到后面
stable_patition		把区间内满足某个条件的元素移到前面，不满足该条件的移到后面。而且对这两部分元素，分别保持它们原来的先后次序不变
```

###### random_shuffle :

```
template<class RanIt>
void random_shuffle(RanIt first, RanIt last);
```

随机打乱[first,last)中的元素，适用于**能随机访问的容器**。
用之前要初始化伪随机数种子:
`srand(unsigned(time(NULL))); //#include <ctime>`

###### reverse

```
template<class BidIt>
void reverse(BidIt first, BidIt last);
```


颠倒区间[first,last)顺序

###### next_permutation

```
template<class InIt>
bool next_permutaion (Init first,Init last);
```


求下一个排列的例子：

```c++
#include <iostream>
#include <algorithm>
#include <string>
using namespace std;
int main()
{
    string str = "231";
    char szStr[] = "324";
    while (next_permutation(str.begin(), str.end()))
    {
     	cout << str << endl;
    }
    cout << "****" << endl;
    while (next_permutation(szStr,szStr + 3))
    {
     	cout << szStr << endl;
    }
    sort(str.begin(),str.end());
    cout << "****" << endl;
    while (next_permutation(str.begin(), str.end()))
    {
     	cout << str << endl;
    }
    return 0;
}
/*
输出
312
321
****
342
423
432
****
132
213
231
312
321
*/
```

```c++
#include <iostream>
#include <algorithm>
#include <string>
#include <list>
#include <iterator>
using namespace std;
int main()
{
    int a[] = { 8,7,10 };
    list<int> ls(a , a + 3);
    while( next_permutation(ls.begin(),ls.end()))
    {
        list<int>::iterator i;
        for( i = ls.begin();i != ls.end(); ++i)
        	cout << * i << " ";
        cout << endl;
    }
}
```

输出：
8 10 7
10 7 8
10 8 7

##### 排序算法

排序算法比前面的变序算法复杂度更高，一般是O(n×log(n))。排序算法需要随机访问迭代器的支持，**因而不适用于关联容器和list**。

```
sort			将区间从小到大排序(可自定义比较器)。
stable_sort		将区间从小到大排序，并保持相等元素间的相对次序(可自定义比较器)。
partial_sort	对区间部分排序，直到最小的n个元素就位(可自定义比较器)。
partial_sort_copy	将区间前n个元素的排序结果拷贝到别处。源区间不变(可自定义比较器)。
nth_element		对区间部分排序，使得第n小的元素（n从0开始算）就位，而且比它小的都在它前面，比它大的都在它后面(可自定义比较器)。
make_heap		使区间成为一个“堆”(可自定义比较器)。
push_heap		将元素加入一个是“堆”区间(可自定义比较器)。
pop_heap		从“堆”区间删除堆顶元素(可自定义比较器)。
sort_heap		将一个“堆”区间进行排序，排序结束后，该区间就是普通的有序区间，不再是“堆”了(可自定义比较器)。
```

###### sort 快速排序

```
template<class RanIt>
void sort(RanIt first, RanIt last);
```

按升序排序。判断x是否应比y靠前，就看 x < y是否为true

```
template<class RanIt, class Pred>
void sort(RanIt first, RanIt last, Pred pr);
```

按升序排序。判断x是否应比y靠前，就看 pr(x,y)是否为true

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220508161955129.png" alt="image-20220508161955129" style="zoom:67%;" />

- sort实际上是快速排序，时间复杂度 O(n*log(n));
  平均性能最优。但是最坏的情况下，性能可能非常差。
- 如果要保证“最坏情况下”的性能，那么可以使用stable_sort。
  stable_sort实际上是归并排序，特点是能保持相等元素之间的先后次序。
  在有足够存储空间的情况下，复杂度为 n * l og(n)，否则复杂度为 n * log(n) * log(n)。
  stable_sort用法和 sort相同。
- 排序算法要求随机存取迭代器的支持，**所以list不能使用排序算法，要使用list::sort**。

此外还有其他排序算法：

partial_sort :   部分排序，直到前 n个元素就位即可。
nth_element :    排序，直到第 n个元素就位，并保证比第n个元素小的元素都在第 n个元素之前即可。
partition:    改变元素次序，使符合某准则的元素放在前面…

###### 堆排序

堆：一种二叉树，最大元素总是在堆顶上，二叉树中任何节点的子节点总是小于或等于父节点的值

- 什么是堆？
  n个记录的序列，其所对应的关键字的序列为｛k0, k1, k2,…, kn-1｝，若有如下关系成立时，则称该记录序列构成一个堆。
  ki≥k2i+1且 ki≥k2i+2,其中i=0, 1,…,

- 例如,下面的关键字序列构成一个堆。
  96 83 27 38 11 9
  y r p d f b k a c

- 堆排序的各种算法，如make_heap等，需要随机访问迭代器的支持。

  <img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220508162429832.png" alt="image-20220508162429832" style="zoom:50%;" />

###### make_heap函数模板

```
template<class RanIt>
void make_heap(RanIt first, RanIt last);
```


将区间 [first,last)做成一个堆。用 <作比较器

```
template<class RanIt, class Pred>
void make_heap(RanIt first, RanIt last, Pred pr);
```


将区间 [first,last)做成一个堆。用 pr作比较器

###### push_heap函数模板

```
template<class RanIt>
void push_heap(RanIt first, RanIt last);
template<class RanIt, class Pred>
void push_heap(RanIt first, RanIt last, Pred pr);
```

在[first,last-1)已经是堆的情况下，该算法能将[first,last)变成堆，时间复杂度(log(n))。
往已经是堆的容器中添加元素，可以在每次 push_back一个元素后，再调用 push_heap算法。

###### pop_heap函数模板

取出堆中最大的元素

```
template<class RanIt>
void pop_heap(RanIt first, RanIt last);
template<class RanIt, class Pred>
void pop_heap(RanIt first, RanIt last, Pred pr);
```

- 将堆中的最大元素，即 * first，移到 last–1位置，原 * (last–1 )被移到前面某个位置，并且移动后[first,last–1)仍然是个堆。
  要求原[first,last)就是个堆。
- 复杂度 O(log(n))。

##### 有序区间算法

有序区间算法要求所操作的区间是已经从小到大排好序的，而且需要随机访问迭代器的支持。**所以有序区间算法不能用于关联容器和list**。

```
binary_search	判断区间中是否包含某个元素。
includes		判断是否一个区间中的每个元素，都在另一个区间中。
lower_bound		查找最后一个不小于某值的元素的位置。
upper_bound		查找第一个大于某值的元素的位置。
equal_range		同时获取lower_bound和upper_bound。
merge			合并两个有序区间到第三个区间。
区间操作算法：
set_union		将两个有序区间的并拷贝到第三个区间
set_intersection	将两个有序区间的交拷贝到第三个区间
set_difference		将两个有序区间的差拷贝到第三个区间
set_symmetric_difference	将两个有序区间的对称差拷贝到第三个区间
inplace_merge		将两个连续的有序区间原地合并为一个有序区间
```

###### binary_search

折半查找，要求容器已经有序且支持随机访问迭代器，返回是否找到。

```c++
template<class FwdIt, class T>
bool binary_search(FwdIt first, FwdIt last, const T& val);
```

上面这个版本，比较两个元素x,y大小时,看 x < y

```c++
template<class FwdIt, class T, class Pred>
bool binary_search(FwdIt first, FwdIt last, const T& val, Pred pr);
```

上面这个版本，比较两个元素x,y大小时,若 pr(x,y)为true，则认为x小于y

```c++
#include <vector>
#include <bitset>
#include <iostream>
#include <numeric>
#include <list>
#include <algorithm>
using namespace std;
bool Greater10(int n)
{
	return n > 10;
}
int main() {
    const int SIZE = 10;
    int a1[] = { 2,8,1,50,3,100,8,9,10,2 };
    vector<int> v(a1,a1+SIZE);
    ostream_iterator<int> output(cout," ");
    vector<int>::iterator location;
    location = find(v.begin(),v.end(),10);
    if( location != v.end()) {
    	cout << endl << "1) " << location - v.begin();
    }
    location = find_if( v.begin(),v.end(),Greater10);
    if( location != v.end())
    	cout << endl << "2) " << location - v.begin();
    sort(v.begin(),v.end());
    if( binary_search(v.begin(),v.end(),9)) {
    	cout << endl << "3) " << "9 found";
    }
}
输出：
1) 8
2) 3
3) 9 found
```

###### lower_bound：

```
template<class FwdIt, class T>
FwdIt lower_bound(FwdIt first, FwdIt last, const T& val);
```

要求[first,last)是有序的，查找[first,last)中的,最大的位置 FwdIt,使得[first,FwdIt)中所有
的元素都比 val小

###### upper_bound

```
template<class FwdIt, class T>
FwdIt upper_bound(FwdIt first, FwdIt last, const T& val);
```

要求[first,last)是有序的，查找[first,last)中的,最小的位置 FwdIt,使得[FwdIt,last)中所有的元素都比 val大

###### equal_range

```
template<class FwdIt, class T>
pair<FwdIt, FwdIt> equal_range(FwdIt first, FwdIt last, const T& val);
```

要求[first,last)是有序的，返回值是一个pair,假设为 p,则：
	[first,p.first)中的元素都比 val小
	[p.second,last)中的所有元素都比 val大
	p.first就是lower_bound的结果
	p.last就是 upper_bound的结果

###### merge

```c++
template<class InIt1, class InIt2, class OutIt>
OutIt merge(InIt1 first1, InIt1 last1, InIt2 first2, InIt2 last2,OutIt x);
```

用 <作比较器

```c++
template<class InIt1, class InIt2, class OutIt, class Pred>
OutIt merge(InIt1 first1, InIt1 last1, InIt2 first2, InIt2 last2,OutIt x, Pred pr);
```

用 pr作比较器
把[first1,last1), [ first2,last2)两个**升序**序列合并，形成第3个升序序列，第3个升序序列以 x开头。

###### includes

```c++
template<class InIt1, class InIt2>
bool includes(InIt1 first1, InIt1 last1, InIt2 first2, InIt2 last2);
template<class InIt1, class InIt2, class Pred>
bool includes(InIt1 first1, InIt1 last1, InIt2 first2, InIt2 last2, Pred pr);
```

判断 [first2,last2)中的每个元素，是否都在[first1,last1)中
	第一个用 <作比较器，
	第二个用 pr作比较器, pr(x,y) == true说明 x,y相等。

###### set_difference

```c++
template<class InIt1, class InIt2, class OutIt>
OutIt set_difference(InIt1 first1, InIt1 last1, InIt2 first2, InIt2 last2, OutIt x);
template<class InIt1, class InIt2, class OutIt, class Pred>
OutIt set_difference(InIt1 first1, InIt1 last1, InIt2 first2, InIt2 last2, OutIt x, Pred pr);
```

求出[first1,last1)中，不在[first2,last2)中的元素，放到从x开始的地方。
如果 [first1,last1)里有多个相等元素不在[first2,last2)中，则这多个元素也都会被放入x代表的目标区间里。

###### set_intersection

```c++
template<class InIt1, class InIt2, class OutIt>
OutIt set_intersection(InIt1 first1, InIt1 last1, InIt2 first2, InIt2 last2, OutIt x);
template<class InIt1, class InIt2, class OutIt, class Pred>
OutIt set_intersection(InIt1 first1, InIt1 last1, InIt2 first2, InIt2 last2, OutIt x, Pred pr);
```

求出[first1,last1)和[first2,last2)中共有的元素，放到从 x开始的地方。

 若某个元素e在[first1,last1)里出现 n1次，在[first2,last2)里出现n2次，则该元素在目标区间里出现min(n1,n2)次。

###### set_symmetric_difference

```c++
template<class InIt1, class InIt2, class OutIt>
OutIt set_symmetric_difference(InIt1 first1, InIt1 last1, InIt2 first2, InIt2 last2, OutIt x);
template<class InIt1, class InIt2, class OutIt, class Pred>
OutIt set_symmetric_difference(InIt1 first1, InIt1 last1, InIt2 first2, InIt2 last2, OutIt x, Pred pr);
```

把两个区间里相互不在另一区间里的元素放入x开始的地方。

###### set_union

```
template<class InIt1, class InIt2, class OutIt>
OutIt set_union(InIt1 first1, InIt1 last1, InIt2 first2, InIt2 last2, OutIt x);
// 用<比较大小
template<class InIt1, class InIt2, class OutIt, class Pred> OutIt
set_union(InIt1 first1, InIt1 last1, InIt2 first2, InIt2 last2, OutIt x, Pred pr);
// 用 pr比较大小
```

求两个区间的并，放到以x开始的位置。
若某个元素e在[first1,last1)里出现 n1次，在[first2,last2)里出现n2次，则该元素在目标区间里出现max(n1,n2)次。

##### bitset

一个很好用的东西（类模板），暂时放这里的。主要用于设置标志位。

```
template<size_t N>
class bitset
{
 	…
};
```

实际使用的时候，N是个整型常数。
如：`bitset<40> bst;`bst是一个由40位组成的对象，用bitset的函数可以方便地访问任何一位。

###### bitset的成员函数：

```c++
bitset<N>& operator&=(const bitset<N>& rhs);
bitset<N>& operator|=(const bitset<N>& rhs);
bitset<N>& operator^=(const bitset<N>& rhs);
bitset<N>& operator<<=(size_t num);
bitset<N>& operator>>=(size_t num);
bitset<N>& set(); //全部设成1
bitset<N>& set(size_t pos, bool val = true); //设置某位
bitset<N>& reset(); //全部设成0
bitset<N>& reset(size_t pos); //某位设成0
bitset<N>& flip(); //全部翻转
bitset<N>& flip(size_t pos); //翻转某位
reference operator[](size_t pos); //返回对某位的引用
bool operator[](size_t pos) const; //判断某位是否为1
reference at(size_t pos);
bool at(size_t pos) const;
unsigned long to_ulong() const; //转换成整数
string to_string() const; //转换成字符串
size_t count() const; //计算1的个数
size_t size() const;
bool operator==(const bitset<N>& rhs) const;
bool operator!=(const bitset<N>& rhs) const;
bool test(size_t pos) const; //测试某位是否为 1
bool any() const; //是否有某位为1
bool none() const; //是否全部为0
bitset<N> operator<<(size_t pos) const;
bitset<N> operator>>(size_t pos) const;
bitset<N> operator~();
static const size_t bitset_size = N; //注意：第0位在最右边
```

### 十  C++ 11新特性

#### 新特性

##### 统一的初始化方法

![image-20220509104631302](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509104631302.png)

##### 成员变量默认初始值

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509104653400.png" alt="image-20220509104653400" style="zoom:80%;" />

##### auto关键字

![image-20220509104720840](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509104720840.png)

##### decltype关键字

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509104812255.png" alt="image-20220509104812255" style="zoom:80%;" />

##### 智能指针shared_ptr 类模板

- 头文件： `<memory>`

- 通过shared_ptr的构造函数，可以让shared_ptr对象托管一个new运算符返回的指针，写法如下：

  ```
  shared_ptr<T> ptr(new T); // T可以是 int ,char,类名等各种类型
  ```

  此后ptr就可以像 T*类型的指针一样来使用，即 *ptr就是用new动态分配的那个对象，而且不必操心释放内存的事。

- 多个shared_ptr对象可以同时托管一个指针，系统会维护一个托管计数。当无shared_ptr托管该指针时，delete该指针。
- shared_ptr对象不能托管指向动态分配的数组的指针，否则程序运行会出错

![image-20220509105003300](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509105003300.png)

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509105034082.png" alt="image-20220509105034082" style="zoom:80%;" />

##### 空指针nullptr

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509105106535.png" alt="image-20220509105106535" style="zoom:80%;" />

##### 基于范围的for循环

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509105129711.png" alt="image-20220509105129711" style="zoom:80%;" />

##### 右值引用和move语义

右值：一般来说，不能取地址的表达式，就是右值，能取地址的，就是左值

```c++
class A { };
A & r = A(); // error , A()是无名变量，是右值
A && r = A(); //ok, r是右值引用
```

主要目的是提高程序运行的效率，减少需要进行深拷贝的对象进行深拷贝的次数。

参考：
http://amazingjxq.com/2012/06/06/%E8%AF%91%E8%AF%A6%E8%A7%A3c%E5%8F%B3%E5%80%BC%E5%BC%95%E7%94%A8/
http://www.cnblogs.com/soaliap/archive/2012/11/19/2777131.htm

![image-20220509105249090](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509105249090.png)

![image-20220509105334985](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509105334985.png)

![image-20220509105345488](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509105345488.png)

##### 函数返回值为对象时，返回值对象如何初始化？

- 只写复制构造函数
  return局部对象 ->复制
  return全局对象 ->复制
- 只写移动构造函数
  return局部对象 ->移动
  return全局对象 ->默认复制
  return move(全局对向） -〉移动
- 同时写复制构造函数和移动构造函数:
  return局部对象 ->移动
  return全局对象 ->复制
  return move(全局对向） -〉移动
- dev c++中，return局部对象会导致优化，不调用移动或复制构造函数

##### 可移动但不可复制的对象：

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509105439640.png" alt="image-20220509105439640" style="zoom:80%;" />

##### 无序容器(哈希表)

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509105504014.png" alt="image-20220509105504014" style="zoom:80%;" />

##### 正则表达式

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509105538233.png" alt="image-20220509105538233" style="zoom:80%;" />

##### Lambda 表达式

只使用一次的函数对象，能否不要专门为其编写一个类？
只调用一次的简单函数，能否在调用时才写出其函数体？

![image-20220509105653647](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509105653647.png)

![image-20220509105701109](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509105701109.png)

![image-20220509105707895](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509105707895.png)

![image-20220509105724348](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509105724348.png)

##### 多线程

![image-20220509105746803](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509105746803.png)

#### 类型强制转换

static_cast、interpret_cast、const_cast和dynamic_cast

##### 1 static_cast

static_cast用来进用行比较“自然”和低风险的转换，比如整型和实数型、字符型之间互相转换。
static_cast不能来在不同类型的指针之间互相转换，也不能用于整型和指针之间的互相转换，也不能用于不同类型的引用之间的转换。

![image-20220509105901027](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509105901027.png)

##### 2 reinterpret_cast

reinterpret_cast用来进行各种不同类型的指针之间的转换、不同类型的引用之间转换、以及指针和能容纳得下指针的整数类型之间的转换。转换的时候，执行的是逐个比特拷贝的操作。

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509105931928.png" alt="image-20220509105931928" style="zoom:80%;" />

##### 3 const_cast

用来进行去除const属性的转换。将const引用转换成同类型的非const引用，将const指针转换为同类型的非const指针时用它。例如：

```c++
const string s = “Inception”;
string & p = const_cast<string&>(s);
string * ps = const_cast<string*>(&s);
// &s的类型是const string *
```

##### 4 dynamic_cast

- dynamic_cast专门用于将**多态基类**的指针或引用，强制转换为派生类的指针或引用，而且能够检查转换的安全性。对于不安全的指针转换，转换结果返回NULL指针。
- dynamic_cast不能用于将非多态基类的指针或引用，强制转换为派生类的指针或引用

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509110042453.png" alt="image-20220509110042453" style="zoom:80%;" />

Derived & r = dynamic_cast<Derived&>(b);
那该如何判断该转换是否安全呢？
答案：不安全则抛出异常

#### 异常处理

- 程序运行中总难免发生错误
   数组元素的下标超界、访问NULL指针
   除数为0
   动态内存分配new需要的存储空间太大
   ……
- 引起这些异常情况的原因：
   代码质量不高，存在BUG
   输入数据不符合要求
   程序的算法设计时考虑不周到
   …….
- 发生异常怎么办
   不只是简单地终止程序运行
   能够反馈异常情况的信息：哪一段代码发生的、什么异常
   能够对程序运行中已发生的事情做些处理：取消对输入文件的改动、释放已经申请的系统资源……
- 异常处理
   一个函数运行期间可能产生异常。在函数内部对异常进行处理未必合适。因为函数设计者无法知道函数调用者希望如何处理异常。
   告知函数调用者发生了异常，让函数调用者处理比较好
   用函数返回值告知异常不方便

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509205351078.png" alt="image-20220509205351078" style="zoom:80%;" />

##### 用try、catch进行异常处理

![image-20220509110238176](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509110238176.png)

![image-20220509110302561](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509110302561.png)

##### 异常的再抛出

如果一个函数在执行的过程中，抛出的异常在本函数内就被catch块捕获并处理了，那么该异常就不会抛给这个函数的调用者(也称“上一层的函数”)；如果异常在本函数中没被处理，就会被抛给上一层的函数。

![image-20220509110339535](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509110339535.png)

![image-20220509110347912](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509110347912.png)

##### C++标准异常类

C++标准库中有一些类代表异常，这些类都是从exception类派生而来

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509110412602.png" alt="image-20220509110412602" style="zoom:50%;" />

##### bad_cast

在用 dynamic_cast进行从多态基类对象（或引用）,到派生类的引用的强制类型转换时，如果转换是不安全的，则会抛出此异常。

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509110448046.png" alt="image-20220509110448046" style="zoom:80%;" />

##### bad_alloc

在用new运算符进行动态内存分配时，如果没有足够的内存，则会引发此异常。

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509110514552.png" alt="image-20220509110514552" style="zoom:80%;" />

##### out_of_range

用vector或string的at成员函数根据下标访问元素时，如果下标越界，就会抛出此异常。例如：

![image-20220509110543041](C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509110543041.png)

##### 运行时类型检查

C++运算符typeid是单目运算符，可以在程序运行过程中获取一个表达式的值的类型。typeid运算的返回值是一个type_info类的对象，里面包含了类型的信息。

<img src="C++%E7%BC%96%E7%A8%8B%E5%AD%A6%E4%B9%A0(B%E7%AB%99%E8%A7%86%E9%A2%91%E7%AC%94%E8%AE%B0)/image-20220509110633565.png" alt="image-20220509110633565" style="zoom:80%;" />



> 笔记Over,主要摘自课程PPT，仅供自己学习使用，如侵权，请联系删除。谢谢。
>
> write by sheen song,2022.5.9