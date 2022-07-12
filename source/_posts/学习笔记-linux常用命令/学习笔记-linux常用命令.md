---
title: '[学习笔记]-Linux常用命令'
tags:
  - Linux
categories:
  - 学习笔记
id: '480'
date: 2020-06-08 09:10:24
---

##### 1、说一些你比较常用linux指令

　　1.1、ls/ll、cd、mkdir、rm-rf、cp、mv、ps -ef | grep xxx、kill、free-m、tar -xvf file.tar、（说那么十几二十来个估计差不多了）

##### 2、查看进程（例：如何查看所有xx进程）

　　2.1、ps -ef | grep xxx

　　2.2、ps -aux | grep xxx（-aux显示所有状态）

<!--more-->

##### 3、杀掉进程

　　3.1、kill -9\[PID\] ---(PID用查看进程的方式查找)

##### 4、启动/停止服务

　　4.1、cd到bin目录cd/

　　4.2、./startup.sh --打开（先确保有足够的权限）

　　4.3、./shutdown.sh ---关闭

##### 5、查看日志

　　5.1、cd到服务器的logs目录（里面有xx.out文件）

　　5.2、tail -f xx.out --此时屏幕上实时更新日志。ctr+c停止

　　5.3、查看最后100行日志 tail -100 xx.out

　　5.4、查看关键字附件的日志。如：cat filename | grep -C 5 '关键字'（关键字前后五行。B表示前，A表示后，C表示前后） ----使用不多

　　5.5、还有vi查询啥的。用的也不多。

##### 6、查看端口：（如查看某个端口是否被占用）

　　6.1、netstat -anp | grep 端口号（状态为LISTEN表示被占用）

##### 7、查找文件

　　7.1、查找大小超过xx的文件： find . -type f -size +xxk -----(find . -type f -mtime -1 -size +100k -size-400k)--查区间大小的文件

　　7.2、通过文件名：find / -name xxxx ---整个硬盘查找

　　其余的基本上不常用

##### 8、vim（vi）编辑器　　

有命令模式、输入模式、末行模式三种模式。 　　

命令模式：查找内容(/abc、跳转到指定行(20gg)、跳转到尾行(G)、跳转到首行(gg)、删除行(dd)、插入行(o)、复制粘贴(yy,p) 　　

输入模式：编辑文件内容 　　

末行模式：保存退出(wq)、强制退出(q!)、显示文件行号(set number) 　　

在命令模式下，输入a或i即可切换到输入模式，输入冒号(:)即可切换到末行模式；在输入模式和末行模式下，按esc键切换到命令模式

原文链接：[https://www.cnblogs.com/cbslock/p/10136220.html](https://www.cnblogs.com/cbslock/p/10136220.html)

Write by sheen