---
title: '[学习笔记]-python爬虫基础学习'
tags:
  - python
  - 网络爬虫
categories:
  - 学习笔记
id: '398'
date: 2020-04-13 19:24:52
---

### 一、合法性

几乎每一个网站都有一个名为robots.txt的文档，当然也有部分网站没有设定robots.txt。对于没有设定robots.txt的网站可以通过网络爬虫获取没有口令加密的数据，也就是该网站所有页面数据都可以爬取。如果网站有robots.txt文档，就要判断是否有禁止访客获取的数据。

<!--more-->

### 二、网页结构

网页一般由三部分组成，分别是HTML（超文本标记语言）、CSS（层叠样式表）和JScript（活动脚本语言）。

> 如果用人体来比喻，HTML是人的骨架，并且定义了人的嘴巴、眼睛、耳朵等要长在哪里。CSS是人的外观细节，如嘴巴长什么样子，眼睛是双眼皮还是单眼皮，是大眼睛还是小眼睛，皮肤是黑色的还是白色的等。JScript表示人的技能，例如跳舞、唱歌或者演奏乐器等。

HTML是整个网页的结构，相当于整个网站的框架。带“<”、“>”符号的都是属于HTML的标签，并且标签都是成对出现的。

CSS表示样式，<style type="text/css"> 表示下面引用一个CSS，在CSS中定义了外观。

JScript表示功能。交互的内容和各种特效都在JScript中，JScript描述了网站中的各种功能。

### 三、使用requests库

#### 1.爬虫的基本原理

##### （1）网页请求的过程

###### ● Request（请求）

一个展示在用户面前的网页都必须经过这一步，也就是向服务器发送访问请求。

###### ● Response（响应）

服务器在接收到用户的请求后，会验证请求的有效性，然后向用户（客户端）发送响应的内容，客户端接收服务器响应的内容，将内容展示出来，就是我们所熟悉的网页请求。

##### （2）网页请求的方式

GET：最常见的方式，一般用于获取或者查询资源信息，也是大多数网站使用的方式，响应速度快。

POST：相比GET方式，多了以表单形式上传参数的功能，因此除查询信息外，还可以修改信息。

所以，在写爬虫前要先确定向谁发送请求，用什么方式发送。

#### 2.使用GET方式抓取数据

```
import requests  # 导入requests包

url = 'http://www.cntour.cn/'
strhtml = requests.get(url)  # GET方式，获取网页数据
print(strhtml.text)
```

这个时候strhtml是一个URL对象，它代表整个网页，但此时只需要网页中的源码，下面的语句表示网页源码。

```
      strhtml.text
```

#### 3.使用POST方式抓取数据

POST的请求获取数据的方式不同于GET, POST请求数据必须构建请求头才可以。Form Data中的请求参数如图所示，将其复制并构建一个新字典（ From_Date）。

![image-20200412123050297](%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-python%E7%88%AC%E8%99%AB%E5%9F%BA%E7%A1%80%E5%AD%A6%E4%B9%A0/image-20200412123050297.png)

利用有道翻译的接口（*http://fanyi.youdao.com/translate*）实现代码如下：

```
import requests  # 导入requests包
import json


def get_translate_date(word=None):
    url = 'http://fanyi.youdao.com/translate'
    From_Date = {'i': word, 'from': 'AUTO', 'to': 'AUTO', 'smartresult': 'dict', 'client': 'fanyideskweb',
                 'salt': '15866624635359', 'sign': '3e28161eb22465135ec5c5deb74077e6', 'ts': '1586662463535',
                 'bv': 'f52186f8c76a0fbf1baf7e6da04928ea', 'doctype': 'json', 'version': '2.1',
                 'keyfrom': 'fanyi.web', 'action': 'FY_BY_CLICKBUTTION'}

    # 将字符串格式的数据转换成JSON格式数据，并根据数据结构，提取数据，并将翻译结果打印出来,详细代码如下：
    # 请求表单数据
    response = requests.post(url, data=From_Date)
    # 将JSON格式字符串转字典
    content = json.loads(response.text)
    # 打印翻译后的数据
    print(content['translateResult'][0][0]['tgt'])


if __name__ == '__main__':
    get_translate_date('我爱数据')

```

运行之后：

```
I love the data
```

### 四、使用Beautiful Soup解析网页

> Beautiful Soup是python的一个库，其最主要的功能是从网页中抓取数据。Beautiful Soup目前已经被移植到bs4库中，也就是说在导入Beautiful Soup时需要先安装bs4库。安装好bs4库以后，还需安装lxml库。如果我们不安装lxml库，就会使用Python默认的解析器。尽管Beautiful Soup既支持Python标准库中的HTML解析器又支持一些第三方解析器，但是lxml库具有功能更加强大、速度更快的特点，因此推荐安装lxml库。

安装Python第三方库后，输入下面的代码，即可开启Beautiful Soup之旅。

