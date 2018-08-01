#### 直接上代码  
##### author :houbingbing

```javascript


var p = function(str){
	str = typeof str == 'string' ? str : ''+str;
	var num =  str.replace(/(^\d+)[\D](.*)/,'$1')*1;
	console.log(num);
	return num;
}

p(212121); // 212121

p('212121'); // 212121

p('1212sdsdsd'); // 1212

````