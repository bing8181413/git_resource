#### 直接上代码  

![prototype](https://github.com/bing8181413/git_resource/blob/master/self/parseInt.png)

```javascript


var p = function(str){
	if(typeof str === 'number'){
		return str;
	}
	str = typeof str === 'string' ? str : ''+str;
	var num =  str.replace(/(^\d+)(\D.*)/,'$1')*1;
	console.log(num);
	return num;
}

p(123); // 123

p('12345'); // 12345

p('123sdsdsd'); // 123

````