###  如何理解ES6的yield ？
#### yield 的函数叫 Generator
```javascript
function* gen(x){
  var y = yield x + 2;
	  y = yield x + 5;
  return y;
}
/*
  上面代码就是一个 Generator 函数。
  整个 Generator 函数就是一个封装的异步任务，或者说是异步任务的容器。异步操作需要暂停的地方，都用 yield 语句注明。
*/
undefined
var g = gen(1);
undefined
g.next();// 返回值 {value: 3, done: false}
g.next();//{value: 6, done: false}
g.next();//{value: undefined, done: true}
```
## 三个要注意的地方
    1：函数的定义 要加 *
    2：函数内部的 yield 要放在执行表达式前 当后面next的时候会停在这次执行后
    3：实例化函数后，执行 函数名.next()方法就算执行了一步 跟2步骤结合使用，并返回一个对象  
    {value:执行的表达式返回值，done:yield 协同执行完毕状态的boolen值}

## 每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield语句（或return语句）为止。换言之，Generator函数是分段执行的，yield语句是暂停执行的标记，而next方法可以恢复执行。
### Generator 函数的用法  
##### 下面看看如何使用 Generator 函数，执行一个真实的异步任务。  

```javascript
var fetch = require('node-fetch');

function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log(result.bio);
}
```
##### 执行这段代码的方法如下。
```javascript
var g = gen();
var result = g.next();

result.value.then(function(data){
  return data.json();
}).then(function(data){
  g.next(data);
});
```
#### next(data);next赋值表示上一步直接结果以这个赋值为准 
##### 上面代码中，首先执行 Generator 函数，获取遍历器对象，然后使用 next 方法（第二行），执行异步任务的第一阶段。由于 Fetch 模块返回的是一个 Promise 对象，因此要用 then 方法调用下一个next 方法。

### Generator 函数的特点就是：
- 1、分段执行，可以暂停
- 2、可以控制阶段和每个阶段的返回值
- 3、可以知道是否执行到结尾

#####  斐波那契数列应用
```javascript
function* fibonacci() {
  let [prev, curr] = [0, 1];
  for (;;) { // 这里请思考：为什么这个循环不设定结束条件？
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

for (let n of fibonacci()) {
  if (n > 1000) {
    break;
  }
  console.log(n);
}

// 作者：microkof
// 链接：https://www.jianshu.com/p/e0778b004596
```
##### Generator.prototype.throw() 可以在函数体外抛出错误，然后在Generator函数体内捕获。
##### Generator.prototype.return() 可以返回给定的值，并且终结遍历Generator函数。
```javascript
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}
var g = gen();
console.log(g.next());        // { value: 1, done: false }
console.log(g.return('foo')); // { value: "foo", done: true }
console.log(g.next());        // {value: undefined, done: true}
```
### yield*语句
```javascript
function* foo() {
  yield 'a';
  yield 'b';
}
function* bar() {
  yield 'x';
  foo();
  yield 'y';
}
for (let v of bar()){
  console.log(v);
}
// "x"
// "y"
```
##### 可见，并没有遍历出'a'和'b'。那么如果想在一个Generator函数里调用另一个Generator函数，怎么办？用yield*语句。比如：
```javascript
function* bar() {
  yield 'x';
  yield* foo();
  yield 'y';
}

// 上个函数等同于
function* bar() {
  yield 'x';
  yield 'a';
  yield 'b';
  yield 'y';
}

// 也等同于
function* bar() {
  yield 'x';
  for (let v of foo()) {
    yield v;
  }
  yield 'y';
}

for (let v of bar()){
  console.log(v);
}
// "x"
// "a"
// "b"
// "y"
```
#### 异步操作的同步化写法
##### jquery 写法
```javascript
$.get('a.html',function(dataa) {
    console.log(dataa);
    $.get('b.html',function(datab) {
        console.log(datab);
        $.get('c.html',function(datac) {
            console.log(datac);
        });
    });
});
// a.html
// b.html
// c.html
```
##### yield 写法
````javascript
function request(url) {
  $.get(url, function(response){
    it.next(response);
  });
}

function* ajaxs() {
    console.log(yield request('a.html'));
    console.log(yield request('b.html'));
    console.log(yield request('c.html'));
}

var it = ajaxs();
it.next();
// a.html
// b.html
// c.html
````
### 只有当yield后面跟的函数先执行完，无论执行体里面有多少异步回调，都要等所有回调先执行完，才会执行等号赋值，以及再后面的操作。这也是yield最大的特性。
### 最后一个问题：怎样最快最简单地写出采用 Generator 函数的同步形式的代码？
    
-  第1步：将所有异步代码的每一步都封装成一个普通的、可以有参数的函数，比如上面的request函数。你可能问，上面例子为啥三个异步代码却只定义了一个request函数？因为request函数能复用的嘛。如果不能复用的话，请老老实实定义三个普通函数，函数内容就是需要执行的异步代码。

-  第2步：定义一个生成器函数，把流程写进去，完全的同步代码的写法。生成器函数可以有参数。
  
-  第三步：定义一个变量，赋值为迭代器对象。迭代器对象可以加参数，参数通常将作为流程所需的初始值。
  
-  第四步：变量名.next()。不要给这个next()传参数，传了也没用，因为它找不到上一个yield语句。
  
  
#### 再对比一下，Promise写法是怎样
````javascript
new Promise(function(resolve) {
    $.get('a.html',function(dataa) {
        console.log(dataa);
        resolve();
    });
}).then(function(resolve) {
    return new Promise(function(resolve) {
        $.get('b.html',function(datab) {
            console.log(datab);
            resolve();
        });
    });
}).then(function(resolve) {
    $.get('c.html',function(datac) {
        console.log(datac);
    });
});
````
- Promise的写法的缺点就是各种promise实例对象跟一连串的then，代码量大、行数多，满眼的promise、then、resolve看得头晕，而且每一个then都是一个独立的作用域，传递参数痛苦。
- 再举一例，我想在上述每一步异步中间，都间隔3秒。怎么写？
```javascript
function request(url) {
  $.get(url, function(response){
    it.next(response);
  });
}

function sleep(time) {
  setTimeout(function() {
    console.log('I\'m awake.');
    it.next();
  }, time);
}

function* ajaxs(ur) {
    console.log(yield request(ur));
    yield sleep(3000);
    console.log(yield request('b.html'));
    yield sleep(3000);
    console.log(yield request('c.html'));
}
var it = ajaxs('a.html');
it.next();
```
##### 是不是跟Promise写法的差别更明显了？ajaxs生成器函数里面的代码完全是同步写法表现。
##### 总之，Generator 函数是比Promise写法更科学的一种写法，实践中应当尽量使用Generator 函数。
###### https://www.jianshu.com/p/e0778b004596