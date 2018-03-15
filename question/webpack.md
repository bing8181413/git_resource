#### webpack 缩短构建编译时间  
### 5 种
```html
1 将大型库外链
2 将库预先编译
3 减少构建搜索或者编译路径
4 缓存
5 并行
```
```javascript
//webpack 
// 使用外链
externals:{
    'react':"React",
    'react-dom':"ReactDom",
    'preact':"preact"
}
// Dllplugin
动态链接库

```
- happypack 
    - https://www.npmjs.com/package/happypack
    
### webpack 有个sourcemap 定位代码bug问题

#### 提高用户首屏加载速度

- cdn & hash
    - 为什么给静态资源加hash
     - 1 避免覆盖旧文件
     - 2 回滚方便,只要回滚html
     - 3 由于文件名唯一,可以开启永久缓存
       - 1 hash
       - 2 chunkhash  一般用这个
       - 3 contenthash
           webpack-md5-hash 插件 :根据文件内容的MD5 生成hash 
