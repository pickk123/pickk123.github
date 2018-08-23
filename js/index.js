var slide = function (ele) {
    // 规定没张图片处于的位置和状态
    var states = [{
            ZIndex: 1,
            width: 120,
            height: 150,
            top: 69,
            left: 134,
            opac: 0.2
        },
        {
            ZIndex: 2,
            width: 130,
            height: 170,
            top: 59,
            left: 0,
            opac: 0.5
        },
        {
            ZIndex: 3,
            width: 170,
            height: 218,
            top: 35,
            left: 110,
            opac: 0.7
        },
        {
            ZIndex: 4,
            width: 224,
            height: 288,
            top: 0,
            left: 263,
            opac: 1
        },
        {
            ZIndex: 3,
            width: 170,
            height: 218,
            top: 35,
            left: 470,
            opac: 0.7
        },
        {
            ZIndex: 2,
            width: 130,
            height: 170,
            top: 59,
            left: 620,
            opac: 0.5
        },
        {
            ZIndex: 1,
            width: 120,
            height: 150,
            top: 69,
            left: 500,
            opac: 0.2
        }

    ]
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

// 封装为插件，能够使得只要使用这个插件，就能被重复的使用效果，会产生什么样的效果、？
// 1.插件中最好不要使用id，原因：插件是为了能被重复使用，也就是说在一个页面上可能会重复调用，会造成页面的冲突，并且id具有唯一性的特性
//2.变量命名和方法的命名：states、time 、move（），用户在使用这个插件的时候，可能还会引入自己创建的文件，也有这样的命名，那么就会产生冲突
//3.标签class的值的问题：prev，next。这些class命名太大众化，大多数编写者都会使用这样的命名，势必会造成冲突。
//4.插件的文件名问题：index.js，index.css，命名太大众化，比如：jquery.slide.js

