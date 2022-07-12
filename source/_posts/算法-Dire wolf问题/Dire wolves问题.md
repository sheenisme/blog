---
title: Dire wolves问题
categories:
  - 学习笔记
tags:
  - 算法
date: 2021-02-11 17:24:00
---

## Dire wolves问题

#### **问题描述：**

Dire wolves, also known as Dark wolves, are extraordinarily large and powerful wolves. Many, if not all, Dire Wolves appear to originate from Draenor.

Dire wolves look like normal wolves, but these creatures are of nearly twice the size. These powerful beasts, 8 - 9 feet long and weighing 600 - 800 pounds, are the most well-known orc mounts. As tall as a man, these great wolves have long tusked jaws that look like they could snap an iron bar. They have burning red eyes. Dire wolves are mottled gray or black in color. Dire wolves thrive in the northern regions of Kalimdor and in Mulgore.

Dire wolves are efficient pack hunters that kill anything they catch. They prefer to attack in packs, surrounding and flanking a foe when they can.

— Wowpedia, Your wiki guide to the World of Warcra

<!--more-->

Matt, an adventurer from the Eastern Kingdoms, meets a pack of dire wolves. There are N wolves standing in a row (numbered with 1 to N from left to right). Matt has to defeat all of them to survive.

Once Matt defeats a dire wolf, he will take some damage which is equal to the wolf’s current attack. As gregarious beasts, each dire wolf i can increase its adjacent wolves’ attack by bi. Thus, each dire wolf i’s current attack consists of two parts, its basic attack ai and the extra attack provided by the current adjacent wolves. The increase of attack is temporary. Once a wolf is defeated, its adjacent wolves will no longer get extra attack from it. However, these two wolves (if exist) will become adjacent to each other now.

For example, suppose there are 3 dire wolves standing in a row, whose basic attacks ai are (3, 5, 7), respectively. The extra attacks bi they can provide are (8, 2, 0). Thus, the current attacks of them are (5, 13, 9). If Matt defeats the second wolf first, he will get 13 points of damage and the alive wolves’ current attacks become (3, 15).

As an alert and resourceful adventurer, Matt can decide the order of the dire wolves he defeats. Therefore, he wants to know the least damage he has to take to defeat all the wolves.

可怕的狼，也被称为黑狼，是非常巨大和强大的狼。许多(不是全部)可怕的狼似乎都起源于德拉诺。
可怕的狼看起来像普通的狼，但这些生物的体型几乎是普通狼的两倍。这些强大的野兽长8-9英尺，重600-800磅，是最著名的兽人坐骑。这些巨大的狼和人一样高，长着长牙的下巴，看起来就像可以折断一根铁棒。他们有一双火红的眼睛。可怕的狼是斑驳的灰色或黑色。可怕的狼在卡利姆多和马尔戈尔北部地区繁衍生息。
可怕的狼是高效的群居猎人，会杀死他们捕获的任何东西。他们更喜欢成群结队地攻击，在可能的情况下包围和包抄敌人。
-Wowpedia，你的维基指南Warcra Matt，一位来自东方王国的冒险家，遇到了一群可怕的狼。有N只狼站成一排(从左到右用1到N编号)。马特必须击败所有人才能活下来。
一旦马特击败了一只可怕的狼，他将受到相当于狼当前攻击的一些伤害。作为群居的野兽，每只可怕的狼I都可以增加其相邻狼群的攻击倍数。因此，每一只可怕的狼I当前的攻击由两部分组成，它的基本攻击AI和当前相邻狼提供的额外攻击。袭击的增加是暂时的。一旦一只狼被击败，它的相邻狼群将不再受到它的额外攻击。然而，这两只狼(如果存在)现在将成为相邻的。
例如，假设有3只可怕的狼站成一排，它们的基本攻击ai分别为(3，5，7)。它们可以提供的额外攻击bi是(8，2，0)。因此，他们目前的攻击是(5，13，9)。如果马特先击败第二只狼，他将得到13点伤害，而活着的狼目前的攻击变成(3，15)。
作为一名机警和足智多谋的冒险家，马特可以决定他击败的可怕狼的顺序。因此，他想知道要打败所有的狼，他需要承受的伤害最小。