首先，HTML文档将被转换成Unicode编码格式，然后Beautiful Soup选择最合适的解析器来解析这段文档，此处指定lxml解析器进行解析。解析后便将复杂的HTML文档转换成树形结构，并且每个节点都是Python对象。这里将解析后的文档存储到新建的变量soup中，代码如下：

```
soup = BeautifulSoup(strhtml.text, 'lxml') 
```

接下来用select（选择器）定位数据，定位数据时需要使用浏览器的开发者模式，将鼠标光标停留在对应的数据位置并右击，然后在快捷菜单中选择“检查”命令。随后在浏览器右侧会弹出开发者界面，右侧高亮的代码对应着左侧高亮的数据文本。右击右侧高亮数据，在弹出的快捷菜单中选择“Copy”→“Copy Selector”命令，便可以自动复制路径。如下图所示：

![image-20200412142316694](%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-python%E7%88%AC%E8%99%AB%E5%9F%BA%E7%A1%80%E5%AD%A6%E4%B9%A0/image-20200412142316694.png)

将路径粘贴在文档中，代码如下：

```
#main > div > div.mtop.firstMod.clearfix > div.centerBox > ul.newsList > li:nth-child(1) > a
```

由于这条路径是选中的第一条的路径，而我们需要获取所有的头条新闻，因此将li:nth-child(1)中冒号（包含冒号）后面的部分删掉，使用soup.select引用这个路径，代码如下：

```
data = soup.select('#main > div > div.mtop.firstMod.clearfix > div.centerBox > ul.newsList > a') 
```

### 五、清洗和组织数据

至此，获得了一段目标的HTML代码，但还没有把数据提取出来，接下来在PyCharm中输入以下代码：

```
for item in data:  # soup匹配到的有多个数据，用for循环取出
    result = {
        'title': item.get_text(),
        'link': item.get('href')
    }
    print(result)
```

代码运行结果如下：

```
{'title': '政策加码提振市场 生活消费加速回暖', 'link': 'http://www.cntour.cn/news/13800/'}
{'title': '国家23部门联合发文促文旅消费', 'link': 'http://www.cntour.cn/news/13795/'}
{'title': '景区“重启”，准备好了吗', 'link': 'http://www.cntour.cn/news/13791/'}
{'title': '美丽中国建设有了评估体系', 'link': 'http://www.cntour.cn/news/13789/'}
{'title': '[文创行业线上发力]', 'link': 'http://www.cntour.cn/news/13802/'}
{'title': '[“无接触商业”加速到来]', 'link': 'http://www.cntour.cn/news/13792/'}
{'title': '[主动迎接旅游转型]', 'link': 'http://www.cntour.cn/news/13790/'}
{'title': '[文旅魅力 “云”端绽放]', 'link': 'http://www.cntour.cn/news/13779/'}
{'title': '[景点开放要安全有序]', 'link': 'http://www.cntour.cn/news/13768/'}
{'title': '[图解：10年旅游让生活更]', 'link': 'http://www.cntour.cn/news/13747/'}
{'title': '[发展旅游产业要有大格局]', 'link': 'http://www.cntour.cn/news/12718/'}
{'title': '[科技改变旅游]', 'link': 'http://www.cntour.cn/news/12716/'}
```

首先明确要提取的数据是标题和链接，标题在<a>标签中，提取标签的正文用get_text()方法。链接在<a>标签的href属性中，提取标签中的href属性用get()方法，在括号中指定要提取的属性数据，即get('href')。

每一篇文章的链接中都有一个数字ID。下面用正则表达式提取这个ID。

需要使用的正则符号如下：

`\d`匹配数字

 `+` 匹配前一个字符1次或多次

在Python中调用正则表达式时使用re库，这个库不用安装，可以直接调用，在上述代码中添加以下代码：

```
import re

'ID': re.findall('\d+', item.get('href'))
```

### 六、全部代码：

```
import re
import requests
from bs4 import BeautifulSoup

url = 'http://www.cntour.cn/'
strhtml = requests.get(url)  # GET方式，获取网页数据

# HTML文档将被转换成Unicode编码格式，然后Beautiful Soup选择最合适的解析器来解析这段文档，此处指定lxml解析器进行解析。
# 解析后便将复杂的HTML文档转换成树形结构，并且每个节点都是Python对象。这里将解析后的文档存储到新建的变量soup中，代码如下。
soup = BeautifulSoup(strhtml.text, 'lxml')  # lxml解析网页文档

# 用select（选择器）定位数据，定位数据时需要使用浏览器的开发者模式，将鼠标光标停留在对应的数据位置并右击，然后在快捷菜单中选择“检查”命令
# 随后在浏览器右侧会弹出开发者界面，右侧高亮的代码会对应着左侧高亮的数据文本。右击右侧高亮数据，在弹出的快捷菜单中选择“Copy”→“Copy Selector”命令，便可以自动复制路径。

data = soup.select('#main > div > div.mtop.firstMod.clearfix > div.centerBox > ul.newsList >li > a')  # 获取数据
# print(data)

for item in data:   # soup匹配到的有多个数据，用for循环取出
    result = {
        'title': item.get_text(),
        'link': item.get('href'),
        'ID': re.findall('\d+', item.get('href'))  #使用re库的findall方法，第一个参数表示正则表达式，第二个参数表示要提取的文本。
    }
    print(result)
```

