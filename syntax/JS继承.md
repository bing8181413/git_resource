#### JS 继承，4 个方式

##### 1 JS 原型（prototype）实现继承  


````javascript

function Fun(){
	this.name = 'hello';
}
Fun.prototype.fun = function(){
		console.log(this.name);
	}
var a = new Fun();
a.fun();

````
##### 2 构造函数实现继承

````javascript

function Parent(name){
	this.name = name || 'hello default';
	this.sayName = function(){
		console.log(this.name);
	}
}
function Child(name, age){
	this.extendMethod = Parent;
	this.extendMethod(name);
	this.age = age;
	this.say = function(){
		console.log(`我是 ${this.name || 'default 张三'},今年 ${this.age || '0'}岁`);
	}
}
var parent1 = new Parent('Parent');
parent1.sayName();

var parent2 = new Parent();
parent2.sayName();

var child1 = new Child('child',30);
child1.say();

var child2 = new Child();
child2.say();

````
##### 3 call apply 继承

````javascript

function Person(naem , age){
	this.name = name;
	this.age = age;
	this.say = function(){
		console.log(`人类。。。 ${this.name},存活${this.age} 年了`);
	}
}
function Student (name, age){
	Person.apply(this,arguments);
	this.newSay = function(){
		console.log(`我是一名学生，我叫 ${this.name},今年${this.age} 岁了`);
	}
}
var student = new Student('张三',30);
student.say();
student.newSay();

````

##### 4 类继承 ES6 更优雅的方式 也清晰

````javascript

class Animal{
	constructor(props){
		this.name = props.name || '未知';
	}

	eat() {
		console.log(`名字叫 ${this.name}.....在吃东西食`)
	}
}
class Bird extends Animal {
	constructor(props){
		super(props);
		this.type = props.type || "未知";
	}

	fly(){
		console.log(`鸟名是 ${this.name}.....起飞了`)
	}
}
var myBird = new Bird({
	name: '鹦鹉'
})
myBird.eat()
myBird.fly()
	
````




