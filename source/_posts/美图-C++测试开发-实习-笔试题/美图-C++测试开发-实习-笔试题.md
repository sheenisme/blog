---
title: 美图-C++测试开发-实习-笔试题
tags:
  - 笔试面经
  - C/C++编程
categories:
  - 学习笔记
date: 2022-06-26 15:21:10
---

## 美图-C++测试开发-实习-笔试题

来，直接上题目。

#### 第一题：小美的01串

##### 题目描述：

小美有两个01串s,t。她想求s和t的所有长度等于|s|子串(连续)的汉明距离的和。即，她想知道:![img](%E7%BE%8E%E5%9B%BE-C++%E6%B5%8B%E8%AF%95%E5%BC%80%E5%8F%91-%E5%AE%9E%E4%B9%A0-%E7%AC%94%E8%AF%95%E9%A2%98/930CD62D8072DC2923D8264BC7092091.png)汉明距离(ti, s) ，其中ti指第i个字符开始的长度为|s|的子串。
对于等长01串a, b,他们之间汉明距离的定义是![img](%E7%BE%8E%E5%9B%BE-C++%E6%B5%8B%E8%AF%95%E5%BC%80%E5%8F%91-%E5%AE%9E%E4%B9%A0-%E7%AC%94%E8%AF%95%E9%A2%98/C2053A3A6C1E67FA14289734DDED33FB.png)

##### 输入描述：

对于每组数据，包含两行数据，第一行是s, 第二行是t;
1≤|s|≤|t|≤50000

##### 输出描述：

输出一一个整数，表示汉明距离的和。

##### **我的题解代码（c++）:**

<!--more-->

```c++
#include<iostream>
#include<sstream>
#include<string>
#include<vector>
#include<algorithm>
#include<bits/stdc++.h>

using namespace std;

int dist_HM(string s,string t){
  // cout << length(s) << endl;
  // int len=length(s);
  int dist=0;
  for(int i=0;i<t.size()-s.size()+1;i++){
    for(int j=0;j<s.size();j++){
      // dist += fabs(t[i+j]-s[j]);
      dist += ((t[i+j]&s[j])-'0');
      // cout << t[i+j] << " " << s[j] << ":" <<  dist << endl;
    }
  }
  return dist;
}
int main(){
  string s,t;
  cin >> s >> t;
  cout << dist_HM(s,t) << endl;
  return 1;
}        
```

通过率：81%，剩下的超时，应该想办法将两层循环改为一层？我确实没啥思路了........

#### 第二题： 菱形图

##### 题目描述：

菱形是一类非常优美的图形:其对边对称，四条边长度相等。例如正方形就是一类特殊的菱形。对于图论而言，菱形图是指-个无向图形成的环，满足点数大于等于4，其中可以找到四个不相同的点a,b,c,d,使得a→b, b→c, c→d, d→a的距离都相等。
小美刚刚学完图论。她随手造了一张n个点m条无向边的图(不含重边和自环，保证连通，即任意两个点都互相可达)，她想知道这张图是不是菱形图。(本题目中，我们默认两点之间的距离为1)。

##### 输入描述：

第一行一个正整数T，表示有T组数据。
对于每一组数据，第一行两个正整数n, m,表示无向图的点数和边数:
第二行m个正整数ui;第三行m个正整数vi，表示ui与vi之间有一条无向边。数据保证无重边和自环且图连通。数字间两两有空格隔开。
![img](%E7%BE%8E%E5%9B%BE-C++%E6%B5%8B%E8%AF%95%E5%BC%80%E5%8F%91-%E5%AE%9E%E4%B9%A0-%E7%AC%94%E8%AF%95%E9%A2%98/C5F0BD873C7087B8428311DA2FC550EA.png)

##### 输出描述：

其是菱形图，输出一行Yes;否则，输出一行No。

##### **我的题解代码（c++）:**

