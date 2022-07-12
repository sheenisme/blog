---
title: Advanced Fruits问题
categories:
  - 学习笔记
tags:
  - 算法
date: 2021-02-11 17:39:00
---

# Advanced Fruits（hdu 1503）问题

#### **问题描述：**

The company "21st Century Fruits" has specialized in creating new sorts of fruits by transferring genes from one fruit into the genome of another one. Most times this method doesn't work, but sometimes, in very rare cases, a new fruit emerges that tastes like a mixture between both of them. 

A big topic of discussion inside the company is "How should the new creations be called?" A mixture between an apple and a pear could be called an apple-pear, of course, but this doesn't sound very interesting. The boss finally decides to use the shortest string that contains both names of the original fruits as sub-strings as the new name. For instance, "applear" contains "apple" and "pear" (APPLEar and apPlEAR), and there is no shorter string that has the same property. 

A combination of a cranberry and a boysenberry would therefore be called a "boysecranberry" or a "craboysenberry", for example. 

Your job is to write a program that computes such a shortest name for a combination of two given fruits. Your algorithm should be efficient, otherwise it is unlikely that it will execute in the alloted time for long fruit names. 

<!--more-->

这家名为“21世纪水果”的公司专门致力于将基因从一种水果转移到另一种水果的基因组中，从而创造出新的水果种类。大多数情况下，这种方法不起作用，但有时，在非常罕见的情况下，会出现一种新的水果，尝起来像是两者的混合物。

公司内部讨论的一个大话题是\“这些新发明应该如何命名？\”苹果和梨的混合物当然可以被称为苹果梨，但这听起来并不是很有趣。老板最终决定使用包含两个原始水果名称的最短字符串作为新名称的子字符串。例如，\“applear\”包含\“apple\”和\“pear\”(APPLEar和apPlEAR)，并且没有更短的字符串具有相同的属性。例如，蔓越莓和波尔森莓的组合就会被称为\“波西兰莓\”或\“克雷伯森莓\”。您的工作是编写一个程序，为两个给定水果的组合计算这样一个最短的名称。您的算法应该是高效的，否则，对于长水果名称，它不太可能在分配的时间内执行。

#### **输入数据：**

Each line of the input contains two strings that represent the names of the fruits that should be combined. All names have a maximum length of 100 and only consist of alphabetic characters.

Input is terminated by end of file.

输入的每一行都包含两个字符串，表示应该组合的水果的名称。所有名称的最大长度为100，并且仅由字母字符组成。
输入在文件结束时终止。

#### **输出数据：**

For each test case, output the shortest name of the resulting fruit on one line. If more than one shortest name is possible, any one is acceptable.

对于每个测试用例，在一行中输出结果水果的最短名称。如果可能有多个最短名称，则任何一个都是可以接受的。

#### **输入输出样例：**

##### **输入：**

apple peach

ananas banana

pear peach

##### **输出：**

appleach

bananas

pearch

#### 解题思路和算法思想：

Advanced Fruits（hdu 1503）问题属于LCS(Longest Common Subsequence,最长公共子序列)问题的一个变形。其定义是，一个序列 S ，如果分别是两个或多个已知序列的子序列，且是所有符合此条件序列中最长的，则 S 称为已知序列的最长公共子序列。

```
动态规划的一个计算两个序列的最长公共子序列的方法如下:
以两个序列 X、Y 为例子，设有二维[数组](user_cancel)f[i,j] 表示 X 的 i 位和 Y 的 j 位之前的最长公共子序列的长度，则有:
f[1][1] = same(1,1);
f[i,j] = max{f[i-1][j -1] + same(i,j),f[i-1,j],f[i,j-1]}
其中，same(a,b)当 X 的第 a 位与 Y 的第 b 位相同时为"1"，否则为"0"或者"-1"分别用来表示X或Y私有。此时，二维数组中最大的数便是 X 和 Y 的最长公共子序列的长度，依据该[数组](user_cancel)回溯，便可找出最长公共子序列。
```

```
这个题就是让找出这两个串的最长公共子序列，然后加上这两个串中减去公共子序列的字符，输出就行；这道题就是给你两个单词，然后你要把两个单词拼接成一个新单词，使得新单词的子序列中包含两个单词，并且要使这个新单词最短。所以这道题就是求最长公共子序列，并且要记录下子序列的字母，以及他们在主串和副串中的原始位置，之后进行拼接输出。

题解:这题很容易推出待求字串的长度和两串的最长公共子序列有关，公共部分输出一次，两字符串各私有的各个输 出；而私有不私有在求解最长公共子序列的时候，每个子问题都可以得出；
例如两个字符串str1和str2，dp[i][j]表示str1的前i个字符和str2的前j个字符的最长公共子序列。
1):
dp[i][j] = dp[i - 1][j - 1]+1;str1[i-1]和str2[j-1]视为两字符串共有；vis[x][y] = 1;
2):
dp[i][j] = dp[i - 1][j];str1[i-1]为str1私有； vis[x][y] = 0;
3):   
dp[i][j] = dp[i][j - 1];str2[j-1]为str2私有； vis[x][y] = -1;
```

