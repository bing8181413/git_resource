### Generator 函数
####  基本概念
#### Generator函数是ES6提供的一种异步编程解决方案，语法行为与传统函数完全不同。 
#### Generator函数有多种理解角度。从语法上，首先可以把它理解成，Generator函数一个状态机，封装了多个内部状态。 
#### 执行Generator函数会返回一个遍历器对象，也就是说，Generator函数除了状态机，还是一个遍历器对象生成函数。 
#### 形式上，Generator函数是一个普通函数，但是有两个特征。一是，function关键字与函数名之间有一个星号，二是，函数体内部使用yield语句，定义不同的内部状态。(yield语句在英语里的意思就是“产出”)

```javascript
function* helloWorldGenerator(){
  yield 'hello';
  yield 'world';
  return 'ending';
}
var g = helloWorldGenerator();
```
##### Generator 函数神奇之一：g()并不执行g函数
##### g()并不会执行g函数，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是迭代器对象（Iterator Object）。
##### 上面代码定义了一个Generator函数helloWorldGenerator，它内部有2个yield语句，即该函数有三种状态：hello,world和return语句。
##### Generator函数的调用方法和普通函数一样，但不同的是，调用Generator函数后，该函数并不知晓，返回是也不是函数运行结果，而是一个指向内部状态的指针对象，也就是遍历器对象。 
##### 必须调用遍历器对象的next方法，似的指针移动到下一个状态。也就是说，每次调用next方法，内部指针就从函数头部或上一次定下来的地方开始执行，直到遇到下一个yield语句(或return语句)为止。换言之，Generator函数是分段执行的，yield语句是暂停执行的标记，而next方法可以恢复执行。
```javascript
g.next()
// {value:'hello', done:false}
g.next()
// {value:'world', done:false}
g.next()
// {value:'ending', done:false}
g.next()
// {value:undefined, done:true}
```
##### 上面代码一共调用了4次next方法。
##### 总结一下，调用Generator函数，返回一个遍历器对象，代表Generator函数的内部指针。以后每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。 
##### value属性表示当前的内部状态的值，是yield语句后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。

## Generator函数到底怎么用于异步编程？
### 状态机
```javascript
var ticking = true;
var clock = function() {
  if (ticking)
    console.log('Tick!');
  else
    console.log('Tock!');
  ticking = !ticking;
}
```
### 上面代码的clock函数一共有两种状态（Tick和Tock），每运行一次，就改变一次状态。这个函数如果用Generator实现，就是下面这样。
```javascript
var clock = function*() {
  while (true) {
    console.log('Tick!');
    yield;
    console.log('Tock!');
    yield;
  }
};
```
##### 可以看到，Generator 函数实现的状态机不用设初始变量，不用切换状态，上面的Generator函数实现与ES5实现对比，可以看到少了用来保存状态的外部变量ticking，这样就更简洁，更安全（状态不会被非法篡改）、更符合函数式编程的思想，在写法上也更优雅。Generator之所以可以不用外部变量保存状态，是因为它本身就包含了第一个状态和第二个状态。
