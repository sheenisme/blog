---
title: C语言函数指针
tags:
  - 笔试面经
  - C/C++编程
categories:
  - 学习笔记
date: 2021-06-26 15:12:15
---

## C语言函数指针

### 前言

函数指针是什么？如何使用函数指针？函数指针到底有什么大用？本文将一一介绍。

### 如何理解函数指针

如果有int *类型变量，它存储的是int类型变量的地址；那么对于函数指针来说，它存储的就是函数的地址。函数也是有地址的，函数实际上由载入内存的一些指令组成，而指向函数的指针存储了函数指令的起始地址。如此看来，函数指针并没有什么特别的。我们可以查看程序中函数的地址：

```c
#include <stdio.h>
int test()
{
    printf("this is test function");
    return 0;
}
int main(void)
{
    test();
    return 0;
}
```

编译：

```
gcc -o testFun testFun.c
```

查看test函数相对地址(并非实际运行时的地址)：

```
$ nm testFun |grep test  #查看test函数的符号表信息
0000000000400526 T test
```

<!--more-->

### 如何声明函数指针

声明普通类型指针时，需要指明指针所指向的数据类型，而声明函数指针时，也就要指明指针所指向的函数类型，即需要指明函数的返回类型和形参类型。例如对于下面的函数原型：

```
int sum(int,int);
```

它是一个返回值为int类型，参数是两个int类型的函数，那么如何声明该类型函数的指针呢？很简单，**将函数名替换成**`(*pf)`形式即可，即我们把sum替换成`(*fp)`即可，fp为函数指针名，结果如下：

```
int （*fp）(int,int);
```

这样就声明了和sum函数类型相同的函数指针fp。这里说明两点，第一，`*`和fp为一体，说明了fp为指针类型，第二，`*fp`需要用括号括起来，否则就会变成下面的情况：

```
int *fp(int,int);
```

这种情况下，意思就大相径庭了，**它声明了一个参数为两个int类型，返回值为int类型的指针的函数，而不再是一个函数指针了**。

在经常使用函数指针之后，我们很快就会发现，每次声明函数指针都要带上长长的形参和返回值，非常不便。这个时候，我们应该想到使用typedef，即为某类型的函数指针起一个别名，使用起来就方便许多了。例如，对于前面提到的函数可以使用下面的方式声明：

```
typedef int (*myFun)(int,int);//为该函数指针类型起一个新的名字
myFun f1;       //声明myFun类型的函数指针f1
```

上面的myFun就是一个函数指针类型，在其他地方就可以很方便地用来声明变量了。typedef的使用不在本文的讨论范围，但是特别强调一句，**typedef中声明的类型在变量名的位置出现**，理解了这一句，也就很容易使用typedef了。因而下面的方式是错误的：

```
typedef myFun (int)(int,int);   //错误
typedef (int)(int,int)  *myFun;   //错误
```

### 为函数指针赋值

赋值也很简单，既然是指针，将对应指针类型赋给它既可。例如：

```c++
#include<stdio.h>
int test(int a,int b)
{
    /*do something*/
    return 0
}
typedef int(*fp)(int,int);
int main(void)
{
    fp f1 = test; //表达式1
    fp f2 = &test;//表达式2
    printf("%p\n",f1);
    printf("%p\n",f2);
    return 0;
}
```

在这里，声明了返回类型为int，接受两个int类型参数的函数指针f1和f2，分别给它们进行了赋值。**表达式1和表达式2在作用上并没有什么区别**。因为函数名在被使用时总是由编译器把它转换为函数指针，而前面加上&不过显式的说明了这一点罢了。

### 调用

调用也很容易，把它看成一个普通的函数名即可：

```c
#include<stdio.h>
int test(int a,int b)
{
    /*do something*/
    printf("%d,%d\n",a,b);
    return 0
}
typedef int(*fp)(int,int);
int main(void)
{
    fp f = test; 
    f(1,2);//表达式1
    (*f)(3,4);//表达式2
    return 0;
}
```

