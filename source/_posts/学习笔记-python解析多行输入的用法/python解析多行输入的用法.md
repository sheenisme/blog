---
title: 'Python3 多行数据输入中三种重要的用法：'
tags:
  - python
categories:
  - 学习笔记
date: 2021-02-10 21:40:12
---

# Python3 多行数据输入中三种重要的用法：

![](python%E8%A7%A3%E6%9E%90%E5%A4%9A%E8%A1%8C%E8%BE%93%E5%85%A5%E7%9A%84%E7%94%A8%E6%B3%95/20210210.jpg)

1. input().split()用法
2. map()用法
3. str.split()用法

<!--more-->

## 测试用例：

### input().split()用法

input() 接收多个用户输入需要与split()结合使用

host, port, username, passwd, dbname = input("请输入服务器地址,端口号,用户名，密码及数据库名，空格隔开：").split()

##### 注意input()的返回类型是str

print(host,port,username,passwd,dbname)

结果：

请输入服务器地址,端口号,用户名，密码及数据库名，空格隔开：10.1.1.71 22 root 123456 db_name

10.1.1.71 22 root 123456 db_name

注意返回的数据类型是str，如果是整数需要转化为int才可正常使用

nm = list(map(int,input().split(" ")))

N = nm[0]

M = nm[1]

### map()用法

**map()** 会根据提供的函数对指定序列做映射。第一个参数 function 以参数序列中的每一个元素调用 function 函数，返回包含每次 function 函数返回值的新列表。

map(function, iterable, …)

function – 函数

iterable – 一个或多个序列

返回值：

Python 2.x 返回列表。

Python 3.x 返回迭代器。

所以Python 3.x要加list()函数将迭代器转化为列表。

**举例：**

def f(x):

​	return x*x

print(list(map(f, [1, 2, 3, 4, 5, 6, 7, 8, 9])))

输出：

[1, 4, 9, 10, 25, 36, 49, 64, 81]

**用匿名函数**：

print(list(map(lambda x: x ** 2, [1, 2, 3, 4, 5])))

输出：

[1, 4, 9, 16, 25]

### str.split()用法

说明：

str.split(str="", num=string.count(str))

str是分隔符(默认为所有的空字符，包括空格、换行(\n)、制表符(\t)等)，num是分隔次数，如果参数 num 有指定值，则分隔成num+1 个子字符串

举例1：

txt = "Google#Facebook#Runoob#Taobao"

x = txt.split("#", 1)

print(x)

输出结果：

['Google', 'Facebook#Runoob#Taobao']

举例：

txt = "Google#Facebook#Runoob#Taobao"

x = txt.split("#", 2)

print(x)

输出结果：

['Google', 'Facebook', 'Runoob#Taobao']