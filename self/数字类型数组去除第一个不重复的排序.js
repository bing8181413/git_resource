//找到数组中 数字唯一的，并且排序最前的一个
//注意object 的 key 没有顺序
var a = [3,4,5,6,3,2,4,5,1,7,8,1];
var b = a.map(function(item,index){
  return {val:item,index:index};
});
var rtn = b.sort(function(a,b){
    return a.val - b.val; 
});
// console.log(rtn);
rtn = rtn.reduce(function(runningTotal,currentVal){
  var len = runningTotal.length;
  return runningTotal[len-1] && runningTotal[len-1].val == currentVal.val ? (runningTotal.pop() && runningTotal):(runningTotal.push(currentVal) && runningTotal) 
},[]);
console.log(rtn);
var rtn = rtn.sort(function(a,b){
  return a.index - b.index;
})
console.log(rtn,'\t',rtn[0].index);