#### **输入数据：**

The first line contains only one integer T , which indicates the number of test cases. For each test case, the first line contains only one integer N (2 ≤ N ≤ 200).

The second line contains N integers ai (0 ≤ ai ≤ 100000), denoting the basic attack of each dire wolf.

The third line contains N integers bi (0 ≤ bi ≤ 50000), denoting the extra attack each dire wolf can provide.

第一行只包含一个整数T，它表示测试用例的数量。对于每个测试用例，第一行只包含一个整数N(2≤N≤200)。
第二行包含N个整数ai(0≤ai≤100000)，表示每个可怕的狼的基本攻击。
第三行包含N个整数bi(0≤bi≤50000)，表示每个可怕的狼可以提供的额外攻击。

#### **输出数据：**

For each test case, output a single line “Case #x: y”, where x is the case number (starting from 1), y is the least damage Matt needs to take.

对于每个测试用例，输出一行“case#x：y”，其中x是案例编号(从1开始)，y是Matt需要受到的最小损害。

#### **输入输出样例：**

##### **输入：**

2

3

3 5 7

8 2 0

10

1 3 5 7 9 2 4 6 8 10

9 4 1 2 1 2 1 4 5 1

##### **输出：**

Case #1: 17

Case #2: 74

#### **提示：**

 In the ﬁrst sample, Matt defeats the dire wolves from left to right. He takes 5 + 5 + 7 = 17 points of damage which is the least damage he has to take.

在ﬁ第一个样本中，马特从左到右击败了可怕的狼队。他受到5+5+7=17点的伤害，这是他必须承受的最小伤害。

#### 解题思路和算法思想

这个是一个区间动态规划（DP）的题目，区间动态规划问题一般都是考虑，对于每段区间，他们的最优值都是由几段更小区间的最优值得到，是分治思想的一种应用，将一个区间问题不断划分为更小的区间直至一个元素组成的区间，枚举他们的组合 ，求合并后的最优值。

设`dp[i][j]`为消灭编号从i到j只狼的代价，那么结果就是`dp[1][n]`，枚举k作为最后一只被杀死的狼，此时会受到`ai[k]`和`bi[i-1] bi[j+1]`的伤害，取最小的即可。

可列出转移方程：

`dp[i][j]=min(dp[i][j], dp[i][k-1]+dp[k+1][j]+a[k]+b[i-1]+b[j+1]);`

伪代码如下图所示：

![img](Dire%20wolves%E9%97%AE%E9%A2%98/clip_image002.jpg)

#### 解题过程形象化展示

此题目重点在于结合分治法思想对下面状态转移方程的理解：

`dp[start][end]`为消灭编号从start到end只狼的代价，状态转移方程为：

`dp[start][end] = min(dp[start][end], (dp[start][mid - 1] + dp[mid + 1][end] + ai[mid] + bi[start - 1] + bi[end + 1]))`

#### 源代码:

