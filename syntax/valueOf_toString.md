
### 如果只重写了valueOf方法，在要转换为字符串的时候会优先考虑valueOf方法。在不能调用toString的情况下，只能让valueOf上阵了


````javascript
“1” == true;

将返回true，转换形式是：true首先转换为1，然后再执行比较。接下来字符串“1”也转换成了数字1，相等，所以返回true

````