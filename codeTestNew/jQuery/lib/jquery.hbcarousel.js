/*
 给jquery原型添加carousel方法
 */
;
(function($) {
    $.fn.hbcarousel = function(options) {
        console.log(options);
        /*
        是否自动轮播
		是否显示小图
		是否显示左右按钮,
		可设置轮播间隔时间
		轮播类型: fade:淡入淡出, vertial:垂直滚动, horizontal:水平滚动, show:幻灯片
		默认显示第几张图片
         */
        //设置默认值
        var defaults = {
            width: 810,
            height: 320,
            //滚动持续时间
            duration: 2000,
            //当前索引
            index: 0,
        }
        this.each(function() {
            var opt = $.extend({}, defaults, options);
            var $self = $(this); //便于传递jquery实例
            var $ul;

            init();

            function init() {
                $self.addClass('carousel');
                $self.css({ width: opt.width, height: opt.height });
                $ul = $('<ul/>'); //创建ul
                $ul.html(opt.imgs.map(function(item) {
                    return `<li><img src="${item}"></li>`
                }).join(''));

                $self.append($ul); // $ul.appendTo($self)
                //显示按钮
                if (opt.buttons) { showBtn($ul) } else if (opt.buttons === false) {
                    $ul.find($('span')).hide()
                };
                // 绑定事件
                // 
                // 移入移出
                $ul.on('mouseenter', function() {
                    clearInterval(timer);

                });
                $ul.on('mouseleave', function() {
                    timer = setInterval(function() {
                        opt.index++;
                        showPic();
                        switchType();
                    }, opt.duration);
                });
                //点击
                $ul.on("click", 'span', function() {
                        if (this.className === 'prev') {
                            opt.index--;
                            showPic();
                            switchType();
                        } else {
                            opt.index++;
                            showPic();
                            switchType();
                        }
                    })
                    //轮播
                var timer = setInterval(function() {
                    opt.index++;
                    showPic();
                    switchType();
                }, opt.duration);

            }
            //改变idx
            function showPic() {
                if (opt.index > opt.imgs.length - 1) {
                    opt.index = 0;
                } else if (opt.index < 0) {
                    opt.index = opt.imgs.length - 1
                }
            };
            //显示按钮
            function showBtn(ul) {
                $btn1 = $('<span/>');
                $btn1[0].className = 'prev';
                $btn1[0].innerHTML = '&lt;';
                $btn2 = $('<span/>');
                $btn2[0].className = 'next';
                $btn2[0].innerHTML = '&gt;';
                ul.append($btn1, $btn2)
            }
            //改变轮播形式
            switchType();

            function switchType() {
                switch (opt.type) {
                    case 'vertial':
                        $ul.animate({ top: -opt.index * opt.height });
                        break;
                    case 'fade':
                        $ul.fadeToggle(opt.duration, function() {
                            $ul.css({ top: -opt.index * opt.height }); //结束时回掉函数改变样式
                        });
                        break;
                    case 'horizontal':
                        $ul.find($('li')).css({ 'float': 'left' })
                        $ul.animate({ left: -opt.index * opt.width });
                        break;
                    case 'show':
                        $ul.animate({ top: -opt.index * opt.height }, 0)
                }
            }

        });
        return this;
    }
})(jQuery);