C语言：

	/* 参考链接：
	https://blog.csdn.net/hurmishine/article/details/50198967
	https://blog.csdn.net/hurmishine/article/details/50198967
	*/
	// 区间动态规划问题一般都是考虑，对于每段区间，他们的最优值都是由几段更小区间的最优值得到，是分治思想的一种应用，
	// 将一个区间问题不断划分为更小的区间直至一个元素组成的区间，枚举他们的组合 ，求合并后的最优值。
	// 设F[i,j]（1<=i<=j<=n）表示区间[i,j]内的数字相加的最小代价
	// 最小区间F[i,i]=0（一个数字无法合并，∴代价为0）
	// 每次用变量k（i<=k<=j-1）将区间分为[i,k]和[k+1,j]两段
	// for p:=1 to n do // p是区间长度，作为阶段。 
	// for i:=1 to n do // i是穷举的区间的起点
	// begin
	// 	j:=i+p-1; // j是 区间的终点，这样所有的区间就穷举完毕
	// 	if j>n then break; // 这个if很关键。
	// 	for k:= i to j-1 do // 状态转移，去推出 f[i,j]
	// 	f[i , j]= max{f[ i,k]+ f[k+1,j]+ w[i,j] } 
	// end
	// 这个结构是区间动态规划的代码结构。，C代码如下：
	// for (int len = 1; len <= n; len++)
	// { //枚举长度
	// 	for (int j = 1; j + len <= n + 1; j++)
	// 	{ //枚举起点，ends<=n
	// 		int ends = j + len - 1;
	// 		for (int i = j; i < ends; i++)
	// 		{ //枚举分割点，更新小区间最优解
	// 			dp[j][ends] = min(dp[j][ends], dp[j][i] + dp[i + 1][ends] + something);
	// 		}
	// 	}
	// }
	
	#include <stdio.h>
	#include <string.h>
	int main()
	{
		int t, n, i, j, length;
		int start, mid, end;
		int a[210], b[210];
		/** dp[i][j]表示击杀区间[i,j]中的狼最少耗费 */
		int dp[210][210];
		int times = 0;
		scanf("%d", &t);
		while (t--)
		{
			/**初始化*/
			memset(dp, 0, sizeof(dp));
			memset(a, 0, sizeof(a));
			memset(b, 0, sizeof(b));
	
			scanf("%d", &n);
			// 获取基本攻击
			for (i = 1; i <= n; i++)
			{
				scanf("%d", &a[i]);
			}
			// 获取额外攻击
			for (i = 1; i <= n; i++)
			{
				scanf("%d", &b[i]);
			}
			// 初始化击杀区间
			for (i = 1; i <= n; i++)
			{
				for (j = i; j <= n; j++)
					dp[i][j] = 99999999;
			}
			
			for (length = 0; length <= n; length++) /**区间长度*/
			{
				for (start = 1; start < n + 1 - length; start++) /**区间的起点*/
				{
					end = start + length;				 /**终点(起点+长度==终点)*/
					for (mid = start; mid <= end; mid++) /**中间点*/
					{
						if (dp[start][mid - 1] + dp[mid + 1][end] + a[mid] + b[start - 1] + b[end + 1] < dp[start][end])
						{
							dp[start][end] = dp[start][mid - 1] + dp[mid + 1][end] + a[mid] + b[start - 1] + b[end + 1];
						}
					}
				}
			}
			printf("Case #%d: %d\n", ++times, dp[1][n]);
		}
		return 0;
	}
python语言：

```
# -*- coding: utf-8 -*-#
# File_Name:     sgh-alg-3.py
# Description: 
# Author:        sheen song(未央)
# Date:          2021/2/4


# 算法核心部分
def dire_wolves():
    T = int(input("请输入测试用例得个数:"))
    for case in range(T):
        N = int(input("请输入狼得个数:"))
        # dp[i][j] 表示击杀区间[i, j]中的狼最少耗费，注意头尾都要多一个0，防止后续越界
        dp = [[0 for i in range(N + 2)] for j in range(N + 2)]
        # print(dp)
        # 读取基本攻击行
        ai = [0 for i in range(N + 3)]
        st_i = 1
        for temp in list(map(int, input().split())):
            ai[st_i] = temp
            st_i += 1
        # print("ai:", ai)

        # 读取额外攻击行
        bi = [0 for i in range(N + 3)]
        st_i = 1
        for temp in list(map(int, input().split())):
            bi[st_i] = temp
            bi.append(temp)
            st_i += 1
        # print("bi:", bi)

        # 初始化击杀区间(二维列表)
        for i in range(1, N + 1):
            for j in range(i, N + 1):
                dp[i][j] = 99999999
        # print(dp)
        for length in range(0, N + 1):  # 区间长度
            # print("length:", length)
            for start in range(1, N - length + 1):   # 区间的起点
                # print("start:", start)
                end = start + length   # 终点(起点+长度=终点)
                # print("end:", end)
                for mid in range(start, end + 1):   # 中间点
                    # print("mid:", mid)
                    dp[start][end] = min(dp[start][end], (dp[start][mid - 1] + dp[mid + 1][end] + ai[mid] + bi[start - 1] + bi[end + 1]))
        print("case #", case + 1, ":", dp[1][N])


dire_wolves()
```

