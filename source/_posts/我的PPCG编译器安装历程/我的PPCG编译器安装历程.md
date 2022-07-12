---
title: 我的PPCG安装历程
tags:
  - PPCG
categories:
  - 学习笔记
  - 安装小记
date: 2021-09-23 11:30:11
---

## 我的PPCG安装历程

### 什么是PPCG？

[官网](http://ppcg.gforge.inria.fr/)的介绍：PPCG is a source-to-source compiler generating OpenCL or CUDA GPGPU code from sequential programs.

中文翻译大致就是：PPCG是一个源到源的编译器（输入是源代码，输出也是源代码），它能将输入的串行程序生成可以并行执行的OpenCL或cuda GPU代码。

我的理解就是：PPCG是一个自动并行化的源到源的编译工具。比如，你给它输入一个C语言的.c文件，它就可以生成CUDA的cu文件，再用CUDA的编译归工具进行编译，就可以在GPU上执行。

### 一些小问题及解答...

问：PPCG开源吗？

答：额，这个肯定开源的啦~，源码地址是：https://repo.or.cz/ppcg.git ,GitHub地址是：https://github.com/Meinersbur/ppcg

问：工具的作者是？

答：作者是[Tobias Grosser](https://grosser.science/)团队，据悉，他目前在[University of Edinburgh](https://www.ed.ac.uk/)（爱丁堡大学）做编译器、高性能计算等研究，之前曾在[ETH Zurich](https://ethz.ch/) (苏黎世联邦理工学院)、[École Normale Supérieure Paris](https://www.ens.psl.eu/en) (巴黎高等师范学校)、[University of Passau](http://uni-passau.de/) (帕绍大学)进行学习和研究。

问：国内有相关的研究团队吗？

答：答案是肯定的，国内的编译团队也在开展相关的研究，我所知道的就有清华和上交大等学校的团队在开展相关的研究，华为、阿里、字节跳动等大厂也有相关团队在做。国外谷歌等等也都有相关研究。个人觉得随着人工智能和深度学习的不断应用，自动并行化方面的研究会越来越成熟，这个方向符合大家对深度学习编译器（简称DL编译器）的一些现实需求。

<!--more-->

### 如何安装PPCG?

官方的readme文档链接是：https://repo.or.cz/ppcg.git

我的理解是，可以大致分为以下六个步骤：

一、安装必要的支持包

二、克隆源码以及isl&pet子模块源码

三、生成Makefiles文件

四、编译源码以及进行编译检查

五、上述均无误后进行安装

六、添加链接库的位置，并验证安装是否成功

七、执行一个小例子测试PPCG

### 详细安装步骤如下

#### 我的安装环境介绍：

硬件环境：联想thinkstation工作站（i5-10500  RTX2070  32G 内存 256GSST+1T机械硬盘）

操作系统环境：Ubuntu 20.10 、Ubuntu 20.04、Ubuntu 18.04 都有尝试安装

其他说明：我是先在WMware虚拟机里进行安装的（CPU 4核、硬盘80G、内存16G），之后又安装了Ubuntu 20.04的双系统，然后自己正常开始使用的。第一次安装学习，建议采用此策略，确保不会有损失。**另外，非常推荐您使用Ubuntu 20.04及以下版本，这样LLVM和PPCG的兼容性会更好一些。**

#### 一、安装必要的支持包

```
官方描述如下：
Requirements:
- automake, autoconf, libtool
	(not needed when compiling a release)
- pkg-config (http://www.freedesktop.org/wiki/Software/pkg-config)
	(not needed when compiling a release using the included isl and pet)
- gmp (http://gmplib.org/)
- libyaml (http://pyyaml.org/wiki/LibYAML)
	(only needed if you want to compile the pet executable)
- LLVM/clang libraries, 2.9 or higher (http://clang.llvm.org/get_started.html)
	Unless you have some other reasons for wanting to use the svn version,
	it is best to install the latest supported release.
	For more details, including the latest supported release,
	see pet/README.
If you are installing on Ubuntu, then you can install the following packages:

automake autoconf libtool pkg-config libgmp3-dev libyaml-dev libclang-dev llvm

Note that you need at least version 3.2 of libclang-dev (ubuntu raring).
Older versions of this package did not include the required libraries.
If you are using an older version of ubuntu, then you need to compile and
install LLVM/clang from source.
```

从说明里不难看出，需要的工具包并不多，我们可以直接apt install 进行安装。

```
sudo apt install automake autoconf libtool pkg-config libgmp3-dev libyaml-dev libclang-dev llvm
```

这里需要简单说一下，以我安装的情况总结一下就是：按照上述命令进行安装即可，另外，如果还是会有报错，可能是还需要加上` sudo apt install clang  ` 和`sudo apt install make`等等的工具库，这些在后面对应的部分会有介绍。

> 不同Ubuntu系统上LLVM版本说明：经测试，`apt install  `命令安装LLVM和Clang时，在Ubuntu 20.10上是11.0版本，Ubuntu 20.04上是10.0版本，Ubuntu 18.04是8.0/6.0版本。如果您需要安装别的版本，需要从[LLVM官网](http://clang.llvm.org/get_started.html)上下载源码，然后进行进行编译和安装。另外，由于LLVM 10.0版本之后都是采用Cmake进行编译和安装，可能还需要下载Cmake工具包提供支持。**这里有一个坑大家要注意下，就是编译LLVM/Clang源码时，会占用很大的内存，我测试过8G内存是不够用的，建议给虚拟机分配16G内存。**
>
> 提醒：官方的readme文档中的提到的命令，一般都需要超级管理员权限，因此**建议切换成root账户**或者**在所有命令的前面都加一个sudo以提升权限**。文中采用后者，以提醒读者注意提升权限。

#### 二、克隆源码以及isl&pet子模块源码

```
官方描述如下：
Preparing:
Grab the latest release and extract it or get the source from
the git repository as follows.  This process requires autoconf,
automake, libtool and pkg-config.

	git clone git://repo.or.cz/ppcg.git
	cd ppcg
	./get_submodules.sh
	./autogen.sh
```

首先就是利用git拉取PPCG的源代码（未安装git需要`sudo apt install git`安装一下），官方的拉取代码为：`git clone git://repo.or.cz/ppcg.git`.这个不出意外的话，是可以直接拉取的，如果拉取失败，建议利用gitee的导入功能，先导入到自己的码云仓库里面，然后更换成自己的仓库地址即可，导入过程大致如下图所示。

![image-20210326182941862](%E6%88%91%E7%9A%84PPCG%E7%BC%96%E8%AF%91%E5%99%A8%E5%AE%89%E8%A3%85%E5%8E%86%E7%A8%8B/image-20210326182941862-1656298121330.png)

然后，就是导入isl和pet的子模块了。先看下`./get_submodules.sh`和`./autogen.sh`的脚本内容，不难发现，其实`./get_submodules.sh`其实就是克隆isl和pet子模块并更新isl中的imath子模块，`./autogen.sh`就是在编译前先运行`autoreconf -i` 生成configure，make in ，install等。

```
sheen@sheen-virtual-machine:~/ppcg$ cat get_submodules.sh 
#!/bin/sh
git submodule init
git submodule update
(cd isl; git submodule init imath; git submodule update imath)

sheen@sheen-virtual-machine:~/ppcg$ cat autogen.sh 
#!/bin/sh
if test -f isl/autogen.sh; then
	(cd isl; ./autogen.sh)
fi
if test -f pet/autogen.sh; then
	(cd pet; ./autogen.sh)
fi
autoreconf -i
```

但是，我执行`sudo ./get_submodules.sh`，拉取isl下面的imath子模块时一直失败。这里就可以利用上面说的gitee的导入功能了，先导入到自己的码云仓库里面，然后更换成自己的仓库地址。比如，这里需要分别到ppcg/isl和ppcg/pet/isl两个目录下执行`sudo git clone https://gitee.com/sheenisme/imath.git`。**注意：imath是isl的子模块，而isl还是pet的子模块，所以这里需要到ppcg/isl和ppcg/pet/isl两个目录下执行。**

然后我执行`sudo ./autogen.sh` 是没有报错的。如果您执行的时候提示`autoreconf: libtoolize failed with exit status: 1`  `autom4te: cannot create autom4te.cache: No such file or directory` 类似的错误，建议加上sudo以执行时的权限，或者搜索一下错误的命令，应该不难解决。

#### 三、生成Makefiles文件

```
官方描述如下：
Compilation:

	./configure
	make
	make check

If you have installed any of the required libraries in a non-standard
location, then you may need to use the --with-gmp-prefix,
--with-libyaml-prefix and/or --with-clang-prefix options
when calling "./configure".

PS:我将./configure当作第三步，make和make check视为第四步。
```

我在执行`sudo ./configure`时遇到的第一个错误提示如下所示：

```
config.status: error: in `/home/sheen/ppcg':
config.status: error: Something went wrong bootstrapping makefile fragments
    for automatic dependency tracking.  If GNU make was not used, consider
    re-running the configure script with MAKE="gmake" (or whatever is
    necessary).  You can also try re-running configure with the
    '--disable-dependency-tracking' option to at least be able to build
    the package (albeit without support for automatic dependency tracking).
See `config.log' for more details
```

错误的大致意思就是GNU make出错，因为是新装的系统，意识到并没有安装make，于是我尝试用`sudo apt install make`解决这个问题。果然，这个错误就没有了。

当我再次执行`sudo ./configure`时，又遇到了以下的错误提示：

```
configure: error: in `/home/sheen/ppcg/isl/interface':
configure: error: C++ compiler cannot create executables
See `config.log' for more details
configure: error: ./configure failed for interface
configure: error: ./configure failed for isl
```

这个比较显然，是C++编译器的问题。在我的印象里，gcc和g++应该是Ubuntu自带的，但是由于并不确定，我又尝试利用`sudo apt-get install gcc` 和 `sudo apt-get install g++`，确认一下，结果确实是g++没有安装，利用apt安装之后，这个错误也就没有了。

当然，问题也并没有结束，下面的问题随之而来了。

```
checking whether /usr/lib/llvm-11/bin/clang can find standard include files... no
checking for xcode-select... no
configure: error: Cannot find xcode-select
configure: error: ./configure failed for interface
configure: error: ./configure failed for isl
```

这个错误的意思就是找不到xcode-select，我在百度上看到的关于xcode-select的问题都是MAC上面的，第一印象就是感觉不靠谱。但是，注意到`checking whether /usr/lib/llvm-11/bin/clang can find standard include files... no`这一句的错误提示，不难看出来，xcode-selecet是clang的一个部分，但是作者的readme文档中只说需要安装libclang-dev库就行，后来我就一直以为是llvm和libclang-dev的问题，经过手动编译安装llvm和clang的长时间试错，我敏锐地意识到是clang的问题。于是我重新安装了一遍，并使用了`sudo apt install clang`命令解决掉了这个问题。

> 我刚开始安装的时候，一直在 ./configure的时候出各种各样的问题，后来还曾尝试手动编译安装LLVM和Clang(另外，我刚开始还以为Clang是LLVM的一个部分，只需要手动编译安装LLVM就行，不用管Clang，但是一直解决不了问题，后来我详细了解之后LLVM和Clang才意识到LLVM是采用Clang作为编译前端，安装的时候不存在包含关系)。另外，我因为多次重装虚拟机的系统，**还出现了很多因为系统安装太着急，缺少一些库引起的错误**，没有记录下来，如果您也遇到了，建议先去尝试搜索解决的方案，然后安装缺少的库即可。
>
> 另外，如果确实需要手动编译安装LLVM（本人非常不推荐这样做），推荐您最好还是去官网下载预编译之后的压缩包，另外，您还需要在`./configure`时加上类似--with-clang-prefix的选项，比如：`sudo ./configure --with-clang-prefix=/home/sheen/clang`。
>
> 关于llvm-config和xcode-select问题的另一种解决方案，我实验室超级厉害的一位老师提供的解决方案（这个是他之前在谷歌的群里面的时候，PPCG作者提供的）如下：因为LLVM10.0之后与PPCG的兼容性没有之前版本高了，原因好像是因为LLVM采用了cmake进行编译，与之前相比，cxxflags少了一个 `-fno-rtti`（执行`llvm-config --cxxflags`命令可以查看），才导致出现了这些问题。对比见下面两张图片：
>
> ![image-20210326202428524](%E6%88%91%E7%9A%84PPCG%E7%BC%96%E8%AF%91%E5%99%A8%E5%AE%89%E8%A3%85%E5%8E%86%E7%A8%8B/image-20210326202428524.png)
>
> ![image-20210326202449961](%E6%88%91%E7%9A%84PPCG%E7%BC%96%E8%AF%91%E5%99%A8%E5%AE%89%E8%A3%85%E5%8E%86%E7%A8%8B/image-20210326202449961.png)
>
> 那么怎么解决呢？答案就是修改Makefile文件，阅读Makefile文件源码，在cxxflags这里加上`-fno-rtti`。具体而言就是：在Makefile文件中CCLD或者CC后面加上`-fno-rtti`即可，具体我也记不太清了，需要详细阅读Makefile源码才可。由于本人菜，尝试了几次并没有成功，有需要的可以知乎私信“要术贾杰”，或者和大佬一样咨询PPCG作者。

#### 四、编译源码以及进行编译检查

这个部分按照官方文档描述的`make`和`make check`命令进行编译以及编译检查即可。值得一提的是**执行命令的时候需要超级管理员权限**，因为建议使用`sudo make`和`sudo make check`，否则会提示`Permission denied`。另外，如果没有安装make，肯定是需要`sudo apt install make`进行安装的。

#### 五、上述均无误后进行安装

我之所以把这一步和第四步进行分开，就是要提醒读者，**一定要在`sudo make check`没有问题之后，再执行`sudo make install`命令进行安装。**

#### 六、添加链接库的位置，并验证安装是否成功

就在你完成上述全部步骤之后，你满怀信心的执行了`ppcg --version`时，可能系统会报以下错误：

```
ppcg: error while loading shared libraries: libpet.so.10: cannot open shared object file: No such file or directory
```

这个时候千万别慌，你安装并没有问题，这个是动态链接库的链接和查找问题，意思系统找不到libpet.so.10这个共享文件，原因其实是它的目录不在默认的查找范围内。按照以下三个步骤即可解决（还有很多其他的解决方案，可自行搜索）：

（1）执行以下命令（没有安装vim,需要执行`sudo apt install vim`进行安装）：

```
sudo vim /etc/ld.so.conf
```


（2）在文件末尾添加以下几行（vim使用方法请自行百度）： 

```js
/usr/local/lib
/usr/lib
/lib
```

（3）执行以下命令更新配置：

```
sudo ldconfig
```

之后，就可以利用`ppcg --version`查看安装是否成功了，我的成功截图如下：

![image-20210326210025900](%E6%88%91%E7%9A%84PPCG%E7%BC%96%E8%AF%91%E5%99%A8%E5%AE%89%E8%A3%85%E5%8E%86%E7%A8%8B/image-20210326210025900.png)

#### 七、执行一个小例子测试PPCG

为了确保PPCG完全没有问题，我们下面用一个小例子进行测试一下。新建一个test.c的文件，内容如下：

```
#include <stdlib.h>

int main()
{
    int a[1000], b[1000];
    
    for (int i = 0; i < 1000; ++i)
        a[i] = i;
#pragma scop
    for (int i = 0; i < 1000; ++i)
        b[i] = a[i];
#pragma endscop
    for (int i = 0; i < 1000; ++i)
        if (b[i] != a[i])
	    	return EXIT_FAILURE;
    return EXIT_SUCCESS;
}
```

在该文件的目录下用命令行执行`ppcg --target=cuda test.c`，然后会自动生成`test_host.cu`、`test_kernel.cu`和`test_kernel.hu`三个CUDA文件（即由串行的C语言源程序生成了可以并行的CUDA源程序），然后利用CUDA的编译器NVCC即可运行CUDA程序。

#### 八、其他事宜

如果你当前的用户没有超级管理员权限，又需要安装PPCG，那么你首先需要用管理员权限安装必要的支持包，即`sudo apt install automake autoconf libtool pkg-config libgmp3-dev libyaml-dev libclang-dev llvm clang make`。然后在configure命令执行时指定安装位置而不是使用默认的`/usr/bin`，比如当前用户目录下的某一个文件夹即可，例如:`./configure --prefix='you install location of ppcg'`，那么后续的make等命令就不再需要sudo权限即可安装了。另外，安装完PPCG之后，需要配置环境变量，`export PATH=you install location of ppcg:$PATH`，系统方可识别`ppcg`命令。

如果你安装的时候遇到了一些其他的问题，欢迎与我联系，我们一起交流、讨论和学习。

由于作者的知识和能力有限，虽经多次修改，仍难免存在缺点和错误之处，如有错误，恳请各位同行和专家批评指正，以进一步完善，感谢~

参考链接：

https://repo.or.cz/ppcg.git

https://github.com/Meinersbur/ppcg/issues

https://clang.llvm.org/get_started.html

其他发布平台链接：https://zhuanlan.zhihu.com/p/360210690