在函数指针后面加括号，并传入参数即可调用，其中表达式1和表达式2似乎都可以成功调用，但是哪个是正确的呢？ANSI C认为这两种形式等价。

### 函数指针有何用

函数指针的应用场景比较多，以库函数qsort排序函数为例，它的原型如下：

```
void qsort(void *base,size_t nmemb,size_t size , int(*compar)(const void *,const void *));
```

看起来很复杂对不对？拆开来看如下：

```
void qsort(void *base, size_t nmemb, size_t size, );
```

拿掉第四个参数后，很容易理解，它是一个无返回值的函数，接受4个参数，第一个是void*类型，代表原始数组，第二个是size_t类型，代表数据数量，第三个是size_t类型，代表单个数据占用空间大小，而第四个参数是函数指针。这第四个参数，即函数指针指向的是什么类型呢？

```
int(*compar)(const void *,const void *)
```

很显然，这是一个接受两个const void*类型入参，返回值为int的函数指针。
到这里也就很清楚了。这个参数告诉qsort，应该使用哪个函数来比较元素，即只要我们告诉qsort比较大小的规则，它就可以帮我们对任意数据类型的数组进行排序。

在这里函数指针作为了参数，而他同样可以作为返回值，创建数组，作为结构体成员变量等等，它们的具体应用我们在后面的文章中会介绍，本文不作展开。本文只介绍一个简单实例。

### 实例介绍

我们通过一个实例来看函数指针怎么使用。假设有一学生信息，需要按照学生成绩进行排序，该如何处理呢？

```c
#include <stdio.h>
#include <stdlib.h>
#define STU_NAME_LEN 16
/*学生信息*/
typedef struct student_tag
{
    char name[STU_NAME_LEN];  //学生姓名
    unsigned int id;          //学生学号
    int score;                //学生成绩
}student_t;
int studentCompare(const void *stu1,const void *stu2)
{
　　/*强转成需要比较的数据结构*/
    student_t *value1 = (student_t*)stu1;
    student_t *value2 = (student_t*)stu2;
    return value1->score-value2->score;
}
int main(void)
{
    /*创建三个学生信息*/
    student_t stu1 = {"one",1,99};
    student_t stu2 = {"two",2,77};
    student_t stu3 = {"three",3,88};
    
    student_t stu[] = {stu1,stu2,stu3};
    
    /*排序，将studentCompare作为参数传入qsort*/
    qsort((void*)stu,3,sizeof(student_t),studentCompare);
    int loop = 0;
    
    /**遍历输出*/
    for(loop = 0; loop < 3;loop++)
    {
   printf("name:%s,id:%u,score:%d\n",stu[loop].name,stu[loop].id,stu[loop].score);
    }
    return 0;
}
```

我们创建了一个学生信息结构，结构成员包括名字，学号和成绩。main函数中创建了一个包含三个学生信息的数组，并使用qsort函数对数组按照学生成绩进行排序。qsort函数第四个参数是函数指针，因此我们需要传入一个函数指针，并且这个函数指针的入参是cont void *类型，返回值为int。我们通过前面的学习知道了函数名本身就是指针，因此只需要将我们自己实现的studentCompare作为参数传入即可。

最终运行结果如下：

```
name:two,id:2,score:77
name:three,id:3,score:88
name:one,id:1,score:99
```

可以看到，最终学生信息按照分数从低到高输出。

### 总结

本文介绍了函数指针的声明和简单使用。更多使用将在后面的文章介绍，本文总结如下：

- 函数指针与其他指针类型无本质差异，不过它指向的是函数的地址罢了。
- 声明函数指针需要指明函数的返回类型和形参类型。
- 函数名在被使用时总是由编译器把它转换为函数指针。
- 要想声明函数指针，只需写出函数原型，然后将函数名用(*fp)代替即可。这里fp是声明的函数指针变量。
- typedef中声明的类型在变量名的位置出现。



原文链接：https://www.yanbinghu.com/2019/01/03/3593.html