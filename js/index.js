// 首先可以将整体封装成一个匿名自运行函数
(function(){
    var slide = function (ele) {
        // 规定没张图片处于的位置和状态
        var states = [
            { ZIndex: 1, width: 120, height: 150, top: 69, left: 134, ZOpacity: 0.2 },
            { ZIndex: 2, width: 130, height: 170, top: 59, left: 0, ZOpacity: 0.5 },
            { ZIndex: 3, width: 170, height: 218, top: 35, left: 110, ZOpacity: 0.7 },
            { ZIndex: 4, width: 224, height: 288, top: 0, left: 263, ZOpacity: 1 },
            { ZIndex: 3, width: 170, height: 218, top: 35, left: 470, ZOpacity: 0.7 },
            { ZIndex: 2, width: 130, height: 170, top: 59, left: 620, ZOpacity: 0.5 },
            { ZIndex: 1, width: 120, height: 150, top: 69, left: 500, ZOpacity: 0.2 }
        ];
        // 将状态和位置赋给li
        var lis = $('#box li')
    
        function move() {
            lis.each(function (index, ele) {
                var state = states[index];
                // $(ele).css({
                //     'z-index':state.ZIndex,
                //     'width':state.width,
                //     'height':state.height
                // })
                $(ele).css('z-index', state.ZIndex).finish().animate(state, 1000).find('img').css('opacity',state.opac)
    
            })
        }
        move()
        // 上一张
        function pre() {
    
            states.push(states.shift());
            move();
            clearInterval(interval);
        }
        // 下一张
        function next() {
    
            states.unshift(states.pop());
            move();
            // clearInterval(interval);6
        }
        $(ele).find(".prev").click(pre);
        $(ele).find(".next").click(next);
        var interval = null;
    
        function autoPlay() {
            interval = setInterval(next, 1000);
        }
    
        autoPlay();
    
        $(ele).find("section,li").hover(function () {
            clearInterval(interval);
        }, autoPlay);
    }
    $.fn.ZySlide = function () {
        $(this).each(function (i, ele) {
            slide(ele);
        });
    
    }
})()


// 封装为插件，能够使得只要使用这个插件，就能被重复的使用效果，会产生什么样的效果、？
// 1.插件中最好不要使用id，原因：插件是为了能被重复使用，也就是说在一个页面上可能会重复调用，会造成页面的冲突，并且id具有唯一性的特性
//2.变量命名和方法的命名：states、time 、move（），用户在使用这个插件的时候，可能还会引入自己创建的文件，也有这样的命名，那么就会产生冲突
//3.标签class的值的问题：prev，next。这些class命名太大众化，大多数编写者都会使用这样的命名，势必会造成冲突。
//4.插件的文件名问题：index.js，index.css，命名太大众化，比如：jquery.slide.js



// 变量的作用域问题：
// 1.全局域[window] 2.函数域[function]
// 1.全局域：从页面被打开之后到页面被关闭之前始终都是存在的
// 2.函数域：存在函数被调用的一瞬间，（也不一定，考虑闭包）
// 闭包作用：可以保留函数的作用域（所以move可以使用当前自运行函数中的states）
// 闭包产生的必要条件：函数里面套函数（内层的函数要使用外部函数的变量）
// 全局变量会产生闭包码？
// 不会，因为全局变量存在全局域

