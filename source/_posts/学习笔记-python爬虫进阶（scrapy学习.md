---
title: '[学习笔记]-Python爬虫进阶（Scrapy)学习'
tags:
  - Scrapy
  - 学习笔记
  - 学习笔记
  - 网络爬虫
id: '404'
date: 2020-04-16 14:18:24
---

> 谈起爬虫必然要提起Scrapy框架，因为它能够帮助提升爬虫的效率，从而更好地实现爬虫。Scrapy是一个为了抓取网页数据、提取结构性数据而编写的应用框架，该框架是封装的，包含request（异步调度和处理）、下载器（多线程的Downloader）、解析器（selector）和twisted（异步处理）等。对于网站的内容爬取，其速度非常快捷。

#### 一、在PyCharm中安装Scrapy

第一步，选择Anaconda 3作为编译环境。在PyCharm中单击左上角File选项，单击“Settings”按钮，弹出如图所示界面，然后展开ProjectInterpreter的下拉菜单，选择Anaconda 3的下拉菜单。

![](http://www.sheensong.top/wordpress/wp-content/uploads/2020/04/image-20200413104350236-1024x737.png)

第二步，安装Scrapy。单击如图的界面右上角的加号按钮，弹出如下所示的界面。输入并搜索“scrapy”，然后单击“Install Package”按钮。等待，直至出现“Pakage‘scrapy' installed successfully”。

![](http://www.sheensong.top/wordpress/wp-content/uploads/2020/04/image-20200413104528696-1024x573.png)

#### 二、用实例学习-用Scrapy抓取股票行情

**爬取过程分为以下五步：**

**第一步，创建Scrapy爬虫项目；**

**第二步，定义一个item容器；**

**第三步，定义settings文件进行基本爬虫设置；**

**第四步，编写爬虫逻辑；**

**第五步，代码调试。**

##### 1．创建Scrapy爬虫项目。

调出CMD，输入如下代码并按【Enter】键，创建Scrapy爬虫项目。

    scrapy startproject stockstar

其中scrapy startproject是固定命令，stockstar是笔者设置的工程名字。运行上述代码的目的是创建相应的项目文件，如下所示：

**放置spider代码的目录文件spiders（用于编写爬虫）。**

**项目中的item文件items.py（用于保存所抓取的数据的容器，其存储方式类似于Python的字典）。**

**项目的中间件middlewares .py（提供一种简便的机制，通过允许插入自定义代码来拓展Scrapy的功能）。**

**项目的pipelines文件pipelines.py（核心处理器）。**

**项目的设置文件settings.py。**

**项目的配置文件scrapy.cfg。**

![](http://www.sheensong.top/wordpress/wp-content/uploads/2020/04/image-20200413180816967.png)

创建scrapy项目以后，在settings文件中有这样的一条默认开启的语句。

    ROBOTSTXT\_OBEY = True

robots.txt是遵循Robot协议的一个文件，在Scrapy启动后，首先会访问网站的robots.txt文件，然后决定该网站的爬取范围。有时我们需要将此配置项设置为False。

**在settings.py文件中，修改文件属性的方法如下**。

    ROBOTSTXT\_OBEY = False

**右击XXX\\stockstar\\stockstar文件夹，在弹出的快捷菜单中选择“MarkDirectory as”命令→选择“Sources Root”命令，这样可以使得导入包的语法更加简洁。**

##### 2．定义一个item容器

**item是存储爬取数据的容器，其使用方法和Python字典类似。它提供了额外的保护机制以避免拼写错误导致的未定义字段错误。**首先需要**对所要抓取的网页数据进行分析，定义所爬取记录的数据结构。在相应的items.py中建立相应的字段**，详细代码如下：

import scrapy  
from scrapy.loader import ItemLoader  
from scrapy.loader.processors import TakeFirst  
​  
​  
class StockstarItemLoader(ItemLoader):  
    # 自定义itemloader，用于存储爬虫所抓取的字段内容de  
    default\_output\_processor = TakeFirst()  
​  
​  
class StockstarItem(scrapy.Item):  # 建立相应的字段  
    # define the fields for your item here like:  
    # name = scrapy.Field()  
    code = scrapy.Field()             # 股票代码  
    abbr = scrapy.Field()             # 股票简称  
    market\_equity = scrapy.Field()    # 流通市值  
    all\_equity = scrapy.Field()       # 总市值  
    flow\_stock = scrapy.Field()       # 流通股本  
    all\_stock = scrapy.Field()        # 总股本

##### 3．定义settings文件进行基本爬虫设置

**在相应的settings.py文件中定义可显示中文的JSON Lines Exporter，并设置爬取间隔为0.25秒**，详细代码如下：

\# -\*- coding: utf-8 -\*-  
​  
from scrapy.exporters import JsonLinesItemExporter  
​  
​  
\# 默认显示的中文是阅读性较差的Unicode字符  
\# 需要定义子类显示出原来的字符集(将父类的ensure\_ascii属性设置为False即可)  
class CustomJsonLinesItemExporter(JsonLinesItemExporter):  
    def \_\_init\_\_(self, file, \*\*kwargs):  
        super(CustomJsonLinesItemExporter, self).\_\_init\_\_(file, ensure\_ascii=False, \*\*kwargs)  
​  
​  
\# 启用新定义的Exporter类  
FEED\_EXPORTERS = {  
    'json': 'stockstar.settings.CustomJsonLinesItemExporter',  
}  
​  
BOT\_NAME = 'stockstar'  
​  
SPIDER\_MODULES = \['stockstar.spiders'\]  
NEWSPIDER\_MODULE = 'stockstar.spiders'  
​  
\# Crawl responsibly by identifying yourself (and your website) on the user-agent  
\# USER\_AGENT = 'stockstar (+http://www.yourdomain.com)'  
​  
\# Obey robots.txt rules  
ROBOTSTXT\_OBEY = False  
​  
\# Configure maximum concurrent requests performed by Scrapy (default: 16)  
\# CONCURRENT\_REQUESTS = 32  
​  
\# Configure a delay for requests for the same website (default: 0)  
\# See https://docs.scrapy.org/en/latest/topics/settings.html#download-delay  
\# See also autothrottle settings and docs  
DOWNLOAD\_DELAY = 0.25

##### 4．编写爬虫逻辑

> 在编写爬虫逻辑之前，需要在stockstar/spider子文件下创建．py文件，用于定义爬虫的范围，也就是初始URL。接下来定义一个名为parse的函数，用于解析服务器返回的内容。

首先在CMD中输入代码，并生成spider代码，如下所示：

        cd stockstar  
        scrapy genspider stock quote.stockstar.com

**此时spider文件夹下面会创建后缀名为stock.py的文件，该文件会生成start\_url，即爬虫的起始地址，并且创建名为parse的自定义函数，之后的爬虫逻辑将在parse函数中书写。**文件详情和代码如下图如图：

![](http://www.sheensong.top/wordpress/wp-content/uploads/2020/04/image-20200413181550620-1024x215.png)

**后在spiders/stock.py文件下，定义爬虫逻辑**，详细代码如下：

\# -\*- coding: utf-8 -\*-  
import scrapy  
from items import StockstarItem, StockstarItemLoader  
​  
​  
class StockSpider(scrapy.Spider):  
    name = 'stock'  
    allowed\_domains = \['quote.stockstar.com'\]  
    start\_urls = \['http://quote.stockstar.com/stock/ranklist\_a\_3\_1\_1.html'\]  
​  
    def parse(self, response):  
        page = int(response.url.split("\_")\[-1\].split(".")\[0\])  # 抓取页码  
        item\_nodes = response.css('#datalist tr')  
        for item\_node in item\_nodes:  
            # 根据item文件所定义的字段内容，进行字段内容的抓取  
            item\_loader = StockstarItemLoader(item=StockstarItem(), selector=item\_node)  
            item\_loader.add\_css("code", "td:nth-child(1) a::text")  
            item\_loader.add\_css("abbr", "td:nth-child(2) a::text")  
            item\_loader.add\_css("market\_equity", "td:nth-child(3) ::text")  
            item\_loader.add\_css("all\_equity", "td:nth-child(4) ::text")  
            item\_loader.add\_css("flow\_stock", "td:nth-child(5) ::text")  
            item\_loader.add\_css("all\_stock", "td:nth-child(6) ::text")  
            stock\_item = item\_loader.load\_item()  
            yield stock\_item  
        if item\_nodes:  
            next\_page = page + 1  
            next\_url = response.url.replace("{0}.html".format(page), "{0}.html".format(next\_page))  
            yield scrapy.Request(url=next\_url, callback=self.parse)

##### 5．代码调试

为了调试方便，在stockstar下新建一个main.py，调试代码如下：

        from scrapy.cmdline import execute  
        execute(\["scrapy", "crawl", "stock", "-o", "items.json"\])  
​

**其等价于在stockstar下执行命令“scrapy crawl stock -o items.json”，意为：将爬取的数据导出到items.json文件**

        XXXX\\stockstar>scrapy crawl stock -o items.json

在代码里可设置断点（如在spiders/stock.py内），然后单击“Run”选项按钮→在弹出的菜单中选择“Debug‘main'”命令，进行调试。

最后在PyCharm中运行Run 'main'，运行界面如下图：

![](http://www.sheensong.top/wordpress/wp-content/uploads/2020/04/image-20200413182331925-1024x659.png)

将所抓取的数据以JSON格式保存在item容器中，如下图：

![](http://www.sheensong.top/wordpress/wp-content/uploads/2020/04/image-20200413182418168-1024x359.png)

#### 三、scrapy 其他

##### 1.start\_url（初始链接）简写

用简化的方法，我们必须定义一个方法为：def parse(self, response)，方法名一定是：parse。

"""  
    scrapy初始Url的两种写法，  
    一种是常量start\_urls，并且需要定义一个方法parse（）  
    另一种是直接定义一个方法：star\_requests()  
"""  
import scrapy  
class simpleUrl(scrapy.Spider):  
    name = "simpleUrl"  
    start\_urls = \[  #另外一种写法，无需定义start\_requests方法  
        'http://lab.scrapyd.cn/page/1/',  
        'http://lab.scrapyd.cn/page/2/',  
    \]  
​  
    # 另外一种初始链接写法  
    # def start\_requests(self):  
    #     urls = \[ #爬取的链接由此方法通过下面链接爬取页面  
    #         'http://lab.scrapyd.cn/page/1/',  
    #         'http://lab.scrapyd.cn/page/2/',  
    #     \]  
    #     for url in urls:  
    #         yield scrapy.Request(url=url, callback=self.parse)  
    # 如果是简写初始url，此方法名必须为：parse  
​  
    def parse(self, response):  
        page = response.url.split("/")\[-2\]  
        filename = 'mingyan-%s.html' % page  
        with open(filename, 'wb') as f:  
            f.write(response.body)  
        self.log('保存文件: %s' % filename)

##### 2.Scrapy数据提取

> Scrapy真正的强大是表现在它提取数据的能力上，先走马观花的介绍一下scrapy提取数据的几种方式：CSS、XPATH、RE（正则）。

###### (1) 与其他的比较比较

*   BeautifulSoup缺点：慢
*   lxml:基于 ElementTree
*   Scrapy seletors: parsel library，构建于 lxml 库之上，这意味着它们在速度和解析准确性上非常相似

###### (2) Scrapy提取数据-选择器

从网页中提取数据，Scrapy 使用基于 XPath 和 CSS 表达式的技术叫做选择器。

选择器有四个基本的方法，如下所示：

S.N.

方法 & 描述

extract()

它返回一个unicode字符串以及所选数据

extract\_first()

它返回第一个unicode字符串以及所选数据

re()

它返回Unicode字符串列表，当正则表达式被赋予作为参数时提取

xpath()

它返回选择器列表，它代表由指定XPath表达式参数选择的节点

css()

它返回选择器列表，它代表由指定CSS表达式作为参数所选择的节点

##### 3.提取内容的封装Item

Scrapy进程可通过使用蜘蛛提取来自网页中的数据。Scrapy使用Item类生成输出对象用于收刮数据。

Item 对象是自定义的python字典，可以使用标准字典语法获取某个属性的值。

###### (1)定义

import scrapy  
​  
class InfoItem(scrapy.Item):  
    # define the fields for your item here like:  
    # name = scrapy.Field()  
    movie\_name = scrapy.Field()  
    movie\_core = scrapy.Field()

###### (2)使用

def parse(self, response):  
    movie\_name = response.xpath("//div\[@class='item'\]//a/span\[1\]/text()").extract()  
    movie\_core = response.xpath("//div\[@class='star'\]/span\[2\]/text()").extract()  
      
    for n, c in zip(movie\_name, movie\_core):  
        movie = InfoItem()  
        movie\['movie\_name'\] = n  
        movie\['movie\_core'\] = c  
        yield movie

##### 4.使用Chrome获取XPath表达式

Chrome通过向我们提供一些基本的XPath表达式，从而对开发者更加友好。从检查元素开始：右键单击想要选取的元素，然后选择Inspect Element。该操作将会打开Developer Tools，并且在树表示法中高亮显示这个HTML元素。现在右键单击这里，在菜单中选择Copy XPath，此时XPath表达式将会被复制到剪贴板中。上述过程如图：

![](http://www.sheensong.top/wordpress/wp-content/uploads/2020/04/image-20200413185400612-1024x895.png)

**另外，XPath的contains()函数可以让你选择包含有指定类的所有元素。**

● 选择class属性值为"infobox"的表格中第一张图片的URL。

        //table\[@class="infobox"\]//img\[1\]/@src

● 选择class属性以"reflist"开头的div标签中所有链接的URL。

        //div\[starts-with(@class, "reflist")\]//a/@href

● 选择子元素包含文本"References"的元素之后的div元素中所有链接的URL。

         //＊\[text()="References"\]/../following-sibling::div//a

请注意该表达式非常脆弱并且很容易无法使用，因为它对文档结构做了过多假设。

● 获取页面中每张图片的URL。

        //img/@src

**_抓取时经常会指向我们无法控制的服务器页面。这就意味着如果它们的HTML以某种方式发生变化后，就会使XPath表达式失效，我们将不得不回到爬虫当中进行修正。通常情况下，这不会花费很长时间，因为这些变化一般都很小。但是，这仍然是需要避免发生的情况。一些简单的规则可以帮助我们减少表达式失效的可能性。_**

● 避免使用数组索引（数值）

Chrome经常会给你的表达式中包含大量常数，例如

    //＊\[@id="myid"\]/div/div/div\[1\]/div\[2\]/div/div\[1\]/div\[1\]/a/img

这种方式非常脆弱，因为如果像广告块这样的东西在层次结构中的某个地方添加了一个额外的div的话，这些数字最终将会指向不同的元素。本案例的解决方法是尽可能接近目标的img标签，找到一个可以使用的包含id或者class属性的元素，如：

    //div\[@class="thumbnail"\]/a/img

● 类并没有那么好用

使用class属性可以更加容易地精确定位元素，不过这些属性一般是用于通过CSS影响页面外观的，因此可能会由于网站布局的微小变更而产生变化。例如:

   //div\[@class="thumbnail"\]/a/img

一段时间后，可能会变成：

    //div\[@class="preview green"\]/a/img

● 有意义的面向数据的类要比具体的或者面向布局的类更好

在前面的例子中，无论是"thumbnail"还是"green"都是我们所依赖类名的坏示例。虽然"thumbnail"比"green"确实更好一些，但是它们都不如"departure-time"。前面两个类名是用于描述布局的，而"departure-time"更加有意义，与div标签中的内容相关。因此，在布局发生变化时，后者更可能保持有效。这可能也意味着该站的开发者非常清楚使用有意义并且一致的方式标注他们数据的好处。

● ID通常是最可靠的

通常情况下，id属性是针对一个目标的最佳选择，因为该属性既有意义又与数据相关。部分原因是JavaScript以及外部链接锚一般选择id属性以引用文档中的特定部分。例如，下面的XPath表达式非常健壮。

    //＊\[@id="more\_info"\]//text()

例外情况是以编程方式生成的包含唯一标记的ID。这种情况对于抓取毫无意义。比如

    //\[@id="order-F4982322"\]

尽管使用了id，但上面的表达式仍然是一个非常差的XPath表达式。需要记住的是，尽管ID应该是唯一的，但是你仍然会发现很多HTML文档并没有满足这一要求。

##### 5.抽取更多的URL

一个典型的索引页会包含许多到房源页面的链接，以及一个能够让你从一个索引页前往另一个索引页的分页系统。因此，一个典型的爬虫会向两个方向移动:

![epub_22692206_36 (E:\Github socures\Learning_notes\epub_22692206_36.jfif)](https://res.weread.qq.com/wrepub/epub_22692206_36)

● 横向——从一个索引页到另一个索引页；

● 纵向——从一个索引页到房源页并抽取Item

我们将前者称为水平爬取，因为这种情况下是在同一层级下爬取页面（比如索引页）；而将后者称为垂直爬取，因为该方式是从一个更高的层级（比如索引页）到一个更低的层级（比如房源页）。

实际上，它比听起来更加容易。我们所有需要做的事情就是**再增加两个XPath表达式。对于第一个表达式，右键单击Next Page按钮，可以注意到URL包含在一个链接中，而该链接又是在一个拥有类名next的标签内，如图下图所示。因此，我们只需使用一个实用的XPath表达式//＊\[contains (@class, "next")\]//@href，就可以完美运行了。**

![](http://www.sheensong.top/wordpress/wp-content/uploads/2020/04/image-20200413191042564-1024x512.png)

对于第二个表达式，右键单击页面中的列表标题，并选择检查。如上图所示，请注意，URL中包含我们感兴趣的itemprop="url"属性。

> 另外，Scrapy在处理请求时使用的是后入先出（LIFO）策略（即深度优先爬取）。用户提交的最后一个请求会被首先处理。在大多数情况下，这种默认的方式非常方便。比如，我们想要在移动到下一个索引页之前处理每一个房源页时。否则，我们将会填充一个包含待爬取房源页URL的巨大队列，无谓地消耗内存。
> 
> 另外，在许多情况中，你可能需要辅助的请求来完成单个请求，我们将会在后面的章节中遇到这种情况。你需要这些辅助的请求能够尽快完成，以腾出资源，并且让被抓取的Item能够稳定流动。我们可以通过设置Request()的优先级参数修改默认顺序，大于0表示高于默认的优先级，小于0表示低于默认的优先级。通常来说，Scrapy的调度器会首先执行高优先级的请求，不过不要花费太多时间来考虑具体的哪个请求应该被首先执行。此外还需要注意的是，URL还会被执行去重操作，这在大部分时候也是我们想要的功能。不过如果我们需要多次执行同一个URL的请求，可以设置dont\_filter\_Request()参数为true。

Write by sheen