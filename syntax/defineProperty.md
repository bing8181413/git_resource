### enumerable
可枚举性（enumerable）用来控制所描述的属性，是否将被包括在for...in循环之中。具体来说，如果一个属性的enumerable为false，下面三个操作不会取到该属性。

- * for..in循环
- * Object.keys方法
- * JSON.stringify方法


```javascript
var o = {a:1, b:2};

o.c = 3;
Object.defineProperty(o, 'd', {
  value: 4,
  enumerable: false
});

o.d
// 4

for( var key in o ) console.log( o[key] ); 
// 1
// 2
// 3

Object.keys(o)  // ["a", "b", "c"]

JSON.stringify(o // => "{a:1,b:2,c:3}"
```
##### 循环的时候不会展示 enumerable 属性为 false 的数据 