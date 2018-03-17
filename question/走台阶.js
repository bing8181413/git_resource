// question  n 个台阶  每次可以选择 走1层,2层,3层   一共有几种走法 上去

/// n 剩余的台阶数  这是自己写的
let step = n => {
    if (n > 2) {
        return step(n - 3) + step(n - 2) + step(n - 1);
    } else if (n == 2) {
        return 2;
    } else if (n == 1) {
        return 1;
    } else if (n == 0) {
        return 1;//  这一步 是没想到的 0 也算一步 否则 上面的
    }
}
// 下面是网上的对照 认为走n阶台阶 3种步子大小 走法是先走一步加上先走两步+先走三步的可能数总和 一次类推
let goadd = x => {
    if (x == 1) {
        return 1;
    }
    else if (x == 2) {
        return 2;
    }
    else if (x == 3) {
        return 4;
    }
    else {
        return goadd(x - 1) + goadd(x - 2) + goadd(x - 3);
    }

}
let i = Math.random();
//  经过对比 结果完全一样
console.log(step(i), goadd(i));