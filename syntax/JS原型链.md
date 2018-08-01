### JS 原型


##### instanceof检测左侧的__proto__原型链上，是否存在右侧的prototype原型。

````javascript

Function instanceof Object;//true
Object instanceof Function;//true

````
注意：instanceof运算时会递归查找L的原型链，即L.__proto__.__proto__.__proto__.__proto__...直到找到了或者找到顶层为止。

##### 先看一张图 
![prototype](https://github.com/bing8181413/git_resource/blob/master/syntax/prototype1.png)


 - JS 原型链
	- 概念 ：实例的隐性原型 指向 函数的显示原型
	- var f = new Fun(); 表示 f.__proto__ === Fun.prototype; 返回 true ，其中 Fun 是构造函数 __proto__ 是隐性原型，prototype 是显式原型;
	- var o = new Object();   o.__proto__ === Object.prototype;返回 true;
	- var arr = new Array();   arr.__proto__ === Array.prototype;返回 true;
	
- JS 对象的原型继承关系
