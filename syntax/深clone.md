# 深clone

- JSON stringify parse
	- 弊端 对象不能有 function 的对象
	- 需要JSON2.js 或者高版本浏览器支持

- 递归自己
```javascript

 function deepClone(data){
       var type = getType(data);
       var obj;
       if(type === 'array'){
           obj = [];
       } else if(type === 'object'){
           obj = {};
       } else {
           //不再具有下一层次
           return data;
       }
       if(type === 'array'){
           for(var i = 0, len = data.length; i < len; i++){
               obj.push(deepClone(data[i]));
           }
       } else if(type === 'object'){
           for(var key in data){
               obj[key] = deepClone(data[key]);
           }
       }
       return obj;
   }
```
- 广度优先遍历
```javascripe
//这里为了阅读方便，只深拷贝对象，关于数组的判断参照上面的例子
   function deepClone(data){
       var obj = {};
       var originQueue = [data];
       var copyQueue = [obj];
       //以下两个队列用来保存复制过程中访问过的对象，以此来避免对象环的问题（对象的某个属性值是对象本身）
       var visitQueue = [];
       var copyVisitQueue = [];
       while(originQueue.length > 0){
           var _data = originQueue.shift();
           var _obj = copyQueue.shift();
           visitQueue.push(_data);
           copyVisitQueue.push(_obj);
           for(var key in _data){
               var _value = _data[key]
               if(typeof _value !== 'object'){
                   _obj[key] = _value;
               } else {
                   //使用indexOf可以发现数组中是否存在相同的对象(实现indexOf的难点就在于对象比较)
                   var index = visitQueue.indexOf(_value);
                   if(index >= 0){
                       // 出现环的情况不需要再取出遍历
                       _obj[key] = copyVisitQueue[index];
                   } else {
                       originQueue.push(_value);
                       _obj[key] = {};
                       copyQueue.push(_obj[key]);
                   }
               }
           }
       }
       return obj;
   }

```