![img](Advanced%20Fruits%E9%97%AE%E9%A2%98/clip_image002.jpg)

#### 解题过程形象化表示：

此题重点在于对LCS求解过程的理解，以X=abcbdab，Y=bdcaba为例，递归回溯的形象化表示如下图所示：

![img](Advanced%20Fruits%E9%97%AE%E9%A2%98/clip_image004.jpg)

#### 源代码：

C语言：

```c
/* 参考链接：
https://www.cnblogs.com/handsomecui/p/4726261.html
https://www.xuebuyuan.com/2858528.html
https://www.cnblogs.com/ranjiewen/p/5559490.html
*/
#include<stdio.h>
#include<string.h>
int map[1010][1010],dp[1010][1010];
char s1[1010],s2[1010];
void Lcs(int len1,int len2)
{
	int i,j;
	for(i=0;i<=len1;i++)
	{
		map[i][0]=0;
	}
	for(j=0;j<=len2;j++)
		map[0][j]=-1;
	for(i=1;i<=len1;i++)
	{
		for(j=1;j<=len2;j++)
		{
			if(s1[i-1]==s2[j-1])
			{
				map[i][j]=1;
				dp[i][j]=dp[i-1][j-1]+1;
			}
			else
			{
				if(dp[i-1][j]>=dp[i][j-1])
				{
					dp[i][j]=dp[i-1][j];
					map[i][j]=0;
				}
				else
				{
					dp[i][j]=dp[i][j-1];
					map[i][j]=-1;
				}
			}
		}
	}
}
void printfl(int i,int j)
{	
	if(i==0&&j==0)
		return;
	if(map[i][j]==1)
	{
		printfl(i-1,j-1);
		printf("%c",s1[i-1]);
	}
	else
		if(map[i][j]==0)
		{
			printfl(i-1,j);
			printf("%c",s1[i-1]);
		}
		else
			if(map[i][j]==-1)
			{
				printfl(i,j-1);
				printf("%c",s2[j-1]);
			}			
}
int main()
{
	//char s1[1001],s2[1001];
	int len1,len2;
	while(scanf("%s%s",s1,s2)!=EOF)
	{
		//	memset(map,0,sizeof(map));
		len1=strlen(s1);
		len2=strlen(s2);
		memset(dp,0,sizeof(dp));
		Lcs(len1,len2);
		printfl(len1,len2);
		printf("\n");
	}
}
```

Python语言：

```python
# -*- coding: utf-8 -*-#
# File_Name:     sgh-alg-4.py
# Description: 
# Author:        sheen song(未央)
# Date:          2021/2/7
# mathlib_pwd:   /home/mathlib/sheen/remote_pycharm_sources/pycharm_sync_sources


def LCS(len1, len2):
    global map, s1, s2

    for i in range(len1 + 1):
        map[i][0] = 0
    for j in range(len2 + 1):
        map[0][j] = -1
    # print(map)

    for i in range(1, len1 + 1):
        for j in range(1, len2 + 1):
            if s1[i - 1] == s2[j - 1]:
                map[i][j] = 1
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                if dp[i - 1][j] >= dp[i][j - 1]:
                    dp[i][j] = dp[i - 1][j]
                    map[i][j] = 0
                else:
                    dp[i][j] = dp[i][j - 1]
                    map[i][j] = -1


def print_f1(i, j):
    global map, s1, s2
    if i == 0 and j == 0:
        return
    if map[i][j] == 1:
        print_f1(i - 1, j - 1)
        print(s1[i - 1], end="")
    else:
        if map[i][j] == 0:
            print_f1(i - 1, j)
            print(s1[i - 1], end="")
        else:
            if map[i][j] == -1:
                print_f1(i, j - 1)
                print(s2[j - 1], end="")


while True:
    try:
        map = [[0 for i in range(1010)] for j in range(1010)]
        dp = [[0 for i in range(1010)] for j in range(1010)]
        lst = input().split(" ")
        # print(lst)
        s1 = lst[0]
        # print(s1)
        s2 = lst[1]
        # print(s2)
        len1 = len(s1)
        # print(len1)
        len2 = len(s2)
        # print(len2)
        LCS(len1, len2)
        print_f1(len1, len2)
        print('\n')
    except:
        break
```

#### 附录：

---------------------

