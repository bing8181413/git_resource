### JSbridge 的实现方式 2 种
- webview 注入命名空间 类似 window 下的对象一样，直接window.func ,就可以直接调用 webview 的方法
````html
<body>
    <a>js中调用本地方法</a>
    <script>
    
    function funFromjs(){
    	document.getElementById("helloweb").innerHTML="HelloWebView,i'm from js";
    }
    var aTag = document.getElementsByTagName('a')[0];
    aTag.addEventListener('click', function(){
        //调用android本地方法
		myObj.fun1FromAndroid("调用android本地方法fun1FromAndroid(String name)！！");
        return false;
    }, false);
    </script>
    <p></p>
    <div id="helloweb"> 
	</div>
</body>
````
- Scheme 协议  
	- 全局跳转 ，可以在任意的APP内直接通过协议跳转到对应的APP，多个APP定义同一个协议名称，那么会让选择，类似打开网页可以使用多个浏览器一样。