```c++
#include<iostream>
#include<sstream>
#include<string>
#include<vector>
#include<algorithm>
#include<bits/stdc++.h>

using namespace std;

int main(){
  int t;
  cin >> t;
  while(t--){
    // cout << t << endl;
    int n,m;
    int tmp;
    vector<int> u;
    vector<int> v;
    cin >> n >> m;
    if(m<n)
      cout << "No" << endl;
    for(int i=0;i<n;i++){
      cin >> tmp;
      u.push_back(tmp);
    }
    for(int i=0;i<n;i++){
      cin >> tmp;
      v.push_back(tmp);
    }
    int rep=0;
    for(int i=0;i<n;i++){
      bool flag=false;
      for(int j=0;j<n;j++){
        if(!flag && v[i]==u[j]){
          rep++;
          flag=true;
        }
      }
    }
    if(rep==n && n%4==0)
      cout << "Yes" << endl;
    else
      cout << "No" << endl;
  }
}        
```

通过率：27%，显然考虑的不全，但是，我确实没有思路，只好就这样了，起码不是0%🤣

#### 第三题：小美的仓库

##### 题目描述：

小美的家乡遇到了特大暴雨。为此她建立了一一个救援的大米仓库。有货车运来或取走大米。现在有列车队，每个车都要运来或取走一定的大米。 假设小美的仓库最开始有M千克大米，它会在某辆车路过时打开仓库，这样这辆车以及后面的车辆都可以进入仓库运来或取走大米。如果有一辆车取不到本想取到的大米，小美会提前关闭仓库，这辆车以及后面的车辆都不再能进入仓库。(即小美的仓库
会对车队的一个连续子串开放，且保证仓库内的大米不为负值)，请问小美的仓库最多有多少辆车进入。

##### 输入描述：

对于每一组数据， 包含两行数据，

第一行是车队的车辆数n和小美仓库本有的大米m,

第二行是车队想取走(负值)或运来(正值)的大米a，数字间两两有空格隔开。
![img](%E7%BE%8E%E5%9B%BE-C++%E6%B5%8B%E8%AF%95%E5%BC%80%E5%8F%91-%E5%AE%9E%E4%B9%A0-%E7%AC%94%E8%AF%95%E9%A2%98/658ACA9E95B3AB4BBD6200AB0CE629D3.png)

##### 输出描述：

仓库最多有多少辆车进入？

**感觉是01背包问题，但是我确实不太熟悉01背包，另外是最后做的这个题，所以没写出来，大佬们补充一下吧**

#### 第4题：小美买饮料

##### 题目描述：

小美的班上要组织班级聚会啦!老师交给小美一个任务:去给聚会采购果汁饮料。
小美来到超市，发现超市里面一共有n种不同的果汁饮料，种类标记为1，2...，n。每一种饮料都有一个美味度ai, ai越大，说明饮料越好喝。但是，由于有些果汁饮料味道可能很奇怪，于是ai有可能小于等于0。
由于不知道每个同学的口味，每一种饮料小美都恰好买了一瓶。这时，小美在思考:能不能找到这样一对I,r满足1 <= l <= r <=n,且不满足[l,r]=[1,n] (即全选)，使得[l.r]将这个种类内的饮料各买一瓶，其美味度之和大于等于每种饮料都买瓶的美味度之和?

##### 输入描述：

第一行一个正整数T，表示有T组数据。
对于每组数据，第1行一个正整数n;第二行n个整数a1,02. ... ,an.
![img](%E7%BE%8E%E5%9B%BE-C++%E6%B5%8B%E8%AF%95%E5%BC%80%E5%8F%91-%E5%AE%9E%E4%B9%A0-%E7%AC%94%E8%AF%95%E9%A2%98/1B9316D9A05032D5981DACE278C4AB23.png)

##### 输出描述

对于每一组数据，如果找得到这样的，输出Yes; 否则，输出No。

##### **我的题解代码（c++）:**

