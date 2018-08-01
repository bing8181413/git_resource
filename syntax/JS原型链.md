### JS 原型

##### 先看一张图 
![avatar](/user/desktop/doge.png)


 - JS 原型链
	- 概念 ：实例的隐性原型 指向 函数的显示原型
	- var f = new Fun(); 表示 f.__proto__ === Fun.prototype; 返回 true ，其中 Fun 是构造函数 __proto__ 是隐性原型，prototype 是显式原型;
	- var o = new Object();   o.__proto__ === Object.prototype;返回 true;
	- var arr = new Array();   arr.__proto__ === Array.prototype;返回 true;
	
- JS 对象的原型继承关系
