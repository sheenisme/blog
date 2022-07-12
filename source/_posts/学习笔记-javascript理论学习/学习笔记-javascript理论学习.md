---
title: '[学习笔记]-JavaScript理论学习'
tags:
  - JavaScript
  - JS
categories:
  - 学习笔记
id: '488'
date: 2020-06-23 21:52:19
---

> 由于这次是直接观看的youtube上国外大佬的英文原视频，虽然通过插件配上了字幕，可是还是要靠理解英文字幕来加以学习，故没来得及做笔记，只记下了代码。

<!--more-->

    //变量命名原则：驼峰命名法：第一个字母小写，之后每个单词首字母都大写
    //方法（函数）命名原则：
    //JS中原始数据类型有：String、number、boolean、undefined、null、Symbol(ES6新增)
    //JS中引用数据类型有：Object、array、function
    
    //下面是我的第一个JS代码
    console.log("hello world");
    
    //ES6之后，更推荐用let而不是var来定义变量。
    //注意JS区分大小写
    let name = 'sheen';
    console.log(name);
    
    //const定义一个常量，不可像变量那样修改。
    const interestRate = 0.5;
    console.log(interestRate);
    
    //定义一个对象（变量）
    let person = {
        name:'sheen',
        age:23,
    
        getAge:function(){
            return this.age;
        }
    };
    person.name = 'sheensong';  //点标记法修改
    console.log(person);
    person['age'] = '22';  //括号标记法修改
    console.log(person);
    console.log("年龄是：" + person.getAge());
    
    //定义一个数组
    let selectedArray = ['sgh','yc'];
    selectedArray[2] = 1;
    console.log(selectedArray,selectedArray.length);
    
    //定义一个函数,执行一个任务
    function showFunction(name,needless){
        console.log("Hello " + name + '  ' + needless);
        return true; //返回结果
    }
    console.log(showFunction("sheen and yc"));
    
    //---------------------------next------------------------------------//
    //定义一个对象（常量）
    const circle={
        radius:1,  //半径
        Location:{
            x:1,
            u:1
        },
        draw:function(){
            console.log('draw circle');
        }
    };
    circle.draw()
    
    //工厂函数
    function createCircle(radius){
        return {
            radius,
            draw:function(){
                console.log("draw " + radius);
            }
        };
    }
    const circle2 = createCircle(1);
    circle2.draw();
    
    //构造函数
    function Circle(radius){
        console.log("this ",this)
        this.radius=radius;
        this.draw = function(){
            console.log("构造函数 draw "+radius);
        }
    }
    const another = new Circle(2);
    
    //不用new的方式
    Circle.call({},3,4);
    Circle.apply({},[3,4]);
    
    //---------------------------next------------------------------------//
    //值对象与引用对象的区别
    let x = 10;
    let y = x;
    x = 20;
    
    let x2 = {value:10};
    let y2 = x2;
    x2.value = 20;
    
    let number = 10;
    function increase(number){
        number++;
    }
    increase(number);
    console.log(number);
    
    let obj = {value:10};
    function increase(obj){
        obj.value++;
    }
    increase(obj);
    console.log(obj);
    
    //---------------------------next------------------------------------//
    function Circle(radius){
        this.radius=radius;
        this.draw = function(){
            console.log("draw "+radius);
        }
    }
    //动态添加和修改属性：
    const circle3 = new Circle(2);
    circle3.location={ x:1};
    //属性名称含有特殊字符或者名字未知需要通过其他方式得知，可以利用下面这个方式动态调整属性
    const propertyName = 'location'; 
    circle3[propertyName] = { x:1 };
    
    //动态删除某些属性
    delete circle3.location;  //或者 delete circle3['location']; 
    
    //---------------------------next------------------------------------//
    //遍历或者枚举对象的属性
    function Circle(radius){
        this.radius=radius;
        this.draw = function(){
            console.log("draw "+radius);
        }
    }
    const circle4 = new Circle(10);
    
    //for in 循环
    for (let key in circle4){
        if (typeof circle4[key] != 'function')
            console.log(key,circle4[key] );
    }
    //Object自带函数
    const keys = Object.keys(circle4);
    console.log(keys);
    //判断某一个属性
    if('radius' in circle4)
        console.log('Circle has a radius');
    
    //---------------------------next------------------------------------//
    //抽象：内部是实现细节，外部是公共接口，隐藏所有不必要的细节，面向对象的要点就是这！
    function Circle(radius){
        this.radius=radius;
        let defaultLocation = { x:0, y:0};// let定义的都属于私有的(闭包)，不允许外界访问
        let computerOptionLocation = function(factor){
            //...
        };
        this.draw = function(){
            computerOptionLocation(0.1)
            //defauleLocation
            //this.radius
            console.log("draw "+radius);
        };
    }
    const circle5 = new Circle(10);
    Circle5.draw();
    
    //---------------------------next------------------------------------//
    //Getter和Setter方法
    function Circle(radius){
        this.radius=radius;
        let defaultLocation = { x:0, y:0};
        this.draw = function(){
            console.log("draw "+radius);
        };
        Object.defineProperty(this,'defaultLocation',{
            get:function(){
                return defaultLocation;
            },
            set:function(value){
                if (!value.x ||!value.y)
                    throw new Error('无效的位置！');
                defaultLocation = value;
            }
        });
    }
    
    const circle6 = new Circle(6);
    circle6.draw();
    circle6.defaultLocation=1;
    
    //---------------------------next------------------------------------//
    //练习是学习JS的不二法宝，秒表的JS代码如下：
    function StopWatch(){
        let startTime,endTime,running=false,duration = 0;
    
        this.start = function(){
            if(running)
                throw new Error("StopWatch已经开始了。");
            
            running =true;
    
            startTime = new Date();
        };
    
        this.stop = function(){
            if(!running)
                throw new Error('StopWatch已经结束了。');
    
            running = false;
    
            endTime = new Date();
            const seconds = (endTime.getTime() - startTime.getTime()) / 1000;
            duration += seconds;
        };
    
        this.reset = function(){
            startTime=null;
            endTime=null;
            running=false;
            duration=0;
        };
    
        Object.defineProperty(this,'duration',{
            get:function(){
                return duration;
            },
        });
    }

YouTube链接：[https://www.youtube.com/watch?v=W6NZfCO5SIk](https://www.youtube.com/watch?v=W6NZfCO5SIk)

[https://www.youtube.com/watch?v=PFmuCDHHpwk](https://www.youtube.com/watch?v=PFmuCDHHpwk)

Write by sheen