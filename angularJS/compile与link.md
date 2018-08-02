#### 原因只有一个 
##### compile 编译阶段执行，link 是 new 一个实例，就执行一次
- compile 只对原始模板进行转换  
- link 在模板和视图之间建立联系 绑定事件
- scope link 有，compile 没有 ，因为 compile 处于原始阶段
- compile 只会执行一次，link  执行多次，因为是实例，每次都执行
- compile 返回 postLink 后，就不会执行 link 了