运行结果如下：

```
{'title': '政策加码提振市场 生活消费加速回暖', 'link': 'http://www.cntour.cn/news/13800/', 'ID': ['13800']}
{'title': '国家23部门联合发文促文旅消费', 'link': 'http://www.cntour.cn/news/13795/', 'ID': ['13795']}
{'title': '景区“重启”，准备好了吗', 'link': 'http://www.cntour.cn/news/13791/', 'ID': ['13791']}
{'title': '美丽中国建设有了评估体系', 'link': 'http://www.cntour.cn/news/13789/', 'ID': ['13789']}
{'title': '[文创行业线上发力]', 'link': 'http://www.cntour.cn/news/13802/', 'ID': ['13802']}
{'title': '[“无接触商业”加速到来]', 'link': 'http://www.cntour.cn/news/13792/', 'ID': ['13792']}
{'title': '[主动迎接旅游转型]', 'link': 'http://www.cntour.cn/news/13790/', 'ID': ['13790']}
{'title': '[文旅魅力 “云”端绽放]', 'link': 'http://www.cntour.cn/news/13779/', 'ID': ['13779']}
{'title': '[景点开放要安全有序]', 'link': 'http://www.cntour.cn/news/13768/', 'ID': ['13768']}
{'title': '[图解：10年旅游让生活更]', 'link': 'http://www.cntour.cn/news/13747/', 'ID': ['13747']}
{'title': '[发展旅游产业要有大格局]', 'link': 'http://www.cntour.cn/news/12718/', 'ID': ['12718']}
{'title': '[科技改变旅游]', 'link': 'http://www.cntour.cn/news/12716/', 'ID': ['12716']}
```

### 七、爬虫攻防战

> 爬虫是模拟人的浏览访问行为，进行数据的批量抓取。当抓取的数据量逐渐增大时，会给被访问的服务器造成很大的压力，甚至有可能崩溃。换句话就是说，服务器是不喜欢有人抓取自己的数据的。那么，网站方面就会针对这些爬虫者，采取一些反爬策略。

服务器第一种识别爬虫的方式就是通过检查连接的useragent来识别到底是浏览器访问，还是代码访问的。如果是代码访问的话，访问量增大时，服务器会直接封掉来访IP。

###### 那么应对这种初级的反爬机制，我们应该采取何种举措？

在进行访问时，我们在开发者环境下不仅可以找到URL、Form Data，还可以在Request headers中构造浏览器的请求头，封装自己。服务器识别浏览器访问的方法就是判断keywor是否为Request headers下的User-Agent，如下图所示。

![image-20200412145400158](%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-python%E7%88%AC%E8%99%AB%E5%9F%BA%E7%A1%80%E5%AD%A6%E4%B9%A0/image-20200412145400158.png)

因此，我们只需要构造这个请求头的参数。创建请求头部信息即可，代码如下：

```
# 构建请求头，伪装成浏览器访问
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.92 Safari/537.36'}
response = requests.get(url, headers=headers)
```

修改User－Agent确实很简单，但是正常人1秒看一个图，而个爬虫1秒可以抓取好多张图，比如1秒抓取上百张图，那么服务器的压力必然会增大。也就是说**，如果在一个IP下批量访问下载图片，这个行为不符合正常人类的行为，肯定要被封IP**。其原理也很简单，就是统计每个IP的访问频率，该频率超过阈值，就会返回一个验证码，如果真的是用户访问的话，用户就会填写，然后继续访问，如果是代码访问的话，就会被封IP。

这个问题的解决方案有两个，第一个就是常用的增设延时，每3秒钟抓取一次，代码如下：

    import time
    time.sleep(3)  # 设置延迟，防止被封IP

我们写爬虫的目的是为了高效批量抓取数据，这里设置3秒钟抓取一次，效率未免太低。其实，还有一个更重要的解决办法，那就是从本质上解决问题。

不管如何访问，服务器的目的就是查出哪些为代码访问，然后封锁IP**。解决办法：为避免被封IP，在数据采集时经常会使用代理。**当然，requests也有相应的proxies属性。

首先，构建自己的代理IP池，将其以字典的形式赋值给proxies，然后传输给requests，代码如下：

```
proxies = {   # 设置IP代理池，将其以字典的形式赋值给proxies，然后传输给requests解决被封IP问题
    "http": "http://10.10.1.10:3128",
    "https": "http://10.10.1.10:1080",
}
response = requests.get(url, proxies=proxies)
```

 

Write by sheen