---
title: '[学习笔记]-redis安装小记（windows）'
tags:
  - redis
categories:
  - 学习笔记
  - 安装小记
id: '523'
date: 2020-06-29 21:15:53
---
> Redis是有名的NoSql数据库，一般Linux都会默认支持。但在Windows环境中，可能需要手动安装设置才能有效使用。这里就简单介绍一下Windows下Redis服务的安装方法，希望能够帮到你。

<!--more-->

1、要安装Redis，首先要获取安装包。Windows的Redis安装包需要到以下GitHub链接找到。链接：[https://github.com/MSOpenTech/redis](https://github.com/MSOpenTech/redis)。打开网站后，找到Release，点击前往下载页面。

![](%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-redis%E5%AE%89%E8%A3%85%E5%B0%8F%E8%AE%B0%EF%BC%88windows%EF%BC%89/o_1.png)

2、在下载网页中，找到最后发行的版本（此处是3.2.100）。找到Redis-x64-3.2.100.msi和Redis-x64-3.2.100.zip，点击下载。这里说明一下，第一个是msi微软格式的安装包，第二个是压缩包。

> PS：_上面的这个链接貌似不可用的，读者百度可以直接找到最新链接。_这里推荐[https://github.com/tporadowski/redis/releases](https://github.com/tporadowski/redis/releases)

![](%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-redis%E5%AE%89%E8%A3%85%E5%B0%8F%E8%AE%B0%EF%BC%88windows%EF%BC%89/o_2.png)

3、双击刚下载好的msi格式的安装包（Redis-x64-3.2.100.msi）开始安装。

![](%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-redis%E5%AE%89%E8%A3%85%E5%B0%8F%E8%AE%B0%EF%BC%88windows%EF%BC%89/o_3.png)

4、选择“同意协议”，点击下一步继续。

![](%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-redis%E5%AE%89%E8%A3%85%E5%B0%8F%E8%AE%B0%EF%BC%88windows%EF%BC%89/o_4.png)

5、选择“添加Redis目录到环境变量PATH中”，这样方便系统自动识别Redis执行文件在哪里。

![](%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-redis%E5%AE%89%E8%A3%85%E5%B0%8F%E8%AE%B0%EF%BC%88windows%EF%BC%89/o_5.png)

6、端口号可保持默认的6379，并选择防火墙例外，从而保证外部可以正常访问Redis服务。

![](%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-redis%E5%AE%89%E8%A3%85%E5%B0%8F%E8%AE%B0%EF%BC%88windows%EF%BC%89/o_6.png)

7、设定最大值为100M。作为实验和学习，100M足够了。

![](%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-redis%E5%AE%89%E8%A3%85%E5%B0%8F%E8%AE%B0%EF%BC%88windows%EF%BC%89/o_7.png)

8、点击安装后，正式的安装过程开始。稍等一会即可完成。

9、安装完毕后，需要先做一些设定工作，以便服务启动后能正常运行。使用文本编辑器，这里使用Notepad++，打开Redis服务配置文件。**注意：不要找错了，通常为redis.windows-service.conf，而不是redis.windows.conf。后者是以非系统服务方式启动程序使用的配置文件。**

![](%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-redis%E5%AE%89%E8%A3%85%E5%B0%8F%E8%AE%B0%EF%BC%88windows%EF%BC%89/o_9.png)

10、找到含有requirepass字样的地方，追加一行，输入requirepass 12345。这是访问Redis时所需的密码，一般测试情况下可以不用设定密码。不过，即使是作为本地访问，也建议设定一个密码。此处以简单的12345来演示。

![](%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-redis%E5%AE%89%E8%A3%85%E5%B0%8F%E8%AE%B0%EF%BC%88windows%EF%BC%89/o_10.png)

11、点击“开始”>右击“计算机”>选择“管理”。在左侧栏中依次找到并点击“计算机管理（本地）”>服务和应用程序>服务。再在右侧找到Redis名称的服务，查看启动情况。如未启动，则手动启动之。正常情况下，服务应该正常启动并运行了。

![](%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-redis%E5%AE%89%E8%A3%85%E5%B0%8F%E8%AE%B0%EF%BC%88windows%EF%BC%89/o_11.png)

12、最后来测试一下Redis是否正常提供服务。进入Redis的目录，cd C:\\Program Files\\Redis。输入redis-cli并回车。（redis-cli是客户端程序）如图正常提示进入，并显示正确端口号，则表示服务已经启动。

![](%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-redis%E5%AE%89%E8%A3%85%E5%B0%8F%E8%AE%B0%EF%BC%88windows%EF%BC%89/o_12.png)

13、使用服务前需要先通过密码验证。输入“auth 12345”并回车（12345是之前设定的密码）。返回提示OK表示验证通过。

![](%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-redis%E5%AE%89%E8%A3%85%E5%B0%8F%E8%AE%B0%EF%BC%88windows%EF%BC%89/o_13.png)

14、实际测试一下读写。输入set mykey1 "I love you all!”并回车，用来保存一个键值。再输入get mykey1，获取刚才保存的键值。

![](%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-redis%E5%AE%89%E8%A3%85%E5%B0%8F%E8%AE%B0%EF%BC%88windows%EF%BC%89/o_14.png)

##### 15、注意事项

*   1.Windows使用的这个Redis是64位版本的，32位操作系统的同学就不要折腾了。
*   2.**作为服务运行的Redis配置文件，通常为redis.windows-service.conf，而不是redis.windows.conf。小心不要选错了。**

##### 16、修改密码：

###### （1）命令行方式设置

1.使用命令行设置的基本语法。

![](%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-redis%E5%AE%89%E8%A3%85%E5%B0%8F%E8%AE%B0%EF%BC%88windows%EF%BC%89/8a17b3042e6817e9599a304cd356d53da924ced2.png)

2.在命令行模式输入，redis-cli 连接到redis

![](%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-redis%E5%AE%89%E8%A3%85%E5%B0%8F%E8%AE%B0%EF%BC%88windows%EF%BC%89/a965c6e9ccd2bb664122bbf49b2a04e23fa2c6d2.png)

3\. 使用config set requirepass 命令设置密码[](http://jingyan.baidu.com/album/ff42efa9501763819e2202e4.html?picindex=3)

![](%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-redis%E5%AE%89%E8%A3%85%E5%B0%8F%E8%AE%B0%EF%BC%88windows%EF%BC%89/116b1ae23ea23a42b6019ea43733ec3835bbc0d2.png)

我的尝试截图：

![](%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-redis%E5%AE%89%E8%A3%85%E5%B0%8F%E8%AE%B0%EF%BC%88windows%EF%BC%89/image-20200624224934922.png)

###### （2）通过配置文件设置密码

1.打开redis的配置文件

![](%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-redis%E5%AE%89%E8%A3%85%E5%B0%8F%E8%AE%B0%EF%BC%88windows%EF%BC%89/image-20200624225425662.png)

2.在配置文件中设置密码的格式参考

![](%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-redis%E5%AE%89%E8%A3%85%E5%B0%8F%E8%AE%B0%EF%BC%88windows%EF%BC%89/image-20200624225319989.png)

3.通过配置文件设置密码，重启redis服务即可生效

![](%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-redis%E5%AE%89%E8%A3%85%E5%B0%8F%E8%AE%B0%EF%BC%88windows%EF%BC%89/efb861bd4c7c34b31b3a0d0e5841037de03731d3.png)

##### 17、Redis常用的指令

卸载服务：redis-server --service-uninstall 开启服务：redis-server --service-start 停止服务：redis-server --service-stop

原文链接：[https://www.cnblogs.com/jaign/articles/7920588.html](https://www.cnblogs.com/jaign/articles/7920588.html) （本文增加了密码修改）

Write by sheen