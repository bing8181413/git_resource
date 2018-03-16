## rem 布局原理及使用  
##### 来源 https://zhuanlan.zhihu.com/p/30413803
#### 根据设计稿 宽度 一般750 或者640 
###### rem取值分为两种情况，设置在根元素时和非根元素时，举个例子
##### 作用于根元素，相对于原始大小（16px），所以html的 font-size 为 32px
```css
html {font-size: 2rem}
````
##### 作用于非根元素，相对于根元素字体大小，所以为 64px 
```css
p {font-size: 2rem}
```
##### 如果让html元素字体的大小，恒等于屏幕宽度的1/100，那1rem和1x就等价了
```css
html {fons-size: width / 100}
p {width: 50rem} /* 50rem = 50x = 屏幕宽度的50% */ 
```
##### 如何让html字体大小一直等于屏幕宽度的百分之一呢？ 可以通过js来设置，一般需要在页面dom ready、resize和屏幕旋转中设置
```javascript
document.documentElement.style.fontSize =
document.documentElement.clientWidth / 100 + 'px'; 
```
##### 假设UE图尺寸是640px，UE图中的一个元素宽度是100px，根据公式100/640*100 = 15.625
````css
p {width: 15.625rem}
````
#### 有更好办法 
##### 利用css预处理 写function 
````sass
$ue-width: 640; /* ue图的宽度 */

@function px2rem($px) {
  @return #{$px/$ue-width*100}rem;
}

p {
  width: px2rem(100);
}
````
##### 结果
```css
p {width: 15.625rem} 
```
### 比Rem更好的方案  
#####css3带来了rem的同时，也带来了vw和vh

````css
/* rem方案 */
html {fons-size: width / 100}
p {width: 15.625rem}

/* vw方案 */
p {width: 15.625vw}
````
##### 给html添加一个320时的默认字体大小，保证页面可以显示
````css
html {fons-size: 3.2px} 
````
##### 如果你想要更好的体验，不如添加媒体查询吧
````css
@media screen and (min-width: 320px) {
	html {font-size: 3.2px}
}
@media screen and (min-width: 481px) and (max-width:640px) {
	html {font-size: 4.8px}
}
@media screen and (min-width: 641px) {
	html {font-size: 6.4px}
}
````
##### 通过上面可以得出最好的弹性布局方案是，rem+js方案，同时还要解决noscript问题，解决字体问题，解决屏幕过宽问题
      
##### 但是上面的方案还有个问题，就是分成100份的话，假设屏幕宽度320，此时html大小是3.2px，但浏览器支持最小字体大小是12px，怎么办？那就分成10份呗，只要把上面的100都换成10就好了
      
##### 下面给一个完整的例子，css的计算没有使用预处理器，这个很简单
````html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

    <title>rem布局</title>
</head>
<body>
    <noscript>开启JavaScript，获得更好的体验</noscript>

    <div class="p1">
        宽度为屏幕宽度的50%，字体大小1.2em
        <div class="s1">
            字体大小1.2.em
        </div>
    </div>

    <div class="p2">
        宽度为屏幕宽度的40%，字体大小默认
        <div class="s2">
            字体大小1.2em
        </div>
    </div>
</body>
</html>
````

````css
html {
    font-size: 32px; /* 320/10 */
}
body {
    font-size: 16px; /* 修正字体大小 */
    /* 防止页面过宽 */
    margin: auto;
    padding: 0;
    width: 10rem;
    /* 防止页面过宽 */
    outline: 1px dashed green;
}

/* js被禁止的回退方案 */
@media screen and (min-width: 320px) {
    html {font-size: 32px}
    body {font-size: 16px;}
}
@media screen and (min-width: 481px) and (max-width:640px) {
    html {font-size: 48px}
    body {font-size: 18px;}
}
@media screen and (min-width: 641px) {
    html {font-size: 64px}
    body {font-size: 20px;}
}

noscript {
    display: block;
    border: 1px solid #d6e9c6;
    padding: 3px 5px;
    background: #dff0d8;
    color: #3c763d;
}
/* js被禁止的回退方案 */

.p1, .p2 {
    border: 1px solid red;
    margin: 10px 0;
}

.p1 {
    width: 5rem;
    height: 5rem;

    font-size: 1.2em; /* 字体使用em */
}

.s1 {
    font-size: 1.2em; /* 字体使用em */
}

.p2 {
    width: 4rem;
    height: 4rem;
}
.s2 {
    font-size: 1.2em /* 字体使用em */
}
````
````javascript
var documentElement = document.documentElement;

function callback() {
    var clientWidth = documentElement.clientWidth;
    // 屏幕宽度大于780，不在放大
    clientWidth = clientWidth < 780 ? clientWidth : 780;
    documentElement.style.fontSize = clientWidth / 10 + 'px';
}

document.addEventListener('DOMContentLoaded', callback);
window.addEventListener('orientationchange' in window ? 'orientationchange' : 'resize', callback);
````

##### 虽然vw各种优点，但是vw也有缺点，首先vw的兼容性不如rem好 
| 兼容性  | Ios  | 安卓   |

| ---- | ---- | ---- |

| rem  | 4.1+ | 2.1+ |

| vw   | 6.1+ | 4.4+ |

## 另外：容易忽视的地方
##### line-height 是计算数值（比如24px,2em）时不继承父级属性，
##### 若指定了一个缩放因子（比如：2）时继承父级（ 2 倍继承父级，与本来的字体大小的乘积计算结果）
````html
<div class="p2">
    <div class="s5">1</div>
    <div class="s6">1</div>
</div>
<style>
.p2 {font-size: 16px; line-height: 2;}
.s5 {font-size: 2em;}
.s6 {font-size: 2em; line-height: 2em;} 
</style>
````
#### 结果 注意 s5
````css
p2：font-size: 16px; line-height: 32px
s5：font-size: 32px; line-height: 64px
s6：font-size: 32px; line-height: 64px 
````