```c++
// #include<iostream>
// #include<sstream>
// #include<string>
// #include<vector>
// #include<algorithm>
// #include<bits/stdc++.h>

// using namespace std;

// int main(){
//   int t;
//   cin >> t;
//   while(t--){
//     // cout << t << endl;
//     int n;
//     vector<int> num;
//     int tmp;
//     int sum=0;
//     cin >> n;
//     // cout << "n is: " << n << endl;
//     for(int i=0;i<n;i++){      
//       cin >> tmp;
//       // cout << "tmp[" << i << "] is: " << tmp << endl;
//       num.push_back(tmp);
//       sum += tmp;
//     }
//     bool flag=false;
//     for(int i=0;i<num.size();i++){
//       for(int j=num.size()-1;j>=i;j--){
//         // cout << "i is: " << i << ", j is :" << j << " ." << endl;
//         int acc = accumulate(num.begin()+i, num.begin()+j, 0);
//         if( acc >= sum && !flag){
//           cout << "Yes" << endl;
//           flag=true;
//         } 
//       }
//     }
//     if(flag == false)
//       cout << "No" << endl;
//   }
// } 

 
// 和上面的一样     
#include<iostream>
#include<sstream>
#include<string>
#include<vector>
#include<algorithm>
#include<bits/stdc++.h>

using namespace std;

int main(){
  int t;
  cin >> t;
  while(t--){
    // cout << t << endl;
    int n;
    vector<int> num;
    int tmp;
    int sum=0;
    cin >> n;
    // cout << "n is: " << n << endl;
    for(int i=0;i<n;i++){      
      cin >> tmp;
      // cout << "tmp[" << i << "] is: " << tmp << endl;
      num.push_back(tmp);
      sum += tmp;
    }
    bool flag=false;
    for(int i=0;i<num.size();i++){
      for(int j=i+1;j<num.size();j++){
        // cout << "i is: " << i << ", j is :" << j << " ." << endl;
        int acc = accumulate(num.begin()+i, num.begin()+j, 0);
        if( acc >= sum && !flag){
          cout << "Yes" << endl;
          flag=true;
        } 
      }
    }
    if(flag == false)
      cout << "No" << endl;
  }
}        
```

通过率：63%。艹，我刚看见不能是全选，输出yes那里还应该加一个判断，真的是要好好看题目呀

#### 第5题：补充测试用例

可能是因为我投的岗位是测试开发工程师，所以题目是这样的，输入东西的价格，会员类型，然后输出实际的售价，就是不同的会员可能享受不同的优惠券。

但是这个不是让你写代码的，而是让你补充测试用例，我最后就不到剩5分钟，就随手写了10个用例，还有边界的还没开始写，就没时间了，唉

#### 总结

这次确实做的比较差，多多加油吧。

> 牛客网网友([xiaoyui](https://www.nowcoder.com/profile/619413435))的答案供参考：
>
> ```c++
> /*第三题是双指针：
> 代码：
> */
> #include<bits/stdc++.h>
> using namespace std;
> 
> int main(void)
> {
>     int n,m;
>     cin >> n >> m;
>     vector<int> v;
>     for (int i = 0; i < n; ++i) {
>         int t;
>         cin >> t;
>         v.push_back(t);
>     }
>     int l=-1, r=0;
>     int sum = 0;
>     int ans = 0;
>     while (r<v.size())
>     {
>         
>         if (sum >= -m) {
>             ans = max(r - l-1, ans);
>             sum += v[r];
>             ++r;
>         }
>         else {
>             ++l;
>             sum -= v[l];
>         }
>     }
>     if (sum >= -m) {
>         ans = max(r - l - 1, ans);
>        // sum += v[r];
>         ++r;
>     }
>     cout << ans;
>     return 0;
> }
> /*
> 第四题贪心：
> */
> #include<bits/stdc++.h>
> using namespace std;
> int main(void)
> {
>     int t;
>     cin >> t;
>     while (t)
>     {
>         --t;
>         int n;
>         long long sum = 0;
>         long long ma = 0;
>         long long t = 0;
>         cin >> n;
>         vector<long long> v;
>         v.push_back(0);
> 		for (int i = 0; i < n; ++i) {
>             int t;
>             cin >> t;
>             sum += t;
>             v.push_back(sum);
>         }
>         int po = 1;
>         bool f = true;
>         int r = 0;
>         while (po<v.size()&;&;f)
>         {
>             for (int i = po; i < v.size(); ++i) {
>                 if (ma <= v[i]) {
>                     ma = v[i];
>                     po = i;
>                 }
>             }
>             for (int i = r; i < po&;&;i<v.size(); ++i) {
>                 if (v[po] - v[i] >= sum &;&; !(i == 0 &;&; po == v.size() - 1)) {
>                     f = false;
>                     cout << "Yes" << '\n';
>                     break;
>                 }
>             }
>             r = po;
>             ++po;
> 
>         }
>         if (f) {
>             cout << "No" << '\n';
>         }
>     }
>     return 0;
> }
> ```

其他链接：https://www.nowcoder.com/discuss/945361?source_id=profile_create_nctrack&channel=-1 （牛客网）