##### [最长公共子序列（LCS）](https://www.cnblogs.com/ranjiewen/p/5559490.html)

   最长公共子序列，英文缩写为LCS(Longest Common Subsequence)。其定义是，一个序列 S ，如果分别是两个或多个已知序列的子序列，且是所有符合此条件序列中最长的，则 S 称为已知序列的最长公共子序列。**而最长公共子串(要求连续)和最长公共子序列是不同的.**

   最长公共子序列是一个十分实用的问题，它可以描述两段文字之间的"相似度"，即它们的雷同程度，从而能够用来辨别抄袭。对一段文字进行修改之后，计算改动前后文字的最长公共子序列，将除此子序列外的部分提取出来，这种方法判断修改的部分，往往十分准确。 

**动态规划法**

   经常会遇到复杂问题不能简单地分解成几个子问题，而会分解出一系列的子问题。简单地采用把大问题分解成子问题，并综合子问题的解导出大问题的解的方法，问题求解耗时会按问题规模呈幂级数增加。为了节约重复求相同子问题的时间，引入一个数组，不管它们是否对最终解有用，把所有子问题的解存于该数组中，这就是动态规划法所采用的基本方法。

```
动态规划的一个计算两个序列的最长公共子序列的方法如下:
以两个序列 X、Y 为例子:
设有二维[数组](http://baike.so.com/doc/5545345-5760453.html)f[i,j] 表示 X 的 i 位和 Y 的 j 位之前的最长公共子序列的长度，则有:
f[1][1] = same(1,1);
f[i,j] = max{f[i-1][j -1] + same(i,j),f[i-1,j],f[i,j-1]}
其中，same(a,b)当 X 的第 a 位与 Y 的第 b 位相同时为"1"，否则为"0"。
此时，二维数组中最大的数便是 X 和 Y 的最长公共子序列的长度，依据该数组回溯，便可找出最长公共子序列。该算法的空间、时间复杂度均为O(n^2)，经过优化后，空间复杂度可为O(n)。
```

什么是最长公共子序列呢?好比一个数列 *S*，如果分别是两个或多个已知数列的子序列，且是所有符合此条件序列中最长的，则*S* 称为已知序列的最长公共子序列。

  举个例子，如：有两条随机序列，如 1 3 4 5 5 ，and 2 4 5 5 7 6，则它们的最长公共子序列便是：4 5 5。

  注意最长公共子串（Longest CommonSubstring）和最长公共子序列（LongestCommon Subsequence, LCS）的区别：子串（Substring）是串的一个连续的部分，子序列（Subsequence）则是从不改变序列的顺序，而从序列中去掉任意的元素而获得的新序列；更简略地说，前者（子串）的字符的位置必须连续，后者（子序列LCS）则不必。比如字符串acdfg同akdfc的最长公共子串为df，而他们的最长公共子序列是adf。LCS可以使用动态规划法解决。

事实上，最长公共子序列问题也有最优子结构性质。

记:

> Xi=﹤x1，⋯，xi﹥即X序列的前i个字符 (1≤i≤m)（前缀）
>
> Yj=﹤y1，⋯，yj﹥即Y序列的前j个字符 (1≤j≤n)（前缀）

假定Z=﹤z1，⋯，zk﹥∈LCS(X , Y)。

- 若**xm=yn**（最后一个字符相同），则不难用反证法证明：该字符必是X与Y的任一最长公共子序列Z（设长度为k）的最后一个字符，即有zk = xm = yn 且显然有Zk-1∈LCS(Xm-1 , Yn-1)即Z的前缀**Zk-1是Xm-1与Yn-1的最长公共子序列**。此时，问题化归成求Xm-1与Yn-1的LCS（*LCS(X , Y)的长度等于LCS(Xm-1 , Yn-1*)的长度加1）。
- 若**xm≠yn**，则亦不难用反证法证明：要么Z∈LCS(Xm-1, Y)，要么Z∈LCS(X , Yn-1)。由于zk≠xm与zk≠yn其中至少有一个必成立，若zk≠xm则有Z∈LCS(Xm-1 , Y)，类似的，若zk≠yn 则有Z∈LCS(X , Yn-1)。此时，问题化归成求Xm-1与Y的LCS及X与Yn-1的LCS。LCS(X , Y)的长度为：max{LCS(Xm-1 , Y)的长度, LCS(X , Yn-1)的长度}。

  由于上述当**xm≠yn**的情况中，求LCS(Xm-1 , Y)的长度与LCS(X , Yn-1)的长度，这两个问题不是相互独立的：两者都需要求LCS(Xm-1，Yn-1)的长度。另外两个序列的LCS中包含了两个序列的前缀的LCS，故问题具有最优子结构性质考虑用动态规划法。

  也就是说，解决这个LCS问题，你要求三个方面的东西：**1**、LCS（Xm-1，Yn-1）+1；**2**、LCS（Xm-1，Y），LCS（X，Yn-1）；**3**、max{LCS（Xm-1，Y），LCS（X，Yn-1）}。

  行文至此，其实对这个LCS的动态规划解法已叙述殆尽。

PS:附录摘自网络